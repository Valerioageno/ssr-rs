use ssr_rs::SSREnvironment;

#[test]
#[should_panic]
fn incorrect_entry_point() {
    let source = r##"var entryPoint = {x: () => "<html></html>"};"##;
    let mut env = SSREnvironment::new(source, "IncorrectEntryPoint", "Index");

    let _ = env.render("");
}

#[test]
#[should_panic]
fn empty_code() {
    let source = r##""##;
    let mut env = SSREnvironment::new(source, "SSR", "Index");

    let _ = env.render("");
}

#[test]
fn pass_param_to_function() {
    let props = r#"{"Hello world"}"#;
    let accept_params_source =
        r##"var SSR = {x: (params) => "These are our parameters: " + params};"##.to_string();
    let result = SSREnvironment::new(&accept_params_source, "SSR", "x").render(props);
    assert_eq!(result, "These are our parameters: {\"Hello world\"}");

    let no_params_source = r##"var SSR = {x: () => "I don't accept params"};"##.to_string();
    let result2 = SSREnvironment::new(&no_params_source, "SSR", "x").render("");
    assert_eq!(result2, "I don't accept params");

    let result3 = SSREnvironment::new(&accept_params_source, "SSR", "x").render("");
    assert_eq!(result3, "These are our parameters: ");
}

#[test]
fn render_simple_html() {
    let source = r##"var SSR = {x: () => "<html></html>"};"##;
    let html = SSREnvironment::new(&source, "SSR", "x").render("");
    assert_eq!(html, "<html></html>");

    // Prevent missing semicolon
    let source2 = r##"var SSR = {x: () => "<html></html>"}"##;
    let html2 = SSREnvironment::new(&source2, "SSR", "x").render("");
    assert_eq!(html2, "<html></html>");
}

#[test]
fn render_from_struct_instance() {
    let mut env = SSREnvironment::new(&r##"var SSR = {x: () => "<html></html>"};"##, "SSR", "x");

    assert_eq!(env.render(""), "<html></html>");
    assert_eq!(env.render(r#"{"Hello world"}"#), "<html></html>");

    let mut env = SSREnvironment::new(
        r##"var SSR = {x: () => "I don't accept params"};"##,
        "SSR",
        "x",
    );

    assert_eq!(env.render(""), "I don't accept params");
}
