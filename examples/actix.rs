use actix_files as fs;
use actix_web::{get, http::StatusCode, web, App, Error, HttpResponse, HttpServer};
use futures::{future::ok, stream::once};

use ssr_rs::Ssr;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    const SOURCE: &str = include_str!("../client/dist/ssr/index.js");
    let entry_point = "SSR".into();
    let (ssr, receiver) = Ssr::new(SOURCE, entry_point);
    let issr = ssr.clone();

    // Spawn the render-worker
    std::thread::spawn(move || {
        ssr.clone()
            .listen(receiver)
            .map_err(|e| std::io::Error::new(std::io::ErrorKind::Other, format!("{}", e)))
    });

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(issr.clone()))
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
async fn index(ssr: web::Data<Ssr<'_>>) -> Result<HttpResponse, Box<dyn std::error::Error>> {
    let body = once(ok::<_, Error>(web::Bytes::from(
        ssr.render_to_string(None).await?,
    )));

    Ok(HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .streaming(body))
}
