use ssr_rs::Ssr;
use std::fs::read_to_string;

#[test]
#[cfg_attr(tarpaulin, ignore)]
fn render_start_with_doctype() {
    let source = read_to_string("./client/dist/ssr/index.js").unwrap();

    assert!(Ssr::render_to_string(&source, "SSR", None).starts_with("<!doctype html>"))
}

#[test]
#[should_panic]
fn incorrect_ssr_function_entry_point() {
    let source = read_to_string("./client/dist/ssr/index.js").unwrap();

    Ssr::render_to_string(&source, "Index", None);
}

#[test]
#[cfg_attr(tarpaulin, ignore)]
fn check_if_params_are_rendered() {
    use serde_json;

    let mock_props = r##"{
        "params": [
            "hello",
            "ciao",
            "こんにちは" 
        ]
    }"##;

    let source = read_to_string("./client/dist/ssr/index.js").unwrap();

    let json = serde_json::to_string(&mock_props).unwrap();

    let html = Ssr::render_to_string(&source, "SSR", Some(&json));

    assert!(html.contains(r#"<script>window.__INITIAL_PROPS__ ="{\n        \"params\": [\n            \"hello\",\n            \"ciao\",\n            \"こんにちは\" \n        ]\n    }"</script>"#));
}
