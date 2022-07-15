pub struct SSREnvironment {
    source_code: String,
    entry_point: String,
    root_export: String,
    isolate: v8::OwnedIsolate,
}

impl SSREnvironment {
    fn init() {
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

    pub fn new(source_code: &str, entry_point: &str, root_export: &str) -> Self {
        Self::init();

        // The isolate represents an isolated instance of the v8 engine
        // Object from one isolate must not be used in other isolates.
        let isolate = v8::Isolate::new(Default::default());

        SSREnvironment {
            source_code: String::from(source_code),
            entry_point: String::from(entry_point),
            root_export: String::from(root_export),
            isolate,
        }
    }

    pub fn render(&mut self, params: &str) -> String {
        let mut handle_scope = v8::HandleScope::new(&mut self.isolate);

        // A sandboxed execution context with its own set of built-in objects and functions.
        let context = v8::Context::new(&mut handle_scope);

        // Stack-allocated class which sets the execution context for all operations executed within a local scope.
        let mut scope = v8::ContextScope::new(&mut handle_scope, context);

        let code = v8::String::new(
            &mut scope,
            // We add the "entry_point" to the end of the file so
            // we can get the value of the Webpack bundle as output
            // when the script is run. See: "object" below which
            // refers to the output of the script.
            &format!("{};{}", self.source_code, self.entry_point),
        )
        .expect("Invalid JS: Strings are needed");

        let script = v8::Script::compile(&mut scope, code, None)
            .expect("Invalid JS: There aren't runnable scripts");

        let script_exports = script
            .run(&mut scope)
            .expect("Invalid JS: Missing entry point. Is the bundle exported as a variable?");

        let object = script_exports
            .to_object(&mut scope)
            .expect("Invalid JS: entry_point not found. Are you sure you used the right value for entry_point?");

        let root_export_v8 = v8::String::new(&mut scope, &self.root_export)
            .expect("Failed to allocate string.")
            .into();

        let function = unsafe {
            &mut v8::Local::<v8::Function>::cast(
                object
                    .get(&mut scope, root_export_v8)
                    .expect("Invalid JS: Failed to find root export function."),
            )
        };

        let params =
            v8::String::new(&mut scope, params).expect("Failed to allocate params string.");
        let undefined = v8::undefined(&mut scope);
        let result = function
            .call(&mut scope, undefined.into(), &[params.into()])
            .expect("Failed to call function.");

        result.to_rust_string_lossy(&mut scope)
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
