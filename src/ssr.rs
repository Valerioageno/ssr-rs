// TODO: replace hashmap with more performant https://nnethercote.github.io/perf-book/hashing.html
use std::collections::HashMap;
use std::fmt;

/// This enum holds all the possible Ssr error states.
#[derive(Debug, PartialEq, Eq)]
pub enum SsrError {
    InvalidJs(&'static str),
    FailedToParseJs(&'static str),
    FailedJsExecution(&'static str),
    InvalidFunctionName,
    InvalidFunction,
}

impl fmt::Display for SsrError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:?}", self)
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
            fn_map = match Some(props)
                .iter()
                .enumerate()
                .map(
                    |(i, &p)| -> Result<(String, v8::Local<v8::Function>), SsrError> {
                        let name = match p.get_index(scope, i as u32) {
                            Some(val) => val,
                            None => {
                                return Err(SsrError::FailedToParseJs(
                                    "Failed to get function name",
                                ))
                            }
                        };

                        let mut scope = v8::EscapableHandleScope::new(scope);

                        let func = match object.get(&mut scope, name) {
                            Some(val) => val,
                            None => {
                                return Err(SsrError::FailedToParseJs(
                                    "Failed to get function from obj",
                                ))
                            }
                        };

                        let fn_name = match name.to_string(&mut scope) {
                            Some(val) => val.to_rust_string_lossy(&mut scope),
                            None => {
                                return Err(SsrError::FailedToParseJs(
                                    "Failed to find function name",
                                ))
                            }
                        };

                        Ok((fn_name, scope.escape(func.cast())))
                    },
                )
                // TODO: collect directly the values into a map
                .collect()
            {
                Ok(val) => val,
                Err(err) => return Err(err),
            }
        }

        Ok(Ssr {
            isolate,
            handle_scope,
            fn_map,
            scope: scope_ptr,
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
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::sync::Once;

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
}
