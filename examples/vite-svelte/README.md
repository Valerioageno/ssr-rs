# Svelte-Salvo-SSR-template
It is a template for Svelte SSR with Salvo-rs and Vite.

1. Install npm dependencies:
```sh
pnpm install
```

2. Use vite to build svelte client JS and CSS:
```sh
pnpx vite build --config vite.client.config.js
```

3. Use vite to build svelte SSR JS:
```sh
pnpx vite build --config vite.ssr.config.js
```
4. Run Rust server:
```sh
cargo run
```
