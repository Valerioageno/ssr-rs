use actix_web::{get, http::StatusCode, web, App, Error, HttpResponse, HttpServer};
use futures::{future::ok, stream::once};
use std::fs::read_to_string;

use actix_files as fs;

use ssr_rs::Ssr;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(fs::Files::new("/styles", "client/dist/ssr/styles/").show_files_listing())
            .service(fs::Files::new("/images", "client/dist/ssr/images/").show_files_listing())
            .service(fs::Files::new("/scripts", "client/dist/client/").show_files_listing())
            .service(index)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

#[get("/")]
async fn index() -> HttpResponse {
    let source = read_to_string("./client/dist/ssr/index.js").unwrap();

    let mock_props = r##"{
        "params": [
            "hello",
            "ciao",
            "こんにちは" 
        ]
    }"##;

    let body = once(ok::<_, Error>(web::Bytes::from(Ssr::render_to_string(
        &source,
        "SSR",
        Some(&mock_props),
    ))));

    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .streaming(body)
}
