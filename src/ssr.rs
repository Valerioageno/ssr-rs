use rusty_v8 as v8;
use std::collections::HashMap;

pub struct Ssr {}

impl Ssr {
    fn init_platform() {
        lazy_static! {
          static ref INIT_PLATFORM: () = {
              //Initialize a new V8 platform
              let platform = v8::new_default_platform().unwrap();
              v8::V8::initialize_platform(platform);
              v8::V8::initialize();
          };
        }

        lazy_static::initialize(&INIT_PLATFORM);
    }

    /// Evaluates the javascript source code passed and runs the render functions.
    /// Any initial params (if needed) must be passed as JSON.
    ///
    /// <a href="https://github.com/Valerioageno/ssr-rs/blob/main/examples/actix_with_initial_props.rs" target="_blank">Here</a> an useful example of how to use initial params with the actix framework.
    ///
    /// "enrty_point" is the variable name set from the frontend bundler used. <a href="https://github.com/Valerioageno/ssr-rs/blob/main/client/webpack.ssr.js" target="_blank">Here</a> an example from webpack.
    pub fn render_to_string(source: &str, entry_point: &str, params: Option<&str>) -> String {
        Self::init_platform();

        {
            //The isolate rapresente an isolated instance of the v8 engine
            //Object from one isolate must not be used in other isolates.
            let isolate = &mut v8::Isolate::new(Default::default());

            //A stack-allocated class that governs a number of local handles.
            let handle_scope = &mut v8::HandleScope::new(isolate);

            //A sandboxed execution context with its own set of built-in objects and functions.
            let context = v8::Context::new(handle_scope);

            //Stack-allocated class which sets the execution context for all operations executed within a local scope.
            let scope = &mut v8::ContextScope::new(handle_scope, context);

            let code = v8::String::new(scope, &format!("{};{}", source, entry_point))
                .expect("Strings are needed");

            let script =
                v8::Script::compile(scope, code, None).expect("There aren't runnable scripts");

            let exports = script
                .run(scope)
                .expect("Missing entry point. Is the bundle exported as a variable?");

            let object = exports.to_object(scope).expect("There are no objects");

            let fn_map = Self::create_fn_map(scope, object);

            let params: v8::Local<v8::Value> = match v8::String::new(scope, params.unwrap_or("")) {
                Some(s) => s.into(),
                None => v8::undefined(scope).into(),
            };

            let undef = v8::undefined(scope).into();

            let mut rendered = String::new();

            for key in fn_map.keys() {
                let result = fn_map[key]
                    .call(scope, undef, &[params])
                    .expect("Are provided all needed props?");

                let result = result.to_string(scope).unwrap();

                rendered = format!("{}{}", rendered, result.to_rust_string_lossy(scope));
            }

            rendered
        }
    }

    fn create_fn_map<'b>(
        scope: &mut v8::ContextScope<'b, v8::HandleScope>,
        object: v8::Local<v8::Object>,
    ) -> HashMap<String, v8::Local<'b, v8::Function>> {
        let mut fn_map: HashMap<String, v8::Local<v8::Function>> = HashMap::new();

        if let Some(props) = object.get_own_property_names(scope) {
            fn_map = Some(props)
                .iter()
                .enumerate()
                .map(|(i, &p)| {
                    let name = p.get_index(scope, i as u32).unwrap();

                    //A HandleScope which first allocates a handle in the current scope which will be later filled with the escape value.
                    let mut scope = v8::EscapableHandleScope::new(scope);

                    let func = object.get(&mut scope, name).unwrap();

                    let func = unsafe { v8::Local::<v8::Function>::cast(func) };

                    (
                        name.to_string(&mut scope)
                            .unwrap()
                            .to_rust_string_lossy(&mut scope),
                        scope.escape(func),
                    )
                })
                .collect();
        }

        fn_map
    }
}
