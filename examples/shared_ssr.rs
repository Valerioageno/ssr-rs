use actix_files as fs;
use actix_web::{get, http::StatusCode, middleware::Logger, /*web,*/ App, HttpResponse, HttpServer};
use std::fs::read_to_string;

// use ssr_rs::SSREnvironment;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let _source = read_to_string("./client/dist/ssr/index.js").unwrap();

    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    // let env = SSREnvironment::new(&source, "SSR", "Index");
    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            // .app_data(web::Data::new(js.clone()))
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
async fn index<'a>(/* js: web::Data<Ssr<'a>> */) -> HttpResponse {
    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body("<html></html>")
}
