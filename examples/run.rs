//This example exist just for develop purposes
use ssr_rs::Ssr;

fn main() {
    println!(
        "{}",
        Ssr::render_to_string("./client/dist_ssr/ssr.js", "SSR", "Index", None)
    )
}
