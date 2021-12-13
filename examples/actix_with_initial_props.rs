use actix_web::{get, http::StatusCode, App, HttpResponse, HttpServer};
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
    .bind("0.0.0.0:8080")?
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

    // The streaming approach is problematic; especially on Chrome
    // let body = once(ok::<_, Error>(web::Bytes::from(Ssr::render_to_string(
    //     &source,
    //     "SSR",
    //     Some(&mock_props),
    // ))));

    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body(Ssr::render_to_string(&source, "SSR", Some(&mock_props)))
}
