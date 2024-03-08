use actix_files as fs;
use actix_web::{get, http::StatusCode, App, HttpResponse, HttpServer};
use std::cell::RefCell;
use std::env;
use std::fs::read_to_string;
use std::path::Path;

use ssr_rs::Ssr;
use std::time::Instant;

thread_local! {
    static SSR: RefCell<Ssr<'static, 'static>> = RefCell::new(
            Ssr::from(
                read_to_string(Path::new("./dist/ssr/server-build.js").to_str().unwrap()).unwrap(),
                "Index"
                ).unwrap()
            )
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("{:?}", env::current_dir()?);

    Ssr::create_platform();

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
    let start = Instant::now();
    let result = SSR.with(|ssr| ssr.borrow_mut().render_to_string(None).unwrap());
    println!("Elapsed: {:?}", start.elapsed());

    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body(result)
}
