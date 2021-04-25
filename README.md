# 🚀  Rust server side rendering

[![Valerioageno](https://circleci.com/gh/Valerioageno/ssr-rs.svg?style=svg)](https://github.com/Valerioageno/ssr-rs)

The project aim to enable server side rendering on rust servers in the simplest and lightest way possible.

All logic is stored inside the `render_to_string()` function.

```rust
use ssr_rs::Ssr;

fn main() {
   let html = Ssr::render_to_string("./path/to/build.js", "entryPoint", "renderFunction", None);
    
    assert_eq!(html, "<!doctype html><html>...</html>".to_string());
}
```

Are included examples with the most famous server framework and a default frontend react app made using `npx create-react-app` with the typescript `--template` flag.

