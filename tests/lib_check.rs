use ssr_rs::Ssr;

#[test]
#[cfg_attr(tarpaulin, ignore)]
fn render_start_with_doctype() {
    assert!(
        Ssr::render_to_string("./client/dist/ssr/index.js", "SSR", "Index", None)
            .starts_with("<!doctype html>")
    )
}

#[test]
#[should_panic(expected = "File not found")]
fn if_the_file_not_exist() {
    Ssr::render_to_string("./wrong/file/path/bundle.js", "SSR", "Index", None);
}

#[test]
#[should_panic]
fn incorrect_ssr_function_entry_point() {
    Ssr::render_to_string("./client/dist/ssr/index.js", "Index", "SSR", None);
}

#[test]
#[should_panic]
fn incorrect_function_call() {
    Ssr::render_to_string("./client/dist/ssr/index.js", "SSR", "SSR", None);
}

#[test]
fn check_if_params_are_rendered() {
    use serde_json;

    let mock_props = r##"{
        "params": [
            "hello",
            "ciao",
            "こんにちは" 
        ]
    }"##;

    let json = serde_json::to_string(&mock_props).unwrap();

    let html = Ssr::render_to_string("./client/dist/ssr/index.js", "SSR", "Index", Some(&json));

    assert!(html.contains(r#"<script>window.__INITIAL_PROPS__ ="{\n        \"params\": [\n            \"hello\",\n            \"ciao\",\n            \"こんにちは\" \n        ]\n    }"</script>"#));
}
