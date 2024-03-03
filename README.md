# 🚀 Rust server side rendering

[![API](https://docs.rs/ssr_rs/badge.svg)](https://docs.rs/ssr_rs)
[![codecov](https://codecov.io/gh/Valerioageno/ssr-rs/branch/main/graph/badge.svg?token=O0CZIZAR7X)](https://codecov.io/gh/Valerioageno/ssr-rs)

The project aims to enable server side rendering on rust servers in the simplest and lightest way possible.

It use an embedded version of the v8 javascript engine (<a href="https://github.com/denoland/rusty_v8" target="_blank">rusty_v8</a>) to parse and evaluate a built bundle file and return a string with the rendered html.

Currently it works with Webpack bundler v5.65.0; check it out <a href="https://github.com/Valerioageno/reactix" target="_blank">here</a> a full project who use this crate.

## Getting started

Add this to your `Cargo.toml`:

```toml
[dependencies]
ssr_rs = "0.3.0"
```

## Example

To render to string a bundled react project the application should perform the following
calls.

```rust
use ssr_rs::Ssr;
use std::fs::read_to_string;

fn main() {
    Ssr::create_platform();

    let source = read_to_string("./path/to/build.js").unwrap();

    let mut js = Ssr::new(&source, "entryPoint");

    let html = js.render_to_string(None);
    
    assert_eq!(html, "<!doctype html><html>...</html>".to_string());
}
```

There are included examples with the most famous server frameworks and a default frontend react app made using `npx create-react-app` and the typescript `--template` flag. Check <a href="https://github.com/Valerioageno/ssr-rs/tree/main/client">here</a> the example ReactJS template.

## Example with initial props

```rust
use ssr_rs::Ssr;
use std::fs::read_to_string;

fn main() {

    let props = r##"{
        "params": [
            "hello",
            "ciao",
            "こんにちは"
        ]
    }"##;

    let source = read_to_string("./path/to/build.js").unwrap();

    let mut js = Ssr::new(&source, "entryPoint");

    let html = js.render_to_string(Some(&props));

    assert_eq!(html, "<!doctype html><html>...</html>".to_string());
}
```

## Contributing

Any helps or suggestions will be appreciated.

## License

This project is licensed under the MIT License - see the <a href="https://github.com/Valerioageno/ssr-rs/blob/main/LICENSE_MIT">LICENSE_MIT</a> || <a href="https://github.com/Valerioageno/ssr-rs/blob/main/LICENSE_APACHE">LICENSE_APACHE</a> file for more information.

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/Valerioageno/ssr-rs/main/logo.png">
</p>
