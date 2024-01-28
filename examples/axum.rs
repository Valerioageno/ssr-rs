use axum::{extract::State, routing::get, Router};
use ssr_rs::Ssr;
use std::fs::read_to_string;
use std::sync::{Arc, Mutex};

#[tokio::main]
async fn main() {
    let source = read_to_string("./client/dist/ssr/index.js").unwrap();

    let platform = v8::new_default_platform(0, false).make_shared();
    v8::V8::initialize_platform(platform);
    v8::V8::initialize();

    let shared_state = Arc::new(Mutex::new(Ssr::from(source, "SSR")));
    // build our application with a single route
    let app = Router::new().route("/", get(root)).with_state(shared_state);

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn root(State(state): State<Arc<Mutex<Ssr<'_, '_>>>>) -> String {
    let mut st = state.lock().unwrap();
    (*st).render_to_string(None)
}
