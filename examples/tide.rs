use ssr_rs::Ssr;
use std::fs::read_to_string;
use tide::{Request, Response};

#[async_std::main]
async fn main() -> tide::Result<()> {
    let mut app = tide::new();
    app.at("/styles/*").serve_dir("client/dist/ssr/styles/")?;
    app.at("/images/*").serve_dir("client/dist/ssr/images/")?;
    app.at("/scripts/*").serve_dir("client/dist/client/")?;
    app.at("/").get(return_html);
    app.listen("127.0.0.1:8080").await?;
    Ok(())
}

async fn return_html(_req: Request<()>) -> tide::Result {
    let source = read_to_string("./client/dist/ssr/index.js").unwrap();

    let html = Ssr::render_to_string(&source, "SSR", None);

    let response = Response::builder(200)
        .body(html)
        .content_type(tide::http::mime::HTML)
        .build();

    Ok(response)
}
