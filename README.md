# 🚀  Rust server side rendering

[![Valerioageno](https://circleci.com/gh/Valerioageno/ssr-rs.svg?style=svg)](https://github.com/Valerioageno/ssr-rs)
[![API](https://docs.rs/ssr_rs/badge.svg)](https://docs.rs/ssr_rs)
[![codecov](https://codecov.io/gh/Valerioageno/ssr-rs/branch/main/graph/badge.svg?token=O0CZIZAR7X)](https://codecov.io/gh/Valerioageno/ssr-rs)

The project aims to enable server side rendering on rust servers in the simplest and lightest way possible.

It use an embedded version of the v8 javascript engine (<a href="https://github.com/denoland/rusty_v8" target="_blank">rusty_v8</a>) to parse and evaluate a built bundle file and return a string with the rendered html.

Currently it works with Webpack bundler v4.44.2; check it out  <a href="https://github.com/Valerioageno/reactix" target="_blank">here</a> a full project who use this crate.

## Getting started

Add this to your `Cargo.toml`:

```toml
[dependencies]
ssr_rs = "0.2.1"
```

## Example

The all logic is stored inside the `render_to_string()` function.

```rust
use ssr_rs::Ssr;
use std::fs::read_to_string;

fn main() {

    let source = read_to_string("./path/to/build.js").unwrap();

    let html = Ssr::render_to_string(&source, "entryPoint", None);
    
    assert_eq!(html, "<!doctype html><html>...</html>".to_string());
}
```

There are included examples with the most famous server frameworks and a default frontend react app made using `npx create-react-app` and the typescript `--template` flag. Check <a href="https://github.com/Valerioageno/ssr-rs/tree/main/client">here</a> the example ReactJS template.

## Example with initial props

```rust
use ssr_rs::Ssr;
use std::fs::read_to_string;
use serde_json;

fn main() {

    let mock_props = r##"{
        "params": [
            "hello",
            "ciao",
            "こんにちは" 
        ]
    }"##;

    let props = serde_json::to_string(&mock_props).unwrap();

    let source = read_to_string("./path/to/build.js").unwrap();

    let html = Ssr::render_to_string(&source, "entryPoint", Some(&props));
    
    assert_eq!(html, "<!doctype html><html>...</html>".to_string());
}
```
## Contributing

Any helps or suggestions will be appreciated.

<br>

<div style="text-align:center">
    <img src="https://raw.githubusercontent.com/Valerioageno/ssr-rs/main/logo.png">
</div>
