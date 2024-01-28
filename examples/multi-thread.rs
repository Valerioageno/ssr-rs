use ssr_rs::Ssr;
use std::fs::read_to_string;
use std::sync::{Arc, Mutex};
use std::thread;
use v8;

fn main() {
    let source = read_to_string("./client/dist/ssr/index.js").unwrap();

    let platform = v8::new_default_platform(0, false).make_shared();
    v8::V8::initialize_platform(platform);
    v8::V8::initialize();

    let ssr = Arc::new(Mutex::new(Ssr::from(source, "SSR")));

    let threads: Vec<_> = (0..2)
        .map(|i| {
            let js = Arc::clone(&ssr);
            thread::spawn(move || {
                let mut executor = js.lock().expect("failed to lock mutex");
                println!("Thread #{i} started!");
                println!("result: {}", (*executor).render_to_string(None));
                println!("Thread #{i} finished!");
            })
        })
        .collect();

    for handle in threads {
        handle.join().unwrap();
    }
}
