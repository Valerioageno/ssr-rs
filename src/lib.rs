use rusty_v8 as v8;

pub fn render_to_string() -> String {

    let platform = v8::new_default_platform().unwrap();
    v8::V8::initialize_platform(platform);
    v8::V8::initialize();

    let isolate = &mut v8::Isolate::new(Default::default());

    let scope = &mut v8::HandleScope::new(isolate);
    let ctx = v8::Context::new(scope);
    let scope = &mut v8::ContextScope::new(scope, ctx);

    let code = v8::String::new(scope, r###"'Hello ' + 'world!'"###).unwrap();
    println!("javascript code: {}", code.to_rust_string_lossy(scope));

    let script = v8::Script::compile(scope, code, None).unwrap();
    let result = script.run(scope).unwrap();
    let result = result.to_string(scope).unwrap();

    format!("<h1>{}</h1>", result.to_rust_string_lossy(scope))
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
