use ssr_rs::Ssr;
use std::cell::RefCell;
use std::fs::read_to_string;
use std::thread;
use std::time::Instant;

fn main() {
    Ssr::create_platform();

    thread_local! {
        static SSR: RefCell<Ssr<'static, 'static>> = RefCell::new(
                Ssr::from(
                    read_to_string("./client/dist/ssr/index.js").unwrap(),
                    "SSR"
                    )
                )
    }

    let threads: Vec<_> = (0..2)
        .map(|i| {
            thread::spawn(move || {
                println!("Thread #{i} started!");
                let start = Instant::now();
                println!(
                    "result: {}",
                    SSR.with(|ssr| ssr.borrow_mut().render_to_string(None))
                );
                println!(
                    "Thread #{i} finished! - Elapsed time: {:?}",
                    start.elapsed()
                );
            })
        })
        .collect();

    for handle in threads {
        handle.join().unwrap();
    }
}
