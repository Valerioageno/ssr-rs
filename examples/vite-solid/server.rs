use actix_files as fs;
use actix_web::{get, http::StatusCode, App, HttpResponse, HttpServer};
use ssr_rs::Ssr;
use std::cell::RefCell;
use std::fs::read_to_string;
use std::path::Path;

thread_local! {
    static SSR: RefCell<Ssr<'static, 'static>> = RefCell::new(
        Ssr::from(
            read_to_string(Path::new("./dist/server/server-entry.js").to_str().unwrap()).unwrap(),
            ""
        ).unwrap()
    )
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    Ssr::create_platform();
    HttpServer::new(|| {
        App::new()
            .service(index)
            // Serve static files from /client/ directory
            .service(fs::Files::new("/client", "./dist/client/").show_files_listing())
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

#[get("/")]
async fn index() -> HttpResponse {
    let result = SSR.with(|ssr| ssr.borrow_mut().render_to_string(None).unwrap());

    // Parse the JSON response from server-entry
    let parsed: serde_json::Value = serde_json::from_str(&result)
        .unwrap_or_else(|_| serde_json::json!({"html": result, "hydrationScript": ""}));

    let html = parsed["html"].as_str().unwrap_or(&result);
    let hydration_script = parsed["hydrationScript"].as_str().unwrap_or("");

    // SolidJS returns HTML directly, not JSON like Svelte
    let full_html = format!(
        r#"<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="stylesheet" href="/client/assets/main.css">
        <link rel="icon" type="image/svg+xml" href="/client/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + Solid + TS</title>
      </head>
      <body>
        <div id="root">{}</div>
        {}
        <script type="module" src="/client/main.js"></script>
      </body>
    </html>"#,
        html, hydration_script
    );

    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body(full_html)
}
