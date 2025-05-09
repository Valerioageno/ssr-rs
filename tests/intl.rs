use ssr_rs::Ssr;
use std::sync::Once;

static INIT: Once = Once::new();

fn prepare() {
    INIT.call_once(|| {
        Ssr::create_platform();
    })
}

#[test]
fn it_supports_intl_namespace() {
    prepare();
    let mut js = Ssr::from(
        r##"var ENTRY = {x: () => {
            return Intl.DateTimeFormat().resolvedOptions().locale;
            }};"##
            .to_string(),
        "ENTRY",
    )
    .unwrap();

    let html = js.render_to_string(None).unwrap();

    assert_eq!(html, "en-US");
}
