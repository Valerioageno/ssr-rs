#[allow(unused_imports)]
use criterion::{black_box, criterion_group, criterion_main, Criterion};
use serde_json;
use ssr_rs::Ssr;

pub fn bench_render_to_string_no_params(c: &mut Criterion) {
    c.bench_function("render_to_string_no_params", |b| {
        b.iter(|| Ssr::render_to_string("./client/dist/ssr/index.js", "SSR", "Index", None))
    });
}

pub fn bench_render_to_string_with_params(c: &mut Criterion) {
    let mock_props = r##"{
        "params": [
            "hello",
            "ciao",
            "こんにちは" 
        ]
    }"##;

    let json = serde_json::to_string(&mock_props).unwrap();

    c.bench_function("render_to_string_with_params", |b| {
        b.iter(|| Ssr::render_to_string("./client/dist/ssr/index.js", "SSR", "Index", Some(&json)))
    });
}

criterion_group!(
    benches,
    bench_render_to_string_no_params,
    bench_render_to_string_with_params
);
criterion_main!(benches);
