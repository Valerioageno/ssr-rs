#![doc(html_logo_url = "https://raw.githubusercontent.com/Valerioageno/ssr-rs/main/logo.png")]

//!
//! The project aims to enable server side rendering on rust servers in the simplest and lightest way possible.
//!
//! It use an embedded version of the v8 javascript engine (<a href="https://github.com/denoland/rusty_v8" target="_blank">rusty_v8</a>) to parse and evaluate a built bundle file and return a string with the rendered html.
//!
//! Currently it works with Webpack bundler v4.44.2.
//!
//!  # Getting started
//! ```toml
//! [dependencies]
//! ssr_rs = "0.3.0"
//! ```
//!
//!  # Example
//!
//! To render to string a bundled react project the application should perform the following
//! calls.
//!
//!
//! ```no_run
//! use ssr_rs::Ssr;
//! use std::fs::read_to_string;
//!
//! fn main() {
//!     Ssr::create_platform();
//!
//!     let source = read_to_string("./path/to/build.js").unwrap();
//!
//!     let mut js = Ssr::from(source, "entryPoint").unwrap();
//!
//!     let html = js.render_to_string(None).unwrap();
//!    
//!     assert_eq!(html, "<!doctype html><html>...</html>".to_string());
//! }
//! ```
//! Check how to use it with actix, rocket, warp and other frameworks <a href="https://github.com/Valerioageno/ssr-rs/tree/main/examples" target="_blank">here</a>.
//!
//!  # Example with initial props
//!
//! ```no_run
//! use ssr_rs::Ssr;
//! use std::fs::read_to_string;
//!
//! fn main() {
//!     Ssr::create_platform();
//!
//!     let props = r##"{
//!       "params": [
//!            "hello",
//!            "ciao",
//!            "こんにちは"
//!        ]
//!     }"##;
//!
//!     let source = read_to_string("./path/to/build.js").unwrap();
//!
//!     let mut js = Ssr::from(source, "entryPoint").unwrap();
//!
//!     let html = js.render_to_string(Some(&props)).unwrap();
//!    
//!     assert_eq!(html, "<!doctype html><html>...</html>".to_string());
//! }
//!```
//!
//! # Example with actix-web
//!
//! > Examples with different web frameworks are available in the <a href="https://github.com/Valerioageno/ssr-rs/blob/main/examples" target="_blank">examples</a> folder.
//!
//! Even though the V8 engine allows accessing the same `isolate` from different threads that is forbidden by this crate for two reasons:
//! 1. rusty_v8 library have not implemented yet the V8 Locker API. Accessing Ssr struct from a different thread will make the V8 engine to panic.
//! 2. Rendering HTML does not need shared state across threads.
//!
//!  For this reason parallel computation is a better choice. Following actix-web setup:
//!
//! ```rust
//! use actix_web::{get, http::StatusCode, App, HttpResponse, HttpServer};
//! use std::cell::RefCell;
//! use std::fs::read_to_string;
//!
//! use ssr_rs::Ssr;
//!
//! thread_local! {
//!    static SSR: RefCell<Ssr<'static, 'static>> = RefCell::new(
//!        Ssr::from(
//!            read_to_string("./client/dist/ssr/index.js").unwrap(),
//!            "SSR"
//!            ).unwrap()
//!    )
//!}
//!
//! #[actix_web::main]
//!async fn main() -> std::io::Result<()> {
//!    Ssr::create_platform();
//!
//!    HttpServer::new(|| {
//!        App::new()
//!            .service(index)
//!        })
//!        .bind("127.0.0.1:8080")?
//!        .run()
//!        .await
//! }
//!
//! #[get("/")]
//! async fn index() -> HttpResponse {
//!    let result = SSR.with(|ssr| ssr.borrow_mut().render_to_string(None).unwrap());
//!
//!    HttpResponse::build(StatusCode::OK)
//!        .content_type("text/html; charset=utf-8")
//!        .body(result)
//! }
//!```
mod ssr;

pub use ssr::Ssr;
