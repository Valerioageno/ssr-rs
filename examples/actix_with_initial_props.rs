use actix_web::{get, http::StatusCode, web, App, Error, HttpResponse, HttpServer};
use futures::{future::ok, stream::once};

use actix_files as fs;

use ssr_rs::Ssr;

use serde_json;

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
    let mock_props = r##"{
        "params": [
            "hello",
            "ciao",
            "こんにちは" 
        ]
    }"##;

    let json = serde_json::to_string(&mock_props).unwrap();

    let body = once(ok::<_, Error>(web::Bytes::from(Ssr::render_to_string(
        "./client/dist/ssr/index.js",
        "SSR",
        "Index",
        Some(&json),
    ))));

    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .streaming(body)
}
