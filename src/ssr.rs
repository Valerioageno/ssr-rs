use futures::channel::oneshot::Sender;
use rusty_v8 as v8;
use std::collections::HashMap;
use v8::{Context, HandleScope};

#[derive(Clone)]
pub struct Ssr<'a> {
    pub inbox: std::sync::mpsc::Sender<SsrRequest>,
    source: &'a str,
    entry_point: &'a str,
}

pub type SsrRequest = (String, Sender<String>);

impl<'a> Ssr<'a> {
    pub fn listen(
        self,
        reciever: std::sync::mpsc::Receiver<SsrRequest>,
    ) -> Result<(), Box<dyn std::error::Error>> {
        //The isolate represents an isolated instance of the v8 engine
        //Object from one isolate must not be used in other isolates.
        let mut isolate: v8::OwnedIsolate = v8::Isolate::new(Default::default());

        //A stack-allocated class that governs a number of local handles.
        let mut handle_scope: HandleScope<()> = v8::HandleScope::new(&mut isolate);

        //A sandboxed execution context with its own set of built-in objects and functions.
        let context: v8::Local<Context> = v8::Context::new(&mut handle_scope);

        //Stack-allocated class which sets the execution context for all operations executed within a local scope.
        let mut scope = v8::ContextScope::new(&mut handle_scope, context);

        let code = v8::String::new(&mut scope, &format!("{};{}", self.source, self.entry_point))
            .expect("Strings are needed");

        let script =
            v8::Script::compile(&mut scope, code, None).expect("There aren't runnable scripts");

        let exports = script
            .run(&mut scope)
            .expect("Missing entry point. Is the bundle exported as a variable?");

        let object = exports.to_object(&mut scope).expect("There are no objects");
        let fn_map = Self::create_fn_map(&mut scope, object);
        Ok(while let Ok((props, out)) = reciever.recv() {
            let params: v8::Local<v8::Value> = match v8::String::new(&mut scope, &props) {
                Some(s) => s.into(),
                None => v8::undefined(&mut scope).into(),
            };

            let undef = v8::undefined(&mut scope).into();

            let mut rendered = String::new();

            for key in fn_map.keys() {
                let result = fn_map[key]
                    .call(&mut scope, undef, &[params])
                    .expect("Are provided all needed props?");

                let result = result.to_string(&mut scope).unwrap();

                rendered = format!("{}{}", rendered, result.to_rust_string_lossy(&mut scope));
            }
            out.send(rendered).unwrap();
        })
    }

    pub fn new(
        source: &'a str,
        entry_point: &'a str,
    ) -> (Self, std::sync::mpsc::Receiver<SsrRequest>) {
        Self::init_platform();
        let (inbox, inbox_out) = std::sync::mpsc::channel::<SsrRequest>();

        (
            Ssr {
                inbox,
                source,
                entry_point,
            },
            inbox_out,
        )
    }

    fn init_platform() {
        lazy_static! {
          static ref INIT_PLATFORM: () = {
              //Initialize a new V8 platform
              let platform = v8::new_default_platform(0, false).make_shared();
              v8::V8::initialize_platform(platform);
              v8::V8::initialize();
          };
        }

        lazy_static::initialize(&INIT_PLATFORM);
    }

    /// Evaluates the javascript source code passed and runs the render functions.
    /// Any initial params (if needed) must be passed as JSON.
    ///
    /// <a href="https://github.com/Valerioageno/ssr-rs/blob/main/examples/actix_with_initial_props.rs" target="_blank">Here</a> an useful example of how to use initial params with the actix framework.
    ///
    /// "enrty_point" is the variable name set from the frontend bundler used. <a href="https://github.com/Valerioageno/ssr-rs/blob/main/client/webpack.ssr.js" target="_blank">Here</a> an example from webpack.
    pub async fn render_to_string(
        &self,
        params: Option<&str>,
    ) -> Result<String, Box<dyn std::error::Error>> {
        {
            let (send, receive) = futures::channel::oneshot::channel::<String>();
            let sender = &self.inbox;
            sender.send((params.unwrap_or("").to_string(), send))?;

            Ok(receive.await?)
        }
    }

    fn create_fn_map<'b>(
        scope: &mut v8::ContextScope<'b, v8::HandleScope>,
        object: v8::Local<v8::Object>,
    ) -> HashMap<String, v8::Local<'b, v8::Function>> {
        let mut fn_map: HashMap<String, v8::Local<v8::Function>> = HashMap::new();

        if let Some(props) = object.get_own_property_names(scope) {
            fn_map = Some(props)
                .iter()
                .enumerate()
                .map(|(i, &p)| {
                    let name = p.get_index(scope, i as u32).unwrap();

                    //A HandleScope which first allocates a handle in the current scope which will be later filled with the escape value.
                    let mut scope = v8::EscapableHandleScope::new(scope);

                    let func = object.get(&mut scope, name).unwrap();

                    let func = unsafe { v8::Local::<v8::Function>::cast(func) };

                    (
                        name.to_string(&mut scope)
                            .unwrap()
                            .to_rust_string_lossy(&mut scope),
                        scope.escape(func),
                    )
                })
                .collect();
        }

        fn_map
    }
}
