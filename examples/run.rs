//This example exist just for develop purposes
use ssr_rs::Ssr;

#[tokio::main]
async fn main() {
    const SOURCE: &str = include_str!("../client/dist/ssr/index.js");
    let entry_point = "SSR".into();
    let (ssr, receiver) = Ssr::new(SOURCE, entry_point);

    let fssr = ssr.clone();

    // Spawn the render worker
    std::thread::spawn(move || {
        ssr.clone()
            .listen(receiver)
            .map_err(|e| std::io::Error::new(std::io::ErrorKind::Other, format!("{}", e)))
    });

    println!("{}", fssr.render_to_string(None).await.unwrap())
}
