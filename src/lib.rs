#![doc(html_logo_url = "https://raw.githubusercontent.com/Valerioageno/ssr-rs/main/logo.png")]

//!
//! The project aims to enable server side rendering on rust servers in the simplest and lightest way possible.
//!
//! It use an embedded version of the v8 javascript engine (<a href="https://github.com/denoland/rusty_v8" target="_blank">rusty_v8</a>) to parse and evaluate a built bundle file and return a string with the rendered html.
//!
//! Currently it works with Webpack bundler v4.44.2; check it out  <a href="https://github.com/Valerioageno/reactix" target="_blank">here</a> a full project who use this crate.
//!
//!  # Gettin started
//! ```toml
//! [dependencies]
//! ssr_rs = "0.3.0"
//! ```
//!
//!  # Example
//!
//! The whole logic is stored inside the <a href="./struct.Ssr.html#method.render_to_string">render_to_string()</a> function.
//!
//! ```no_run
//! use ssr_rs::Ssr;
//! use std::fs::read_to_string;
//!
//! fn main() {
//!     let source = read_to_string("./path/to/build.js").unwrap();
//!
//!     let js = Ssr::new(source, "entryPoint");
//!
//!     let html = js.render_to_string(None);
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
//!     let js = Ssr::new(source, "entryPoint");
//!
//!     let html = js.render_to_string(Some(&props));
//!    
//!     assert_eq!(html, "<!doctype html><html>...</html>".to_string());
//! }
//!```
//! It's also possible just run the logic in a single shot just with Ssr::one_shot_render()
//!
//! # Example single shot
//!
//! ```no_run
//! use ssr_rs::Ssr;
//! use std::fs::read_to_string;
//!
//! fn main() {
//!
//!     let source = read_to_string("./path/to/build.js").unwrap();
//!
//!     let html = Ssr::one_shot_render(source, "entryPoint", None);
//!
//!     assert_eq!(html, "<!doctype html><hmtl>...</html>".to_string());
//! }
//! ```

mod ssr;

pub use ssr::Ssr;
