use axum::{
    body::Body,
    extract::RawQuery,
    http::header,
    response::Response,
    routing::get,
    Router,
};
use ssr_rs::Ssr;
use std::cell::RefCell;
use std::convert::Infallible;
use tokio::sync::mpsc;
use tokio_stream::{wrappers::ReceiverStream, StreamExt};

// How many `<p>Row N</p>` chunks the bundle emits by default. Override per
// request with `?rows=N` (try a few million). The point of a big number is that
// the *document* grows without bound while the memory held at any instant does
// not — see `CHANNEL_CAP` below.
const DEFAULT_ROWS: usize = 100_000;

// The bounded channel between the render and the response body. Peak buffered
// output is capped at this many chunks *no matter how large the document is*,
// because `blocking_send` parks the render once the client falls behind. This
// cap is the whole demonstration: stream megabytes while holding kilobytes.
const CHANNEL_CAP: usize = 16;

// A self-contained streaming bundle so the example runs without a client build.
// The export is memory efficient *by construction*: it emits each row with
// `__ssr_write` and keeps nothing — there is no `let html = ""; html += ...`
// accumulator, so the V8 heap never holds more than one row at a time. That is
// what makes the whole pipeline O(chunk) instead of O(document).
//
// `props` carries the row count. Note the periodic `await Promise.resolve()`:
// completion is driven by pumping V8 **microtasks**, so promises work but a
// *macrotask* (e.g. `setTimeout`) would never progress.
const SOURCE: &str = r#"
var SSR = {
  renderStream: async (props) => {
    const rows = Number(props) || 1;
    __ssr_write("<!doctype html><html><head><meta charset=\"utf-8\">");
    __ssr_write("<title>Streaming SSR</title></head><body>");
    __ssr_write(`<h1>Streaming ${rows} rows</h1>`);
    for (let i = 1; i <= rows; i++) {
      __ssr_write(`<p>Row ${i}</p>`); // emitted and forgotten, never buffered
      if (i % 1000 === 0) await Promise.resolve(); // async yields still work mid-stream
    }
    __ssr_write("</body></html>");
  },
};
"#;

thread_local! {
    // One isolate per thread. The streaming render below runs on Tokio's
    // *blocking* pool, so each blocking thread lazily builds its own isolate
    // here the first time it serves a request — `Ssr` is `!Send`, so it can
    // never cross threads.
    static SSR: RefCell<Ssr<'static, 'static>> =
        RefCell::new(Ssr::from(SOURCE.to_string(), "SSR").unwrap());
}

#[tokio::main]
async fn main() {
    Ssr::create_platform();

    let app = Router::new().route("/", get(root));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    println!("Listening on http://127.0.0.1:8080");
    println!("Try:  curl -s 'http://127.0.0.1:8080/?rows=1000000' | wc -c");
    println!("(the response is many MB; the server holds at most {CHANNEL_CAP} chunks at once)");
    axum::serve(listener, app).await.unwrap();
}

async fn root(RawQuery(query): RawQuery) -> Response {
    let rows = query
        .as_deref()
        .and_then(|q| q.split('&').find_map(|kv| kv.strip_prefix("rows=")))
        .and_then(|v| v.parse::<usize>().ok())
        .unwrap_or(DEFAULT_ROWS);

    // The render forwards each chunk into this bounded channel; the response body
    // drains the other end, so chunks reach the client as they are produced —
    // and buffering is capped at `CHANNEL_CAP`, not the document size.
    let (tx, rx) = mpsc::channel::<String>(CHANNEL_CAP);

    // The streaming render is synchronous and `!Send`: it blocks its thread
    // while pumping V8 microtasks to completion. Run it on the blocking pool so
    // it never stalls an async worker, and return the streaming response
    // immediately — the body streams while this task is still rendering.
    tokio::task::spawn_blocking(move || {
        SSR.with(|ssr| {
            // Track the high-water mark of buffered chunks to make the bound
            // tangible. By construction it can never exceed `CHANNEL_CAP`,
            // regardless of `rows`.
            let mut peak_buffered = 0usize;

            // Lend a sink (a plain `FnMut(&str)` closure) to the render. It is
            // only borrowed for the call, so it can close over the channel
            // sender and `peak_buffered` directly — no `'static`/`Rc<RefCell<_>>`
            // dance. `blocking_send` applies backpressure: it parks here while
            // the channel is full instead of buffering ahead. A send error just
            // means the client hung up, so ignore it.
            let mut sink = |chunk: &str| {
                let _ = tx.blocking_send(chunk.to_owned());
                let buffered = tx.max_capacity() - tx.capacity();
                peak_buffered = peak_buffered.max(buffered);
            };

            ssr.borrow_mut()
                .streaming("__ssr_write")
                .unwrap()
                .render("renderStream", Some(&rows.to_string()), &mut sink)
                .unwrap();

            drop(sink); // release the borrows so we can read `peak_buffered`
            println!(
                "streamed {rows} rows; peak buffered chunks: {peak_buffered} / {CHANNEL_CAP} \
                 (memory stays bounded no matter how large the document is)"
            );
        });
        // `tx` drops here, closing the channel and ending the response stream.
    });

    let stream = ReceiverStream::new(rx).map(Ok::<String, Infallible>);

    Response::builder()
        .header(header::CONTENT_TYPE, "text/html; charset=utf-8")
        .body(Body::from_stream(stream))
        .unwrap()
}
