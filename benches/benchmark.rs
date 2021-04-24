#[allow(unused_imports)]
use criterion::{black_box, criterion_group, criterion_main, Criterion};
use ssr_rs::Ssr;

pub fn bench_render_to_string_no_params(c: &mut Criterion) {
    c.bench_function("render_to_string_no_params", |b| {
        b.iter(|| Ssr::render_to_string("./client/dist/ssr/index.js", "SSR", "Index", None))
    });
}

pub fn bench_render_to_string_with_params(c: &mut Criterion) {
    c.bench_function("render_to_string_with_params", |b| {
        b.iter(|| {
            Ssr::render_to_string(
                "./client/dist/ssr/index.js",
                "SSR",
                "Index",
                Some(&"string".to_string()),
            )
        })
    });
}

criterion_group!(
    benches,
    bench_render_to_string_no_params,
    bench_render_to_string_with_params
);
criterion_main!(benches);
