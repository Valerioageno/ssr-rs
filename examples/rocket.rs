#[macro_use]
extern crate rocket;
use rocket::response::content;
use rocket::{fs::FileServer, State};
use ssr_rs::Ssr;
use std::sync::mpsc::Sender;
use std::sync::{Arc, Mutex};

#[get("/")]
async fn index(ssr: &State<Arc<Mutex<Sender<ssr_rs::SsrRequest>>>>) -> content::Html<String> {
    let (send, receive) = futures::channel::oneshot::channel::<String>();
    let s = ssr.lock().unwrap().clone();
    s.send(("".to_string(), send)).unwrap();

    content::Html(receive.await.unwrap())
}

#[launch]
fn rocket() -> _ {
    const SOURCE: &str = include_str!("../client/dist/ssr/index.js");
    let entry_point = "SSR".into();
    let (ssr, receiver) = Ssr::new(SOURCE, entry_point);
    let i = ssr.inbox.clone();
    // Spawn the render-worker
    std::thread::spawn(move || {
        ssr.clone()
            .listen(receiver)
            .map_err(|e| std::io::Error::new(std::io::ErrorKind::Other, format!("{}", e)))
    });
    rocket::build()
        .manage(Arc::new(Mutex::new(i)))
        .mount("/styles", FileServer::from("./client/dist/ssr/styles"))
        .mount("/scripts", FileServer::from("./client/dist/client/"))
        .mount("/images", FileServer::from("./client/dist/ssr/images/"))
        .mount("/", routes![index])
}
