use actix_files as fs;
use actix_web::{get, http::StatusCode, middleware::Logger, web, App, HttpResponse, HttpServer};
use std::fs::read_to_string;
use std::sync::Mutex;

use ssr_rs::Ssr;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let source = read_to_string("./client/dist/ssr/index.js").unwrap();

    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    let platform = v8::new_default_platform(0, false).make_shared();
    v8::V8::initialize_platform(platform);
    v8::V8::initialize();

    let js = web::Data::new(Mutex::new(Ssr::from(
        "var SSR = {x: () => \"<html></html>\"};".to_string(),
        "SSR",
    )));

    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .app_data(js.clone())
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
async fn index<'a>(js: web::Data<Mutex<Ssr<'a, 'a>>>) -> HttpResponse {
    let mut runtime = js.lock().expect("Failed to get js runtime in handler");

    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body((*runtime).render_to_string(None))
}
