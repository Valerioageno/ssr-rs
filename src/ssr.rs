use std::collections::HashMap;

#[derive(Debug)]
pub struct Ssr<'s, 'i> {
    fn_map: HashMap<String, v8::Local<'s, v8::Function>>,
    scope: v8::ContextScope<'i, v8::HandleScope<'s>>,
}

impl<'s, 'i> Ssr<'s, 'i>
where
    's: 'i,
{
    /// Create a new SSR instance.
    pub fn from(
        handle_scope: &'i mut v8::HandleScope<'s, ()>,
        source: String,
        entry_point: &str,
    ) -> Self {
        let context = v8::Context::new(handle_scope);
        let mut scope = v8::ContextScope::new(handle_scope, context);

        let code = v8::String::new(&mut scope, &format!("{};{}", source, entry_point))
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
                    let name = p.get_index(&mut scope, i as u32).unwrap();

                    let mut scope = v8::EscapableHandleScope::new(&mut scope);

                    let func = object.get(&mut scope, name).unwrap();

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

        Ssr { fn_map, scope }
    }

    /// Execute the Javascript functions and return the result as string.
    pub fn render_to_string(&mut self, params: Option<&str>) -> String {
        let params: v8::Local<v8::Value> =
            match v8::String::new(&mut self.scope, params.unwrap_or("")) {
                Some(s) => s.into(),
                None => v8::undefined(&mut self.scope).into(),
            };

        let undef = v8::undefined(&mut self.scope).into();

        let mut rendered = String::new();

        // TODO: transform this into an iterator
        for key in self.fn_map.keys() {
            let result = self.fn_map[key]
                .call(&mut self.scope, undef, &[params])
                .unwrap();

            let result = result
                .to_string(&mut self.scope)
                .expect("Failed to parse the result to string");

            rendered = format!(
                "{}{}",
                rendered,
                result.to_rust_string_lossy(&mut self.scope)
            );
        }

        rendered
    }
}

#[cfg(tests)]
mod tests {

    #[test]
    fn check_struct_instance() {
        let js = Ssr::new(
            r##"var SSR = {x: () => "<html></html>"};"##.to_string(),
            "SSR",
        );

        assert_eq!(
            js,
            Ssr {
                source: r##"var SSR = {x: () => "<html></html>"};"##.to_string(),
                entry_point: "SSR"
            }
        )
    }
}
