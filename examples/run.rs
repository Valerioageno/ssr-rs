//This example exist just for develop purposes
use ssr_rs::Ssr;
use std::fs::read_to_string;
use v8;

fn main() {
    let source = read_to_string("./client/dist/ssr/index.js").unwrap();

    let platform = v8::new_default_platform(0, false).make_shared();
    v8::V8::initialize_platform(platform);
    v8::V8::initialize();

    let mut ssr = Ssr::from(source, "SSR");

    println!("{}", ssr.render_to_string(None));
    println!("{}", ssr.render_to_string(None));
}
