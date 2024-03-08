(function (exports) {
  "use strict";
  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production_min = {};
  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  function toObject(val) {
    if (val === null || val === void 0) {
      throw new TypeError(
        "Object.assign cannot be called with null or undefined",
      );
    }
    return Object(val);
  }
  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }
      var test1 = new String("abc");
      test1[5] = "de";
      if (Object.getOwnPropertyNames(test1)[0] === "5") {
        return false;
      }
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2["_" + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function (n2) {
        return test2[n2];
      });
      if (order2.join("") !== "0123456789") {
        return false;
      }
      var test3 = {};
      "abcdefghijklmnopqrst".split("").forEach(function (letter) {
        test3[letter] = letter;
      });
      if (
        Object.keys(Object.assign({}, test3)).join("") !==
        "abcdefghijklmnopqrst"
      ) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  var objectAssign = shouldUseNative()
    ? Object.assign
    : function (target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);
          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }
          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }
        return to;
      };
  var react = { exports: {} };
  var react_production_min = {};
  /** @license React v17.0.2
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var l$1 = objectAssign,
    n$1 = 60103,
    p$2 = 60106;
  react_production_min.Fragment = 60107;
  react_production_min.StrictMode = 60108;
  react_production_min.Profiler = 60114;
  var q$2 = 60109,
    r$1 = 60110,
    t = 60112;
  react_production_min.Suspense = 60113;
  var u$1 = 60115,
    v = 60116;
  if ("function" === typeof Symbol && Symbol.for) {
    var w = Symbol.for;
    n$1 = w("react.element");
    p$2 = w("react.portal");
    react_production_min.Fragment = w("react.fragment");
    react_production_min.StrictMode = w("react.strict_mode");
    react_production_min.Profiler = w("react.profiler");
    q$2 = w("react.provider");
    r$1 = w("react.context");
    t = w("react.forward_ref");
    react_production_min.Suspense = w("react.suspense");
    u$1 = w("react.memo");
    v = w("react.lazy");
  }
  var x = "function" === typeof Symbol && Symbol.iterator;
  function y(a) {
    if (null === a || "object" !== typeof a) return null;
    a = (x && a[x]) || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  function z$1(a) {
    for (
      var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a,
        c = 1;
      c < arguments.length;
      c++
    )
      b += "&args[]=" + encodeURIComponent(arguments[c]);
    return (
      "Minified React error #" +
      a +
      "; visit " +
      b +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var A = {
      isMounted: function () {
        return false;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    B$1 = {};
  function C(a, b, c) {
    this.props = a;
    this.context = b;
    this.refs = B$1;
    this.updater = c || A;
  }
  C.prototype.isReactComponent = {};
  C.prototype.setState = function (a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a)
      throw Error(z$1(85));
    this.updater.enqueueSetState(this, a, b, "setState");
  };
  C.prototype.forceUpdate = function (a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };
  function D$1() {}
  D$1.prototype = C.prototype;
  function E$1(a, b, c) {
    this.props = a;
    this.context = b;
    this.refs = B$1;
    this.updater = c || A;
  }
  var F$1 = (E$1.prototype = new D$1());
  F$1.constructor = E$1;
  l$1(F$1, C.prototype);
  F$1.isPureReactComponent = true;
  var G = { current: null },
    H = Object.prototype.hasOwnProperty,
    I$1 = { key: true, ref: true, __self: true, __source: true };
  function J$1(a, b, c) {
    var e,
      d = {},
      k = null,
      h2 = null;
    if (null != b)
      for (e in (void 0 !== b.ref && (h2 = b.ref),
      void 0 !== b.key && (k = "" + b.key),
      b))
        H.call(b, e) && !I$1.hasOwnProperty(e) && (d[e] = b[e]);
    var g2 = arguments.length - 2;
    if (1 === g2) d.children = c;
    else if (1 < g2) {
      for (var f2 = Array(g2), m2 = 0; m2 < g2; m2++)
        f2[m2] = arguments[m2 + 2];
      d.children = f2;
    }
    if (a && a.defaultProps)
      for (e in ((g2 = a.defaultProps), g2)) void 0 === d[e] && (d[e] = g2[e]);
    return {
      $$typeof: n$1,
      type: a,
      key: k,
      ref: h2,
      props: d,
      _owner: G.current,
    };
  }
  function K$1(a, b) {
    return {
      $$typeof: n$1,
      type: a.type,
      key: b,
      ref: a.ref,
      props: a.props,
      _owner: a._owner,
    };
  }
  function L(a) {
    return "object" === typeof a && null !== a && a.$$typeof === n$1;
  }
  function escape(a) {
    var b = { "=": "=0", ":": "=2" };
    return (
      "$" +
      a.replace(/[=:]/g, function (a2) {
        return b[a2];
      })
    );
  }
  var M$1 = /\/+/g;
  function N$1(a, b) {
    return "object" === typeof a && null !== a && null != a.key
      ? escape("" + a.key)
      : b.toString(36);
  }
  function O$1(a, b, c, e, d) {
    var k = typeof a;
    if ("undefined" === k || "boolean" === k) a = null;
    var h2 = false;
    if (null === a) h2 = true;
    else
      switch (k) {
        case "string":
        case "number":
          h2 = true;
          break;
        case "object":
          switch (a.$$typeof) {
            case n$1:
            case p$2:
              h2 = true;
          }
      }
    if (h2)
      return (
        (h2 = a),
        (d = d(h2)),
        (a = "" === e ? "." + N$1(h2, 0) : e),
        Array.isArray(d)
          ? ((c = ""),
            null != a && (c = a.replace(M$1, "$&/") + "/"),
            O$1(d, b, c, "", function (a2) {
              return a2;
            }))
          : null != d &&
            (L(d) &&
              (d = K$1(
                d,
                c +
                  (!d.key || (h2 && h2.key === d.key)
                    ? ""
                    : ("" + d.key).replace(M$1, "$&/") + "/") +
                  a,
              )),
            b.push(d)),
        1
      );
    h2 = 0;
    e = "" === e ? "." : e + ":";
    if (Array.isArray(a))
      for (var g2 = 0; g2 < a.length; g2++) {
        k = a[g2];
        var f2 = e + N$1(k, g2);
        h2 += O$1(k, b, c, f2, d);
      }
    else if (((f2 = y(a)), "function" === typeof f2))
      for (a = f2.call(a), g2 = 0; !(k = a.next()).done; )
        (k = k.value), (f2 = e + N$1(k, g2++)), (h2 += O$1(k, b, c, f2, d));
    else if ("object" === k)
      throw (
        ((b = "" + a),
        Error(
          z$1(
            31,
            "[object Object]" === b
              ? "object with keys {" + Object.keys(a).join(", ") + "}"
              : b,
          ),
        ))
      );
    return h2;
  }
  function P$1(a, b, c) {
    if (null == a) return a;
    var e = [],
      d = 0;
    O$1(a, e, "", "", function (a2) {
      return b.call(c, a2, d++);
    });
    return e;
  }
  function Q$1(a) {
    if (-1 === a._status) {
      var b = a._result;
      b = b();
      a._status = 0;
      a._result = b;
      b.then(
        function (b2) {
          0 === a._status &&
            ((b2 = b2.default), (a._status = 1), (a._result = b2));
        },
        function (b2) {
          0 === a._status && ((a._status = 2), (a._result = b2));
        },
      );
    }
    if (1 === a._status) return a._result;
    throw a._result;
  }
  var R$1 = { current: null };
  function S$1() {
    var a = R$1.current;
    if (null === a) throw Error(z$1(321));
    return a;
  }
  var T$1 = {
    ReactCurrentDispatcher: R$1,
    ReactCurrentBatchConfig: { transition: 0 },
    ReactCurrentOwner: G,
    IsSomeRendererActing: { current: false },
    assign: l$1,
  };
  react_production_min.Children = {
    map: P$1,
    forEach: function (a, b, c) {
      P$1(
        a,
        function () {
          b.apply(this, arguments);
        },
        c,
      );
    },
    count: function (a) {
      var b = 0;
      P$1(a, function () {
        b++;
      });
      return b;
    },
    toArray: function (a) {
      return (
        P$1(a, function (a2) {
          return a2;
        }) || []
      );
    },
    only: function (a) {
      if (!L(a)) throw Error(z$1(143));
      return a;
    },
  };
  react_production_min.Component = C;
  react_production_min.PureComponent = E$1;
  react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T$1;
  react_production_min.cloneElement = function (a, b, c) {
    if (null === a || void 0 === a) throw Error(z$1(267, a));
    var e = l$1({}, a.props),
      d = a.key,
      k = a.ref,
      h2 = a._owner;
    if (null != b) {
      void 0 !== b.ref && ((k = b.ref), (h2 = G.current));
      void 0 !== b.key && (d = "" + b.key);
      if (a.type && a.type.defaultProps) var g2 = a.type.defaultProps;
      for (f2 in b)
        H.call(b, f2) &&
          !I$1.hasOwnProperty(f2) &&
          (e[f2] = void 0 === b[f2] && void 0 !== g2 ? g2[f2] : b[f2]);
    }
    var f2 = arguments.length - 2;
    if (1 === f2) e.children = c;
    else if (1 < f2) {
      g2 = Array(f2);
      for (var m2 = 0; m2 < f2; m2++) g2[m2] = arguments[m2 + 2];
      e.children = g2;
    }
    return {
      $$typeof: n$1,
      type: a.type,
      key: d,
      ref: k,
      props: e,
      _owner: h2,
    };
  };
  react_production_min.createContext = function (a, b) {
    void 0 === b && (b = null);
    a = {
      $$typeof: r$1,
      _calculateChangedBits: b,
      _currentValue: a,
      _currentValue2: a,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
    };
    a.Provider = { $$typeof: q$2, _context: a };
    return (a.Consumer = a);
  };
  react_production_min.createElement = J$1;
  react_production_min.createFactory = function (a) {
    var b = J$1.bind(null, a);
    b.type = a;
    return b;
  };
  react_production_min.createRef = function () {
    return { current: null };
  };
  react_production_min.forwardRef = function (a) {
    return { $$typeof: t, render: a };
  };
  react_production_min.isValidElement = L;
  react_production_min.lazy = function (a) {
    return { $$typeof: v, _payload: { _status: -1, _result: a }, _init: Q$1 };
  };
  react_production_min.memo = function (a, b) {
    return { $$typeof: u$1, type: a, compare: void 0 === b ? null : b };
  };
  react_production_min.useCallback = function (a, b) {
    return S$1().useCallback(a, b);
  };
  react_production_min.useContext = function (a, b) {
    return S$1().useContext(a, b);
  };
  react_production_min.useDebugValue = function () {};
  react_production_min.useEffect = function (a, b) {
    return S$1().useEffect(a, b);
  };
  react_production_min.useImperativeHandle = function (a, b, c) {
    return S$1().useImperativeHandle(a, b, c);
  };
  react_production_min.useLayoutEffect = function (a, b) {
    return S$1().useLayoutEffect(a, b);
  };
  react_production_min.useMemo = function (a, b) {
    return S$1().useMemo(a, b);
  };
  react_production_min.useReducer = function (a, b, c) {
    return S$1().useReducer(a, b, c);
  };
  react_production_min.useRef = function (a) {
    return S$1().useRef(a);
  };
  react_production_min.useState = function (a) {
    return S$1().useState(a);
  };
  react_production_min.version = "17.0.2";
  {
    react.exports = react_production_min;
  }
  var reactExports = react.exports;
  /** @license React v17.0.2
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var f = reactExports,
    g = 60103;
  reactJsxRuntime_production_min.Fragment = 60107;
  if ("function" === typeof Symbol && Symbol.for) {
    var h = Symbol.for;
    g = h("react.element");
    reactJsxRuntime_production_min.Fragment = h("react.fragment");
  }
  var m$1 =
      f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    n = Object.prototype.hasOwnProperty,
    p$1 = { key: true, ref: true, __self: true, __source: true };
  function q$1(c, a, k) {
    var b,
      d = {},
      e = null,
      l2 = null;
    void 0 !== k && (e = "" + k);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (l2 = a.ref);
    for (b in a) n.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps)
      for (b in ((a = c.defaultProps), a)) void 0 === d[b] && (d[b] = a[b]);
    return {
      $$typeof: g,
      type: c,
      key: e,
      ref: l2,
      props: d,
      _owner: m$1.current,
    };
  }
  reactJsxRuntime_production_min.jsx = q$1;
  reactJsxRuntime_production_min.jsxs = q$1;
  {
    jsxRuntime.exports = reactJsxRuntime_production_min;
  }
  var jsxRuntimeExports = jsxRuntime.exports;
  var server_browser = { exports: {} };
  var reactDomServer_browser_production_min = {};
  /** @license React v17.0.2
   * react-dom-server.browser.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var l = objectAssign,
    m = reactExports;
  function p(a) {
    for (
      var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a,
        c = 1;
      c < arguments.length;
      c++
    )
      b += "&args[]=" + encodeURIComponent(arguments[c]);
    return (
      "Minified React error #" +
      a +
      "; visit " +
      b +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var q = 60106,
    r = 60107,
    u = 60108,
    z = 60114,
    B = 60109,
    aa = 60110,
    ba = 60112,
    D = 60113,
    ca = 60120,
    da = 60115,
    ea = 60116,
    fa = 60121,
    ha = 60117,
    ia = 60119,
    ja = 60129,
    ka = 60131;
  if ("function" === typeof Symbol && Symbol.for) {
    var E = Symbol.for;
    q = E("react.portal");
    r = E("react.fragment");
    u = E("react.strict_mode");
    z = E("react.profiler");
    B = E("react.provider");
    aa = E("react.context");
    ba = E("react.forward_ref");
    D = E("react.suspense");
    ca = E("react.suspense_list");
    da = E("react.memo");
    ea = E("react.lazy");
    fa = E("react.block");
    ha = E("react.fundamental");
    ia = E("react.scope");
    ja = E("react.debug_trace_mode");
    ka = E("react.legacy_hidden");
  }
  function F(a) {
    if (null == a) return null;
    if ("function" === typeof a) return a.displayName || a.name || null;
    if ("string" === typeof a) return a;
    switch (a) {
      case r:
        return "Fragment";
      case q:
        return "Portal";
      case z:
        return "Profiler";
      case u:
        return "StrictMode";
      case D:
        return "Suspense";
      case ca:
        return "SuspenseList";
    }
    if ("object" === typeof a)
      switch (a.$$typeof) {
        case aa:
          return (a.displayName || "Context") + ".Consumer";
        case B:
          return (a._context.displayName || "Context") + ".Provider";
        case ba:
          var b = a.render;
          b = b.displayName || b.name || "";
          return (
            a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef")
          );
        case da:
          return F(a.type);
        case fa:
          return F(a._render);
        case ea:
          b = a._payload;
          a = a._init;
          try {
            return F(a(b));
          } catch (c) {}
      }
    return null;
  }
  var la = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    ma = {};
  function I(a, b) {
    for (var c = a._threadCount | 0; c <= b; c++)
      (a[c] = a._currentValue2), (a._threadCount = c + 1);
  }
  function na(a, b, c, d) {
    if (d && ((d = a.contextType), "object" === typeof d && null !== d))
      return I(d, c), d[c];
    if ((a = a.contextTypes)) {
      c = {};
      for (var f2 in a) c[f2] = b[f2];
      b = c;
    } else b = ma;
    return b;
  }
  for (var J = new Uint16Array(16), K = 0; 15 > K; K++) J[K] = K + 1;
  J[15] = 0;
  var oa =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    pa = Object.prototype.hasOwnProperty,
    qa = {},
    ra = {};
  function sa(a) {
    if (pa.call(ra, a)) return true;
    if (pa.call(qa, a)) return false;
    if (oa.test(a)) return (ra[a] = true);
    qa[a] = true;
    return false;
  }
  function ta(a, b, c, d) {
    if (null !== c && 0 === c.type) return false;
    switch (typeof b) {
      case "function":
      case "symbol":
        return true;
      case "boolean":
        if (d) return false;
        if (null !== c) return !c.acceptsBooleans;
        a = a.toLowerCase().slice(0, 5);
        return "data-" !== a && "aria-" !== a;
      default:
        return false;
    }
  }
  function ua(a, b, c, d) {
    if (null === b || "undefined" === typeof b || ta(a, b, c, d)) return true;
    if (d) return false;
    if (null !== c)
      switch (c.type) {
        case 3:
          return !b;
        case 4:
          return false === b;
        case 5:
          return isNaN(b);
        case 6:
          return isNaN(b) || 1 > b;
      }
    return false;
  }
  function M(a, b, c, d, f2, h2, t2) {
    this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
    this.attributeName = d;
    this.attributeNamespace = f2;
    this.mustUseProperty = c;
    this.propertyName = a;
    this.type = b;
    this.sanitizeURL = h2;
    this.removeEmptyString = t2;
  }
  var N = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (a) {
      N[a] = new M(a, 0, false, a, null, false, false);
    });
  [
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
  ].forEach(function (a) {
    var b = a[0];
    N[b] = new M(b, 1, false, a[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {
    N[a] = new M(a, 2, false, a.toLowerCase(), null, false, false);
  });
  [
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha",
  ].forEach(function (a) {
    N[a] = new M(a, 2, false, a, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
    .split(" ")
    .forEach(function (a) {
      N[a] = new M(a, 3, false, a.toLowerCase(), null, false, false);
    });
  ["checked", "multiple", "muted", "selected"].forEach(function (a) {
    N[a] = new M(a, 3, true, a, null, false, false);
  });
  ["capture", "download"].forEach(function (a) {
    N[a] = new M(a, 4, false, a, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function (a) {
    N[a] = new M(a, 6, false, a, null, false, false);
  });
  ["rowSpan", "start"].forEach(function (a) {
    N[a] = new M(a, 5, false, a.toLowerCase(), null, false, false);
  });
  var va = /[\-:]([a-z])/g;
  function wa(a) {
    return a[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (a) {
      var b = a.replace(va, wa);
      N[b] = new M(b, 1, false, a, null, false, false);
    });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
    .split(" ")
    .forEach(function (a) {
      var b = a.replace(va, wa);
      N[b] = new M(
        b,
        1,
        false,
        a,
        "http://www.w3.org/1999/xlink",
        false,
        false,
      );
    });
  ["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
    var b = a.replace(va, wa);
    N[b] = new M(
      b,
      1,
      false,
      a,
      "http://www.w3.org/XML/1998/namespace",
      false,
      false,
    );
  });
  ["tabIndex", "crossOrigin"].forEach(function (a) {
    N[a] = new M(a, 1, false, a.toLowerCase(), null, false, false);
  });
  N.xlinkHref = new M(
    "xlinkHref",
    1,
    false,
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    true,
    false,
  );
  ["src", "href", "action", "formAction"].forEach(function (a) {
    N[a] = new M(a, 1, false, a.toLowerCase(), null, true, true);
  });
  var xa = /["'&<>]/;
  function O(a) {
    if ("boolean" === typeof a || "number" === typeof a) return "" + a;
    a = "" + a;
    var b = xa.exec(a);
    if (b) {
      var c = "",
        d,
        f2 = 0;
      for (d = b.index; d < a.length; d++) {
        switch (a.charCodeAt(d)) {
          case 34:
            b = "&quot;";
            break;
          case 38:
            b = "&amp;";
            break;
          case 39:
            b = "&#x27;";
            break;
          case 60:
            b = "&lt;";
            break;
          case 62:
            b = "&gt;";
            break;
          default:
            continue;
        }
        f2 !== d && (c += a.substring(f2, d));
        f2 = d + 1;
        c += b;
      }
      a = f2 !== d ? c + a.substring(f2, d) : c;
    }
    return a;
  }
  function ya(a, b) {
    var c = N.hasOwnProperty(a) ? N[a] : null;
    var d;
    if ((d = "style" !== a))
      d =
        null !== c
          ? 0 === c.type
          : !(2 < a.length) ||
              ("o" !== a[0] && "O" !== a[0]) ||
              ("n" !== a[1] && "N" !== a[1])
            ? false
            : true;
    if (d || ua(a, b, c, false)) return "";
    if (null !== c) {
      a = c.attributeName;
      d = c.type;
      if (3 === d || (4 === d && true === b)) return a + '=""';
      c.sanitizeURL && (b = "" + b);
      return a + '="' + (O(b) + '"');
    }
    return sa(a) ? a + '="' + (O(b) + '"') : "";
  }
  function za(a, b) {
    return (a === b && (0 !== a || 1 / a === 1 / b)) || (a !== a && b !== b);
  }
  var Aa = "function" === typeof Object.is ? Object.is : za,
    P = null,
    Q = null,
    R = null,
    S = false,
    T = false,
    U = null,
    V = 0;
  function W() {
    if (null === P) throw Error(p(321));
    return P;
  }
  function Ba() {
    if (0 < V) throw Error(p(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function Ca() {
    null === R
      ? null === Q
        ? ((S = false), (Q = R = Ba()))
        : ((S = true), (R = Q))
      : null === R.next
        ? ((S = false), (R = R.next = Ba()))
        : ((S = true), (R = R.next));
    return R;
  }
  function Da(a, b, c, d) {
    for (; T; ) (T = false), (V += 1), (R = null), (c = a(b, d));
    Ea();
    return c;
  }
  function Ea() {
    P = null;
    T = false;
    Q = null;
    V = 0;
    R = U = null;
  }
  function Fa(a, b) {
    return "function" === typeof b ? b(a) : b;
  }
  function Ga(a, b, c) {
    P = W();
    R = Ca();
    if (S) {
      var d = R.queue;
      b = d.dispatch;
      if (null !== U && ((c = U.get(d)), void 0 !== c)) {
        U.delete(d);
        d = R.memoizedState;
        do (d = a(d, c.action)), (c = c.next);
        while (null !== c);
        R.memoizedState = d;
        return [d, b];
      }
      return [R.memoizedState, b];
    }
    a =
      a === Fa ? ("function" === typeof b ? b() : b) : void 0 !== c ? c(b) : b;
    R.memoizedState = a;
    a = R.queue = { last: null, dispatch: null };
    a = a.dispatch = Ha.bind(null, P, a);
    return [R.memoizedState, a];
  }
  function Ia(a, b) {
    P = W();
    R = Ca();
    b = void 0 === b ? null : b;
    if (null !== R) {
      var c = R.memoizedState;
      if (null !== c && null !== b) {
        var d = c[1];
        a: if (null === d) d = false;
        else {
          for (var f2 = 0; f2 < d.length && f2 < b.length; f2++)
            if (!Aa(b[f2], d[f2])) {
              d = false;
              break a;
            }
          d = true;
        }
        if (d) return c[0];
      }
    }
    a = a();
    R.memoizedState = [a, b];
    return a;
  }
  function Ha(a, b, c) {
    if (!(25 > V)) throw Error(p(301));
    if (a === P)
      if (
        ((T = true),
        (a = { action: c, next: null }),
        null === U && (U = /* @__PURE__ */ new Map()),
        (c = U.get(b)),
        void 0 === c)
      )
        U.set(b, a);
      else {
        for (b = c; null !== b.next; ) b = b.next;
        b.next = a;
      }
  }
  function Ja() {}
  var X = null,
    Ka = {
      readContext: function (a) {
        var b = X.threadID;
        I(a, b);
        return a[b];
      },
      useContext: function (a) {
        W();
        var b = X.threadID;
        I(a, b);
        return a[b];
      },
      useMemo: Ia,
      useReducer: Ga,
      useRef: function (a) {
        P = W();
        R = Ca();
        var b = R.memoizedState;
        return null === b ? ((a = { current: a }), (R.memoizedState = a)) : b;
      },
      useState: function (a) {
        return Ga(Fa, a);
      },
      useLayoutEffect: function () {},
      useCallback: function (a, b) {
        return Ia(function () {
          return a;
        }, b);
      },
      useImperativeHandle: Ja,
      useEffect: Ja,
      useDebugValue: Ja,
      useDeferredValue: function (a) {
        W();
        return a;
      },
      useTransition: function () {
        W();
        return [
          function (a) {
            a();
          },
          false,
        ];
      },
      useOpaqueIdentifier: function () {
        return (X.identifierPrefix || "") + "R:" + (X.uniqueID++).toString(36);
      },
      useMutableSource: function (a, b) {
        W();
        return b(a._source);
      },
    },
    La = {
      html: "http://www.w3.org/1999/xhtml",
      mathml: "http://www.w3.org/1998/Math/MathML",
      svg: "http://www.w3.org/2000/svg",
    };
  function Ma(a) {
    switch (a) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  var Na = {
      area: true,
      base: true,
      br: true,
      col: true,
      embed: true,
      hr: true,
      img: true,
      input: true,
      keygen: true,
      link: true,
      meta: true,
      param: true,
      source: true,
      track: true,
      wbr: true,
    },
    Oa = l({ menuitem: true }, Na),
    Y = {
      animationIterationCount: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true,
    },
    Pa = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Y).forEach(function (a) {
    Pa.forEach(function (b) {
      b = b + a.charAt(0).toUpperCase() + a.substring(1);
      Y[b] = Y[a];
    });
  });
  var Qa = /([A-Z])/g,
    Ra = /^ms-/,
    Z = m.Children.toArray,
    Sa = la.ReactCurrentDispatcher,
    Ta = { listing: true, pre: true, textarea: true },
    Ua = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
    Va = {},
    Wa = {};
  function Xa(a) {
    if (void 0 === a || null === a) return a;
    var b = "";
    m.Children.forEach(a, function (a2) {
      null != a2 && (b += a2);
    });
    return b;
  }
  var Ya = Object.prototype.hasOwnProperty,
    Za = {
      children: null,
      dangerouslySetInnerHTML: null,
      suppressContentEditableWarning: null,
      suppressHydrationWarning: null,
    };
  function $a(a, b) {
    if (void 0 === a) throw Error(p(152, F(b) || "Component"));
  }
  function ab(a, b, c) {
    function d(d2, h3) {
      var e = h3.prototype && h3.prototype.isReactComponent,
        f3 = na(h3, b, c, e),
        t2 = [],
        g2 = false,
        n2 = {
          isMounted: function () {
            return false;
          },
          enqueueForceUpdate: function () {
            if (null === t2) return null;
          },
          enqueueReplaceState: function (a2, c2) {
            g2 = true;
            t2 = [c2];
          },
          enqueueSetState: function (a2, c2) {
            if (null === t2) return null;
            t2.push(c2);
          },
        };
      if (e) {
        if (
          ((e = new h3(d2.props, f3, n2)),
          "function" === typeof h3.getDerivedStateFromProps)
        ) {
          var k = h3.getDerivedStateFromProps.call(null, d2.props, e.state);
          null != k && (e.state = l({}, e.state, k));
        }
      } else if (
        ((P = {}),
        (e = h3(d2.props, f3, n2)),
        (e = Da(h3, d2.props, e, f3)),
        null == e || null == e.render)
      ) {
        a = e;
        $a(a, h3);
        return;
      }
      e.props = d2.props;
      e.context = f3;
      e.updater = n2;
      n2 = e.state;
      void 0 === n2 && (e.state = n2 = null);
      if (
        "function" === typeof e.UNSAFE_componentWillMount ||
        "function" === typeof e.componentWillMount
      )
        if (
          ("function" === typeof e.componentWillMount &&
            "function" !== typeof h3.getDerivedStateFromProps &&
            e.componentWillMount(),
          "function" === typeof e.UNSAFE_componentWillMount &&
            "function" !== typeof h3.getDerivedStateFromProps &&
            e.UNSAFE_componentWillMount(),
          t2.length)
        ) {
          n2 = t2;
          var v2 = g2;
          t2 = null;
          g2 = false;
          if (v2 && 1 === n2.length) e.state = n2[0];
          else {
            k = v2 ? n2[0] : e.state;
            var H2 = true;
            for (v2 = v2 ? 1 : 0; v2 < n2.length; v2++) {
              var x2 = n2[v2];
              x2 = "function" === typeof x2 ? x2.call(e, k, d2.props, f3) : x2;
              null != x2 &&
                (H2 ? ((H2 = false), (k = l({}, k, x2))) : l(k, x2));
            }
            e.state = k;
          }
        } else t2 = null;
      a = e.render();
      $a(a, h3);
      if (
        "function" === typeof e.getChildContext &&
        ((d2 = h3.childContextTypes), "object" === typeof d2)
      ) {
        var y2 = e.getChildContext();
        for (var A2 in y2)
          if (!(A2 in d2)) throw Error(p(108, F(h3) || "Unknown", A2));
      }
      y2 && (b = l({}, b, y2));
    }
    for (; m.isValidElement(a); ) {
      var f2 = a,
        h2 = f2.type;
      if ("function" !== typeof h2) break;
      d(f2, h2);
    }
    return { child: a, context: b };
  }
  var bb = (function () {
    function a(a2, b2, f2) {
      m.isValidElement(a2)
        ? a2.type !== r
          ? (a2 = [a2])
          : ((a2 = a2.props.children),
            (a2 = m.isValidElement(a2) ? [a2] : Z(a2)))
        : (a2 = Z(a2));
      a2 = {
        type: null,
        domNamespace: La.html,
        children: a2,
        childIndex: 0,
        context: ma,
        footer: "",
      };
      var c = J[0];
      if (0 === c) {
        var d = J;
        c = d.length;
        var g2 = 2 * c;
        if (!(65536 >= g2)) throw Error(p(304));
        var e = new Uint16Array(g2);
        e.set(d);
        J = e;
        J[0] = c + 1;
        for (d = c; d < g2 - 1; d++) J[d] = d + 1;
        J[g2 - 1] = 0;
      } else J[0] = J[c];
      this.threadID = c;
      this.stack = [a2];
      this.exhausted = false;
      this.currentSelectValue = null;
      this.previousWasTextNode = false;
      this.makeStaticMarkup = b2;
      this.suspenseDepth = 0;
      this.contextIndex = -1;
      this.contextStack = [];
      this.contextValueStack = [];
      this.uniqueID = 0;
      this.identifierPrefix = (f2 && f2.identifierPrefix) || "";
    }
    var b = a.prototype;
    b.destroy = function () {
      if (!this.exhausted) {
        this.exhausted = true;
        this.clearProviders();
        var a2 = this.threadID;
        J[a2] = J[0];
        J[0] = a2;
      }
    };
    b.pushProvider = function (a2) {
      var b2 = ++this.contextIndex,
        c = a2.type._context,
        h2 = this.threadID;
      I(c, h2);
      var t2 = c[h2];
      this.contextStack[b2] = c;
      this.contextValueStack[b2] = t2;
      c[h2] = a2.props.value;
    };
    b.popProvider = function () {
      var a2 = this.contextIndex,
        b2 = this.contextStack[a2],
        f2 = this.contextValueStack[a2];
      this.contextStack[a2] = null;
      this.contextValueStack[a2] = null;
      this.contextIndex--;
      b2[this.threadID] = f2;
    };
    b.clearProviders = function () {
      for (var a2 = this.contextIndex; 0 <= a2; a2--)
        this.contextStack[a2][this.threadID] = this.contextValueStack[a2];
    };
    b.read = function (a2) {
      if (this.exhausted) return null;
      var b2 = X;
      X = this;
      var c = Sa.current;
      Sa.current = Ka;
      try {
        for (var h2 = [""], t2 = false; h2[0].length < a2; ) {
          if (0 === this.stack.length) {
            this.exhausted = true;
            var g2 = this.threadID;
            J[g2] = J[0];
            J[0] = g2;
            break;
          }
          var e = this.stack[this.stack.length - 1];
          if (t2 || e.childIndex >= e.children.length) {
            var L2 = e.footer;
            "" !== L2 && (this.previousWasTextNode = false);
            this.stack.pop();
            if ("select" === e.type) this.currentSelectValue = null;
            else if (
              null != e.type &&
              null != e.type.type &&
              e.type.type.$$typeof === B
            )
              this.popProvider(e.type);
            else if (e.type === D) {
              this.suspenseDepth--;
              var G2 = h2.pop();
              if (t2) {
                t2 = false;
                var C2 = e.fallbackFrame;
                if (!C2) throw Error(p(303));
                this.stack.push(C2);
                h2[this.suspenseDepth] += "<!--$!-->";
                continue;
              } else h2[this.suspenseDepth] += G2;
            }
            h2[this.suspenseDepth] += L2;
          } else {
            var n2 = e.children[e.childIndex++],
              k = "";
            try {
              k += this.render(n2, e.context, e.domNamespace);
            } catch (v2) {
              if (null != v2 && "function" === typeof v2.then)
                throw Error(p(294));
              throw v2;
            } finally {
            }
            h2.length <= this.suspenseDepth && h2.push("");
            h2[this.suspenseDepth] += k;
          }
        }
        return h2[0];
      } finally {
        (Sa.current = c), (X = b2), Ea();
      }
    };
    b.render = function (a2, b2, f2) {
      if ("string" === typeof a2 || "number" === typeof a2) {
        f2 = "" + a2;
        if ("" === f2) return "";
        if (this.makeStaticMarkup) return O(f2);
        if (this.previousWasTextNode) return "<!-- -->" + O(f2);
        this.previousWasTextNode = true;
        return O(f2);
      }
      b2 = ab(a2, b2, this.threadID);
      a2 = b2.child;
      b2 = b2.context;
      if (null === a2 || false === a2) return "";
      if (!m.isValidElement(a2)) {
        if (null != a2 && null != a2.$$typeof) {
          f2 = a2.$$typeof;
          if (f2 === q) throw Error(p(257));
          throw Error(p(258, f2.toString()));
        }
        a2 = Z(a2);
        this.stack.push({
          type: null,
          domNamespace: f2,
          children: a2,
          childIndex: 0,
          context: b2,
          footer: "",
        });
        return "";
      }
      var c = a2.type;
      if ("string" === typeof c) return this.renderDOM(a2, b2, f2);
      switch (c) {
        case ka:
        case ja:
        case u:
        case z:
        case ca:
        case r:
          return (
            (a2 = Z(a2.props.children)),
            this.stack.push({
              type: null,
              domNamespace: f2,
              children: a2,
              childIndex: 0,
              context: b2,
              footer: "",
            }),
            ""
          );
        case D:
          throw Error(p(294));
        case ia:
          throw Error(p(343));
      }
      if ("object" === typeof c && null !== c)
        switch (c.$$typeof) {
          case ba:
            P = {};
            var d = c.render(a2.props, a2.ref);
            d = Da(c.render, a2.props, d, a2.ref);
            d = Z(d);
            this.stack.push({
              type: null,
              domNamespace: f2,
              children: d,
              childIndex: 0,
              context: b2,
              footer: "",
            });
            return "";
          case da:
            return (
              (a2 = [m.createElement(c.type, l({ ref: a2.ref }, a2.props))]),
              this.stack.push({
                type: null,
                domNamespace: f2,
                children: a2,
                childIndex: 0,
                context: b2,
                footer: "",
              }),
              ""
            );
          case B:
            return (
              (c = Z(a2.props.children)),
              (f2 = {
                type: a2,
                domNamespace: f2,
                children: c,
                childIndex: 0,
                context: b2,
                footer: "",
              }),
              this.pushProvider(a2),
              this.stack.push(f2),
              ""
            );
          case aa:
            c = a2.type;
            d = a2.props;
            var g2 = this.threadID;
            I(c, g2);
            c = Z(d.children(c[g2]));
            this.stack.push({
              type: a2,
              domNamespace: f2,
              children: c,
              childIndex: 0,
              context: b2,
              footer: "",
            });
            return "";
          case ha:
            throw Error(p(338));
          case ea:
            return (
              (c = a2.type),
              (d = c._init),
              (c = d(c._payload)),
              (a2 = [m.createElement(c, l({ ref: a2.ref }, a2.props))]),
              this.stack.push({
                type: null,
                domNamespace: f2,
                children: a2,
                childIndex: 0,
                context: b2,
                footer: "",
              }),
              ""
            );
        }
      throw Error(p(130, null == c ? c : typeof c, ""));
    };
    b.renderDOM = function (a2, b2, f2) {
      var c = a2.type.toLowerCase();
      if (!Va.hasOwnProperty(c)) {
        if (!Ua.test(c)) throw Error(p(65, c));
        Va[c] = true;
      }
      var d = a2.props;
      if ("input" === c)
        d = l({ type: void 0 }, d, {
          defaultChecked: void 0,
          defaultValue: void 0,
          value: null != d.value ? d.value : d.defaultValue,
          checked: null != d.checked ? d.checked : d.defaultChecked,
        });
      else if ("textarea" === c) {
        var g2 = d.value;
        if (null == g2) {
          g2 = d.defaultValue;
          var e = d.children;
          if (null != e) {
            if (null != g2) throw Error(p(92));
            if (Array.isArray(e)) {
              if (!(1 >= e.length)) throw Error(p(93));
              e = e[0];
            }
            g2 = "" + e;
          }
          null == g2 && (g2 = "");
        }
        d = l({}, d, { value: void 0, children: "" + g2 });
      } else if ("select" === c)
        (this.currentSelectValue = null != d.value ? d.value : d.defaultValue),
          (d = l({}, d, { value: void 0 }));
      else if ("option" === c) {
        e = this.currentSelectValue;
        var L2 = Xa(d.children);
        if (null != e) {
          var G2 = null != d.value ? d.value + "" : L2;
          g2 = false;
          if (Array.isArray(e))
            for (var C2 = 0; C2 < e.length; C2++) {
              if ("" + e[C2] === G2) {
                g2 = true;
                break;
              }
            }
          else g2 = "" + e === G2;
          d = l({ selected: void 0, children: void 0 }, d, {
            selected: g2,
            children: L2,
          });
        }
      }
      if ((g2 = d)) {
        if (
          Oa[c] &&
          (null != g2.children || null != g2.dangerouslySetInnerHTML)
        )
          throw Error(p(137, c));
        if (null != g2.dangerouslySetInnerHTML) {
          if (null != g2.children) throw Error(p(60));
          if (
            !(
              "object" === typeof g2.dangerouslySetInnerHTML &&
              "__html" in g2.dangerouslySetInnerHTML
            )
          )
            throw Error(p(61));
        }
        if (null != g2.style && "object" !== typeof g2.style)
          throw Error(p(62));
      }
      g2 = d;
      e = this.makeStaticMarkup;
      L2 = 1 === this.stack.length;
      G2 = "<" + a2.type;
      b: if (-1 === c.indexOf("-")) C2 = "string" === typeof g2.is;
      else
        switch (c) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            C2 = false;
            break b;
          default:
            C2 = true;
        }
      for (w2 in g2)
        if (Ya.call(g2, w2)) {
          var n2 = g2[w2];
          if (null != n2) {
            if ("style" === w2) {
              var k = void 0,
                v2 = "",
                H2 = "";
              for (k in n2)
                if (n2.hasOwnProperty(k)) {
                  var x2 = 0 === k.indexOf("--"),
                    y2 = n2[k];
                  if (null != y2) {
                    if (x2) var A2 = k;
                    else if (((A2 = k), Wa.hasOwnProperty(A2))) A2 = Wa[A2];
                    else {
                      var cb = A2.replace(Qa, "-$1")
                        .toLowerCase()
                        .replace(Ra, "-ms-");
                      A2 = Wa[A2] = cb;
                    }
                    v2 += H2 + A2 + ":";
                    H2 = k;
                    x2 =
                      null == y2 || "boolean" === typeof y2 || "" === y2
                        ? ""
                        : x2 ||
                            "number" !== typeof y2 ||
                            0 === y2 ||
                            (Y.hasOwnProperty(H2) && Y[H2])
                          ? ("" + y2).trim()
                          : y2 + "px";
                    v2 += x2;
                    H2 = ";";
                  }
                }
              n2 = v2 || null;
            }
            k = null;
            C2
              ? Za.hasOwnProperty(w2) ||
                ((k = w2),
                (k = sa(k) && null != n2 ? k + '="' + (O(n2) + '"') : ""))
              : (k = ya(w2, n2));
            k && (G2 += " " + k);
          }
        }
      e || (L2 && (G2 += ' data-reactroot=""'));
      var w2 = G2;
      g2 = "";
      Na.hasOwnProperty(c)
        ? (w2 += "/>")
        : ((w2 += ">"), (g2 = "</" + a2.type + ">"));
      a: {
        e = d.dangerouslySetInnerHTML;
        if (null != e) {
          if (null != e.__html) {
            e = e.__html;
            break a;
          }
        } else if (
          ((e = d.children), "string" === typeof e || "number" === typeof e)
        ) {
          e = O(e);
          break a;
        }
        e = null;
      }
      null != e
        ? ((d = []),
          Ta.hasOwnProperty(c) && "\n" === e.charAt(0) && (w2 += "\n"),
          (w2 += e))
        : (d = Z(d.children));
      a2 = a2.type;
      f2 =
        null == f2 || "http://www.w3.org/1999/xhtml" === f2
          ? Ma(a2)
          : "http://www.w3.org/2000/svg" === f2 && "foreignObject" === a2
            ? "http://www.w3.org/1999/xhtml"
            : f2;
      this.stack.push({
        domNamespace: f2,
        type: c,
        children: d,
        childIndex: 0,
        context: b2,
        footer: g2,
      });
      this.previousWasTextNode = false;
      return w2;
    };
    return a;
  })();
  reactDomServer_browser_production_min.renderToNodeStream = function () {
    throw Error(p(207));
  };
  reactDomServer_browser_production_min.renderToStaticMarkup = function (a, b) {
    a = new bb(a, true, b);
    try {
      return a.read(Infinity);
    } finally {
      a.destroy();
    }
  };
  reactDomServer_browser_production_min.renderToStaticNodeStream = function () {
    throw Error(p(208));
  };
  reactDomServer_browser_production_min.renderToString = function (a, b) {
    a = new bb(a, false, b);
    try {
      return a.read(Infinity);
    } finally {
      a.destroy();
    }
  };
  reactDomServer_browser_production_min.version = "17.0.2";
  {
    server_browser.exports = reactDomServer_browser_production_min;
  }
  var server_browserExports = server_browser.exports;
  function App() {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [jsxRuntimeExports.jsxs("div", { children: [] })],
    });
  }
  const Index = () => {
    return server_browserExports.renderToString(
      /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}),
    );
  };
  exports.Index = Index;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
})({});
