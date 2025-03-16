use ssr_rs::Ssr;
use std::fs::read_to_string;
use std::sync::Once;

static INIT: Once = Once::new();

fn prepare() {
    INIT.call_once(|| {
        Ssr::create_platform();
    })
}

#[test]
fn renders_svelte_exported_as_iife() {
    prepare();

    let source = read_to_string("./tests/assets/svelte-4-iife.js").unwrap();

    let mut js = Ssr::from(source, "").unwrap();

    let html = js.render_to_string(None).unwrap();

    assert_eq!(html, "<div></div>");
}

#[test]
fn renders_svelte_5_exported_as_iife() {
    prepare();

    let source = read_to_string("./tests/assets/svelte-5-iife.js").unwrap();

    let mut js = Ssr::from(source, "").unwrap();

    let result = js.render_to_string(None).unwrap();
    let html_obj: serde_json::Value = serde_json::from_str(&result).unwrap();

    let head = html_obj["head"].as_str().unwrap_or("");
    let body = html_obj["body"].as_str().unwrap_or("");

    assert_eq!(head, "");
    // With SSR, Svelte 5 generates comments along with rendered output to track hydration internally
    assert_eq!(body, "<!--[--><div></div><!--]-->");
}
