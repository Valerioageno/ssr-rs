# Vite Solid.js SSR Example

This example demonstrates server-side rendering (SSR) with Solid.js using Vite and the `ssr-rs` Rust library.

## Setup

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. Build the client-side bundle:
   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   ```

3. Build the server-side bundle for SSR:
   ```bash
   npm run build:rust-ssr
   # or
   yarn build:rust-ssr
   # or
   pnpm build:rust-ssr
   ```

## Running the SSR Server

1. Make sure you have `ssr-rs` available in your Rust project
2. Build and run the Rust server:
   ```bash
   cargo run --example vite-solid
   ```

3. Visit `http://127.0.0.1:8080` to see the SSR-rendered Solid.js application

## Development

For development with hot module replacement (HMR):
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## How it Works

This example shows how to integrate Solid.js with the `ssr-rs` Rust library for server-side rendering:

1. **Client Build**: The regular Vite build creates the client-side bundle for the browser
2. **Server Build**: The SSR build (`build:rust-ssr`) creates a server bundle that exports a `renderToString` function
3. **Rust Integration**: The Rust server loads the server bundle and calls the render function to generate HTML
4. **Hydration**: The client-side JavaScript takes over once the page loads in the browser

## Key Files

- `src/server-entry.tsx` - Server-side entry point that exports the render function
- `src/main.tsx` - Client-side entry point for hydration
- `server.rs` - Rust server that serves the SSR-rendered HTML
- `vite.config.ts` - Vite configuration with SSR settings

## Solid.js SSR Notes

Solid.js provides built-in SSR support through the `renderToString` function from `solid-js/web`. The hydration process is automatic and works seamlessly with the server-rendered HTML.
