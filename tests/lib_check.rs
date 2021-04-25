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
