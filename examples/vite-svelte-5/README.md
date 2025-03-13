# Svelte 5-Salvo-SSR-template

It is a template for Svelte 5 SSR with Salvo-rs and Vite.

1. Install npm dependencies:

```sh
pnpm install
```

2. Use vite to build svelte client JS and CSS:

```sh
pnpx vite build --config vite.client.config.js
```

or

```sh
pnpm run vite build:client
```

3. Use vite to build svelte SSR JS:

```sh
pnpx vite build --config vite.ssr.config.js
```

or

```sh
pnpm run vite build:ssr
```

4. Run Rust server:

```sh
cargo run
```

or

```sh
pnpm run preview
```
