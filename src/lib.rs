pub fn render_to_string() -> &'static str {
    "<h1>Hello world!</h1>"
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
