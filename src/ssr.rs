#![allow(clippy::question_mark)]
use std::cell::RefCell;
// TODO: replace hashmap with more performant https://nnethercote.github.io/perf-book/hashing.html
use std::collections::HashMap;
use std::fmt;

/// This enum holds all the possible Ssr error states.
#[derive(Debug, PartialEq, Eq)]
pub enum SsrError {
    InvalidJs(&'static str),
    FailedToParseJs(&'static str),
    FailedJsExecution(&'static str),
    /// A rendered promise rejected (or the function threw). Carries the
    /// stringified JS error/rejection reason so callers can surface it.
    JsException(String),
    InvalidFunctionName,
    InvalidFunction,
}

impl fmt::Display for SsrError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{self:?}")
    }
}

/// Build a [`SsrError::JsException`] from a rejected promise's reason so callers
/// see the actual JS error rather than an opaque message.
fn rejection_error(scope: &mut v8::HandleScope, promise: v8::Local<v8::Promise>) -> SsrError {
    let reason = promise
        .result(scope)
        .to_string(scope)
        .map(|s| s.to_rust_string_lossy(scope))
        .unwrap_or_else(|| "<unknown rejection reason>".to_string());
    SsrError::JsException(reason)
}

// Streaming support
//
// None of this is touched unless a caller opts into streaming; `render` /
// `render_to_string` are unaffected.

/// An owned, `'static` chunk sink — the closure a streaming render forwards each
/// emitted chunk to.
type ChunkSink = Box<dyn FnMut(String)>;

thread_local! {
    /// The sink for the streaming render active on this thread. A V8
    /// `FunctionCallback` is a bare `fn` (no captures), so this thread-local is
    /// how the writer global reaches the caller's closure. Installed and restored
    /// as a stack by [`Streaming::render`], so nested renders behave correctly.
    static CHUNK_SINK: RefCell<Option<ChunkSink>> = const { RefCell::new(None) };
}

/// Restores the previous sink when a streaming render returns or unwinds.
struct SinkGuard {
    prev: Option<ChunkSink>,
}

impl Drop for SinkGuard {
    fn drop(&mut self) {
        CHUNK_SINK.with(|sink| *sink.borrow_mut() = self.prev.take());
    }
}

/// Install `on_chunk` as the active sink for the duration of a streaming render,
/// restoring any previous sink on return (nested renders behave as a stack).
fn install_sink(on_chunk: impl FnMut(String) + 'static) -> SinkGuard {
    let prev = CHUNK_SINK.with(|cell| cell.borrow_mut().replace(Box::new(on_chunk)));
    SinkGuard { prev }
}

/// The writer global (installed by [`Ssr::streaming`]) that a streaming bundle
/// calls to emit chunks: forwards each to the active sink.
fn stream_write_callback(
    scope: &mut v8::HandleScope,
    args: v8::FunctionCallbackArguments,
    _rv: v8::ReturnValue,
) {
    let Some(chunk) = args.get(0).to_string(scope) else {
        return;
    };
    let chunk = chunk.to_rust_string_lossy(scope);

    // Take the sink out (releasing the borrow) before invoking it, so the sink
    // may itself drive another render on this thread without a double-borrow;
    // put it back unless a nested render installed a different one.
    let Some(mut sink) = CHUNK_SINK.with(|cell| cell.borrow_mut().take()) else {
        return;
    };
    sink(chunk);
    CHUNK_SINK.with(|cell| {
        let mut slot = cell.borrow_mut();
        if slot.is_none() {
            *slot = Some(sink);
        }
    });
}

/// A streaming render session over an [`Ssr`] isolate, created by
/// [`Ssr::streaming`]. Where [`Ssr::render`] buffers the whole result into one
/// string, a streaming render invokes a caller sink for each chunk the bundle
/// emits (via the writer global) as it is produced — e.g. to flush an HTML shell
/// to the client before the rest of the page is ready.
pub struct Streaming<'ssr, 's, 'i> {
    ssr: &'ssr mut Ssr<'s, 'i>,
}

