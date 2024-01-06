//This example exist just for develop purposes
use ssr_rs::Ssr;
use std::fs::read_to_string;
use v8;

fn main() {
    let source = read_to_string("./client/dist/ssr/index.js").unwrap();

    let platform = v8::new_default_platform(0, false).make_shared();
    v8::V8::initialize_platform(platform);
    v8::V8::initialize();

    let mut isolate = v8::Isolate::new(v8::CreateParams::default());
    let mut handle_scope = v8::HandleScope::new(&mut isolate);

    let mut ssr = Ssr::from(&mut handle_scope, source, "SSR");

    println!("{}", ssr.render_to_string(None));
}
