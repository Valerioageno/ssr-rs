# 🚀  Rust server side rendering

[![Valerioageno](https://circleci.com/gh/Valerioageno/ssr-rs.svg?style=svg)](https://github.com/Valerioageno/ssr-rs)

The project aims to enable server side rendering on rust servers in the simplest and lightest way possible.

The all logic is stored inside the `render_to_string()` function.

## Gettin started

Add this to your `Cargo.toml`:

```toml
[dependencies]
ssr_rs = "0.2.1"
```

## Example

```rust
use ssr_rs::Ssr;
use std::fs::read_to_string;

fn main() {

    let source = read_to_string("./path/to/build.js").unwrap();

    let html = Ssr::render_to_string(&source, "entryPoint", None);
    
    assert_eq!(html, "<!doctype html><html>...</html>".to_string());
}
```

There are included examples with the most famous server frameworks and a default frontend react app made using `npx create-react-app` and the typescript `--template` flag.