impl<'s, 'i> Streaming<'_, 's, 'i> {
    /// Render the `entry` streaming export, invoking `on_chunk` for each chunk it
    /// emits via the writer global (including across `await` points). Returns
    /// once the render's promise resolves; a rejected promise (e.g. a shell
    /// error before any chunk) is surfaced as [`SsrError::JsException`].
    ///
    /// `on_chunk` is owned and must be `'static`: it holds its own sink (a
    /// channel, an `Rc`/`Arc`, a writer) rather than borrowing local state, since
    /// the bare V8 callback bridge cannot safely reference borrowed data. Nested
    /// streaming renders on one thread are supported (the sink is a stack).
    ///
    /// Note: like the other async-aware methods, completion is driven by pumping
    /// V8 **microtasks**; JS that blocks on a *macrotask* (e.g. `setTimeout`)
    /// will not progress.
    pub fn render(
        &mut self,
        entry: &str,
        params: Option<&str>,
        on_chunk: impl FnMut(String) + 'static,
    ) -> Result<(), SsrError> {
        let _guard = install_sink(on_chunk);
        // The streaming export emits chunks via the writer global and returns
        // nothing; drive it with the plain `render` and discard the result.
        self.ssr.render(entry, params).map(|_| ())
    }
}

/// This struct holds all the necessary v8 utilities to
/// execute Javascript code.
/// It cannot be shared across threads.
#[derive(Debug)]
pub struct Ssr<'s, 'i> {
    isolate: *mut v8::OwnedIsolate,
    handle_scope: *mut v8::HandleScope<'s, ()>,
    fn_map: HashMap<String, v8::Local<'s, v8::Function>>,
    scope: *mut v8::ContextScope<'i, v8::HandleScope<'s>>,
    /// The writer global installed by [`Ssr::streaming`], if any — so repeated
    /// `streaming` calls on this isolate don't re-allocate the V8 function.
    /// `None` for isolates that never opt into streaming.
    stream_writer: Option<&'static str>,
}

impl Drop for Ssr<'_, '_> {
    fn drop(&mut self) {
        self.fn_map.clear();
        unsafe {
            let _ = Box::from_raw(self.scope);
            let _ = Box::from_raw(self.handle_scope);
            let _ = Box::from_raw(self.isolate);
        };
    }
}

