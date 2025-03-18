(function(exports) {
  "use strict";
  const HYDRATION_START = "[";
  const HYDRATION_END = "]";
  var current_component = null;
  function push(fn) {
    current_component = { p: current_component, c: null, d: null };
  }
  function pop() {
    var component = (
      /** @type {Component} */
      current_component
    );
    var ondestroy = component.d;
    if (ondestroy) {
      on_destroy.push(...ondestroy);
    }
    current_component = component.p;
  }
  const BLOCK_OPEN = `<!--${HYDRATION_START}-->`;
  const BLOCK_CLOSE = `<!--${HYDRATION_END}-->`;
  let on_destroy = [];
  function props_id_generator(prefix) {
    let uid = 1;
    return () => `${prefix}s${uid++}`;
  }
  function render$1(component, options = {}) {
    const uid = props_id_generator(options.idPrefix ? options.idPrefix + "-" : "");
    const payload = {
      out: "",
      css: /* @__PURE__ */ new Set(),
      head: { title: "", out: "", css: /* @__PURE__ */ new Set(), uid },
      uid
    };
    const prev_on_destroy = on_destroy;
    on_destroy = [];
    payload.out += BLOCK_OPEN;
    if (options.context) {
      push();
      current_component.c = options.context;
    }
    component(payload, options.props ?? {}, {}, {});
    if (options.context) {
      pop();
    }
    payload.out += BLOCK_CLOSE;
    for (const cleanup of on_destroy) cleanup();
    on_destroy = prev_on_destroy;
    let head = payload.head.out + payload.head.title;
    for (const { hash, code } of payload.css) {
      head += `<style id="${hash}">${code}</style>`;
    }
    return {
      head,
      html: payload.out,
      body: payload.out
    };
  }
  function App($$payload) {
    $$payload.out += `<div></div>`;
  }
  function render() {
    const { head, body } = render$1(App);
    return JSON.stringify({ head, body });
  }
  exports.render = render;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
})({});
