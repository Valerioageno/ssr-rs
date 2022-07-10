//This example exist just for develop purposes
use ssr_rs::Ssr;
use std::fs::read_to_string;

fn main() {
    let source = read_to_string("./client/dist/ssr/index.js").unwrap();

    println!("{}", Ssr::one_shot_render(source, "SSR", None))
}
