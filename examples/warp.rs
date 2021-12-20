#![deny(warnings)]
use ssr_rs::Ssr;
use std::sync::{mpsc::Sender, Arc, Mutex};
use warp::{http::Response, Filter};

fn with_sender<T: Send + Sync>(
    sender: Arc<Mutex<std::sync::mpsc::Sender<T>>>,
) -> impl Filter<Extract = (Arc<Mutex<std::sync::mpsc::Sender<T>>>,), Error = std::convert::Infallible>
       + Clone {
    warp::any().map(move || sender.clone())
}

#[tokio::main]
async fn main() {
    const SOURCE: &str = include_str!("../client/dist/ssr/index.js");
    let entry_point = "SSR".into();
    let (ssr, receiver) = Ssr::new(SOURCE, entry_point);
    let sender = ssr.inbox.clone();

    // Spawn the render worker
    std::thread::spawn(move || {
        ssr.clone()
            .listen(receiver)
            .map_err(|e| std::io::Error::new(std::io::ErrorKind::Other, format!("{}", e)))
    });

    let html = warp::path::end()
        .and(with_sender(Arc::new(Mutex::new(sender.clone()))))
        .and_then(
            move |sender: Arc<Mutex<Sender<ssr_rs::SsrRequest>>>| async move {
                let (send, receive) = futures::channel::oneshot::channel::<String>();
                let s = sender.lock().unwrap().clone();
                s.send(("".to_string(), send)).unwrap();
                let ren = receive.await;
                match ren {
                    Ok(res) => Ok(Response::builder().body(res)),
                    _ => Err(warp::reject::not_found()),
                }
            },
        );

    let css = warp::path("styles").and(warp::fs::dir("./client/dist/ssr/styles/"));
    let scripts = warp::path("scripts").and(warp::fs::dir("./client/dist/client/"));
    let img = warp::path("images").and(warp::fs::dir("./client/dist/ssr/images/"));

    let routes = warp::get().and(css.or(scripts).or(img).or(html));

    warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;
}
