
pub struct SSREnvironment<'a> {
    function: *mut v8::Local<'a, v8::Function>,
    scope: *mut v8::ContextScope<'a, v8::HandleScope<'a>>,
    context: *mut v8::Local<'a, v8::Context>,
    handle_scope: *mut v8::HandleScope<'a, ()>,
    isolate: *mut v8::OwnedIsolate,
}

impl SSREnvironment<'_> {
    pub fn init() {
        lazy_static! {
            static ref INIT_PLATFORM: () = {
                //Initialize a new V8 platform
                let platform = v8::new_default_platform(0, false).make_shared();
                v8::V8::initialize_platform(platform);
                v8::V8::initialize();
            };
        }

        lazy_static::initialize(&INIT_PLATFORM);
    }

    pub fn new(source: &str, entry_point: &str, root_export: &str) -> Self {
        // @todo: Add safety explanation.

        // The isolate represents an isolated instance of the v8 engine
        // Object from one isolate must not be used in other isolates.
        let isolate: *mut _ = Box::leak(Box::new(v8::Isolate::new(Default::default())));

        // A stack-allocated class that governs a number of local handles.
        let handle_scope: *mut _ =
            Box::leak(Box::new(v8::HandleScope::new(unsafe { &mut *isolate })));

        // A sandboxed execution context with its own set of built-in objects and functions.
        let context: *mut _ = Box::leak(Box::new(v8::Context::new(unsafe { &mut *handle_scope })));

        // Stack-allocated class which sets the execution context for all operations executed within a local scope.
        let scope: *mut _ = Box::leak(Box::new(v8::ContextScope::new(
            unsafe { &mut *handle_scope },
            unsafe { *context },
        )));

        let scope_borrow = unsafe { &mut *scope };

        let code: *mut _ = Box::leak(Box::new(v8::String::new(
            scope_borrow,
            // We add the "entry_point" to the end of the file so
            // we can get the value of the Webpack bundle as output
            // when the script is run. See: "object" below which
            // refers to the output of the script.
            &format!("{};{}", source, entry_point),
        )
        .expect("Invalid JS: Strings are needed")));

        let script: *mut _ = Box::leak(Box::new(
            v8::Script::compile(scope_borrow, unsafe { *code }, None)
                .expect("Invalid JS: There aren't runnable scripts"),
        ));

        let script_exports: *mut _ =
            Box::leak(Box::new(unsafe { *script }.run(scope_borrow).expect(
                "Invalid JS: Missing entry point. Is the bundle exported as a variable?",
            )));

        let object: *mut _ = Box::leak(Box::new(unsafe { *script_exports }
            .to_object(scope_borrow)
            .expect("Invalid JS: entry_point not found. Are you sure you used the right value for entry_point?")));

        let root_export_v8: *mut _ = Box::leak(Box::new(v8::String::new(scope_borrow, root_export)
            .expect("Failed to allocate string.")
            .into()));

        let function: *mut _ = Box::leak(Box::new(
            unsafe { &mut *object }
                .get(scope_borrow, unsafe { *root_export_v8 })
                .expect("Invalid JS: Failed to find root export function."),
        ));

        let function_value = unsafe { *function };
        let function: *mut v8::Local<v8::Function> =
            unsafe { &mut v8::Local::<v8::Function>::cast(function_value) };

        SSREnvironment {
            function,
            scope,
            context,
            handle_scope,
            isolate,
        }
    }

    pub fn render(&mut self, params: &str) -> Option<String> {
        // @todo: Add safety explanation.
        let scope = unsafe { &mut *self.scope };
        let function = unsafe { &mut *self.function };

        let params = v8::String::new(scope, params).expect("Failed to allocate params string.");
        let undefined = v8::undefined(scope);
        let result = function
            .call(scope, undefined.into(), &[params.into()])
            .expect("Failed to call function.");

        Some(result.to_rust_string_lossy(scope))
    }
}

impl Drop for SSREnvironment<'_> {
    fn drop(&mut self) {
        // @todo: Drop fields in order.
        todo!();
    }
}

// #[derive(Clone, Debug, PartialEq)]
// pub struct Ssr<'a> {
//     // TODO: Check if better Box<str> instead of String
//     source: String,
//     entry_point: &'a str,
// }

// impl<'a> Ssr<'a> {
//     /// Create an instance of the Ssr struct instanciate the v8 platform as well.
//     pub fn new(source: String, entry_point: &'a str) -> Self {
//         Self::init_platform();

//         Ssr {
//             source,
//             entry_point,
//         }
//     }

//     fn init_platform() {
//
//     }

//     /// Evaluates the javascript source code passed as argument and render it as a String.
//     /// Any initial params (if needed) must be passed as JSON.
//     ///
//     /// <a href="https://github.com/Valerioageno/ssr-rs/blob/main/examples/actix_with_initial_props.rs" target="_blank">Here</a> an useful example of how to use initial params with the actix framework.
//     ///
//     /// "enrty_point" is the variable name set from the frontend bundler used. <a href="https://github.com/Valerioageno/ssr-rs/blob/main/client/webpack.ssr.js" target="_blank">Here</a> an example from webpack.
//     pub fn one_shot_render(source: String, entry_point: &str, params: Option<&str>) -> String {
//         Self::init_platform();

//         Self::render(source, entry_point, params)
//     }

//     /// Evaluates the JS source code instanciate in the Ssr struct
//     /// "enrty_point" is the variable name set from the frontend bundler used. <a href="https://github.com/Valerioageno/ssr-rs/blob/main/client/webpack.ssr.js" target="_blank">Here</a> an example from webpack.
//     pub fn render_to_string(&self, params: Option<&str>) -> String {
//         Self::render(self.source.clone(), self.entry_point, params)
//     }

//     fn render(source: String, entry_point: &str, params: Option<&str>) -> String {

//
//     }

//     fn create_fn_map<'b>(
//         scope: &mut v8::ContextScope<'b, v8::HandleScope>,
//         object: v8::Local<v8::Object>,
//     ) -> HashMap<String, v8::Local<'b, v8::Function>> {
//         let mut fn_map: HashMap<String, v8::Local<v8::Function>> = HashMap::new();

//         if let Some(props) = object.get_own_property_names(scope) {
//             fn_map = Some(props)
//                 .iter()
//                 .enumerate()
//                 .map(|(i, &p)| {
//                     let name = p.get_index(scope, i as u32).unwrap();

//                     //A HandleScope which first allocates a handle in the current scope which will be later filled with the escape value.
//                     let mut scope = v8::EscapableHandleScope::new(scope);

//                     let func = object.get(&mut scope, name).unwrap();

//                     let func = unsafe { v8::Local::<v8::Function>::cast(func) };

//                     (
//                         name.to_string(&mut scope)
//                             .unwrap()
//                             .to_rust_string_lossy(&mut scope),
//                         scope.escape(func),
//                     )
//                 })
//                 .collect();
//         }

//         fn_map
//     }
// }

// #[cfg(tests)]
// mod tests {

//     #[test]
//     fn check_struct_instance() {
//         let js = Ssr::new(
//             r##"var SSR = {x: () => "<html></html>"};"##.to_string(),
//             "SSR",
//         );

//         assert_eq!(
//             js,
//             Ssr {
//                 source: r##"var SSR = {x: () => "<html></html>"};"##.to_string(),
//                 entry_point: "SSR"
//             }
//         )
//     }
// }
