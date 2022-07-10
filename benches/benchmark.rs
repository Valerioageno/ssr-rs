#[allow(unused_imports)]
use criterion::{black_box, criterion_group, criterion_main, Criterion};
use ssr_rs::Ssr;
use std::fs::read_to_string;

pub fn bench_one_shot_render_no_params(c: &mut Criterion) {
    let source = read_to_string("./client/dist/ssr/index.js").unwrap();

    c.bench_function("render_to_string_no_params", |b| {
        b.iter(|| Ssr::one_shot_render(Box::new(&source), "SSR", None))
    });
}

pub fn bench_one_shot_render_with_params(c: &mut Criterion) {
    let mock_props = r##"{
        "params": [
            "hello",
            "ciao",
            "こんにちは" 
        ]
    }"##;

    let source = read_to_string("./client/dist/ssr/index.js").unwrap();

    c.bench_function("render_to_string_with_params", |b| {
        b.iter(|| Ssr::one_shot_render(Box::new(&source), "SSR", Some(&mock_props)))
    });
}

criterion_group!(
    benches,
    bench_one_shot_render_no_params,
    bench_one_shot_render_with_params
);
criterion_main!(benches);
