//This example exist just for develop purposes
use ssr_rs::SSREnvironment;

fn main() {
    let mut env = SSREnvironment::new(
        &std::fs::read_to_string("./client/dist/ssr/index.js").unwrap(),
        "SSR",
        "Index",
    );
    println!("{}", env.render(""))
}
