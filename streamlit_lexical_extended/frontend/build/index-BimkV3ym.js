//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, a) => (a = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var S = Array.isArray;
	function C() {}
	var w = {
		H: null,
		A: null,
		T: null,
		S: null
	}, ee = Object.prototype.hasOwnProperty;
	function te(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function ne(e, t) {
		return te(e.type, t, e.props);
	}
	function re(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function ie(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var ae = /\/+/g;
	function oe(e, t) {
		return typeof e == "object" && e && e.key != null ? ie("" + e.key) : t.toString(36);
	}
	function se(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(C, C) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function ce(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, ce(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + oe(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(ae, "$&/") + "/"), ce(o, r, i, "", function(e) {
			return e;
		})) : o != null && (re(o) && (o = ne(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(ae, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + oe(a, u), c += ce(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + oe(a, u++), c += ce(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return ce(se(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function le(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return ce(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function ue(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var T = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, E = {
		map: le,
		forEach: function(e, t, n) {
			le(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return le(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return le(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!re(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = E, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return w.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !ee.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return te(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) ee.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return te(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = re, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: ue
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = w.T, n = {};
		w.T = n;
		try {
			var r = e(), i = w.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, T);
		} catch (e) {
			T(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), w.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return w.H.useCacheRefresh();
	}, e.use = function(e) {
		return w.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return w.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return w.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return w.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return w.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return w.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return w.H.useEffectEvent(e);
	}, e.useId = function() {
		return w.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return w.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return w.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return w.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return w.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return w.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return w.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return w.H.useRef(e);
	}, e.useState = function(e) {
		return w.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return w.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return w.H.useTransition();
	}, e.version = "19.2.8";
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, S || (S = !0, re());
		else {
			var t = n(l);
			t !== null && oe(x, t.startTime - e);
		}
	}
	var S = !1, C = -1, w = 5, ee = -1;
	function te() {
		return g ? !0 : !(e.unstable_now() - ee < w);
	}
	function ne() {
		if (g = !1, S) {
			var t = e.unstable_now();
			ee = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && te());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && oe(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? re() : S = !1;
			}
		}
	}
	var re;
	if (typeof y == "function") re = function() {
		y(ne);
	};
	else if (typeof MessageChannel < "u") {
		var ie = new MessageChannel(), ae = ie.port2;
		ie.port1.onmessage = ne, re = function() {
			ae.postMessage(null);
		};
	} else re = function() {
		_(ne, 0);
	};
	function oe(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, oe(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, re()))), r;
	}, e.unstable_shouldYield = te, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = u();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = c(t.as, t.crossOrigin);
				i.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? i.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = c(t.as, t.crossOrigin);
			i.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else i.d.m(e);
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.8";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = f(), n = u(), r = m();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), te = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), re = Symbol.for("react.lazy"), ie = Symbol.for("react.activity"), ae = Symbol.for("react.memo_cache_sentinel"), oe = Symbol.iterator;
	function se(e) {
		return typeof e != "object" || !e ? null : (e = oe && e[oe] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ce = Symbol.for("react.client.reference");
	function le(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === ce ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case ee: return "Suspense";
			case te: return "SuspenseList";
			case ie: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case C: return e.displayName || "Context";
			case S: return (e._context.displayName || "Context") + ".Consumer";
			case w:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case ne: return t = e.displayName || null, t === null ? le(e.type) || "Memo" : t;
			case re:
				t = e._payload, e = e._init;
				try {
					return le(e(t));
				} catch {}
		}
		return null;
	}
	var ue = Array.isArray, T = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, E = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, de = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, fe = [], pe = -1;
	function me(e) {
		return { current: e };
	}
	function he(e) {
		0 > pe || (e.current = fe[pe], fe[pe] = null, pe--);
	}
	function ge(e, t) {
		pe++, fe[pe] = e.current, e.current = t;
	}
	var _e = me(null), ve = me(null), ye = me(null), be = me(null);
	function xe(e, t) {
		switch (ge(ye, t), ge(ve, e), ge(_e, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Gd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Gd(t), e = Kd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		he(_e), ge(_e, e);
	}
	function Se() {
		he(_e), he(ve), he(ye);
	}
	function Ce(e) {
		e.memoizedState !== null && ge(be, e);
		var t = _e.current, n = Kd(t, e.type);
		t !== n && (ge(ve, e), ge(_e, n));
	}
	function we(e) {
		ve.current === e && (he(_e), he(ve)), be.current === e && (he(be), np._currentValue = de);
	}
	var Te, Ee;
	function De(e) {
		if (Te === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Te = t && t[1] || "", Ee = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Te + e + Ee;
	}
	var Oe = !1;
	function ke(e, t) {
		if (!e || Oe) return "";
		Oe = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Oe = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? De(n) : "";
	}
	function Ae(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return De(e.type);
			case 16: return De("Lazy");
			case 13: return e.child !== t && t !== null ? De("Suspense Fallback") : De("Suspense");
			case 19: return De("SuspenseList");
			case 0:
			case 15: return ke(e.type, !1);
			case 11: return ke(e.type.render, !1);
			case 1: return ke(e.type, !0);
			case 31: return De("Activity");
			default: return "";
		}
	}
	function je(e) {
		try {
			var t = "", n = null;
			do
				t += Ae(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Me = Object.prototype.hasOwnProperty, Ne = t.unstable_scheduleCallback, Pe = t.unstable_cancelCallback, Fe = t.unstable_shouldYield, Ie = t.unstable_requestPaint, Le = t.unstable_now, Re = t.unstable_getCurrentPriorityLevel, ze = t.unstable_ImmediatePriority, Be = t.unstable_UserBlockingPriority, Ve = t.unstable_NormalPriority, He = t.unstable_LowPriority, Ue = t.unstable_IdlePriority, We = t.log, Ge = t.unstable_setDisableYieldValue, Ke = null, qe = null;
	function Je(e) {
		if (typeof We == "function" && Ge(e), qe && typeof qe.setStrictMode == "function") try {
			qe.setStrictMode(Ke, e);
		} catch {}
	}
	var Ye = Math.clz32 ? Math.clz32 : Qe, Xe = Math.log, Ze = Math.LN2;
	function Qe(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Xe(e) / Ze | 0) | 0;
	}
	var $e = 256, et = 262144, tt = 4194304;
	function nt(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function rt(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = nt(n))) : i = nt(o) : i = nt(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = nt(n))) : i = nt(o)) : i = nt(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function it(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function at(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function ot() {
		var e = tt;
		return tt <<= 1, !(tt & 62914560) && (tt = 4194304), e;
	}
	function st(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function ct(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function lt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Ye(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && ut(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function ut(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Ye(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function dt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Ye(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function ft(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : pt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function pt(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function mt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function ht() {
		var e = E.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : vp(e.type)) : e;
	}
	function gt(e, t) {
		var n = E.p;
		try {
			return E.p = e, t();
		} finally {
			E.p = n;
		}
	}
	var _t = Math.random().toString(36).slice(2), vt = "__reactFiber$" + _t, yt = "__reactProps$" + _t, D = "__reactContainer$" + _t, bt = "__reactEvents$" + _t, O = "__reactListeners$" + _t, xt = "__reactHandles$" + _t, St = "__reactResources$" + _t, Ct = "__reactMarker$" + _t;
	function wt(e) {
		delete e[vt], delete e[yt], delete e[bt], delete e[O], delete e[xt];
	}
	function Tt(e) {
		var t = e[vt];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[D] || n[vt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = hf(e); e !== null;) {
					if (n = e[vt]) return n;
					e = hf(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Et(e) {
		if (e = e[vt] || e[D]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Dt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function Ot(e) {
		var t = e[St];
		return t ||= e[St] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function kt(e) {
		e[Ct] = !0;
	}
	var At = /* @__PURE__ */ new Set(), jt = {};
	function Mt(e, t) {
		Nt(e, t), Nt(e + "Capture", t);
	}
	function Nt(e, t) {
		for (jt[e] = t, e = 0; e < t.length; e++) At.add(t[e]);
	}
	var Pt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Ft = {}, It = {};
	function Lt(e) {
		return Me.call(It, e) ? !0 : Me.call(Ft, e) ? !1 : Pt.test(e) ? It[e] = !0 : (Ft[e] = !0, !1);
	}
	function Rt(e, t, n) {
		if (Lt(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function zt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Bt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function Vt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Ht(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Ut(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Wt(e) {
		if (!e._valueTracker) {
			var t = Ht(e) ? "checked" : "value";
			e._valueTracker = Ut(e, t, "" + e[t]);
		}
	}
	function Gt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Ht(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Kt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var qt = /[\n"\\]/g;
	function Jt(e) {
		return e.replace(qt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Yt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Vt(t)) : e.value !== "" + Vt(t) && (e.value = "" + Vt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Zt(e, o, Vt(n)) : Zt(e, o, Vt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Vt(s) : e.removeAttribute("name");
	}
	function Xt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Wt(e);
				return;
			}
			n = n == null ? "" : "" + Vt(n), t = t == null ? n : "" + Vt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Wt(e);
	}
	function Zt(e, t, n) {
		t === "number" && Kt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Qt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Vt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function $t(e, t, n) {
		if (t != null && (t = "" + Vt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Vt(n);
	}
	function en(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (ue(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Vt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Wt(e);
	}
	function tn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var nn = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function rn(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || nn.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function an(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && rn(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && rn(e, o, t[o]);
	}
	function on(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var sn = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), cn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function ln(e) {
		return cn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function un() {}
	var k = null;
	function dn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var fn = null, pn = null;
	function mn(e) {
		var t = Et(e);
		if (t && (e = t.stateNode)) {
			var n = e[yt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Yt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Jt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[yt] || null;
								if (!a) throw Error(i(90));
								Yt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Gt(r);
					}
					break a;
				case "textarea":
					$t(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Qt(e, !!n.multiple, t, !1);
			}
		}
	}
	var hn = !1;
	function gn(e, t, n) {
		if (hn) return e(t, n);
		hn = !0;
		try {
			return e(t);
		} finally {
			if (hn = !1, (fn !== null || pn !== null) && (Su(), fn && (t = fn, e = pn, pn = fn = null, mn(t), e))) for (t = 0; t < e.length; t++) mn(e[t]);
		}
	}
	function _n(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[yt] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var vn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), yn = !1;
	if (vn) try {
		var bn = {};
		Object.defineProperty(bn, "passive", { get: function() {
			yn = !0;
		} }), window.addEventListener("test", bn, bn), window.removeEventListener("test", bn, bn);
	} catch {
		yn = !1;
	}
	var xn = null, Sn = null, Cn = null;
	function wn() {
		if (Cn) return Cn;
		var e, t = Sn, n = t.length, r, i = "value" in xn ? xn.value : xn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return Cn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Tn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function En() {
		return !0;
	}
	function Dn() {
		return !1;
	}
	function On(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? En : Dn, this.isPropagationStopped = Dn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = En);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = En);
			},
			persist: function() {},
			isPersistent: En
		}), t;
	}
	var kn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, An = On(kn), jn = h({}, kn, {
		view: 0,
		detail: 0
	}), Mn = On(jn), Nn, Pn, Fn, In = h({}, jn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: qn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Fn && (Fn && e.type === "mousemove" ? (Nn = e.screenX - Fn.screenX, Pn = e.screenY - Fn.screenY) : Pn = Nn = 0, Fn = e), Nn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Pn;
		}
	}), Ln = On(In), Rn = On(h({}, In, { dataTransfer: 0 })), zn = On(h({}, jn, { relatedTarget: 0 })), Bn = On(h({}, kn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Vn = On(h({}, kn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Hn = On(h({}, kn, { data: 0 })), Un = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, Wn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Gn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Kn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Gn[e]) ? !!t[e] : !1;
	}
	function qn() {
		return Kn;
	}
	var Jn = On(h({}, jn, {
		key: function(e) {
			if (e.key) {
				var t = Un[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Tn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Wn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: qn,
		charCode: function(e) {
			return e.type === "keypress" ? Tn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Tn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Yn = On(h({}, In, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Xn = On(h({}, jn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: qn
	})), Zn = On(h({}, kn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Qn = On(h({}, In, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), $n = On(h({}, kn, {
		newState: 0,
		oldState: 0
	})), er = [
		9,
		13,
		27,
		32
	], tr = vn && "CompositionEvent" in window, nr = null;
	vn && "documentMode" in document && (nr = document.documentMode);
	var rr = vn && "TextEvent" in window && !nr, ir = vn && (!tr || nr && 8 < nr && 11 >= nr), ar = " ", or = !1;
	function sr(e, t) {
		switch (e) {
			case "keyup": return er.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function cr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var lr = !1;
	function ur(e, t) {
		switch (e) {
			case "compositionend": return cr(t);
			case "keypress": return t.which === 32 ? (or = !0, ar) : null;
			case "textInput": return e = t.data, e === ar && or ? null : e;
			default: return null;
		}
	}
	function dr(e, t) {
		if (lr) return e === "compositionend" || !tr && sr(e, t) ? (e = wn(), Cn = Sn = xn = null, lr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return ir && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var fr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function pr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!fr[e.type] : t === "textarea";
	}
	function mr(e, t, n, r) {
		fn ? pn ? pn.push(r) : pn = [r] : fn = r, t = kd(t, "onChange"), 0 < t.length && (n = new An("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var hr = null, gr = null;
	function _r(e) {
		Sd(e, 0);
	}
	function vr(e) {
		if (Gt(Dt(e))) return e;
	}
	function yr(e, t) {
		if (e === "change") return t;
	}
	var br = !1;
	if (vn) {
		var xr;
		if (vn) {
			var Sr = "oninput" in document;
			if (!Sr) {
				var Cr = document.createElement("div");
				Cr.setAttribute("oninput", "return;"), Sr = typeof Cr.oninput == "function";
			}
			xr = Sr;
		} else xr = !1;
		br = xr && (!document.documentMode || 9 < document.documentMode);
	}
	function wr() {
		hr && (hr.detachEvent("onpropertychange", Tr), gr = hr = null);
	}
	function Tr(e) {
		if (e.propertyName === "value" && vr(gr)) {
			var t = [];
			mr(t, gr, e, dn(e)), gn(_r, t);
		}
	}
	function Er(e, t, n) {
		e === "focusin" ? (wr(), hr = t, gr = n, hr.attachEvent("onpropertychange", Tr)) : e === "focusout" && wr();
	}
	function Dr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return vr(gr);
	}
	function Or(e, t) {
		if (e === "click") return vr(t);
	}
	function kr(e, t) {
		if (e === "input" || e === "change") return vr(t);
	}
	function Ar(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var jr = typeof Object.is == "function" ? Object.is : Ar;
	function Mr(e, t) {
		if (jr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Me.call(t, i) || !jr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Nr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Pr(e, t) {
		var n = Nr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Nr(n);
		}
	}
	function Fr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Fr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Ir(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Kt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Kt(e.document);
		}
		return t;
	}
	function Lr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Rr = vn && "documentMode" in document && 11 >= document.documentMode, zr = null, Br = null, Vr = null, Hr = !1;
	function Ur(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Hr || zr == null || zr !== Kt(r) || (r = zr, "selectionStart" in r && Lr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Vr && Mr(Vr, r) || (Vr = r, r = kd(Br, "onSelect"), 0 < r.length && (t = new An("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = zr)));
	}
	function Wr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Gr = {
		animationend: Wr("Animation", "AnimationEnd"),
		animationiteration: Wr("Animation", "AnimationIteration"),
		animationstart: Wr("Animation", "AnimationStart"),
		transitionrun: Wr("Transition", "TransitionRun"),
		transitionstart: Wr("Transition", "TransitionStart"),
		transitioncancel: Wr("Transition", "TransitionCancel"),
		transitionend: Wr("Transition", "TransitionEnd")
	}, Kr = {}, qr = {};
	vn && (qr = document.createElement("div").style, "AnimationEvent" in window || (delete Gr.animationend.animation, delete Gr.animationiteration.animation, delete Gr.animationstart.animation), "TransitionEvent" in window || delete Gr.transitionend.transition);
	function Jr(e) {
		if (Kr[e]) return Kr[e];
		if (!Gr[e]) return e;
		var t = Gr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in qr) return Kr[e] = t[n];
		return e;
	}
	var Yr = Jr("animationend"), Xr = Jr("animationiteration"), Zr = Jr("animationstart"), Qr = Jr("transitionrun"), $r = Jr("transitionstart"), ei = Jr("transitioncancel"), ti = Jr("transitionend"), ni = /* @__PURE__ */ new Map(), ri = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	ri.push("scrollEnd");
	function ii(e, t) {
		ni.set(e, t), Mt(t, [e]);
	}
	var ai = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, oi = [], si = 0, ci = 0;
	function li() {
		for (var e = si, t = ci = si = 0; t < e;) {
			var n = oi[t];
			oi[t++] = null;
			var r = oi[t];
			oi[t++] = null;
			var i = oi[t];
			oi[t++] = null;
			var a = oi[t];
			if (oi[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && pi(n, i, a);
		}
	}
	function ui(e, t, n, r) {
		oi[si++] = e, oi[si++] = t, oi[si++] = n, oi[si++] = r, ci |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function di(e, t, n, r) {
		return ui(e, t, n, r), mi(e);
	}
	function fi(e, t) {
		return ui(e, null, null, t), mi(e);
	}
	function pi(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ye(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function mi(e) {
		if (50 < pu) throw pu = 0, mu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var A = {};
	function hi(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function gi(e, t, n, r) {
		return new hi(e, t, n, r);
	}
	function _i(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function vi(e, t) {
		var n = e.alternate;
		return n === null ? (n = gi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function yi(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function bi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") _i(e) && (s = 1);
		else if (typeof e == "string") s = qf(e, n, _e.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case ie: return e = gi(31, n, t, a), e.elementType = ie, e.lanes = o, e;
			case y: return xi(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = gi(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case ee: return e = gi(13, n, t, a), e.elementType = ee, e.lanes = o, e;
			case te: return e = gi(19, n, t, a), e.elementType = te, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case C:
						s = 10;
						break a;
					case S:
						s = 9;
						break a;
					case w:
						s = 11;
						break a;
					case ne:
						s = 14;
						break a;
					case re:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = gi(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function xi(e, t, n, r) {
		return e = gi(7, e, r, t), e.lanes = n, e;
	}
	function Si(e, t, n) {
		return e = gi(6, e, null, t), e.lanes = n, e;
	}
	function Ci(e) {
		var t = gi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function wi(e, t, n) {
		return t = gi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var j = /* @__PURE__ */ new WeakMap();
	function Ti(e, t) {
		if (typeof e == "object" && e) {
			var n = j.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: je(t)
			}, j.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: je(t)
		};
	}
	var Ei = [], Di = 0, Oi = null, ki = 0, Ai = [], ji = 0, Mi = null, Ni = 1, Pi = "";
	function Fi(e, t) {
		Ei[Di++] = ki, Ei[Di++] = Oi, Oi = e, ki = t;
	}
	function Ii(e, t, n) {
		Ai[ji++] = Ni, Ai[ji++] = Pi, Ai[ji++] = Mi, Mi = e;
		var r = Ni;
		e = Pi;
		var i = 32 - Ye(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Ye(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Ni = 1 << 32 - Ye(t) + i | n << i | r, Pi = a + e;
		} else Ni = 1 << a | n << i | r, Pi = e;
	}
	function Li(e) {
		e.return !== null && (Fi(e, 1), Ii(e, 1, 0));
	}
	function Ri(e) {
		for (; e === Oi;) Oi = Ei[--Di], Ei[Di] = null, ki = Ei[--Di], Ei[Di] = null;
		for (; e === Mi;) Mi = Ai[--ji], Ai[ji] = null, Pi = Ai[--ji], Ai[ji] = null, Ni = Ai[--ji], Ai[ji] = null;
	}
	function zi(e, t) {
		Ai[ji++] = Ni, Ai[ji++] = Pi, Ai[ji++] = Mi, Ni = t.id, Pi = t.overflow, Mi = e;
	}
	var Bi = null, Vi = null, M = !1, Hi = null, Ui = !1, Wi = Error(i(519));
	function Gi(e) {
		throw N(Ti(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Wi;
	}
	function Ki(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[vt] = e, t[yt] = r, n) {
			case "dialog":
				Y("cancel", t), Y("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Y("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < bd.length; n++) Y(bd[n], t);
				break;
			case "source":
				Y("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Y("error", t), Y("load", t);
				break;
			case "details":
				Y("toggle", t);
				break;
			case "input":
				Y("invalid", t), Xt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Y("invalid", t);
				break;
			case "textarea": Y("invalid", t), en(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Fd(t.textContent, n) ? (r.popover != null && (Y("beforetoggle", t), Y("toggle", t)), r.onScroll != null && Y("scroll", t), r.onScrollEnd != null && Y("scrollend", t), r.onClick != null && (t.onclick = un), t = !0) : t = !1, t || Gi(e, !0);
	}
	function qi(e) {
		for (Bi = e.return; Bi;) switch (Bi.tag) {
			case 5:
			case 31:
			case 13:
				Ui = !1;
				return;
			case 27:
			case 3:
				Ui = !0;
				return;
			default: Bi = Bi.return;
		}
	}
	function Ji(e) {
		if (e !== Bi) return !1;
		if (!M) return qi(e), M = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || qd(e.type, e.memoizedProps)), n = !n), n && Vi && Gi(e), qi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Vi = mf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Vi = mf(e);
		} else t === 27 ? (t = Vi, tf(e.type) ? (e = pf, pf = null, Vi = e) : Vi = t) : Vi = Bi ? ff(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Yi() {
		Vi = Bi = null, M = !1;
	}
	function Xi() {
		var e = Hi;
		return e !== null && ($l === null ? $l = e : $l.push.apply($l, e), Hi = null), e;
	}
	function N(e) {
		Hi === null ? Hi = [e] : Hi.push(e);
	}
	var Zi = me(null), Qi = null, $i = null;
	function ea(e, t, n) {
		ge(Zi, t._currentValue), t._currentValue = n;
	}
	function ta(e) {
		e._currentValue = Zi.current, he(Zi);
	}
	function na(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function ra(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), na(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), na(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function ia(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					jr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === be.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [np] : e.push(np));
			}
			a = a.return;
		}
		e !== null && ra(t, e, n, r), t.flags |= 262144;
	}
	function aa(e) {
		for (e = e.firstContext; e !== null;) {
			if (!jr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function oa(e) {
		Qi = e, $i = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function sa(e) {
		return la(Qi, e);
	}
	function ca(e, t) {
		return Qi === null && oa(e), la(e, t);
	}
	function la(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, $i === null) {
			if (e === null) throw Error(i(308));
			$i = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else $i = $i.next = t;
		return n;
	}
	var ua = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, da = t.unstable_scheduleCallback, fa = t.unstable_NormalPriority, pa = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function ma() {
		return {
			controller: new ua(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ha(e) {
		e.refCount--, e.refCount === 0 && da(fa, function() {
			e.controller.abort();
		});
	}
	var ga = null, _a = 0, va = 0, ya = null;
	function ba(e, t) {
		if (ga === null) {
			var n = ga = [];
			_a = 0, va = md(), ya = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return _a++, t.then(xa, xa), t;
	}
	function xa() {
		if (--_a === 0 && ga !== null) {
			ya !== null && (ya.status = "fulfilled");
			var e = ga;
			ga = null, va = 0, ya = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function Sa(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var Ca = T.S;
	T.S = function(e, t) {
		nu = Le(), typeof t == "object" && t && typeof t.then == "function" && ba(e, t), Ca !== null && Ca(e, t);
	};
	var wa = me(null);
	function Ta() {
		var e = wa.current;
		return e === null ? Bl.pooledCache : e;
	}
	function Ea(e, t) {
		t === null ? ge(wa, wa.current) : ge(wa, t.pool);
	}
	function Da() {
		var e = Ta();
		return e === null ? null : {
			parent: pa._currentValue,
			pool: e
		};
	}
	var Oa = Error(i(460)), ka = Error(i(474)), Aa = Error(i(542)), ja = { then: function() {} };
	function Ma(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Na(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(un, un), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, La(e), e;
			default:
				if (typeof t.status == "string") t.then(un, un);
				else {
					if (e = Bl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, La(e), e;
				}
				throw Fa = t, Oa;
		}
	}
	function Pa(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Fa = e, Oa) : e;
		}
	}
	var Fa = null;
	function Ia() {
		if (Fa === null) throw Error(i(459));
		var e = Fa;
		return Fa = null, e;
	}
	function La(e) {
		if (e === Oa || e === Aa) throw Error(i(483));
	}
	var Ra = null, za = 0;
	function Ba(e) {
		var t = za;
		return za += 1, Ra === null && (Ra = []), Na(Ra, e, t);
	}
	function Va(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Ha(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Ua(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = vi(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Si(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === re && Pa(i) === t.type) ? (t = a(t, n.props), Va(t, n), t.return = e, t) : (t = bi(n.type, n.key, n.props, null, e.mode, r), Va(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = wi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = xi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Si("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = bi(t.type, t.key, t.props, null, e.mode, n), Va(n, t), n.return = e, n;
					case v: return t = wi(t, e.mode, n), t.return = e, t;
					case re: return t = Pa(t), f(e, t, n);
				}
				if (ue(t) || se(t)) return t = xi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Ba(t), n);
				if (t.$$typeof === C) return f(e, ca(e, t), n);
				Ha(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case re: return n = Pa(n), p(e, t, n, r);
				}
				if (ue(n) || se(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Ba(n), r);
				if (n.$$typeof === C) return p(e, t, ca(e, n), r);
				Ha(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case re: return r = Pa(r), m(e, t, n, r, i);
				}
				if (ue(r) || se(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Ba(r), i);
				if (r.$$typeof === C) return m(e, t, n, ca(t, r), i);
				Ha(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), M && Fi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return M && Fi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), M && Fi(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), M && Fi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return M && Fi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), M && Fi(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case _:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === re && Pa(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Va(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = xi(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = bi(o.type, o.key, o.props, null, e.mode, c), Va(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								else t(e, r);
								r = r.sibling;
							}
							c = wi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case re: return o = Pa(o), b(e, r, o, c);
				}
				if (ue(o)) return h(e, r, o, c);
				if (se(o)) {
					if (l = se(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Ba(o), c);
				if (o.$$typeof === C) return b(e, r, ca(e, o), c);
				Ha(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = Si(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				za = 0;
				var i = b(e, t, n, r);
				return Ra = null, i;
			} catch (t) {
				if (t === Oa || t === Aa) throw t;
				var a = gi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Wa = Ua(!0), Ga = Ua(!1), P = !1;
	function Ka(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function qa(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function F(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Ja(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, zl & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = mi(e), pi(e, null, n), t;
		}
		return ui(e, r, t, n), mi(e);
	}
	function Ya(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, dt(e, n);
		}
	}
	function Xa(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Za = !1;
	function Qa() {
		if (Za) {
			var e = ya;
			if (e !== null) throw e;
		}
	}
	function $a(e, t, n, r) {
		Za = !1;
		var i = e.updateQueue;
		P = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (q & f) === f : (r & f) === f) {
					f !== 0 && f === va && (Za = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: P = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Jl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function eo(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function to(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) eo(n[e], t);
	}
	var no = me(null), ro = me(0);
	function io(e, t) {
		e = Kl, ge(ro, e), ge(no, t), Kl = e | t.baseLanes;
	}
	function ao() {
		ge(ro, Kl), ge(no, no.current);
	}
	function oo() {
		Kl = ro.current, he(no), he(ro);
	}
	var so = me(null), co = null;
	function lo(e) {
		var t = e.alternate;
		ge(mo, mo.current & 1), ge(so, e), co === null && (t === null || no.current !== null || t.memoizedState !== null) && (co = e);
	}
	function uo(e) {
		ge(mo, mo.current), ge(so, e), co === null && (co = e);
	}
	function I(e) {
		e.tag === 22 ? (ge(mo, mo.current), ge(so, e), co === null && (co = e)) : fo(e);
	}
	function fo() {
		ge(mo, mo.current), ge(so, so.current);
	}
	function po(e) {
		he(so), co === e && (co = null), he(mo);
	}
	var mo = me(0);
	function ho(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || lf(n) || uf(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var go = 0, L = null, _o = null, vo = null, yo = !1, bo = !1, xo = !1, So = 0, Co = 0, wo = null, To = 0;
	function Eo() {
		throw Error(i(321));
	}
	function Do(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!jr(e[n], t[n])) return !1;
		return !0;
	}
	function Oo(e, t, n, r, i, a) {
		return go = a, L = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, T.H = e === null || e.memoizedState === null ? B : Us, xo = !1, a = n(r, i), xo = !1, bo && (a = Ao(t, n, r, i)), ko(e), a;
	}
	function ko(e) {
		T.H = Hs;
		var t = _o !== null && _o.next !== null;
		if (go = 0, vo = _o = L = null, yo = !1, Co = 0, wo = null, t) throw Error(i(300));
		e === null || H || (e = e.dependencies, e !== null && aa(e) && (H = !0));
	}
	function Ao(e, t, n, r) {
		L = e;
		var a = 0;
		do {
			if (bo && (wo = null), Co = 0, bo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, vo = _o = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			T.H = Ws, o = t(n, r);
		} while (bo);
		return o;
	}
	function jo() {
		var e = T.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Ro(t) : t, e = e.useState()[0], (_o === null ? null : _o.memoizedState) !== e && (L.flags |= 1024), t;
	}
	function Mo() {
		var e = So !== 0;
		return So = 0, e;
	}
	function No(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Po(e) {
		if (yo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			yo = !1;
		}
		go = 0, vo = _o = L = null, bo = !1, Co = So = 0, wo = null;
	}
	function Fo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return vo === null ? L.memoizedState = vo = e : vo = vo.next = e, vo;
	}
	function Io() {
		if (_o === null) {
			var e = L.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = _o.next;
		var t = vo === null ? L.memoizedState : vo.next;
		if (t !== null) vo = t, _o = e;
		else {
			if (e === null) throw L.alternate === null ? Error(i(467)) : Error(i(310));
			_o = e, e = {
				memoizedState: _o.memoizedState,
				baseState: _o.baseState,
				baseQueue: _o.baseQueue,
				queue: _o.queue,
				next: null
			}, vo === null ? L.memoizedState = vo = e : vo = vo.next = e;
		}
		return vo;
	}
	function Lo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Ro(e) {
		var t = Co;
		return Co += 1, wo === null && (wo = []), e = Na(wo, e, t), t = L, (vo === null ? t.memoizedState : vo.next) === null && (t = t.alternate, T.H = t === null || t.memoizedState === null ? B : Us), e;
	}
	function zo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Ro(e);
			if (e.$$typeof === C) return sa(e);
		}
		throw Error(i(438, String(e)));
	}
	function Bo(e) {
		var t = null, n = L.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = L.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = Lo(), L.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = ae;
		return t.index++, n;
	}
	function Vo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Ho(e) {
		return R(Io(), _o, e);
	}
	function R(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (go & f) === f : (q & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === va && (d = !0);
					else if ((go & p) === p) {
						u = u.next, p === va && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, L.lanes |= p, Jl |= p;
					f = u.action, xo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, L.lanes |= f, Jl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !jr(o, e.memoizedState) && (H = !0, d && (n = ya, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Uo(e) {
		var t = Io(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			jr(o, t.memoizedState) || (H = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Wo(e, t, n) {
		var r = L, a = Io(), o = M;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !jr((_o || a).memoizedState, n);
		if (s && (a.memoizedState = n, H = !0), a = a.queue, hs(qo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || vo !== null && vo.memoizedState.tag & 1) {
			if (r.flags |= 2048, us(9, { destroy: void 0 }, Ko.bind(null, r, a, n, t), null), Bl === null) throw Error(i(349));
			o || go & 127 || Go(r, t, n);
		}
		return n;
	}
	function Go(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = L.updateQueue, t === null ? (t = Lo(), L.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Ko(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Jo(t) && Yo(e);
	}
	function qo(e, t, n) {
		return n(function() {
			Jo(t) && Yo(e);
		});
	}
	function Jo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !jr(e, n);
		} catch {
			return !0;
		}
	}
	function Yo(e) {
		var t = fi(e, 2);
		t !== null && _u(t, e, 2);
	}
	function Xo(e) {
		var t = Fo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), xo) {
				Je(!0);
				try {
					n();
				} finally {
					Je(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Vo,
			lastRenderedState: e
		}, t;
	}
	function Zo(e, t, n, r) {
		return e.baseState = n, R(e, _o, typeof r == "function" ? r : Vo);
	}
	function Qo(e, t, n, r, a) {
		if (zs(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			T.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, $o(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function $o(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = T.T, o = {};
			T.T = o;
			try {
				var s = n(i, r), c = T.S;
				c !== null && c(o, s), es(e, t, s);
			} catch (n) {
				ns(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), T.T = a;
			}
		} else try {
			a = n(i, r), es(e, t, a);
		} catch (n) {
			ns(e, t, n);
		}
	}
	function es(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			ts(e, t, n);
		}, function(n) {
			return ns(e, t, n);
		}) : ts(e, t, n);
	}
	function ts(e, t, n) {
		t.status = "fulfilled", t.value = n, rs(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, $o(e, n)));
	}
	function ns(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, rs(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function rs(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function is(e, t) {
		return t;
	}
	function as(e, t) {
		if (M) {
			var n = Bl.formState;
			if (n !== null) {
				a: {
					var r = L;
					if (M) {
						if (Vi) {
							b: {
								for (var i = Vi, a = Ui; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = ff(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Vi = ff(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Gi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Fo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: is,
			lastRenderedState: t
		}, n.queue = r, n = Is.bind(null, L, r), r.dispatch = n, r = Xo(!1), a = Rs.bind(null, L, !1, r.queue), r = Fo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Qo.bind(null, L, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function os(e) {
		return ss(Io(), _o, e);
	}
	function ss(e, t, n) {
		if (t = R(e, t, is)[0], e = Ho(Vo)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Ro(t);
		} catch (e) {
			throw e === Oa ? Aa : e;
		}
		else r = t;
		t = Io();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (L.flags |= 2048, us(9, { destroy: void 0 }, cs.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function cs(e, t) {
		e.action = t;
	}
	function ls(e) {
		var t = Io(), n = _o;
		if (n !== null) return ss(t, n, e);
		Io(), t = t.memoizedState, n = Io();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function us(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = L.updateQueue, t === null && (t = Lo(), L.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function ds() {
		return Io().memoizedState;
	}
	function fs(e, t, n, r) {
		var i = Fo();
		L.flags |= e, i.memoizedState = us(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function ps(e, t, n, r) {
		var i = Io();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		_o !== null && r !== null && Do(r, _o.memoizedState.deps) ? i.memoizedState = us(t, a, n, r) : (L.flags |= e, i.memoizedState = us(1 | t, a, n, r));
	}
	function ms(e, t) {
		fs(8390656, 8, e, t);
	}
	function hs(e, t) {
		ps(2048, 8, e, t);
	}
	function gs(e) {
		L.flags |= 4;
		var t = L.updateQueue;
		if (t === null) t = Lo(), L.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function _s(e) {
		var t = Io().memoizedState;
		return gs({
			ref: t,
			nextImpl: e
		}), function() {
			if (zl & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function z(e, t) {
		return ps(4, 2, e, t);
	}
	function vs(e, t) {
		return ps(4, 4, e, t);
	}
	function ys(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function bs(e, t, n) {
		n = n == null ? null : n.concat([e]), ps(4, 4, ys.bind(null, t, e), n);
	}
	function xs() {}
	function Ss(e, t) {
		var n = Io();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Do(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Cs(e, t) {
		var n = Io();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Do(t, r[1])) return r[0];
		if (r = e(), xo) {
			Je(!0);
			try {
				e();
			} finally {
				Je(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function ws(e, t, n) {
		return n === void 0 || go & 1073741824 && !(q & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = gu(), L.lanes |= e, Jl |= e, n);
	}
	function Ts(e, t, n, r) {
		return jr(n, t) ? n : no.current === null ? !(go & 42) || go & 1073741824 && !(q & 261930) ? (H = !0, e.memoizedState = n) : (e = gu(), L.lanes |= e, Jl |= e, t) : (e = ws(e, n, r), jr(e, t) || (H = !0), e);
	}
	function Es(e, t, n, r, i) {
		var a = E.p;
		E.p = a !== 0 && 8 > a ? a : 8;
		var o = T.T, s = {};
		T.T = s, Rs(e, !1, t, n);
		try {
			var c = i(), l = T.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ls(e, t, Sa(c, r), hu(e)) : Ls(e, t, r, hu(e));
		} catch (n) {
			Ls(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, hu());
		} finally {
			E.p = a, o !== null && s.types !== null && (o.types = s.types), T.T = o;
		}
	}
	function Ds() {}
	function Os(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = ks(e).queue;
		Es(e, a, t, de, n === null ? Ds : function() {
			return As(e), n(r);
		});
	}
	function ks(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: de,
			baseState: de,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Vo,
				lastRenderedState: de
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Vo,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function As(e) {
		var t = ks(e);
		t.next === null && (t = e.alternate.memoizedState), Ls(e, t.next.queue, {}, hu());
	}
	function js() {
		return sa(np);
	}
	function Ms() {
		return Io().memoizedState;
	}
	function Ns() {
		return Io().memoizedState;
	}
	function Ps(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = hu();
					e = F(n);
					var r = Ja(t, e, n);
					r !== null && (_u(r, t, n), Ya(r, t, n)), t = { cache: ma() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Fs(e, t, n) {
		var r = hu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, zs(e) ? Bs(t, n) : (n = di(e, t, n, r), n !== null && (_u(n, e, r), Vs(n, t, r)));
	}
	function Is(e, t, n) {
		Ls(e, t, n, hu());
	}
	function Ls(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (zs(e)) Bs(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, jr(s, o)) return ui(e, t, i, 0), Bl === null && li(), !1;
			} catch {}
			if (n = di(e, t, i, r), n !== null) return _u(n, e, r), Vs(n, t, r), !0;
		}
		return !1;
	}
	function Rs(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: md(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, zs(e)) {
			if (t) throw Error(i(479));
		} else t = di(e, n, r, 2), t !== null && _u(t, e, 2);
	}
	function zs(e) {
		var t = e.alternate;
		return e === L || t !== null && t === L;
	}
	function Bs(e, t) {
		bo = yo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Vs(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, dt(e, n);
		}
	}
	var Hs = {
		readContext: sa,
		use: zo,
		useCallback: Eo,
		useContext: Eo,
		useEffect: Eo,
		useImperativeHandle: Eo,
		useLayoutEffect: Eo,
		useInsertionEffect: Eo,
		useMemo: Eo,
		useReducer: Eo,
		useRef: Eo,
		useState: Eo,
		useDebugValue: Eo,
		useDeferredValue: Eo,
		useTransition: Eo,
		useSyncExternalStore: Eo,
		useId: Eo,
		useHostTransitionStatus: Eo,
		useFormState: Eo,
		useActionState: Eo,
		useOptimistic: Eo,
		useMemoCache: Eo,
		useCacheRefresh: Eo
	};
	Hs.useEffectEvent = Eo;
	var B = {
		readContext: sa,
		use: zo,
		useCallback: function(e, t) {
			return Fo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: sa,
		useEffect: ms,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), fs(4194308, 4, ys.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return fs(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			fs(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Fo();
			t = t === void 0 ? null : t;
			var r = e();
			if (xo) {
				Je(!0);
				try {
					e();
				} finally {
					Je(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Fo();
			if (n !== void 0) {
				var i = n(t);
				if (xo) {
					Je(!0);
					try {
						n(t);
					} finally {
						Je(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Fs.bind(null, L, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Fo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Xo(e);
			var t = e.queue, n = Is.bind(null, L, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: xs,
		useDeferredValue: function(e, t) {
			return ws(Fo(), e, t);
		},
		useTransition: function() {
			var e = Xo(!1);
			return e = Es.bind(null, L, e.queue, !0, !1), Fo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = L, a = Fo();
			if (M) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Bl === null) throw Error(i(349));
				q & 127 || Go(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ms(qo.bind(null, r, o, e), [e]), r.flags |= 2048, us(9, { destroy: void 0 }, Ko.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Fo(), t = Bl.identifierPrefix;
			if (M) {
				var n = Pi, r = Ni;
				n = (r & ~(1 << 32 - Ye(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = So++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = To++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: js,
		useFormState: as,
		useActionState: as,
		useOptimistic: function(e) {
			var t = Fo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Rs.bind(null, L, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Bo,
		useCacheRefresh: function() {
			return Fo().memoizedState = Ps.bind(null, L);
		},
		useEffectEvent: function(e) {
			var t = Fo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (zl & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Us = {
		readContext: sa,
		use: zo,
		useCallback: Ss,
		useContext: sa,
		useEffect: hs,
		useImperativeHandle: bs,
		useInsertionEffect: z,
		useLayoutEffect: vs,
		useMemo: Cs,
		useReducer: Ho,
		useRef: ds,
		useState: function() {
			return Ho(Vo);
		},
		useDebugValue: xs,
		useDeferredValue: function(e, t) {
			return Ts(Io(), _o.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ho(Vo)[0], t = Io().memoizedState;
			return [typeof e == "boolean" ? e : Ro(e), t];
		},
		useSyncExternalStore: Wo,
		useId: Ms,
		useHostTransitionStatus: js,
		useFormState: os,
		useActionState: os,
		useOptimistic: function(e, t) {
			return Zo(Io(), _o, e, t);
		},
		useMemoCache: Bo,
		useCacheRefresh: Ns
	};
	Us.useEffectEvent = _s;
	var Ws = {
		readContext: sa,
		use: zo,
		useCallback: Ss,
		useContext: sa,
		useEffect: hs,
		useImperativeHandle: bs,
		useInsertionEffect: z,
		useLayoutEffect: vs,
		useMemo: Cs,
		useReducer: Uo,
		useRef: ds,
		useState: function() {
			return Uo(Vo);
		},
		useDebugValue: xs,
		useDeferredValue: function(e, t) {
			var n = Io();
			return _o === null ? ws(n, e, t) : Ts(n, _o.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Uo(Vo)[0], t = Io().memoizedState;
			return [typeof e == "boolean" ? e : Ro(e), t];
		},
		useSyncExternalStore: Wo,
		useId: Ms,
		useHostTransitionStatus: js,
		useFormState: ls,
		useActionState: ls,
		useOptimistic: function(e, t) {
			var n = Io();
			return _o === null ? (n.baseState = e, [e, n.queue.dispatch]) : Zo(n, _o, e, t);
		},
		useMemoCache: Bo,
		useCacheRefresh: Ns
	};
	Ws.useEffectEvent = _s;
	function Gs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Ks = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = hu(), i = F(r);
			i.payload = t, n != null && (i.callback = n), t = Ja(e, i, r), t !== null && (_u(t, e, r), Ya(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = hu(), i = F(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ja(e, i, r), t !== null && (_u(t, e, r), Ya(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = hu(), r = F(n);
			r.tag = 2, t != null && (r.callback = t), t = Ja(e, r, n), t !== null && (_u(t, e, n), Ya(t, e, n));
		}
	};
	function qs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Mr(n, r) || !Mr(i, a) : !0;
	}
	function Js(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ks.enqueueReplaceState(t, t.state, null);
	}
	function Ys(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Xs(e) {
		ai(e);
	}
	function Zs(e) {
		console.error(e);
	}
	function Qs(e) {
		ai(e);
	}
	function V(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function $s(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function ec(e, t, n) {
		return n = F(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			V(e, t);
		}, n;
	}
	function tc(e) {
		return e = F(e), e.tag = 3, e;
	}
	function nc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				$s(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			$s(t, n, r), typeof i != "function" && (au === null ? au = /* @__PURE__ */ new Set([this]) : au.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function rc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ia(t, n, a, !0), n = so.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return co === null ? ku() : n.alternate === null && ql === 0 && (ql = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === ja ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Ju(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === ja ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Ju(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Ju(e, r, a), ku(), !1;
		}
		if (M) return t = so.current, t === null ? (r !== Wi && (t = Error(i(423), { cause: r }), N(Ti(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Ti(r, n), a = ec(e.stateNode, r, a), Xa(e, a), ql !== 4 && (ql = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Wi && (e = Error(i(422), { cause: r }), N(Ti(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = Ti(o, n), Ql === null ? Ql = [o] : Ql.push(o), ql !== 4 && (ql = 2), t === null) return !0;
		r = Ti(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = ec(n.stateNode, r, e), Xa(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (au === null || !au.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = tc(a), nc(a, e, n, r), Xa(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var ic = Error(i(461)), H = !1;
	function U(e, t, n, r) {
		t.child = e === null ? Ga(t, null, n, r) : Wa(t, e.child, n, r);
	}
	function ac(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return oa(t), r = Oo(e, t, n, o, a, i), s = Mo(), e !== null && !H ? (No(e, t, i), Oc(e, t, i)) : (M && s && Li(t), t.flags |= 1, U(e, t, r, i), t.child);
	}
	function oc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !_i(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, sc(e, t, a, r, i)) : (e = bi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !kc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Mr : n, n(o, r) && e.ref === t.ref) return Oc(e, t, i);
		}
		return t.flags |= 1, e = vi(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function sc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Mr(a, r) && e.ref === t.ref) if (H = !1, t.pendingProps = r = a, kc(e, i)) e.flags & 131072 && (H = !0);
			else return t.lanes = e.lanes, Oc(e, t, i);
		}
		return hc(e, t, n, r, i);
	}
	function cc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return uc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Ea(t, a === null ? null : a.cachePool), a === null ? ao() : io(t, a), I(t);
			else return r = t.lanes = 536870912, uc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Ea(t, null), ao(), fo(t)) : (Ea(t, a.cachePool), io(t, a), fo(t), t.memoizedState = null);
		return U(e, t, i, n), t.child;
	}
	function lc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function uc(e, t, n, r, i) {
		var a = Ta();
		return a = a === null ? null : {
			parent: pa._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Ea(t, null), ao(), I(t), e !== null && ia(e, t, r, !0), t.childLanes = i, null;
	}
	function dc(e, t) {
		return t = wc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function fc(e, t, n) {
		return Wa(t, e.child, null, n), e = dc(t, t.pendingProps), e.flags |= 2, po(t), t.memoizedState = null, e;
	}
	function pc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (M) {
				if (r.mode === "hidden") return e = dc(t, r), t.lanes = 536870912, lc(null, e);
				if (uo(t), (e = Vi) ? (e = cf(e, Ui), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Mi === null ? null : {
						id: Ni,
						overflow: Pi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ci(e), n.return = t, t.child = n, Bi = t, Vi = null)) : e = null, e === null) throw Gi(t);
				return t.lanes = 536870912, null;
			}
			return dc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (uo(t), a) if (t.flags & 256) t.flags &= -257, t = fc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (H || ia(e, t, n, !1), a = (n & e.childLanes) !== 0, H || a) {
				if (r = Bl, r !== null && (s = ft(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, fi(e, s), _u(r, e, s), ic;
				ku(), t = fc(e, t, n);
			} else e = o.treeContext, Vi = ff(s.nextSibling), Bi = t, M = !0, Hi = null, Ui = !1, e !== null && zi(t, e), t = dc(t, r), t.flags |= 4096;
			return t;
		}
		return e = vi(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function mc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function hc(e, t, n, r, i) {
		return oa(t), n = Oo(e, t, n, r, void 0, i), r = Mo(), e !== null && !H ? (No(e, t, i), Oc(e, t, i)) : (M && r && Li(t), t.flags |= 1, U(e, t, n, i), t.child);
	}
	function gc(e, t, n, r, i, a) {
		return oa(t), t.updateQueue = null, n = Ao(t, r, n, i), ko(e), r = Mo(), e !== null && !H ? (No(e, t, a), Oc(e, t, a)) : (M && r && Li(t), t.flags |= 1, U(e, t, n, a), t.child);
	}
	function _c(e, t, n, r, i) {
		if (oa(t), t.stateNode === null) {
			var a = A, o = n.contextType;
			typeof o == "object" && o && (a = sa(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Ks, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ka(t), o = n.contextType, a.context = typeof o == "object" && o ? sa(o) : A, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Gs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Ks.enqueueReplaceState(a, a.state, null), $a(t, r, a, i), Qa(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Ys(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = A, typeof u == "object" && u && (o = sa(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Js(t, a, r, o), P = !1;
			var f = t.memoizedState;
			a.state = f, $a(t, r, a, i), Qa(), l = t.memoizedState, s || f !== l || P ? (typeof d == "function" && (Gs(t, n, d, r), l = t.memoizedState), (c = P || qs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, qa(e, t), o = t.memoizedProps, u = Ys(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = A, typeof l == "object" && l && (c = sa(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Js(t, a, r, c), P = !1, f = t.memoizedState, a.state = f, $a(t, r, a, i), Qa();
			var p = t.memoizedState;
			o !== d || f !== p || P || e !== null && e.dependencies !== null && aa(e.dependencies) ? (typeof s == "function" && (Gs(t, n, s, r), p = t.memoizedState), (u = P || qs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && aa(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, mc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Wa(t, e.child, null, i), t.child = Wa(t, null, n, i)) : U(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Oc(e, t, i), e;
	}
	function vc(e, t, n, r) {
		return Yi(), t.flags |= 256, U(e, t, n, r), t.child;
	}
	var yc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function bc(e) {
		return {
			baseLanes: e,
			cachePool: Da()
		};
	}
	function xc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Zl), e;
	}
	function Sc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (mo.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (M) {
				if (a ? lo(t) : fo(t), (e = Vi) ? (e = cf(e, Ui), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Mi === null ? null : {
						id: Ni,
						overflow: Pi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ci(e), n.return = t, t.child = n, Bi = t, Vi = null)) : e = null, e === null) throw Gi(t);
				return uf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (fo(t), a = t.mode, c = wc({
				mode: "hidden",
				children: c
			}, a), r = xi(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = bc(n), r.childLanes = xc(e, s, n), t.memoizedState = yc, lc(null, r)) : (lo(t), Cc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (lo(t), t.flags &= -257, t = Tc(e, t, n)) : t.memoizedState === null ? (fo(t), c = r.fallback, a = t.mode, r = wc({
				mode: "visible",
				children: r.children
			}, a), c = xi(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Wa(t, e.child, null, n), r = t.child, r.memoizedState = bc(n), r.childLanes = xc(e, s, n), t.memoizedState = yc, t = lc(null, r)) : (fo(t), t.child = e.child, t.flags |= 128, t = null);
			else if (lo(t), uf(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, N({
					value: r,
					source: null,
					stack: null
				}), t = Tc(e, t, n);
			} else if (H || ia(e, t, n, !1), s = (n & e.childLanes) !== 0, H || s) {
				if (s = Bl, s !== null && (r = ft(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, fi(e, r), _u(s, e, r), ic;
				lf(c) || ku(), t = Tc(e, t, n);
			} else lf(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Vi = ff(c.nextSibling), Bi = t, M = !0, Hi = null, Ui = !1, e !== null && zi(t, e), t = Cc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (fo(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = vi(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = xi(c, a, n, null), c.flags |= 2) : c = vi(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, lc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = bc(n) : (a = c.cachePool, a === null ? a = Da() : (l = pa._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = xc(e, s, n), t.memoizedState = yc, lc(e.child, r)) : (lo(t), n = e.child, e = n.sibling, n = vi(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Cc(e, t) {
		return t = wc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function wc(e, t) {
		return e = gi(22, e, null, t), e.lanes = 0, e;
	}
	function Tc(e, t, n) {
		return Wa(t, e.child, null, n), e = Cc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function W(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), na(e.return, t, n);
	}
	function Ec(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function Dc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = mo.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, ge(mo, o), U(e, t, r, n), r = M ? ki : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && W(e, n, t);
			else if (e.tag === 19) W(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && ho(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Ec(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && ho(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Ec(t, !0, n, null, a, r);
				break;
			case "together":
				Ec(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Oc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Jl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (ia(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = vi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = vi(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function kc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && aa(e))) : !0;
	}
	function Ac(e, t, n) {
		switch (t.tag) {
			case 3:
				xe(t, t.stateNode.containerInfo), ea(t, pa, e.memoizedState.cache), Yi();
				break;
			case 27:
			case 5:
				Ce(t);
				break;
			case 4:
				xe(t, t.stateNode.containerInfo);
				break;
			case 10:
				ea(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, uo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (lo(t), e = Oc(e, t, n), e === null ? null : e.sibling) : Sc(e, t, n) : (lo(t), t.flags |= 128, null);
				lo(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (ia(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Dc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), ge(mo, mo.current), r) break;
				return null;
			case 22: return t.lanes = 0, cc(e, t, n, t.pendingProps);
			case 24: ea(t, pa, e.memoizedState.cache);
		}
		return Oc(e, t, n);
	}
	function jc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) H = !0;
		else {
			if (!kc(e, n) && !(t.flags & 128)) return H = !1, Ac(e, t, n);
			H = !!(e.flags & 131072);
		}
		else H = !1, M && t.flags & 1048576 && Ii(t, ki, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Pa(t.elementType), t.type = e, typeof e == "function") _i(e) ? (r = Ys(e, r), t.tag = 1, t = _c(null, t, e, r, n)) : (t.tag = 0, t = hc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = ac(null, t, e, r, n);
								break a;
							} else if (a === ne) {
								t.tag = 14, t = oc(null, t, e, r, n);
								break a;
							}
						}
						throw t = le(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return hc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Ys(r, t.pendingProps), _c(e, t, r, a, n);
			case 3:
				a: {
					if (xe(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, qa(e, t), $a(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, ea(t, pa, r), r !== o.cache && ra(t, [pa], n, !0), Qa(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = vc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = Ti(Error(i(424)), t), N(a), t = vc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Vi = ff(e.firstChild), Bi = t, M = !0, Hi = null, Ui = !0, n = Ga(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Yi(), r === a) {
							t = Oc(e, t, n);
							break a;
						}
						U(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return mc(e, t), e === null ? (n = Nf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : M || (n = t.type, e = t.pendingProps, r = Wd(ye.current).createElement(n), r[vt] = t, r[yt] = e, Rd(r, n, e), kt(r), t.stateNode = r) : t.memoizedState = Nf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return Ce(t), e === null && M && (r = t.stateNode = gf(t.type, t.pendingProps, ye.current), Bi = t, Ui = !0, a = Vi, tf(t.type) ? (pf = a, Vi = ff(r.firstChild)) : Vi = a), U(e, t, t.pendingProps.children, n), mc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && M && ((a = r = Vi) && (r = of(r, t.type, t.pendingProps, Ui), r === null ? a = !1 : (t.stateNode = r, Bi = t, Vi = ff(r.firstChild), Ui = !1, a = !0)), a || Gi(t)), Ce(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, qd(a, o) ? r = null : s !== null && qd(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Oo(e, t, jo, null, null, n), np._currentValue = a), mc(e, t), U(e, t, r, n), t.child;
			case 6: return e === null && M && ((e = n = Vi) && (n = sf(n, t.pendingProps, Ui), n === null ? e = !1 : (t.stateNode = n, Bi = t, Vi = null, e = !0)), e || Gi(t)), null;
			case 13: return Sc(e, t, n);
			case 4: return xe(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Wa(t, null, r, n) : U(e, t, r, n), t.child;
			case 11: return ac(e, t, t.type, t.pendingProps, n);
			case 7: return U(e, t, t.pendingProps, n), t.child;
			case 8: return U(e, t, t.pendingProps.children, n), t.child;
			case 12: return U(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, ea(t, t.type, r.value), U(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, oa(t), a = sa(a), r = r(a), t.flags |= 1, U(e, t, r, n), t.child;
			case 14: return oc(e, t, t.type, t.pendingProps, n);
			case 15: return sc(e, t, t.type, t.pendingProps, n);
			case 19: return Dc(e, t, n);
			case 31: return pc(e, t, n);
			case 22: return cc(e, t, n, t.pendingProps);
			case 24: return oa(t), r = sa(pa), e === null ? (a = Ta(), a === null && (a = Bl, o = ma(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Ka(t), ea(t, pa, a)) : ((e.lanes & n) !== 0 && (qa(e, t), $a(t, null, null, n), Qa()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, ea(t, pa, r), r !== a.cache && ra(t, [pa], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), ea(t, pa, r))), U(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Mc(e) {
		e.flags |= 4;
	}
	function Nc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Eu()) e.flags |= 8192;
			else throw Fa = ja, ka;
		} else e.flags &= -16777217;
	}
	function Pc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Jf(t)) if (Eu()) e.flags |= 8192;
		else throw Fa = ja, ka;
	}
	function Fc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : ot(), e.lanes |= t, J |= t);
	}
	function Ic(e, t) {
		if (!M) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function Lc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Rc(e, t, n) {
		var r = t.pendingProps;
		switch (Ri(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Lc(t), null;
			case 1: return Lc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ta(pa), Se(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ji(t) ? Mc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Xi())), Lc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Mc(t), o === null ? (Lc(t), Nc(t, a, null, r, n)) : (Lc(t), Pc(t, o))) : o ? o === e.memoizedState ? (Lc(t), t.flags &= -16777217) : (Mc(t), Lc(t), Pc(t, o)) : (e = e.memoizedProps, e !== r && Mc(t), Lc(t), Nc(t, a, e, r, n)), null;
			case 27:
				if (we(t), n = ye.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Mc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Lc(t), null;
					}
					e = _e.current, Ji(t) ? Ki(t, e) : (e = gf(a, r, n), t.stateNode = e, Mc(t));
				}
				return Lc(t), null;
			case 5:
				if (we(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Mc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Lc(t), null;
					}
					if (o = _e.current, Ji(t)) Ki(t, o);
					else {
						var s = Wd(ye.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[vt] = t, o[yt] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Rd(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Mc(t);
					}
				}
				return Lc(t), Nc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Mc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = ye.current, Ji(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Bi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[vt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Fd(e.nodeValue, n)), e || Gi(t, !0);
					} else e = Wd(e).createTextNode(r), e[vt] = t, t.stateNode = e;
				}
				return Lc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Ji(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[vt] = t;
						} else Yi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Lc(t), e = !1;
					} else n = Xi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (po(t), t) : (po(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Lc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Ji(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[vt] = t;
						} else Yi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Lc(t), a = !1;
					} else a = Xi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (po(t), t) : (po(t), null);
				}
				return po(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Fc(t, t.updateQueue), Lc(t), null);
			case 4: return Se(), e === null && Td(t.stateNode.containerInfo), Lc(t), null;
			case 10: return ta(t.type), Lc(t), null;
			case 19:
				if (he(mo), r = t.memoizedState, r === null) return Lc(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) Ic(r, !1);
				else {
					if (ql !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = ho(e), o !== null) {
							for (t.flags |= 128, Ic(r, !1), e = o.updateQueue, t.updateQueue = e, Fc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) yi(n, e), n = n.sibling;
							return ge(mo, mo.current & 1 | 2), M && Fi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && Le() > ru && (t.flags |= 128, a = !0, Ic(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = ho(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Fc(t, e), Ic(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !M) return Lc(t), null;
					} else 2 * Le() - r.renderingStartTime > ru && n !== 536870912 && (t.flags |= 128, a = !0, Ic(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Lc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Le(), e.sibling = null, n = mo.current, ge(mo, a ? n & 1 | 2 : n & 1), M && Fi(t, r.treeForkCount), e);
			case 22:
			case 23: return po(t), oo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Lc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Lc(t), n = t.updateQueue, n !== null && Fc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && he(wa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ta(pa), Lc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function zc(e, t) {
		switch (Ri(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return ta(pa), Se(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return we(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (po(t), t.alternate === null) throw Error(i(340));
					Yi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (po(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Yi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return he(mo), null;
			case 4: return Se(), null;
			case 10: return ta(t.type), null;
			case 22:
			case 23: return po(t), oo(), e !== null && he(wa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return ta(pa), null;
			case 25: return null;
			default: return null;
		}
	}
	function Bc(e, t) {
		switch (Ri(t), t.tag) {
			case 3:
				ta(pa), Se();
				break;
			case 26:
			case 27:
			case 5:
				we(t);
				break;
			case 4:
				Se();
				break;
			case 31:
				t.memoizedState !== null && po(t);
				break;
			case 13:
				po(t);
				break;
			case 19:
				he(mo);
				break;
			case 10:
				ta(t.type);
				break;
			case 22:
			case 23:
				po(t), oo(), e !== null && he(wa);
				break;
			case 24: ta(pa);
		}
	}
	function Vc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			qu(t, t.return, e);
		}
	}
	function Hc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								qu(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			qu(t, t.return, e);
		}
	}
	function Uc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				to(t, n);
			} catch (t) {
				qu(e, e.return, t);
			}
		}
	}
	function Wc(e, t, n) {
		n.props = Ys(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			qu(e, t, n);
		}
	}
	function Gc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			qu(e, t, n);
		}
	}
	function Kc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			qu(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			qu(e, t, n);
		}
		else n.current = null;
	}
	function qc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			qu(e, e.return, t);
		}
	}
	function Jc(e, t, n) {
		try {
			var r = e.stateNode;
			zd(r, e.type, n, t), r[yt] = t;
		} catch (t) {
			qu(e, e.return, t);
		}
	}
	function Yc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && tf(e.type) || e.tag === 4;
	}
	function Xc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Yc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && tf(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Zc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = un));
		else if (r !== 4 && (r === 27 && tf(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Zc(e, t, n), e = e.sibling; e !== null;) Zc(e, t, n), e = e.sibling;
	}
	function Qc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && tf(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Qc(e, t, n), e = e.sibling; e !== null;) Qc(e, t, n), e = e.sibling;
	}
	function $c(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Rd(t, r, n), t[vt] = e, t[yt] = n;
		} catch (t) {
			qu(e, e.return, t);
		}
	}
	var el = !1, tl = !1, nl = !1, rl = typeof WeakSet == "function" ? WeakSet : Set, il = null;
	function al(e, t) {
		if (e = e.containerInfo, Hd = dp, e = Ir(e), Lr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (Ud = {
			focusedElem: e,
			selectionRange: n
		}, dp = !1, il = t; il !== null;) if (t = il, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, il = e;
		else for (; il !== null;) {
			switch (t = il, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Ys(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							qu(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) af(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								af(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, il = e;
				break;
			}
			il = t.return;
		}
	}
	function ol(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				bl(e, n), r & 4 && Vc(5, n);
				break;
			case 1:
				if (bl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					qu(n, n.return, e);
				}
				else {
					var i = Ys(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						qu(n, n.return, e);
					}
				}
				r & 64 && Uc(n), r & 512 && Gc(n, n.return);
				break;
			case 3:
				if (bl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						to(e, t);
					} catch (e) {
						qu(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && $c(n);
			case 26:
			case 5:
				bl(e, n), t === null && r & 4 && qc(n), r & 512 && Gc(n, n.return);
				break;
			case 12:
				bl(e, n);
				break;
			case 31:
				bl(e, n), r & 4 && dl(e, n);
				break;
			case 13:
				bl(e, n), r & 4 && fl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Zu.bind(null, n), df(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || el, !r) {
					t = t !== null && t.memoizedState !== null || tl, i = el;
					var a = tl;
					el = r, (tl = t) && !a ? Sl(e, n, (n.subtreeFlags & 8772) != 0) : bl(e, n), el = i, tl = a;
				}
				break;
			case 30: break;
			default: bl(e, n);
		}
	}
	function sl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, sl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && wt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var cl = null, ll = !1;
	function G(e, t, n) {
		for (n = n.child; n !== null;) ul(e, t, n), n = n.sibling;
	}
	function ul(e, t, n) {
		if (qe && typeof qe.onCommitFiberUnmount == "function") try {
			qe.onCommitFiberUnmount(Ke, n);
		} catch {}
		switch (n.tag) {
			case 26:
				tl || Kc(n, t), G(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				tl || Kc(n, t);
				var r = cl, i = ll;
				tf(n.type) && (cl = n.stateNode, ll = !1), G(e, t, n), _f(n.stateNode), cl = r, ll = i;
				break;
			case 5: tl || Kc(n, t);
			case 6:
				if (r = cl, i = ll, cl = null, G(e, t, n), cl = r, ll = i, cl !== null) if (ll) try {
					(cl.nodeType === 9 ? cl.body : cl.nodeName === "HTML" ? cl.ownerDocument.body : cl).removeChild(n.stateNode);
				} catch (e) {
					qu(n, t, e);
				}
				else try {
					cl.removeChild(n.stateNode);
				} catch (e) {
					qu(n, t, e);
				}
				break;
			case 18:
				cl !== null && (ll ? (e = cl, nf(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Lp(e)) : nf(cl, n.stateNode));
				break;
			case 4:
				r = cl, i = ll, cl = n.stateNode.containerInfo, ll = !0, G(e, t, n), cl = r, ll = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Hc(2, n, t), tl || Hc(4, n, t), G(e, t, n);
				break;
			case 1:
				tl || (Kc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Wc(n, t, r)), G(e, t, n);
				break;
			case 21:
				G(e, t, n);
				break;
			case 22:
				tl = (r = tl) || n.memoizedState !== null, G(e, t, n), tl = r;
				break;
			default: G(e, t, n);
		}
	}
	function dl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Lp(e);
			} catch (e) {
				qu(t, t.return, e);
			}
		}
	}
	function fl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Lp(e);
		} catch (e) {
			qu(t, t.return, e);
		}
	}
	function pl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new rl()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new rl()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function ml(e, t) {
		var n = pl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Qu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function hl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (tf(c.type)) {
							cl = c.stateNode, ll = !1;
							break a;
						}
						break;
					case 5:
						cl = c.stateNode, ll = !1;
						break a;
					case 3:
					case 4:
						cl = c.stateNode.containerInfo, ll = !0;
						break a;
				}
				c = c.return;
			}
			if (cl === null) throw Error(i(160));
			ul(o, s, a), cl = null, ll = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) _l(t, e), t = t.sibling;
	}
	var gl = null;
	function _l(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				hl(t, e), vl(e), r & 4 && (Hc(3, e, e.return), Vc(3, e), Hc(5, e, e.return));
				break;
			case 1:
				hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), r & 64 && el && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = gl;
				if (hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[Ct] || o[vt] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Rd(o, r, n), o[vt] = e, kt(o), r = o;
									break a;
								case "link":
									var s = Gf("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Rd(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = Gf("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Rd(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[vt] = e, kt(o), r = o;
						}
						e.stateNode = r;
					} else Kf(a, e.type, e.stateNode);
					else e.stateNode = Bf(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Jc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Kf(a, e.type, e.stateNode) : Bf(a, r, e.memoizedProps));
				}
				break;
			case 27:
				hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), n !== null && r & 4 && Jc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						tn(a, "");
					} catch (t) {
						qu(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Jc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (nl = !0);
				break;
			case 6:
				if (hl(t, e), vl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						qu(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Wf = null, a = gl, gl = bf(t.containerInfo), hl(t, e), gl = a, vl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Lp(t.containerInfo);
				} catch (t) {
					qu(e, e.return, t);
				}
				nl && (nl = !1, yl(e));
				break;
			case 4:
				r = gl, gl = bf(e.stateNode.containerInfo), hl(t, e), vl(e), gl = r;
				break;
			case 12:
				hl(t, e), vl(e);
				break;
			case 31:
				hl(t, e), vl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
				break;
			case 13:
				hl(t, e), vl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (tu = Le()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = el, d = tl;
				if (el = u || a, tl = d || l, hl(t, e), tl = d, el = u, vl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || el || tl || xl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								qu(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								qu(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? rf(m, !0) : rf(l.stateNode, !1);
							} catch (e) {
								qu(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, ml(e, n))));
				break;
			case 19:
				hl(t, e), vl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: hl(t, e), vl(e);
		}
	}
	function vl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Yc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Qc(e, Xc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (tn(o, ""), n.flags &= -33), Qc(e, Xc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Zc(e, Xc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				qu(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function yl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			yl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function bl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) ol(e, t.alternate, t), t = t.sibling;
	}
	function xl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Hc(4, t, t.return), xl(t);
					break;
				case 1:
					Kc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Wc(t, t.return, n), xl(t);
					break;
				case 27: _f(t.stateNode);
				case 26:
				case 5:
					Kc(t, t.return), xl(t);
					break;
				case 22:
					t.memoizedState === null && xl(t);
					break;
				case 30:
					xl(t);
					break;
				default: xl(t);
			}
			e = e.sibling;
		}
	}
	function Sl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Sl(i, a, n), Vc(4, a);
					break;
				case 1:
					if (Sl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						qu(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) eo(c[i], s);
						} catch (e) {
							qu(r, r.return, e);
						}
					}
					n && o & 64 && Uc(a), Gc(a, a.return);
					break;
				case 27: $c(a);
				case 26:
				case 5:
					Sl(i, a, n), n && r === null && o & 4 && qc(a), Gc(a, a.return);
					break;
				case 12:
					Sl(i, a, n);
					break;
				case 31:
					Sl(i, a, n), n && o & 4 && dl(i, a);
					break;
				case 13:
					Sl(i, a, n), n && o & 4 && fl(i, a);
					break;
				case 22:
					a.memoizedState === null && Sl(i, a, n), Gc(a, a.return);
					break;
				case 30: break;
				default: Sl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Cl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ha(n));
	}
	function wl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ha(e));
	}
	function Tl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) El(e, t, n, r), t = t.sibling;
	}
	function El(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Tl(e, t, n, r), i & 2048 && Vc(9, t);
				break;
			case 1:
				Tl(e, t, n, r);
				break;
			case 3:
				Tl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ha(e)));
				break;
			case 12:
				if (i & 2048) {
					Tl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						qu(t, t.return, e);
					}
				} else Tl(e, t, n, r);
				break;
			case 31:
				Tl(e, t, n, r);
				break;
			case 13:
				Tl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? Tl(e, t, n, r) : (a._visibility |= 2, Dl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? Tl(e, t, n, r) : Ol(e, t), i & 2048 && Cl(o, t);
				break;
			case 24:
				Tl(e, t, n, r), i & 2048 && wl(t.alternate, t);
				break;
			default: Tl(e, t, n, r);
		}
	}
	function Dl(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Dl(a, o, s, c, i), Vc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Dl(a, o, s, c, i)) : u._visibility & 2 ? Dl(a, o, s, c, i) : Ol(a, o), i && l & 2048 && Cl(o.alternate, o);
					break;
				case 24:
					Dl(a, o, s, c, i), i && l & 2048 && wl(o.alternate, o);
					break;
				default: Dl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Ol(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Ol(n, r), i & 2048 && Cl(r.alternate, r);
					break;
				case 24:
					Ol(n, r), i & 2048 && wl(r.alternate, r);
					break;
				default: Ol(n, r);
			}
			t = t.sibling;
		}
	}
	var kl = 8192;
	function Al(e, t, n) {
		if (e.subtreeFlags & kl) for (e = e.child; e !== null;) jl(e, t, n), e = e.sibling;
	}
	function jl(e, t, n) {
		switch (e.tag) {
			case 26:
				Al(e, t, n), e.flags & kl && e.memoizedState !== null && Yf(n, gl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Al(e, t, n);
				break;
			case 3:
			case 4:
				var r = gl;
				gl = bf(e.stateNode.containerInfo), Al(e, t, n), gl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = kl, kl = 16777216, Al(e, t, n), kl = r) : Al(e, t, n));
				break;
			default: Al(e, t, n);
		}
	}
	function Ml(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Nl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				il = r, Il(r, e);
			}
			Ml(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Pl(e), e = e.sibling;
	}
	function Pl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Nl(e), e.flags & 2048 && Hc(9, e, e.return);
				break;
			case 3:
				Nl(e);
				break;
			case 12:
				Nl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Fl(e)) : Nl(e);
				break;
			default: Nl(e);
		}
	}
	function Fl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				il = r, Il(r, e);
			}
			Ml(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Hc(8, t, t.return), Fl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Fl(t));
					break;
				default: Fl(t);
			}
			e = e.sibling;
		}
	}
	function Il(e, t) {
		for (; il !== null;) {
			var n = il;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Hc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: ha(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, il = r;
			else a: for (n = e; il !== null;) {
				r = il;
				var i = r.sibling, a = r.return;
				if (sl(r), r === n) {
					il = null;
					break a;
				}
				if (i !== null) {
					i.return = a, il = i;
					break a;
				}
				il = a;
			}
		}
	}
	var Ll = {
		getCacheForType: function(e) {
			var t = sa(pa), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return sa(pa).controller.signal;
		}
	}, Rl = typeof WeakMap == "function" ? WeakMap : Map, zl = 0, Bl = null, K = null, q = 0, Vl = 0, Hl = null, Ul = !1, Wl = !1, Gl = !1, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = 0, Zl = 0, J = 0, Ql = null, $l = null, eu = !1, tu = 0, nu = 0, ru = Infinity, iu = null, au = null, ou = 0, su = null, cu = null, lu = 0, uu = 0, du = null, fu = null, pu = 0, mu = null;
	function hu() {
		return zl & 2 && q !== 0 ? q & -q : T.T === null ? ht() : md();
	}
	function gu() {
		if (Zl === 0) if (!(q & 536870912) || M) {
			var e = et;
			et <<= 1, !(et & 3932160) && (et = 262144), Zl = e;
		} else Zl = 536870912;
		return e = so.current, e !== null && (e.flags |= 32), Zl;
	}
	function _u(e, t, n) {
		(e === Bl && (Vl === 2 || Vl === 9) || e.cancelPendingCommit !== null) && (wu(e, 0), xu(e, q, Zl, !1)), ct(e, n), (!(zl & 2) || e !== Bl) && (e === Bl && (!(zl & 2) && (Yl |= n), ql === 4 && xu(e, q, Zl, !1)), od(e));
	}
	function vu(e, t, n) {
		if (zl & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || it(e, t), a = r ? Mu(e, t) : Au(e, t, !0), o = r;
		do {
			if (a === 0) {
				Wl && !r && xu(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !bu(n)) {
					a = Au(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = Ql;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (wu(c, s).flags |= 256), s = Au(c, s, !1), s !== 2) {
								if (Gl && !l) {
									c.errorRecoveryDisabledLanes |= o, Yl |= o, a = 4;
									break a;
								}
								o = $l, $l = a, o !== null && ($l === null ? $l = o : $l.push.apply($l, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					wu(e, 0), xu(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							xu(r, t, Zl, !Ul);
							break a;
						case 2:
							$l = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = tu + 300 - Le(), 10 < a)) {
						if (xu(r, t, Zl, !Ul), rt(r, 0, !0) !== 0) break a;
						lu = t, r.timeoutHandle = Xd(yu.bind(null, r, n, $l, iu, eu, t, Zl, Yl, J, Ul, o, "Throttled", -0, 0), a);
						break a;
					}
					yu(r, n, $l, iu, eu, t, Zl, Yl, J, Ul, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		od(e);
	}
	function yu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: un
			}, jl(t, a, d);
			var m = (a & 62914560) === a ? tu - Le() : (a & 4194048) === a ? nu - Le() : 0;
			if (m = Zf(d, m), m !== null) {
				lu = a, e.cancelPendingCommit = m(zu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), xu(e, a, o, !l);
				return;
			}
		}
		zu(e, t, a, n, r, i, o, s, c);
	}
	function bu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!jr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function xu(e, t, n, r) {
		t &= ~Xl, t &= ~Yl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Ye(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && ut(e, n, t);
	}
	function Su() {
		return zl & 6 ? !0 : (sd(0, !1), !1);
	}
	function Cu() {
		if (K !== null) {
			if (Vl === 0) var e = K.return;
			else e = K, $i = Qi = null, Po(e), Ra = null, za = 0, e = K;
			for (; e !== null;) Bc(e.alternate, e), e = e.return;
			K = null;
		}
	}
	function wu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, Zd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), lu = 0, Cu(), Bl = e, K = n = vi(e.current, null), q = t, Vl = 0, Hl = null, Ul = !1, Wl = it(e, t), Gl = !1, J = Zl = Xl = Yl = Jl = ql = 0, $l = Ql = null, eu = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Ye(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Kl = t, li(), n;
	}
	function Tu(e, t) {
		L = null, T.H = Hs, t === Oa || t === Aa ? (t = Ia(), Vl = 3) : t === ka ? (t = Ia(), Vl = 4) : Vl = t === ic ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Hl = t, K === null && (ql = 1, V(e, Ti(t, e.current)));
	}
	function Eu() {
		var e = so.current;
		return e === null ? !0 : (q & 4194048) === q ? co === null : (q & 62914560) === q || q & 536870912 ? e === co : !1;
	}
	function Du() {
		var e = T.H;
		return T.H = Hs, e === null ? Hs : e;
	}
	function Ou() {
		var e = T.A;
		return T.A = Ll, e;
	}
	function ku() {
		ql = 4, Ul || (q & 4194048) !== q && so.current !== null || (Wl = !0), !(Jl & 134217727) && !(Yl & 134217727) || Bl === null || xu(Bl, q, Zl, !1);
	}
	function Au(e, t, n) {
		var r = zl;
		zl |= 2;
		var i = Du(), a = Ou();
		(Bl !== e || q !== t) && (iu = null, wu(e, t)), t = !1;
		var o = ql;
		a: do
			try {
				if (Vl !== 0 && K !== null) {
					var s = K, c = Hl;
					switch (Vl) {
						case 8:
							Cu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							so.current === null && (t = !0);
							var l = Vl;
							if (Vl = 0, Hl = null, Iu(e, s, c, l), n && Wl) {
								o = 0;
								break a;
							}
							break;
						default: l = Vl, Vl = 0, Hl = null, Iu(e, s, c, l);
					}
				}
				ju(), o = ql;
				break;
			} catch (t) {
				Tu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, $i = Qi = null, zl = r, T.H = i, T.A = a, K === null && (Bl = null, q = 0, li()), o;
	}
	function ju() {
		for (; K !== null;) Pu(K);
	}
	function Mu(e, t) {
		var n = zl;
		zl |= 2;
		var r = Du(), a = Ou();
		Bl !== e || q !== t ? (iu = null, ru = Le() + 500, wu(e, t)) : Wl = it(e, t);
		a: do
			try {
				if (Vl !== 0 && K !== null) {
					t = K;
					var o = Hl;
					b: switch (Vl) {
						case 1:
							Vl = 0, Hl = null, Iu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Ma(o)) {
								Vl = 0, Hl = null, Fu(t);
								break;
							}
							t = function() {
								Vl !== 2 && Vl !== 9 || Bl !== e || (Vl = 7), od(e);
							}, o.then(t, t);
							break a;
						case 3:
							Vl = 7;
							break a;
						case 4:
							Vl = 5;
							break a;
						case 7:
							Ma(o) ? (Vl = 0, Hl = null, Fu(t)) : (Vl = 0, Hl = null, Iu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (K.tag) {
								case 26: s = K.memoizedState;
								case 5:
								case 27:
									var c = K;
									if (s ? Jf(s) : c.stateNode.complete) {
										Vl = 0, Hl = null;
										var l = c.sibling;
										if (l !== null) K = l;
										else {
											var u = c.return;
											u === null ? K = null : (K = u, Lu(u));
										}
										break b;
									}
							}
							Vl = 0, Hl = null, Iu(e, t, o, 5);
							break;
						case 6:
							Vl = 0, Hl = null, Iu(e, t, o, 6);
							break;
						case 8:
							Cu(), ql = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Nu();
				break;
			} catch (t) {
				Tu(e, t);
			}
		while (1);
		return $i = Qi = null, T.H = r, T.A = a, zl = n, K === null ? (Bl = null, q = 0, li(), ql) : 0;
	}
	function Nu() {
		for (; K !== null && !Fe();) Pu(K);
	}
	function Pu(e) {
		var t = jc(e.alternate, e, Kl);
		e.memoizedProps = e.pendingProps, t === null ? Lu(e) : K = t;
	}
	function Fu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = gc(n, t, t.pendingProps, t.type, void 0, q);
				break;
			case 11:
				t = gc(n, t, t.pendingProps, t.type.render, t.ref, q);
				break;
			case 5: Po(t);
			default: Bc(n, t), t = K = yi(t, Kl), t = jc(n, t, Kl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Lu(e) : K = t;
	}
	function Iu(e, t, n, r) {
		$i = Qi = null, Po(t), Ra = null, za = 0;
		var i = t.return;
		try {
			if (rc(e, i, t, n, q)) {
				ql = 1, V(e, Ti(n, e.current)), K = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw K = i, t;
			ql = 1, V(e, Ti(n, e.current)), K = null;
			return;
		}
		t.flags & 32768 ? (M || r === 1 ? e = !0 : Wl || q & 536870912 ? e = !1 : (Ul = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = so.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Ru(t, e)) : Lu(t);
	}
	function Lu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Ru(t, Ul);
				return;
			}
			e = t.return;
			var n = Rc(t.alternate, t, Kl);
			if (n !== null) {
				K = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				K = t;
				return;
			}
			K = t = e;
		} while (t !== null);
		ql === 0 && (ql = 5);
	}
	function Ru(e, t) {
		do {
			var n = zc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, K = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				K = e;
				return;
			}
			K = e = n;
		} while (e !== null);
		ql = 6, K = null;
	}
	function zu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Wu();
		while (ou !== 0);
		if (zl & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= ci, lt(e, n, o, s, c, l), e === Bl && (K = Bl = null, q = 0), cu = t, su = e, lu = n, uu = o, du = a, fu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, $u(Ve, function() {
				return Gu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = T.T, T.T = null, a = E.p, E.p = 2, s = zl, zl |= 4;
				try {
					al(e, t, n);
				} finally {
					zl = s, E.p = a, T.T = r;
				}
			}
			ou = 1, Bu(), Vu(), Hu();
		}
	}
	function Bu() {
		if (ou === 1) {
			ou = 0;
			var e = su, t = cu, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = T.T, T.T = null;
				var r = E.p;
				E.p = 2;
				var i = zl;
				zl |= 4;
				try {
					_l(t, e);
					var a = Ud, o = Ir(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Fr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Lr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Pr(s, h), v = Pr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					dp = !!Hd, Ud = Hd = null;
				} finally {
					zl = i, E.p = r, T.T = n;
				}
			}
			e.current = t, ou = 2;
		}
	}
	function Vu() {
		if (ou === 2) {
			ou = 0;
			var e = su, t = cu, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = T.T, T.T = null;
				var r = E.p;
				E.p = 2;
				var i = zl;
				zl |= 4;
				try {
					ol(e, t.alternate, t);
				} finally {
					zl = i, E.p = r, T.T = n;
				}
			}
			ou = 3;
		}
	}
	function Hu() {
		if (ou === 4 || ou === 3) {
			ou = 0, Ie();
			var e = su, t = cu, n = lu, r = fu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? ou = 5 : (ou = 0, cu = su = null, Uu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (au = null), mt(n), t = t.stateNode, qe && typeof qe.onCommitFiberRoot == "function") try {
				qe.onCommitFiberRoot(Ke, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = T.T, i = E.p, E.p = 2, T.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					T.T = t, E.p = i;
				}
			}
			lu & 3 && Wu(), od(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === mu ? pu++ : (pu = 0, mu = e) : pu = 0, sd(0, !1);
		}
	}
	function Uu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ha(t)));
	}
	function Wu() {
		return Bu(), Vu(), Hu(), Gu();
	}
	function Gu() {
		if (ou !== 5) return !1;
		var e = su, t = uu;
		uu = 0;
		var n = mt(lu), r = T.T, a = E.p;
		try {
			E.p = 32 > n ? 32 : n, T.T = null, n = du, du = null;
			var o = su, s = lu;
			if (ou = 0, cu = su = null, lu = 0, zl & 6) throw Error(i(331));
			var c = zl;
			if (zl |= 4, Pl(o.current), El(o, o.current, s, n), zl = c, sd(0, !1), qe && typeof qe.onPostCommitFiberRoot == "function") try {
				qe.onPostCommitFiberRoot(Ke, o);
			} catch {}
			return !0;
		} finally {
			E.p = a, T.T = r, Uu(e, t);
		}
	}
	function Ku(e, t, n) {
		t = Ti(n, t), t = ec(e.stateNode, t, 2), e = Ja(e, t, 2), e !== null && (ct(e, 2), od(e));
	}
	function qu(e, t, n) {
		if (e.tag === 3) Ku(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Ku(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (au === null || !au.has(r))) {
					e = Ti(n, e), n = tc(2), r = Ja(t, n, 2), r !== null && (nc(n, r, t, e), ct(r, 2), od(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Ju(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Rl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Gl = !0, i.add(n), e = Yu.bind(null, e, t, n), t.then(e, e));
	}
	function Yu(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Bl === e && (q & n) === n && (ql === 4 || ql === 3 && (q & 62914560) === q && 300 > Le() - tu ? !(zl & 2) && wu(e, 0) : Xl |= n, J === q && (J = 0)), od(e);
	}
	function Xu(e, t) {
		t === 0 && (t = ot()), e = fi(e, t), e !== null && (ct(e, t), od(e));
	}
	function Zu(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Xu(e, n);
	}
	function Qu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), Xu(e, n);
	}
	function $u(e, t) {
		return Ne(e, t);
	}
	var ed = null, td = null, nd = !1, rd = !1, id = !1, ad = 0;
	function od(e) {
		e !== td && e.next === null && (td === null ? ed = td = e : td = td.next = e), rd = !0, nd || (nd = !0, pd());
	}
	function sd(e, t) {
		if (!id && rd) {
			id = !0;
			do
				for (var n = !1, r = ed; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Ye(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, fd(r, a));
					} else a = q, a = rt(r, r === Bl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || it(r, a) || (n = !0, fd(r, a));
					r = r.next;
				}
			while (n);
			id = !1;
		}
	}
	function cd() {
		ld();
	}
	function ld() {
		rd = nd = !1;
		var e = 0;
		ad !== 0 && Yd() && (e = ad);
		for (var t = Le(), n = null, r = ed; r !== null;) {
			var i = r.next, a = ud(r, t);
			a === 0 ? (r.next = null, n === null ? ed = i : n.next = i, i === null && (td = n)) : (n = r, (e !== 0 || a & 3) && (rd = !0)), r = i;
		}
		ou !== 0 && ou !== 5 || sd(e, !1), ad !== 0 && (ad = 0);
	}
	function ud(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Ye(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = at(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Bl, n = q, n = rt(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Vl === 2 || Vl === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Pe(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || it(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Pe(r), mt(n)) {
				case 2:
				case 8:
					n = Be;
					break;
				case 32:
					n = Ve;
					break;
				case 268435456:
					n = Ue;
					break;
				default: n = Ve;
			}
			return r = dd.bind(null, e), n = Ne(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Pe(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function dd(e, t) {
		if (ou !== 0 && ou !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Wu() && e.callbackNode !== n) return null;
		var r = q;
		return r = rt(e, e === Bl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (vu(e, r, t), ud(e, Le()), e.callbackNode != null && e.callbackNode === n ? dd.bind(null, e) : null);
	}
	function fd(e, t) {
		if (Wu()) return null;
		vu(e, t, !0);
	}
	function pd() {
		$d(function() {
			zl & 6 ? Ne(ze, cd) : ld();
		});
	}
	function md() {
		if (ad === 0) {
			var e = va;
			e === 0 && (e = $e, $e <<= 1, !($e & 261888) && ($e = 256)), ad = e;
		}
		return ad;
	}
	function hd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ln("" + e);
	}
	function gd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function _d(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = hd((i[yt] || null).action), o = r.submitter;
			o && (t = (t = o[yt] || null) ? hd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new An("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (ad !== 0) {
								var e = o ? gd(i, o) : new FormData(i);
								Os(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? gd(i, o) : new FormData(i), Os(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var vd = 0; vd < ri.length; vd++) {
		var yd = ri[vd];
		ii(yd.toLowerCase(), "on" + (yd[0].toUpperCase() + yd.slice(1)));
	}
	ii(Yr, "onAnimationEnd"), ii(Xr, "onAnimationIteration"), ii(Zr, "onAnimationStart"), ii("dblclick", "onDoubleClick"), ii("focusin", "onFocus"), ii("focusout", "onBlur"), ii(Qr, "onTransitionRun"), ii($r, "onTransitionStart"), ii(ei, "onTransitionCancel"), ii(ti, "onTransitionEnd"), Nt("onMouseEnter", ["mouseout", "mouseover"]), Nt("onMouseLeave", ["mouseout", "mouseover"]), Nt("onPointerEnter", ["pointerout", "pointerover"]), Nt("onPointerLeave", ["pointerout", "pointerover"]), Mt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Mt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Mt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Mt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Mt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Mt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var bd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), xd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(bd));
	function Sd(e, t) {
		t = (t & 4) != 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ai(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ai(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Y(e, t) {
		var n = t[bt];
		n === void 0 && (n = t[bt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Ed(t, e, 2, !1), n.add(r));
	}
	function Cd(e, t, n) {
		var r = 0;
		t && (r |= 4), Ed(n, e, r, t);
	}
	var wd = "_reactListening" + Math.random().toString(36).slice(2);
	function Td(e) {
		if (!e[wd]) {
			e[wd] = !0, At.forEach(function(t) {
				t !== "selectionchange" && (xd.has(t) || Cd(t, !1, e), Cd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[wd] || (t[wd] = !0, Cd("selectionchange", !1, t));
		}
	}
	function Ed(e, t, n, r) {
		switch (vp(t)) {
			case 2:
				var i = fp;
				break;
			case 8:
				i = pp;
				break;
			default: i = mp;
		}
		n = i.bind(null, t, n, e), i = void 0, !yn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Dd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = Tt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		gn(function() {
			var r = a, i = dn(n), s = [];
			a: {
				var c = ni.get(e);
				if (c !== void 0) {
					var l = An, u = e;
					switch (e) {
						case "keypress": if (Tn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Jn;
							break;
						case "focusin":
							u = "focus", l = zn;
							break;
						case "focusout":
							u = "blur", l = zn;
							break;
						case "beforeblur":
						case "afterblur":
							l = zn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = Ln;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Rn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Xn;
							break;
						case Yr:
						case Xr:
						case Zr:
							l = Bn;
							break;
						case ti:
							l = Zn;
							break;
						case "scroll":
						case "scrollend":
							l = Mn;
							break;
						case "wheel":
							l = Qn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Vn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Yn;
							break;
						case "toggle":
						case "beforetoggle": l = $n;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = _n(m, p), g != null && d.push(Od(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== k && (u = n.relatedTarget || n.fromElement) && (Tt(u) || u[D])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? Tt(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = Ln, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Yn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : Dt(l), h = u == null ? c : Dt(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, Tt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Ad, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && jd(s, c, l, d, !1), u !== null && f !== null && jd(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? Dt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = yr;
					else if (pr(c)) if (br) v = kr;
					else {
						v = Dr;
						var y = Er;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && on(r.elementType) && (v = yr) : v = Or;
					if (v &&= v(e, r)) {
						mr(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Zt(c, "number", c.value);
				}
				switch (y = r ? Dt(r) : window, e) {
					case "focusin":
						(pr(y) || y.contentEditable === "true") && (zr = y, Br = r, Vr = null);
						break;
					case "focusout":
						Vr = Br = zr = null;
						break;
					case "mousedown":
						Hr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Hr = !1, Ur(s, n, i);
						break;
					case "selectionchange": if (Rr) break;
					case "keydown":
					case "keyup": Ur(s, n, i);
				}
				var b;
				if (tr) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else lr ? sr(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (ir && n.locale !== "ko" && (lr || x !== "onCompositionStart" ? x === "onCompositionEnd" && lr && (b = wn()) : (xn = i, Sn = "value" in xn ? xn.value : xn.textContent, lr = !0)), y = kd(r, x), 0 < y.length && (x = new Hn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = cr(n), b !== null && (x.data = b)))), (b = rr ? ur(e, n) : dr(e, n)) && (x = kd(r, "onBeforeInput"), 0 < x.length && (y = new Hn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), _d(s, e, r, n, i);
			}
			Sd(s, t);
		});
	}
	function Od(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function kd(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = _n(e, n), i != null && r.unshift(Od(e, i, a)), i = _n(e, t), i != null && r.push(Od(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Ad(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function jd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = _n(n, a), l != null && o.unshift(Od(n, l, c))) : i || (l = _n(n, a), l != null && o.push(Od(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Md = /\r\n?/g, Nd = /\u0000|\uFFFD/g;
	function Pd(e) {
		return (typeof e == "string" ? e : "" + e).replace(Md, "\n").replace(Nd, "");
	}
	function Fd(e, t) {
		return t = Pd(t), Pd(e) === t;
	}
	function Id(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || tn(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && tn(e, "" + r);
				break;
			case "className":
				zt(e, "class", r);
				break;
			case "tabIndex":
				zt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				zt(e, n, r);
				break;
			case "style":
				an(e, r, o);
				break;
			case "data": if (t !== "object") {
				zt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = ln("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && Id(e, t, "name", a.name, a, null), Id(e, t, "formEncType", a.formEncType, a, null), Id(e, t, "formMethod", a.formMethod, a, null), Id(e, t, "formTarget", a.formTarget, a, null)) : (Id(e, t, "encType", a.encType, a, null), Id(e, t, "method", a.method, a, null), Id(e, t, "target", a.target, a, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = ln("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = un);
				break;
			case "onScroll":
				r != null && Y("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Y("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = ln("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Y("beforetoggle", e), Y("toggle", e), Rt(e, "popover", r);
				break;
			case "xlinkActuate":
				Bt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Bt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Bt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Bt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Bt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Bt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Bt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Bt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Bt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Rt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = sn.get(n) || n, Rt(e, n, r));
		}
	}
	function Ld(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				an(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? tn(e, r) : (typeof r == "number" || typeof r == "bigint") && tn(e, "" + r);
				break;
			case "onScroll":
				r != null && Y("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Y("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = un);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!jt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[yt] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Rt(e, n, r);
			}
		}
	}
	function Rd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Y("error", e), Y("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: Id(e, t, o, s, n, null);
					}
				}
				a && Id(e, t, "srcSet", n.srcSet, n, null), r && Id(e, t, "src", n.src, n, null);
				return;
			case "input":
				Y("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: Id(e, t, r, d, n, null);
					}
				}
				Xt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Y("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Id(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Qt(e, !!r, n, !0) : Qt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Y("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: Id(e, t, s, c, n, null);
				}
				en(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Id(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Y("beforetoggle", e), Y("toggle", e), Y("cancel", e), Y("close", e);
				break;
			case "iframe":
			case "object":
				Y("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < bd.length; r++) Y(bd[r], e);
				break;
			case "image":
				Y("error", e), Y("load", e);
				break;
			case "details":
				Y("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Y("error", e), Y("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: Id(e, t, u, r, n, null);
				}
				return;
			default: if (on(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Ld(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Id(e, t, c, r, n, null));
	}
	function zd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || Id(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && Id(e, t, p, m, r, f);
					}
				}
				Yt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Id(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Id(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Qt(e, !!n, n ? [] : "", !1) : Qt(e, !!n, t, !0)) : Qt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Id(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && Id(e, t, s, a, r, o);
				}
				$t(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Id(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Id(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Id(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Id(e, t, u, p, r, m);
				}
				return;
			default: if (on(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Ld(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Ld(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Id(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Id(e, t, f, p, r, m);
	}
	function Bd(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Vd() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Bd(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Bd(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Hd = null, Ud = null;
	function Wd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Gd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Kd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function qd(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Jd = null;
	function Yd() {
		var e = window.event;
		return e && e.type === "popstate" ? e === Jd ? !1 : (Jd = e, !0) : (Jd = null, !1);
	}
	var Xd = typeof setTimeout == "function" ? setTimeout : void 0, Zd = typeof clearTimeout == "function" ? clearTimeout : void 0, Qd = typeof Promise == "function" ? Promise : void 0, $d = typeof queueMicrotask == "function" ? queueMicrotask : Qd === void 0 ? Xd : function(e) {
		return Qd.resolve(null).then(e).catch(ef);
	};
	function ef(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function tf(e) {
		return e === "head";
	}
	function nf(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Lp(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") _f(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, _f(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[Ct] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && _f(e.ownerDocument.body);
			n = i;
		} while (n);
		Lp(t);
	}
	function rf(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function af(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					af(n), wt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function of(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[Ct]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = ff(e.nextSibling), e === null) break;
		}
		return null;
	}
	function sf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = ff(e.nextSibling), e === null)) return null;
		return e;
	}
	function cf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = ff(e.nextSibling), e === null)) return null;
		return e;
	}
	function lf(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function uf(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function df(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function ff(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var pf = null;
	function mf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return ff(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function hf(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function gf(e, t, n) {
		switch (t = Wd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function _f(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		wt(e);
	}
	var vf = /* @__PURE__ */ new Map(), yf = /* @__PURE__ */ new Set();
	function bf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var xf = E.d;
	E.d = {
		f: Sf,
		r: Cf,
		D: Ef,
		C: Df,
		L: Of,
		m: kf,
		X: jf,
		S: Af,
		M: Mf
	};
	function Sf() {
		var e = xf.f(), t = Su();
		return e || t;
	}
	function Cf(e) {
		var t = Et(e);
		t !== null && t.tag === 5 && t.type === "form" ? As(t) : xf.r(e);
	}
	var wf = typeof document > "u" ? null : document;
	function Tf(e, t, n) {
		var r = wf;
		if (r && typeof t == "string" && t) {
			var i = Jt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), yf.has(i) || (yf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Rd(t, "link", e), kt(t), r.head.appendChild(t)));
		}
	}
	function Ef(e) {
		xf.D(e), Tf("dns-prefetch", e, null);
	}
	function Df(e, t) {
		xf.C(e, t), Tf("preconnect", e, t);
	}
	function Of(e, t, n) {
		xf.L(e, t, n);
		var r = wf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Jt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Jt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Jt(n.imageSizes) + "\"]")) : i += "[href=\"" + Jt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Pf(e);
					break;
				case "script": a = Rf(e);
			}
			vf.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), vf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Ff(a)) || t === "script" && r.querySelector(zf(a)) || (t = r.createElement("link"), Rd(t, "link", e), kt(t), r.head.appendChild(t)));
		}
	}
	function kf(e, t) {
		xf.m(e, t);
		var n = wf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Jt(r) + "\"][href=\"" + Jt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Rf(e);
			}
			if (!vf.has(a) && (e = h({
				rel: "modulepreload",
				href: e
			}, t), vf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(zf(a))) return;
				}
				r = n.createElement("link"), Rd(r, "link", e), kt(r), n.head.appendChild(r);
			}
		}
	}
	function Af(e, t, n) {
		xf.S(e, t, n);
		var r = wf;
		if (r && e) {
			var i = Ot(r).hoistableStyles, a = Pf(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Ff(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = vf.get(a)) && Hf(e, n);
					var c = o = r.createElement("link");
					kt(c), Rd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Vf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function jf(e, t) {
		xf.X(e, t);
		var n = wf;
		if (n && e) {
			var r = Ot(n).hoistableScripts, i = Rf(e), a = r.get(i);
			a || (a = n.querySelector(zf(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = vf.get(i)) && Uf(e, t), a = n.createElement("script"), kt(a), Rd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Mf(e, t) {
		xf.M(e, t);
		var n = wf;
		if (n && e) {
			var r = Ot(n).hoistableScripts, i = Rf(e), a = r.get(i);
			a || (a = n.querySelector(zf(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = vf.get(i)) && Uf(e, t), a = n.createElement("script"), kt(a), Rd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Nf(e, t, n, r) {
		var a = (a = ye.current) ? bf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Pf(n.href), n = Ot(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Pf(n.href);
					var o = Ot(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Ff(e))) && !o._p && (s.instance = o, s.state.loading = 5), vf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, vf.set(e, n), o || Lf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Rf(n), n = Ot(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Pf(e) {
		return "href=\"" + Jt(e) + "\"";
	}
	function Ff(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function If(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Lf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Rd(t, "link", n), kt(t), e.head.appendChild(t));
	}
	function Rf(e) {
		return "[src=\"" + Jt(e) + "\"]";
	}
	function zf(e) {
		return "script[async]" + e;
	}
	function Bf(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Jt(n.href) + "\"]");
				if (r) return t.instance = r, kt(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), kt(r), Rd(r, "style", a), Vf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Pf(n.href);
				var o = e.querySelector(Ff(a));
				if (o) return t.state.loading |= 4, t.instance = o, kt(o), o;
				r = If(n), (a = vf.get(a)) && Hf(r, a), o = (e.ownerDocument || e).createElement("link"), kt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Rd(o, "link", r), t.state.loading |= 4, Vf(o, n.precedence, e), t.instance = o;
			case "script": return o = Rf(n.src), (a = e.querySelector(zf(o))) ? (t.instance = a, kt(a), a) : (r = n, (a = vf.get(o)) && (r = h({}, n), Uf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), kt(a), Rd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Vf(r, n.precedence, e));
		return t.instance;
	}
	function Vf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Hf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Uf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Wf = null;
	function Gf(e, t, n) {
		if (Wf === null) {
			var r = /* @__PURE__ */ new Map(), i = Wf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Wf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[Ct] || a[vt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Kf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function qf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Jf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Yf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Pf(r.href), a = t.querySelector(Ff(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Qf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, kt(a);
					return;
				}
				a = t.ownerDocument || t, r = If(r), (i = vf.get(i)) && Hf(r, i), a = a.createElement("link"), kt(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Rd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Qf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Xf = 0;
	function Zf(e, t) {
		return e.stylesheets && e.count === 0 && ep(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && ep(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Xf === 0 && (Xf = 62500 * Vd());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ep(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Xf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Qf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) ep(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var $f = null;
	function ep(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, $f = /* @__PURE__ */ new Map(), t.forEach(tp, e), $f = null, Qf.call(e));
	}
	function tp(e, t) {
		if (!(t.state.loading & 4)) {
			var n = $f.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), $f.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Qf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var np = {
		$$typeof: C,
		Provider: null,
		Consumer: null,
		_currentValue: de,
		_currentValue2: de,
		_threadCount: 0
	};
	function rp(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = st(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = st(0), this.hiddenUpdates = st(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ip(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new rp(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = gi(3, null, null, t), e.current = a, a.stateNode = e, t = ma(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Ka(a), e;
	}
	function ap(e) {
		return e ? (e = A, e) : A;
	}
	function op(e, t, n, r, i, a) {
		i = ap(i), r.context === null ? r.context = i : r.pendingContext = i, r = F(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ja(e, r, t), n !== null && (_u(n, e, t), Ya(n, e, t));
	}
	function sp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function cp(e, t) {
		sp(e, t), (e = e.alternate) && sp(e, t);
	}
	function lp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = fi(e, 67108864);
			t !== null && _u(t, e, 67108864), cp(e, 67108864);
		}
	}
	function up(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = hu();
			t = pt(t);
			var n = fi(e, t);
			n !== null && _u(n, e, t), cp(e, t);
		}
	}
	var dp = !0;
	function fp(e, t, n, r) {
		var i = T.T;
		T.T = null;
		var a = E.p;
		try {
			E.p = 2, mp(e, t, n, r);
		} finally {
			E.p = a, T.T = i;
		}
	}
	function pp(e, t, n, r) {
		var i = T.T;
		T.T = null;
		var a = E.p;
		try {
			E.p = 8, mp(e, t, n, r);
		} finally {
			E.p = a, T.T = i;
		}
	}
	function mp(e, t, n, r) {
		if (dp) {
			var i = hp(r);
			if (i === null) Dd(e, t, r, gp, n), Dp(e, r);
			else if (kp(i, e, t, n, r)) r.stopPropagation();
			else if (Dp(e, r), t & 4 && -1 < Ep.indexOf(e)) {
				for (; i !== null;) {
					var a = Et(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = nt(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Ye(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									od(a), !(zl & 6) && (ru = Le() + 500, sd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = fi(a, 2), s !== null && _u(s, a, 2), Su(), cp(a, 2);
					}
					if (a = hp(r), a === null && Dd(e, t, r, gp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Dd(e, t, r, null, n);
		}
	}
	function hp(e) {
		return e = dn(e), _p(e);
	}
	var gp = null;
	function _p(e) {
		if (gp = null, e = Tt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return gp = e, null;
	}
	function vp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Re()) {
				case ze: return 2;
				case Be: return 8;
				case Ve:
				case He: return 32;
				case Ue: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var yp = !1, bp = null, xp = null, Sp = null, Cp = /* @__PURE__ */ new Map(), wp = /* @__PURE__ */ new Map(), Tp = [], Ep = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Dp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				bp = null;
				break;
			case "dragenter":
			case "dragleave":
				xp = null;
				break;
			case "mouseover":
			case "mouseout":
				Sp = null;
				break;
			case "pointerover":
			case "pointerout":
				Cp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": wp.delete(t.pointerId);
		}
	}
	function Op(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Et(t), t !== null && lp(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function kp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return bp = Op(bp, e, t, n, r, i), !0;
			case "dragenter": return xp = Op(xp, e, t, n, r, i), !0;
			case "mouseover": return Sp = Op(Sp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Cp.set(a, Op(Cp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, wp.set(a, Op(wp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ap(e) {
		var t = Tt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, gt(e.priority, function() {
							up(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, gt(e.priority, function() {
							up(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function jp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = hp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				k = r, n.target.dispatchEvent(r), k = null;
			} else return t = Et(n), t !== null && lp(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Mp(e, t, n) {
		jp(e) && n.delete(t);
	}
	function Np() {
		yp = !1, bp !== null && jp(bp) && (bp = null), xp !== null && jp(xp) && (xp = null), Sp !== null && jp(Sp) && (Sp = null), Cp.forEach(Mp), wp.forEach(Mp);
	}
	function Pp(e, n) {
		e.blockedOn === n && (e.blockedOn = null, yp || (yp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Np)));
	}
	var Fp = null;
	function Ip(e) {
		Fp !== e && (Fp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Fp === e && (Fp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (_p(r || n) === null) continue;
					break;
				}
				var a = Et(n);
				a !== null && (e.splice(t, 3), t -= 3, Os(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Lp(e) {
		function t(t) {
			return Pp(t, e);
		}
		bp !== null && Pp(bp, e), xp !== null && Pp(xp, e), Sp !== null && Pp(Sp, e), Cp.forEach(t), wp.forEach(t);
		for (var n = 0; n < Tp.length; n++) {
			var r = Tp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Tp.length && (n = Tp[0], n.blockedOn === null);) Ap(n), n.blockedOn === null && Tp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[yt] || null;
			if (typeof a == "function") o || Ip(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[yt] || null) s = o.formAction;
					else if (_p(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Ip(n);
			}
		}
	}
	function Rp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function zp(e) {
		this._internalRoot = e;
	}
	Bp.prototype.render = zp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		op(n, hu(), e, t, null, null);
	}, Bp.prototype.unmount = zp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			op(e.current, 2, null, e, null, null), Su(), t[D] = null;
		}
	};
	function Bp(e) {
		this._internalRoot = e;
	}
	Bp.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = ht();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Tp.length && t !== 0 && t < Tp[n].priority; n++);
			Tp.splice(n, 0, e), n === 0 && Ap(e);
		}
	};
	var Vp = n.version;
	if (Vp !== "19.2.8") throw Error(i(527, Vp, "19.2.8"));
	E.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Hp = {
		bundleType: 0,
		version: "19.2.8",
		rendererPackageName: "react-dom",
		currentDispatcherRef: T,
		reconcilerVersion: "19.2.8"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Up = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Up.isDisabled && Up.supportsFiber) try {
			Ke = Up.inject(Hp), qe = Up;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Xs, s = Zs, c = Qs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ip(e, 1, !1, null, null, n, r, null, o, s, c, Rp), e[D] = t.current, Td(e), new zp(t);
	};
})), g = (/* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
})))(), _ = /* @__PURE__ */ c(u(), 1), v = (0, _.createContext)(null);
function y(e, t) {
	let n = null;
	return e != null && (n = e[1]), { getTheme: function() {
		return t ?? (n == null ? null : n.getTheme());
	} };
}
function b() {
	let e = (0, _.useContext)(v);
	return e ?? function(e, ...t) {
		let n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
		r.append("code", e);
		for (let e of t) r.append("v", e);
		throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
	}(8), e;
}
//#endregion
//#region node_modules/lexical/dist/Lexical.prod.mjs
function x(e, ...t) {
	let n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
	r.append("code", e);
	for (let e of t) r.append("v", e);
	throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function S(e, ...t) {
	let n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
	r.append("code", e);
	for (let e of t) r.append("v", e);
	n.search = r.toString(), console.warn(`Minified Lexical warning #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
var C = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, w = C && "documentMode" in document ? document.documentMode : null, ee = C && /Mac|iPod|iPhone|iPad/.test(navigator.platform), te = C && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent), ne = !(!C || !("InputEvent" in window) || w) && "getTargetRanges" in new window.InputEvent("input"), re = C && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, ie = C && /Android/.test(navigator.userAgent), ae = C && /Version\/[\d.]+.*Safari/.test(navigator.userAgent) && !ie, oe = C && /^(?=.*Chrome).*/i.test(navigator.userAgent), se = C && ie && oe, ce = C && /AppleWebKit\/[\d.]+/.test(navigator.userAgent) && ee && !oe, le = 0, ue = 1, T = 2, E = 1, de = 2, fe = 3, pe = 4, me = 5, he = 6, ge = ae || re || ce ? "\xA0" : "​", _e = "\n\n", ve = te ? "\xA0" : ge, ye = {
	bold: 1,
	capitalize: 1024,
	code: 16,
	highlight: 128,
	italic: 2,
	lowercase: 256,
	strikethrough: 4,
	subscript: 32,
	superscript: 64,
	underline: 8,
	uppercase: 512
}, be = {
	directionless: 1,
	unmergeable: 2
}, xe = {
	center: 2,
	end: 6,
	justify: 4,
	left: 1,
	right: 3,
	start: 5
}, Se = {
	[de]: "center",
	[he]: "end",
	[pe]: "justify",
	[E]: "left",
	[fe]: "right",
	[me]: "start"
}, Ce = {
	normal: 0,
	segmented: 2,
	token: 1
}, we = {
	[le]: "normal",
	[T]: "segmented",
	[ue]: "token"
}, Te = "$config";
function Ee() {
	return U()._blockCursorElement;
}
function De(e) {
	return e !== null && e.nodeType === 1 && e.hasAttribute("data-lexical-slot");
}
var Oe = class e {
	element;
	before;
	after;
	constructor(e, t, n) {
		this.element = e, this.before = t || null, this.after = n || null;
	}
	withBefore(t) {
		return new e(this.element, t, this.after);
	}
	withAfter(t) {
		return new e(this.element, this.before, t);
	}
	withElement(t) {
		return this.element === t ? this : new e(t, this.before, this.after);
	}
	insertChild(e) {
		let t = this.getInsertionAnchor();
		return t !== null && t.parentElement !== this.element && x(357), this.element.insertBefore(e, t), this;
	}
	removeChild(e) {
		return e.parentElement !== this.element && x(358), this.element.removeChild(e), this;
	}
	replaceChild(e, t) {
		return t.parentElement !== this.element && x(359), this.element.replaceChild(e, t), this;
	}
	getFirstChild() {
		let e = this.getFirstChildAnchor(), t = e ? e.nextSibling : this.element.firstChild;
		return t === this.getInsertionAnchor() ? null : t;
	}
	getFirstChildAnchor() {
		return this.after;
	}
	resolveLeafPosition(e, t, n) {
		if (this.element === e) return t === e && n === 0 ? "before" : "after";
		let r = ke(e, this.element);
		if (r === null) return "after";
		let i = Array.prototype.indexOf.call(e.childNodes, r);
		if (i < 0) return "after";
		if (t === e) return n <= i ? "before" : "after";
		let a = ke(e, t);
		if (a === null) return "after";
		let o = Array.prototype.indexOf.call(e.childNodes, a);
		return o >= 0 && o <= i ? "before" : "after";
	}
	getInsertionAnchor() {
		return this.before;
	}
};
function ke(e, t) {
	let n = t;
	for (; n !== null && n.parentNode !== e;) n = n.parentNode;
	return n;
}
var Ae = class e extends Oe {
	withBefore(t) {
		return new e(this.element, t, this.after);
	}
	withAfter(t) {
		return new e(this.element, this.before, t);
	}
	withElement(t) {
		return this.element === t ? this : new e(t, this.before, this.after);
	}
	getInsertionAnchor() {
		return super.getInsertionAnchor() || this.getManagedLineBreak();
	}
	getFirstChildAnchor() {
		let e = super.getFirstChildAnchor(), t = e ? e.nextSibling : this.element.firstChild;
		for (; De(t);) e = t, t = t.nextSibling;
		let n = e ? e.nextSibling : this.element.firstChild;
		return n !== null && n === Ee() ? n : e;
	}
	getManagedLineBreak() {
		return this.element.__lexicalLineBreak || null;
	}
	setManagedLineBreak(e) {
		if (this.element.__lexicalLastChildKind = e, e === null) this.removeManagedLineBreak();
		else {
			let t = e === "decorator" && (ce || re || ae);
			this.insertManagedLineBreak(t);
		}
	}
	removeManagedLineBreak() {
		let e = this.getManagedLineBreak();
		if (e) {
			let t = this.element, n = e.nodeName === "IMG" ? e.nextSibling : null;
			n && t.removeChild(n), t.removeChild(e), t.__lexicalLineBreak = void 0;
		}
	}
	insertManagedLineBreak(e) {
		let t = this.getManagedLineBreak();
		if (t) {
			if (e === (t.nodeName === "IMG")) return;
			this.removeManagedLineBreak();
		}
		let n = this.element, r = this.before, i = B().createElement("br");
		if (i.setAttribute("data-lexical-managed-linebreak", "true"), n.insertBefore(i, r), e) {
			let e = B().createElement("img");
			e.setAttribute("data-lexical-managed-linebreak", "true"), e.style.setProperty("display", "inline", "important"), e.style.setProperty("border", "0px", "important"), e.style.setProperty("margin", "0px", "important"), e.alt = "", n.insertBefore(e, i), n.__lexicalLineBreak = e;
		} else n.__lexicalLineBreak = i;
	}
	getFirstChildOffset() {
		let e = this.getFirstChild(), t = this.getInsertionAnchor(), n = 0;
		for (let r = this.element.firstChild; r !== null && r !== e && r !== t; r = r.nextSibling) n++;
		return n;
	}
	resolveChildIndex(e, t, n, r) {
		if (n === this.element) {
			let t = this.getFirstChildOffset(), n = Ee(), i = this.element.childNodes, a = Math.min(r, i.length), o = 0;
			for (let e = t; e < a; e++) i[e] !== n && o++;
			return [e, Math.min(o, e.getChildrenSize())];
		}
		let i = je(t, n);
		i.push(r);
		let a = je(t, this.element), o = e.getIndexWithinParent();
		for (let e = 0; e < a.length; e++) {
			let t = i[e], n = a[e];
			if (t === void 0 || t < n) break;
			if (t > n) {
				o += 1;
				break;
			}
		}
		return [e.getParentOrThrow(), o];
	}
};
function je(e, t) {
	let n = [], r = t;
	for (; r !== e && r !== null; r = r.parentNode) {
		let e = 0;
		for (let t = r.previousSibling; t !== null; t = t.previousSibling) e++;
		n.push(e);
	}
	return r !== e && x(225), n.reverse();
}
var Me;
try {
	Me = "0.48.0+prod.esm";
} catch {}
var Ne = Me ?? "\"<unknown>+source\"", Pe = class {
	_front = /* @__PURE__ */ new Set();
	_back = /* @__PURE__ */ new Set();
	_cache;
	get size() {
		return this._front.size + this._back.size;
	}
	addBack(e) {
		return delete this._cache, this._front.has(e) || this._back.add(e), this;
	}
	addFront(e) {
		return delete this._cache, this._back.has(e) || this._front.add(e), this;
	}
	delete(e) {
		return delete this._cache, this._front.delete(e) || this._back.delete(e);
	}
	toArray() {
		let e = Array.from(this._front).reverse();
		for (let t of this._back) e.push(t);
		return e;
	}
	toReadonlyArray() {
		return this._cache = this._cache || this.toArray(), this._cache;
	}
	[Symbol.iterator]() {
		return this.toReadonlyArray()[Symbol.iterator]();
	}
}, Fe = null;
function Ie(e, t = 1e3) {
	return e instanceof Le ? e.clone() : e.size < t ? new Map(e) : new Le().init(new Map(e), void 0, e.size);
}
var Le = class e {
	_mutable = !1;
	_old = void 0;
	_nursery = void 0;
	_size = 0;
	clone() {
		return this._mutable = !1, new e().init(this._old, this._nursery, this._size);
	}
	init(e, t, n) {
		return this._old = e, this._nursery = t, this._size = n, this;
	}
	get size() {
		return this._size;
	}
	has(e) {
		return this.get(e) !== void 0;
	}
	getWithTombstone(e) {
		let t = this._nursery && this._nursery.get(e);
		return t === void 0 ? this._old && this._old.get(e) : t;
	}
	get(e) {
		let t = this.getWithTombstone(e);
		return t === Fe ? void 0 : t;
	}
	shouldCompact() {
		return this._nursery !== void 0 && 2 * this._nursery.size > this._size;
	}
	getNursery() {
		return this._mutable && this._nursery || (this.compact(), this._nursery = new Map(this._nursery), this._mutable = !0), this._nursery;
	}
	compact(e = !1) {
		if (this._nursery && this._nursery.size > 0 && (e || this.shouldCompact())) {
			let e = new Map(this._old);
			for (let [t, n] of this._nursery) n === Fe ? e.delete(t) : e.set(t, n);
			this._old = e, this._nursery = void 0;
		}
		return this._mutable = !1, this;
	}
	set(e, t) {
		let n = this.getWithTombstone(e);
		if (n === t) return this;
		let r = this.getNursery();
		return n !== Fe && n !== void 0 || (this._size++, n === Fe && r.delete(e)), r.set(e, t), this;
	}
	delete(e) {
		let t = this.has(e);
		return t && (this.getNursery().set(e, Fe), this._size--), t;
	}
	getOrInsert(e, t) {
		let n = this.get(e);
		return n === void 0 ? (this.set(e, t), t) : n;
	}
	getOrInsertComputed(e, t) {
		let n = this.get(e);
		if (n !== void 0) return n;
		let r = t(e);
		return this.set(e, r), r;
	}
	clear() {
		this._mutable = !1, this._old = void 0, this._nursery = void 0, this._size = 0;
	}
	*keys() {
		for (let e of this.entries()) yield e[0];
	}
	*values() {
		for (let e of this.entries()) yield e[1];
	}
	*entries() {
		let e = this._nursery, t = this._old;
		if (t) for (let n of t) {
			let t = n[0], r = e ? e.get(t) : void 0;
			r !== Fe && (r !== void 0 && (n[1] = r), yield n);
		}
		if (e) for (let n of e) n[1] === Fe || t && t.has(n[0]) || (yield n);
	}
	forEach(e, t) {
		t !== void 0 && (e = e.bind(t));
		for (let [t, n] of this.entries()) e(n, t, this);
	}
	get [Symbol.toStringTag]() {
		return "GenMap";
	}
	[Symbol.iterator]() {
		return this.entries();
	}
};
function Re(e, t, n, r, i, a) {
	if (P(e)) {
		let o = e.getFirstChild();
		for (; o !== null;) {
			let e = o.__key;
			o.__parent === t && ((P(o) || kc(o) && o.__slots !== null) && Re(o, e, n, r, i, a), n.has(e) || a.delete(e), i.push(e)), o = o.getNextSibling();
		}
	}
	for (let o of kc(e) && e.__slots !== null ? e.__slots.values() : []) {
		let e = r.get(o);
		e !== void 0 && Ac(e) && e.__slotHost === t && ((P(e) || kc(e) && e.__slots !== null) && Re(e, o, n, r, i, a), n.has(o) || a.delete(o), i.push(o));
	}
}
var ze = !1, Be = 0;
function Ve(e) {
	Be = e.timeStamp;
}
function He(e, t, n) {
	let r = e.nodeName === "BR", i = t.__lexicalLineBreak;
	return i && (e === i || r && e.previousSibling === i) || r && Go(e, n) !== void 0;
}
function Ue(e, t, n) {
	let r = Is(Ts(n)), i = r && Gs(r, n._rootElement), a = null, o = null;
	i !== null && i.anchorNode === e && (a = i.anchorOffset, o = i.focusOffset);
	let s = e.nodeValue;
	s !== null && is(t, s, a, o, !1);
}
function We(e, t, n) {
	if (j(e)) {
		let t = e.anchor.getNode();
		if (t.is(n) && e.format !== t.getFormat()) return !1;
	}
	return No(t) && n.isAttached();
}
function Ge(e, t, n) {
	for (let r = e; r && !vc(r); r = ys(r)) {
		let e = Go(r, t);
		if (e !== void 0) {
			let t = R(e, n);
			if (t) return F(t) || !V(r) ? void 0 : [r, t];
		}
	}
}
function Ke(e, t, n) {
	ze = !0;
	let r = performance.now() - Be > 100;
	try {
		Ua(e, () => {
			let i = N() || function(e) {
				return e.read("latest", () => {
					let e = N();
					return e === null ? null : e.clone();
				});
			}(e), a = /* @__PURE__ */ new Map(), o = e._editorState, s = e._blockCursorElement, c = !1, l = "";
			for (let n = 0; n < t.length; n++) {
				let u = t[n], d = u.type, f = u.target, p = Ge(f, e, o);
				if (!p) continue;
				let [m, h] = p;
				if (d === "characterData") r && A(h) && No(f) && We(i, f, h) && Ue(f, h, e);
				else if (d === "childList") {
					c = !0;
					let t = u.addedNodes;
					for (let n = 0; n < t.length; n++) {
						let r = t[n], i = Uo(r), a = r.parentNode;
						if (!(a == null || r === s || i !== null || He(r, a, e) || e._slotsUsed && V(r) && r.hasAttribute("data-lexical-slot") || vc(r))) {
							if (te) {
								let e = (V(r) ? r.innerText : null) || r.nodeValue;
								e && (l += e);
							}
							a.removeChild(r);
						}
					}
					let n = u.removedNodes, r = n.length;
					if (r > 0) {
						let t = 0;
						for (let i = 0; i < r; i++) {
							let r = n[i];
							(He(r, f, e) || s === r) && (f.appendChild(r), t++);
						}
						r !== t && a.set(m, h);
					}
				}
			}
			if (a.size > 0) for (let [t, n] of a) n.reconcileObservedMutation(t, e);
			let u = n.takeRecords();
			if (u.length > 0) {
				for (let t = 0; t < u.length; t++) {
					let n = u[t], r = n.addedNodes, i = n.target;
					for (let t = 0; t < r.length; t++) {
						let n = r[t], a = n.parentNode;
						a == null || n.nodeName !== "BR" || He(n, i, e) || a.removeChild(n);
					}
				}
				n.takeRecords();
			}
			i !== null && (c && Xo(i), te && _s(e) && i.insertRawText(l));
		});
	} finally {
		ze = !1;
	}
}
function qe(e) {
	let t = e._observer;
	t !== null && Ke(e, t.takeRecords(), t);
}
function Je(e) {
	(function(e) {
		Be === 0 && Ts(e).addEventListener("textInput", Ve, !0);
	})(e), e._observer = new MutationObserver((t, n) => {
		Ke(e, t, n);
	});
}
var Ye = "latest", Xe = class {
	key;
	parse;
	unparse;
	isEqual;
	defaultValue;
	resetOnCopyNode;
	constructor(e, t) {
		this.key = e, this.parse = t.parse.bind(t), this.unparse = (t.unparse || ot).bind(t), this.isEqual = (t.isEqual || Object.is).bind(t), this.defaultValue = this.parse(void 0), this.resetOnCopyNode = t.resetOnCopyNode || !1;
	}
};
function Ze(e, t) {
	return new Xe(e, t);
}
function Qe(e, t, n = Ye) {
	let r = (n === "latest" ? e.getLatest() : e).__state;
	return r ? r.getValue(t) : t.defaultValue;
}
function $e(e, t, n) {
	let r;
	if (Ca(), typeof n == "function") {
		let i = e.getLatest(), a = Qe(i, t);
		if (r = n(a), t.isEqual(a, r)) return i;
	} else r = n;
	let i = e.getWritable();
	return rt(i).updateFromKnown(t, r), i;
}
function et(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set();
	for (let { ownNodeConfig: r } of wc(typeof e == "function" ? e : e.replace)) if (r && r.stateConfigs) for (let e of r.stateConfigs) {
		let r;
		"stateConfig" in e ? (r = e.stateConfig, e.flat && n.add(r.key)) : r = e, t.set(r.key, r);
	}
	return {
		flatKeys: n,
		sharedConfigMap: t
	};
}
var tt = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]), nt = class e {
	node;
	knownState;
	unknownState;
	sharedNodeState;
	size;
	constructor(e, t, n = void 0, r = /* @__PURE__ */ new Map(), i = void 0) {
		this.node = e, this.sharedNodeState = t, this.unknownState = n, this.knownState = r;
		let { sharedConfigMap: a } = this.sharedNodeState, o = i === void 0 ? function(e, t, n) {
			let r = n.size;
			if (t) for (let i in t) {
				let t = e.get(i);
				t && n.has(t) || r++;
			}
			return r;
		}(a, n, r) : i;
		this.size = o;
	}
	getValue(e) {
		let t = this.knownState.get(e);
		if (t !== void 0) return t;
		this.sharedNodeState.sharedConfigMap.set(e.key, e);
		let n = e.defaultValue;
		if (this.unknownState && e.key in this.unknownState) {
			let t = this.unknownState[e.key];
			t !== void 0 && (n = e.parse(t)), this.updateFromKnown(e, n);
		}
		return n;
	}
	getInternalState() {
		return [this.unknownState, this.knownState];
	}
	toJSON() {
		let e = { ...this.unknownState }, t = {};
		for (let [t, n] of this.knownState) t.isEqual(n, t.defaultValue) ? delete e[t.key] : e[t.key] = t.unparse(n);
		for (let n of this.sharedNodeState.flatKeys) n in e && (t[n] = e[n], delete e[n]);
		return at(e) && (t.$ = e), t;
	}
	getWritable(t) {
		if (this.node === t) return this;
		let { sharedNodeState: n, unknownState: r } = this, i = new Map(this.knownState);
		return new e(t, n, function(e, t, n) {
			let r;
			if (n) for (let [i, a] of Object.entries(n)) {
				if (tt.has(i)) continue;
				let n = e.get(i);
				n ? t.has(n) || t.set(n, n.parse(a)) : (r ||= {}, r[i] = a);
			}
			return r;
		}(n.sharedConfigMap, i, r), i, this.size);
	}
	resetOnCopyNode() {
		for (let e of this.knownState.keys()) e.resetOnCopyNode && this.knownState.set(e, e.defaultValue);
		return this;
	}
	updateFromKnown(e, t) {
		let n = e.key;
		this.sharedNodeState.sharedConfigMap.set(n, e);
		let { knownState: r, unknownState: i } = this;
		r.has(e) || i && n in i || (i && (delete i[n], this.unknownState = at(i)), this.size++), r.set(e, t);
	}
	updateFromUnknown(e, t) {
		if (tt.has(e)) return;
		let n = this.sharedNodeState.sharedConfigMap.get(e);
		n ? this.updateFromKnown(n, n.parse(t)) : (this.unknownState = this.unknownState || {}, e in this.unknownState || this.size++, this.unknownState[e] = t);
	}
	updateFromJSON(e) {
		let { knownState: t } = this;
		for (let e of t.keys()) t.set(e, e.defaultValue);
		if (this.size = t.size, this.unknownState = void 0, e) for (let [t, n] of Object.entries(e)) this.updateFromUnknown(t, n);
	}
};
function rt(e) {
	let t = e.getWritable(), n = t.__state ? t.__state.getWritable(t) : new nt(t, it(t));
	return t.__state = n, n;
}
function it(e) {
	return e.__state ? e.__state.sharedNodeState : Co(U(), e.getType()).sharedNodeState;
}
function at(e) {
	if (e) for (let t in e) return e;
}
function ot(e) {
	return e;
}
function st(e, t, n) {
	for (let [r, i] of t.knownState) {
		if (e.has(r.key)) continue;
		e.add(r.key);
		let t = n ? n.getValue(r) : r.defaultValue;
		if (t !== i && !r.isEqual(t, i)) return !0;
	}
	return !1;
}
function ct(e, t, n) {
	let { unknownState: r } = t, i = n ? n.unknownState : void 0;
	if (r) {
		for (let [t, n] of Object.entries(r)) if (!e.has(t) && (e.add(t), n !== (i ? i[t] : void 0))) return !0;
	}
	return !1;
}
function lt(e, t) {
	let n = e.__state;
	return n && n.node === e ? n.getWritable(t) : n;
}
function ut(e, t) {
	let n = e.__mode, r = e.__format, i = e.__style, a = t.__mode, o = t.__format, s = t.__style, c = e.__state, l = t.__state;
	return (n === null || n === a) && (r === null || r === o) && (i === null || i === s) && (e.__state === null || c === l || function(e, t) {
		if (e === t) return !0;
		let n = /* @__PURE__ */ new Set();
		return !(e && st(n, e, t) || t && st(n, t, e) || e && ct(n, e, t) || t && ct(n, t, e));
	}(c, l));
}
function dt(e, t) {
	let n = e.mergeWithSibling(t), r = Da()._normalizedNodes;
	return r.add(e.__key), r.add(t.__key), n;
}
function ft(e) {
	let t, n, r = e;
	if (r.__text !== "" || !r.isSimpleText() || r.isUnmergeable()) {
		for (; (t = r.getPreviousSibling()) !== null && A(t) && t.isSimpleText() && !t.isUnmergeable();) {
			if (t.__text !== "") {
				if (ut(t, r)) {
					r = dt(t, r);
					break;
				}
				break;
			}
			t.remove();
		}
		for (; (n = r.getNextSibling()) !== null && A(n) && n.isSimpleText() && !n.isUnmergeable();) {
			if (n.__text !== "") {
				if (ut(r, n)) {
					r = dt(r, n);
					break;
				}
				break;
			}
			n.remove();
		}
	} else r.remove();
}
function pt(e) {
	return mt(e.anchor), mt(e.focus), e;
}
function mt(e) {
	for (; e.type === "element";) {
		let t = e.getNode(), n = e.offset, r, i;
		if (n === t.getChildrenSize() ? (r = t.getChildAtIndex(n - 1), i = !0) : (r = t.getChildAtIndex(n), i = !1), A(r)) {
			e.set(r.__key, i ? r.getTextContentSize() : 0, "text", !0);
			break;
		}
		if (!P(r)) break;
		e.set(r.__key, i ? r.getChildrenSize() : 0, "element", !0);
	}
}
var ht = Symbol.for("@lexical/CachedTextSize");
function gt(e, t) {
	return jt.read(() => {
		let n = 0, r = e;
		for (let e = 0; e < t && r !== null; e++) {
			let i = At.get(r);
			if (i === void 0 && x(345, r), P(i)) {
				let a = Mt.get(r);
				if (a !== void 0 && P(a) && a.__parent !== i.__parent) n += i.getTextContentSize();
				else {
					let e = Nt.get(r), t = e && e.__lexicalTextContent;
					typeof t != "string" && x(346, i.getType()), n += t.length;
				}
				e < t - 1 && !i.isInline() && (n += 2);
			} else {
				let e = i[ht];
				e === void 0 && x(347, i.getType(), r), n += e;
			}
			r = i.__next;
		}
		return n;
	}, { editor: D });
}
function _t(e) {
	P(e) || e[ht] === void 0 && (e[ht] = A(e) ? e.__text.length : e.getTextContentSize());
}
var vt = 4, yt, D, bt, O = "", xt = null, St = null, Ct = null;
function wt() {
	return {
		firstTextKey: Ct,
		format: xt,
		style: St
	};
}
function Tt(e) {
	e.firstTextKey !== null && (xt = e.format, St = e.style, Ct = e.firstTextKey);
}
function Et(e) {
	if (Ct !== null) return;
	let t = e.__lexicalFirstTextKey;
	if (t === void 0 && x(348), t === null) return;
	let n = Mt.get(t);
	A(n) && (xt = n.getFormat(), St = n.getStyle(), Ct = t);
}
var Dt, Ot, kt, At, jt, Mt, Nt, Pt, Ft, It, Lt = !1, Rt = !1;
function zt(e, t) {
	let n = At.get(e), r = Mt.has(e);
	if (t !== null) {
		let n = un(e);
		n.parentNode === t && t.removeChild(n);
	}
	if (!r) {
		if (D._keyToDOMMap.delete(e), P(n)) {
			let e = Ec(n, At);
			Bt(e, 0, e.length - 1, null);
		}
		if (n !== void 0) {
			for (let e of Yt(n).values()) {
				let t = Zt(e);
				zt(e, null), t !== null && t.remove();
			}
			ms(Ft, bt, Dt, n, "destroyed");
		}
	}
}
function Bt(e, t, n, r) {
	for (let i = t; i <= n; ++i) {
		let t = e[i];
		t !== void 0 && zt(t, r);
	}
}
function Vt(e, t) {
	e.setProperty("text-align", t);
}
var Ht = "40px";
function Ut(e, t) {
	let n = yt.theme.indent;
	if (typeof n == "string") {
		let r = e.classList.contains(n);
		t > 0 && !r ? e.classList.add(n) : t < 1 && r && e.classList.remove(n);
	}
	e.style.setProperty("padding-inline-start", t === 0 ? "" : `calc(${t} * var(--lexical-indent-base-value, ${Ht}))`);
}
function Wt(e, t) {
	let n = e.style;
	t === 0 ? Vt(n, "") : t === 1 ? Vt(n, "left") : t === 2 ? Vt(n, "center") : t === 3 ? Vt(n, "right") : t === 4 ? Vt(n, "justify") : t === 5 ? Vt(n, "start") : t === 6 && Vt(n, "end");
}
function Gt(e, t) {
	let n = function(e) {
		let t = e.__dir;
		if (t !== null) return t;
		if (Ya(e)) return null;
		let n = e.getParent();
		return n === null || ks(n) && n.__dir === null ? "auto" : null;
	}(t);
	n === null ? e.removeAttribute("dir") : e.dir = n;
}
function Kt(e) {
	let t = B().createElement("div");
	return t.setAttribute("data-lexical-slot", e), t.style.display = "none", t;
}
function qt(e, t, n) {
	t || e.contentEditable === "false" ? yc(n, D) : n.removeAttribute("contenteditable");
}
function Jt(e, t, n) {
	let r = O, i = wt();
	O = "";
	let a = "", o = F(e);
	for (let [r, i] of n) {
		let n = Kt(r);
		qt(t, o, n), t.appendChild(n), O = "";
		let s = wt();
		$t(i, oc(e, n, D)), Tt(s), Xt(e, r, t, n), a += O;
	}
	return Tt(i), O = r, a;
}
function Yt(e) {
	return kc(e) && e.__slots !== null ? e.__slots : Oc;
}
function Xt(e, t, n, r) {
	let i = It.$getSlotTargetElement(e, t, n, D);
	i !== null && (r.parentElement !== i && i.appendChild(r), r.style.display = "");
}
function Zt(e) {
	let t = Nt.get(e);
	return t === void 0 ? null : t.parentElement;
}
function Qt(e, t, n) {
	let r = Yt(e), i = Yt(t);
	for (let [e, t] of r) if (!i.has(e)) {
		let e = Zt(t);
		zt(t, null), e !== null && e.remove();
	}
	let a = O, o = wt(), s = "", c = null, l = F(t);
	for (let [e, a] of i) {
		let i = r.get(e), o = i === void 0 ? null : Zt(i);
		O = "";
		let u = wt();
		if (o === null) {
			o = Kt(e);
			let r = null;
			for (let e of n.children) if (!e.hasAttribute("data-lexical-slot")) {
				r = e;
				break;
			}
			n.insertBefore(o, r), $t(a, oc(t, o, D));
		} else i === a ? an(a, o) : (i !== void 0 && zt(i, o), $t(a, oc(t, o, D)));
		if (Tt(u), qt(n, l, o), Xt(t, e, n, o), s += O, o.parentElement === n) {
			let e = c === null ? n.firstChild : c.nextSibling;
			e !== o && n.insertBefore(o, e), c = o;
		}
	}
	return Tt(o), O = a, s;
}
function $t(e, t) {
	let n = Mt.get(e);
	if (n === void 0 && x(60), t !== null) {
		let r = At.get(e);
		if (r !== void 0) {
			let i = Nt.get(e);
			if (i !== void 0) {
				let a = Ac(r) ? r.__slotHost : null, o = Ac(n) ? n.__slotHost : null, s = r.__parent !== n.__parent || a !== o, c = o !== null && i.parentElement !== t.element;
				if (s || c) return t.insertChild(i), an(e, t.element);
			}
		}
	}
	let r = It.$createDOM(n, D);
	if (function(e, t, n) {
		let r = n._keyToDOMMap;
		Wo(t, n, e), r.set(e, t);
	}(e, r, D), A(n) ? r.setAttribute("data-lexical-text", "true") : F(n) && (r.setAttribute("data-lexical-decorator", "true"), _c(r, { captureSelection: !0 })), P(n)) {
		let e = n.__indent, t = n.__size;
		Gt(r, n), e !== 0 && Ut(r, e);
		let i = Yt(n), a = i.size > 0 ? Jt(n, r, i) : "";
		if (t === 0) r.__lexicalTextContent = a, r.__lexicalFirstTextKey = null, O += a, i.size > 0 && (r.__lexicalSlotTextLength = a.length);
		else {
			let e = O, o = t - 1;
			if (en(Ec(n, Mt), n, 0, o, oc(n, r, D)), a !== "") {
				let t = r.__lexicalTextContent || "";
				r.__lexicalTextContent = a + t, O = e + a + t;
			}
			i.size > 0 && (r.__lexicalSlotTextLength = a.length);
		}
		let o = n.__format;
		o !== 0 && Wt(r, o), n.isInline() || tn(null, n, r);
	} else {
		let t = n.getTextContent();
		if (F(n)) {
			let t = n.decorate(D, yt);
			t !== null && on(e, t), r.contentEditable = "false";
			let i = Yt(n);
			i.size > 0 && Jt(n, r, i);
		}
		O += t;
	}
	return t !== null && t.insertChild(r), It.$decorateDOM(n, null, r, D), _t(n), ms(Ft, bt, Dt, n, "created"), r;
}
function en(e, t, n, r, i) {
	let a = O, o = wt();
	O = "", xt = null, St = null, Ct = null;
	let s = n;
	for (; s <= r; ++s) {
		let t = wt();
		$t(e[s], i);
		let n = Mt.get(e[s]);
		n !== null && A(n) ? xt === null && (xt = n.getFormat(), St = n.getStyle(), Ct = n.__key) : P(n) && s < r && !n.isInline() && (O += _e), Tt(t);
	}
	let c = D._keyToDOMMap.get(t.__key);
	c === void 0 && x(349, t.__key), c.__lexicalTextContent = O, c.__lexicalFirstTextKey = Ct, O = a + O, Tt(o);
}
function tn(e, t, n) {
	let r = oc(t, n, D), i = r.element.__lexicalLastChildKind ?? null, a = function(e, t) {
		if (e) {
			let n = e.__last;
			if (n) {
				let e = t.get(n);
				if (e) return ao(e) ? "line-break" : F(e) && e.isInline() ? "decorator" : null;
			}
			return Yt(e).size > 0 ? null : "empty";
		}
		return null;
	}(t, Mt);
	i !== a && r.setManagedLineBreak(a);
}
function nn(e, t, n) {
	var r;
	xt = null, St = null, Ct = null, function(e, t, n) {
		let r = O, i = e.__size, a = t.__size;
		O = "";
		let o = n.element, s = D._keyToDOMMap.get(t.__key);
		s === void 0 && x(351, t.__key);
		let c = a - i;
		if (!Lt && Math.abs(c) <= 1 && i >= vt && e.__first === t.__first && (c !== 0 || !D._cloneNotNeeded.has(e.__key))) {
			let i = s.__lexicalTextContent, l = Pt.get(e.__key);
			if (!Lt && typeof i == "string" && l !== void 0) {
				let a = function(e, t) {
					let n = t.size;
					if (n === 0 || n >= e.__size) return null;
					let r = e.__last, i = null, a = 0;
					for (; r !== null && a < n;) {
						if (!t.has(r)) return null;
						i = r;
						let e = Mt.get(r);
						if (e === void 0) return null;
						r = e.__prev, a++;
					}
					return a !== n || r !== null && t.has(r) ? null : i;
				}(t, l);
				if (a !== null) {
					let u = l.size;
					if (c === 0) {
						let e = gt(a, u), n = a, c = 0;
						for (; n !== null && c < u;) {
							let e = Mt.get(n);
							if (e === void 0) break;
							let t = wt();
							an(n, o), A(e) && xt === null && (xt = e.getFormat(), St = e.getStyle(), Ct = e.__key), Tt(t), n = e.__next, c++;
						}
						let d = "";
						for (n = a, c = 0; n !== null && c < u;) {
							let e = Mt.get(n);
							if (e === void 0) break;
							let t;
							if (P(e)) {
								let r = D._keyToDOMMap.get(n), i = r && r.__lexicalTextContent;
								typeof i != "string" && x(352, e.getType()), t = i;
							} else t = e.getTextContent();
							d += t, c < u - 1 && P(e) && !e.isInline() && (d += _e), n = e.__next, c++;
						}
						let f = s.__lexicalSlotTextLength || 0, p = f > 0 ? i.slice(f) : i, m = p.slice(0, p.length - e) + d;
						s.__lexicalTextContent = m, O = r + m, rn(t, s, l);
						return;
					}
					if (function(e, t, n, r, i, a, o, s) {
						if (s !== 1 && s !== -1 || o !== (s === 1 ? 2 : 1)) return !1;
						let c = o - s, l = e.__last;
						for (let e = 0; e < c - 1; e++) {
							if (l === null) return !1;
							let e = At.get(l);
							if (e === void 0) return !1;
							l = e.__prev;
						}
						if (l === null) return !1;
						let u = Mt.get(a), d = At.get(l);
						if (u === void 0 || d === void 0 || u.__prev !== d.__prev) return !1;
						let f = [], p = a;
						for (let e = 0; e < o; e++) {
							if (p === null) return !1;
							f.push(p);
							let e = Mt.get(p);
							p = e ? e.__next : null;
						}
						let m = [];
						p = l;
						for (let e = 0; e < c; e++) {
							if (p === null) return !1;
							m.push(p);
							let e = At.get(p);
							p = e ? e.__next : null;
						}
						let h = new Set(m), g = new Set(f), _ = [], v = 0, y = 0;
						for (; v < c && y < o;) if (f[y] === m[v]) _.push({
							key: f[y],
							kind: "reconcile"
						}), v++, y++;
						else if (g.has(m[v])) {
							if (h.has(f[y])) return !1;
							_.push({
								key: f[y],
								kind: "create",
								nextIndex: y
							}), y++;
						} else _.push({
							key: m[v],
							kind: "destroy"
						}), v++;
						for (; v < c;) _.push({
							key: m[v++],
							kind: "destroy"
						});
						for (; y < o;) _.push({
							key: f[y],
							kind: "create",
							nextIndex: y
						}), y++;
						let b = gt(l, c);
						for (let e of _) {
							let t = wt();
							if (e.kind === "reconcile") an(e.key, n.element);
							else if (e.kind === "destroy") zt(e.key, n.element);
							else {
								let t = null;
								for (let n = e.nextIndex + 1; n < o; n++) {
									let e = D._keyToDOMMap.get(f[n]);
									if (e !== void 0) {
										t = e;
										break;
									}
								}
								$t(e.key, n.withBefore(t ?? n.before));
							}
							if (e.kind !== "destroy") {
								let t = Mt.get(e.key);
								t && A(t) && xt === null && (xt = t.getFormat(), St = t.getStyle(), Ct = t.__key);
							}
							Tt(t);
						}
						let S = "";
						for (let e = 0; e < o; e++) {
							let t = Mt.get(f[e]);
							if (t === void 0) return !1;
							let n;
							if (P(t)) {
								let r = D._keyToDOMMap.get(f[e]), i = r && r.__lexicalTextContent;
								typeof i != "string" && x(350, t.getType()), n = i;
							} else n = t.getTextContent();
							S += n, e < o - 1 && P(t) && !t.isInline() && (S += _e);
						}
						let C = r.__lexicalSlotTextLength || 0, w = C > 0 ? i.slice(C) : i;
						return r.__lexicalTextContent = w.slice(0, w.length - b) + S, !0;
					}(e, 0, n, s, i, a, u, c)) {
						let e = s.__lexicalTextContent;
						typeof e != "string" && x(353), O = r + e, rn(t, s, l);
						return;
					}
				}
			}
			if (c === 0) {
				let t = e.__first, n = 0;
				for (; t !== null;) {
					let e = Mt.get(t);
					if (e === void 0) break;
					let r = Lt || kt.has(t) || Ot.has(t), i = wt();
					if (r) an(t, o);
					else {
						let n, r;
						if (P(e)) {
							r = Nt.get(t);
							let i = r && r.__lexicalTextContent;
							typeof i != "string" && x(354, e.getType()), n = i;
						} else n = e.getTextContent();
						O += n, r !== void 0 && Et(r);
					}
					A(e) ? xt === null && (xt = e.getFormat(), St = e.getStyle(), Ct = e.__key) : P(e) && n < a - 1 && !e.isInline() && (O += _e), Tt(i), t = e.__next, n++;
				}
				s.__lexicalTextContent = O, s.__lexicalFirstTextKey = Ct, O = r + O;
				return;
			}
		}
		if (i === 1 && a === 1) {
			let r = e.__first, i = t.__first;
			if (r === i) an(r, o);
			else {
				let e = un(r), t = $t(i, null);
				try {
					e.parentNode === o ? o.replaceChild(t, e) : n.insertChild(t);
				} catch (n) {
					if (typeof n == "object" && n) {
						let a = `${n.toString()} Parent: ${o.tagName}, new child: {tag: ${t.tagName} key: ${i}}, old child: {tag: ${e.tagName}, key: ${r}}.`;
						throw Error(a);
					}
					throw n;
				}
				zt(r, null);
			}
			let a = Mt.get(i);
			A(a) && xt === null && (xt = a.getFormat(), St = a.getStyle(), Ct = a.__key);
		} else {
			let r = Ec(e, At), s = Ec(t, Mt);
			if (r.length !== i && x(227), s.length !== a && x(228), i === 0) a !== 0 && en(s, t, 0, a - 1, n);
			else if (a === 0) {
				if (i !== 0) {
					let e = n.after == null && n.before == null && Yt(t).size === 0 && n.element.__lexicalLineBreak == null;
					Bt(r, 0, i - 1, e ? null : o), e && (o.textContent = "");
				}
			} else (function(e, t, n, r, i, a) {
				let o = r - 1, s = i - 1, c, l, u = a.getFirstChild(), d = 0, f = 0;
				for (; d <= o && f <= s;) {
					let e = t[d], r = n[f], i = wt();
					if (e === r) u = sn(an(r, a.element)), d++, f++;
					else {
						if (l === void 0 && (l = cn(n, f)), c === void 0) c = cn(t, d);
						else if (!c.has(e)) {
							d++, Tt(i);
							continue;
						}
						if (!l.has(e)) {
							u = sn(un(e)), zt(e, a.element), d++, c.delete(e), Tt(i);
							continue;
						}
						if (c.has(r)) {
							let e = vs(D, r);
							e !== u && a.withBefore(u ?? a.before).insertChild(e), u = sn(an(r, a.element)), d++, f++;
						} else $t(r, a.withBefore(u ?? a.before)), f++;
					}
					let o = Mt.get(r);
					o !== null && A(o) ? xt === null && (xt = o.getFormat(), St = o.getStyle(), Ct = o.__key) : P(o) && f <= s && !o.isInline() && (O += _e), Tt(i);
				}
				let p = d > o, m = f > s;
				if (p && !m) {
					let t = n[s + 1], r = t === void 0 ? null : D.getElementByKey(t);
					en(n, e, f, s, a.withBefore(r ?? a.before));
				} else m && !p && Bt(t, d, o, a.element);
			})(t, r, s, i, a, n);
		}
		s.__lexicalTextContent = O, s.__lexicalFirstTextKey = Ct, O = r + O;
	}(e, t, oc(t, n, D)), ks(t) || (r = t, xt == null || xt === r.__textFormat || Rt || r.setTextFormat(xt), function(e) {
		St == null || St === e.__textStyle || Rt || e.setTextStyle(St);
	}(t));
}
function rn(e, t, n) {
	let r = t.__lexicalFirstTextKey;
	if (r != null) {
		let t = e.__key, i = r;
		for (; i !== null;) {
			let e = Mt.get(i);
			if (e === void 0) {
				i = null;
				break;
			}
			if (e.__parent === t) break;
			i = e.__parent;
		}
		if (i !== null && !n.has(i)) {
			let e = Mt.get(r);
			if (A(e)) return xt = e.getFormat(), void (St = e.getStyle());
		}
	}
	t.__lexicalFirstTextKey = Ct;
}
function an(e, t) {
	let n = At.get(e), r = Mt.get(e);
	n !== void 0 && r !== void 0 || x(61);
	let i = Lt || kt.has(e) || Ot.has(e), a = vs(D, e);
	if (n === r && !i) {
		let e;
		if (P(n)) {
			let t = a.__lexicalTextContent;
			typeof t != "string" && x(355, n.getType()), e = t, Et(a);
		} else e = n.getTextContent();
		return O += e, a;
	}
	if (n !== r && i && ms(Ft, bt, Dt, r, "updated"), It.$updateDOM(r, n, a, D)) {
		let n = $t(e, null);
		return t === null && x(62), t.replaceChild(n, a), zt(e, null), n;
	}
	if (P(n)) {
		P(r) || x(334, e);
		let t = r.__indent;
		(Lt || t !== n.__indent) && Ut(a, t);
		let o = r.__format;
		(Lt || o !== n.__format) && Wt(a, o);
		let s = i && (Yt(r).size > 0 || Yt(n).size > 0) ? Qt(n, r, a) : "";
		if (i) {
			let e = O;
			if (nn(n, r, a), Ya(r) || r.isInline() || tn(0, r, a), s !== "") {
				let t = a.__lexicalTextContent || "";
				a.__lexicalTextContent = s + t, O = e + s + t, a.__lexicalSlotTextLength = s.length;
			} else (Yt(r).size > 0 || Yt(n).size > 0) && (a.__lexicalSlotTextLength = 0);
		} else {
			let e = a.__lexicalTextContent;
			typeof e != "string" && x(356, n.getType()), O += e, Et(a);
		}
		if ((Lt || r.__dir !== n.__dir || r.__parent !== n.__parent) && (Gt(a, r), Ya(r) && !Lt)) for (let e of r.getChildren()) P(e) && Gt(vs(D, e.getKey()), e);
	} else {
		let t = r.getTextContent();
		if (F(r)) {
			let t = r.decorate(D, yt);
			t !== null && on(e, t), i && (Yt(r).size > 0 || Yt(n).size > 0) && Qt(n, r, a);
		}
		O += t;
	}
	if (!Rt && Ya(r)) {
		let e = r.getLatest();
		if (e.__cachedText !== O) {
			let t = e.getWritable();
			t.__cachedText = O, r = t;
		}
	}
	return It.$decorateDOM(r, n, a, D), _t(r), a;
}
function on(e, t) {
	let n = D._pendingDecorators, r = D._decorators;
	if (n === null) {
		if (r[e] === t) return;
		n = qo(D);
	}
	n[e] = t;
}
function sn(e) {
	let t = e.nextSibling;
	return t !== null && t === D._blockCursorElement && (t = t.nextSibling), t;
}
function cn(e, t) {
	let n = /* @__PURE__ */ new Set();
	for (let r = t; r < e.length; r++) n.add(e[r]);
	return n;
}
function ln(e, t, n, r, i, a) {
	O = "", xt = null, St = null, Ct = null, Lt = r === 2, D = n, yt = n._config, It = n._config.dom || go, bt = n._nodes, Dt = D._listeners.mutation, Ot = i, kt = a, At = e._nodeMap, jt = e, Mt = t._nodeMap, Rt = t._readOnly, Nt = Ie(n._keyToDOMMap), Pt = function() {
		let e = /* @__PURE__ */ new Map(), t = (t) => {
			for (let n of t) {
				let t = Mt.get(n);
				if (t === void 0) continue;
				let r = t.__parent;
				if (r === null) continue;
				let i = e.get(r);
				i === void 0 && (i = /* @__PURE__ */ new Set(), e.set(r, i)), i.add(n);
			}
		};
		return t(Ot.keys()), t(kt), e;
	}();
	let o = /* @__PURE__ */ new Map();
	return Ft = o, an("root", null), D = void 0, bt = void 0, Ot = void 0, kt = void 0, At = void 0, jt = void 0, Mt = void 0, yt = void 0, Nt = void 0, Pt = void 0, Ft = void 0, It = go, o;
}
function un(e) {
	let t = Nt.get(e);
	return t === void 0 && x(75, e), t;
}
function k(e) {
	return { type: e };
}
var dn = /* @__PURE__ */ k("SELECTION_CHANGE_COMMAND"), fn = /* @__PURE__ */ k("SELECTION_INSERT_CLIPBOARD_NODES_COMMAND"), pn = /* @__PURE__ */ k("CLICK_COMMAND"), mn = /* @__PURE__ */ k("BEFORE_INPUT_COMMAND"), hn = /* @__PURE__ */ k("INPUT_COMMAND"), gn = /* @__PURE__ */ k("COMPOSITION_START_COMMAND"), _n = /* @__PURE__ */ k("COMPOSITION_END_COMMAND"), vn = /* @__PURE__ */ k("DELETE_CHARACTER_COMMAND"), yn = /* @__PURE__ */ k("INSERT_LINE_BREAK_COMMAND"), bn = /* @__PURE__ */ k("INSERT_PARAGRAPH_COMMAND"), xn = /* @__PURE__ */ k("CONTROLLED_TEXT_INSERTION_COMMAND"), Sn = /* @__PURE__ */ k("PASTE_COMMAND"), Cn = /* @__PURE__ */ k("REMOVE_TEXT_COMMAND"), wn = /* @__PURE__ */ k("DELETE_WORD_COMMAND"), Tn = /* @__PURE__ */ k("DELETE_LINE_COMMAND"), En = /* @__PURE__ */ k("FORMAT_TEXT_COMMAND"), Dn = /* @__PURE__ */ k("SET_TEXT_FORMAT_COMMAND"), On = /* @__PURE__ */ k("UNDO_COMMAND"), kn = /* @__PURE__ */ k("REDO_COMMAND"), An = /* @__PURE__ */ k("KEYDOWN_COMMAND"), jn = /* @__PURE__ */ k("KEY_ARROW_RIGHT_COMMAND"), Mn = /* @__PURE__ */ k("MOVE_TO_END"), Nn = /* @__PURE__ */ k("KEY_ARROW_LEFT_COMMAND"), Pn = /* @__PURE__ */ k("MOVE_TO_START"), Fn = /* @__PURE__ */ k("KEY_ARROW_UP_COMMAND"), In = /* @__PURE__ */ k("KEY_ARROW_DOWN_COMMAND"), Ln = /* @__PURE__ */ k("KEY_ENTER_COMMAND"), Rn = /* @__PURE__ */ k("KEY_SPACE_COMMAND"), zn = /* @__PURE__ */ k("KEY_BACKSPACE_COMMAND"), Bn = /* @__PURE__ */ k("KEY_ESCAPE_COMMAND"), Vn = /* @__PURE__ */ k("KEY_DELETE_COMMAND"), Hn = /* @__PURE__ */ k("KEY_TAB_COMMAND"), Un = /* @__PURE__ */ k("INSERT_TAB_COMMAND"), Wn = /* @__PURE__ */ k("INDENT_CONTENT_COMMAND"), Gn = /* @__PURE__ */ k("OUTDENT_CONTENT_COMMAND"), Kn = /* @__PURE__ */ k("DROP_COMMAND"), qn = /* @__PURE__ */ k("FORMAT_ELEMENT_COMMAND"), Jn = /* @__PURE__ */ k("DRAGSTART_COMMAND"), Yn = /* @__PURE__ */ k("DRAGOVER_COMMAND"), Xn = /* @__PURE__ */ k("DRAGEND_COMMAND"), Zn = /* @__PURE__ */ k("COPY_COMMAND"), Qn = /* @__PURE__ */ k("CUT_COMMAND"), $n = /* @__PURE__ */ k("SELECT_ALL_COMMAND"), er = /* @__PURE__ */ k("CLEAR_EDITOR_COMMAND"), tr = /* @__PURE__ */ k("CLEAR_HISTORY_COMMAND"), nr = /* @__PURE__ */ k("CAN_REDO_COMMAND"), rr = /* @__PURE__ */ k("CAN_UNDO_COMMAND"), ir = /* @__PURE__ */ k("FOCUS_COMMAND"), ar = /* @__PURE__ */ k("BLUR_COMMAND"), or = /* @__PURE__ */ k("KEY_MODIFIER_COMMAND");
function sr(e) {
	let t = /* @__PURE__ */ new Map();
	return {
		dispose() {
			for (let e of t.values()) e.dispose();
			t.clear();
		},
		register(n, r) {
			let i = t.get(n);
			i === void 0 && (i = {
				dispose: e(n, r),
				holders: /* @__PURE__ */ new Set()
			}, t.set(n, i));
			let a = () => {
				let e = t.get(n);
				e && e.holders.delete(a) && e.holders.size === 0 && (t.delete(n), e.dispose());
			};
			return i.holders.add(a), a;
		}
	};
}
function cr(e, t, n, r) {
	return e.addEventListener(t, n, r), e.removeEventListener.bind(e, t, n, r);
}
var lr = Object.freeze({}), ur = [
	["keydown", function(e, t) {
		let n = t._inputState;
		n.lastKeyDownTimeStamp = e.timeStamp, n.lastKeyCode = e.key, e.key !== "Backspace" && xr(n), !t.isComposing() && z(t, An, e);
	}],
	["pointerdown", function(e, t) {
		let n = Zs(e), r = e.pointerType;
		$s(n) && r !== "touch" && r !== "pen" && e.button === 0 && Ua(t, () => {
			bc(n, t) || (t._inputState.isSelectionChangeFromMouseDown = !0);
		});
	}],
	["compositionstart", function(e, t) {
		z(t, gn, e);
	}],
	["compositionend", function(e, t) {
		let n = t._inputState;
		te ? n.compositionPhase = "ending-firefox" : re || !ae && !ce ? z(t, _n, e) : (n.compositionPhase = "ending-safari", n.compositionEndData = e.data);
	}],
	["input", function(e, t) {
		e.stopPropagation();
		let n = t._inputState;
		xr(n), Ua(t, () => {
			Cr(e, t) || t.dispatchCommand(hn, e);
		}, { event: e }), n.unprocessedBeforeInputData = null;
	}],
	["click", function(e, t) {
		Ua(t, () => {
			let n = N(), r = Is(Ts(t)), i = Zi();
			if (r) {
				if (j(n)) {
					let e = n.anchor, t = e.getNode();
					e.type === "element" && e.offset === 0 && n.isCollapsed() && !Ya(t) && Yo().getChildrenSize() === 1 && t.getTopLevelElementOrThrow().isEmpty() && i !== null && n.is(i) && (r.removeAllRanges(), n.dirty = !0);
				} else if (e.pointerType === "touch" || e.pointerType === "pen") {
					let n = Gs(r, t._rootElement).anchorNode;
					(V(n) || No(n)) && Xo(Xi(i, r, t, e));
				}
			}
			z(t, pn, e);
		});
	}],
	["cut", lr],
	["copy", lr],
	["dragstart", lr],
	["dragover", lr],
	["dragend", lr],
	["paste", lr],
	["focus", lr],
	["blur", lr],
	["drop", lr]
];
ne && ur.push(["beforeinput", (e, t) => function(e, t) {
	let n = e.inputType;
	n === "deleteCompositionText" || te && _s(t) || n !== "insertCompositionText" && Ua(t, () => {
		Cr(e, t) || z(t, mn, e);
	}, { event: e });
}(e, t)]);
var dr = /* @__PURE__ */ new WeakMap(), fr = /* @__PURE__ */ new WeakMap(), pr = sr((e) => (e.addEventListener("selectionchange", Nr), () => e.removeEventListener("selectionchange", Nr)));
function mr(e, t, n, r, i, a) {
	let o = e.anchor, s = e.focus, c = o.getNode(), l = Da(), u;
	if (a !== void 0) u = a;
	else {
		let e = Is(Ts(l));
		u = e === null ? null : Gs(e, l._rootElement);
	}
	let d = u === null ? null : u.anchorNode, f = o.key, p = l.getElementByKey(f), m = n.length;
	return f !== s.key || !A(c) || (!i && (!ne || l._inputState.lastBeforeInputInsertTextTimeStamp < r + 50) || c.isDirty() && m < 2 || $o(n)) && o.offset !== s.offset && !c.isComposing() || Mo(c) || c.isDirty() && m > 1 || (i || !ne) && p !== null && !c.isComposing() && d !== cc(c, p, l) || u !== null && t !== null && (!t.collapsed || t.startContainer !== u.anchorNode || t.startOffset !== u.anchorOffset) || !c.isComposing() && (c.getFormat() !== e.format || c.getStyle() !== e.style) || function(e, t) {
		if (t.isSegmented()) return !0;
		if (!e.isCollapsed()) return !1;
		let n = e.anchor.offset, r = t.getParentOrThrow(), i = jo(t);
		return n === 0 ? !t.canInsertTextBefore() || !r.canInsertTextBefore() && !t.isComposing() || i || function(e) {
			let t = e.getPreviousSibling();
			return (A(t) || P(t) && t.isInline()) && !t.canInsertTextAfter();
		}(t) : n === t.getTextContentSize() && (!t.canInsertTextAfter() || !r.canInsertTextAfter() && !t.isComposing() || i);
	}(e, c);
}
function hr(e, t) {
	return No(e) && e.nodeValue !== null && t !== 0 && t !== e.nodeValue.length;
}
function gr(e, t, n) {
	let { anchorNode: r, anchorOffset: i, focusNode: a, focusOffset: o } = Gs(e, t._rootElement), s = t._inputState;
	s.isSelectionChangeFromDOMUpdate && (s.isSelectionChangeFromDOMUpdate = !1, hr(r, i) && hr(a, o) && !s.postDeleteSelectionToRestore) || Ua(t, () => {
		if (!n) return void Xo(null);
		if (!Do(t, r, a)) return;
		let c = N();
		if (s.postDeleteSelectionToRestore && j(c) && c.isCollapsed()) {
			let e = c.anchor, t = s.postDeleteSelectionToRestore.anchor;
			(e.key === t.key && e.offset === t.offset + 1 || e.offset === 1 && t.getNode().is(e.getNode().getPreviousSibling())) && (c = s.postDeleteSelectionToRestore.clone(), Xo(c));
		}
		if (s.postDeleteSelectionToRestore = null, j(c)) {
			let n = c.anchor, l = n.getNode();
			if (c.isCollapsed()) {
				e.type === "Range" && r === a && (c.dirty = !0);
				let i = Ts(t).event, o = i ? i.timeStamp : performance.now(), { format: u, style: d, offset: f, key: p, timeStamp: m } = s.collapsedSelectionFormat, h = Yo(), g = !1 === t.isComposing() && h.getTextContent() === "";
				if (o < m + 200 && n.offset === f && n.key === p) _r(c, u, d);
				else if (n.type === "text") A(l) || x(141), vr(c, l);
				else if (n.type === "element" && !g) {
					P(l) || x(259);
					let e = n.getNode();
					e.isEmpty() ? function(e, t) {
						_r(e, t.getTextFormat(), t.getTextStyle());
					}(c, e) : _r(c, c.format, "");
				}
			} else {
				let e = n.key, t = c.focus.key, r = c.getNodes(), a = r.length, s = c.isBackward(), l = s ? o : i, u = s ? i : o, d = s ? t : e, f = s ? e : t, p = 2047, m = !1;
				for (let e = 0; e < a; e++) {
					let t = r[e], n = t.getTextContentSize();
					if (A(t) && n !== 0 && !(e === 0 && t.__key === d && l === n || e === a - 1 && t.__key === f && u === 0) && (m = !0, p &= t.getFormat(), p === 0)) break;
				}
				c.format = m ? p : 0;
			}
		}
		z(t, dn, void 0);
	});
}
function _r(e, t, n) {
	e.format === t && e.style === n || (e.format = t, e.style = n, e.dirty = !0);
}
function vr(e, t) {
	_r(e, t.getFormat(), t.getStyle());
}
function yr(e) {
	if (!e.getTargetRanges) return null;
	let t = e.getTargetRanges();
	return t.length === 0 ? null : t[0];
}
function br(e) {
	let { lastKeyCode: t } = Da()._inputState;
	if (e == null || e.length <= 1 || t == null) return;
	let n = t.length === 1 ? t : t === "Enter" ? "\n" : t === "Tab" ? "	" : null;
	if (!n) return;
	let r = N();
	if (!j(r) || !r.isCollapsed()) return;
	let i = r.anchor.getNode();
	if (!A(i)) return;
	let { offset: a } = r.anchor;
	if (i.getTextContentSize() === a) {
		let e = i.getNextSibling();
		if (n === "\n") {
			if (ao(e)) e.selectEnd();
			else if (!e) {
				let e = W(i, Gi), t = e && e.getNextSibling();
				P(t) && t.selectStart();
			}
		} else n === "	" ? vi(e) && e.selectEnd() : A(e) && e.getTextContent()[0] === n && e.select(1, 1);
	} else i.getTextContent()[a] === n && i.select(a + 1, a + 1);
}
function xr(e) {
	e.isInsertTextAfterHandledSelectionCommand = !1, e.handledSelectionCommandTimeoutId !== null && (clearTimeout(e.handledSelectionCommandTimeoutId), e.handledSelectionCommandTimeoutId = null);
}
function Sr(e) {
	xr(e), e.isInsertTextAfterHandledSelectionCommand = !0, e.handledSelectionCommandTimeoutId = setTimeout(() => xr(e), 0);
}
function Cr(e, t) {
	let n = Zs(e);
	if (V(n) && bc(n, t)) return !0;
	let r = t.getRootElement();
	if (r === null) return !1;
	let i = Xs(r.ownerDocument);
	return i !== null && r.contains(i) && bc(i, t);
}
function wr(e) {
	let t = e.inputType, n = yr(e), r = Da(), i = r._inputState, a = N();
	if (t === "insertText" && e.data && i.isInsertTextAfterHandledSelectionCommand) {
		if (xr(i), e.preventDefault(), j(a) && !a.isCollapsed()) {
			let e = a.isBackward() ? a.anchor : a.focus;
			a.anchor.set(e.key, e.offset, e.type), a.focus.set(e.key, e.offset, e.type);
		}
		return !0;
	}
	if (t === "deleteContentBackward") {
		if (a === null) {
			let e = Zi();
			if (!j(e)) return !0;
			Xo(e.clone());
		}
		if (j(a)) {
			let t = a.anchor.key === a.focus.key;
			if (function(e, t) {
				return e.lastKeyCode === "MediaLast" && t < e.lastKeyDownTimeStamp + 30;
			}(i, e.timeStamp) && r.isComposing() && t) {
				if (Vo(null), i.lastKeyDownTimeStamp = 0, setTimeout(() => {
					Ua(r, () => {
						Vo(null);
					});
				}, 30), j(a)) {
					let e = a.anchor.getNode();
					e.markDirty(), A(e) || x(142), vr(a, e);
				}
			} else {
				if (Vo(null), re && n !== null && !n.collapsed && (a.applyDOMRange(n), !a.isCollapsed())) return e.preventDefault(), a.removeText(), !0;
				e.preventDefault();
				let o = a.anchor.getNode(), s = o.getTextContent(), c = o.canInsertTextAfter(), l = a.anchor.offset === 0 && a.focus.offset === s.length, u = se && t && !l && c;
				if (u && a.isCollapsed() && (u = !F(gs(a.anchor, !0))), !u) {
					z(r, vn, !0);
					let e = N();
					se && j(e) && e.isCollapsed() && (i.postDeleteSelectionToRestore = e, setTimeout(() => i.postDeleteSelectionToRestore = null));
				}
			}
			return !0;
		}
	}
	if (!j(a)) return !0;
	let o = e.data;
	i.unprocessedBeforeInputData !== null && rs(!1, r, i.unprocessedBeforeInputData), a.dirty && i.unprocessedBeforeInputData === null || !a.isCollapsed() || Ya(a.anchor.getNode()) || n === null || a.applyDOMRange(n), i.unprocessedBeforeInputData = null;
	let s = a.anchor, c = a.focus, l = s.getNode(), u = c.getNode();
	if (t === "insertText" || t === "insertTranspose") {
		if (o === "\n") e.preventDefault(), z(r, yn, !1);
		else if (o === _e) e.preventDefault(), z(r, bn, void 0);
		else if (o == null && e.dataTransfer) {
			let t = e.dataTransfer.getData("text/plain");
			e.preventDefault(), a.insertRawText(t);
		} else o != null && mr(a, n, o, e.timeStamp, !0) ? (e.preventDefault(), z(r, xn, o), br(o)) : i.unprocessedBeforeInputData = o;
		return i.lastBeforeInputInsertTextTimeStamp = e.timeStamp, !0;
	}
	switch (e.preventDefault(), t) {
		case "insertFromYank":
		case "insertFromDrop":
		case "insertReplacementText":
			z(r, xn, e), br((e.dataTransfer ? e.dataTransfer.getData("text/plain") : null) ?? e.data);
			break;
		case "insertFromComposition": {
			let t = i.hadOrphanedCompositionEvents;
			i.hadOrphanedCompositionEvents = !1;
			let n = r._compositionKey;
			Vo(null), t || z(r, xn, e), Or(n);
			break;
		}
		case "insertLineBreak":
			Vo(null), z(r, yn, !1);
			break;
		case "insertParagraph":
			Vo(null), i.isInsertLineBreak && !re ? (i.isInsertLineBreak = !1, z(r, yn, !1)) : z(r, bn, void 0);
			break;
		case "insertFromPaste":
		case "insertFromPasteAsQuotation":
			z(r, Sn, e);
			break;
		case "deleteByComposition":
			(function(e, t) {
				return e !== t || P(e) || P(t) || !jo(e) || !jo(t);
			})(l, u) && z(r, Cn, e);
			break;
		case "deleteByDrag":
			xs(Kr), z(r, Cn, e);
			break;
		case "deleteByCut":
			z(r, Cn, e);
			break;
		case "deleteContent":
			z(r, vn, !1);
			break;
		case "deleteWordBackward":
			z(r, wn, !0);
			break;
		case "deleteWordForward":
			z(r, wn, !1);
			break;
		case "deleteHardLineBackward":
		case "deleteSoftLineBackward":
			z(r, Tn, !0);
			break;
		case "deleteContentForward":
		case "deleteHardLineForward":
		case "deleteSoftLineForward":
			z(r, Tn, !1);
			break;
		case "formatStrikeThrough":
			z(r, En, "strikethrough");
			break;
		case "formatBold":
			z(r, En, "bold");
			break;
		case "formatItalic":
			z(r, En, "italic");
			break;
		case "formatUnderline":
			z(r, En, "underline");
			break;
		case "historyUndo":
			z(r, On, void 0);
			break;
		case "historyRedo": z(r, kn, void 0);
	}
	return !0;
}
function Tr(e) {
	let t = Da(), n = t._inputState, r = N(), i = e.data, a = yr(e), o = !1;
	if (i != null && j(r)) {
		let s = Is(Ts(t)), c = s === null ? null : Gs(s, t._rootElement), l = e.inputType === "insertCompositionText" && n.compositionPhase !== "ending-firefox" && !t.isComposing();
		l && (n.hadOrphanedCompositionEvents = !0);
		let u = r.anchor.getNode(), d = e.inputType === "insertCompositionText" && n.compositionPhase !== "ending-firefox" && t.isComposing() && A(u) && Mo(u);
		if (!l && !d && mr(r, a, i, e.timeStamp, !1, c)) {
			if (o = !0, n.compositionPhase === "ending-firefox") {
				let e = kr(t, i);
				if (n.compositionPhase = "idle", e) return xs(qr), Zo(), !0;
			}
			let a = r.anchor.getNode();
			if (s === null || c === null) return !0;
			let l = r.isBackward(), u = l ? r.anchor.offset : r.focus.offset, d = l ? r.focus.offset : r.anchor.offset;
			ne && !r.isCollapsed() && A(a) && c.anchorNode !== null && a.getTextContent().slice(0, u) + i + a.getTextContent().slice(u + d) === ns(c.anchorNode) || z(t, xn, i);
			let f = i.length;
			te && f > 1 && e.inputType === "insertCompositionText" && !t.isComposing() && (r.anchor.offset -= f, r._cachedNodes = null, r._cachedIsBackward = null), se && t.isComposing() && (n.lastKeyDownTimeStamp = 0, Vo(null));
		}
	}
	return o || (rs(!1, t, i === null ? void 0 : i), n.compositionPhase === "ending-firefox" && (kr(t, i || void 0), xs("composition-end"), n.compositionPhase = "idle")), Zo(), !0;
}
function Er(e) {
	let t = Da(), n = t._inputState, r = N();
	if (j(r) && !t.isComposing()) {
		n.compositionPhase = "composing", n.hadOrphanedCompositionEvents = !1;
		let i = r.anchor, a = r.anchor.getNode();
		if (Vo(i.key), xs("composition-start"), e.timeStamp < n.lastKeyDownTimeStamp + 30 || i.type === "element" || !r.isCollapsed() || !se && (a.getFormat() !== r.format || A(a) && a.getStyle() !== r.style) || A(a) && (Mo(a) || i.offset === 0 && !a.canInsertTextBefore() || i.offset === a.getTextContentSize() && !a.canInsertTextAfter())) {
			z(t, xn, ve);
			let e = N();
			j(e) && Vo(e.anchor.key);
		}
	}
	return !0;
}
function Dr(e) {
	let t = Da();
	return t._inputState.compositionPhase = "idle", kr(t, e.data), xs(qr), !0;
}
function Or(e) {
	if (e === null) return;
	let t = R(e);
	if (!A(t) || t.getType() === "text" || Mo(t) || !t.isAttached()) return;
	let n = N(), r = j(n) && n.anchor.key === e ? n.anchor.offset : null, i = mi(t.getTextContent());
	if (i.setFormat(t.getFormat()), i.setStyle(t.getStyle()), t.replace(i), r !== null) {
		let e = Math.min(r, i.getTextContentSize());
		i.select(e, e);
	}
}
function kr(e, t) {
	let n = e._compositionKey;
	if (Vo(null), n !== null && t != null) {
		if (t === "") {
			let t = R(n), r = e.getElementByKey(n), i = r !== null && A(t) ? cc(t, r, e) : null;
			if (i !== null && i.nodeValue !== null && A(t)) {
				let n = Is(Ts(e)), r = n && Gs(n, e._rootElement), a = null, o = null;
				r !== null && r.anchorNode === i && (a = r.anchorOffset, o = r.focusOffset), is(t, i.nodeValue, a, o, !0);
			}
			return Or(n), !1;
		}
		if (t[t.length - 1] === "\n") {
			let t = N();
			if (j(t) || Ei(t)) {
				if (j(t)) {
					let e = t.focus;
					t.anchor.set(e.key, e.offset, e.type);
				}
				return z(e, Ln, null), Or(n), !1;
			}
		}
		let r = R(n);
		if (r !== null && A(r) && Mo(r)) {
			r.markDirty();
			let e = N(), i = r.getTextContentSize(), a = j(e) && e.anchor.key === n ? e.anchor.offset : i;
			return r.select(a, a).insertText(t), !0;
		}
	}
	return rs(!0, e, t), Or(n), !1;
}
function Ar(e) {
	let t = Da(), n = t._inputState;
	if (e.key == null) return !0;
	if (n.compositionPhase === "ending-safari") {
		let r = ds(e);
		if (r && Ua(t, () => {
			kr(t, n.compositionEndData);
		}), n.compositionPhase = "idle", n.compositionEndData = "", r) return !0;
	}
	if (function(e) {
		return cs(e, "ArrowRight", { shiftKey: "any" });
	}(e)) z(t, jn, e);
	else if (function(e) {
		return cs(e, "ArrowRight", {
			...ls,
			shiftKey: "any"
		});
	}(e)) z(t, Mn, e);
	else if (function(e) {
		return cs(e, "ArrowLeft", { shiftKey: "any" });
	}(e)) z(t, Nn, e);
	else if (function(e) {
		return cs(e, "ArrowLeft", {
			...ls,
			shiftKey: "any"
		});
	}(e)) z(t, Pn, e);
	else if (function(e) {
		return cs(e, "ArrowUp", {
			altKey: "any",
			shiftKey: "any"
		});
	}(e)) z(t, Fn, e);
	else if (function(e) {
		return cs(e, "ArrowDown", {
			altKey: "any",
			shiftKey: "any"
		});
	}(e)) z(t, In, e);
	else if (function(e) {
		return cs(e, "Enter", {
			altKey: "any",
			ctrlKey: "any",
			metaKey: "any",
			shiftKey: !0
		});
	}(e)) n.isInsertLineBreak = !0, z(t, Ln, e);
	else if (function(e) {
		return e.key === " ";
	}(e)) z(t, Rn, e);
	else if (function(e) {
		return ee && cs(e, "o", { ctrlKey: !0 });
	}(e)) e.preventDefault(), n.isInsertLineBreak = !0, z(t, yn, !0);
	else if (function(e) {
		return cs(e, "Enter", {
			altKey: "any",
			ctrlKey: "any",
			metaKey: "any"
		});
	}(e)) n.isInsertLineBreak = !1, z(t, Ln, e);
	else if (function(e) {
		return cs(e, "Backspace", { shiftKey: "any" }) || ee && cs(e, "h", { ctrlKey: !0 });
	}(e)) ds(e) ? z(t, zn, e) && Sr(n) : (e.preventDefault(), z(t, vn, !0));
	else if (function(e) {
		return e.key === "Escape";
	}(e)) z(t, Bn, e);
	else if (function(e) {
		return cs(e, "Delete", {}) || ee && cs(e, "d", { ctrlKey: !0 });
	}(e)) (function(e) {
		return e.key === "Delete";
	})(e) ? z(t, Vn, e) : (e.preventDefault(), z(t, vn, !1));
	else if (function(e) {
		return cs(e, "Backspace", us);
	}(e)) e.preventDefault(), z(t, wn, !0);
	else if (function(e) {
		return cs(e, "Delete", us);
	}(e)) e.preventDefault(), z(t, wn, !1);
	else if (function(e) {
		return ee && cs(e, "Backspace", { metaKey: !0 });
	}(e)) e.preventDefault(), z(t, Tn, !0);
	else if (function(e) {
		return ee && (cs(e, "Delete", { metaKey: !0 }) || cs(e, "k", { ctrlKey: !0 }));
	}(e)) e.preventDefault(), z(t, Tn, !1);
	else if (function(e) {
		return cs(e, "b", ls);
	}(e)) e.preventDefault(), z(t, En, "bold");
	else if (function(e) {
		return cs(e, "u", ls);
	}(e)) e.preventDefault(), z(t, En, "underline");
	else if (function(e) {
		return cs(e, "i", ls);
	}(e)) e.preventDefault(), z(t, En, "italic");
	else if (function(e) {
		return cs(e, "Tab", { shiftKey: "any" });
	}(e)) z(t, Hn, e);
	else if (function(e) {
		return cs(e, "z", ls);
	}(e)) e.preventDefault(), z(t, On, void 0);
	else if (function(e) {
		return ee ? cs(e, "z", {
			metaKey: !0,
			shiftKey: !0
		}) : cs(e, "y", { ctrlKey: !0 }) || cs(e, "z", {
			ctrlKey: !0,
			shiftKey: !0
		});
	}(e)) e.preventDefault(), z(t, kn, void 0);
	else {
		let r = t._editorState._selection;
		(function(e) {
			return cs(e, "a", ls);
		})(e) ? (e.preventDefault(), z(t, $n, e) && Sr(n)) : r === null || j(r) || (function(e) {
			return cs(e, "c", ls);
		}(e) ? (e.preventDefault(), z(t, Zn, e)) : function(e) {
			return cs(e, "x", ls);
		}(e) && (e.preventDefault(), z(t, Qn, e)));
	}
	return function(e) {
		return e.ctrlKey || e.shiftKey || e.altKey || e.metaKey;
	}(e) && t.dispatchCommand(or, e), !0;
}
function jr(e) {
	let t = e.__lexicalEventHandles;
	return t === void 0 && (t = [], e.__lexicalEventHandles = t), t;
}
var Mr = /* @__PURE__ */ new Map();
function Nr(e) {
	let t = Ls(e.target);
	if (t === null) return;
	let n = bs(e.target), r = null, i = null, a = n === null ? void 0 : fr.get(n);
	if (n !== null) {
		if (a !== void 0) {
			let e = a.editors, n = a.hasShadowEditor;
			if (n === void 0) {
				n = !1;
				for (let t of e) if (t._rootElement !== null && Rs(t._rootElement.getRootNode())) {
					n = !0;
					break;
				}
				a.hasShadowEditor = n;
			}
			if (n) {
				let n = null, a = null;
				for (let o of e) {
					let e = o._rootElement;
					if (e === null) continue;
					let s = Gs(t, e).anchorNode;
					if (s !== null && ko(s) === o) {
						if (Rs(e.getRootNode())) {
							r = o, i = s;
							break;
						}
						n === null && (n = o, a = s);
					}
				}
				r === null && n !== null && (r = n, i = a);
			} else {
				let e = t.anchorNode;
				e === null || V(e) && e.shadowRoot !== null || (r = ko(e), r !== null && (i = e));
			}
		}
		if (r === null) {
			let e = Xs(n);
			r = e === null ? null : ko(e);
		}
	}
	if (r === null) return;
	if (r._inputState.isSelectionChangeFromMouseDown) {
		if (a !== void 0) for (let e of a.editors) e._inputState.isSelectionChangeFromMouseDown = !1;
		Ua(r, () => {
			let n = Zi(), a = i ?? Gs(t, r._rootElement).anchorNode;
			(V(a) || No(a)) && Xo(Xi(n, t, r, e));
		});
	}
	let o = es(r), s = o[o.length - 1], c = s._key, l = Mr.get(c), u = l || s;
	u !== r && gr(t, u, !1), gr(t, r, !0), r === s ? l && Mr.delete(c) : Mr.set(c, r);
}
function Pr(e) {
	e._lexicalHandled = !0;
}
function Fr(e) {
	return !0 === e._lexicalHandled;
}
function Ir(e) {
	let t = dr.get(e);
	if (t === void 0) return;
	let n = fr.get(t);
	if (n === void 0) return;
	dr.delete(e);
	let r = Ao(e);
	Oo(r) ? (function(e) {
		if (e._parentEditor !== null) {
			let t = es(e), n = t[t.length - 1]._key;
			Mr.get(n) === e && Mr.delete(n);
		} else Mr.delete(e._key);
	}(r), n.editors.delete(r), n.hasShadowEditor = void 0, e.__lexicalEditor = null) : r && x(198);
	let i = jr(e);
	for (let e = 0; e < i.length; e++) i[e]();
	e.__lexicalEventHandles = [];
}
function Lr(e, t, n) {
	Ca();
	let r = e.__key, i = e.getParent();
	if (i === null) return void (jc(e) !== null && x(367, r, String(jc(e))));
	let a = function(e) {
		let t = N();
		if (!j(t) || !P(e)) return t;
		let { anchor: n, focus: r } = t, i = n.getNode(), a = r.getNode();
		return Cs(i, e) && n.set(e.__key, 0, "element"), Cs(a, e) && r.set(e.__key, 0, "element"), t;
	}(e), o = !1;
	if (j(a) && t) {
		let t = a.anchor, n = a.focus;
		t.key === r && (ea(t, e, i, e.getPreviousSibling(), e.getNextSibling()), o = !0), n.key === r && (ea(n, e, i, e.getPreviousSibling(), e.getNextSibling()), o = !0);
	} else Ei(a) && t && e.isSelected() && e.selectPrevious();
	if (j(a) && t && !o) {
		let t = e.getIndexWithinParent();
		zo(e), Qi(a, i, t, -1);
	} else zo(e);
	n || ks(i) || i.canBeEmpty() || !i.isEmpty() || Lr(i, t), t && a && Ya(i) && i.isEmpty() && i.selectEnd();
}
function Rr(e) {
	return e;
}
var zr = Symbol.for("ephemeral");
function Br(e) {
	return e[zr] || !1;
}
var Vr = {
	configurable: !0,
	enumerable: !1,
	value: void 0,
	writable: !0
}, Hr = class {
	__type;
	__key;
	__parent;
	__prev;
	__next;
	__state;
	[ht];
	static getType() {
		let { ownNodeType: e } = Cc(this);
		return e === void 0 && x(64, this.name), e;
	}
	static clone(e) {
		x(65, this.name);
	}
	$config() {
		return {};
	}
	config(e, t) {
		let n = t.extends || Dc(this.constructor);
		return Object.assign(t, { extends: n }), typeof e == "string" && Object.assign(t, { type: e }), { [e]: t };
	}
	afterCloneFrom(e) {
		this.__key === e.__key ? (this.__parent = e.__parent, this.__next = e.__next, this.__prev = e.__prev, this.__state = e.__state) : e.__state && (this.__state = e.__state.getWritable(this));
	}
	resetOnCopyNodeFrom(e) {
		this.__state &&= this.__state.getWritable(this).resetOnCopyNode();
	}
	static importDOM;
	constructor(e) {
		this.__type = this.constructor.getType(), this.__parent = null, this.__prev = null, this.__next = null, Object.defineProperty(this, "__state", Vr), Object.defineProperty(this, ht, Vr), Ro(this, e);
	}
	getType() {
		return this.__type;
	}
	isInline() {
		x(137, this.constructor.name);
	}
	isAttached() {
		let e = this.__key;
		for (; e !== null;) {
			if (e === "root") return !0;
			let t = R(e);
			if (t === null) break;
			e = t.__parent === null ? jc(t) : t.__parent;
		}
		return !1;
	}
	isSelected(e) {
		let t = e || N();
		if (t == null) return !1;
		let n = t.getNodes().some((e) => e.__key === this.__key);
		if (A(this)) return n;
		if (j(t) && t.anchor.type === "element" && t.focus.type === "element") {
			if (t.isCollapsed()) return !1;
			let e = this.getParent();
			if (F(this) && this.isInline() && e) {
				let n = t.isBackward() ? t.focus : t.anchor;
				if (e.is(n.getNode()) && n.offset === e.getChildrenSize() && this.is(e.getLastChild())) return !1;
			}
		}
		return n;
	}
	getKey() {
		return this.__key;
	}
	getIndexWithinParent() {
		let e = this.getParent();
		if (e === null) return -1;
		let t = e.getFirstChild(), n = 0;
		for (; t !== null;) {
			if (this.is(t)) return n;
			n++, t = t.getNextSibling();
		}
		return -1;
	}
	getParent() {
		let e = this.getLatest().__parent;
		return e === null ? null : R(e);
	}
	getParentOrThrow() {
		let e = this.getParent();
		return e === null && x(66, this.__key), e;
	}
	getTopLevelElement() {
		let e = this;
		for (; e !== null;) {
			let t = e.getParent();
			if (ks(t) || jc(e) !== null) return P(e) || e === this && F(e) || x(194), e;
			e = t;
		}
		return null;
	}
	getTopLevelElementOrThrow() {
		let e = this.getTopLevelElement();
		return e === null && x(67, this.__key), e;
	}
	getParents() {
		let e = [], t = this.getParent();
		for (; t !== null;) e.push(t), t = t.getParent();
		return e;
	}
	getParentKeys() {
		let e = [], t = this.getParent();
		for (; t !== null;) e.push(t.__key), t = t.getParent();
		return e;
	}
	getPreviousSibling() {
		let e = this.getLatest().__prev;
		return e === null ? null : R(e);
	}
	getPreviousSiblings() {
		let e = [], t = this.getParent();
		if (t === null) return e;
		let n = t.getFirstChild();
		for (; n !== null && !n.is(this);) e.push(n), n = n.getNextSibling();
		return e;
	}
	getNextSibling() {
		let e = this.getLatest().__next;
		return e === null ? null : R(e);
	}
	getNextSiblings() {
		let e = [], t = this.getNextSibling();
		for (; t !== null;) e.push(t), t = t.getNextSibling();
		return e;
	}
	getCommonAncestor(e) {
		let t = P(this) ? this : this.getParent(), n = P(e) ? e : e.getParent(), r = t && n ? El(t, n) : null;
		return r ? r.commonAncestor : null;
	}
	is(e) {
		return e != null && this.__key === e.__key;
	}
	isBefore(e) {
		let t = El(this, e);
		return t !== null && (t.type === "descendant" || (t.type === "branch" ? Cl(t) === -1 : (t.type !== "same" && t.type !== "ancestor" && x(279), !1)));
	}
	isParentOf(e) {
		return Cs(e, this);
	}
	getNodesBetween(e) {
		let t = this.isBefore(e), n = [], r = /* @__PURE__ */ new Set(), i = this;
		for (; i !== null;) {
			let a = i.__key;
			if (r.has(a) || (r.add(a), n.push(i)), i === e) break;
			let o = P(i) ? t ? i.getFirstChild() : i.getLastChild() : null;
			if (o !== null) {
				i = o;
				continue;
			}
			let s = t ? i.getNextSibling() : i.getPreviousSibling();
			if (s !== null) {
				i = s;
				continue;
			}
			let c = i.getParentOrThrow();
			if (r.has(c.__key) || n.push(c), c === e) break;
			let l = null, u = c;
			do {
				if (u === null && x(68), l = t ? u.getNextSibling() : u.getPreviousSibling(), u = u.getParent(), u === null) break;
				l !== null || r.has(u.__key) || n.push(u);
			} while (l === null);
			i = l;
		}
		return t || n.reverse(), n;
	}
	isDirty() {
		let e = Da()._dirtyLeaves;
		return e !== null && e.has(this.__key);
	}
	getLatest() {
		if (Br(this)) return this;
		let e = R(this.__key);
		return e === null && x(113), e;
	}
	getWritable() {
		if (Br(this)) return this;
		Ca();
		let e = Ta(), t = Da(), n = e._nodeMap, r = this.__key, i = this.getLatest(), a = t._cloneNotNeeded, o = N();
		if (o !== null && o.setCachedNodes(null), a.has(r)) return Bo(i), i;
		let s = fc(i);
		return a.add(r), Bo(s), n.set(r, s), s;
	}
	getTextContent() {
		return Wc(this);
	}
	getTextContentSize() {
		return this.getTextContent().length;
	}
	createDOM(e, t) {
		x(70);
	}
	updateDOM(e, t, n) {
		x(71);
	}
	getDOMSlot(e) {
		return new Oe(e);
	}
	exportDOM(e) {
		return { element: this.createDOM(e._config, e) };
	}
	exportJSON() {
		let e = this.__state ? this.__state.toJSON() : void 0;
		return {
			type: this.__type,
			version: 1,
			...e
		};
	}
	static importJSON(e) {
		x(18, this.name);
	}
	updateFromJSON(e) {
		return function(e, t) {
			let n = e.getWritable(), r = t.$, i = r;
			for (let e of it(n).flatKeys) e in t && (i !== void 0 && i !== r || (i = { ...r }), i[e] = t[e]);
			return (n.__state || i) && rt(e).updateFromJSON(i), n;
		}(this, e);
	}
	static transform() {
		return null;
	}
	remove(e) {
		Lr(this, !0, e);
	}
	replace(e, t) {
		Ca();
		let n = N();
		n !== null && (n = n.clone()), Ms(this, e);
		let r = this.getLatest(), i = this.__key, a = e.__key, o = e.getWritable(), s = this.getParentOrThrow().getWritable(), c = s.__size, l = o.getParent(), u = l === null ? -1 : o.getIndexWithinParent();
		zo(o), l !== null && j(n) && Qi(n, l, u, -1);
		let d = r.getPreviousSibling(), f = r.getNextSibling(), p = r.__prev, m = r.__next, h = r.__parent;
		Lr(r, !1, !0), d === null ? s.__first = a : d.getWritable().__next = a, o.__prev = p, f === null ? s.__last = a : f.getWritable().__prev = a, o.__next = m, o.__parent = h, s.__size = c;
		let g = 0;
		t && (P(this) && P(o) || x(139), g = o.getChildrenSize(), o.splice(g, 0, this.getChildren()));
		let _ = Ic(this);
		if (_.length > 0) {
			kc(this) && kc(o) || x(368, this.__key, o.__key);
			for (let e of _) {
				let t = Lc(this, e);
				t !== null && (Jc(this, e), qc(o, e, t));
			}
		}
		if (j(n)) {
			Xo(n);
			let e = n.anchor, r = n.focus;
			e.key === i && (t && e.type === "element" ? e.set(o.__key, g + e.offset, "element") : Si(e, o)), r.key === i && (t && r.type === "element" ? r.set(o.__key, g + r.offset, "element") : Si(r, o));
		}
		return Ho() === i && Vo(a), o;
	}
	insertAfter(e, t = !0) {
		Ca(), Ms(this, e);
		let n = this.getWritable(), r = e.getWritable();
		this.getParentOrThrow();
		let i = r.getParent(), a = N(), o = !1, s = !1;
		if (i !== null) {
			let n = e.getIndexWithinParent();
			if (j(a)) {
				let e = i.__key, t = a.anchor, r = a.focus;
				o = t.type === "element" && t.key === e && t.offset === n + 1, s = r.type === "element" && r.key === e && r.offset === n + 1;
			}
			zo(r), t && j(a) && Qi(a, i, n, -1);
		} else zo(r);
		let c = this.getNextSibling(), l = this.getParentOrThrow().getWritable(), u = r.__key, d = n.__next;
		if (c === null ? l.__last = u : c.getWritable().__prev = u, l.__size++, n.__next = u, r.__next = d, r.__prev = n.__key, r.__parent = n.__parent, t && j(a)) {
			let e = this.getIndexWithinParent();
			Qi(a, l, e + 1);
			let t = l.__key;
			o && a.anchor.set(t, e + 2, "element"), s && a.focus.set(t, e + 2, "element");
		}
		return e;
	}
	insertBefore(e, t = !0) {
		Ca(), Ms(this, e);
		let n = this.getWritable(), r = e.getWritable();
		this.getParentOrThrow();
		let i = r.__key, a = N(), o = r.getParent(), s = o === null ? -1 : r.getIndexWithinParent();
		zo(r), o !== null && t && j(a) && Qi(a, o, s, -1);
		let c = this.getPreviousSibling(), l = this.getParentOrThrow().getWritable(), u = n.__prev, d = this.getIndexWithinParent();
		return c === null ? l.__first = i : c.getWritable().__next = i, l.__size++, n.__prev = i, r.__prev = u, r.__next = n.__key, r.__parent = n.__parent, t && j(a) && Qi(a, this.getParentOrThrow(), d), e;
	}
	isParentRequired() {
		return !1;
	}
	createParentElementNode() {
		return I();
	}
	selectStart() {
		return this.selectPrevious();
	}
	selectEnd() {
		return this.selectNext(0, 0);
	}
	selectPrevious(e, t) {
		Ca();
		let n = Mc(this);
		if (n !== null) return n.selectPrevious(e, t);
		let r = this.getPreviousSibling(), i = this.getParentOrThrow();
		if (r === null) return i.select(0, 0);
		if (P(r)) return r.select();
		if (!A(r)) {
			let e = r.getIndexWithinParent() + 1;
			return i.select(e, e);
		}
		return r.select(e, t);
	}
	selectNext(e, t) {
		Ca();
		let n = Mc(this);
		if (n !== null) return n.selectNext(e, t);
		let r = this.getNextSibling(), i = this.getParentOrThrow();
		if (r === null) return i.select();
		if (P(r)) return r.select(0, 0);
		if (!A(r)) {
			let e = r.getIndexWithinParent();
			return i.select(e, e);
		}
		return r.select(e, t);
	}
	markDirty() {
		this.getWritable();
	}
	reconcileObservedMutation(e, t) {
		this.markDirty();
	}
};
function Ur(e) {
	return e instanceof Hr;
}
var Wr = "history-push", Gr = "history-merge", Kr = "skip-selection-focus", qr = "composition-end", Jr = "!important";
function Yr(e) {
	let t = {};
	if (!e) return t;
	let n = "", r = "", i = null, a = !1, o = !1, s = !1, c = 0, l = e.length, u = -1;
	for (let d = 0; d < l; d++) {
		let l = e[d];
		if (a) l === "*" && e[d + 1] === "/" && (a = !1, d++);
		else if (o) u === -1 && (u = d), o = !1;
		else if (i === null) if (l !== "/" || e[d + 1] !== "*") if (l !== "\"" && l !== "'") if (l !== "(") if (l !== ")") if (s || l !== ":" || c !== 0) {
			if (l === ";" && c === 0) {
				u !== -1 && (s ? r += e.slice(u, d) : n += e.slice(u, d), u = -1);
				let i = n.trim(), a = r.trim();
				i !== "" && a !== "" && (t[i] = a), n = "", r = "", s = !1;
				continue;
			}
			u === -1 && (u = d);
		} else u !== -1 && (n += e.slice(u, d), u = -1), s = !0;
		else u === -1 && (u = d), c = Math.max(0, c - 1);
		else u === -1 && (u = d), c++;
		else u === -1 && (u = d), i = l;
		else u !== -1 && (s ? r += e.slice(u, d) : n += e.slice(u, d), u = -1), a = !0, d++;
		else u === -1 && (u = d), l === "\\" ? o = !0 : l === i && (i = null);
	}
	u !== -1 && (s ? r += e.slice(u, l) : n += e.slice(u, l));
	let d = n.trim(), f = r.trim();
	return d !== "" && f !== "" && (t[d] = f), t;
}
function Xr(e, t, n) {
	let r = n.trimEnd(), i = r.length - 10;
	i >= 0 && r.slice(i).toLowerCase() === Jr ? e.setProperty(t, r.slice(0, i).trim(), "important") : e.setProperty(t, n, "");
}
function Zr(e, t, n = "") {
	if (t === n) return;
	let r = Yr(n), i = Yr(t);
	for (let t in i) delete r[t], Xr(e, t, i[t]);
	for (let t in r) e.removeProperty(t);
}
function Qr(e, t) {
	return 16 & t ? "code" : t & 128 ? "mark" : 32 & t ? "sub" : 64 & t ? "sup" : null;
}
function $r(e, t) {
	return 1 & t ? "strong" : 2 & t ? "em" : "span";
}
function ei(e, t, n, r, i) {
	let a = r.classList, o = ps(i, "base");
	o !== void 0 && a.add(...o), o = ps(i, "underlineStrikethrough");
	let s = !1, c = 8 & t && 4 & t;
	o !== void 0 && (8 & n && 4 & n ? (s = !0, c || a.add(...o)) : c && a.remove(...o));
	for (let e in ye) {
		let r = ye[e];
		if (o = ps(i, e), o !== void 0) if (n & r) {
			if (s && (e === "underline" || e === "strikethrough")) {
				t & r && a.remove(...o);
				continue;
			}
			((t & r) === 0 || c && e === "underline" || e === "strikethrough") && a.add(...o);
		} else t & r && a.remove(...o);
	}
}
function ti(e, t, n) {
	let r = n.isComposing(), i = e + (r ? ge : ""), a = U(), o = ac(a).$getDOMSlot(n, t, a), s = o.getFirstChild();
	if (s === null || s.nodeType !== Node.TEXT_NODE) return void o.insertChild(B().createTextNode(i));
	let c = s, l = c.nodeValue;
	if (l !== i) if (r || te) {
		let [e, t, n] = function(e, t) {
			let n = e.length, r = t.length, i = 0, a = 0;
			for (; i < n && i < r && e[i] === t[i];) i++;
			for (; a + i < n && a + i < r && e[n - a - 1] === t[r - a - 1];) a++;
			return [
				i,
				n - i - a,
				t.slice(i, r - a)
			];
		}(l, i);
		t !== 0 && c.deleteData(e, t), c.insertData(e, n);
	} else c.nodeValue = i;
}
function ni(e, t, n, r, i, a) {
	ti(i, e, t);
	let o = a.theme.text;
	o !== void 0 && ei(0, 0, r, e, o);
}
function ri(e, t) {
	let n = B().createElement(t);
	return n.appendChild(e), n;
}
function ii(e) {
	return e != null && !0 === e.__isInlineFormattable;
}
var ai = class e extends Hr {
	__text;
	__format;
	__style;
	__mode;
	__detail;
	get __isInlineFormattable() {
		return !0;
	}
	static getType() {
		return "text";
	}
	static clone(t) {
		return new e(t.__text, t.__key);
	}
	afterCloneFrom(e) {
		super.afterCloneFrom(e), this.__text = e.__text, this.__format = e.__format, this.__style = e.__style, this.__mode = e.__mode, this.__detail = e.__detail;
	}
	constructor(e = "", t) {
		super(t), this.__text = e, this.__format = 0, this.__style = "", this.__mode = 0, this.__detail = 0;
	}
	getFormat() {
		return this.getLatest().__format;
	}
	getDetail() {
		return this.getLatest().__detail;
	}
	getMode() {
		return we[this.getLatest().__mode];
	}
	getStyle() {
		return this.getLatest().__style;
	}
	isToken() {
		return this.getLatest().__mode === 1;
	}
	isComposing() {
		return this.__key === Ho();
	}
	isSegmented() {
		return this.getLatest().__mode === 2;
	}
	isDirectionless() {
		return !!(1 & this.getLatest().__detail);
	}
	isUnmergeable() {
		return !!(2 & this.getLatest().__detail);
	}
	hasFormat(e) {
		let t = ye[e];
		return (this.getFormat() & t) !== 0;
	}
	isSimpleText() {
		return this.__type === "text" && this.__mode === 0;
	}
	getTextContent() {
		return this.getLatest().__text;
	}
	getFormatFlags(e, t) {
		return Io(this.getLatest().__format, e, t);
	}
	canHaveFormat() {
		return !0;
	}
	isInline() {
		return !0;
	}
	createDOM(e, t) {
		let n = this.__format, r = Qr(0, n), i = $r(0, n), a = r === null ? i : r, o = B().createElement(a), s = o;
		this.hasFormat("code") && o.setAttribute("spellcheck", "false"), r !== null && (s = B().createElement(i), o.appendChild(s)), ni(s, this, 0, n, this.__text, e);
		let c = this.__style;
		return c !== "" && Zr(o.style, c), o;
	}
	updateDOM(e, t, n) {
		let r = this.__text, i = e.__format, a = this.__format, o = Qr(0, i), s = Qr(0, a), c = $r(0, i), l = $r(0, a);
		if ((o === null ? c : o) !== (s === null ? l : s)) return !0;
		if (o === s && c !== l) {
			let e = t.firstChild;
			e ?? x(48);
			let i = B().createElement(l);
			return ni(i, this, 0, a, r, n), t.replaceChild(i, e), !1;
		}
		let u = t;
		s !== null && o !== null && (u = t.firstChild, u ?? x(49)), ti(r, u, this);
		let d = n.theme.text;
		d !== void 0 && i !== a && ei(0, i, a, u, d);
		let f = e.__style, p = this.__style;
		return f !== p && Zr(t.style, p, f), !1;
	}
	static importDOM() {
		return {
			"#text": () => ({
				conversion: ui,
				priority: 0
			}),
			b: () => ({
				conversion: si,
				priority: 0
			}),
			code: () => ({
				conversion: pi,
				priority: 0
			}),
			em: () => ({
				conversion: pi,
				priority: 0
			}),
			i: () => ({
				conversion: pi,
				priority: 0
			}),
			mark: () => ({
				conversion: pi,
				priority: 0
			}),
			s: () => ({
				conversion: pi,
				priority: 0
			}),
			span: () => ({
				conversion: oi,
				priority: 0
			}),
			strong: () => ({
				conversion: pi,
				priority: 0
			}),
			sub: () => ({
				conversion: pi,
				priority: 0
			}),
			sup: () => ({
				conversion: pi,
				priority: 0
			}),
			u: () => ({
				conversion: pi,
				priority: 0
			})
		};
	}
	static importJSON(e) {
		return mi().updateFromJSON(e);
	}
	updateFromJSON(e) {
		return super.updateFromJSON(e).setTextContent(e.text).setFormat(e.format).setDetail(e.detail).setMode(e.mode).setStyle(e.style);
	}
	exportDOM(e) {
		let { element: t } = super.exportDOM(e);
		return V(t) || x(132), t.style.whiteSpace = "pre-wrap", this.hasFormat("lowercase") ? t.style.textTransform = "lowercase" : this.hasFormat("uppercase") ? t.style.textTransform = "uppercase" : this.hasFormat("capitalize") && (t.style.textTransform = "capitalize"), this.hasFormat("bold") && (t = ri(t, "b")), this.hasFormat("italic") && (t = ri(t, "i")), this.hasFormat("strikethrough") && (t = ri(t, "s")), this.hasFormat("underline") && (t = ri(t, "u")), { element: t };
	}
	exportJSON() {
		return {
			detail: this.getDetail(),
			format: this.getFormat(),
			mode: this.getMode(),
			style: this.getStyle(),
			text: this.getTextContent(),
			...super.exportJSON()
		};
	}
	selectionTransform(e, t) {}
	setFormat(e) {
		let t = this.getWritable();
		return t.__format = typeof e == "string" ? ye[e] : e, t;
	}
	setDetail(e) {
		let t = this.getWritable();
		return t.__detail = typeof e == "string" ? be[e] : e, t;
	}
	setStyle(e) {
		let t = this.getWritable();
		return t.__style = e, t;
	}
	toggleFormat(e) {
		let t = Io(this.getFormat(), e, null);
		return this.setFormat(t);
	}
	toggleDirectionless() {
		let e = this.getWritable();
		return e.__detail ^= 1, e;
	}
	toggleUnmergeable() {
		let e = this.getWritable();
		return e.__detail ^= 2, e;
	}
	setMode(e) {
		let t = Ce[e];
		if (this.__mode === t) return this;
		let n = this.getWritable();
		return n.__mode = t, n;
	}
	setTextContent(e) {
		if (this.__text === e) return this;
		let t = this.getWritable();
		return t.__text = e, t;
	}
	select(e, t) {
		Ca();
		let n = e, r = t, i = N(), a = this.getTextContent(), o = this.__key;
		if (typeof a == "string") {
			let e = a.length;
			n === void 0 && (n = e), r === void 0 && (r = e);
		} else n = 0, r = 0;
		if (!j(i)) return Ki(o, n, o, r, "text", "text");
		{
			let e = Ho();
			e !== i.anchor.key && e !== i.focus.key || Vo(o), i.setTextNodeRange(this, n, this, r);
		}
		return i;
	}
	selectStart() {
		return this.select(0, 0);
	}
	selectEnd() {
		let e = this.getTextContentSize();
		return this.select(e, e);
	}
	spliceText(e, t, n, r) {
		let i = this.getWritable(), a = i.__text, o = n.length, s = e;
		s < 0 && (s = o + s, s < 0 && (s = 0));
		let c = N();
		if (r && j(c)) {
			let t = e + o;
			c.setTextNodeRange(i, t, i, t);
		}
		return i.__text = a.slice(0, s) + n + a.slice(s + t), i;
	}
	canInsertTextBefore() {
		return !0;
	}
	canInsertTextAfter() {
		return !0;
	}
	splitText(...e) {
		Ca();
		let t = this.getLatest(), n = t.getTextContent();
		if (n === "") return [];
		let r = t.__key, i = Ho(), a = n.length;
		e.sort((e, t) => e - t), e.push(a);
		let o = [], s = e.length;
		for (let t = 0, r = 0; t < a && r <= s; r++) {
			let i = e[r];
			i > t && (o.push(n.slice(t, i)), t = i);
		}
		let c = o.length;
		if (c === 1) return [t];
		let l = o[0], u = t.getParent(), d, f = t.getFormat(), p = t.getStyle(), m = t.__detail, h = !1, g = null, _ = null, v = N();
		if (j(v)) {
			let [e, t] = v.isBackward() ? [v.focus, v.anchor] : [v.anchor, v.focus];
			e.type === "text" && e.key === r && (g = e), t.type === "text" && t.key === r && (_ = t);
		}
		t.isSegmented() ? (d = mi(l), d.__format = f, d.__style = p, d.__detail = m, d.__state = lt(t, d), h = !0) : d = t.setTextContent(l);
		let y = [d];
		for (let e = 1; e < c; e++) {
			let n = mi(o[e]);
			n.__format = f, n.__style = p, n.__detail = m, n.__state = lt(t, n);
			let a = n.__key;
			i === r && Vo(a), y.push(n);
		}
		let b = g ? g.offset : null, x = _ ? _.offset : null, S = 0;
		for (let e of y) {
			if (!g && !_) break;
			let t = S + e.getTextContentSize();
			if (g !== null && b !== null && b <= t && b >= S && (g.set(e.getKey(), b - S, "text"), b < t && (g = null)), _ !== null && x !== null && x <= t && x >= S) {
				_.set(e.getKey(), x - S, "text");
				break;
			}
			S = t;
		}
		if (u !== null) {
			(function(e) {
				let t = e.getPreviousSibling(), n = e.getNextSibling();
				t !== null && Bo(t), n !== null && Bo(n);
			})(this);
			let e = u.getWritable(), t = this.getIndexWithinParent();
			h ? (e.splice(t, 0, y), this.remove()) : e.splice(t, 1, y), j(v) && Qi(v, u, t, c - 1);
		}
		return y;
	}
	mergeWithSibling(e) {
		let t = e === this.getPreviousSibling();
		t || e === this.getNextSibling() || x(50);
		let n = this.__key, r = e.__key, i = this.__text, a = i.length;
		Ho() === r && Vo(n);
		let o = N();
		if (j(o)) {
			let i = o.anchor, s = o.focus;
			i !== null && i.key === r && ta(i, t, n, e, a), s !== null && s.key === r && ta(s, t, n, e, a);
		}
		let s = e.__text, c = t ? s + i : i + s;
		this.setTextContent(c);
		let l = this.getWritable();
		return e.remove(), l;
	}
	isTextEntity() {
		return !1;
	}
};
function oi(e) {
	return {
		forChild: hi(e.style),
		node: null
	};
}
function si(e) {
	let t = e, n = t.style.fontWeight === "normal";
	return {
		forChild: hi(t.style, n ? void 0 : "bold"),
		node: null
	};
}
var ci = /* @__PURE__ */ new WeakMap();
function li(e) {
	if (!V(e)) return !1;
	if (e.nodeName === "PRE") return !0;
	let t = e.style.whiteSpace;
	return typeof t == "string" && t.startsWith("pre");
}
function ui(e) {
	let t = e;
	e.parentElement === null && x(129);
	let n = t.textContent || "";
	if (function(e) {
		let t, n = e.parentNode, r = [e];
		for (; n !== null && (t = ci.get(n)) === void 0 && !li(n);) r.push(n), n = n.parentNode;
		let i = t === void 0 ? n : t;
		for (let e = 0; e < r.length; e++) ci.set(r[e], i);
		return i;
	}(t) !== null) return { node: sa(n) };
	if (n = n.replace(/\r/g, "").replace(/[ \t\n]+/g, " "), n === "") return { node: null };
	if (n[0] === " ") {
		let e = t, r = !0;
		for (; e !== null && (e = di(e, !1)) !== null;) {
			let t = e.textContent || "";
			if (t.length > 0) {
				/[ \t\n]$/.test(t) && (n = n.slice(1)), r = !1;
				break;
			}
		}
		r && (n = n.slice(1));
	}
	if (n[n.length - 1] === " ") {
		let e = t, r = !0;
		for (; e !== null && (e = di(e, !0)) !== null;) if ((e.textContent || "").replace(/^( |\t|\r?\n)+/, "").length > 0) {
			r = !1;
			break;
		}
		r && (n = n.slice(0, n.length - 1));
	}
	return n === "" ? { node: null } : { node: mi(n) };
}
function di(e, t) {
	let n = e;
	for (;;) {
		let e;
		for (; (e = t ? n.nextSibling : n.previousSibling) === null;) {
			let e = n.parentElement;
			if (e === null) return null;
			n = e;
		}
		if (n = e, V(n)) {
			let e = n.style.display;
			if (e === "" && !nc(n) || e !== "" && !e.startsWith("inline")) return null;
		}
		let r = n;
		for (; (r = t ? n.firstChild : n.lastChild) !== null;) n = r;
		if (No(n)) return n;
		if (n.nodeName === "BR") return null;
	}
}
var fi = {
	code: "code",
	em: "italic",
	i: "italic",
	mark: "highlight",
	s: "strikethrough",
	strong: "bold",
	sub: "subscript",
	sup: "superscript",
	u: "underline"
};
function pi(e) {
	let t = fi[e.nodeName.toLowerCase()];
	return t === void 0 ? { node: null } : {
		forChild: hi(e.style, t),
		node: null
	};
}
function mi(e = "") {
	return js(new ai(e));
}
function A(e) {
	return e instanceof ai;
}
function hi(e, t) {
	let n = e.fontWeight, r = e.textDecoration.split(" "), i = n === "700" || n === "bold", a = r.includes("line-through"), o = e.fontStyle === "italic", s = r.includes("underline"), c = e.verticalAlign;
	return (e) => A(e) || ii(e) ? (i && !e.hasFormat("bold") && e.toggleFormat("bold"), a && !e.hasFormat("strikethrough") && e.toggleFormat("strikethrough"), o && !e.hasFormat("italic") && e.toggleFormat("italic"), s && !e.hasFormat("underline") && e.toggleFormat("underline"), c !== "sub" || e.hasFormat("subscript") || e.toggleFormat("subscript"), c !== "super" || e.hasFormat("superscript") || e.toggleFormat("superscript"), t && !e.hasFormat(t) && e.toggleFormat(t), e) : e;
}
var gi = class e extends ai {
	static getType() {
		return "tab";
	}
	static clone(t) {
		return new e(t.__key);
	}
	constructor(e) {
		super("	", e), this.__detail = 2;
	}
	static importDOM() {
		return null;
	}
	createDOM(e) {
		let t = super.createDOM(e), n = ps(e.theme, "tab");
		return n !== void 0 && t.classList.add(...n), t;
	}
	static importJSON(e) {
		return _i().updateFromJSON(e);
	}
	setTextContent(e) {
		return super.setTextContent("	");
	}
	spliceText(e, t, n, r) {
		return n === "" && t === 0 || n === "	" && t === 1 || x(286), this;
	}
	setDetail(e) {
		return e !== 2 && x(127), this;
	}
	setMode(e) {
		return e !== "normal" && x(128), this;
	}
	canInsertTextBefore() {
		return !1;
	}
	canInsertTextAfter() {
		return !1;
	}
};
function _i() {
	return js(new gi());
}
function vi(e) {
	return e instanceof gi;
}
var yi = class {
	key;
	offset;
	type;
	_selection;
	constructor(e, t, n) {
		this._selection = null, this.key = e, this.offset = t, this.type = n;
	}
	is(e) {
		return this.key === e.key && this.offset === e.offset && this.type === e.type;
	}
	isBefore(e) {
		return this.key === e.key ? this.offset < e.offset : Sl(Il(Dl(this, "next")), Il(Dl(e, "next"))) < 0;
	}
	getNode() {
		let e = R(this.key);
		return e === null && x(20), e;
	}
	set(e, t, n, r) {
		let i = this._selection, a = this.key;
		r && this.key === e && this.offset === t && this.type === n || (this.key = e, this.offset = t, this.type = n, Sa() || (Ho() === a && Vo(e), i !== null && (i.setCachedNodes(null), j(i) && (i._cachedIsBackward = null), i.dirty = !0)));
	}
};
function bi(e, t, n) {
	return new yi(e, t, n);
}
function xi(e, t) {
	let n = t.__key, r = e.offset, i = "element";
	if (A(t)) {
		i = "text";
		let e = t.getTextContentSize();
		r > e && (r = e);
	} else if (!P(t)) {
		let e = t.getNextSibling();
		if (A(e)) n = e.__key, r = 0, i = "text";
		else {
			let e = t.getParent();
			e && (n = e.__key, r = t.getIndexWithinParent() + 1);
		}
	}
	e.set(n, r, i);
}
function Si(e, t) {
	if (P(t)) {
		let n = t.getLastDescendant();
		P(n) || A(n) ? xi(e, n) : xi(e, t);
	} else xi(e, t);
}
var Ci = class e {
	_nodes;
	_cachedNodes;
	dirty;
	constructor(e) {
		this._cachedNodes = null, this._nodes = e, this.dirty = !1;
	}
	getCachedNodes() {
		return this._cachedNodes;
	}
	setCachedNodes(e) {
		this._cachedNodes = e;
	}
	is(e) {
		if (!Ei(e)) return !1;
		let t = this._nodes, n = e._nodes;
		return t.size === n.size && Array.from(t).every((e) => n.has(e));
	}
	isCollapsed() {
		return !1;
	}
	isBackward() {
		return !1;
	}
	getStartEndPoints() {
		return null;
	}
	add(e) {
		this.dirty = !0, this._nodes.add(e), this._cachedNodes = null;
	}
	delete(e) {
		this.dirty = !0, this._nodes.delete(e), this._cachedNodes = null;
	}
	clear() {
		this.dirty = !0, this._nodes.clear(), this._cachedNodes = null;
	}
	has(e) {
		return this._nodes.has(e);
	}
	clone() {
		return new e(new Set(this._nodes));
	}
	extract() {
		return this.getNodes();
	}
	insertRawText(e) {}
	insertText() {}
	insertNodes(e) {
		let t = this.getNodes().filter((e) => jc(e) === null), n = t.length;
		if (n === 0) return;
		let r = t[n - 1], i;
		if (A(r)) i = r.select();
		else {
			let e = r.getIndexWithinParent() + 1;
			i = r.getParentOrThrow().select(e, e);
		}
		i.insertNodes(e);
		for (let e = 0; e < n; e++) t[e].remove();
	}
	getNodes() {
		let e = this._cachedNodes;
		if (e !== null) return e;
		let t = this._nodes, n = [];
		for (let e of t) {
			let t = R(e);
			t !== null && n.push(t);
		}
		return Sa() || (this._cachedNodes = n), n;
	}
	getTextContent() {
		let e = this.getNodes(), t = "";
		for (let n = 0; n < e.length; n++) t += e[n].getTextContent();
		return t;
	}
	deleteNodes() {
		let e = this.getNodes().filter((e) => jc(e) === null);
		if ((N() || Zi()) === this && e[0]) {
			let t = G(e[0], "next");
			kl(bl(t, t));
		}
		for (let t of e) t.remove();
		wi();
	}
};
function wi() {
	let e = Yo();
	if (e.isEmpty()) {
		let t = I();
		e.append(t), t.select();
	}
}
function j(e) {
	return e instanceof Ti;
}
var Ti = class e {
	format;
	style;
	anchor;
	focus;
	_cachedNodes;
	_cachedIsBackward;
	dirty;
	constructor(e, t, n, r) {
		this.anchor = e, this.focus = t, e._selection = this, t._selection = this, this._cachedNodes = null, this._cachedIsBackward = null, this.format = n, this.style = r, this.dirty = !1;
	}
	getCachedNodes() {
		return this._cachedNodes;
	}
	setCachedNodes(e) {
		this._cachedNodes = e;
	}
	is(e) {
		return !!j(e) && this.anchor.is(e.anchor) && this.focus.is(e.focus) && this.format === e.format && this.style === e.style;
	}
	isCollapsed() {
		return this.anchor.is(this.focus);
	}
	getNodes() {
		let e = this._cachedNodes;
		if (e !== null) return e;
		let t = function(e) {
			let t = [], [n, r] = e.getTextSlices();
			n && t.push(n.caret.origin);
			let i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
			for (let n of e) if (ol(n)) {
				let { origin: e } = n;
				t.length === 0 ? i.add(e) : (a.add(e), t.push(e));
			} else {
				let { origin: e } = n;
				P(e) && a.has(e) || t.push(e);
			}
			if (r && t.push(r.caret.origin), al(e.focus) && P(e.focus.origin) && e.focus.getNodeAtCaret() === null) for (let n = pl(e.focus.origin, "previous"); ol(n) && i.has(n.origin) && !n.origin.isEmpty() && n.origin.is(t[t.length - 1]); n = hl(n)) i.delete(n.origin), t.pop();
			for (; t.length > 1;) {
				let e = t[t.length - 1];
				if (!P(e) || a.has(e) || e.isEmpty() || i.has(e)) break;
				t.pop();
			}
			if (t.length === 0 && e.isCollapsed()) {
				let n = Il(e.anchor), r = Il(e.anchor.getFlipped()), i = (e) => il(e) ? e.origin : e.getNodeAtCaret(), a = i(n) || i(r) || (e.anchor.getNodeAtCaret() ? n.origin : r.origin);
				t.push(a);
			}
			return t;
		}(zl(jl(this), "next"));
		return Sa() || (this._cachedNodes = t), t;
	}
	setTextNodeRange(e, t, n, r) {
		return this.anchor.set(e.__key, t, "text"), this.focus.set(n.__key, r, "text"), this;
	}
	getTextContent() {
		let e = this.getNodes();
		if (e.length === 0) return "";
		let t = e[0], n = e[e.length - 1], r = this.anchor, i = this.focus, a = r.isBefore(i), [o, s] = ji(this), c = "", l = !0;
		for (let u = 0; u < e.length; u++) {
			let d = e[u];
			if (P(d) && !d.isInline()) {
				l || (c += "\n");
				let e = "";
				for (let t of Ic(d)) {
					let n = Lc(d, t);
					n !== null && (e += n.getTextContent());
				}
				e === "" ? l = !d.isEmpty() : (c += e, l = !1);
			} else if (l = !1, A(d)) {
				let e = d.getTextContent();
				d === t ? d === n ? r.type === "element" && i.type === "element" && i.offset !== r.offset || (e = o < s ? e.slice(o, s) : e.slice(s, o)) : e = a ? e.slice(o) : e.slice(s) : d === n && (e = a ? e.slice(0, s) : e.slice(0, o)), c += e;
			} else !F(d) && !ao(d) || d === n && this.isCollapsed() || (c += d.getTextContent());
		}
		return c;
	}
	applyDOMRange(e) {
		let t = Da(), n = t.getEditorState()._selection, r = Wi(e.startContainer, e.startOffset, e.endContainer, e.endOffset, t, n);
		if (r === null) return;
		let [i, a, o] = r;
		this.anchor.set(i.key, i.offset, i.type, !0), this.focus.set(a.key, a.offset, a.type, !0), o && (this.dirty = !0), pt(this);
	}
	clone() {
		let t = this.anchor, n = this.focus;
		return new e(bi(t.key, t.offset, t.type), bi(n.key, n.offset, n.type), this.format, this.style);
	}
	toggleFormat(e) {
		this.format = Io(this.format, e, null), this.dirty = !0;
	}
	setFormat(e) {
		this.format = e, this.dirty = !0;
	}
	setStyle(e) {
		this.style = e, this.dirty = !0;
	}
	hasFormat(e) {
		let t = ye[e];
		return (this.format & t) !== 0;
	}
	insertRawText(e) {
		this.insertNodes(sa(e));
	}
	insertText(e) {
		let t = this.anchor, n = this.focus, r = this.format, i = this.style, a = t, o = n;
		!this.isCollapsed() && n.isBefore(t) && (a = n, o = t), a.type === "element" && function(e, t, n, r) {
			let i = e.getNode(), a = i.getChildAtIndex(e.offset), o = mi();
			if (o.setFormat(n), o.setStyle(r), fo(a)) a.splice(0, 0, [o]);
			else if (a !== null) {
				let e = ks(i) ? I().append(o) : o;
				a.insertBefore(e);
			} else if (ks(i)) {
				let e = i.getLastChild();
				P(e) && !e.isInline() && e.isEmpty() ? e.append(o) : i.append(I().append(o));
			} else i.append(o);
			e.is(t) && t.set(o.__key, 0, "text"), e.set(o.__key, 0, "text");
		}(a, o, r, i), o.type === "element" && Ol(o, Il(Dl(o, "next")));
		let s = a.offset, c = o.offset, l = this.getNodes(), u = l.length, d = l[0];
		A(d) || x(26);
		let f = d.getTextContent().length, p = d.getParentOrThrow(), m = l[u - 1];
		if (u === 1 && o.type === "element" && (c = f, o.set(a.key, c, "text")), this.isCollapsed() && s === f && (Mo(d) || !d.canInsertTextAfter() || !p.canInsertTextAfter() && d.getNextSibling() === null)) {
			let t = d.getNextSibling(), n;
			if (A(t) && t.canInsertTextBefore() && !Mo(t) ? n = t : (n = mi(), n.setFormat(r), n.setStyle(i), p.canInsertTextAfter() ? d.insertAfter(n) : p.insertAfter(n)), n.select(0, 0), d = n, e !== "") return void this.insertText(e);
		} else if (this.isCollapsed() && s === 0 && (Mo(d) || !d.canInsertTextBefore() || !p.canInsertTextBefore() && d.getPreviousSibling() === null)) {
			let t = d.getPreviousSibling(), n;
			if (!A(t) || Mo(t) ? (n = mi(), n.setFormat(r), p.canInsertTextBefore() ? d.insertBefore(n) : p.insertBefore(n)) : n = t, n.select(), d = n, e !== "") return void this.insertText(e);
		} else if (d.isSegmented() && s !== f) if (Ho() !== null) d = d.setMode("normal").setFormat(r).setStyle(i);
		else {
			let e = mi(d.getTextContent());
			e.setFormat(r), d.replace(e), d = e;
		}
		else if (!this.isCollapsed() && e !== "") {
			let t = m.getParent();
			if (!p.canInsertTextBefore() || !p.canInsertTextAfter() || P(t) && (!t.canInsertTextBefore() || !t.canInsertTextAfter())) return this.insertText(""), Vi(this.anchor, this.focus), void this.insertText(e);
		}
		if (u === 1) {
			if (jo(d)) {
				let t = mi(e);
				t.select(), d.replace(t);
				return;
			}
			let t = d.getFormat(), n = d.getStyle();
			if (s !== c || t === r && n === i) {
				if (vi(d)) {
					let t = mi(e);
					t.setFormat(r), t.setStyle(i), t.select(), d.replace(t);
					return;
				}
			} else {
				if (d.getTextContent() !== "") {
					let t = mi(e);
					if (t.setFormat(r), t.setStyle(i), t.select(), s === 0) d.insertBefore(t, !1);
					else {
						let [e] = d.splitText(s);
						e.insertAfter(t, !1);
					}
					t.isComposing() && this.anchor.type === "text" && (this.anchor.offset -= e.length, this._cachedNodes = null, this._cachedIsBackward = null);
					return;
				}
				d.setFormat(r), d.setStyle(i);
			}
			let a = c - s;
			d = d.spliceText(s, a, e, !0), d.getTextContent() === "" ? d.remove() : this.anchor.type === "text" && (this.format = t, this.style = n, d.isComposing() && (this.anchor.offset -= e.length, this._cachedNodes = null, this._cachedIsBackward = null));
		} else {
			let t = /* @__PURE__ */ new Set([...d.getParentKeys(), ...m.getParentKeys()]), n = P(d) ? d : d.getParentOrThrow(), r = P(m) ? m : m.getParentOrThrow(), i = m;
			if (!n.is(r) && r.isInline()) do
				i = r, r = r.getParentOrThrow();
			while (r.isInline());
			if (o.type === "text" && (c !== 0 || m.getTextContent() === "") || o.type === "element" && m.getIndexWithinParent() < c) if (A(m) && !jo(m) && c !== m.getTextContentSize()) {
				if (m.isSegmented()) {
					let e = mi(m.getTextContent());
					m.replace(e), m = e;
				}
				Ya(o.getNode()) || o.type !== "text" || (A(m) || x(395), m = m.spliceText(0, c, "")), t.add(m.__key);
			} else {
				let e = m.getParentOrThrow();
				e.canBeEmpty() || e.getChildrenSize() !== 1 ? m.remove() : e.remove();
			}
			else t.add(m.__key);
			let a = r.getChildren(), p = new Set(l), h = n.is(r), g = n.isInline() && d.getNextSibling() === null ? n : d;
			for (let e = a.length - 1; e >= 0; e--) {
				let t = a[e];
				if (t.is(d) || P(t) && t.isParentOf(d)) break;
				t.isAttached() && (!p.has(t) || t.is(i) ? h || g.insertAfter(t, !1) : t.remove());
			}
			if (!h) {
				let e = r, n = null;
				for (; e !== null;) {
					let r = e.getChildren(), i = r.length;
					(i === 0 || r[i - 1].is(n)) && (t.delete(e.__key), n = e), e = e.getParent();
				}
			}
			if (jo(d)) if (s === f) d.select();
			else {
				let t = mi(e);
				t.select(), d.replace(t);
			}
			else d = d.spliceText(s, f - s, e, !0), d.getTextContent() === "" ? d.remove() : this.anchor.type === "text" && (this.format = d.getFormat(), this.style = d.getStyle(), d.isComposing() && (this.anchor.offset -= e.length, this._cachedNodes = null, this._cachedIsBackward = null));
			for (let e = 1; e < u; e++) {
				let n = l[e], r = n.__key;
				t.has(r) || n.remove();
			}
		}
	}
	removeText() {
		let e = N() === this;
		Al(this, Fl(jl(this))), e && N() !== this && Xo(this);
	}
	formatText(e, t = null) {
		ki(this, e, t);
	}
	insertNodes(e) {
		if (e.length === 0) return;
		this.isCollapsed() || this.removeText();
		let t = this.anchor.getNode();
		if (this.anchor.type === "element" && P(t) && jc(t) !== null) {
			let n = t.isShadowRoot() ? t.getFirstChild() ?? t.append(I()).getFirstChild() : t.getFirstChild();
			if (t.isShadowRoot() && n !== null && !P(n)) {
				let e = I();
				n.insertBefore(e), n = e;
			}
			if (n !== null) {
				n.selectStart();
				let t = N();
				return j(t) || x(369), t.insertNodes(e);
			}
		}
		if (this.anchor.type === "element" && ks(t)) {
			let n = fa(e), r = n.getLastDescendant();
			t.splice(this.anchor.offset, 0, n.getChildren()), r !== null && r.selectEnd();
			return;
		}
		let n = (this.isBackward() ? this.focus : this.anchor).getNode(), r = W(n, H), i = e[e.length - 1];
		if (P(r) && "__language" in r) {
			if ("__language" in e[0]) this.insertText(e[0].getTextContent());
			else {
				let t = la(this);
				r.splice(t, 0, e), i.selectEnd();
			}
			return;
		}
		if (!e.some((e) => (P(e) || F(e)) && !e.isInline())) {
			P(r) || x(211, n.constructor.name, n.getType());
			let t = la(this);
			r.splice(t, 0, e), i.selectEnd();
			return;
		}
		if (P(r) && jc(r) !== null) {
			let t = la(this), n = ca(e);
			r.splice(t, 0, n);
			let i = n[n.length - 1];
			i === void 0 ? r.select(t, t) : i.selectEnd();
			return;
		}
		if (r === null) {
			let t = fa(e), n = t.getLastDescendant(), r = Dl(this.anchor, "next");
			for (let e of t.getChildren()) r = Ul(e, r);
			n !== null && n.selectEnd();
			return;
		}
		if (P(r) && !r.isParentRequired() && !ks(r.getParentOrThrow())) {
			let t = la(this), n = ca(e);
			r.splice(t, 0, n);
			let i = n[n.length - 1];
			i === void 0 ? r.select(t, t) : i.selectEnd();
			return;
		}
		let a = fa(e), o = a.getLastDescendant(), s = a.getChildren(), c = !P(r) || !r.isEmpty() ? this.insertParagraph() : null;
		c && !r.isAttached() && (n = this.anchor.getNode(), r = W(n, H));
		let l = s[s.length - 1], u = s[0];
		var d;
		P(d = u) && H(d) && !d.isEmpty() && P(r) && (!r.isEmpty() || r.canMergeWhenEmpty()) && (P(r) || x(211, n.constructor.name, n.getType()), r.append(...u.getChildren()), u = s[1]), u && (r === null && x(212, n.constructor.name, n.getType()), function(e, t) {
			let n = t.getParentOrThrow().getLastChild(), r = t, i = [t];
			for (; r !== n;) r.getNextSibling() || x(140), r = r.getNextSibling(), i.push(r);
			let a = e;
			for (let e of i) a = a.insertAfter(e);
		}(r, u));
		let f = W(o, H);
		c && P(f) && (c.canMergeWhenEmpty() || H(l)) && (f.append(...c.getChildren()), c.remove()), P(r) && r.isEmpty() && r.remove(), o.selectEnd();
		let p = P(r) ? r.getLastChild() : null;
		ao(p) && f !== r && p.remove();
	}
	insertParagraph() {
		let e = this.anchor.getNode();
		if (this.anchor.type === "element" && ks(e)) {
			let t = I();
			return e.splice(this.anchor.offset, 0, [t]), t.select(), t;
		}
		let t = la(this), n = W(this.anchor.getNode(), H);
		if (n !== null && jc(n) !== null) return null;
		P(n) || x(213);
		let r = n.getChildAtIndex(t), i = r ? [r, ...r.getNextSiblings()] : [], a = n.insertNewAfter(this, !1);
		return a ? (a.append(...i), a.selectStart(), a) : null;
	}
	insertLineBreak(e) {
		let t = io();
		if (this.insertNodes([t]), e) {
			let e = t.getParentOrThrow(), n = t.getIndexWithinParent();
			e.select(n, n);
		}
	}
	extract() {
		let e = [...this.getNodes()], t = e.length, n = e[0], r = e[t - 1], [i, a] = ji(this), o = this.isBackward(), [s, c] = o ? [this.focus, this.anchor] : [this.anchor, this.focus], [l, u] = o ? [a, i] : [i, a];
		if (t === 0) return [];
		if (t === 1) {
			if (A(n) && !this.isCollapsed()) {
				let e = n.splitText(l, u), t = l === 0 ? e[0] : e[1];
				return t ? (s.set(t.getKey(), 0, "text"), c.set(t.getKey(), t.getTextContentSize(), "text"), [t]) : [];
			}
			return [n];
		}
		if (A(n) && (l === n.getTextContentSize() ? e.shift() : l !== 0 && ([, n] = n.splitText(l), e[0] = n, s.set(n.getKey(), 0, "text"))), A(r)) {
			let t = r.getTextContent().length;
			u === 0 ? e.pop() : u !== t && ([r] = r.splitText(u), e[e.length - 1] = r, c.set(r.getKey(), r.getTextContentSize(), "text"));
		}
		return e;
	}
	modify(e, t, n) {
		if (pa(this, e, t, n)) return;
		let r = e === "move", i = Da(), a = Is(Ts(i));
		if (!a) return;
		let o = i._blockCursorElement, s = i._rootElement, c = this.focus.getNode();
		s === null || o === null || !P(c) || c.isInline() || c.canBeEmpty() || Fs(o, i, s);
		let l = vs(i, this.focus.key), u = l;
		if (this.focus.type === "text" && (u = A(c) ? cc(c, l, i) : null), this.dirty) {
			let e = vs(i, this.anchor.key), t = e;
			if (this.anchor.type === "text") {
				let n = this.anchor.getNode();
				t = A(n) ? cc(n, e, i) : null;
			}
			t && u && na(a, t, this.anchor.offset, u, this.focus.offset);
		}
		if (n === "character" && A(c) && c.isUnmergeable() && (t ? this.focus.offset === 0 : this.focus.offset === c.getTextContentSize())) {
			let e = G(c, t ? "previous" : "next").getNodeAtCaret();
			if (A(e)) {
				if (!r) {
					let n = e.getTextContentSize();
					t ? this.focus.set(e.__key, n - 1, "text") : this.focus.set(e.__key, 1, "text"), this.dirty = !0;
					return;
				}
				{
					let n = i.getElementByKey(e.getKey()), r = n ? cc(e, n, i) : null;
					if (r) {
						let e = t ? r.length : 0;
						na(a, r, e, r, e);
					}
				}
			}
		}
		if (Pi(a, e, t ? "backward" : "forward", n), a.rangeCount > 0) {
			let e = Us(a, i._rootElement), n = e || a.getRangeAt(0), o = this.anchor.getNode(), s = Ya(o) ? o : Ds(o);
			this.applyDOMRange(n), this.dirty = !0, !r && (Fi(this, t, s), (e ? a.direction !== "backward" : a.anchorNode === n.startContainer && a.anchorOffset === n.startOffset) || Ni(this));
		}
		n === "lineboundary" && pa(this, e, t, n, "decorators");
	}
	forwardDeletion(e, t, n) {
		if (!n && (e.type === "element" && P(t) && e.offset === t.getChildrenSize() || e.type === "text" && e.offset === t.getTextContentSize())) {
			let e = t.getParent(), n = t.getNextSibling() || (e === null ? null : e.getNextSibling());
			if (P(n) && n.isShadowRoot()) return !0;
		}
		return !1;
	}
	deleteCharacter(e) {
		let t = this.isCollapsed();
		if (this.isCollapsed()) {
			let t = this.anchor, n = t.getNode();
			if (this.forwardDeletion(t, n, e)) return;
			let r = vl(Dl(t, e ? "previous" : "next"));
			if (r.getTextSlices().every((e) => e === null || e.distance === 0)) {
				let e = { type: "initial" };
				for (let t of r.iterNodeCarets("shadowRoot")) if (ol(t)) {
					if (!t.origin.isInline()) {
						if (t.origin.isShadowRoot()) {
							if (e.type === "merge-block") break;
							if (P(r.anchor.origin) && r.anchor.origin.isEmpty()) {
								let e = Il(t);
								Al(this, bl(e, e)), r.anchor.origin.remove();
							}
							return;
						}
						e.type !== "merge-next-block" && e.type !== "merge-block" || (e = {
							block: e.block,
							caret: t,
							type: "merge-block"
						});
					}
				} else {
					if (e.type === "merge-block") break;
					if (al(t)) {
						if (P(t.origin)) {
							if (t.origin.isInline()) {
								if (!t.origin.isParentOf(r.anchor.origin)) break;
							} else e = {
								block: t.origin,
								type: "merge-next-block"
							};
							continue;
						}
						if (F(t.origin)) {
							if (!t.origin.isIsolated()) if (Ic(t.origin).length > 0) {
								if (P(r.anchor.origin) && r.anchor.origin.isEmpty()) {
									r.anchor.origin.remove();
									let e = Ji();
									e.add(t.origin.getKey()), Xo(e);
								}
							} else if (e.type === "merge-next-block" && (t.origin.isKeyboardSelectable() || !t.origin.isInline()) && P(r.anchor.origin) && r.anchor.origin.isEmpty()) {
								r.anchor.origin.remove();
								let e = Ji();
								e.add(t.origin.getKey()), Xo(e);
							} else t.origin.remove();
							return;
						}
						break;
					}
				}
				if (e.type === "merge-block") {
					let { caret: t, block: n } = e;
					return Ic(n).length > 0 ? void 0 : t.origin.isEmpty() && !n.isEmpty() && t.origin.getParent() === n.getParent() ? void t.origin.remove(!0) : (Al(this, bl(!t.origin.isEmpty() && n.isEmpty() ? Ml(G(n, t.direction)) : r.anchor, t)), this.removeText());
				}
				for (let e = t.getNode(); e !== null;) {
					if (jc(e) !== null) return;
					if (P(e) && e.isShadowRoot()) break;
					e = e.getParent();
				}
			}
			let i = this.focus;
			if (Ii(this, e, "character"), this.isCollapsed()) {
				if (e && t.offset === 0 && Mi(this, t.getNode())) return;
			} else {
				let r = i.type === "text" ? i.getNode() : null;
				if (n = t.type === "text" ? t.getNode() : null, r !== null && r.isSegmented()) {
					let t = i.offset, a = r.getTextContentSize();
					if (r.is(n) || e && t !== a || !e && t !== 0) return void Ri(r, e, t);
				} else if (n !== null && n.isSegmented()) {
					let i = t.offset, a = n.getTextContentSize();
					if (n.is(r) || e && i !== 0 || !e && i !== a) return void Ri(n, e, i);
				}
				(function(e, t) {
					let n = e.anchor, r = e.focus, i = n.getNode();
					if (i === r.getNode() && n.type === "text" && r.type === "text") {
						let e = n.offset, a = r.offset, o = e < a, s = o ? e : a, c = o ? a : e, l = c - 1;
						s !== l && (function(e) {
							return !($o(e) || Li(e));
						})(i.getTextContent().slice(s, c)) && (t ? r.set(r.key, l, r.type) : n.set(n.key, l, n.type));
					}
				})(this, e);
			}
		}
		if (this.removeText(), e && !t && this.isCollapsed() && this.anchor.type === "element" && this.anchor.offset === 0) {
			let e = this.anchor.getNode();
			e.isEmpty() && Ya(e.getParent()) && e.getPreviousSibling() === null && Mi(this, e), wi();
		}
	}
	deleteLine(e) {
		let t = M(this.anchor);
		if (t !== null && F(Mc(t))) return this.isCollapsed() || this.focus.set(this.anchor.key, this.anchor.offset, this.anchor.type), void this.deleteCharacter(e);
		this.isCollapsed() && Ii(this, e, "lineboundary"), this.isCollapsed() ? this.deleteCharacter(e) : W(this.anchor.getNode(), H) === W(this.focus.getNode(), H) ? this.removeText() : (this.focus.set(this.anchor.key, this.anchor.offset, this.anchor.type), this.deleteCharacter(e));
	}
	deleteWord(e) {
		if (this.isCollapsed()) {
			let t = this.anchor, n = t.getNode();
			if (this.forwardDeletion(t, n, e)) return;
			Ii(this, e, "word");
		}
		this.isCollapsed() ? this.deleteCharacter(e) : this.removeText();
	}
	isBackward() {
		let e = this._cachedIsBackward;
		if (e !== null) return e;
		let t = this.focus.isBefore(this.anchor);
		return Sa() || (this._cachedIsBackward = t), t;
	}
	getStartEndPoints() {
		return [this.anchor, this.focus];
	}
};
function Ei(e) {
	return e instanceof Ci;
}
function Di(e, t) {
	if (Ei(e)) {
		for (let n of e.getNodes()) ii(n) && n.setFormat(t(n.getFormat()));
		return;
	}
	if (e.isCollapsed()) return e.setFormat(t(e.format)), void Vo(null);
	let n = [];
	for (let r of e.getNodes()) A(r) ? n.push(r) : P(r) ? r.setTextFormat(t(r.getTextFormat())) : ii(r) && r.setFormat(t(r.getFormat()));
	let r = n.length;
	if (r === 0) return e.setFormat(t(e.format)), void Vo(null);
	let i = e.anchor, a = e.focus, o = e.isBackward(), s = o ? a : i, c = o ? i : a, l = 0, u = n[0], d = s.type === "element" ? 0 : s.offset;
	if (s.type === "text" && d === u.getTextContentSize() && (l = 1, u = n[1], d = 0), u == null) return;
	let f = r - 1, p = n[f], m = c.type === "text" ? c.offset : p.getTextContentSize();
	if (u.is(p)) {
		if (d === m) return;
		let n = t(u.getFormat());
		if (Mo(u) || d === 0 && m === u.getTextContentSize()) u.setFormat(n);
		else {
			let e = u.splitText(d, m), t = d === 0 ? e[0] : e[1];
			t.setFormat(n), s.type === "text" && s.set(t.__key, 0, "text"), c.type === "text" && c.set(t.__key, m - d, "text");
		}
		e.format = n;
		return;
	}
	d === 0 || Mo(u) || ([, u] = u.splitText(d), d = 0);
	let h = t(u.getFormat());
	u.setFormat(h);
	let g = t(p.getFormat());
	m > 0 && (m === p.getTextContentSize() || Mo(p) || ([p] = p.splitText(m)), p.setFormat(g));
	for (let e = l + 1; e < f; e++) {
		let r = n[e];
		r.setFormat(t(r.getFormat()));
	}
	s.type === "text" && s.set(u.__key, d, "text"), c.type === "text" && c.set(p.__key, m, "text"), e.format = h | g;
}
function Oi(e, t) {
	let n = [];
	for (let [e, r] of Object.entries(t)) typeof r == "boolean" && n.push([e, r]);
	n.length !== 0 && Di(e, (e) => {
		for (let [t, r] of n) e = Io(e, t, r ? ye[t] : 0);
		return e;
	});
}
function ki(e, t, n = null) {
	let r = n === null && j(e) ? Io(e.format, t, null) : n;
	Di(e, (e) => Io(e, t, r));
}
function Ai(e) {
	let t = e.offset;
	if (e.type === "text") return t;
	let n = e.getNode();
	return t === n.getChildrenSize() ? n.getTextContent().length : 0;
}
function ji(e) {
	let t = e.getStartEndPoints();
	if (t === null) return [0, 0];
	let [n, r] = t;
	return n.type === "element" && r.type === "element" && n.key === r.key && n.offset === r.offset ? [0, 0] : [Ai(n), Ai(r)];
}
function Mi(e, t) {
	for (let n = t; n; n = n.getParent()) {
		if (P(n)) {
			if (n.collapseAtStart(e)) return !0;
			if (ks(n)) break;
		}
		if (n.getPreviousSibling()) break;
	}
	return !1;
}
function Ni(e) {
	let t = e.focus, n = e.anchor, r = n.key, i = n.offset, a = n.type;
	n.set(t.key, t.offset, t.type, !0), t.set(r, i, a, !0);
}
function Pi(e, t, n, r) {
	e.modify(t, n, r);
}
function Fi(e, t, n) {
	let r = e.getNodes(), i = r.filter((e) => Cs(e, n));
	if (i.length === 0 || i.length === r.length) return !1;
	let a = t ? i[0] : i[i.length - 1], o = P(a) ? a : a.getParentOrThrow();
	return t ? o.selectStart() : o.selectEnd(), !0;
}
function Ii(e, t, n) {
	if (pa(e, "extend", t, n)) return;
	let r = Da(), i = Is(Ts(r));
	if (!i || typeof i.modify != "function") return;
	let a = r._blockCursorElement, o = r._rootElement, s = e.anchor, c = e.focus.getNode();
	o === null || a === null || !P(c) || c.isInline() || c.canBeEmpty() || Fs(a, r, o);
	let l = (e) => {
		let t = e.getNode(), n = r.getElementByKey(e.key);
		return n !== null && e.type === "text" && A(t) ? cc(t, n, r) : n;
	}, u = s.getNode(), d = l(s);
	if (d === null) return;
	let f = s.offset, p = e.isCollapsed(), m = e.focus, h = p ? d : l(m);
	if (h === null) return;
	let g = m.offset;
	if (na(i, h, g, h, g), Pi(i, "move", t ? "backward" : "forward", n), i.rangeCount === 0) return;
	let _ = Us(i, o) || i.getRangeAt(0), v = _.startContainer, y = _.startOffset;
	if (p && n === "character" && s.type === "text" && A(u) && u.isUnmergeable() && f === (t ? 0 : u.getTextContentSize())) {
		let n = G(u, t ? "previous" : "next").getNodeAtCaret();
		if (A(n)) {
			let r = t ? n.getTextContentSize() - 1 : 1;
			e.focus.set(n.__key, r, "text"), e.dirty = !0;
			return;
		}
	}
	if (p && n === "character" && s.type === "text") {
		let n = t ? 0 : u.getTextContentSize(), r = v === d ? y : f === n ? -1 : n;
		if (r >= 0) return void (r !== f && (e.focus.set(s.key, r, "text"), e.dirty = !0));
	}
	let [b, x, S, C] = t ? [
		v,
		y,
		d,
		f
	] : [
		d,
		f,
		v,
		y
	], w = Ya(u) ? u : Ds(u);
	e.applyDOMRange({
		collapsed: !1,
		endContainer: S,
		endOffset: C,
		startContainer: b,
		startOffset: x
	}), e.dirty = !0, !Fi(e, t, w) && t && Ni(e), n === "lineboundary" && pa(e, "extend", t, n, "decorators");
}
var Li = (() => {
	try {
		let e = /* @__PURE__ */ RegExp("\\p{Emoji}", "u"), t = e.test.bind(e);
		if (t("❤️") && t("#️⃣") && t("👍")) return t;
	} catch {}
	return () => !1;
})();
function Ri(e, t, n) {
	let r = e, i = r.getTextContent().split(/(?=\s)/g), a = i.length, o = 0, s = 0;
	for (let e = 0; e < a; e++) {
		let r = e === a - 1;
		if (s = o, o += i[e].length, t && o === n || o > n || r) {
			i.splice(e, 1), r && (s = void 0);
			break;
		}
	}
	let c = i.join("").trim();
	c === "" ? r.remove() : (r.setTextContent(c), r.select(s, s));
}
function zi(e, t, n, r) {
	let i, a = t, o = !1;
	if (V(e)) {
		let s = !1, c = e.childNodes, l = c.length, u = r._blockCursorElement;
		a === l && l > 0 && (s = !0, a = l - 1), Go(e, r) !== void 0 || bc(e, r) || (o = !0);
		let d = c[a], f = !1;
		if (d === u) d = c[a + 1], f = !0;
		else if (u !== null) {
			let n = u.parentNode;
			e === n && t > Array.prototype.indexOf.call(n.children, u) && a--;
		}
		if (i = Qo(d), A(i)) a = dl(i, s ? "next" : "previous");
		else {
			let c = Qo(e);
			if (c === null) return null;
			if (P(c)) {
				let o = r.getElementByKey(c.getKey());
				o === null && x(214);
				let l = oc(c, o, r);
				[c, a] = l.resolveChildIndex(c, o, e, t), P(c) || x(215), s && a >= c.getChildrenSize() && (a = Math.max(0, c.getChildrenSize() - 1));
				let u = c.getChildAtIndex(a);
				if (P(u) && function(e, t, n) {
					let r = e.getParent();
					return n === null || r === null || !r.canBeEmpty() || r !== n.getNode();
				}(u, 0, n)) {
					let e = s ? u.getLastDescendant() : u.getFirstDescendant();
					e === null ? c = u : (u = e, c = P(u) ? u : u.getParentOrThrow()), a = 0;
				}
				A(u) ? (i = u, c = null, a = dl(u, s ? "next" : "previous")) : u !== c && s && !f && (P(c) || x(216), a = Math.min(c.getChildrenSize(), a + 1));
			} else {
				let n = Mc(c), i = n === null ? c : n, o = i.getIndexWithinParent(), s = r.getElementByKey(c.getKey()), l = "after";
				if (s !== null && Qo(e) === c) {
					let n = oc(c, s, r);
					n.element === s ? t === 0 && F(c) && (l = "before") : l = n.resolveLeafPosition(s, e, t);
				}
				a = l === "before" ? o : o + 1, c = i.getParentOrThrow();
			}
			if (P(c)) return [bi(c.__key, a, "element"), o];
		}
	} else i = Qo(e);
	return A(i) ? [bi(i.__key, dl(i, a, "clamp"), "text"), o] : null;
}
function Bi(e, t, n) {
	let r = e.offset, i = e.getNode();
	if (r === 0) {
		let r = i.getPreviousSibling(), a = i.getParent();
		if (t) {
			if ((n || !t) && r === null && P(a) && a.isInline()) {
				let t = a.getPreviousSibling();
				A(t) && e.set(t.__key, t.getTextContent().length, "text");
			}
		} else P(r) && !n && r.isInline() ? e.set(r.__key, r.getChildrenSize(), "element") : A(r) && !i.isUnmergeable() && e.set(r.__key, r.getTextContent().length, "text");
	} else if (r === i.getTextContent().length) {
		let r = i.getNextSibling(), a = i.getParent();
		if (t && P(r) && r.isInline()) e.set(r.__key, 0, "element");
		else if ((n || t) && r === null && P(a) && a.isInline() && !a.canInsertTextAfter() && a.getTextContentSize() > 1) {
			let t = a.getNextSibling();
			A(t) && e.set(t.__key, 0, "text");
		}
	}
}
function Vi(e, t, n) {
	if (e.type === "text" && t.type === "text") {
		let n = e.isBefore(t), r = e.is(t);
		Bi(e, n, r), Bi(t, !n, r), r && t.set(e.key, e.offset, e.type);
	}
}
function M(e) {
	let t = R(e.key);
	return t === null ? null : Pc(t);
}
function Hi(e, t, n) {
	let r = M(e), i = M(t);
	if (r === i || r !== null && i !== null && r.is(i)) return !1;
	let a = n(r, i);
	if (r !== null) return P(r) ? t.set(r.getKey(), a ? r.getChildrenSize() : 0, "element") : t.set(r.getKey(), a ? r.getTextContentSize() : 0, "text"), !0;
	let o = Mc(i);
	if (o === null) return !1;
	let s = o.getParent();
	if (s === null) return !1;
	let c = o.getIndexWithinParent();
	return t.set(s.getKey(), a ? c + 1 : c, "element"), !0;
}
function Ui(e) {
	let t = Hi(e.anchor, e.focus, (t, n) => function(e, t, n, r) {
		if (n !== null && r !== null) {
			let e = Mc(n), t = Mc(r);
			if (e !== null && e.is(t)) {
				for (let t of Fc(e).values()) {
					if (t === n.getKey()) return !0;
					if (t === r.getKey()) return !1;
				}
				return !0;
			}
			return e === null || t === null || e.isBefore(t);
		}
		if (n !== null) {
			let e = Mc(n), r = R(t.key);
			return e === null || r === null || !(!e.is(r) && !e.isParentOf(r)) || e.isBefore(r);
		}
		let i = Mc(r), a = R(e.key);
		return i !== null && a !== null && !i.is(a) && !i.isParentOf(a) && a.isBefore(i);
	}(e.anchor, e.focus, t, n));
	return t && (e.dirty = !0), t;
}
function Wi(e, t, n, r, i, a) {
	if (e === null || n === null || !Do(i, e, n)) return null;
	let o = zi(e, t, j(a) ? a.anchor : null, i);
	if (o === null) return null;
	let s = zi(n, r, j(a) ? a.focus : null, i);
	if (s === null) return null;
	let [c, l] = o, [u, d] = s;
	if (c.type === "element" && u.type === "element") {
		let t = Qo(e), r = Qo(n);
		if (F(t) && F(r)) return null;
	}
	let f = i._slotsUsed && Hi(c, u, () => (e.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0);
	return Vi(c, u), [
		c,
		u,
		l || d || f
	];
}
function Gi(e) {
	return P(e) && !e.isInline();
}
function Ki(e, t, n, r, i, a) {
	let o = Ta(), s = new Ti(bi(e, t, i), bi(n, r, a), 0, "");
	return s.dirty = !0, o._selection = s, s;
}
function qi() {
	return new Ti(bi("root", 0, "element"), bi("root", 0, "element"), 0, "");
}
function Ji() {
	return new Ci(/* @__PURE__ */ new Set());
}
function Yi(e, t) {
	return Xi(null, e, t, null);
}
function Xi(e, t, n, r) {
	let i = n._window;
	if (i === null) return null;
	let a = r || i.event, o = a ? a.type : void 0, s = o === "selectionchange", c = !ze && (s || o === "beforeinput" || o === "compositionstart" || o === "compositionend" || o === "click" && a && a.detail === 3 || o === "drop" || o === void 0), l, u, d, f;
	if (j(e) && !c) return e.clone();
	{
		if (t === null) return null;
		let r = Gs(t, n._rootElement);
		if (l = r.anchorNode, u = r.focusNode, d = r.anchorOffset, f = r.focusOffset, (s || o === void 0) && j(e) && !Do(n, l, u)) return e.clone();
	}
	let p = Wi(l, d, u, f, n, e);
	if (p === null) return null;
	let [m, h, g] = p, _ = 0, v = "";
	if (j(e)) {
		let t = e.anchor;
		if (m.key === t.key) _ = e.format, v = e.style;
		else {
			let e = m.getNode();
			A(e) ? (_ = e.getFormat(), v = e.getStyle()) : P(e) && (_ = e.getTextFormat(), v = e.getTextStyle());
		}
	}
	let y = new Ti(m, h, _, v);
	return g && (y.dirty = !0), y;
}
function N() {
	return Ta()._selection;
}
function Zi() {
	return Da()._editorState._selection;
}
function Qi(e, t, n, r = 1) {
	let i = e.anchor, a = e.focus, o = i.getNode(), s = a.getNode();
	if (!t.is(o) && !t.is(s)) return;
	let c = t.__key;
	if (e.isCollapsed()) {
		let t = i.offset;
		if (n <= t && r > 0 || n < t && r < 0) {
			let n = Math.max(0, t + r);
			i.set(c, n, "element"), a.set(c, n, "element"), $i(e);
		}
	} else {
		let o = e.isBackward(), s = o ? a : i, l = s.getNode(), u = o ? i : a, d = u.getNode();
		if (t.is(l)) {
			let e = s.offset;
			(n <= e && r > 0 || n < e && r < 0) && s.set(c, Math.max(0, e + r), "element");
		}
		if (t.is(d)) {
			let e = u.offset;
			(n <= e && r > 0 || n < e && r < 0) && u.set(c, Math.max(0, e + r), "element");
		}
	}
	$i(e);
}
function $i(e) {
	let t = e.anchor, n = t.offset, r = e.focus, i = r.offset, a = t.getNode(), o = r.getNode();
	if (e.isCollapsed()) {
		if (!P(a)) return;
		let e = a.getChildrenSize(), i = n >= e, o = i ? a.getChildAtIndex(e - 1) : a.getChildAtIndex(n);
		if (A(o)) {
			let e = 0;
			i && (e = o.getTextContentSize()), t.set(o.__key, e, "text"), r.set(o.__key, e, "text");
		}
		return;
	}
	if (P(a)) {
		let e = a.getChildrenSize(), r = n >= e, i = r ? a.getChildAtIndex(e - 1) : a.getChildAtIndex(n);
		if (A(i)) {
			let e = 0;
			r && (e = i.getTextContentSize()), t.set(i.__key, e, "text");
		}
	}
	if (P(o)) {
		let e = o.getChildrenSize(), t = i >= e, n = t ? o.getChildAtIndex(e - 1) : o.getChildAtIndex(i);
		if (A(n)) {
			let e = 0;
			t && (e = n.getTextContentSize()), r.set(n.__key, e, "text");
		}
	}
}
function ea(e, t, n, r, i) {
	let a = null, o = 0, s = null;
	r === null ? i !== null && (a = i.__key, A(i) ? s = "text" : P(i) && (s = "element")) : (a = r.__key, A(r) ? (o = r.getTextContentSize(), s = "text") : P(r) && (o = r.getChildrenSize(), s = "element")), a !== null && s !== null ? e.set(a, o, s) : (o = t.getIndexWithinParent(), o === -1 && (o = n.getChildrenSize()), e.set(n.__key, o, "element"));
}
function ta(e, t, n, r, i) {
	e.type === "text" ? e.set(n, e.offset + (t ? 0 : i), "text") : e.offset > r.getIndexWithinParent() && e.set(e.key, e.offset - 1, "element");
}
function na(e, t, n, r, i) {
	try {
		e.setBaseAndExtent(t, n, r, i);
	} catch {}
}
function ra(e, t, n) {
	let r = vs(e, t.getKey());
	if (P(t)) {
		let i = oc(t, r, e);
		return [i.element, n + i.getFirstChildOffset()];
	}
	return [r, n];
}
function ia(e, t, n, r, i, a) {
	let o = a.getRootNode(), s = Po(o) || Rs(o) ? Xs(o) : null;
	if (i.has("collaboration") && s !== a || s !== null && Eo(s, s)) return;
	let c = Gs(r, a), l;
	if (!j(t)) return void (e !== null && Do(n, c.anchorNode, c.focusNode) && r.removeAllRanges());
	let u = t.anchor, d = t.focus, f = u.getNode(), p = d.getNode(), [m, h] = ra(n, f, u.offset), [g, _] = ra(n, p, d.offset), v = t.format, y = t.style, b = t.isCollapsed(), x = m, S = g, C = !1;
	if (u.type === "text" ? (x = A(f) ? cc(f, m, n) : null, C = f.getFormat() !== v || f.getStyle() !== y) : j(e) && e.anchor.type === "text" && (C = !0), d.type === "text" && (S = A(p) ? cc(p, g, n) : null), x !== null && S !== null) {
		if (b && (e === null || C || j(e) && (e.format !== v || e.style !== y)) && function(e, t, n, r, i, a) {
			e._inputState.collapsedSelectionFormat = {
				format: t,
				key: i,
				offset: r,
				style: n,
				timeStamp: a
			};
		}(n, v, y, h, u.key, performance.now()), (r.type !== "Range" || !b) && c.anchorOffset === h && c.focusOffset === _ && c.anchorNode === x && c.focusNode === S) {
			if (s === null || !a.contains(s)) {
				let e = s === null ? null : ko(s);
				e !== null && e !== n || i.has("skip-selection-focus") || a.focus({ preventScroll: !0 });
			}
			if (u.type !== "element") return;
		}
		if (na(r, x, h, S, _), te && t.isCollapsed() && a !== null && !i.has("skip-selection-focus")) {
			let e = Ys(a);
			if (e === null || !a.contains(e)) {
				let e = Xs(a.ownerDocument), t = e === null ? null : ko(e);
				t !== null && t !== n || a.focus({ preventScroll: !0 });
			}
		}
		if (!i.has("skip-scroll-into-view") && t.isCollapsed() && a !== null && a === Ys(a)) {
			let e = j(t) && t.anchor.type === "element" ? x.childNodes[h] || null : (l === void 0 && (l = Ws(r, a)), l);
			if (e !== null) {
				let t;
				if (No(e)) {
					let n = e.ownerDocument.createRange();
					n.selectNode(e), t = n.getBoundingClientRect();
				} else t = e.getBoundingClientRect();
				(function(e, t, n) {
					let r = bs(n), i = ws(r);
					if (r === null || i === null) return;
					let a = n.getBoundingClientRect();
					if (t.bottom < a.top) return;
					let { top: o, bottom: s } = t, c = 0, l = 0, u = n;
					for (; u !== null;) {
						let t = u === r.body;
						if (t) {
							let t = i.visualViewport;
							if (t) {
								let e = t.offsetTop;
								c = e, l = e + t.height;
							} else c = 0, l = Ts(e).innerHeight;
							let n = i.getComputedStyle(r.documentElement), a = parseFloat(n.scrollPaddingTop), o = parseFloat(n.scrollPaddingBottom);
							isFinite(a) && (c += a), isFinite(o) && (l -= o);
						} else {
							let e = u === n ? a : u.getBoundingClientRect();
							c = e.top, l = e.bottom;
						}
						let d = 0;
						if (o < c ? d = -(c - o) : s > l && (d = s - l), d !== 0) if (t) i.scrollBy(0, d);
						else {
							let e = u.scrollTop;
							u.scrollTop += d;
							let t = u.scrollTop - e;
							o -= t, s -= t;
						}
						if (t) break;
						u = ys(u);
					}
				})(n, t, a);
			}
		}
		(function(e) {
			e._inputState.isSelectionChangeFromDOMUpdate = !0;
		})(n);
	}
}
function aa(e) {
	let t = N() || Zi();
	t === null && (t = Yo().selectEnd()), t.insertNodes(e);
}
function oa(e, t) {
	for (let n of e.split(/(\r?\n|\t)/)) n === "\n" || n === "\r\n" ? t.linebreak() : n === "	" ? t.tab() : n !== "" && t.text(n);
}
function sa(e) {
	let t = [];
	return oa(e, {
		linebreak: () => t.push(io()),
		tab: () => t.push(_i()),
		text: (e) => t.push(mi(e))
	}), t;
}
function ca(e) {
	let t = [];
	for (let n of e) ao(n) || (!P(n) && !F(n) || n.isInline() ? t.push(n) : P(n) && t.push(...ca(n.getChildren())));
	return t;
}
function la(e) {
	let t = e;
	e.isCollapsed() || t.removeText();
	let n = N();
	j(n) && (t = n), j(t) || x(161);
	let r = t.anchor, i = r.getNode(), a = r.offset;
	for (; !H(i) && jc(i) === null;) {
		let e = i;
		if ([i, a] = ua(i, a), e.is(i)) break;
	}
	return a;
}
function ua(e, t) {
	let n = e.getParent();
	if (!n) {
		let e = I();
		return Yo().append(e), e.select(), [Yo(), 0];
	}
	if (A(e)) {
		let r = e.splitText(t);
		if (r.length === 0) return [n, e.getIndexWithinParent()];
		let i = t === 0 ? 0 : 1;
		return [n, r[0].getIndexWithinParent() + i];
	}
	if (!P(e) || t === 0) return [n, e.getIndexWithinParent()];
	let r = e.getChildAtIndex(t);
	if (r) {
		let n = new Ti(bi(e.__key, t, "element"), bi(e.__key, t, "element"), 0, ""), i = e.insertNewAfter(n);
		i && i.append(r, ...r.getNextSiblings());
	}
	return [n, e.getIndexWithinParent() + 1];
}
function da(e) {
	return ao(e) || Es(e) || A(e) || e.isParentRequired();
}
function fa(e) {
	let t = I(), n = null;
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (da(i)) {
			if (n === null) {
				n = i.createParentElementNode(), t.append(n);
				let a = e[r + 1];
				if (ao(i) && (a === void 0 || !da(a))) continue;
			}
			n.append(i);
		} else t.append(i), n = null;
	}
	return t;
}
function pa(e, t, n, r, i = "decorators-and-blocks") {
	if (t === "move" && r === "character" && !e.isCollapsed()) {
		let [t, r] = n === e.isBackward() ? [e.focus, e.anchor] : [e.anchor, e.focus];
		return r.set(t.key, t.offset, t.type), !0;
	}
	let a = Dl(e.focus, n ? "previous" : "next"), o = r === "lineboundary", s = t === "move", c = a, l = i === "decorators-and-blocks";
	if (!Ll(c)) {
		for (let e of c) {
			l = !1;
			let { origin: t } = e;
			if (!F(t) || t.isIsolated() || (c = e, !o || !t.isInline())) break;
		}
		if (l) for (let e of vl(a).iterNodeCarets(t === "extend" ? "shadowRoot" : "root")) {
			if (ol(e)) e.origin.isInline() || (c = e);
			else {
				if (P(e.origin)) continue;
				F(e.origin) && !e.origin.isInline() && (c = e);
			}
			break;
		}
	}
	if (c === a) return !1;
	if (s && !o && F(c.origin) && c.origin.isKeyboardSelectable()) {
		let e = Ji();
		return e.add(c.origin.getKey()), Xo(e), !0;
	}
	return c = Il(c), s && Ol(e.anchor, c), Ol(e.focus, c), l || !o;
}
var ma = null, ha = null, ga = !1, _a = !1, va = !1, ya = /* @__PURE__ */ new Set(), ba = 0, xa = {
	characterData: !0,
	childList: !0,
	subtree: !0
};
function Sa() {
	return ga || ma !== null && ma._readOnly;
}
function Ca() {
	ga && x(13);
}
function wa() {
	ba > 99 && x(14);
}
function Ta() {
	return ma === null && x(195, ka()), ma;
}
function Ea(e) {
	Ta() !== null && ha === null && (ha = e), ha !== e && S(378);
}
function Da() {
	return ha === null && x(337, ka()), ha;
}
function Oa() {
	Da()._dirtyType = 2;
}
function ka() {
	let e = 0, t = /* @__PURE__ */ new Set(), n = yo.version;
	if (typeof window < "u") for (let r of Vs(document)) {
		let i = Ao(r);
		if (Oo(i)) e++;
		else if (i) {
			let e = String(i.constructor.version || "<0.17.1");
			e === n && (e += " (separately built, likely a bundler configuration issue)"), t.add(e);
		}
	}
	let r = ` Detected on the page: ${e} compatible editor(s) with version ${n}`;
	return t.size && (r += ` and incompatible editors with versions ${Array.from(t).join(", ")}`), r;
}
function Aa() {
	return ha;
}
function ja(e, t, n) {
	let r = t.__type, i = Co(e, r), a = n.get(r);
	a === void 0 && (a = Array.from(i.transforms), n.set(r, a));
	let o = a.length;
	for (let e = 0; e < o && (a[e](t), t.isAttached()); e++);
}
function Ma(e, t) {
	return e !== void 0 && e.__key !== t && e.isAttached();
}
function Na(e, t) {
	if (!t) return;
	let n = e._updateTags, r = t;
	Array.isArray(t) || (r = [t]);
	for (let e of r) n.add(e);
}
function Pa(e) {
	return Fa(e, Da()._nodes);
}
function Fa(e, t) {
	let n = e.type, r = t.get(n);
	r === void 0 && x(17, n);
	let i = r.klass;
	e.type !== i.getType() && x(18, i.name);
	let a = i.importJSON(e), o = e.children;
	if (P(a) && Array.isArray(o)) for (let e = 0; e < o.length; e++) {
		let n = Fa(o[e], t);
		a.append(n);
	}
	let s = e.$slots;
	if (s) {
		kc(a) || x(379, i.name);
		for (let e in s) qc(a, e, Fa(s[e], t));
	}
	return a;
}
function Ia(e, t, n) {
	let r = ma, i = ga, a = ha;
	ma = t, ga = !0, ha = e;
	try {
		return n();
	} finally {
		ma = r, ga = i, ha = a;
	}
}
function La(e, t) {
	let n = va;
	va = !0;
	try {
		(function(e, t) {
			let n = e._pendingEditorState, r = e._rootElement, i = e._headless || r === null;
			if (n === null) return void (!e._updating && e._deferred.length > 0 && Ba(e, e._deferred));
			let a = e._editorState, o = a._selection, s = n._selection, c = e._dirtyType !== 0, l = ma, u = ga, d = ha, f = e._updating, p = e._observer, m = null;
			if (e._pendingEditorState = null, e._editorState = n, !i && c && p !== null) {
				ha = e, ma = n, ga = !1, e._updating = !0;
				try {
					let t = e._dirtyType, r = e._dirtyElements, i = e._dirtyLeaves;
					p.disconnect(), m = ln(a, n, e, t, r, i);
				} catch (t) {
					if (t instanceof Error && e._onError(t), _a) throw t;
					mo(e, null, r, n), Je(e), e._dirtyType = 2, _a = !0, La(e, a), _a = !1;
					return;
				} finally {
					p.observe(r, xa), e._updating = f, ma = l, ga = u, ha = d;
				}
			}
			n._readOnly ||= !0;
			let h = e._dirtyLeaves, g = e._dirtyElements, _ = e._normalizedNodes, v = e._updateTags;
			c && (e._dirtyType = 0, e._cloneNotNeeded.clear(), e._dirtyLeaves = /* @__PURE__ */ new Set(), e._dirtyElements = /* @__PURE__ */ new Map(), e._normalizedNodes = /* @__PURE__ */ new Set()), e._updateTags = /* @__PURE__ */ new Set(), function(e, t) {
				let n = e._decorators, r = e._pendingDecorators || n, i = t._nodeMap, a;
				for (a in r) i.has(a) || (r === n && (r = qo(e)), delete r[a]);
			}(e, n);
			let y = i ? null : Is(Ts(e));
			if (e._editable && y !== null && (c || s === null || s.dirty || !s.is(o)) && r !== null && !v.has("skip-dom-selection")) {
				ha = e, ma = n;
				try {
					if (p !== null && p.disconnect(), c || s === null || s.dirty) {
						let t = e._blockCursorElement;
						t !== null && Fs(t, e, r), ia(o, s, e, y, v, r);
					}
					(function(e, t, n) {
						let r = e._blockCursorElement;
						if (j(n) && n.isCollapsed() && n.anchor.type === "element" && t.contains(Ys(t))) {
							let i = n.anchor, a = i.getNode(), o = i.offset, s = !1, c = null;
							if (o === a.getChildrenSize()) Ps(a.getChildAtIndex(o - 1)) && (s = !0);
							else {
								let t = a.getChildAtIndex(o);
								if (t !== null && Ps(t)) {
									let n = t.getPreviousSibling();
									(n === null || Ps(n)) && (s = !0, c = e.getElementByKey(t.__key));
								}
							}
							if (s) {
								let n = oc(a, e.getElementByKey(a.__key), e).element;
								r === null && (e._blockCursorElement = r = function(e) {
									let t = e.theme, n = B().createElement("div");
									n.contentEditable = "false", n.setAttribute("data-lexical-cursor", "true");
									let r = t.blockCursor;
									return r !== void 0 && (typeof r == "string" && (r = t.blockCursor = ql(r)), r !== void 0 && n.classList.add(...r)), n;
								}(e._config)), t.style.caretColor = "transparent", c === null ? n.appendChild(r) : n.insertBefore(r, c);
								return;
							}
						}
						r !== null && Fs(r, e, t);
					})(e, r, s);
				} finally {
					p !== null && p.observe(r, xa), ha = d, ma = l;
				}
			}
			m !== null && function(e, t, n, r, i) {
				let a = Array.from(e._listeners.mutation), o = a.length;
				for (let e = 0; e < o; e++) {
					let [o, s] = a[e];
					for (let e of s) {
						let a = t.get(e);
						a !== void 0 && o(a, {
							dirtyLeaves: r,
							prevEditorState: i,
							updateTags: n
						});
					}
				}
			}(e, m, v, h, a), j(s) || s === null || o !== null && o.is(s) || e.dispatchCommand(dn, void 0);
			let b = e._pendingDecorators;
			b !== null && (e._decorators = b, e._pendingDecorators = null, Ra("decorator", e, !0, b)), function(e, t, n) {
				let r = Jo(t), i = Jo(n);
				r !== i && Ra("textcontent", e, !0, i);
			}(e, t || a, n), Ra("update", e, !0, {
				dirtyElements: g,
				dirtyLeaves: h,
				editorState: n,
				mutatedNodes: m,
				normalizedNodes: _,
				prevEditorState: t || a,
				tags: v
			}), !f && Ba(e, e._deferred), (function(e) {
				let t = e._updates;
				if (t.length === 0) return void (e._cascadeCount = 0);
				if (function(e) {
					ya.has(e) || (ya.add(e), setTimeout(() => {
						ya.delete(e), e._cascadeCount = 0;
					}, 0));
				}(e), e._cascadeCount++ > 99) return e._updates = [], e._cascadeCount = 0, void e._onWarn(/* @__PURE__ */ Error(`One or more update listeners are endlessly enqueueing more updates. May have encountered infinite recursion caused by update listeners that trigger additional updates without a stop condition. Editor namespace: ${e._config.namespace}`));
				let n = t.shift();
				if (n) {
					let [t, r] = n;
					Ha(e, t, r);
				}
			})(e);
		})(e, t);
	} finally {
		va = n;
	}
}
function Ra(e, t, n, ...r) {
	let i = t._updating;
	t._updating = n;
	try {
		let n = t._listeners[e], i = Array.from(n);
		for (let [e, t] of i) {
			t && t();
			let i = e(...r);
			n.has(e) ? n.set(e, i) : i && i();
		}
	} finally {
		t._updating = i;
	}
}
function za(e, t, n, r) {
	let i = es(e), a;
	if (!va) for (let e = 0; e < i.length; e++) i[e]._updating || (i[e]._cascadeCount = 0);
	for (let e = 4; e >= 0; e--) for (let o = 0; o < i.length; o++) {
		let s = i[o];
		if (o > 0 && s._updating) {
			a = s;
			break;
		}
		let c = s._commands.get(t);
		if (c !== void 0) {
			let t = c[e];
			if (t.size > 0) {
				let e = !1;
				if (Ua(s, () => {
					for (let i of t) if (i(n, r)) return void (e = !0);
				}), e) return e;
			}
		}
	}
	return a && a.update(() => {
		za(a, t, n, r);
	}), !1;
}
function Ba(e, t) {
	if (e._deferred = [], t.length !== 0) {
		let n = e._updating;
		e._updating = !0;
		try {
			for (let e = 0; e < t.length; e++) t[e]();
		} finally {
			e._updating = n;
		}
	}
}
function Va(e, t) {
	let n = e._updates, r = t || !1;
	for (; n.length !== 0;) {
		let t = n.shift();
		if (t) {
			let [n, i] = t, a = e._pendingEditorState, o;
			i !== void 0 && (o = i.onUpdate, i.skipTransforms && (r = !0), i.discrete && (a === null && x(191), a._flushSync = !0), o && e._deferred.push(o), Na(e, i.tag)), a == null ? Ha(e, n, i) : n();
		}
	}
	return r;
}
function Ha(e, t, n) {
	let r = e._updateTags, i, a = !1, o = !1;
	n !== void 0 && (i = n.onUpdate, Na(e, n.tag), a = n.skipTransforms || !1, o = n.discrete || !1), i && e._deferred.push(i);
	let s = e._editorState, c = e._pendingEditorState, l = !1;
	(c === null || c._readOnly) && (c = e._pendingEditorState = Xa(c || s), l = !0), c._flushSync = o;
	let u = ma, d = ga, f = ha, p = e._updating;
	ma = c, ga = !1, e._updating = !0, ha = e;
	let m = e._headless || e.getRootElement() === null;
	xo(null);
	try {
		l && (m ? s._selection !== null && (c._selection = s._selection.clone()) : c._selection = function(e, t) {
			let n = e.getEditorState()._selection, r = Is(Ts(e));
			return j(n) || n == null ? Xi(n, r, e, t) : n.clone();
		}(e, n && n.event || null));
		let r = e._compositionKey;
		t(), a = Va(e, a), function(e, t) {
			let n = t.getEditorState()._selection, r = e._selection;
			if (j(r)) {
				let e = r.anchor, t = r.focus, i;
				if (e.type === "text" && (i = e.getNode(), i.selectionTransform(n, r)), t.type === "text") {
					let e = t.getNode();
					i !== e && e.selectionTransform(n, r);
				}
			}
		}(c, e), e._dirtyType !== 0 && (a ? function(e, t) {
			let n = t._dirtyLeaves, r = e._nodeMap;
			for (let e of n) {
				let t = r.get(e);
				A(t) && t.isAttached() && t.isSimpleText() && !t.isUnmergeable() && ft(t);
			}
		}(c, e) : function(e, t) {
			let n = t._dirtyLeaves, r = t._dirtyElements, i = e._nodeMap, a = Ho(), o = /* @__PURE__ */ new Map(), s = n, c = s.size, l = r, u = l.size;
			for (; c > 0 || u > 0;) {
				if (c > 0) {
					t._dirtyLeaves = /* @__PURE__ */ new Set();
					for (let e of s) {
						let r = i.get(e);
						A(r) && r.isAttached() && r.isSimpleText() && !r.isUnmergeable() && ft(r), r !== void 0 && Ma(r, a) && ja(t, r, o), n.add(e);
					}
					if (s = t._dirtyLeaves, c = s.size, c > 0) {
						ba++;
						continue;
					}
				}
				t._dirtyLeaves = /* @__PURE__ */ new Set(), t._dirtyElements = /* @__PURE__ */ new Map(), l.delete("root") && l.set("root", !0);
				for (let e of l) {
					let n = e[0], s = e[1];
					if (r.set(n, s), !s) continue;
					let c = i.get(n);
					c !== void 0 && Ma(c, a) && ja(t, c, o);
				}
				s = t._dirtyLeaves, c = s.size, l = t._dirtyElements, u = l.size, ba++;
			}
			t._dirtyLeaves = n, t._dirtyElements = r;
		}(c, e), Va(e), function(e, t, n, r) {
			let i = e._nodeMap, a = t._nodeMap, o = [];
			for (let [e] of r) {
				let t = a.get(e);
				t !== void 0 && (t.isAttached() || (P(t) && Re(t, e, i, a, o, r), i.has(e) || r.delete(e), o.push(e)));
			}
			for (let e of n) {
				let t = a.get(e);
				t === void 0 || t.isAttached() || (kc(t) && t.__slots !== null && Re(t, e, i, a, o, n), i.has(e) || n.delete(e), o.push(e));
			}
			for (let e of o) a.delete(e);
			let s = Da(), c = s._compositionKey;
			c === null || a.has(c) || (s._compositionKey = null);
		}(s, c, e._dirtyLeaves, e._dirtyElements)), r !== e._compositionKey && (c._flushSync = !0);
		let i = c._selection;
		if (j(i)) {
			e._slotsUsed && Ui(i);
			let t = c._nodeMap, n = i.anchor.key, r = i.focus.key;
			t.get(n) !== void 0 && t.get(r) !== void 0 || x(19);
		} else Ei(i) && i._nodes.size === 0 && (c._selection = null);
	} catch (t) {
		t instanceof Error && e._onError(t), e._pendingEditorState = s, e._dirtyType = 2, e._cloneNotNeeded.clear(), e._dirtyLeaves = /* @__PURE__ */ new Set(), e._dirtyElements.clear(), La(e);
		return;
	} finally {
		ma = u, ga = d, ha = f, e._updating = p, ba = 0;
	}
	e._dirtyType !== 0 || e._deferred.length > 0 || function(e, t) {
		let n = t.getEditorState()._selection, r = e._selection;
		if (r !== null) {
			if (r.dirty || !r.is(n)) return !0;
		} else if (n !== null) return !0;
		return !1;
	}(c, e) ? c._flushSync ? (c._flushSync = !1, La(e)) : l && To(() => {
		La(e);
	}) : (c._flushSync = !1, l && (r.clear(), e._deferred = [], e._pendingEditorState = null));
}
function Ua(e, t, n) {
	ha === e && n === void 0 ? t() : Ha(e, t, n);
}
function Wa(e) {
	if (ks(e)) {
		let t = null;
		for (let n of e.getChildren()) t = n.isInline() ? (t || n.replace(n.createParentElementNode())).append(n) : null;
	}
}
var Ga = class extends Hr {
	__first;
	__last;
	__size;
	__format;
	__style;
	__indent;
	__dir;
	__textFormat;
	__textStyle;
	__slotHost;
	__slots;
	$config() {
		return this.config(Symbol.for("ElementNode"), {
			$transform: Wa,
			extends: Hr
		});
	}
	constructor(e) {
		super(e), this.__first = null, this.__last = null, this.__size = 0, this.__format = 0, this.__style = "", this.__indent = 0, this.__dir = null, this.__textFormat = 0, this.__textStyle = "", this.__slotHost = null, this.__slots = null;
	}
	afterCloneFrom(e) {
		super.afterCloneFrom(e), this.__key === e.__key && (this.__first = e.__first, this.__last = e.__last, this.__size = e.__size, this.__slotHost = e.__slotHost, this.__slotHost !== null && this.__parent !== null && x(384, this.__key, String(this.__slotHost), String(this.__parent)), this.__slots = e.__slots), this.__indent = e.__indent, this.__format = e.__format, this.__style = e.__style, this.__dir = e.__dir, this.__textFormat = e.__textFormat, this.__textStyle = e.__textStyle;
	}
	getFormat() {
		return this.getLatest().__format;
	}
	getFormatType() {
		return Se[this.getFormat()] || "";
	}
	getStyle() {
		return this.getLatest().__style;
	}
	getIndent() {
		return this.getLatest().__indent;
	}
	getChildren() {
		let e = [], t = this.getFirstChild();
		for (; t !== null;) e.push(t), t = t.getNextSibling();
		return e;
	}
	getChildrenKeys() {
		let e = [], t = this.getFirstChild();
		for (; t !== null;) e.push(t.__key), t = t.getNextSibling();
		return e;
	}
	getChildrenSize() {
		return this.getLatest().__size;
	}
	isEmpty() {
		return this.getChildrenSize() === 0 && Ic(this).length === 0;
	}
	isDirty() {
		let e = Da()._dirtyElements;
		return e !== null && e.has(this.__key);
	}
	isLastChild() {
		let e = this.getLatest(), t = this.getParentOrThrow().getLastChild();
		return t !== null && t.is(e);
	}
	getAllTextNodes() {
		let e = [];
		for (let t of Ic(this)) {
			let n = Lc(this, t);
			P(n) && e.push(...n.getAllTextNodes());
		}
		let t = this.getFirstChild();
		for (; t !== null;) {
			if (A(t) && e.push(t), P(t)) {
				let n = t.getAllTextNodes();
				e.push(...n);
			}
			t = t.getNextSibling();
		}
		return e;
	}
	getFirstDescendant() {
		let e = this.getFirstChild();
		for (; P(e);) {
			let t = e.getFirstChild();
			if (t === null) break;
			e = t;
		}
		return e;
	}
	getLastDescendant() {
		let e = this.getLastChild();
		for (; P(e);) {
			let t = e.getLastChild();
			if (t === null) break;
			e = t;
		}
		return e;
	}
	getDescendantByIndex(e) {
		let t = this.getChildren(), n = t.length;
		if (e >= n) {
			let e = t[n - 1];
			return P(e) && e.getLastDescendant() || e || null;
		}
		let r = t[e];
		return P(r) && r.getFirstDescendant() || r || null;
	}
	getFirstChild() {
		let e = this.getLatest().__first;
		return e === null ? null : R(e);
	}
	getFirstChildOrThrow() {
		let e = this.getFirstChild();
		return e === null && x(45, this.__key), e;
	}
	getLastChild() {
		let e = this.getLatest().__last;
		return e === null ? null : R(e);
	}
	getLastChildOrThrow() {
		let e = this.getLastChild();
		return e === null && x(96, this.__key), e;
	}
	getChildAtIndex(e) {
		let t = this.getChildrenSize(), n, r;
		if (e < t / 2) {
			for (n = this.getFirstChild(), r = 0; n !== null && r <= e;) {
				if (r === e) return n;
				n = n.getNextSibling(), r++;
			}
			return null;
		}
		for (n = this.getLastChild(), r = t - 1; n !== null && r >= e;) {
			if (r === e) return n;
			n = n.getPreviousSibling(), r--;
		}
		return null;
	}
	getTextContent() {
		let e = Wc(this), t = this.getChildren(), n = t.length;
		for (let r = 0; r < n; r++) {
			let i = t[r];
			e += i.getTextContent(), P(i) && r !== n - 1 && !i.isInline() && (e += _e);
		}
		return e;
	}
	getTextContentSize() {
		let e = function(e) {
			let t = 0;
			for (let n of Ic(e)) {
				let r = Lc(e, n);
				r !== null && (t += r.getTextContentSize());
			}
			return t;
		}(this), t = this.getChildren(), n = t.length;
		for (let r = 0; r < n; r++) {
			let i = t[r];
			e += i.getTextContentSize(), P(i) && r !== n - 1 && !i.isInline() && (e += 2);
		}
		return e;
	}
	getDirection() {
		return this.getLatest().__dir;
	}
	getTextFormat() {
		return this.getLatest().__textFormat;
	}
	hasFormat(e) {
		if (e !== "") {
			let t = xe[e];
			return (this.getFormat() & t) !== 0;
		}
		return !1;
	}
	hasTextFormat(e) {
		let t = ye[e];
		return (this.getTextFormat() & t) !== 0;
	}
	getFormatFlags(e, t) {
		return Io(this.getLatest().__textFormat, e, t);
	}
	getTextStyle() {
		return this.getLatest().__textStyle;
	}
	select(e, t) {
		Ca();
		let n = N(), r = e, i = t, a = this.getChildrenSize();
		if (!this.canBeEmpty()) {
			if (e === 0 && t === 0) {
				let e = this.getFirstChild();
				if (A(e) || P(e)) return e.select(0, 0);
			} else if (!(e !== void 0 && e !== a || t !== void 0 && t !== a)) {
				let e = this.getLastChild();
				if (A(e) || P(e)) return e.select();
			}
		}
		r === void 0 && (r = a), i === void 0 && (i = a);
		let o = this.__key;
		return j(n) ? (n.anchor.set(o, r, "element"), n.focus.set(o, i, "element"), n.dirty = !0, n) : Ki(o, r, o, i, "element", "element");
	}
	selectStart() {
		let e = this.getFirstDescendant();
		return e ? e.selectStart() : this.select();
	}
	selectEnd() {
		let e = this.getLastDescendant();
		return e ? e.selectEnd() : this.select();
	}
	clear() {
		let e = this.getWritable();
		return this.getChildren().forEach((e) => e.remove()), e;
	}
	append(...e) {
		return this.splice(this.getChildrenSize(), 0, e);
	}
	setDirection(e) {
		let t = this.getWritable();
		return t.__dir = e, t;
	}
	setFormat(e) {
		return this.getWritable().__format = e !== "" && xe[e] || 0, this;
	}
	setStyle(e) {
		return this.getWritable().__style = e || "", this;
	}
	setTextFormat(e) {
		let t = this.getWritable();
		return t.__textFormat = e, t;
	}
	setTextStyle(e) {
		let t = this.getWritable();
		return t.__textStyle = e, t;
	}
	setIndent(e) {
		return this.getWritable().__indent = e, this;
	}
	splice(e, t, n) {
		Br(this) && x(324, this.__key, this.__type);
		let r = this.getChildrenSize(), i = this.getWritable();
		e + t <= r || x(226, String(e), String(t), String(r));
		for (let e of n);
		let a = i.__key, o = [], s = [], c = this.getChildAtIndex(e + t), l = null, u = r - t + n.length;
		if (e !== 0) if (e === r) l = this.getLastChild();
		else {
			let t = this.getChildAtIndex(e);
			t !== null && (l = t.getPreviousSibling());
		}
		if (t > 0) {
			let e = l === null ? this.getFirstChild() : l.getNextSibling();
			for (let n = 0; n < t; n++) {
				e === null && x(100);
				let t = e.getNextSibling(), n = e.__key;
				zo(e.getWritable()), s.push(n), e = t;
			}
		}
		let d = l;
		for (let e of n) {
			d !== null && e.is(d) && (l = d = d.getPreviousSibling());
			let t = e.getWritable();
			t.__parent === a && u--, zo(t);
			let n = e.__key;
			if (d === null) i.__first = n, t.__prev = null;
			else {
				let e = d.getWritable();
				e.__next = n, t.__prev = e.__key;
			}
			e.__key === a && x(76), t.__parent = a, o.push(n), d = e;
		}
		if (e + t === r) d !== null && (d.getWritable().__next = null, i.__last = d.__key);
		else if (c !== null) {
			let e = c.getWritable();
			if (d !== null) {
				let t = d.getWritable();
				e.__prev = d.__key, t.__next = c.__key;
			} else e.__prev = null;
		}
		if (i.__size = u, s.length) {
			let e = N();
			if (j(e)) {
				let t = new Set(s), n = new Set(o), { anchor: r, focus: i } = e;
				Ka(r, t, n) && ea(r, r.getNode(), this, l, c), Ka(i, t, n) && ea(i, i.getNode(), this, l, c), u !== 0 || this.canBeEmpty() || ks(this) || this.remove();
			}
		}
		return i;
	}
	getDOMSlot(e) {
		return new Ae(e);
	}
	exportDOM(e) {
		let { element: t } = super.exportDOM(e);
		if (V(t)) {
			let e = this.getIndent();
			e > 0 && (t.style.paddingInlineStart = 40 * e + "px", t.setAttribute("data-lexical-indent", String(e)));
			let n = this.getDirection();
			n && (t.dir = n);
		}
		return { element: t };
	}
	exportJSON() {
		let e = {
			children: [],
			direction: this.getDirection(),
			format: this.getFormatType(),
			indent: this.getIndent(),
			...super.exportJSON()
		}, t = this.getTextFormat(), n = this.getTextStyle();
		return t === 0 && n === "" || ks(this) || this.getChildren().some(A) || (t !== 0 && (e.textFormat = t), n !== "" && (e.textStyle = n)), e;
	}
	updateFromJSON(e) {
		return super.updateFromJSON(e).setFormat(e.format).setIndent(e.indent).setDirection(e.direction).setTextFormat(e.textFormat || 0).setTextStyle(e.textStyle || "");
	}
	insertNewAfter(e, t) {
		return null;
	}
	canIndent() {
		return !0;
	}
	collapseAtStart(e) {
		return !1;
	}
	excludeFromCopy(e) {
		return !1;
	}
	canReplaceWith(e) {
		return !0;
	}
	canInsertAfter(e) {
		return !0;
	}
	canBeEmpty() {
		return !0;
	}
	canInsertTextBefore() {
		return !0;
	}
	canInsertTextAfter() {
		return !0;
	}
	isInline() {
		return !1;
	}
	isShadowRoot() {
		return !1;
	}
	canMergeWith(e) {
		return !1;
	}
	extractWithChild(e, t, n) {
		return !1;
	}
	canMergeWhenEmpty() {
		return !1;
	}
	reconcileObservedMutation(e, t) {
		let n = oc(this, e, t), r = n.getFirstChild();
		for (let e = this.getFirstChild(); e; e = e.getNextSibling()) {
			let i = t.getElementByKey(e.getKey());
			i !== null && (r == null ? (n.insertChild(i), r = i) : r !== i && n.replaceChild(i, r), r = r.nextSibling);
		}
	}
};
function P(e) {
	return e instanceof Ga;
}
function Ka(e, t, n) {
	let r = e.getNode();
	for (; r;) {
		let e = r.__key;
		if (t.has(e) && !n.has(e)) return !0;
		r = r.getParent();
	}
	return !1;
}
var qa = class extends Hr {
	__slotHost;
	__slots;
	constructor(e) {
		super(e), this.__slotHost = null, this.__slots = null;
	}
	afterCloneFrom(e) {
		super.afterCloneFrom(e), this.__key === e.__key && (this.__slotHost = e.__slotHost, this.__slotHost !== null && this.__parent !== null && x(383, this.__key, String(this.__slotHost), String(this.__parent)), this.__slots = e.__slots);
	}
	decorate(e, t) {
		return null;
	}
	isIsolated() {
		return !1;
	}
	isInline() {
		return !0;
	}
	isKeyboardSelectable() {
		return !0;
	}
};
function F(e) {
	return e instanceof qa;
}
var Ja = class e extends Ga {
	__cachedText;
	static getType() {
		return "root";
	}
	static clone() {
		return new e();
	}
	constructor() {
		super("root"), this.__cachedText = null;
	}
	getTopLevelElementOrThrow() {
		x(51);
	}
	getTextContent() {
		let e = this.__cachedText;
		return e === null || !Sa() && Da()._dirtyType !== 0 ? super.getTextContent() : e;
	}
	remove() {
		x(52);
	}
	replace(e) {
		x(53);
	}
	insertBefore(e) {
		x(54);
	}
	insertAfter(e) {
		x(55);
	}
	updateDOM(e, t) {
		return !1;
	}
	splice(e, t, n) {
		for (let e of n) P(e) || F(e) || x(282);
		return super.splice(e, t, n);
	}
	static importJSON(e) {
		return Yo().updateFromJSON(e);
	}
	collapseAtStart() {
		return !0;
	}
};
function Ya(e) {
	return e instanceof Ja;
}
function Xa(e) {
	return new eo(Ie(e._nodeMap), null, e._slotsUsed);
}
function Za() {
	return new eo(/* @__PURE__ */ new Map([["root", new Ja()]]), null, !1);
}
function Qa(e) {
	let t = e.exportJSON(), n = e.constructor;
	if (t.type !== n.getType() && x(130, n.name), P(e)) {
		let r = t.children;
		Array.isArray(r) || x(59, n.name);
		let i = e.getChildren();
		for (let e = 0; e < i.length; e++) {
			let t = Qa(i[e]);
			r.push(t);
		}
	}
	let r = Ic(e);
	if (r.length > 0) {
		let i = {};
		for (let t of r) {
			let r = Lc(e, t);
			r === null && x(366, n.name, t), i[t] = Qa(r);
		}
		t.$slots = i;
	}
	return t;
}
function $a(e) {
	return e instanceof eo;
}
var eo = class e {
	_nodeMap;
	_selection;
	_flushSync;
	_readOnly;
	_parsed;
	_slotsUsed;
	constructor(e, t = null, n = !1) {
		this._nodeMap = e, this._selection = t || null, this._flushSync = !1, this._readOnly = !1, this._parsed = !1, this._slotsUsed = n;
	}
	isEmpty() {
		return this._nodeMap.size === 1 && this._selection === null;
	}
	read(e, t) {
		return Ia(t && t.editor || null, this, e);
	}
	clone(t) {
		let n = new e(this._nodeMap, t === void 0 ? this._selection : t, this._slotsUsed);
		return n._readOnly = !0, n;
	}
	toJSON() {
		return Ia(null, this, () => ({ root: Qa(Yo()) }));
	}
}, to = class extends Ga {
	static getType() {
		return "artificial";
	}
	createDOM(e) {
		return B().createElement("div");
	}
}, no = class e extends Hr {
	static getType() {
		return "linebreak";
	}
	static clone(t) {
		return new e(t.__key);
	}
	constructor(e) {
		super(e);
	}
	getTextContent() {
		return "\n";
	}
	createDOM() {
		return B().createElement("br");
	}
	updateDOM() {
		return !1;
	}
	isInline() {
		return !0;
	}
	static importDOM() {
		return { br: (e) => oo(e) || so(e) ? null : {
			conversion: ro,
			priority: 0
		} };
	}
	static importJSON(e) {
		return io().updateFromJSON(e);
	}
};
function ro(e) {
	return { node: io() };
}
function io() {
	return js(new no());
}
function ao(e) {
	return e instanceof no;
}
function oo(e) {
	let t = e.parentElement;
	if (t !== null && ic(t)) {
		let n = t.firstChild;
		if (n === e || n.nextSibling === e && co(n)) {
			let n = t.lastChild;
			if (n === e || n.previousSibling === e && co(n)) return !0;
		}
	}
	return !1;
}
function so(e) {
	let t = e.parentElement;
	if (t !== null && ic(t)) {
		let n = t.firstChild;
		if (n === e || n.nextSibling === e && co(n)) return !1;
		let r = t.lastChild;
		if (r === e || r.previousSibling === e && co(r)) return !0;
	}
	return !1;
}
function co(e) {
	return No(e) && /^( |\t|\r?\n)+$/.test(e.textContent || "");
}
var lo = class e extends Ga {
	static getType() {
		return "paragraph";
	}
	static clone(t) {
		return new e(t.__key);
	}
	createDOM(e) {
		let t = B().createElement("p"), n = ps(e.theme, "paragraph");
		return n !== void 0 && t.classList.add(...n), t;
	}
	updateDOM(e, t, n) {
		return !1;
	}
	static importDOM() {
		return { p: (e) => ({
			conversion: uo,
			priority: 0
		}) };
	}
	exportDOM(e) {
		let { element: t } = super.exportDOM(e);
		if (V(t)) {
			this.isEmpty() && t.append(B().createElement("br"));
			let e = this.getFormatType();
			e && (t.style.textAlign = e);
		}
		return { element: t };
	}
	static importJSON(e) {
		return I().updateFromJSON(e);
	}
	exportJSON() {
		let e = super.exportJSON();
		if (e.textFormat === void 0 || e.textStyle === void 0) {
			let t = this.getChildren().find(A);
			t ? (e.textFormat = t.getFormat(), e.textStyle = t.getStyle()) : (e.textFormat = this.getTextFormat(), e.textStyle = this.getTextStyle());
		}
		return e;
	}
	insertNewAfter(e, t) {
		let n = I();
		n.setTextFormat(e.format), n.setTextStyle(e.style);
		let r = this.getDirection();
		return n.setDirection(r), n.setFormat(this.getFormatType()), n.setStyle(this.getStyle()), this.insertAfter(n, t), n;
	}
	collapseAtStart() {
		let e = this.getChildren();
		if (e.length === 0 || A(e[0]) && e[0].getTextContent().trim() === "") {
			if (this.getNextSibling() !== null) return this.selectNext(), this.remove(), !0;
			if (this.getPreviousSibling() !== null) return this.selectPrevious(), this.remove(), !0;
		}
		return !1;
	}
};
function uo(e) {
	let t = I();
	if (gc(t, e), mc(e, t), t.getFormatType() === "") {
		let n = e.getAttribute("align");
		n && n && n in xe && t.setFormat(n);
	}
	return hc(t, e), { node: t };
}
function I() {
	return js(new lo());
}
function fo(e) {
	return e instanceof lo;
}
function po(e) {
	console.warn(e);
}
function mo(e, t, n, r, i) {
	let a = e._keyToDOMMap;
	a.clear(), e._editorState = Za(), e._pendingEditorState = r, e._compositionKey = null, e._dirtyType = 0, e._cloneNotNeeded.clear(), e._dirtyLeaves = /* @__PURE__ */ new Set(), e._dirtyElements.clear(), e._normalizedNodes = /* @__PURE__ */ new Set(), i && i.preserveUpdateQueue || (e._updateTags = /* @__PURE__ */ new Set(), e._updates = [], e._cascadeCount = 0), e._blockCursorElement = null, e._inputState.handledSelectionCommandTimeoutId !== null && clearTimeout(e._inputState.handledSelectionCommandTimeoutId), e._inputState = {
		collapsedSelectionFormat: {
			format: 0,
			key: "root",
			offset: 0,
			style: "",
			timeStamp: 0
		},
		compositionEndData: "",
		compositionPhase: "idle",
		hadOrphanedCompositionEvents: !1,
		handledSelectionCommandTimeoutId: null,
		isInsertLineBreak: !1,
		isInsertTextAfterHandledSelectionCommand: !1,
		isSelectionChangeFromDOMUpdate: !1,
		isSelectionChangeFromMouseDown: !1,
		lastBeforeInputInsertTextTimeStamp: 0,
		lastKeyCode: null,
		lastKeyDownTimeStamp: 0,
		postDeleteSelectionToRestore: null,
		unprocessedBeforeInputData: null
	};
	let o = e._observer;
	o !== null && (o.disconnect(), e._observer = null), t !== null && (t.textContent = "", function(e, t) {
		let n = `__lexicalKey_${t._key}`;
		delete e[n];
	}(t, e)), n !== null && (n.textContent = "", a.set("root", n), Wo(n, e, "root"));
}
function ho(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
	for (let { klass: r, ownNodeConfig: i } of wc(e)) {
		let e = r.transform;
		if (!n.has(e)) {
			n.add(e);
			let i = r.transform();
			i && t.add(i);
		}
		if (i) {
			let e = i.$transform;
			e && t.add(e);
		}
	}
	return t;
}
var go = {
	$createDOM: (e, t) => e.createDOM(t._config, t),
	$decorateDOM: (e, t, n, r) => {},
	$exportDOM: (e, t) => {
		let n = wo(t, e.getType());
		return n && n.exportDOM !== void 0 ? n.exportDOM(t, e) : e.exportDOM(t);
	},
	$extractWithChild: (e, t, n, r, i) => P(e) && e.extractWithChild(t, n, r),
	$getDOMSlot: (e, t, n) => e.getDOMSlot(t),
	$getSlotTargetElement: (e, t, n, r) => null,
	$shouldExclude: (e, t, n) => P(e) && e.excludeFromCopy("html"),
	$shouldInclude: (e, t, n) => !t || e.isSelected(t),
	$updateDOM: (e, t, n, r) => e.updateDOM(t, n, r._config)
};
function L(e) {
	let t = e || {}, n = Aa(), r = t.theme || {}, i = e === void 0 ? n : t.parentEditor || null, a = t.disableEvents || !1, o = Za(), s = t.namespace || (i === null ? ts() : i._config.namespace), c = t.editorState, l = [
		Ja,
		ai,
		no,
		gi,
		lo,
		to,
		...t.nodes || []
	], { onError: u, onWarn: d, html: f } = t, p = t.editable === void 0 || t.editable, m;
	if (e === void 0 && n !== null) m = n._nodes;
	else {
		m = /* @__PURE__ */ new Map();
		for (let e = 0; e < l.length; e++) {
			let n = l[e], r = null, i = null;
			if (n && typeof n == "object") {
				let e = n;
				n = e.replace, r = e.with, i = e.withKlass || null;
			}
			if (typeof n != "function" || !n.prototype || !(n === Hr || n.prototype instanceof Hr)) {
				let r = "<unknown>";
				try {
					r = JSON.parse(Ne);
				} catch {}
				x(365, String(e - l.length + (t.nodes ? t.nodes.length : 0)), typeof n == "function" ? `${n.name}${typeof n.getType == "function" ? ` (type ${String(n.getType())})` : ""}` : String(n), String(r));
			}
			Cc(n);
			let a = n.getType(), o = ho(n);
			m.set(a, {
				exportDOM: f && f.export ? f.export.get(n) : void 0,
				klass: n,
				replace: r,
				replaceWithKlass: i,
				sharedNodeState: et(l[e]),
				transforms: o
			});
		}
	}
	let h = new yo(o, i, m, {
		disableEvents: a,
		dom: {
			...go,
			...e && e.dom
		},
		namespace: s,
		theme: r
	}, u || console.error, d || po, function(e, t) {
		let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), i = (e) => {
			Object.keys(e).forEach((t) => {
				let r = n.get(t);
				r === void 0 && (r = [], n.set(t, r)), r.push(e[t]);
			});
		};
		return e.forEach((e) => {
			let t = e.klass.importDOM;
			if (t == null || r.has(t)) return;
			r.add(t);
			let n = t.call(e.klass);
			n !== null && i(n);
		}), t && i(t), n;
	}(m, f ? f.import : void 0), p, e);
	return c !== void 0 && (h._pendingEditorState = c, h._dirtyType = 2), function(e) {
		e.registerCommand(mn, wr, 0), e.registerCommand(hn, Tr, 0), e.registerCommand(gn, Er, 0), e.registerCommand(_n, Dr, 0), e.registerCommand(An, Ar, 0);
	}(h), h;
}
function _o(e, t) {
	let n = e.get(t);
	e.delete(t), n && n();
}
function vo(e, t, n) {
	return e.set(t, n), _o.bind(null, e, t);
}
var yo = class {
	static version;
	_headless;
	_parentEditor;
	_rootElement;
	_editorState;
	_pendingEditorState;
	_compositionKey;
	_deferred;
	_keyToDOMMap;
	_updates;
	_updating;
	_cascadeCount;
	_listeners;
	_commands;
	_nodes;
	_decorators;
	_pendingDecorators;
	_config;
	_dirtyType;
	_cloneNotNeeded;
	_dirtyLeaves;
	_dirtyElements;
	_normalizedNodes;
	_updateTags;
	_observer;
	_key;
	_onError;
	_onWarn;
	_htmlConversions;
	_window;
	_editable;
	_blockCursorElement;
	_slotsUsed;
	_inputState;
	_createEditorArgs;
	constructor(e, t, n, r, i, a, o, s, c) {
		this._createEditorArgs = c, this._parentEditor = t, this._rootElement = null, this._editorState = e, this._pendingEditorState = null, this._compositionKey = null, this._deferred = [], this._keyToDOMMap = new Le(), this._updates = [], this._updating = !1, this._cascadeCount = 0, this._listeners = {
			decorator: /* @__PURE__ */ new Map(),
			editable: /* @__PURE__ */ new Map(),
			mutation: /* @__PURE__ */ new Map(),
			root: /* @__PURE__ */ new Map(),
			textcontent: /* @__PURE__ */ new Map(),
			update: /* @__PURE__ */ new Map()
		}, this._commands = /* @__PURE__ */ new Map(), this._config = r, this._nodes = n, this._decorators = {}, this._pendingDecorators = null, this._dirtyType = 0, this._cloneNotNeeded = /* @__PURE__ */ new Set(), this._dirtyLeaves = /* @__PURE__ */ new Set(), this._dirtyElements = /* @__PURE__ */ new Map(), this._normalizedNodes = /* @__PURE__ */ new Set(), this._updateTags = /* @__PURE__ */ new Set(), this._observer = null, this._key = ts(), this._onError = i, this._onWarn = a, this._htmlConversions = o, this._editable = s, this._headless = t !== null && t._headless, this._window = null, this._blockCursorElement = null, this._slotsUsed = !1, this._inputState = {
			collapsedSelectionFormat: {
				format: 0,
				key: "root",
				offset: 0,
				style: "",
				timeStamp: 0
			},
			compositionEndData: "",
			compositionPhase: "idle",
			hadOrphanedCompositionEvents: !1,
			handledSelectionCommandTimeoutId: null,
			isInsertLineBreak: !1,
			isInsertTextAfterHandledSelectionCommand: !1,
			isSelectionChangeFromDOMUpdate: !1,
			isSelectionChangeFromMouseDown: !1,
			lastBeforeInputInsertTextTimeStamp: 0,
			lastKeyCode: null,
			lastKeyDownTimeStamp: 0,
			postDeleteSelectionToRestore: null,
			unprocessedBeforeInputData: null
		};
	}
	isComposing() {
		return this._compositionKey != null;
	}
	registerUpdateListener(e) {
		return vo(this._listeners.update, e);
	}
	registerEditableListener(e) {
		return vo(this._listeners.editable, e);
	}
	registerDecoratorListener(e) {
		return vo(this._listeners.decorator, e);
	}
	registerTextContentListener(e) {
		return vo(this._listeners.textcontent, e);
	}
	registerRootListener(e) {
		let t = this._listeners.root;
		return Xl(vo(t, e, e(this._rootElement, null) || void 0), () => function(e, t, n) {
			let r = e.get(t);
			r && r(), e.set(t, t(...n) || void 0);
		}(t, e, [null, this._rootElement]));
	}
	registerCommand(e, t, n) {
		n === void 0 && x(35);
		let r = this._commands;
		r.has(e) || r.set(e, [
			new Pe(),
			new Pe(),
			new Pe(),
			new Pe(),
			new Pe()
		]);
		let i = r.get(e);
		i === void 0 && x(36, String(e));
		let a = function(e) {
			return 7 & e;
		}(n), o = i[a];
		return a === n ? o.addBack(t) : o.addFront(t), () => {
			o.delete(t), i.every((e) => e.size === 0) && r.delete(e);
		};
	}
	registerMutationListener(e, t, n) {
		let r = this.resolveRegisteredNodeAfterReplacements(this.getRegisteredNode(e)).klass, i = this._listeners.mutation, a = i.get(t);
		a === void 0 && (a = /* @__PURE__ */ new Set(), i.set(t, a)), a.add(r);
		let o = n && n.skipInitialization;
		return o !== void 0 && o || this.initializeMutationListener(t, r), () => {
			a.delete(r), a.size === 0 && i.delete(t);
		};
	}
	getRegisteredNode(e) {
		let t = this._nodes.get(e.getType());
		return t === void 0 && x(37, e.name), t;
	}
	resolveRegisteredNodeAfterReplacements(e) {
		for (; e.replaceWithKlass;) e = this.getRegisteredNode(e.replaceWithKlass);
		return e;
	}
	initializeMutationListener(e, t) {
		let n = this._editorState, r = dc(n).get(t.getType());
		if (!r) return;
		let i = /* @__PURE__ */ new Map();
		for (let e of r.keys()) i.set(e, "created");
		i.size > 0 && e(i, {
			dirtyLeaves: /* @__PURE__ */ new Set(),
			prevEditorState: n,
			updateTags: /* @__PURE__ */ new Set(["registerMutationListener"])
		});
	}
	registerNodeTransformToKlass(e, t) {
		let n = this.getRegisteredNode(e);
		return n.transforms.add(t), n;
	}
	registerNodeTransform(e, t) {
		let n = this.registerNodeTransformToKlass(e, t), r = [n], i = n.replaceWithKlass;
		if (i != null) {
			let e = this.registerNodeTransformToKlass(i, t);
			r.push(e);
		}
		return function(e, t) {
			let n = dc(e.getEditorState()), r = [];
			for (let e of t) {
				let t = n.get(e);
				t && r.push(t);
			}
			r.length !== 0 && e.update(() => {
				for (let e of r) for (let t of e.keys()) {
					let e = R(t);
					e && e.markDirty();
				}
			}, e._pendingEditorState === null ? { tag: Gr } : void 0);
		}(this, r.map((e) => e.klass.getType())), () => {
			r.forEach((e) => e.transforms.delete(t));
		};
	}
	hasNode(e) {
		return this._nodes.has(e.getType());
	}
	hasNodes(e) {
		return e.every(this.hasNode.bind(this));
	}
	dispatchCommand(e, t) {
		return z(this, e, t);
	}
	getDecorators() {
		return this._decorators;
	}
	getRootElement() {
		return this._rootElement;
	}
	getKey() {
		return this._key;
	}
	setRootElement(e) {
		let t = this._rootElement;
		if (e !== t) {
			let n = ps(this._config.theme, "root"), r = this._pendingEditorState || this._editorState;
			if (this._rootElement = e, mo(this, t, e, r, { preserveUpdateQueue: !0 }), t !== null && (this._config.disableEvents || Ir(t), n != null && t.classList.remove(...n)), e !== null) {
				let t = ws(e), r = e.style;
				r.userSelect = "text", r.whiteSpace = "pre-wrap", r.wordBreak = "break-word", e.setAttribute("data-lexical-editor", "true"), this._window = t, this._dirtyType = 2, Je(this), this._updateTags.add(Gr), La(this), this._config.disableEvents || function(e, t) {
					let n = e.ownerDocument;
					dr.set(e, n);
					let r = fr.get(n);
					r === void 0 && (r = {
						editors: /* @__PURE__ */ new Set(),
						hasShadowEditor: void 0
					}, fr.set(n, r)), r.editors.add(t), r.hasShadowEditor = void 0, e.__lexicalEditor = t;
					let i = jr(e);
					i.push(pr.register(n));
					for (let n = 0; n < ur.length; n++) {
						let [r, a] = ur[n], o = typeof a == "function" ? (e) => {
							Fr(e) || (Pr(e), (t.isEditable() || r === "click") && a(e, t));
						} : (e) => {
							if (Fr(e)) return;
							Pr(e);
							let n = t.isEditable();
							switch (r) {
								case "cut": return n && z(t, Qn, e);
								case "copy": return z(t, Zn, e);
								case "paste": return n && z(t, Sn, e);
								case "dragstart": return n && z(t, Jn, e);
								case "dragover": return n && z(t, Yn, e);
								case "dragend": return n && z(t, Xn, e);
								case "focus": return n && z(t, ir, e);
								case "blur": return n && z(t, ar, e);
								case "drop": return n && z(t, Kn, e);
							}
						};
						i.push(cr(e, r, o));
					}
				}(e, this), n != null && e.classList.add(...n);
			} else this._window = null, this._updateTags.add(Gr), La(this);
			Ra("root", this, !1, e, t);
		}
	}
	getElementByKey(e) {
		return this._keyToDOMMap.get(e) || null;
	}
	getEditorState() {
		return this._editorState;
	}
	setEditorState(e, t) {
		e.isEmpty() && x(38);
		let n = e;
		n._readOnly && (n = Xa(e), n._selection = e._selection ? e._selection.clone() : null), qe(this);
		let r = this._pendingEditorState, i = t === void 0 ? null : t.tag;
		r === null || r.isEmpty() || (i != null && this._updateTags.add(i), La(this)), this._pendingEditorState = n, this._dirtyType = 2, this._dirtyElements.set("root", !1), this._compositionKey = null, this._slotsUsed = this._slotsUsed || e._slotsUsed, Ua(this, () => {
			if (i && this._updateTags.add(i), e._parsed) for (let [e, t] of n._nodeMap.entries()) P(t) ? this._dirtyElements.set(e, !0) : this._dirtyLeaves.add(e);
		}, { discrete: !this._updating || void 0 });
	}
	parseEditorState(e, t) {
		return function(e, t, n) {
			let r = Za(), i = ma, a = ga, o = ha, s = t._dirtyElements, c = t._dirtyLeaves, l = t._cloneNotNeeded, u = t._dirtyType;
			t._dirtyElements = /* @__PURE__ */ new Map(), t._dirtyLeaves = /* @__PURE__ */ new Set(), t._cloneNotNeeded = /* @__PURE__ */ new Set(), t._dirtyType = 0, ma = r, ga = !1, ha = t, xo(null);
			try {
				let i = t._nodes;
				Fa(e.root, i), n && n(), r._readOnly = !0, r._parsed = !0;
			} catch (e) {
				e instanceof Error && t._onError(e);
			} finally {
				t._dirtyElements = s, t._dirtyLeaves = c, t._cloneNotNeeded = l, t._dirtyType = u, ma = i, ga = a, ha = o;
			}
			return r;
		}(typeof e == "string" ? JSON.parse(e) : e, this, t);
	}
	read(...e) {
		let [t, n] = e.length === 1 ? ["force-commit", e[0]] : e;
		return t === "force-commit" && La(this), (t === "pending" ? this._pendingEditorState || this._editorState : this.getEditorState()).read(n, { editor: this });
	}
	update(e, t) {
		(function(e, t, n) {
			e._updating ? e._updates.push([t, n]) : Ha(e, t, n);
		})(this, e, t);
	}
	focus(e, t = {}) {
		let n = this._rootElement;
		n !== null && (n.setAttribute("autocapitalize", "off"), Ua(this, () => {
			let r = N(), i = Yo();
			r === null ? i.getChildrenSize() !== 0 && (t.defaultSelection === "rootStart" ? i.selectStart() : i.selectEnd()) : r.dirty || Xo(r.clone()), xs("focus"), Ss(() => {
				n.removeAttribute("autocapitalize"), e && e();
			});
		}), this._pendingEditorState === null && n.removeAttribute("autocapitalize"));
	}
	blur() {
		let e = this._rootElement;
		e !== null && e.blur();
		let t = Is(this._window);
		t !== null && t.removeAllRanges();
	}
	isEditable() {
		return this._editable;
	}
	setEditable(e) {
		this._editable !== e && (this._editable = e, Ra("editable", this, !0, e), this._slotsUsed && this.update(() => Oa()));
	}
	toJSON() {
		return { editorState: this._editorState.toJSON() };
	}
};
yo.version = Ne;
var bo = null;
function xo(e) {
	bo = e;
}
var So = 1;
function Co(e, t) {
	let n = wo(e, t);
	return n === void 0 && x(30, t), n;
}
function wo(e, t) {
	return e._nodes.get(t);
}
var To = typeof queueMicrotask == "function" ? queueMicrotask : (e) => {
	Promise.resolve().then(e);
};
function Eo(e, t) {
	let n = t === void 0 ? (() => {
		let t = e.getRootNode();
		return Po(t) || Rs(t) ? Xs(t) : null;
	})() : t;
	if (!V(n) || n.hasAttribute("data-lexical-slot")) return !1;
	let r = Ko(n), i = n.nodeName;
	return Ur(r) && (i === "INPUT" || i === "TEXTAREA" || n.contentEditable === "true" && Ao(n) == null);
}
function Do(e, t, n) {
	let r = e.getRootElement();
	if (!r) return !1;
	try {
		if (!t || !r.contains(t) || !r.contains(n)) return !1;
	} catch {
		return !1;
	}
	return ko(t) === e && e.read("latest", () => !Eo(t));
}
function Oo(e) {
	return e instanceof yo;
}
function ko(e) {
	let t = e;
	for (; t != null;) {
		let e = Ao(t);
		if (Oo(e)) return e;
		t = ys(t);
	}
	return null;
}
function Ao(e) {
	return e ? e.__lexicalEditor : null;
}
function jo(e) {
	return vi(e) || e.isToken();
}
function Mo(e) {
	return jo(e) || e.isSegmented();
}
function No(e) {
	return $s(e) && e.nodeType === 3;
}
function Po(e) {
	return $s(e) && e.nodeType === 9;
}
function Fo(e) {
	let t = e;
	for (; t != null;) {
		if (No(t)) return t;
		t = t.firstChild;
	}
	return null;
}
function Io(e, t, n) {
	let r = ye[t];
	if (n !== null && (e & r) === (n & r)) return e;
	let i = e ^ r;
	return t === "subscript" ? i &= ~ye.superscript : t === "superscript" ? i &= ~ye.subscript : t === "lowercase" ? (i &= ~ye.uppercase, i &= ~ye.capitalize) : t === "uppercase" ? (i &= ~ye.lowercase, i &= ~ye.capitalize) : t === "capitalize" && (i &= ~ye.lowercase, i &= ~ye.uppercase), i;
}
function Lo(e) {
	return A(e) || ao(e) || F(e);
}
function Ro(e, t) {
	let n = function() {
		let e = bo;
		return bo = null, e;
	}();
	if ((t ||= n && n.__key) != null) return void (e.__key = t);
	Ca(), wa();
	let r = Da(), i = Ta(), a = "" + So++;
	i._nodeMap.set(a, e), P(e) ? r._dirtyElements.set(a, !0) : r._dirtyLeaves.add(a), r._cloneNotNeeded.add(a), r._dirtyType === 0 && (r._dirtyType = 1), e.__key = a;
}
function zo(e) {
	jc(e) !== null && x(380, e.__key, String(jc(e)));
	let t = e.getParent();
	if (t !== null) {
		let n = e.getWritable(), r = t.getWritable(), i = e.getPreviousSibling(), a = e.getNextSibling(), o = a === null ? null : a.__key, s = i === null ? null : i.__key, c = i === null ? null : i.getWritable(), l = a === null ? null : a.getWritable();
		i === null && (r.__first = o), a === null && (r.__last = s), c !== null && (c.__next = o), l !== null && (l.__prev = s), n.__prev = null, n.__next = null, n.__parent = null, r.__size--;
	}
}
function Bo(e) {
	wa(), Br(e) && x(323, e.__key, e.__type);
	let t = e.getLatest(), n = t.__parent === null ? Ac(t) ? t.__slotHost : null : t.__parent, r = Ta(), i = Da(), a = r._nodeMap, o = i._dirtyElements;
	n !== null && function(e, t, n) {
		let r = e;
		for (; r !== null;) {
			if (n.has(r)) return;
			let e = t.get(r);
			if (e === void 0) break;
			n.set(r, !1), r = e.__parent === null ? Ac(e) ? e.__slotHost : null : e.__parent;
		}
	}(n, a, o);
	let s = t.__key;
	i._dirtyType === 0 && (i._dirtyType = 1), P(e) ? o.set(s, !0) : i._dirtyLeaves.add(s);
}
function Vo(e) {
	Ca();
	let t = Da(), n = t._compositionKey;
	if (e !== n) {
		if (t._compositionKey = e, n !== null) {
			let e = R(n);
			e !== null && e.getWritable();
		}
		if (e !== null) {
			let t = R(e);
			t !== null && t.getWritable();
		}
	}
}
function Ho() {
	return Sa() ? null : Da()._compositionKey;
}
function R(e, t) {
	let n = (t || Ta())._nodeMap.get(e);
	return n === void 0 ? null : n;
}
function Uo(e, t) {
	let n = Go(e, Da());
	return n === void 0 ? null : R(n, t);
}
function Wo(e, t, n) {
	e[`__lexicalKey_${t._key}`] = n;
}
function Go(e, t) {
	return e[`__lexicalKey_${t._key}`];
}
function Ko(e, t) {
	let n = e;
	for (; n != null;) {
		let e = Uo(n, t);
		if (e !== null) return e;
		n = ys(n);
	}
	return null;
}
function qo(e) {
	let t = e._decorators, n = Object.assign({}, t);
	return e._pendingDecorators = n, n;
}
function Jo(e) {
	return e.read(() => Yo().getTextContent());
}
function Yo() {
	return Ta()._nodeMap.get("root");
}
function Xo(e) {
	Ca();
	let t = Ta();
	e !== null && (e.dirty = !0, e.setCachedNodes(null), j(e) && Da()._slotsUsed && Ui(e)), t._selection = e;
}
function Zo() {
	Ca(), qe(Da());
}
function Qo(e) {
	let t = function(e, t) {
		let n = e;
		for (; n != null;) {
			let e = Go(n, t);
			if (e !== void 0) return e;
			n = ys(n);
		}
		return null;
	}(e, Da());
	return t === null ? null : R(t);
}
function $o(e) {
	return /[\uD800-\uDBFF][\uDC00-\uDFFF]/g.test(e);
}
function es(e) {
	let t = [];
	for (let n = e; n !== null; n = n._parentEditor) t.push(n);
	return t;
}
function ts() {
	return Math.random().toString(36).replace(/[^a-z]+/g, "").substring(0, 5);
}
function ns(e) {
	return No(e) ? e.nodeValue : null;
}
function rs(e, t, n) {
	let r = Is(Ts(t));
	if (r === null) return;
	let i = Gs(r, t._rootElement), a = i.anchorNode, { anchorOffset: o, focusOffset: s } = i;
	if (a !== null) {
		let t = ns(a), r = Ko(a);
		if (t !== null && A(r)) {
			if ((t === ge || t === ve) && n) {
				let e = n.length;
				t = n, o = e, s = e;
			}
			t !== null && is(r, t, o, s, e);
		}
	}
}
function is(e, t, n, r, i) {
	let a = e;
	if (a.isAttached() && (i || !a.isDirty())) {
		let o = a.isComposing();
		if (a.isToken() && o) return;
		let s = t;
		if ((o || i) && (t.endsWith(ge) && (s = t.slice(0, -ge.length)), i)) {
			let e = ve, t;
			for (; (t = s.indexOf(e)) !== -1;) s = s.slice(0, t) + s.slice(t + e.length), n !== null && n > t && (n = Math.max(t, n - e.length)), r !== null && r > t && (r = Math.max(t, r - e.length));
		}
		let c = a.getTextContent();
		if (i || s !== c) {
			let t = N();
			if (s === "") {
				if (Vo(null), ae || re || ce) a.remove();
				else {
					let e = Da();
					as(a, "", t), setTimeout(() => {
						e.update(() => {
							a.isAttached() && a.getTextContent() === "" && a.remove();
						});
					}, 20);
				}
				return;
			}
			let i = a.getParent(), c = Zi(), l = a.getTextContentSize(), u = Ho(), d = a.getKey();
			if (a.isToken() && !o || u !== null && d === u && !o || j(c) && (i !== null && !i.canInsertTextBefore() && c.anchor.offset === 0 || c.anchor.key === e.__key && c.anchor.offset === 0 && !a.canInsertTextBefore() && !o || c.focus.key === e.__key && c.focus.offset === l && !a.canInsertTextAfter() && !o)) return void a.markDirty();
			if (!j(t) || n === null || r === null) return void as(a, s, t);
			if (t.setTextNodeRange(a, n, a, r), a.isSegmented()) {
				let e = mi(a.getTextContent());
				a.replace(e), a = e;
			}
			as(a, s, t);
		}
	}
}
function as(e, t, n) {
	if (e.setTextContent(t), j(n)) {
		let t = e.getKey(), r = !1;
		for (let i of ["anchor", "focus"]) {
			let a = n[i];
			a.type === "text" && a.key === t && (a.offset = dl(e, a.offset, "clamp"), r = !0);
		}
		r && (n._cachedNodes = null, n._cachedIsBackward = null);
	}
}
function os(e, t, n) {
	let r = t[n] || !1;
	return r === "any" || r === e[n];
}
function ss(e, t) {
	return os(e, t, "altKey") && os(e, t, "ctrlKey") && os(e, t, "shiftKey") && os(e, t, "metaKey");
}
function cs(e, t, n) {
	if (!ss(e, n)) return !1;
	if (e.key.toLowerCase() === t.toLowerCase()) return !0;
	if (t.length > 1 || e.key.length === 1 && e.key.charCodeAt(0) <= 127) return !1;
	if (e.code.startsWith("Digit") && /^\d$/.test(t)) return e.code === `Digit${t}`;
	let r = "Key" + t.toUpperCase();
	return e.code === r;
}
var ls = {
	ctrlKey: !ee,
	metaKey: ee
}, us = {
	altKey: ee,
	ctrlKey: !ee
};
function ds(e) {
	return e.key === "Backspace";
}
function fs(e) {
	let t = Yo();
	if (j(e)) {
		let t = e.anchor, n = e.focus, r = t.getNode();
		if (Ya(r)) return t.set(r.getKey(), 0, "element"), n.set(r.getKey(), r.getChildrenSize(), "element"), pt(e), e;
		let i = r.getTopLevelElementOrThrow(), a = i.getParent();
		if (a === null) return P(i) && (t.set(i.getKey(), 0, "element"), n.set(i.getKey(), i.getChildrenSize(), "element"), pt(e)), e;
		let o = a;
		return t.set(o.getKey(), 0, "element"), n.set(o.getKey(), o.getChildrenSize(), "element"), pt(e), e;
	}
	{
		let e = t.select(0, t.getChildrenSize());
		return Xo(pt(e)), e;
	}
}
function ps(e, t) {
	e.__lexicalClassNameCache === void 0 && (e.__lexicalClassNameCache = {});
	let n = e.__lexicalClassNameCache, r = n[t];
	if (r !== void 0) return r;
	let i = e[t];
	if (typeof i == "string") {
		let e = ql(i);
		return n[t] = e, e;
	}
	return i;
}
function ms(e, t, n, r, i) {
	if (n.size === 0) return;
	let a = r.__type, o = r.__key, s = t.get(a);
	s === void 0 && x(33, a);
	let c = s.klass, l = e.get(c);
	l === void 0 && (l = /* @__PURE__ */ new Map(), e.set(c, l));
	let u = l.get(o), d = u === "destroyed" && i === "created";
	(u === void 0 || d) && l.set(o, d ? "updated" : i);
}
function hs(e, t, n) {
	let r = e.getParent(), i = n, a = e;
	return r !== null && (t && n === 0 ? (i = a.getIndexWithinParent(), a = r) : t || n !== a.getChildrenSize() || (i = a.getIndexWithinParent() + 1, a = r)), a.getChildAtIndex(t ? i - 1 : i);
}
function gs(e, t) {
	let n = e.offset;
	if (e.type === "element") return hs(e.getNode(), t, n);
	{
		let r = e.getNode();
		if (t && n === 0 || !t && n === r.getTextContentSize()) {
			let e = t ? r.getPreviousSibling() : r.getNextSibling();
			return e === null ? hs(r.getParentOrThrow(), t, r.getIndexWithinParent() + +!t) : e;
		}
	}
	return null;
}
function _s(e) {
	let t = Ts(e).event, n = t && t.inputType;
	return n === "insertFromPaste" || n === "insertFromPasteAsQuotation";
}
function z(e, t, n) {
	return za(e, t, n, e);
}
function vs(e, t) {
	let n = e._keyToDOMMap.get(t);
	return n === void 0 && x(75, t), n;
}
function ys(e) {
	let t = e.assignedSlot || e.parentElement;
	if (t !== null) return t;
	let n = e.parentNode;
	return Rs(n) ? n.host : null;
}
function bs(e) {
	return Po(e) ? e : V(e) ? e.ownerDocument : null;
}
function xs(e) {
	Ca(), Da()._updateTags.add(e);
}
function Ss(e) {
	Ca(), Da()._deferred.push(e);
}
function Cs(e, t) {
	let n = e.getParent();
	for (; n !== null;) {
		if (n.is(t)) return !0;
		n = n.getParent();
	}
	return !1;
}
function ws(e) {
	let t = bs(e);
	return t ? t.defaultView : null;
}
function Ts(e) {
	let t = e._window;
	return t === null && x(78), t;
}
function Es(e) {
	return P(e) && e.isInline() || F(e) && e.isInline();
}
function Ds(e) {
	let t = e.getLatest();
	for (; t !== null;) {
		if (jc(t) !== null && P(t)) return t;
		let e = t.getParentOrThrow();
		if (ks(e)) return e;
		t = e;
	}
	return t;
}
function Os(e) {
	return P(e) && e.isShadowRoot();
}
function ks(e) {
	return Ya(e) || Os(e);
}
function As(e, t = !1) {
	let n = e.constructor.clone(e);
	return Ro(n, null), n.afterCloneFrom(e), t || n.resetOnCopyNodeFrom(e), n;
}
function js(e) {
	let t = Da(), n = e.getType(), r = wo(t, n);
	r === void 0 && x(200, e.constructor.name, n);
	let { replace: i, replaceWithKlass: a } = r;
	if (i !== null) {
		let t = i(e), r = t.constructor;
		return a === null ? t instanceof e.constructor && r !== e.constructor || x(202, r.name, r.getType(), e.constructor.name, n) : t instanceof a || x(201, a.name, a.getType(), r.name, r.getType(), e.constructor.name, n), t.__key === e.__key && x(203, e.constructor.name, n, r.name, r.getType()), t;
	}
	return e;
}
function Ms(e, t) {
	!Ya(e.getParent()) || P(t) || F(t) || x(99);
}
function Ns(e) {
	let t = R(e);
	return t === null && x(63, e), t;
}
function Ps(e) {
	if (!e || e.isInline()) return !1;
	if (F(e)) return !0;
	if (P(e)) {
		if (e.isShadowRoot()) {
			let t = e.getParent();
			return !(P(t) && t.isShadowRoot());
		}
		return !e.canBeEmpty();
	}
	return !1;
}
function Fs(e, t, n) {
	n.style.removeProperty("caret-color"), t._blockCursorElement = null;
	let r = e.parentElement;
	r !== null && r.removeChild(e);
}
function Is(e) {
	return C ? (e || window).getSelection() : null;
}
function Ls(e) {
	let t = ws(e);
	return t ? t.getSelection() : null;
}
function Rs(e) {
	return ec(e) && "host" in e;
}
var zs = [];
function Bs(e) {
	let t = e.getRootNode();
	if (t === e || !Rs(t)) return zs;
	let n = [t], r = t.host;
	for (;;) {
		let e = r.getRootNode();
		if (e === r || !Rs(e)) break;
		n.push(e), r = e.host;
	}
	return n;
}
function* Vs(e) {
	let t = [e], n;
	for (; n = t.pop();) {
		yield* n.querySelectorAll("[data-lexical-editor=\"true\"]");
		let e = (Po(n) ? n : n.ownerDocument).createTreeWalker(n, NodeFilter.SHOW_ELEMENT), r;
		for (; r = e.nextNode();) r.shadowRoot && t.push(r.shadowRoot);
	}
}
function Hs(e) {
	return e === null ? document : e.ownerDocument;
}
function B() {
	let e = Aa();
	return Hs(e === null ? null : e._rootElement);
}
function Us(e, t) {
	if (t === null || typeof e.getComposedRanges != "function") return null;
	let n = Bs(t);
	if (n.length === 0) return null;
	let r = e.getComposedRanges;
	try {
		let t = r.call(e, { shadowRoots: n })[0];
		if (t !== void 0) return t;
	} catch {}
	try {
		let t = r.apply(e, n)[0];
		if (t !== void 0) return t;
	} catch {}
	return null;
}
function Ws(e, t) {
	let n = Us(e, t);
	if (n !== null) {
		let e = Ks(n);
		if (e !== null) return e;
	}
	return e.rangeCount > 0 ? e.getRangeAt(0) : null;
}
function Gs(e, t) {
	let n = Us(e, t);
	return n === null ? e : qs(n, Js(e));
}
function Ks(e) {
	let t = e.startContainer.ownerDocument;
	if (t === null) return null;
	let n = t.createRange();
	try {
		return n.setStart(e.startContainer, e.startOffset), n.setEnd(e.endContainer, e.endOffset), n;
	} catch {
		return null;
	}
}
function qs(e, t) {
	let { startContainer: n, startOffset: r, endContainer: i, endOffset: a } = e;
	return t === "backward" ? {
		anchorNode: i,
		anchorOffset: a,
		direction: t,
		focusNode: n,
		focusOffset: r
	} : {
		anchorNode: n,
		anchorOffset: r,
		direction: t,
		focusNode: i,
		focusOffset: a
	};
}
function Js(e) {
	return e.direction;
}
function Ys(e) {
	let t = e.getRootNode();
	return Po(t) || Rs(t) ? t.activeElement : null;
}
function Xs(e) {
	let t = e.activeElement;
	for (; t !== null && t.shadowRoot !== null;) {
		let e = t.shadowRoot.activeElement;
		if (e === null) break;
		t = e;
	}
	return t;
}
function Zs(e) {
	let t = e.target;
	if (t !== null && V(t) && t.shadowRoot !== null && typeof e.composedPath == "function") {
		let t = e.composedPath();
		if (t.length > 0) return t[0];
	}
	return t;
}
function Qs(e) {
	return V(e) && e.tagName === "A";
}
function V(e) {
	return $s(e) && e.nodeType === 1;
}
function $s(e) {
	return typeof e == "object" && !!e && "nodeType" in e && typeof e.nodeType == "number";
}
function ec(e) {
	return $s(e) && e.nodeType === 11;
}
var tc = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|mark|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var|#text)$/i;
function nc(e) {
	return !(!V(e) || !e.style.display.startsWith("inline")) || tc.test(e.nodeName);
}
var rc = /^(address|article|aside|blockquote|canvas|dd|div|dl|dt|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hr|li|main|nav|noscript|ol|p|pre|section|table|td|tfoot|ul|video)$/i;
function ic(e) {
	return (!V(e) || !e.style.display.startsWith("inline")) && rc.test(e.nodeName);
}
function H(e) {
	if (F(e) && !e.isInline()) return !0;
	if (!P(e) || ks(e)) return !1;
	let t = e.getFirstChild(), n = t === null || ao(t) || A(t) || t.isInline();
	return !e.isInline() && !1 !== e.canBeEmpty() && n;
}
function U() {
	return Da();
}
function ac(e = U()) {
	return e._config.dom || go;
}
function oc(e, t, n = U()) {
	let r = ac(n).$getDOMSlot(e, t, n);
	return P(e) && (sc(r) || x(344, e.getKey(), e.getType())), r;
}
function sc(e) {
	return e instanceof Ae;
}
function cc(e, t, n = U()) {
	return Fo(oc(e, t, n).element);
}
var lc = /* @__PURE__ */ new WeakMap(), uc = /* @__PURE__ */ new Map();
function dc(e) {
	if (!e._readOnly && e.isEmpty()) return uc;
	e._readOnly || x(192);
	let t = lc.get(e);
	return t || (t = function(e) {
		let t = /* @__PURE__ */ new Map();
		for (let [n, r] of e._nodeMap) {
			let e = r.__type, i = t.get(e);
			i || (i = /* @__PURE__ */ new Map(), t.set(e, i)), i.set(n, r);
		}
		return t;
	}(e), lc.set(e, t)), t;
}
function fc(e) {
	let t = e.constructor.clone(e);
	return t.afterCloneFrom(e), t;
}
function pc(e) {
	return (t = fc(e))[zr] = !0, t;
	var t;
}
function mc(e, t) {
	let n = e.getAttribute("data-lexical-indent");
	if (n !== null) {
		let e = parseInt(n, 10);
		if (Number.isFinite(e) && e >= 0) return void t.setIndent(e);
	}
	let r = parseInt(e.style.paddingInlineStart, 10) || 0, i = Math.round(r / 40);
	t.setIndent(i);
}
function hc(e, t) {
	let n = t.getAttribute("dir");
	return n === "ltr" || n === "rtl" ? e.setDirection(n) : e;
}
function gc(e, t) {
	let n = t.style.textAlign;
	return n && n in xe ? e.setFormat(n) : e;
}
function _c(e, t) {
	e.__lexicalUnmanaged = !0, t && t.captureSelection !== void 0 && (e.__lexicalCapturedSelection = t.captureSelection);
}
function vc(e) {
	return !0 === e.__lexicalUnmanaged;
}
function yc(e, t = U()) {
	let n = t.isEditable();
	e.contentEditable = n ? "true" : "false", n ? e.__lexicalEditor = t : delete e.__lexicalEditor;
}
function bc(e, t) {
	let n = e;
	for (; n != null;) {
		if (!0 === n.__lexicalCapturedSelection) return !0;
		if (V(n) && n.hasAttribute("data-lexical-slot") || Go(n, t) !== void 0) return !1;
		n = ys(n);
	}
	return !1;
}
function xc(e, t) {
	return function(e, t) {
		return Object.prototype.hasOwnProperty.call(e, t);
	}(e, t) && e[t] !== Hr[t];
}
var Sc = /* @__PURE__ */ new WeakMap();
function Cc(e) {
	let t = Sc.get(e);
	if (t) return t;
	let n = e.prototype != null && Te in e.prototype ? e.prototype[Te]() : void 0, r = function(e) {
		if (!(e === Hr || e.prototype instanceof Hr)) {
			let t = "<unknown>", n = "<unknown>";
			try {
				t = e.getType();
			} catch {}
			try {
				yo.version && (n = JSON.parse(yo.version));
			} catch {}
			x(290, e.name, t, n);
		}
		return e === qa || e === Ga || e === Hr;
	}(e), i = !r && xc(e, "getType") ? e.getType() : void 0, a, o = i;
	if (n) if (i) a = n[i];
	else {
		for (let [e, t] of Object.entries(n)) o = e, a = t;
		if (!a) for (let e of Object.getOwnPropertySymbols(n)) {
			let t = n[e];
			if (t) {
				a = t;
				break;
			}
		}
	}
	if (!r && o && (xc(e, "getType") || (e.getType = () => o), xc(e, "clone") || (e.clone = (t) => (xo(t), new e())), xc(e, "importJSON") || (e.importJSON = a && a.$importJSON || ((t) => new e().updateFromJSON(t))), !xc(e, "importDOM") && a)) {
		let { importDOM: t } = a;
		t && (e.importDOM = () => t);
	}
	let s = {
		klass: e,
		ownNodeConfig: a,
		ownNodeType: o
	};
	return Sc.set(e, s), s;
}
function* wc(e) {
	for (let t = e; t && (t === Hr || Ur(t.prototype));) {
		let e = Cc(t);
		yield e, t = e.ownNodeConfig && e.ownNodeConfig.extends || Dc(t);
	}
}
function Tc(e) {
	let t = U();
	return Ca(), new (t.resolveRegisteredNodeAfterReplacements(t.getRegisteredNode(e))).klass();
}
var W = (e, t) => {
	let n = e;
	for (; n != null && !Ya(n);) {
		if (t(n)) return n;
		n = n.getParent();
	}
	return null;
};
function Ec(e, t) {
	let n = [], r = e.__first;
	for (; r !== null;) {
		let e = t === null ? R(r) : t.get(r);
		e ?? x(174), n.push(r), r = e.__next;
	}
	return n;
}
function Dc(e) {
	let t = Object.getPrototypeOf(e);
	if (typeof t == "function" && t !== Function.prototype) return t;
	let n = e.prototype && Object.getPrototypeOf(e.prototype);
	return n ? n.constructor : null;
}
var Oc = /* @__PURE__ */ new Map();
function kc(e) {
	return P(e) || F(e);
}
function Ac(e) {
	return P(e) || F(e);
}
function jc(e) {
	let t = e.getLatest();
	return Ac(t) ? t.__slotHost : null;
}
function Mc(e) {
	let t = jc(e);
	if (t === null) return null;
	let n = R(t);
	return P(n) || F(n) || x(370), n;
}
function Nc(e) {
	let t = Mc(e);
	if (t === null) return null;
	let n = e.getLatest().__key;
	for (let [e, r] of Fc(t)) if (r === n) return e;
	return null;
}
function Pc(e) {
	let t = e.getLatest();
	for (; t !== null;) {
		if (jc(t) !== null) return t;
		t = t.getParent();
	}
	return null;
}
function Fc(e) {
	let t = e.getLatest();
	return kc(t) && t.__slots !== null ? t.__slots : Oc;
}
function Ic(e) {
	return Array.from(Fc(e).keys());
}
function Lc(e, t) {
	let n = Fc(e).get(t);
	return n === void 0 ? null : R(n);
}
var Rc = [
	"__proto__",
	"constructor",
	"prototype"
], zc = Symbol("slotMapOwner");
function Bc(e) {
	let t = e.__slots;
	return t !== null && t[zc] === e || (t = new Map(t), t[zc] = e, e.__slots = t), t;
}
var Vc = /* @__PURE__ */ new WeakMap(), Hc = [];
function Uc(e) {
	for (let { ownNodeConfig: t } of wc(e)) {
		let e = t && t.slots;
		if (e) return e;
	}
	return Hc;
}
function Wc(e) {
	let t = "";
	for (let n of Ic(e)) {
		let r = Lc(e, n);
		r !== null && (t += r.getTextContent());
	}
	return t;
}
function Gc(e, t, n) {
	let r = n.get(e), i = n.get(t);
	return r === void 0 ? i === void 0 ? e < t ? -1 : +(e > t) : 1 : i === void 0 ? -1 : r - i;
}
function Kc(e) {
	let t = e.__slots;
	if (t === null || t.size < 2) return;
	let n = function(e) {
		let t = Vc.get(e);
		if (t === void 0) {
			let n = Uc(e), r = /* @__PURE__ */ new Map();
			for (let t of n) Rc.includes(t) && x(371, e.name, t), r.has(t) && x(372, e.name, t), r.set(t, r.size);
			t = r, Vc.set(e, t);
		}
		return t;
	}(e.constructor), r = null, i = !0;
	for (let e of t.keys()) {
		if (r !== null && Gc(r, e, n) > 0) {
			i = !1;
			break;
		}
		r = e;
	}
	if (i) return;
	let a = Array.from(t).sort(([e], [t]) => Gc(e, t, n));
	t.clear();
	for (let [e, n] of a) t.set(e, n);
}
function qc(e, t, n) {
	t !== "__proto__" && t !== "constructor" && t !== "prototype" || x(373, t);
	let r = e.getLatest();
	if (r.__slots !== null && r.__slots.get(t) === n.getLatest().__key) return r;
	(!P(n) && !F(n) || n.isInline()) && x(374, n.__key);
	let i = e.getWritable(), a = Bc(i), o = a.get(t);
	o !== void 0 && Yc(o);
	let s = n.getWritable(), c = Mc(s);
	if (c !== null) {
		let e = Nc(s);
		e !== null && Bc(c.getWritable()).delete(e), s.__slotHost = null;
	}
	return zo(s), s.__slotHost = i.__key, a.set(t, s.__key), Kc(i), function() {
		let e = U();
		e._slotsUsed = !0, e._pendingEditorState && (e._pendingEditorState._slotsUsed = !0);
	}(), i;
}
function Jc(e, t) {
	let n = e.getWritable();
	if (n.__slots === null) return n;
	let r = n.__slots.get(t);
	return r !== void 0 && (Yc(r), Bc(n).delete(t)), n;
}
function Yc(e) {
	let t = R(e);
	if (t === null) return;
	let n = t.getWritable();
	Ac(n) || x(377, e), n.__slotHost = null, n.remove();
}
var Xc = {
	next: "previous",
	previous: "next"
}, Zc = class {
	origin;
	constructor(e) {
		this.origin = e;
	}
	[Symbol.iterator]() {
		return xl({
			hasNext: al,
			initial: this.getAdjacentCaret(),
			map: (e) => e,
			step: (e) => e.getAdjacentCaret()
		});
	}
	getAdjacentCaret() {
		return G(this.getNodeAtCaret(), this.direction);
	}
	getSiblingCaret() {
		return G(this.origin, this.direction);
	}
	remove() {
		let e = this.getNodeAtCaret();
		return e && e.remove(), this;
	}
	replaceOrInsert(e, t) {
		let n = this.getNodeAtCaret();
		return e.is(this.origin) || e.is(n) || (n === null ? this.insert(e) : n.replace(e, t)), this;
	}
	splice(e, t, n = "next") {
		let r = n === this.direction ? t : Array.from(t).reverse(), i = this, a = this.getParentAtCaret(), o = /* @__PURE__ */ new Map();
		for (let t = i.getAdjacentCaret(); t !== null && o.size < e; t = t.getAdjacentCaret()) {
			let e = t.origin.getWritable();
			o.set(e.getKey(), e);
		}
		for (let e of r) {
			if (o.size > 0) {
				let t = i.getNodeAtCaret();
				if (t) {
					if (o.delete(t.getKey()), o.delete(e.getKey()), !(t.is(e) || i.origin.is(e))) {
						let n = e.getParent();
						n && n.is(a) && e.remove(), t.replace(e);
					}
				} else t === null && x(263, Array.from(o).join(" "));
			} else i.insert(e);
			i = G(e, this.direction);
		}
		for (let e of o.values()) e.remove();
		return this;
	}
}, Qc = class e extends Zc {
	type = "child";
	getLatest() {
		let e = this.origin.getLatest();
		return e === this.origin ? this : pl(e, this.direction);
	}
	getParentCaret(e = "root") {
		return G(tl(this.getParentAtCaret(), e), this.direction);
	}
	getFlipped() {
		let e = el(this.direction);
		return G(this.getNodeAtCaret(), e) || pl(this.origin, e);
	}
	getParentAtCaret() {
		return this.origin;
	}
	getChildCaret() {
		return this;
	}
	isSameNodeCaret(t) {
		return t instanceof e && this.direction === t.direction && this.origin.is(t.origin);
	}
	isSamePointCaret(e) {
		return this.isSameNodeCaret(e);
	}
}, $c = {
	root: Ya,
	shadowRoot: ks
};
function el(e) {
	return Xc[e];
}
function tl(e, t = "root") {
	return e === null || $c[t](e) ? null : jc(e) === null ? e : null;
}
var nl = class e extends Zc {
	type = "sibling";
	getLatest() {
		let e = this.origin.getLatest();
		return e === this.origin ? this : G(e, this.direction);
	}
	getSiblingCaret() {
		return this;
	}
	getParentAtCaret() {
		return this.origin.getParent();
	}
	getChildCaret() {
		return P(this.origin) ? pl(this.origin, this.direction) : null;
	}
	getParentCaret(e = "root") {
		return G(tl(this.getParentAtCaret(), e), this.direction);
	}
	getFlipped() {
		let e = el(this.direction);
		return G(this.getNodeAtCaret(), e) || pl(this.origin.getParentOrThrow(), e);
	}
	isSamePointCaret(t) {
		return t instanceof e && this.direction === t.direction && this.origin.is(t.origin);
	}
	isSameNodeCaret(t) {
		return (t instanceof e || t instanceof rl) && this.direction === t.direction && this.origin.is(t.origin);
	}
}, rl = class e extends Zc {
	type = "text";
	offset;
	constructor(e, t) {
		super(e), this.offset = t;
	}
	getLatest() {
		let e = this.origin.getLatest();
		return e === this.origin ? this : ul(e, this.direction, this.offset);
	}
	getParentAtCaret() {
		return this.origin.getParent();
	}
	getChildCaret() {
		return null;
	}
	getParentCaret(e = "root") {
		return G(tl(this.getParentAtCaret(), e), this.direction);
	}
	getFlipped() {
		return ul(this.origin, el(this.direction), this.offset);
	}
	isSamePointCaret(t) {
		return t instanceof e && this.direction === t.direction && this.origin.is(t.origin) && this.offset === t.offset;
	}
	isSameNodeCaret(t) {
		return (t instanceof nl || t instanceof e) && this.direction === t.direction && this.origin.is(t.origin);
	}
	getSiblingCaret() {
		return G(this.origin, this.direction);
	}
};
function il(e) {
	return e instanceof rl;
}
function al(e) {
	return e instanceof nl;
}
function ol(e) {
	return e instanceof Qc;
}
var sl = {
	next: class extends rl {
		direction = "next";
		getNodeAtCaret() {
			return this.origin.getNextSibling();
		}
		insert(e) {
			return this.origin.insertAfter(e), this;
		}
	},
	previous: class extends rl {
		direction = "previous";
		getNodeAtCaret() {
			return this.origin.getPreviousSibling();
		}
		insert(e) {
			return this.origin.insertBefore(e), this;
		}
	}
}, cl = {
	next: class extends nl {
		direction = "next";
		getNodeAtCaret() {
			return this.origin.getNextSibling();
		}
		insert(e) {
			return this.origin.insertAfter(e), this;
		}
	},
	previous: class extends nl {
		direction = "previous";
		getNodeAtCaret() {
			return this.origin.getPreviousSibling();
		}
		insert(e) {
			return this.origin.insertBefore(e), this;
		}
	}
}, ll = {
	next: class extends Qc {
		direction = "next";
		getNodeAtCaret() {
			return this.origin.getFirstChild();
		}
		insert(e) {
			return this.origin.splice(0, 0, [e]), this;
		}
	},
	previous: class extends Qc {
		direction = "previous";
		getNodeAtCaret() {
			return this.origin.getLastChild();
		}
		insert(e) {
			return this.origin.splice(this.origin.getChildrenSize(), 0, [e]), this;
		}
	}
};
function G(e, t) {
	return e ? new cl[t](e) : null;
}
function ul(e, t, n) {
	return e ? new sl[t](e, dl(e, n)) : null;
}
function dl(e, t, n = "error") {
	let r = e.getTextContentSize(), i = t === "next" ? r : t === "previous" ? 0 : t;
	return (i < 0 || i > r) && (n !== "clamp" && S(284, String(t), String(r), e.getKey()), i = i < 0 ? 0 : r), i;
}
function fl(e, t) {
	return new _l(e, t);
}
function pl(e, t) {
	return P(e) ? new ll[t](e) : null;
}
function ml(e) {
	return e && e.getChildCaret() || e;
}
function hl(e) {
	return e && ml(e.getAdjacentCaret());
}
var gl = class e {
	type = "node-caret-range";
	direction;
	anchor;
	focus;
	constructor(e, t, n) {
		this.anchor = e, this.focus = t, this.direction = n;
	}
	getLatest() {
		let t = this.anchor.getLatest(), n = this.focus.getLatest();
		return t === this.anchor && n === this.focus ? this : new e(t, n, this.direction);
	}
	isCollapsed() {
		return this.anchor.isSamePointCaret(this.focus);
	}
	getTextSlices() {
		let e = (e) => {
			let t = this[e].getLatest();
			return il(t) ? function(e, t) {
				let { direction: n, origin: r } = e;
				return fl(e, dl(r, t === "focus" ? el(n) : n) - e.offset);
			}(t, e) : null;
		}, t = e("anchor"), n = e("focus");
		if (t && n) {
			let { caret: e } = t, { caret: r } = n;
			if (e.isSameNodeCaret(r)) return [fl(e, r.offset - e.offset), null];
		}
		return [t, n];
	}
	iterNodeCarets(e = "root") {
		let t = il(this.anchor) ? this.anchor.getSiblingCaret() : this.anchor.getLatest(), n = this.focus.getLatest(), r = il(n), i = (t) => t.isSameNodeCaret(n) ? null : hl(t) || t.getParentCaret(e);
		return xl({
			hasNext: (e) => e !== null && !(r && n.isSameNodeCaret(e)),
			initial: t.isSameNodeCaret(n) ? null : i(t),
			map: (e) => e,
			step: i
		});
	}
	[Symbol.iterator]() {
		return this.iterNodeCarets("root");
	}
}, _l = class {
	type = "slice";
	caret;
	distance;
	constructor(e, t) {
		this.caret = e, this.distance = t;
	}
	getSliceIndices() {
		let { distance: e, caret: { offset: t } } = this, n = t + e;
		return n < t ? [n, t] : [t, n];
	}
	getTextContent() {
		let [e, t] = this.getSliceIndices();
		return this.caret.origin.getTextContent().slice(e, t);
	}
	getTextContentSize() {
		return Math.abs(this.distance);
	}
	removeTextSlice() {
		let { caret: { origin: e, direction: t } } = this, [n, r] = this.getSliceIndices(), i = e.getTextContent();
		return ul(e.setTextContent(i.slice(0, n) + i.slice(r)), t, n);
	}
};
function vl(e) {
	return bl(e, G(Yo(), e.direction));
}
function yl(e) {
	return bl(e, e);
}
function bl(e, t) {
	return e.direction !== t.direction && x(265), new gl(e, t, e.direction);
}
function xl(e) {
	let { initial: t, hasNext: n, step: r, map: i } = e, a = t;
	return {
		[Symbol.iterator]() {
			return this;
		},
		next() {
			if (!n(a)) return {
				done: !0,
				value: void 0
			};
			let e = {
				done: !1,
				value: i(a)
			};
			return a = r(a), e;
		}
	};
}
function Sl(e, t) {
	let n = El(e.origin, t.origin);
	switch (n === null && x(275, e.origin.getKey(), t.origin.getKey()), n.type) {
		case "same": {
			let n = e.type === "text", r = t.type === "text";
			return n && r ? function(e, t) {
				return Math.sign(e - t);
			}(e.offset, t.offset) : e.type === t.type ? 0 : n ? -1 : r ? 1 : e.type === "child" ? -1 : 1;
		}
		case "ancestor": return e.type === "child" ? -1 : 1;
		case "descendant": return t.type === "child" ? 1 : -1;
		case "branch": return Cl(n);
	}
}
function Cl(e) {
	let { a: t, b: n } = e, r = t.__key, i = n.__key, a = t, o = n;
	for (; a && o; a = a.getNextSibling(), o = o.getNextSibling()) {
		if (a.__key === i) return -1;
		if (o.__key === r) return 1;
	}
	return a === null ? 1 : -1;
}
function wl(e, t) {
	return t.is(e);
}
function Tl(e) {
	return P(e) ? [e.getLatest(), null] : [e.getParent(), e.getLatest()];
}
function El(e, t) {
	if (e.is(t)) return {
		commonAncestor: e,
		type: "same"
	};
	let n = /* @__PURE__ */ new Map();
	for (let [t, r] = Tl(e); t; r = t, t = t.getParent()) n.set(t, r);
	for (let [r, i] = Tl(t); r; i = r, r = r.getParent()) {
		let a = n.get(r);
		if (a !== void 0) return a === null ? (wl(e, r) || x(276), {
			commonAncestor: r,
			type: "ancestor"
		}) : i === null ? (wl(t, r) || x(277), {
			commonAncestor: r,
			type: "descendant"
		}) : ((P(a) || wl(e, a)) && (P(i) || wl(t, i)) && r.is(a.getParent()) && r.is(i.getParent()) || x(278), {
			a,
			b: i,
			commonAncestor: r,
			type: "branch"
		});
	}
	return null;
}
function Dl(e, t) {
	let { type: n, key: r, offset: i } = e, a = Ns(e.key);
	return n === "text" ? (A(a) || x(266, a.getType(), r), ul(a, t, i)) : (P(a) || x(267, a.getType(), r), Bl(a, e.offset, t));
}
function Ol(e, t) {
	let { origin: n, direction: r } = t, i = r === "next";
	il(t) ? e.set(n.getKey(), t.offset, "text") : al(t) ? A(n) ? e.set(n.getKey(), dl(n, r), "text") : e.set(n.getParentOrThrow().getKey(), n.getIndexWithinParent() + +!!i, "element") : (ol(t) && P(n) || x(268), e.set(n.getKey(), i ? 0 : n.getChildrenSize(), "element"));
}
function kl(e) {
	let t = N(), n = j(t) ? t : qi();
	return Al(n, e), Xo(n), n;
}
function Al(e, t) {
	Ol(e.anchor, t.anchor), Ol(e.focus, t.focus);
}
function jl(e) {
	let { anchor: t, focus: n } = e, r = Dl(t, "next"), i = Dl(n, "next"), a = Sl(r, i) <= 0 ? "next" : "previous";
	return bl(Rl(r, a), Rl(i, a));
}
function Ml(e) {
	let { direction: t, origin: n } = e, r = G(n, el(t)).getNodeAtCaret();
	return r ? G(r, t) : pl(n.getParentOrThrow(), t);
}
function Nl(e, t = "root") {
	let n = [e];
	for (let r = ol(e) ? e.getParentCaret(t) : e.getSiblingCaret(); r !== null; r = r.getParentCaret(t)) n.push(Ml(r));
	return n;
}
function Pl(e) {
	return !!e && e.origin.isAttached();
}
function Fl(e, t = "removeEmptySlices") {
	if (e.isCollapsed()) return e;
	let n = "root", r = "next", i = t, a = zl(e, r), o = Nl(a.anchor, n), s = Nl(a.focus.getFlipped(), n), c = /* @__PURE__ */ new Set(), l = [];
	for (let e of a.iterNodeCarets(n)) if (ol(e)) c.add(e.origin.getKey());
	else if (al(e)) {
		let { origin: t } = e;
		P(t) && !c.has(t.getKey()) || l.push(t);
	}
	for (let e of l) e.remove();
	for (let e of a.getTextSlices()) {
		if (!e) continue;
		let { origin: t } = e.caret, n = t.getTextContentSize(), a = Ml(G(t, r)), c = t.getMode();
		if (Math.abs(e.distance) === n && i === "removeEmptySlices" || c === "token" && e.distance !== 0) a.remove();
		else if (e.distance !== 0) {
			i = "removeEmptySlices";
			let t = e.removeTextSlice(), n = e.caret.origin;
			if (c === "segmented") {
				let e = t.origin, n = mi(e.getTextContent()).setStyle(e.getStyle()).setFormat(e.getFormat());
				a.replaceOrInsert(n), t = ul(n, r, t.offset);
			}
			n.is(o[0].origin) && (o[0] = t), n.is(s[0].origin) && (s[0] = t.getFlipped());
		}
	}
	let u, d;
	for (let e of o) if (Pl(e)) {
		u = Il(e);
		break;
	}
	for (let e of s) if (Pl(e)) {
		d = Il(e);
		break;
	}
	let f = function(e, t, n) {
		if (!e || !t) return null;
		let r = e.getParentAtCaret(), i = t.getParentAtCaret();
		if (!r || !i) return null;
		let a = r.getParents().reverse();
		a.push(r);
		let o = i.getParents().reverse();
		o.push(i);
		let s = Math.min(a.length, o.length), c;
		for (c = 0; c < s && a[c] === o[c]; c++);
		let l = (e, t) => {
			let n;
			for (let r = c; r < e.length; r++) {
				let i = e[r];
				if (ks(i)) return;
				!n && t(i) && (n = i);
			}
			return n;
		}, u = l(a, H), d = u && l(o, (e) => n.has(e.getKey()) && H(e));
		return d && Ic(d).length > 0 ? null : u && d ? [u, d] : null;
	}(u, d, c);
	if (f) {
		let [e, t] = f;
		pl(e, "previous").splice(0, t.getChildren());
		let n = t.getParent();
		for (t.remove(!0); n && n.isEmpty();) {
			let e = n;
			n = n.getParent(), e.remove(!0);
		}
	} else if (d) {
		let e = function(e) {
			if (ol(e)) {
				let t = e.origin;
				if (H(t)) return t;
			} else {
				let t = e.getParentAtCaret();
				if (t && H(t)) return t;
			}
			return null;
		}(d), t = e && e.getParent(), n = e && e.getParents().findLast(Os);
		if (e && t && !Ya(t) && e.isEmpty() && c.has(e.getKey()) && Ic(e).length === 0 && (!n || c.has(n.getKey()))) {
			e.remove(!0);
			let n = t;
			for (; n && !Ya(n) && n.isEmpty();) {
				let e = n.getParent();
				if (e && Ya(e) && e.getChildrenSize() <= 1) break;
				let t = n;
				n = e, t.remove(!0);
			}
		}
	}
	let p = [
		u,
		d,
		...o,
		...s
	].find(Pl);
	if (p) return yl(Rl(Il(p), e.direction));
	x(269, JSON.stringify(o.map((e) => e.origin.__key)));
}
function Il(e) {
	let t = function(e) {
		let t = e;
		for (; ol(t);) {
			let e = hl(t);
			if (!ol(e)) break;
			t = e;
		}
		return t;
	}(e.getLatest()), { direction: n } = t;
	if (A(t.origin)) return il(t) ? t : ul(t.origin, n, n);
	let r = t.getAdjacentCaret();
	return al(r) && A(r.origin) ? ul(r.origin, n, el(n)) : t;
}
function Ll(e) {
	return il(e) && e.offset !== dl(e.origin, e.direction);
}
function Rl(e, t) {
	return e.direction === t ? e : e.getFlipped();
}
function zl(e, t) {
	return e.direction === t ? e : bl(Rl(e.focus, t), Rl(e.anchor, t));
}
function Bl(e, t, n) {
	let r = pl(e, "next");
	for (let e = 0; e < t; e++) {
		let e = r.getAdjacentCaret();
		if (e === null) break;
		r = e;
	}
	return Rl(r, n);
}
function K(e, t = "root") {
	let n = 0, r = e, i = hl(r);
	for (; i === null;) {
		if (n--, i = r.getParentCaret(t), !i) return null;
		r = i, i = hl(r);
	}
	return i && [i, n];
}
function q(e) {
	let { origin: t, offset: n, direction: r } = e;
	if (n === dl(t, r)) return e.getSiblingCaret();
	if (n === dl(t, el(r))) return Ml(e.getSiblingCaret());
	let [i] = t.splitText(n);
	return A(i) || x(281), Rl(G(i, "next"), r);
}
function Vl(e, t) {
	return !0;
}
function Hl(e, { $copyElementNode: t = As, $splitTextPointCaretNext: n = q, rootMode: r = "shadowRoot", $shouldSplit: i = Vl, removeEmptyDestination: a = !1 } = {}) {
	if (il(e)) return n(e);
	let o = e.getParentCaret(r);
	if (o) {
		let { origin: n } = o;
		if (ol(e)) {
			let e = Ml(o);
			if (a && n.isEmpty()) return n.remove(), e;
			if (!n.canBeEmpty() || !i(n, "first")) return e;
		}
		let r = function(e) {
			let t = [];
			for (let n = e.getAdjacentCaret(); n; n = n.getAdjacentCaret()) t.push(n.origin);
			return t;
		}(e);
		(r.length > 0 || !a && n.canBeEmpty() && i(n, "last")) && o.insert(t(n).splice(0, 0, r));
	}
	return o;
}
function Ul(e, t, n) {
	let r = Rl(t, "next");
	il(r) && (r.offset === 0 ? r = G(r.origin, "previous").getFlipped() : r.offset === r.origin.getTextContentSize() && (r = G(r.origin, "next"))), r.origin.is(e) && (al(r) || x(342, e.getKey(), e.getType()), r = Ml(r)), (e.is(r.getNodeAtCaret()) || e.is(r.getFlipped().getNodeAtCaret())) && e.remove(!0);
	for (let e = r; e; e = Hl(e, n)) r = e;
	return il(r) && x(283), r.insert(e.isInline() ? I().append(e) : e), Rl(G(e.getLatest(), "next"), t.direction);
}
function Wl(e) {
	return e;
}
function Gl(e) {
	return e;
}
function Kl(e, t) {
	if (!t || e === t) return e;
	for (let n in t) if (e[n] !== t[n]) return {
		...e,
		...t
	};
	return e;
}
function ql(...e) {
	let t = [];
	for (let n of e) if (n && typeof n == "string") for (let [e] of n.matchAll(/\S+/g)) t.push(e);
	return t;
}
function Jl(e, ...t) {
	let n = ql(...t);
	n.length > 0 && e.classList.add(...n);
}
function Yl(e, ...t) {
	let n = ql(...t);
	n.length > 0 && e.classList.remove(...n);
}
function Xl(...e) {
	return () => {
		for (let t = e.length - 1; t >= 0; t--) e[t]();
		e.length = 0;
	};
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
var Zl = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), J = (/* @__PURE__ */ o(((e, t) => {
	t.exports = Zl();
})))(), Ql = C ? _.useLayoutEffect : _.useEffect, $l = { tag: Gr };
function eu({ initialConfig: e, children: t }) {
	let n = (0, _.useMemo)(() => {
		let { theme: t, namespace: n, nodes: r, onError: i, onWarn: a, editorState: o, html: s } = e, c = y(null, t), l = L({
			editable: e.editable,
			html: s,
			namespace: n,
			nodes: r,
			onError: (e) => i(e, l),
			...a ? { onWarn: (e) => a(e, l) } : {},
			theme: t
		});
		return function(e, t) {
			if (t !== null) {
				if (t === void 0) e.update(() => {
					let t = Yo();
					if (t.isEmpty()) {
						let n = I();
						t.append(n);
						let r = e.getRootElement(), i = C && r !== null ? Ys(r) : null;
						(N() !== null || i !== null && i === r) && n.select();
					}
				}, $l);
				else if (t !== null) switch (typeof t) {
					case "string": {
						let n = e.parseEditorState(t);
						e.setEditorState(n, $l);
						break;
					}
					case "object":
						e.setEditorState(t, $l);
						break;
					case "function": e.update(() => {
						Yo().isEmpty() && t(e);
					}, $l);
				}
			}
		}(l, o), [l, c];
	}, []);
	return Ql(() => {
		let t = e.editable, [r] = n;
		r.setEditable(t === void 0 || t);
	}, []), /*#__PURE__*/ (0, J.jsx)(v.Provider, {
		value: n,
		children: t
	});
}
//#endregion
//#region node_modules/@lexical/react/dist/useLexicalEditable.prod.mjs
var tu = C ? _.useLayoutEffect : _.useEffect;
function nu(e) {
	return {
		initialValueFn: () => e.isEditable(),
		subscribe: (t) => e.registerEditableListener(t)
	};
}
function ru() {
	return function(e) {
		let [t] = b(), n = (0, _.useMemo)(() => e(t), [t, e]), [r, i] = (0, _.useState)(() => n.initialValueFn()), a = (0, _.useRef)(r);
		return tu(() => {
			let { initialValueFn: e, subscribe: t } = n, r = e();
			return a.current !== r && (a.current = r, i(r)), t((e) => {
				a.current = e, i(e);
			});
		}, [n, e]), r;
	}(nu);
}
//#endregion
//#region node_modules/@lexical/selection/dist/LexicalSelection.prod.mjs
function iu(e) {
	let t = U().getElementByKey(e.getKey());
	if (t === null) return null;
	let n = t.ownerDocument.defaultView;
	return n === null ? null : n.getComputedStyle(t);
}
function au(e) {
	return iu(Ya(e) ? e : e.getParentOrThrow());
}
function ou(e) {
	let t = au(e);
	return t !== null && t.direction === "rtl";
}
function su(e, t, n = "self") {
	let r = e.getStartEndPoints();
	if (t.isSelected(e) && !Mo(t) && r !== null) {
		let [i, a] = r, o = e.isBackward(), s = i.getNode(), c = a.getNode(), l = t.is(s), u = t.is(c);
		if (l || u) {
			let [r, i] = ji(e), a = s.is(c), l = t.is(o ? c : s), u = t.is(o ? s : c), d, f = 0;
			a ? (f = r > i ? i : r, d = r > i ? r : i) : l ? (f = o ? i : r, d = void 0) : u && (f = 0, d = o ? r : i);
			let p = t.__text.slice(f, d);
			p !== t.__text && (n === "clone" && (t = pc(t)), t.__text = p);
		}
	}
	return t;
}
function cu(e, t) {
	let n = e.getFormatType(), r = e.getIndent();
	n !== t.getFormatType() && t.setFormat(n), r !== t.getIndent() && t.setIndent(r);
}
function lu(e, t, n) {
	let r = Dl(e, n);
	if (Ll(r)) return !1;
	for (; r; r = r.getParentCaret()) {
		let e = r.getParentAtCaret();
		if (!e || r.getNodeAtCaret()) return !1;
		if (t.is(e)) return !0;
	}
	return !1;
}
function uu(e, t, n = cu) {
	if (!e) return;
	let r = e.getStartEndPoints(), i = !1, a = null, o = /* @__PURE__ */ new Map();
	if (r) {
		let [t, n] = r, s = W(t.getNode(), H);
		a = W(n.getNode(), H);
		let c = e.isBackward() ? "previous" : "next";
		i = P(a) && !a.is(s) && function(e, t, n) {
			let r = e.getNode();
			return (!P(r) || !r.isEmpty()) && lu(e, t, n);
		}(n, a, el(c)), P(s) && o.set(s.getKey(), s), P(a) && !i && o.set(a.getKey(), a);
	}
	for (let t of e.getNodes()) if (P(t) && H(t)) {
		if (i && t.is(a)) continue;
		o.set(t.getKey(), t);
	} else if (!r) {
		let e = W(t, H);
		P(e) && o.set(e.getKey(), e);
	}
	for (let e of o.values()) {
		let r = t();
		n(e, r), e.replace(r, !0);
	}
}
function du(e) {
	let t = fu(e);
	return t !== null && t.writingMode === "vertical-rl";
}
function fu(e) {
	let t = e.anchor.getNode();
	return P(t) ? iu(t) : au(t);
}
function pu(e, t) {
	let n = du(e) ? !t : t;
	hu(e) && (n = !n);
	let r = Dl(e.focus, n ? "previous" : "next");
	if (Ll(r)) return !1;
	if (il(r) && !vi(r.origin) && r.origin.isUnmergeable()) {
		let e = r.getNodeAtCaret();
		if (A(e) && !vi(e)) return !0;
	}
	for (let e of vl(r)) {
		if (ol(e)) return !e.origin.isInline();
		if (!P(e.origin)) {
			if (F(e.origin)) return !0;
			break;
		}
	}
	return !1;
}
function mu(e, t, n, r) {
	e.modify(t ? "extend" : "move", n, r);
}
function hu(e) {
	let t = fu(e);
	return t !== null && t.direction === "rtl";
}
function gu(e, t, n) {
	let r = hu(e), i;
	i = du(e) || r ? !n : n, mu(e, t, i, "character");
}
//#endregion
//#region node_modules/@lexical/utils/dist/LexicalUtils.prod.mjs
function _u(e, ...t) {
	let n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
	r.append("code", e);
	for (let e of t) r.append("v", e);
	throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function vu(e, t) {
	return Array.from(yu(e, t));
}
function yu(e, t) {
	return xu("next", e, t);
}
function bu(e, t) {
	let n = K(G(e, t));
	return n && n[0];
}
function xu(e, t, n) {
	let r = Yo(), i = t || r, a = P(i) ? pl(i, e) : G(i, e), o = Su(i), s = n ? hl(ml(G(n, e))) || bu(n, e) : bu(i, e), c = o;
	return xl({
		hasNext: (e) => e !== null,
		initial: a,
		map: (e) => ({
			depth: c,
			node: e.origin
		}),
		step: (e) => {
			if (e.isSameNodeCaret(s)) return null;
			ol(e) && c++;
			let t = K(e);
			return !t || t[0].isSameNodeCaret(s) ? null : (c += t[1], t[0]);
		}
	});
}
function Su(e) {
	let t = -1;
	for (let n = e; n !== null; n = n.getParent() ?? Mc(n)) t++;
	return t;
}
function Cu(e, t) {
	let n = e;
	for (; n != null;) {
		if (n instanceof t) return n;
		n = n.getParent();
	}
	return null;
}
function wu(e) {
	let t = W(e, (e) => P(e) && !e.isInline());
	return P(t) || _u(4, e.__key), t;
}
function Tu(e) {
	let t = N() || Zi(), n;
	if (j(t)) n = Dl(t.focus, "next");
	else {
		if (t != null) {
			let e = t.getNodes(), r = e[e.length - 1];
			r && (n = G(r, "next"));
		}
		n ||= pl(Yo(), "previous").getFlipped().insert(I());
	}
	let r = Ul(e, n), i = hl(r);
	return kl(yl(ol(i) ? Il(i) : r)), e.getLatest();
}
function Eu(e, t) {
	return e !== null && Object.getPrototypeOf(e).constructor.name === t.name;
}
function Du(e) {
	let t = null;
	if (Eu(e, DragEvent) ? t = e.dataTransfer : Eu(e, ClipboardEvent) && (t = e.clipboardData), t === null) return [
		!1,
		[],
		!1
	];
	let n = t.types, r = n.includes("Files"), i = n.includes("text/html") || n.includes("text/plain");
	return [
		r,
		Array.from(t.files),
		i
	];
}
function Ou(e) {
	let t = N();
	if (!j(t)) return !1;
	let n = /* @__PURE__ */ new Set(), r = t.getNodes();
	for (let t = 0; t < r.length; t++) {
		let i = r[t], a = i.getKey();
		if (n.has(a)) continue;
		let o = W(i, (e) => P(e) && !e.isInline());
		if (o === null) continue;
		let s = o.getKey();
		o.canIndent() && !n.has(s) && (n.add(s), e(o));
	}
	return n.size > 0;
}
function ku(e, t) {
	pl(e, "next").insert(t);
}
function Au(e, t) {
	return ju(e, t, null);
}
function ju(e, t, n) {
	let r = !1;
	for (let i of Nu(e)) t(i) ? n !== null && n(i) : (r = !0, P(i) && ju(i, t, n || ((e) => i.insertAfter(e))), i.remove());
	return r;
}
function Mu(e, t) {
	let n = [], r = Array.from(e).reverse();
	for (let e = r.pop(); e !== void 0; e = r.pop()) if (t(e)) n.push(e);
	else if (P(e)) for (let t of Nu(e)) r.push(t);
	return n;
}
function Nu(e) {
	return Pu(pl(e, "previous"));
}
function Pu(e) {
	return xl({
		hasNext: al,
		initial: e.getAdjacentCaret(),
		map: (e) => e.origin.getLatest(),
		step: (e) => e.getAdjacentCaret()
	});
}
//#endregion
//#region node_modules/@lexical/extension/dist/LexicalExtension.prod.mjs
var Fu = Symbol.for("preact-signals");
function Iu() {
	if (Vu > 1) return void Vu--;
	let e, t = !1;
	for (function() {
		let e = Bu;
		for (Bu = void 0; e !== void 0;) e.S.v === e.v && (e.S.i = e.i), e = e.o;
	}(); Ru !== void 0;) {
		let n = Ru;
		for (Ru = void 0, Hu++; n !== void 0;) {
			let r = n.u;
			if (n.u = void 0, n.f &= -3, !(8 & n.f) && Ju(n)) try {
				n.c();
			} catch (n) {
				t ||= (e = n, !0);
			}
			n = r;
		}
	}
	if (Hu = 0, Vu--, t) throw e;
}
var Lu, Ru;
function zu(e) {
	let t = Lu;
	Lu = void 0;
	try {
		return e();
	} finally {
		Lu = t;
	}
}
var Bu, Vu = 0, Hu = 0, Uu = 0, Wu = 0;
function Gu(e) {
	if (Lu === void 0) return;
	let t = e.n;
	return t === void 0 || t.t !== Lu ? (t = {
		i: 0,
		S: e,
		p: Lu.s,
		n: void 0,
		t: Lu,
		e: void 0,
		x: void 0,
		r: t
	}, Lu.s !== void 0 && (Lu.s.n = t), Lu.s = t, e.n = t, 32 & Lu.f && e.S(t), t) : t.i === -1 ? (t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = Lu.s, t.n = void 0, Lu.s.n = t, Lu.s = t), t) : void 0;
}
function Ku(e, t) {
	this.v = e, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = t?.watched, this.Z = t?.unwatched, this.name = t?.name;
}
function qu(e, t) {
	return new Ku(e, t);
}
function Ju(e) {
	for (let t = e.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
	return !1;
}
function Yu(e) {
	for (let t = e.s; t !== void 0; t = t.n) {
		let n = t.S.n;
		if (n !== void 0 && (t.r = n), t.S.n = t, t.i = -1, t.n === void 0) {
			e.s = t;
			break;
		}
	}
}
function Xu(e) {
	let t, n = e.s;
	for (; n !== void 0;) {
		let e = n.p;
		n.i === -1 ? (n.S.U(n), e !== void 0 && (e.n = n.n), n.n !== void 0 && (n.n.p = e)) : t = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = e;
	}
	e.s = t;
}
function Zu(e, t) {
	Ku.call(this, void 0), this.x = e, this.s = void 0, this.g = Wu - 1, this.f = 4, this.W = t?.watched, this.Z = t?.unwatched, this.name = t?.name;
}
function Qu(e) {
	let t = e.m;
	if (e.m = void 0, typeof t == "function") {
		Vu++;
		let n = Lu;
		Lu = void 0;
		try {
			t();
		} catch (t) {
			throw e.f &= -2, e.f |= 8, $u(e), t;
		} finally {
			Lu = n, Iu();
		}
	}
}
function $u(e) {
	for (let t = e.s; t !== void 0; t = t.n) t.S.U(t);
	e.x = void 0, e.s = void 0, Qu(e);
}
function ed(e) {
	if (Lu !== this) throw Error("Out-of-order effect");
	Xu(this), Lu = e, this.f &= -2, 8 & this.f && $u(this), Iu();
}
function td(e, t) {
	this.x = e, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = t?.name;
}
function nd(e, t) {
	let n = new td(e, t);
	try {
		n.c();
	} catch (e) {
		throw n.d(), e;
	}
	let r = n.d.bind(n);
	return r[Symbol.dispose] = r, r;
}
Ku.prototype.brand = Fu, Ku.prototype.h = function() {
	return !0;
}, Ku.prototype.S = function(e) {
	let t = this.t;
	t !== e && e.e === void 0 && (e.x = t, this.t = e, t === void 0 ? zu(() => {
		var e;
		(e = this.W) == null || e.call(this);
	}) : t.e = e);
}, Ku.prototype.U = function(e) {
	if (this.t !== void 0) {
		let t = e.e, n = e.x;
		t !== void 0 && (t.x = n, e.e = void 0), n !== void 0 && (n.e = t, e.x = void 0), e === this.t && (this.t = n, n === void 0 && zu(() => {
			var e;
			(e = this.Z) == null || e.call(this);
		}));
	}
}, Ku.prototype.subscribe = function(e) {
	return nd(() => {
		let t = this.value, n = Lu;
		Lu = void 0;
		try {
			e(t);
		} finally {
			Lu = n;
		}
	}, { name: "sub" });
}, Ku.prototype.valueOf = function() {
	return this.value;
}, Ku.prototype.toString = function() {
	return this.value + "";
}, Ku.prototype.toJSON = function() {
	return this.value;
}, Ku.prototype.peek = function() {
	let e = Lu;
	Lu = void 0;
	try {
		return this.value;
	} finally {
		Lu = e;
	}
}, Object.defineProperty(Ku.prototype, "value", {
	get() {
		let e = Gu(this);
		return e !== void 0 && (e.i = this.i), this.v;
	},
	set(e) {
		if (e !== this.v) {
			if (Hu > 100) throw Error("Cycle detected");
			(function(e) {
				Vu !== 0 && Hu === 0 && e.l !== Uu && (e.l = Uu, Bu = {
					S: e,
					v: e.v,
					i: e.i,
					o: Bu
				});
			})(this), this.v = e, this.i++, Wu++, Vu++;
			try {
				for (let e = this.t; e !== void 0; e = e.x) e.t.N();
			} finally {
				Iu();
			}
		}
	}
}), Zu.prototype = new Ku(), Zu.prototype.h = function() {
	if (this.f &= -3, 1 & this.f) return !1;
	if ((36 & this.f) == 32 || (this.f &= -5, this.g === Wu)) return !0;
	if (this.g = Wu, this.f |= 1, this.i > 0 && !Ju(this)) return this.f &= -2, !0;
	let e = Lu;
	try {
		Yu(this), Lu = this;
		let e = this.x();
		(16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
	} catch (e) {
		this.v = e, this.f |= 16, this.i++;
	}
	return Lu = e, Xu(this), this.f &= -2, !0;
}, Zu.prototype.S = function(e) {
	if (this.t === void 0) {
		this.f |= 36;
		for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
	}
	Ku.prototype.S.call(this, e);
}, Zu.prototype.U = function(e) {
	if (this.t !== void 0 && (Ku.prototype.U.call(this, e), this.t === void 0)) {
		this.f &= -33;
		for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
	}
}, Zu.prototype.N = function() {
	if (!(2 & this.f)) {
		this.f |= 6;
		for (let e = this.t; e !== void 0; e = e.x) e.t.N();
	}
}, Object.defineProperty(Zu.prototype, "value", { get() {
	if (1 & this.f) throw Error("Cycle detected");
	let e = Gu(this);
	if (this.h(), e !== void 0 && (e.i = this.i), 16 & this.f) throw this.v;
	return this.v;
} }), td.prototype.c = function() {
	let e = this.S();
	try {
		if (8 & this.f || this.x === void 0) return;
		let e = this.x();
		typeof e == "function" && (this.m = e);
	} finally {
		e();
	}
}, td.prototype.S = function() {
	if (1 & this.f) throw Error("Cycle detected");
	this.f |= 1, this.f &= -9, Qu(this), Yu(this), Vu++;
	let e = Lu;
	return Lu = this, ed.bind(this, e);
}, td.prototype.N = function() {
	2 & this.f || (this.f |= 2, this.u = Ru, Ru = this);
}, td.prototype.d = function() {
	this.f |= 8, 1 & this.f || $u(this);
}, td.prototype.dispose = function() {
	this.d();
};
function rd(e) {
	return (typeof e.nodes == "function" ? e.nodes() : e.nodes) || [];
}
function id(e, t) {
	let n;
	return qu(e(), {
		unwatched() {
			n &&= (n(), void 0);
		},
		watched() {
			this.value = e(), n = t(this);
		}
	});
}
function ad(e, ...t) {
	let n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
	r.append("code", e);
	for (let e of t) r.append("v", e);
	throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
var od;
try {
	od = "0.48.0+prod.esm";
} catch {}
var sd = od ?? "\"<unknown>+source\"", cd = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
function ld(e, t) {
	if (e && t && !Array.isArray(t) && typeof e == "object" && typeof t == "object") {
		let n = e, r = t;
		for (let e in r) !cd.has(e) && Object.prototype.hasOwnProperty.call(r, e) && (n[e] = ld(n[e], r[e]));
		return e;
	}
	return t;
}
var ud = 0, dd = 1, fd = 2, pd = 3, md = 4, hd = 5, gd = 6, _d = 7;
function vd(e) {
	return e.id === ud;
}
function yd(e) {
	return e.id === fd;
}
function bd(e) {
	return function(e) {
		return e.id === dd;
	}(e) || ad(305, String(e.id), String(dd)), Object.assign(e, { id: fd });
}
var xd = /* @__PURE__ */ new Set(), Sd = class {
	builder;
	configs;
	_dependency;
	_peerNameSet;
	extension;
	state;
	_signal;
	constructor(e, t) {
		this.builder = e, this.extension = t, this.configs = /* @__PURE__ */ new Set(), this.state = { id: ud };
	}
	mergeConfigs() {
		let e = this.extension.config || {}, t = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Kl;
		for (let n of this.configs) e = t(e, n);
		return e;
	}
	init(e) {
		let t = this.state;
		yd(t) || ad(306, String(t.id));
		let n = {
			getDependency: this.getInitDependency.bind(this),
			getDirectDependentNames: this.getDirectDependentNames.bind(this),
			getPeer: this.getInitPeer.bind(this),
			getPeerNameSet: this.getPeerNameSet.bind(this)
		}, r = {
			...n,
			getDependency: this.getDependency.bind(this),
			getInitResult: this.getInitResult.bind(this),
			getPeer: this.getPeer.bind(this)
		}, i = function(e, t, n) {
			return Object.assign(e, {
				config: t,
				id: pd,
				registerState: n
			});
		}(t, this.mergeConfigs(), n), a;
		this.state = i, this.extension.init && (a = this.extension.init(e, i.config, n)), this.state = function(e, t, n) {
			return Object.assign(e, {
				id: md,
				initResult: t,
				registerState: n
			});
		}(i, a, r);
	}
	build(e) {
		let t = this.state, n;
		t.id !== md && ad(307, String(t.id), String(hd)), this.extension.build && (n = this.extension.build(e, t.config, t.registerState));
		let r = {
			...t.registerState,
			getOutput: () => n,
			getSignal: this.getSignal.bind(this)
		};
		this.state = function(e, t, n) {
			return Object.assign(e, {
				id: hd,
				output: t,
				registerState: n
			});
		}(t, n, r);
	}
	register(e, t) {
		this._signal = t;
		let n = this.state;
		n.id !== hd && ad(308, String(n.id), String(hd));
		let r = this.extension.register && this.extension.register(e, n.config, n.registerState);
		return this.state = function(e) {
			return Object.assign(e, { id: gd });
		}(n), () => {
			let e = this.state;
			e.id !== _d && ad(309, String(n.id), String(_d)), this.state = function(e) {
				return Object.assign(e, { id: hd });
			}(e), r && r();
		};
	}
	afterRegistration(e) {
		let t = this.state, n;
		return t.id !== gd && ad(310, String(t.id), String(gd)), this.extension.afterRegistration && (n = this.extension.afterRegistration(e, t.config, t.registerState)), this.state = function(e) {
			return Object.assign(e, { id: _d });
		}(t), n;
	}
	getSignal() {
		return this._signal === void 0 && ad(311), this._signal;
	}
	getInitResult() {
		this.extension.init === void 0 && ad(312, this.extension.name);
		let e = this.state;
		return function(e) {
			return e.id >= md;
		}(e) || ad(313, String(e.id), String(md)), e.initResult;
	}
	getInitPeer(e) {
		let t = this.builder.extensionNameMap.get(e);
		return t ? t.getExtensionInitDependency() : void 0;
	}
	getExtensionInitDependency() {
		let e = this.state;
		return function(e) {
			return e.id >= pd;
		}(e) || ad(314, String(e.id), String(pd)), { config: e.config };
	}
	getPeer(e) {
		let t = this.builder.extensionNameMap.get(e);
		return t ? t.getExtensionDependency() : void 0;
	}
	getInitDependency(e) {
		let t = this.builder.getExtensionRep(e);
		return t === void 0 && ad(315, this.extension.name, e.name), t.getExtensionInitDependency();
	}
	getDependency(e) {
		let t = this.builder.getExtensionRep(e);
		return t === void 0 && ad(315, this.extension.name, e.name), t.getExtensionDependency();
	}
	getState() {
		let e = this.state;
		return function(e) {
			return e.id >= _d;
		}(e) || ad(316, String(e.id), String(_d)), e;
	}
	getDirectDependentNames() {
		return this.builder.incomingEdges.get(this.extension.name) || xd;
	}
	getPeerNameSet() {
		let e = this._peerNameSet;
		return e || (e = new Set((this.extension.peerDependencies || []).map(([e]) => e)), this._peerNameSet = e), e;
	}
	getExtensionDependency() {
		if (!this._dependency) {
			let e = this.state;
			(function(e) {
				return e.id >= hd;
			})(e) || ad(317, this.extension.name), this._dependency = {
				config: e.config,
				init: e.initResult,
				output: e.output
			};
		}
		return this._dependency;
	}
}, Y = { tag: Gr };
function Cd() {
	let e = Yo();
	e.isEmpty() && e.append(I());
}
var wd = /* @__PURE__ */ Wl({
	config: /* @__PURE__ */ Gl({
		setOptions: Y,
		updateOptions: Y
	}),
	init: ({ $initialEditorState: e = Cd }) => ({
		$initialEditorState: e,
		initialized: !1
	}),
	afterRegistration(e, { updateOptions: t, setOptions: n }, r) {
		let i = r.getInitResult();
		if (!i.initialized) {
			i.initialized = !0;
			let { $initialEditorState: r } = i;
			if ($a(r)) e.setEditorState(r, n);
			else if (typeof r == "function") e.update(() => {
				r(e);
			}, t);
			else if (r && (typeof r == "string" || typeof r == "object")) {
				let t = e.parseEditorState(r);
				e.setEditorState(t, n);
			}
		}
		return () => {};
	},
	name: "@lexical/extension/InitialState",
	nodes: [
		Ja,
		ai,
		no,
		gi,
		lo
	]
}), Td = Symbol.for("@lexical/extension/LexicalBuilder");
function Ed() {}
function Dd(e) {
	throw e;
}
function Od(e) {
	return Array.isArray(e) ? e : [e];
}
var kd = sd, Ad = class e {
	roots;
	extensionNameMap;
	outgoingConfigEdges;
	incomingEdges;
	conflicts;
	_sortedExtensionReps;
	PACKAGE_VERSION;
	constructor(e) {
		this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = kd, this.roots = e;
		for (let t of e) this.addExtension(t);
	}
	static fromExtensions(t) {
		let n = [Od(wd)];
		for (let e of t) n.push(Od(e));
		return new e(n);
	}
	static maybeFromEditor(t) {
		let n = t[Td];
		return n && (n.PACKAGE_VERSION !== kd && ad(292, n.PACKAGE_VERSION, kd), n instanceof e || ad(293)), n;
	}
	static fromEditor(t) {
		let n = e.maybeFromEditor(t);
		return n === void 0 && ad(294), n;
	}
	constructEditor() {
		let { $initialEditorState: e, onError: t, onWarn: n, ...r } = this.buildCreateEditorArgs(), i = Object.assign(L({
			...r,
			...t ? { onError: (e) => {
				t(e, i);
			} } : {},
			...n ? { onWarn: (e) => {
				n(e, i);
			} } : {}
		}), { [Td]: this });
		for (let e of this.sortedExtensionReps()) e.build(i);
		return i;
	}
	buildEditor() {
		let e = Ed;
		function t() {
			try {
				e();
			} finally {
				e = Ed;
			}
		}
		let n = Object.assign(this.constructEditor(), {
			dispose: t,
			[Symbol.dispose]: t
		});
		return e = Xl(this.registerEditor(n), () => n.setRootElement(null)), n;
	}
	hasExtensionByName(e) {
		return this.extensionNameMap.has(e);
	}
	getExtensionRep(e) {
		let t = this.extensionNameMap.get(e.name);
		if (t) return t.extension !== e && ad(295, e.name), t;
	}
	addEdge(e, t, n) {
		let r = this.outgoingConfigEdges.get(e);
		r ? r.set(t, n) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[t, n]]));
		let i = this.incomingEdges.get(t);
		i ? i.add(e) : this.incomingEdges.set(t, /* @__PURE__ */ new Set([e]));
	}
	addExtension(e) {
		this._sortedExtensionReps !== void 0 && ad(296);
		let [t] = Od(e);
		typeof t.name != "string" && ad(297, typeof t.name);
		let n = this.extensionNameMap.get(t.name);
		if (n !== void 0 && n.extension !== t && ad(298, t.name), !n) {
			n = new Sd(this, t), this.extensionNameMap.set(t.name, n);
			let e = this.conflicts.get(t.name);
			typeof e == "string" && ad(299, t.name, e);
			for (let e of t.conflictsWith || []) this.extensionNameMap.has(e) && ad(299, t.name, e), this.conflicts.set(e, t.name);
			for (let e of t.dependencies || []) {
				let n = Od(e);
				this.addEdge(t.name, n[0].name, n.slice(1)), this.addExtension(n);
			}
			for (let [e, n] of t.peerDependencies || []) this.addEdge(t.name, e, n ? [n] : []);
		}
	}
	sortedExtensionReps() {
		if (this._sortedExtensionReps) return this._sortedExtensionReps;
		let e = [], t = (n, r) => {
			let i = n.state;
			if (yd(i)) return;
			let a = n.extension.name;
			var o;
			vd(i) || ad(300, a, r || "[unknown]"), vd(o = i) || ad(304, String(o.id), String(ud)), i = Object.assign(o, { id: dd }), n.state = i;
			let s = this.outgoingConfigEdges.get(a);
			if (s) for (let e of s.keys()) {
				let n = this.extensionNameMap.get(e);
				n && t(n, a);
			}
			i = bd(i), n.state = i, e.push(n);
		};
		for (let e of this.extensionNameMap.values()) vd(e.state) && t(e);
		for (let t of e) for (let [e, n] of this.outgoingConfigEdges.get(t.extension.name) || []) if (n.length > 0) {
			let t = this.extensionNameMap.get(e);
			if (t) for (let e of n) t.configs.add(e);
		}
		for (let [e, ...t] of this.roots) if (t.length > 0) {
			let n = this.extensionNameMap.get(e.name);
			n === void 0 && ad(301, e.name);
			for (let e of t) n.configs.add(e);
		}
		return this._sortedExtensionReps = e, this._sortedExtensionReps;
	}
	registerEditor(e) {
		let t = this.sortedExtensionReps(), n = new AbortController(), r = [() => n.abort()], i = n.signal;
		for (let n of t) {
			let t = n.register(e, i);
			t && r.push(t);
		}
		for (let n of t) {
			let t = n.afterRegistration(e);
			t && r.push(t);
		}
		return Xl(...r);
	}
	buildCreateEditorArgs() {
		let e = {}, t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), i = {}, a = {}, o = this.sortedExtensionReps();
		for (let s of o) {
			let { extension: o } = s;
			if (o.onError !== void 0 && (e.onError = o.onError), o.onWarn !== void 0 && (e.onWarn = o.onWarn), o.disableEvents !== void 0 && (e.disableEvents = o.disableEvents), o.parentEditor !== void 0 && (e.parentEditor = o.parentEditor), o.editable !== void 0 && (e.editable = o.editable), o.namespace !== void 0 && (e.namespace = o.namespace), o.$initialEditorState !== void 0 && (e.$initialEditorState = o.$initialEditorState), o.nodes) for (let e of rd(o)) {
				if (typeof e != "function") {
					let t = n.get(e.replace);
					t && ad(302, o.name, e.replace.name, t.extension.name), n.set(e.replace, s);
				}
				t.add(e);
			}
			if (o.html) {
				if (o.html.export) for (let [e, t] of o.html.export.entries()) r.set(e, t);
				o.html.import && Object.assign(i, o.html.import);
			}
			o.theme && ld(a, o.theme);
		}
		Object.keys(a).length > 0 && (e.theme = a), t.size && (e.nodes = [...t]);
		let s = Object.keys(i).length > 0, c = r.size > 0;
		(s || c) && (e.html = {}, s && (e.html.import = i), c && (e.html.export = r));
		for (let t of o) t.init(e);
		return e.onError ||= Dd, e;
	}
};
function jd(e, t) {
	let n = Ad.maybeFromEditor(e);
	if (!n) return;
	let r = n.extensionNameMap.get(t);
	return r ? r.getExtensionDependency() : void 0;
}
function Md(e) {
	return jd(U(), e);
}
var Nd = class e extends qa {
	static getType() {
		return "horizontalrule";
	}
	static clone(t) {
		return new e(t.__key);
	}
	static importJSON(e) {
		return Fd().updateFromJSON(e);
	}
	static importDOM() {
		return { hr: () => ({
			conversion: Pd,
			priority: 0
		}) };
	}
	exportDOM() {
		return { element: B().createElement("hr") };
	}
	createDOM(e) {
		let t = B().createElement("hr");
		return Jl(t, e.theme.hr), t;
	}
	getTextContent() {
		return "\n";
	}
	isInline() {
		return !1;
	}
	updateDOM() {
		return !1;
	}
};
function Pd() {
	return { node: Fd() };
}
function Fd() {
	return Tc(Nd);
}
function Id(e) {
	return e instanceof Nd;
}
Date.now;
function Ld(e) {
	return e.canIndent();
}
function Rd(e, t, n = Ld) {
	return Xl(e.registerCommand(Hn, (t) => {
		let n = N();
		if (!j(n)) return !1;
		t.preventDefault();
		let r = function(e) {
			if (e.getNodes().filter((e) => Gi(e) && e.canIndent()).length > 0) return !0;
			let t = e.anchor, n = e.focus, r = n.isBefore(t) ? n : t, i = wu(r.getNode());
			if (i.canIndent()) {
				let e = i.getKey(), t = qi();
				if (t.anchor.set(e, 0, "element"), t.focus.set(e, 0, "element"), t = pt(t), t.anchor.is(r)) return !0;
			}
			return !1;
		}(n) ? t.shiftKey ? Gn : Wn : Un;
		return e.dispatchCommand(r, void 0);
	}, 0), e.registerCommand(Wn, () => {
		let e = typeof t == "number" ? t : t ? t.peek() : null;
		if (!j(N())) return !1;
		let r = typeof n == "function" ? n : n.peek();
		return Ou((t) => {
			if (r(t)) {
				let n = t.getIndent() + 1;
				(!e || n < e) && t.setIndent(n);
			}
		});
	}, 4));
}
//#endregion
//#region node_modules/@lexical/react/dist/LexicalReactProviderExtension.prod.mjs
var zd = /* @__PURE__ */ Wl({ name: "@lexical/react/ReactProvider" }), Bd = m();
function Vd() {
	return Yo().getTextContent();
}
function Hd(e, t = !0) {
	if (e) return !1;
	let n = Vd();
	return t && (n = n.trim()), n === "";
}
function Ud(e) {
	if (!Hd(e, !1)) return !1;
	let t = Yo().getChildren(), n = t.length;
	if (n > 1) return !1;
	for (let e = 0; e < n; e++) {
		let n = t[e];
		if (F(n)) return !1;
		if (P(n)) {
			if (!fo(n) || n.__indent !== 0) return !1;
			let t = n.getChildren(), r = t.length;
			for (let n = 0; n < r; n++) {
				let n = t[e];
				if (!A(n)) return !1;
			}
		}
	}
	return !0;
}
function Wd(e) {
	return () => Ud(e);
}
//#endregion
//#region node_modules/@lexical/dragon/dist/LexicalDragon.prod.mjs
var Gd = {
	bold: "bold",
	italic: "italic",
	strikeThrough: "strikethrough",
	subscript: "subscript",
	superscript: "superscript",
	underline: "underline"
}, Kd = Symbol.for("@lexical/dragon/WindowState");
function qd(e, t, n) {
	let r = function(e) {
		let t = e[Kd];
		return t === void 0 && (t = {
			dispose: () => {},
			editors: /* @__PURE__ */ new Map(),
			installs: /* @__PURE__ */ new Set()
		}, e[Kd] = t), t;
	}(e);
	if (r.installs.size === 0) {
		let t = Zd.bind(e);
		e.addEventListener("message", t, !0), r.dispose = () => {
			e.removeEventListener("message", t, !0);
		};
	}
	if (r.installs.add(t), n) {
		let e = r.editors.get(n) || /* @__PURE__ */ new Set();
		e.add(t), r.editors.set(n, e);
	}
	return Jd.bind(null, e, r, t, n);
}
function Jd(e, t, n, r) {
	if (r) {
		let e = t.editors.get(r);
		e && e.delete(n) && e.size === 0 && t.editors.delete(r);
	}
	t.installs.delete(n) && t.installs.size === 0 && (t.dispose(), delete e[Kd]);
}
function Yd(e) {
	return e && e.ownerDocument.defaultView;
}
function Xd(e) {
	let t = id(() => Yd(e.getRootElement()), (t) => e.registerRootListener((e) => {
		t.value = Yd(e);
	}));
	return nd(() => {
		let n = t.value;
		if (n) return qd(n, Symbol("@lexical/dragon/editorInstall"), e);
	});
}
function Zd(e) {
	if (e.origin !== this.location.origin) return;
	let t = function(e) {
		let t = e[Kd];
		if (t === void 0) return null;
		let n = Ao(Xs(e.document));
		return Oo(n) && t.editors.has(n) ? n : null;
	}(this);
	if (t === null) return;
	let n = e.data;
	if (typeof n == "string") {
		let r;
		try {
			r = JSON.parse(n);
		} catch {
			return;
		}
		if (r && r.protocol === "nuanria_messaging" && r.type === "request") {
			let n = r.payload;
			if (n && n.functionId === "makeChanges") {
				let r = n.args;
				if (Array.isArray(r)) {
					let [n, i, a, o, s, c] = r;
					if (![
						n,
						i,
						o,
						s
					].every(Number.isFinite) || typeof a != "string" && a !== -1) return;
					t.update(() => {
						let t = N();
						if (j(t)) {
							let r = t.anchor, l = r.getNode(), u = 0, d = 0;
							if (A(l) && n >= 0 && i >= 0 && (u = n, d = n + i, t.setTextNodeRange(l, u, l, d)), typeof a != "string" || u === d && a === "" || (t.insertRawText(a), l = r.getNode()), A(l)) {
								let e = l.getTextContentSize();
								u = Math.min(Math.max(o, 0), e), d = o < 0 || s < 0 ? u : Math.min(o + s, e), t.setTextNodeRange(l, u, l, d);
							}
							if (typeof c == "string" && s > 0 && !t.isCollapsed()) {
								let e = Gd[c];
								e !== void 0 && t.formatText(e);
							}
							e.stopImmediatePropagation();
						}
					});
				}
			}
		}
	}
}
//#endregion
//#region node_modules/@lexical/html/dist/LexicalHtml.prod.mjs
function Qd(e, ...t) {
	let n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
	r.append("code", e);
	for (let e of t) r.append("v", e);
	throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
var $d;
function ef(e, t) {
	let { key: n } = t;
	return e && n in e ? e[n] : t.defaultValue;
}
function tf(e) {
	return $d && $d.editor === e ? $d : void 0;
}
function nf(e, t) {
	if ("cfg" in t) {
		let { cfg: n, updater: r } = t;
		return [n, r(ef(e, n))];
	}
	return t;
}
function rf(e, t) {
	let n = t;
	for (let r of e) {
		let [e, i] = nf(n, r), a = e.key;
		if (n === t && ef(n, e) === i) continue;
		let o = n === t || n === void 0 ? af(t) : n;
		o[a] = i, n = o;
	}
	return n;
}
function af(e) {
	return Object.create(e || null);
}
function of(e, t) {
	return [e, t];
}
function sf(e, t, n, r = U()) {
	let i = $d, a = tf(r);
	try {
		return $d = {
			...a,
			editor: r,
			[e]: t
		}, n();
	} finally {
		$d = i;
	}
}
function cf(e, t = () => {}) {
	return (n, r = U()) => (i) => {
		let a = tf(r), o = a && a[e], s = rf(n, o || t(r));
		return s && s !== o ? sf(e, s, i, r) : i();
	};
}
function lf(e, t, n, r) {
	return Object.assign(Ze(Symbol(t), {
		isEqual: r,
		parse: n
	}), { [e]: !0 });
}
function uf(e) {
	if (!Po(e)) return;
	let t = e;
	if (t.querySelector("style") === null) return;
	let n = /* @__PURE__ */ new Map();
	function r(e) {
		let t = n.get(e);
		if (t === void 0) {
			t = /* @__PURE__ */ new Set();
			for (let n = 0; n < e.style.length; n++) t.add(e.style[n]);
			n.set(e, t);
		}
		return t;
	}
	try {
		for (let e of Array.from(t.styleSheets)) {
			let n;
			try {
				n = e.cssRules;
			} catch {
				continue;
			}
			for (let e of Array.from(n)) {
				if (!Eu(e, CSSStyleRule)) continue;
				let n;
				try {
					n = t.querySelectorAll(e.selectorText);
				} catch {
					continue;
				}
				for (let t of Array.from(n)) {
					if (!V(t)) continue;
					let n = r(t);
					for (let r = 0; r < e.style.length; r++) {
						let i = e.style[r];
						n.has(i) || t.style.setProperty(i, e.style.getPropertyValue(i), e.style.getPropertyPriority(i));
					}
				}
			}
		}
	} catch {}
}
var df = "@lexical/html/DOM", ff = Symbol.for("@lexical/html/DOMExportContext");
function pf(e, t, n) {
	return lf(ff, e, t, n);
}
var mf = /* @__PURE__ */ pf("isExport", Boolean);
function hf(e) {
	let t = jd(e, df);
	return t ? t.output.defaults : void 0;
}
function gf(e) {
	let t = jd(e, df);
	return t ? t.output.runtime : void 0;
}
function _f(e = U()) {
	let t = gf(e);
	return t ? t.getSessionConfig() : ac(e);
}
var vf = cf(ff, hf), yf = Symbol.for("@lexical/html/SelectorImpl");
function bf(e, t) {
	let n = {
		kind: "element",
		predicate: (r = t, r.length === 0 ? V : r.length === 1 ? r[0] : (e, t) => {
			for (let n of r) if (!n(e, t)) return !1;
			return !0;
		}),
		tags: e
	};
	var r;
	let i = (n) => bf(e, [...t, n]);
	return {
		[yf]: n,
		attr: (e, t, n) => i(Cf(e, t, n)),
		classAll: (...e) => i(Sf(e)),
		classAny: (...e) => i(function(e) {
			let t = xf(e);
			return t.length === 0 ? () => !1 : (e) => {
				if (!V(e)) return !1;
				let n = e.classList;
				for (let e of t) if (n.contains(e)) return !0;
				return !1;
			};
		}(e)),
		styleAny: (e, t, n) => i(function(e, t, n) {
			if (typeof t == "string") return (n) => V(n) && n.style.getPropertyValue(e) === t;
			if (t instanceof RegExp) {
				let r = n && n.capture, i = t;
				return (t, n) => {
					if (!V(t)) return !1;
					let a = t.style.getPropertyValue(e);
					if (!a) return !1;
					let o = a.match(i);
					return o !== null && (r !== void 0 && (n[r] = o), !0);
				};
			}
			Qd(362, JSON.stringify(e));
		}(e, t, n))
	};
}
function xf(e) {
	let t = [];
	for (let n of e) n && t.push(n);
	return t;
}
function Sf(e) {
	let t = xf(e);
	return t.length === 0 ? () => !0 : (e) => {
		if (!V(e)) return !1;
		let n = e.classList;
		for (let e of t) if (!n.contains(e)) return !1;
		return !0;
	};
}
function Cf(e, t, n) {
	if (!0 === t) return (t) => V(t) && t.hasAttribute(e);
	if (typeof t == "string") return (n) => V(n) && n.getAttribute(e) === t;
	if (t instanceof RegExp) {
		let r = n && n.capture, i = t;
		return (t, n) => {
			if (!V(t)) return !1;
			let a = t.getAttribute(e);
			if (a == null) return !1;
			let o = a.match(i);
			return o !== null && (r !== void 0 && (n[r] = o), !0);
		};
	}
	Qd(361, JSON.stringify(e));
}
var wf = {
	kind: "text",
	predicate: No,
	tags: /* @__PURE__ */ new Set()
}, Tf = { [yf]: wf }, Ef = {
	kind: "comment",
	predicate: (e) => e.nodeType === 8,
	tags: /* @__PURE__ */ new Set()
}, Df = { [yf]: Ef }, Of = {
	any: () => bf(/* @__PURE__ */ new Set(), []),
	comment: () => Df,
	tag(...e) {
		e.length > 0 || Qd(363);
		let t = /* @__PURE__ */ new Set();
		for (let n of e) t.add(n.toUpperCase());
		return bf(t, []);
	},
	text: () => Tf
}, kf = /[A-Za-z0-9_-]/, Af = class {
	constructor(e, t) {
		this.source = e, this.pos = t;
	}
	peek(e = 0) {
		return this.source[this.pos + e] || "";
	}
	consume() {
		return this.source[this.pos++] || "";
	}
	eof() {
		return this.pos >= this.source.length;
	}
	skipWhitespace() {
		for (; !this.eof() && /\s/.test(this.peek());) this.pos++;
	}
	readIdent() {
		let e = this.pos;
		for (; !this.eof() && kf.test(this.peek());) this.pos++;
		return this.source.slice(e, this.pos);
	}
	readQuoted() {
		let e = this.consume();
		this.assert(e === "\"" || e === "'", "expected quote");
		let t = this.pos;
		for (; !this.eof() && this.peek() !== e;) this.peek() === "\\" ? this.pos += 2 : this.pos++;
		this.assert(!this.eof(), "unterminated string");
		let n = this.source.slice(t, this.pos);
		return this.pos++, n.replace(/\\(.)/g, "$1");
	}
	assert(e, t) {
		e || Qd(364, String(this.pos + 1), t, this.source);
	}
};
function jf(e) {
	let t = /* @__PURE__ */ new Set(), n = [], r = [];
	if (e.skipWhitespace(), e.peek() === "*") e.consume();
	else if (kf.test(e.peek())) {
		let n = e.readIdent();
		n && t.add(n.toUpperCase());
	}
	for (; !e.eof();) {
		let t = e.peek();
		if (t === ".") {
			e.consume();
			let t = e.readIdent();
			e.assert(t !== "", "expected class name after \".\""), r.push(t);
		} else if (t === "#") {
			e.consume();
			let t = e.readIdent();
			e.assert(t !== "", "expected id after \"#\""), n.push(Cf("id", t));
		} else {
			if (t !== "[") break;
			{
				e.consume(), e.skipWhitespace();
				let t = e.readIdent();
				e.assert(t !== "", "expected attribute name after \"[\""), e.skipWhitespace();
				let r = !0;
				if (e.peek() === "=") {
					e.consume(), e.skipWhitespace();
					let t = e.peek();
					t === "\"" || t === "'" ? r = e.readQuoted() : (r = e.readIdent(), e.assert(r !== "", "expected attribute value")), e.skipWhitespace();
				}
				e.assert(e.peek() === "]", "expected \"]\""), e.consume(), n.push(Cf(t, r));
			}
		}
	}
	return r.length > 0 && n.push(Sf(r)), {
		predicates: n,
		tags: t
	};
}
function Mf(e) {
	let t = new Af(e, 0), n = [];
	for (;;) {
		let e = jf(t);
		if (n.push(e), t.skipWhitespace(), t.eof()) break;
		t.assert(t.peek() === ",", "expected \",\" (selector lists are the only supported combinator)"), t.consume(), t.skipWhitespace();
	}
	if (n.length === 1) return bf(n[0].tags, n[0].predicates);
	let r = /* @__PURE__ */ new Set();
	for (let e of n) for (let t of e.tags) r.add(t);
	return bf(r, [(e, t) => {
		for (let r of n) {
			let n = e.nodeName;
			if (r.tags.size > 0 && !r.tags.has(n)) continue;
			let i = !0;
			for (let n of r.predicates) if (!n(e, t)) {
				i = !1;
				break;
			}
			if (i) return !0;
		}
		return !1;
	}]);
}
function Nf(e) {
	return Gi(e) || F(e) && !e.isInline();
}
function Pf(e, t) {
	let n = [], r = [], i = () => {
		r.length !== 0 && (n.push(t().splice(0, 0, r)), r = []);
	};
	for (let a of e) if (Nf(a)) {
		if (i(), P(a)) {
			let e = Pf(a.getChildren(), t);
			a.splice(0, a.getChildrenSize(), e);
		}
		n.push(a);
	} else r.push(a);
	return i(), n;
}
var Ff = Of;
Ff.tag("b", "strong", "em", "i", "code", "mark", "s", "sub", "sup", "u", "span"), Ff.text(), Ff.tag("script", "style"), Ff.tag("br"), Ff.tag("p"), Ff.tag("hr"), Ff.any(), Object.freeze([]), Object.freeze({}), Of.any();
var If = {
	any: Of.any,
	comment: Of.comment,
	css: Mf,
	tag: Of.tag,
	text: Of.text
}, Lf = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function Rf(e, t) {
	uf(t);
	let n = Po(t) ? t.body.childNodes : t.childNodes, r = [], i = [];
	for (let t of n) if (!Lf.has(t.nodeName)) {
		let n = Hf(t, e, i, !1);
		if (n !== null) for (let e of n) r.push(e);
	}
	return function(e) {
		for (let t of e) t.getParent() && t.getNextSibling() instanceof to && t.insertAfter(io());
		for (let t of e) {
			let e = t.getParent();
			e && e.splice(t.getIndexWithinParent(), 1, t.getChildren());
		}
	}(i), r;
}
function zf(e, t = null, n = U()) {
	return vf([of(mf, !0)], n)(() => {
		let r = Yo(), i = _f(n), a = j(t) ? Pc(t.anchor.getNode()) : null, o = e.append.bind(e);
		for (let e of (P(a) ? a : r).getChildren()) Vf(n, e, o, t, i);
		return e;
	});
}
function Bf(e, t = null) {
	return (typeof document > "u" || typeof window > "u" && global.window === void 0) && Qd(338), Ea(e), zf(B().createElement("div"), t, e).innerHTML;
}
function Vf(e, t, n, r = null, i = ac(e)) {
	let a = i.$shouldInclude(t, r, e), o = i.$shouldExclude(t, r, e), s = t;
	r !== null && A(t) && (s = su(r, t, "clone"));
	let { element: c, after: l, append: u, $getChildNodes: d } = i.$exportDOM(s, e);
	if (!c) return !1;
	let f = B().createDocumentFragment(), p = d ? d() : P(s) ? s.getChildren() : [], m = a && Ei(r) && P(t) ? null : r, h = f.append.bind(f);
	for (let n of p) {
		let o = Vf(e, n, h, m, i);
		!a && o && i.$extractWithChild(t, n, r, "html", e) && (a = !0);
	}
	if (a && !o) {
		if ((V(c) || ec(c)) && (u ? u(f) : c.append(f)), n(c), l) {
			let e = l.call(s, c);
			e && (ec(c) ? c.replaceChildren(e) : c.replaceWith(e));
		}
	} else n(f);
	return a;
}
function Hf(e, t, n, r, i = /* @__PURE__ */ new Map(), a) {
	let o = [];
	if (Lf.has(e.nodeName)) return o;
	let s = null, c = function(e, t) {
		let { nodeName: n } = e, r = t._htmlConversions.get(n.toLowerCase()), i = null;
		if (r !== void 0) for (let t of r) {
			let n = t(e);
			n !== null && (i === null || (i.priority || 0) <= (n.priority || 0)) && (i = n);
		}
		return i === null ? null : i.conversion;
	}(e, t), l = c ? c(e) : null, u = null;
	if (l !== null) {
		u = l.after;
		let t = l.node;
		if (s = Array.isArray(t) ? t[t.length - 1] : t, s !== null) {
			for (let [, e] of i) if (s = e(s, a), !s) break;
			s && o.push(...Array.isArray(t) ? t : [s]);
		}
		l.forChild != null && i.set(e.nodeName, l.forChild);
	}
	let d = e.childNodes, f = [], p = (s == null || !ks(s)) && (s != null && Gi(s) || r);
	for (let e = 0; e < d.length; e++) f.push(...Hf(d[e], t, n, p, new Map(i), s));
	if (u != null && (f = u(f)), ic(e) && (f = Uf(e, f, p ? () => {
		let e = new to();
		return n.push(e), e;
	} : I)), s == null) if (f.length > 0) for (let e of f) o.push(e);
	else ic(e) && function(e) {
		return e.nextSibling == null || e.previousSibling == null ? !1 : nc(e.nextSibling) && nc(e.previousSibling);
	}(e) && o.push(io());
	else P(s) && s.append(...f);
	return o;
}
function Uf(e, t, n) {
	let r = e.style.textAlign, i = [], a = [];
	for (let e = 0; e < t.length; e++) {
		let o = t[e];
		if (Gi(o)) r && !o.getFormat() && o.setFormat(r), i.push(o);
		else if (a.push(o), e === t.length - 1 || e < t.length - 1 && Gi(t[e + 1])) {
			let e = n();
			e.setFormat(r), e.append(...a), i.push(e), a = [];
		}
	}
	return i;
}
//#endregion
//#region node_modules/@lexical/clipboard/dist/LexicalClipboard.prod.mjs
function Wf(e, t, n = null) {
	let r = Hs(n), i = n ? Bs(n) : [], a = n !== null && i.length > 0;
	if (a && typeof r.caretPositionFromPoint == "function") {
		let a = r.caretPositionFromPoint(e, t, { shadowRoots: i });
		if (a !== null && function(e, t) {
			for (let n = e; n !== null;) {
				if (n === t) return !0;
				n = ys(n);
			}
			return !1;
		}(a.offsetNode, n)) return {
			node: a.offsetNode,
			offset: a.offset
		};
	}
	if (a) {
		let i = n.getRootNode();
		if (Rs(i)) {
			let a = i.elementFromPoint(e, t);
			if (a !== null && n.contains(a)) {
				let n = function(e, t, n, r) {
					let i = r.createRange(), a = (e) => t < e.top ? e.top - t : t > e.bottom ? t - e.bottom : 0, o = (t) => e < t.left ? t.left - e : e > t.right ? e - t.right : 0, s = r.createTreeWalker(n, NodeFilter.SHOW_TEXT), c = null, l = Infinity, u = Infinity;
					for (let e = s.nextNode(); e; e = s.nextNode()) {
						i.selectNodeContents(e);
						for (let t of i.getClientRects()) {
							let n = a(t), r = o(t);
							(n < l || n === l && r < u) && (l = n, u = r, c = e);
						}
					}
					if (c === null) return null;
					let d = 0, f = Infinity, p = Infinity;
					for (let t = 0; t <= c.length; t++) {
						i.setStart(c, t), i.collapse(!0);
						let n = i.getBoundingClientRect(), r = a(n), o = Math.abs(e - n.left);
						(r < f || r === f && o < p) && (f = r, p = o, d = t);
					}
					return {
						node: c,
						offset: d
					};
				}(e, t, a, r);
				if (n !== null) return n;
			}
		}
	}
	if (typeof r.caretRangeFromPoint == "function") {
		let n = r.caretRangeFromPoint(e, t);
		return n === null ? null : {
			node: n.startContainer,
			offset: n.startOffset
		};
	}
	if (typeof r.caretPositionFromPoint == "function") {
		let n = r.caretPositionFromPoint(e, t);
		return n === null ? null : {
			node: n.offsetNode,
			offset: n.offset
		};
	}
	return null;
}
function Gf(e, ...t) {
	let n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
	r.append("code", e);
	for (let e of t) r.append("v", e);
	throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
var Kf = {
	"application/x-lexical-editor": 0,
	"text/html": 10,
	"text/plain": 20,
	"text/uri-list": 30
};
function qf(e) {
	return window.trustedTypes && window.trustedTypes.createPolicy ? window.trustedTypes.createPolicy("lexical", { createHTML: (e) => e }).createHTML(e) : e;
}
var Jf = (e, t) => {
	if (!j(t)) return t.insertRawText(e), !0;
	let n = (e) => {
		let t = N();
		j(t) && e(t);
	};
	return oa(e, {
		linebreak: () => n((e) => e.insertParagraph()),
		tab: () => n((e) => e.insertNodes([_i()])),
		text: (e) => n((t) => t.insertText(e))
	}), !0;
}, Yf = {
	"application/x-lexical-editor": [(e, t, n) => {
		try {
			let n = U(), r = JSON.parse(e);
			if (r && r.namespace === n._config.namespace && Array.isArray(r.nodes)) return sp(n, up(r.nodes), t), !0;
		} catch (e) {
			console.error(e);
		}
		return n();
	}],
	"text/html": [(e, t, n) => {
		try {
			let n = U();
			return sp(n, Rf(n, new DOMParser().parseFromString(qf(e), "text/html")), t), !0;
		} catch (e) {
			return console.error(e), n();
		}
	}],
	"text/plain": [Jf],
	"text/uri-list": [Jf]
};
function Xf(e, t, n, r) {
	if (!e) return !1;
	let i = (a) => !!e[a] && e[a](t, n, i.bind(null, a - 1), r);
	return i(e.length - 1);
}
function Zf(e, t, n) {
	let r = t.getData("text/plain");
	for (let i of function(e) {
		return Object.keys(e.$importMimeType).filter((t) => e.$importMimeType[t] !== void 0).sort((t, n) => {
			let r = e.priority[t], i = e.priority[n];
			return r === void 0 && i === void 0 ? t < n ? -1 : +(t > n) : r === void 0 ? 1 : i === void 0 ? -1 : r - i;
		});
	}(e)) {
		let a = t.getData(i);
		if (a && (i !== "text/html" || a !== r) && Xf(e.$importMimeType[i], a, n, t)) return !0;
	}
	return !1;
}
var Qf = {
	$importMimeType: Yf,
	$insertDataTransfer: (e, t) => Zf({
		$importMimeType: Yf,
		priority: Kf
	}, e, t),
	priority: Kf
}, $f = /* @__PURE__ */ Wl({
	build: (e, t) => ({
		$importMimeType: t.$importMimeType,
		$insertDataTransfer: (e, n) => Zf(t, e, n),
		priority: t.priority
	}),
	config: /* @__PURE__ */ Gl({
		$importMimeType: Yf,
		priority: Kf
	}),
	mergeConfig(e, t) {
		let n = Kl(e, t);
		if (t.$importMimeType) {
			let r = { ...e.$importMimeType };
			for (let [e, n] of Object.entries(t.$importMimeType)) if (n) {
				let t = r[e];
				r[e] = t ? [...t, ...n] : n;
			}
			n.$importMimeType = r;
		}
		return t.priority && (n.priority = {
			...e.priority,
			...t.priority
		}), n;
	},
	name: "@lexical/clipboard/Import"
});
function ep(e, t = N()) {
	return t ?? Gf(166), j(t) && t.isCollapsed() || t.getNodes().length === 0 ? "" : Bf(e, t);
}
function tp(e, t = N()) {
	return t ?? Gf(166), j(t) && t.isCollapsed() || t.getNodes().length === 0 ? null : JSON.stringify(lp(e, t));
}
function np(e, t, n) {
	(function() {
		let e = Md($f.name);
		return e ? e.output : Qf;
	})().$insertDataTransfer(e, t);
}
var rp = "application/x-lexical-drag";
function ip(e, t) {
	let n = { editorKey: t.getKey() };
	e.setData(rp, JSON.stringify(n));
}
function ap(e, t, n) {
	let r = e.dataTransfer;
	if (r === null) return !1;
	let i = function(e) {
		let t = e.getData(rp);
		if (!t) return null;
		let n;
		try {
			n = JSON.parse(t);
		} catch {
			return null;
		}
		return (r = n) !== null && typeof r == "object" && "editorKey" in r && typeof r.editorKey == "string" ? n : null;
		var r;
	}(r);
	if (i === null) return !1;
	let a = function(e, t) {
		let n = Wf(e.clientX, e.clientY, t.getRootElement());
		if (n === null) return null;
		let r = Ko(n.node);
		if (r === null) return null;
		if (A(r)) return ul(r, "next", n.offset);
		if (P(r)) return Bl(r, n.offset, "next");
		let i = r.getParent();
		return i === null ? null : Bl(i, r.getIndexWithinParent() + 1, "next");
	}(e, t);
	if (a === null) return !1;
	let o = Hl(a);
	if (o === null) return !1;
	let s = i.editorKey === t.getKey(), c = N();
	if (s) {
		if (!j(c) || c.isCollapsed()) return !1;
		if (function(e, t) {
			let { anchor: n, focus: r } = zl(jl(t), "next");
			return Sl(n, e) < 0 && Sl(e, r) < 0;
		}(a, c)) return e.preventDefault(), !0;
		c.removeText();
	}
	if (!o.origin.isAttached()) return e.preventDefault(), !0;
	if (n(r, kl(yl(o)), t), !s) {
		let e = t.getRootElement(), n = e ? e.ownerDocument : null, r = n ? function(e, t) {
			for (let n of Vs(t)) {
				let t = Ao(n);
				if (Oo(t) && t.getKey() === e && V(n)) return n;
			}
			return null;
		}(i.editorKey, n) : null;
		r !== null && r.dispatchEvent(new InputEvent("beforeinput", {
			bubbles: !0,
			cancelable: !0,
			inputType: "deleteByDrag"
		}));
	}
	return e.preventDefault(), !0;
}
function op(e, t) {
	return ap(e, t, np);
}
function sp(e, t, n) {
	e.dispatchCommand(fn, {
		nodes: t,
		selection: n
	}) || (n.insertNodes(t), function(e) {
		if (j(e) && e.isCollapsed()) {
			let t = e.anchor, n = null, r = Dl(t, "previous");
			if (r) if (il(r)) n = r.origin;
			else {
				let e = bl(r, pl(Yo(), "next").getFlipped());
				for (let t of e) {
					if (A(t.origin)) {
						n = t.origin;
						break;
					}
					if (P(t.origin) && !t.origin.isInline()) break;
				}
			}
			if (n && A(n)) {
				let t = n.getFormat(), r = n.getStyle();
				e.format === t && e.style === r || (e.format = t, e.style = r, e.dirty = !0);
			}
		}
	}(n));
}
function cp(e, t, n, r = []) {
	let i = t === null || n.isSelected(t), a = P(n) && n.excludeFromCopy("html"), o = n;
	t !== null && A(o) && (o = su(t, o, "clone"));
	let s = P(o) ? o.getChildren() : [], c = function(e) {
		let t = e.exportJSON(), n = e.constructor;
		if (t.type !== n.getType() && Gf(58, n.name), P(e)) {
			let e = t.children;
			Array.isArray(e) || Gf(59, n.name);
		}
		return t;
	}(o);
	A(o) && o.getTextContentSize() === 0 && (i = !1);
	let l = i && Ei(t) && P(n) ? null : t;
	for (let r = 0; r < s.length; r++) {
		let a = s[r], o = cp(e, l, a, c.children);
		!i && P(n) && o && n.extractWithChild(a, t, "clone") && (i = !0);
	}
	if (i && !a) {
		let t = Ic(o);
		if (t.length > 0) {
			let n = {};
			for (let r of t) {
				let t = Lc(o, r);
				t === null && Gf(366, o.constructor.name, r);
				let i = [];
				cp(e, null, t, i), i.length === 1 && i[0].type === t.getType() || Gf(385, r, o.constructor.name, String(i.length), String(i.length > 0 ? i[0].type : "none")), n[r] = i[0];
			}
			c.$slots = n;
		}
	}
	if (i && !a) r.push(c);
	else if (Array.isArray(c.children)) for (let e = 0; e < c.children.length; e++) {
		let t = c.children[e];
		r.push(t);
	}
	return i;
}
function lp(e, t) {
	let n = [], r = Yo(), i = j(t) ? t.anchor.getNode() : Ei(t) ? t.getNodes()[0] ?? null : null, a = i === null ? null : Pc(i), o = (P(a) ? a : r).getChildren();
	for (let r = 0; r < o.length; r++) cp(e, t, o[r], n);
	return {
		namespace: e._config.namespace,
		nodes: n
	};
}
function up(e) {
	let t = [];
	for (let n of e) t.push(Pa(n));
	return t;
}
var dp = null;
async function fp(e, t, n) {
	if (dp !== null) return !1;
	if (t !== null) return new Promise((r, i) => {
		e.update(() => {
			r(pp(e, t, n));
		});
	});
	let r = e.getRootElement(), i = e._window || window, a = i.document, o = Is(i);
	if (r === null || o === null) return !1;
	let s = a.createElement("span");
	s.style.position = "fixed", s.style.top = "-1000px", s.append(a.createTextNode("#")), r.append(s);
	let c = a.createRange();
	return c.setStart(s, 0), c.setEnd(s, 1), o.removeAllRanges(), o.addRange(c), new Promise((t, r) => {
		let o = e.registerCommand(Zn, (r) => (Eu(r, ClipboardEvent) && (o(), dp !== null && (i.clearTimeout(dp), dp = null), t(pp(e, r, n))), !0), 4);
		dp = i.setTimeout(() => {
			o(), dp = null, t(!1);
		}, 50), a.execCommand("copy"), s.remove();
	});
}
function pp(e, t, n) {
	if (n === void 0) {
		let t = Is(e._window), r = N();
		if (!r || r.isCollapsed() || !t) return !1;
		let i = Gs(t, e.getRootElement()), a = i.anchorNode, o = i.focusNode;
		if (a !== null && o !== null && !Do(e, a, o)) return !1;
		n = hp(r);
	}
	t.preventDefault();
	let r = t.clipboardData;
	return r !== null && (gp(r, n), !0);
}
var mp = [["text/html", ep], ["application/x-lexical-editor", tp]];
function hp(e = N()) {
	return function(e, t) {
		let n = { "text/plain": "" };
		for (let [r, i] of Object.entries(e)) if (i) {
			let e = yp(i, t);
			e !== null && (n[r] = e);
		}
		return n;
	}(_p(), e);
}
function gp(e, t) {
	for (let [n] of mp) t[n] === void 0 && e.setData(n, "");
	for (let n in t) {
		let r = t[n];
		r !== void 0 && e.setData(n, r);
	}
}
function _p(e = U()) {
	let t = jd(e, bp.name);
	return t ? t.output : vp;
}
var vp = {
	"application/x-lexical-editor": [(e, t) => e ? tp(U(), e) : t()],
	"text/html": [(e, t) => e ? ep(U(), e) : t()],
	"text/plain": [(e, t) => e ? e.getTextContent() : t()]
};
function yp(e, t) {
	let n = (r) => e[r] ? e[r](t, n.bind(null, r - 1)) : null;
	return n(e.length - 1);
}
var bp = /* @__PURE__ */ Wl({
	build: (e, t, n) => t.$exportMimeType,
	config: /* @__PURE__ */ Gl({ $exportMimeType: vp }),
	mergeConfig(e, t) {
		let n = Kl(e, t);
		if (t.$exportMimeType) {
			let r = { ...e.$exportMimeType };
			for (let [e, n] of Object.entries(t.$exportMimeType)) if (n) {
				let t = r[e];
				r[e] = t ? [...t, ...n] : n;
			}
			n.$exportMimeType = r;
		}
		return n;
	},
	name: "@lexical/clipboard/GetClipboardData"
});
If.tag("h1", "h2", "h3", "h4", "h5", "h6"), If.tag("blockquote"), If.tag("blockquote"), If.tag("p"), If.tag("span");
var xp = /* @__PURE__ */ k("DRAG_DROP_PASTE_FILE"), Sp = /* @__PURE__ */ Ze("shadowRoot", { parse: Boolean }), Cp = class e extends Ga {
	static getType() {
		return "quote";
	}
	static clone(t) {
		return new e(t.__key);
	}
	$config() {
		return this.config("quote", {
			extends: Ga,
			stateConfigs: [{
				flat: !0,
				stateConfig: Sp
			}]
		});
	}
	isShadowRoot() {
		return Qe(this, Sp);
	}
	setIsShadowRoot(e) {
		return $e(this, Sp, e);
	}
	createDOM(e) {
		let t = B().createElement("blockquote");
		return Jl(t, e.theme.quote), t;
	}
	updateDOM(e, t) {
		return !1;
	}
	static importDOM() {
		return { blockquote: (e) => ({
			conversion: kp,
			priority: 0
		}) };
	}
	exportDOM(e) {
		let { element: t } = super.exportDOM(e);
		if (V(t)) {
			this.isEmpty() && t.append(B().createElement("br"));
			let e = this.getFormatType();
			e && (t.style.textAlign = e);
			let n = this.getDirection();
			n && (t.dir = n);
		}
		return { element: t };
	}
	static importJSON(e) {
		return wp().updateFromJSON(e);
	}
	exportJSON() {
		return super.exportJSON();
	}
	insertNewAfter(e, t) {
		let n = I(), r = this.getDirection();
		return n.setDirection(r), this.insertAfter(n, t), n;
	}
	collapseAtStart() {
		if (this.isShadowRoot()) {
			for (let e of this.getChildren()) this.insertBefore(e);
			return this.remove(), !0;
		}
		let e = I();
		return this.getChildren().forEach((t) => e.append(t)), this.replace(e), !0;
	}
	canMergeWhenEmpty() {
		return !0;
	}
};
function wp(e) {
	let t = js(new Cp());
	return e && e.shadowRoot ? t.setIsShadowRoot(!0) : t;
}
function Tp(e) {
	return e instanceof Cp;
}
var Ep = class e extends Ga {
	__tag;
	static getType() {
		return "heading";
	}
	static clone(t) {
		return new e(t.__tag, t.__key);
	}
	afterCloneFrom(e) {
		super.afterCloneFrom(e), this.__tag = e.__tag;
	}
	constructor(e = "h1", t) {
		super(t), this.__tag = e;
	}
	getTag() {
		return this.getLatest().__tag;
	}
	setTag(e) {
		let t = this.getWritable();
		return t.__tag = e, t;
	}
	createDOM(e) {
		let t = this.__tag, n = B().createElement(t), r = e.theme.heading;
		if (r !== void 0) {
			let e = r[t];
			Jl(n, e);
		}
		return n;
	}
	updateDOM(e, t, n) {
		return e.__tag !== this.__tag;
	}
	static importDOM() {
		return {
			h1: (e) => ({
				conversion: Op,
				priority: 0
			}),
			h2: (e) => ({
				conversion: Op,
				priority: 0
			}),
			h3: (e) => ({
				conversion: Op,
				priority: 0
			}),
			h4: (e) => ({
				conversion: Op,
				priority: 0
			}),
			h5: (e) => ({
				conversion: Op,
				priority: 0
			}),
			h6: (e) => ({
				conversion: Op,
				priority: 0
			}),
			p: (e) => {
				let t = e.firstChild;
				return t !== null && Dp(t) ? {
					conversion: () => ({ node: null }),
					priority: 3
				} : null;
			},
			span: (e) => Dp(e) ? {
				conversion: (e) => ({ node: Ap("h1") }),
				priority: 3
			} : null
		};
	}
	exportDOM(e) {
		let { element: t } = super.exportDOM(e);
		if (V(t)) {
			this.isEmpty() && t.append(B().createElement("br"));
			let e = this.getFormatType();
			e && (t.style.textAlign = e);
			let n = this.getDirection();
			n && (t.dir = n);
		}
		return { element: t };
	}
	static importJSON(e) {
		return Ap(e.tag).updateFromJSON(e);
	}
	updateFromJSON(e) {
		return super.updateFromJSON(e).setTag(e.tag);
	}
	exportJSON() {
		return {
			...super.exportJSON(),
			tag: this.getTag()
		};
	}
	insertNewAfter(e, t = !0) {
		let n = e ? e.anchor.offset : 0, r = this.getLastDescendant(), i = !r || e && e.anchor.key === r.getKey() && n === r.getTextContentSize() || !e ? I() : Ap(this.getTag()), a = this.getDirection();
		if (i.setDirection(a), this.insertAfter(i, t), n === 0 && !this.isEmpty() && e) {
			let e = I();
			e.select(), this.replace(e, !0);
		}
		return i;
	}
	collapseAtStart() {
		if (this.isEmpty()) {
			let e = I();
			this.getChildren().forEach((t) => e.append(t)), this.replace(e);
		}
		return !0;
	}
	extractWithChild() {
		return !0;
	}
};
function Dp(e) {
	return e.nodeName.toLowerCase() === "span" && e.style.fontSize === "26pt";
}
function Op(e) {
	let t = e.nodeName.toLowerCase(), n = null;
	return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6" || (n = Ap(t), mc(e, n), gc(n, e), hc(n, e)), { node: n };
}
function kp(e) {
	let t = wp();
	return gc(t, e), mc(e, t), hc(t, e), { node: t };
}
function Ap(e = "h1") {
	return js(new Ep(e));
}
function jp(e) {
	return e instanceof Ep;
}
function Mp(e) {
	return F(Ko(e));
}
function Np(e, t, n, r) {
	let i = !1, a = null;
	if (e.isCollapsed() && e.anchor.type === "text") {
		let t = e.anchor.getNode();
		if (A(t)) {
			a = t;
			let r = e.anchor.offset, o = r === t.getTextContentSize() && t.getNextSibling() === null, s = r === 0 && t.getPreviousSibling() === null;
			i = n === "end" && o || n === "start" && s || n === "both" && (o || s);
		}
	}
	let o = !1;
	for (let [n, s] of Object.entries(r)) {
		if (s == null || !s[t]) continue;
		let r = n;
		if (s.onlyAtBoundary) {
			if (!(i && a && A(a) && a.hasFormat(r))) continue;
			o = !0;
		}
		e.hasFormat(r) && e.toggleFormat(r);
	}
	o && e.setStyle("");
}
var Pp = {
	capitalize: {
		enter: !0,
		space: !0,
		tab: !0
	},
	lowercase: {
		enter: !0,
		space: !0,
		tab: !0
	},
	uppercase: {
		enter: !0,
		space: !0,
		tab: !0
	}
};
function Fp(e, t) {
	return function(e, t) {
		if (!e.isCollapsed()) return !1;
		let n = Dl(e.focus, t), r = W(n.origin, Os);
		if (!r) return !1;
		let i = e.focus.getNode();
		if (!r.is(i) && !Cs(i, r)) return !1;
		let a = bl(n, G(r, t));
		if (a.getTextSlices().some((e) => e && e.getTextContentSize() > 0)) return !1;
		let o = bl(a.anchor.getSiblingCaret(), a.focus), s = o.anchor.origin;
		for (let e of o) {
			if (!al(e) || !e.origin.is(s.getParent())) return !1;
			s = e.origin;
		}
		let c = r;
		for (let e of vl(G(r, t))) {
			if (!e.origin.is(c.getParent())) {
				if (Ps(e.origin)) {
					let e = G(c, t);
					return kl(bl(e, e)), !0;
				}
				break;
			}
			if (!Os(e.origin)) break;
			c = e.origin;
		}
		return !1;
	}(e, t) || function(e, t) {
		if (!e.isCollapsed() || e.anchor.type !== "element") return !1;
		let n = Dl(e.anchor, t).getNodeAtCaret();
		return !(!Os(n) || n.isInline() || (kl(yl(Il(pl(n, t)))), 0));
	}(e, t);
}
function Ip(e) {
	return F(e) && !e.isInline() && !e.isIsolated() && e.isKeyboardSelectable();
}
function Lp(e) {
	let t = Ji();
	t.add(e), Xo(t);
}
function Rp(e, t) {
	if (!e.isCollapsed()) return !1;
	let n = e.focus, r = n.getNode(), i = t ? "previous" : "next", a = Dl(n, i);
	if (n.type === "element" && P(r) && (Ya(r) || Os(r))) {
		let e = a.getNodeAtCaret();
		return !(e === null || !Ip(e)) && (Lp(e.__key), !0);
	}
	let o = W(P(r) ? r : r.getParentOrThrow(), (e) => P(e) && !e.isInline() && ks(e.getParent()));
	if (o === null) return !1;
	let s = G(o, i).getNodeAtCaret();
	if (s === null || !Ip(s)) return !1;
	if (o.getTextContentSize() === 0) return Lp(s.__key), !0;
	let c = U().getRootElement();
	if (c === null) return !1;
	let l = Is(c.ownerDocument.defaultView);
	if (l === null || l.rangeCount === 0) return !1;
	let u = l.anchorNode, d = l.anchorOffset, f = l.focusNode, p = l.focusOffset;
	l.modify("move", t ? "backward" : "forward", "line");
	let m = l.anchorNode, h = l.anchorOffset;
	if (m === null) return zp(l, u, d, f, p), !1;
	let g = Ko(m);
	return zp(l, u, d, f, p), g !== null && (m === u && h === d || !g.is(o) && !Cs(g, o)) && (Lp(s.__key), !0);
}
function zp(e, t, n, r, i) {
	t !== null && r !== null && e.setBaseAndExtent(t, n, r, i);
}
function Bp(e, t) {
	if (!e.isCollapsed()) return !1;
	let n = e.focus.getNode(), r = W(P(n) ? n : n.getParentOrThrow(), (e) => P(e) && !e.isInline());
	if (r === null) return !1;
	let i = U(), a = i.getRootElement();
	if (a === null) return !1;
	let o = a.ownerDocument.defaultView;
	if (o === null) return !1;
	let s = !1;
	for (let e of r.getChildren()) if (P(e) && e.isInline()) {
		let t = i.getElementByKey(e.getKey());
		if (t !== null) {
			let e = o.getComputedStyle(t).display;
			if (e === "inline-grid" || e === "inline-flex") {
				s = !0;
				break;
			}
		}
	}
	if (!s) return !1;
	let c = G(r, t ? "previous" : "next").getNodeAtCaret();
	if (c === null || !P(c)) {
		if (t) {
			let e = r.getFirstDescendant();
			A(e) ? e.select(0, 0) : r.select(0, 0);
		} else {
			let e = r.getLastDescendant();
			if (A(e)) {
				let t = e.getTextContentSize();
				e.select(t, t);
			} else {
				let e = r.getChildrenSize();
				r.select(e, e);
			}
		}
		return !0;
	}
	let l = i.getElementByKey(c.getKey());
	if (l === null) return !1;
	let u = Is(o);
	if (u === null || u.rangeCount === 0) return !1;
	let d = u.getRangeAt(0).cloneRange();
	d.collapse(!0);
	let f = d.getBoundingClientRect(), p = l.getBoundingClientRect(), m = p.top + p.height / 2;
	if (f.height > 0) {
		let t = Wf(f.left, m, a);
		if (t !== null && l.contains(t.node)) {
			let n = a.ownerDocument.createRange();
			return n.setStart(t.node, t.offset), n.collapse(!0), e.applyDOMRange(n), e.dirty = !0, !0;
		}
	}
	let h = t ? c.getLastDescendant() : c.getFirstDescendant();
	if (A(h)) {
		let e = t ? h.getTextContentSize() : 0;
		h.select(e, e);
	} else {
		let e = c.getChildrenSize();
		c.select(t ? e : 0, t ? e : 0);
	}
	return !0;
}
function Vp(e, t) {
	let n = G(e, t), r = n.getAdjacentCaret();
	r !== null && P(r.origin) && !r.origin.isInline() && r.origin.isShadowRoot() ? kl(yl(n)) : t === "next" ? e.selectNext(0, 0) : e.selectPrevious();
}
function Hp(e, t, n) {
	n.preventDefault(), n.stopPropagation();
	let r = e.getNodes();
	if (r.length === 0) return !0;
	let i = r.map((e) => G(e, "next")).sort(Sl), a = (t ? i[0] : i[i.length - 1]).origin, o = W(a, (e) => e !== a && P(e) && !e.isInline()) ?? Yo(), s = t ? 0 : o.getChildrenSize();
	return o.select(s, s), !0;
}
function Up(e, t = qu(Pp)) {
	return Xl(e.registerCommand(pn, () => {
		let e = N();
		return Ei(e) ? (e.clear(), !0) : (j(e) && Np(e, "click", "both", t.peek()), !1);
	}, 0), e.registerCommand(vn, (e) => {
		let t = N();
		return j(t) ? (t.deleteCharacter(e), !0) : !!Ei(t) && (t.deleteNodes(), !0);
	}, 0), e.registerCommand(wn, (e) => {
		let t = N();
		return !!j(t) && (t.deleteWord(e), !0);
	}, 0), e.registerCommand(Tn, (e) => {
		let t = N();
		return !!j(t) && (t.deleteLine(e), !0);
	}, 0), e.registerCommand(xn, (t) => {
		let n = N();
		if (typeof t == "string") n !== null && n.insertText(t);
		else {
			if (n === null) return !1;
			let r = t.dataTransfer;
			if (r != null) np(r, n, e);
			else if (j(n)) {
				let e = t.data;
				return e && n.insertText(e), !0;
			}
		}
		return !0;
	}, 0), e.registerCommand(Cn, () => {
		let e = N();
		return !!j(e) && (e.removeText(), !0);
	}, 0), e.registerCommand(En, (e) => {
		let t = N();
		return !(!j(t) && !Ei(t)) && (ki(t, e), !0);
	}, 0), e.registerCommand(Dn, (e) => {
		let t = N();
		return !(!j(t) && !Ei(t)) && (Oi(t, e), !0);
	}, 0), e.registerCommand(qn, (e) => {
		let t = N();
		if (!j(t) && !Ei(t)) return !1;
		let n = t.getNodes();
		for (let t of n) {
			let n = W(t, (e) => P(e) && !e.isInline());
			n !== null && n.setFormat(e);
		}
		return !0;
	}, 0), e.registerCommand(yn, (e) => {
		let t = N();
		return !!j(t) && (t.insertLineBreak(e), !0);
	}, 0), e.registerCommand(bn, () => {
		let e = N();
		return !!j(e) && (e.insertParagraph(), !0);
	}, 0), e.registerCommand(Un, () => {
		let e = _i(), t = N();
		return j(t) && (e.setFormat(t.format), e.setStyle(t.style)), aa([e]), !0;
	}, 0), e.registerCommand(Wn, () => Ou((e) => {
		let t = e.getIndent();
		e.setIndent(t + 1);
	}), 0), e.registerCommand(Gn, () => Ou((e) => {
		let t = e.getIndent();
		t > 0 && e.setIndent(Math.max(0, t - 1));
	}), 0), e.registerCommand(Fn, (e) => {
		let t = N();
		if (Ei(t)) {
			let n = t.getNodes();
			if (n.length > 0) return e.preventDefault(), Vp(n[0], "previous"), !0;
		} else if (j(t) && (!e.shiftKey && Fp(t, "previous") || !e.shiftKey && Rp(t, !0) || !e.shiftKey && Bp(t, !0))) return e.preventDefault(), !0;
		return !1;
	}, 0), e.registerCommand(In, (e) => {
		let t = N();
		if (Ei(t)) {
			let n = t.getNodes();
			if (n.length > 0) return e.preventDefault(), Vp(n[0], "next"), !0;
		} else if (j(t) && (function(e) {
			let t = e.focus;
			return t.key === "root" && t.offset === Yo().getChildrenSize();
		}(t) || !e.shiftKey && Fp(t, "next") || !e.shiftKey && Rp(t, !1) || !e.shiftKey && Bp(t, !1))) return e.preventDefault(), !0;
		return !1;
	}, 0), e.registerCommand(Nn, (e) => {
		let n = N();
		if (Ei(n)) {
			let t = n.getNodes();
			if (t.length > 0) return e.preventDefault(), Vp(t[0], ou(t[0]) ? "next" : "previous"), !0;
		}
		if (!j(n)) return !1;
		if (!e.shiftKey && Fp(n, ou(n.anchor.getNode()) ? "next" : "previous")) return e.preventDefault(), !0;
		if (e.shiftKey || Np(n, "arrow", "start", t.peek()), pu(n, !0)) {
			let t = e.shiftKey;
			return e.preventDefault(), gu(n, t, !0), !0;
		}
		return !1;
	}, 0), e.registerCommand(jn, (e) => {
		let n = N();
		if (Ei(n)) {
			let t = n.getNodes();
			if (t.length > 0) return e.preventDefault(), Vp(t[0], ou(t[0]) ? "previous" : "next"), !0;
		}
		if (!j(n)) return !1;
		if (!e.shiftKey && Fp(n, ou(n.anchor.getNode()) ? "previous" : "next")) return e.preventDefault(), !0;
		if (e.shiftKey || Np(n, "arrow", "end", t.peek()), pu(n, !1)) {
			let t = e.shiftKey;
			return e.preventDefault(), gu(n, t, !1), !0;
		}
		return !1;
	}, 0), e.registerCommand(zn, (t) => {
		let n = N();
		if (!Ei(n) && Mp(t.target)) return !1;
		if (j(n)) {
			if (function(e) {
				if (!e.isCollapsed()) return !1;
				let { anchor: t } = e;
				if (t.offset !== 0) return !1;
				let n = t.getNode();
				if (Ya(n)) return !1;
				let r = wu(n);
				return r.getIndent() > 0 && (r.is(n) || n.is(r.getFirstDescendant()));
			}(n)) return t.preventDefault(), e.dispatchCommand(Gn, void 0);
			if (re && ne) return !1;
		} else if (!Ei(n)) return !1;
		return t.preventDefault(), e.dispatchCommand(vn, !0);
	}, 0), e.registerCommand(Vn, (t) => {
		let n = N();
		return !(!Ei(n) && Mp(t.target)) && !(!j(n) && !Ei(n)) && (t.preventDefault(), e.dispatchCommand(vn, !1));
	}, 0), e.registerCommand(Ln, (n) => {
		let r = N();
		if (Ei(r)) {
			let e = r.getNodes();
			e.length === 1 && F(e[0]) && !e[0].isInline() && (r = e[0].selectNext());
		}
		if (!j(r)) return !1;
		if (Np(r, "enter", "both", t.peek()), n !== null) {
			if ((re || ae || ce) && ne) return !1;
			if (n.preventDefault(), n.shiftKey) return e.dispatchCommand(yn, !1);
		}
		return e.dispatchCommand(bn, void 0);
	}, 0), e.registerCommand(Bn, () => !!j(N()) && (e.blur(), !0), 0), e.registerCommand(Kn, (t) => {
		let [, n] = Du(t);
		if (n.length > 0) {
			let r = t.clientX, i = t.clientY, a = Wf(r, i, e.getRootElement());
			if (a !== null) {
				let { offset: t, node: r } = a, i = Ko(r);
				if (i !== null) {
					let e = qi();
					if (A(i)) e.anchor.set(i.getKey(), t, "text"), e.focus.set(i.getKey(), t, "text");
					else {
						let t = i.getParentOrThrow().getKey(), n = i.getIndexWithinParent() + 1;
						e.anchor.set(t, n, "element"), e.focus.set(t, n, "element");
					}
					Xo(pt(e));
				}
				e.dispatchCommand(xp, n);
			}
			return t.preventDefault(), !0;
		}
		return op(t, e);
	}, 0), e.registerCommand(Jn, (t) => {
		let [n] = Du(t), r = N();
		return !(n && !j(r)) && (j(r) && !r.isCollapsed() && t.dataTransfer !== null && (gp(t.dataTransfer, hp(r)), ip(t.dataTransfer, e)), !0);
	}, 0), e.registerCommand(Yn, (t) => {
		let [n] = Du(t), r = N();
		if (n && !j(r)) return !1;
		let i = t.clientX, a = t.clientY, o = Wf(i, a, e.getRootElement());
		return o !== null && F(Ko(o.node)) && t.preventDefault(), !0;
	}, 0), e.registerCommand($n, () => {
		let e = N();
		return fs(j(e) && Pc(e.anchor.getNode()) !== null ? e : null), !0;
	}, 0), e.registerCommand(Zn, (t) => (fp(e, Eu(t, ClipboardEvent) ? t : null), !0), 0), e.registerCommand(Qn, (t) => (async function(e, t) {
		await fp(t, Eu(e, ClipboardEvent) ? e : null), t.update(() => {
			let e = N();
			j(e) ? e.removeText() : Ei(e) && e.getNodes().forEach((e) => e.remove());
		}, { tag: "cut" });
	}(t, e), !0), 0), e.registerCommand(Sn, (t) => {
		let [, n, r] = Du(t);
		return n.length > 0 && !r ? (e.dispatchCommand(xp, n), !0) : $s(t.target) && Eo(t.target) ? !1 : N() !== null && (function(e, t) {
			e.preventDefault(), t.update(() => {
				let n = N(), r = Eu(e, InputEvent) || Eu(e, KeyboardEvent) ? null : e.clipboardData;
				r != null && n !== null && np(r, n, t);
			}, { tag: "paste" });
		}(t, e), !0);
	}, 0), e.registerCommand(Rn, () => {
		let e = N();
		return j(e) && Np(e, "space", "both", t.peek()), !1;
	}, 0), e.registerCommand(Hn, () => {
		let e = N();
		return j(e) && Np(e, "tab", "both", t.peek()), !1;
	}, 0), e.registerCommand(Mn, (e) => {
		let t = N();
		if (Ei(t)) return Hp(t, !1, e);
		if (!j(t)) return !1;
		let { anchor: n } = t;
		if (n.type !== "element" || n.offset !== 0) return !1;
		let r = n.getNode();
		if (!P(r)) return !1;
		let i = r.getFirstChild();
		if (!F(i) || !i.isInline()) return !1;
		let a = r.getKey(), o = r.selectEnd();
		return e.shiftKey && o.anchor.set(a, 0, "element"), e.preventDefault(), e.stopPropagation(), !0;
	}, 0), e.registerCommand(Pn, (e) => {
		let t = N();
		if (Ei(t)) return Hp(t, !0, e);
		if (!j(t)) return !1;
		let { anchor: n, focus: r } = t, i = W(r.getNode(), (e) => P(e) && !e.isInline());
		if (i === null) return !1;
		let a = i.getFirstChild();
		if (!F(a) || !a.isInline() || W(n.getNode(), (e) => P(e) && !e.isInline()) !== i) return !1;
		let o = i.getKey();
		return (r.type !== "element" || r.key !== o || r.offset !== 0) && (t.focus.set(o, 0, "element"), e.shiftKey || t.anchor.set(o, 0, "element"), e.preventDefault(), e.stopPropagation(), !0);
	}, 0));
}
//#endregion
//#region node_modules/@lexical/react/dist/LexicalRichTextPlugin.prod.mjs
function Wp(e, ...t) {
	let n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
	r.append("code", e);
	for (let e of t) r.append("v", e);
	throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
var Gp = C ? _.useLayoutEffect : _.useEffect;
function Kp({ editor: e, ErrorBoundary: t }) {
	return function(e, t) {
		let [n, r] = (0, _.useState)(() => e.getDecorators());
		return Gp(() => e.registerDecoratorListener((e) => {
			(0, Bd.flushSync)(() => {
				r(e);
			});
		}), [e]), (0, _.useEffect)(() => {
			r(e.getDecorators());
		}, [e]), (0, _.useMemo)(() => {
			let r = [], i = Object.keys(n);
			for (let a = 0; a < i.length; a++) {
				let o = i[a], s = /*#__PURE__*/ (0, J.jsx)(t, {
					onError: (t) => e._onError(t),
					children: /*#__PURE__*/ (0, J.jsx)(_.Suspense, {
						fallback: null,
						children: n[o]
					})
				}), c = e.getElementByKey(o);
				c !== null && r.push(/*#__PURE__*/ (0, Bd.createPortal)(s, c, o));
			}
			return r;
		}, [
			t,
			n,
			e
		]);
	}(e, t);
}
function qp({ editor: e, ErrorBoundary: t }) {
	return function(e) {
		let t = Ad.maybeFromEditor(e);
		if (t && t.hasExtensionByName(zd.name)) {
			for (let e of ["@lexical/plain-text", "@lexical/rich-text"]) t.hasExtensionByName(e) && Wp(320, e);
			return !0;
		}
		return !1;
	}(e) ? null : /*#__PURE__*/ (0, J.jsx)(Kp, {
		editor: e,
		ErrorBoundary: t
	});
}
function Jp(e) {
	return e.read("latest", Wd(e.isComposing()));
}
function Yp({ contentEditable: e, placeholder: t = null, ErrorBoundary: n }) {
	let [r] = b();
	return function(e) {
		Gp(() => Xl(Up(e), Xd(e)), [e]);
	}(r), /*#__PURE__*/ (0, J.jsxs)(J.Fragment, { children: [
		e,
		/*#__PURE__*/ (0, J.jsx)(Xp, { content: t }),
		/*#__PURE__*/ (0, J.jsx)(qp, {
			editor: r,
			ErrorBoundary: n
		})
	] });
}
function Xp({ content: e }) {
	let [t] = b(), n = function(e) {
		let [t, n] = (0, _.useState)(() => Jp(e));
		return Gp(() => {
			function t() {
				let t = Jp(e);
				n(t);
			}
			return t(), Xl(e.registerUpdateListener(() => {
				t();
			}), e.registerEditableListener(() => {
				t();
			}));
		}, [e]), t;
	}(t), r = ru();
	return n ? typeof e == "function" ? e(r) : e : null;
}
//#endregion
//#region node_modules/@lexical/react/dist/LexicalContentEditable.prod.mjs
var Zp = C ? _.useLayoutEffect : _.useEffect;
function Qp({ editor: e, ariaActiveDescendant: t, ariaAutoComplete: n, ariaControls: r, ariaDescribedBy: i, ariaErrorMessage: a, ariaExpanded: o, ariaInvalid: s, ariaLabel: c, ariaLabelledBy: l, ariaMultiline: u, ariaOwns: d, ariaRequired: f, autoCapitalize: p, className: m, id: h, role: g = "textbox", spellCheck: v = !0, style: y, tabIndex: b, "data-testid": x, ...S }, C) {
	let [w, ee] = (0, _.useState)(e.isEditable()), te = (0, _.useCallback)((t) => {
		t && t.ownerDocument && t.ownerDocument.defaultView ? e.setRootElement(t) : e.setRootElement(null);
	}, [e]), ne = (0, _.useMemo)(() => function(...e) {
		return (t) => {
			for (let n of e) typeof n == "function" ? n(t) : n != null && (n.current = t);
		};
	}(C, te), [te, C]);
	return Zp(() => (ee(e.isEditable()), e.registerEditableListener((e) => {
		ee(e);
	})), [e]), /*#__PURE__*/ (0, J.jsx)("div", {
		"aria-activedescendant": w ? t : void 0,
		"aria-autocomplete": w ? n : "none",
		"aria-controls": w ? r : void 0,
		"aria-describedby": i,
		...a == null ? {} : { "aria-errormessage": a },
		"aria-expanded": w && g === "combobox" ? !!o : void 0,
		...s == null ? {} : { "aria-invalid": s },
		"aria-label": c,
		"aria-labelledby": l,
		"aria-multiline": u,
		"aria-owns": w ? d : void 0,
		"aria-readonly": !w || void 0,
		"aria-required": f,
		autoCapitalize: p,
		className: m,
		contentEditable: w,
		"data-testid": x,
		id: h,
		ref: ne,
		role: g,
		spellCheck: v,
		style: y,
		tabIndex: b ?? (w ? void 0 : -1),
		...S
	});
}
var $p = /*#__PURE__*/ (0, _.forwardRef)(Qp);
function em(e) {
	return e.read("latest", Wd(e.isComposing()));
}
var tm = /*#__PURE__*/ (0, _.forwardRef)(nm);
function nm(e, t) {
	let { placeholder: n, ...r } = e, [i] = b();
	return (0, J.jsxs)(J.Fragment, { children: [/*#__PURE__*/ (0, J.jsx)($p, {
		editor: i,
		...r,
		ref: t
	}), n != null && /*#__PURE__*/ (0, J.jsx)(rm, {
		editor: i,
		content: n
	})] });
}
function rm({ content: e, editor: t }) {
	let n = function(e) {
		let [t, n] = (0, _.useState)(() => em(e));
		return Zp(() => {
			function t() {
				let t = em(e);
				n(t);
			}
			return t(), Xl(e.registerUpdateListener(() => {
				t();
			}), e.registerEditableListener(() => {
				t();
			}));
		}, [e]), t;
	}(t), [r, i] = (0, _.useState)(t.isEditable());
	if ((0, _.useLayoutEffect)(() => (i(t.isEditable()), t.registerEditableListener((e) => {
		i(e);
	})), [t]), !n) return null;
	let a = null;
	return typeof e == "function" ? a = e(r) : e !== null && (a = e), a === null ? null : /*#__PURE__*/ (0, J.jsx)("div", {
		"aria-hidden": !0,
		children: a
	});
}
//#endregion
//#region node_modules/@lexical/history/dist/LexicalHistory.prod.mjs
function im(e, t, n, r, i) {
	if (e === null || n.size === 0 && r.size === 0 && !i) return 0;
	let a = t._selection, o = e._selection;
	if (i) return 1;
	if (!(j(a) && j(o) && o.isCollapsed() && a.isCollapsed())) return 0;
	let s = function(e, t, n) {
		let r = e._nodeMap, i = [];
		for (let e of t) {
			let t = r.get(e);
			t !== void 0 && i.push(t);
		}
		for (let [e, t] of n) {
			if (!t) continue;
			let n = r.get(e);
			n === void 0 || Ya(n) || i.push(n);
		}
		return i;
	}(t, n, r);
	if (s.length === 0) return 0;
	if (s.length > 1) {
		let n = t._nodeMap, r = n.get(a.anchor.key), i = n.get(o.anchor.key);
		return r && i && !e._nodeMap.has(r.__key) && A(r) && r.__text.length === 1 && a.anchor.offset === 1 ? 2 : 0;
	}
	let c = s[0], l = e._nodeMap.get(c.__key);
	if (!A(l) || !A(c) || l.__mode !== c.__mode) return 0;
	let u = l.__text, d = c.__text;
	if (u === d) return 0;
	let f = a.anchor, p = o.anchor;
	if (f.key !== p.key || f.type !== "text") return 0;
	let m = f.offset, h = p.offset, g = d.length - u.length;
	return g === 1 && h === m - 1 ? 2 : g === -1 && h === m + 1 ? 3 : g === -1 && h === m ? 4 : 0;
}
function am(e, t, n) {
	let r = n(), i = 0, a = r, o = 0, s = null;
	return (c, l, u, d, f, p) => {
		let m = n();
		if (p.has("composition-start") && (a = r, o = i, s = c), p.has("historic")) return i = 0, r = m, 2;
		p.has("composition-end") && s && (r = a, i = o, c = s);
		let h = p.has("paste") || p.has("cut") ? 0 : im(c, l, d, f, e.isComposing()), g = (() => {
			let n = u === null || u.editor === e, a = p.has(Wr);
			if (!a && n && p.has("history-merge")) return 0;
			if (h === 1) return 2;
			if (c === null) return 1;
			let o = l._selection;
			if (!(d.size > 0 || f.size > 0)) return o === null ? 2 : 0;
			let s = typeof t == "number" ? t : t.peek();
			return !1 === a && h !== 0 && h === i && m < r + s && n || d.size === 1 && function(e, t, n) {
				let r = t._nodeMap.get(e), i = n._nodeMap.get(e), a = t._selection, o = n._selection;
				return !(j(a) && j(o) && a.anchor.type === "element" && a.focus.type === "element" && o.anchor.type === "text" && o.focus.type === "text" || !A(r) || !A(i) || r.__parent !== i.__parent) && JSON.stringify(t.read(() => r.exportJSON())) === JSON.stringify(n.read(() => i.exportJSON()));
			}(Array.from(d)[0], c, l) ? 0 : 1;
		})();
		return r = m, i = h, g;
	};
}
function om(e, t) {
	e.undoStack = [], e.redoStack = [], e.current = null, t && t(e);
}
function sm(e, t, n, r = Date.now, i, a = null) {
	let o = am(e, n, r), s = () => {
		i && i(t);
	};
	return s(), Xl(e.registerCommand(On, () => (function(e, t, n) {
		let r = t.redoStack, i = t.undoStack;
		if (i.length !== 0) {
			let a = t.current, o = i.pop();
			a !== null && (r.push(a), e.dispatchCommand(nr, !0)), i.length === 0 && e.dispatchCommand(rr, !1), t.current = o || null, n && n(t), o && o.editor.setEditorState(o.editorState, { tag: "historic" });
		}
	}(e, t, i), !0), 0), e.registerCommand(kn, () => (function(e, t, n) {
		let r = t.redoStack, i = t.undoStack;
		if (r.length !== 0) {
			let a = t.current;
			a !== null && (i.push(a), e.dispatchCommand(rr, !0));
			let o = r.pop();
			r.length === 0 && e.dispatchCommand(nr, !1), t.current = o || null, n && n(t), o && o.editor.setEditorState(o.editorState, { tag: "historic" });
		}
	}(e, t, i), !0), 0), e.registerCommand(er, () => (om(t, i), !1), 0), e.registerCommand(tr, () => (om(t, i), e.dispatchCommand(nr, !1), e.dispatchCommand(rr, !1), !0), 0), e.registerUpdateListener(({ editorState: n, prevEditorState: r, dirtyLeaves: i, dirtyElements: c, tags: l }) => {
		let u = t.current, d = t.redoStack, f = t.undoStack, p = u === null ? null : u.editorState;
		if (u !== null && n === p) return;
		let m = o(r, n, u, i, c, l);
		if (m === 1) {
			if (d.length !== 0 && (t.redoStack = [], e.dispatchCommand(nr, !1)), u !== null) {
				f.push({ ...u });
				let t = typeof a == "number" || a === null ? a : a.peek();
				t !== null && f.length > t && f.splice(0, f.length - t), e.dispatchCommand(rr, !0);
			}
		} else if (m === 2) return;
		t.current = {
			editor: e,
			editorState: n
		}, s();
	}));
}
function cm() {
	return {
		current: null,
		redoStack: [],
		undoStack: []
	};
}
Date.now;
//#endregion
//#region node_modules/@lexical/react/dist/LexicalHistoryPlugin.prod.mjs
function lm({ delay: e, externalHistoryState: t }) {
	let [n] = b();
	return function(e, t, n = 1e3) {
		let r = (0, _.useMemo)(() => t || cm(), [t]);
		(0, _.useEffect)(() => sm(e, r, n), [
			n,
			e,
			r
		]);
	}(n, t, e), null;
}
//#endregion
//#region node_modules/@lexical/react/dist/LexicalOnChangePlugin.prod.mjs
var um = C ? _.useLayoutEffect : _.useEffect;
function dm({ ignoreHistoryMergeTagChange: e = !0, ignoreSelectionChange: t = !1, onChange: n }) {
	let [r] = b();
	return um(() => {
		if (n) return r.registerUpdateListener(({ editorState: i, dirtyElements: a, dirtyLeaves: o, prevEditorState: s, tags: c }) => {
			t && a.size === 0 && o.size === 0 || e && c.has("history-merge") || s.isEmpty() || n(i, r, c);
		});
	}, [
		r,
		e,
		t,
		n
	]), null;
}
//#endregion
//#region node_modules/@lexical/react/dist/LexicalErrorBoundary.prod.mjs
var fm = class extends _.Component {
	state = { hasError: !1 };
	static getDerivedStateFromError() {
		return { hasError: !0 };
	}
	componentDidCatch(e, t) {
		this.props.onError(e instanceof Error ? e : Error(String(e), { cause: e }), t);
	}
	render() {
		return this.state.hasError ? this.props.fallback : this.props.children;
	}
};
function pm({ children: e, fallback: t, onError: n }) {
	return (0, J.jsx)(fm, {
		fallback: t === void 0 ? /*#__PURE__*/ (0, J.jsx)("div", {
			style: {
				border: "1px solid #f00",
				color: "#f00",
				padding: "8px"
			},
			children: "An error was thrown."
		}) : t,
		onError: n,
		children: e
	});
}
//#endregion
//#region node_modules/@lexical/table/dist/LexicalTable.prod.mjs
var mm = /^(\d+(?:\.\d+)?)px$/, hm = {
	BOTH: 3,
	COLUMN: 2,
	NO_STATUS: 0,
	ROW: 1
}, gm = class e extends Ga {
	__colSpan;
	__rowSpan;
	__headerState;
	__width;
	__backgroundColor;
	__verticalAlign;
	static getType() {
		return "tablecell";
	}
	static clone(t) {
		return new e(t.__headerState, t.__colSpan, t.__width, t.__key);
	}
	afterCloneFrom(e) {
		super.afterCloneFrom(e), this.__rowSpan = e.__rowSpan, this.__backgroundColor = e.__backgroundColor, this.__verticalAlign = e.__verticalAlign, this.__colSpan = e.__colSpan, this.__headerState = e.__headerState, this.__width = e.__width;
	}
	static importDOM() {
		return {
			td: (e) => ({
				conversion: vm,
				priority: 0
			}),
			th: (e) => ({
				conversion: vm,
				priority: 0
			})
		};
	}
	static importJSON(e) {
		return ym().updateFromJSON(e);
	}
	updateFromJSON(e) {
		return super.updateFromJSON(e).setHeaderStyles(e.headerState).setColSpan(e.colSpan || 1).setRowSpan(e.rowSpan || 1).setWidth(e.width || void 0).setBackgroundColor(e.backgroundColor || null).setVerticalAlign(e.verticalAlign || void 0);
	}
	constructor(e = hm.NO_STATUS, t = 1, n, r) {
		super(r), this.__colSpan = t, this.__rowSpan = 1, this.__headerState = e, this.__width = n, this.__backgroundColor = null, this.__verticalAlign = void 0;
	}
	createDOM(e) {
		let t = B().createElement(this.getTag());
		return this.__width && (t.style.width = `${this.__width}px`), this.__colSpan > 1 && (t.colSpan = this.__colSpan), this.__rowSpan > 1 && (t.rowSpan = this.__rowSpan), this.__backgroundColor !== null && (t.style.backgroundColor = this.__backgroundColor), _m(this.__verticalAlign) && (t.style.verticalAlign = this.__verticalAlign), Jl(t, e.theme.tableCell, this.hasHeader() && e.theme.tableCellHeader), t;
	}
	exportDOM(e) {
		let t = super.exportDOM(e);
		if (V(t.element)) {
			let e = t.element;
			e.setAttribute("data-temporary-table-cell-lexical-key", this.getKey()), e.style.border = "1px solid black", this.__colSpan > 1 && (e.colSpan = this.__colSpan), this.__rowSpan > 1 && (e.rowSpan = this.__rowSpan), e.style.width = `${this.getWidth() || 75}px`, e.style.verticalAlign = this.getVerticalAlign() || "top", e.style.textAlign = "start", this.__backgroundColor === null && this.hasHeader() && (e.style.backgroundColor = "#f2f3f5");
		}
		return t;
	}
	exportJSON() {
		return {
			...super.exportJSON(),
			..._m(this.__verticalAlign) && { verticalAlign: this.__verticalAlign },
			backgroundColor: this.getBackgroundColor(),
			colSpan: this.__colSpan,
			headerState: this.__headerState,
			rowSpan: this.__rowSpan,
			width: this.getWidth()
		};
	}
	getColSpan() {
		return this.getLatest().__colSpan;
	}
	setColSpan(e) {
		let t = this.getWritable();
		return t.__colSpan = e, t;
	}
	getRowSpan() {
		return this.getLatest().__rowSpan;
	}
	setRowSpan(e) {
		let t = this.getWritable();
		return t.__rowSpan = e, t;
	}
	getTag() {
		return this.hasHeader() ? "th" : "td";
	}
	setHeaderStyles(e, t = hm.BOTH) {
		let n = this.getWritable();
		return n.__headerState = e & t | n.__headerState & ~t, n;
	}
	getHeaderStyles() {
		return this.getLatest().__headerState;
	}
	setWidth(e) {
		let t = this.getWritable();
		return t.__width = e, t;
	}
	getWidth() {
		return this.getLatest().__width;
	}
	getBackgroundColor() {
		return this.getLatest().__backgroundColor;
	}
	setBackgroundColor(e) {
		let t = this.getWritable();
		return t.__backgroundColor = e, t;
	}
	getVerticalAlign() {
		return this.getLatest().__verticalAlign;
	}
	setVerticalAlign(e) {
		let t = this.getWritable();
		return t.__verticalAlign = e || void 0, t;
	}
	toggleHeaderStyle(e) {
		let t = this.getWritable();
		return (t.__headerState & e) === e ? t.__headerState -= e : t.__headerState += e, t;
	}
	hasHeaderState(e) {
		return (this.getHeaderStyles() & e) === e;
	}
	hasHeader() {
		return this.getLatest().__headerState !== hm.NO_STATUS;
	}
	updateDOM(e) {
		return e.__headerState !== this.__headerState || e.__width !== this.__width || e.__colSpan !== this.__colSpan || e.__rowSpan !== this.__rowSpan || e.__backgroundColor !== this.__backgroundColor || e.__verticalAlign !== this.__verticalAlign;
	}
	isShadowRoot() {
		return !0;
	}
	collapseAtStart() {
		return !0;
	}
	canBeEmpty() {
		return !1;
	}
	canIndent() {
		return !1;
	}
};
function _m(e) {
	return e === "middle" || e === "bottom";
}
function vm(e) {
	let t = e, n = e.nodeName.toLowerCase(), r;
	mm.test(t.style.width) && (r = parseFloat(t.style.width));
	let i = hm.NO_STATUS;
	if (n === "th") {
		let e = t.getAttribute("scope");
		if (e === "col") i = hm.COLUMN;
		else if (e === "row") i = hm.ROW;
		else {
			let e = t.parentElement, n = V(e) && e.nodeName.toLowerCase() === "tr" && V(e.parentElement) && (e.parentElement.nodeName.toLowerCase() === "thead" || e.rowIndex === 0), r = t.cellIndex === 0;
			n && (i |= hm.ROW), r && (i |= hm.COLUMN), i === hm.NO_STATUS && (i = hm.ROW);
		}
	}
	let a = ym(i, t.colSpan, r);
	a.__rowSpan = t.rowSpan;
	let o = t.style.backgroundColor;
	o !== "" && (a.__backgroundColor = o);
	let s = t.style.verticalAlign;
	_m(s) && (a.__verticalAlign = s);
	let c = t.style, l = (c && c.textDecoration || "").split(" "), u = c.fontWeight === "700" || c.fontWeight === "bold", d = l.includes("line-through"), f = c.fontStyle === "italic", p = l.includes("underline"), m = c.color;
	return {
		after: (e) => {
			let t = [], n = null, r = () => {
				if (n) {
					let e = n.getFirstChild();
					ao(e) && n.getChildrenSize() === 1 && e.remove();
				}
			};
			for (let i of e) if (Es(i) || A(i) || ao(i)) {
				if (A(i) && (u && i.toggleFormat("bold"), d && i.toggleFormat("strikethrough"), f && i.toggleFormat("italic"), p && i.toggleFormat("underline"), m)) {
					let e = i.getStyle();
					e.includes("color:") || i.setStyle(e + `color: ${m};`);
				}
				n ? n.append(i) : (n = I().append(i), t.push(n));
			} else t.push(i), r(), n = null;
			return r(), t.length === 0 && t.push(I()), t;
		},
		node: a
	};
}
function ym(e = hm.NO_STATUS, t = 1, n) {
	return js(new gm(e, t, n));
}
function X(e) {
	return e instanceof gm;
}
var bm = /* @__PURE__ */ k("INSERT_TABLE_COMMAND");
function Z(e, ...t) {
	let n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
	r.append("code", e);
	for (let e of t) r.append("v", e);
	throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
var xm = class e extends Ga {
	__height;
	static getType() {
		return "tablerow";
	}
	static clone(t) {
		return new e(t.__height, t.__key);
	}
	afterCloneFrom(e) {
		super.afterCloneFrom(e), this.__height = e.__height;
	}
	static importDOM() {
		return { tr: (e) => ({
			conversion: Sm,
			priority: 0
		}) };
	}
	static importJSON(e) {
		return Cm().updateFromJSON(e);
	}
	updateFromJSON(e) {
		return super.updateFromJSON(e).setHeight(e.height);
	}
	constructor(e, t) {
		super(t), this.__height = e;
	}
	exportJSON() {
		let e = this.getHeight();
		return {
			...super.exportJSON(),
			...e === void 0 ? void 0 : { height: e }
		};
	}
	createDOM(e) {
		let t = B().createElement("tr");
		return this.__height && (t.style.height = `${this.__height}px`), Jl(t, e.theme.tableRow), t;
	}
	extractWithChild(e, t, n) {
		return n === "html";
	}
	isShadowRoot() {
		return !0;
	}
	setHeight(e) {
		let t = this.getWritable();
		return t.__height = e, t;
	}
	getHeight() {
		return this.getLatest().__height;
	}
	updateDOM(e) {
		return e.__height !== this.__height;
	}
	canBeEmpty() {
		return !1;
	}
	canIndent() {
		return !1;
	}
};
function Sm(e) {
	let t = e, n;
	return mm.test(t.style.height) && (n = parseFloat(t.style.height)), {
		after: (e) => Mu(e, X),
		node: Cm(n)
	};
}
function Cm(e) {
	return js(new xm(e));
}
function wm(e) {
	return e instanceof xm;
}
function Tm(e, t, n = !0) {
	let r = qh();
	for (let i = 0; i < e; i++) {
		let e = Cm();
		for (let r = 0; r < t; r++) {
			let t = hm.NO_STATUS;
			typeof n == "object" ? (i === 0 && n.rows && (t |= hm.ROW), r === 0 && n.columns && (t |= hm.COLUMN)) : n && (i === 0 && (t |= hm.ROW), r === 0 && (t |= hm.COLUMN));
			let a = ym(t), o = I();
			o.append(mi()), a.append(o), e.append(a);
		}
		r.append(e);
	}
	return r;
}
function Em(e) {
	let t = W(e, (e) => Jh(e));
	if (Jh(t)) return t;
	throw Error("Expected table cell to be inside of table.");
}
var Dm = (e, t) => e === hm.BOTH || e === t ? t : hm.NO_STATUS;
function Om(e = !0) {
	let t = N();
	j(t) || qm(t) || Z(188);
	let n = t.anchor.getNode(), r = t.focus.getNode(), [i] = Vm(n), [a, , o] = Vm(r), [, s, c] = zm(o, a, i), { startRow: l } = c, { startRow: u } = s;
	return e ? km(l + i.__rowSpan > u + a.__rowSpan ? i : a, !0) : km(u < l ? a : i, !1);
}
function km(e, t = !0) {
	let [, , n] = Vm(e), [r, i] = zm(n, e, e), a = r[0].length, { startRow: o } = i, s = null;
	if (t) {
		let t = o + e.__rowSpan - 1, i = r[t], c = Cm();
		for (let e = 0; e < a; e++) {
			let { cell: n, startRow: r } = i[e];
			if (r + n.__rowSpan - 1 <= t) {
				let t = i[e].cell.__headerState, n = Dm(t, hm.COLUMN);
				c.append(ym(n).append(I()));
			} else n.setRowSpan(n.__rowSpan + 1);
		}
		let l = n.getChildAtIndex(t);
		wm(l) || Z(256), l.insertAfter(c), s = c;
	} else {
		let e = o, t = r[e], i = Cm();
		for (let n = 0; n < a; n++) {
			let { cell: r, startRow: a } = t[n];
			if (a === e) {
				let e = t[n].cell.__headerState, r = Dm(e, hm.COLUMN);
				i.append(ym(r).append(I()));
			} else r.setRowSpan(r.__rowSpan + 1);
		}
		let c = n.getChildAtIndex(e);
		wm(c) || Z(257), c.insertBefore(i), s = i;
	}
	return s;
}
function Am(e = !0) {
	let t = N();
	j(t) || qm(t) || Z(188);
	let n = t.anchor.getNode(), r = t.focus.getNode(), [i] = Vm(n), [a, , o] = Vm(r), [, s, c] = zm(o, a, i), { startColumn: l } = c, { startColumn: u } = s;
	return e ? jm(l + i.__colSpan > u + a.__colSpan ? i : a, !0) : jm(u < l ? a : i, !1);
}
function jm(e, t = !0, n = !0) {
	let [, , r] = Vm(e), [i, a] = zm(r, e, e), o = i.length, { startColumn: s } = a, c = t ? s + e.__colSpan - 1 : s - 1, l = r.getFirstChild();
	wm(l) || Z(120);
	let u = null;
	function d(e = hm.NO_STATUS) {
		let t = ym(e).append(I());
		return u === null && (u = t), t;
	}
	let f = l;
	e: for (let e = 0; e < o; e++) {
		if (e !== 0) {
			let e = f.getNextSibling();
			wm(e) || Z(121), f = e;
		}
		let t = i[e], n = t[c < 0 ? 0 : c].cell.__headerState, r = Dm(n, hm.ROW);
		if (c < 0) {
			Fm(f, d(r));
			continue;
		}
		let { cell: a, startColumn: o, startRow: s } = t[c];
		if (o + a.__colSpan - 1 <= c) {
			let n = a, i = s, o = c;
			for (; i !== e && n.__rowSpan > 1;) {
				if (o -= a.__colSpan, !(o >= 0)) {
					f.append(d(r));
					continue e;
				}
				{
					let { cell: e, startRow: r } = t[o];
					n = e, i = r;
				}
			}
			n.insertAfter(d(r));
		} else a.setColSpan(a.__colSpan + 1);
	}
	u !== null && n && Pm(u);
	let p = r.getColWidths();
	if (p) {
		let e = [...p], t = c < 0 ? 0 : c, n = e[t];
		e.splice(t, 0, n), r.setColWidths(e);
	}
	return u;
}
function Mm() {
	let e = N();
	j(e) || qm(e) || Z(188);
	let [t, n] = e.isBackward() ? [e.focus.getNode(), e.anchor.getNode()] : [e.anchor.getNode(), e.focus.getNode()], [r, , i] = Vm(t), [a] = Vm(n), [o, s, c] = zm(i, r, a), { startRow: l } = s, { startRow: u } = c, d = u + a.__rowSpan - 1;
	if (o.length === d - l + 1) return void i.remove();
	let f = o[0].length, p = o[d + 1], m = i.getChildAtIndex(d + 1);
	for (let e = d; e >= l; e--) {
		for (let t = f - 1; t >= 0; t--) {
			let { cell: n, startRow: r, startColumn: i } = o[e][t];
			if (i === t) {
				if (r < l || r + n.__rowSpan - 1 > d) {
					let e = Math.max(r, l), t = Math.min(n.__rowSpan + r - 1, d), i = e <= t ? t - e + 1 : 0;
					n.setRowSpan(n.__rowSpan - i);
				}
				if (r >= l && r + n.__rowSpan - 1 > d && e === d) {
					wm(m) || Z(387);
					let r = null;
					for (let n = 0; n < t; n++) {
						let t = p[n], i = t.cell;
						t.startRow === e + 1 && (r = i), i.__colSpan > 1 && (n += i.__colSpan - 1);
					}
					r === null ? Fm(m, n) : r.insertAfter(n);
				}
			}
		}
		let t = i.getChildAtIndex(e);
		wm(t) || Z(206, String(e)), t.remove();
	}
	if (p !== void 0) {
		let { cell: e } = p[0];
		Pm(e);
	} else {
		let { cell: e } = o[l - 1][0];
		Pm(e);
	}
}
function Nm() {
	let e = N();
	j(e) || qm(e) || Z(188);
	let t = e.anchor.getNode(), n = e.focus.getNode(), [r, , i] = Vm(t), [a] = Vm(n), [o, s, c] = zm(i, r, a), { startColumn: l } = s, { startRow: u, startColumn: d } = c, f = Math.min(l, d), p = Math.max(l + r.__colSpan - 1, d + a.__colSpan - 1), m = p - f + 1;
	if (o[0].length === p - f + 1) return i.selectPrevious(), void i.remove();
	let h = o.length;
	for (let e = 0; e < h; e++) for (let t = f; t <= p; t++) {
		let { cell: n, startColumn: r } = o[e][t];
		if (r < f) {
			if (t === f) {
				let e = f - r;
				n.setColSpan(n.__colSpan - Math.min(m, n.__colSpan - e));
			}
		} else if (r + n.__colSpan - 1 > p) {
			if (t === p) {
				let e = p - r + 1;
				n.setColSpan(n.__colSpan - e);
			}
		} else n.remove();
	}
	let g = o[u], _ = l > d ? g[l + r.__colSpan] : g[d + a.__colSpan];
	if (_ !== void 0) {
		let { cell: e } = _;
		Pm(e);
	} else {
		let { cell: e } = d < l ? g[d - 1] : g[l - 1];
		Pm(e);
	}
	let v = i.getColWidths();
	if (v) {
		let e = [...v];
		e.splice(f, m), i.setColWidths(e);
	}
}
function Pm(e) {
	let t = e.getFirstDescendant();
	t == null ? e.selectStart() : t.getParentOrThrow().selectStart();
}
function Fm(e, t) {
	let n = e.getFirstChild();
	n === null ? e.append(t) : n.insertBefore(t);
}
function Im(e) {
	if (e.length === 0) return null;
	let [t] = Bm(Em(e[0]), null, null), n = Infinity, r = -Infinity, i = Infinity, a = -Infinity, o = /* @__PURE__ */ new Set();
	for (let s of t) for (let t of s) {
		if (!t || !t.cell) continue;
		let s = t.cell.getKey();
		if (!o.has(s) && e.some((e) => e.is(t.cell))) {
			o.add(s);
			let e = t.startRow, c = t.startColumn, l = t.cell.__rowSpan || 1, u = t.cell.__colSpan || 1;
			n = Math.min(n, e), r = Math.max(r, e + l - 1), i = Math.min(i, c), a = Math.max(a, c + u - 1);
		}
	}
	if (n === Infinity || i === Infinity) return null;
	let s = r - n + 1, c = a - i + 1, l = t[n][i];
	if (!l.cell) return null;
	let u = l.cell;
	u.setColSpan(c), u.setRowSpan(s);
	let d = /* @__PURE__ */ new Set([u.getKey()]);
	for (let e = n; e <= r; e++) for (let n = i; n <= a; n++) {
		let r = t[e][n];
		if (!r.cell) continue;
		let i = r.cell, a = i.getKey();
		d.has(a) || (d.add(a), Lm(i) || u.append(...i.getChildren()), i.remove());
	}
	return u.getChildrenSize() === 0 && u.append(I()), u;
}
function Lm(e) {
	if (e.getChildrenSize() !== 1) return !1;
	let t = e.getFirstChildOrThrow();
	return !(!fo(t) || !t.isEmpty());
}
function Rm(e) {
	let [t, n, r] = Vm(e), i = t.__colSpan, a = t.__rowSpan;
	if (i === 1 && a === 1) return;
	let [o, s] = zm(r, t, t), { startColumn: c, startRow: l } = s, u = t.__headerState & hm.COLUMN, d = Array.from({ length: i }, (e, t) => {
		let n = u;
		for (let e = 0; n !== 0 && e < o.length; e++) n &= o[e][t + c].cell.__headerState;
		return n;
	}), f = t.__headerState & hm.ROW, p = Array.from({ length: a }, (e, t) => {
		let n = f;
		for (let e = 0; n !== 0 && e < o[0].length; e++) n &= o[t + l][e].cell.__headerState;
		return n;
	});
	if (i > 1) {
		for (let e = 1; e < i; e++) t.insertAfter(ym(d[e] | p[0]).append(I()));
		t.setColSpan(1);
	}
	if (a > 1) {
		let e;
		for (let t = 1; t < a; t++) {
			let r = l + t, a = o[r];
			e = (e || n).getNextSibling(), wm(e) || Z(125);
			let s = null;
			for (let e = 0; e < c; e++) {
				let t = a[e], n = t.cell;
				t.startRow === r && (s = n), n.__colSpan > 1 && (e += n.__colSpan - 1);
			}
			if (s === null) for (let n = i - 1; n >= 0; n--) Fm(e, ym(d[n] | p[t]).append(I()));
			else for (let e = i - 1; e >= 0; e--) s.insertAfter(ym(d[e] | p[t]).append(I()));
		}
		t.setRowSpan(1);
	}
}
function zm(e, t, n) {
	let [r, i, a] = Bm(e, t, n);
	return i === null && Z(207), a === null && Z(208), [
		r,
		i,
		a
	];
}
function Bm(e, t, n) {
	let r = [], i = null, a = null;
	function o(e) {
		let t = r[e];
		return t === void 0 && (r[e] = t = []), t;
	}
	let s = e.getChildren();
	for (let e = 0; e < s.length; e++) {
		let r = s[e];
		wm(r) || Z(209);
		let c = o(e);
		for (let l = r.getFirstChild(), u = 0; l != null; l = l.getNextSibling()) {
			for (X(l) || Z(147); c[u] !== void 0;) u++;
			let r = {
				cell: l,
				startColumn: u,
				startRow: e
			}, { __rowSpan: d, __colSpan: f } = l;
			for (let t = 0; t < d && !(e + t >= s.length); t++) {
				let n = o(e + t);
				for (let e = 0; e < f; e++) n[u + e] = r;
			}
			t !== null && i === null && t.is(l) && (i = r), n !== null && a === null && n.is(l) && (a = r);
		}
	}
	return [
		r,
		i,
		a
	];
}
function Vm(e) {
	let t;
	if (e instanceof gm) t = e;
	else if ("__type" in e) {
		let n = W(e, X);
		X(n) || Z(148), t = n;
	} else {
		let n = W(e.getNode(), X);
		X(n) || Z(148), t = n;
	}
	let n = t.getParent();
	wm(n) || Z(149);
	let r = n.getParent();
	return Jh(r) || Z(210), [
		t,
		n,
		r
	];
}
function Hm(e, t, n) {
	let r, i = Math.min(t.startColumn, n.startColumn), a = Math.min(t.startRow, n.startRow), o = Math.max(t.startColumn + t.cell.__colSpan - 1, n.startColumn + n.cell.__colSpan - 1), s = Math.max(t.startRow + t.cell.__rowSpan - 1, n.startRow + n.cell.__rowSpan - 1);
	do {
		r = !1;
		for (let t = 0; t < e.length; t++) for (let n = 0; n < e[0].length; n++) {
			let c = e[t][n];
			if (!c) continue;
			let l = c.startColumn + c.cell.__colSpan - 1, u = c.startRow + c.cell.__rowSpan - 1, d = c.startColumn <= o && l >= i, f = c.startRow <= s && u >= a;
			if (d && f) {
				let e = Math.min(i, c.startColumn), t = Math.max(o, l), n = Math.min(a, c.startRow), d = Math.max(s, u);
				e === i && t === o && n === a && d === s || (i = e, o = t, a = n, s = d, r = !0);
			}
		}
	} while (r);
	return {
		maxColumn: o,
		maxRow: s,
		minColumn: i,
		minRow: a
	};
}
function Um(e) {
	let [t, , n] = Vm(e), r = n.getChildren().filter(wm), i = r.length, a = r[0].getChildren().length, o = Array(i);
	for (let e = 0; e < i; e++) o[e] = Array(a);
	for (let e = 0; e < i; e++) {
		let n = r[e].getChildren().filter(X), i = 0;
		for (let r = 0; r < n.length; r++) {
			for (; o[e][i];) i++;
			let a = n[r], s = a.__rowSpan || 1, c = a.__colSpan || 1;
			for (let t = 0; t < s; t++) for (let n = 0; n < c; n++) o[e + t][i + n] = a;
			if (t === a) return {
				colSpan: c,
				columnIndex: i,
				rowIndex: e,
				rowSpan: s
			};
			i += c;
		}
	}
	return null;
}
function Wm(e, t) {
	let n = t.getStartEndPoints(), r = qm(t);
	if (n === null) return !1;
	let [i, a] = n, [o, s, c] = Vm(i), l = W(a.getNode(), (e) => X(e));
	if (!(X(o) && X(l) && wm(s) && Jh(c))) return !1;
	let [u, d, f] = zm(c, o, l), [p] = Bm(e, null, null), m = u.length, h = m > 0 ? u[0].length : 0, g = d.startRow, _ = d.startColumn, v = p.length, y = v > 0 ? p[0].length : 0;
	if (r) {
		let e = Hm(u, d, f), t = e.maxRow - e.minRow + 1, n = e.maxColumn - e.minColumn + 1;
		g = e.minRow, _ = e.minColumn, v = Math.min(v, t), y = Math.min(y, n);
	}
	let b = !1, x = Math.min(m, g + v) - 1, S = Math.min(h, _ + y) - 1, C = /* @__PURE__ */ new Set();
	for (let e = g; e <= x; e++) for (let t = _; t <= S; t++) {
		let n = u[e][t];
		C.has(n.cell.getKey()) || n.cell.__rowSpan === 1 && n.cell.__colSpan === 1 || (Rm(n.cell), C.add(n.cell.getKey()), b = !0);
	}
	let [w] = Bm(c.getWritable(), null, null), ee = v - m + g;
	for (let e = 0; e < ee; e++) km(w[m - 1][0].cell);
	let te = y - h + _;
	for (let e = 0; e < te; e++) jm(w[0][h - 1].cell, !0, !1);
	[w] = Bm(c.getWritable(), null, null);
	for (let e = g; e < g + v; e++) for (let t = _; t < _ + y; t++) {
		let n = e - g, r = t - _, i = p[n][r];
		if (i.startRow !== n || i.startColumn !== r) continue;
		let a = i.cell;
		if (a.__rowSpan !== 1 || a.__colSpan !== 1) {
			let n = [], r = Math.min(e + a.__rowSpan, g + v) - 1, i = Math.min(t + a.__colSpan, _ + y) - 1;
			for (let a = e; a <= r; a++) for (let e = t; e <= i; e++) {
				let t = w[a][e];
				n.push(t.cell);
			}
			Im(n), b = !0;
		}
		let { cell: o } = w[e][t], s = a.getBackgroundColor();
		s != null && o.setBackgroundColor(s);
		let c = o.getChildren();
		a.getChildren().forEach((e) => {
			A(e) && I().append(e), o.append(e);
		}), c.forEach((e) => e.remove());
	}
	if (r && b) {
		let [e] = Bm(c.getWritable(), null, null);
		e[d.startRow][d.startColumn].cell.selectEnd();
	}
	return !0;
}
function Gm(e) {
	let [[t, n, r, i], [a, o, s, c]] = ["anchor", "focus"].map((t) => {
		let n = e[t].getNode(), r = W(n, X);
		X(r) || Z(238, t, n.getKey(), n.getType());
		let i = r.getParent();
		wm(i) || Z(239, t);
		let a = i.getParent();
		return Jh(a) || Z(240, t), [
			n,
			r,
			i,
			a
		];
	});
	return i.is(c) || Z(241), {
		anchorCell: n,
		anchorNode: t,
		anchorRow: r,
		anchorTable: i,
		focusCell: o,
		focusNode: a,
		focusRow: s,
		focusTable: c
	};
}
var Km = class e {
	tableKey;
	anchor;
	focus;
	_cachedNodes;
	dirty;
	constructor(e, t, n) {
		this.anchor = t, this.focus = n, t._selection = this, n._selection = this, this._cachedNodes = null, this.dirty = !1, this.tableKey = e;
	}
	getStartEndPoints() {
		return [this.anchor, this.focus];
	}
	isValid() {
		if (this.tableKey === "root" || this.anchor.key === "root" || this.anchor.type !== "element" || this.focus.key === "root" || this.focus.type !== "element") return !1;
		let e = R(this.tableKey), t = R(this.anchor.key), n = R(this.focus.key);
		return e !== null && t !== null && n !== null;
	}
	isBackward() {
		return this.focus.isBefore(this.anchor);
	}
	getCachedNodes() {
		return this._cachedNodes;
	}
	setCachedNodes(e) {
		this._cachedNodes = e;
	}
	is(e) {
		return qm(e) && this.tableKey === e.tableKey && this.anchor.is(e.anchor) && this.focus.is(e.focus);
	}
	set(e, t, n) {
		this.dirty = this.dirty || e !== this.tableKey || t !== this.anchor.key || n !== this.focus.key, this.tableKey = e, this.anchor.key = t, this.focus.key = n, this._cachedNodes = null;
	}
	clone() {
		return new e(this.tableKey, bi(this.anchor.key, this.anchor.offset, this.anchor.type), bi(this.focus.key, this.focus.offset, this.focus.type));
	}
	isCollapsed() {
		return !1;
	}
	extract() {
		return this.getNodes();
	}
	insertRawText(e) {
		if (e === "") return;
		let t = (e.endsWith("\n") ? e.slice(0, -1) : e).split("\n").map((e) => e.split("	")), n = qh();
		for (let e of t) {
			let t = Cm();
			for (let n of e) {
				let e = ym(hm.NO_STATUS), r = I();
				n && r.append(mi(n)), e.append(r), t.append(e);
			}
			n.append(t);
		}
		let { anchorCell: r } = Gm(this);
		Wm(n, r.select(0, r.getChildrenSize()));
	}
	insertText() {}
	hasFormat(e) {
		let t = 0;
		this.getNodes().filter(X).forEach((e) => {
			let n = e.getFirstChild();
			fo(n) && (t |= n.getTextFormat());
		});
		let n = ye[e];
		return (t & n) !== 0;
	}
	insertNodes(e) {
		let t = this.focus.getNode();
		P(t) || Z(151), pt(t.select(0, t.getChildrenSize())).insertNodes(e);
	}
	getShape() {
		let { anchorCell: e, focusCell: t } = Gm(this), n = Um(e);
		n === null && Z(153);
		let r = Um(t);
		r === null && Z(155);
		let i = Math.min(n.columnIndex, r.columnIndex), a = Math.max(n.columnIndex + n.colSpan - 1, r.columnIndex + r.colSpan - 1), o = Math.min(n.rowIndex, r.rowIndex), s = Math.max(n.rowIndex + n.rowSpan - 1, r.rowIndex + r.rowSpan - 1);
		return {
			fromX: Math.min(i, a),
			fromY: Math.min(o, s),
			toX: Math.max(i, a),
			toY: Math.max(o, s)
		};
	}
	getNodes() {
		if (!this.isValid()) return [];
		let e = this._cachedNodes;
		if (e !== null) return e;
		let { anchorTable: t, anchorCell: n, focusCell: r } = Gm(this), i = r.getParents()[1];
		if (i !== t) {
			if (t.isParentOf(r)) {
				let e = i.getParent();
				e ?? Z(159), this.set(this.tableKey, r.getKey(), e.getKey());
			} else {
				let e = t.getParent();
				e ?? Z(158), this.set(this.tableKey, e.getKey(), r.getKey());
			}
			return this.getNodes();
		}
		let [a, o, s] = zm(t, n, r), { minColumn: c, maxColumn: l, minRow: u, maxRow: d } = Hm(a, o, s), f = /* @__PURE__ */ new Map([[t.getKey(), t]]), p = null;
		for (let e = u; e <= d; e++) for (let t = c; t <= l; t++) {
			let { cell: n } = a[e][t], r = n.getParent();
			wm(r) || Z(160), r !== p && (f.set(r.getKey(), r), p = r), f.has(n.getKey()) || Xm(n, (e) => {
				f.set(e.getKey(), e);
			});
		}
		let m = Array.from(f.values());
		return Sa() || (this._cachedNodes = m), m;
	}
	getTextContent() {
		let e = this.getNodes().filter((e) => X(e)), t = "";
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = r.__parent, a = (e[n + 1] || {}).__parent;
			t += r.getTextContent() + (a === i ? "	" : "\n");
		}
		return t;
	}
};
function qm(e) {
	return e instanceof Km;
}
function Jm() {
	return new Km("root", bi("root", 0, "element"), bi("root", 0, "element"));
}
function Ym(e, t, n) {
	e.getKey(), t.getKey(), n.getKey();
	let r = N(), i = qm(r) ? r.clone() : Jm();
	return i.set(e.getKey(), t.getKey(), n.getKey()), i;
}
function Xm(e, t) {
	let n = [[e]];
	for (let e = n.at(-1); e !== void 0 && n.length > 0; e = n.at(-1)) {
		let r = e.pop();
		r === void 0 ? n.pop() : !1 !== t(r) && P(r) && n.push(r.getChildren());
	}
}
function Zm(e, t = U()) {
	let n = R(e);
	Jh(n) || Z(231, e);
	let r = ah(n, t.getElementByKey(e));
	return r === null && Z(232, e), {
		tableElement: r,
		tableNode: n
	};
}
var Qm = class {
	observers;
	nextFocus;
	shouldCheckSelectionForTable;
	constructor() {
		this.observers = /* @__PURE__ */ new Map(), this.nextFocus = null, this.shouldCheckSelectionForTable = null;
	}
	setNextFocus(e) {
		this.nextFocus = e;
	}
	getAndClearNextFocus() {
		let { nextFocus: e } = this;
		return e !== null && (this.nextFocus = null), e;
	}
	setShouldCheckSelectionForTable(e) {
		this.shouldCheckSelectionForTable = e;
	}
	getAndClearShouldCheckSelectionForTable() {
		let { shouldCheckSelectionForTable: e } = this;
		return e ? (this.shouldCheckSelectionForTable = null, e) : null;
	}
	removeObserver(e) {
		let t = this.observers.get(e);
		return t !== void 0 && (t[0].removeListeners(), this.observers.delete(e), !0);
	}
	removeAllObservers() {
		for (let e of Array.from(this.observers.keys())) this.removeObserver(e);
	}
	$getTableNodesAndObservers() {
		let e = [];
		for (let [t, [n]] of Array.from(this.observers.entries())) {
			let r = R(t);
			Jh(r) ? e.push([r, n]) : this.removeObserver(t);
		}
		return e;
	}
}, $m = class {
	focusX;
	focusY;
	listenersToRemove;
	table;
	isHighlightingCells;
	anchorX;
	anchorY;
	tableNodeKey;
	anchorCell;
	focusCell;
	anchorCellNodeKey;
	focusCellNodeKey;
	editor;
	tableSelection;
	hasHijackedSelectionStyles;
	isSelecting;
	pointerType;
	abortController;
	listenerOptions;
	constructor(e, t) {
		this.isHighlightingCells = !1, this.anchorX = -1, this.anchorY = -1, this.focusX = -1, this.focusY = -1, this.listenersToRemove = /* @__PURE__ */ new Set(), this.tableNodeKey = t, this.editor = e, this.table = {
			columns: 0,
			domRows: [],
			rows: 0
		}, this.tableSelection = null, this.anchorCellNodeKey = null, this.focusCellNodeKey = null, this.anchorCell = null, this.focusCell = null, this.hasHijackedSelectionStyles = !1, this.isSelecting = !1, this.pointerType = null, this.abortController = new AbortController(), this.listenerOptions = { signal: this.abortController.signal }, this.trackTable();
	}
	getTable() {
		return this.table;
	}
	removeListeners() {
		this.abortController.abort("removeListeners"), Array.from(this.listenersToRemove).forEach((e) => e()), this.listenersToRemove.clear();
	}
	$lookup() {
		return Zm(this.tableNodeKey, this.editor);
	}
	trackTable() {
		let e = new MutationObserver((e) => {
			this.editor.read("latest", () => {
				let t = !1;
				for (let n = 0; n < e.length; n++) {
					let r = e[n].target.nodeName;
					if (r === "TABLE" || r === "TBODY" || r === "THEAD" || r === "TR") {
						t = !0;
						break;
					}
				}
				if (!t) return;
				let { tableNode: n, tableElement: r } = this.$lookup();
				this.table = vh(n, r);
			});
		});
		this.editor.read("latest", () => {
			let { tableNode: t, tableElement: n } = this.$lookup();
			this.table = vh(t, n), e.observe(n, {
				attributes: !0,
				childList: !0,
				subtree: !0
			});
		});
	}
	$clearHighlight(e = !0) {
		let t = this.editor;
		this.isHighlightingCells = !1, this.anchorX = -1, this.anchorY = -1, this.focusX = -1, this.focusY = -1, this.tableSelection = null, this.anchorCellNodeKey = null, this.focusCellNodeKey = null, this.anchorCell = null, this.focusCell = null, this.hasHijackedSelectionStyles = !1, this.$enableHighlightStyle();
		let { tableNode: n, tableElement: r } = this.$lookup();
		yh(t, vh(n, r), null), e && N() !== null && (Xo(null), t.dispatchCommand(dn, void 0));
	}
	$enableHighlightStyle() {
		let e = this.editor, { tableElement: t } = this.$lookup();
		Yl(t, e._config.theme.tableSelection), t.classList.remove("disable-selection"), this.hasHijackedSelectionStyles = !1;
	}
	$disableHighlightStyle() {
		let { tableElement: e } = this.$lookup();
		Jl(e, this.editor._config.theme.tableSelection), this.hasHijackedSelectionStyles = !0;
	}
	$updateTableTableSelection(e) {
		if (e !== null) {
			e.tableKey !== this.tableNodeKey && Z(233, e.tableKey, this.tableNodeKey);
			let t = this.editor;
			this.tableSelection = e, this.isHighlightingCells = !0, this.$disableHighlightStyle(), this.updateDOMSelection(), yh(t, this.table, this.tableSelection);
		} else this.$clearHighlight();
	}
	updateDOMSelection() {
		if (this.anchorCell !== null && this.focusCell !== null) {
			let e = Is(this.editor._window);
			e && e.rangeCount > 0 && e.removeAllRanges();
		}
	}
	$setFocusCellForSelection(e, t = !1) {
		let n = this.editor, { tableNode: r } = this.$lookup(), i = e.x, a = e.y;
		if (this.focusCell = e, !this.isHighlightingCells && (t || this.anchorX !== i || this.anchorY !== a || this.tableSelection != null && this.anchorCellNodeKey != null) && (this.isHighlightingCells = !0, this.$disableHighlightStyle()), this.focusX !== -1 && this.focusY !== -1 && i === this.focusX && a === this.focusY) return !1;
		if (this.focusX = i, this.focusY = a, this.isHighlightingCells) {
			let o = Rh(r, e.elem);
			if (this.tableSelection != null && this.anchorCellNodeKey != null) {
				let e = o;
				if (e === null && t && (e = r.getCellNodeFromCords(i, a, this.table)), e !== null) {
					let t = this.$getAnchorTableCellOrThrow();
					return this.focusCellNodeKey = e.getKey(), this.tableSelection = Ym(r, t, e), Xo(this.tableSelection), n.dispatchCommand(dn, void 0), yh(n, this.table, this.tableSelection), !0;
				}
			}
		}
		return !1;
	}
	$getAnchorTableCell() {
		let e = this.anchorCellNodeKey ? R(this.anchorCellNodeKey) : null;
		return X(e) ? e : null;
	}
	$getAnchorTableCellOrThrow() {
		let e = this.$getAnchorTableCell();
		return e === null && Z(234), e;
	}
	$getFocusTableCell() {
		let e = this.focusCellNodeKey ? R(this.focusCellNodeKey) : null;
		return X(e) ? e : null;
	}
	$getFocusTableCellOrThrow() {
		let e = this.$getFocusTableCell();
		return e === null && Z(235), e;
	}
	$setAnchorCellForSelection(e) {
		this.isHighlightingCells = !1, this.anchorCell = e, this.anchorX = e.x, this.anchorY = e.y, this.focusX = -1, this.focusY = -1, this.focusCell = null, this.focusCellNodeKey = null;
		let { tableNode: t } = this.$lookup(), n = Rh(t, e.elem);
		if (n !== null) {
			let e = n.getKey();
			this.tableSelection == null ? this.tableSelection = Ym(t, n, n) : (this.tableSelection = this.tableSelection.clone(), this.tableSelection.set(t.getKey(), e, e)), this.anchorCellNodeKey = e;
		}
	}
	$formatCells(e) {
		let t = N();
		qm(t) || Z(236);
		let n = qi(), r = n.anchor, i = n.focus, a = t.getNodes().filter(X);
		a.length > 0 || Z(237);
		let o = a[0].getFirstChild(), s = fo(o) ? o.getFormatFlags(e, null) : null;
		a.forEach((t) => {
			r.set(t.getKey(), 0, "element"), i.set(t.getKey(), t.getChildrenSize(), "element"), n.formatText(e, s);
		}), Xo(t), this.editor.dispatchCommand(dn, void 0);
	}
	$clearText() {
		let { editor: e } = this, t = R(this.tableNodeKey);
		if (!Jh(t)) throw Error("Expected TableNode.");
		let n = N();
		qm(n) || Z(253);
		let r = n.getNodes().filter(X), i = t.getFirstChild(), a = t.getLastChild();
		if (r.length > 0 && i !== null && a !== null && wm(i) && wm(a) && r[0] === i.getFirstChild() && r[r.length - 1] === a.getLastChild()) {
			t.selectPrevious();
			let n = t.getParent();
			t.remove(), Ya(n) && n.isEmpty() && e.dispatchCommand(bn, void 0);
			return;
		}
		r.forEach((e) => {
			if (P(e)) {
				let t = I(), n = mi();
				t.append(n), e.append(t), e.getChildren().forEach((e) => {
					e !== t && e.remove();
				});
			}
		}), yh(e, this.table, null), Xo(null), e.dispatchCommand(dn, void 0);
	}
}, eh = "__lexicalTableSelection";
function th(e) {
	let t = Ns(e);
	return Jh(t) || Z(386, e), t;
}
var nh = 40;
function rh(e, t, n) {
	let r = (e) => Math.max(1, Math.ceil(Math.min(nh, e) / nh * 18));
	return e <= t + nh ? -r(t + nh - e) : e >= n - nh ? r(e - (n - nh)) : 0;
}
function ih(e) {
	return V(e) && e.nodeName === "TABLE";
}
function ah(e, t) {
	if (!t) return t;
	let n = ih(t) ? t : t.querySelector("table");
	return ih(n) || Z(341, e.constructor.name, e.getType(), e.getKey(), t.nodeName), n;
}
function oh(e) {
	return e._window;
}
function sh(e, t) {
	for (let n = t, r = null; n !== null; n = n.getParent()) {
		if (e.is(n)) return r;
		X(n) && (r = n);
	}
	return null;
}
var ch = [
	[In, "down"],
	[Fn, "up"],
	[Nn, "backward"],
	[jn, "forward"]
], lh = [
	wn,
	Tn,
	vn
], uh = [zn, Vn];
function dh(e, t) {
	return e.registerRootListener((n) => {
		if (n === null) return;
		let r = e._window;
		if (r !== null) return cr(r, "pointerdown", (r) => {
			let i = Zs(r);
			if (r.button !== 0 || !$s(i) || !n.contains(i)) return;
			let a = function(e) {
				let t = gh(e);
				if (t === null) return null;
				let n = t.elem;
				for (; n != null;) {
					if (n.nodeName === "TABLE" && eh in n && n[eh]) return {
						cellElement: t,
						tableElement: n,
						tableObserver: n[eh]
					};
					n = n.parentNode;
				}
				return null;
			}(i);
			e.update(() => {
				if (qm(N())) {
					for (let [e] of t.observers.values()) e.$clearHighlight(!1);
					Xo(null), e.dispatchCommand(dn, void 0);
				}
				if (!a) return;
				let { tableObserver: n, tableElement: i, cellElement: o } = a;
				(function(e, t, n, r, i, a) {
					let o = e._window;
					if (!o) return;
					let s = (n) => {
						if (i.isSelecting) return;
						i.isSelecting = !0, n !== null && i.anchorCell === null && e.update(() => {
							i.$setAnchorCellForSelection(n);
						});
						let s = t.clientX, c = t.clientY, l = null, u = () => {
							i.isSelecting = !1, l !== null && (o.cancelAnimationFrame(l), l = null), o.removeEventListener("pointerup", y), o.removeEventListener("pointermove", b);
						}, d = (e, t) => {
							let n = r.getRootNode();
							if (!Po(n) && !Rs(n)) return null;
							for (let i of n.elementsFromPoint(e, t)) {
								let e = _h(r, i);
								if (e) return e;
							}
							return null;
						}, f = (t, n) => {
							i.anchorCell === null && e.update(() => {
								i.$setAnchorCellForSelection(t);
							}), i.focusCell !== null && t.elem === i.focusCell.elem || (a.setNextFocus({
								focusCell: t,
								override: n,
								tableKey: i.tableNodeKey
							}), e.dispatchCommand(dn, void 0));
						}, p = (e) => {
							for (let t = r.parentElement; t; t = t.parentElement) if (e === "x" ? t.scrollWidth > t.clientWidth : t.scrollHeight > t.clientHeight) {
								let n = o.getComputedStyle(t), r = e === "x" ? n.overflowX : n.overflowY;
								if (r === "auto" || r === "scroll") return t;
							}
							return null;
						}, m = (e, t, n) => {
							let r, i;
							if (e === null) r = 0, i = n === "x" ? o.innerWidth : o.innerHeight;
							else {
								let t = e.getBoundingClientRect();
								r = n === "x" ? t.left : t.top, i = n === "x" ? t.right : t.bottom;
							}
							let a = rh(t, r, i);
							if (a === 0) return !1;
							if (e === null) {
								let e = n === "x" ? o.scrollX : o.scrollY;
								return o.scrollBy(n === "x" ? a : 0, n === "x" ? 0 : a), (n === "x" ? o.scrollX : o.scrollY) !== e;
							}
							if (n === "x") {
								let t = e.scrollLeft;
								return e.scrollLeft += a, e.scrollLeft !== t;
							}
							let s = e.scrollTop;
							return e.scrollTop += a, e.scrollTop !== s;
						}, h = (e, t) => {
							let n = s, r = c;
							if (e === null) n = Math.min(Math.max(n, 1), o.innerWidth - 1);
							else {
								let t = e.getBoundingClientRect();
								n = Math.min(Math.max(n, t.left + 1), t.right - 1);
							}
							if (t === null) r = Math.min(Math.max(r, 1), o.innerHeight - 1);
							else {
								let e = t.getBoundingClientRect();
								r = Math.min(Math.max(r, e.top + 1), e.bottom - 1);
							}
							return [n, r];
						}, g = () => {
							let e = p("x");
							if (e !== null) {
								let t = e.getBoundingClientRect();
								if (rh(s, t.left, t.right) !== 0) return !0;
							}
							let t = p("y"), n = t === null ? 0 : t.getBoundingClientRect().top, r = t === null ? o.innerHeight : t.getBoundingClientRect().bottom;
							return rh(c, n, r) !== 0;
						}, _ = () => {
							if (l = null, !i.isSelecting) return;
							let e = p("x"), t = p("y"), n = e !== null && m(e, s, "x"), r = m(t, c, "y");
							if (n || r) {
								let [n, r] = h(e, t), i = d(n, r);
								i && f(i, !1), l = o.requestAnimationFrame(_);
							}
						}, v = () => {
							l === null && i.pointerType !== "touch" && g() && (l = o.requestAnimationFrame(_));
						}, y = () => {
							u();
						}, b = (e) => {
							if (!((e) => !(1 & ~e.buttons))(e) && i.isSelecting) return void u();
							let t = Zs(e);
							if (!$s(t)) return;
							s = e.clientX, c = e.clientY;
							let n = null, a = !(te || r.contains(t));
							n = a ? _h(r, t) : d(e.clientX, e.clientY), n && f(n, a), v();
						};
						o.addEventListener("pointerup", y, i.listenerOptions), o.addEventListener("pointermove", b, i.listenerOptions);
					};
					i.pointerType = t.pointerType;
					let c = th(i.tableNodeKey), l = Zi();
					if (te && t.shiftKey && Eh(l, c) && (j(l) || qm(l))) {
						let e = l.anchor.getNode(), r = sh(c, l.anchor.getNode());
						r ? (i.$setAnchorCellForSelection(Lh(i, r)), i.$setFocusCellForSelection(n), Ph(t)) : (c.isBefore(e) ? c.selectStart() : c.selectEnd()).anchor.set(l.anchor.key, l.anchor.offset, l.anchor.type);
					} else t.pointerType !== "touch" && i.$setAnchorCellForSelection(n);
					s(n);
				})(e, r, o, i, n, t);
			});
		});
	});
}
function fh(e, t, n, r, i) {
	let a = n.getRootElement(), o = oh(n);
	a !== null && o !== null || Z(246);
	let s = new $m(n, e.getKey()), c = ah(e, t);
	(function(e, t) {
		hh(e) !== null && Z(205), e[eh] = t;
	})(c, s), s.listenersToRemove.add(() => function(e, t) {
		hh(e) === t && delete e[eh];
	}(c, s)), s.listenersToRemove.add(cr(c, "mousedown", (e) => {
		let t = Zs(e);
		e.detail >= 3 && $s(t) && gh(t) !== null && e.preventDefault();
	}, s.listenerOptions));
	for (let [t, r] of ch) s.listenersToRemove.add(n.registerCommand(t, (t) => Nh(n, t, r, e, s, i), 3));
	s.listenersToRemove.add(n.registerCommand(Bn, (t) => {
		let n = N();
		if (qm(n)) {
			let r = sh(e, n.focus.getNode());
			if (r !== null) return Ph(t), r.selectEnd(), !0;
		}
		return !1;
	}, 3));
	let l = (t) => () => {
		let n = N();
		if (!Eh(n, e)) return !1;
		if (qm(n)) return s.$clearText(), !0;
		if (j(n)) {
			if (!X(sh(e, n.anchor.getNode()))) return !1;
			let r = n.anchor.getNode(), i = n.focus.getNode(), a = e.isParentOf(r), o = e.isParentOf(i);
			if (a && !o || o && !a) return s.$clearText(), !0;
			let c = W(n.anchor.getNode(), (e) => P(e)), l = c && W(c, (e) => P(e) && X(e.getParent()));
			if (!P(l) || !P(c)) return !1;
			if (t === Tn && l.getPreviousSibling() === null) return !0;
		}
		return !1;
	};
	for (let e of lh) s.listenersToRemove.add(n.registerCommand(e, l(e), 3));
	let u = (t) => {
		let n = N();
		if (!qm(n) && !j(n)) return !1;
		let r = e.isParentOf(n.anchor.getNode());
		if (r !== e.isParentOf(n.focus.getNode())) {
			let t = r ? "anchor" : "focus", i = r ? "focus" : "anchor", { key: a, offset: o, type: s } = n[i];
			return e[n[t].isBefore(n[i]) ? "selectPrevious" : "selectNext"]()[i].set(a, o, s), !1;
		}
		return !!Eh(n, e) && !!qm(n) && (t && (t.preventDefault(), t.stopPropagation()), s.$clearText(), !0);
	};
	for (let e of uh) s.listenersToRemove.add(n.registerCommand(e, u, 3));
	s.listenersToRemove.add(n.registerCommand(Qn, (e) => {
		let t = N();
		if (t) {
			if (!qm(t) && !j(t)) return !1;
			fp(n, Eu(e, ClipboardEvent) ? e : null, hp(t));
			let r = u(e);
			return j(t) ? (t.removeText(), !0) : r;
		}
		return !1;
	}, 3));
	let d = a.ownerDocument;
	return s.listenersToRemove.add(cr(d, "paste", (t) => {
		t.defaultPrevented || n.read("latest", () => {
			let t = N();
			return a.contains(d.activeElement) && qm(t) && Eh(t, e);
		}) && (t.preventDefault(), n.dispatchCommand(Sn, t));
	})), s.listenersToRemove.add(cr(d, "copy", (t) => {
		if (t.defaultPrevented) return;
		let r = Zs(t);
		r === a || $s(r) && a.contains(r) || n.read("latest", () => {
			let t = N();
			return a.contains(Ys(a)) && qm(t) && Eh(t, e);
		}) && (t.preventDefault(), n.dispatchCommand(Zn, t));
	})), s.listenersToRemove.add(n.registerCommand(En, (t) => {
		let n = N();
		return Eh(n, e) ? qm(n) ? (s.$formatCells(t), !0) : (j(n) && X(W(n.anchor.getNode(), (e) => X(e))), !1) : !1;
	}, 3)), s.listenersToRemove.add(n.registerCommand(qn, (t) => {
		let n = N();
		if (!qm(n) || !Eh(n, e)) return !1;
		let r = n.anchor.getNode(), i = n.focus.getNode();
		if (!X(r) || !X(i)) return !1;
		if (function(e, t) {
			if (qm(e)) {
				let n = e.anchor.getNode(), r = e.focus.getNode();
				if (t && n && r) {
					let [e] = zm(t, n, r);
					return n.getKey() === e[0][0].cell.getKey() && r.getKey() === e[e.length - 1].at(-1).cell.getKey();
				}
			}
			return !1;
		}(n, e)) return e.setFormat(t), !0;
		let [a, o, s] = zm(e, r, i), c = Math.max(o.startRow + o.cell.__rowSpan - 1, s.startRow + s.cell.__rowSpan - 1), l = Math.max(o.startColumn + o.cell.__colSpan - 1, s.startColumn + s.cell.__colSpan - 1), u = Math.min(o.startRow, s.startRow), d = Math.min(o.startColumn, s.startColumn), f = /* @__PURE__ */ new Set();
		for (let e = u; e <= c; e++) for (let n = d; n <= l; n++) {
			let r = a[e][n].cell;
			if (f.has(r)) continue;
			f.add(r), r.setFormat(t);
			let i = r.getChildren();
			for (let e = 0; e < i.length; e++) {
				let n = i[e];
				P(n) && !n.isInline() && n.setFormat(t);
			}
		}
		return !0;
	}, 3)), s.listenersToRemove.add(n.registerCommand(xn, (t) => {
		let r = N();
		if (!Eh(r, e)) return !1;
		if (qm(r)) return s.$clearHighlight(), !1;
		if (j(r)) {
			if (!X(W(r.anchor.getNode(), (e) => X(e)))) return !1;
			if (typeof t == "string") {
				let i = Ih(n, r, e);
				if (i) return Fh(i, e, [mi(t)]), !0;
			}
		}
		return !1;
	}, 3)), r && s.listenersToRemove.add(n.registerCommand(Hn, (t) => {
		let n = N();
		if (!j(n) || !n.isCollapsed() || !Eh(n, e)) return !1;
		let r = Ah(n.anchor.getNode());
		return !(r === null || !e.is(jh(r))) && (Ph(t), function(e, t) {
			let n = t === "next" ? "getNextSibling" : "getPreviousSibling", r = t === "next" ? "getFirstChild" : "getLastChild", i = e[n]();
			if (P(i)) return i.selectEnd();
			let a = W(e, wm);
			a === null && Z(247);
			for (let e = a[n](); wm(e); e = e[n]()) {
				let t = e[r]();
				if (P(t)) return t.selectEnd();
			}
			let o = W(a, Jh);
			o === null && Z(248), t === "next" ? o.selectNext() : o.selectPrevious();
		}(r, t.shiftKey ? "previous" : "next"), !0);
	}, 3)), s.listenersToRemove.add(n.registerCommand(ir, (t) => e.isSelected(), 3)), s.listenersToRemove.add(n.registerCommand(bn, () => {
		let t = N();
		if (!j(t) || !t.isCollapsed() || !Eh(t, e)) return !1;
		let r = Ih(n, t, e);
		return !!r && (Fh(r, e), !0);
	}, 3)), s;
}
function ph(e, t) {
	let n = N(), r = Zi(), i = e.getAndClearNextFocus();
	if (i !== null) {
		let { tableKey: t, focusCell: r } = i, a = e.observers.get(t);
		a || Z(335, t);
		let [o] = a;
		if (qm(n) && n.tableKey === o.tableNodeKey) return (r.x !== o.focusX || r.y !== o.focusY) && (o.$setFocusCellForSelection(r), !0);
		if (o.anchorCell !== null && o.anchorCellNodeKey !== null && r.elem !== o.anchorCell.elem && o.tableSelection !== null) return o.$setFocusCellForSelection(r, !0), !0;
	}
	let a = e.getAndClearShouldCheckSelectionForTable();
	if (a && j(r) && j(n) && n.isCollapsed()) {
		let e = R(a);
		if (Jh(e)) {
			let t = n.anchor.getNode(), r = e.getFirstChild(), i = Ah(t);
			if (i !== null && wm(r)) {
				let t = r.getFirstChild();
				if (X(t) && e.is(W(i, (n) => n.is(e) || n.is(t)))) return t.selectStart(), !0;
			}
		}
	}
	qm(n) && function(e, t) {
		let n = oh(e), r = Zi();
		if (!t.is(r)) return;
		let i = th(t.tableKey), a = Is(n), o = a && Gs(a, e.getRootElement());
		if (a && o && o.anchorNode && o.focusNode) {
			let n = Ko(o.focusNode), r = n && !i.isParentOf(n), s = Ko(o.anchorNode), c = s && i.isParentOf(s);
			if (r && c && a.rangeCount > 0) {
				let n = Yi(a, e);
				n && (n.anchor.set(i.getKey(), t.isBackward() ? i.getChildrenSize() : 0, "element"), a.removeAllRanges(), Xo(n));
			}
		}
	}(t, n), j(n) && function(e, t) {
		let n = Zi(), { anchor: r, focus: i } = e, a = r.getNode(), o = i.getNode(), s = Ah(a), c = Ah(o), l = s ? jh(s) : null, u = c ? jh(c) : null, d = e.isBackward(), f = s && c && l && u && l.is(u), p = u && (!l || l.isParentOf(u)), m = l && (!u || u.isParentOf(l));
		if (p) {
			let t = e.clone(), [n] = zm(u, c, c), r = n[0][0].cell, i = n[n.length - 1].at(-1).cell;
			t.focus.set(d ? r.getKey() : i.getKey(), d ? 0 : i.getChildrenSize(), "element"), Xo(t);
		} else if (m) {
			let t = e.clone(), [n] = zm(l, s, s), r = n[0][0].cell, i = n[n.length - 1].at(-1).cell;
			t.anchor.set(d ? i.getKey() : r.getKey(), d ? i.getChildrenSize() : 0, "element"), Xo(t);
		} else if (f) {
			let r = t.observers.get(l.getKey());
			r || Z(335, l.getKey());
			let [i] = r;
			if (s.is(c) || (i.$setAnchorCellForSelection(Lh(i, s)), i.$setFocusCellForSelection(Lh(i, c), !0)), i.pointerType === "touch" && i.isSelecting && e.isCollapsed() && j(n) && n.isCollapsed()) {
				let e = Ah(n.anchor.getNode());
				e && !e.is(c) && (i.$setAnchorCellForSelection(Lh(i, e)), i.$setFocusCellForSelection(Lh(i, c), !0), i.pointerType = null);
			}
		}
	}(n, e);
	for (let [n, r] of e.$getTableNodesAndObservers()) mh(t, n, r);
	return !1;
}
function mh(e, t, n) {
	let r = N(), i = Zi();
	r && !r.is(i) && (qm(r) || qm(i)) && n.tableSelection && !n.tableSelection.is(i) && (qm(r) && r.tableKey === n.tableNodeKey ? n.$updateTableTableSelection(r) : !qm(r) && qm(i) && i.tableKey === n.tableNodeKey && n.$updateTableTableSelection(null)), n.hasHijackedSelectionStyles && !t.isSelected() ? function(e, t) {
		t.$enableHighlightStyle(), bh(t.table, (t) => {
			let n = t.elem;
			t.highlighted = !1, kh(e, t), n.getAttribute("style") || n.removeAttribute("style");
		});
	}(e, n) : !n.hasHijackedSelectionStyles && t.isSelected() && function(e, t) {
		t.$disableHighlightStyle(), bh(t.table, (t) => {
			t.highlighted = !0, Oh(e, t);
		});
	}(e, n);
}
function hh(e) {
	return e[eh] || null;
}
function gh(e) {
	let t = e;
	for (; t != null;) {
		let e = t.nodeName;
		if (e === "TD" || e === "TH") {
			let e = t._cell;
			return e === void 0 ? null : e;
		}
		t = t.parentNode;
	}
	return null;
}
function _h(e, t) {
	if (!e.contains(t)) return null;
	let n = null;
	for (let r = t; r != null; r = r.parentNode) {
		if (r === e) return n;
		let t = r.nodeName;
		t !== "TD" && t !== "TH" || (n = r._cell || null);
	}
	return null;
}
function vh(e, t) {
	let n = [], r = {
		columns: 0,
		domRows: n,
		rows: 0
	}, i = ah(e, t).querySelector("tr"), a = 0, o = 0;
	for (n.length = 0; i != null;) {
		let e = i.nodeName;
		if (e === "TD" || e === "TH") {
			let e = {
				elem: i,
				hasBackgroundColor: i.style.backgroundColor !== "",
				highlighted: !1,
				x: a,
				y: o
			};
			i._cell = e;
			let t = n[o];
			t === void 0 && (t = n[o] = []), t[a] = e;
		} else {
			let e = i.firstChild;
			if (e != null) {
				i = e;
				continue;
			}
		}
		let t = i.nextSibling;
		if (t != null) {
			a++, i = t;
			continue;
		}
		let r = i.parentNode;
		if (r != null) {
			let e = r.nextSibling;
			if (e == null) break;
			o++, a = 0, i = e;
		}
	}
	return r.columns = a + 1, r.rows = o + 1, r;
}
function yh(e, t, n) {
	let r = new Set(n ? n.getNodes() : []);
	bh(t, (t, n) => {
		let i = t.elem;
		r.has(n) ? (t.highlighted = !0, Oh(e, t)) : (t.highlighted = !1, kh(e, t), i.getAttribute("style") || i.removeAttribute("style"));
	});
}
function bh(e, t) {
	let { domRows: n } = e;
	for (let e = 0; e < n.length; e++) {
		let r = n[e];
		if (r) for (let n = 0; n < r.length; n++) {
			let i = r[n];
			if (!i) continue;
			let a = Ko(i.elem);
			a !== null && t(i, a, {
				x: n,
				y: e
			});
		}
	}
}
var xh = (e, t, n, r, i) => {
	let a = i === "forward";
	switch (i) {
		case "backward":
		case "forward": return n === (a ? e.table.columns - 1 : 0) ? r === (a ? e.table.rows - 1 : 0) ? a ? t.selectNext() : t.selectPrevious() : Dh(t.getCellNodeFromCordsOrThrow(a ? 0 : e.table.columns - 1, r + (a ? 1 : -1), e.table), a) : Dh(t.getCellNodeFromCordsOrThrow(n + (a ? 1 : -1), r, e.table), a), !0;
		case "up": return r === 0 ? t.selectPrevious() : Dh(t.getCellNodeFromCordsOrThrow(n, r - 1, e.table), !1), !0;
		case "down": return r === e.table.rows - 1 ? t.selectNext() : Dh(t.getCellNodeFromCordsOrThrow(n, r + 1, e.table), !0), !0;
		default: return !1;
	}
};
function Sh(e, t) {
	let n, r;
	if (t.startColumn === e.minColumn) n = "minColumn";
	else {
		if (t.startColumn + t.cell.__colSpan - 1 !== e.maxColumn) return null;
		n = "maxColumn";
	}
	if (t.startRow === e.minRow) r = "minRow";
	else {
		if (t.startRow + t.cell.__rowSpan - 1 !== e.maxRow) return null;
		r = "maxRow";
	}
	return [n, r];
}
function Ch([e, t]) {
	return [e === "minColumn" ? "maxColumn" : "minColumn", t === "minRow" ? "maxRow" : "minRow"];
}
function wh(e, t, [n, r]) {
	let i = t[r], a = e[i];
	a === void 0 && Z(250, r, String(i));
	let o = t[n], s = a[o];
	return s === void 0 && Z(250, n, String(o)), s;
}
function Th(e, t, n, r, i) {
	let a = Hm(t, n, r), { topSpan: o, leftSpan: s, bottomSpan: c, rightSpan: l } = function(e, t) {
		let { minColumn: n, maxColumn: r, minRow: i, maxRow: a } = t, o = 1, s = 1, c = 1, l = 1, u = e[i], d = e[a];
		for (let e = n; e <= r; e++) o = Math.max(o, u[e].cell.__rowSpan), l = Math.max(l, d[e].cell.__rowSpan);
		for (let t = i; t <= a; t++) s = Math.max(s, e[t][n].cell.__colSpan), c = Math.max(c, e[t][r].cell.__colSpan);
		return {
			bottomSpan: l,
			leftSpan: s,
			rightSpan: c,
			topSpan: o
		};
	}(t, a), [u, d] = Ch(function(e, t) {
		let n = Sh(e, t);
		return n === null && Z(249, t.cell.getKey()), n;
	}(a, n)), f = a[u], p = a[d];
	i === "forward" ? f += u === "maxColumn" ? 1 : s : i === "backward" ? f -= u === "minColumn" ? 1 : l : i === "down" ? p += d === "maxRow" ? 1 : o : i === "up" && (p -= d === "minRow" ? 1 : c);
	let m = t[p];
	if (m === void 0) return !1;
	let h = m[f];
	if (h === void 0) return !1;
	let [g, _] = function(e, t, n) {
		let r = Hm(e, t, n), i = Sh(r, t);
		if (i) return [wh(e, r, i), wh(e, r, Ch(i))];
		let a = Sh(r, n);
		if (a) return [wh(e, r, Ch(a)), wh(e, r, a)];
		let o = ["minColumn", "minRow"];
		return [wh(e, r, o), wh(e, r, Ch(o))];
	}(t, n, h), v = Lh(e, g.cell), y = Lh(e, _.cell);
	return e.$setAnchorCellForSelection(v), e.$setFocusCellForSelection(y, !0), !0;
}
function Eh(e, t) {
	if (j(e) || qm(e)) {
		let n = t.isParentOf(e.anchor.getNode()), r = t.isParentOf(e.focus.getNode());
		return n && r;
	}
	return !1;
}
function Dh(e, t) {
	t ? e.selectStart() : e.selectEnd();
}
function Oh(e, t) {
	let n = t.elem, r = e._config.theme;
	X(Ko(n)) || Z(131), Jl(n, r.tableCellSelected);
}
function kh(e, t) {
	let n = t.elem;
	X(Ko(n)) || Z(131);
	let r = e._config.theme;
	Yl(n, r.tableCellSelected);
}
function Ah(e) {
	let t = W(e, X);
	return X(t) ? t : null;
}
function jh(e) {
	let t = W(e, Jh);
	return Jh(t) ? t : null;
}
function Mh(e, t, n, r, i, a, o) {
	let s = Dl(n.focus, i ? "previous" : "next");
	if (Ll(s)) return !1;
	let c = s;
	for (let e of vl(s).iterNodeCarets("shadowRoot")) {
		if (!al(e) || !P(e.origin)) return !1;
		c = e;
	}
	let l = c.getParentAtCaret();
	if (!X(l)) return !1;
	let u = l, d = function(e) {
		for (let t of vl(e).iterNodeCarets("root")) {
			let { origin: n } = t;
			if (X(n)) {
				if (ol(t)) return pl(n, e.direction);
			} else if (!wm(n)) break;
		}
		return null;
	}(G(u, c.direction)), f = W(u, Jh);
	if (!f || !f.is(a)) return !1;
	let p = e.getElementByKey(u.getKey()), m = gh(p);
	if (!p || !m) return !1;
	if (o.table = Gh(e, f), d) if (r === "extend") {
		let t = gh(e.getElementByKey(d.origin.getKey()));
		if (!t) return !1;
		o.$setAnchorCellForSelection(m), o.$setFocusCellForSelection(t, !0);
	} else {
		let e = Il(d);
		Ol(n.anchor, e), Ol(n.focus, e);
	}
	else if (r === "extend") o.$setAnchorCellForSelection(m), o.$setFocusCellForSelection(m, !0);
	else {
		let e = function(e) {
			let t = hl(e);
			return ol(t) ? Il(t) : e;
		}(G(f, s.direction));
		Ol(n.anchor, e), Ol(n.focus, e);
	}
	return Ph(t), !0;
}
function Nh(e, t, n, r, i, a) {
	if ((n === "up" || n === "down") && function(e) {
		let t = e.getRootElement();
		return t ? t.hasAttribute("aria-controls") && t.getAttribute("aria-controls") === "typeahead-menu" : !1;
	}(e)) return !1;
	let o = N();
	if (!Eh(o, r)) {
		if (j(o)) {
			if (n === "backward") {
				if (o.focus.offset > 0) return !1;
				let e = function(e) {
					for (let t = e, n = e; n !== null; t = n, n = n.getParent()) if (P(n)) {
						if (n !== t && n.getFirstChild() !== t) return null;
						if (!n.isInline()) return n;
					}
					return null;
				}(o.focus.getNode());
				if (!e) return !1;
				let n = e.getPreviousSibling();
				return !!Jh(n) && (Ph(t), t.shiftKey ? o.focus.set(n.getParentOrThrow().getKey(), n.getIndexWithinParent(), "element") : n.selectEnd(), !0);
			}
			if (t.shiftKey && (n === "up" || n === "down")) {
				let e = o.focus.getNode();
				if (!o.isCollapsed() && (n === "up" && !o.isBackward() || n === "down" && o.isBackward())) {
					let i = W(e, (e) => Jh(e));
					if (X(i) && (i = W(i, Jh)), i !== r || !i) return !1;
					let a = n === "down" ? i.getNextSibling() : i.getPreviousSibling();
					if (!a) return !1;
					let s = 0;
					n === "up" && P(a) && (s = a.getChildrenSize());
					let c = a;
					n === "up" && P(a) && (c = a.getLastChild() || a, s = A(c) ? c.getTextContentSize() : 0);
					let l = o.clone();
					return l.focus.set(c.getKey(), s, A(c) ? "text" : "element"), Xo(l), Ph(t), !0;
				}
				if (ks(e)) {
					let e = n === "up" ? o.getNodes()[o.getNodes().length - 1] : o.getNodes()[0];
					if (e && sh(r, e) !== null) {
						let e = r.getFirstDescendant(), t = r.getLastDescendant();
						if (!e || !t) return !1;
						let [n] = Vm(e), [a] = Vm(t), o = r.getCordsFromCellNode(n, i.table), s = r.getCordsFromCellNode(a, i.table), c = r.getDOMCellFromCordsOrThrow(o.x, o.y, i.table), l = r.getDOMCellFromCordsOrThrow(s.x, s.y, i.table);
						return i.$setAnchorCellForSelection(c), i.$setFocusCellForSelection(l, !0), !0;
					}
					return !1;
				}
				{
					let r = W(e, (e) => P(e) && !e.isInline());
					if (X(r) && (r = W(r, Jh)), !r) return !1;
					let a = n === "down" ? r.getNextSibling() : r.getPreviousSibling();
					if (Jh(a) && i.tableNodeKey === a.getKey()) {
						let e = a.getFirstDescendant(), r = a.getLastDescendant();
						if (!e || !r) return !1;
						let [i] = Vm(e), [s] = Vm(r), c = o.clone();
						return c.focus.set((n === "up" ? i : s).getKey(), n === "up" ? 0 : s.getChildrenSize(), "element"), Ph(t), Xo(c), !0;
					}
				}
			}
		}
		return n === "down" && Hh(e) && a.setShouldCheckSelectionForTable(r.getKey()), !1;
	}
	if (j(o)) {
		if (n === "backward" || n === "forward") return Mh(e, t, o, t.shiftKey ? "extend" : "move", n === "backward", r, i);
		if (o.isCollapsed()) {
			let { anchor: s, focus: c } = o, l = W(s.getNode(), X), u = W(c.getNode(), X);
			if (!X(l) || !l.is(u)) return !1;
			let d = jh(l);
			if (d !== r && d != null) {
				let r = ah(d, e.getElementByKey(d.getKey()));
				if (r != null) return i.table = vh(d, r), Nh(e, t, n, d, i, a);
			}
			let f = e.getElementByKey(l.__key), p = e.getElementByKey(s.key);
			if (p == null || f == null) return !1;
			let m;
			if (s.type === "element") m = p.getBoundingClientRect();
			else {
				let t = Is(oh(e));
				if (t === null || t.rangeCount === 0) return !1;
				let n = Ws(t, e.getRootElement());
				if (n === null) return !1;
				m = n.getBoundingClientRect();
			}
			let h = n === "up" ? l.getFirstChild() : l.getLastChild();
			if (h == null) return !1;
			let g = e.getElementByKey(h.__key);
			if (g == null) return !1;
			let _ = g.getBoundingClientRect();
			if (n === "up" ? _.top > m.top - m.height : m.bottom + m.height > _.bottom) {
				Ph(t);
				let e = r.getCordsFromCellNode(l, i.table);
				if (!t.shiftKey) return xh(i, r, e.x, e.y, n);
				{
					let t = r.getDOMCellFromCordsOrThrow(e.x, e.y, i.table);
					i.$setAnchorCellForSelection(t), i.$setFocusCellForSelection(t, !0);
				}
				return !0;
			}
		}
	} else if (qm(o)) {
		let { anchor: a, focus: s, tableKey: c } = o;
		if (c !== r.getKey()) return !1;
		let l = W(a.getNode(), X), u = W(s.getNode(), X), [d] = o.getNodes();
		Jh(d) || Z(251);
		let f = ah(d, e.getElementByKey(d.getKey()));
		if (!X(l) || !X(u) || !Jh(d) || f == null) return !1;
		i.$updateTableTableSelection(o);
		let p = vh(d, f), m = r.getCordsFromCellNode(l, p), h = r.getDOMCellFromCordsOrThrow(m.x, m.y, p);
		if (i.$setAnchorCellForSelection(h), Ph(t), t.shiftKey) {
			let [e, t, a] = zm(r, l, u);
			return Th(i, e, t, a, n);
		}
		return u.selectEnd(), !0;
	}
	return !1;
}
function Ph(e) {
	e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation();
}
function Fh(e, t, n) {
	let r = I();
	e === "first" ? t.insertBefore(r) : t.insertAfter(r), r.append(...n || []), r.selectEnd();
}
function Ih(e, t, n) {
	let r = n.getParent();
	if (!r) return;
	let i = Is(oh(e));
	if (!i) return;
	let a = Gs(i, e.getRootElement()).anchorNode, o = e.getElementByKey(r.getKey()), s = ah(n, e.getElementByKey(n.getKey()));
	if (!a || !o || !s || !o.contains(a) || s.contains(a)) return;
	let c = W(t.anchor.getNode(), (e) => X(e));
	if (!c) return;
	let l = W(c, (e) => Jh(e));
	if (!Jh(l) || !l.is(n)) return;
	let [u, d] = zm(n, c, c), f = u[0][0], p = u[u.length - 1][u[0].length - 1], { startRow: m, startColumn: h } = d, g = m === f.startRow && h === f.startColumn, _ = m === p.startRow && h === p.startColumn;
	return g ? "first" : _ ? "last" : void 0;
}
function Lh(e, t) {
	let { tableNode: n } = e.$lookup(), r = n.getCordsFromCellNode(t, e.table);
	return n.getDOMCellFromCordsOrThrow(r.x, r.y, e.table);
}
function Rh(e, t, n) {
	return sh(e, Ko(t, n));
}
function zh(e, t, n) {
	let r = e.querySelector("colgroup");
	if (!r) return;
	let i = [];
	for (let e = 0; e < t; e++) {
		let t = B().createElement("col"), r = n && n[e];
		r && (t.style.width = `${r}px`), i.push(t);
	}
	r.replaceChildren(...i);
}
function Bh(e, t, n) {
	if (!t.theme.tableAlignment) return;
	let r = [], i = [];
	for (let e of ["center", "right"]) {
		let a = t.theme.tableAlignment[e];
		a && (e === n ? i : r).push(a);
	}
	Yl(e, ...r), Jl(e, ...i);
}
var Vh = /* @__PURE__ */ new WeakSet();
function Hh(e = U()) {
	return Vh.has(e);
}
function Uh(e, t) {
	t ? Vh.add(e) : Vh.delete(e);
}
var Wh = class e extends Ga {
	__rowStriping;
	__frozenColumnCount;
	__frozenRowCount;
	__colWidths;
	static getType() {
		return "table";
	}
	getColWidths() {
		return this.getLatest().__colWidths;
	}
	setColWidths(e) {
		let t = this.getWritable();
		return t.__colWidths = e, t;
	}
	static clone(t) {
		return new e(t.__key);
	}
	afterCloneFrom(e) {
		super.afterCloneFrom(e), this.__colWidths = e.__colWidths, this.__rowStriping = e.__rowStriping, this.__frozenColumnCount = e.__frozenColumnCount, this.__frozenRowCount = e.__frozenRowCount;
	}
	static importDOM() {
		return { table: (e) => ({
			conversion: Kh,
			priority: 1
		}) };
	}
	static importJSON(e) {
		return qh().updateFromJSON(e);
	}
	updateFromJSON(e) {
		return super.updateFromJSON(e).setRowStriping(e.rowStriping || !1).setFrozenColumns(e.frozenColumnCount || 0).setFrozenRows(e.frozenRowCount || 0).setColWidths(e.colWidths);
	}
	constructor(e) {
		super(e), this.__rowStriping = !1, this.__frozenColumnCount = 0, this.__frozenRowCount = 0, this.__colWidths = void 0;
	}
	exportJSON() {
		return {
			...super.exportJSON(),
			colWidths: this.getColWidths(),
			frozenColumnCount: this.__frozenColumnCount ? this.__frozenColumnCount : void 0,
			frozenRowCount: this.__frozenRowCount ? this.__frozenRowCount : void 0,
			rowStriping: this.__rowStriping ? this.__rowStriping : void 0
		};
	}
	extractWithChild(e, t, n) {
		return n === "html";
	}
	getDOMSlot(e) {
		let t = ih(e) ? e : e.querySelector("table");
		return ih(t) || Z(229), super.getDOMSlot(e).withElement(t).withAfter(t.querySelector("colgroup"));
	}
	createDOM(e, t) {
		let n = B().createElement("table");
		this.__style && Zr(n.style, this.__style);
		let r = B().createElement("colgroup");
		if (n.appendChild(r), _c(r), Jl(n, e.theme.table), this.updateTableElement(null, n, e), Hh(t)) {
			let t = B().createElement("div"), r = e.theme.tableScrollableWrapper;
			return r ? Jl(t, r) : t.style.overflowX = "auto", t.appendChild(n), this.updateTableWrapper(null, t, n, e), t;
		}
		return n;
	}
	updateTableWrapper(e, t, n, r) {
		this.__frozenColumnCount !== (e ? e.__frozenColumnCount : 0) && function(e, t, n, r) {
			r > 0 ? (Jl(e, n.theme.tableFrozenColumn), t.setAttribute("data-lexical-frozen-column", "true")) : (Yl(e, n.theme.tableFrozenColumn), t.removeAttribute("data-lexical-frozen-column"));
		}(t, n, r, this.__frozenColumnCount), this.__frozenRowCount !== (e ? e.__frozenRowCount : 0) && function(e, t, n, r) {
			r > 0 ? (Jl(e, n.theme.tableFrozenRow), t.setAttribute("data-lexical-frozen-row", "true")) : (Yl(e, n.theme.tableFrozenRow), t.removeAttribute("data-lexical-frozen-row"));
		}(t, n, r, this.__frozenRowCount);
	}
	updateTableElement(e, t, n) {
		this.__style !== (e ? e.__style : "") && Zr(t.style, this.__style, e ? e.__style : ""), this.__rowStriping !== (!!e && e.__rowStriping) && function(e, t, n) {
			n ? (Jl(e, t.theme.tableRowStriping), e.setAttribute("data-lexical-row-striping", "true")) : (Yl(e, t.theme.tableRowStriping), e.removeAttribute("data-lexical-row-striping"));
		}(t, n, this.__rowStriping);
		let r = e ? e.getColumnCount() : 0, i = e ? e.__colWidths : void 0;
		this.getColumnCount() === r && this.getColWidths() === i || zh(t, this.getColumnCount(), this.getColWidths()), Bh(t, n, this.getFormatType());
	}
	updateDOM(e, t, n) {
		let r = ah(this, t);
		return t === r === Hh() || (V(i = t) && i.nodeName === "DIV" && this.updateTableWrapper(e, t, r, n), this.updateTableElement(e, r, n), !1);
		var i;
	}
	scaleDOMColWidths(e, t) {
		let n = this.getColWidths();
		n && zh(ah(this, e), this.getColumnCount(), n.map((e) => e * t));
	}
	exportDOM(e) {
		let t = super.exportDOM(e), { element: n } = t;
		return {
			after: (n) => {
				if (t.after && (n = t.after(n)), !ih(n) && V(n) && (n = n.querySelector("table")), !ih(n)) return null;
				Bh(n, e._config, this.getFormatType());
				let [r] = Bm(this, null, null), i = /* @__PURE__ */ new Map();
				for (let e of r) for (let t of e) {
					let e = t.cell.getKey();
					i.has(e) || i.set(e, {
						colSpan: t.cell.getColSpan(),
						startColumn: t.startColumn
					});
				}
				let a = /* @__PURE__ */ new Set();
				for (let e of n.querySelectorAll(":scope > tr > [data-temporary-table-cell-lexical-key]")) {
					let t = e.getAttribute("data-temporary-table-cell-lexical-key");
					if (t) {
						let n = i.get(t);
						if (e.removeAttribute("data-temporary-table-cell-lexical-key"), n) {
							i.delete(t);
							for (let e = 0; e < n.colSpan; e++) a.add(e + n.startColumn);
						}
					}
				}
				let o = n.querySelector(":scope > colgroup");
				if (o) {
					let e = Array.from(n.querySelectorAll(":scope > colgroup > col")).filter((e, t) => a.has(t));
					o.replaceChildren(...e);
				}
				let s = n.querySelectorAll(":scope > tr");
				if (s.length > 0) {
					let e = B().createElement("tbody");
					for (let t of s) e.appendChild(t);
					n.append(e);
				}
				return n;
			},
			element: !ih(n) && V(n) ? n.querySelector("table") : n
		};
	}
	canBeEmpty() {
		return !1;
	}
	isShadowRoot() {
		return !0;
	}
	getCordsFromCellNode(e, t) {
		let { rows: n, domRows: r } = t;
		for (let t = 0; t < n; t++) {
			let n = r[t];
			if (n != null) for (let r = 0; r < n.length; r++) {
				let i = n[r];
				if (i == null) continue;
				let { elem: a } = i, o = Rh(this, a);
				if (o !== null && e.is(o)) return {
					x: r,
					y: t
				};
			}
		}
		throw Error("Cell not found in table.");
	}
	getDOMCellFromCords(e, t, n) {
		let { domRows: r } = n, i = r[t];
		return i == null ? null : i[e < i.length ? e : i.length - 1] ?? null;
	}
	getDOMCellFromCordsOrThrow(e, t, n) {
		let r = this.getDOMCellFromCords(e, t, n);
		if (!r) throw Error("Cell not found at cords.");
		return r;
	}
	getCellNodeFromCords(e, t, n) {
		let r = this.getDOMCellFromCords(e, t, n);
		if (r == null) return null;
		let i = Ko(r.elem);
		return X(i) ? i : null;
	}
	getCellNodeFromCordsOrThrow(e, t, n) {
		let r = this.getCellNodeFromCords(e, t, n);
		if (!r) throw Error("Node at cords not TableCellNode.");
		return r;
	}
	getRowStriping() {
		return !!this.getLatest().__rowStriping;
	}
	setRowStriping(e) {
		let t = this.getWritable();
		return t.__rowStriping = e, t;
	}
	setFrozenColumns(e) {
		let t = this.getWritable();
		return t.__frozenColumnCount = e, t;
	}
	getFrozenColumns() {
		return this.getLatest().__frozenColumnCount;
	}
	setFrozenRows(e) {
		let t = this.getWritable();
		return t.__frozenRowCount = e, t;
	}
	getFrozenRows() {
		return this.getLatest().__frozenRowCount;
	}
	canSelectBefore() {
		return !0;
	}
	canIndent() {
		return !1;
	}
	getColumnCount() {
		let e = this.getFirstChild();
		if (!wm(e)) return 0;
		let t = 0;
		return e.getChildren().forEach((e) => {
			X(e) && (t += e.getColSpan());
		}), t;
	}
};
function Gh(e, t) {
	let n = e.getElementByKey(t.getKey());
	return n === null && Z(230), vh(t, n);
}
function Kh(e) {
	let t = qh();
	e.hasAttribute("data-lexical-row-striping") && t.setRowStriping(!0), e.hasAttribute("data-lexical-frozen-column") && t.setFrozenColumns(1), e.hasAttribute("data-lexical-frozen-row") && t.setFrozenRows(1);
	let n = e.querySelector(":scope > colgroup");
	if (n) {
		let e = [];
		for (let t of n.querySelectorAll(":scope > col")) {
			let n = t.style.width || "";
			if (!mm.test(n) && (n = t.getAttribute("width") || "", !/^\d+$/.test(n))) {
				e = void 0;
				break;
			}
			e.push(parseFloat(n));
		}
		e && t.setColWidths(e);
	}
	return {
		after: (e) => Mu(e, wm),
		node: t
	};
}
function qh() {
	return js(new Wh());
}
function Jh(e) {
	return e instanceof Wh;
}
function Yh(e) {
	wm(e.getParent()) ? e.isEmpty() && e.append(I()) : e.remove();
}
function Xh(e) {
	Jh(e.getParent()) ? Au(e, X) : e.remove();
}
function Zh(e) {
	Au(e, wm);
	let [t] = Bm(e, null, null), n = t.reduce((e, t) => Math.max(e, t.length), 0), r = e.getChildren();
	for (let e = 0; e < t.length; ++e) {
		let i = r[e];
		if (!i) continue;
		wm(i) || Z(254, i.constructor.name, i.getType());
		let a = t[e].reduce((e, t) => t ? 1 + e : e, 0);
		if (a !== n) for (let e = a; e < n; ++e) {
			let e = ym();
			e.append(I()), i.append(e);
		}
	}
	let i = e.getColWidths(), a = e.getColumnCount();
	if (i && i.length !== a) {
		let t;
		if (a < i.length) t = i.slice(0, a);
		else if (i.length > 0) {
			let e = i[i.length - 1];
			t = [...i, ...Array(a - i.length).fill(e)];
		}
		e.setColWidths(t);
	}
}
function Qh(e) {
	if (e.detail < 3 || !$s(e.target)) return !1;
	let t = Ko(e.target);
	if (t === null) return !1;
	let n = W(t, (e) => P(e) && !e.isInline());
	return n !== null && !!X(n.getParent()) && (n.select(0), !0);
}
function $h() {
	let e = N();
	if (!j(e)) return !1;
	let t = jh(e.anchor.getNode());
	if (t === null) return !1;
	let n = Yo();
	if (!n.is(t.getParent()) || n.getChildrenSize() !== 1) return !1;
	let [r] = Bm(t, null, null);
	if (r.length === 0 || r[0].length === 0) return !1;
	let i = r[0][0];
	if (!i || !i.cell) return !1;
	let a = r[r.length - 1], o = a[a.length - 1];
	return !o || !o.cell ? !1 : (Xo(Ym(t, i.cell, o.cell)), !0);
}
function eg(e) {
	return e.registerNodeTransform(gm, (e) => {
		if (e.getColSpan() > 1 || e.getRowSpan() > 1) {
			let [, , t] = Vm(e), [n] = zm(t, e, e), r = n.length, i = n[0].length, a = t.getFirstChild();
			wm(a) || Z(175);
			let o = [];
			for (let e = 0; e < r; e++) {
				e !== 0 && (a = a.getNextSibling(), wm(a) || Z(175));
				let t = null;
				for (let r = 0; r < i; r++) {
					let i = n[e][r], s = i.cell;
					if (i.startRow === e && i.startColumn === r) t = s, o.push(s);
					else if (s.getColSpan() > 1 || s.getRowSpan() > 1) {
						X(s) || Z(176);
						let e = ym(s.__headerState);
						t === null ? ku(a, e) : t.insertAfter(e);
					}
				}
			}
			for (let e of o) e.setColSpan(1), e.setRowSpan(1);
		}
	});
}
function tg(e, t = !0) {
	let n = new Qm(), r = (r, i, a) => {
		let o = ah(r, a), s = fh(r, o, e, t, n);
		n.observers.set(i, [s, o]);
	};
	return Xl(dh(e, n), e.registerCommand(dn, () => ph(n, e), 3), e.registerMutationListener(Wh, (t) => {
		e.read("latest", () => {
			for (let [e, i] of t) {
				let t = n.observers.get(e);
				if (i === "created" || i === "updated") {
					let { tableNode: i, tableElement: a } = Zm(e);
					t === void 0 ? r(i, e, a) : a !== t[1] && (n.removeObserver(e), r(i, e, a));
				} else i === "destroyed" && n.removeObserver(e);
			}
		});
	}, { skipInitialization: !1 }), () => {
		n.removeAllObservers();
	});
}
function ng(e, t) {
	e.hasNodes([Wh]) || Z(255);
	let { hasNestedTables: n = qu(!1) } = t ?? {};
	return Xl(e.registerCommand(bm, (e) => function({ rows: e, columns: t, includeHeaders: n }, r) {
		let i = N() || Zi();
		if (!i || !j(i) || !r && jh(i.anchor.getNode())) return !1;
		let a = Tm(Number(e), Number(t), n);
		Tu(a);
		let o = a.getFirstDescendant();
		return A(o) && o.select(), !0;
	}(e, n.peek()), 0), e.registerCommand(fn, (t, r) => e === r && function(e, t) {
		let { nodes: n, selection: r } = e;
		if (!n.some((e) => Jh(e) || vu(e).some((e) => Jh(e.node)))) {
			if (qm(r)) {
				let e = "", t = !1;
				for (let r of n) {
					let n = P(r) && !r.isInline();
					e.length > 0 && (n || t) && (e += "\n"), e += r.getTextContent(), t = n;
				}
				return r.insertRawText(e), !0;
			}
			return !1;
		}
		let i = qm(r), a = j(r);
		return a && W(r.anchor.getNode(), (e) => X(e)) !== null && W(r.focus.getNode(), (e) => X(e)) !== null || i ? n.length === 1 && Jh(n[0]) ? Wm(n[0], r) : !(a && t.peek() && !function(e) {
			return !!(qm(e) && !e.focus.getNode().is(e.anchor.getNode()) || j(e) && X(e.anchor.getNode()) && !e.anchor.getNode().is(e.focus.getNode()));
		}(r)) : !1;
	}(t, n), 0), e.registerCommand($n, $h, 1), e.registerCommand(pn, Qh, 0), e.registerNodeTransform(Wh, Zh), e.registerNodeTransform(xm, Xh), e.registerNodeTransform(gm, Yh));
}
If.tag("table"), If.tag("tr"), If.tag("td", "th");
//#endregion
//#region node_modules/@lexical/list/dist/LexicalList.prod.mjs
function rg(e, ...t) {
	let n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
	r.append("code", e);
	for (let e of t) r.append("v", e);
	throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function ig(e) {
	let t = 1, n = e.getParent();
	for (; n != null;) {
		if (Q(n)) {
			let e = n.getParent();
			if ($(e)) {
				t++, n = e.getParent();
				continue;
			}
			rg(40);
		}
		return t;
	}
	return t;
}
function ag(e) {
	let t = e.getParent();
	$(t) || rg(40);
	let n = t, r = t;
	for (; r !== null;) r = r.getParent(), $(r) && (n = r);
	return n;
}
function og(e) {
	let t = [], n = e.getChildren().filter(Q);
	for (let e = 0; e < n.length; e++) {
		let r = n[e], i = r.getFirstChild();
		$(i) ? t = t.concat(og(i)) : t.push(r);
	}
	return t;
}
function sg(e) {
	return Q(e) && $(e.getFirstChild());
}
function cg(e, t) {
	return Q(e) && (t.length === 0 || t.length === 1 && e.is(t[0]) && e.getChildrenSize() === 0);
}
function lg(e) {
	let t = N();
	if (t !== null) {
		let n = t.getNodes();
		if (j(t)) {
			let [r] = t.getStartEndPoints(), i = r.getNode(), a = i.getParent();
			if (ks(i)) {
				let e = i.getFirstChild();
				if (e) n = e.selectStart().getNodes();
				else {
					let e = I();
					i.append(e), n = e.select().getNodes();
				}
			} else if (cg(i, n)) {
				let t = Dg(e);
				if (ks(a)) {
					i.replace(t);
					let e = Sg();
					P(i) && (e.setFormat(i.getFormatType()), e.setIndent(i.getIndent())), t.append(e);
				} else if (Q(i)) {
					let e = i.getParentOrThrow();
					ug(t, e.getChildren()), e.replace(t);
				}
				return;
			}
		}
		let r = /* @__PURE__ */ new Set();
		for (let t = 0; t < n.length; t++) {
			let i = n[t];
			if (P(i) && i.isEmpty() && !Q(i) && !r.has(i.getKey())) {
				dg(i, e);
				continue;
			}
			let a = Lo(i) ? i.getParent() : Q(i) && i.isEmpty() ? i : null;
			for (; a != null;) {
				let t = a.getKey();
				if ($(a)) {
					if (!r.has(t)) {
						let n = Dg(e);
						ug(n, a.getChildren()), a.replace(n), r.add(t);
					}
					break;
				}
				{
					let n = a.getParent();
					if (ks(n) && !r.has(t)) {
						r.add(t), dg(a, e);
						break;
					}
					a = n;
				}
			}
		}
	}
}
function ug(e, t) {
	e.splice(e.getChildrenSize(), 0, t);
}
function dg(e, t) {
	if ($(e)) return e;
	let n = e.getPreviousSibling(), r = e.getNextSibling(), i = Sg(), a;
	if (ug(i, e.getChildren()), $(n) && t === n.getListType()) n.append(i), $(r) && t === r.getListType() && (ug(n, r.getChildren()), r.remove()), a = n;
	else if ($(r) && t === r.getListType()) r.getFirstChildOrThrow().insertBefore(i), a = r;
	else {
		let n = Dg(t);
		n.append(i), e.replace(n), a = n;
	}
	i.setFormat(e.getFormatType()), i.setIndent(e.getIndent());
	let o = N();
	return j(o) && (a.getKey() === o.anchor.key && o.anchor.set(i.getKey(), o.anchor.offset, "element"), a.getKey() === o.focus.key && o.focus.set(i.getKey(), o.focus.offset, "element")), e.remove(), a;
}
function fg(e, t) {
	let n = e.getLastChild(), r = t.getFirstChild();
	n && r && sg(n) && sg(r) && (fg(n.getFirstChild(), r.getFirstChild()), r.remove());
	let i = t.getChildren();
	i.length > 0 && e.append(...i), t.remove();
}
function pg() {
	let e = N();
	if (j(e)) {
		let t = /* @__PURE__ */ new Set(), n = e.getNodes(), r = e.anchor.getNode();
		if (cg(r, n)) t.add(ag(r));
		else for (let e = 0; e < n.length; e++) {
			let r = n[e];
			if (Lo(r)) {
				let e = Cu(r, vg);
				e != null && t.add(ag(e));
			}
		}
		for (let n of t) {
			let t = n, r = og(n);
			for (let n of r) {
				let r = I().setTextStyle(e.style).setTextFormat(e.format);
				ug(r, n.getChildren()), t.insertAfter(r), t = r, n.__key === e.anchor.key && Ol(e.anchor, Il(pl(r, "next"))), n.__key === e.focus.key && Ol(e.focus, Il(pl(r, "next"))), n.remove();
			}
			n.remove();
		}
	}
}
function mg(e) {
	let t = e.getListType() !== "check", n = e.getStart();
	for (let r of e.getChildren()) Q(r) && (r.getValue() !== n && r.setValue(n), t && r.getLatest().__checked != null && r.setChecked(void 0), $(r.getFirstChild()) || n++);
}
function hg(e) {
	let t = /* @__PURE__ */ new Set();
	if (sg(e) || t.has(e.getKey())) return;
	let n = e.getParent(), r = e.getNextSibling(), i = e.getPreviousSibling();
	if (sg(r) && sg(i)) {
		let n = i.getFirstChild();
		if ($(n)) {
			n.append(e);
			let i = r.getFirstChild();
			$(i) && (ug(n, i.getChildren()), r.remove(), t.add(r.getKey()));
		}
	} else if (sg(r)) {
		let t = r.getFirstChild();
		if ($(t)) {
			let n = t.getFirstChild();
			n !== null && n.insertBefore(e);
		}
	} else if (sg(i)) {
		let t = i.getFirstChild();
		$(t) && t.append(e);
	} else if ($(n)) {
		let t = As(e), a = As(n);
		t.append(a), a.append(e), i ? i.insertAfter(t) : r ? r.insertBefore(t) : n.append(t);
	}
}
function gg(e) {
	if (sg(e)) return;
	let t = e.getParent(), n = t ? t.getParent() : void 0;
	if ($(n ? n.getParent() : void 0) && Q(n) && $(t)) {
		let r = t ? t.getFirstChild() : void 0, i = t ? t.getLastChild() : void 0;
		if (e.is(r)) n.insertBefore(e), t.isEmpty() && n.remove();
		else if (e.is(i)) n.insertAfter(e), t.isEmpty() && n.remove();
		else {
			let r = As(e), i = As(t);
			r.append(i), e.getPreviousSiblings().forEach((e) => i.append(e));
			let a = As(e), o = As(t);
			a.append(o), ug(o, e.getNextSiblings()), n.insertBefore(r), n.insertAfter(a), n.replace(e);
		}
	}
}
function _g(e = !1) {
	let t = N();
	if (!j(t) || !t.isCollapsed()) return !1;
	let n = t.anchor.getNode(), r = null;
	if (Q(n) && n.getChildrenSize() === 0) r = n;
	else if (A(n)) {
		let e = n.getParent();
		Q(e) && e.getChildren().every((e) => A(e) && e.getTextContent().trim() === "") && (r = e);
	}
	if (r === null) return !1;
	let i = ag(r), a = r.getParent();
	$(a) || rg(40);
	let o = a.getParent(), s;
	if (ks(o)) s = I(), i.insertAfter(s);
	else {
		if (!Q(o)) return !1;
		s = As(o), o.insertAfter(s);
	}
	s.setTextStyle(t.style).setTextFormat(t.format).select();
	let c = r.getNextSiblings();
	if (c.length > 0) {
		let t = e ? function(e, t) {
			return e.getStart() + t.getIndexWithinParent();
		}(a, r) : 1, n = As(a).setStart(t);
		if (Q(s)) {
			let e = As(s);
			e.append(n), s.insertAfter(e);
		} else s.insertAfter(n);
		n.append(...c);
	}
	return function(e) {
		let t = e;
		for (; t.getNextSibling() == null && t.getPreviousSibling() == null;) {
			let e = t.getParent();
			if (e == null || !Q(e) && !$(e)) break;
			t = e;
		}
		t.remove();
	}(r), !0;
}
var vg = class extends Ga {
	__value;
	__checked;
	$config() {
		return this.config("listitem", {
			$transform: (e) => {
				let t = e.getParent();
				if ($(t)) t.getListType() !== "check" && e.getChecked() != null && e.setChecked(void 0);
				else if (t) {
					let n = e.createParentElementNode();
					$(n) || rg(340);
					let r = [e];
					for (let t of ["previous", "next"]) {
						r.reverse();
						for (let { origin: n } of G(e, t)) {
							if (!Q(n)) break;
							r.push(n);
						}
					}
					e.insertBefore(n), n.splice(0, 0, r), ks(t) || (Ul(n, Ml(G(n, "next")), {
						$shouldSplit: () => !1,
						removeEmptyDestination: !0
					}), t.isEmpty() && t.isAttached() && t.remove());
				}
			},
			extends: Ga,
			importDOM: Rr({ li: () => ({
				conversion: yg,
				priority: 0
			}) })
		});
	}
	constructor(e = 1, t = void 0, n) {
		super(n), this.__value = e === void 0 ? 1 : e, this.__checked = t;
	}
	afterCloneFrom(e) {
		super.afterCloneFrom(e), this.__value = e.__value, this.__checked = e.__checked;
	}
	createDOM(e) {
		let t = B().createElement("li");
		return this.updateListItemDOM(null, t, e), t;
	}
	updateListItemDOM(e, t, n) {
		(function(e, t) {
			let n = t.getParent();
			!$(n) || n.getListType() !== "check" || $(t.getFirstChild()) ? (e.removeAttribute("role"), e.removeAttribute("tabIndex"), e.removeAttribute("aria-checked")) : (e.setAttribute("role", "checkbox"), e.setAttribute("tabIndex", "-1"), e.setAttribute("aria-checked", t.getChecked() ? "true" : "false"));
		})(t, this), t.value = this.__value, function(e, t, n) {
			let r = t.list;
			if (!r) return;
			let i = r.listitem, a = r.nested && r.nested.listitem, o = n.getParent(), s = $(o) && o.getListType() === "check", c = n.getChecked(), l = n.getChildren().some((e) => $(e)), u = [];
			r.listitemChecked !== void 0 && u.push(r.listitemChecked), r.listitemUnchecked !== void 0 && u.push(r.listitemUnchecked), a !== void 0 && u.push(...ql(a)), u.length > 0 && Yl(e, ...u);
			let d = [];
			if (i !== void 0 && d.push(...ql(i)), s) {
				let e = c ? r.listitemChecked : r.listitemUnchecked;
				e !== void 0 && d.push(e);
			}
			a !== void 0 && l && d.push(...ql(a)), d.length > 0 && Jl(e, ...d);
		}(t, n.theme, this);
		let r = e ? e.__style : "", i = this.__style;
		r !== i && Zr(t.style, i, r), function(e, t, n) {
			let r = t.__textStyle, i = n ? n.__textStyle : "";
			if (n !== null && i === r) return;
			let a = Yr(r);
			for (let t in a) e.style.setProperty(`--listitem-marker-${t}`, a[t]);
			if (i !== "") for (let t in Yr(i)) t in a || e.style.removeProperty(`--listitem-marker-${t}`);
		}(t, this, e);
	}
	updateDOM(e, t, n) {
		let r = t;
		return this.updateListItemDOM(e, r, n), !1;
	}
	updateFromJSON(e) {
		return super.updateFromJSON(e).setValue(e.value).setChecked(e.checked);
	}
	exportDOM(e) {
		let t = this.createDOM(e._config), n = this.getFormatType();
		n && (t.style.textAlign = n);
		let r = this.getDirection();
		return r && (t.dir = r), sg(this) ? {
			after(e) {
				if (V(e)) {
					let t = e.previousElementSibling;
					if (V(t) && t.nodeName === "LI") {
						for (; e.firstChild;) t.append(e.firstChild);
						e.remove();
					}
				}
				return e;
			},
			element: t
		} : { element: t };
	}
	exportJSON() {
		return {
			...super.exportJSON(),
			checked: this.getChecked(),
			value: this.getValue()
		};
	}
	append(...e) {
		for (let t = 0; t < e.length; t++) {
			let n = e[t];
			if (P(n) && this.canMergeWith(n)) {
				let e = n.getChildren();
				this.append(...e), n.remove();
			} else super.append(n);
		}
		return this;
	}
	replace(e, t) {
		if (Q(e)) return super.replace(e);
		this.setIndent(0);
		let n = this.getParentOrThrow();
		if (!$(n)) return e;
		if (n.__first === this.getKey()) n.insertBefore(e);
		else if (n.__last === this.getKey()) n.insertAfter(e);
		else {
			let t = As(n), r = this.getNextSibling();
			for (; r;) {
				let e = r;
				r = r.getNextSibling(), t.append(e);
			}
			n.insertAfter(e), e.insertAfter(t);
		}
		let r = this.__key, i = 0;
		if (t && (P(e) || rg(139), i = e.getChildrenSize(), e.splice(i, 0, this.getChildren())), t && P(e)) {
			let t = N();
			if (j(t)) for (let n of t.getStartEndPoints()) n.key === r && n.type === "element" && n.set(e.getKey(), i + n.offset, "element");
		}
		return this.remove(), n.getChildrenSize() === 0 && n.remove(), e;
	}
	insertAfter(e, t = !0) {
		let n = this.getParentOrThrow();
		if ($(n) || rg(39), Q(e)) return super.insertAfter(e, t);
		let r = this.getNextSiblings();
		if (n.insertAfter(e, t), r.length !== 0) {
			let i = As(n);
			r.forEach((e) => i.append(e)), e.insertAfter(i, t);
		}
		return e;
	}
	remove(e) {
		let t = this.getPreviousSibling(), n = this.getNextSibling();
		super.remove(e), t && n && sg(t) && sg(n) && (fg(t.getFirstChild(), n.getFirstChild()), n.remove());
	}
	resetOnCopyNodeFrom(e) {
		super.resetOnCopyNodeFrom(e), e.getChecked() && this.setChecked(!1);
	}
	insertNewAfter(e, t = !0) {
		let n = As(this);
		return this.insertAfter(n, t), n;
	}
	collapseAtStart(e) {
		if (sg(this)) return !1;
		let t = this.getParentOrThrow();
		if (Q(t.getParentOrThrow())) return gg(this), !0;
		let n = I().append(...this.getChildren()), r = this.getNextSiblings();
		if (r.length > 0) {
			let e = As(t);
			e.append(...r), t.insertAfter(e);
		}
		return t.insertAfter(n), this.remove(), t.getChildrenSize() === 0 && t.remove(), n.selectStart(), !0;
	}
	getValue() {
		return this.getLatest().__value;
	}
	setValue(e) {
		let t = this.getWritable();
		return t.__value = e, t;
	}
	getChecked() {
		let e = this.getLatest(), t, n = this.getParent();
		return $(n) && (t = n.getListType()), t === "check" ? !!e.__checked : void 0;
	}
	setChecked(e) {
		let t = this.getWritable();
		return t.__checked = e, t;
	}
	toggleChecked() {
		let e = this.getWritable();
		return e.setChecked(!e.__checked);
	}
	getIndent() {
		let e = this.getParent();
		if (e === null || !this.isAttached()) return this.getLatest().__indent;
		let t = e.getParentOrThrow(), n = 0;
		for (; Q(t);) t = t.getParentOrThrow().getParentOrThrow(), n++;
		return n;
	}
	setIndent(e) {
		typeof e != "number" && rg(117), (e = Math.floor(e)) >= 0 || rg(199);
		let t = this.getIndent();
		for (; t !== e;) t < e ? (hg(this), t++) : (gg(this), t--);
		return this;
	}
	canInsertAfter(e) {
		return Q(e);
	}
	canReplaceWith(e) {
		return Q(e);
	}
	canMergeWith(e) {
		return Q(e) || fo(e);
	}
	extractWithChild(e, t) {
		if (!j(t)) return !1;
		let n = t.anchor.getNode(), r = t.focus.getNode();
		return this.isParentOf(n) && this.isParentOf(r) && this.getTextContent().length === t.getTextContent().length;
	}
	isParentRequired() {
		return !0;
	}
	createParentElementNode() {
		return Dg("bullet");
	}
	canMergeWhenEmpty() {
		return !0;
	}
};
function yg(e) {
	if (e.classList.contains("task-list-item")) {
		for (let t of e.children) if (t.tagName === "INPUT") return bg(t);
	}
	if (e.classList.contains("joplin-checkbox")) {
		for (let t of e.children) if (t.classList.contains("checkbox-wrapper") && t.children.length > 0 && t.children[0].tagName === "INPUT") return bg(t.children[0]);
	}
	let t = e.getAttribute("aria-checked"), n = Sg(t === "true" || t !== "false" && void 0);
	return gc(n, e), {
		after: xg.bind(null, n),
		node: hc(n, e)
	};
}
function bg(e) {
	if (e.getAttribute("type") !== "checkbox") return { node: null };
	let t = Sg(e.hasAttribute("checked"));
	return {
		after: xg.bind(null, t),
		node: t
	};
}
function xg(e, t) {
	let n = t[0];
	return t.length === 1 && fo(n) && !e.getFormatType() && n.getFormatType() ? (e.setFormat(n.getFormatType()), n.getChildren()) : t;
}
function Sg(e) {
	return js(new vg(void 0, e));
}
function Q(e) {
	return e instanceof vg;
}
var Cg = class extends Ga {
	__tag;
	__start;
	__listType;
	$config() {
		return this.config("list", {
			$transform: (e) => {
				(function(e) {
					let t = e.getNextSibling();
					$(t) && e.getListType() === t.getListType() && fg(e, t);
				})(e), mg(e);
			},
			extends: Ga,
			importDOM: Rr({
				ol: () => ({
					conversion: Tg,
					priority: 0
				}),
				ul: () => ({
					conversion: Tg,
					priority: 0
				})
			})
		});
	}
	constructor(e = "number", t = 1, n) {
		super(n);
		let r = Eg[e] || e;
		this.__listType = r, this.__tag = r === "number" ? "ol" : "ul", this.__start = t;
	}
	afterCloneFrom(e) {
		super.afterCloneFrom(e), this.__listType = e.__listType, this.__tag = e.__tag, this.__start = e.__start;
	}
	getTag() {
		return this.getLatest().__tag;
	}
	setListType(e) {
		let t = this.getWritable();
		return t.__listType = e, t.__tag = e === "number" ? "ol" : "ul", t;
	}
	getListType() {
		return this.getLatest().__listType;
	}
	getStart() {
		return this.getLatest().__start;
	}
	setStart(e) {
		let t = this.getWritable();
		return t.__start = e, t;
	}
	createDOM(e, t) {
		let n = this.__tag, r = B().createElement(n);
		return this.__start !== 1 && r.setAttribute("start", String(this.__start)), r.__lexicalListType = this.__listType, wg(r, e.theme, this), r;
	}
	updateDOM(e, t, n) {
		return e.__tag !== this.__tag || e.__listType !== this.__listType || (wg(t, n.theme, this), e.__start !== this.__start && t.setAttribute("start", String(this.__start)), !1);
	}
	updateFromJSON(e) {
		return super.updateFromJSON(e).setListType(e.listType).setStart(e.start);
	}
	exportDOM(e) {
		let t = this.createDOM(e._config, e);
		return V(t) && (this.__start !== 1 && t.setAttribute("start", String(this.__start)), this.__listType === "check" && t.setAttribute("__lexicalListType", "check")), { element: t };
	}
	exportJSON() {
		return {
			...super.exportJSON(),
			listType: this.getListType(),
			start: this.getStart(),
			tag: this.getTag()
		};
	}
	canBeEmpty() {
		return !1;
	}
	canIndent() {
		return !1;
	}
	splice(e, t, n) {
		let r = n;
		for (let e = 0; e < n.length; e++) {
			let t = n[e];
			Q(t) || (r === n && (r = [...n]), r[e] = this.createListItemNode().append(!P(t) || $(t) || t.isInline() ? t : mi(t.getTextContent())));
		}
		return super.splice(e, t, r);
	}
	extractWithChild(e) {
		return Q(e);
	}
	createListItemNode() {
		return Sg();
	}
};
function wg(e, t, n) {
	let r = [], i = [], a = t.list;
	if (a !== void 0) {
		let e = a[`${n.__tag}Depth`] || [], t = ig(n) - 1, o = t % e.length, s = e[o], c = a[n.__tag], l, u = a.nested, d = a.checklist;
		if (u !== void 0 && u.list && (l = u.list), c !== void 0 && r.push(c), d !== void 0 && n.__listType === "check" && r.push(d), s !== void 0) {
			r.push(...ql(s));
			for (let t = 0; t < e.length; t++) t !== o && i.push(n.__tag + t);
		}
		if (l !== void 0) {
			let e = ql(l);
			t > 1 ? r.push(...e) : i.push(...e);
		}
	}
	i.length > 0 && Yl(e, ...i), r.length > 0 && Jl(e, ...r);
}
function Tg(e) {
	let t;
	if (function(e) {
		return V(e) && e.nodeName.toLowerCase() === "ol";
	}(e)) {
		let n = e.start;
		t = Dg("number", n);
	} else t = function(e) {
		if (e.getAttribute("__lexicallisttype") === "check" || e.classList.contains("contains-task-list") || e.getAttribute("data-is-checklist") === "1") return !0;
		for (let t of e.childNodes) if (V(t) && t.hasAttribute("aria-checked")) return !0;
		return !1;
	}(e) ? Dg("check") : Dg("bullet");
	return hc(t, e), {
		after: (e) => function(e, t) {
			let n = t.createListItemNode.bind(t), r = [];
			for (let t = 0; t < e.length; t++) {
				let i = e[t];
				if (Q(i)) {
					r.push(i);
					let e = i.getChildren();
					e.length > 1 && e.forEach((e) => {
						$(e) && r.push(n().append(e));
					});
				} else r.push(n().append(i));
			}
			return r;
		}(e, t),
		node: t
	};
}
var Eg = {
	ol: "number",
	ul: "bullet"
};
function Dg(e = "number", t = 1) {
	return js(new Cg(e, t));
}
function $(e) {
	return e instanceof Cg;
}
If.tag("ol", "ul"), If.tag("li"), If.tag("li").classAll("task-list-item"), If.tag("li").classAll("joplin-checkbox");
var Og = /* @__PURE__ */ k("UPDATE_LIST_START_COMMAND"), kg = /* @__PURE__ */ k("INSERT_UNORDERED_LIST_COMMAND"), Ag = /* @__PURE__ */ k("INSERT_ORDERED_LIST_COMMAND"), jg = /* @__PURE__ */ k("REMOVE_LIST_COMMAND");
function Mg(e, t) {
	return Xl(e.registerCommand(Ag, () => (lg("number"), !0), 1), e.registerCommand(Og, (e) => {
		let { listNodeKey: t, newStart: n } = e, r = R(t);
		return !!$(r) && (r.getListType() === "number" && (r.setStart(n), mg(r)), !0);
	}, 1), e.registerCommand(kg, () => (lg("bullet"), !0), 1), e.registerCommand(jg, () => (pg(), !0), 1), e.registerCommand(bn, () => _g(!!(t && t.restoreNumbering)), 1), e.registerCommand(zn, (e) => {
		if (function() {
			let e = N();
			if (!j(e) || !e.isCollapsed() || e.anchor.offset !== 0) return !1;
			let t = e.anchor.getNode(), n = W(t, Q);
			if (!Q(n)) return !1;
			let r = n.getFirstDescendant();
			if (r === null || !n.is(t) && !r.is(t)) return !1;
			let i = n.getParent();
			if (!$(i) || !n.is(i.getFirstChild())) return !1;
			let a = i.getPreviousSibling();
			if (!F(a) || a.isIsolated() || !a.isKeyboardSelectable() && a.isInline()) return !1;
			let o = I().append(...n.getChildren());
			return i.insertBefore(o), n.remove(), i.isEmpty() && i.remove(), o.selectStart(), !0;
		}()) return e.preventDefault(), !0;
		let t = N();
		if (!j(t) || !t.isCollapsed()) return !1;
		let { anchor: n } = t;
		if (n.offset !== 0) return !1;
		let r = n.getNode();
		for (; !Q(r);) {
			if (r.getPreviousSibling() !== null) return !1;
			let e = r.getParent();
			if (e === null) return !1;
			r = e;
		}
		return !(!Q(r) || !r.collapseAtStart(t)) && (e.preventDefault(), !0);
	}, -8), e.registerNodeTransform(vg, (e) => {
		let t = e.getFirstChild();
		if (t) {
			if (A(t)) {
				let n = t.getStyle(), r = t.getFormat();
				e.getTextStyle() !== n && e.setTextStyle(n), e.getTextFormat() !== r && e.setTextFormat(r);
			}
		} else {
			let t = N();
			j(t) && (t.style !== e.getTextStyle() || t.format !== e.getTextFormat()) && t.isCollapsed() && e.is(t.anchor.getNode()) && e.setTextStyle(t.style).setTextFormat(t.format);
		}
	}), e.registerNodeTransform(ai, (e) => {
		let t = e.getParent();
		if (Q(t) && e.is(t.getFirstChild())) {
			let n = e.getStyle(), r = e.getFormat();
			n === t.getTextStyle() && r === t.getTextFormat() || t.setTextStyle(n).setTextFormat(r);
		}
	}));
}
function Ng(e) {
	let t = (e) => {
		let t = e.getParent();
		if ($(e.getFirstChild()) || !$(t)) return;
		let n = W(e, (e) => Q(e) && $(e.getParent()) && Q(e.getPreviousSibling()));
		if (n === null && e.getIndent() > 0) e.setIndent(0);
		else if (Q(n)) {
			let r = n.getPreviousSibling();
			if (Q(r)) {
				let n = function(e) {
					let t = e, n = t.getFirstChild();
					for (; $(n);) {
						let e = n.getLastChild();
						if (!Q(e)) break;
						t = e, n = t.getFirstChild();
					}
					return t;
				}(r).getParent();
				if ($(n)) {
					let r = ig(n);
					r + 1 < ig(t) && e.setIndent(r);
				}
			}
		}
	};
	return e.registerNodeTransform(Cg, (e) => {
		let n = [e];
		for (; n.length > 0;) {
			let e = n.shift();
			if ($(e)) {
				for (let r of e.getChildren()) if (Q(r)) {
					t(r);
					let e = r.getFirstChild();
					$(e) && n.push(e);
				}
			}
		}
	});
}
//#endregion
//#region src/plugins/ToolbarPlugin.tsx
var Pg = 1, Fg = [
	"undo",
	"redo",
	"block_type",
	"bold",
	"italic",
	"underline",
	"strikethrough",
	"quote",
	"bullet_list",
	"numbered_list",
	"table"
];
function Ig() {
	return /* @__PURE__ */ (0, J.jsx)("div", { className: "divider" });
}
function Lg({ tools: e }) {
	let [t] = b(), n = (0, _.useRef)(null), r = (0, _.useMemo)(() => new Set(e), [e]), [i, a] = (0, _.useState)(!1), [o, s] = (0, _.useState)(!1), [c, l] = (0, _.useState)(!1), [u, d] = (0, _.useState)(!1), [f, p] = (0, _.useState)(!1), [m, h] = (0, _.useState)(!1), [g, v] = (0, _.useState)("paragraph"), [y, x] = (0, _.useState)(!1), [S, C] = (0, _.useState)(0), [w, ee] = (0, _.useState)(0), [te, ne] = (0, _.useState)(!1), [re, ie] = (0, _.useState)(!1), [ae, oe] = (0, _.useState)(!1), se = (0, _.useCallback)(() => {
		let e = N();
		if (j(e)) {
			l(e.hasFormat("bold")), d(e.hasFormat("italic")), p(e.hasFormat("underline")), h(e.hasFormat("strikethrough"));
			let n = e.anchor.getNode(), r = n.getKey() === "root" ? n : n.getTopLevelElement();
			if (r !== null) {
				let e = r.getKey(), n = t.getElementByKey(e);
				n !== null && (n.tagName === "P" ? v("paragraph") : n.tagName.match(/^H[1-6]$/) && v(n.tagName.toLowerCase())), ne(r.getType() === "quote");
				let i = r.getParent();
				$(r) ? (ie(r.getListType() === "bullet"), oe(r.getListType() === "number")) : $(i) && i !== null ? (ie(i.getListType() === "bullet"), oe(i.getListType() === "number")) : (ie(!1), oe(!1));
			}
		}
	}, [t]), ce = (0, _.useCallback)((e) => {
		t.update(() => {
			let t = N();
			j(t) && uu(t, () => e.target.value === "paragraph" ? I() : Ap(e.target.value));
		});
	}, [t]);
	(0, _.useEffect)(() => Xl(t.registerUpdateListener(({ editorState: e }) => {
		e.read(() => {
			se();
		});
	}), t.registerCommand(dn, (e, t) => (se(), !1), Pg), t.registerCommand(rr, (e) => (a(e), !1), Pg), t.registerCommand(nr, (e) => (s(e), !1), Pg), t.registerCommand(An, (e) => e.ctrlKey && e.shiftKey && e.key === "X" ? (e.preventDefault(), t.dispatchCommand(En, "strikethrough"), !0) : !1, 1)), [t, se]);
	let le = r.has("undo") || r.has("redo"), ue = r.has("block_type"), T = r.has("bold") || r.has("italic") || r.has("underline") || r.has("strikethrough"), E = r.has("quote") || r.has("bullet_list") || r.has("numbered_list"), de = r.has("table");
	return /* @__PURE__ */ (0, J.jsxs)("div", {
		className: "toolbar",
		ref: n,
		children: [
			le && /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [r.has("undo") && /* @__PURE__ */ (0, J.jsx)("button", {
				disabled: !i,
				onClick: () => {
					t.dispatchCommand(On, void 0);
				},
				className: "toolbar-item spaced",
				"aria-label": "Undo",
				children: /* @__PURE__ */ (0, J.jsx)("i", { className: "format undo" })
			}), r.has("redo") && /* @__PURE__ */ (0, J.jsx)("button", {
				disabled: !o,
				onClick: () => {
					t.dispatchCommand(kn, void 0);
				},
				className: "toolbar-item",
				"aria-label": "Redo",
				children: /* @__PURE__ */ (0, J.jsx)("i", { className: "format redo" })
			})] }),
			le && (ue || T || E || de) && /* @__PURE__ */ (0, J.jsx)(Ig, {}),
			ue && /* @__PURE__ */ (0, J.jsxs)("select", {
				"aria-label": "Block type",
				className: "toolbar-item block-controls",
				value: g,
				onChange: ce,
				children: [
					/* @__PURE__ */ (0, J.jsx)("option", {
						value: "paragraph",
						children: "Normal"
					}),
					/* @__PURE__ */ (0, J.jsx)("option", {
						value: "h1",
						children: "Heading 1"
					}),
					/* @__PURE__ */ (0, J.jsx)("option", {
						value: "h2",
						children: "Heading 2"
					}),
					/* @__PURE__ */ (0, J.jsx)("option", {
						value: "h3",
						children: "Heading 3"
					}),
					/* @__PURE__ */ (0, J.jsx)("option", {
						value: "h4",
						children: "Heading 4"
					}),
					/* @__PURE__ */ (0, J.jsx)("option", {
						value: "h5",
						children: "Heading 5"
					}),
					/* @__PURE__ */ (0, J.jsx)("option", {
						value: "h6",
						children: "Heading 6"
					})
				]
			}),
			ue && (T || E || de) && /* @__PURE__ */ (0, J.jsx)(Ig, {}),
			T && /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [
				r.has("bold") && /* @__PURE__ */ (0, J.jsx)("button", {
					onClick: () => {
						t.dispatchCommand(En, "bold");
					},
					className: "toolbar-item spaced " + (c ? "active" : ""),
					"aria-label": "Format Bold",
					children: /* @__PURE__ */ (0, J.jsx)("i", { className: "format bold" })
				}),
				r.has("italic") && /* @__PURE__ */ (0, J.jsx)("button", {
					onClick: () => {
						t.dispatchCommand(En, "italic");
					},
					className: "toolbar-item spaced " + (u ? "active" : ""),
					"aria-label": "Format Italics",
					children: /* @__PURE__ */ (0, J.jsx)("i", { className: "format italic" })
				}),
				r.has("underline") && /* @__PURE__ */ (0, J.jsx)("button", {
					onClick: () => {
						t.dispatchCommand(En, "underline");
					},
					className: "toolbar-item spaced " + (f ? "active" : ""),
					"aria-label": "Format Underline",
					children: /* @__PURE__ */ (0, J.jsx)("i", { className: "format underline" })
				}),
				r.has("strikethrough") && /* @__PURE__ */ (0, J.jsx)("button", {
					onClick: () => {
						t.dispatchCommand(En, "strikethrough");
					},
					className: "toolbar-item spaced " + (m ? "active" : ""),
					"aria-label": "Format Strikethrough (Ctrl+Shift+X)",
					children: /* @__PURE__ */ (0, J.jsx)("i", { className: "format strikethrough" })
				})
			] }),
			T && (E || de) && /* @__PURE__ */ (0, J.jsx)(Ig, {}),
			E && /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [
				r.has("quote") && /* @__PURE__ */ (0, J.jsx)("button", {
					onClick: () => {
						t.update(() => {
							let e = N();
							j(e) && uu(e, () => wp());
						});
					},
					className: "toolbar-item spaced " + (te ? "active" : ""),
					"aria-label": "Quote",
					children: /* @__PURE__ */ (0, J.jsx)("i", { className: "format quote" })
				}),
				r.has("bullet_list") && /* @__PURE__ */ (0, J.jsx)("button", {
					onClick: () => {
						t.dispatchCommand(kg, void 0);
					},
					className: "toolbar-item spaced " + (re ? "active" : ""),
					"aria-label": "Bullet List",
					children: /* @__PURE__ */ (0, J.jsx)("i", { className: "format list-ul" })
				}),
				r.has("numbered_list") && /* @__PURE__ */ (0, J.jsx)("button", {
					onClick: () => {
						t.dispatchCommand(Ag, void 0);
					},
					className: "toolbar-item spaced " + (ae ? "active" : ""),
					"aria-label": "Numbered List",
					children: /* @__PURE__ */ (0, J.jsx)("i", { className: "format list-ol" })
				})
			] }),
			E && de && /* @__PURE__ */ (0, J.jsx)(Ig, {}),
			de && /* @__PURE__ */ (0, J.jsxs)("div", {
				className: "table-button-container",
				children: [/* @__PURE__ */ (0, J.jsx)("button", {
					className: "toolbar-item spaced " + (y ? "active" : ""),
					onClick: () => x((e) => !e),
					"aria-label": "Insert Table",
					children: /* @__PURE__ */ (0, J.jsx)("i", { className: "format table" })
				}), y && /* @__PURE__ */ (0, J.jsxs)("div", {
					className: "table-insert-popover",
					onMouseLeave: () => {
						C(0), ee(0);
					},
					children: [/* @__PURE__ */ (0, J.jsx)("div", {
						className: "table-insert-grid",
						children: Array.from({ length: 10 }).map((e, n) => /* @__PURE__ */ (0, J.jsx)("div", {
							className: "table-insert-row",
							children: Array.from({ length: 10 }).map((e, r) => {
								let i = n + 1, a = r + 1;
								return /* @__PURE__ */ (0, J.jsx)("div", {
									className: "table-insert-cell" + (i <= S && a <= w ? " active" : ""),
									onMouseEnter: () => {
										C(i), ee(a);
									},
									onClick: () => {
										t.dispatchCommand(bm, {
											columns: String(a),
											rows: String(i),
											includeHeaders: {
												rows: !0,
												columns: !1
											}
										}), x(!1);
									},
									title: `${i} x ${a}`
								}, r);
							})
						}, n))
					}), /* @__PURE__ */ (0, J.jsx)("div", {
						className: "table-insert-footer",
						children: S > 0 && w > 0 ? `${S} x ${w}` : "Select size"
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/theme.ts
var Rg = {
	code: "editor-code",
	heading: {
		h1: "editor-heading-h1",
		h2: "editor-heading-h2",
		h3: "editor-heading-h3",
		h4: "editor-heading-h4",
		h5: "editor-heading-h5",
		h6: "editor-heading-h6"
	},
	image: "editor-image",
	list: {
		listitem: "editor-listitem",
		nested: { listitem: "editor-nested-listitem" },
		ol: "editor-list-ol",
		ul: "editor-list-ul"
	},
	ltr: "ltr",
	paragraph: "editor-paragraph",
	placeholder: "editor-placeholder",
	quote: "editor-quote",
	rtl: "rtl",
	table: "editor-table",
	tableCell: "editor-table-cell",
	tableCellHeader: "editor-table-cell-header",
	text: {
		bold: "editor-text-bold",
		code: "editor-text-code",
		hashtag: "editor-text-hashtag",
		italic: "editor-text-italic",
		overflowed: "editor-text-overflowed",
		strikethrough: "editor-text-strikethrough",
		underline: "editor-text-underline",
		underlineStrikethrough: "editor-text-underlineStrikethrough"
	}
};
//#endregion
//#region node_modules/@lexical/code-core/dist/LexicalCodeCore.prod.mjs
function zg(e, t) {
	let n = e;
	for (let r = G(e, t); r && (i_(r.origin) || vi(r.origin)); r = r.getAdjacentCaret()) n = r.origin;
	return n;
}
function Bg(e) {
	return zg(e, "previous");
}
function Vg(e, t) {
	for (let n of e.childNodes) if (V(n) && n.tagName === t || Vg(n, t)) return !0;
	return !1;
}
var Hg = "data-language", Ug = "data-highlight-language", Wg = "data-theme", Gg = class e extends Ga {
	__language;
	__theme;
	__isSyntaxHighlightSupported;
	static getType() {
		return "code";
	}
	static clone(t) {
		return new e(t.__language, t.__key);
	}
	constructor(e, t) {
		super(t), this.__language = e || void 0, this.__isSyntaxHighlightSupported = !1, this.__theme = void 0;
	}
	afterCloneFrom(e) {
		super.afterCloneFrom(e), this.__language = e.__language, this.__theme = e.__theme, this.__isSyntaxHighlightSupported = e.__isSyntaxHighlightSupported;
	}
	createDOM(e) {
		let t = B().createElement("code");
		Jl(t, e.theme.code), t.setAttribute("spellcheck", "false");
		let n = this.getLanguage();
		n && (t.setAttribute(Hg, n), this.getIsSyntaxHighlightSupported() && t.setAttribute(Ug, n));
		let r = this.getTheme();
		r && t.setAttribute(Wg, r);
		let i = this.getStyle();
		return i && Zr(t.style, i), t;
	}
	updateDOM(e, t, n) {
		let r = this.__language, i = e.__language;
		r ? r !== i && t.setAttribute(Hg, r) : i && t.removeAttribute(Hg);
		let a = this.__isSyntaxHighlightSupported;
		e.__isSyntaxHighlightSupported && i ? a && r ? r !== i && t.setAttribute(Ug, r) : t.removeAttribute(Ug) : a && r && t.setAttribute(Ug, r);
		let o = this.__theme, s = e.__theme;
		o ? o !== s && t.setAttribute(Wg, o) : s && t.removeAttribute(Wg);
		let c = this.__style, l = e.__style;
		return c !== l && Zr(t.style, c, l), !1;
	}
	exportDOM(e) {
		let t = B().createElement("pre");
		Jl(t, e._config.theme.code), t.setAttribute("spellcheck", "false");
		let n = this.getLanguage();
		n && (t.setAttribute(Hg, n), this.getIsSyntaxHighlightSupported() && t.setAttribute(Ug, n));
		let r = this.getTheme();
		r && t.setAttribute(Wg, r);
		let i = this.getStyle();
		return i && Zr(t.style, i), { element: t };
	}
	static importDOM() {
		return {
			code: (e) => e.textContent != null && (/\r?\n/.test(e.textContent) || Vg(e, "BR")) ? {
				conversion: Jg,
				priority: 1
			} : null,
			div: () => ({
				conversion: Yg,
				priority: 1
			}),
			pre: () => ({
				conversion: Jg,
				priority: 0
			}),
			table: (e) => $g(e) ? {
				conversion: Xg,
				priority: 3
			} : null,
			td: (e) => {
				let t = e, n = t.closest("table");
				return t.classList.contains("js-file-line") || n && $g(n) ? {
					conversion: Zg,
					priority: 3
				} : null;
			},
			tr: (e) => {
				let t = e.closest("table");
				return t && $g(t) ? {
					conversion: Zg,
					priority: 3
				} : null;
			}
		};
	}
	static importJSON(e) {
		return Kg().updateFromJSON(e);
	}
	updateFromJSON(e) {
		return super.updateFromJSON(e).setLanguage(e.language).setTheme(e.theme);
	}
	exportJSON() {
		return {
			...super.exportJSON(),
			language: this.getLanguage(),
			theme: this.getTheme()
		};
	}
	insertNewAfter(e, t = !0) {
		if (!jd(U(), "@lexical/code")) {
			let t = e_(e);
			if (t) return t;
		}
		let { anchor: n, focus: r } = e, i = (n.isBefore(r) ? n : r).getNode();
		if (A(i)) {
			let e = Bg(i), t = [];
			for (;;) if (vi(e)) t.push(_i()), e = e.getNextSibling();
			else {
				if (!i_(e)) break;
				{
					let n = 0, r = e.getTextContent(), i = e.getTextContentSize();
					for (; n < i && r[n] === " ";) n++;
					if (n !== 0 && t.push(r_(" ".repeat(n))), n !== i) break;
					e = e.getNextSibling();
				}
			}
			let r = i.splitText(n.offset)[0], a = n.offset === 0 ? 0 : 1, o = r.getIndexWithinParent() + a, s = i.getParentOrThrow(), c = [io(), ...t];
			s.splice(o, 0, c);
			let l = t[t.length - 1];
			l ? l.select() : n.offset === 0 ? r.selectPrevious() : r.getNextSibling().selectNext(0, 0);
		}
		if (qg(i)) {
			let { offset: t } = e.anchor;
			i.splice(t, 0, [io()]), i.select(t + 1, t + 1);
		}
		return null;
	}
	canIndent() {
		return !1;
	}
	collapseAtStart() {
		let e = I();
		return this.getChildren().forEach((t) => e.append(t)), this.replace(e), !0;
	}
	setLanguage(e) {
		let t = this.getWritable();
		return t.__language = e || void 0, t;
	}
	getLanguage() {
		return this.getLatest().__language;
	}
	setIsSyntaxHighlightSupported(e) {
		let t = this.getWritable();
		return t.__isSyntaxHighlightSupported = e, t;
	}
	getIsSyntaxHighlightSupported() {
		return this.getLatest().__isSyntaxHighlightSupported;
	}
	setTheme(e) {
		let t = this.getWritable();
		return t.__theme = e || void 0, t;
	}
	getTheme() {
		return this.getLatest().__theme;
	}
};
function Kg(e, t) {
	return Tc(Gg).setLanguage(e).setTheme(t);
}
function qg(e) {
	return e instanceof Gg;
}
function Jg(e) {
	return { node: Kg(e.getAttribute(Hg)) };
}
function Yg(e) {
	let t = e, n = Qg(t);
	return n || function(e) {
		let t = e.parentElement;
		for (; t !== null;) {
			if (Qg(t)) return !0;
			t = t.parentElement;
		}
		return !1;
	}(t) ? { node: n ? Kg() : null } : { node: null };
}
function Xg() {
	return { node: Kg() };
}
function Zg() {
	return { node: null };
}
function Qg(e) {
	return e.style.fontFamily.match("monospace") !== null;
}
function $g(e) {
	return e.classList.contains("js-file-line-container");
}
function e_(e) {
	let { anchor: t } = e;
	if (e.isCollapsed() && t.type === "element") {
		let e = t.getNode();
		if (qg(e)) {
			let n = e.getChildrenSize();
			if (n >= 2 && t.offset === n) {
				let t = e.getLastChild();
				if (ao(t) && ao(t.getPreviousSibling())) {
					let t = I();
					return e.splice(n - 2, 2, []).insertAfter(t, !1), t.select(), t;
				}
			}
		}
	}
	return null;
}
var t_ = class e extends ai {
	__highlightType;
	constructor(e = "", t, n) {
		super(e, n), this.__highlightType = t;
	}
	static getType() {
		return "code-highlight";
	}
	static clone(t) {
		return new e(t.__text, t.__highlightType || void 0, t.__key);
	}
	afterCloneFrom(e) {
		super.afterCloneFrom(e), this.__highlightType = e.__highlightType;
	}
	getHighlightType() {
		return this.getLatest().__highlightType;
	}
	setHighlightType(e) {
		let t = this.getWritable();
		return t.__highlightType = e || void 0, t;
	}
	canHaveFormat() {
		return !1;
	}
	createDOM(e) {
		let t = super.createDOM(e);
		return Jl(t, n_(e.theme, this.__highlightType)), t;
	}
	updateDOM(e, t, n) {
		let r = super.updateDOM(e, t, n), i = n_(n.theme, e.__highlightType), a = n_(n.theme, this.__highlightType);
		return i !== a && (i && Yl(t, i), a && Jl(t, a)), r;
	}
	static importJSON(e) {
		return r_().updateFromJSON(e);
	}
	updateFromJSON(e) {
		return super.updateFromJSON(e).setHighlightType(e.highlightType);
	}
	exportJSON() {
		return {
			...super.exportJSON(),
			highlightType: this.getHighlightType()
		};
	}
	setFormat(e) {
		return this;
	}
	isParentRequired() {
		return !0;
	}
	createParentElementNode() {
		return Kg();
	}
};
function n_(e, t) {
	return t && e && e.codeHighlight && e.codeHighlight[t];
}
function r_(e = "", t) {
	return js(new t_(e, t));
}
function i_(e) {
	return e instanceof t_;
}
If.tag("tr", "td"), If.tag("pre"), If.tag("code"), If.tag("div"), If.tag("div", "br"), If.tag("div"), If.tag("table").classAll("js-file-line-container"), If.tag("td").classAll("js-file-line");
//#endregion
//#region node_modules/@lexical/link/dist/LexicalLink.prod.mjs
var a_ = /* @__PURE__ */ new Set([
	"http:",
	"https:",
	"mailto:",
	"sms:",
	"tel:"
]), o_ = class e extends Ga {
	__url;
	__target;
	__rel;
	__title;
	static getType() {
		return "link";
	}
	static clone(t) {
		return new e(t.__url, {
			rel: t.__rel,
			target: t.__target,
			title: t.__title
		}, t.__key);
	}
	constructor(e = "", t = {}, n) {
		super(n);
		let { target: r = null, rel: i = null, title: a = null } = t;
		this.__url = e, this.__target = r, this.__rel = i, this.__title = a;
	}
	afterCloneFrom(e) {
		super.afterCloneFrom(e), this.__url = e.__url, this.__rel = e.__rel, this.__target = e.__target, this.__title = e.__title;
	}
	createDOM(e) {
		let t = B().createElement("a");
		return this.updateLinkDOM(null, t, e), Jl(t, e.theme.link), t;
	}
	updateLinkDOM(e, t, n) {
		if (Qs(t)) {
			e && e.__url === this.__url || (t.href = this.sanitizeUrl(this.__url));
			for (let n of [
				"target",
				"rel",
				"title"
			]) {
				let r = `__${n}`, i = this[r];
				e && e[r] === i || (i ? t[n] = i : t.removeAttribute(n));
			}
		}
	}
	updateDOM(e, t, n) {
		return this.updateLinkDOM(e, t, n), !1;
	}
	static importDOM() {
		return { a: (e) => ({
			conversion: s_,
			priority: 1
		}) };
	}
	static importJSON(e) {
		return c_().updateFromJSON(e);
	}
	updateFromJSON(e) {
		return super.updateFromJSON(e).setURL(e.url).setRel(e.rel || null).setTarget(e.target || null).setTitle(e.title || null);
	}
	sanitizeUrl(e) {
		let t = e;
		e = m_(e);
		try {
			let t = new URL(m_(e));
			if (!a_.has(t.protocol)) return "about:blank";
		} catch {
			let e = t.replace(/[\u0000-\u001F\u007F\s]/g, "").match(/^([a-z][a-z0-9+.-]*):/i);
			if (e != null && !a_.has(`${e[1].toLowerCase()}:`)) return "about:blank";
		}
		return e;
	}
	exportJSON() {
		return {
			...super.exportJSON(),
			rel: this.getRel(),
			target: this.getTarget(),
			title: this.getTitle(),
			url: this.getURL()
		};
	}
	getURL() {
		return this.getLatest().__url;
	}
	setURL(e) {
		let t = this.getWritable();
		return t.__url = e, t;
	}
	getTarget() {
		return this.getLatest().__target;
	}
	setTarget(e) {
		let t = this.getWritable();
		return t.__target = e, t;
	}
	getRel() {
		return this.getLatest().__rel;
	}
	setRel(e) {
		let t = this.getWritable();
		return t.__rel = e, t;
	}
	getTitle() {
		return this.getLatest().__title;
	}
	setTitle(e) {
		let t = this.getWritable();
		return t.__title = e, t;
	}
	insertNewAfter(e, t = !0) {
		let n = As(this);
		return this.insertAfter(n, t), n;
	}
	canInsertTextBefore() {
		return !1;
	}
	canInsertTextAfter() {
		return !1;
	}
	canBeEmpty() {
		return !1;
	}
	isInline() {
		return !0;
	}
	extractWithChild(e, t, n) {
		if (!j(t)) return !1;
		let r = t.anchor.getNode(), i = t.focus.getNode();
		return (this.is(r) || this.isParentOf(r)) && (this.is(i) || this.isParentOf(i)) && t.getTextContent().length > 0;
	}
	isEmailURI() {
		return this.__url.startsWith("mailto:");
	}
	isWebSiteURI() {
		return this.__url.startsWith("https://") || this.__url.startsWith("http://");
	}
	shouldMergeAdjacentLink(e) {
		return this.getType() === e.getType() && this.__url === e.__url && this.__target === e.__target && this.__rel === e.__rel && this.__title === e.__title;
	}
};
function s_(e) {
	let t = null;
	if (Qs(e)) {
		let n = e.textContent;
		(n !== null && n !== "" || e.children.length > 0) && (t = c_(e.getAttribute("href") || "", {
			rel: e.getAttribute("rel"),
			target: e.getAttribute("target"),
			title: e.getAttribute("title")
		}));
	}
	return { node: t };
}
function c_(e = "", t) {
	return js(new o_(e, t));
}
function l_(e) {
	return e instanceof o_;
}
var u_ = class e extends o_ {
	__isUnlinked;
	constructor(e = "", t = {}, n) {
		super(e, t, n), this.__isUnlinked = t.isUnlinked !== void 0 && t.isUnlinked !== null && t.isUnlinked;
	}
	afterCloneFrom(e) {
		super.afterCloneFrom(e), this.__isUnlinked = e.__isUnlinked;
	}
	static getType() {
		return "autolink";
	}
	static clone(t) {
		return new e(t.__url, {
			isUnlinked: t.__isUnlinked,
			rel: t.__rel,
			target: t.__target,
			title: t.__title
		}, t.__key);
	}
	shouldMergeAdjacentLink(e) {
		return !1;
	}
	getIsUnlinked() {
		return this.__isUnlinked;
	}
	setIsUnlinked(e) {
		let t = this.getWritable();
		return t.__isUnlinked = e, t;
	}
	createDOM(e) {
		return this.__isUnlinked ? B().createElement("span") : super.createDOM(e);
	}
	updateDOM(e, t, n) {
		return super.updateDOM(e, t, n) || e.__isUnlinked !== this.__isUnlinked;
	}
	static importJSON(e) {
		return d_().updateFromJSON(e);
	}
	updateFromJSON(e) {
		return super.updateFromJSON(e).setIsUnlinked(e.isUnlinked || !1);
	}
	static importDOM() {
		return null;
	}
	exportJSON() {
		return {
			...super.exportJSON(),
			isUnlinked: this.__isUnlinked
		};
	}
	insertNewAfter(e, t = !0) {
		let n = d_(this.__url, {
			isUnlinked: this.__isUnlinked,
			rel: this.__rel,
			target: this.__target,
			title: this.__title
		});
		return this.insertAfter(n, t), n;
	}
};
function d_(e = "", t) {
	return js(new u_(e, t));
}
function f_(e) {
	return e instanceof u_;
}
var p_ = /^\+?[0-9\s()-]{5,}$/;
function m_(e) {
	return e.match(/^[a-z][a-z0-9+.-]*:/i) || e.match(/^[/#.]/) ? e : e.includes("@") ? `mailto:${e}` : p_.test(e) ? `tel:${e}` : `https://${e}`;
}
If.tag("a");
//#endregion
//#region node_modules/@lexical/markdown/dist/LexicalMarkdown.prod.mjs
function h_(e, t) {
	let n = {};
	for (let r of e) {
		let e = t(r);
		e && (n[e] ? n[e].push(r) : n[e] = [r]);
	}
	return n;
}
function g_(e) {
	let t = h_(e, (e) => e.type);
	return {
		element: t.element || [],
		multilineElement: t["multiline-element"] || [],
		textFormat: t["text-format"] || [],
		textMatch: t["text-match"] || []
	};
}
var __ = /[!-/:-@[-`{-~\s]/, v_ = /\s/, y_ = /[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]/, b_ = /^\s{0,3}$/;
function x_(e) {
	if (!fo(e)) return !1;
	let t = e.getFirstChild();
	return t == null || e.getChildrenSize() === 1 && A(t) && b_.test(t.getTextContent());
}
function S_(e) {
	return e.replace(/\\([!-/:-@[-`{-~])/g, "$1").replace(/&#(\d+);/g, (e, t) => String.fromCodePoint(Number(t)));
}
var C_ = /^(\s*)(\d{1,})\.\s/, w_ = /^(\s*)[-*+]\s/, T_ = /^(\s*)(?:[-*+]\s)?\s?(\[(\s|x)?\])\s/i, E_ = /^(#{1,6})\s/, D_ = /^>\s/, O_ = /^([ \t]*`{3,})([\w-]+)?[ \t]?/, k_ = /^[ \t]*`{3,}$/, A_ = /^[ \t]*```[^`]+(?:(?:`{1,2}|`{4,})[^`]+)*```(?:[^`]|$)/, j_ = /^(?:\|)(.+)(?:\|)\s?$/;
function M_(e) {
	if (e[0] !== "|") return !1;
	let { length: t } = e, n = 1, r = 0;
	for (; n < t;) {
		let t = n;
		for (e[t] === " " && t++, e[t] === ":" && t++; e[t] === "-";) t++;
		if (e[t] === ":" && t++, e[t] === " " && t++, e[t] !== "|") break;
		r++, n = t + 1;
	}
	return r > 0 && (n === t || n === t - 1 && /\s/.test(e[n]));
}
var N_ = /^<[a-z_][\w-]*(?:\s[^<>]*)?\/?>/i, P_ = /^<\/[a-z_][\w-]*\s*>/i, F_ = (e) => RegExp(`(?:${e.source})$`, e.flags), I_ = /* @__PURE__ */ Ze("mdListMarker", {
	parse: (e) => typeof e == "string" && /^[-*+]$/.test(e) ? e : "-",
	resetOnCopyNode: !0
}), L_ = /* @__PURE__ */ Ze("mdCodeFence", {
	parse: (e) => typeof e == "string" && /^`{3,}$/.test(e) ? e : "```",
	resetOnCopyNode: !0
}), R_ = /* @__PURE__ */ Ze("mdHardLineBreak", {
	parse: (e) => typeof e == "string" && /^(\\| {2,})$/.test(e) ? e : "",
	resetOnCopyNode: !0
});
function z_(e) {
	if (e.endsWith("\\")) return [e.slice(0, -1), "\\"];
	let t = e.match(/^(.*?\S)( {2,})$/);
	return t ? [t[1], t[2]] : null;
}
function B_(e) {
	let t = e.getChildren(), n = t.length - 1, r = t[n];
	if (!A(r)) return null;
	let i = r.getTextContent(), a = z_(i);
	if (a !== null) {
		let [e, t] = a;
		return r.setTextContent(e), t;
	}
	return /^ {2,}$/.test(i) && function(e, t) {
		for (let n = t - 1; n >= 0; n--) {
			if (ao(e[n])) return !1;
			if (/\S/.test(e[n].getTextContent())) return !0;
		}
		return !1;
	}(t, n) ? (r.setTextContent(""), i) : null;
}
function V_(e) {
	let t = io(), n = B_(e);
	return n !== null && $e(t, R_, n), t;
}
var H_ = (e) => (t, n, r, i) => {
	let a = e(r);
	a.append(...n), t.replace(a), i || a.select(0, 0);
}, U_ = (e) => (t, n, r, i) => {
	let a = t.getPreviousSibling(), o = t.getNextSibling(), s = Sg(e === "check" ? r[3] === "x" : void 0), c = r[0].trim()[0], l = e !== "bullet" && e !== "check" || c !== I_.parse(c) ? void 0 : c;
	if ($(o) && o.getListType() === e) {
		l && $e(o, I_, l);
		let n = o.getFirstChild();
		n === null ? o.append(s) : n.insertBefore(s), e === "number" && o.setStart(Number(r[2])), t.remove();
	} else if ($(a) && a.getListType() === e) l && $e(a, I_, l), a.append(s), t.remove();
	else {
		let n = Dg(e, e === "number" ? Number(r[2]) : void 0);
		l && $e(n, I_, l), n.append(s), t.replace(n);
	}
	s.append(...n), i || s.select(0, 0);
	let u = function(e) {
		let t = e.match(/\t/g), n = e.match(/ /g), r = 0;
		return t && (r += t.length), n && (r += Math.floor(n.length / 4)), r;
	}(r[1]);
	u && s.setIndent(u);
}, W_ = (e, t, n, r) => {
	let i = [], a = e.getChildren(), o = 0;
	for (let s of a) if (Q(s)) {
		if (s.getChildrenSize() === 1) {
			let e = s.getFirstChild();
			if ($(e)) {
				let a = W_(e, t, n + 1, r);
				a && i.push(a);
				continue;
			}
		}
		if (r && !s.getChildren().some((e) => e.isSelected(r))) continue;
		let a = " ".repeat(4 * n), c = e.getListType(), l = Qe(e, I_), u = c === "number" ? `${e.getStart() + o}. ` : c === "check" ? `${l} [${s.getChecked() ? "x" : " "}] ` : l + " ", d = t(s);
		c !== "number" && (d = d.replace(/^(\s{0,3}\d+)(\.\s)/, "$1\\$2")), i.push(a + u + d), o++;
	}
	return i.join("\n");
}, G_ = {
	dependencies: [Ep],
	export: (e, t) => {
		if (!jp(e)) return null;
		let n = Number(e.getTag().slice(1));
		return "#".repeat(n) + " " + t(e);
	},
	regExp: E_,
	replace: H_((e) => Ap("h" + e[1].length)),
	triggerOnEnter: !0,
	type: "element"
}, K_ = {
	dependencies: [Cp],
	export: (e, t) => {
		if (!Tp(e)) return null;
		let n = t(e).split("\n"), r = [];
		for (let e of n) r.push("> " + e);
		return r.join("\n");
	},
	regExp: D_,
	replace: (e, t, n, r) => {
		if (r) {
			let n = e.getPreviousSibling();
			if (Tp(n)) return n.splice(n.getChildrenSize(), 0, [V_(n), ...t]), void e.remove();
		}
		let i = wp();
		i.append(...t), e.replace(i), r || i.select(0, 0);
	},
	triggerOnEnter: !0,
	type: "element"
}, q_ = {
	dependencies: [Gg],
	export: (e) => {
		if (!qg(e)) return null;
		let t = e.getTextContent(), n = Qe(e, L_);
		if (t.indexOf(n) > -1) {
			let e = t.match(/`{3,}/g);
			if (e) {
				let t = Math.max(...e.map((e) => e.length));
				n = "`".repeat(t + 1);
			}
		}
		return n + (e.getLanguage() || "") + (t ? "\n" + t : "") + "\n" + n;
	},
	handleImportAfterStartMatch: ({ lines: e, rootNode: t, startLineIndex: n, startMatch: r }) => {
		let i = r[1], a = i.trim().length, o = e[n], s = r.index + i.length, c = o.slice(s), l = RegExp(`\`{${a},}$`);
		if (l.test(c)) {
			let e = c.match(l), i = c.slice(0, c.lastIndexOf(e[0])), a = [...r];
			return a[2] = "", q_.replace(t, null, a, e, [i], !0), [!0, n];
		}
		let u = RegExp(`^[ \\t]*\`{${a},}$`);
		for (let i = n + 1; i < e.length; i++) {
			let a = e[i];
			if (u.test(a)) {
				let s = a.match(u), c = e.slice(n + 1, i), l = o.slice(r[0].length);
				return l.length > 0 && c.unshift(l), q_.replace(t, null, r, s, c, !0), [!0, i];
			}
		}
		let d = e.slice(n + 1), f = o.slice(r[0].length);
		return f.length > 0 && d.unshift(f), q_.replace(t, null, r, null, d, !0), [!0, e.length - 1];
	},
	regExpEnd: {
		optional: !0,
		regExp: k_
	},
	regExpStart: O_,
	replace: (e, t, n, r, i, a) => {
		let o, s, c = n[1] ? n[1].trim() : "```", l = n[2] || void 0;
		if (!t && i) {
			if (i.length === 1) r ? (o = Kg(l), s = i[0]) : (o = Kg(l), s = i[0].startsWith(" ") ? i[0].slice(1) : i[0]);
			else {
				for (o = Kg(l), i.length > 0 && (i[0].trim().length === 0 ? i.shift() : i[0].startsWith(" ") && (i[0] = i[0].slice(1))); i.length > 0 && !i[i.length - 1].length;) i.pop();
				s = i.join("\n");
			}
			$e(o, L_, c);
			let t = mi(s);
			o.append(t), e.append(o);
		} else t && H_((e) => Kg(e ? e[2] : void 0))(e, t, n, a);
	},
	type: "multiline-element"
}, J_ = {
	dependencies: [Cg, vg],
	export: (e, t, n) => $(e) ? W_(e, t, 0, n) : null,
	regExp: w_,
	replace: U_("bullet"),
	triggerOnEnter: !0,
	type: "element"
}, Y_ = {
	dependencies: [Cg, vg],
	export: (e, t, n) => $(e) ? W_(e, t, 0, n) : null,
	regExp: C_,
	replace: U_("number"),
	triggerOnEnter: !0,
	type: "element"
}, X_ = {
	format: ["code"],
	tag: "`",
	type: "text-format"
}, Z_ = {
	format: ["highlight"],
	tag: "==",
	type: "text-format"
}, Q_ = {
	format: ["bold", "italic"],
	tag: "***",
	type: "text-format"
}, $_ = {
	format: ["bold", "italic"],
	intraword: !1,
	tag: "___",
	type: "text-format"
}, ev = {
	format: ["bold"],
	tag: "**",
	type: "text-format"
}, tv = {
	format: ["bold"],
	intraword: !1,
	tag: "__",
	type: "text-format"
}, nv = {
	format: ["strikethrough"],
	tag: "~~",
	type: "text-format"
}, rv = {
	format: ["italic"],
	tag: "*",
	type: "text-format"
}, iv = {
	format: ["italic"],
	intraword: !1,
	tag: "_",
	type: "text-format"
}, av = {
	dependencies: [o_],
	export: (e, t, n) => {
		if (!l_(e) || f_(e)) return null;
		let r = t(e), i = e.getTitle();
		return i != null && (i = i.replace(/([\\"])/g, "\\$1")), i ? `[${r}](${e.getURL()} "${i}")` : `[${r}](${e.getURL()})`;
	},
	importRegExp: /(?:\[(.+?)\])(?:\((?:([^()\s]+)(?:\s"((?:[^"]*\\")*[^"]*)"\s*)?)\))/,
	regExp: /(?:\[([^[\]]*(?:\[[^[\]]*\][^[\]]*)*)\])(?:\((?:([^()\s]+)(?:\s"((?:[^"]*\\")*[^"]*)"\s*)?)\))$/,
	replace: (e, t) => {
		if (W(e, l_)) return;
		let [, n, r, i] = t, a = c_(r == null ? void 0 : S_(r), { title: i == null ? void 0 : S_(i) }), o = n.split("[").length - 1, s = n.split("]").length - 1, c = n, l = "";
		if (o < s) return;
		if (o > s) {
			let e = n.split("[");
			l = "[" + e[0], c = e.slice(1).join("[");
		}
		let u = mi(c);
		return u.setFormat(e.getFormat()), a.append(u), e.replace(a), l && a.insertBefore(mi(l)), u;
	},
	trigger: ")",
	type: "text-match"
}, ov = [
	G_,
	K_,
	J_,
	Y_
], sv = [q_], cv = [
	X_,
	Q_,
	$_,
	ev,
	tv,
	Z_,
	rv,
	iv,
	nv
], lv = [av], uv = [
	...ov,
	...sv,
	...cv,
	...lv
];
function dv(e, t = !1) {
	let n = e.split("\n"), r = 0, i = [];
	for (let e = 0; e < n.length; e++) {
		let a = n[e], o = a.trimEnd(), s = i[i.length - 1], c = e < n.length - 1 ? z_(a) : null, l = s !== void 0 && z_(s) !== null;
		if (A_.test(o)) i.push(o);
		else if (r === 0) {
			{
				let e = o.match(O_);
				if (e) {
					r = e[1].trim().length, i.push(o);
					continue;
				}
			}
			o === "" || s === "" || !s || E_.test(s) || E_.test(o) || D_.test(o) || C_.test(o) || w_.test(o) || T_.test(o) || j_.test(o) || M_(o) || l || !t || N_.test(o) || P_.test(o) || F_(P_).test(s) || F_(N_).test(s) || k_.test(s) ? i.push(!t && o !== "" || c !== null ? a : o) : i[i.length - 1] = s + " " + (c === null ? o : a).trimStart();
		} else {
			if (k_.test(o) && o.trim().length >= r) {
				r = 0, i.push(o);
				continue;
			}
			i.push(a);
		}
	}
	return i.join("\n");
}
function fv(e, t, n, r, i) {
	for (let a of t) {
		if (!a.export) continue;
		let t = a.export(e, (e) => pv(e, n, r, void 0, void 0, i));
		if (t != null) return t;
	}
	return P(e) ? pv(e, n, r, void 0, void 0, i) : F(e) ? e.getTextContent() : null;
}
function pv(e, t, n, r, i, a = !1) {
	let o = [], s = e.getChildren();
	r ||= [], i ||= [];
	t: for (let e of s) {
		for (let s of n) {
			if (!s.export) continue;
			let c = s.export(e, (e) => pv(e, t, n, r, [...i, ...r], a), (e, n) => hv(e, n, t, r, i, a));
			if (c != null) {
				o.push(c);
				continue t;
			}
		}
		ao(e) ? o.push(mv(e)) : A(e) ? o.push(hv(e, e.getTextContent(), t, r, i, a)) : P(e) ? o.push(pv(e, t, n, r, i, a)) : F(e) && o.push(e.getTextContent());
	}
	return o.join("");
}
function mv(e) {
	return Qe(e, R_) + "\n";
}
function hv(e, t, n, r, i, a = !1) {
	let o = e.hasFormat("code"), s, c, l, u, d = t;
	if (o || (d = a ? d.replace(/([*_`~])/g, "\\$1") : d.replace(/([*_`~\\])/g, "\\$1")), o) {
		let { fence: e, padded: n } = function(e) {
			let t = e.match(/`+/g), n = t ? Math.max(...t.map((e) => e.length)) : 0;
			return {
				fence: "`".repeat(n + 1),
				padded: e.length === 0 || e.includes("`") || /^\s/.test(e) && /\s$/.test(e) ? ` ${e} ` : e
			};
		}(t);
		s = "", l = "", c = e + n + e, u = !1;
	} else {
		let e = d.match(/^(\s*)(.*?)(\s*)$/s) || [
			"",
			"",
			d,
			""
		];
		s = e[1], c = e[2], l = e[3], u = c === "";
	}
	let f = "", p = "", m = "", h = gv(e, !0), g = gv(e, !1), _ = /* @__PURE__ */ new Set();
	for (let t of n) {
		let n = t.format[0], i = t.tag;
		n !== "code" && vv(e, n) && !_.has(n) && (_.add(n), vv(h, n) && r.find((e) => e.tag === i) || (r.push({
			format: n,
			tag: i
		}), f += i));
	}
	for (let t = 0; t < r.length; t++) {
		let n = _v(e, r[t].format), a = _v(g, r[t].format);
		if (n && a) continue;
		let o = [...r];
		for (; o.length > t;) {
			let e = o.pop();
			i && e && i.find((t) => t.tag === e.tag) || (e && typeof e.tag == "string" && (n ? a || (m += e.tag) : p += e.tag), r.pop());
		}
		break;
	}
	return u && !e.hasFormat("code") ? p + d : p + s + f + c + m + l;
}
function gv(e, t) {
	let n = t ? e.getPreviousSibling() : e.getNextSibling();
	return A(n) ? n : null;
}
function _v(e, t) {
	return A(e) && e.hasFormat(t);
}
function vv(e, t) {
	return !!_v(e, t) && (t === "code" || !e || !/^\s*$/.test(e.getTextContent()));
}
function yv(e, t) {
	let n = e.getTextContent(), r = t.transformersByTag["`"], i = [], a = null;
	if (r) {
		let e = function(e) {
			let t = (t) => {
				let n = 0;
				for (let r = t - 1; r >= 0 && e[r] === "\\"; r--) n++;
				return n % 2 == 1;
			}, n = [], r = 0;
			for (; r < e.length;) if (e[r] === "`") {
				let t = 1;
				for (; r + t < e.length && e[r + t] === "`";) t++;
				n.push({
					index: r,
					length: t
				}), r += t;
			} else r++;
			let i = [], a = 0;
			for (; a < n.length;) {
				let r = n[a];
				if (t(r.index)) {
					a++;
					continue;
				}
				let o = -1;
				for (let e = a + 1; e < n.length; e++) if (n[e].length === r.length) {
					o = e;
					break;
				}
				if (o === -1) {
					a++;
					continue;
				}
				let s = n[o], c = e.slice(r.index + r.length, s.index);
				c.length >= 2 && c.startsWith(" ") && c.endsWith(" ") && /[^ ]/.test(c) && (c = c.slice(1, -1)), i.push({
					content: c,
					endIndex: s.index + s.length,
					startIndex: r.index
				}), a = o + 1;
			}
			return i;
		}(n);
		for (let t of e) a ||= {
			content: t.content,
			endIndex: t.endIndex,
			startIndex: t.startIndex,
			tag: "`"
		}, i.push({
			end: t.endIndex,
			start: t.startIndex
		});
	}
	let o = function(e, t, n = []) {
		let r = [], i = new Set(Object.keys(t.transformersByTag).filter((e) => e[0] !== "`").map((e) => e[0])), a = (t) => {
			let n = 0;
			for (let r = t - 1; r >= 0 && e[r] === "\\"; r--) n++;
			return n % 2 == 1;
		}, o = (e) => n.some((t) => e >= t.start && e < t.end), s = 0;
		for (; s < e.length;) {
			let t = e[s];
			if (!i.has(t) || a(s) || o(s)) {
				s++;
				continue;
			}
			let n = 1;
			for (; s + n < e.length && e[s + n] === t;) n++;
			let c = bv(t, e, s, n, !0), l = bv(t, e, s, n, !1);
			(c || l) && r.push({
				active: !0,
				canClose: l,
				canOpen: c,
				char: t,
				index: s,
				length: n
			}), s += n;
		}
		return r;
	}(n, t, i), s = o.length > 0 ? function(e, t, n) {
		let r = {}, i = 0, a = null;
		for (; i < t.length;) {
			let o = t[i];
			if (!o.active || !o.canClose || o.length === 0) {
				i++;
				continue;
			}
			let s = `${o.char}${o.canOpen}${o.length % 3}`, c = r[s] ?? -1, l = !1;
			for (let r = i - 1; r > c; r--) {
				let s = t[r];
				if (!s.active || !s.canOpen || s.length === 0 || s.char !== o.char || (s.canClose || o.canOpen) && (s.length + o.length) % 3 == 0 && s.length % 3 != 0 && o.length % 3 != 0) continue;
				let c = Math.min(s.length, o.length), u = Object.keys(n.transformersByTag).filter((e) => e[0] === s.char && e.length <= c).sort((e, t) => t.length - e.length)[0];
				if (!u) continue;
				l = !0;
				let d = u.length, f = {
					content: e.slice(s.index + s.length, o.index),
					endIndex: o.index + d,
					startIndex: s.index + (s.length - d),
					tag: u
				};
				(!a || f.startIndex < a.startIndex || f.startIndex === a.startIndex && f.endIndex > a.endIndex) && (a = f);
				for (let e = r + 1; e < i; e++) t[e].active = !1;
				s.length -= d, o.length -= d, s.active = s.length > 0, o.length > 0 ? o.index += d : (o.active = !1, i++);
				break;
			}
			l || (r[s] = i - 1, o.canOpen || (o.active = !1), i++);
		}
		return a;
	}(n, o, t) : null, c = null, l = null;
	if (a && s ? s.startIndex <= a.startIndex && s.endIndex >= a.endIndex ? (c = s, l = t.transformersByTag[s.tag]) : (c = a, l = r) : a ? (c = a, l = r) : s && (c = s, l = t.transformersByTag[s.tag]), !c || !l) return null;
	let u = [
		n.slice(c.startIndex, c.endIndex),
		c.tag,
		c.content
	];
	return u.index = c.startIndex, u.input = n, {
		endIndex: c.endIndex,
		isCodeSpan: l === r,
		match: u,
		startIndex: c.startIndex,
		transformer: l
	};
}
function bv(e, t, n, r, i) {
	if (!xv(t, n, r, i)) return !1;
	if (e === "*") return !0;
	if (e === "_") {
		if (!xv(t, n, r, !i)) return !0;
		let e = i ? t[n - 1] : t[n + r];
		return e !== void 0 && y_.test(e);
	}
	return !0;
}
function xv(e, t, n, r) {
	let i = e[t - 1], a = e[t + n], [o, s] = r ? [a, i] : [i, a];
	return o !== void 0 && !v_.test(o) && (!y_.test(o) || s === void 0 || v_.test(s) || y_.test(s));
}
function Sv(e) {
	return A(e) && !e.hasFormat("code");
}
function Cv(e, t, n) {
	let r = yv(e, t), i = function(e, t) {
		let n = e, r, i, a, o;
		for (let e of t) {
			if (!e.replace || !e.importRegExp) continue;
			let t = n.getTextContent().match(e.importRegExp);
			if (!t) continue;
			let s = t.index || 0, c = e.getEndIndex ? e.getEndIndex(n, t) : s + t[0].length;
			!1 !== c && (r === void 0 || i === void 0 || s < r && (c > i || c <= r)) && (r = s, i = c, a = e, o = t);
		}
		return r === void 0 || i === void 0 || a === void 0 || o === void 0 ? null : {
			endIndex: i,
			match: o,
			startIndex: r,
			transformer: a
		};
	}(e, n);
	if (r && i && (r.isCodeSpan ? i.startIndex <= r.startIndex && i.endIndex >= r.endIndex ? r = null : i = null : r.startIndex <= i.startIndex && r.endIndex >= i.endIndex || i.startIndex > r.endIndex ? i = null : r = null), r) {
		let i = function(e, t, n, r, i) {
			let a = e.getTextContent(), o, s, c;
			if (i[0] === a ? o = e : t === 0 ? [o, s] = e.splitText(n) : [c, o, s] = e.splitText(t, n), o.setTextContent(i[2]), r) for (let e of r.format) o.hasFormat(e) || o.toggleFormat(e);
			return {
				nodeAfter: s,
				nodeBefore: c,
				transformedNode: o
			};
		}(e, r.startIndex, r.endIndex, r.transformer, r.match);
		Sv(i.nodeAfter) && Cv(i.nodeAfter, t, n), Sv(i.nodeBefore) && Cv(i.nodeBefore, t, n), Sv(i.transformedNode) && Cv(i.transformedNode, t, n);
	} else if (i) {
		let r = function(e, t, n, r, i) {
			let a, o, s;
			return t === 0 ? [a, o] = e.splitText(n) : [s, a, o] = e.splitText(t, n), r.replace ? {
				nodeAfter: o,
				nodeBefore: s,
				transformedNode: r.replace(a, i) || void 0
			} : null;
		}(e, i.startIndex, i.endIndex, i.transformer, i.match);
		if (!r) return;
		Sv(r.nodeAfter) && Cv(r.nodeAfter, t, n), Sv(r.nodeBefore) && Cv(r.nodeBefore, t, n), Sv(r.transformedNode) && Cv(r.transformedNode, t, n);
	}
	let a = S_(e.getTextContent());
	e.setTextContent(a);
}
function wv(e, t, n, r = !1) {
	let i = g_(n), a = function(e) {
		let t = {}, n = {}, r = [];
		for (let i of e) {
			let { tag: e } = i;
			t[e] = i;
			let a = e.replace(/(\*|\^|\+)/g, "\\$1");
			r.push(a), e.length === 1 ? n[e] = RegExp(e === "`" ? "(^|[^\\\\`])(`)((?:\\\\`|[^`])+?)(`)(?!`)" : `(^|[^\\\\${a}])(${a})((\\\\${a})?.*?[^${a}\\s](\\\\${a})?)(${a})(?![\\\\${a}])`) : n[e] = RegExp(`(^|[^\\\\])(${a})((\\\\${a})?.*?[^\\s](\\\\${a})?)(${a})(?!\\\\)`);
		}
		return {
			fullMatchRegExpByTag: n,
			openTagsRegExp: RegExp(`(${r.join("|")})`, "g"),
			transformersByTag: t
		};
	}(i.textFormat), o = e.split("\n"), s = o.length;
	for (let e = 0; e < s; e++) {
		let n = o[e], [s, c] = Tv(o, e, i.multilineElement, t);
		s ? e = c : Ev(n, t, i.element, a, i.textMatch, r);
	}
	let c = t.getChildren();
	for (let e of c) if (!r && x_(e) && t.getChildrenSize() > 1) e.remove();
	else if (P(e)) for (let t of e.getAllTextNodes()) Dv(t);
}
function Tv(e, t, n, r) {
	for (let i of n) {
		let { handleImportAfterStartMatch: n, regExpEnd: a, regExpStart: o, replace: s } = i, c = e[t].match(o);
		if (!c) continue;
		if (n) {
			let a = n({
				lines: e,
				rootNode: r,
				startLineIndex: t,
				startMatch: c,
				transformer: i
			});
			if (a === null) continue;
			if (a) return a;
		}
		let l = typeof a == "object" && "regExp" in a ? a.regExp : a, u = a && typeof a == "object" && "optional" in a ? a.optional : !a, d = t, f = e.length;
		for (; d < f;) {
			let n = l ? e[d].match(l) : null;
			if (!n && (!u || u && d < f - 1)) {
				d++;
				continue;
			}
			if (n && t === d && n.index === c.index) {
				d++;
				continue;
			}
			let i = [];
			if (n && t === d) i.push(e[t].slice(c[0].length, -n[0].length));
			else for (let r = t; r <= d; r++) if (r === t) {
				let t = e[r].slice(c[0].length);
				i.push(t);
			} else if (r === d && n) {
				let t = e[r].slice(0, -n[0].length);
				i.push(t);
			} else i.push(e[r]);
			if (!1 !== s(r, null, c, n, i, !0)) return [!0, d];
			break;
		}
	}
	return [!1, t];
}
function Ev(e, t, n, r, i, a) {
	let o = mi(e), s = I();
	s.append(o), t.append(s);
	for (let { regExp: t, replace: r } of n) {
		let n = e.match(t);
		if (n && (o.setTextContent(e.slice(n[0].length)), !1 !== r(s, [o], n, !0))) break;
	}
	if (Cv(o, r, i), s.getParent() !== null && e.length > 0) {
		let e = s.getPreviousSibling();
		if (!a && (fo(e) || Tp(e) || $(e))) {
			let t = e;
			if ($(e)) {
				let n = e.getLastDescendant();
				t = n == null ? null : W(n, Q);
			}
			t != null && t.getTextContentSize() > 0 && (t.splice(t.getChildrenSize(), 0, [V_(t), ...s.getChildren()]), s.remove());
		}
	}
}
function Dv(e) {
	let t = /* @__PURE__ */ new Set(), n = e.getTextContent(), r = n.indexOf("	");
	for (; r !== -1;) t.add(r), t.add(r + 1), r = n.indexOf("	", r + 1);
	e.splitText(...t).forEach((e) => {
		e.getTextContent() === "	" && e.replace(_i());
	});
}
function Ov(e, ...t) {
	let n = new URL("https://lexical.dev/docs/error"), r = new URLSearchParams();
	r.append("code", e);
	for (let e of t) r.append("v", e);
	throw n.search = r.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function kv(e, t, n, r, i) {
	if (!ks(e.getParent()) || e.getFirstChild() !== t) return !1;
	let a = t.getTextContent();
	if (!i && a[n - 1] !== " ") return !1;
	for (let { regExp: o, replace: s } of r) {
		let r = a.match(o), c = i || r && r[0].endsWith(" ") ? n : n - 1;
		if (r && r[0].length === c) {
			let i = t.getNextSiblings(), [a, o] = t.splitText(n);
			if (!1 !== s(e, o ? [o, ...i] : i, r, !1)) return a.remove(), !0;
		}
	}
	return !1;
}
function Av(e, t, n, r, i) {
	if (!ks(e.getParent()) || e.getFirstChild() !== t) return !1;
	let a = t.getTextContent();
	if (!i && a[n - 1] !== " ") return !1;
	for (let { regExpStart: o, replace: s, regExpEnd: c } of r) {
		if (c && !("optional" in c) || c && "optional" in c && !c.optional) continue;
		let r = a.match(o);
		if (r) {
			let a = i || r[0].endsWith(" ") ? n : n - 1;
			if (r[0].length !== a) continue;
			let o = t.getNextSiblings(), [c, l] = t.splitText(n);
			if (!1 !== s(e, l ? [l, ...o] : o, r, null, null, !1)) return c.remove(), !0;
		}
	}
	return !1;
}
function jv(e, t) {
	let n = 0, r = e.getTextContent();
	for (let e = 0; e < t; e++) r[e] === "`" && n++;
	return n % 2 != 0;
}
function Mv(e, t, n) {
	let r = n.length;
	for (let i = t; i >= r; i--) {
		let t = i - r;
		if (Nv(e, t, n, 0, r) && e[t + r] !== " ") return t;
	}
	return -1;
}
function Nv(e, t, n, r, i) {
	for (let a = 0; a < i; a++) if (e[t + a] !== n[r + a]) return !1;
	return !0;
}
function Pv(e, t = uv) {
	let n = g_(t), r = n.element.filter((e) => e.triggerOnEnter), i = h_(n.textFormat, ({ tag: e }) => e[e.length - 1]), a = h_(n.textMatch, ({ trigger: e }) => e), o = /* @__PURE__ */ new Set([" "]);
	for (let e of n.textFormat) o.add(e.tag.slice(-1));
	for (let e of n.textMatch) e.trigger !== void 0 && o.add(e.trigger);
	for (let n of t) {
		let t = n.type;
		if (t === "element" || t === "text-match" || t === "multiline-element") {
			let t = n.dependencies;
			for (let n of t) e.hasNode(n) || Ov(173, n.getType());
		}
	}
	let s = (e, t, r) => !!kv(e, t, r, n.element) || !!Av(e, t, r, n.multilineElement) || !!function(e, t, n) {
		let r = e.getTextContent(), i = n[r[t - 1]];
		if (i == null) return !1;
		t < r.length && (r = r.slice(0, t));
		for (let t of i) {
			if (!t.replace || !t.regExp) continue;
			let n = r.match(t.regExp);
			if (n === null) continue;
			let i = n.index || 0, a = i + n[0].length, o;
			return i === 0 ? [o] = e.splitText(a) : [, o] = e.splitText(i, a), o.selectNext(0, 0), t.replace(o, n), !0;
		}
		return !1;
	}(t, r, a) || !!function(e, t, n) {
		let r = e.getTextContent(), i = t - 1, a = r[i], o = n[a];
		if (!o) return !1;
		for (let t of o) {
			let { tag: n } = t, o = n.length, s = i - o + 1;
			if (o > 1 && !Nv(r, s, n, 0, o) || r[s - 1] === " ") continue;
			let c = r[i + 1];
			if (!1 === t.intraword && c && !__.test(c)) continue;
			let l = e, u = l, d = Mv(r, s, n), f = u;
			for (; d < 0 && (f = f.getPreviousSibling()) && !ao(f);) if (A(f)) {
				if (f.hasFormat("code")) continue;
				let e = f.getTextContent();
				u = f, d = Mv(e, e.length, n);
			}
			if (d < 0 || u === l && d + o === s) continue;
			let p = u.getTextContent();
			if (d > 0 && p[d - 1] === a) continue;
			let m = p[d - 1];
			if (!1 === t.intraword && m && !__.test(m) || !t.format.includes("code") && jv(u, d)) continue;
			let h = l.getTextContent(), g = h.slice(0, s) + h.slice(i + 1);
			l.setTextContent(g);
			let _ = u === l ? g : p;
			u.setTextContent(_.slice(0, d) + _.slice(d + o));
			let v = N(), y = qi();
			Xo(y);
			let b = i - o * (u === l ? 2 : 1) + 1;
			y.anchor.set(u.__key, d, "text"), y.focus.set(l.__key, b, "text");
			for (let e of t.format) y.formatText(e, ye[e]);
			y.anchor.set(y.focus.key, y.focus.offset, y.focus.type);
			for (let e of t.format) y.hasFormat(e) && y.toggleFormat(e);
			return j(v) && (y.format = v.format), !0;
		}
		return !1;
	}(t, r, i);
	return Xl(e.registerUpdateListener(({ tags: t, dirtyLeaves: n, editorState: r, prevEditorState: i }) => {
		if (t.has("collaboration") || t.has("historic") || e.isComposing()) return;
		let a = t.has(qr), c = r.read(N), l = i.read(N);
		if (!j(l) || !j(c) || !c.isCollapsed() || c.is(l) && !a) return;
		let u = c.anchor.key, d = c.anchor.offset, f = r._nodeMap.get(u);
		if (A(f) && n.has(u) && (a || d === 1 || !(d > l.anchor.offset + 1))) {
			if (a) {
				let e = r.read(() => f.getTextContent())[d - 1];
				if (!o.has(e)) return;
			}
			e.update(() => {
				if (!Sv(f)) return;
				let e = f.getParent();
				e === null || qg(e) || s(e, f, c.anchor.offset) && xs("history-push");
			});
		}
	}), e.registerCommand(Ln, (e) => {
		if (e !== null && e.shiftKey) return !1;
		let t = N();
		if (!j(t) || !t.isCollapsed()) return !1;
		let i = t.anchor.offset, a = t.anchor.getNode();
		if (!A(a) || !Sv(a)) return !1;
		let o = a.getParent();
		return o === null || qg(o) ? !1 : i === a.getTextContent().length && !(!Av(o, a, i, n.multilineElement, !0) && !kv(o, a, i, r, !0)) && (e !== null && e.preventDefault(), !0);
	}, 1));
}
function Fv(e, t = uv, n, r = !1, i = !1) {
	let a = r ? e : dv(e, i), o = n || Yo();
	o.clear(), wv(a, o, t, r), N() !== null && o.selectStart();
}
function Iv(e, t = uv, n = !1, r = !1) {
	let i = n ? e : dv(e, r), a = new to();
	return wv(i, a, t, n), a.getChildren();
}
function Lv(e = uv, t, n = !1) {
	return function(e, t = !1) {
		let n = g_(e), r = [...n.multilineElement, ...n.element], i = !t, a = n.textFormat.filter((e) => e.format.length === 1).sort((e, t) => Number(e.format.includes("code")) - Number(t.format.includes("code")));
		return (e) => {
			let o = [], s = (e || Yo()).getChildren();
			for (let e = 0; e < s.length; e++) {
				let c = s[e], l = fv(c, r, a, n.textMatch, t);
				l != null && o.push(i && e > 0 && !x_(c) && !x_(s[e - 1]) ? `
${l}` : l);
			}
			return o.join("\n");
		};
	}(e, n)(t);
}
//#endregion
//#region node_modules/@lexical/react/dist/LexicalMarkdownShortcutPlugin.prod.mjs
var Rv = [{
	dependencies: [Nd],
	export: (e) => Id(e) ? "***" : null,
	regExp: /^(---|\*\*\*|___)\s?$/,
	replace: (e, t, n, r) => {
		let i = Fd();
		r || e.getNextSibling() != null ? e.replace(i) : e.insertBefore(i), i.selectNext();
	},
	triggerOnEnter: !0,
	type: "element"
}, ...uv];
function zv({ transformers: e = Rv }) {
	let [t] = b();
	return (0, _.useEffect)(() => Pv(t, e), [t, e]), null;
}
//#endregion
//#region node_modules/@lexical/react/dist/useLexicalNodeSelection.prod.mjs
function Bv(e, t) {
	return e.read("latest", () => {
		let e = R(t);
		return e !== null && e.isSelected();
	});
}
function Vv(e) {
	let [t] = b(), [n, r] = (0, _.useState)(() => Bv(t, e));
	return (0, _.useEffect)(() => {
		let n = !0, i = t.registerUpdateListener(() => {
			n && r(Bv(t, e));
		});
		return () => {
			n = !1, i();
		};
	}, [t, e]), [
		n,
		(0, _.useCallback)((n) => {
			t.update(() => {
				let t = N();
				Ei(t) || (t = Ji(), Xo(t)), Ei(t) && (n ? t.add(e) : t.delete(e));
			});
		}, [t, e]),
		(0, _.useCallback)(() => {
			t.update(() => {
				let e = N();
				Ei(e) && e.clear();
			});
		}, [t])
	];
}
//#endregion
//#region node_modules/@lexical/react/dist/LexicalHorizontalRuleNode.prod.mjs
function Hv({ nodeKey: e }) {
	let [t] = b(), [n, r, i] = Vv(e);
	return (0, _.useEffect)(() => Xl(t.registerCommand(pn, (a) => {
		let o = t.getElementByKey(e);
		return Zs(a) === o && (a.shiftKey || i(), r(!n), !0);
	}, 1)), [
		i,
		t,
		n,
		e,
		r
	]), (0, _.useEffect)(() => {
		let r = t.getElementByKey(e), i = t._config.theme.hrSelected ?? "selected";
		r !== null && (n ? Jl(r, i) : Yl(r, i));
	}, [
		t,
		n,
		e
	]), null;
}
var Uv = class e extends Nd {
	static getType() {
		return "horizontalrule";
	}
	static clone(t) {
		return new e(t.__key);
	}
	static importJSON(e) {
		return Gv().updateFromJSON(e);
	}
	static importDOM() {
		return { hr: () => ({
			conversion: Wv,
			priority: 0
		}) };
	}
	decorate() {
		return (0, J.jsx)(Hv, { nodeKey: this.__key });
	}
};
function Wv() {
	return { node: Gv() };
}
function Gv() {
	return js(new Uv());
}
(/* @__PURE__ */ o(((e, t) => {
	var n = function(e) {
		var t = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, n = 0, r = {}, i = {
			manual: e.Prism && e.Prism.manual,
			disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
			util: {
				encode: function e(t) {
					return t instanceof a ? new a(t.type, e(t.content), t.alias) : Array.isArray(t) ? t.map(e) : t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
				},
				type: function(e) {
					return Object.prototype.toString.call(e).slice(8, -1);
				},
				objId: function(e) {
					return e.__id || Object.defineProperty(e, "__id", { value: ++n }), e.__id;
				},
				clone: function e(t, n) {
					n ||= {};
					var r, a;
					switch (i.util.type(t)) {
						case "Object":
							if (a = i.util.objId(t), n[a]) return n[a];
							for (var o in r = {}, n[a] = r, t) t.hasOwnProperty(o) && (r[o] = e(t[o], n));
							return r;
						case "Array": return a = i.util.objId(t), n[a] ? n[a] : (r = [], n[a] = r, t.forEach(function(t, i) {
							r[i] = e(t, n);
						}), r);
						default: return t;
					}
				},
				getLanguage: function(e) {
					for (; e;) {
						var n = t.exec(e.className);
						if (n) return n[1].toLowerCase();
						e = e.parentElement;
					}
					return "none";
				},
				setLanguage: function(e, n) {
					e.className = e.className.replace(RegExp(t, "gi"), ""), e.classList.add("language-" + n);
				},
				currentScript: function() {
					if (typeof document > "u") return null;
					if (document.currentScript && document.currentScript.tagName === "SCRIPT") return document.currentScript;
					try {
						throw Error();
					} catch (r) {
						var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack) || [])[1];
						if (e) {
							var t = document.getElementsByTagName("script");
							for (var n in t) if (t[n].src == e) return t[n];
						}
						return null;
					}
				},
				isActive: function(e, t, n) {
					for (var r = "no-" + t; e;) {
						var i = e.classList;
						if (i.contains(t)) return !0;
						if (i.contains(r)) return !1;
						e = e.parentElement;
					}
					return !!n;
				}
			},
			languages: {
				plain: r,
				plaintext: r,
				text: r,
				txt: r,
				extend: function(e, t) {
					var n = i.util.clone(i.languages[e]);
					for (var r in t) n[r] = t[r];
					return n;
				},
				insertBefore: function(e, t, n, r) {
					r ||= i.languages;
					var a = r[e], o = {};
					for (var s in a) if (a.hasOwnProperty(s)) {
						if (s == t) for (var c in n) n.hasOwnProperty(c) && (o[c] = n[c]);
						n.hasOwnProperty(s) || (o[s] = a[s]);
					}
					var l = r[e];
					return r[e] = o, i.languages.DFS(i.languages, function(t, n) {
						n === l && t != e && (this[t] = o);
					}), o;
				},
				DFS: function e(t, n, r, a) {
					a ||= {};
					var o = i.util.objId;
					for (var s in t) if (t.hasOwnProperty(s)) {
						n.call(t, s, t[s], r || s);
						var c = t[s], l = i.util.type(c);
						l === "Object" && !a[o(c)] ? (a[o(c)] = !0, e(c, n, null, a)) : l === "Array" && !a[o(c)] && (a[o(c)] = !0, e(c, n, s, a));
					}
				}
			},
			plugins: {},
			highlightAll: function(e, t) {
				i.highlightAllUnder(document, e, t);
			},
			highlightAllUnder: function(e, t, n) {
				var r = {
					callback: n,
					container: e,
					selector: "code[class*=\"language-\"], [class*=\"language-\"] code, code[class*=\"lang-\"], [class*=\"lang-\"] code"
				};
				i.hooks.run("before-highlightall", r), r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)), i.hooks.run("before-all-elements-highlight", r);
				for (var a = 0, o; o = r.elements[a++];) i.highlightElement(o, t === !0, r.callback);
			},
			highlightElement: function(t, n, r) {
				var a = i.util.getLanguage(t), o = i.languages[a];
				i.util.setLanguage(t, a);
				var s = t.parentElement;
				s && s.nodeName.toLowerCase() === "pre" && i.util.setLanguage(s, a);
				var c = {
					element: t,
					language: a,
					grammar: o,
					code: t.textContent
				};
				function l(e) {
					c.highlightedCode = e, i.hooks.run("before-insert", c), c.element.innerHTML = c.highlightedCode, i.hooks.run("after-highlight", c), i.hooks.run("complete", c), r && r.call(c.element);
				}
				if (i.hooks.run("before-sanity-check", c), s = c.element.parentElement, s && s.nodeName.toLowerCase() === "pre" && !s.hasAttribute("tabindex") && s.setAttribute("tabindex", "0"), !c.code) {
					i.hooks.run("complete", c), r && r.call(c.element);
					return;
				}
				if (i.hooks.run("before-highlight", c), !c.grammar) {
					l(i.util.encode(c.code));
					return;
				}
				if (n && e.Worker) {
					var u = new Worker(i.filename);
					u.onmessage = function(e) {
						l(e.data);
					}, u.postMessage(JSON.stringify({
						language: c.language,
						code: c.code,
						immediateClose: !0
					}));
				} else l(i.highlight(c.code, c.grammar, c.language));
			},
			highlight: function(e, t, n) {
				var r = {
					code: e,
					grammar: t,
					language: n
				};
				if (i.hooks.run("before-tokenize", r), !r.grammar) throw Error("The language \"" + r.language + "\" has no grammar.");
				return r.tokens = i.tokenize(r.code, r.grammar), i.hooks.run("after-tokenize", r), a.stringify(i.util.encode(r.tokens), r.language);
			},
			tokenize: function(e, t) {
				var n = t.rest;
				if (n) {
					for (var r in n) t[r] = n[r];
					delete t.rest;
				}
				var i = new c();
				return l(i, i.head, e), s(e, i, t, i.head, 0), d(i);
			},
			hooks: {
				all: {},
				add: function(e, t) {
					var n = i.hooks.all;
					n[e] = n[e] || [], n[e].push(t);
				},
				run: function(e, t) {
					var n = i.hooks.all[e];
					if (!(!n || !n.length)) for (var r = 0, a; a = n[r++];) a(t);
				}
			},
			Token: a
		};
		e.Prism = i;
		function a(e, t, n, r) {
			this.type = e, this.content = t, this.alias = n, this.length = (r || "").length | 0;
		}
		a.stringify = function e(t, n) {
			if (typeof t == "string") return t;
			if (Array.isArray(t)) {
				var r = "";
				return t.forEach(function(t) {
					r += e(t, n);
				}), r;
			}
			var a = {
				type: t.type,
				content: e(t.content, n),
				tag: "span",
				classes: ["token", t.type],
				attributes: {},
				language: n
			}, o = t.alias;
			o && (Array.isArray(o) ? Array.prototype.push.apply(a.classes, o) : a.classes.push(o)), i.hooks.run("wrap", a);
			var s = "";
			for (var c in a.attributes) s += " " + c + "=\"" + (a.attributes[c] || "").replace(/"/g, "&quot;") + "\"";
			return "<" + a.tag + " class=\"" + a.classes.join(" ") + "\"" + s + ">" + a.content + "</" + a.tag + ">";
		};
		function o(e, t, n, r) {
			e.lastIndex = t;
			var i = e.exec(n);
			if (i && r && i[1]) {
				var a = i[1].length;
				i.index += a, i[0] = i[0].slice(a);
			}
			return i;
		}
		function s(e, t, n, r, c, d) {
			for (var f in n) if (!(!n.hasOwnProperty(f) || !n[f])) {
				var p = n[f];
				p = Array.isArray(p) ? p : [p];
				for (var m = 0; m < p.length; ++m) {
					if (d && d.cause == f + "," + m) return;
					var h = p[m], g = h.inside, _ = !!h.lookbehind, v = !!h.greedy, y = h.alias;
					if (v && !h.pattern.global) {
						var b = h.pattern.toString().match(/[imsuy]*$/)[0];
						h.pattern = RegExp(h.pattern.source, b + "g");
					}
					for (var x = h.pattern || h, S = r.next, C = c; S !== t.tail && !(d && C >= d.reach); C += S.value.length, S = S.next) {
						var w = S.value;
						if (t.length > e.length) return;
						if (!(w instanceof a)) {
							var ee = 1, te;
							if (v) {
								if (te = o(x, C, e, _), !te || te.index >= e.length) break;
								var ne = te.index, re = te.index + te[0].length, ie = C;
								for (ie += S.value.length; ne >= ie;) S = S.next, ie += S.value.length;
								if (ie -= S.value.length, C = ie, S.value instanceof a) continue;
								for (var ae = S; ae !== t.tail && (ie < re || typeof ae.value == "string"); ae = ae.next) ee++, ie += ae.value.length;
								ee--, w = e.slice(C, ie), te.index -= C;
							} else if (te = o(x, 0, w, _), !te) continue;
							var ne = te.index, oe = te[0], se = w.slice(0, ne), ce = w.slice(ne + oe.length), le = C + w.length;
							d && le > d.reach && (d.reach = le);
							var ue = S.prev;
							se && (ue = l(t, ue, se), C += se.length), u(t, ue, ee);
							var T = new a(f, g ? i.tokenize(oe, g) : oe, y, oe);
							if (S = l(t, ue, T), ce && l(t, S, ce), ee > 1) {
								var E = {
									cause: f + "," + m,
									reach: le
								};
								s(e, t, n, S.prev, C, E), d && E.reach > d.reach && (d.reach = E.reach);
							}
						}
					}
				}
			}
		}
		function c() {
			var e = {
				value: null,
				prev: null,
				next: null
			}, t = {
				value: null,
				prev: e,
				next: null
			};
			e.next = t, this.head = e, this.tail = t, this.length = 0;
		}
		function l(e, t, n) {
			var r = t.next, i = {
				value: n,
				prev: t,
				next: r
			};
			return t.next = i, r.prev = i, e.length++, i;
		}
		function u(e, t, n) {
			for (var r = t.next, i = 0; i < n && r !== e.tail; i++) r = r.next;
			t.next = r, r.prev = t, e.length -= i;
		}
		function d(e) {
			for (var t = [], n = e.head.next; n !== e.tail;) t.push(n.value), n = n.next;
			return t;
		}
		if (!e.document) return e.addEventListener && (i.disableWorkerMessageHandler || e.addEventListener("message", function(t) {
			var n = JSON.parse(t.data), r = n.language, a = n.code, o = n.immediateClose;
			e.postMessage(i.highlight(a, i.languages[r], r)), o && e.close();
		}, !1)), i;
		var f = i.util.currentScript();
		f && (i.filename = f.src, f.hasAttribute("data-manual") && (i.manual = !0));
		function p() {
			i.manual || i.highlightAll();
		}
		if (!i.manual) {
			var m = document.readyState;
			m === "loading" || m === "interactive" && f && f.defer ? document.addEventListener("DOMContentLoaded", p) : window.requestAnimationFrame ? window.requestAnimationFrame(p) : window.setTimeout(p, 16);
		}
		return i;
	}(typeof window < "u" ? window : typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : {});
	t !== void 0 && t.exports && (t.exports = n), typeof global < "u" && (global.Prism = n), n.languages.markup = {
		comment: {
			pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
			greedy: !0
		},
		prolog: {
			pattern: /<\?[\s\S]+?\?>/,
			greedy: !0
		},
		doctype: {
			pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
			greedy: !0,
			inside: {
				"internal-subset": {
					pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
					lookbehind: !0,
					greedy: !0,
					inside: null
				},
				string: {
					pattern: /"[^"]*"|'[^']*'/,
					greedy: !0
				},
				punctuation: /^<!|>$|[[\]]/,
				"doctype-tag": /^DOCTYPE/i,
				name: /[^\s<>'"]+/
			}
		},
		cdata: {
			pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
			greedy: !0
		},
		tag: {
			pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
			greedy: !0,
			inside: {
				tag: {
					pattern: /^<\/?[^\s>\/]+/,
					inside: {
						punctuation: /^<\/?/,
						namespace: /^[^\s>\/:]+:/
					}
				},
				"special-attr": [],
				"attr-value": {
					pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
					inside: { punctuation: [{
						pattern: /^=/,
						alias: "attr-equals"
					}, {
						pattern: /^(\s*)["']|["']$/,
						lookbehind: !0
					}] }
				},
				punctuation: /\/?>/,
				"attr-name": {
					pattern: /[^\s>\/]+/,
					inside: { namespace: /^[^\s>\/:]+:/ }
				}
			}
		},
		entity: [{
			pattern: /&[\da-z]{1,8};/i,
			alias: "named-entity"
		}, /&#x?[\da-f]{1,8};/i]
	}, n.languages.markup.tag.inside["attr-value"].inside.entity = n.languages.markup.entity, n.languages.markup.doctype.inside["internal-subset"].inside = n.languages.markup, n.hooks.add("wrap", function(e) {
		e.type === "entity" && (e.attributes.title = e.content.replace(/&amp;/, "&"));
	}), Object.defineProperty(n.languages.markup.tag, "addInlined", { value: function(e, t) {
		var r = {};
		r["language-" + t] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: !0,
			inside: n.languages[t]
		}, r.cdata = /^<!\[CDATA\[|\]\]>$/i;
		var i = { "included-cdata": {
			pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
			inside: r
		} };
		i["language-" + t] = {
			pattern: /[\s\S]+/,
			inside: n.languages[t]
		};
		var a = {};
		a[e] = {
			pattern: RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[\\s\\S])*?(?=<\\/__>)".replace(/__/g, function() {
				return e;
			}), "i"),
			lookbehind: !0,
			greedy: !0,
			inside: i
		}, n.languages.insertBefore("markup", "cdata", a);
	} }), Object.defineProperty(n.languages.markup.tag, "addAttribute", { value: function(e, t) {
		n.languages.markup.tag.inside["special-attr"].push({
			pattern: RegExp("(^|[\"'\\s])(?:" + e + ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))", "i"),
			lookbehind: !0,
			inside: {
				"attr-name": /^[^\s=]+/,
				"attr-value": {
					pattern: /=[\s\S]+/,
					inside: {
						value: {
							pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
							lookbehind: !0,
							alias: [t, "language-" + t],
							inside: n.languages[t]
						},
						punctuation: [{
							pattern: /^=/,
							alias: "attr-equals"
						}, /"|'/]
					}
				}
			}
		});
	} }), n.languages.html = n.languages.markup, n.languages.mathml = n.languages.markup, n.languages.svg = n.languages.markup, n.languages.xml = n.languages.extend("markup", {}), n.languages.ssml = n.languages.xml, n.languages.atom = n.languages.xml, n.languages.rss = n.languages.xml, (function(e) {
		var t = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
		e.languages.css = {
			comment: /\/\*[\s\S]*?\*\//,
			atrule: {
				pattern: RegExp("@[\\w-](?:[^;{\\s\"']|\\s+(?!\\s)|" + t.source + ")*?(?:;|(?=\\s*\\{))"),
				inside: {
					rule: /^@[\w-]+/,
					"selector-function-argument": {
						pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
						lookbehind: !0,
						alias: "selector"
					},
					keyword: {
						pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
						lookbehind: !0
					}
				}
			},
			url: {
				pattern: RegExp("\\burl\\((?:" + t.source + "|(?:[^\\\\\\r\\n()\"']|\\\\[\\s\\S])*)\\)", "i"),
				greedy: !0,
				inside: {
					function: /^url/i,
					punctuation: /^\(|\)$/,
					string: {
						pattern: RegExp("^" + t.source + "$"),
						alias: "url"
					}
				}
			},
			selector: {
				pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + t.source + ")*(?=\\s*\\{)"),
				lookbehind: !0
			},
			string: {
				pattern: t,
				greedy: !0
			},
			property: {
				pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
				lookbehind: !0
			},
			important: /!important\b/i,
			function: {
				pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
				lookbehind: !0
			},
			punctuation: /[(){};:,]/
		}, e.languages.css.atrule.inside.rest = e.languages.css;
		var n = e.languages.markup;
		n && (n.tag.addInlined("style", "css"), n.tag.addAttribute("style", "css"));
	})(n), n.languages.clike = {
		comment: [{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: !0,
			greedy: !0
		}, {
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: !0,
			greedy: !0
		}],
		string: {
			pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: !0
		},
		"class-name": {
			pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
			lookbehind: !0,
			inside: { punctuation: /[.\\]/ }
		},
		keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
		boolean: /\b(?:false|true)\b/,
		function: /\b\w+(?=\()/,
		number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
		operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
		punctuation: /[{}[\];(),.:]/
	}, n.languages.javascript = n.languages.extend("clike", {
		"class-name": [n.languages.clike["class-name"], {
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
			lookbehind: !0
		}],
		keyword: [{
			pattern: /((?:^|\})\s*)catch\b/,
			lookbehind: !0
		}, {
			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: !0
		}],
		function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
		number: {
			pattern: RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"),
			lookbehind: !0
		},
		operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
	}), n.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, n.languages.insertBefore("javascript", "keyword", {
		regex: {
			pattern: RegExp("((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)\\/(?:(?:\\[(?:[^\\]\\\\\\r\\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\\r\\n])+\\/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\\r\\n]|\\\\.|\\[(?:[^[\\]\\\\\\r\\n]|\\\\.|\\[(?:[^[\\]\\\\\\r\\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\\r\\n])+\\/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|\\/\\*(?:[^*]|\\*(?!\\/))*\\*\\/)*(?:$|[\\r\\n,.;:})\\]]|\\/\\/))"),
			lookbehind: !0,
			greedy: !0,
			inside: {
				"regex-source": {
					pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
					lookbehind: !0,
					alias: "language-regex",
					inside: n.languages.regex
				},
				"regex-delimiter": /^\/|\/$/,
				"regex-flags": /^[a-z]+$/
			}
		},
		"function-variable": {
			pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
			alias: "function"
		},
		parameter: [
			{
				pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
				lookbehind: !0,
				inside: n.languages.javascript
			},
			{
				pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
				lookbehind: !0,
				inside: n.languages.javascript
			},
			{
				pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
				lookbehind: !0,
				inside: n.languages.javascript
			},
			{
				pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
				lookbehind: !0,
				inside: n.languages.javascript
			}
		],
		constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
	}), n.languages.insertBefore("javascript", "string", {
		hashbang: {
			pattern: /^#!.*/,
			greedy: !0,
			alias: "comment"
		},
		"template-string": {
			pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
			greedy: !0,
			inside: {
				"template-punctuation": {
					pattern: /^`|`$/,
					alias: "string"
				},
				interpolation: {
					pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
					lookbehind: !0,
					inside: {
						"interpolation-punctuation": {
							pattern: /^\$\{|\}$/,
							alias: "punctuation"
						},
						rest: n.languages.javascript
					}
				},
				string: /[\s\S]+/
			}
		},
		"string-property": {
			pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
			lookbehind: !0,
			greedy: !0,
			alias: "property"
		}
	}), n.languages.insertBefore("javascript", "operator", { "literal-property": {
		pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
		lookbehind: !0,
		alias: "property"
	} }), n.languages.markup && (n.languages.markup.tag.addInlined("script", "javascript"), n.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")), n.languages.js = n.languages.javascript, (function() {
		if (n === void 0 || typeof document > "u") return;
		Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
		var e = "Loading…", t = function(e, t) {
			return "✖ Error " + e + " while fetching file: " + t;
		}, r = "✖ Error: File does not exist or is empty", i = {
			js: "javascript",
			py: "python",
			rb: "ruby",
			ps1: "powershell",
			psm1: "powershell",
			sh: "bash",
			bat: "batch",
			h: "c",
			tex: "latex"
		}, a = "data-src-status", o = "loading", s = "loaded", c = "failed", l = "pre[data-src]:not([" + a + "=\"" + s + "\"]):not([" + a + "=\"" + o + "\"])";
		function u(e, n, i) {
			var a = new XMLHttpRequest();
			a.open("GET", e, !0), a.onreadystatechange = function() {
				a.readyState == 4 && (a.status < 400 && a.responseText ? n(a.responseText) : a.status >= 400 ? i(t(a.status, a.statusText)) : i(r));
			}, a.send(null);
		}
		function d(e) {
			var t = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(e || "");
			if (t) {
				var n = Number(t[1]), r = t[2], i = t[3];
				return r ? i ? [n, Number(i)] : [n, void 0] : [n, n];
			}
		}
		n.hooks.add("before-highlightall", function(e) {
			e.selector += ", " + l;
		}), n.hooks.add("before-sanity-check", function(t) {
			var r = t.element;
			if (r.matches(l)) {
				t.code = "", r.setAttribute(a, o);
				var f = r.appendChild(document.createElement("CODE"));
				f.textContent = e;
				var p = r.getAttribute("data-src"), m = t.language;
				if (m === "none") {
					var h = (/\.(\w+)$/.exec(p) || [, "none"])[1];
					m = i[h] || h;
				}
				n.util.setLanguage(f, m), n.util.setLanguage(r, m);
				var g = n.plugins.autoloader;
				g && g.loadLanguages(m), u(p, function(e) {
					r.setAttribute(a, s);
					var t = d(r.getAttribute("data-range"));
					if (t) {
						var i = e.split(/\r\n?|\n/g), o = t[0], c = t[1] == null ? i.length : t[1];
						o < 0 && (o += i.length), o = Math.max(0, Math.min(o - 1, i.length)), c < 0 && (c += i.length), c = Math.max(0, Math.min(c, i.length)), e = i.slice(o, c).join("\n"), r.hasAttribute("data-start") || r.setAttribute("data-start", String(o + 1));
					}
					f.textContent = e, n.highlightElement(f);
				}, function(e) {
					r.setAttribute(a, c), f.textContent = e;
				});
			}
		}), n.plugins.fileHighlight = { highlight: function(e) {
			for (var t = (e || document).querySelectorAll(l), r = 0, i; i = t[r++];) n.highlightElement(i);
		} };
		var f = !1;
		n.fileHighlight = function() {
			f ||= (console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."), !0), n.plugins.fileHighlight.highlight.apply(this, arguments);
		};
	})();
})))(), Prism.languages.clike = {
	comment: [{
		pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
		lookbehind: !0,
		greedy: !0
	}, {
		pattern: /(^|[^\\:])\/\/.*/,
		lookbehind: !0,
		greedy: !0
	}],
	string: {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: !0
	},
	"class-name": {
		pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
		lookbehind: !0,
		inside: { punctuation: /[.\\]/ }
	},
	keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
	boolean: /\b(?:false|true)\b/,
	function: /\b\w+(?=\()/,
	number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
	operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	punctuation: /[{}[\];(),.:]/
}, Prism.languages.javascript = Prism.languages.extend("clike", {
	"class-name": [Prism.languages.clike["class-name"], {
		pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
		lookbehind: !0
	}],
	keyword: [{
		pattern: /((?:^|\})\s*)catch\b/,
		lookbehind: !0
	}, {
		pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
		lookbehind: !0
	}],
	function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	number: {
		pattern: RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"),
		lookbehind: !0
	},
	operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
}), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
	regex: {
		pattern: RegExp("((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)\\/(?:(?:\\[(?:[^\\]\\\\\\r\\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\\r\\n])+\\/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\\r\\n]|\\\\.|\\[(?:[^[\\]\\\\\\r\\n]|\\\\.|\\[(?:[^[\\]\\\\\\r\\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\\r\\n])+\\/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|\\/\\*(?:[^*]|\\*(?!\\/))*\\*\\/)*(?:$|[\\r\\n,.;:})\\]]|\\/\\/))"),
		lookbehind: !0,
		greedy: !0,
		inside: {
			"regex-source": {
				pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
				lookbehind: !0,
				alias: "language-regex",
				inside: Prism.languages.regex
			},
			"regex-delimiter": /^\/|\/$/,
			"regex-flags": /^[a-z]+$/
		}
	},
	"function-variable": {
		pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
		alias: "function"
	},
	parameter: [
		{
			pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
			lookbehind: !0,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
			lookbehind: !0,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
			lookbehind: !0,
			inside: Prism.languages.javascript
		},
		{
			pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
			lookbehind: !0,
			inside: Prism.languages.javascript
		}
	],
	constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
}), Prism.languages.insertBefore("javascript", "string", {
	hashbang: {
		pattern: /^#!.*/,
		greedy: !0,
		alias: "comment"
	},
	"template-string": {
		pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
		greedy: !0,
		inside: {
			"template-punctuation": {
				pattern: /^`|`$/,
				alias: "string"
			},
			interpolation: {
				pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
				lookbehind: !0,
				inside: {
					"interpolation-punctuation": {
						pattern: /^\$\{|\}$/,
						alias: "punctuation"
					},
					rest: Prism.languages.javascript
				}
			},
			string: /[\s\S]+/
		}
	},
	"string-property": {
		pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
		lookbehind: !0,
		greedy: !0,
		alias: "property"
	}
}), Prism.languages.insertBefore("javascript", "operator", { "literal-property": {
	pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
	lookbehind: !0,
	alias: "property"
} }), Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")), Prism.languages.js = Prism.languages.javascript, Prism.languages.markup = {
	comment: {
		pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
		greedy: !0
	},
	prolog: {
		pattern: /<\?[\s\S]+?\?>/,
		greedy: !0
	},
	doctype: {
		pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
		greedy: !0,
		inside: {
			"internal-subset": {
				pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
				lookbehind: !0,
				greedy: !0,
				inside: null
			},
			string: {
				pattern: /"[^"]*"|'[^']*'/,
				greedy: !0
			},
			punctuation: /^<!|>$|[[\]]/,
			"doctype-tag": /^DOCTYPE/i,
			name: /[^\s<>'"]+/
		}
	},
	cdata: {
		pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
		greedy: !0
	},
	tag: {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: !0,
		inside: {
			tag: {
				pattern: /^<\/?[^\s>\/]+/,
				inside: {
					punctuation: /^<\/?/,
					namespace: /^[^\s>\/:]+:/
				}
			},
			"special-attr": [],
			"attr-value": {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: { punctuation: [{
					pattern: /^=/,
					alias: "attr-equals"
				}, {
					pattern: /^(\s*)["']|["']$/,
					lookbehind: !0
				}] }
			},
			punctuation: /\/?>/,
			"attr-name": {
				pattern: /[^\s>\/]+/,
				inside: { namespace: /^[^\s>\/:]+:/ }
			}
		}
	},
	entity: [{
		pattern: /&[\da-z]{1,8};/i,
		alias: "named-entity"
	}, /&#x?[\da-f]{1,8};/i]
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", function(e) {
	e.type === "entity" && (e.attributes.title = e.content.replace(/&amp;/, "&"));
}), Object.defineProperty(Prism.languages.markup.tag, "addInlined", { value: function(e, t) {
	var n = {};
	n["language-" + t] = {
		pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
		lookbehind: !0,
		inside: Prism.languages[t]
	}, n.cdata = /^<!\[CDATA\[|\]\]>$/i;
	var r = { "included-cdata": {
		pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
		inside: n
	} };
	r["language-" + t] = {
		pattern: /[\s\S]+/,
		inside: Prism.languages[t]
	};
	var i = {};
	i[e] = {
		pattern: RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[\\s\\S])*?(?=<\\/__>)".replace(/__/g, function() {
			return e;
		}), "i"),
		lookbehind: !0,
		greedy: !0,
		inside: r
	}, Prism.languages.insertBefore("markup", "cdata", i);
} }), Object.defineProperty(Prism.languages.markup.tag, "addAttribute", { value: function(e, t) {
	Prism.languages.markup.tag.inside["special-attr"].push({
		pattern: RegExp("(^|[\"'\\s])(?:" + e + ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))", "i"),
		lookbehind: !0,
		inside: {
			"attr-name": /^[^\s=]+/,
			"attr-value": {
				pattern: /=[\s\S]+/,
				inside: {
					value: {
						pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
						lookbehind: !0,
						alias: [t, "language-" + t],
						inside: Prism.languages[t]
					},
					punctuation: [{
						pattern: /^=/,
						alias: "attr-equals"
					}, /"|'/]
				}
			}
		}
	});
} }), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml, (function(e) {
	function t(e) {
		return e = e.replace(/<inner>/g, function() {
			return "(?:\\\\.|[^\\\\\\n\\r]|(?:\\n|\\r\\n?)(?![\\r\\n]))";
		}), RegExp("((?:^|[^\\\\])(?:\\\\{2})*)(?:" + e + ")");
	}
	var n = "(?:\\\\.|``(?:[^`\\r\\n]|`(?!`))+``|`[^`\\r\\n]+`|[^\\\\|\\r\\n`])+", r = "\\|?__(?:\\|__)+\\|?(?:(?:\\n|\\r\\n?)|(?![\\s\\S]))".replace(/__/g, function() {
		return n;
	}), i = "\\|?[ \\t]*:?-{3,}:?[ \\t]*(?:\\|[ \\t]*:?-{3,}:?[ \\t]*)+\\|?(?:\\n|\\r\\n?)";
	e.languages.markdown = e.languages.extend("markup", {}), e.languages.insertBefore("markdown", "prolog", {
		"front-matter-block": {
			pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
			lookbehind: !0,
			greedy: !0,
			inside: {
				punctuation: /^---|---$/,
				"front-matter": {
					pattern: /\S+(?:\s+\S+)*/,
					alias: ["yaml", "language-yaml"],
					inside: e.languages.yaml
				}
			}
		},
		blockquote: {
			pattern: /^>(?:[\t ]*>)*/m,
			alias: "punctuation"
		},
		table: {
			pattern: RegExp("^" + r + i + "(?:" + r + ")*", "m"),
			inside: {
				"table-data-rows": {
					pattern: RegExp("^(" + r + i + ")(?:" + r + ")*$"),
					lookbehind: !0,
					inside: {
						"table-data": {
							pattern: RegExp(n),
							inside: e.languages.markdown
						},
						punctuation: /\|/
					}
				},
				"table-line": {
					pattern: RegExp("^(" + r + ")" + i + "$"),
					lookbehind: !0,
					inside: { punctuation: /\||:?-{3,}:?/ }
				},
				"table-header-row": {
					pattern: RegExp("^" + r + "$"),
					inside: {
						"table-header": {
							pattern: RegExp(n),
							alias: "important",
							inside: e.languages.markdown
						},
						punctuation: /\|/
					}
				}
			}
		},
		code: [{
			pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
			lookbehind: !0,
			alias: "keyword"
		}, {
			pattern: /^```[\s\S]*?^```$/m,
			greedy: !0,
			inside: {
				"code-block": {
					pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
					lookbehind: !0
				},
				"code-language": {
					pattern: /^(```).+/,
					lookbehind: !0
				},
				punctuation: /```/
			}
		}],
		title: [{
			pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
			alias: "important",
			inside: { punctuation: /==+$|--+$/ }
		}, {
			pattern: /(^\s*)#.+/m,
			lookbehind: !0,
			alias: "important",
			inside: { punctuation: /^#+|#+$/ }
		}],
		hr: {
			pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
			lookbehind: !0,
			alias: "punctuation"
		},
		list: {
			pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
			lookbehind: !0,
			alias: "punctuation"
		},
		"url-reference": {
			pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
			inside: {
				variable: {
					pattern: /^(!?\[)[^\]]+/,
					lookbehind: !0
				},
				string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
				punctuation: /^[\[\]!:]|[<>]/
			},
			alias: "url"
		},
		bold: {
			pattern: t("\\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\\b|\\*\\*(?:(?!\\*)<inner>|\\*(?:(?!\\*)<inner>)+\\*)+\\*\\*"),
			lookbehind: !0,
			greedy: !0,
			inside: {
				content: {
					pattern: /(^..)[\s\S]+(?=..$)/,
					lookbehind: !0,
					inside: {}
				},
				punctuation: /\*\*|__/
			}
		},
		italic: {
			pattern: t("\\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\\b|\\*(?:(?!\\*)<inner>|\\*\\*(?:(?!\\*)<inner>)+\\*\\*)+\\*"),
			lookbehind: !0,
			greedy: !0,
			inside: {
				content: {
					pattern: /(^.)[\s\S]+(?=.$)/,
					lookbehind: !0,
					inside: {}
				},
				punctuation: /[*_]/
			}
		},
		strike: {
			pattern: t("(~~?)(?:(?!~)<inner>)+\\2"),
			lookbehind: !0,
			greedy: !0,
			inside: {
				content: {
					pattern: /(^~~?)[\s\S]+(?=\1$)/,
					lookbehind: !0,
					inside: {}
				},
				punctuation: /~~?/
			}
		},
		"code-snippet": {
			pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
			lookbehind: !0,
			greedy: !0,
			alias: ["code", "keyword"]
		},
		url: {
			pattern: t("!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\\t ]+\"(?:\\\\.|[^\"\\\\])*\")?\\)|[ \\t]?\\[(?:(?!\\])<inner>)+\\])"),
			lookbehind: !0,
			greedy: !0,
			inside: {
				operator: /^!/,
				content: {
					pattern: /(^\[)[^\]]+(?=\])/,
					lookbehind: !0,
					inside: {}
				},
				variable: {
					pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
					lookbehind: !0
				},
				url: {
					pattern: /(^\]\()[^\s)]+/,
					lookbehind: !0
				},
				string: {
					pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
					lookbehind: !0
				}
			}
		}
	}), [
		"url",
		"bold",
		"italic",
		"strike"
	].forEach(function(t) {
		[
			"url",
			"bold",
			"italic",
			"strike",
			"code-snippet"
		].forEach(function(n) {
			t !== n && (e.languages.markdown[t].inside.content.inside[n] = e.languages.markdown[n]);
		});
	}), e.hooks.add("after-tokenize", function(e) {
		if (e.language !== "markdown" && e.language !== "md") return;
		function t(e) {
			if (!(!e || typeof e == "string")) for (var n = 0, r = e.length; n < r; n++) {
				var i = e[n];
				if (i.type !== "code") {
					t(i.content);
					continue;
				}
				var a = i.content[1], o = i.content[3];
				if (a && o && a.type === "code-language" && o.type === "code-block" && typeof a.content == "string") {
					var s = a.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp");
					s = (/[a-z][\w-]*/i.exec(s) || [""])[0].toLowerCase();
					var c = "language-" + s;
					o.alias ? typeof o.alias == "string" ? o.alias = [o.alias, c] : o.alias.push(c) : o.alias = [c];
				}
			}
		}
		t(e.tokens);
	}), e.hooks.add("wrap", function(t) {
		if (t.type === "code-block") {
			for (var n = "", r = 0, i = t.classes.length; r < i; r++) {
				var a = t.classes[r], o = /language-(.+)/.exec(a);
				if (o) {
					n = o[1];
					break;
				}
			}
			var s = e.languages[n];
			if (s) t.content = e.highlight(c(t.content), s, n);
			else if (n && n !== "none" && e.plugins.autoloader) {
				var l = "md-" + (/* @__PURE__ */ new Date()).valueOf() + "-" + Math.floor(Math.random() * 0x2386f26fc10000);
				t.attributes.id = l, e.plugins.autoloader.loadLanguages(n, function() {
					var t = document.getElementById(l);
					t && (t.innerHTML = e.highlight(t.textContent, e.languages[n], n));
				});
			}
		}
	});
	var a = RegExp(e.languages.markup.tag.pattern.source, "gi"), o = {
		amp: "&",
		lt: "<",
		gt: ">",
		quot: "\""
	}, s = String.fromCodePoint || String.fromCharCode;
	function c(e) {
		var t = e.replace(a, "");
		return t = t.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function(e, t) {
			return t = t.toLowerCase(), t[0] === "#" ? s(t[1] === "x" ? parseInt(t.slice(2), 16) : Number(t.slice(1))) : o[t] || e;
		}), t;
	}
	e.languages.md = e.languages.markdown;
})(Prism), Prism.languages.c = Prism.languages.extend("clike", {
	comment: {
		pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
		greedy: !0
	},
	string: {
		pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
		greedy: !0
	},
	"class-name": {
		pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
		lookbehind: !0
	},
	keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
	function: /\b[a-z_]\w*(?=\s*\()/i,
	number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
	operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
}), Prism.languages.insertBefore("c", "string", { char: {
	pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,
	greedy: !0
} }), Prism.languages.insertBefore("c", "string", { macro: {
	pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
	lookbehind: !0,
	greedy: !0,
	alias: "property",
	inside: {
		string: [{
			pattern: /^(#\s*include\s*)<[^>]+>/,
			lookbehind: !0
		}, Prism.languages.c.string],
		char: Prism.languages.c.char,
		comment: Prism.languages.c.comment,
		"macro-name": [{
			pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
			lookbehind: !0
		}, {
			pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
			lookbehind: !0,
			alias: "function"
		}],
		directive: {
			pattern: /^(#\s*)[a-z]+/,
			lookbehind: !0,
			alias: "keyword"
		},
		"directive-hash": /^#/,
		punctuation: /##|\\(?=[\r\n])/,
		expression: {
			pattern: /\S[\s\S]*/,
			inside: Prism.languages.c
		}
	}
} }), Prism.languages.insertBefore("c", "function", { constant: /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/ }), delete Prism.languages.c.boolean, (function(e) {
	var t = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
	e.languages.css = {
		comment: /\/\*[\s\S]*?\*\//,
		atrule: {
			pattern: RegExp("@[\\w-](?:[^;{\\s\"']|\\s+(?!\\s)|" + t.source + ")*?(?:;|(?=\\s*\\{))"),
			inside: {
				rule: /^@[\w-]+/,
				"selector-function-argument": {
					pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
					lookbehind: !0,
					alias: "selector"
				},
				keyword: {
					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
					lookbehind: !0
				}
			}
		},
		url: {
			pattern: RegExp("\\burl\\((?:" + t.source + "|(?:[^\\\\\\r\\n()\"']|\\\\[\\s\\S])*)\\)", "i"),
			greedy: !0,
			inside: {
				function: /^url/i,
				punctuation: /^\(|\)$/,
				string: {
					pattern: RegExp("^" + t.source + "$"),
					alias: "url"
				}
			}
		},
		selector: {
			pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + t.source + ")*(?=\\s*\\{)"),
			lookbehind: !0
		},
		string: {
			pattern: t,
			greedy: !0
		},
		property: {
			pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
			lookbehind: !0
		},
		important: /!important\b/i,
		function: {
			pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
			lookbehind: !0
		},
		punctuation: /[(){};:,]/
	}, e.languages.css.atrule.inside.rest = e.languages.css;
	var n = e.languages.markup;
	n && (n.tag.addInlined("style", "css"), n.tag.addAttribute("style", "css"));
})(Prism), Prism.languages.objectivec = Prism.languages.extend("c", {
	string: {
		pattern: /@?"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
		greedy: !0
	},
	keyword: /\b(?:asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|in|inline|int|long|register|return|self|short|signed|sizeof|static|struct|super|switch|typedef|typeof|union|unsigned|void|volatile|while)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
	operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
}), delete Prism.languages.objectivec["class-name"], Prism.languages.objc = Prism.languages.objectivec, Prism.languages.sql = {
	comment: {
		pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
		lookbehind: !0
	},
	variable: [{
		pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
		greedy: !0
	}, /@[\w.$]+/],
	string: {
		pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
		greedy: !0,
		lookbehind: !0
	},
	identifier: {
		pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
		greedy: !0,
		lookbehind: !0,
		inside: { punctuation: /^`|`$/ }
	},
	function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
	keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
	boolean: /\b(?:FALSE|NULL|TRUE)\b/i,
	number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
	operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
	punctuation: /[;[\]()`,.]/
}, (function(e) {
	var t = e.languages.powershell = {
		comment: [{
			pattern: /(^|[^`])<#[\s\S]*?#>/,
			lookbehind: !0
		}, {
			pattern: /(^|[^`])#.*/,
			lookbehind: !0
		}],
		string: [{
			pattern: /"(?:`[\s\S]|[^`"])*"/,
			greedy: !0,
			inside: null
		}, {
			pattern: /'(?:[^']|'')*'/,
			greedy: !0
		}],
		namespace: /\[[a-z](?:\[(?:\[[^\]]*\]|[^\[\]])*\]|[^\[\]])*\]/i,
		boolean: /\$(?:false|true)\b/i,
		variable: /\$\w+\b/,
		function: [/\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|ForEach|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Sort|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Tee|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Where|Write)-[a-z]+\b/i, /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i],
		keyword: /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
		operator: {
			pattern: /(^|\W)(?:!|-(?:b?(?:and|x?or)|as|(?:Not)?(?:Contains|In|Like|Match)|eq|ge|gt|is(?:Not)?|Join|le|lt|ne|not|Replace|sh[lr])\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
			lookbehind: !0
		},
		punctuation: /[|{}[\];(),.]/
	};
	t.string[0].inside = {
		function: {
			pattern: /(^|[^`])\$\((?:\$\([^\r\n()]*\)|(?!\$\()[^\r\n)])*\)/,
			lookbehind: !0,
			inside: t
		},
		boolean: t.boolean,
		variable: t.variable
	};
})(Prism), Prism.languages.python = {
	comment: {
		pattern: /(^|[^\\])#.*/,
		lookbehind: !0,
		greedy: !0
	},
	"string-interpolation": {
		pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
		greedy: !0,
		inside: {
			interpolation: {
				pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
				lookbehind: !0,
				inside: {
					"format-spec": {
						pattern: /(:)[^:(){}]+(?=\}$)/,
						lookbehind: !0
					},
					"conversion-option": {
						pattern: /![sra](?=[:}]$)/,
						alias: "punctuation"
					},
					rest: null
				}
			},
			string: /[\s\S]+/
		}
	},
	"triple-quoted-string": {
		pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
		greedy: !0,
		alias: "string"
	},
	string: {
		pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
		greedy: !0
	},
	function: {
		pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
		lookbehind: !0
	},
	"class-name": {
		pattern: /(\bclass\s+)\w+/i,
		lookbehind: !0
	},
	decorator: {
		pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
		lookbehind: !0,
		alias: ["annotation", "punctuation"],
		inside: { punctuation: /\./ }
	},
	keyword: /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
	builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
	boolean: /\b(?:False|None|True)\b/,
	number: /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
	operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
	punctuation: /[{}[\];(),.:]/
}, Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest = Prism.languages.python, Prism.languages.py = Prism.languages.python, (function(e) {
	for (var t = "\\/\\*(?:[^*/]|\\*(?!\\/)|\\/(?!\\*)|<self>)*\\*\\/", n = 0; n < 2; n++) t = t.replace(/<self>/g, function() {
		return t;
	});
	t = t.replace(/<self>/g, function() {
		return "[^\\s\\S]";
	}), e.languages.rust = {
		comment: [{
			pattern: RegExp("(^|[^\\\\])" + t),
			lookbehind: !0,
			greedy: !0
		}, {
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: !0,
			greedy: !0
		}],
		string: {
			pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
			greedy: !0
		},
		char: {
			pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
			greedy: !0
		},
		attribute: {
			pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
			greedy: !0,
			alias: "attr-name",
			inside: { string: null }
		},
		"closure-params": {
			pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
			lookbehind: !0,
			greedy: !0,
			inside: {
				"closure-punctuation": {
					pattern: /^\||\|$/,
					alias: "punctuation"
				},
				rest: null
			}
		},
		"lifetime-annotation": {
			pattern: /'\w+/,
			alias: "symbol"
		},
		"fragment-specifier": {
			pattern: /(\$\w+:)[a-z]+/,
			lookbehind: !0,
			alias: "punctuation"
		},
		variable: /\$\w+/,
		"function-definition": {
			pattern: /(\bfn\s+)\w+/,
			lookbehind: !0,
			alias: "function"
		},
		"type-definition": {
			pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/,
			lookbehind: !0,
			alias: "class-name"
		},
		"module-declaration": [{
			pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
			lookbehind: !0,
			alias: "namespace"
		}, {
			pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
			lookbehind: !0,
			alias: "namespace",
			inside: { punctuation: /::/ }
		}],
		keyword: [/\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/, /\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/],
		function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
		macro: {
			pattern: /\b\w+!/,
			alias: "property"
		},
		constant: /\b[A-Z_][A-Z_\d]+\b/,
		"class-name": /\b[A-Z]\w*\b/,
		namespace: {
			pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
			inside: { punctuation: /::/ }
		},
		number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,
		boolean: /\b(?:false|true)\b/,
		punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
		operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/
	}, e.languages.rust["closure-params"].inside.rest = e.languages.rust, e.languages.rust.attribute.inside.string = e.languages.rust.string;
})(Prism), Prism.languages.swift = {
	comment: {
		pattern: /(^|[^\\:])(?:\/\/.*|\/\*(?:[^/*]|\/(?!\*)|\*(?!\/)|\/\*(?:[^*]|\*(?!\/))*\*\/)*\*\/)/,
		lookbehind: !0,
		greedy: !0
	},
	"string-literal": [{
		pattern: RegExp("(^|[^\"#])(?:\"(?:\\\\(?:\\((?:[^()]|\\([^()]*\\))*\\)|\\r\\n|[^(])|[^\\\\\\r\\n\"])*\"|\"\"\"(?:\\\\(?:\\((?:[^()]|\\([^()]*\\))*\\)|[^(])|[^\\\\\"]|\"(?!\"\"))*\"\"\")(?![\"#])"),
		lookbehind: !0,
		greedy: !0,
		inside: {
			interpolation: {
				pattern: /(\\\()(?:[^()]|\([^()]*\))*(?=\))/,
				lookbehind: !0,
				inside: null
			},
			"interpolation-punctuation": {
				pattern: /^\)|\\\($/,
				alias: "punctuation"
			},
			punctuation: /\\(?=[\r\n])/,
			string: /[\s\S]+/
		}
	}, {
		pattern: RegExp("(^|[^\"#])(#+)(?:\"(?:\\\\(?:#+\\((?:[^()]|\\([^()]*\\))*\\)|\\r\\n|[^#])|[^\\\\\\r\\n])*?\"|\"\"\"(?:\\\\(?:#+\\((?:[^()]|\\([^()]*\\))*\\)|[^#])|[^\\\\])*?\"\"\")\\2"),
		lookbehind: !0,
		greedy: !0,
		inside: {
			interpolation: {
				pattern: /(\\#+\()(?:[^()]|\([^()]*\))*(?=\))/,
				lookbehind: !0,
				inside: null
			},
			"interpolation-punctuation": {
				pattern: /^\)|\\#+\($/,
				alias: "punctuation"
			},
			string: /[\s\S]+/
		}
	}],
	directive: {
		pattern: RegExp("#(?:(?:elseif|if)\\b(?:[ 	]*(?:![ \\t]*)?(?:\\b\\w+\\b(?:[ \\t]*\\((?:[^()]|\\([^()]*\\))*\\))?|\\((?:[^()]|\\([^()]*\\))*\\))(?:[ \\t]*(?:&&|\\|\\|))?)+|(?:else|endif)\\b)"),
		alias: "property",
		inside: {
			"directive-name": /^#\w+/,
			boolean: /\b(?:false|true)\b/,
			number: /\b\d+(?:\.\d+)*\b/,
			operator: /!|&&|\|\||[<>]=?/,
			punctuation: /[(),]/
		}
	},
	literal: {
		pattern: /#(?:colorLiteral|column|dsohandle|file(?:ID|Literal|Path)?|function|imageLiteral|line)\b/,
		alias: "constant"
	},
	"other-directive": {
		pattern: /#\w+\b/,
		alias: "property"
	},
	attribute: {
		pattern: /@\w+/,
		alias: "atrule"
	},
	"function-definition": {
		pattern: /(\bfunc\s+)\w+/,
		lookbehind: !0,
		alias: "function"
	},
	label: {
		pattern: /\b(break|continue)\s+\w+|\b[a-zA-Z_]\w*(?=\s*:\s*(?:for|repeat|while)\b)/,
		lookbehind: !0,
		alias: "important"
	},
	keyword: /\b(?:Any|Protocol|Self|Type|actor|as|assignment|associatedtype|associativity|async|await|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic|else|enum|extension|fallthrough|fileprivate|final|for|func|get|guard|higherThan|if|import|in|indirect|infix|init|inout|internal|is|isolated|lazy|left|let|lowerThan|mutating|none|nonisolated|nonmutating|open|operator|optional|override|postfix|precedencegroup|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|set|some|static|struct|subscript|super|switch|throw|throws|try|typealias|unowned|unsafe|var|weak|where|while|willSet)\b/,
	boolean: /\b(?:false|true)\b/,
	nil: {
		pattern: /\bnil\b/,
		alias: "constant"
	},
	"short-argument": /\$\d+\b/,
	omit: {
		pattern: /\b_\b/,
		alias: "keyword"
	},
	number: /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
	"class-name": /\b[A-Z](?:[A-Z_\d]*[a-z]\w*)?\b/,
	function: /\b[a-z_]\w*(?=\s*\()/i,
	constant: /\b(?:[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
	operator: /[-+*/%=!<>&|^~?]+|\.[.\-+*/%=!<>&|^~?]+/,
	punctuation: /[{}[\]();,.:\\]/
}, Prism.languages.swift["string-literal"].forEach(function(e) {
	e.inside.interpolation.inside = Prism.languages.swift;
}), (function(e) {
	e.languages.typescript = e.languages.extend("javascript", {
		"class-name": {
			pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
			lookbehind: !0,
			greedy: !0,
			inside: null
		},
		builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
	}), e.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/, /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/, /\btype\b(?=\s*(?:[\{*]|$))/), delete e.languages.typescript.parameter, delete e.languages.typescript["literal-property"];
	var t = e.languages.extend("typescript", {});
	delete t["class-name"], e.languages.typescript["class-name"].inside = t, e.languages.insertBefore("typescript", "function", {
		decorator: {
			pattern: /@[$\w\xA0-\uFFFF]+/,
			inside: {
				at: {
					pattern: /^@/,
					alias: "operator"
				},
				function: /^[\s\S]+/
			}
		},
		"generic-function": {
			pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
			greedy: !0,
			inside: {
				function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
				generic: {
					pattern: /<[\s\S]+/,
					alias: "class-name",
					inside: t
				}
			}
		}
	}), e.languages.ts = e.languages.typescript;
})(Prism), (function(e) {
	var t = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/, n = "(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*", r = {
		pattern: RegExp("(^|[^\\w.])" + n + "[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b"),
		lookbehind: !0,
		inside: {
			namespace: {
				pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
				inside: { punctuation: /\./ }
			},
			punctuation: /\./
		}
	};
	e.languages.java = e.languages.extend("clike", {
		string: {
			pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,
			lookbehind: !0,
			greedy: !0
		},
		"class-name": [
			r,
			{
				pattern: RegExp("(^|[^\\w.])" + n + "[A-Z]\\w*(?=\\s+\\w+\\s*[;,=()]|\\s*(?:\\[[\\s,]*\\]\\s*)?::\\s*new\\b)"),
				lookbehind: !0,
				inside: r.inside
			},
			{
				pattern: RegExp("(\\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\\s+)" + n + "[A-Z]\\w*\\b"),
				lookbehind: !0,
				inside: r.inside
			}
		],
		keyword: t,
		function: [e.languages.clike.function, {
			pattern: /(::\s*)[a-z_]\w*/,
			lookbehind: !0
		}],
		number: /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
		operator: {
			pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
			lookbehind: !0
		},
		constant: /\b[A-Z][A-Z_\d]+\b/
	}), e.languages.insertBefore("java", "string", {
		"triple-quoted-string": {
			pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
			greedy: !0,
			alias: "string"
		},
		char: {
			pattern: /'(?:\\.|[^'\\\r\n]){1,6}'/,
			greedy: !0
		}
	}), e.languages.insertBefore("java", "class-name", {
		annotation: {
			pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
			lookbehind: !0,
			alias: "punctuation"
		},
		generics: {
			pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
			inside: {
				"class-name": r,
				keyword: t,
				punctuation: /[<>(),.:]/,
				operator: /[?&|]/
			}
		},
		import: [{
			pattern: RegExp("(\\bimport\\s+)" + n + "(?:[A-Z]\\w*|\\*)(?=\\s*;)"),
			lookbehind: !0,
			inside: {
				namespace: r.inside.namespace,
				punctuation: /\./,
				operator: /\*/,
				"class-name": /\w+/
			}
		}, {
			pattern: RegExp("(\\bimport\\s+static\\s+)" + n + "(?:\\w+|\\*)(?=\\s*;)"),
			lookbehind: !0,
			alias: "static",
			inside: {
				namespace: r.inside.namespace,
				static: /\b\w+$/,
				punctuation: /\./,
				operator: /\*/,
				"class-name": /\w+/
			}
		}],
		namespace: {
			pattern: RegExp("(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?".replace(/<keyword>/g, function() {
				return t.source;
			})),
			lookbehind: !0,
			inside: { punctuation: /\./ }
		}
	});
})(Prism), (function(e) {
	var t = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/, n = "\\b(?!<keyword>)\\w+(?:\\s*\\.\\s*\\w+)*\\b".replace(/<keyword>/g, function() {
		return t.source;
	});
	e.languages.cpp = e.languages.extend("c", {
		"class-name": [
			{
				pattern: RegExp("(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+".replace(/<keyword>/g, function() {
					return t.source;
				})),
				lookbehind: !0
			},
			/\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
			/\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
			/\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/
		],
		keyword: t,
		number: {
			pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
			greedy: !0
		},
		operator: />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
		boolean: /\b(?:false|true)\b/
	}), e.languages.insertBefore("cpp", "string", {
		module: {
			pattern: RegExp("(\\b(?:import|module)\\s+)(?:\"(?:\\\\(?:\\r\\n|[\\s\\S])|[^\"\\\\\\r\\n])*\"|<[^<>\\r\\n]*>|" + "<mod-name>(?:\\s*:\\s*<mod-name>)?|:\\s*<mod-name>".replace(/<mod-name>/g, function() {
				return n;
			}) + ")"),
			lookbehind: !0,
			greedy: !0,
			inside: {
				string: /^[<"][\s\S]+/,
				operator: /:/,
				punctuation: /\./
			}
		},
		"raw-string": {
			pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
			alias: "string",
			greedy: !0
		}
	}), e.languages.insertBefore("cpp", "keyword", { "generic-function": {
		pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
		inside: {
			function: /^\w+/,
			generic: {
				pattern: /<[\s\S]+/,
				alias: "class-name",
				inside: e.languages.cpp
			}
		}
	} }), e.languages.insertBefore("cpp", "operator", { "double-colon": {
		pattern: /::/,
		alias: "punctuation"
	} }), e.languages.insertBefore("cpp", "class-name", { "base-clause": {
		pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
		lookbehind: !0,
		greedy: !0,
		inside: e.languages.extend("cpp", {})
	} }), e.languages.insertBefore("inside", "double-colon", { "class-name": /\b[a-z_]\w*\b(?!\s*::)/i }, e.languages.cpp["base-clause"]);
})(Prism), (function(e) {
	e.languages.diff = { coord: [
		/^(?:\*{3}|-{3}|\+{3}).*$/m,
		/^@@.*@@$/m,
		/^\d.*$/m
	] };
	var t = {
		"deleted-sign": "-",
		"deleted-arrow": "<",
		"inserted-sign": "+",
		"inserted-arrow": ">",
		unchanged: " ",
		diff: "!"
	};
	Object.keys(t).forEach(function(n) {
		var r = t[n], i = [];
		/^\w+$/.test(n) || i.push(/\w+/.exec(n)[0]), n === "diff" && i.push("bold"), e.languages.diff[n] = {
			pattern: RegExp("^(?:[" + r + "].*(?:\r\n?|\n|(?![\\s\\S])))+", "m"),
			alias: i,
			inside: {
				line: {
					pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/,
					lookbehind: !0
				},
				prefix: {
					pattern: /[\s\S]/,
					alias: /\w+/.exec(n)[0]
				}
			}
		};
	}), Object.defineProperty(e.languages.diff, "PREFIXES", { value: t });
})(Prism), Prism.languages.go = Prism.languages.extend("clike", {
	string: {
		pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,
		lookbehind: !0,
		greedy: !0
	},
	keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
	boolean: /\b(?:_|false|iota|nil|true)\b/,
	number: [
		/\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
		/\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
		/(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i
	],
	operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
	builtin: /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
}), Prism.languages.insertBefore("go", "string", { char: {
	pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/,
	greedy: !0
} }), delete Prism.languages.go["class-name"], globalThis.Prism || window.Prism;
//#endregion
//#region node_modules/@lexical/react/dist/LexicalListPlugin.prod.mjs
function Kv({ hasStrictIndent: e = !1, shouldPreserveNumbering: t = !1 }) {
	let [n] = b();
	return (0, _.useEffect)(() => {
		if (!n.hasNodes([Cg, vg])) throw Error("ListPlugin: ListNode and/or ListItemNode not registered on editor");
	}, [n]), (0, _.useEffect)(() => Xl(Mg(n, { restoreNumbering: t }), e ? Ng(n) : () => {}), [
		n,
		e,
		t
	]), function(e) {
		(0, _.useEffect)(() => Mg(e), [e]);
	}(n), null;
}
//#endregion
//#region node_modules/@lexical/react/dist/LexicalTabIndentationPlugin.prod.mjs
function qv({ maxIndent: e, $canIndent: t }) {
	let [n] = b();
	return (0, _.useEffect)(() => Rd(n, e, t), [
		n,
		e,
		t
	]), null;
}
//#endregion
//#region node_modules/@lexical/react/dist/LexicalTablePlugin.prod.mjs
function Jv({ hasCellMerge: e = !0, hasCellBackgroundColor: t = !0, hasTabHandler: n = !0, hasHorizontalScroll: r = !1, hasNestedTables: i = !1 }) {
	let [a] = b();
	(0, _.useEffect)(() => {
		Hh(a) !== r && (Uh(a, r), a.update(Oa));
	}, [a, r]);
	let o = function(e) {
		let [t] = (0, _.useState)(() => qu(e));
		return t.peek() !== e && (t.value = e), t;
	}(i);
	return (0, _.useEffect)(() => ng(a, { hasNestedTables: o }), [a, o]), (0, _.useEffect)(() => tg(a, n), [a, n]), (0, _.useEffect)(() => {
		if (!e) return eg(a);
	}, [a, e]), (0, _.useEffect)(() => {
		if (!t) return a.registerNodeTransform(gm, (e) => {
			e.getBackgroundColor() !== null && e.setBackgroundColor(null);
		});
	}, [
		a,
		t,
		e
	]), null;
}
//#endregion
//#region src/plugins/TableActionMenuPlugin.tsx
function Yv(e) {
	return e.ownerDocument.defaultView?.getComputedStyle(e).direction === "rtl";
}
function Xv(e) {
	let [t, n] = (0, _.useState)(null);
	return (0, _.useEffect)(() => {
		let t = e.getRootElement();
		return n(t), e.registerRootListener((e) => {
			n(e);
		});
	}, [e]), t;
}
function Zv() {
	let [e] = b(), t = Xv(e), [n, r] = (0, _.useState)(null), [i, a] = (0, _.useState)(null), o = (0, _.useRef)(null), s = (0, _.useRef)(null), c = (0, _.useCallback)(() => {
		r(null), a(null);
	}, []);
	(0, _.useEffect)(() => e.registerUpdateListener(({ editorState: t }) => {
		t.read(() => {
			let t = N();
			if (j(t)) {
				let n = t.anchor.getNode(), r = t.focus.getNode(), i = null, o = n;
				for (; o && !i;) {
					if (o instanceof gm) {
						i = o;
						break;
					}
					let e = o.getParent();
					if (!e) break;
					o = e;
				}
				if (i && n === r) {
					let t = i.getKey(), n = e.getElementByKey(t);
					n && a({
						cellKey: t,
						cellElement: n
					});
				} else a(null);
			} else a(null);
		});
	}), [e]), (0, _.useEffect)(() => {
		if (!t) return;
		let n = (n) => {
			let i = n.target?.closest("td,th");
			if (!i) return;
			n.preventDefault();
			let a = i.getAttribute("data-lexical-node-key");
			a && e.update(() => {
				let e = R(a);
				e && e instanceof gm && e.select();
			});
			let o = t.getBoundingClientRect(), s = n.clientX - o.left, c = n.clientY - o.top;
			s + 200 > o.width - 10 && (s = o.width - 200 - 10), s < 10 && (s = 10), c + 220 > o.height - 10 && (c = o.height - 220 - 10), c < 10 && (c = 10), r({
				x: s,
				y: c,
				cellKey: a
			});
		};
		return t.addEventListener("contextmenu", n), () => t.removeEventListener("contextmenu", n);
	}, [e, t]), (0, _.useEffect)(() => {
		if (!n || !t) return;
		let e = t.ownerDocument, r = (e) => {
			o.current && !e.composedPath().includes(o.current) && c();
		}, i = (e) => {
			e.key === "Escape" && c();
		};
		return e.addEventListener("mousedown", r), e.addEventListener("keydown", i), () => {
			e.removeEventListener("mousedown", r), e.removeEventListener("keydown", i);
		};
	}, [
		n,
		t,
		c
	]);
	let l = (0, _.useCallback)((t) => {
		e.update(() => {
			t();
		}), c();
	}, [e, c]), u = (0, _.useCallback)((e, n) => {
		if (!t) return;
		let i = n.getBoundingClientRect(), a = t.getBoundingClientRect(), o = i.left - a.left, s = i.top - a.top, c = i.right - a.left, l = Yv(t), u = l ? o - 200 - 5 : c + 5, d = s;
		(l ? u < 10 : u + 200 > a.width - 10) && (u = l ? c + 5 : o - 200 - 5), (u < 10 || u + 200 > a.width - 10) && (u = Math.max(10, (a.width - 200) / 2)), d + 220 > a.height - 10 && (d = a.height - 220 - 10), d < 10 && (d = 10), r({
			x: u,
			y: d,
			cellKey: e
		});
	}, [t]);
	return /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [i && !n && t && (() => {
		let e = i.cellElement.getBoundingClientRect(), n = t.getBoundingClientRect(), r = e.top - n.top, a = e.left - n.left, o = e.right - n.left, c = r + i.cellElement.offsetHeight / 2 - 8, l = Yv(t) ? a + 4 : o - 20;
		return l + 16 > n.width - 5 && (l = n.width - 16 - 5), l < 5 && (l = 5), c + 16 > n.height - 5 && (c = n.height - 16 - 5), c < 5 && (c = 5), /* @__PURE__ */ (0, J.jsx)("button", {
			ref: s,
			className: "table-cell-chevron",
			style: {
				position: "absolute",
				top: c,
				left: l,
				zIndex: 1001
			},
			onClick: () => u(i.cellKey, i.cellElement),
			onMouseDown: (e) => e.preventDefault(),
			children: "▼"
		});
	})(), n && t && /* @__PURE__ */ (0, J.jsxs)("div", {
		className: "table-context-menu",
		ref: o,
		style: {
			position: "absolute",
			top: n.y,
			left: n.x,
			zIndex: 1002
		},
		children: [
			/* @__PURE__ */ (0, J.jsxs)("div", {
				className: "menu-section",
				children: [/* @__PURE__ */ (0, J.jsx)("span", {
					className: "section-label",
					children: "Row"
				}), /* @__PURE__ */ (0, J.jsxs)("div", {
					className: "button-row",
					children: [
						/* @__PURE__ */ (0, J.jsx)("button", {
							onClick: () => l(() => Om(!1)),
							children: "+Above"
						}),
						/* @__PURE__ */ (0, J.jsx)("button", {
							onClick: () => l(() => Om(!0)),
							children: "+Below"
						}),
						/* @__PURE__ */ (0, J.jsx)("button", {
							onClick: () => l(() => Mm()),
							children: "Delete"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, J.jsx)("div", { className: "divider" }),
			/* @__PURE__ */ (0, J.jsxs)("div", {
				className: "menu-section",
				children: [/* @__PURE__ */ (0, J.jsx)("span", {
					className: "section-label",
					children: "Column"
				}), /* @__PURE__ */ (0, J.jsxs)("div", {
					className: "button-row",
					children: [
						/* @__PURE__ */ (0, J.jsx)("button", {
							onClick: () => l(() => Am(!1)),
							children: Yv(t) ? "+Right" : "+Left"
						}),
						/* @__PURE__ */ (0, J.jsx)("button", {
							onClick: () => l(() => Am(!0)),
							children: Yv(t) ? "+Left" : "+Right"
						}),
						/* @__PURE__ */ (0, J.jsx)("button", {
							onClick: () => l(() => Nm()),
							children: "Delete"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, J.jsx)("div", { className: "divider" }),
			/* @__PURE__ */ (0, J.jsxs)("div", {
				className: "menu-section",
				children: [/* @__PURE__ */ (0, J.jsx)("span", {
					className: "section-label",
					children: "Table"
				}), /* @__PURE__ */ (0, J.jsx)("div", {
					className: "button-row",
					children: /* @__PURE__ */ (0, J.jsx)("button", {
						className: "danger",
						onClick: () => l(() => {
							let e = n?.cellKey;
							if (!e) return;
							let t = R(e);
							if (t) try {
								let [, , e] = Vm(t);
								e.remove();
							} catch {}
						}),
						children: "Delete"
					})
				})]
			})
		]
	})] });
}
//#endregion
//#region src/markdown/tableTransformer.ts
var Qv = /^\s*\|(.+?)\|\s*$/, $v = /^\s*\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|\s*$/;
function ey(e) {
	return ty(e).map((e) => {
		let t = e.trim();
		return t.startsWith(":") && t.endsWith(":") ? "center" : t.endsWith(":") ? "right" : t.startsWith(":") ? "left" : null;
	});
}
function ty(e) {
	let t = e;
	return t = t.replace(/\\\|/g, ""), t = t.trim(), t.startsWith("|") && (t = t.slice(1)), t.endsWith("|") && (t = t.slice(0, -1)), t.split("|").map((e) => e.replace(/* @__PURE__ */ RegExp("", "g"), "|").trim());
}
function ny(e) {
	return e.replace(/\|/g, "\\|");
}
var ry = /\t/g;
function iy(e) {
	return e.getAllTextNodes().map((e) => {
		let t = e.getTextContent();
		return e.hasFormat("code") && (t = `\`${t}\``), e.hasFormat("bold") && (t = `**${t}**`), e.hasFormat("italic") && (t = `*${t}*`), e.hasFormat("strikethrough") && (t = `~~${t}~~`), t;
	}).join("").trim();
}
function ay(e, t) {
	if (!t) return;
	let n = t === "left" ? "left" : t === "center" ? "center" : t === "right" ? "right" : "";
	n && e.setFormat(n);
}
function oy(e, t, n) {
	e.clear();
	let r = uv.filter((e) => e.type === "text-format" || e.type === "text-match"), i = t.split(ry);
	for (let t of i) {
		let i = t.trim(), a = [];
		if (i) try {
			a = Iv(i, r, !0).filter((e) => e instanceof Ga);
		} catch {
			a = [];
		}
		a.length || (a = [I()], i && a[0].append(mi(i))), a.forEach((t) => {
			ay(t, n), e.append(t);
		});
	}
}
var sy = {
	dependencies: [
		Wh,
		xm,
		gm
	],
	export: (e, t) => {
		if (!(e instanceof Wh)) return null;
		let n = e.getChildren();
		if (!n.length) return null;
		let r = [], i = 0;
		if (n.forEach((e) => {
			if (!(e instanceof xm)) return;
			let n = [];
			e.getChildren().forEach((e) => {
				if (!(e instanceof gm)) return;
				let r = "", i = e.getChildren(), a = [];
				i.forEach((e) => {
					if (e.getType() === "paragraph") {
						let n = t(e);
						n.trim() && a.push(n.trim());
					}
				}), r = a.join("	"), r = r.replace(/\r\n/g, "\n"), r = r.replace(/\r/g, "\n"), r = r.replace(/\n+/g, "	"), r = ny(r), n.push(r.trim());
			}), i = Math.max(i, n.length), r.push(n);
		}), r.forEach((e) => {
			for (; e.length < i;) e.push("");
		}), r.length === 0) return null;
		let a = [], o = n[0];
		for (o && o.getChildren().forEach((e, t) => {
			if (e instanceof gm && t < i) {
				let n = e.getFirstChild();
				if (n instanceof Ga && n.getType() === "paragraph") {
					let e = n.getFormat();
					a[t] = e === 1 || e === 2 || e === 3 ? e : null;
				} else a[t] = null;
			}
		}); a.length < i;) a.push(null);
		let s = (e) => `| ${e.join(" | ")} |`, c = a.map((e) => {
			switch (e) {
				case 1:
				case "left": return ":---";
				case 2:
				case "center": return ":---:";
				case 3:
				case "right": return "---:";
				default: return "---";
			}
		}), l = [], u = r[0];
		return l.push(s(u)), l.push(`| ${c.join(" | ")} |`), r.slice(1).forEach((e) => {
			l.push(s(e));
		}), l.join("\n");
	},
	regExp: /^$/,
	replace: () => !1,
	type: "element"
};
function cy() {
	let e = Yo(), t = 0;
	for (; t < e.getChildrenSize();) {
		let n = e.getChildren(), r = n[t];
		if (!(r instanceof Ga) || r.getType() !== "paragraph") {
			t++;
			continue;
		}
		let i = iy(r), a = n[t + 1];
		if (!Qv.test(i) || !(a instanceof Ga) || a.getType() !== "paragraph") {
			t++;
			continue;
		}
		let o = iy(a);
		if (!$v.test(o)) {
			t++;
			continue;
		}
		let s = [r, a], c = [], l = t + 2;
		for (; l < n.length;) {
			let e = n[l];
			if (!(e instanceof Ga) || e.getType() !== "paragraph") break;
			let t = iy(e);
			if (!Qv.test(t)) break;
			s.push(e), c.push(t), l++;
		}
		let u = ty(i), d = ey(o), f = c.map((e) => ty(e)), p = u.length;
		f.forEach((e) => {
			p = Math.max(p, e.length);
		}), p = Math.max(1, p);
		let m = Tm(Math.max(1, f.length + 1), p, {
			rows: !0,
			columns: !1
		}), h = m.getChildren(), g = h[0];
		if (g) {
			let e = g.getChildren();
			for (let t = 0; t < Math.min(p, e.length); t++) {
				let n = e[t];
				if (n instanceof gm) {
					let e = d[t] || null;
					oy(n, u[t] ?? "", e), n.setHeaderStyles(hm.ROW);
				}
			}
		}
		h.slice(1).forEach((e, t) => {
			let n = f[t] ?? [], r = e.getChildren();
			for (let e = 0; e < Math.min(p, r.length); e++) {
				let t = r[e];
				if (t instanceof gm) {
					let r = d[e] || null;
					oy(t, n[e] ?? "", r);
				}
			}
		}), r.insertBefore(m), s.forEach((e) => e.remove()), t = e.getChildren().indexOf(m) + 1;
	}
}
//#endregion
//#region src/StreamlitLexical.tsx
var ly = "streamlit-lexical-external-update", uy = uv.filter((e) => !(e.type === "text-match" && e.regExp.toString().includes("\\["))), dy = /^\s{0,3}(`{3,}|~{3,})/, fy = /^\s{0,3}(?:#{1,6}(?:\s|$)|>|(?:[-+*]|\d+[.)])\s|\||(?:-{3,}|_{3,}|\*{3,})\s*$)/;
function py(e) {
	let t = e.split("\n"), n = null;
	return t.map((e, r) => {
		let i = e.match(dy);
		if (i) {
			let t = i[1][0];
			return n === null ? n = t : n === t && (n = null), e;
		}
		if (n !== null) return e;
		let a = t[r + 1], o = (e) => !e.trim() || e.startsWith("    ") ? !1 : !fy.test(e);
		return a && o(e) && o(a) && !e.endsWith("\\") && !/ {2,}$/.test(e) ? `${e}  ` : e;
	}).join("\n");
}
function my(e) {
	let t = e.split("\n"), n = null;
	return t.map((e) => {
		let t = e.match(dy);
		if (t) {
			let r = t[1][0];
			return n === null ? n = r : n === r && (n = null), e;
		}
		return n === null ? e.replace(/ {2,}$/, "").replace(/\\$/, "") : e;
	}).join("\n");
}
function hy({ value: e, placeholder: t, debounce: n, minHeight: r, fixedHeight: i, toolbar: a, direction: o, instanceKey: s, setStateValue: c }) {
	let l = (0, _.useRef)(e ?? ""), u = (0, _.useRef)(e ?? ""), d = (0, _.useRef)(!1), f = (0, _.useRef)(null), p = (0, _.useMemo)(() => `StreamlitLexicalEditor-${s}`, [s]), m = (0, _.useMemo)(() => ({
		namespace: p,
		theme: Rg,
		onError: (e) => {
			console.error("Lexical error:", e);
		},
		editorState: () => {
			Fv(my(l.current), [sy, ...uy], void 0, !0), cy();
		},
		nodes: [
			Uv,
			Ep,
			Cp,
			Gg,
			Cg,
			vg,
			Wh,
			xm,
			gm
		]
	}), [p]), h = (0, _.useCallback)((e, t, r) => {
		r.has(ly) || (d.current = !0, e.read(() => {
			let e = py(Lv([sy, ...uy], void 0, !0));
			f.current && clearTimeout(f.current), f.current = setTimeout(() => {
				let t = e ?? "";
				u.current = t, c("value", t);
			}, n);
		}));
	}, [n, c]);
	(0, _.useEffect)(() => () => {
		f.current && clearTimeout(f.current);
	}, []);
	let g = i !== null, v = g ? {
		height: "100%",
		minHeight: 0,
		overflowY: "auto"
	} : {
		minHeight: `${r}px`,
		overflowY: "visible"
	}, y = a ?? Fg, b = y.length > 0;
	return /* @__PURE__ */ (0, J.jsx)("div", {
		dir: o,
		className: `streamlit-lexical-editor ${g ? "is-fixed-height" : "is-auto-height"}`,
		style: g ? { height: `${i}px` } : void 0,
		children: /* @__PURE__ */ (0, J.jsxs)(eu, {
			initialConfig: m,
			children: [/* @__PURE__ */ (0, J.jsx)(gy, {
				content: e,
				currentMarkdownRef: u,
				debounceTimerRef: f,
				setStateValue: c,
				isLocalUpdate: d
			}), /* @__PURE__ */ (0, J.jsxs)("div", {
				className: `editor-container ${b ? "with-toolbar" : "without-toolbar"}`,
				children: [b && /* @__PURE__ */ (0, J.jsx)(Lg, { tools: y }), /* @__PURE__ */ (0, J.jsxs)("div", {
					className: "editor-inner",
					children: [
						/* @__PURE__ */ (0, J.jsx)(Yp, {
							contentEditable: /* @__PURE__ */ (0, J.jsx)(tm, {
								className: "editor-input",
								style: v
							}),
							placeholder: /* @__PURE__ */ (0, J.jsx)(_y, { text: t }),
							ErrorBoundary: pm
						}),
						/* @__PURE__ */ (0, J.jsx)(lm, {}),
						/* @__PURE__ */ (0, J.jsx)(zv, { transformers: [sy, ...uy] }),
						/* @__PURE__ */ (0, J.jsx)(Kv, {}),
						/* @__PURE__ */ (0, J.jsx)(qv, {}),
						/* @__PURE__ */ (0, J.jsx)(Jv, {}),
						/* @__PURE__ */ (0, J.jsx)(Zv, {}),
						/* @__PURE__ */ (0, J.jsx)(dm, { onChange: h })
					]
				})]
			})]
		}, p)
	});
}
function gy({ content: e, currentMarkdownRef: t, debounceTimerRef: n, setStateValue: r, isLocalUpdate: i }) {
	let [a] = b(), o = (0, _.useRef)(e);
	return (0, _.useEffect)(() => {
		if (e === null) {
			i.current = !1;
			return;
		}
		if (i.current) {
			i.current = !1, o.current = e;
			return;
		}
		e === o.current || e === t.current || (o.current = e, n.current &&= (clearTimeout(n.current), null), a.update(() => {
			Yo().clear(), e && (Fv(my(e), [sy, ...uy], void 0, !0), cy()), a.dispatchCommand(tr, void 0), t.current = e;
		}, {
			onUpdate: () => {
				r("value", e);
			},
			tag: [ly, Kr]
		}));
	}, [
		a,
		e,
		t,
		n,
		r,
		i
	]), null;
}
function _y({ text: e }) {
	return /* @__PURE__ */ (0, J.jsx)("div", {
		className: "editor-placeholder",
		children: e
	});
}
//#endregion
//#region src/index.tsx
var vy = /* @__PURE__ */ new WeakMap();
function yy(e) {
	let t = "host" in e ? e.host : e;
	return t.ownerDocument.defaultView?.getComputedStyle(t).direction === "rtl" ? "rtl" : "ltr";
}
var by = ({ data: e, key: t, parentElement: n, setStateValue: r }) => {
	let i = n.querySelector(".streamlit-lexical-react-root");
	if (!i) throw Error("Streamlit Lexical React root element was not found.");
	let a = vy.get(n);
	a && a.element !== i && (a.root.unmount(), vy.delete(n), a = void 0), a || (a = {
		element: i,
		generation: 0,
		root: (0, g.createRoot)(i)
	}, vy.set(n, a));
	let o = a.generation + 1;
	return a.generation = o, a.root.render(/* @__PURE__ */ (0, J.jsx)(_.StrictMode, { children: /* @__PURE__ */ (0, J.jsx)(hy, {
		...e,
		direction: yy(n),
		instanceKey: t,
		setStateValue: r
	}) })), () => {
		let e = vy.get(n);
		e !== a || e.generation !== o || (e.root.unmount(), vy.delete(n));
	};
};
//#endregion
export { by as default };
