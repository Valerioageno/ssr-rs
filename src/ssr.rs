// TODO: replace hashmap with more performant https://nnethercote.github.io/perf-book/hashing.html
use std::collections::HashMap;

#[derive(Debug)]
pub struct Ssr<'s, 'i> {
    isolate: *mut v8::OwnedIsolate,
    handle_scope: *mut v8::HandleScope<'s, ()>,
    fn_map: HashMap<String, v8::Local<'s, v8::Function>>,
    scope: *mut v8::ContextScope<'i, v8::HandleScope<'s>>,
}

unsafe impl Send for Ssr<'_, '_> {}
unsafe impl Sync for Ssr<'_, '_> {}

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
    pub fn create_platform() -> () {
        let platform = v8::new_default_platform(0, false).make_shared();
        v8::V8::initialize_platform(platform);
        v8::V8::initialize();
    }

    /// Create a new SSR instance.
    pub fn from(source: String, entry_point: &str) -> Self {
        let isolate = Box::into_raw(Box::new(v8::Isolate::new(v8::CreateParams::default())));

        let handle_scope = unsafe { Box::into_raw(Box::new(v8::HandleScope::new(&mut *isolate))) };

        let context = unsafe { v8::Context::new(&mut *handle_scope) };

        let scope_ptr =
            unsafe { Box::into_raw(Box::new(v8::ContextScope::new(&mut *handle_scope, context))) };

        let mut scope = unsafe { &mut *scope_ptr };

        println!("Scope: {:?}", scope);

        let code = v8::String::new(&mut scope, &format!("{source};{entry_point}"))
            .expect("Invalid JS: Strings are needed");

        let script = v8::Script::compile(&mut scope, code, None)
            .expect("Invalid JS: There aren't runnable scripts");

        let exports = script
            .run(&mut scope)
            .expect("Invalid JS: Missing entry point. Is the bundle exported as a variable?");

        let object = exports
            .to_object(&mut scope)
            .expect("Invalid JS: There are no objects");

        let mut fn_map: HashMap<String, v8::Local<v8::Function>> = HashMap::new();

        if let Some(props) = object.get_own_property_names(&mut scope, Default::default()) {
            fn_map = Some(props)
                .iter()
                .enumerate()
                .map(|(i, &p)| {
                    let name = p
                        .get_index(&mut scope, i as u32)
                        .expect("Failed to get function name");

                    let mut scope = v8::EscapableHandleScope::new(scope);

                    let func = object
                        .get(&mut scope, name)
                        .expect("Failed to get function from obj");

                    let func = unsafe { v8::Local::<v8::Function>::cast(func) };

                    (
                        name.to_string(&mut scope)
                            .unwrap()
                            .to_rust_string_lossy(&mut scope),
                        scope.escape(func),
                    )
                })
                // TODO: collect directly the values into a map
                .collect();
        }

        Ssr {
            isolate,
            handle_scope,
            fn_map,
            scope: scope_ptr,
        }
    }

    /// Execute the Javascript functions and return the result as string.
    pub fn render_to_string(&mut self, params: Option<&str>) -> String {
        let mut scope = unsafe { &mut *self.scope };

        let params: v8::Local<v8::Value> = match v8::String::new(&mut scope, params.unwrap_or("")) {
            Some(s) => s.into(),
            None => v8::undefined(&mut scope).into(),
        };

        let undef = v8::undefined(&mut scope).into();

        let mut rendered = String::new();

        // TODO: transform this into an iterator
        for key in self.fn_map.keys() {
            let result = self.fn_map[key]
                .call(&mut scope, undef, &[params])
                .expect("Failed to call function");

            let result = result
                .to_string(&mut scope)
                .expect("Failed to parse the result to string");

            rendered = format!("{}{}", rendered, result.to_rust_string_lossy(&mut scope));
        }

        rendered
    }
}
