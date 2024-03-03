//This example exist just for develop purposes
use ssr_rs::Ssr;
use std::fs::read_to_string;

fn main() {
    let source = read_to_string("./client/dist/ssr/index.js").unwrap();

    Ssr::create_platform();

    // This takes roughly 40ms
    let mut ssr = Ssr::from(source, "SSR").unwrap();

    // This takes roughly 0.5ms
    println!("{}", ssr.render_to_string(None).unwrap());
    println!("{}", ssr.render_to_string(None).unwrap());
}