impl<'s, 'i> Ssr<'s, 'i>
where
    's: 'i,
{
    /// Initialize a V8 js engine instance. It's mandatory to call it before
    /// any call to V8. The Ssr module needs this function call before any other
    /// operation. It cannot be called more than once per process.
    pub fn create_platform() {
        let platform = v8::new_default_platform(0, false).make_shared();
        v8::V8::initialize_platform(platform);
        v8::V8::initialize();

        v8::icu::set_common_data_74(crate::icu::ICU_DATA).expect("Failed to set ICU data");
    }

    /// It creates a new SSR instance (multiple instances are allowed).
    ///
    /// This function is expensive and it should be called as less as possible.
    ///
    /// Even though V8 allows multiple threads the Ssr struct created with this call can be accessed by just
    /// the thread that created it.
    ///
    /// Entry point is the JS element that the bundler exposes. It has to be an empty string in
    /// case the bundle is exported as IIFE.
    ///
    /// Check the examples <a href="https://github.com/Valerioageno/ssr-rs/tree/main/examples/vite-react">vite-react</a> (for the IIFE example) and
    /// <a href="https://github.com/Valerioageno/ssr-rs/tree/main/examples/webpack-react">webpack-react</a> (for the bundle exported as variable).
    ///
    /// See the examples folder for more about using multiple parallel instances for multi-threaded
    /// execution.
    pub fn from(source: String, entry_point: &str) -> Result<Self, SsrError> {
        let isolate = Box::into_raw(Box::new(v8::Isolate::new(v8::CreateParams::default())));

        let handle_scope = unsafe { Box::into_raw(Box::new(v8::HandleScope::new(&mut *isolate))) };

        let context = unsafe { v8::Context::new(&mut *handle_scope, Default::default()) };

        let scope_ptr =
            unsafe { Box::into_raw(Box::new(v8::ContextScope::new(&mut *handle_scope, context))) };

        let scope = unsafe { &mut *scope_ptr };

        let code = match v8::String::new(scope, &format!("{source};{entry_point}")) {
            Some(val) => val,
            None => return Err(SsrError::InvalidJs("Strings are needed")),
        };

        let script = match v8::Script::compile(scope, code, None) {
            Some(val) => val,
            None => return Err(SsrError::InvalidJs("There aren't runnable scripts")),
        };

        let exports = match script.run(scope) {
            Some(val) => val,
            None => return Err(SsrError::InvalidJs("Execute your script with d8 to debug")),
        };

        let object = match exports.to_object(scope) {
            Some(val) => val,
            None => {
                return Err(SsrError::InvalidJs(
                    "The script does not return any object after being executed",
                ))
            }
        };

        let mut fn_map: HashMap<String, v8::Local<v8::Function>> = HashMap::new();

        if let Some(props) = object.get_own_property_names(scope, Default::default()) {
            // Replaces a `Some(props).iter()...collect()` that iterated the
            // `Option`, not the array, so it only ever registered the first
            // property - fine when there's one export, wrong once `render` looks
            // up entry points by name.
            for i in 0..props.length() {
                let name = match props.get_index(scope, i) {
                    Some(val) => val,
                    None => return Err(SsrError::FailedToParseJs("Failed to get property name")),
                };

                let mut scope = v8::EscapableHandleScope::new(scope);

                let value = match object.get(&mut scope, name) {
                    Some(val) => val,
                    None => {
                        return Err(SsrError::FailedToParseJs("Failed to get property from obj"))
                    }
                };

                if !value.is_function() {
                    continue;
                }

                let fn_name = match name.to_string(&mut scope) {
                    Some(val) => val.to_rust_string_lossy(&mut scope),
                    None => return Err(SsrError::FailedToParseJs("Failed to find function name")),
                };

                fn_map.insert(fn_name, scope.escape(value.cast()));
            }
        }

        Ok(Ssr {
            isolate,
            handle_scope,
            fn_map,
            scope: scope_ptr,
            stream_writer: None,
        })
    }

    /// Add a global function to the V8 runtime.
    /// Any function defined here can be executed within any js scope
    pub fn add_global_fn(
        &self,
        name: &'static str,
        callback: impl v8::MapFnTo<v8::FunctionCallback>,
    ) -> Result<(), SsrError> {
        let scope = unsafe { &mut *self.scope };
        let ctx = scope.get_current_context();
        let global = ctx.global(scope);

        let name = match v8::String::new(scope, name) {
            Some(val) => val,
            None => return Err(SsrError::InvalidFunctionName),
        };

        let callback = match v8::Function::new(scope, callback) {
            Some(val) => val,
            None => return Err(SsrError::InvalidFunction),
        };
        global.set(scope, name.into(), callback.into());

        Ok(())
    }

    /// Execute the Javascript functions and return the result as string.
    pub fn render_to_string(&mut self, params: Option<&str>) -> Result<String, SsrError> {
        let scope = unsafe { &mut *self.scope };

        let params: v8::Local<v8::Value> = match v8::String::new(scope, params.unwrap_or("")) {
            Some(s) => s.into(),
            None => v8::undefined(scope).into(),
        };

        let undef = v8::undefined(scope).into();

        let mut rendered = String::new();

        // TODO: transform this into an iterator
        for key in self.fn_map.keys() {
            let mut result = match self.fn_map[key].call(scope, undef, &[params]) {
                Some(val) => val,
                None => return Err(SsrError::FailedJsExecution("Failed to call function")),
            };

            if result.is_promise() {
                let promise = match v8::Local::<v8::Promise>::try_from(result) {
                    Ok(val) => val,
                    Err(_) => {
                        return Err(SsrError::FailedJsExecution(
                            "Failed to cast main function to promise",
                        ))
                    }
                };

                while promise.state() == v8::PromiseState::Pending {
                    scope.perform_microtask_checkpoint();
                }

                result = promise.result(scope);
            }

            let result = match result.to_string(scope) {
                Some(val) => val,
                None => {
                    return Err(SsrError::FailedJsExecution(
                        "Failed to parse the result to string",
                    ))
                }
            };

            rendered = format!("{}{}", rendered, result.to_rust_string_lossy(scope));
        }

        Ok(rendered)
    }

    /// Call a single exported function by name and return its result as a string
    /// (awaiting it if it is async). Unlike [`Ssr::render_to_string`], which
    /// iterates and concatenates every export, this targets one function — so a
    /// bundle can expose several entry points (e.g. a buffered and a streaming
    /// renderer) without them being called together.
    pub fn render(&mut self, entry: &str, params: Option<&str>) -> Result<String, SsrError> {
        let scope = unsafe { &mut *self.scope };

        let func = *self
            .fn_map
            .get(entry)
            .ok_or(SsrError::InvalidFunctionName)?;

        let params: v8::Local<v8::Value> = match v8::String::new(scope, params.unwrap_or("")) {
            Some(s) => s.into(),
            None => v8::undefined(scope).into(),
        };
        let undef = v8::undefined(scope).into();

        let mut result = match func.call(scope, undef, &[params]) {
            Some(val) => val,
            None => return Err(SsrError::FailedJsExecution("Failed to call function")),
        };

        if result.is_promise() {
            let promise = v8::Local::<v8::Promise>::try_from(result)
                .map_err(|_| SsrError::FailedJsExecution("Failed to cast function to promise"))?;

            while promise.state() == v8::PromiseState::Pending {
                scope.perform_microtask_checkpoint();
            }

            if promise.state() == v8::PromiseState::Rejected {
                return Err(rejection_error(scope, promise));
            }

            result = promise.result(scope);
        }

        let result = result.to_string(scope).ok_or(SsrError::FailedJsExecution(
            "Failed to parse the result to string",
        ))?;

        Ok(result.to_rust_string_lossy(scope))
    }

    /// Opt into streaming rendering. Installs `write_fn` (e.g. `"__ssr_write"`)
    /// as the global a streaming bundle calls to emit each chunk, and returns a
    /// [`Streaming`] handle to drive streaming renders. The buffered `render` /
    /// `render_to_string` API is unaffected — nothing here is installed unless
    /// you call this.
    ///
    /// ```no_run
    /// # use ssr_rs::Ssr;
    /// # fn f(mut js: Ssr) -> Result<(), ssr_rs::SsrError> {
    /// js.streaming("__ssr_write")?
    ///     .render("renderStream", None, |chunk| print!("{chunk}"))?;
    /// # Ok(()) }
    /// ```
    pub fn streaming(&mut self, write_fn: &'static str) -> Result<Streaming<'_, 's, 'i>, SsrError> {
        // Install the writer global once per isolate — the global persists across
        // renders, so repeated `streaming` calls need not re-allocate it.
        if self.stream_writer != Some(write_fn) {
            self.add_global_fn(write_fn, stream_write_callback)?;
            self.stream_writer = Some(write_fn);
        }
        Ok(Streaming { ssr: self })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::cell::RefCell;
    use std::rc::Rc;
    use std::sync::Once;

    /// A `'static` chunk sink for streaming tests plus a handle to read what it
    /// collected (`Streaming::render` owns its sink, so tests collect through a
    /// shared `Rc<RefCell<..>>` rather than borrowing a local `Vec`).
    fn collector() -> (Rc<RefCell<Vec<String>>>, impl FnMut(String) + 'static) {
        let chunks = Rc::new(RefCell::new(Vec::new()));
        let sink = {
            let chunks = Rc::clone(&chunks);
            move |chunk: String| chunks.borrow_mut().push(chunk)
        };
        (chunks, sink)
    }

    static INIT: Once = Once::new();

    pub fn init_test() {
        INIT.call_once(|| {
            Ssr::create_platform();
        })
    }

    #[test]
    fn wrong_entry_point() {
        init_test();
        let source = r##"var entryPoint = {x: () => "<html></html>"};"##;

        let res = Ssr::from(source.to_owned(), "IncorrectEntryPoint");

        assert_eq!(
            res.unwrap_err(),
            SsrError::InvalidJs("Execute your script with d8 to debug")
        );
    }

    #[test]
    fn empty_code() {
        init_test();
        let source = r##""##;

        let res = Ssr::from(source.to_owned(), "SSR");
        assert_eq!(
            res.unwrap_err(),
            SsrError::InvalidJs("Execute your script with d8 to debug")
        );
    }

    #[test]
    fn executes_iife_source() {
        init_test();
        let source = r##"(() => ({x: () => 'rendered HTML'}))()"##;

        let mut js = Ssr::from(source.to_owned(), "").unwrap();
        assert_eq!(js.render_to_string(None).unwrap(), "rendered HTML");
    }

    #[test]
    fn pass_param_to_function() {
        init_test();

        let props = r#"{"Hello world"}"#;

        let accept_params_source =
            r##"var SSR = {x: (params) => "These are our parameters: " + params};"##.to_string();

        let mut js = Ssr::from(accept_params_source, "SSR").unwrap();
        println!("Before render_to_string");
        let result = js.render_to_string(Some(props)).unwrap();

        assert_eq!(result, "These are our parameters: {\"Hello world\"}");

        let no_params_source = r##"var SSR = {x: () => "I don't accept params"};"##.to_string();

        let mut js2 = Ssr::from(no_params_source, "SSR").unwrap();
        let result2 = js2.render_to_string(Some(props)).unwrap();

        assert_eq!(result2, "I don't accept params");

        let result3 = js.render_to_string(None).unwrap();

        assert_eq!(result3, "These are our parameters: ");
    }

    #[test]
    fn render_simple_html() {
        init_test();

        let source = r##"var SSR = {x: () => "<html></html>"};"##.to_string();

        let mut js = Ssr::from(source, "SSR").unwrap();
        let html = js.render_to_string(None).unwrap();

        assert_eq!(html, "<html></html>");

        //Prevent missing semicolon
        let source2 = r##"var SSR = {x: () => "<html></html>"}"##.to_string();

        let mut js2 = Ssr::from(source2, "SSR").unwrap();
        let html2 = js2.render_to_string(None).unwrap();

        assert_eq!(html2, "<html></html>");
    }

    #[test]
    fn render_from_struct_instance() {
        init_test();

        let mut js = Ssr::from(
            r##"var SSR = {x: () => "<html></html>"};"##.to_string(),
            "SSR",
        )
        .unwrap();

        assert_eq!(js.render_to_string(None).unwrap(), "<html></html>");
        assert_eq!(
            js.render_to_string(Some(r#"{"Hello world"}"#)).unwrap(),
            "<html></html>"
        );

        let mut js2 = Ssr::from(
            r##"var SSR = {x: () => "I don't accept params"};"##.to_string(),
            "SSR",
        )
        .unwrap();

        assert_eq!(js2.render_to_string(None).unwrap(), "I don't accept params");
    }

    #[test]
    fn entry_point_is_async() {
        init_test();

        let mut js = Ssr::from(
            r##"var SSR = {x: async () => "<html></html>"};"##.to_string(),
            "SSR",
        )
        .unwrap();

        assert_eq!(js.render_to_string(None).unwrap(), "<html></html>");
        assert_eq!(
            js.render_to_string(Some(r#"{"Hello world"}"#)).unwrap(),
            "<html></html>"
        );
    }

    #[test]
    fn entry_point_is_async_with_params() {
        init_test();

        let mut js = Ssr::from(
            r##"var SSR = {x: async (params) => "These are our parameters: " + params};"##
                .to_string(),
            "SSR",
        )
        .unwrap();

        assert_eq!(
            js.render_to_string(Some(r#"{"Hello world"}"#)).unwrap(),
            "These are our parameters: {\"Hello world\"}"
        );
    }

    #[test]
    fn entry_point_is_async_with_nested_async() {
        init_test();

        let mut js = Ssr::from(
            r##"
            const asyncFn = async () => {
                return "Hello world"
            }
            var SSR = {x: async () => {
                return await asyncFn()
            }};
            "##
            .to_string(),
            "SSR",
        )
        .unwrap();

        assert_eq!(
            js.render_to_string(Some(r#"{"Hello world"}"#)).unwrap(),
            "Hello world"
        );
    }

    #[test]
    #[should_panic(expected = "FailedJsExecution")]
    fn it_should_fail_to_call_missing_global_fn() {
        init_test();

        let mut js = Ssr::from(
            r##"var testGlobalFn = { globalSumFnCall: () => globalSum(2, 5)};"##.to_string(),
            "testGlobalFn",
        )
        .unwrap();

        assert_eq!(js.render_to_string(None).unwrap(), "7");
    }

    #[test]
    fn it_should_call_a_custom_global_fn() {
        init_test();

        let mut js = Ssr::from(
            r##"var testGlobalFn = { globalSumFnCall: () => globalSum(2, 5)};"##.to_string(),
            "testGlobalFn",
        )
        .unwrap();

        let global_sum = |scope: &mut v8::HandleScope,
                          args: v8::FunctionCallbackArguments,
                          mut rv: v8::ReturnValue| {
            let first = args.get(0).number_value(scope).unwrap();
            let second = args.get(1).number_value(scope).unwrap();
            let sum = first + second;
            rv.set(v8::Number::new(scope, sum).into());
        };

        js.add_global_fn("globalSum", global_sum)
            .expect("Failed to bind global_sum fn");

        assert_eq!(js.render_to_string(None).unwrap(), "7");
    }

    #[test]
    fn render_targets_a_single_named_export() {
        init_test();

        let mut js = Ssr::from(
            r##"var SSR = { renderFn: () => "<html></html>", other: () => "SHOULD NOT APPEAR" };"##
                .to_string(),
            "SSR",
        )
        .unwrap();

        // Only the requested export is called (not every property, unlike
        // `render_to_string`).
        assert_eq!(js.render("renderFn", None).unwrap(), "<html></html>");
        assert_eq!(js.render("other", None).unwrap(), "SHOULD NOT APPEAR");
    }

    #[test]
    fn render_errors_on_unknown_export() {
        init_test();

        let mut js = Ssr::from(
            r##"var SSR = { renderFn: () => "<html></html>" };"##.to_string(),
            "SSR",
        )
        .unwrap();

        assert_eq!(
            js.render("missing", None).unwrap_err(),
            SsrError::InvalidFunctionName
        );
    }

    #[test]
    fn render_surfaces_a_rejected_promise() {
        init_test();

        let mut js = Ssr::from(
            r##"var SSR = { renderFn: async () => { throw new Error("boom"); } };"##.to_string(),
            "SSR",
        )
        .unwrap();

        // A rejected async render surfaces the JS error, not an opaque message.
        match js.render("renderFn", None).unwrap_err() {
            SsrError::JsException(reason) => assert!(
                reason.contains("boom"),
                "expected the JS error in the reason, got: {reason}"
            ),
            other => panic!("expected SsrError::JsException, got {other:?}"),
        }
    }

    #[test]
    fn streaming_emits_chunks_in_order_with_params() {
        init_test();

        let mut js = Ssr::from(
            r##"var SSR = { renderStreamFn: async (params) => {
                __ssr_write("<html>");
                __ssr_write(params || "");
                __ssr_write("</html>");
            }};"##
                .to_string(),
            "SSR",
        )
        .unwrap();

        let (chunks, sink) = collector();
        js.streaming("__ssr_write")
            .unwrap()
            .render("renderStreamFn", Some("BODY"), sink)
            .unwrap();

        assert_eq!(*chunks.borrow(), vec!["<html>", "BODY", "</html>"]);
    }

    #[test]
    fn streaming_captures_chunks_across_await_points() {
        init_test();

        // Emitting before and after an `await` proves the microtask pump drives
        // the sink progressively, not just at the end.
        let mut js = Ssr::from(
            r##"var SSR = { renderStreamFn: async () => {
                __ssr_write("a");
                await Promise.resolve();
                __ssr_write("b");
                await Promise.resolve();
                __ssr_write("c");
            }};"##
                .to_string(),
            "SSR",
        )
        .unwrap();

        let (chunks, sink) = collector();
        js.streaming("__ssr_write")
            .unwrap()
            .render("renderStreamFn", None, sink)
            .unwrap();

        assert_eq!(*chunks.borrow(), vec!["a", "b", "c"]);
    }

    #[test]
    fn streaming_surfaces_a_rejected_promise() {
        init_test();

        let mut js = Ssr::from(
            r##"var SSR = { renderStreamFn: async () => {
                __ssr_write("partial");
                throw new Error("boom");
            }};"##
                .to_string(),
            "SSR",
        )
        .unwrap();

        let (chunks, sink) = collector();
        let result = js
            .streaming("__ssr_write")
            .unwrap()
            .render("renderStreamFn", None, sink);

        // Chunks emitted before the rejection are still delivered...
        assert_eq!(*chunks.borrow(), vec!["partial"]);
        // ...and the rejection reason is surfaced, not swallowed.
        match result.unwrap_err() {
            SsrError::JsException(reason) => assert!(
                reason.contains("boom"),
                "expected the JS error in the reason, got: {reason}"
            ),
            other => panic!("expected SsrError::JsException, got {other:?}"),
        }
    }

    #[test]
    fn buffered_render_after_streaming_is_unaffected() {
        init_test();

        let mut js = Ssr::from(
            r##"var SSR = {
                renderStreamFn: async () => { __ssr_write("streamed"); },
                renderFn: () => "buffered",
            };"##
                .to_string(),
            "SSR",
        )
        .unwrap();

        let (chunks, sink) = collector();
        js.streaming("__ssr_write")
            .unwrap()
            .render("renderStreamFn", None, sink)
            .unwrap();
        assert_eq!(*chunks.borrow(), vec!["streamed"]);

        // The sink is cleared after the streaming render, so a later buffered
        // render on the same isolate is unaffected.
        assert_eq!(js.render("renderFn", None).unwrap(), "buffered");
    }
}
