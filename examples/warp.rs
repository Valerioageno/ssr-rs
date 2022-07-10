#![deny(warnings)]
use ssr_rs::Ssr;
use std::fs::read_to_string;
use warp::{http::Response, Filter};

#[tokio::main]
async fn main() {
    let source = read_to_string("./client/dist/ssr/index.js").unwrap();

    let js = Ssr::new(source, "SSR");
    let html = warp::path::end().map(move || Response::builder().body(js.render_to_string(None)));

    let css = warp::path("styles").and(warp::fs::dir("./client/dist/ssr/styles/"));
    let scripts = warp::path("scripts").and(warp::fs::dir("./client/dist/client/"));
    let img = warp::path("images").and(warp::fs::dir("./client/dist/ssr/images/"));

    let routes = warp::get().and(html.or(css).or(scripts).or(img));

    warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;
}
