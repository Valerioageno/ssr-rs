#[macro_use]
extern crate rocket;
use rocket::fs::FileServer;
use rocket::response::content;
use ssr_rs::SSREnvironment;

#[get("/")]
fn index() -> content::RawHtml<String> {
    let mut env = SSREnvironment::new(&std::fs::read_to_string("./client/dist/ssr/index.js").unwrap(), "SSR", "Index");

    content::RawHtml(env.render(""))
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/styles", FileServer::from("./client/dist/ssr/styles"))
        .mount("/scripts", FileServer::from("./client/dist/client/"))
        .mount("/images", FileServer::from("./client/dist/ssr/images/"))
        .mount("/", routes![index])
}
