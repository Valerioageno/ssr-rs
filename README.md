# 🚀 Rust server side rendering

[![API](https://docs.rs/ssr_rs/badge.svg)](https://docs.rs/ssr_rs)
[![codecov](https://codecov.io/gh/Valerioageno/ssr-rs/branch/main/graph/badge.svg?token=O0CZIZAR7X)](https://codecov.io/gh/Valerioageno/ssr-rs)

The crate aims to enable server side rendering on rust servers in the simplest and lightest way possible.

It uses an embedded version of the [V8](https://v8.dev/) javascript engine (<a href="https://github.com/denoland/rusty_v8" target="_blank">rusty_v8</a>) to parse and evaluate a built bundle file and return a string with the rendered html.

> ℹ️ This project is the backbone of [tuono](https://github.com/Valerioageno/tuono); a fullstack react framework with built in server side rendering.

Currently it works with [Vite](https://vitejs.dev/), [Webpack](https://webpack.js.org/), [Rspack](https://www.rspack.dev/) and [React 18](https://react.dev/) - Check the examples folder.

> Check <a href="https://github.com/Valerioageno/ssr-rs/blob/main/benches">here</a> the benchmark results.

## Getting started

Add this to your `Cargo.toml`:

```toml
[dependencies]
ssr_rs = "0.5.4"
```

## Example

To render to string a bundled react project the application should perform the following
calls.

```rust
use ssr_rs::Ssr;
use std::fs::read_to_string;

fn main() {
    Ssr::create_platform();

    let source = read_to_string("./path/to/build.js").unwrap();

    let mut js = Ssr::new(&source, "entryPoint").unwrap();

    let html = js.render_to_string(None).unwrap();
    
    assert_eq!(html, "<!doctype html><html>...</html>".to_string());
}
```

## What is the "entryPoint"?

The `entryPoint` could be either:
- the function that returns an object with one or more properties that are functions that when called return the rendered result 
- the object itself with one or more properties that are functions that when called return the rendered result

In case the bundled JS is an IIFE or the plain object the `entryPoint` is an empty string.

```javascript
// IIFE example | bundle.js -> See vite-react example
(() => ({ renderToStringFn: (props) => "<html></html>" }))() // The entryPoint is an empty string
```

```javascript
// Plain object example | bundle.js 
({renderToStringFn: (props) => "<html></html>"}); // The entryPoint is an empty string
```

```javascript
// IIFE varible example | bundle.js -> See webpack-react example
var SSR = (() => ({renderToStringFn: (props) => "<html></html>"}))() // SSR is the entry point
```

```javascript
// Varible example | bundle.js -> See webpack-react example
var SSR = {renderToStringFn: (props) => "<html></html>"}; // SSR is the entry point
```

> The export results are managed by the bundler directly.

## Example with initial props

```rust
use ssr_rs::Ssr;
use std::fs::read_to_string;

fn main() {
    Ssr::create_platform();

    let props = r##"{
        "params": [
            "hello",
            "ciao",
            "こんにちは"
        ]
    }"##;

    let source = read_to_string("./path/to/build.js").unwrap();

    let mut js = Ssr::new(&source, "entryPoint").unwrap();

    let html = js.render_to_string(Some(&props)).unwrap();

    assert_eq!(html, "<!doctype html><html>...</html>".to_string());
}
```

## Example with actix-web

> Examples with different web frameworks are available in the <a href="https://github.com/Valerioageno/ssr-rs/blob/main/examples" target="_blank">examples</a> folder.

Even though the V8 engine allows accessing the same `isolate` from different threads that is forbidden by this crate for two reasons:

1. rusty_v8 library have not implemented yet the V8 Locker API. Accessing Ssr struct from a different thread will make the V8 engine to panic.
2. Rendering HTML does not need shared state across threads.

For the reasons above parallel computation is a better choice. Following actix-web setup:

```rust
use actix_web::{get, http::StatusCode, App, HttpResponse, HttpServer};
use std::cell::RefCell;
use std::fs::read_to_string;

use ssr_rs::Ssr;

thread_local! {
    static SSR: RefCell<Ssr<'static, 'static>> = RefCell::new(
            Ssr::from(
                read_to_string("./client/dist/ssr/index.js").unwrap(),
                "SSR"
                ).unwrap()
            )
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    Ssr::create_platform();

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
    let result = SSR.with(|ssr| ssr.borrow_mut().render_to_string(None).unwrap());

    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body(result)
}
```

## Contributing

Any helps or suggestions will be appreciated.

Known TODOs: 
- Add examples with other rust backend frameworks
- Add examples with other frontend frameworks (i.e. vue, quik, solid, svelte)
- Add benchmark setup to test against Deno and Bun
- Explore support for V8 snapshots
- Explore js copilation to WASM (i.e. [javy](https://github.com/bytecodealliance/javy))

## License

This project is licensed under the MIT License - see the <a href="https://github.com/Valerioageno/ssr-rs/blob/main/LICENSE_MIT">LICENSE_MIT</a> || <a href="https://github.com/Valerioageno/ssr-rs/blob/main/LICENSE_APACHE">LICENSE_APACHE</a> file for more information.

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/Valerioageno/ssr-rs/main/logo.png">
</p>
