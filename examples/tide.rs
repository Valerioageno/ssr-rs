use ssr_rs::Ssr;
use std::cell::RefCell;
use std::fs::read_to_string;
use std::time::Instant;
use tide::{Request, Response};

thread_local! {
    static SSR: RefCell<Ssr<'static, 'static>> = RefCell::new(
            Ssr::from(
                read_to_string("./client/dist/ssr/index.js").unwrap(),
                "SSR"
                ).unwrap()
            )
}

#[async_std::main]
async fn main() -> tide::Result<()> {
    Ssr::create_platform();
    let mut app = tide::new();
    app.at("/styles/*").serve_dir("client/dist/ssr/styles/")?;
    app.at("/images/*").serve_dir("client/dist/ssr/images/")?;
    app.at("/scripts/*").serve_dir("client/dist/client/")?;
    app.at("/").get(return_html);
    app.listen("127.0.0.1:8080").await?;
    Ok(())
}

async fn return_html(_req: Request<()>) -> tide::Result {
    let start = Instant::now();
    let html = SSR.with(|ssr| ssr.borrow_mut().render_to_string(None));
    println!("Elapsed: {:?}", start.elapsed());

    let response = Response::builder(200)
        .body(html.unwrap())
        .content_type(tide::http::mime::HTML)
        .build();

    Ok(response)
}
