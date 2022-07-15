#[test]
#[should_panic]
fn incorrect_entry_point() {
    let source = r##"var entryPoint = {x: () => "<html></html>"};"##;

    let _ = Ssr::one_shot_render(source.to_owned(), "IncorrectEntryPoint", None);
}

#[test]
#[should_panic]
fn empty_code() {
    let source = r##""##;

    let _ = Ssr::one_shot_render(source.to_owned(), "SSR", None);
}

#[test]
fn pass_param_to_function() {
    let props = r#"{"Hello world"}"#;

    let accept_params_source =
        r##"var SSR = {x: (params) => "These are our parameters: " + params};"##.to_string();

    let result = Ssr::one_shot_render(accept_params_source.clone(), "SSR", Some(&props));

    assert_eq!(result, "These are our parameters: {\"Hello world\"}");

    let no_params_source = r##"var SSR = {x: () => "I don't accept params"};"##.to_string();

    let result2 = Ssr::one_shot_render(no_params_source, "SSR", Some(&props));

    assert_eq!(result2, "I don't accept params");

    let result3 = Ssr::one_shot_render(accept_params_source, "SSR", None);

    assert_eq!(result3, "These are our parameters: ");
}

#[test]
fn render_simple_html() {
    let source = r##"var SSR = {x: () => "<html></html>"};"##;

    let html = Ssr::one_shot_render(source.to_owned(), "SSR", None);

    assert_eq!(html, "<html></html>");

    //Prevent missing semicolon
    let source2 = r##"var SSR = {x: () => "<html></html>"}"##;

    let html2 = Ssr::one_shot_render(source2.to_owned(), "SSR", None);

    assert_eq!(html2, "<html></html>");
}

#[test]
fn render_from_struct_instance() {
    let js = Ssr::new(
        r##"var SSR = {x: () => "<html></html>"};"##.to_string(),
        "SSR",
    );

    assert_eq!(js.render_to_string(None), "<html></html>");
    assert_eq!(
        js.render_to_string(Some(r#"{"Hello world"}"#)),
        "<html></html>"
    );

    let js2 = Ssr::new(
        r##"var SSR = {x: () => "I don't accept params"};"##.to_string(),
        "SSR",
    );

    assert_eq!(js2.render_to_string(None), "I don't accept params");
}
