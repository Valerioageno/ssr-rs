# 🚀 Rust server side rendering

[![API](https://docs.rs/ssr_rs/badge.svg)](https://docs.rs/ssr_rs)
[![codecov](https://codecov.io/gh/Valerioageno/ssr-rs/branch/main/graph/badge.svg?token=O0CZIZAR7X)](https://codecov.io/gh/Valerioageno/ssr-rs)

The crate aims to enable server side rendering on rust servers in the simplest and lightest way possible.

It uses an embedded version of the [V8](https://v8.dev/) javascript engine (<a href="https://github.com/denoland/rusty_v8" target="_blank">rusty_v8</a>) to parse and evaluate a built bundle file and return a string with the rendered html.
> [!NOTE]
>  This project is the backbone of [tuono](https://github.com/Valerioageno/tuono); a fullstack react framework with built in SSR.

Currently it works with [Vite](https://vitejs.dev/), [Webpack](https://webpack.js.org/), [Rspack](https://www.rspack.dev/), [React 18](https://react.dev/), [Svelte 5](https://svelte.dev/) and [SolidJS](https://solidjs.com/) - Check the `examples/` folder.

> Check <a href="https://github.com/Valerioageno/ssr-rs/blob/main/benches">here</a> the benchmark results.

## Getting started

Add this to your `Cargo.toml`:

```bash
cargo add ssr_rs
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
// IIFE variable example | bundle.js -> See webpack-react example
var SSR = (() => ({renderToStringFn: (props) => "<html></html>"}))() // SSR is the entry point
```

```javascript
// Variable example | bundle.js -> See webpack-react example
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

## Streaming

`render` and `render_to_string` return the whole result at once. To **stream**
output as it is produced (e.g. flushing an HTML shell to the client before the
rest of the page is ready), opt in with [`Ssr::streaming`]. It installs a writer
global that a streaming bundle calls to emit each chunk, and hands back a
[`Streaming`] handle whose `render` invokes your sink for every chunk as the JS
produces it. Buffered rendering is unaffected — nothing is installed unless you
opt in.

The JS entry point emits chunks by calling the writer global you name (here
`__ssr_write`) and returns nothing:

```javascript
// bundle.js (IIFE, empty entryPoint)
(() => ({
  renderStream: async (props) => {
    __ssr_write("<!doctype html><html><body>");
    for (const row of await getRows(props)) {
      __ssr_write(`<div>${row}</div>`); // flushed as it is produced
    }
    __ssr_write("</body></html>");
  },
}))()
```

On the Rust side, opt into streaming and lend a **sink** to the render. A sink is
anything implementing [`StreamSink`] — and a plain `FnMut(&str)` closure already
does, via a blanket impl:

```rust
use ssr_rs::Ssr;
use std::fs::read_to_string;

fn main() {
    Ssr::create_platform();

    let source = read_to_string("./path/to/build.js").unwrap();
    let mut js = Ssr::from(source, "").unwrap();

    // Opt into streaming: install the `__ssr_write` writer global, then drive
    // the streaming export. The sink is called for every chunk as it is
    // produced; a rejected promise is surfaced as `SsrError::JsException`.
    let mut sink = |chunk: &str| print!("{chunk}");
    js.streaming("__ssr_write")
        .unwrap()
        .render("renderStream", None, &mut sink)
        .unwrap();
}
```

The sink is only **borrowed** for the duration of the render, so it need not be
`'static` and can mutate local state directly — no channel or `Rc<RefCell<_>>`
required. To collect the chunks locally, just push to a `Vec` on the stack:

```rust
# use ssr_rs::Ssr;
# fn f(mut js: Ssr) {
let mut chunks: Vec<String> = Vec::new();
{
    let mut sink = |chunk: &str| chunks.push(chunk.to_owned());
    js.streaming("__ssr_write")
        .unwrap()
        .render("renderStream", None, &mut sink)
        .unwrap();
}
// `sink` is dropped here, releasing its borrow of `chunks`.
assert!(!chunks.is_empty());
# }
```

For a reusable sink, implement [`StreamSink`] on your own type:

```rust
use ssr_rs::StreamSink;

struct HtmlWriter { /* a socket, a buffer, … */ }

impl StreamSink for HtmlWriter {
    fn write_chunk(&mut self, chunk: &str) {
        // forward `chunk` to your destination
    }
}
```

> Completion is driven by pumping V8 **microtasks**, so `async`/`await` works;
> JS that blocks on a *macrotask* (e.g. `setTimeout`) will not progress.

For an end-to-end HTTP example that streams chunks to the client as they are
produced, see [`examples/axum_streaming.rs`](examples/axum_streaming.rs) (run it
with `cargo run --example axum-streaming`).

[`Ssr::streaming`]: https://docs.rs/ssr_rs/latest/ssr_rs/struct.Ssr.html#method.streaming
[`Streaming`]: https://docs.rs/ssr_rs/latest/ssr_rs/struct.Streaming.html
[`StreamSink`]: https://docs.rs/ssr_rs/latest/ssr_rs/trait.StreamSink.html

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
- Add examples with other frontend frameworks (i.e. vue, quik)
- Add benchmark setup to test against Deno and Bun
- Explore support for V8 snapshots
- Explore js copilation to WASM (i.e. [javy](https://github.com/bytecodealliance/javy))

## License

This project is licensed under the MIT License - see the <a href="https://github.com/Valerioageno/ssr-rs/blob/main/LICENSE_MIT">LICENSE_MIT</a> || <a href="https://github.com/Valerioageno/ssr-rs/blob/main/LICENSE_APACHE">LICENSE_APACHE</a> file for more information.

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/Valerioageno/ssr-rs/main/logo.png">
</p>
