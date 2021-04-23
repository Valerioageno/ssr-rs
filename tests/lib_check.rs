use ssr_rs::Ssr;

#[test]
fn render_start_with_doctype() {
    assert!(
        Ssr::render_to_string("./client/dist_ssr/ssr.js", "SSR", "Index")
            .starts_with("<!doctype html>")
    )
}

#[test]
#[should_panic(expected = "file not found")]
fn if_the_file_not_exist() {
    Ssr::render_to_string("./wrong/file/path/bundle.js", "SSR", "Index");
}

#[test]
#[should_panic]
fn incorrect_ssr_function_entry_point() {
    Ssr::render_to_string("./client/dist_ssr/ssr.js", "Index", "SSR");
}

#[test]
#[should_panic]
fn incorrect_function_call() {
    Ssr::render_to_string("./client/dist_ssr/ssr.js", "SSR", "SSR");
}
