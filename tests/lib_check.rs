use ssr_rs::Ssr;

#[test]
#[should_panic(expected = "Missing entry point.")]
fn incorrect_entry_point() {
    let source = r##"var entryPoint = {x: () => "<html></html>"};"##;

    let _ = Ssr::render_to_string(&source, "IncorrectEntryPoint", None);
}

#[test]
fn pass_param_to_function() {
    use serde_json;

    let mock_props = r#"{"Hello world"}"#;

    let json = serde_json::to_string(&mock_props).unwrap();

    let source = r##"var SSR = {x: (params) => "These are our parameters: " + params};"##;

    let result = Ssr::render_to_string(&source, "SSR", Some(&json));

    assert_eq!(
        result.replace("\\", ""),
        "These are our parameters: \"{\"Hello world\"}\""
    );

    let source2 = r##"var SSR = {x: () => "I don't accept params"};"##;

    let result2 = Ssr::render_to_string(&source2, "SSR", Some(&json));

    assert_eq!(result2, "I don't accept params");
}

#[test]
fn render_simple_html() {
    let source = r##"var SSR = {x: () => "<html></html>"};"##;

    let html = Ssr::render_to_string(&source, "SSR", None);

    assert_eq!(html, "<html></html>");

    //Prevent missing semicolon
    let source2 = r##"var SSR = {x: () => "<html></html>"}"##;

    let html2 = Ssr::render_to_string(&source2, "SSR", None);

    assert_eq!(html2, "<html></html>");
}
