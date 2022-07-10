use actix_files as fs;
use actix_web::{get, http::StatusCode, middleware::Logger, App, HttpResponse, HttpServer};
use std::fs::read_to_string;

use ssr_rs::Ssr;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
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

    // This is a benchmark example. Please refer to examples/shared_ssr.rs for a better solution.
    let js = Ssr::new(source, "SSR");
    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body(js.render_to_string(None))
}
