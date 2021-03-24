use actix_web::{web, get, http::StatusCode, App, HttpServer, HttpResponse, Error};
use futures::{future::ok, stream::once};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
   
    HttpServer::new(|| {
        App::new()
        .service(index)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}


#[get("/")]
async fn index() -> HttpResponse {

    let body = once(ok::<_, Error>(web::Bytes::from(react_ssr::render_to_string())));

    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .streaming(body)
}