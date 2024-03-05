# Benchmarks

> Benchmarks have been performed using [wrk](https://github.com/wg/wrk)

> Benches refers to ssr_rs v0.3.0 

The main crate goal is to be blazingly fast (as the rest of the rust ecosystem). 
Following the outcome of the same application built and run by `actix-rs + ssr_rs` and by `node` with a fastify server.

The source code is in the <a href="https://github.com/Valerioageno/ssr-rs/blob/main/examples/webpack-react">examples/webpack-react</a> folder.

## Actix-rs + ssr_rs

```bash
$ cd examples/webpack-react
$ pnpm i && pnpm build:ssr
$ cargo run --example webpack
```

```bash
❯ wrk -t12 -c400 -d30s http://localhost:8080
Running 30s test @ http://localhost:8080
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.26ms    5.11ms 277.87ms   94.32%
    Req/Sec    22.27k     3.02k   31.52k    85.39%
  8011933 requests in 30.10s, 5.01GB read
Requests/sec: 266177.68
Transfer/sec:    170.33MB
``` 

## Node + fastify

```bash
$ cd examples/webpack-react
$ pnpm i && pnpm build:server
$ node dist/server/bundle.cjs
```

```bash
❯ wrk -t12 -c400 -d30s http://localhost:3000
Running 30s test @ http://localhost:3000
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    24.04ms  105.19ms   1.99s    98.28%
    Req/Sec     2.72k   519.60    11.72k    95.72%
  954264 requests in 30.06s, 662.52MB read
  Socket errors: connect 0, read 0, write 0, timeout 48
Requests/sec:  31740.30
Transfer/sec:     22.04MB
```

My computer setup:

CPU: Intel Core i5 13600KF

Memory: DDR5 32Gb 3000MHz CL36 Intel XMP

Benches ran on a WLS machine with Ubuntu installed
