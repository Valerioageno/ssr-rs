use actix_files as fs;
use actix_web::{get, http::StatusCode, web, App, HttpResponse, HttpServer};
use std::fs::read_to_string;

use ssr_rs::Ssr;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let source = read_to_string("./client/dist/ssr/index.js").unwrap();

    let js = Ssr::new(source, "SSR");
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(js.clone()))
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
async fn index<'a>(js: web::Data<Ssr<'a>>) -> HttpResponse {
    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body(js.render_to_string(None))
}
