use actix_files as fs;
use actix_web::{get, http::StatusCode, middleware::Logger, App, HttpResponse, HttpServer};
use std::cell::RefCell;
use std::fs::read_to_string;
use std::time::Instant;

use ssr_rs::Ssr;

thread_local! {
    static SSR: RefCell<Ssr<'static, 'static>> = RefCell::new(
            Ssr::from(
                read_to_string("./client/dist/ssr/index.js").unwrap(),
                "SSR"
                )
            )
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    Ssr::create_platform();

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
    let start = Instant::now();
    let result = SSR.with(|ssr| ssr.borrow_mut().render_to_string(None));
    println!("Elapsed: {:?}", start.elapsed());
    // This is a benchmark example. Please refer to examples/shared_ssr.rs for a better solution.
    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body(result)
}
