use std::sync::Mutex;

use actix_web::{get, http::StatusCode, middleware::Logger, web, App, HttpResponse, HttpServer};

use actix_files as fs;

use ssr_rs::Ssr;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var(
        "RUST_LOG",
        "actix_example=debug,actix_web=debug,actix_http=debug,actix_service=debug",
    );
    env_logger::init();
    const source: &str = include_str!("../client/dist/ssr/index.js");
    let entry_point = "SSR".into();
    let (ssr, receiver) = Ssr::new(source, entry_point);
    let issr = ssr.clone();

    let server = HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(issr.clone()))
            .wrap(Logger::default())
            .service(fs::Files::new("/styles", "client/dist/ssr/styles/").show_files_listing())
            .service(fs::Files::new("/images", "client/dist/ssr/images/").show_files_listing())
            .service(fs::Files::new("/scripts", "client/dist/client/").show_files_listing())
            .service(index)
    })
    .bind("0.0.0.0:8080")?
    .run();

    futures::try_join!(server, async {
        ssr.clone()
            .listen(receiver)
            .await
            .map_err(|e| std::io::Error::new(std::io::ErrorKind::Other, "test"))
    })
    .map(|_| ())
}

#[get("/")]
async fn index(ssr: web::Data<Ssr<'_>>) -> Result<HttpResponse, Box<dyn std::error::Error>> {
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

    let body = ssr.render_to_string(Some(&mock_props)).await?;
    Ok(HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body(body))
}
