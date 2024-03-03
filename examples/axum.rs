use axum::{response::Html, routing::get, Router};
use ssr_rs::Ssr;
use std::cell::RefCell;
use std::fs::read_to_string;
use std::time::Instant;

thread_local! {
    static SSR: RefCell<Ssr<'static, 'static>> = RefCell::new(
            Ssr::from(
                read_to_string("./client/dist/ssr/index.js").unwrap(),
                "SSR"
                )
            )
}

#[tokio::main]
async fn main() {
    Ssr::create_platform();

    // build our application with a single route
    let app = Router::new().route("/", get(root));

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn root() -> Html<String> {
    let start = Instant::now();
    let result = SSR.with(|ssr| ssr.borrow_mut().render_to_string(None));
    println!("Elapsed: {:?}", start.elapsed());
    Html(result)
}
