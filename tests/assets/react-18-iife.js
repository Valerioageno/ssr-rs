(function (exports) {
  "use strict";
  var commonjsGlobal =
    typeof globalThis !== "undefined"
      ? globalThis
      : typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
          ? global
          : typeof self !== "undefined"
            ? self
            : {};
  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production_min = {};
  var react = { exports: {} };
  var react_production_min = {};
  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var l$4 = Symbol.for("react.element"),
    n$2 = Symbol.for("react.portal"),
    p$3 = Symbol.for("react.fragment"),
    q$1 = Symbol.for("react.strict_mode"),
    r$1 = Symbol.for("react.profiler"),
    t$2 = Symbol.for("react.provider"),
    u$2 = Symbol.for("react.context"),
    v$1 = Symbol.for("react.forward_ref"),
    w$2 = Symbol.for("react.suspense"),
    x$2 = Symbol.for("react.memo"),
    y$2 = Symbol.for("react.lazy"),
    z$1 = Symbol.iterator;
  function A$1(a) {
    if (null === a || "object" !== typeof a) return null;
    a = (z$1 && a[z$1]) || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  var B$2 = {
      isMounted: function () {
        return false;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    C$1 = Object.assign,
    D$1 = {};
  function E$2(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = D$1;
    this.updater = e || B$2;
  }
  E$2.prototype.isReactComponent = {};
  E$2.prototype.setState = function (a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a)
      throw Error(
        "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
      );
    this.updater.enqueueSetState(this, a, b, "setState");
  };
  E$2.prototype.forceUpdate = function (a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };
  function F$1() {}
  F$1.prototype = E$2.prototype;
  function G$1(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = D$1;
    this.updater = e || B$2;
  }
  var H$2 = (G$1.prototype = new F$1());
  H$2.constructor = G$1;
  C$1(H$2, E$2.prototype);
  H$2.isPureReactComponent = true;
  var I$2 = Array.isArray,
    J$2 = Object.prototype.hasOwnProperty,
    K$2 = { current: null },
    L$2 = { key: true, ref: true, __self: true, __source: true };
  function M$2(a, b, e) {
    var d,
      c = {},
      k2 = null,
      h = null;
    if (null != b)
      for (d in (void 0 !== b.ref && (h = b.ref),
      void 0 !== b.key && (k2 = "" + b.key),
      b))
        J$2.call(b, d) && !L$2.hasOwnProperty(d) && (c[d] = b[d]);
    var g = arguments.length - 2;
    if (1 === g) c.children = e;
    else if (1 < g) {
      for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
      c.children = f2;
    }
    if (a && a.defaultProps)
      for (d in ((g = a.defaultProps), g)) void 0 === c[d] && (c[d] = g[d]);
    return {
      $$typeof: l$4,
      type: a,
      key: k2,
      ref: h,
      props: c,
      _owner: K$2.current,
    };
  }
  function N$2(a, b) {
    return {
      $$typeof: l$4,
      type: a.type,
      key: b,
      ref: a.ref,
      props: a.props,
      _owner: a._owner,
    };
  }
  function O$2(a) {
    return "object" === typeof a && null !== a && a.$$typeof === l$4;
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
  var P$2 = /\/+/g;
  function Q$2(a, b) {
    return "object" === typeof a && null !== a && null != a.key
      ? escape("" + a.key)
      : b.toString(36);
  }
  function R$2(a, b, e, d, c) {
    var k2 = typeof a;
    if ("undefined" === k2 || "boolean" === k2) a = null;
    var h = false;
    if (null === a) h = true;
    else
      switch (k2) {
        case "string":
        case "number":
          h = true;
          break;
        case "object":
          switch (a.$$typeof) {
            case l$4:
            case n$2:
              h = true;
          }
      }
    if (h)
      return (
        (h = a),
        (c = c(h)),
        (a = "" === d ? "." + Q$2(h, 0) : d),
        I$2(c)
          ? ((e = ""),
            null != a && (e = a.replace(P$2, "$&/") + "/"),
            R$2(c, b, e, "", function (a2) {
              return a2;
            }))
          : null != c &&
            (O$2(c) &&
              (c = N$2(
                c,
                e +
                  (!c.key || (h && h.key === c.key)
                    ? ""
                    : ("" + c.key).replace(P$2, "$&/") + "/") +
                  a,
              )),
            b.push(c)),
        1
      );
    h = 0;
    d = "" === d ? "." : d + ":";
    if (I$2(a))
      for (var g = 0; g < a.length; g++) {
        k2 = a[g];
        var f2 = d + Q$2(k2, g);
        h += R$2(k2, b, e, f2, c);
      }
    else if (((f2 = A$1(a)), "function" === typeof f2))
      for (a = f2.call(a), g = 0; !(k2 = a.next()).done; )
        (k2 = k2.value), (f2 = d + Q$2(k2, g++)), (h += R$2(k2, b, e, f2, c));
    else if ("object" === k2)
      throw (
        ((b = String(a)),
        Error(
          "Objects are not valid as a React child (found: " +
            ("[object Object]" === b
              ? "object with keys {" + Object.keys(a).join(", ") + "}"
              : b) +
            "). If you meant to render a collection of children, use an array instead.",
        ))
      );
    return h;
  }
  function S$2(a, b, e) {
    if (null == a) return a;
    var d = [],
      c = 0;
    R$2(a, d, "", "", function (a2) {
      return b.call(e, a2, c++);
    });
    return d;
  }
  function T$2(a) {
    if (-1 === a._status) {
      var b = a._result;
      b = b();
      b.then(
        function (b2) {
          if (0 === a._status || -1 === a._status)
            (a._status = 1), (a._result = b2);
        },
        function (b2) {
          if (0 === a._status || -1 === a._status)
            (a._status = 2), (a._result = b2);
        },
      );
      -1 === a._status && ((a._status = 0), (a._result = b));
    }
    if (1 === a._status) return a._result.default;
    throw a._result;
  }
  var U$2 = { current: null },
    V$2 = { transition: null },
    W$2 = {
      ReactCurrentDispatcher: U$2,
      ReactCurrentBatchConfig: V$2,
      ReactCurrentOwner: K$2,
    };
  react_production_min.Children = {
    map: S$2,
    forEach: function (a, b, e) {
      S$2(
        a,
        function () {
          b.apply(this, arguments);
        },
        e,
      );
    },
    count: function (a) {
      var b = 0;
      S$2(a, function () {
        b++;
      });
      return b;
    },
    toArray: function (a) {
      return (
        S$2(a, function (a2) {
          return a2;
        }) || []
      );
    },
    only: function (a) {
      if (!O$2(a))
        throw Error(
          "React.Children.only expected to receive a single React element child.",
        );
      return a;
    },
  };
  react_production_min.Component = E$2;
  react_production_min.Fragment = p$3;
  react_production_min.Profiler = r$1;
  react_production_min.PureComponent = G$1;
  react_production_min.StrictMode = q$1;
  react_production_min.Suspense = w$2;
  react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$2;
  react_production_min.cloneElement = function (a, b, e) {
    if (null === a || void 0 === a)
      throw Error(
        "React.cloneElement(...): The argument must be a React element, but you passed " +
          a +
          ".",
      );
    var d = C$1({}, a.props),
      c = a.key,
      k2 = a.ref,
      h = a._owner;
    if (null != b) {
      void 0 !== b.ref && ((k2 = b.ref), (h = K$2.current));
      void 0 !== b.key && (c = "" + b.key);
      if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
      for (f2 in b)
        J$2.call(b, f2) &&
          !L$2.hasOwnProperty(f2) &&
          (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
    }
    var f2 = arguments.length - 2;
    if (1 === f2) d.children = e;
    else if (1 < f2) {
      g = Array(f2);
      for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
      d.children = g;
    }
    return {
      $$typeof: l$4,
      type: a.type,
      key: c,
      ref: k2,
      props: d,
      _owner: h,
    };
  };
  react_production_min.createContext = function (a) {
    a = {
      $$typeof: u$2,
      _currentValue: a,
      _currentValue2: a,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    };
    a.Provider = { $$typeof: t$2, _context: a };
    return (a.Consumer = a);
  };
  react_production_min.createElement = M$2;
  react_production_min.createFactory = function (a) {
    var b = M$2.bind(null, a);
    b.type = a;
    return b;
  };
  react_production_min.createRef = function () {
    return { current: null };
  };
  react_production_min.forwardRef = function (a) {
    return { $$typeof: v$1, render: a };
  };
  react_production_min.isValidElement = O$2;
  react_production_min.lazy = function (a) {
    return { $$typeof: y$2, _payload: { _status: -1, _result: a }, _init: T$2 };
  };
  react_production_min.memo = function (a, b) {
    return { $$typeof: x$2, type: a, compare: void 0 === b ? null : b };
  };
  react_production_min.startTransition = function (a) {
    var b = V$2.transition;
    V$2.transition = {};
    try {
      a();
    } finally {
      V$2.transition = b;
    }
  };
  react_production_min.unstable_act = function () {
    throw Error("act(...) is not supported in production builds of React.");
  };
  react_production_min.useCallback = function (a, b) {
    return U$2.current.useCallback(a, b);
  };
  react_production_min.useContext = function (a) {
    return U$2.current.useContext(a);
  };
  react_production_min.useDebugValue = function () {};
  react_production_min.useDeferredValue = function (a) {
    return U$2.current.useDeferredValue(a);
  };
  react_production_min.useEffect = function (a, b) {
    return U$2.current.useEffect(a, b);
  };
  react_production_min.useId = function () {
    return U$2.current.useId();
  };
  react_production_min.useImperativeHandle = function (a, b, e) {
    return U$2.current.useImperativeHandle(a, b, e);
  };
  react_production_min.useInsertionEffect = function (a, b) {
    return U$2.current.useInsertionEffect(a, b);
  };
  react_production_min.useLayoutEffect = function (a, b) {
    return U$2.current.useLayoutEffect(a, b);
  };
  react_production_min.useMemo = function (a, b) {
    return U$2.current.useMemo(a, b);
  };
  react_production_min.useReducer = function (a, b, e) {
    return U$2.current.useReducer(a, b, e);
  };
  react_production_min.useRef = function (a) {
    return U$2.current.useRef(a);
  };
  react_production_min.useState = function (a) {
    return U$2.current.useState(a);
  };
  react_production_min.useSyncExternalStore = function (a, b, e) {
    return U$2.current.useSyncExternalStore(a, b, e);
  };
  react_production_min.useTransition = function () {
    return U$2.current.useTransition();
  };
  react_production_min.version = "18.2.0";
  {
    react.exports = react_production_min;
  }
  var reactExports = react.exports;
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var f = reactExports,
    k$1 = Symbol.for("react.element"),
    l$3 = Symbol.for("react.fragment"),
    m = Object.prototype.hasOwnProperty,
    n$1 =
      f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    p$2 = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b,
      d = {},
      e = null,
      h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a) m.call(a, b) && !p$2.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps)
      for (b in ((a = c.defaultProps), a)) void 0 === d[b] && (d[b] = a[b]);
    return {
      $$typeof: k$1,
      type: c,
      key: e,
      ref: h,
      props: d,
      _owner: n$1.current,
    };
  }
  reactJsxRuntime_production_min.Fragment = l$3;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  {
    jsxRuntime.exports = reactJsxRuntime_production_min;
  }
  var jsxRuntimeExports = jsxRuntime.exports;
  (function (scope) {
    function B2(r2, e) {
      var f2;
      return (
        r2 instanceof Buffer
          ? (f2 = r2)
          : (f2 = Buffer.from(r2.buffer, r2.byteOffset, r2.byteLength)),
        f2.toString(e)
      );
    }
    var w2 = function (r2) {
      return Buffer.from(r2);
    };
    function h(r2) {
      for (
        var e = 0,
          f2 = Math.min(256 * 256, r2.length + 1),
          n2 = new Uint16Array(f2),
          i = [],
          o = 0;
        ;

      ) {
        var t2 = e < r2.length;
        if (!t2 || o >= f2 - 1) {
          var s2 = n2.subarray(0, o),
            m2 = s2;
          if ((i.push(String.fromCharCode.apply(null, m2)), !t2))
            return i.join("");
          (r2 = r2.subarray(e)), (e = 0), (o = 0);
        }
        var a = r2[e++];
        if ((a & 128) === 0) n2[o++] = a;
        else if ((a & 224) === 192) {
          var d = r2[e++] & 63;
          n2[o++] = ((a & 31) << 6) | d;
        } else if ((a & 240) === 224) {
          var d = r2[e++] & 63,
            l2 = r2[e++] & 63;
          n2[o++] = ((a & 31) << 12) | (d << 6) | l2;
        } else if ((a & 248) === 240) {
          var d = r2[e++] & 63,
            l2 = r2[e++] & 63,
            R2 = r2[e++] & 63,
            c = ((a & 7) << 18) | (d << 12) | (l2 << 6) | R2;
          c > 65535 &&
            ((c -= 65536),
            (n2[o++] = ((c >>> 10) & 1023) | 55296),
            (c = 56320 | (c & 1023))),
            (n2[o++] = c);
        }
      }
    }
    function F2(r2) {
      for (
        var e = 0,
          f2 = r2.length,
          n2 = 0,
          i = Math.max(32, f2 + (f2 >>> 1) + 7),
          o = new Uint8Array((i >>> 3) << 3);
        e < f2;

      ) {
        var t2 = r2.charCodeAt(e++);
        if (t2 >= 55296 && t2 <= 56319) {
          if (e < f2) {
            var s2 = r2.charCodeAt(e);
            (s2 & 64512) === 56320 &&
              (++e, (t2 = ((t2 & 1023) << 10) + (s2 & 1023) + 65536));
          }
          if (t2 >= 55296 && t2 <= 56319) continue;
        }
        if (n2 + 4 > o.length) {
          (i += 8), (i *= 1 + (e / r2.length) * 2), (i = (i >>> 3) << 3);
          var m2 = new Uint8Array(i);
          m2.set(o), (o = m2);
        }
        if ((t2 & 4294967168) === 0) {
          o[n2++] = t2;
          continue;
        } else if ((t2 & 4294965248) === 0) o[n2++] = ((t2 >>> 6) & 31) | 192;
        else if ((t2 & 4294901760) === 0)
          (o[n2++] = ((t2 >>> 12) & 15) | 224),
            (o[n2++] = ((t2 >>> 6) & 63) | 128);
        else if ((t2 & 4292870144) === 0)
          (o[n2++] = ((t2 >>> 18) & 7) | 240),
            (o[n2++] = ((t2 >>> 12) & 63) | 128),
            (o[n2++] = ((t2 >>> 6) & 63) | 128);
        else continue;
        o[n2++] = (t2 & 63) | 128;
      }
      return o.slice ? o.slice(0, n2) : o.subarray(0, n2);
    }
    var u2 = "Failed to ",
      p2 = function (r2, e, f2) {
        if (r2)
          throw new Error(
            ""
              .concat(u2)
              .concat(e, ": the '")
              .concat(f2, "' option is unsupported."),
          );
      };
    var x2 = typeof Buffer == "function" && Buffer.from;
    var A2 = x2 ? w2 : F2;
    function v2() {
      this.encoding = "utf-8";
    }
    v2.prototype.encode = function (r2, e) {
      return p2(e && e.stream, "encode", "stream"), A2(r2);
    };
    function U2(r2) {
      var e;
      try {
        var f2 = new Blob([r2], { type: "text/plain;charset=UTF-8" });
        e = URL.createObjectURL(f2);
        var n2 = new XMLHttpRequest();
        return n2.open("GET", e, false), n2.send(), n2.responseText;
      } finally {
        e && URL.revokeObjectURL(e);
      }
    }
    var O2 =
        !x2 &&
        typeof Blob == "function" &&
        typeof URL == "function" &&
        typeof URL.createObjectURL == "function",
      S2 = ["utf-8", "utf8", "unicode-1-1-utf-8"],
      T2 = h;
    x2
      ? (T2 = B2)
      : O2 &&
        (T2 = function (r2) {
          try {
            return U2(r2);
          } catch (e) {
            return h(r2);
          }
        });
    var y2 = "construct 'TextDecoder'",
      E2 = "".concat(u2, " ").concat(y2, ": the ");
    function g(r2, e) {
      p2(e && e.fatal, y2, "fatal"), (r2 = r2 || "utf-8");
      var f2;
      if (
        (x2
          ? (f2 = Buffer.isEncoding(r2))
          : (f2 = S2.indexOf(r2.toLowerCase()) !== -1),
        !f2)
      )
        throw new RangeError(
          ""
            .concat(E2, " encoding label provided ('")
            .concat(r2, "') is invalid."),
        );
      (this.encoding = r2), (this.fatal = false), (this.ignoreBOM = false);
    }
    g.prototype.decode = function (r2, e) {
      p2(e && e.stream, "decode", "stream");
      var f2;
      return (
        r2 instanceof Uint8Array
          ? (f2 = r2)
          : r2.buffer instanceof ArrayBuffer
            ? (f2 = new Uint8Array(r2.buffer))
            : (f2 = new Uint8Array(r2)),
        T2(f2, this.encoding)
      );
    };
    scope.TextEncoder = scope.TextEncoder || v2;
    scope.TextDecoder = scope.TextDecoder || g;
  })(
    typeof window !== "undefined"
      ? window
      : typeof commonjsGlobal !== "undefined"
        ? commonjsGlobal
        : commonjsGlobal,
  );
  var reactDomServerLegacy_browser_production_min = {};
  /**
   * @license React
   * react-dom-server-legacy.browser.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var aa$1 = reactExports;
  function l$2(a) {
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
  var p$1 = Object.prototype.hasOwnProperty,
    fa$1 =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    ha$1 = {},
    ia$1 = {};
  function ja$1(a) {
    if (p$1.call(ia$1, a)) return true;
    if (p$1.call(ha$1, a)) return false;
    if (fa$1.test(a)) return (ia$1[a] = true);
    ha$1[a] = true;
    return false;
  }
  function r(a, b, c, d, f2, e, g) {
    this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
    this.attributeName = d;
    this.attributeNamespace = f2;
    this.mustUseProperty = c;
    this.propertyName = a;
    this.type = b;
    this.sanitizeURL = e;
    this.removeEmptyString = g;
  }
  var t$1 = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (a) {
      t$1[a] = new r(a, 0, false, a, null, false, false);
    });
  [
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
  ].forEach(function (a) {
    var b = a[0];
    t$1[b] = new r(b, 1, false, a[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {
    t$1[a] = new r(a, 2, false, a.toLowerCase(), null, false, false);
  });
  [
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha",
  ].forEach(function (a) {
    t$1[a] = new r(a, 2, false, a, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
    .split(" ")
    .forEach(function (a) {
      t$1[a] = new r(a, 3, false, a.toLowerCase(), null, false, false);
    });
  ["checked", "multiple", "muted", "selected"].forEach(function (a) {
    t$1[a] = new r(a, 3, true, a, null, false, false);
  });
  ["capture", "download"].forEach(function (a) {
    t$1[a] = new r(a, 4, false, a, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function (a) {
    t$1[a] = new r(a, 6, false, a, null, false, false);
  });
  ["rowSpan", "start"].forEach(function (a) {
    t$1[a] = new r(a, 5, false, a.toLowerCase(), null, false, false);
  });
  var ka$1 = /[\-:]([a-z])/g;
  function la$1(a) {
    return a[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (a) {
      var b = a.replace(ka$1, la$1);
      t$1[b] = new r(b, 1, false, a, null, false, false);
    });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
    .split(" ")
    .forEach(function (a) {
      var b = a.replace(ka$1, la$1);
      t$1[b] = new r(
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
    var b = a.replace(ka$1, la$1);
    t$1[b] = new r(
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
    t$1[a] = new r(a, 1, false, a.toLowerCase(), null, false, false);
  });
  t$1.xlinkHref = new r(
    "xlinkHref",
    1,
    false,
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    true,
    false,
  );
  ["src", "href", "action", "formAction"].forEach(function (a) {
    t$1[a] = new r(a, 1, false, a.toLowerCase(), null, true, true);
  });
  var u$1 = {
      animationIterationCount: true,
      aspectRatio: true,
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
    ma = ["Webkit", "ms", "Moz", "O"];
  Object.keys(u$1).forEach(function (a) {
    ma.forEach(function (b) {
      b = b + a.charAt(0).toUpperCase() + a.substring(1);
      u$1[b] = u$1[a];
    });
  });
  var na = /["'&<>]/;
  function v(a) {
    if ("boolean" === typeof a || "number" === typeof a) return "" + a;
    a = "" + a;
    var b = na.exec(a);
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
  var oa$1 = /([A-Z])/g,
    pa$1 = /^ms-/,
    qa$1 = Array.isArray;
  function w$1(a, b) {
    return { insertionMode: a, selectedValue: b };
  }
  function ra$1(a, b, c) {
    switch (b) {
      case "select":
        return w$1(1, null != c.value ? c.value : c.defaultValue);
      case "svg":
        return w$1(2, null);
      case "math":
        return w$1(3, null);
      case "foreignObject":
        return w$1(1, null);
      case "table":
        return w$1(4, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return w$1(5, null);
      case "colgroup":
        return w$1(7, null);
      case "tr":
        return w$1(6, null);
    }
    return 4 <= a.insertionMode || 0 === a.insertionMode ? w$1(1, null) : a;
  }
  var sa$1 = /* @__PURE__ */ new Map();
  function ta$1(a, b, c) {
    if ("object" !== typeof c) throw Error(l$2(62));
    b = true;
    for (var d in c)
      if (p$1.call(c, d)) {
        var f2 = c[d];
        if (null != f2 && "boolean" !== typeof f2 && "" !== f2) {
          if (0 === d.indexOf("--")) {
            var e = v(d);
            f2 = v(("" + f2).trim());
          } else {
            e = d;
            var g = sa$1.get(e);
            void 0 !== g
              ? (e = g)
              : ((g = v(
                  e.replace(oa$1, "-$1").toLowerCase().replace(pa$1, "-ms-"),
                )),
                sa$1.set(e, g),
                (e = g));
            f2 =
              "number" === typeof f2
                ? 0 === f2 || p$1.call(u$1, d)
                  ? "" + f2
                  : f2 + "px"
                : v(("" + f2).trim());
          }
          b
            ? ((b = false), a.push(' style="', e, ":", f2))
            : a.push(";", e, ":", f2);
        }
      }
    b || a.push('"');
  }
  function x$1(a, b, c, d) {
    switch (c) {
      case "style":
        ta$1(a, b, d);
        return;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
        return;
    }
    if (
      !(2 < c.length) ||
      ("o" !== c[0] && "O" !== c[0]) ||
      ("n" !== c[1] && "N" !== c[1])
    ) {
      if (((b = t$1.hasOwnProperty(c) ? t$1[c] : null), null !== b)) {
        switch (typeof d) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (!b.acceptsBooleans) return;
        }
        c = b.attributeName;
        switch (b.type) {
          case 3:
            d && a.push(" ", c, '=""');
            break;
          case 4:
            true === d
              ? a.push(" ", c, '=""')
              : false !== d && a.push(" ", c, '="', v(d), '"');
            break;
          case 5:
            isNaN(d) || a.push(" ", c, '="', v(d), '"');
            break;
          case 6:
            !isNaN(d) && 1 <= d && a.push(" ", c, '="', v(d), '"');
            break;
          default:
            b.sanitizeURL && (d = "" + d), a.push(" ", c, '="', v(d), '"');
        }
      } else if (ja$1(c)) {
        switch (typeof d) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (
              ((b = c.toLowerCase().slice(0, 5)),
              "data-" !== b && "aria-" !== b)
            )
              return;
        }
        a.push(" ", c, '="', v(d), '"');
      }
    }
  }
  function y$1(a, b, c) {
    if (null != b) {
      if (null != c) throw Error(l$2(60));
      if ("object" !== typeof b || !("__html" in b)) throw Error(l$2(61));
      b = b.__html;
      null !== b && void 0 !== b && a.push("" + b);
    }
  }
  function ua$1(a) {
    var b = "";
    aa$1.Children.forEach(a, function (a2) {
      null != a2 && (b += a2);
    });
    return b;
  }
  function va$1(a, b, c, d) {
    a.push(A(c));
    var f2 = (c = null),
      e;
    for (e in b)
      if (p$1.call(b, e)) {
        var g = b[e];
        if (null != g)
          switch (e) {
            case "children":
              c = g;
              break;
            case "dangerouslySetInnerHTML":
              f2 = g;
              break;
            default:
              x$1(a, d, e, g);
          }
      }
    a.push(">");
    y$1(a, f2, c);
    return "string" === typeof c ? (a.push(v(c)), null) : c;
  }
  var wa$1 = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
    xa$1 = /* @__PURE__ */ new Map();
  function A(a) {
    var b = xa$1.get(a);
    if (void 0 === b) {
      if (!wa$1.test(a)) throw Error(l$2(65, a));
      b = "<" + a;
      xa$1.set(a, b);
    }
    return b;
  }
  function ya$1(a, b, c, d, f2) {
    switch (b) {
      case "select":
        a.push(A("select"));
        var e = null,
          g = null;
        for (n2 in c)
          if (p$1.call(c, n2)) {
            var h = c[n2];
            if (null != h)
              switch (n2) {
                case "children":
                  e = h;
                  break;
                case "dangerouslySetInnerHTML":
                  g = h;
                  break;
                case "defaultValue":
                case "value":
                  break;
                default:
                  x$1(a, d, n2, h);
              }
          }
        a.push(">");
        y$1(a, g, e);
        return e;
      case "option":
        g = f2.selectedValue;
        a.push(A("option"));
        var k2 = (h = null),
          m2 = null;
        var n2 = null;
        for (e in c)
          if (p$1.call(c, e)) {
            var q2 = c[e];
            if (null != q2)
              switch (e) {
                case "children":
                  h = q2;
                  break;
                case "selected":
                  m2 = q2;
                  break;
                case "dangerouslySetInnerHTML":
                  n2 = q2;
                  break;
                case "value":
                  k2 = q2;
                default:
                  x$1(a, d, e, q2);
              }
          }
        if (null != g)
          if (((c = null !== k2 ? "" + k2 : ua$1(h)), qa$1(g)))
            for (d = 0; d < g.length; d++) {
              if ("" + g[d] === c) {
                a.push(' selected=""');
                break;
              }
            }
          else "" + g === c && a.push(' selected=""');
        else m2 && a.push(' selected=""');
        a.push(">");
        y$1(a, n2, h);
        return h;
      case "textarea":
        a.push(A("textarea"));
        n2 = g = e = null;
        for (h in c)
          if (p$1.call(c, h) && ((k2 = c[h]), null != k2))
            switch (h) {
              case "children":
                n2 = k2;
                break;
              case "value":
                e = k2;
                break;
              case "defaultValue":
                g = k2;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(l$2(91));
              default:
                x$1(a, d, h, k2);
            }
        null === e && null !== g && (e = g);
        a.push(">");
        if (null != n2) {
          if (null != e) throw Error(l$2(92));
          if (qa$1(n2) && 1 < n2.length) throw Error(l$2(93));
          e = "" + n2;
        }
        "string" === typeof e && "\n" === e[0] && a.push("\n");
        null !== e && a.push(v("" + e));
        return null;
      case "input":
        a.push(A("input"));
        k2 = n2 = h = e = null;
        for (g in c)
          if (p$1.call(c, g) && ((m2 = c[g]), null != m2))
            switch (g) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l$2(399, "input"));
              case "defaultChecked":
                k2 = m2;
                break;
              case "defaultValue":
                h = m2;
                break;
              case "checked":
                n2 = m2;
                break;
              case "value":
                e = m2;
                break;
              default:
                x$1(a, d, g, m2);
            }
        null !== n2
          ? x$1(a, d, "checked", n2)
          : null !== k2 && x$1(a, d, "checked", k2);
        null !== e
          ? x$1(a, d, "value", e)
          : null !== h && x$1(a, d, "value", h);
        a.push("/>");
        return null;
      case "menuitem":
        a.push(A("menuitem"));
        for (var C2 in c)
          if (p$1.call(c, C2) && ((e = c[C2]), null != e))
            switch (C2) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l$2(400));
              default:
                x$1(a, d, C2, e);
            }
        a.push(">");
        return null;
      case "title":
        a.push(A("title"));
        e = null;
        for (q2 in c)
          if (p$1.call(c, q2) && ((g = c[q2]), null != g))
            switch (q2) {
              case "children":
                e = g;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(l$2(434));
              default:
                x$1(a, d, q2, g);
            }
        a.push(">");
        return e;
      case "listing":
      case "pre":
        a.push(A(b));
        g = e = null;
        for (k2 in c)
          if (p$1.call(c, k2) && ((h = c[k2]), null != h))
            switch (k2) {
              case "children":
                e = h;
                break;
              case "dangerouslySetInnerHTML":
                g = h;
                break;
              default:
                x$1(a, d, k2, h);
            }
        a.push(">");
        if (null != g) {
          if (null != e) throw Error(l$2(60));
          if ("object" !== typeof g || !("__html" in g)) throw Error(l$2(61));
          c = g.__html;
          null !== c &&
            void 0 !== c &&
            ("string" === typeof c && 0 < c.length && "\n" === c[0]
              ? a.push("\n", c)
              : a.push("" + c));
        }
        "string" === typeof e && "\n" === e[0] && a.push("\n");
        return e;
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        a.push(A(b));
        for (var D2 in c)
          if (p$1.call(c, D2) && ((e = c[D2]), null != e))
            switch (D2) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l$2(399, b));
              default:
                x$1(a, d, D2, e);
            }
        a.push("/>");
        return null;
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return va$1(a, c, b, d);
      case "html":
        return (
          0 === f2.insertionMode && a.push("<!DOCTYPE html>"), va$1(a, c, b, d)
        );
      default:
        if (-1 === b.indexOf("-") && "string" !== typeof c.is)
          return va$1(a, c, b, d);
        a.push(A(b));
        g = e = null;
        for (m2 in c)
          if (p$1.call(c, m2) && ((h = c[m2]), null != h))
            switch (m2) {
              case "children":
                e = h;
                break;
              case "dangerouslySetInnerHTML":
                g = h;
                break;
              case "style":
                ta$1(a, d, h);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                break;
              default:
                ja$1(m2) &&
                  "function" !== typeof h &&
                  "symbol" !== typeof h &&
                  a.push(" ", m2, '="', v(h), '"');
            }
        a.push(">");
        y$1(a, g, e);
        return e;
    }
  }
  function za$1(a, b, c) {
    a.push('<!--$?--><template id="');
    if (null === c) throw Error(l$2(395));
    a.push(c);
    return a.push('"></template>');
  }
  function Aa$1(a, b, c, d) {
    switch (c.insertionMode) {
      case 0:
      case 1:
        return (
          a.push('<div hidden id="'),
          a.push(b.segmentPrefix),
          (b = d.toString(16)),
          a.push(b),
          a.push('">')
        );
      case 2:
        return (
          a.push('<svg aria-hidden="true" style="display:none" id="'),
          a.push(b.segmentPrefix),
          (b = d.toString(16)),
          a.push(b),
          a.push('">')
        );
      case 3:
        return (
          a.push('<math aria-hidden="true" style="display:none" id="'),
          a.push(b.segmentPrefix),
          (b = d.toString(16)),
          a.push(b),
          a.push('">')
        );
      case 4:
        return (
          a.push('<table hidden id="'),
          a.push(b.segmentPrefix),
          (b = d.toString(16)),
          a.push(b),
          a.push('">')
        );
      case 5:
        return (
          a.push('<table hidden><tbody id="'),
          a.push(b.segmentPrefix),
          (b = d.toString(16)),
          a.push(b),
          a.push('">')
        );
      case 6:
        return (
          a.push('<table hidden><tr id="'),
          a.push(b.segmentPrefix),
          (b = d.toString(16)),
          a.push(b),
          a.push('">')
        );
      case 7:
        return (
          a.push('<table hidden><colgroup id="'),
          a.push(b.segmentPrefix),
          (b = d.toString(16)),
          a.push(b),
          a.push('">')
        );
      default:
        throw Error(l$2(397));
    }
  }
  function Ba$1(a, b) {
    switch (b.insertionMode) {
      case 0:
      case 1:
        return a.push("</div>");
      case 2:
        return a.push("</svg>");
      case 3:
        return a.push("</math>");
      case 4:
        return a.push("</table>");
      case 5:
        return a.push("</tbody></table>");
      case 6:
        return a.push("</tr></table>");
      case 7:
        return a.push("</colgroup></table>");
      default:
        throw Error(l$2(397));
    }
  }
  var Ca$1 = /[<\u2028\u2029]/g;
  function Da$1(a) {
    return JSON.stringify(a).replace(Ca$1, function (a2) {
      switch (a2) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error(
            "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React",
          );
      }
    });
  }
  function Ea$1(a, b) {
    b = void 0 === b ? "" : b;
    return {
      bootstrapChunks: [],
      startInlineScript: "<script>",
      placeholderPrefix: b + "P:",
      segmentPrefix: b + "S:",
      boundaryPrefix: b + "B:",
      idPrefix: b,
      nextSuspenseID: 0,
      sentCompleteSegmentFunction: false,
      sentCompleteBoundaryFunction: false,
      sentClientRenderFunction: false,
      generateStaticMarkup: a,
    };
  }
  function Fa$1(a, b, c, d) {
    if (c.generateStaticMarkup) return a.push(v(b)), false;
    "" === b ? (a = d) : (d && a.push("<!-- -->"), a.push(v(b)), (a = true));
    return a;
  }
  var B$1 = Object.assign,
    Ga$1 = Symbol.for("react.element"),
    Ha$1 = Symbol.for("react.portal"),
    Ia$1 = Symbol.for("react.fragment"),
    Ja$1 = Symbol.for("react.strict_mode"),
    Ka$1 = Symbol.for("react.profiler"),
    La$1 = Symbol.for("react.provider"),
    Ma$1 = Symbol.for("react.context"),
    Na$1 = Symbol.for("react.forward_ref"),
    Oa$1 = Symbol.for("react.suspense"),
    Pa$1 = Symbol.for("react.suspense_list"),
    Qa$1 = Symbol.for("react.memo"),
    Ra$1 = Symbol.for("react.lazy"),
    Sa$1 = Symbol.for("react.scope"),
    Ta$1 = Symbol.for("react.debug_trace_mode"),
    Ua$1 = Symbol.for("react.legacy_hidden"),
    Va$1 = Symbol.for("react.default_value"),
    Wa$1 = Symbol.iterator;
  function Xa$1(a) {
    if (null == a) return null;
    if ("function" === typeof a) return a.displayName || a.name || null;
    if ("string" === typeof a) return a;
    switch (a) {
      case Ia$1:
        return "Fragment";
      case Ha$1:
        return "Portal";
      case Ka$1:
        return "Profiler";
      case Ja$1:
        return "StrictMode";
      case Oa$1:
        return "Suspense";
      case Pa$1:
        return "SuspenseList";
    }
    if ("object" === typeof a)
      switch (a.$$typeof) {
        case Ma$1:
          return (a.displayName || "Context") + ".Consumer";
        case La$1:
          return (a._context.displayName || "Context") + ".Provider";
        case Na$1:
          var b = a.render;
          a = a.displayName;
          a ||
            ((a = b.displayName || b.name || ""),
            (a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef"));
          return a;
        case Qa$1:
          return (
            (b = a.displayName || null), null !== b ? b : Xa$1(a.type) || "Memo"
          );
        case Ra$1:
          b = a._payload;
          a = a._init;
          try {
            return Xa$1(a(b));
          } catch (c) {}
      }
    return null;
  }
  var Ya$1 = {};
  function Za$1(a, b) {
    a = a.contextTypes;
    if (!a) return Ya$1;
    var c = {},
      d;
    for (d in a) c[d] = b[d];
    return c;
  }
  var E$1 = null;
  function F(a, b) {
    if (a !== b) {
      a.context._currentValue2 = a.parentValue;
      a = a.parent;
      var c = b.parent;
      if (null === a) {
        if (null !== c) throw Error(l$2(401));
      } else {
        if (null === c) throw Error(l$2(401));
        F(a, c);
      }
      b.context._currentValue2 = b.value;
    }
  }
  function $a$1(a) {
    a.context._currentValue2 = a.parentValue;
    a = a.parent;
    null !== a && $a$1(a);
  }
  function ab$1(a) {
    var b = a.parent;
    null !== b && ab$1(b);
    a.context._currentValue2 = a.value;
  }
  function bb$1(a, b) {
    a.context._currentValue2 = a.parentValue;
    a = a.parent;
    if (null === a) throw Error(l$2(402));
    a.depth === b.depth ? F(a, b) : bb$1(a, b);
  }
  function cb$1(a, b) {
    var c = b.parent;
    if (null === c) throw Error(l$2(402));
    a.depth === c.depth ? F(a, c) : cb$1(a, c);
    b.context._currentValue2 = b.value;
  }
  function G(a) {
    var b = E$1;
    b !== a &&
      (null === b
        ? ab$1(a)
        : null === a
          ? $a$1(b)
          : b.depth === a.depth
            ? F(b, a)
            : b.depth > a.depth
              ? bb$1(b, a)
              : cb$1(b, a),
      (E$1 = a));
  }
  var db$1 = {
    isMounted: function () {
      return false;
    },
    enqueueSetState: function (a, b) {
      a = a._reactInternals;
      null !== a.queue && a.queue.push(b);
    },
    enqueueReplaceState: function (a, b) {
      a = a._reactInternals;
      a.replace = true;
      a.queue = [b];
    },
    enqueueForceUpdate: function () {},
  };
  function eb$1(a, b, c, d) {
    var f2 = void 0 !== a.state ? a.state : null;
    a.updater = db$1;
    a.props = c;
    a.state = f2;
    var e = { queue: [], replace: false };
    a._reactInternals = e;
    var g = b.contextType;
    a.context = "object" === typeof g && null !== g ? g._currentValue2 : d;
    g = b.getDerivedStateFromProps;
    "function" === typeof g &&
      ((g = g(c, f2)),
      (f2 = null === g || void 0 === g ? f2 : B$1({}, f2, g)),
      (a.state = f2));
    if (
      "function" !== typeof b.getDerivedStateFromProps &&
      "function" !== typeof a.getSnapshotBeforeUpdate &&
      ("function" === typeof a.UNSAFE_componentWillMount ||
        "function" === typeof a.componentWillMount)
    )
      if (
        ((b = a.state),
        "function" === typeof a.componentWillMount && a.componentWillMount(),
        "function" === typeof a.UNSAFE_componentWillMount &&
          a.UNSAFE_componentWillMount(),
        b !== a.state && db$1.enqueueReplaceState(a, a.state, null),
        null !== e.queue && 0 < e.queue.length)
      )
        if (
          ((b = e.queue),
          (g = e.replace),
          (e.queue = null),
          (e.replace = false),
          g && 1 === b.length)
        )
          a.state = b[0];
        else {
          e = g ? b[0] : a.state;
          f2 = true;
          for (g = g ? 1 : 0; g < b.length; g++) {
            var h = b[g];
            h = "function" === typeof h ? h.call(a, e, c, d) : h;
            null != h && (f2 ? ((f2 = false), (e = B$1({}, e, h))) : B$1(e, h));
          }
          a.state = e;
        }
      else e.queue = null;
  }
  var fb$1 = { id: 1, overflow: "" };
  function gb$1(a, b, c) {
    var d = a.id;
    a = a.overflow;
    var f2 = 32 - H$1(d) - 1;
    d &= ~(1 << f2);
    c += 1;
    var e = 32 - H$1(b) + f2;
    if (30 < e) {
      var g = f2 - (f2 % 5);
      e = (d & ((1 << g) - 1)).toString(32);
      d >>= g;
      f2 -= g;
      return { id: (1 << (32 - H$1(b) + f2)) | (c << f2) | d, overflow: e + a };
    }
    return { id: (1 << e) | (c << f2) | d, overflow: a };
  }
  var H$1 = Math.clz32 ? Math.clz32 : hb$1,
    ib$1 = Math.log,
    jb$1 = Math.LN2;
  function hb$1(a) {
    a >>>= 0;
    return 0 === a ? 32 : (31 - ((ib$1(a) / jb$1) | 0)) | 0;
  }
  function kb$1(a, b) {
    return (a === b && (0 !== a || 1 / a === 1 / b)) || (a !== a && b !== b);
  }
  var lb$1 = "function" === typeof Object.is ? Object.is : kb$1,
    I$1 = null,
    ob$1 = null,
    J$1 = null,
    K$1 = null,
    L$1 = false,
    M$1 = false,
    N$1 = 0,
    O$1 = null,
    P$1 = 0;
  function Q$1() {
    if (null === I$1) throw Error(l$2(321));
    return I$1;
  }
  function pb$1() {
    if (0 < P$1) throw Error(l$2(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function qb$1() {
    null === K$1
      ? null === J$1
        ? ((L$1 = false), (J$1 = K$1 = pb$1()))
        : ((L$1 = true), (K$1 = J$1))
      : null === K$1.next
        ? ((L$1 = false), (K$1 = K$1.next = pb$1()))
        : ((L$1 = true), (K$1 = K$1.next));
    return K$1;
  }
  function rb$1() {
    ob$1 = I$1 = null;
    M$1 = false;
    J$1 = null;
    P$1 = 0;
    K$1 = O$1 = null;
  }
  function sb$1(a, b) {
    return "function" === typeof b ? b(a) : b;
  }
  function tb$1(a, b, c) {
    I$1 = Q$1();
    K$1 = qb$1();
    if (L$1) {
      var d = K$1.queue;
      b = d.dispatch;
      if (null !== O$1 && ((c = O$1.get(d)), void 0 !== c)) {
        O$1.delete(d);
        d = K$1.memoizedState;
        do (d = a(d, c.action)), (c = c.next);
        while (null !== c);
        K$1.memoizedState = d;
        return [d, b];
      }
      return [K$1.memoizedState, b];
    }
    a =
      a === sb$1
        ? "function" === typeof b
          ? b()
          : b
        : void 0 !== c
          ? c(b)
          : b;
    K$1.memoizedState = a;
    a = K$1.queue = { last: null, dispatch: null };
    a = a.dispatch = ub$1.bind(null, I$1, a);
    return [K$1.memoizedState, a];
  }
  function vb$1(a, b) {
    I$1 = Q$1();
    K$1 = qb$1();
    b = void 0 === b ? null : b;
    if (null !== K$1) {
      var c = K$1.memoizedState;
      if (null !== c && null !== b) {
        var d = c[1];
        a: if (null === d) d = false;
        else {
          for (var f2 = 0; f2 < d.length && f2 < b.length; f2++)
            if (!lb$1(b[f2], d[f2])) {
              d = false;
              break a;
            }
          d = true;
        }
        if (d) return c[0];
      }
    }
    a = a();
    K$1.memoizedState = [a, b];
    return a;
  }
  function ub$1(a, b, c) {
    if (25 <= P$1) throw Error(l$2(301));
    if (a === I$1)
      if (
        ((M$1 = true),
        (a = { action: c, next: null }),
        null === O$1 && (O$1 = /* @__PURE__ */ new Map()),
        (c = O$1.get(b)),
        void 0 === c)
      )
        O$1.set(b, a);
      else {
        for (b = c; null !== b.next; ) b = b.next;
        b.next = a;
      }
  }
  function wb$1() {
    throw Error(l$2(394));
  }
  function R$1() {}
  var xb$1 = {
      readContext: function (a) {
        return a._currentValue2;
      },
      useContext: function (a) {
        Q$1();
        return a._currentValue2;
      },
      useMemo: vb$1,
      useReducer: tb$1,
      useRef: function (a) {
        I$1 = Q$1();
        K$1 = qb$1();
        var b = K$1.memoizedState;
        return null === b ? ((a = { current: a }), (K$1.memoizedState = a)) : b;
      },
      useState: function (a) {
        return tb$1(sb$1, a);
      },
      useInsertionEffect: R$1,
      useLayoutEffect: function () {},
      useCallback: function (a, b) {
        return vb$1(function () {
          return a;
        }, b);
      },
      useImperativeHandle: R$1,
      useEffect: R$1,
      useDebugValue: R$1,
      useDeferredValue: function (a) {
        Q$1();
        return a;
      },
      useTransition: function () {
        Q$1();
        return [false, wb$1];
      },
      useId: function () {
        var a = ob$1.treeContext;
        var b = a.overflow;
        a = a.id;
        a = (a & ~(1 << (32 - H$1(a) - 1))).toString(32) + b;
        var c = S$1;
        if (null === c) throw Error(l$2(404));
        b = N$1++;
        a = ":" + c.idPrefix + "R" + a;
        0 < b && (a += "H" + b.toString(32));
        return a + ":";
      },
      useMutableSource: function (a, b) {
        Q$1();
        return b(a._source);
      },
      useSyncExternalStore: function (a, b, c) {
        if (void 0 === c) throw Error(l$2(407));
        return c();
      },
    },
    S$1 = null,
    yb$1 =
      aa$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .ReactCurrentDispatcher;
  function zb$1(a) {
    console.error(a);
    return null;
  }
  function T$1() {}
  function Ab$1(a, b, c, d, f2, e, g, h, k2) {
    var m2 = [],
      n2 = /* @__PURE__ */ new Set();
    b = {
      destination: null,
      responseState: b,
      progressiveChunkSize: void 0 === d ? 12800 : d,
      status: 0,
      fatalError: null,
      nextSegmentId: 0,
      allPendingTasks: 0,
      pendingRootTasks: 0,
      completedRootSegment: null,
      abortableTasks: n2,
      pingedTasks: m2,
      clientRenderedBoundaries: [],
      completedBoundaries: [],
      partialBoundaries: [],
      onError: void 0 === f2 ? zb$1 : f2,
      onAllReady: void 0 === e ? T$1 : e,
      onShellReady: void 0 === g ? T$1 : g,
      onShellError: void 0 === h ? T$1 : h,
      onFatalError: void 0 === k2 ? T$1 : k2,
    };
    c = U$1(b, 0, null, c, false, false);
    c.parentFlushed = true;
    a = Bb$1(b, a, null, c, n2, Ya$1, null, fb$1);
    m2.push(a);
    return b;
  }
  function Bb$1(a, b, c, d, f2, e, g, h) {
    a.allPendingTasks++;
    null === c ? a.pendingRootTasks++ : c.pendingTasks++;
    var k2 = {
      node: b,
      ping: function () {
        var b2 = a.pingedTasks;
        b2.push(k2);
        1 === b2.length && Cb$1(a);
      },
      blockedBoundary: c,
      blockedSegment: d,
      abortSet: f2,
      legacyContext: e,
      context: g,
      treeContext: h,
    };
    f2.add(k2);
    return k2;
  }
  function U$1(a, b, c, d, f2, e) {
    return {
      status: 0,
      id: -1,
      index: b,
      parentFlushed: false,
      chunks: [],
      children: [],
      formatContext: d,
      boundary: c,
      lastPushedText: f2,
      textEmbedded: e,
    };
  }
  function V$1(a, b) {
    a = a.onError(b);
    if (null != a && "string" !== typeof a)
      throw Error(
        'onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' +
          typeof a +
          '" instead',
      );
    return a;
  }
  function W$1(a, b) {
    var c = a.onShellError;
    c(b);
    c = a.onFatalError;
    c(b);
    null !== a.destination
      ? ((a.status = 2), a.destination.destroy(b))
      : ((a.status = 1), (a.fatalError = b));
  }
  function Db$1(a, b, c, d, f2) {
    I$1 = {};
    ob$1 = b;
    N$1 = 0;
    for (a = c(d, f2); M$1; )
      (M$1 = false), (N$1 = 0), (P$1 += 1), (K$1 = null), (a = c(d, f2));
    rb$1();
    return a;
  }
  function Eb$1(a, b, c, d) {
    var f2 = c.render(),
      e = d.childContextTypes;
    if (null !== e && void 0 !== e) {
      var g = b.legacyContext;
      if ("function" !== typeof c.getChildContext) d = g;
      else {
        c = c.getChildContext();
        for (var h in c)
          if (!(h in e)) throw Error(l$2(108, Xa$1(d) || "Unknown", h));
        d = B$1({}, g, c);
      }
      b.legacyContext = d;
      X$1(a, b, f2);
      b.legacyContext = g;
    } else X$1(a, b, f2);
  }
  function Fb(a, b) {
    if (a && a.defaultProps) {
      b = B$1({}, b);
      a = a.defaultProps;
      for (var c in a) void 0 === b[c] && (b[c] = a[c]);
      return b;
    }
    return b;
  }
  function Gb$1(a, b, c, d, f2) {
    if ("function" === typeof c)
      if (c.prototype && c.prototype.isReactComponent) {
        f2 = Za$1(c, b.legacyContext);
        var e = c.contextType;
        e = new c(
          d,
          "object" === typeof e && null !== e ? e._currentValue2 : f2,
        );
        eb$1(e, c, d, f2);
        Eb$1(a, b, e, c);
      } else {
        e = Za$1(c, b.legacyContext);
        f2 = Db$1(a, b, c, d, e);
        var g = 0 !== N$1;
        if (
          "object" === typeof f2 &&
          null !== f2 &&
          "function" === typeof f2.render &&
          void 0 === f2.$$typeof
        )
          eb$1(f2, c, d, e), Eb$1(a, b, f2, c);
        else if (g) {
          d = b.treeContext;
          b.treeContext = gb$1(d, 1, 0);
          try {
            X$1(a, b, f2);
          } finally {
            b.treeContext = d;
          }
        } else X$1(a, b, f2);
      }
    else if ("string" === typeof c) {
      f2 = b.blockedSegment;
      e = ya$1(f2.chunks, c, d, a.responseState, f2.formatContext);
      f2.lastPushedText = false;
      g = f2.formatContext;
      f2.formatContext = ra$1(g, c, d);
      Hb$1(a, b, e);
      f2.formatContext = g;
      switch (c) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          f2.chunks.push("</", c, ">");
      }
      f2.lastPushedText = false;
    } else {
      switch (c) {
        case Ua$1:
        case Ta$1:
        case Ja$1:
        case Ka$1:
        case Ia$1:
          X$1(a, b, d.children);
          return;
        case Pa$1:
          X$1(a, b, d.children);
          return;
        case Sa$1:
          throw Error(l$2(343));
        case Oa$1:
          a: {
            c = b.blockedBoundary;
            f2 = b.blockedSegment;
            e = d.fallback;
            d = d.children;
            g = /* @__PURE__ */ new Set();
            var h = {
                id: null,
                rootSegmentID: -1,
                parentFlushed: false,
                pendingTasks: 0,
                forceClientRender: false,
                completedSegments: [],
                byteSize: 0,
                fallbackAbortableTasks: g,
                errorDigest: null,
              },
              k2 = U$1(a, f2.chunks.length, h, f2.formatContext, false, false);
            f2.children.push(k2);
            f2.lastPushedText = false;
            var m2 = U$1(a, 0, null, f2.formatContext, false, false);
            m2.parentFlushed = true;
            b.blockedBoundary = h;
            b.blockedSegment = m2;
            try {
              if (
                (Hb$1(a, b, d),
                a.responseState.generateStaticMarkup ||
                  (m2.lastPushedText &&
                    m2.textEmbedded &&
                    m2.chunks.push("<!-- -->")),
                (m2.status = 1),
                Y$1(h, m2),
                0 === h.pendingTasks)
              )
                break a;
            } catch (n2) {
              (m2.status = 4),
                (h.forceClientRender = true),
                (h.errorDigest = V$1(a, n2));
            } finally {
              (b.blockedBoundary = c), (b.blockedSegment = f2);
            }
            b = Bb$1(a, e, c, k2, g, b.legacyContext, b.context, b.treeContext);
            a.pingedTasks.push(b);
          }
          return;
      }
      if ("object" === typeof c && null !== c)
        switch (c.$$typeof) {
          case Na$1:
            d = Db$1(a, b, c.render, d, f2);
            if (0 !== N$1) {
              c = b.treeContext;
              b.treeContext = gb$1(c, 1, 0);
              try {
                X$1(a, b, d);
              } finally {
                b.treeContext = c;
              }
            } else X$1(a, b, d);
            return;
          case Qa$1:
            c = c.type;
            d = Fb(c, d);
            Gb$1(a, b, c, d, f2);
            return;
          case La$1:
            f2 = d.children;
            c = c._context;
            d = d.value;
            e = c._currentValue2;
            c._currentValue2 = d;
            g = E$1;
            E$1 = d = {
              parent: g,
              depth: null === g ? 0 : g.depth + 1,
              context: c,
              parentValue: e,
              value: d,
            };
            b.context = d;
            X$1(a, b, f2);
            a = E$1;
            if (null === a) throw Error(l$2(403));
            d = a.parentValue;
            a.context._currentValue2 = d === Va$1 ? a.context._defaultValue : d;
            a = E$1 = a.parent;
            b.context = a;
            return;
          case Ma$1:
            d = d.children;
            d = d(c._currentValue2);
            X$1(a, b, d);
            return;
          case Ra$1:
            f2 = c._init;
            c = f2(c._payload);
            d = Fb(c, d);
            Gb$1(a, b, c, d, void 0);
            return;
        }
      throw Error(l$2(130, null == c ? c : typeof c, ""));
    }
  }
  function X$1(a, b, c) {
    b.node = c;
    if ("object" === typeof c && null !== c) {
      switch (c.$$typeof) {
        case Ga$1:
          Gb$1(a, b, c.type, c.props, c.ref);
          return;
        case Ha$1:
          throw Error(l$2(257));
        case Ra$1:
          var d = c._init;
          c = d(c._payload);
          X$1(a, b, c);
          return;
      }
      if (qa$1(c)) {
        Ib$1(a, b, c);
        return;
      }
      null === c || "object" !== typeof c
        ? (d = null)
        : ((d = (Wa$1 && c[Wa$1]) || c["@@iterator"]),
          (d = "function" === typeof d ? d : null));
      if (d && (d = d.call(c))) {
        c = d.next();
        if (!c.done) {
          var f2 = [];
          do f2.push(c.value), (c = d.next());
          while (!c.done);
          Ib$1(a, b, f2);
        }
        return;
      }
      a = Object.prototype.toString.call(c);
      throw Error(
        l$2(
          31,
          "[object Object]" === a
            ? "object with keys {" + Object.keys(c).join(", ") + "}"
            : a,
        ),
      );
    }
    "string" === typeof c
      ? ((d = b.blockedSegment),
        (d.lastPushedText = Fa$1(
          b.blockedSegment.chunks,
          c,
          a.responseState,
          d.lastPushedText,
        )))
      : "number" === typeof c &&
        ((d = b.blockedSegment),
        (d.lastPushedText = Fa$1(
          b.blockedSegment.chunks,
          "" + c,
          a.responseState,
          d.lastPushedText,
        )));
  }
  function Ib$1(a, b, c) {
    for (var d = c.length, f2 = 0; f2 < d; f2++) {
      var e = b.treeContext;
      b.treeContext = gb$1(e, d, f2);
      try {
        Hb$1(a, b, c[f2]);
      } finally {
        b.treeContext = e;
      }
    }
  }
  function Hb$1(a, b, c) {
    var d = b.blockedSegment.formatContext,
      f2 = b.legacyContext,
      e = b.context;
    try {
      return X$1(a, b, c);
    } catch (k2) {
      if (
        (rb$1(),
        "object" === typeof k2 && null !== k2 && "function" === typeof k2.then)
      ) {
        c = k2;
        var g = b.blockedSegment,
          h = U$1(
            a,
            g.chunks.length,
            null,
            g.formatContext,
            g.lastPushedText,
            true,
          );
        g.children.push(h);
        g.lastPushedText = false;
        a = Bb$1(
          a,
          b.node,
          b.blockedBoundary,
          h,
          b.abortSet,
          b.legacyContext,
          b.context,
          b.treeContext,
        ).ping;
        c.then(a, a);
        b.blockedSegment.formatContext = d;
        b.legacyContext = f2;
        b.context = e;
        G(e);
      } else
        throw (
          ((b.blockedSegment.formatContext = d),
          (b.legacyContext = f2),
          (b.context = e),
          G(e),
          k2)
        );
    }
  }
  function Jb$1(a) {
    var b = a.blockedBoundary;
    a = a.blockedSegment;
    a.status = 3;
    Kb$1(this, b, a);
  }
  function Lb$1(a, b, c) {
    var d = a.blockedBoundary;
    a.blockedSegment.status = 3;
    null === d
      ? (b.allPendingTasks--,
        2 !== b.status &&
          ((b.status = 2), null !== b.destination && b.destination.push(null)))
      : (d.pendingTasks--,
        d.forceClientRender ||
          ((d.forceClientRender = true),
          (a = void 0 === c ? Error(l$2(432)) : c),
          (d.errorDigest = b.onError(a)),
          d.parentFlushed && b.clientRenderedBoundaries.push(d)),
        d.fallbackAbortableTasks.forEach(function (a2) {
          return Lb$1(a2, b, c);
        }),
        d.fallbackAbortableTasks.clear(),
        b.allPendingTasks--,
        0 === b.allPendingTasks && ((d = b.onAllReady), d()));
  }
  function Y$1(a, b) {
    if (
      0 === b.chunks.length &&
      1 === b.children.length &&
      null === b.children[0].boundary
    ) {
      var c = b.children[0];
      c.id = b.id;
      c.parentFlushed = true;
      1 === c.status && Y$1(a, c);
    } else a.completedSegments.push(b);
  }
  function Kb$1(a, b, c) {
    if (null === b) {
      if (c.parentFlushed) {
        if (null !== a.completedRootSegment) throw Error(l$2(389));
        a.completedRootSegment = c;
      }
      a.pendingRootTasks--;
      0 === a.pendingRootTasks &&
        ((a.onShellError = T$1), (b = a.onShellReady), b());
    } else
      b.pendingTasks--,
        b.forceClientRender ||
          (0 === b.pendingTasks
            ? (c.parentFlushed && 1 === c.status && Y$1(b, c),
              b.parentFlushed && a.completedBoundaries.push(b),
              b.fallbackAbortableTasks.forEach(Jb$1, a),
              b.fallbackAbortableTasks.clear())
            : c.parentFlushed &&
              1 === c.status &&
              (Y$1(b, c),
              1 === b.completedSegments.length &&
                b.parentFlushed &&
                a.partialBoundaries.push(b)));
    a.allPendingTasks--;
    0 === a.allPendingTasks && ((a = a.onAllReady), a());
  }
  function Cb$1(a) {
    if (2 !== a.status) {
      var b = E$1,
        c = yb$1.current;
      yb$1.current = xb$1;
      var d = S$1;
      S$1 = a.responseState;
      try {
        var f2 = a.pingedTasks,
          e;
        for (e = 0; e < f2.length; e++) {
          var g = f2[e];
          var h = a,
            k2 = g.blockedSegment;
          if (0 === k2.status) {
            G(g.context);
            try {
              X$1(h, g, g.node),
                h.responseState.generateStaticMarkup ||
                  (k2.lastPushedText &&
                    k2.textEmbedded &&
                    k2.chunks.push("<!-- -->")),
                g.abortSet.delete(g),
                (k2.status = 1),
                Kb$1(h, g.blockedBoundary, k2);
            } catch (z2) {
              if (
                (rb$1(),
                "object" === typeof z2 &&
                  null !== z2 &&
                  "function" === typeof z2.then)
              ) {
                var m2 = g.ping;
                z2.then(m2, m2);
              } else {
                g.abortSet.delete(g);
                k2.status = 4;
                var n2 = g.blockedBoundary,
                  q2 = z2,
                  C2 = V$1(h, q2);
                null === n2
                  ? W$1(h, q2)
                  : (n2.pendingTasks--,
                    n2.forceClientRender ||
                      ((n2.forceClientRender = true),
                      (n2.errorDigest = C2),
                      n2.parentFlushed && h.clientRenderedBoundaries.push(n2)));
                h.allPendingTasks--;
                if (0 === h.allPendingTasks) {
                  var D2 = h.onAllReady;
                  D2();
                }
              }
            } finally {
            }
          }
        }
        f2.splice(0, e);
        null !== a.destination && Mb$1(a, a.destination);
      } catch (z2) {
        V$1(a, z2), W$1(a, z2);
      } finally {
        (S$1 = d), (yb$1.current = c), c === xb$1 && G(b);
      }
    }
  }
  function Z$1(a, b, c) {
    c.parentFlushed = true;
    switch (c.status) {
      case 0:
        var d = (c.id = a.nextSegmentId++);
        c.lastPushedText = false;
        c.textEmbedded = false;
        a = a.responseState;
        b.push('<template id="');
        b.push(a.placeholderPrefix);
        a = d.toString(16);
        b.push(a);
        return b.push('"></template>');
      case 1:
        c.status = 2;
        var f2 = true;
        d = c.chunks;
        var e = 0;
        c = c.children;
        for (var g = 0; g < c.length; g++) {
          for (f2 = c[g]; e < f2.index; e++) b.push(d[e]);
          f2 = Nb$1(a, b, f2);
        }
        for (; e < d.length - 1; e++) b.push(d[e]);
        e < d.length && (f2 = b.push(d[e]));
        return f2;
      default:
        throw Error(l$2(390));
    }
  }
  function Nb$1(a, b, c) {
    var d = c.boundary;
    if (null === d) return Z$1(a, b, c);
    d.parentFlushed = true;
    if (d.forceClientRender)
      return (
        a.responseState.generateStaticMarkup ||
          ((d = d.errorDigest),
          b.push("<!--$!-->"),
          b.push("<template"),
          d && (b.push(' data-dgst="'), (d = v(d)), b.push(d), b.push('"')),
          b.push("></template>")),
        Z$1(a, b, c),
        (a = a.responseState.generateStaticMarkup ? true : b.push("<!--/$-->")),
        a
      );
    if (0 < d.pendingTasks) {
      d.rootSegmentID = a.nextSegmentId++;
      0 < d.completedSegments.length && a.partialBoundaries.push(d);
      var f2 = a.responseState;
      var e = f2.nextSuspenseID++;
      f2 = f2.boundaryPrefix + e.toString(16);
      d = d.id = f2;
      za$1(b, a.responseState, d);
      Z$1(a, b, c);
      return b.push("<!--/$-->");
    }
    if (d.byteSize > a.progressiveChunkSize)
      return (
        (d.rootSegmentID = a.nextSegmentId++),
        a.completedBoundaries.push(d),
        za$1(b, a.responseState, d.id),
        Z$1(a, b, c),
        b.push("<!--/$-->")
      );
    a.responseState.generateStaticMarkup || b.push("<!--$-->");
    c = d.completedSegments;
    if (1 !== c.length) throw Error(l$2(391));
    Nb$1(a, b, c[0]);
    a = a.responseState.generateStaticMarkup ? true : b.push("<!--/$-->");
    return a;
  }
  function Ob$1(a, b, c) {
    Aa$1(b, a.responseState, c.formatContext, c.id);
    Nb$1(a, b, c);
    return Ba$1(b, c.formatContext);
  }
  function Pb$1(a, b, c) {
    for (var d = c.completedSegments, f2 = 0; f2 < d.length; f2++)
      Qb$1(a, b, c, d[f2]);
    d.length = 0;
    a = a.responseState;
    d = c.id;
    c = c.rootSegmentID;
    b.push(a.startInlineScript);
    a.sentCompleteBoundaryFunction
      ? b.push('$RC("')
      : ((a.sentCompleteBoundaryFunction = true),
        b.push(
          'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("',
        ));
    if (null === d) throw Error(l$2(395));
    c = c.toString(16);
    b.push(d);
    b.push('","');
    b.push(a.segmentPrefix);
    b.push(c);
    return b.push('")</script>');
  }
  function Qb$1(a, b, c, d) {
    if (2 === d.status) return true;
    var f2 = d.id;
    if (-1 === f2) {
      if (-1 === (d.id = c.rootSegmentID)) throw Error(l$2(392));
      return Ob$1(a, b, d);
    }
    Ob$1(a, b, d);
    a = a.responseState;
    b.push(a.startInlineScript);
    a.sentCompleteSegmentFunction
      ? b.push('$RS("')
      : ((a.sentCompleteSegmentFunction = true),
        b.push(
          'function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("',
        ));
    b.push(a.segmentPrefix);
    f2 = f2.toString(16);
    b.push(f2);
    b.push('","');
    b.push(a.placeholderPrefix);
    b.push(f2);
    return b.push('")</script>');
  }
  function Mb$1(a, b) {
    try {
      var c = a.completedRootSegment;
      if (null !== c && 0 === a.pendingRootTasks) {
        Nb$1(a, b, c);
        a.completedRootSegment = null;
        var d = a.responseState.bootstrapChunks;
        for (c = 0; c < d.length - 1; c++) b.push(d[c]);
        c < d.length && b.push(d[c]);
      }
      var f2 = a.clientRenderedBoundaries,
        e;
      for (e = 0; e < f2.length; e++) {
        var g = f2[e];
        d = b;
        var h = a.responseState,
          k2 = g.id,
          m2 = g.errorDigest,
          n2 = g.errorMessage,
          q2 = g.errorComponentStack;
        d.push(h.startInlineScript);
        h.sentClientRenderFunction
          ? d.push('$RX("')
          : ((h.sentClientRenderFunction = true),
            d.push(
              'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("',
            ));
        if (null === k2) throw Error(l$2(395));
        d.push(k2);
        d.push('"');
        if (m2 || n2 || q2) {
          d.push(",");
          var C2 = Da$1(m2 || "");
          d.push(C2);
        }
        if (n2 || q2) {
          d.push(",");
          var D2 = Da$1(n2 || "");
          d.push(D2);
        }
        if (q2) {
          d.push(",");
          var z2 = Da$1(q2);
          d.push(z2);
        }
        if (!d.push(")</script>")) {
          a.destination = null;
          e++;
          f2.splice(0, e);
          return;
        }
      }
      f2.splice(0, e);
      var ba2 = a.completedBoundaries;
      for (e = 0; e < ba2.length; e++)
        if (!Pb$1(a, b, ba2[e])) {
          a.destination = null;
          e++;
          ba2.splice(0, e);
          return;
        }
      ba2.splice(0, e);
      var ca2 = a.partialBoundaries;
      for (e = 0; e < ca2.length; e++) {
        var mb2 = ca2[e];
        a: {
          f2 = a;
          g = b;
          var da2 = mb2.completedSegments;
          for (h = 0; h < da2.length; h++)
            if (!Qb$1(f2, g, mb2, da2[h])) {
              h++;
              da2.splice(0, h);
              var nb2 = false;
              break a;
            }
          da2.splice(0, h);
          nb2 = true;
        }
        if (!nb2) {
          a.destination = null;
          e++;
          ca2.splice(0, e);
          return;
        }
      }
      ca2.splice(0, e);
      var ea2 = a.completedBoundaries;
      for (e = 0; e < ea2.length; e++)
        if (!Pb$1(a, b, ea2[e])) {
          a.destination = null;
          e++;
          ea2.splice(0, e);
          return;
        }
      ea2.splice(0, e);
    } finally {
      0 === a.allPendingTasks &&
        0 === a.pingedTasks.length &&
        0 === a.clientRenderedBoundaries.length &&
        0 === a.completedBoundaries.length &&
        b.push(null);
    }
  }
  function Rb$1(a, b) {
    try {
      var c = a.abortableTasks;
      c.forEach(function (c2) {
        return Lb$1(c2, a, b);
      });
      c.clear();
      null !== a.destination && Mb$1(a, a.destination);
    } catch (d) {
      V$1(a, d), W$1(a, d);
    }
  }
  function Sb$1() {}
  function Tb$1(a, b, c, d) {
    var f2 = false,
      e = null,
      g = "",
      h = {
        push: function (a2) {
          null !== a2 && (g += a2);
          return true;
        },
        destroy: function (a2) {
          f2 = true;
          e = a2;
        },
      },
      k2 = false;
    a = Ab$1(
      a,
      Ea$1(c, b ? b.identifierPrefix : void 0),
      { insertionMode: 1, selectedValue: null },
      Infinity,
      Sb$1,
      void 0,
      function () {
        k2 = true;
      },
      void 0,
      void 0,
    );
    Cb$1(a);
    Rb$1(a, d);
    if (1 === a.status) (a.status = 2), h.destroy(a.fatalError);
    else if (2 !== a.status && null === a.destination) {
      a.destination = h;
      try {
        Mb$1(a, h);
      } catch (m2) {
        V$1(a, m2), W$1(a, m2);
      }
    }
    if (f2) throw e;
    if (!k2) throw Error(l$2(426));
    return g;
  }
  reactDomServerLegacy_browser_production_min.renderToNodeStream = function () {
    throw Error(l$2(207));
  };
  reactDomServerLegacy_browser_production_min.renderToStaticMarkup = function (
    a,
    b,
  ) {
    return Tb$1(
      a,
      b,
      true,
      'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server',
    );
  };
  reactDomServerLegacy_browser_production_min.renderToStaticNodeStream =
    function () {
      throw Error(l$2(208));
    };
  reactDomServerLegacy_browser_production_min.renderToString = function (a, b) {
    return Tb$1(
      a,
      b,
      false,
      'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server',
    );
  };
  reactDomServerLegacy_browser_production_min.version = "18.2.0";
  var reactDomServer_browser_production_min = {};
  /**
   * @license React
   * react-dom-server.browser.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var aa = reactExports;
  function k(a) {
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
  var l$1 = null,
    n = 0;
  function p(a, b) {
    if (0 !== b.length)
      if (512 < b.length)
        0 < n &&
          (a.enqueue(new Uint8Array(l$1.buffer, 0, n)),
          (l$1 = new Uint8Array(512)),
          (n = 0)),
          a.enqueue(b);
      else {
        var c = l$1.length - n;
        c < b.length &&
          (0 === c
            ? a.enqueue(l$1)
            : (l$1.set(b.subarray(0, c), n),
              a.enqueue(l$1),
              (b = b.subarray(c))),
          (l$1 = new Uint8Array(512)),
          (n = 0));
        l$1.set(b, n);
        n += b.length;
      }
  }
  function t(a, b) {
    p(a, b);
    return true;
  }
  function ba(a) {
    l$1 &&
      0 < n &&
      (a.enqueue(new Uint8Array(l$1.buffer, 0, n)), (l$1 = null), (n = 0));
  }
  var ca = new TextEncoder();
  function u(a) {
    return ca.encode(a);
  }
  function w(a) {
    return ca.encode(a);
  }
  function da(a, b) {
    "function" === typeof a.error ? a.error(b) : a.close();
  }
  var x = Object.prototype.hasOwnProperty,
    ea =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    fa = {},
    ha = {};
  function ia(a) {
    if (x.call(ha, a)) return true;
    if (x.call(fa, a)) return false;
    if (ea.test(a)) return (ha[a] = true);
    fa[a] = true;
    return false;
  }
  function y(a, b, c, d, f2, e, g) {
    this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
    this.attributeName = d;
    this.attributeNamespace = f2;
    this.mustUseProperty = c;
    this.propertyName = a;
    this.type = b;
    this.sanitizeURL = e;
    this.removeEmptyString = g;
  }
  var z = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (a) {
      z[a] = new y(a, 0, false, a, null, false, false);
    });
  [
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
  ].forEach(function (a) {
    var b = a[0];
    z[b] = new y(b, 1, false, a[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {
    z[a] = new y(a, 2, false, a.toLowerCase(), null, false, false);
  });
  [
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha",
  ].forEach(function (a) {
    z[a] = new y(a, 2, false, a, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
    .split(" ")
    .forEach(function (a) {
      z[a] = new y(a, 3, false, a.toLowerCase(), null, false, false);
    });
  ["checked", "multiple", "muted", "selected"].forEach(function (a) {
    z[a] = new y(a, 3, true, a, null, false, false);
  });
  ["capture", "download"].forEach(function (a) {
    z[a] = new y(a, 4, false, a, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function (a) {
    z[a] = new y(a, 6, false, a, null, false, false);
  });
  ["rowSpan", "start"].forEach(function (a) {
    z[a] = new y(a, 5, false, a.toLowerCase(), null, false, false);
  });
  var ja = /[\-:]([a-z])/g;
  function ka(a) {
    return a[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (a) {
      var b = a.replace(ja, ka);
      z[b] = new y(b, 1, false, a, null, false, false);
    });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
    .split(" ")
    .forEach(function (a) {
      var b = a.replace(ja, ka);
      z[b] = new y(
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
    var b = a.replace(ja, ka);
    z[b] = new y(
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
    z[a] = new y(a, 1, false, a.toLowerCase(), null, false, false);
  });
  z.xlinkHref = new y(
    "xlinkHref",
    1,
    false,
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    true,
    false,
  );
  ["src", "href", "action", "formAction"].forEach(function (a) {
    z[a] = new y(a, 1, false, a.toLowerCase(), null, true, true);
  });
  var B = {
      animationIterationCount: true,
      aspectRatio: true,
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
    la = ["Webkit", "ms", "Moz", "O"];
  Object.keys(B).forEach(function (a) {
    la.forEach(function (b) {
      b = b + a.charAt(0).toUpperCase() + a.substring(1);
      B[b] = B[a];
    });
  });
  var oa = /["'&<>]/;
  function C(a) {
    if ("boolean" === typeof a || "number" === typeof a) return "" + a;
    a = "" + a;
    var b = oa.exec(a);
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
  var pa = /([A-Z])/g,
    qa = /^ms-/,
    ra = Array.isArray,
    sa = w("<script>"),
    ta = w("</script>"),
    ua = w('<script src="'),
    va = w('<script type="module" src="'),
    wa = w('" async=""></script>'),
    xa = /(<\/|<)(s)(cript)/gi;
  function ya(a, b, c, d) {
    return "" + b + ("s" === c ? "\\u0073" : "\\u0053") + d;
  }
  function za(a, b, c, d, f2) {
    a = void 0 === a ? "" : a;
    b = void 0 === b ? sa : w('<script nonce="' + C(b) + '">');
    var e = [];
    void 0 !== c && e.push(b, u(("" + c).replace(xa, ya)), ta);
    if (void 0 !== d) for (c = 0; c < d.length; c++) e.push(ua, u(C(d[c])), wa);
    if (void 0 !== f2)
      for (d = 0; d < f2.length; d++) e.push(va, u(C(f2[d])), wa);
    return {
      bootstrapChunks: e,
      startInlineScript: b,
      placeholderPrefix: w(a + "P:"),
      segmentPrefix: w(a + "S:"),
      boundaryPrefix: a + "B:",
      idPrefix: a,
      nextSuspenseID: 0,
      sentCompleteSegmentFunction: false,
      sentCompleteBoundaryFunction: false,
      sentClientRenderFunction: false,
    };
  }
  function D(a, b) {
    return { insertionMode: a, selectedValue: b };
  }
  function Aa(a) {
    return D(
      "http://www.w3.org/2000/svg" === a
        ? 2
        : "http://www.w3.org/1998/Math/MathML" === a
          ? 3
          : 0,
      null,
    );
  }
  function Ba(a, b, c) {
    switch (b) {
      case "select":
        return D(1, null != c.value ? c.value : c.defaultValue);
      case "svg":
        return D(2, null);
      case "math":
        return D(3, null);
      case "foreignObject":
        return D(1, null);
      case "table":
        return D(4, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return D(5, null);
      case "colgroup":
        return D(7, null);
      case "tr":
        return D(6, null);
    }
    return 4 <= a.insertionMode || 0 === a.insertionMode ? D(1, null) : a;
  }
  var Ca = w("<!-- -->");
  function Da(a, b, c, d) {
    if ("" === b) return d;
    d && a.push(Ca);
    a.push(u(C(b)));
    return true;
  }
  var Ea = /* @__PURE__ */ new Map(),
    Fa = w(' style="'),
    Ga = w(":"),
    Ha = w(";");
  function Ia(a, b, c) {
    if ("object" !== typeof c) throw Error(k(62));
    b = true;
    for (var d in c)
      if (x.call(c, d)) {
        var f2 = c[d];
        if (null != f2 && "boolean" !== typeof f2 && "" !== f2) {
          if (0 === d.indexOf("--")) {
            var e = u(C(d));
            f2 = u(C(("" + f2).trim()));
          } else {
            e = d;
            var g = Ea.get(e);
            void 0 !== g
              ? (e = g)
              : ((g = w(
                  C(e.replace(pa, "-$1").toLowerCase().replace(qa, "-ms-")),
                )),
                Ea.set(e, g),
                (e = g));
            f2 =
              "number" === typeof f2
                ? 0 === f2 || x.call(B, d)
                  ? u("" + f2)
                  : u(f2 + "px")
                : u(C(("" + f2).trim()));
          }
          b ? ((b = false), a.push(Fa, e, Ga, f2)) : a.push(Ha, e, Ga, f2);
        }
      }
    b || a.push(E);
  }
  var H = w(" "),
    I = w('="'),
    E = w('"'),
    Ja = w('=""');
  function J(a, b, c, d) {
    switch (c) {
      case "style":
        Ia(a, b, d);
        return;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
        return;
    }
    if (
      !(2 < c.length) ||
      ("o" !== c[0] && "O" !== c[0]) ||
      ("n" !== c[1] && "N" !== c[1])
    ) {
      if (((b = z.hasOwnProperty(c) ? z[c] : null), null !== b)) {
        switch (typeof d) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (!b.acceptsBooleans) return;
        }
        c = u(b.attributeName);
        switch (b.type) {
          case 3:
            d && a.push(H, c, Ja);
            break;
          case 4:
            true === d
              ? a.push(H, c, Ja)
              : false !== d && a.push(H, c, I, u(C(d)), E);
            break;
          case 5:
            isNaN(d) || a.push(H, c, I, u(C(d)), E);
            break;
          case 6:
            !isNaN(d) && 1 <= d && a.push(H, c, I, u(C(d)), E);
            break;
          default:
            b.sanitizeURL && (d = "" + d), a.push(H, c, I, u(C(d)), E);
        }
      } else if (ia(c)) {
        switch (typeof d) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (
              ((b = c.toLowerCase().slice(0, 5)),
              "data-" !== b && "aria-" !== b)
            )
              return;
        }
        a.push(H, u(c), I, u(C(d)), E);
      }
    }
  }
  var K = w(">"),
    Ka = w("/>");
  function L(a, b, c) {
    if (null != b) {
      if (null != c) throw Error(k(60));
      if ("object" !== typeof b || !("__html" in b)) throw Error(k(61));
      b = b.__html;
      null !== b && void 0 !== b && a.push(u("" + b));
    }
  }
  function La(a) {
    var b = "";
    aa.Children.forEach(a, function (a2) {
      null != a2 && (b += a2);
    });
    return b;
  }
  var Ma = w(' selected=""');
  function Na(a, b, c, d) {
    a.push(M(c));
    var f2 = (c = null),
      e;
    for (e in b)
      if (x.call(b, e)) {
        var g = b[e];
        if (null != g)
          switch (e) {
            case "children":
              c = g;
              break;
            case "dangerouslySetInnerHTML":
              f2 = g;
              break;
            default:
              J(a, d, e, g);
          }
      }
    a.push(K);
    L(a, f2, c);
    return "string" === typeof c ? (a.push(u(C(c))), null) : c;
  }
  var Oa = w("\n"),
    Pa = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
    Qa = /* @__PURE__ */ new Map();
  function M(a) {
    var b = Qa.get(a);
    if (void 0 === b) {
      if (!Pa.test(a)) throw Error(k(65, a));
      b = w("<" + a);
      Qa.set(a, b);
    }
    return b;
  }
  var Ra = w("<!DOCTYPE html>");
  function Sa(a, b, c, d, f2) {
    switch (b) {
      case "select":
        a.push(M("select"));
        var e = null,
          g = null;
        for (r2 in c)
          if (x.call(c, r2)) {
            var h = c[r2];
            if (null != h)
              switch (r2) {
                case "children":
                  e = h;
                  break;
                case "dangerouslySetInnerHTML":
                  g = h;
                  break;
                case "defaultValue":
                case "value":
                  break;
                default:
                  J(a, d, r2, h);
              }
          }
        a.push(K);
        L(a, g, e);
        return e;
      case "option":
        g = f2.selectedValue;
        a.push(M("option"));
        var m2 = (h = null),
          q2 = null;
        var r2 = null;
        for (e in c)
          if (x.call(c, e)) {
            var v2 = c[e];
            if (null != v2)
              switch (e) {
                case "children":
                  h = v2;
                  break;
                case "selected":
                  q2 = v2;
                  break;
                case "dangerouslySetInnerHTML":
                  r2 = v2;
                  break;
                case "value":
                  m2 = v2;
                default:
                  J(a, d, e, v2);
              }
          }
        if (null != g)
          if (((c = null !== m2 ? "" + m2 : La(h)), ra(g)))
            for (d = 0; d < g.length; d++) {
              if ("" + g[d] === c) {
                a.push(Ma);
                break;
              }
            }
          else "" + g === c && a.push(Ma);
        else q2 && a.push(Ma);
        a.push(K);
        L(a, r2, h);
        return h;
      case "textarea":
        a.push(M("textarea"));
        r2 = g = e = null;
        for (h in c)
          if (x.call(c, h) && ((m2 = c[h]), null != m2))
            switch (h) {
              case "children":
                r2 = m2;
                break;
              case "value":
                e = m2;
                break;
              case "defaultValue":
                g = m2;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(k(91));
              default:
                J(a, d, h, m2);
            }
        null === e && null !== g && (e = g);
        a.push(K);
        if (null != r2) {
          if (null != e) throw Error(k(92));
          if (ra(r2) && 1 < r2.length) throw Error(k(93));
          e = "" + r2;
        }
        "string" === typeof e && "\n" === e[0] && a.push(Oa);
        null !== e && a.push(u(C("" + e)));
        return null;
      case "input":
        a.push(M("input"));
        m2 = r2 = h = e = null;
        for (g in c)
          if (x.call(c, g) && ((q2 = c[g]), null != q2))
            switch (g) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(k(399, "input"));
              case "defaultChecked":
                m2 = q2;
                break;
              case "defaultValue":
                h = q2;
                break;
              case "checked":
                r2 = q2;
                break;
              case "value":
                e = q2;
                break;
              default:
                J(a, d, g, q2);
            }
        null !== r2
          ? J(a, d, "checked", r2)
          : null !== m2 && J(a, d, "checked", m2);
        null !== e ? J(a, d, "value", e) : null !== h && J(a, d, "value", h);
        a.push(Ka);
        return null;
      case "menuitem":
        a.push(M("menuitem"));
        for (var A2 in c)
          if (x.call(c, A2) && ((e = c[A2]), null != e))
            switch (A2) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(k(400));
              default:
                J(a, d, A2, e);
            }
        a.push(K);
        return null;
      case "title":
        a.push(M("title"));
        e = null;
        for (v2 in c)
          if (x.call(c, v2) && ((g = c[v2]), null != g))
            switch (v2) {
              case "children":
                e = g;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(k(434));
              default:
                J(a, d, v2, g);
            }
        a.push(K);
        return e;
      case "listing":
      case "pre":
        a.push(M(b));
        g = e = null;
        for (m2 in c)
          if (x.call(c, m2) && ((h = c[m2]), null != h))
            switch (m2) {
              case "children":
                e = h;
                break;
              case "dangerouslySetInnerHTML":
                g = h;
                break;
              default:
                J(a, d, m2, h);
            }
        a.push(K);
        if (null != g) {
          if (null != e) throw Error(k(60));
          if ("object" !== typeof g || !("__html" in g)) throw Error(k(61));
          c = g.__html;
          null !== c &&
            void 0 !== c &&
            ("string" === typeof c && 0 < c.length && "\n" === c[0]
              ? a.push(Oa, u(c))
              : a.push(u("" + c)));
        }
        "string" === typeof e && "\n" === e[0] && a.push(Oa);
        return e;
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        a.push(M(b));
        for (var F2 in c)
          if (x.call(c, F2) && ((e = c[F2]), null != e))
            switch (F2) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(k(399, b));
              default:
                J(a, d, F2, e);
            }
        a.push(Ka);
        return null;
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return Na(a, c, b, d);
      case "html":
        return 0 === f2.insertionMode && a.push(Ra), Na(a, c, b, d);
      default:
        if (-1 === b.indexOf("-") && "string" !== typeof c.is)
          return Na(a, c, b, d);
        a.push(M(b));
        g = e = null;
        for (q2 in c)
          if (x.call(c, q2) && ((h = c[q2]), null != h))
            switch (q2) {
              case "children":
                e = h;
                break;
              case "dangerouslySetInnerHTML":
                g = h;
                break;
              case "style":
                Ia(a, d, h);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                break;
              default:
                ia(q2) &&
                  "function" !== typeof h &&
                  "symbol" !== typeof h &&
                  a.push(H, u(q2), I, u(C(h)), E);
            }
        a.push(K);
        L(a, g, e);
        return e;
    }
  }
  var Ta = w("</"),
    Ua = w(">"),
    Va = w('<template id="'),
    Wa = w('"></template>'),
    Xa = w("<!--$-->"),
    Ya = w('<!--$?--><template id="'),
    Za = w('"></template>'),
    $a = w("<!--$!-->"),
    ab = w("<!--/$-->"),
    bb = w("<template"),
    cb = w('"'),
    db = w(' data-dgst="');
  w(' data-msg="');
  w(' data-stck="');
  var eb = w("></template>");
  function fb(a, b, c) {
    p(a, Ya);
    if (null === c) throw Error(k(395));
    p(a, c);
    return t(a, Za);
  }
  var gb = w('<div hidden id="'),
    hb = w('">'),
    ib = w("</div>"),
    jb = w('<svg aria-hidden="true" style="display:none" id="'),
    kb = w('">'),
    lb = w("</svg>"),
    mb = w('<math aria-hidden="true" style="display:none" id="'),
    nb = w('">'),
    ob = w("</math>"),
    pb = w('<table hidden id="'),
    qb = w('">'),
    rb = w("</table>"),
    sb = w('<table hidden><tbody id="'),
    tb = w('">'),
    ub = w("</tbody></table>"),
    vb = w('<table hidden><tr id="'),
    wb = w('">'),
    xb = w("</tr></table>"),
    yb = w('<table hidden><colgroup id="'),
    zb = w('">'),
    Ab = w("</colgroup></table>");
  function Bb(a, b, c, d) {
    switch (c.insertionMode) {
      case 0:
      case 1:
        return (
          p(a, gb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, hb)
        );
      case 2:
        return (
          p(a, jb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, kb)
        );
      case 3:
        return (
          p(a, mb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, nb)
        );
      case 4:
        return (
          p(a, pb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, qb)
        );
      case 5:
        return (
          p(a, sb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, tb)
        );
      case 6:
        return (
          p(a, vb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, wb)
        );
      case 7:
        return (
          p(a, yb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, zb)
        );
      default:
        throw Error(k(397));
    }
  }
  function Cb(a, b) {
    switch (b.insertionMode) {
      case 0:
      case 1:
        return t(a, ib);
      case 2:
        return t(a, lb);
      case 3:
        return t(a, ob);
      case 4:
        return t(a, rb);
      case 5:
        return t(a, ub);
      case 6:
        return t(a, xb);
      case 7:
        return t(a, Ab);
      default:
        throw Error(k(397));
    }
  }
  var Db = w(
      'function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("',
    ),
    Eb = w('$RS("'),
    Gb = w('","'),
    Hb = w('")</script>'),
    Ib = w(
      'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("',
    ),
    Jb = w('$RC("'),
    Kb = w('","'),
    Lb = w('")</script>'),
    Mb = w(
      'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("',
    ),
    Nb = w('$RX("'),
    Ob = w('"'),
    Pb = w(")</script>"),
    Qb = w(","),
    Rb = /[<\u2028\u2029]/g;
  function Sb(a) {
    return JSON.stringify(a).replace(Rb, function (a2) {
      switch (a2) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error(
            "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React",
          );
      }
    });
  }
  var N = Object.assign,
    Tb = Symbol.for("react.element"),
    Ub = Symbol.for("react.portal"),
    Vb = Symbol.for("react.fragment"),
    Wb = Symbol.for("react.strict_mode"),
    Xb = Symbol.for("react.profiler"),
    Yb = Symbol.for("react.provider"),
    Zb = Symbol.for("react.context"),
    $b = Symbol.for("react.forward_ref"),
    ac = Symbol.for("react.suspense"),
    bc = Symbol.for("react.suspense_list"),
    cc = Symbol.for("react.memo"),
    dc = Symbol.for("react.lazy"),
    ec = Symbol.for("react.scope"),
    fc = Symbol.for("react.debug_trace_mode"),
    gc = Symbol.for("react.legacy_hidden"),
    hc = Symbol.for("react.default_value"),
    ic = Symbol.iterator;
  function jc(a) {
    if (null == a) return null;
    if ("function" === typeof a) return a.displayName || a.name || null;
    if ("string" === typeof a) return a;
    switch (a) {
      case Vb:
        return "Fragment";
      case Ub:
        return "Portal";
      case Xb:
        return "Profiler";
      case Wb:
        return "StrictMode";
      case ac:
        return "Suspense";
      case bc:
        return "SuspenseList";
    }
    if ("object" === typeof a)
      switch (a.$$typeof) {
        case Zb:
          return (a.displayName || "Context") + ".Consumer";
        case Yb:
          return (a._context.displayName || "Context") + ".Provider";
        case $b:
          var b = a.render;
          a = a.displayName;
          a ||
            ((a = b.displayName || b.name || ""),
            (a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef"));
          return a;
        case cc:
          return (
            (b = a.displayName || null), null !== b ? b : jc(a.type) || "Memo"
          );
        case dc:
          b = a._payload;
          a = a._init;
          try {
            return jc(a(b));
          } catch (c) {}
      }
    return null;
  }
  var kc = {};
  function lc(a, b) {
    a = a.contextTypes;
    if (!a) return kc;
    var c = {},
      d;
    for (d in a) c[d] = b[d];
    return c;
  }
  var O = null;
  function P(a, b) {
    if (a !== b) {
      a.context._currentValue = a.parentValue;
      a = a.parent;
      var c = b.parent;
      if (null === a) {
        if (null !== c) throw Error(k(401));
      } else {
        if (null === c) throw Error(k(401));
        P(a, c);
      }
      b.context._currentValue = b.value;
    }
  }
  function mc(a) {
    a.context._currentValue = a.parentValue;
    a = a.parent;
    null !== a && mc(a);
  }
  function nc(a) {
    var b = a.parent;
    null !== b && nc(b);
    a.context._currentValue = a.value;
  }
  function oc(a, b) {
    a.context._currentValue = a.parentValue;
    a = a.parent;
    if (null === a) throw Error(k(402));
    a.depth === b.depth ? P(a, b) : oc(a, b);
  }
  function pc(a, b) {
    var c = b.parent;
    if (null === c) throw Error(k(402));
    a.depth === c.depth ? P(a, c) : pc(a, c);
    b.context._currentValue = b.value;
  }
  function Q(a) {
    var b = O;
    b !== a &&
      (null === b
        ? nc(a)
        : null === a
          ? mc(b)
          : b.depth === a.depth
            ? P(b, a)
            : b.depth > a.depth
              ? oc(b, a)
              : pc(b, a),
      (O = a));
  }
  var qc = {
    isMounted: function () {
      return false;
    },
    enqueueSetState: function (a, b) {
      a = a._reactInternals;
      null !== a.queue && a.queue.push(b);
    },
    enqueueReplaceState: function (a, b) {
      a = a._reactInternals;
      a.replace = true;
      a.queue = [b];
    },
    enqueueForceUpdate: function () {},
  };
  function rc(a, b, c, d) {
    var f2 = void 0 !== a.state ? a.state : null;
    a.updater = qc;
    a.props = c;
    a.state = f2;
    var e = { queue: [], replace: false };
    a._reactInternals = e;
    var g = b.contextType;
    a.context = "object" === typeof g && null !== g ? g._currentValue : d;
    g = b.getDerivedStateFromProps;
    "function" === typeof g &&
      ((g = g(c, f2)),
      (f2 = null === g || void 0 === g ? f2 : N({}, f2, g)),
      (a.state = f2));
    if (
      "function" !== typeof b.getDerivedStateFromProps &&
      "function" !== typeof a.getSnapshotBeforeUpdate &&
      ("function" === typeof a.UNSAFE_componentWillMount ||
        "function" === typeof a.componentWillMount)
    )
      if (
        ((b = a.state),
        "function" === typeof a.componentWillMount && a.componentWillMount(),
        "function" === typeof a.UNSAFE_componentWillMount &&
          a.UNSAFE_componentWillMount(),
        b !== a.state && qc.enqueueReplaceState(a, a.state, null),
        null !== e.queue && 0 < e.queue.length)
      )
        if (
          ((b = e.queue),
          (g = e.replace),
          (e.queue = null),
          (e.replace = false),
          g && 1 === b.length)
        )
          a.state = b[0];
        else {
          e = g ? b[0] : a.state;
          f2 = true;
          for (g = g ? 1 : 0; g < b.length; g++) {
            var h = b[g];
            h = "function" === typeof h ? h.call(a, e, c, d) : h;
            null != h && (f2 ? ((f2 = false), (e = N({}, e, h))) : N(e, h));
          }
          a.state = e;
        }
      else e.queue = null;
  }
  var sc = { id: 1, overflow: "" };
  function tc(a, b, c) {
    var d = a.id;
    a = a.overflow;
    var f2 = 32 - uc(d) - 1;
    d &= ~(1 << f2);
    c += 1;
    var e = 32 - uc(b) + f2;
    if (30 < e) {
      var g = f2 - (f2 % 5);
      e = (d & ((1 << g) - 1)).toString(32);
      d >>= g;
      f2 -= g;
      return { id: (1 << (32 - uc(b) + f2)) | (c << f2) | d, overflow: e + a };
    }
    return { id: (1 << e) | (c << f2) | d, overflow: a };
  }
  var uc = Math.clz32 ? Math.clz32 : vc,
    wc = Math.log,
    xc = Math.LN2;
  function vc(a) {
    a >>>= 0;
    return 0 === a ? 32 : (31 - ((wc(a) / xc) | 0)) | 0;
  }
  function yc(a, b) {
    return (a === b && (0 !== a || 1 / a === 1 / b)) || (a !== a && b !== b);
  }
  var zc = "function" === typeof Object.is ? Object.is : yc,
    R = null,
    Ac = null,
    Bc = null,
    S = null,
    T = false,
    Cc = false,
    U = 0,
    V = null,
    Dc = 0;
  function W() {
    if (null === R) throw Error(k(321));
    return R;
  }
  function Ec() {
    if (0 < Dc) throw Error(k(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function Fc() {
    null === S
      ? null === Bc
        ? ((T = false), (Bc = S = Ec()))
        : ((T = true), (S = Bc))
      : null === S.next
        ? ((T = false), (S = S.next = Ec()))
        : ((T = true), (S = S.next));
    return S;
  }
  function Gc() {
    Ac = R = null;
    Cc = false;
    Bc = null;
    Dc = 0;
    S = V = null;
  }
  function Hc(a, b) {
    return "function" === typeof b ? b(a) : b;
  }
  function Ic(a, b, c) {
    R = W();
    S = Fc();
    if (T) {
      var d = S.queue;
      b = d.dispatch;
      if (null !== V && ((c = V.get(d)), void 0 !== c)) {
        V.delete(d);
        d = S.memoizedState;
        do (d = a(d, c.action)), (c = c.next);
        while (null !== c);
        S.memoizedState = d;
        return [d, b];
      }
      return [S.memoizedState, b];
    }
    a =
      a === Hc ? ("function" === typeof b ? b() : b) : void 0 !== c ? c(b) : b;
    S.memoizedState = a;
    a = S.queue = { last: null, dispatch: null };
    a = a.dispatch = Jc.bind(null, R, a);
    return [S.memoizedState, a];
  }
  function Kc(a, b) {
    R = W();
    S = Fc();
    b = void 0 === b ? null : b;
    if (null !== S) {
      var c = S.memoizedState;
      if (null !== c && null !== b) {
        var d = c[1];
        a: if (null === d) d = false;
        else {
          for (var f2 = 0; f2 < d.length && f2 < b.length; f2++)
            if (!zc(b[f2], d[f2])) {
              d = false;
              break a;
            }
          d = true;
        }
        if (d) return c[0];
      }
    }
    a = a();
    S.memoizedState = [a, b];
    return a;
  }
  function Jc(a, b, c) {
    if (25 <= Dc) throw Error(k(301));
    if (a === R)
      if (
        ((Cc = true),
        (a = { action: c, next: null }),
        null === V && (V = /* @__PURE__ */ new Map()),
        (c = V.get(b)),
        void 0 === c)
      )
        V.set(b, a);
      else {
        for (b = c; null !== b.next; ) b = b.next;
        b.next = a;
      }
  }
  function Lc() {
    throw Error(k(394));
  }
  function Mc() {}
  var Oc = {
      readContext: function (a) {
        return a._currentValue;
      },
      useContext: function (a) {
        W();
        return a._currentValue;
      },
      useMemo: Kc,
      useReducer: Ic,
      useRef: function (a) {
        R = W();
        S = Fc();
        var b = S.memoizedState;
        return null === b ? ((a = { current: a }), (S.memoizedState = a)) : b;
      },
      useState: function (a) {
        return Ic(Hc, a);
      },
      useInsertionEffect: Mc,
      useLayoutEffect: function () {},
      useCallback: function (a, b) {
        return Kc(function () {
          return a;
        }, b);
      },
      useImperativeHandle: Mc,
      useEffect: Mc,
      useDebugValue: Mc,
      useDeferredValue: function (a) {
        W();
        return a;
      },
      useTransition: function () {
        W();
        return [false, Lc];
      },
      useId: function () {
        var a = Ac.treeContext;
        var b = a.overflow;
        a = a.id;
        a = (a & ~(1 << (32 - uc(a) - 1))).toString(32) + b;
        var c = Nc;
        if (null === c) throw Error(k(404));
        b = U++;
        a = ":" + c.idPrefix + "R" + a;
        0 < b && (a += "H" + b.toString(32));
        return a + ":";
      },
      useMutableSource: function (a, b) {
        W();
        return b(a._source);
      },
      useSyncExternalStore: function (a, b, c) {
        if (void 0 === c) throw Error(k(407));
        return c();
      },
    },
    Nc = null,
    Pc =
      aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .ReactCurrentDispatcher;
  function Qc(a) {
    console.error(a);
    return null;
  }
  function X() {}
  function Rc(a, b, c, d, f2, e, g, h, m2) {
    var q2 = [],
      r2 = /* @__PURE__ */ new Set();
    b = {
      destination: null,
      responseState: b,
      progressiveChunkSize: void 0 === d ? 12800 : d,
      status: 0,
      fatalError: null,
      nextSegmentId: 0,
      allPendingTasks: 0,
      pendingRootTasks: 0,
      completedRootSegment: null,
      abortableTasks: r2,
      pingedTasks: q2,
      clientRenderedBoundaries: [],
      completedBoundaries: [],
      partialBoundaries: [],
      onError: void 0 === f2 ? Qc : f2,
      onAllReady: void 0 === e ? X : e,
      onShellReady: void 0 === g ? X : g,
      onShellError: void 0 === h ? X : h,
      onFatalError: void 0 === m2 ? X : m2,
    };
    c = Sc(b, 0, null, c, false, false);
    c.parentFlushed = true;
    a = Tc(b, a, null, c, r2, kc, null, sc);
    q2.push(a);
    return b;
  }
  function Tc(a, b, c, d, f2, e, g, h) {
    a.allPendingTasks++;
    null === c ? a.pendingRootTasks++ : c.pendingTasks++;
    var m2 = {
      node: b,
      ping: function () {
        var b2 = a.pingedTasks;
        b2.push(m2);
        1 === b2.length && Uc(a);
      },
      blockedBoundary: c,
      blockedSegment: d,
      abortSet: f2,
      legacyContext: e,
      context: g,
      treeContext: h,
    };
    f2.add(m2);
    return m2;
  }
  function Sc(a, b, c, d, f2, e) {
    return {
      status: 0,
      id: -1,
      index: b,
      parentFlushed: false,
      chunks: [],
      children: [],
      formatContext: d,
      boundary: c,
      lastPushedText: f2,
      textEmbedded: e,
    };
  }
  function Y(a, b) {
    a = a.onError(b);
    if (null != a && "string" !== typeof a)
      throw Error(
        'onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' +
          typeof a +
          '" instead',
      );
    return a;
  }
  function Vc(a, b) {
    var c = a.onShellError;
    c(b);
    c = a.onFatalError;
    c(b);
    null !== a.destination
      ? ((a.status = 2), da(a.destination, b))
      : ((a.status = 1), (a.fatalError = b));
  }
  function Wc(a, b, c, d, f2) {
    R = {};
    Ac = b;
    U = 0;
    for (a = c(d, f2); Cc; )
      (Cc = false), (U = 0), (Dc += 1), (S = null), (a = c(d, f2));
    Gc();
    return a;
  }
  function Xc(a, b, c, d) {
    var f2 = c.render(),
      e = d.childContextTypes;
    if (null !== e && void 0 !== e) {
      var g = b.legacyContext;
      if ("function" !== typeof c.getChildContext) d = g;
      else {
        c = c.getChildContext();
        for (var h in c)
          if (!(h in e)) throw Error(k(108, jc(d) || "Unknown", h));
        d = N({}, g, c);
      }
      b.legacyContext = d;
      Z(a, b, f2);
      b.legacyContext = g;
    } else Z(a, b, f2);
  }
  function Yc(a, b) {
    if (a && a.defaultProps) {
      b = N({}, b);
      a = a.defaultProps;
      for (var c in a) void 0 === b[c] && (b[c] = a[c]);
      return b;
    }
    return b;
  }
  function Zc(a, b, c, d, f2) {
    if ("function" === typeof c)
      if (c.prototype && c.prototype.isReactComponent) {
        f2 = lc(c, b.legacyContext);
        var e = c.contextType;
        e = new c(
          d,
          "object" === typeof e && null !== e ? e._currentValue : f2,
        );
        rc(e, c, d, f2);
        Xc(a, b, e, c);
      } else {
        e = lc(c, b.legacyContext);
        f2 = Wc(a, b, c, d, e);
        var g = 0 !== U;
        if (
          "object" === typeof f2 &&
          null !== f2 &&
          "function" === typeof f2.render &&
          void 0 === f2.$$typeof
        )
          rc(f2, c, d, e), Xc(a, b, f2, c);
        else if (g) {
          d = b.treeContext;
          b.treeContext = tc(d, 1, 0);
          try {
            Z(a, b, f2);
          } finally {
            b.treeContext = d;
          }
        } else Z(a, b, f2);
      }
    else if ("string" === typeof c) {
      f2 = b.blockedSegment;
      e = Sa(f2.chunks, c, d, a.responseState, f2.formatContext);
      f2.lastPushedText = false;
      g = f2.formatContext;
      f2.formatContext = Ba(g, c, d);
      $c(a, b, e);
      f2.formatContext = g;
      switch (c) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          f2.chunks.push(Ta, u(c), Ua);
      }
      f2.lastPushedText = false;
    } else {
      switch (c) {
        case gc:
        case fc:
        case Wb:
        case Xb:
        case Vb:
          Z(a, b, d.children);
          return;
        case bc:
          Z(a, b, d.children);
          return;
        case ec:
          throw Error(k(343));
        case ac:
          a: {
            c = b.blockedBoundary;
            f2 = b.blockedSegment;
            e = d.fallback;
            d = d.children;
            g = /* @__PURE__ */ new Set();
            var h = {
                id: null,
                rootSegmentID: -1,
                parentFlushed: false,
                pendingTasks: 0,
                forceClientRender: false,
                completedSegments: [],
                byteSize: 0,
                fallbackAbortableTasks: g,
                errorDigest: null,
              },
              m2 = Sc(a, f2.chunks.length, h, f2.formatContext, false, false);
            f2.children.push(m2);
            f2.lastPushedText = false;
            var q2 = Sc(a, 0, null, f2.formatContext, false, false);
            q2.parentFlushed = true;
            b.blockedBoundary = h;
            b.blockedSegment = q2;
            try {
              if (
                ($c(a, b, d),
                q2.lastPushedText && q2.textEmbedded && q2.chunks.push(Ca),
                (q2.status = 1),
                ad(h, q2),
                0 === h.pendingTasks)
              )
                break a;
            } catch (r2) {
              (q2.status = 4),
                (h.forceClientRender = true),
                (h.errorDigest = Y(a, r2));
            } finally {
              (b.blockedBoundary = c), (b.blockedSegment = f2);
            }
            b = Tc(a, e, c, m2, g, b.legacyContext, b.context, b.treeContext);
            a.pingedTasks.push(b);
          }
          return;
      }
      if ("object" === typeof c && null !== c)
        switch (c.$$typeof) {
          case $b:
            d = Wc(a, b, c.render, d, f2);
            if (0 !== U) {
              c = b.treeContext;
              b.treeContext = tc(c, 1, 0);
              try {
                Z(a, b, d);
              } finally {
                b.treeContext = c;
              }
            } else Z(a, b, d);
            return;
          case cc:
            c = c.type;
            d = Yc(c, d);
            Zc(a, b, c, d, f2);
            return;
          case Yb:
            f2 = d.children;
            c = c._context;
            d = d.value;
            e = c._currentValue;
            c._currentValue = d;
            g = O;
            O = d = {
              parent: g,
              depth: null === g ? 0 : g.depth + 1,
              context: c,
              parentValue: e,
              value: d,
            };
            b.context = d;
            Z(a, b, f2);
            a = O;
            if (null === a) throw Error(k(403));
            d = a.parentValue;
            a.context._currentValue = d === hc ? a.context._defaultValue : d;
            a = O = a.parent;
            b.context = a;
            return;
          case Zb:
            d = d.children;
            d = d(c._currentValue);
            Z(a, b, d);
            return;
          case dc:
            f2 = c._init;
            c = f2(c._payload);
            d = Yc(c, d);
            Zc(a, b, c, d, void 0);
            return;
        }
      throw Error(k(130, null == c ? c : typeof c, ""));
    }
  }
  function Z(a, b, c) {
    b.node = c;
    if ("object" === typeof c && null !== c) {
      switch (c.$$typeof) {
        case Tb:
          Zc(a, b, c.type, c.props, c.ref);
          return;
        case Ub:
          throw Error(k(257));
        case dc:
          var d = c._init;
          c = d(c._payload);
          Z(a, b, c);
          return;
      }
      if (ra(c)) {
        bd(a, b, c);
        return;
      }
      null === c || "object" !== typeof c
        ? (d = null)
        : ((d = (ic && c[ic]) || c["@@iterator"]),
          (d = "function" === typeof d ? d : null));
      if (d && (d = d.call(c))) {
        c = d.next();
        if (!c.done) {
          var f2 = [];
          do f2.push(c.value), (c = d.next());
          while (!c.done);
          bd(a, b, f2);
        }
        return;
      }
      a = Object.prototype.toString.call(c);
      throw Error(
        k(
          31,
          "[object Object]" === a
            ? "object with keys {" + Object.keys(c).join(", ") + "}"
            : a,
        ),
      );
    }
    "string" === typeof c
      ? ((d = b.blockedSegment),
        (d.lastPushedText = Da(
          b.blockedSegment.chunks,
          c,
          a.responseState,
          d.lastPushedText,
        )))
      : "number" === typeof c &&
        ((d = b.blockedSegment),
        (d.lastPushedText = Da(
          b.blockedSegment.chunks,
          "" + c,
          a.responseState,
          d.lastPushedText,
        )));
  }
  function bd(a, b, c) {
    for (var d = c.length, f2 = 0; f2 < d; f2++) {
      var e = b.treeContext;
      b.treeContext = tc(e, d, f2);
      try {
        $c(a, b, c[f2]);
      } finally {
        b.treeContext = e;
      }
    }
  }
  function $c(a, b, c) {
    var d = b.blockedSegment.formatContext,
      f2 = b.legacyContext,
      e = b.context;
    try {
      return Z(a, b, c);
    } catch (m2) {
      if (
        (Gc(),
        "object" === typeof m2 && null !== m2 && "function" === typeof m2.then)
      ) {
        c = m2;
        var g = b.blockedSegment,
          h = Sc(
            a,
            g.chunks.length,
            null,
            g.formatContext,
            g.lastPushedText,
            true,
          );
        g.children.push(h);
        g.lastPushedText = false;
        a = Tc(
          a,
          b.node,
          b.blockedBoundary,
          h,
          b.abortSet,
          b.legacyContext,
          b.context,
          b.treeContext,
        ).ping;
        c.then(a, a);
        b.blockedSegment.formatContext = d;
        b.legacyContext = f2;
        b.context = e;
        Q(e);
      } else
        throw (
          ((b.blockedSegment.formatContext = d),
          (b.legacyContext = f2),
          (b.context = e),
          Q(e),
          m2)
        );
    }
  }
  function cd(a) {
    var b = a.blockedBoundary;
    a = a.blockedSegment;
    a.status = 3;
    dd(this, b, a);
  }
  function ed(a, b, c) {
    var d = a.blockedBoundary;
    a.blockedSegment.status = 3;
    null === d
      ? (b.allPendingTasks--,
        2 !== b.status &&
          ((b.status = 2), null !== b.destination && b.destination.close()))
      : (d.pendingTasks--,
        d.forceClientRender ||
          ((d.forceClientRender = true),
          (a = void 0 === c ? Error(k(432)) : c),
          (d.errorDigest = b.onError(a)),
          d.parentFlushed && b.clientRenderedBoundaries.push(d)),
        d.fallbackAbortableTasks.forEach(function (a2) {
          return ed(a2, b, c);
        }),
        d.fallbackAbortableTasks.clear(),
        b.allPendingTasks--,
        0 === b.allPendingTasks && ((d = b.onAllReady), d()));
  }
  function ad(a, b) {
    if (
      0 === b.chunks.length &&
      1 === b.children.length &&
      null === b.children[0].boundary
    ) {
      var c = b.children[0];
      c.id = b.id;
      c.parentFlushed = true;
      1 === c.status && ad(a, c);
    } else a.completedSegments.push(b);
  }
  function dd(a, b, c) {
    if (null === b) {
      if (c.parentFlushed) {
        if (null !== a.completedRootSegment) throw Error(k(389));
        a.completedRootSegment = c;
      }
      a.pendingRootTasks--;
      0 === a.pendingRootTasks &&
        ((a.onShellError = X), (b = a.onShellReady), b());
    } else
      b.pendingTasks--,
        b.forceClientRender ||
          (0 === b.pendingTasks
            ? (c.parentFlushed && 1 === c.status && ad(b, c),
              b.parentFlushed && a.completedBoundaries.push(b),
              b.fallbackAbortableTasks.forEach(cd, a),
              b.fallbackAbortableTasks.clear())
            : c.parentFlushed &&
              1 === c.status &&
              (ad(b, c),
              1 === b.completedSegments.length &&
                b.parentFlushed &&
                a.partialBoundaries.push(b)));
    a.allPendingTasks--;
    0 === a.allPendingTasks && ((a = a.onAllReady), a());
  }
  function Uc(a) {
    if (2 !== a.status) {
      var b = O,
        c = Pc.current;
      Pc.current = Oc;
      var d = Nc;
      Nc = a.responseState;
      try {
        var f2 = a.pingedTasks,
          e;
        for (e = 0; e < f2.length; e++) {
          var g = f2[e];
          var h = a,
            m2 = g.blockedSegment;
          if (0 === m2.status) {
            Q(g.context);
            try {
              Z(h, g, g.node),
                m2.lastPushedText && m2.textEmbedded && m2.chunks.push(Ca),
                g.abortSet.delete(g),
                (m2.status = 1),
                dd(h, g.blockedBoundary, m2);
            } catch (G2) {
              if (
                (Gc(),
                "object" === typeof G2 &&
                  null !== G2 &&
                  "function" === typeof G2.then)
              ) {
                var q2 = g.ping;
                G2.then(q2, q2);
              } else {
                g.abortSet.delete(g);
                m2.status = 4;
                var r2 = g.blockedBoundary,
                  v2 = G2,
                  A2 = Y(h, v2);
                null === r2
                  ? Vc(h, v2)
                  : (r2.pendingTasks--,
                    r2.forceClientRender ||
                      ((r2.forceClientRender = true),
                      (r2.errorDigest = A2),
                      r2.parentFlushed && h.clientRenderedBoundaries.push(r2)));
                h.allPendingTasks--;
                if (0 === h.allPendingTasks) {
                  var F2 = h.onAllReady;
                  F2();
                }
              }
            } finally {
            }
          }
        }
        f2.splice(0, e);
        null !== a.destination && fd(a, a.destination);
      } catch (G2) {
        Y(a, G2), Vc(a, G2);
      } finally {
        (Nc = d), (Pc.current = c), c === Oc && Q(b);
      }
    }
  }
  function gd(a, b, c) {
    c.parentFlushed = true;
    switch (c.status) {
      case 0:
        var d = (c.id = a.nextSegmentId++);
        c.lastPushedText = false;
        c.textEmbedded = false;
        a = a.responseState;
        p(b, Va);
        p(b, a.placeholderPrefix);
        a = u(d.toString(16));
        p(b, a);
        return t(b, Wa);
      case 1:
        c.status = 2;
        var f2 = true;
        d = c.chunks;
        var e = 0;
        c = c.children;
        for (var g = 0; g < c.length; g++) {
          for (f2 = c[g]; e < f2.index; e++) p(b, d[e]);
          f2 = hd(a, b, f2);
        }
        for (; e < d.length - 1; e++) p(b, d[e]);
        e < d.length && (f2 = t(b, d[e]));
        return f2;
      default:
        throw Error(k(390));
    }
  }
  function hd(a, b, c) {
    var d = c.boundary;
    if (null === d) return gd(a, b, c);
    d.parentFlushed = true;
    if (d.forceClientRender)
      (d = d.errorDigest),
        t(b, $a),
        p(b, bb),
        d && (p(b, db), p(b, u(C(d))), p(b, cb)),
        t(b, eb),
        gd(a, b, c);
    else if (0 < d.pendingTasks) {
      d.rootSegmentID = a.nextSegmentId++;
      0 < d.completedSegments.length && a.partialBoundaries.push(d);
      var f2 = a.responseState;
      var e = f2.nextSuspenseID++;
      f2 = w(f2.boundaryPrefix + e.toString(16));
      d = d.id = f2;
      fb(b, a.responseState, d);
      gd(a, b, c);
    } else if (d.byteSize > a.progressiveChunkSize)
      (d.rootSegmentID = a.nextSegmentId++),
        a.completedBoundaries.push(d),
        fb(b, a.responseState, d.id),
        gd(a, b, c);
    else {
      t(b, Xa);
      c = d.completedSegments;
      if (1 !== c.length) throw Error(k(391));
      hd(a, b, c[0]);
    }
    return t(b, ab);
  }
  function id(a, b, c) {
    Bb(b, a.responseState, c.formatContext, c.id);
    hd(a, b, c);
    return Cb(b, c.formatContext);
  }
  function jd(a, b, c) {
    for (var d = c.completedSegments, f2 = 0; f2 < d.length; f2++)
      kd(a, b, c, d[f2]);
    d.length = 0;
    a = a.responseState;
    d = c.id;
    c = c.rootSegmentID;
    p(b, a.startInlineScript);
    a.sentCompleteBoundaryFunction
      ? p(b, Jb)
      : ((a.sentCompleteBoundaryFunction = true), p(b, Ib));
    if (null === d) throw Error(k(395));
    c = u(c.toString(16));
    p(b, d);
    p(b, Kb);
    p(b, a.segmentPrefix);
    p(b, c);
    return t(b, Lb);
  }
  function kd(a, b, c, d) {
    if (2 === d.status) return true;
    var f2 = d.id;
    if (-1 === f2) {
      if (-1 === (d.id = c.rootSegmentID)) throw Error(k(392));
      return id(a, b, d);
    }
    id(a, b, d);
    a = a.responseState;
    p(b, a.startInlineScript);
    a.sentCompleteSegmentFunction
      ? p(b, Eb)
      : ((a.sentCompleteSegmentFunction = true), p(b, Db));
    p(b, a.segmentPrefix);
    f2 = u(f2.toString(16));
    p(b, f2);
    p(b, Gb);
    p(b, a.placeholderPrefix);
    p(b, f2);
    return t(b, Hb);
  }
  function fd(a, b) {
    l$1 = new Uint8Array(512);
    n = 0;
    try {
      var c = a.completedRootSegment;
      if (null !== c && 0 === a.pendingRootTasks) {
        hd(a, b, c);
        a.completedRootSegment = null;
        var d = a.responseState.bootstrapChunks;
        for (c = 0; c < d.length - 1; c++) p(b, d[c]);
        c < d.length && t(b, d[c]);
      }
      var f2 = a.clientRenderedBoundaries,
        e;
      for (e = 0; e < f2.length; e++) {
        var g = f2[e];
        d = b;
        var h = a.responseState,
          m2 = g.id,
          q2 = g.errorDigest,
          r2 = g.errorMessage,
          v2 = g.errorComponentStack;
        p(d, h.startInlineScript);
        h.sentClientRenderFunction
          ? p(d, Nb)
          : ((h.sentClientRenderFunction = true), p(d, Mb));
        if (null === m2) throw Error(k(395));
        p(d, m2);
        p(d, Ob);
        if (q2 || r2 || v2) p(d, Qb), p(d, u(Sb(q2 || "")));
        if (r2 || v2) p(d, Qb), p(d, u(Sb(r2 || "")));
        v2 && (p(d, Qb), p(d, u(Sb(v2))));
        if (!t(d, Pb));
      }
      f2.splice(0, e);
      var A2 = a.completedBoundaries;
      for (e = 0; e < A2.length; e++) if (!jd(a, b, A2[e]));
      A2.splice(0, e);
      ba(b);
      l$1 = new Uint8Array(512);
      n = 0;
      var F2 = a.partialBoundaries;
      for (e = 0; e < F2.length; e++) {
        var G2 = F2[e];
        a: {
          f2 = a;
          g = b;
          var ma2 = G2.completedSegments;
          for (h = 0; h < ma2.length; h++)
            if (!kd(f2, g, G2, ma2[h])) {
              h++;
              ma2.splice(0, h);
              var Fb2 = false;
              break a;
            }
          ma2.splice(0, h);
          Fb2 = true;
        }
        if (!Fb2) {
          a.destination = null;
          e++;
          F2.splice(0, e);
          return;
        }
      }
      F2.splice(0, e);
      var na2 = a.completedBoundaries;
      for (e = 0; e < na2.length; e++) if (!jd(a, b, na2[e]));
      na2.splice(0, e);
    } finally {
      ba(b),
        0 === a.allPendingTasks &&
          0 === a.pingedTasks.length &&
          0 === a.clientRenderedBoundaries.length &&
          0 === a.completedBoundaries.length &&
          b.close();
    }
  }
  function ld(a, b) {
    try {
      var c = a.abortableTasks;
      c.forEach(function (c2) {
        return ed(c2, a, b);
      });
      c.clear();
      null !== a.destination && fd(a, a.destination);
    } catch (d) {
      Y(a, d), Vc(a, d);
    }
  }
  reactDomServer_browser_production_min.renderToReadableStream = function (
    a,
    b,
  ) {
    return new Promise(function (c, d) {
      var f2,
        e,
        g = new Promise(function (a2, b2) {
          e = a2;
          f2 = b2;
        }),
        h = Rc(
          a,
          za(
            b ? b.identifierPrefix : void 0,
            b ? b.nonce : void 0,
            b ? b.bootstrapScriptContent : void 0,
            b ? b.bootstrapScripts : void 0,
            b ? b.bootstrapModules : void 0,
          ),
          Aa(b ? b.namespaceURI : void 0),
          b ? b.progressiveChunkSize : void 0,
          b ? b.onError : void 0,
          e,
          function () {
            var a2 = new ReadableStream(
              {
                type: "bytes",
                pull: function (a3) {
                  if (1 === h.status) (h.status = 2), da(a3, h.fatalError);
                  else if (2 !== h.status && null === h.destination) {
                    h.destination = a3;
                    try {
                      fd(h, a3);
                    } catch (A2) {
                      Y(h, A2), Vc(h, A2);
                    }
                  }
                },
                cancel: function () {
                  ld(h);
                },
              },
              { highWaterMark: 0 },
            );
            a2.allReady = g;
            c(a2);
          },
          function (a2) {
            g.catch(function () {});
            d(a2);
          },
          f2,
        );
      if (b && b.signal) {
        var m2 = b.signal,
          q2 = function () {
            ld(h, m2.reason);
            m2.removeEventListener("abort", q2);
          };
        m2.addEventListener("abort", q2);
      }
      Uc(h);
    });
  };
  reactDomServer_browser_production_min.version = "18.2.0";
  var l, s;
  {
    l = reactDomServerLegacy_browser_production_min;
    s = reactDomServer_browser_production_min;
  }
  l.version;
  var renderToString = l.renderToString;
  l.renderToStaticMarkup;
  l.renderToNodeStream;
  l.renderToStaticNodeStream;
  s.renderToReadableStream;
  const reactLogo = "/assets/react-CHdo91hT.svg";
  const viteLogo = "/vite.svg";
  function App() {
    const [count, setCount] = reactExports.useState(0);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [] }),
      ],
    });
  }
  const Index = () => {
    return renderToString(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
  };
  exports.Index = Index;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  return exports;
})({});
