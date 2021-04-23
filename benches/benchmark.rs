use criterion::{black_box, criterion_group, criterion_main, Criterion};
use ssr_rs::Ssr;

pub fn bench_render_to_string(c: &mut Criterion) {
    c.bench_function("render_to_string", |b| {
        b.iter(|| Ssr::render_to_string("./client/dist_ssr/ssr.js", "SSR", "Index"))
    });
}

criterion_group!(benches, bench_render_to_string);
criterion_main!(benches);
