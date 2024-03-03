// TODO: replace hashmap with more performant https://nnethercote.github.io/perf-book/hashing.html
use std::collections::HashMap;

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
    pub fn create_platform() {
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

        let scope = unsafe { &mut *scope_ptr };

        let code = v8::String::new(scope, &format!("{source};{entry_point}"))
            .expect("Invalid JS: Strings are needed");

        let script = v8::Script::compile(scope, code, None)
            .expect("Invalid JS: There aren't runnable scripts");

        let exports = script
            .run(scope)
            .expect("Invalid JS: Missing entry point. Is the bundle exported as a variable?");

        let object = exports
            .to_object(scope)
            .expect("Invalid JS: There are no objects");

        let mut fn_map: HashMap<String, v8::Local<v8::Function>> = HashMap::new();

        if let Some(props) = object.get_own_property_names(scope, Default::default()) {
            fn_map = Some(props)
                .iter()
                .enumerate()
                .map(|(i, &p)| {
                    let name = p
                        .get_index(scope, i as u32)
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
        let scope = unsafe { &mut *self.scope };

        let params: v8::Local<v8::Value> = match v8::String::new(scope, params.unwrap_or("")) {
            Some(s) => s.into(),
            None => v8::undefined(scope).into(),
        };

        let undef = v8::undefined(scope).into();

        let mut rendered = String::new();

        // TODO: transform this into an iterator
        for key in self.fn_map.keys() {
            let result = self.fn_map[key]
                .call(scope, undef, &[params])
                .expect("Failed to call function");

            let result = result
                .to_string(scope)
                .expect("Failed to parse the result to string");

            rendered = format!("{}{}", rendered, result.to_rust_string_lossy(scope));
        }

        rendered
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
    #[should_panic]
    fn wrong_entry_point() {
        init_test();
        let source = r##"var entryPoint = {x: () => "<html></html>"};"##;

        let _ = Ssr::from(source.to_owned(), "IncorrectEntryPoint");
    }

    #[test]
    #[should_panic]
    fn empty_code() {
        init_test();
        let source = r##""##;

        let _ = Ssr::from(source.to_owned(), "SSR");
    }

    #[test]
    fn pass_param_to_function() {
        init_test();

        let props = r#"{"Hello world"}"#;

        let accept_params_source =
            r##"var SSR = {x: (params) => "These are our parameters: " + params};"##.to_string();

        let mut js = Ssr::from(accept_params_source, "SSR");
        println!("Before render_to_string");
        let result = js.render_to_string(Some(&props));

        assert_eq!(result, "These are our parameters: {\"Hello world\"}");

        let no_params_source = r##"var SSR = {x: () => "I don't accept params"};"##.to_string();

        let mut js2 = Ssr::from(no_params_source, "SSR");
        let result2 = js2.render_to_string(Some(&props));

        assert_eq!(result2, "I don't accept params");

        let result3 = js.render_to_string(None);

        assert_eq!(result3, "These are our parameters: ");
    }

    #[test]
    fn render_simple_html() {
        init_test();

        let source = r##"var SSR = {x: () => "<html></html>"};"##.to_string();

        let mut js = Ssr::from(source, "SSR");
        let html = js.render_to_string(None);

        assert_eq!(html, "<html></html>");

        //Prevent missing semicolon
        let source2 = r##"var SSR = {x: () => "<html></html>"}"##.to_string();

        let mut js2 = Ssr::from(source2, "SSR");
        let html2 = js2.render_to_string(None);

        assert_eq!(html2, "<html></html>");
    }

    #[test]
    fn render_from_struct_instance() {
        init_test();

        let mut js = Ssr::from(
            r##"var SSR = {x: () => "<html></html>"};"##.to_string(),
            "SSR",
        );

        assert_eq!(js.render_to_string(None), "<html></html>");
        assert_eq!(
            js.render_to_string(Some(r#"{"Hello world"}"#)),
            "<html></html>"
        );

        let mut js2 = Ssr::from(
            r##"var SSR = {x: () => "I don't accept params"};"##.to_string(),
            "SSR",
        );

        assert_eq!(js2.render_to_string(None), "I don't accept params");
    }
}
