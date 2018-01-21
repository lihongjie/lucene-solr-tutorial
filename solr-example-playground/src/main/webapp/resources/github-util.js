define("github/features", ["exports", "./metadata"], function (e, t) {
    function n(e) {
        return r || (r = t.getMetadataByName(document, "enabled-features").split(",")), -1 !== r.indexOf(e)
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.isFeatureEnabled = n;
    var r = void 0
}), define("github/accessibility", ["exports", "./inspect"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e) {
        e.prototype = new Error, e.prototype.constructor = e
    }

    function a(e) {
        this.name = "ImageWithoutAltAttributeError", this.stack = (new Error).stack, this.element = e, this.message = "Missing alt attribute on " + h["default"](e)
    }

    function i(e) {
        this.name = "ElementWithoutLabelError", this.stack = (new Error).stack, this.element = e, this.message = "Missing text, title, or aria-label attribute on " + h["default"](e)
    }

    function o(e) {
        this.name = "LinkWithoutLabelOrRoleError", this.stack = (new Error).stack, this.element = e, this.message = "Missing href or role=button on " + h["default"](e)
    }

    function s(e) {
        this.name = "LabelMissingControl", this.stack = (new Error).stack, this.element = e, this.message = "Label missing control on " + h["default"](e)
    }

    function u(e) {
        this.name = "ButtonWithoutLabelError", this.stack = (new Error).stack, this.element = e, this.message = "Missing text or aria-label attribute on " + h["default"](e)
    }

    function l(e) {
        return "true" === e.getAttribute("aria-hidden") || e.closest('[aria-hidden="true"]')
    }

    function c(e) {
        return "string" == typeof e && !!e.trim()
    }

    function d(e) {
        switch (e.nodeType) {
            case Node.ELEMENT_NODE:
                if (c(e.getAttribute("alt")) || c(e.getAttribute("aria-label")) || c(e.getAttribute("title")))return !0;
                var t = !0, n = !1, r = void 0;
                try {
                    for (var a, i = e.childNodes[Symbol.iterator](); !(t = (a = i.next()).done); t = !0) {
                        var o = a.value;
                        if (d(o))return !0
                    }
                } catch (s) {
                    n = !0, r = s
                } finally {
                    try {
                        !t && i["return"] && i["return"]()
                    } finally {
                        if (n)throw r
                    }
                }
                break;
            case Node.TEXT_NODE:
                return c(e.data)
        }
    }

    function f(e, t) {
        var n = !0, r = !1, c = void 0;
        try {
            for (var f, h = e.querySelectorAll("img")[Symbol.iterator](); !(n = (f = h.next()).done); n = !0) {
                var m = f.value;
                m.hasAttribute("alt") || t(new a(m))
            }
        } catch (v) {
            r = !0, c = v
        } finally {
            try {
                !n && h["return"] && h["return"]()
            } finally {
                if (r)throw c
            }
        }
        var p = !0, g = !1, y = void 0;
        try {
            for (var b, j = e.querySelectorAll("a")[Symbol.iterator](); !(p = (b = j.next()).done); p = !0) {
                var w = b.value;
                w.hasAttribute("name") || l(w) || (null == w.getAttribute("href") && "button" !== w.getAttribute("role") ? t(new o(w)) : d(w) || t(new i(w)))
            }
        } catch (v) {
            g = !0, y = v
        } finally {
            try {
                !p && j["return"] && j["return"]()
            } finally {
                if (g)throw y
            }
        }
        var L = !0, S = !1, x = void 0;
        try {
            for (var k, E = e.querySelectorAll("button")[Symbol.iterator](); !(L = (k = E.next()).done); L = !0) {
                var _ = k.value;
                l(_) || d(_) || t(new u(_))
            }
        } catch (v) {
            S = !0, x = v
        } finally {
            try {
                !L && E["return"] && E["return"]()
            } finally {
                if (S)throw x
            }
        }
        var T = !0, q = !1, M = void 0;
        try {
            for (var C, A = e.querySelectorAll("label")[Symbol.iterator](); !(T = (C = A.next()).done); T = !0) {
                var H = C.value, I = H.control || document.getElementById(H.getAttribute("for")) || H.querySelector("input");
                I || t(new s(H), !1)
            }
        } catch (v) {
            q = !0, M = v
        } finally {
            try {
                !T && A["return"] && A["return"]()
            } finally {
                if (q)throw M
            }
        }
        var D = !0, P = !1, R = void 0;
        try {
            for (var N, O = e.querySelectorAll("input[type=text], textarea")[Symbol.iterator](); !(D = (N = O.next()).done); D = !0) {
                var F = N.value;
                !F.labels || F.labels.length || l(F) || F.hasAttribute("aria-label") || t(new i(F))
            }
        } catch (v) {
            P = !0, R = v
        } finally {
            try {
                !D && O["return"] && O["return"]()
            } finally {
                if (P)throw R
            }
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.scanForProblems = f;
    var h = n(t);
    r(a), r(i), r(o), r(s), r(u)
}), define("github/accessibility-report", ["invariant", "./features", "./document-ready", "./failbot", "./accessibility"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e) {
        var t = document.body;
        return u["default"](t), t.classList.contains("zhio") || e.element.classList.contains("zh-login-status") || e.element.closest("#window-resizer-tooltip") || e.element.closest(".octotree_sidebar") || e.element.closest(".markdown-body")
    }

    function s(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0;
        o(e) || (document.querySelector(".js-header-wrapper.stats-ui-enabled") && console.warn(e.name + ": " + e.message), n && t.isFeatureEnabled("ACCESSIBILITY_UI_WARNING") && (e.element.classList.add("accessibility-error"), e.element.addEventListener("click", function () {
            alert("Accessibility: " + e.name + "\n" + e.message + "\n\nFor more information see https://github.com/styleguide/css/principles/accessibility\nSlack #accessibility if you need help resolving this")
        })), t.isFeatureEnabled("LOG_ACCESSIBILITY") && r.reportError(e, {
            bucket: "github-accessibility",
            message: e.message,
            "class": e.name
        }))
    }

    var u = i(e);
    n.ready.then(function () {
        requestIdleCallback(function () {
            a.scanForProblems(document, s)
        })
    }), document.addEventListener("pjax:end", function (e) {
        requestIdleCallback(function () {
            a.scanForProblems(e.target, s)
        })
    })
}), define("github/behaviors/html-validation-polyfill", [], function () {
    !function () {
        function e() {
            if (this instanceof HTMLFormElement || this instanceof HTMLFieldSetElement) {
                var e = !0, t = !1, n = void 0;
                try {
                    for (var r, i = this.elements[Symbol.iterator](); !(e = (r = i.next()).done); e = !0) {
                        var o = r.value;
                        if (!o.checkValidity())return !1
                    }
                } catch (s) {
                    t = !0, n = s
                } finally {
                    try {
                        !e && i["return"] && i["return"]()
                    } finally {
                        if (t)throw n
                    }
                }
                return !0
            }
            if (this instanceof HTMLInputElement && "hidden" === this.type)return !0;
            if (a.get(this))return !1;
            if (this.hasAttribute("required") && !this.value)return !1;
            var u = this.getAttribute("pattern");
            if (null != u && this.value) {
                var l = new RegExp("^(?:" + u + ")$");
                if (0 !== this.value.search(l))return !1
            }
            return !0
        }

        function t() {
            var t = e.call(this);
            if (!t) {
                var n = new CustomEvent("invalid", {bubbles: !1, cancelable: !0});
                this.dispatchEvent(n)
            }
            return t
        }

        function n(e) {
            a.set(this, e)
        }

        var r = document.createElement("input");
        if (!("checkValidity" in r && "setCustomValidity" in r && (r.required = !0, r.value = "hi", r.cloneNode().checkValidity()))) {
            var a = new WeakMap, i = ["HTMLFormElement", "HTMLInputElement", "HTMLTextAreaElement", "HTMLSelectElement", "HTMLButtonElement", "HTMLFieldSetElement", "HTMLOutputElement"], o = !0, s = !1, u = void 0;
            try {
                for (var l, c = i[Symbol.iterator](); !(o = (l = c.next()).done); o = !0) {
                    var d = l.value;
                    window[d] && (window[d].prototype.checkValidity = t, "HTMLFormElement" !== d && (window[d].prototype.setCustomValidity = n))
                }
            } catch (f) {
                s = !0, u = f
            } finally {
                try {
                    !o && c["return"] && c["return"]()
                } finally {
                    if (s)throw u
                }
            }
        }
    }()
}), define("github/behaviors/html-validation", ["../observe", "delegated-events", "../onfocus", "../query-selector", "./html-validation-polyfill"], function (e, t, n, r) {
    function a(e) {
        s.get(e) || (e.addEventListener("change", function () {
            return i(e)
        }), s.set(e, !0))
    }

    function i(e) {
        var t = e.checkValidity(), n = !0, a = !1, i = void 0;
        try {
            for (var o, s = r.querySelectorAll(e, "button[data-disable-invalid]", HTMLButtonElement)[Symbol.iterator](); !(n = (o = s.next()).done); n = !0) {
                var u = o.value;
                u.disabled = !t
            }
        } catch (l) {
            a = !0, i = l
        } finally {
            try {
                !n && s["return"] && s["return"]()
            } finally {
                if (a)throw i
            }
        }
    }

    var o = ["input[pattern]", "input[required]", "textarea[required]", "[data-required-change]"].join(",");
    n.onFocus(o, function (e) {
        function t() {
            var t = e.checkValidity();
            t !== n && e.form && i(e.form), n = t
        }

        var n = e.checkValidity();
        e.addEventListener("input", t), e.addEventListener("blur", function r() {
            e.removeEventListener("input", t), e.removeEventListener("blur", r)
        })
    });
    var s = new WeakMap;
    e.observe("button[data-disable-invalid]", function (e) {
        e.form && (a(e.form), e.disabled = !e.form.checkValidity())
    }, HTMLButtonElement), e.observe("[data-required-change]", function (e) {
        function t() {
            e.setCustomValidity(e.value === e.defaultValue ? "unchanged" : "")
        }

        e.addEventListener("input", t), e.addEventListener("change", t), t(), e.form && i(e.form)
    }), document.addEventListener("reset", function (e) {
        if (e.target instanceof HTMLFormElement) {
            var t = e.target;
            setTimeout(function () {
                return i(t)
            })
        }
    }), t.on("submit", ".js-normalize-submit", function (e) {
        this.checkValidity() || e.preventDefault()
    })
}), define("github/biztools/showcase", ["../typecast", "../fetch", "delegated-events", "../observe"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e, r, a) {
        var i = o["default"](document.querySelector(".js-repo-health-check"), HTMLFormElement), s = o["default"](i.querySelector(".js-repo-health-name"), HTMLInputElement);
        return s.value = a, e.classList.remove("d-none"), e.classList.add("is-loading"), r.setCustomValidity("checking"), n.fire(r, "change"), t.fetchSafeDocumentFragment(document, i.action, {
            method: "POST",
            body: new FormData(i)
        }).then(function (t) {
            var a = o["default"](e.querySelector(".js-repo-health-results"), HTMLElement);
            a.innerHTML = "", a.appendChild(t), e.classList.remove("is-loading"), r.setCustomValidity(""), n.fire(r, "change")
        })
    }

    var o = a(e);
    r.observe(".js-repo-health", function (e) {
        function t() {
            i(e, r, a.value)
        }

        var n = o["default"](e.closest("form"), HTMLFormElement), r = o["default"](n.querySelector(".js-comment-field"), HTMLTextAreaElement), a = o["default"](n.querySelector(".js-repo-name"), HTMLInputElement);
        "hidden" === a.type ? r.addEventListener("focus", t) : a.addEventListener("change", t)
    })
}), define("github/branches", ["delegated-events", "./jquery", "./sliding-promise-queue", "./throttled-input", "./fetch", "./hotkey", "./observe", "./history"], function (e, t, n, r, a, i, o, s) {
    function u(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function l(e) {
        var t = e.form;
        if (e.value.trim()) {
            var n = new URL(t.action, window.location.origin), r = new URLSearchParams(n.search.slice(1));
            return r.append("utf8", t.elements.utf8.value), r.append("query", e.value), n.search = r.toString(), n.toString()
        }
        return t.getAttribute("data-reset-url")
    }

    function c(e) {
        function t() {
            r.classList.remove("is-loading")
        }

        var n = e.form, r = n.closest(".js-branches"), i = r.querySelectorAll(".js-branches-subnav .js-subnav-item"), o = r.querySelector(".js-branches-subnav .js-subnav-item.selected"), u = r.querySelector(".js-branches-subnav .js-branches-all"), c = n.getAttribute("data-results-container");
        v || (v = o);
        var d = e.value.trim(), f = l(e);
        p.push(a.fetchSafeDocumentFragment(document, f)).then(function (e) {
            s.replaceState(null, "", f);
            var t = document.getElementById(c);
            t && (t.innerHTML = "", t.appendChild(e))
        }).then(t, t), r.classList.toggle("is-search-mode", d), r.classList.add("is-loading");
        var h = !0, m = !1, g = void 0;
        try {
            for (var y, b = i[Symbol.iterator](); !(h = (y = b.next()).done); h = !0) {
                var j = y.value;
                j.classList.remove("selected")
            }
        } catch (w) {
            m = !0, g = w
        } finally {
            try {
                !h && b["return"] && b["return"]()
            } finally {
                if (m)throw g
            }
        }
        d ? u.classList.add("selected") : (v.classList.add("selected"), v = null)
    }

    function d(e) {
        var t = e.value.trim();
        e.value = "", t && c(e)
    }

    var f = u(t), h = u(n), m = u(i), v = null, p = new h["default"];
    o.observe(".js-branch-search-field", function (e) {
        r.addThrottledInputEventListener(e, c.bind(null, e)), e.addEventListener("keyup", function (t) {
            "esc" === m["default"](t) && (d(e), e.blur())
        })
    }), f["default"](document).on("submit", ".js-branch-search", !1), e.on("click", ".js-clear-branch-search", function () {
        var t = this.form.querySelector(".js-branch-search-field");
        t.focus(), t.value = "", e.fire(t, "input")
    }), f["default"](document).on("ajaxSend", ".js-branch-destroy, .js-branch-restore", function (e, t) {
        var n = this.matches(".js-branch-destroy"), r = this.closest(".js-branch-row").getAttribute("data-branch-name"), a = this.closest(".js-branches").querySelectorAll(".js-branch-row"), i = Array.from(a).filter(function (e) {
            return e.getAttribute("data-branch-name") === r
        }), o = this.querySelector("button[type=submit]");
        o.blur(), o.classList.remove("tooltipped");
        var s = !0, u = !1, l = void 0;
        try {
            for (var c, d = i[Symbol.iterator](); !(s = (c = d.next()).done); s = !0) {
                var f = c.value;
                f.classList.add("loading")
            }
        } catch (h) {
            u = !0, l = h
        } finally {
            try {
                !s && d["return"] && d["return"]()
            } finally {
                if (u)throw l
            }
        }
        t.done(function () {
            var e = !0, t = !1, r = void 0;
            try {
                for (var a, o = i[Symbol.iterator](); !(e = (a = o.next()).done); e = !0) {
                    var s = a.value;
                    s.classList.toggle("is-deleted", n)
                }
            } catch (u) {
                t = !0, r = u
            } finally {
                try {
                    !e && o["return"] && o["return"]()
                } finally {
                    if (t)throw r
                }
            }
        }).always(function () {
            var e = !0, t = !1, n = void 0;
            try {
                for (var r, a = i[Symbol.iterator](); !(e = (r = a.next()).done); e = !0) {
                    var s = r.value;
                    s.classList.remove("loading")
                }
            } catch (u) {
                t = !0, n = u
            } finally {
                try {
                    !e && a["return"] && a["return"]()
                } finally {
                    if (t)throw n
                }
            }
            o.classList.add("tooltipped")
        })
    }), f["default"](document).on("ajaxError", ".js-branch-destroy, .js-branch-restore", function (e) {
        e.preventDefault(), location.reload()
    })
}), define("github/bulk-actions", ["delegated-events", "./sliding-promise-queue", "./debounce", "./fetch"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        var t, n, a, i, s, u, c, d, f;
        return regeneratorRuntime.async(function (h) {
            for (; ;)switch (h.prev = h.next) {
                case 0:
                    return t = e.target, n = t.querySelector(".js-bulk-actions"), a = Array.from(t.querySelectorAll(".js-bulk-actions-toggle:checked")), i = a.map(function (e) {
                        return e.closest(".js-bulk-actions-item").getAttribute("data-bulk-actions-id")
                    }).sort(), s = t.getAttribute("data-bulk-actions-url"), u = t.getAttribute("data-bulk-actions-parameter"), c = i.map(function (e) {
                        return u + "[]=" + e
                    }).join("&"), d = s + "?" + c, h.next = 10, regeneratorRuntime.awrap(l.push(r.fetchText(d)));
                case 10:
                    f = h.sent, 0 === a.length ? (n.innerHTML = f, o(t)) : (o(t), n.innerHTML = f);
                case 12:
                case"end":
                    return h.stop()
            }
        }, null, this)
    }

    function o(e) {
        var t = document.querySelector(".js-membership-tabs");
        if (t) {
            var n = e.querySelectorAll(".js-bulk-actions-toggle:checked");
            t.classList.toggle("d-none", n.length > 0)
        }
    }

    var s = a(t), u = a(n), l = new s["default"];
    e.on("change", ".js-bulk-actions-toggle", function () {
        var t = this.closest(".js-bulk-actions-container");
        e.fire(t, "bulk-actions:update")
    }), e.on("bulk-actions:update", ".js-bulk-actions-container", u["default"](i, 100))
}), define("github/bust-frames", [], function () {
    top !== window && (alert("For security reasons, framing is not allowed."), top.location.replace(document.location))
}), define("github/collector-api", [], function () {
    function e(e) {
        return console && console.warn ? console.warn(e) : void 0
    }

    var t = {}.hasOwnProperty, n = [].slice, r = {
        host: "collector.githubapp.com",
        type: "page_view",
        dimensions: {},
        measures: {},
        context: {},
        actor: {},
        image: new Image,
        performance: {},
        expectedPerformanceTimingKeys: ["connectEnd", "connectStart", "domComplete", "domContentLoadedEventEnd", "domContentLoadedEventStart", "domInteractive", "domLoading", "domainLookupEnd", "domainLookupStart", "fetchStart", "loadEventEnd", "loadEventStart", "navigationStart", "redirectEnd", "redirectStart", "requestStart", "responseEnd", "responseStart", "secureConnectionStart", "unloadEventEnd", "unloadEventStart"],
        recordPageView: function () {
            return this.applyMetaTags(), null == this.app ? !1 : null == this.host ? (e("Host not set, you are doing something wrong"), !1) : (this.image.src = this._src(), this._clearPerformance(), !0)
        },
        setHost: function (e) {
            return this.host = e
        },
        setApp: function (e) {
            return this.app = e
        },
        setDimensions: function (e) {
            return this.dimensions = e
        },
        addDimensions: function (e) {
            var n = void 0;
            null == this.dimensions && (this.dimensions = {});
            var r = [];
            for (n in e)if (t.call(e, n)) {
                var a = e[n];
                r.push(this.dimensions[n] = a)
            }
            return r
        },
        setMeasures: function (e) {
            return this.measures = e
        },
        addMeasures: function (e) {
            var n = void 0;
            null == this.measures && (this.measures = {});
            var r = [];
            for (n in e)if (t.call(e, n)) {
                var a = e[n];
                r.push(this.measures[n] = a)
            }
            return r
        },
        setContext: function (e) {
            return this.context = e
        },
        addContext: function (e) {
            var n = void 0;
            null == this.context && (this.context = {});
            var r = [];
            for (n in e)if (t.call(e, n)) {
                var a = e[n];
                r.push(this.context[n] = a)
            }
            return r
        },
        setActor: function (e) {
            return this.actor = e
        },
        push: function (e) {
            return this.applyCall(e)
        },
        enablePerformance: function () {
            return this.performance = this._performanceTiming()
        },
        _recordSrc: function (e, t, n, r) {
            return "//" + this.host + "/" + this.app + "/" + e + "?" + this._queryString(t, n, r)
        },
        _src: function () {
            return "//" + this.host + "/" + this.app + "/" + this.type + "?" + this._queryString()
        },
        _queryString: function (e, t, n) {
            var r = void 0, a = void 0, i = function () {
                var e = this._params(), t = [];
                for (r in e)a = e[r], t.push("dimensions[" + r + "]=" + a);
                return t
            }.call(this);
            return i.push(this._encodeObject("dimensions", this._merge(this.dimensions, e))), i.push(this._encodeObject("measures", this._merge(this.measures, t))), null != this.performance && i.push(this._encodeObject("measures", {performance_timing: this.performance})), i.push(this._encodeObject("context", this._merge(this.context, n))), i.push(this._actor()), i.push(this._encodeObject("dimensions", {cid: this._clientId()})), i.join("&")
        },
        _clearPerformance: function () {
            return this.performance = null
        },
        _performanceTiming: function () {
            var e = void 0, t = void 0, n = void 0;
            if (null == window.performance || null == window.performance.timing || null == window.performance.timing.navigationStart)return null;
            var r = {}, a = this.expectedPerformanceTimingKeys;
            for (e = 0, t = a.length; t > e; e++) {
                var i = a[e];
                r[i] = null != (n = window.performance.timing[i]) ? n : 0
            }
            var o = 1, s = [], u = r.navigationStart;
            for (var l in r) {
                var c = r[l], d = 0 === c ? null : c - u;
                s.push(d)
            }
            return o + "-" + s.join("-")
        },
        _params: function () {
            return {
                page: this._encode(this._page()),
                title: this._encode(this._title()),
                referrer: this._encode(this._referrer()),
                user_agent: this._encode(this._agent()),
                screen_resolution: this._encode(this._screenResolution()),
                pixel_ratio: this._encode(this._pixelRatio()),
                browser_resolution: this._encode(this._browserResolution()),
                tz_seconds: this._encode(this._tzSeconds()),
                timestamp: (new Date).getTime()
            }
        },
        _page: function () {
            try {
                return document.location.href
            } catch (e) {
            }
        },
        _title: function () {
            try {
                return document.title
            } catch (e) {
            }
        },
        _referrer: function () {
            var e = void 0;
            e = "";
            try {
                e = window.top.document.referrer
            } catch (t) {
                if (window.parent)try {
                    e = window.parent.document.referrer
                } catch (t) {
                }
            }
            return "" === e && (e = document.referrer), e
        },
        _agent: function () {
            try {
                return navigator.userAgent
            } catch (e) {
            }
        },
        _screenResolution: function () {
            try {
                return screen.width + "x" + screen.height
            } catch (e) {
                return "unknown"
            }
        },
        _pixelRatio: function () {
            return window.devicePixelRatio
        },
        _browserResolution: function () {
            var e = void 0, t = void 0;
            try {
                return t = 0, e = 0, "number" == typeof window.innerWidth ? (t = window.innerWidth, e = window.innerHeight) : null != document.documentElement && null != document.documentElement.clientWidth ? (t = document.documentElement.clientWidth, e = document.documentElement.clientHeight) : null != document.body && null != document.body.clientWidth && (t = document.body.clientWidth, e = document.body.clientHeight), t + "x" + e
            } catch (n) {
                return "unknown"
            }
        },
        _tzSeconds: function () {
            try {
                return -60 * (new Date).getTimezoneOffset()
            } catch (e) {
                return ""
            }
        },
        _merge: function () {
            var e = void 0, t = void 0, r = void 0, a = 1 <= arguments.length ? n.call(arguments, 0) : [], i = {};
            for (e = 0, r = a.length; r > e; e++) {
                var o = a[e];
                for (t in o) {
                    var s = o[t];
                    i[t] = s
                }
            }
            return i
        },
        _encodeObject: function (e, t) {
            var n = void 0, r = void 0, a = void 0, i = [];
            if (null != Array.isArray && Array.isArray(t) || "[object Array]" === Object.prototype.toString.call(t))for (n = 0, r = t.length; r > n; n++) {
                var o = t[n];
                i.push(this._encodeObject(e + "[]", o))
            } else if (t === Object(t))for (a in t)i.push(this._encodeObject(e + "[" + a + "]", t[a])); else i.push(e + "=" + this._encode(t));
            return i.join("&")
        },
        _actor: function () {
            var e = void 0, t = void 0, n = void 0, r = [], a = this.actor;
            for (t in a) {
                var i = a[t], o = "dimensions[actor_" + t + "]";
                if (i.join)for (e = 0, n = i.length; n > e; e++) {
                    var s = i[e];
                    r.push(o + "[]=" + this._encode(s))
                } else r.push(o + "=" + this._encode(i))
            }
            return r.join("&")
        },
        _getCookie: function (e) {
            var t = void 0, n = void 0, r = [], a = document.cookie.split(";");
            for (t = 0, n = a.length; n > t; t++) {
                var i = a[t], o = i.trim().split("=");
                if (!(o.length < 2)) {
                    var s = o[0], u = o[1];
                    s === e && r.push({key: s, value: u})
                }
            }
            return r
        },
        _clientId: function () {
            var e = void 0;
            return e = this._getClientId(), "" === e && (e = this._setClientId()), e
        },
        _getClientId: function () {
            var e = void 0, t = void 0, n = void 0, r = this._getCookie("_octo"), a = [];
            for (t = 0, n = r.length; n > t; t++) {
                var i = r[t], o = i.value.split("."), s = o.shift();
                if ("GH1" === s && o.length > 1) {
                    var u = o.shift().split("-");
                    1 === u.length && (u[1] = "1"), u[0] *= 1, u[1] *= 1, e = o.join("."), a.push([u, e])
                }
            }
            return e = "", a.length > 0 && (e = a.sort().reverse()[0][1]), e
        },
        _setClientId: function () {
            var e = (new Date).getTime(), t = Math.round(Math.random() * (Math.pow(2, 31) - 1)) + "." + Math.round(e / 1e3), n = "GH1.1." + t, r = new Date(e + 63072e6).toUTCString(), a = document.domain;
            if (null == a)throw new Error("Unable to get document domain");
            var i = "." + a.split(".").reverse().slice(0, 2).reverse().join(".");
            return document.cookie = "_octo=" + n + "; expires=" + r + "; path=/; domain=" + i, t
        },
        _encode: function (e) {
            return null != e ? window.encodeURIComponent(e) : ""
        },
        applyQueuedCalls: function (e) {
            var t = void 0, n = void 0, r = [];
            for (t = 0, n = e.length; n > t; t++) {
                var a = e[t];
                r.push(this.applyCall(a))
            }
            return r
        },
        applyCall: function (t) {
            var n = t[0], r = t.slice(1);
            return this[n] ? this[n].apply(this, r) : e(n + " is not a valid method")
        },
        applyMetaTags: function () {
            var e = this.loadMetaTags();
            return e.host && this.setHost(e.host), e.app && this.setApp(e.app), this._objectIsEmpty(e.actor) || this.setActor(e.actor), this.addDimensions(e.dimensions), this.addMeasures(e.measures), this.addContext(e.context)
        },
        loadMetaTags: function () {
            var e = void 0, t = void 0, n = {
                dimensions: {},
                measures: {},
                context: {},
                actor: {}
            }, r = document.getElementsByTagName("meta");
            for (e = 0, t = r.length; t > e; e++) {
                var a = r[e];
                if (a.name && a.content) {
                    var i = a.name.match(this.octolyticsMetaTagName);
                    if (i)switch (i[1]) {
                        case"host":
                            n.host = a.content;
                            break;
                        case"app-id":
                            n.app = a.content;
                            break;
                        case"app":
                            n.app = a.content;
                            break;
                        case"dimension":
                            this._addField(n.dimensions, i[2], a);
                            break;
                        case"measure":
                            this._addField(n.measures, i[2], a);
                            break;
                        case"context":
                            this._addField(n.context, i[2], a);
                            break;
                        case"actor":
                            this._addField(n.actor, i[2], a)
                    }
                }
            }
            return n
        },
        _addField: function (e, t, n) {
            return n.attributes["data-array"] ? (null == e[t] && (e[t] = []), e[t].push(n.content)) : e[t] = n.content
        },
        _objectIsEmpty: function (e) {
            var n = void 0;
            for (n in e)if (t.call(e, n))return !1;
            return !0
        },
        octolyticsMetaTagName: /^octolytics-(host|app-id|app|dimension|measure|context|actor)-?(.*)/
    };
    if (window._octo) {
        if (window._octo.slice) {
            var a = window._octo.slice(0);
            window._octo = r, window._octo.applyQueuedCalls(a)
        }
    } else window._octo = r
}), define("github/community", ["./typecast", "invariant", "./observe", "delegated-events", "./onfocus", "./query-selector"], function (e, t, n, r, a, i) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s(e) {
        var t = e.getAttribute("data-fieldname");
        return d["default"]("string" == typeof t), document.querySelectorAll('span[data-fieldname="' + t + '"]')
    }

    function u(e) {
        var t = e.getAttribute("data-fieldname");
        return d["default"]("string" == typeof t), c["default"](document.getElementById("code_of_conduct[" + t + "]"), HTMLInputElement)
    }

    function l(e, t) {
        if (e.value) {
            var n = !0, r = !1, a = void 0;
            try {
                for (var i, o = t[Symbol.iterator](); !(n = (i = o.next()).done); n = !0) {
                    var s = i.value;
                    s.innerText = e.value
                }
            } catch (u) {
                r = !0, a = u
            } finally {
                try {
                    !n && o["return"] && o["return"]()
                } finally {
                    if (r)throw a
                }
            }
        }
    }

    var c = o(e), d = o(t);
    a.onFocus(".js-coc-form-input", function (e) {
        function t() {
            l(r, a)
        }

        function n(e) {
            var t = !0, n = !1, r = void 0;
            try {
                for (var i, o = a[Symbol.iterator](); !(t = (i = o.next()).done); t = !0) {
                    var s = i.value;
                    s.classList.toggle("CommunityTemplate-highlight--focus", e)
                }
            } catch (u) {
                n = !0, r = u
            } finally {
                try {
                    !t && o["return"] && o["return"]()
                } finally {
                    if (n)throw r
                }
            }
        }

        var r = c["default"](e, HTMLInputElement), a = s(r);
        n(!0), r.addEventListener("input", t), r.addEventListener("blur", function i() {
            n(!1), r.removeEventListener("input", t), r.removeEventListener("blur", i)
        })
    }), r.on("click", ".js-coc-highlight", function () {
        u(this).focus()
    }), n.observe(".js-coc-templates", function () {
        var e = document.querySelector(".new-discussion-timeline");
        e && e.classList.add("p-0");
        var t = !0, n = !1, r = void 0;
        try {
            for (var a, o = i.querySelectorAll(document, ".js-coc-form-input", HTMLInputElement)[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
                var u = a.value, c = s(u);
                l(u, c)
            }
        } catch (d) {
            n = !0, r = d
        } finally {
            try {
                !t && o["return"] && o["return"]()
            } finally {
                if (n)throw r
            }
        }
    })
}), define("github/dashboard", ["./jquery", "./fetch", "./observe"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var a = r(e);
    n.observe(".js-dashboard-deferred-module-content", function (e) {
        t.fetchSafeDocumentFragment(document, e.getAttribute("data-src")).then(function (t) {
            e.replaceWith(t)
        })
    }), a["default"](document).on("navigation:open", ".js-dashboard-content-options", function (e) {
        var t = e.target.getAttribute("data-src"), n = document.createElement("div");
        n.classList.add("js-dashboard-deferred-module-content"), n.setAttribute("data-src", t), n.textContent = "Loading...";
        var r = e.target.closest(".js-dashboard-module").querySelector(".js-dashboard-content-container");
        r instanceof HTMLElement && (r.innerHTML = "", r.appendChild(n))
    })
}), define("github/delegated-account-recovery", ["./fetch", "./form", "invariant", "./observe", "delegated-events", "./sudo"], function (e, t, n, r, a, i) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s(n) {
        var r, a, i, o, s;
        return regeneratorRuntime.async(function (u) {
            for (; ;)switch (u.prev = u.next) {
                case 0:
                    return r = n, l["default"](r instanceof HTMLFormElement), a = document.querySelector(".js-delegated-account-recovery-submit"), l["default"](a instanceof HTMLButtonElement), i = document.querySelector(".js-create-recovery-token-form"), l["default"](i instanceof HTMLFormElement), r.classList.remove("failed"), r.classList.add("loading"), a.disabled = !0, u.prev = 9, u.next = 12, regeneratorRuntime.awrap(e.fetchForm(i));
                case 12:
                    return o = u.sent, u.next = 15, regeneratorRuntime.awrap(o.json());
                case 15:
                    s = u.sent, t.fillFormValues(r, {token: s.token, state: s.state_url}), r.submit(), u.next = 25;
                    break;
                case 20:
                    u.prev = 20, u.t0 = u["catch"](9), r.classList.remove("loading"), r.classList.add("failed"), a.disabled = !1;
                case 25:
                case"end":
                    return u.stop()
            }
        }, null, this, [[9, 20]])
    }

    function u(e) {
        return regeneratorRuntime.async(function (t) {
            for (; ;)switch (t.prev = t.next) {
                case 0:
                    l["default"](e instanceof HTMLFormElement), e.submit();
                case 2:
                case"end":
                    return t.stop()
            }
        }, null, this)
    }

    var l = o(n), c = o(i);
    a.on("submit", ".js-post-recovery-token", function (e) {
        e.preventDefault();
        var t = this;
        c["default"]("low").then(function () {
            s(t)
        })
    }), r.observe("form.js-recovery-provider-auto-redirect", {
        init: function (e) {
            u(e)
        }
    }, HTMLFormElement)
}), define("github/perform-transition", ["exports", "./jquery"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e, t) {
        if (!s)return void t.apply(e);
        var n = o["default"](e).find(".js-transitionable");
        n = n.add(o["default"](e).filter(".js-transitionable"));
        for (var r = function (e, t) {
            var r = n[e], s = o["default"](r), u = a(r);
            s.one("transitionend", function () {
                r.style.display = null, r.style.visibility = null, u && i(r, function () {
                    r.style.height = null
                })
            }), r.style.display = "block", r.style.visibility = "visible", u && i(r, function () {
                r.style.height = s.height() + "px"
            }), r.offsetHeight
        }, u = 0, l = n.length; l > u; u++)r(u, l);
        t.apply(e);
        for (var c = 0, d = n.length; d > c; c++) {
            var f = n[c];
            a(f) && (0 === o["default"](f).height() ? f.style.height = f.scrollHeight + "px" : f.style.height = "0px")
        }
    }

    function a(e) {
        return "height" === o["default"](e).css("transitionProperty")
    }

    function i(e, t) {
        e.style.transition = "none", t(e), e.offsetHeight, e.style.transition = null
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = r;
    var o = n(t), s = "ontransitionend" in window
}), define("github/details", ["exports", "./typecast", "./hash-change", "delegated-events", "./once", "./perform-transition", "./setimmediate"], function (e, t, n, r, a, i, o) {
    function s(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function u(e) {
        var t = e.querySelectorAll("input[autofocus], textarea[autofocus]"), n = t[t.length - 1];
        n && document.activeElement !== n && n.focus()
    }

    function l(e) {
        e.classList.contains("tooltipped") && (e.classList.remove("tooltipped"), m["default"](e, "mouseleave").then(function () {
            return e.classList.add("tooltipped")
        }))
    }

    function c(e) {
        var t = e.closest(".js-edit-repository-meta");
        t && f["default"](t, HTMLFormElement).reset()
    }

    function d(e) {
        var t = e.getAttribute("data-details-container") || ".js-details-container", n = f["default"](e.closest(t), HTMLElement);
        e.getAttribute("data-initial-state") || e.setAttribute("data-initial-state", e.getAttribute("aria-expanded") || "false"), v["default"](n, function () {
            n.classList.toggle("open"), n.classList.toggle("Details--on"), e.setAttribute("aria-expanded", (e.getAttribute("data-initial-state") !== n.classList.contains("Details--on").toString()).toString()), p["default"](function () {
                u(n), l(e), c(e), e.blur && e.blur();
                var t = new CustomEvent("details:toggled", {bubbles: !0, cancelable: !1});
                t.relatedTarget = e, n.dispatchEvent(t)
            })
        })
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.toggleDetailsTarget = d;
    var f = s(t), h = s(n), m = s(a), v = s(i), p = s(o);
    r.on("click", ".js-details-target", function (e) {
        d(this), e.preventDefault()
    }), h["default"](function (e) {
        for (var t = !1, n = e.target; (n = n.parentNode) && n !== document.documentElement;)n.classList.contains("Details-content--shown") && (t = !0), n.classList.contains("js-details-container") && (n.classList.toggle("open", !t), n.classList.toggle("Details--on", !t), t = !1)
    })
}), define("github/sticky", ["exports", "invariant", "./observe"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a() {
        y.length ? i() : o()
    }

    function i() {
        g || (window.addEventListener("resize", u, {passive: !0}), document.addEventListener("scroll", u, {passive: !0}), g = !0)
    }

    function o() {
        window.removeEventListener("resize", u, {passive: !0}), document.removeEventListener("scroll", u, {passive: !0}), g = !1
    }

    function s() {
        u()
    }

    function u() {
        y.forEach(function (e) {
            if (e.element.offsetHeight > 0) {
                var t = e.element, n = e.placeholder, r = e.top, a = t.getBoundingClientRect();
                if (n) {
                    var i = n.getBoundingClientRect();
                    t.classList.contains("is-stuck") ? i.top > parseInt(r) ? d(e) : f(e) : a.top <= parseInt(r) && c(e)
                } else a.top <= parseInt(r) ? c(e) : d(e)
            }
        })
    }

    function l(e) {
        var t = window.getComputedStyle(e), n = t.position;
        return /sticky/.test(n)
    }

    function c(e) {
        var t = e.element, n = e.placeholder, r = e.top;
        if (n) {
            var a = t.getBoundingClientRect();
            t.style.top = r.toString(), t.style.left = a.left + "px", t.style.width = a.width + "px", t.style.marginTop = "0", t.style.position = "fixed", n.style.display = "block"
        }
        t.classList.add("is-stuck")
    }

    function d(e) {
        var t = e.element, n = e.placeholder;
        n && (t.style.position = "static", t.style.marginTop = n.style.marginTop, n.style.display = "none"), t.classList.remove("is-stuck")
    }

    function f(e) {
        var t = e.element, n = e.placeholder, r = e.offsetParent, a = e.top;
        if (n) {
            var i = t.getBoundingClientRect(), o = n.getBoundingClientRect();
            if (t.style.left = o.left + "px", t.style.width = o.width + "px", r) {
                var s = r.getBoundingClientRect();
                s.bottom < i.height + parseInt(a) && (t.style.top = s.bottom - i.height + "px")
            }
        }
    }

    function h(e) {
        if (l(e))return null;
        var t = e.previousElementSibling;
        if (t && t.classList.contains("is-placeholder"))return p["default"](t instanceof HTMLElement, "previousElement must be an HTMLElement"), t;
        var n = document.createElement("div");
        return n.style.visibility = "hidden", n.style.display = "none", n.style.height = window.getComputedStyle(e).height, n.className = e.className, n.classList.remove("js-sticky"), n.classList.add("is-placeholder"), p["default"](e.parentNode, "Element must be inserted into the dom"), e.parentNode.insertBefore(n, e)
    }

    function m(e) {
        var t = h(e), n = window.getComputedStyle(e).position;
        e.style.position = "static";
        var r = e.offsetParent;
        e.style.position = "fixed";
        var a = window.getComputedStyle(e).top, i = {
            element: e,
            placeholder: t,
            offsetParent: r,
            top: "auto" == a ? 0 : a
        };
        e.style.position = n, y.push(i)
    }

    function v(e) {
        var t = y.map(function (e) {
            return e.element
        }).indexOf(e);
        y.splice(t, 1)
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.forceStickyRelayout = s;
    var p = r(t), g = !1, y = [];
    n.observe(".js-sticky", {
        add: function (e) {
            m(e), u(), a()
        }, remove: function (e) {
            v(e), a()
        }
    }, HTMLElement)
}), define("github/sticky-scroll-into-view", ["exports", "./fragment-target", "./sticky"], function (e, t, n) {
    function r(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++)n[t] = e[t];
            return n
        }
        return Array.from(e)
    }

    function a(e) {
        var t = e.ownerDocument;
        e.scrollIntoView(), t.defaultView.scrollBy(0, -o(t))
    }

    function i(e) {
        var n = t.findFragmentTarget(e);
        n && a(n)
    }

    function o(e) {
        n.forceStickyRelayout();
        var t = e.querySelectorAll(".js-sticky-offset-scroll");
        return Math.max.apply(Math, r(Array.from(t).map(function (e) {
            var t = e.getBoundingClientRect(), n = t.top, r = t.height;
            return 0 === n ? r : 0
        })))
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.scrollIntoView = a, e.scrollToFragmentTarget = i, e.computeFixedYOffset = o
}), define("github/diffs/progressive", ["exports", "../fragment-target", "invariant", "../observe", "delegated-events", "../sticky-scroll-into-view"], function (e, t, n, r, a, i) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s(e) {
        var t = u();
        if (t) {
            l(e, t);
            var n = c(e, t);
            n && (i.scrollIntoView(n), v(n))
        }
    }

    function u() {
        return window.location.hash.slice(1)
    }

    function l(e, n) {
        var r = t.findElementByFragmentName(e.ownerDocument, n);
        r && e.contains(r) && i.scrollIntoView(r)
    }

    function c(e, t) {
        var n = d(e, t);
        return n ? n : f(e, t)
    }

    function d(e, t) {
        var n = /^(diff-[0-9a-f]{32})(?:[L|R]\d+)?$/.exec(t);
        if (n) {
            var r = n[1], a = e.querySelector("a[name='" + r + "']");
            if (a) {
                var i = a.nextElementSibling;
                if (i.querySelector(".js-diff-load-container"))return i
            }
        }
    }

    function f(e, t) {
        var n = /^(?:r|commitcomment-)(\d+)$/.exec(t);
        if (n) {
            var r = n[1], a = e.querySelector("#diff-with-comment-" + r);
            if (a) {
                var i = a.closest(".js-file");
                return i
            }
        }
    }

    function h() {
        var e = this;
        e.querySelector(".js-diff-progressive-spinner").classList.add("d-none"), e.querySelector(".js-diff-progressive-retry").classList.remove("d-none")
    }

    function m(e) {
        e.querySelector(".js-diff-progressive-spinner").classList.remove("d-none"), e.querySelector(".js-diff-progressive-retry").classList.add("d-none")
    }

    function v(e) {
        var t = e.querySelector(".js-diff-entry-loader"), n = e.querySelector(".js-diff-placeholder"), r = e.querySelector("button.js-diff-load"), a = e.querySelector(".js-button-text");
        j["default"](t && n), j["default"](r instanceof HTMLButtonElement), j["default"](a instanceof HTMLElement), n.setAttribute("fill", "url('#animated-diff-gradient')"), a.textContent = r.getAttribute("data-disable-with") || "", r.disabled = !0;
        var i = new URL(t.getAttribute("data-fragment-url") || "", window.location.origin);
        return t.src = i.toString(), t.data
    }

    function p() {
        var e = this;
        e.querySelector(".js-diff-load-button-container").classList.add("d-none"), e.querySelector(".js-diff-load-retry").classList.remove("d-none")
    }

    function g(e) {
        e.querySelector(".js-diff-load-button-container").classList.remove("d-none"), e.querySelector(".js-diff-load-retry").classList.add("d-none")
    }

    function y() {
        this.setAttribute("data-url", this.src), this.removeAttribute("src")
    }

    function b(e) {
        e.src = e.getAttribute("data-url"), e.removeAttribute("data-url")
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.loadDiff = v;
    var j = o(n);
    r.observe(".js-diff-progressive-container", function (e) {
        s(e);
        var t = e.querySelector(".js-diff-progressive-loader");
        t && (t.addEventListener("load", function () {
            s(e)
        }), t.addEventListener("error", y), t.addEventListener("error", h))
    }), a.on("click", ".js-diff-progressive-retry .js-retry-button", function () {
        var e = this.closest(".js-diff-progressive-loader");
        m(e), b(e)
    }), r.observe(".js-diff-load-container", function (e) {
        var t = e.querySelector(".js-diff-entry-loader");
        t && (t.addEventListener("load", function () {
            var t = e.closest(".js-file");
            t.classList.remove("hide-file-notes-toggle");
            var n = u();
            n && l(e, n)
        }), t.addEventListener("error", y), t.addEventListener("error", p))
    }), a.on("click", ".js-diff-load", function (e) {
        if (!e.target.classList.contains("js-ignore-this")) {
            var t = this.closest(".js-diff-load-container");
            v(t)
        }
    }), a.on("click", ".js-diff-load-retry .js-retry-button", function () {
        var e = this.closest(".js-diff-entry-loader");
        g(e), b(e)
    })
}), define("github/diffs/prose", ["../jquery", "delegated-events", "../history"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e) {
        var t = new URL(window.location.href, window.location.origin), r = e.closest(".file-header"), a = e.classList.contains("js-rendered"), i = e.classList.contains("js-source");
        t.hash = r.getAttribute("data-anchor"), a ? t.searchParams.set("short_path", r.getAttribute("data-short-path")) : i && t.searchParams["delete"]("short_path"), n.replaceState(null, "", t.toString())
    }

    function i(e) {
        var t = e.closest(".js-prose-diff-toggles"), n = !0, r = !1, a = void 0;
        try {
            for (var i, o = t.querySelectorAll(".btn")[Symbol.iterator](); !(n = (i = o.next()).done); n = !0) {
                var s = i.value;
                s.classList.remove("selected")
            }
        } catch (u) {
            r = !0, a = u
        } finally {
            try {
                !n && o["return"] && o["return"]()
            } finally {
                if (r)throw a
            }
        }
        e.classList.add("selected")
    }

    var o = r(e);
    t.on("click", ".js-prose-diff-toggles .btn", function (e) {
        return this.classList.contains("selected") ? e.preventDefault() : (a(this), void i(this))
    }), o["default"](document).on("ajaxSuccess", ".js-prose-diff-toggles form", function (e, t, n, r) {
        var a = this.closest(".js-details-container"), i = a.querySelector(".js-file-content");
        if (i) {
            for (; i.hasChildNodes();)i.removeChild(i.lastChild);
            i.insertAdjacentHTML("afterbegin", r), a.classList.toggle("display-rich-diff"), a.classList.toggle("show-inline-notes")
        }
    })
}), define("github/diffs/toc-summary", ["delegated-events"], function (e) {
    e.on("click", ".js-toc-include-fragment .js-retry-button", function () {
        var e = this.closest(".js-toc-include-fragment");
        e.classList.remove("is-error");
        var t = e.src;
        e.removeAttribute("src"), e.src = t
    })
}), define("github/button-outline", [], function () {
    function e() {
        n = document.activeElement, document.body && document.body.classList.toggle("chrome-mouse", r)
    }

    var t = /\bChrome\//.test(navigator.userAgent) && !/\bEdge\//.test(navigator.userAgent), n = void 0, r = void 0;
    t && (document.addEventListener("mousedown", function () {
        r = !0, n === document.activeElement && e()
    }, {capture: !0}), document.addEventListener("keydown", function () {
        r = !1
    }, {capture: !0}), document.addEventListener("focusin", e, {capture: !0}))
}), define("github/fixed-offset-fragment-navigation-observer", ["./sticky-scroll-into-view", "./hash-change"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r() {
        e.computeFixedYOffset(document) && e.scrollToFragmentTarget(document)
    }

    var a = n(t);
    a["default"](r)
}), define("github/gfm", ["delegated-events"], function (e) {
    e.on("click", ".email-hidden-toggle", function (e) {
        var t = this.nextElementSibling;
        t.style.display = "", t.classList.toggle("expanded"), e.preventDefault()
    })
}), define("github/git-clone-help", ["delegated-events"], function (e) {
    e.on("click", ".js-git-clone-help-container .js-git-clone-help-switcher", function () {
        var e = this.closest(".js-git-clone-help-container"), t = this.getAttribute("data-url");
        if (e.querySelector(".js-git-clone-help-field").value = t, this.matches(".js-git-protocol-clone-url")) {
            var n = !0, r = !1, a = void 0;
            try {
                for (var i, o = e.querySelectorAll(".js-git-clone-help-text")[Symbol.iterator](); !(n = (i = o.next()).done); n = !0) {
                    var s = i.value;
                    s.textContent = t
                }
            } catch (u) {
                r = !0, a = u
            } finally {
                try {
                    !n && o["return"] && o["return"]()
                } finally {
                    if (r)throw a
                }
            }
        }
        var l = e.querySelector(".js-clone-url-button.selected");
        l && l.classList.remove("selected"), this.closest(".js-clone-url-button").classList.add("selected")
    })
}), define("github/google-analytics-octolytics", ["./google-analytics"], function (e) {
    function t(e) {
        var t = e.get("sendHitTask");
        e.set("sendHitTask", function (e) {
            if (t(e), "event" === e.get("hitType") && null != window._octo)if ("sendBeacon" in navigator) {
                var n = new Blob([e.get("hitPayload")], {type: "application/x-www-form-urlencoded"});
                navigator.sendBeacon("//" + window._octo.host + "/collect", n)
            } else {
                var r = new XMLHttpRequest;
                r.open("POST", "//" + window._octo.host + "/collect", !0), r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), r.send(e.get("hitPayload"))
            }
        })
    }

    e.providePlugin("octolyticsPlugin", t)
}), define("github/google-analytics-overrides", ["exports", "./session-storage", "./google-analytics", "./typecast"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        var t = document.querySelectorAll(e);
        return t.length > 0 ? t[t.length - 1] : void 0
    }

    function o() {
        var e = i("meta[name=analytics-location]");
        return e ? e.content : window.location.pathname
    }

    function s() {
        var e = i("meta[name=analytics-location-query-strip]"), t = "";
        e || (t = window.location.search);
        var n = i("meta[name=analytics-location-params]");
        n && (t += (t ? "&" : "?") + n.content);
        var r = !0, a = !1, o = void 0;
        try {
            for (var s, u = document.querySelectorAll("meta[name=analytics-param-rename]")[Symbol.iterator](); !(r = (s = u.next()).done); r = !0) {
                var l = s.value, c = m["default"](l, HTMLMetaElement).content.split(":", 2);
                t = t.replace(new RegExp("(^|[?&])" + c[0] + "($|=)", "g"), "$1" + c[1] + "$2")
            }
        } catch (d) {
            a = !0, o = d
        } finally {
            try {
                !r && u["return"] && u["return"]()
            } finally {
                if (a)throw o
            }
        }
        return t
    }

    function u() {
        return o() + s()
    }

    function l() {
        var e = document.title, t = i("meta[name=analytics-location]");
        return t && (e = e.replace(/([\w-]+\/)+[\w\.-]+/g, "private/private"), e = e.replace(/gist:[a-f0-9]{32}/g, "gist:private")), e
    }

    function c() {
        var e = window.location.protocol + "//" + window.location.host + u();
        n.setGlobalLocation(e), n.setGlobalTitle(l());
        var r = i("meta[name=analytics-ec-payload]");
        r && d(r.content);
        var a = t.getItem("ga-deferred");
        a && (d(a), t.removeItem("ga-deferred"));
        var o = !0, s = !1, c = void 0;
        try {
            for (var f, h = document.querySelectorAll("meta.js-ga-set")[Symbol.iterator](); !(o = (f = h.next()).done); o = !0) {
                var v = f.value, p = m["default"](v, HTMLMetaElement);
                n.setDimension(p.name, p.content)
            }
        } catch (g) {
            s = !0, c = g
        } finally {
            try {
                !o && h["return"] && h["return"]()
            } finally {
                if (s)throw c
            }
        }
    }

    function d(e) {
        if (e) {
            var t = !0, n = !1, r = void 0;
            try {
                for (var a, i = JSON.parse(e)[Symbol.iterator](); !(t = (a = i.next()).done); t = !0) {
                    var o = a.value;
                    window.ga.apply(null, o)
                }
            } catch (s) {
                n = !0, r = s
            } finally {
                try {
                    !t && i["return"] && i["return"]()
                } finally {
                    if (n)throw r
                }
            }
        }
    }

    function f() {
        var e = !0, t = !1, r = void 0;
        try {
            for (var a, i = document.querySelectorAll("meta[name=analytics-virtual-pageview]")[Symbol.iterator](); !(e = (a = i.next()).done); e = !0) {
                var o = a.value;
                n.trackPageview(m["default"](o, HTMLMetaElement).content, {title: ""})
            }
        } catch (s) {
            t = !0, r = s
        } finally {
            try {
                !e && i["return"] && i["return"]()
            } finally {
                if (t)throw r
            }
        }
        n.trackPageview()
    }

    function h(e) {
        var t = e.trim().split(/\s*,\s*/);
        return {category: t[0], action: t[1], label: t[2], value: t[3]}
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.updateGlobalFields = c, e.applyEcommercePayload = d, e.trackPageviews = f, e.extractEventParams = h;
    var m = a(r)
}), define("github/google-analytics-tracking", ["./google-analytics-overrides", "./google-analytics", "./typecast", "./observe", "delegated-events", "./document-ready", "./session-storage", "./google-analytics-octolytics"], function (e, t, n, r, a, i, o) {
    function s(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var u = s(n), l = document.querySelector("meta[name=google-analytics]");
    l && (t.setGlobalAccount(u["default"](l, HTMLMetaElement).content, "auto"), t.requirePlugin("octolyticsPlugin"), t.requirePlugin("ec"), e.updateGlobalFields()), i.ready.then(function () {
        return e.trackPageviews()
    }), document.addEventListener("pjax:complete", function () {
        setTimeout(function () {
            e.updateGlobalFields(), e.trackPageviews()
        }, 20)
    }, !1), r.observe("[data-ga-load]", function (n) {
        var r = e.extractEventParams(n.getAttribute("data-ga-load"));
        r.interactive = !1, t.trackEvent(r)
    }), r.observe("meta[name=analytics-event]", function (n) {
        var r = e.extractEventParams(n.content);
        r.interactive = !1, t.trackEvent(r)
    }), a.on("click", "[data-ga-click]", function () {
        e.applyEcommercePayload(this.getAttribute("data-ga-ec"));
        var n = e.extractEventParams(this.getAttribute("data-ga-click"));
        t.trackEvent(n)
    }, {capture: !0}), a.on("click", "[data-ga-deferred]", function () {
        o.setItem("ga-deferred", this.getAttribute("data-ga-deferred"))
    }, {capture: !0}), a.on("change", "[data-ga-change]", function () {
        e.applyEcommercePayload(this.getAttribute("data-ga-ec"));
        var n = e.extractEventParams(this.getAttribute("data-ga-change"));
        t.trackEvent(n)
    }, {capture: !0})
}), define("github/homepage/play-video", ["delegated-events"], function (e) {
    function t(e, t) {
        void 0 === t && (t = 0);
        var n = e.getBoundingClientRect(), r = n.top - t, a = n.bottom - window.innerHeight + t;
        0 > r ? window.scrollBy(0, r) : a > 0 && window.scrollBy(0, a)
    }

    e.on("click", ".js-video-play, .js-video-close, .is-expanded", function (e) {
        e.preventDefault();
        var n = this, r = n.classList.contains("js-video-play"), a = n.closest(".js-video-container"), i = a.querySelector(".js-video-iframe"), o = document.querySelector(".js-video-bg");
        r ? i.src = i.getAttribute("data-src") : i.removeAttribute("src"), a.classList.toggle("is-expanded", r), null != o && o.classList.toggle("is-expanded", r), t(i, 20)
    })
}), define("github/legacy/behaviors/ajax-pagination", ["../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("ajaxSuccess", ".js-ajax-pagination", function (e, t, r, a) {
        this.replaceWith.apply(this, n["default"].parseHTML(a))
    })
}), define("github/legacy/behaviors/ajax_error", ["../../jquery", "../../inspect", "../../failbot"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e, t) {
        if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function o(e, t) {
        if ("function" != typeof t && null !== t)throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function s() {
        var e = document.getElementById("ajax-error-message");
        e && e.classList.add("visible")
    }

    function u() {
        var e = document.getElementById("ajax-error-message");
        e && e.classList.remove("visible")
    }

    var l = r(e), c = r(t), d = function (e) {
        function t(e) {
            a(this, t);
            var n = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
            return n.name = "DataRemoteError", n.message = e, n
        }

        return o(t, e), t
    }(Error);
    l["default"](document).on("ajaxError", "[data-remote]", function (e, t, r, a) {
        var i = void 0, o = void 0, u = void 0, l = void 0;
        if (this === e.target && "abort" !== a && "canceled" !== a) {
            var f = "." + this.className.split(" ").sort().join("."), h = new d(a + " (" + t.status + ") from " + f);
            if (n.reportError(h, {
                    dataRemote: {
                        target: c["default"](this),
                        method: null != (i = this.getAttribute("method")) ? i : "GET",
                        url: null != (o = null != (u = this.href) ? u : this.action) ? o : window.location.href,
                        dataType: null != (l = this.getAttribute("data-type")) ? l : "intelligent guess"
                    }
                }), /<html/.test(t.responseText))throw s(), e.stopImmediatePropagation(), h;
            return setTimeout(function () {
                if (!e.isDefaultPrevented())throw s(), h
            }, 0)
        }
    }), l["default"](document).on("ajaxSend", "[data-remote]", function () {
        u()
    }), l["default"](document).on("click", ".js-ajax-error-dismiss", function () {
        u()
    })
}), define("github/legacy/behaviors/ajax_loading", ["../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("ajaxSend", "[data-remote]", function (e) {
        return this !== e.target || e.isDefaultPrevented() ? void 0 : n["default"](this).addClass("loading")
    }), n["default"](document).on("ajaxComplete", "[data-remote]", function (e) {
        return this === e.target ? n["default"](this).removeClass("loading") : void 0
    })
}), define("github/legacy/behaviors/analytics", ["../../document-ready"], function (e) {
    e.ready.then(function () {
        window._octo.push(["enablePerformance"]), window._octo.push(["recordPageView"])
    }), document.addEventListener("pjax:complete", function () {
        window._octo.push(["recordPageView"])
    })
}), define("github/legacy/behaviors/autocheck", ["../../throttled-input", "../../jquery", "../../visible", "../../focused", "../../sliding-promise-queue", "delegated-events", "../../fetch"], function (e, t, n, r, a, i, o) {
    function s(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function u(e, t) {
        var n = void 0;
        if ((n = g.get(e)) || (n = new p["default"], g.set(e, n)), t.value.trim()) {
            var r = e.getAttribute("data-autocheck-authenticity-token");
            if (null == r) {
                var a = e.form.querySelector("input[name=authenticity_token]");
                r = null != a ? a.value : void 0
            }
            return t.authenticity_token = r, n.push(o.fetchText(e.getAttribute("data-autocheck-url"), {
                method: "post",
                body: h["default"].param(t),
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            }))
        }
        return Promise.reject(new Error("empty"))
    }

    function l(e) {
        return c(e), e.classList.add("errored"), h["default"](e).find("p.note").hide()
    }

    function c(e) {
        return e.classList.remove("errored"), e.classList.remove("warn"), h["default"](e).find("p.note").show(), h["default"](e).find("dd.error").remove(), h["default"](e).find("dd.warning").remove()
    }

    function d(e) {
        function t(t) {
            return e.classList.toggle("is-autocheck-loading", t), o.closest("dl.form-group").toggleClass("is-loading", t)
        }

        function n() {
            return t(!1), i.fire(e, "autocheck:complete")
        }

        function r(t) {
            e.classList.add("is-autocheck-successful");
            var r = e.closest("dl.form-group");
            return c(r), r.classList.add("successed"), i.fire(e, "autocheck:success", t), n()
        }

        function a(t) {
            var r = e.closest("dl.form-group");
            if ("empty" === t.message) c(r); else if (m["default"](e)) {
                e.classList.add("is-autocheck-errored");
                var a = (null != t.response ? t.response.text() : void 0) || Promise.resolve("Something went wrong");
                a.then(function (n) {
                    /<html/.test(n) && (n = "Something went wrong."), l(r);
                    var a = document.createElement("dd");
                    return a.classList.add("error"), null != t.response && t.response.headers.get("Content-Type").match("text/html") ? a.innerHTML = n : a.textContent = n, r.append(a), i.fire(e, "autocheck:error")
                })
            }
            return n()
        }

        var o = h["default"](e), s = {value: e.value};
        i.fire(e, "autocheck:send", s);
        var d = h["default"].param(s).split("&").sort().join("&");
        return d !== y.get(e) ? (y.set(e, d), o.closest("dl.form-group").removeClass("errored successed"), e.classList.remove("is-autocheck-successful", "is-autocheck-errored"), t(!0), u(e, s).then(r, a)) : void 0
    }

    function f() {
        d(this)
    }

    var h = s(t), m = s(n), v = s(r), p = s(a), g = new WeakMap, y = new WeakMap;
    h["default"](document).on("change", "input[data-autocheck-url]", function () {
        d(this)
    }), v["default"](document, "input[data-autocheck-url]", {
        focusin: function () {
            e.addThrottledInputEventListener(this, f, {wait: 300})
        }, focusout: function () {
            e.removeThrottledInputEventListener(this, f)
        }
    })
}), define("github/legacy/behaviors/autocomplete", ["../../observe", "../../throttled-input", "../../jquery", "../../visible", "../../navigation", "../../sliding-promise-queue", "../../fetch"], function (e, t, n, r, a, i, o) {
    function s(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function u(e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    }

    var l = s(n), c = s(r), d = s(i), f = function () {
        function e() {
            this.onNavigationOpen = u(this.onNavigationOpen, this), this.onNavigationKeyDown = u(this.onNavigationKeyDown, this), this.onInputChange = u(this.onInputChange, this), this.onResultsMouseDown = u(this.onResultsMouseDown, this), this.onInputBlur = u(this.onInputBlur, this), this.onInputFocus = u(this.onInputFocus, this), this.focusedInput = this.focusedResults = null, this.mouseDown = !1, this.fetchQueue = new d["default"]
        }

        return e.prototype.bindEvents = function (e, n) {
            l["default"](e).on("blur", this.onInputBlur), t.addThrottledInputEventListener(e, this.onInputChange), l["default"](n).on("mousedown", this.onResultsMouseDown), l["default"](n).on("navigation:open", "[data-autocomplete-value]", this.onNavigationOpen), l["default"](n).on("navigation:keydown", "[data-autocomplete-value]", this.onNavigationKeyDown)
        }, e.prototype.unbindEvents = function (e, n) {
            l["default"](e).off("blur", this.onInputBlur), t.removeThrottledInputEventListener(e, this.onInputChange), l["default"](n).off("mousedown", this.onResultsMouseDown), l["default"](n).off("navigation:open", "[data-autocomplete-value]", this.onNavigationOpen), l["default"](n).off("navigation:keydown", "[data-autocomplete-value]", this.onNavigationKeyDown)
        }, e.prototype.onInputFocus = function (e) {
            var t = l["default"](e).closest(".js-autocomplete-container"), n = t.find(".js-autocomplete")[0];
            this.focusedInput = e, this.focusedResults = n, this.bindEvents(e, n), l["default"](e).attr("autocomplete", "off"), l["default"](e).trigger("autocomplete:focus"), this.fetchResults(e.value)
        }, e.prototype.onInputBlur = function () {
            var e = this.focusedInput, t = this.focusedResults;
            this.mouseDown || (this.hideResults(), this.inputValue = null, this.focusedInput = this.focusedResults = null, this.unbindEvents(e, t), l["default"](e).trigger("autocomplete:blur"))
        }, e.prototype.onResultsMouseDown = function () {
            this.mouseDown = !0;
            var e = function (t) {
                return function () {
                    return t.mouseDown = !1, l["default"](document).off("mouseup", e)
                }
            }(this);
            l["default"](document).on("mouseup", e)
        }, e.prototype.onInputChange = function (e) {
            var t = e.currentTarget;
            this.inputValue !== t.value && (l["default"](t).removeData("autocompleted"), l["default"](t).trigger("autocomplete:autocompleted:changed")), this.fetchResults(t.value)
        }, e.prototype.fetchResults = function (e) {
            var t = this.focusedResults.getAttribute("data-search-url");
            if (t) {
                var n = l["default"](this.focusedInput).closest(".js-autocomplete-container"), r = e.trim() ? (t += ~t.indexOf("?") ? "&" : "?", t += "q=" + encodeURIComponent(e), n.addClass("is-sending"), o.fetchText(t)) : l["default"](this.focusedResults).find("[data-autocomplete-value]").length > 0 ? this.hideResults() : Promise.resolve("");
                return this.fetchQueue.push(r).then(function (t) {
                    return function (n) {
                        return l["default"](t.focusedResults).find(".js-autocomplete-results").html(n), t.onResultsChange(e)
                    }
                }(this))["catch"](function (e) {
                    return e
                }).then(function () {
                    n.removeClass("is-sending")
                })
            }
        }, e.prototype.onResultsChange = function (e) {
            var t = l["default"](this.focusedResults).find("[data-autocomplete-value]");
            if (0 === t.length) this.hideResults(); else if (this.inputValue !== e && (this.inputValue = e, this.showResults(), l["default"](this.focusedInput).is("[data-autocomplete-autofocus]"))) {
                var n = this.focusedResults.querySelector(".js-navigation-container");
                n && a.focus(n)
            }
        }, e.prototype.onNavigationKeyDown = function (e) {
            switch (e.originalEvent.detail.hotkey) {
                case"tab":
                    return this.onNavigationOpen(e), !1;
                case"esc":
                    return this.hideResults(), !1
            }
        }, e.prototype.onNavigationOpen = function (e) {
            var t = e.currentTarget;
            if (!t.classList.contains("disabled")) {
                var n = l["default"](t).attr("data-autocomplete-value");
                this.inputValue = n, l["default"](this.focusedInput).val(n), l["default"](this.focusedInput).data("autocompleted", n), l["default"](this.focusedInput).trigger("autocomplete:autocompleted:changed", [n]), l["default"](this.focusedInput).trigger("autocomplete:result", [n]), l["default"](t).removeClass("active"), this.focusedInput === document.activeElement ? this.hideResults() : this.onInputBlur()
            }
        }, e.prototype.showResults = function (e, t) {
            var n = void 0, r = void 0;
            if (null == e && (e = this.focusedInput), null == t && (t = this.focusedResults), !c["default"](t)) {
                n = l["default"](e).offset(), r = n.top;
                var i = r + l["default"](e).innerHeight(), o = l["default"](e).innerWidth();
                l["default"](t).css({
                    display: "block",
                    position: "absolute",
                    width: o + 2
                }), l["default"](t).offset({top: i + 5}), l["default"](e).addClass("js-navigation-enable");
                var s = t.querySelector(".js-navigation-container");
                return s && a.push(s), l["default"](t).show()
            }
        }, e.prototype.hideResults = function (e, t) {
            if (null == e && (e = this.focusedInput), null == t && (t = this.focusedResults), this.inputValue = null, t && c["default"](t)) {
                l["default"](e).removeClass("js-navigation-enable");
                var n = t.querySelector(".js-navigation-container");
                return n && a.pop(n), l["default"](t).hide()
            }
        }, e
    }(), h = new f;
    e.observe(".js-autocomplete-field", function (e) {
        e.addEventListener("focus", function () {
            return h.onInputFocus(e)
        }), document.activeElement === e && h.onInputFocus(e)
    })
}), define("github/legacy/behaviors/autosearch_form", ["../../fetch", "../../history", "../../throttled-input", "../../jquery", "../../sliding-promise-queue", "../../focused"], function (e, t, n, r, a, i) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s() {
        var n, r, a, i, o;
        return regeneratorRuntime.async(function (s) {
            for (; ;)switch (s.prev = s.next) {
                case 0:
                    return n = this.form, n.classList.add("is-sending"), s.prev = 2, r = u["default"](n).serialize(), a = (n.action + "&" + r).replace(/[?&]/, "?"), s.next = 7, regeneratorRuntime.awrap(d.push(e.fetchText(a)));
                case 7:
                    return i = s.sent, o = document.getElementById(n.getAttribute("data-results-container")), o && (o.innerHTML = i), s.abrupt("return", t.replaceState(null, "", "?" + r));
                case 11:
                    return s.prev = 11, n.classList.remove("is-sending"), s.finish(11);
                case 14:
                case"end":
                    return s.stop()
            }
        }, null, this, [[2, , 11, 14]])
    }

    var u = o(r), l = o(a), c = o(i), d = new l["default"];
    c["default"](document, ".js-autosearch-field", {
        focusin: function () {
            n.addThrottledInputEventListener(this, s)
        }, focusout: function () {
            n.removeThrottledInputEventListener(this, s)
        }
    })
}), define("github/legacy/behaviors/autosubmit", ["../../form", "../../jquery"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(t);
    r["default"](document).on("change", "form[data-autosubmit]", function () {
        e.submit(this)
    })
}), define("github/legacy/behaviors/billing/addons", ["../../../observe", "../../../throttled-input", "../../../jquery", "../../../visible", "../../../pjax", "../../../history"], function (e, t, n, r, a, i) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s(e) {
        function t(e) {
            var t = void 0;
            u["default"](".js-contact-us").toggleClass("d-none", !l), u["default"](".js-payment-summary").toggleClass("d-none", l), u["default"](".js-billing-section").toggleClass("has-removed-contents", e.free), u["default"](".js-upgrade-info").toggleClass("d-none", 0 >= s), u["default"](".js-downgrade-info").toggleClass("d-none", s >= 0), u["default"](".js-extra-seats-line-item").toggleClass("d-none", e.no_additional_seats);
            var n = e.selectors;
            for (t in n) {
                var r = n[t];
                u["default"](t).text(r)
            }
            return i.replaceState(a.getState(), "", e.url)
        }

        c && c.abort();
        var n = u["default"](e).attr("data-item-name") || "items", r = parseInt(u["default"](e).attr("data-item-minimum")) || 0, o = parseInt(u["default"](e).attr("data-item-count")) || 0, s = Math.max(r, parseInt(e.value) || 0), l = s > 300, d = document.querySelector(".js-purchase-button");
        d instanceof HTMLButtonElement && (d.disabled = 0 === s || l);
        var f = document.querySelector(".js-downgrade-button");
        f instanceof HTMLButtonElement && (f.disabled = s === o);
        var h = {};
        return h[n] = s, c = u["default"].ajax({url: u["default"](e).attr("data-url"), data: h}), c.then(t)
    }

    var u = o(n), l = o(r), c = null;
    e.observe(".js-addon-purchase-field", function (e) {
        l["default"](e) && s(e), t.addThrottledInputEventListener(e, function () {
            s(e)
        })
    }), e.observe(".js-addon-downgrade-field", function (e) {
        l["default"](e) && s(e), u["default"](e).on("change", function () {
            s(e)
        })
    })
}), define.register("jquery.payment"), function () {
    var e = [].slice, t = [].indexOf || function (e) {
            for (var t = 0, n = this.length; n > t; t++)if (t in this && this[t] === e)return t;
            return -1
        };
    define(["jquery"], function (n) {
        var r, a, i, o, s, u, l, c, d, f, h, m, v, p, g, y, b, j, w, L, S, x, k;
        return n.payment = {}, n.payment.fn = {}, n.fn.payment = function () {
            var t, r;
            return r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], n.payment.fn[r].apply(this, t)
        }, o = /(\d{1,4})/g, n.payment.cards = i = [{
            type: "elo",
            patterns: [401178, 401179, 431274, 438935, 451416, 457393, 457631, 457632, 504175, 506699, 5067, 509, 627780, 636297, 636368, 650, 6516, 6550],
            format: o,
            length: [16],
            cvcLength: [3],
            luhn: !0
        }, {
            type: "maestro",
            patterns: [5018, 502, 503, 506, 56, 58, 639, 6220, 67],
            format: o,
            length: [12, 13, 14, 15, 16, 17, 18, 19],
            cvcLength: [3],
            luhn: !0
        }, {
            type: "forbrugsforeningen",
            patterns: [600],
            format: o,
            length: [16],
            cvcLength: [3],
            luhn: !0
        }, {type: "dankort", patterns: [5019], format: o, length: [16], cvcLength: [3], luhn: !0}, {
            type: "visa",
            patterns: [4],
            format: o,
            length: [13, 16],
            cvcLength: [3],
            luhn: !0
        }, {
            type: "mastercard",
            patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
            format: o,
            length: [16],
            cvcLength: [3],
            luhn: !0
        }, {
            type: "amex",
            patterns: [34, 37],
            format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
            length: [15],
            cvcLength: [3, 4],
            luhn: !0
        }, {
            type: "dinersclub",
            patterns: [30, 36, 38, 39],
            format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
            length: [14],
            cvcLength: [3],
            luhn: !0
        }, {
            type: "discover",
            patterns: [60, 64, 65, 622],
            format: o,
            length: [16],
            cvcLength: [3],
            luhn: !0
        }, {
            type: "unionpay",
            patterns: [62, 88],
            format: o,
            length: [16, 17, 18, 19],
            cvcLength: [3],
            luhn: !1
        }, {type: "jcb", patterns: [35], format: o, length: [16], cvcLength: [3], luhn: !0}], r = function (e) {
            var t, n, r, a, o, s, u, l;
            for (e = (e + "").replace(/\D/g, ""), a = 0, s = i.length; s > a; a++)for (t = i[a], l = t.patterns, o = 0, u = l.length; u > o; o++)if (r = l[o], n = r + "", e.substr(0, n.length) === n)return t
        }, a = function (e) {
            var t, n, r;
            for (n = 0, r = i.length; r > n; n++)if (t = i[n], t.type === e)return t
        }, m = function (e) {
            var t, n, r, a, i, o;
            for (r = !0, a = 0, n = (e + "").split("").reverse(), i = 0, o = n.length; o > i; i++)t = n[i], t = parseInt(t, 10), (r = !r) && (t *= 2), t > 9 && (t -= 9), a += t;
            return a % 10 === 0
        }, h = function (e) {
            var t;
            return null != e.prop("selectionStart") && e.prop("selectionStart") !== e.prop("selectionEnd") ? !0 : null != ("undefined" != typeof document && null !== document && null != (t = document.selection) ? t.createRange : void 0) && document.selection.createRange().text ? !0 : !1
        }, x = function (e, t) {
            var n, r, a, i, o, s;
            try {
                r = t.prop("selectionStart")
            } catch (u) {
                i = u, r = null
            }
            return o = t.val(), t.val(e), null !== r && t.is(":focus") ? (r === o.length && (r = e.length), o !== e && (s = o.slice(r - 1, +r + 1 || 9e9), n = e.slice(r - 1, +r + 1 || 9e9), a = e[r], /\d/.test(a) && s === "" + a + " " && n === " " + a && (r += 1)), t.prop("selectionStart", r), t.prop("selectionEnd", r)) : void 0
        }, b = function (e) {
            var t, n, r, a, i, o, s, u;
            for (null == e && (e = ""), r = "\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19", a = "0123456789", o = "", t = e.split(""), s = 0, u = t.length; u > s; s++)n = t[s], i = r.indexOf(n), i > -1 && (n = a[i]), o += n;
            return o
        }, y = function (e) {
            var t;
            return t = n(e.currentTarget), setTimeout(function () {
                var e;
                return e = t.val(), e = b(e), e = e.replace(/\D/g, ""), x(e, t)
            })
        }, p = function (e) {
            var t;
            return t = n(e.currentTarget), setTimeout(function () {
                var e;
                return e = t.val(), e = b(e), e = n.payment.formatCardNumber(e), x(e, t)
            })
        }, l = function (e) {
            var t, a, i, o, s, u, l;
            return i = String.fromCharCode(e.which), !/^\d+$/.test(i) || (t = n(e.currentTarget), l = t.val(), a = r(l + i), o = (l.replace(/\D/g, "") + i).length, u = 16, a && (u = a.length[a.length.length - 1]), o >= u || null != t.prop("selectionStart") && t.prop("selectionStart") !== l.length) ? void 0 : (s = a && "amex" === a.type ? /^(\d{4}|\d{4}\s\d{6})$/ : /(?:^|\s)(\d{4})$/, s.test(l) ? (e.preventDefault(), setTimeout(function () {
                return t.val(l + " " + i)
            })) : s.test(l + i) ? (e.preventDefault(), setTimeout(function () {
                return t.val(l + i + " ")
            })) : void 0)
        }, s = function (e) {
            var t, r;
            return t = n(e.currentTarget), r = t.val(), 8 !== e.which || null != t.prop("selectionStart") && t.prop("selectionStart") !== r.length ? void 0 : /\d\s$/.test(r) ? (e.preventDefault(), setTimeout(function () {
                return t.val(r.replace(/\d\s$/, ""))
            })) : /\s\d?$/.test(r) ? (e.preventDefault(), setTimeout(function () {
                return t.val(r.replace(/\d$/, ""))
            })) : void 0
        }, g = function (e) {
            var t;
            return t = n(e.currentTarget), setTimeout(function () {
                var e;
                return e = t.val(), e = b(e), e = n.payment.formatExpiry(e), x(e, t)
            })
        }, c = function (e) {
            var t, r, a;
            return r = String.fromCharCode(e.which), /^\d+$/.test(r) ? (t = n(e.currentTarget), a = t.val() + r, /^\d$/.test(a) && "0" !== a && "1" !== a ? (e.preventDefault(), setTimeout(function () {
                return t.val("0" + a + " / ")
            })) : /^\d\d$/.test(a) ? (e.preventDefault(), setTimeout(function () {
                var e, n;
                return e = parseInt(a[0], 10), n = parseInt(a[1], 10), n > 2 && 0 !== e ? t.val("0" + e + " / " + n) : t.val("" + a + " / ")
            })) : void 0) : void 0
        }, d = function (e) {
            var t, r, a;
            return r = String.fromCharCode(e.which), /^\d+$/.test(r) ? (t = n(e.currentTarget), a = t.val(), /^\d\d$/.test(a) ? t.val("" + a + " / ") : void 0) : void 0
        }, f = function (e) {
            var t, r, a;
            return a = String.fromCharCode(e.which), "/" === a || " " === a ? (t = n(e.currentTarget), r = t.val(), /^\d$/.test(r) && "0" !== r ? t.val("0" + r + " / ") : void 0) : void 0
        }, u = function (e) {
            var t, r;
            return t = n(e.currentTarget), r = t.val(), 8 !== e.which || null != t.prop("selectionStart") && t.prop("selectionStart") !== r.length ? void 0 : /\d\s\/\s$/.test(r) ? (e.preventDefault(), setTimeout(function () {
                return t.val(r.replace(/\d\s\/\s$/, ""))
            })) : void 0
        }, v = function (e) {
            var t;
            return t = n(e.currentTarget), setTimeout(function () {
                var e;
                return e = t.val(), e = b(e), e = e.replace(/\D/g, "").slice(0, 4), x(e, t)
            })
        }, S = function (e) {
            var t;
            return e.metaKey || e.ctrlKey ? !0 : 32 === e.which ? !1 : 0 === e.which ? !0 : e.which < 33 ? !0 : (t = String.fromCharCode(e.which), !!/[\d\s]/.test(t))
        }, w = function (e) {
            var t, a, i, o;
            return t = n(e.currentTarget), i = String.fromCharCode(e.which), /^\d+$/.test(i) && !h(t) ? (o = (t.val() + i).replace(/\D/g, ""), a = r(o), a ? o.length <= a.length[a.length.length - 1] : o.length <= 16) : void 0
        }, L = function (e) {
            var t, r, a;
            return t = n(e.currentTarget), r = String.fromCharCode(e.which), /^\d+$/.test(r) && !h(t) ? (a = t.val() + r, a = a.replace(/\D/g, ""), a.length > 6 ? !1 : void 0) : void 0
        }, j = function (e) {
            var t, r, a;
            return t = n(e.currentTarget), r = String.fromCharCode(e.which), /^\d+$/.test(r) && !h(t) ? (a = t.val() + r, a.length <= 4) : void 0
        }, k = function (e) {
            var t, r, a, o, s;
            return t = n(e.currentTarget), s = t.val(), o = n.payment.cardType(s) || "unknown", t.hasClass(o) ? void 0 : (r = function () {
                var e, t, n;
                for (n = [], e = 0, t = i.length; t > e; e++)a = i[e], n.push(a.type);
                return n
            }(), t.removeClass("unknown"), t.removeClass(r.join(" ")), t.addClass(o), t.toggleClass("identified", "unknown" !== o), t.trigger("payment.cardType", o))
        }, n.payment.fn.formatCardCVC = function () {
            return this.on("keypress", S), this.on("keypress", j), this.on("paste", v), this.on("change", v), this.on("input", v), this
        }, n.payment.fn.formatCardExpiry = function () {
            return this.on("keypress", S), this.on("keypress", L), this.on("keypress", c), this.on("keypress", f), this.on("keypress", d), this.on("keydown", u), this.on("change", g), this.on("input", g), this
        }, n.payment.fn.formatCardNumber = function () {
            return this.on("keypress", S), this.on("keypress", w), this.on("keypress", l), this.on("keydown", s), this.on("keyup", k), this.on("paste", p), this.on("change", p), this.on("input", p), this.on("input", k), this
        }, n.payment.fn.restrictNumeric = function () {
            return this.on("keypress", S), this.on("paste", y), this.on("change", y), this.on("input", y), this
        }, n.payment.fn.cardExpiryVal = function () {
            return n.payment.cardExpiryVal(n(this).val())
        }, n.payment.cardExpiryVal = function (e) {
            var t, n, r, a;
            return a = e.split(/[\s\/]+/, 2), t = a[0], r = a[1], 2 === (null != r ? r.length : void 0) && /^\d+$/.test(r) && (n = (new Date).getFullYear(), n = n.toString().slice(0, 2), r = n + r), t = parseInt(t, 10), r = parseInt(r, 10), {
                month: t,
                year: r
            }
        }, n.payment.validateCardNumber = function (e) {
            var n, a;
            return e = (e + "").replace(/\s+|-/g, ""), /^\d+$/.test(e) ? (n = r(e), n ? (a = e.length, t.call(n.length, a) >= 0 && (n.luhn === !1 || m(e))) : !1) : !1;
        }, n.payment.validateCardExpiry = function (e, t) {
            var r, a, i;
            return "object" == typeof e && "month" in e && (i = e, e = i.month, t = i.year), e && t ? (e = n.trim(e), t = n.trim(t), /^\d+$/.test(e) && /^\d+$/.test(t) && e >= 1 && 12 >= e ? (2 === t.length && (t = 70 > t ? "20" + t : "19" + t), 4 !== t.length ? !1 : (a = new Date(t, e), r = new Date, a.setMonth(a.getMonth() - 1), a.setMonth(a.getMonth() + 1, 1), a > r)) : !1) : !1
        }, n.payment.validateCardCVC = function (e, r) {
            var i, o;
            return e = n.trim(e), /^\d+$/.test(e) ? (i = a(r), null != i ? (o = e.length, t.call(i.cvcLength, o) >= 0) : e.length >= 3 && e.length <= 4) : !1
        }, n.payment.cardType = function (e) {
            var t;
            return e ? (null != (t = r(e)) ? t.type : void 0) || null : null
        }, n.payment.formatCardNumber = function (e) {
            var t, a, i, o;
            return e = e.replace(/\D/g, ""), (t = r(e)) ? (i = t.length[t.length.length - 1], e = e.slice(0, i), t.format.global ? null != (o = e.match(t.format)) ? o.join(" ") : void 0 : (a = t.format.exec(e), null != a ? (a.shift(), a = n.grep(a, function (e) {
                return e
            }), a.join(" ")) : void 0)) : e
        }, n.payment.formatExpiry = function (e) {
            var t, n, r, a;
            return (n = e.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/)) ? (t = n[1] || "", r = n[2] || "", a = n[3] || "", a.length > 0 ? r = " / " : " /" === r ? (t = t.substring(0, 1), r = "") : 2 === t.length || r.length > 0 ? r = " / " : 1 === t.length && "0" !== t && "1" !== t && (t = "0" + t, r = " / "), t + r + a) : ""
        }
    })
}.call(this), define.registerEnd(), define("github/payment", ["exports", "./jquery", "jquery.payment"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e) {
        s["default"](e).payment("formatCardNumber")
    }

    function a(e) {
        s["default"](e).payment("formatCardCVC")
    }

    function i(e) {
        return s["default"].payment.cardType(e)
    }

    function o(e) {
        return s["default"].payment.formatCardNumber(e)
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.installCardNumberFormatter = r, e.installCardCVCFormatter = a, e.cardType = i, e.formatCardNumber = o;
    var s = n(t)
}), define("github/legacy/behaviors/billing/credit_card_fields", ["../../../observe", "../../../payment", "../../../jquery", "delegated-events", "../../../typecast", "invariant"], function (e, t, n, r, a, i) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s(e) {
        var t = void 0, n = e.options[e.selectedIndex];
        n && (t = n.textContent);
        var r = t ? d[t] : null, a = e.closest(".js-setup-creditcard");
        c["default"](a), a.classList.toggle("is-vat-country", null != r);
        var i = a.querySelector(".js-vat-help-text");
        c["default"](i), i.textContent = r ? "(" + r + ")" : "";
        var o = l["default"](a.querySelector(".js-select-state"), HTMLSelectElement);
        a.classList.toggle("is-international", t !== h), o.required = t === h, t !== h && (o.value = "");
        var s = l["default"](a.querySelector(".js-postal-code-field"), HTMLInputElement), u = f.indexOf(t) >= 0;
        a.classList.toggle("no-postcodes", u), s.required = !u, u && (s.value = "")
    }

    var u = o(n), l = o(a), c = o(i);
    e.observe(".js-card-select-number-field", {
        add: function (e) {
            t.installCardNumberFormatter(e)
        }
    }), e.observe(".js-card-cvv", {
        add: function (e) {
            t.installCardCVCFormatter(e)
        }
    }), e.observe(".js-card-select-number-field", function (e) {
        var n = u["default"](e).closest("form"), r = n.find(".js-card"), a = n.find(".js-card-select-type-field");
        u["default"](e).on("input", function () {
            var e = void 0, n = void 0, i = u["default"](this).val(), o = t.cardType(i);
            if (o)for (e = 0, n = r.length; n > e; e++) {
                var s = r[e];
                u["default"](s).toggleClass("enabled", u["default"](s).attr("data-name") === o), u["default"](s).toggleClass("disabled", u["default"](s).attr("data-name") !== o)
            } else r.removeClass("enabled disabled");
            a.val(o)
        })
    }), u["default"](document).on("blur", ".js-card-select-number-field", function () {
        u["default"](this).val(t.formatCardNumber(u["default"](this).val()))
    }), u["default"](document).on("click", ".js-card", function () {
        var e = u["default"](this).closest("form"), t = e.find(".js-card-select-number-field");
        t.focus()
    }), u["default"](document).on("click", ".js-enter-new-card", function (e) {
        var t = u["default"](this).closest(".js-setup-creditcard"), n = t.find(".js-card-select-number-field");
        t.removeClass("has-credit-card"), n.attr("required", "required"), n.attr("data-encrypted-name", "billing[credit_card][number]"), e.preventDefault()
    }), u["default"](document).on("click", ".js-cancel-enter-new-card", function (e) {
        var t = u["default"](this).closest(".js-setup-creditcard"), n = t.find(".js-card-select-number-field");
        t.addClass("has-credit-card"), n.removeAttr("required"), n.removeAttr("data-encrypted-name"), e.preventDefault()
    });
    var d = {
        Austria: "ATU000000000",
        Belgium: "BE0000000000",
        Bulgaria: "BG000000000...",
        Croatia: "",
        Cyprus: "CY000000000X",
        "Czech Republic": "CZ00000000...",
        Denmark: "DK00 00 00 00",
        Estonia: "EE000000000",
        Finland: "FI00000000",
        France: "FRXX 000000000",
        Germany: "DE000000000",
        Greece: "EL000000000",
        Hungary: "HU00000000",
        Iceland: "",
        Ireland: "IE...",
        Italy: "IT00000000000",
        Latvia: "LV00000000000",
        Lithuania: "LT000000000...",
        Luxembourg: "LU00000000",
        Malta: "MT00000000",
        Netherlands: "NL000000000B00",
        Norway: "",
        Poland: "PL0000000000",
        Portugal: "PT000000000",
        Romania: "RO...",
        Slovakia: "SK0000000000",
        Slovenia: "",
        Spain: "ES...",
        Sweden: "SE000000000000",
        Switzerland: "",
        "United Kingdom": "GB..."
    }, f = ["Angola", "Antigua and Barbuda", "Aruba", "Bahamas", "Belize", "Benin", "Botswana", "Cameroon", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Cook Islands", "C\xf4te d'Ivoire", "Djibouti", "Dominica", "Fiji", "French Southern Lands", "Ghana", "Guyana", "Hong Kong", "Ireland", "Kiribati", "Korea, North", "Malawi", "Maritania", "Mauritius", "Montserrat", "Nauru", "Niue", "Qatar", "Saint Kitts and Nevis", "Saint Lucia", "Sao Tome and Principe", "Seychelles", "Sierra Leone", "Sint Maarten (Dutch part)", "Solomon Islands", "Somalia", "Suriname", "Syria", "Togo", "Tokelau", "Tonga", "United Arab Emirates", "Vanuatu", "Yemen", "Zimbabwe"], h = "United States of America";
    e.observe(".js-select-country", function (e) {
        var t = l["default"](e, HTMLSelectElement);
        s(t), t.form && r.fire(t.form, "change"), t.addEventListener("change", function () {
            s(t)
        })
    })
}), define("github/legacy/behaviors/billing/payment_methods", ["../../../observe", "../../../jquery"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(t);
    r["default"](document).on("change", ".js-payment-methods .js-payment-method", function () {
        var e = r["default"](this).closest(".js-payment-methods"), t = r["default"](this).attr("data-selected-tab");
        e.find(".js-selected-payment-method").removeClass("active"), e.find("." + t).addClass("active")
    }), e.observe(".js-selected-payment-method:not(.active)", {
        add: function (e) {
            r["default"](e).addClass("has-removed-contents")
        }, remove: function (e) {
            r["default"](e).removeClass("has-removed-contents")
        }
    }), e.observe(".js-billing-payment-methods", function (e) {
        r["default"](e).removeClass("disabled")
    }), r["default"](document).on("click", ".js-toggle-change-payment-method", function () {
        var e = this.closest(".js-change-payment-method-container");
        e.querySelector(".js-change-payment-method").classList.toggle("has-removed-contents"), e.querySelector(".js-current-payment-method").classList.toggle("d-none")
    })
}), define("github/stats", ["exports", "./proxy-site-detection", "./document-ready"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e) {
        var t = document.querySelector("meta[name=" + e + "]");
        return t ? t.getAttribute("content") : void 0
    }

    function i() {
        s = null;
        var e = a("browser-stats-url"), t = a("request-id");
        e && !o["default"](document) && (fetch(e, {
            method: "POST",
            body: JSON.stringify([{requestId: t}].concat(u)),
            headers: {"Content-Type": "application/json"}
        }), u = [])
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = function (e) {
        u.push(e), n.loaded.then(function () {
            s || (s = requestIdleCallback(i))
        })
    };
    var o = r(t), s = null, u = []
}), define("github/legacy/behaviors/browser-features-stats", ["../../stats", "../../feature-detection"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e), a = n(t);
    r["default"]({
        browserfeatures: {
            classlist_multi_arg: a["default"].classListMultiArg,
            classlist: a["default"].classList,
            closest: a["default"].closest,
            custom_elements: a["default"].registerElement,
            custom_event: a["default"].CustomEvent,
            emoji_ios: a["default"].emojiSupportLevel,
            fetch: a["default"].fetch,
            matches: a["default"].matches,
            performance_getentries: a["default"].performanceGetEntries,
            performance_mark: a["default"].performanceMark,
            performance_now: a["default"].performanceNow,
            promise: a["default"].Promise,
            send_beacon: a["default"].sendBeacon,
            string_ends_with: a["default"].stringEndsWith,
            string_starts_with: a["default"].stringStartsWith,
            timezone: a["default"].timezone,
            url: a["default"].URL,
            url_search_params: a["default"].URLSearchParams,
            weakmap: a["default"].WeakMap
        }
    })
}), define("github/legacy/behaviors/bundle-download-stats", ["../../jquery", "../../document-ready", "../../stats"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a() {
        var e = void 0, t = void 0, n = void 0, r = function () {
            try {
                return localStorage.getItem("bundle-urls")
            } catch (e) {
            }
        }();
        r && (t = function () {
            try {
                return JSON.parse(r)
            } catch (e) {
            }
        }()), null == t && (t = {});
        var a = i();
        try {
            localStorage.setItem("bundle-urls", JSON.stringify(a))
        } catch (o) {
        }
        var u = function () {
            var r = [];
            for (e in a)n = a[e], t[e] !== n && r.push(e);
            return r
        }();
        return u.length ? s["default"]({downloadedbundles: u}) : void 0
    }

    function i() {
        var e = void 0, t = void 0, n = void 0, r = void 0, a = void 0, i = void 0, s = {}, u = o["default"]("script");
        for (t = 0, r = u.length; r > t; t++) {
            var l = u[t];
            i = l.src.match(/\/([\w-]+)-[0-9a-f]{64}\.js$/), null != i && (e = i[1], s[e + ".js"] = l.src)
        }
        var c = o["default"]("link[rel=stylesheet]");
        for (n = 0, a = c.length; a > n; n++) {
            var d = c[n];
            i = d.href.match(/\/([\w-]+)-[0-9a-f]{64}\.css$/), null != i && (e = i[1], s[e + ".css"] = d.href)
        }
        return s
    }

    var o = r(e), s = r(n);
    t.loaded.then(a)
}), define("github/legacy/behaviors/buttons", ["../../observe"], function (e) {
    function t(e) {
        e.preventDefault(), e.stopPropagation()
    }

    e.observe("a.btn.disabled", {
        add: function (e) {
            e.addEventListener("click", t)
        }, remove: function (e) {
            e.removeEventListener("click", t)
        }
    })
}), define("github/legacy/behaviors/check_all", ["../../jquery", "../../setimmediate"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e) {
        return i["default"](e).closest(".js-check-all-container")[0] || document.body
    }

    function a(e, t, n, r) {
        null == r && (r = !1), t.indeterminate = r, t.checked !== n && (t.checked = n, o["default"](function () {
            var n = new CustomEvent("change", {bubbles: !0, cancelable: !1});
            n.relatedTarget = e, t.dispatchEvent(n)
        }))
    }

    var i = n(e), o = n(t);
    i["default"](document).on("change", "input.js-check-all", function (e) {
        var t = void 0, n = void 0;
        if (!i["default"](e.relatedTarget).is("input.js-check-all-item")) {
            var o = i["default"](r(this)), s = o.find("input.js-check-all-item");
            for (t = 0, n = s.length; n > t; t++) {
                var u = s[t];
                a(this, u, this.checked)
            }
            s.removeClass("is-last-changed")
        }
    });
    var s = null;
    i["default"](document).on("mousedown", "input.js-check-all-item", function (e) {
        s = e.shiftKey
    }), i["default"](document).on("change", "input.js-check-all-item", function (e) {
        var t = void 0, n = void 0, o = void 0, u = void 0, l = void 0, c = void 0;
        if (!i["default"](e.relatedTarget).is("input.js-check-all, input.js-check-all-item")) {
            var d = i["default"](r(this)), f = d.find("input.js-check-all")[0], h = d.find("input.js-check-all-item");
            if (s && (o = h.filter(".is-last-changed")[0])) {
                var m = h.toArray();
                l = [m.indexOf(o), m.indexOf(this)].sort(), c = l[0], t = l[1];
                var v = m.slice(c, +t + 1 || 9e9);
                for (n = 0, u = v.length; u > n; n++) {
                    var p = v[n];
                    a(this, p, this.checked)
                }
            }
            s = null, h.removeClass("is-last-changed"), i["default"](this).addClass("is-last-changed");
            var g = h.length, y = function () {
                var e = void 0, t = void 0, n = [];
                for (e = 0, t = h.length; t > e; e++) {
                    var r = h[e];
                    r.checked && n.push(r)
                }
                return n
            }().length, b = y === g, j = g > y && y > 0;
            a(this, f, b, j)
        }
    }), i["default"](document).on("change", "input.js-check-all-item", function () {
        var e = i["default"](r(this)), t = e.find(".js-check-all-count");
        if (t.length) {
            var n = e.find("input.js-check-all-item:checked").length;
            t.text(n)
        }
    })
}), define("github/legacy/behaviors/clippable_behavior", ["delegated-events", "../../once", "invariant"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e) {
        var t = document.createElement("pre");
        return t.style.width = "1px", t.style.height = "1px", t.style.position = "fixed", t.style.top = "5px", t.textContent = e, t
    }

    function i(e) {
        var t = getSelection();
        if (null != t) {
            t.removeAllRanges();
            var n = document.createRange();
            n.selectNodeContents(e), t.addRange(n), document.execCommand("copy"), t.removeAllRanges()
        }
    }

    function o(e) {
        var t = document.body;
        c["default"](t);
        var n = a(e);
        t.appendChild(n), i(n), t.removeChild(n)
    }

    function s(e) {
        e.select(), document.execCommand("copy");
        var t = getSelection();
        null != t && t.removeAllRanges()
    }

    function u(e) {
        return "INPUT" === e.nodeName || "TEXTAREA" === e.nodeName
    }

    var l = r(t), c = r(n);
    e.on("click", ".js-zeroclipboard", function () {
        var e = this, t = this.getAttribute("data-clipboard-text");
        if (t) o(t); else {
            var n = this.closest(".js-zeroclipboard-container"), r = n.querySelector(".js-zeroclipboard-target");
            u(r) ? "hidden" === r.type ? o(r.value) : s(r) : i(r)
        }
        var a = this.getAttribute("data-copied-hint"), c = this.getAttribute("aria-label");
        a && a !== c && (this.setAttribute("aria-label", a), l["default"](this, "mouseleave").then(function () {
            null != c ? e.setAttribute("aria-label", c) : e.removeAttribute("aria-label")
        })), this.blur()
    })
}), define("github/has-interactions", ["exports", "./form"], function (e, t) {
    function n(e) {
        return r(e) || i(e) || o(e) || s(e)
    }

    function r(e) {
        var t = e.querySelectorAll("input, textarea, select"), n = !0, r = !1, i = void 0;
        try {
            for (var o, s = t[Symbol.iterator](); !(n = (o = s.next()).done); n = !0) {
                var u = o.value;
                if (a(u))return !0
            }
        } catch (l) {
            r = !0, i = l
        } finally {
            try {
                !n && s["return"] && s["return"]()
            } finally {
                if (r)throw i
            }
        }
        return !1
    }

    function a(e) {
        if ("INPUT" === e.tagName || "TEXTAREA" === e.tagName || "SELECT" === e.tagName)if ("checkbox" === e.type) {
            if (e.checked !== e.defaultChecked)return !0
        } else if (e.value !== e.defaultValue)return !0;
        return !1
    }

    function i(e) {
        var n = e.ownerDocument.activeElement;
        return t.isFormField(n) && e === n || e.contains(n)
    }

    function o(e) {
        return e.matches(":active")
    }

    function s(e) {
        return e.closest(".is-dirty") || e.querySelector(".is-dirty") ? !0 : !1
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.hasInteractions = n, e.hasDirtyFields = r
}), define("github/scrollby", ["exports", "./jquery", "./scrollto"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e, t, n) {
        if (0 === t && 0 === n)return [0, 0];
        var r = i(e);
        s["default"](e, {top: r.top + n, left: r.left + t});
        var a = i(e);
        return [a.left - r.left, a.top - r.top]
    }

    function i(e) {
        return e.offsetParent ? {
            top: o["default"](e).scrollTop(),
            left: o["default"](e).scrollLeft()
        } : {top: o["default"](document).scrollTop(), left: o["default"](document).scrollLeft()}
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = a;
    var o = r(t), s = r(n)
}), define("github/cumulative-scrollby", ["exports", "./dimensions", "./scrollby"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e, n, r) {
        for (var a = t.overflowParent(e), s = 0, u = 0; a;) {
            var l = i["default"](a, n - s, r - u), c = o(l, 2), d = c[0], f = c[1];
            if (s += d, u += f, s === n && u === r)break;
            a = t.overflowParent(a)
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = a;
    var i = r(n), o = function () {
        function e(e, t) {
            var n = [], r = !0, a = !1, i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (u) {
                a = !0, i = u
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a)throw i
                }
            }
            return n
        }

        return function (t, n) {
            if (Array.isArray(t))return t;
            if (Symbol.iterator in Object(t))return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }()
}), define("github/not-scrolling", ["exports", "./normalized-event-timestamp", "./debounce", "./setimmediate"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        return new Promise(function (n) {
            if (e === window && t.timeSinceTimestamp(u) > 500)return void s["default"](n);
            var r = o["default"](function () {
                e.removeEventListener("scroll", r, {capture: !0, passive: !0}), n()
            }, 500);
            e.addEventListener("scroll", r, {capture: !0, passive: !0}), r()
        })
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = i;
    var o = a(n), s = a(r), u = 0;
    window.addEventListener("scroll", function (e) {
        u = t.normalizedTimestamp(e.timeStamp)
    }, {capture: !0, passive: !0})
}), define("github/preserve-position", ["exports", "./jquery", "./cumulative-scrollby", "./not-scrolling"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        return f["default"](window).then(function () {
            return s(o(), e)
        })
    }

    function o() {
        if (document.activeElement !== document.body)return document.activeElement;
        var e = document.querySelectorAll(":hover"), t = e.length;
        return t ? e[t - 1] : void 0
    }

    function s(e, t) {
        if (!e)return t();
        var n = u(e), r = t.call(e), a = l(n);
        if (a) {
            e = a.element;
            var i = a.top, o = a.left, s = e.getBoundingClientRect(), c = s.top, f = s.left;
            return d["default"](e, f - o, c - i), r
        }
    }

    function u(e) {
        for (var t = []; e;) {
            var n = e.getBoundingClientRect(), r = n.top, a = n.left;
            t.push({element: e, top: r, left: a}), e = e.parentElement
        }
        return t
    }

    function l(e) {
        for (var t = 0, n = e.length; n > t; t++) {
            var r = e[t];
            if (c["default"].contains(document, r.element))return r
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.preserveInteractivePosition = i, e.preservingScrollPosition = s;
    var c = a(t), d = a(n), f = a(r)
}), define("github/xhr", ["exports"], function (e) {
    function t(e) {
        return new Promise(function (t, n) {
            e.onload = function () {
                200 === e.status ? t(e.responseText) : n(new Error("XMLHttpRequest " + e.statusText))
            }, e.onerror = n, e.send()
        })
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.send = t
}), define("github/updatable-content", ["exports", "./jquery", "./has-interactions", "./preserve-position", "./xhr"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e) {
        var t, r, i;
        return regeneratorRuntime.async(function (o) {
            for (; ;)switch (o.prev = o.next) {
                case 0:
                    if (!c.get(e)) {
                        o.next = 2;
                        break
                    }
                    return o.abrupt("return");
                case 2:
                    if (t = new XMLHttpRequest, r = e.getAttribute("data-url"), null != r) {
                        o.next = 6;
                        break
                    }
                    throw new Error("Element must have `data-url` attribute");
                case 6:
                    return t.open("GET", r), t.setRequestHeader("Accept", "text/html"), t.setRequestHeader("X-Requested-With", "XMLHttpRequest"), c.set(e, t), o.prev = 10, o.next = 13, regeneratorRuntime.awrap(a.send(t));
                case 13:
                    if (i = o.sent, !n.hasInteractions(e)) {
                        o.next = 16;
                        break
                    }
                    throw new Error("element had interactions");
                case 16:
                    return o.abrupt("return", u(e, i));
                case 19:
                    o.prev = 19, o.t0 = o["catch"](10), "XMLHttpRequest abort" !== o.t0.message && console.warn("Failed to update content", e, o.t0);
                case 22:
                    return o.prev = 22, c["delete"](e), o.finish(22);
                case 25:
                case"end":
                    return o.stop()
            }
        }, null, this, [[10, 19, 22, 25]])
    }

    function s(e, t) {
        var n;
        return regeneratorRuntime.async(function (r) {
            for (; ;)switch (r.prev = r.next) {
                case 0:
                    return n = c.get(e), n && n.abort(), r.abrupt("return", u(e, t));
                case 3:
                case"end":
                    return r.stop()
            }
        }, null, this)
    }

    function u(e, t) {
        return r.preserveInteractivePosition(function () {
            var n = l["default"](l["default"].parseHTML(t.trim()));
            return l["default"](e).replaceWith(n), n
        })
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.updateContent = o, e.replaceContent = s;
    var l = i(t), c = new WeakMap
}), define("github/legacy/behaviors/commenting/ajax", ["../../../form", "../../../updatable-content", "../../../jquery", "../../../setimmediate"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var i = a(n), o = a(r);
    i["default"](document).on("ajaxBeforeSend", ".js-new-comment-form", function (e) {
        return this === e.target && i["default"](this).data("remote-xhr") ? (o["default"](function () {
            throw new Error("canceled comment form submission")
        }), !1) : void 0
    }), i["default"](document).on("ajaxSend", ".js-new-comment-form", function (e) {
        if (this === e.target) {
            var t = document.querySelector(".js-comment-form-error");
            t && (t.style.display = "none")
        }
    }), i["default"](document).on("ajaxSuccess", ".js-new-comment-form", function (n, r, a, i) {
        var o = void 0;
        if (this === n.target) {
            this.reset();
            var s = !0, u = !1, l = void 0;
            try {
                for (var c, d = this.querySelectorAll(".js-resettable-field")[Symbol.iterator](); !(s = (c = d.next()).done); s = !0) {
                    var f = c.value;
                    e.changeValue(f, f.getAttribute("data-reset-value") || "")
                }
            } catch (h) {
                u = !0, l = h
            } finally {
                try {
                    !s && d["return"] && d["return"]()
                } finally {
                    if (u)throw l
                }
            }
            this.querySelector(".js-write-tab").click();
            var m = i.updateContent;
            for (o in m) {
                var v = m[o], p = document.querySelector(o);
                p ? t.replaceContent(p, v) : console.warn("couldn't find " + o + " for immediate update")
            }
        }
    }), i["default"](document).on("ajaxError", ".js-new-comment-form", function (e, t) {
        if (this === e.target) {
            var n = "You can't comment at this time";
            if (422 === t.status) {
                var r = JSON.parse(t.responseText);
                r.errors && (n += " \u2014 your comment ", n += " " + r.errors.join(", "))
            }
            n += ". ";
            var a = document.querySelector(".js-comment-form-error");
            return a && (a.style.display = "block", a.textContent = n), !1
        }
    })
}), define("github/legacy/behaviors/commenting/close", ["../../../observe"], function (e) {
    e.observe(".js-comment-and-button", function (e) {
        function t() {
            var t = this.value.trim();
            t !== a && (a = t, e.textContent = t ? e.getAttribute("data-comment-text") : r)
        }

        var n = e.form.querySelector(".js-comment-field"), r = e.textContent, a = !1;
        return {
            add: function () {
                n.addEventListener("input", t), n.addEventListener("change", t)
            }, remove: function () {
                n.removeEventListener("input", t), n.removeEventListener("change", t)
            }
        }
    })
}), define("github/legacy/behaviors/commenting/edit", ["delegated-events", "../../../jquery", "../../../has-interactions", "invariant"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var i = a(t), o = a(r);
    e.on("click", ".js-comment-edit-button", function () {
        var t = this.closest(".js-comment");
        t.classList.add("is-comment-editing"), t.querySelector(".js-write-tab").click();
        var n = t.querySelector(".js-comment-field");
        n.focus(), e.fire(n, "change")
    }), i["default"](document).on("click", ".js-comment-cancel-button", function () {
        var e = void 0, t = void 0, r = i["default"](this).closest("form");
        if (n.hasDirtyFields(r[0]) && !confirm(i["default"](this).attr("data-confirm-text")))return !1;
        var a = r.find("input, textarea");
        for (e = 0, t = a.length; t > e; e++) {
            var o = a[e];
            o.value = o.defaultValue
        }
        return i["default"](this).closest(".js-comment").removeClass("is-comment-editing"), !1
    }), i["default"](document).on("ajaxSend", ".js-comment-delete, .js-comment-update, .js-issue-update", function (e, t) {
        if (e.target === e.currentTarget) {
            var n = i["default"](this).closest(".js-comment");
            n.addClass("is-comment-loading"), n.find(".btn-sm").addClass("disabled");
            var r = n.attr("data-body-version");
            return r ? t.setRequestHeader("X-Body-Version", r) : void 0
        }
    }), i["default"](document).on("ajaxError", ".js-comment-update", function (e, t, n, r) {
        var a = void 0;
        if (e.target === e.currentTarget && (console.error("ajaxError for js-comment-update", r), 422 === t.status))try {
            var s = JSON.parse(t.responseText), u = this.closest(".js-comment"), l = i["default"](u);
            if (o["default"](u, "expected .js-comment-update to be contained by .js-comment"), s.stale)return t.stale = !0, l.addClass("is-comment-stale"), l.find(".btn-sm").addClass("disabled"), e.preventDefault();
            if (s.errors) {
                var c = u.querySelector(".js-comment-update-error");
                return c && (c.textContent = "There was an error posting your comment: " + s.errors.join(", "), c.style.display = "block"), e.preventDefault()
            }
        } catch (d) {
            return a = d, console.error("Error trying to handle ajaxError for js-comment-update: " + a)
        }
    }), i["default"](document).on("ajaxComplete", ".js-comment-delete, .js-comment-update", function (e, t) {
        if (e.target === e.currentTarget) {
            var n = i["default"](this).closest(".js-comment");
            return n.removeClass("is-comment-loading"), n.find(".btn-sm").removeClass("disabled"), t.stale ? n.find(".form-actions button[type=submit].btn-sm").addClass("disabled") : void 0
        }
    }), i["default"](document).on("ajaxSuccess", ".js-comment-delete", function () {
        var e = this.closest(".js-comment"), t = this.closest(".js-comment-delete-container");
        t || (t = this.closest(".js-comment-container") || this.closest(".js-line-comments"), 1 !== t.querySelectorAll(".js-comment").length && (t = e)), i["default"](t).fadeOut(function () {
            e.remove()
        })
    }), i["default"](document).on("ajaxSuccess", ".js-comment-update", function (e, t, n, r) {
        var a = void 0, o = void 0;
        if (e.target === e.currentTarget) {
            var s = this.closest(".js-comment");
            if (s) {
                var u = i["default"](s);
                u.find(".js-comment-body").html(r.body);
                var l = s.querySelector(".js-comment-update-error");
                l && (l.style.display = "none"), u.attr("data-body-version", r.newBodyVersion);
                var c = u.find("input, textarea");
                for (a = 0, o = c.length; o > a; a++) {
                    var d = c[a];
                    d.defaultValue = d.value
                }
                return u.removeClass("is-comment-stale"), u.removeClass("is-comment-editing")
            }
        }
    }), i["default"](document).on("ajaxSuccess", ".js-issue-update", function (e, t, n, r) {
        var a = void 0, i = void 0, o = this, s = o.closest(".js-details-container");
        if (s.classList.remove("open"), null != r.issue_title) {
            s.querySelector(".js-issue-title").textContent = r.issue_title;
            var u = s.closest(".js-issues-results"), l = u && u.querySelector(".js-merge-pull-request textarea");
            l && l.value === l.defaultValue && (l.value = l.defaultValue = r.issue_title)
        }
        document.title = r.page_title;
        var c = o.elements;
        for (a = 0, i = c.length; i > a; a++) {
            var d = c[a];
            d.defaultValue = d.value
        }
    })
}), define("github/legacy/behaviors/commenting/focus", ["../../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("focusin", ".js-write-bucket", function () {
        return n["default"](this).addClass("focused")
    }), n["default"](document).on("focusout", ".js-write-bucket", function () {
        return n["default"](this).removeClass("focused")
    })
}), define("github/menu", ["exports", "./jquery", "./fire", "delegated-events", "./hotkey", "invariant", "./observe", "./perform-transition"], function (e, t, n, r, a, i, o, s) {
    function u(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function l(e) {
        y && c(y), r.fire(e, "menu:activate") && (h["default"](document).on("keydown.menu", f), h["default"](document).on("click.menu", d), y = e, g["default"](e, function () {
            e.classList.add("active");
            var t = e.querySelector(".js-menu-content [tabindex]");
            t && t.focus();
            var n = e.querySelector(".js-menu-target");
            n && (n.setAttribute("aria-expanded", "true"), n.hasAttribute("data-no-toggle") || n.classList.add("selected"))
        }), m["default"](e, "menu:activated", {async: !0}))
    }

    function c(e) {
        e && r.fire(e, "menu:deactivate") && (h["default"](document).off(".menu"), y = null, g["default"](e, function () {
            e.classList.remove("active");
            var t = e.querySelector(".js-menu-content");
            t && t.setAttribute("aria-expanded", "false");
            var n = e.querySelector(".js-menu-target");
            n && (n.setAttribute("aria-expanded", "false"), n.hasAttribute("data-no-toggle") || n.classList.remove("selected"))
        }), m["default"](e, "menu:deactivated", {async: !0}))
    }

    function d(e) {
        if (y) {
            var t = h["default"](e.target).closest(y)[0] || e.target.closest("#facebox, .facebox-overlay");
            t || (e.preventDefault(), c(y))
        }
    }

    function f(e) {
        if (y) {
            var t = document.activeElement;
            if (t && "esc" === v["default"](e.originalEvent)) {
                var n = h["default"](t).parents().get();
                n.indexOf(y) >= 0 && t.blur(), e.preventDefault(), c(y)
            }
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.activate = l, e.deactivate = c;
    var h = u(t), m = u(n), v = u(a), p = u(i), g = u(s), y = null;
    h["default"](document).on("click", ".js-menu-container", function (e) {
        var t = this, n = h["default"](e.target).closest(".js-menu-target")[0];
        n ? (e.preventDefault(), t === y ? c(t) : l(t)) : h["default"](e.target).closest(".js-menu-content")[0] || t === y && (e.preventDefault(), c(t))
    }), h["default"](document).on("click", ".js-menu-container .js-menu-close", function (e) {
        c(this.closest(".js-menu-container")), e.preventDefault()
    }), o.observe(".js-menu-container.active", {
        add: function () {
            var e = document.body;
            p["default"](e), e.classList.add("menu-active")
        }, remove: function () {
            var e = document.body;
            p["default"](e), e.classList.remove("menu-active")
        }
    })
}), define("github/legacy/behaviors/commenting/markdown-toolbar", ["../../../menu", "delegated-events", "../../../hotkey", "../../../onfocus"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        return e.trim().split("\n").length > 1
    }

    function o(e, t) {
        return Array(t + 1).join(e)
    }

    function s(e, t) {
        for (; e[t] && null != e[t - 1] && !e[t - 1].match(/\s/);)t--;
        return t
    }

    function u(e, t) {
        for (; e[t] && !e[t].match(/\s/);)t++;
        return t
    }

    function l(e, n) {
        var r = n.text, a = n.selectionStart, i = n.selectionEnd, o = e.selectionStart, s = e.value.slice(0, o), u = e.value.slice(e.selectionEnd);
        if (null === y || y) {
            e.contenteditable = !0;
            try {
                y = document.execCommand("insertText", !1, r)
            } catch (l) {
                y = !1
            }
            e.contenteditable = !1
        }
        if (y && !e.value.slice(0, e.selectionStart).endsWith(r) && (y = !1), !y) {
            try {
                document.execCommand("ms-beginUndoUnit")
            } catch (c) {
            }
            e.value = s + r + u;
            try {
                document.execCommand("ms-endUndoUnit")
            } catch (c) {
            }
            t.fire(e, "input")
        }
        return null != a && null != i ? e.setSelectionRange(a, i) : e.setSelectionRange(o, e.selectionEnd)
    }

    function c(e, t) {
        var n = void 0, r = e.value.slice(e.selectionStart, e.selectionEnd);
        return n = t.orderedList ? v(e) : t.multiline && i(r) ? m(e, t) : h(e, t), l(e, n)
    }

    function d(e, t, n) {
        if (e.selectionStart === e.selectionEnd) e.selectionStart = s(e.value, e.selectionStart), e.selectionEnd = u(e.value, e.selectionEnd); else {
            var r = e.selectionStart - t.length, a = e.selectionEnd + n.length, i = e.value.slice(r, e.selectionStart) === t, o = e.value.slice(e.selectionEnd, a) === n;
            i && o && (e.selectionStart = r, e.selectionEnd = a)
        }
        return e.value.slice(e.selectionStart, e.selectionEnd)
    }

    function f(e) {
        var t = void 0, n = void 0, r = void 0, a = void 0, i = e.value.slice(0, e.selectionStart), s = e.value.slice(e.selectionEnd), u = null != (r = i.match(/\n*$/)) ? r[0].length : 0, l = null != (a = s.match(/^\n*/)) ? a[0].length : 0;
        return i.match(/\S/) && 2 > u && (t = o("\n", 2 - u)), s.match(/\S/) && 2 > l && (n = o("\n", 2 - l)), null == t && (t = ""), null == n && (n = ""), {
            newlinesToAppend: t,
            newlinesToPrepend: n
        }
    }

    function h(e, t) {
        var n = void 0, r = void 0, a = void 0, o = void 0, s = void 0, u = void 0, l = void 0, c = void 0, h = void 0, m = void 0, v = void 0, p = void 0, g = void 0, y = void 0, b = void 0, j = void 0, w = void 0, L = void 0;
        u = t.prefix, j = t.suffix, n = t.blockPrefix, r = t.blockSuffix, m = t.replaceNext, l = t.prefixSpace, p = t.scanFor, L = t.surroundWithNewlines;
        var S = e.selectionStart, x = e.selectionEnd;
        if (g = e.value.slice(e.selectionStart, e.selectionEnd), c = i(g) && n.length > 0 ? n + "\n" : u, w = i(g) && r.length > 0 ? "\n" + r : j, l) {
            var k = e.value[e.selectionStart - 1];
            0 === e.selectionStart || null == k || k.match(/\s/) || (c = " " + c)
        }
        g = d(e, c, w), b = e.selectionStart, y = e.selectionEnd;
        var E = m.length > 0 && w.indexOf(m) > -1 && g.length > 0;
        if (L && (h = f(e), a = h.newlinesToAppend, o = h.newlinesToPrepend, c = a + u, w += o), g.startsWith(c) && g.endsWith(w))return v = g.slice(c.length, g.length - w.length), S === x ? (s = S - c.length, s = Math.max(s, b), s = Math.min(s, b + v.length), b = y = s) : (b = b, y = b + v.length), {
            text: v,
            selectionStart: b,
            selectionEnd: y
        };
        if (E)return p.length > 0 && g.match(p) ? (w = w.replace(m, g), v = c + w, b = y = b + c.length, {
            text: v,
            selectionStart: b,
            selectionEnd: y
        }) : (v = c + g + w, b = b + c.length + g.length + w.indexOf(m), y = b + m.length, {
            text: v,
            selectionStart: b,
            selectionEnd: y
        });
        if (v = c + g + w, b = S + c.length, y = x + c.length, t.trimFirst) {
            var _ = g.match(/^\s*|\s*$/g), T = _[0] || "", q = _[1] || "";
            v = T + c + g.trim() + w + q, b += T.length, y -= q.length
        }
        return {text: v, selectionStart: b, selectionEnd: y}
    }

    function m(e, t) {
        var n = void 0, r = void 0, a = void 0, i = void 0, o = void 0, s = void 0, u = void 0, l = void 0, c = void 0;
        i = t.prefix, u = t.suffix, l = t.surroundWithNewlines, c = e.value.slice(e.selectionStart, e.selectionEnd);
        var d = e.selectionStart;
        s = e.selectionEnd;
        var h = c.split("\n"), m = function () {
            var e = void 0, t = void 0, r = [];
            for (e = 0, t = h.length; t > e; e++)n = h[e], r.push(n.startsWith(i) && n.endsWith(u));
            return r
        }(), v = m.every(function (e) {
            return e
        });
        return v ? (c = function () {
            var e = void 0, t = void 0, r = [];
            for (e = 0, t = h.length; t > e; e++)n = h[e], r.push(n.slice(i.length, n.length - u.length));
            return r
        }().join("\n"), s = d + c.length) : (c = function () {
            var e = void 0, t = void 0, r = [];
            for (e = 0, t = h.length; t > e; e++)n = h[e], r.push(i + n + u);
            return r
        }().join("\n"), l && (o = f(e), r = o.newlinesToAppend, a = o.newlinesToPrepend, d += r.length, s = d + c.length, c = r + c + a)), {
            text: c,
            selectionStart: d,
            selectionEnd: s
        }
    }

    function v(e) {
        var t = void 0, n = void 0, r = void 0, a = void 0, i = void 0, o = void 0, s = void 0, u = /^\d+\.\s+/, l = void 0, c = void 0;
        s = e.value.slice(e.selectionStart, e.selectionEnd), r = s.split("\n");
        var d = r.every(function (e) {
            return u.test(e)
        });
        return d ? (r = function () {
            var e = void 0, t = void 0, a = [];
            for (e = 0, t = r.length; t > e; e++)n = r[e], a.push(n.replace(u, ""));
            return a
        }(), s = r.join("\n")) : (r = function () {
            var e = void 0, a = void 0, i = [];
            for (t = e = 0, a = r.length; a > e; t = ++e)n = r[t], i.push(t + 1 + ". " + n);
            return i
        }(), s = r.join("\n"), o = f(e), a = o.newlinesToAppend, i = o.newlinesToPrepend, c = e.selectionStart + a.length, l = c + s.length, s = a + s + i), {
            text: s,
            selectionStart: c,
            selectionEnd: l
        }
    }

    function p(e) {
        var t = e.closest(".js-previewable-comment-form"), n = t.querySelector(".js-improved-comment-field"), r = {
            prefix: e.getAttribute("data-prefix") || "",
            suffix: e.getAttribute("data-suffix") || "",
            blockPrefix: e.getAttribute("data-block-prefix") || "",
            blockSuffix: e.getAttribute("data-block-suffix") || "",
            multiline: e.hasAttribute("data-multiline"),
            replaceNext: e.getAttribute("data-replace-next") || "",
            prefixSpace: e.hasAttribute("data-prefix-space"),
            scanFor: e.getAttribute("data-scan-for") || "",
            surroundWithNewlines: e.hasAttribute("data-surround-with-newlines"),
            orderedList: e.hasAttribute("data-ordered-list"),
            trimFirst: e.hasAttribute("data-trim-first")
        };
        return n.focus(), c(n, r)
    }

    var g = a(n), y = null;
    t.on("click", ".js-toolbar-item", function () {
        return e.deactivate(this.closest(".js-menu-container")), p(this)
    });
    var b = navigator.userAgent.match(/Macintosh/) ? "meta" : "ctrl", j = new WeakMap;
    r.onFocus(".js-improved-comment-field", function (e) {
        if (!j.get(e)) {
            j.set(e, !0);
            var t = {}, n = e.closest(".js-previewable-comment-form"), r = !0, a = !1, i = void 0;
            try {
                for (var o, s = n.querySelectorAll(".js-toolbar .js-toolbar-item[data-toolbar-hotkey]")[Symbol.iterator](); !(r = (o = s.next()).done); r = !0) {
                    var u = o.value, l = u.getAttribute("data-toolbar-hotkey");
                    t[b + "+" + l] = u
                }
            } catch (c) {
                a = !0, i = c
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a)throw i
                }
            }
            e.addEventListener("keydown", function (e) {
                var n = g["default"](e), r = n && t[n];
                r && (p(r), e.preventDefault())
            })
        }
    })
}), define("github/legacy/behaviors/commenting/preview", ["../../../observe", "../../../normalized-event-timestamp", "../../../onfocus", "../../../typecast", "../../../jquery", "../../../fetch", "../../../stats", "../../../sliding-promise-queue", "delegated-events"], function (e, t, n, r, a, i, o, s, u) {
    function l(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function c(e) {
        var t = e.getAttribute("data-preview-authenticity-token"), n = e.closest("form").elements.authenticity_token;
        return null != t ? t : null != n ? n.value : void 0
    }

    function d(e) {
        var t = e.closest(".js-previewable-comment-form"), n = e.classList.contains("js-preview-tab");
        if (n) {
            var r = t.querySelector(".js-write-bucket"), a = t.querySelector(".js-preview-body");
            a.style.minHeight = p["default"](r).height() + "px"
        }
        t.classList.toggle("preview-selected", n), t.classList.toggle("write-selected", !n);
        var i = t.querySelector(".tabnav-tab.selected");
        i.setAttribute("aria-selected", !1), i.classList.remove("selected"), e.classList.add("selected"), e.setAttribute("aria-selected", !0);
        var o = t.querySelector(".js-write-tab");
        return n ? o.setAttribute("data-hotkey", "ctrl+P,meta+P") : o.removeAttribute("data-hotkey"), Promise.resolve(t)
    }

    function f(e, t) {
        var n, r, a, i, o;
        return regeneratorRuntime.async(function (s) {
            for (; ;)switch (s.prev = s.next) {
                case 0:
                    if (n = {
                            url: e.getAttribute("data-preview-url"),
                            data: {text: t, authenticity_token: c(e)},
                            headers: {"content-type": "application/x-www-form-urlencoded; charset=UTF-8"}
                        }, r = !e.dispatchEvent(new CustomEvent("preview:setup", {
                            bubbles: !0,
                            cancelable: !0,
                            detail: n
                        })), !r) {
                        s.next = 6;
                        break
                    }
                    throw new Error("preview canceled");
                case 6:
                    t = JSON.stringify(n);
                case 7:
                    return a = j.get(e), i = void 0, o = void 0, a && (i = a[0], o = a[1]), i !== t && (w = !1, o = b.push(h(n)), o.then(function () {
                        w = !0
                    }), j.set(e, [t, o])), s.abrupt("return", o);
                case 12:
                case"end":
                    return s.stop()
            }
        }, null, this)
    }

    function h(e) {
        return i.fetchText(e.url, {method: "post", body: p["default"].param(e.data), headers: e.headers})
    }

    function m(e, n) {
        var r = e.querySelector(".js-comment-field"), a = e.querySelector(".comment-body");
        return f(e, r.value).then(function (e) {
            a.innerHTML = e || "<p>Nothing to preview</p>";
            var r = t.timeSinceTimestamp(n);
            return g["default"]({preview_delay: {ms: r, version: 2}})
        }), w ? void 0 : a.innerHTML = "<p>Loading preview&hellip;</p>"
    }

    var v = l(r), p = l(a), g = l(o), y = l(s);
    u.on("click", ".js-write-tab", function () {
        d(this).then(function (e) {
            return e.querySelector(".js-comment-field").focus()
        });
        var e = this.closest(".js-previewable-comment-form").querySelector(".js-toolbar");
        null != e && e.classList.remove("d-none")
    }), p["default"](document).on("click", ".js-preview-tab", function (e) {
        var n = t.normalizedTimestamp(e.timeStamp);
        d(this).then(function (e) {
            m(e, n)
        });
        var r = this.closest(".js-previewable-comment-form").querySelector(".js-toolbar");
        return null != r && r.classList.add("d-none"), !1
    }), p["default"](document).on("preview:render", ".js-previewable-comment-form", function (e) {
        var n = e.originalEvent.detail.requestedAt || t.normalizedTimestamp(e.timeStamp), r = this.querySelector(".js-preview-tab");
        return d(r).then(function (e) {
            m(e, n)
        })
    });
    var b = new y["default"], j = new WeakMap, w = !1;
    e.observe(".js-preview-tab", function (e) {
        var t = void 0, n = void 0;
        e.addEventListener("mouseenter", function () {
            t || (t = e.closest(".js-previewable-comment-form"), n = t.querySelector(".js-comment-field")), f(t, n.value)
        })
    }), n.onHotkey("keydown", ".js-comment-field", function (e, n) {
        if ("ctrl+P" === n || "meta+P" === n) {
            var r = v["default"](e.target.closest(".js-previewable-comment-form"), HTMLElement);
            r.classList.contains("write-selected") && (e.target.blur(), r.dispatchEvent(new CustomEvent("preview:render", {
                bubbles: !0,
                cancelable: !1,
                detail: {requestedAt: t.normalizedTimestamp(e.timeStamp)}
            })), e.preventDefault(), e.stopImmediatePropagation())
        }
    })
}), define("github/legacy/behaviors/conversation-anchor-stats", ["../../stats", "../../hash-change"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e), a = n(t);
    a["default"](function (e) {
        var t = window.location.hash.slice(1);
        return t && /\/(issues|pulls?)\/\d+/.test(e.newURL) ? r["default"]({
            conversation_anchor: {
                anchor: t,
                matches_element: e.target !== window
            }
        }) : void 0
    })
}), define.register("jcrop"), define(["jquery"], function (e) {
    e.Jcrop = function (t, n) {
        function r(e) {
            return Math.round(e) + "px"
        }

        function a(e) {
            return D.baseClass + "-" + e
        }

        function i() {
            return e.fx.step.hasOwnProperty("backgroundColor")
        }

        function o(t) {
            var n = e(t).offset();
            return [n.left, n.top]
        }

        function s(e) {
            return [e.pageX - I[0], e.pageY - I[1]]
        }

        function u(t) {
            "object" != typeof t && (t = {}), D = e.extend(D, t), e.each(["onChange", "onSelect", "onRelease", "onDblClick"], function (e, t) {
                "function" != typeof D[t] && (D[t] = function () {
                })
            })
        }

        function l(e, t, n) {
            if (I = o(U), me.setCursor("move" === e ? e : e + "-resize"), "move" === e)return me.activateHandlers(d(t), p, n);
            var r = de.getFixed(), a = f(e), i = de.getCorner(f(a));
            de.setPressed(de.getCorner(a)), de.setCurrent(i), me.activateHandlers(c(e, r), p, n)
        }

        function c(e, t) {
            return function (n) {
                if (D.aspectRatio)switch (e) {
                    case"e":
                        n[1] = t.y + 1;
                        break;
                    case"w":
                        n[1] = t.y + 1;
                        break;
                    case"n":
                        n[0] = t.x + 1;
                        break;
                    case"s":
                        n[0] = t.x + 1
                } else switch (e) {
                    case"e":
                        n[1] = t.y2;
                        break;
                    case"w":
                        n[1] = t.y2;
                        break;
                    case"n":
                        n[0] = t.x2;
                        break;
                    case"s":
                        n[0] = t.x2
                }
                de.setCurrent(n), he.update()
            }
        }

        function d(e) {
            var t = e;
            return ve.watchKeys(), function (e) {
                de.moveOffset([e[0] - t[0], e[1] - t[1]]), t = e, he.update()
            }
        }

        function f(e) {
            switch (e) {
                case"n":
                    return "sw";
                case"s":
                    return "nw";
                case"e":
                    return "nw";
                case"w":
                    return "ne";
                case"ne":
                    return "sw";
                case"nw":
                    return "se";
                case"se":
                    return "nw";
                case"sw":
                    return "ne"
            }
        }

        function h(e) {
            return function (t) {
                return D.disabled ? !1 : "move" !== e || D.allowMove ? (I = o(U), re = !0, l(e, s(t)), t.stopPropagation(), t.preventDefault(), !1) : !1
            }
        }

        function m(e, t, n) {
            var r = e.width(), a = e.height();
            r > t && t > 0 && (r = t, a = t / e.width() * e.height()), a > n && n > 0 && (a = n, r = n / e.height() * e.width()), te = e.width() / r, ne = e.height() / a, e.width(r).height(a)
        }

        function v(e) {
            return {x: e.x * te, y: e.y * ne, x2: e.x2 * te, y2: e.y2 * ne, w: e.w * te, h: e.h * ne}
        }

        function p(e) {
            var t = de.getFixed();
            t.w > D.minSelect[0] && t.h > D.minSelect[1] ? (he.enableHandles(), he.done()) : he.release(), me.setCursor(D.allowSelect ? "crosshair" : "default")
        }

        function g(e) {
            if (!D.disabled && D.allowSelect) {
                re = !0, I = o(U), he.disableHandles(), me.setCursor("crosshair");
                var t = s(e);
                return de.setPressed(t), he.update(), me.activateHandlers(y, p, "touch" === e.type.substring(0, 5)), ve.watchKeys(), e.stopPropagation(), e.preventDefault(), !1
            }
        }

        function y(e) {
            de.setCurrent(e), he.update()
        }

        function b() {
            var t = e("<div></div>").addClass(a("tracker"));
            return R && t.css({opacity: 0, backgroundColor: "white"}), t
        }

        function j(e) {
            V.removeClass().addClass(a("holder")).addClass(e)
        }

        function w(e, t) {
            function n() {
                window.setTimeout(y, d)
            }

            var r = e[0] / te, a = e[1] / ne, i = e[2] / te, o = e[3] / ne;
            if (!ae) {
                var s = de.flipCoords(r, a, i, o), u = de.getFixed(), l = [u.x, u.y, u.x2, u.y2], c = l, d = D.animationDelay, f = s[0] - l[0], h = s[1] - l[1], m = s[2] - l[2], v = s[3] - l[3], p = 0, g = D.swingSpeed;
                r = c[0], a = c[1], i = c[2], o = c[3], he.animMode(!0);
                var y = function () {
                    return function () {
                        p += (100 - p) / g, c[0] = Math.round(r + p / 100 * f), c[1] = Math.round(a + p / 100 * h), c[2] = Math.round(i + p / 100 * m), c[3] = Math.round(o + p / 100 * v), p >= 99.8 && (p = 100), 100 > p ? (S(c), n()) : (he.done(), he.animMode(!1), "function" == typeof t && t.call(pe))
                    }
                }();
                n()
            }
        }

        function L(e) {
            S([e[0] / te, e[1] / ne, e[2] / te, e[3] / ne]), D.onSelect.call(pe, v(de.getFixed())), he.enableHandles()
        }

        function S(e) {
            de.setPressed([e[0], e[1]]), de.setCurrent([e[2], e[3]]), he.update()
        }

        function x() {
            return v(de.getFixed())
        }

        function k() {
            return de.getFixed()
        }

        function E(e) {
            u(e), H()
        }

        function _() {
            D.disabled = !0, he.disableHandles(), he.setCursor("default"), me.setCursor("default")
        }

        function T() {
            D.disabled = !1, H()
        }

        function q() {
            he.done(), me.activateHandlers(null, null)
        }

        function M() {
            V.remove(), F.show(), F.css("visibility", "visible"), e(t).removeData("Jcrop")
        }

        function C(e, t) {
            he.release(), _();
            var n = new Image;
            n.onload = function () {
                var r = n.width, a = n.height, i = D.boxWidth, o = D.boxHeight;
                U.width(r).height(a), U.attr("src", e), Y.attr("src", e), m(U, i, o), W = U.width(), $ = U.height(), Y.width(W).height($), se.width(W + 2 * oe).height($ + 2 * oe), V.width(W).height($), fe.resize(W, $), T(), "function" == typeof t && t.call(pe)
            }, n.src = e
        }

        function A(e, t, n) {
            var r = t || D.bgColor;
            D.bgFade && i() && D.fadeTime && !n ? e.animate({backgroundColor: r}, {
                queue: !1,
                duration: D.fadeTime
            }) : e.css("backgroundColor", r)
        }

        function H(e) {
            D.allowResize ? e ? he.enableOnly() : he.enableHandles() : he.disableHandles(), me.setCursor(D.allowSelect ? "crosshair" : "default"), he.setCursor(D.allowMove ? "move" : "default"), D.hasOwnProperty("trueSize") && (te = D.trueSize[0] / W, ne = D.trueSize[1] / $), D.hasOwnProperty("setSelect") && (L(D.setSelect), he.done(), delete D.setSelect), fe.refresh(), D.bgColor != ue && (A(D.shade ? fe.getShades() : V, D.shade ? D.shadeColor || D.bgColor : D.bgColor), ue = D.bgColor), le != D.bgOpacity && (le = D.bgOpacity, D.shade ? fe.refresh() : he.setBgOpacity(le)), K = D.maxSize[0] || 0, Q = D.maxSize[1] || 0, Z = D.minSize[0] || 0, ee = D.minSize[1] || 0, D.hasOwnProperty("outerImage") && (U.attr("src", D.outerImage), delete D.outerImage), he.refresh()
        }

        var I, D = e.extend({}, e.Jcrop.defaults), P = navigator.userAgent.toLowerCase(), R = /msie/.test(P), N = /msie [1-6]\./.test(P);
        "object" != typeof t && (t = e(t)[0]), "object" != typeof n && (n = {}), u(n);
        var O = {
            border: "none",
            visibility: "visible",
            margin: 0,
            padding: 0,
            position: "absolute",
            top: 0,
            left: 0
        }, F = e(t), B = !0;
        if ("IMG" == t.tagName) {
            if (0 != F[0].width && 0 != F[0].height) F.width(F[0].width), F.height(F[0].height); else {
                var z = new Image;
                z.src = F[0].src, F.width(z.width), F.height(z.height)
            }
            var U = F.clone().removeAttr("id").css(O).show();
            U.width(F.width()), U.height(F.height()), F.after(U).hide()
        } else U = F.css(O).show(), B = !1, null === D.shade && (D.shade = !0);
        m(U, D.boxWidth, D.boxHeight);
        var W = U.width(), $ = U.height(), V = e("<div />").width(W).height($).addClass(a("holder")).css({
            position: "relative",
            backgroundColor: D.bgColor
        }).insertAfter(F).append(U);
        D.addClass && V.addClass(D.addClass);
        var Y = e("<div />"), J = e("<div />").width("100%").height("100%").css({
            zIndex: 310,
            position: "absolute",
            overflow: "hidden"
        }), X = e("<div />").width("100%").height("100%").css("zIndex", 320), G = e("<div />").css({
            position: "absolute",
            zIndex: 600
        }).dblclick(function () {
            var e = de.getFixed();
            D.onDblClick.call(pe, e)
        }).insertBefore(U).append(J, X);
        B && (Y = e("<img />").attr("src", U.attr("src")).css(O).width(W).height($), J.append(Y)), N && G.css({overflowY: "hidden"});
        var K, Q, Z, ee, te, ne, re, ae, ie, oe = D.boundary, se = b().width(W + 2 * oe).height($ + 2 * oe).css({
            position: "absolute",
            top: r(-oe),
            left: r(-oe),
            zIndex: 290
        }).mousedown(g), ue = D.bgColor, le = D.bgOpacity;
        I = o(U);
        var ce = function () {
            function e() {
                var e, t = {}, n = ["touchstart", "touchmove", "touchend"], r = document.createElement("div");
                try {
                    for (e = 0; e < n.length; e++) {
                        var a = n[e];
                        a = "on" + a;
                        var i = a in r;
                        i || (r.setAttribute(a, "return;"), i = "function" == typeof r[a]), t[n[e]] = i
                    }
                    return t.touchstart && t.touchend && t.touchmove
                } catch (o) {
                    return !1
                }
            }

            function t() {
                return D.touchSupport === !0 || D.touchSupport === !1 ? D.touchSupport : e()
            }

            return {
                createDragger: function (e) {
                    return function (t) {
                        return D.disabled ? !1 : "move" !== e || D.allowMove ? (I = o(U), re = !0, l(e, s(ce.cfilter(t)), !0), t.stopPropagation(), t.preventDefault(), !1) : !1
                    }
                }, newSelection: function (e) {
                    return g(ce.cfilter(e))
                }, cfilter: function (e) {
                    return e.pageX = e.originalEvent.changedTouches[0].pageX, e.pageY = e.originalEvent.changedTouches[0].pageY, e
                }, isSupported: e, support: t()
            }
        }(), de = function () {
            function e(e) {
                e = o(e), m = f = e[0], v = h = e[1]
            }

            function t(e) {
                e = o(e), c = e[0] - m, d = e[1] - v, m = e[0], v = e[1]
            }

            function n() {
                return [c, d]
            }

            function r(e) {
                var t = e[0], n = e[1];
                0 > f + t && (t -= t + f), 0 > h + n && (n -= n + h), v + n > $ && (n += $ - (v + n)), m + t > W && (t += W - (m + t)), f += t, m += t, h += n, v += n
            }

            function a(e) {
                var t = i();
                switch (e) {
                    case"ne":
                        return [t.x2, t.y];
                    case"nw":
                        return [t.x, t.y];
                    case"se":
                        return [t.x2, t.y2];
                    case"sw":
                        return [t.x, t.y2]
                }
            }

            function i() {
                if (!D.aspectRatio)return u();
                var e, t, n, r, a = D.aspectRatio, i = D.minSize[0] / te, o = D.maxSize[0] / te, c = D.maxSize[1] / ne, d = m - f, p = v - h, g = Math.abs(d), y = Math.abs(p), b = g / y;
                return 0 === o && (o = 10 * W), 0 === c && (c = 10 * $), a > b ? (t = v, n = y * a, e = 0 > d ? f - n : n + f, 0 > e ? (e = 0, r = Math.abs((e - f) / a), t = 0 > p ? h - r : r + h) : e > W && (e = W, r = Math.abs((e - f) / a), t = 0 > p ? h - r : r + h)) : (e = m, r = g / a, t = 0 > p ? h - r : h + r, 0 > t ? (t = 0, n = Math.abs((t - h) * a), e = 0 > d ? f - n : n + f) : t > $ && (t = $, n = Math.abs(t - h) * a, e = 0 > d ? f - n : n + f)), e > f ? (i > e - f ? e = f + i : e - f > o && (e = f + o), t = t > h ? h + (e - f) / a : h - (e - f) / a) : f > e && (i > f - e ? e = f - i : f - e > o && (e = f - o), t = t > h ? h + (f - e) / a : h - (f - e) / a), 0 > e ? (f -= e, e = 0) : e > W && (f -= e - W, e = W), 0 > t ? (h -= t, t = 0) : t > $ && (h -= t - $, t = $), l(s(f, h, e, t))
            }

            function o(e) {
                return e[0] < 0 && (e[0] = 0), e[1] < 0 && (e[1] = 0), e[0] > W && (e[0] = W), e[1] > $ && (e[1] = $), [Math.round(e[0]), Math.round(e[1])]
            }

            function s(e, t, n, r) {
                var a = e, i = n, o = t, s = r;
                return e > n && (a = n, i = e), t > r && (o = r, s = t), [a, o, i, s]
            }

            function u() {
                var e, t = m - f, n = v - h;
                return K && Math.abs(t) > K && (m = t > 0 ? f + K : f - K), Q && Math.abs(n) > Q && (v = n > 0 ? h + Q : h - Q), ee / ne && Math.abs(n) < ee / ne && (v = n > 0 ? h + ee / ne : h - ee / ne), Z / te && Math.abs(t) < Z / te && (m = t > 0 ? f + Z / te : f - Z / te), 0 > f && (m -= f, f -= f), 0 > h && (v -= h, h -= h), 0 > m && (f -= m, m -= m), 0 > v && (h -= v, v -= v), m > W && (e = m - W, f -= e, m -= e), v > $ && (e = v - $, h -= e, v -= e), f > W && (e = f - $, v -= e, h -= e), h > $ && (e = h - $, v -= e, h -= e), l(s(f, h, m, v))
            }

            function l(e) {
                return {x: e[0], y: e[1], x2: e[2], y2: e[3], w: e[2] - e[0], h: e[3] - e[1]}
            }

            var c, d, f = 0, h = 0, m = 0, v = 0;
            return {flipCoords: s, setPressed: e, setCurrent: t, getOffset: n, moveOffset: r, getCorner: a, getFixed: i}
        }(), fe = function () {
            function t(e, t) {
                m.left.css({height: r(t)}), m.right.css({height: r(t)})
            }

            function n() {
                return a(de.getFixed())
            }

            function a(e) {
                m.top.css({left: r(e.x), width: r(e.w), height: r(e.y)}), m.bottom.css({
                    top: r(e.y2),
                    left: r(e.x),
                    width: r(e.w),
                    height: r($ - e.y2)
                }), m.right.css({left: r(e.x2), width: r(W - e.x2)}), m.left.css({width: r(e.x)})
            }

            function i() {
                return e("<div />").css({position: "absolute", backgroundColor: D.shadeColor || D.bgColor}).appendTo(h)
            }

            function o() {
                f || (f = !0, h.insertBefore(U), n(), he.setBgOpacity(1, 0, 1), Y.hide(), s(D.shadeColor || D.bgColor, 1), he.isAwake() ? l(D.bgOpacity, 1) : l(1, 1))
            }

            function s(e, t) {
                A(d(), e, t)
            }

            function u() {
                f && (h.remove(), Y.show(), f = !1, he.isAwake() ? he.setBgOpacity(D.bgOpacity, 1, 1) : (he.setBgOpacity(1, 1, 1), he.disableHandles()), A(V, 0, 1))
            }

            function l(e, t) {
                f && (D.bgFade && !t ? h.animate({opacity: 1 - e}, {
                    queue: !1,
                    duration: D.fadeTime
                }) : h.css({opacity: 1 - e}))
            }

            function c() {
                D.shade ? o() : u(), he.isAwake() && l(D.bgOpacity)
            }

            function d() {
                return h.children()
            }

            var f = !1, h = e("<div />").css({position: "absolute", zIndex: 240, opacity: 0}), m = {
                top: i(),
                left: i().height($),
                right: i().height($),
                bottom: i()
            };
            return {
                update: n,
                updateRaw: a,
                getShades: d,
                setBgColor: s,
                enable: o,
                disable: u,
                resize: t,
                refresh: c,
                opacity: l
            }
        }(), he = function () {
            function t(t) {
                var n = e("<div />").css({position: "absolute", opacity: D.borderOpacity}).addClass(a(t));
                return J.append(n), n
            }

            function n(t, n) {
                var r = e("<div />").mousedown(h(t)).css({
                    cursor: t + "-resize",
                    position: "absolute",
                    zIndex: n
                }).addClass("ord-" + t);
                return ce.support && r.bind("touchstart.jcrop", ce.createDragger(t)), X.append(r), r
            }

            function i(e) {
                var t = D.handleSize, r = n(e, _++).css({opacity: D.handleOpacity}).addClass(a("handle"));
                return t && r.width(t).height(t), r
            }

            function o(e) {
                return n(e, _++).addClass("jcrop-dragbar")
            }

            function s(e) {
                var t;
                for (t = 0; t < e.length; t++)M[e[t]] = o(e[t])
            }

            function u(e) {
                var n, r;
                for (r = 0; r < e.length; r++) {
                    switch (e[r]) {
                        case"n":
                            n = "hline";
                            break;
                        case"s":
                            n = "hline bottom";
                            break;
                        case"e":
                            n = "vline right";
                            break;
                        case"w":
                            n = "vline"
                    }
                    T[e[r]] = t(n)
                }
            }

            function l(e) {
                var t;
                for (t = 0; t < e.length; t++)q[e[t]] = i(e[t])
            }

            function c(e, t) {
                D.shade || Y.css({top: r(-t), left: r(-e)}), G.css({top: r(t), left: r(e)})
            }

            function d(e, t) {
                G.width(Math.round(e)).height(Math.round(t))
            }

            function f() {
                var e = de.getFixed();
                de.setPressed([e.x, e.y]), de.setCurrent([e.x2, e.y2]), m()
            }

            function m(e) {
                return E ? p(e) : void 0
            }

            function p(e) {
                var t = de.getFixed();
                d(t.w, t.h), c(t.x, t.y), D.shade && fe.updateRaw(t), E || y(), e ? D.onSelect.call(pe, v(t)) : D.onChange.call(pe, v(t))
            }

            function g(e, t, n) {
                (E || t) && (D.bgFade && !n ? U.animate({opacity: e}, {
                    queue: !1,
                    duration: D.fadeTime
                }) : U.css("opacity", e))
            }

            function y() {
                G.show(), D.shade ? fe.opacity(le) : g(le, !0), E = !0
            }

            function j() {
                S(), G.hide(), D.shade ? fe.opacity(1) : g(1), E = !1, D.onRelease.call(pe)
            }

            function w() {
                C && X.show()
            }

            function L() {
                return C = !0, D.allowResize ? (X.show(), !0) : void 0
            }

            function S() {
                C = !1, X.hide()
            }

            function x(e) {
                e ? (ae = !0, S()) : (ae = !1, L())
            }

            function k() {
                x(!1), f()
            }

            var E, _ = 370, T = {}, q = {}, M = {}, C = !1;
            D.dragEdges && e.isArray(D.createDragbars) && s(D.createDragbars), e.isArray(D.createHandles) && l(D.createHandles), D.drawBorders && e.isArray(D.createBorders) && u(D.createBorders), e(document).bind("touchstart.jcrop-ios", function (t) {
                e(t.currentTarget).hasClass("jcrop-tracker") && t.stopPropagation()
            });
            var A = b().mousedown(h("move")).css({cursor: "move", position: "absolute", zIndex: 360});
            return ce.support && A.bind("touchstart.jcrop", ce.createDragger("move")), J.append(A), S(), {
                updateVisible: m,
                update: p,
                release: j,
                refresh: f,
                isAwake: function () {
                    return E
                },
                setCursor: function (e) {
                    A.css("cursor", e)
                },
                enableHandles: L,
                enableOnly: function () {
                    C = !0
                },
                showHandles: w,
                disableHandles: S,
                animMode: x,
                setBgOpacity: g,
                done: k
            }
        }(), me = function () {
            function t(t) {
                se.css({zIndex: 450}), t ? e(document).bind("touchmove.jcrop", o).bind("touchend.jcrop", u) : f && e(document).bind("mousemove.jcrop", r).bind("mouseup.jcrop", a)
            }

            function n() {
                se.css({zIndex: 290}), e(document).unbind(".jcrop")
            }

            function r(e) {
                return c(s(e)), !1
            }

            function a(e) {
                return e.preventDefault(), e.stopPropagation(), re && (re = !1, d(s(e)), he.isAwake() && D.onSelect.call(pe, v(de.getFixed())), n(), c = function () {
                }, d = function () {
                }), !1
            }

            function i(e, n, r) {
                return re = !0, c = e, d = n, t(r), !1
            }

            function o(e) {
                return c(s(ce.cfilter(e))), !1
            }

            function u(e) {
                return a(ce.cfilter(e))
            }

            function l(e) {
                se.css("cursor", e)
            }

            var c = function () {
            }, d = function () {
            }, f = D.trackDocument;
            return f || se.mousemove(r).mouseup(a).mouseout(a), U.before(se), {activateHandlers: i, setCursor: l}
        }(), ve = function () {
            function t() {
                D.keySupport && (i.show(), i.focus())
            }

            function n(e) {
                i.hide()
            }

            function r(e, t, n) {
                D.allowMove && (de.moveOffset([t, n]), he.updateVisible(!0)), e.preventDefault(), e.stopPropagation()
            }

            function a(e) {
                if (e.ctrlKey || e.metaKey)return !0;
                ie = e.shiftKey ? !0 : !1;
                var t = ie ? 10 : 1;
                switch (e.keyCode) {
                    case 37:
                        r(e, -t, 0);
                        break;
                    case 39:
                        r(e, t, 0);
                        break;
                    case 38:
                        r(e, 0, -t);
                        break;
                    case 40:
                        r(e, 0, t);
                        break;
                    case 27:
                        D.allowSelect && he.release();
                        break;
                    case 9:
                        return !0
                }
                return !1
            }

            var i = e('<input type="radio" />').css({
                position: "fixed",
                left: "-120px",
                width: "12px"
            }).addClass("jcrop-keymgr"), o = e("<div />").css({position: "absolute", overflow: "hidden"}).append(i);
            return D.keySupport && (i.keydown(a).blur(n), N || !D.fixedSupport ? (i.css({
                position: "absolute",
                left: "-20px"
            }), o.append(i).insertBefore(U)) : i.insertBefore(U)), {watchKeys: t}
        }();
        ce.support && se.bind("touchstart.jcrop", ce.newSelection), X.hide(), H(!0);
        var pe = {
            setImage: C,
            animateTo: w,
            setSelect: L,
            setOptions: E,
            tellSelect: x,
            tellScaled: k,
            setClass: j,
            disable: _,
            enable: T,
            cancel: q,
            release: he.release,
            destroy: M,
            focus: ve.watchKeys,
            getBounds: function () {
                return [W * te, $ * ne]
            },
            getWidgetSize: function () {
                return [W, $]
            },
            getScaleFactor: function () {
                return [te, ne]
            },
            getOptions: function () {
                return D
            },
            ui: {holder: V, selection: G}
        };
        return R && V.bind("selectstart", function () {
            return !1
        }), F.data("Jcrop", pe), pe
    }, e.fn.Jcrop = function (t, n) {
        var r;
        return this.each(function () {
            if (e(this).data("Jcrop")) {
                if ("api" === t)return e(this).data("Jcrop");
                e(this).data("Jcrop").setOptions(t)
            } else"IMG" == this.tagName ? e.Jcrop.Loader(this, function () {
                e(this).css({
                    display: "block",
                    visibility: "hidden"
                }), r = e.Jcrop(this, t), e.isFunction(n) && n.call(r)
            }) : (e(this).css({
                display: "block",
                visibility: "hidden"
            }), r = e.Jcrop(this, t), e.isFunction(n) && n.call(r))
        }), this
    }, e.Jcrop.Loader = function (t, n, r) {
        function a() {
            o.complete ? (i.unbind(".jcloader"), e.isFunction(n) && n.call(o)) : window.setTimeout(a, 50)
        }

        var i = e(t), o = i[0];
        i.bind("load.jcloader", a).bind("error.jcloader", function (t) {
            i.unbind(".jcloader"), e.isFunction(r) && r.call(o)
        }), o.complete && e.isFunction(n) && (i.unbind(".jcloader"), n.call(o))
    }, e.Jcrop.defaults = {
        allowSelect: !0,
        allowMove: !0,
        allowResize: !0,
        trackDocument: !0,
        baseClass: "jcrop",
        addClass: null,
        bgColor: "black",
        bgOpacity: .6,
        bgFade: !1,
        borderOpacity: .4,
        handleOpacity: .5,
        handleSize: null,
        aspectRatio: 0,
        keySupport: !0,
        createHandles: ["n", "s", "e", "w", "nw", "ne", "se", "sw"],
        createDragbars: ["n", "s", "e", "w"],
        createBorders: ["n", "s", "e", "w"],
        drawBorders: !0,
        dragEdges: !0,
        fixedSupport: !0,
        touchSupport: null,
        shade: null,
        boxWidth: 0,
        boxHeight: 0,
        boundary: 2,
        fadeTime: 400,
        animationDelay: 20,
        swingSpeed: 3,
        minSelect: [0, 0],
        maxSize: [0, 0],
        minSize: [0, 0],
        onChange: function () {
        },
        onSelect: function () {
        },
        onDblClick: function () {
        },
        onRelease: function () {
        }
    }
}), define.registerEnd(), define("github/legacy/behaviors/crop_avatar", ["../../observe", "../../jquery", "jcrop"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    }

    var a = n(t), i = function () {
        function e(e) {
            this.clearCropFormValues = r(this.clearCropFormValues, this), this.setCropFormValues = r(this.setCropFormValues, this), this.setCurrentSelection = r(this.setCurrentSelection, this), this.setTrueSize = r(this.setTrueSize, this), this.$container = a["default"](e), this.spinner = this.$container.find(".profile-picture-spinner"), this.img = this.$container.find(".js-croppable-avatar"), this.croppedX = this.$container.find(".js-crop-cropped-x"), this.croppedY = this.$container.find(".js-crop-cropped-y"), this.croppedW = this.$container.find(".js-crop-cropped-width"), this.croppedH = this.$container.find(".js-crop-cropped-height");
            var t = this.img.parent("div").width(), n = {
                aspectRatio: 1,
                onSelect: this.setCropFormValues,
                onRelease: this.clearCropFormValues,
                bgColor: "",
                maxSize: [3e3, 3e3],
                boxWidth: t,
                boxHeight: t
            };
            this.setTrueSize(n), this.setCurrentSelection(n);
            var i = this;
            this.img.Jcrop(n, function () {
                return i.spinner.addClass("d-none"), i.jcrop = this
            })
        }

        return e.prototype.setTrueSize = function (e) {
            var t = parseInt(this.img.attr("data-true-width")), n = parseInt(this.img.attr("data-true-height"));
            return 0 !== t && 0 !== n ? e.trueSize = [t, n] : void 0
        }, e.prototype.setCurrentSelection = function (e) {
            var t = parseInt(this.croppedW.val()), n = parseInt(this.croppedH.val());
            if (0 !== t && 0 !== n) {
                var r = parseInt(this.croppedX.val()), a = parseInt(this.croppedY.val());
                return e.setSelect = [r, a, r + t, a + n]
            }
        }, e.prototype.setCropFormValues = function (e) {
            return this.croppedX.val(e.x), this.croppedY.val(e.y), this.croppedW.val(e.w), this.croppedH.val(e.h)
        }, e.prototype.clearCropFormValues = function () {
            return this.croppedX.val("0"), this.croppedY.val("0"), this.croppedW.val("0"), this.croppedH.val("0")
        }, e
    }();
    e.observe(".js-croppable-container", {
        add: function (e) {
            return new i(e)
        }
    }), document.addEventListener("facebox:afterClose", function () {
        a["default"](".js-avatar-field").val("")
    })
}), define("github/legacy/behaviors/dirty_menus", ["../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("menu:activate", ".js-select-menu", function () {
        n["default"](this).addClass("is-dirty")
    }), n["default"](document).on("menu:deactivate", ".js-select-menu", function () {
        n["default"](this).removeClass("is-dirty")
    })
}), define("github/legacy/behaviors/disable", ["../../jquery", "delegated-events"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e) {
        return "INPUT" === e.nodeName ? e.value || "Submit" : e.innerHTML || ""
    }

    function a(e, t) {
        "INPUT" === e.nodeName ? e.value = t : e.innerHTML = t
    }

    var i = n(e), o = new WeakMap, s = ["input[type=submit][data-disable-with]", "button[data-disable-with]"].join(", ");
    t.on("submit", "form", function () {
        var e = !0, t = !1, n = void 0;
        try {
            for (var i, u = this.querySelectorAll(s)[Symbol.iterator](); !(e = (i = u.next()).done); e = !0) {
                var l = i.value;
                o.set(l, r(l));
                var c = l.getAttribute("data-disable-with");
                c && a(l, c), l.disabled = !0
            }
        } catch (d) {
            t = !0, n = d
        } finally {
            try {
                !e && u["return"] && u["return"]()
            } finally {
                if (t)throw n
            }
        }
    }, {capture: !0}), i["default"](document).on("ajaxComplete", "form", function (e) {
        if (this === e.target) {
            var t = !0, n = !1, r = void 0;
            try {
                for (var i, u = this.querySelectorAll(s)[Symbol.iterator](); !(t = (i = u.next()).done); t = !0) {
                    var l = i.value, c = o.get(l);
                    null != c && (a(l, c), l.disabled = !1, o["delete"](l))
                }
            } catch (d) {
                n = !0, r = d
            } finally {
                try {
                    !t && u["return"] && u["return"]()
                } finally {
                    if (n)throw r
                }
            }
        }
    })
}), define("github/legacy/behaviors/facebox", ["../../history", "../../observe", "../../facebox", "../../jquery", "../../hash-change", "../../hotkey", "../../visible"], function (e, t, n, r, a, i, o) {
    function s(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function u(e) {
        var t = e.querySelectorAll("input[autofocus], textarea[autofocus]"), n = t[t.length - 1];
        n && document.activeElement !== n && n.focus()
    }

    function l() {
        var e = window.location.hash.slice(1);
        if (e) {
            var t = !0, n = !1, r = void 0;
            try {
                for (var a, i = document.querySelectorAll("[data-hashchange-activated]")[Symbol.iterator](); !(t = (a = i.next()).done); t = !0) {
                    var o = a.value;
                    if (o.getAttribute("data-hashchange-activated") === e)return o
                }
            } catch (s) {
                n = !0, r = s
            } finally {
                try {
                    !t && i["return"] && i["return"]()
                } finally {
                    if (n)throw r
                }
            }
        }
    }

    function c(e) {
        var t = h["default"](e);
        if ("tab" === t || "shift+tab" === t) {
            e.preventDefault();
            var n = d["default"]("#facebox"), r = d["default"](Array.from(n.find("input, button, .btn, textarea")).filter(m["default"])).filter(function () {
                return !this.disabled
            }), a = "shift+tab" === t ? -1 : 1, i = r.index(r.filter(":focus")), o = i + a;
            o === r.length || -1 === i && "tab" === t ? r.first().focus() : -1 === i ? r.last().focus() : r.get(o).focus()
        }
    }

    var d = s(r), f = s(a), h = s(i), m = s(o);
    f["default"](function () {
        var e = l();
        e && setTimeout(function () {
            e.click()
        }, 0)
    }), document.addEventListener("facebox:close", function () {
        var t = l();
        t && /facebox/.test(t.rel) && e.replaceState(e.getState(), "", window.location.href.split("#")[0])
    }), document.addEventListener("facebox:reveal", function () {
        var e = document.getElementById("facebox");
        setTimeout(function () {
            u(e)
        }, 0), d["default"](document).on("keydown", c)
    }), document.addEventListener("facebox:afterClose", function () {
        d["default"](document).off("keydown", c), d["default"]("#facebox :focus").blur()
    }), t.observe("a[rel*=facebox]", function (e) {
        n.addFaceboxEventListener(e)
    }), document.addEventListener("facebox:close", n.teardownOnClose), d["default"](document).on("click", ".js-facebox-close", n.close)
}), define("github/legacy/behaviors/facebox-button", ["../../jquery", "../../facebox"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e), a = n(t);
    r["default"](document).on("click", "[data-facebox]", function () {
        a["default"]({div: this.getAttribute("data-facebox")}, this.getAttribute("data-facebox-class"))
    })
}), define("github/fuzzy-filter", ["exports"], function (e) {
    function t(e, t) {
        var n = o(e, t);
        if (n && -1 === t.indexOf("/")) {
            var r = e.substring(e.lastIndexOf("/") + 1);
            n += o(r, t)
        }
        return n
    }

    function n(e, n) {
        var a = function () {
            for (var r = [], a = 0, i = e.length; i > a; a++) {
                var o = e[a], s = t(o, n);
                s && r.push([o, s])
            }
            return r
        }();
        a.sort(r);
        for (var i = [], o = 0, s = a.length; s > o; o++) {
            var u = a[o];
            i.push(u[0])
        }
        return i
    }

    function r(e, t) {
        var n = e[0], r = t[0], a = e[1], i = t[1];
        return a > i ? -1 : i > a ? 1 : r > n ? -1 : n > r ? 1 : 0
    }

    function a(e) {
        var t = e.toLowerCase(), n = "+.*?[]{}()^$|\\".replace(/(.)/g, "\\$1"), r = new RegExp("\\(([" + n + "])\\)", "g");
        return e = t.replace(/(.)/g, "($1)(.*?)").replace(r, "(\\$1)"), new RegExp("(.*)" + e + "$", "i")
    }

    function i(e, t, n) {
        var r = e.innerHTML.trim();
        if (t) {
            null == n && (n = a(t));
            var i = r.match(n);
            if (!i)return;
            var o = !1;
            r = [];
            var s = void 0, u = void 0, l = void 0;
            for (s = u = 1, l = i.length; l >= 1 ? l > u : u > l; s = l >= 1 ? ++u : --u) {
                var c = i[s];
                c && (s % 2 === 0 ? o || (r.push("<mark>"), o = !0) : o && (r.push("</mark>"), o = !1), r.push(c))
            }
            e.innerHTML = r.join("")
        } else {
            var d = r.replace(/<\/?mark>/g, "");
            r !== d && (e.innerHTML = d)
        }
    }

    function o(e, t) {
        if (e === t)return 1;
        var n = e.length, r = 0, a = 0, i = void 0, o = void 0, s = void 0;
        for (i = o = 0, s = t.length; s > o; i = ++o) {
            var u = t[i], l = e.indexOf(u.toLowerCase()), c = e.indexOf(u.toUpperCase()), d = Math.min(l, c), f = d > -1 ? d : Math.max(l, c);
            if (-1 === f)return 0;
            r += .1, e[f] === u && (r += .1), 0 === f && (r += .8, 0 === i && (a = 1)), " " === e.charAt(f - 1) && (r += .8), e = e.substring(f + 1, n)
        }
        var h = t.length, m = r / h, v = (m * (h / n) + m) / 2;
        return a && 1 > v + .1 && (v += .1), v
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.fuzzyScore = t, e.fuzzySort = n, e.fuzzyRegexp = a, e.fuzzyHighlightElement = i
}), define("github/fuzzy-filter-sort-list", ["exports", "./fuzzy-filter", "./jquery"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e, n, r) {
        var a = void 0, d = void 0, f = void 0, h = void 0, m = void 0, v = void 0, p = void 0, g = void 0, y = void 0, b = void 0, j = void 0;
        if (null == r && (r = {}), e) {
            n = n.toLowerCase();
            var w = null != r.content ? r.content : o, L = null != r.text ? r.text : s, S = null != r.score ? r.score : t.fuzzyScore, x = r.limit;
            r.mark === !0 ? j = c : null != r.mark && null != r.mark.call && (j = r.mark);
            var k = l.get(e);
            for (k ? a = u["default"](e).children() : (a = k = u["default"](e).children(), l.set(e, k.slice(0))), d = 0, p = a.length; p > d; d++)f = a[d], e.removeChild(f), f.style.display = "";
            var E = document.createDocumentFragment(), _ = 0, T = 0;
            if (n) {
                var q = k.slice(0);
                for (m = 0, y = q.length; y > m; m++)f = q[m], null == f.fuzzyFilterTextCache && (f.fuzzyFilterTextCache = L(w(f))), f.fuzzyFilterScoreCache = S(f.fuzzyFilterTextCache, n, f);
                q.sort(i);
                var M = t.fuzzyRegexp(n);
                for (v = 0, b = q.length; b > v; v++) {
                    if (f = q[v], (!x || x > _) && f.fuzzyFilterScoreCache > 0) {
                        if (T++, j) {
                            var C = w(f);
                            j(C), j(C, n, M)
                        }
                        E.appendChild(f)
                    }
                    _++
                }
            } else for (h = 0, g = k.length; g > h; h++)f = k[h], (!x || x > _) && (T++, j && j(w(f)), E.appendChild(f)), _++;
            return e.appendChild(E), T
        }
    }

    function i(e, t) {
        var n = e.fuzzyFilterScoreCache, r = t.fuzzyFilterScoreCache, a = e.fuzzyFilterTextCache, i = t.fuzzyFilterTextCache;
        return n > r ? -1 : r > n ? 1 : i > a ? -1 : a > i ? 1 : 0
    }

    function o(e) {
        return e
    }

    function s(e) {
        var t = e.hasAttribute("data-filter-value");
        if (t) {
            var n = e.getAttribute("data-filter-value");
            return n.toLowerCase().trim()
        }
        return e.textContent.toLowerCase().trim()
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = a;
    var u = r(n), l = new WeakMap, c = t.fuzzyHighlightElement
}), define("github/prefix-filter-list", ["exports", "./jquery"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e, t, n) {
        var r = void 0, s = void 0, u = void 0;
        if (null == n && (n = {}), e) {
            t = t.toLowerCase();
            var l = null != n.text ? n.text : a, c = o["default"](e).children(), d = n.limit;
            n.mark === !0 ? u = i : null != n.mark && null != n.mark.call && (u = n.mark);
            var f = 0;
            for (r = 0, s = c.length; s > r; r++) {
                var h = c[r];
                0 === l(h).indexOf(t) ? d && f >= d ? h.style.display = "none" : (f++, h.style.display = "", u && (u(h), u(h, t))) : h.style.display = "none"
            }
            return f
        }
    }

    function a(e) {
        return e.textContent.toLowerCase().trim()
    }

    function i(e, t) {
        var n = e.innerHTML;
        if (t) {
            var r = new RegExp(t, "i");
            e.innerHTML = n.replace(r, "<mark>$&</mark>")
        } else {
            var a = n.replace(/<\/?mark>/g, "");
            n !== a && (e.innerHTML = a)
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = r;
    var o = n(t)
}), define("github/substring-filter-list", ["exports", "./jquery"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e, t, n) {
        var r = void 0, s = void 0, u = void 0;
        if (null == n && (n = {}), e) {
            t = t.toLowerCase();
            var l = null != n.text ? n.text : a, c = n.limit, d = o["default"](e).children();
            n.mark === !0 ? u = i : null != n.mark && null != n.mark.call && (u = n.mark);
            var f = 0;
            for (r = 0, s = d.length; s > r; r++) {
                var h = d[r];
                -1 !== l(h).indexOf(t) ? c && f >= c ? h.style.display = "none" : (f++, h.style.display = "", u && (u(h), u(h, t))) : h.style.display = "none"
            }
            return f
        }
    }

    function a(e) {
        return e.textContent.toLowerCase().trim()
    }

    function i(e, t) {
        var n = e.innerHTML;
        if (t) {
            var r = new RegExp(t, "i");
            e.innerHTML = n.replace(r, "<mark>$&</mark>")
        } else {
            var a = n.replace(/<\/?mark>/g, "");
            n !== a && (e.innerHTML = a)
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = r;
    var o = n(t)
}), define("github/legacy/behaviors/filterable", ["../../observe", "delegated-events", "../../throttled-input", "../../jquery", "../../fuzzy-filter-sort-list", "../../prefix-filter-list", "../../substring-filter-list", "../../setimmediate"], function (e, t, n, r, a, i, o, s) {
    function u(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function l(e, t) {
        var n = e.hasAttribute("data-filterable-highlight"), r = e.getAttribute("data-filterable-limit"), a = 0;
        switch (e.getAttribute("data-filterable-type")) {
            case"fuzzy":
                a = d["default"](e, t, {mark: n, limit: r});
                break;
            case"substring":
                a = h["default"](e, t, {mark: n, limit: r});
                break;
            default:
                a = f["default"](e, t, {mark: n, limit: r})
        }
        e.classList.toggle("filterable-active", t.length > 0), e.classList.toggle("filterable-empty", 0 === a)
    }

    var c = u(r), d = u(a), f = u(i), h = u(o), m = u(s);
    e.observe(".js-filterable-field", function (e) {
        function r() {
            var e = this;
            i !== this.value && (i = this.value, m["default"](function () {
                t.fire(e, "filterable:change")
            }));
        }

        function a() {
            var e = this;
            m["default"](function () {
                t.fire(e, "filterable:change")
            })
        }

        var i = e.value;
        return {
            add: function (e) {
                e.addEventListener("focus", a), n.addThrottledInputEventListener(e, r), document.activeElement === e && a.call(e)
            }, remove: function (e) {
                e.removeEventListener("focus", a), n.removeThrottledInputEventListener(e, r)
            }
        }
    }), c["default"](document).on("filterable:change", ".js-filterable-field", function () {
        var e = this.value.trim().toLowerCase(), t = document.querySelectorAll("[data-filterable-for=" + this.id + "]"), n = !0, r = !1, a = void 0;
        try {
            for (var i, o = t[Symbol.iterator](); !(n = (i = o.next()).done); n = !0) {
                var s = i.value;
                l(s, e);
                var u = new CustomEvent("filterable:change", {bubbles: !0, cancelable: !1});
                u.relatedTarget = this, s.dispatchEvent(u)
            }
        } catch (c) {
            r = !0, a = c
        } finally {
            try {
                !n && o["return"] && o["return"]()
            } finally {
                if (r)throw a
            }
        }
    })
}), define("github/legacy/behaviors/flash", ["../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("click", ".js-flash-close", function () {
        var e = this.closest(".flash-messages");
        n["default"](this.closest(".flash")).fadeOut(300, function () {
            n["default"](this).remove(), e && !e.querySelector(".flash") && e.remove()
        })
    })
}), define("github/legacy/behaviors/focus_delay", ["../../jquery", "../../fire"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e), a = n(t), i = new WeakMap;
    r["default"](document).on("focusin.delay", function (e) {
        var t = e.target;
        i.get(t) || a["default"](t, "focusin:delay", function () {
            i.set(t, !0), r["default"](t).trigger("focusin:delayed")
        })
    }), r["default"](document).on("focusout.delay", function (e) {
        return setTimeout(function () {
            var t = e.target;
            t !== document.activeElement && a["default"](t, "focusout:delay", function () {
                i["delete"](e.target), r["default"](t).trigger("focusout:delayed")
            })
        }, 200)
    })
}), define("github/legacy/behaviors/g-emoji-element", ["../../emoji-detection"], function (e) {
    function t(e) {
        var t = document.createElement("img");
        return t.className = "emoji", t.alt = ":" + e.getAttribute("alias") + ":", t.height = 20, t.width = 20, t
    }

    var n = Object.create(HTMLElement.prototype);
    n.createdCallback = function () {
        e.isEmojiSupported(this.textContent, this.getAttribute("ios-version")) || (this.textContent = "", this.image = t(this), this.appendChild(this.image))
    }, n.attachedCallback = function () {
        this.image && (this.image.src = this.getAttribute("fallback-src"))
    }, window.GEmojiElement = document.registerElement("g-emoji", {prototype: n})
}), define("github/legacy/behaviors/issue-references", ["../../fetch", "../../observe"], function (e, t) {
    function n() {
        function t(e) {
            return r(u, e.title)
        }

        var n = void 0, a = void 0, i = void 0;
        if (i = this.getAttribute("data-url")) {
            var o = e.fetchJSON(i), s = this.getAttribute("data-id"), u = document.querySelectorAll(".js-issue-link[data-id='" + s + "']");
            for (n = 0, a = u.length; a > n; n++) {
                var l = u[n];
                l.removeAttribute("data-url")
            }
            var c = function (e) {
                return function (t) {
                    var n = (null != t.response ? t.response.status : void 0) || 500, a = function () {
                        switch (n) {
                            case 404:
                                return this.getAttribute("data-permission-text");
                            default:
                                return this.getAttribute("data-error-text")
                        }
                    }.call(e);
                    return r(u, a)
                }
            }(this);
            return o.then(t, c)
        }
    }

    function r(e, t) {
        var n = void 0, r = void 0, a = [];
        for (n = 0, r = e.length; r > n; n++) {
            var i = e[n];
            a.push(i.setAttribute("title", t))
        }
        return a
    }

    t.observe(".js-issue-link", function (e) {
        e.addEventListener("mouseenter", n)
    })
}), define("github/legacy/behaviors/js-immediate-updates", ["../../updatable-content", "../../jquery"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(t);
    r["default"](document).on("ajaxSuccess", ".js-immediate-updates", function (t, n, r, a) {
        var i = void 0;
        if (this === t.target) {
            var o = a.updateContent;
            for (i in o) {
                var s = o[i], u = document.querySelector(i);
                u && e.replaceContent(u, s)
            }
        }
    })
}), define("github/legacy/behaviors/labeled_button", ["../../observe"], function (e) {
    function t(e, t) {
        e.closest("label").classList.toggle("selected", t)
    }

    e.observe(".labeled-button:checked", {
        add: function (e) {
            t(e, !0)
        }, remove: function (e) {
            t(e, !1)
        }
    })
}), define("github/legacy/behaviors/minibutton_accessibility", ["../../onfocus"], function (e) {
    e.onHotkey("keydown", "div.btn-sm, span.btn-sm", function (e, t) {
        "enter" === t && (e.target.click(), e.preventDefault())
    })
}), define("github/legacy/behaviors/notice", ["../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("ajaxSuccess", ".js-notice-dismiss", function () {
        n["default"](this.closest(".js-notice")).fadeOut()
    })
}), define("github/legacy/behaviors/permalink", ["delegated-events"], function (e) {
    e.on("click", ".js-permalink-shortcut", function (e) {
        window.location = this.href + window.location.hash, e.preventDefault()
    })
}), define("github/legacy/behaviors/pjax", ["../../jquery", "../../pjax"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e) {
        return null != e.getAttribute("data-pjax-preserve-scroll") ? !1 : 0
    }

    function a(e) {
        var t = i["default"](e), n = t.add(t.parents("[data-pjax]")).map(function () {
            var e = this.getAttribute("data-pjax");
            return null != e && "true" !== e ? e : void 0
        }), r = n[0];
        return r ? document.querySelector(r) : i["default"](e).closest("[data-pjax-container]")[0]
    }

    var i = n(e);
    i["default"](document).on("click", "[data-pjax] a, a[data-pjax]", function (e) {
        var n = this;
        if (null == n.getAttribute("data-skip-pjax") && null == n.getAttribute("data-remote")) {
            var i = a(n);
            return i ? t.click(e, {container: i, scrollTo: r(n)}) : void 0
        }
    }), i["default"](document).on("submit", "form[data-pjax]", function (e) {
        var n = this, i = a(n);
        return i ? t.submit(e, {container: i, scrollTo: r(n)}) : void 0
    })
}), define("github/legacy/behaviors/pjax-loader", [], function () {
    !function () {
        function e() {
            t(0), a.classList.add("is-loading"), s = setTimeout(n, 0)
        }

        function t(e) {
            0 === e && (null == u && (u = getComputedStyle(i).transition), i.style.transition = "none"), o = e, i.style.width = o + "%", 0 === e && (i.clientWidth, i.style.transition = u || "")
        }

        function n() {
            0 === o && (o = 12), t(Math.min(o + 3, 95)), s = setTimeout(n, 500)
        }

        function r() {
            clearTimeout(s), t(100), a.classList.remove("is-loading")
        }

        var a = document.getElementById("js-pjax-loader-bar");
        if (a) {
            var i = a.firstElementChild;
            if (i instanceof HTMLElement) {
                var o = 0, s = null, u = null;
                document.addEventListener("pjax:start", e), document.addEventListener("pjax:end", r), document.addEventListener("pjax:timeout", function (e) {
                    e.preventDefault()
                })
            }
        }
    }()
}), define("github/legacy/behaviors/pjax/beforeunload", [], function () {
    document.addEventListener("pjax:click", function (e) {
        return window.onbeforeunload ? e.preventDefault() : void 0
    })
}), define("github/legacy/behaviors/pjax/exceptions", ["invariant", "delegated-events"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r() {
        var e = void 0, t = function () {
            var t = void 0, n = void 0, r = [];
            for (t = 0, n = arguments.length; n > t; t++)e = arguments[t], r.push(e.split("/", 3).join("/"));
            return r
        }.apply(this, arguments);
        return t[0] === t[1]
    }

    var a = n(e);
    t.on("pjax:click", "#js-repo-pjax-container a[href]", function (e) {
        return r(this.pathname, location.pathname) ? void 0 : e.preventDefault()
    }), t.on("pjax:click", ".js-comment-body", function (e) {
        return a["default"](e.target instanceof HTMLAnchorElement), "files" === e.target.pathname.split("/")[3] ? e.preventDefault() : void 0
    })
}), define("github/legacy/behaviors/pjax/head", ["../../../jquery", "../../../document-ready", "invariant"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var a = r(e), i = r(n), o = {};
    t.ready.then(function () {
        return o[document.location.pathname] = a["default"]("head [data-pjax-transient]")
    }), document.addEventListener("pjax:beforeReplace", function (e) {
        i["default"](e instanceof CustomEvent);
        var t = void 0, n = void 0, r = void 0, s = e.detail.contents;
        for (t = n = 0, r = s.length; r > n; t = ++n) {
            var u = s[t];
            u && ("pjax-head" === u.id ? (o[document.location.pathname] = a["default"](u).children(), s[t] = null) : "js-flash-container" === u.id && (a["default"]("#js-flash-container").replaceWith(u), s[t] = null))
        }
    }), document.addEventListener("pjax:end", function () {
        var e = o[document.location.pathname];
        if (e) {
            a["default"]("head [data-pjax-transient]").remove();
            var t = a["default"](e).not("title, script, link[rel='stylesheet']"), n = a["default"](e).filter("link[rel='stylesheet']");
            return a["default"](document.head).append(t.attr("data-pjax-transient", !0)), a["default"](document.head).append(n)
        }
    })
}), define("github/legacy/behaviors/pjax_timing", ["../../stats", "../../setimmediate"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e) {
        e instanceof CustomEvent && e.detail && e.detail.url && (window.performance.mark(c), u = e.detail.url)
    }

    function a() {
        s["default"](function () {
            if (window.performance.getEntriesByName(c).length) {
                window.performance.mark(d), window.performance.measure(l, c, d);
                var e = window.performance.getEntriesByName(l), t = e.pop(), n = t ? t.duration : null;
                n && (u && o["default"]({pjax: {url: u, ms: Math.round(n)}}), i())
            }
        })
    }

    function i() {
        window.performance.clearMarks(c), window.performance.clearMarks(d), window.performance.clearMeasures(l)
    }

    var o = n(e), s = n(t), u = null, l = "last_pjax_request", c = "pjax_start", d = "pjax_end";
    document.addEventListener("pjax:start", r), document.addEventListener("pjax:end", a)
}), define("github/legacy/behaviors/print_popup", ["../../document-ready", "invariant"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(t);
    e.ready.then(function () {
        var e = document.body;
        r["default"](e), e.classList.contains("js-print-popup") && (window.print(), setTimeout(window.close, 1e3))
    })
}), define("github/legacy/behaviors/quick_submit", ["../../onfocus", "../../form", "invariant"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var a = r(n);
    e.onHotkey("keydown", ".js-quick-submit", function (e, n) {
        if ("ctrl+enter" === n || "meta+enter" === n) {
            var r = e.target.form;
            a["default"](r instanceof HTMLFormElement);
            var i = r.querySelector("input[type=submit], button[type=submit]");
            i && i.disabled || t.submit(r), e.preventDefault()
        }
    })
}), define("github/legacy/behaviors/quicksearch", ["../../form", "../../jquery", "../../navigation", "../../sliding-promise-queue", "../../fetch"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    }

    var s = i(t), u = i(r), l = function () {
        function t(e) {
            this.resultsChanged = o(this.resultsChanged, this), this.fetchResults = o(this.fetchResults, this), this.onFieldInput = o(this.onFieldInput, this), this.onNavigationKeyDown = o(this.onNavigationKeyDown, this), this.teardown = o(this.teardown, this), this.$field = s["default"](e), this.$form = s["default"](e.form), this.fetchQueue = new u["default"], this.$field.on("input.results", this.onFieldInput), this.$field.on("focusout:delayed.results", this.teardown), this.$form.on("submit.results", this.teardown), this.$results = s["default"](".js-quicksearch-results"), n.push(this.$results[0]), this.$results.on("navigation:keydown.results", this.onNavigationKeyDown)
        }

        return t.prototype.teardown = function () {
            this.$field.off(".results"), this.$form.off(".results"), this.$results.off(".results"), this.$results.removeClass("active"), n.pop(this.$results[0])
        }, t.prototype.onNavigationKeyDown = function (t) {
            if ("esc" === t.originalEvent.detail.hotkey) this.$results.removeClass("active"), n.clear(this.$results[0]); else if ("enter" === t.originalEvent.detail.hotkey && !t.target.classList.contains("js-navigation-item"))return e.submit(this.$form[0]), !1
        }, t.prototype.onFieldInput = function () {
            return this.fetchResults(this.$field.val())
        }, t.prototype.fetchResults = function (e) {
            var t = this.$results.attr("data-quicksearch-url");
            if (t) {
                var n = e.trim() ? (t += ~t.indexOf("?") ? "&" : "?", t += this.$form.serialize(), this.$form.addClass("is-sending"), a.fetchText(t)) : Promise.resolve(""), r = function (e) {
                    return function () {
                        return e.$form.removeClass("is-sending")
                    }
                }(this);
                return this.fetchQueue.push(n).then(function (e) {
                    return function (t) {
                        return e.$results.html(t), e.resultsChanged()
                    }
                }(this)).then(r, r)
            }
        }, t.prototype.resultsChanged = function () {
            var e = "" !== this.$field.val();
            return this.$results.toggleClass("active", e)
        }, t
    }();
    s["default"](document).on("focusin:delayed", ".js-quicksearch-field", function () {
        new l(this)
    })
}), define("github/markdown-parsing", ["exports", "invariant"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r() {
        var e = arguments[0], t = 2 <= arguments.length ? [].slice.call(arguments, 1) : [];
        return t.some(function (t) {
            return e.classList.contains(t)
        })
    }

    function a(e) {
        c["default"](null != e.parentNode && e.parentNode instanceof HTMLElement);
        for (var t = e.parentNode.children, n = 0; n < t.length; ++n)if (t[n] === e)return n;
        return 0
    }

    function i(e) {
        return "IMG" === e.nodeName || null != e.firstChild
    }

    function o(e) {
        return "INPUT" === e.nodeName && e instanceof HTMLInputElement && "checkbox" === e.type
    }

    function s(e) {
        var t = e.childNodes[0], n = e.childNodes[1];
        return t && e.childNodes.length < 3 ? !("OL" !== t.nodeName && "UL" !== t.nodeName || n && (n.nodeType !== Node.TEXT_NODE || n.textContent.trim())) : !1
    }

    function u(e, t) {
        for (var n = (document.createNodeIterator(e, NodeFilter.SHOW_ELEMENT, function (e) {
            return e.nodeName in f && (i(e) || o(e)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
        })), r = [], a = n.nextNode(); a;)a instanceof HTMLElement && r.push(a), a = n.nextNode();
        r.reverse();
        var s = !0, u = !1, l = void 0;
        try {
            for (var c, d = r[Symbol.iterator](); !(s = (c = d.next()).done); s = !0)a = c.value, t(a, f[a.nodeName](a))
        } catch (h) {
            u = !0, l = h
        } finally {
            try {
                !s && d["return"] && d["return"]()
            } finally {
                if (u)throw l
            }
        }
    }

    function l(e) {
        var t = e.getRangeAt(0).cloneContents();
        d = 0, c["default"](null != e.anchorNode && null != e.anchorNode.parentNode && e.anchorNode.parentNode instanceof HTMLElement, "selection's anchorNode and parentNode must not be null");
        var n = e.anchorNode.parentNode.closest("li");
        if (n && (c["default"](null != n.parentNode), "OL" === n.parentNode.nodeName && (d = a(n)), !t.querySelector("li"))) {
            var r = document.createElement("li");
            c["default"](null != n.parentNode);
            var i = document.createElement(n.parentNode.nodeName);
            r.appendChild(t), i.appendChild(r), t = document.createDocumentFragment(), t.appendChild(i)
        }
        return u(t, function (e, t) {
            return e.replaceWith(t)
        }), t
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.selectionToMarkdown = l;
    var c = n(t), d = 0, f = {
        INPUT: function (e) {
            return e.checked ? "[x] " : "[ ] "
        }, CODE: function (e) {
            var t = e.textContent;
            return c["default"](null != e.parentNode), "PRE" === e.parentNode.nodeName ? e.textContent = t.replace(/^/gm, "    ") : t.indexOf("`") >= 0 ? "`` " + t + " ``" : "`" + t + "`"
        }, PRE: function (e) {
            c["default"](null != e.parentNode && e.parentNode instanceof HTMLElement);
            var t = e.parentNode;
            return "DIV" === t.nodeName && t.classList.contains("highlight") && (e.textContent = e.textContent.replace(/^/gm, "    "), e.append("\n\n")), e
        }, STRONG: function (e) {
            return "**" + e.textContent + "**"
        }, EM: function (e) {
            return "_" + e.textContent + "_"
        }, BLOCKQUOTE: function (e) {
            var t = e.textContent.trim().replace(/^/gm, "> "), n = document.createElement("pre");
            return n.textContent = t + "\n\n", n
        }, A: function (e) {
            var t = e.textContent;
            if (r(e, "issue-link", "user-mention", "team-mention"))return t;
            if (/^https?:/.test(t) && t === e.getAttribute("href"))return t;
            var n = e.getAttribute("href");
            return c["default"](null != n), "[" + t + "](" + n + ")"
        }, IMG: function (e) {
            var t = e.getAttribute("alt");
            if (c["default"](null != t), r(e, "emoji"))return t;
            var n = e.getAttribute("src");
            return c["default"](null != n), "![" + t + "](" + n + ")"
        }, LI: function (e) {
            var t = e.parentNode;
            if (c["default"](null != t), !s(e))switch (t.nodeName) {
                case"UL":
                    e.prepend("* ");
                    break;
                case"OL":
                    if (d > 0 && !t.previousSibling) {
                        var n = a(e) + d + 1;
                        e.prepend(n + "\\. ")
                    } else e.prepend(a(e) + 1 + ". ")
            }
            return e
        }, OL: function (e) {
            var t = document.createElement("li");
            return t.appendChild(document.createElement("br")), e.append(t), e
        }, H1: function (e) {
            var t = parseInt(e.nodeName.slice(1));
            return e.prepend(Array(t + 1).join("#") + " "), e
        }, UL: function (e) {
            return e
        }
    };
    f.UL = f.OL;
    for (var h = 2; 6 >= h; ++h)f["H" + h] = f.H1
}), define("github/legacy/behaviors/quote-markdown-selection", ["delegated-events", "../../markdown-parsing", "../../setimmediate", "invariant"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e, t) {
        var n = document.body;
        s["default"](n);
        var r = document.createElement("div");
        r.appendChild(t), r.style.cssText = "position:absolute;left:-9999px;", n.appendChild(r);
        var a = void 0;
        try {
            var i = document.createRange();
            i.selectNodeContents(r), e.removeAllRanges(), e.addRange(i), a = e.toString(), e.removeAllRanges()
        } finally {
            n.removeChild(r)
        }
        return a
    }

    var o = a(n), s = a(r);
    e.on("quote:selection", ".js-quote-markdown", function (e) {
        s["default"](e instanceof CustomEvent);
        var n = e.detail.selection;
        try {
            var r = i(n, t.selectionToMarkdown(n));
            return e.detail.selectionText = r.replace(/^\n+/, "").replace(/\s+$/, "")
        } catch (a) {
            o["default"](function () {
                throw a
            })
        }
    })
}), define("github/legacy/behaviors/quote_selection", ["../../form", "delegated-events", "../../visible", "../../hotkey", "../../scrollto"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(n) {
        var r = n.toString().trim();
        if (r) {
            var a = n.focusNode;
            a.nodeType != Node.ELEMENT_NODE && (a = a.parentNode);
            var i = a.closest(".js-quote-selection-container");
            if (i) {
                var o = {selection: n, selectionText: r};
                if (!t.fire(i, "quote:selection", o))return !0;
                r = o.selectionText;
                var u = Array.from(i.querySelectorAll(".js-quote-selection-target")).filter(s["default"])[0];
                if (u) {
                    var c = "> " + r.replace(/\n/g, "\n> ") + "\n\n", d = u.value;
                    return d && (c = d + "\n\n" + c), e.changeValue(u, c), l["default"](u, {
                        duration: 300,
                        complete: function () {
                            u.focus(), u.selectionStart = u.value.length, u.scrollTop = u.scrollHeight
                        }
                    }), !0
                }
            }
        }
    }

    var s = i(n), u = i(r), l = i(a);
    document.addEventListener("keydown", function (t) {
        t.defaultPrevented || "r" != u["default"](t) || t.target instanceof Node && e.isFormField(t.target) || !o(window.getSelection()) || t.preventDefault()
    })
}), define("github/legacy/behaviors/reactions", ["../../jquery", "../../menu"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++)n[t] = e[t];
            return n
        }
        return Array.from(e)
    }

    function a() {
        var e = this.getAttribute("data-reaction-label");
        this.closest(".js-add-reaction-popover").querySelector(".js-reaction-description").textContent = e
    }

    function i() {
        this.closest(".js-add-reaction-popover").querySelector(".js-reaction-description").textContent = "Pick your reaction"
    }

    var o = n(e);
    o["default"](document).on("ajaxSuccess", ".js-pick-reaction", function (e, n, a, i) {
        t.deactivate(this.closest(".js-menu-container"));
        var s = this.closest(".js-comment");
        if (s) {
            var u, l, c = o["default"].parseHTML(i.reactions_container.trim()), d = o["default"].parseHTML(i.comment_header_reaction_button.trim());
            (u = s.querySelector(".js-reactions-container")).replaceWith.apply(u, r(c)), (l = s.querySelector(".js-comment-header-reaction-button")).replaceWith.apply(l, r(d)), s.classList.remove("is-reacting")
        }
    }), o["default"](document).on("menu:activated", ".js-reaction-popover-container", function () {
        o["default"](this).on("mouseenter", ".js-reaction-option-item", a), o["default"](this).on("mouseleave", ".js-reaction-option-item", i), this.closest(".js-comment").classList.add("is-reacting")
    }), o["default"](document).on("menu:deactivated", ".js-reaction-popover-container", function () {
        o["default"](this).off("mouseenter", ".js-reaction-option-item", a), o["default"](this).off("mouseleave", ".js-reaction-option-item", i), this.closest(".js-comment").classList.remove("is-reacting")
    })
}), define("github/legacy/behaviors/removed_contents", ["delegated-events", "../../observe"], function (e, t) {
    t.observe(".has-removed-contents", function () {
        var t = void 0;
        return {
            add: function (n) {
                t = Array.from(n.childNodes);
                var r = !0, a = !1, i = void 0;
                try {
                    for (var o, s = t[Symbol.iterator](); !(r = (o = s.next()).done); r = !0) {
                        var u = o.value;
                        n.removeChild(u)
                    }
                } catch (l) {
                    a = !0, i = l
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (a)throw i
                    }
                }
                var c = n.closest("form");
                c && e.fire(c, "change")
            }, remove: function (n) {
                var r = !0, a = !1, i = void 0;
                try {
                    for (var o, s = t[Symbol.iterator](); !(r = (o = s.next()).done); r = !0) {
                        var u = o.value;
                        n.appendChild(u)
                    }
                } catch (l) {
                    a = !0, i = l
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (a)throw i
                    }
                }
                var c = n.closest("form");
                c && e.fire(c, "change")
            }
        }
    })
}), define("github/legacy/behaviors/repo-list", ["delegated-events", "../../jquery", "../../fetch"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(t) {
        function r(n) {
            var r = t.closest(".js-repo-filter");
            r.querySelector(".js-repo-list").innerHTML = n;
            var a = r.querySelector(".js-filterable-field");
            return a && e.fire(a, "filterable:change"), t.remove()
        }

        function a() {
            return t.classList.remove("is-loading")
        }

        if (!t.classList.contains("is-loading"))return t.classList.add("is-loading"), n.fetchText(t.href).then(r).then(a, a)
    }

    var i = r(t);
    i["default"](document).on("focusin", ".js-repo-filter .js-filterable-field", function () {
        var e = this.closest(".js-repo-filter").querySelector(".js-more-repos-link");
        e && a(e)
    }), i["default"](document).on("click", ".js-repo-filter .js-repo-filter-tab", function (t) {
        var n = void 0, r = void 0, i = this.closest(".js-repo-filter"), o = i.querySelector(".js-more-repos-link");
        o && a(o);
        var s = i.querySelectorAll(".js-repo-filter-tab");
        for (n = 0, r = s.length; r > n; n++) {
            var u = s[n];
            u.classList.toggle("filter-selected", u === this)
        }
        e.fire(i.querySelector(".js-filterable-field"), "filterable:change"), t.preventDefault()
    }), i["default"](document).on("filterable:change", ".js-repo-filter .js-repo-list", function () {
        var e = this.closest(".js-repo-filter"), t = e.querySelector(".js-repo-filter-tab.filter-selected"), n = t ? t.getAttribute("data-filter") : void 0;
        n && i["default"](this).children().not(n).hide()
    }), i["default"](document).on("click", ".js-more-repos-link", function (e) {
        e.preventDefault(), a(this)
    })
}),define("github/legacy/behaviors/session-resume", ["delegated-events", "../../metadata", "../../setimmediate", "../../session-storage"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        e = e || window.location;
        var n = t.getMetadataByName(document, "session-resume-id");
        return n || e.pathname
    }

    function o(e) {
        return e.id && e.value !== e.defaultValue && e.form !== d
    }

    function s(e) {
        var t = "session-resume:" + e, n = [], a = !0, i = !1, s = void 0;
        try {
            for (var u, l = document.querySelectorAll(".js-session-resumable")[Symbol.iterator](); !(a = (u = l.next()).done); a = !0) {
                var c = u.value;
                (c instanceof HTMLInputElement || c instanceof HTMLTextAreaElement) && n.push(c)
            }
        } catch (d) {
            i = !0, s = d
        } finally {
            try {
                !a && l["return"] && l["return"]()
            } finally {
                if (i)throw s
            }
        }
        var f = n.filter(function (e) {
            return o(e)
        }).map(function (e) {
            return [e.id, e.value]
        });
        f.length && r.setItem(t, JSON.stringify(f))
    }

    function u(t) {
        var n = "session-resume:" + t, a = r.getItem(n);
        if (a) {
            r.removeItem(n);
            var i = [], o = !0, s = !1, u = void 0;
            try {
                for (var d, f = JSON.parse(a)[Symbol.iterator](); !(o = (d = f.next()).done); o = !0) {
                    var h = d.value, m = c(h, 2), v = m[0], p = m[1];
                    if (e.fire(document, "session:resume", {targetId: v, targetValue: p})) {
                        var g = document.getElementById(v);
                        g && (g instanceof HTMLInputElement || g instanceof HTMLTextAreaElement) && g.value === g.defaultValue && (g.value = p, i.push(g))
                    }
                }
            } catch (y) {
                s = !0, u = y
            } finally {
                try {
                    !o && f["return"] && f["return"]()
                } finally {
                    if (s)throw u
                }
            }
            l["default"](function () {
                var t = !0, n = !1, r = void 0;
                try {
                    for (var a, o = i[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
                        var s = a.value;
                        e.fire(s, "change")
                    }
                } catch (u) {
                    n = !0, r = u
                } finally {
                    try {
                        !t && o["return"] && o["return"]()
                    } finally {
                        if (n)throw r
                    }
                }
            })
        }
    }

    var l = a(n), c = function () {
        function e(e, t) {
            var n = [], r = !0, a = !1, i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (u) {
                a = !0, i = u
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a)throw i
                }
            }
            return n
        }

        return function (t, n) {
            if (Array.isArray(t))return t;
            if (Symbol.iterator in Object(t))return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }(), d = null;
    window.addEventListener("submit", function (e) {
        d = e.target, l["default"](function () {
            e.defaultPrevented && (d = null)
        })
    }, {capture: !0}), window.addEventListener("pageshow", function () {
        u(i())
    }), window.addEventListener("pjax:end", function () {
        u(i())
    }), window.addEventListener("pagehide", function () {
        s(i())
    }), window.addEventListener("pjax:beforeReplace", function (e) {
        var t = e.detail.previousState, n = t ? t.url : null;
        if (n) s(i(new URL(n))); else {
            var r = new Error("pjax:beforeReplace event.detail.previousState.url is undefined");
            l["default"](function () {
                throw r
            })
        }
    })
}),define("github/legacy/behaviors/size_to_fit", ["../../dimensions", "../../observe", "../../jquery", "../../visible"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        return l["default"](e).on("user:resize.trackUserResize", function () {
            return l["default"](e).addClass("is-user-resized"), l["default"](e).css({"max-height": ""})
        })
    }

    function o(e) {
        return l["default"](e).off("user:resize.trackUserResize")
    }

    function s(t) {
        function n() {
            if (t.value !== a && c["default"](t)) {
                var n = e.overflowOffset(r[0]);
                if (!(null == n || n.top < 0 || n.bottom < 0)) {
                    var i = r.outerHeight() + n.bottom;
                    t.style.maxHeight = i - 100 + "px";
                    var o = t.parentNode, s = o.style.height;
                    o.style.height = l["default"](o).css("height"), t.style.height = "auto", r.innerHeight(t.scrollHeight), o.style.height = s, a = t.value
                }
            }
        }

        var r = l["default"](t), a = null;
        r.on("change.sizeToFit", function () {
            n()
        }), r.on("input.sizeToFit", function () {
            n()
        }), t.value && n()
    }

    function u(e) {
        l["default"](e).off(".sizeToFit")
    }

    var l = a(n), c = a(r);
    l["default"](document).on("reset", "form", function () {
        var e = l["default"](this).find("textarea.js-size-to-fit");
        e.removeClass("is-user-resized"), e.css({height: "", "max-height": ""})
    }), t.observe("textarea.js-size-to-fit", {
        add: i,
        remove: o
    }), t.observe("textarea.js-size-to-fit:not(.is-user-resized)", {add: s, remove: u})
}),define("github/legacy/behaviors/social", ["../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("ajaxSuccess", ".js-social-container", function (e, t, r, a) {
        return n["default"](this).find(".js-social-count").text(a.count)
    })
}),define.register("reconnectingwebsocket"),function (e, t) {
    "function" == typeof define && define.amd ? define([], t) : "undefined" != typeof module && module.exports ? module.exports = t() : e.ReconnectingWebSocket = t()
}(this, function () {
    function e(t, n, r) {
        function a(e, t) {
            var n = document.createEvent("CustomEvent");
            return n.initCustomEvent(e, !1, !1, t), n
        }

        var i = {
            debug: !1,
            automaticOpen: !0,
            reconnectInterval: 1e3,
            maxReconnectInterval: 3e4,
            reconnectDecay: 1.5,
            timeoutInterval: 2e3,
            maxReconnectAttempts: null
        };
        r || (r = {});
        for (var o in i)"undefined" != typeof r[o] ? this[o] = r[o] : this[o] = i[o];
        this.url = t, this.reconnectAttempts = 0, this.readyState = WebSocket.CONNECTING, this.protocol = null;
        var s, u = this, l = !1, c = !1, d = document.createElement("div");
        d.addEventListener("open", function (e) {
            u.onopen(e)
        }), d.addEventListener("close", function (e) {
            u.onclose(e)
        }), d.addEventListener("connecting", function (e) {
            u.onconnecting(e)
        }), d.addEventListener("message", function (e) {
            u.onmessage(e)
        }), d.addEventListener("error", function (e) {
            u.onerror(e)
        }), this.addEventListener = d.addEventListener.bind(d), this.removeEventListener = d.removeEventListener.bind(d), this.dispatchEvent = d.dispatchEvent.bind(d), this.open = function (t) {
            if (s = new WebSocket(u.url, n || []), t) {
                if (this.maxReconnectAttempts && this.reconnectAttempts > this.maxReconnectAttempts)return
            } else d.dispatchEvent(a("connecting")), this.reconnectAttempts = 0;
            (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "attempt-connect", u.url);
            var r = s, i = setTimeout(function () {
                (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "connection-timeout", u.url), c = !0, r.close(), c = !1
            }, u.timeoutInterval);
            s.onopen = function (n) {
                clearTimeout(i), (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "onopen", u.url), u.protocol = s.protocol, u.readyState = WebSocket.OPEN, u.reconnectAttempts = 0;
                var r = a("open");
                r.isReconnect = t, t = !1, d.dispatchEvent(r)
            }, s.onclose = function (n) {
                if (clearTimeout(i), s = null, l) u.readyState = WebSocket.CLOSED, d.dispatchEvent(a("close")); else {
                    u.readyState = WebSocket.CONNECTING;
                    var r = a("connecting");
                    r.code = n.code, r.reason = n.reason, r.wasClean = n.wasClean, d.dispatchEvent(r), t || c || ((u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "onclose", u.url), d.dispatchEvent(a("close")));
                    var i = u.reconnectInterval * Math.pow(u.reconnectDecay, u.reconnectAttempts);
                    setTimeout(function () {
                        u.reconnectAttempts++, u.open(!0)
                    }, i > u.maxReconnectInterval ? u.maxReconnectInterval : i)
                }
            }, s.onmessage = function (t) {
                (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "onmessage", u.url, t.data);
                var n = a("message");
                n.data = t.data, d.dispatchEvent(n)
            }, s.onerror = function (t) {
                (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "onerror", u.url, t), d.dispatchEvent(a("error"))
            }
        }, 1 == this.automaticOpen && this.open(!1), this.send = function (t) {
            if (s)return (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "send", u.url, t), s.send(t);
            throw"INVALID_STATE_ERR : Pausing to reconnect websocket"
        }, this.close = function (e, t) {
            "undefined" == typeof e && (e = 1e3), l = !0, s && s.close(e, t)
        }, this.refresh = function () {
            s && s.close()
        }
    }

    if ("WebSocket" in window)return e.prototype.onopen = function (e) {
    }, e.prototype.onclose = function (e) {
    }, e.prototype.onconnecting = function (e) {
    }, e.prototype.onmessage = function (e) {
    }, e.prototype.onerror = function (e) {
    }, e.debugAll = !1, e.CONNECTING = WebSocket.CONNECTING, e.OPEN = WebSocket.OPEN, e.CLOSING = WebSocket.CLOSING, e.CLOSED = WebSocket.CLOSED, e
}),define.registerEnd(),define("github/legacy/behaviors/socket_channel", ["invariant", "../../observe", "../../jquery", "reconnectingwebsocket"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i() {
        var e = document.head && document.head.querySelector("link[rel=web-socket]");
        if (e) {
            l["default"](e instanceof HTMLLinkElement, "Link must be of type HTMLLinkElement");
            var t = new d["default"](e.href);
            return t.reconnectInterval = 2e3 * Math.random() + 1e3, t.reconnectDecay = 2, t.maxReconnectAttempts = 5, t.addEventListener("open", function () {
                try {
                    for (var e in f)t.send("subscribe:" + e)
                } catch (n) {
                    t.refresh()
                }
            }), t.addEventListener("message", function (e) {
                var t = void 0, n = void 0, r = void 0;
                r = JSON.parse(e.data), n = r[0], t = r[1], n && t && c["default"](h[n]).trigger("socket:message", [t, n])
            }), t
        }
    }

    function o(e) {
        var t = e.getAttribute("data-channel");
        return t ? t.split(/\s+/) : []
    }

    function s(e) {
        var t = void 0, n = void 0;
        m || (m = i());
        var r = m;
        if (r) {
            var a = o(e);
            for (t = 0, n = a.length; n > t; t++) {
                var s = a[t];
                r.readyState !== WebSocket.OPEN || f[s] || r.send("subscribe:" + s), f[s] = !0, null == h[s] && (h[s] = []), h[s].push(e)
            }
        }
    }

    function u(e) {
        var t = void 0, n = void 0, r = o(e);
        for (t = 0, n = r.length; n > t; t++) {
            var a = r[t];
            h[a] = c["default"](h[a]).not(e).slice(0)
        }
    }

    var l = a(e), c = a(n), d = a(r), f = {}, h = {}, m = null;
    t.observe(".js-socket-channel[data-channel]", {add: s, remove: u})
}),define("github/legacy/behaviors/stale_session", ["invariant", "delegated-events"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e);
    !function () {
        var e = document.querySelector("meta[name=user-login]");
        if (e instanceof HTMLMetaElement) {
            var n = e.content, a = String(!!n.length);
            try {
                localStorage.setItem("logged-in", a)
            } catch (i) {
                return
            }
            window.addEventListener("storage", function (e) {
                if (e.storageArea === localStorage && "logged-in" === e.key && e.newValue !== a) {
                    a = e.newValue;
                    var n = document.querySelector(".js-stale-session-flash");
                    r["default"](n instanceof HTMLElement, "Flash element must exist and be an HTMLElement"), n.classList.toggle("is-signed-in", "true" === a), n.classList.toggle("is-signed-out", "false" === a), n.classList.remove("d-none"), window.addEventListener("popstate", function (e) {
                        null != e.state.container && location.reload()
                    }), t.on("submit", "form", function (e) {
                        e.preventDefault()
                    })
                }
            })
        }
    }()
}),define("github/text-field-mirror", ["exports", "invariant"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e, t) {
        var n = e.nodeName.toLowerCase();
        if ("textarea" !== n && "input" !== n)throw new Error("expected textField to a textarea or input");
        var r = s.get(e);
        if (r && r.parentElement === e.parentElement) r.innerHTML = ""; else {
            r = document.createElement("div"), s.set(e, r);
            var u = window.getComputedStyle(e), l = i.slice(0);
            "textarea" === n ? l.push("white-space:pre-wrap;") : l.push("white-space:nowrap;");
            for (var c = 0, d = o.length; d > c; c++) {
                var f = o[c];
                l.push(f + ":" + u.getPropertyValue(f) + ";")
            }
            r.style.cssText = l.join(" ")
        }
        var h = void 0;
        t !== !1 && (h = document.createElement("span"), h.style.cssText = "position: absolute;", h.className = "text-field-mirror-marker", h.innerHTML = "&nbsp;");
        var m = void 0, v = void 0;
        if ("number" == typeof t) {
            var p = e.value.substring(0, t);
            p && (m = document.createTextNode(p)), p = e.value.substring(t), p && (v = document.createTextNode(p))
        } else {
            var g = e.value;
            g && (m = document.createTextNode(g))
        }
        return m && r.appendChild(m), h && r.appendChild(h), v && r.appendChild(v), r.parentElement || (a["default"](e.parentElement, "textField must have a parentElement to mirror"), e.parentElement.insertBefore(r, e)), r.scrollTop = e.scrollTop, r.scrollLeft = e.scrollLeft, r
    }

    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = r;
    var a = n(t), i = ["position:absolute;", "overflow:auto;", "word-wrap:break-word;", "top:0px;", "left:-9999px;"], o = ["box-sizing", "font-family", "font-size", "font-style", "font-variant", "font-weight", "height", "letter-spacing", "line-height", "max-height", "min-height", "padding-bottom", "padding-left", "padding-right", "padding-top", "border-bottom", "border-left", "border-right", "border-top", "text-decoration", "text-indent", "text-transform", "width", "word-spacing"], s = new WeakMap
}),define("github/text-field-selection-position", ["exports", "./jquery", "./text-field-mirror"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.selectionEnd, n = o["default"](e, t), r = i["default"](n).find(".text-field-mirror-marker").position();
        return r.top += parseInt(i["default"](n).css("border-top-width"), 10), r.left += parseInt(i["default"](n).css("border-left-width"), 10), setTimeout(function () {
            i["default"](n).remove()
        }, 5e3), r
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = a;
    var i = r(t), o = r(n)
}),define("github/suggester", ["exports", "./fetch", "./navigation", "./jquery", "./typecast", "./stats", "./text-field-selection-position"], function (e, t, n, r, a, i, o) {
    function s(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function u(e, t) {
        if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var l = s(r), c = s(a), d = s(i), f = s(o), h = function () {
        function e(e, t) {
            var n = [], r = !0, a = !1, i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (u) {
                a = !0, i = u
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a)throw i
                }
            }
            return n
        }

        return function (t, n) {
            if (Array.isArray(t))return t;
            if (Symbol.iterator in Object(t))return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }(), m = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(), v = {}, p = function () {
        function e(t) {
            u(this, e), this.setup = this.setup.bind(this), this.teardown = this.teardown.bind(this), this.textarea = t.input, this.types = t.types, this.suggester = t.suggester, this.repositionManually = t.repositionManually, this.teardownManually = t.teardownManually, this.onActivate = t.onActivate, this.suggestions = t.suggestions || document.createElement("div"), this.disable = t.disable
        }

        return m(e, [{
            key: "setup", value: function () {
                l["default"](this.textarea.form).on("reset.suggester", this.deactivate.bind(this)), l["default"](this.textarea).on("paste.suggester", this.onPaste.bind(this)), l["default"](this.textarea).on("input.suggester", this.onInput.bind(this)), l["default"](this.suggester).on("navigation:keydown.suggester", "[data-value]", this.onNavigationKeyDown.bind(this)), l["default"](this.suggester).on("navigation:open.suggester", "[data-value]", this.onNavigationOpen.bind(this)), this.teardownManually || l["default"](this.textarea).on("focusout:delayed.suggester", this.teardown), this.loadSuggestions()
            }
        }, {
            key: "teardown", value: function () {
                this.deactivate(), l["default"](this.textarea).off(".suggester"), l["default"](this.textarea.form).off(".suggester"), l["default"](this.suggester).off(".suggester"), this.onSuggestionsLoaded = function () {
                    return null
                }
            }
        }, {
            key: "onPaste", value: function () {
                this.deactivate(), this.justPasted = !0
            }
        }, {
            key: "onInput", value: function () {
                return this.justPasted ? void(this.justPasted = !1) : this.checkQuery() ? !1 : void 0
            }
        }, {
            key: "onNavigationKeyDown", value: function (e) {
                switch (e.originalEvent.detail.hotkey) {
                    case"tab":
                        return this.onNavigationOpen(e), !1;
                    case"esc":
                        return this.deactivate(), e.stopImmediatePropagation(), !1
                }
            }
        }, {
            key: "_getDataValue", value: function (e) {
                return this.currentSearch.type.getValue ? this.currentSearch.type.getValue(e) : e.getAttribute("data-value")
            }
        }, {
            key: "_findIndexOfPick", value: function (e, t) {
                var n = 1, r = !0, a = !1, i = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done); r = !0) {
                        var u = o.value;
                        if (this._getDataValue(u) === t)return n;
                        n++
                    }
                } catch (l) {
                    a = !0, i = l
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (a)throw i
                    }
                }
                return -1
            }
        }, {
            key: "logMention", value: function (e, n, r, a) {
                var i = r.getAttribute("data-mentionable-type");
                if (i) {
                    var o = r.getAttribute("data-mentionable-id");
                    if (o) {
                        var s = new FormData;
                        s.append("authenticity_token", n), s.append("mentionable_type", i), s.append("mentionable_id", o), s.append("query_string", a), t.fetch(e, {
                            method: "POST",
                            body: s
                        })
                    }
                }
            }
        }, {
            key: "onNavigationOpen", value: function (e) {
                var t = this, n = this._getDataValue(e.target), r = this.currentSearch.type.typeid, a = c["default"](this.suggester.querySelector("ul.suggestions"), HTMLElement).children, i = this._findIndexOfPick(a, n), o = this.currentSearch.query.length, s = this.textarea.value.substring(0, this.currentSearch.endIndex), u = this.textarea.value.substring(this.currentSearch.endIndex);
                this.currentSearch.type.onSelection ? this.currentSearch.type.onSelection(n) : (s = s.replace(this.currentSearch.type.match, this.currentSearch.type.replace.replace("$value", n)), this.textarea.value = s + u), this.deactivate(), this.textarea.focus(), this.textarea.selectionStart = s.length, this.textarea.selectionEnd = s.length, d["default"]({
                    suggesterBehavior: {
                        version: 1,
                        typeid: r,
                        indexOfPick: i,
                        numCharacters: o
                    }
                });
                var l = this.suggester.getAttribute("data-log-mention-url");
                if (l) {
                    var f = this.suggester.getAttribute("data-log-mention-authenticity-token");
                    f && requestIdleCallback(function () {
                        return t.logMention(l, f, e.target, t.currentSearch.query)
                    })
                }
            }
        }, {
            key: "checkQuery", value: function () {
                var e = this, t = this.searchQuery();
                if (t) {
                    if (this.currentSearch && this.currentSearch === t.query)return;
                    return this.currentSearch = t, this.search(t.type, t.query).then(function (n) {
                        return n ? e.activate(t.startIndex) : e.deactivate()
                    }), this.currentSearch.query
                }
                return this.currentSearch = null, void this.deactivate()
            }
        }, {
            key: "activate", value: function (e) {
                this.textarea === document.activeElement && (this.onActivate && this.onActivate(this.suggester), this.repositionManually || l["default"](this.suggester).css(f["default"](this.textarea, e + 1)), this.suggester.classList.contains("active") || (this.suggester.classList.add("active"), this.textarea.classList.add("js-navigation-enable"), n.push(this.suggester), n.focus(this.suggester)))
            }
        }, {
            key: "deactivate", value: function () {
                if (this.suggester.classList.contains("active")) {
                    this.suggester.classList.remove("active");
                    var e = this.suggester.querySelector(".suggestions");
                    e && (e.style.display = "none"), this.textarea.classList.remove("js-navigation-enable"), n.pop(this.suggester)
                }
            }
        }, {
            key: "search", value: function (e, t) {
                var r = this;
                return e.search(this.suggestions, t).then(function (e) {
                    var t = h(e, 2), a = t[0], i = t[1];
                    if (i > 0) {
                        var o = a[0].cloneNode(!0);
                        return r.suggester.innerHTML = "", r.suggester.appendChild(o), o.style.display = "block", n.focus(r.suggester), !0
                    }
                    return !1
                })
            }
        }, {
            key: "searchQuery", value: function () {
                var e = this.textarea.selectionEnd, t = this.textarea.value.substring(0, e);
                if (!this.disable || !this.disable(t))for (var n in this.types) {
                    var r = this.types[n], a = t.match(r.match);
                    if (a)return r.normalizeMatch ? r.normalizeMatch(r, e, a) : this.normalizeMatch(r, e, a)
                }
            }
        }, {
            key: "normalizeMatch", value: function (e, t, n) {
                var r = n[2], a = n[3], i = t - r.length, o = t;
                return {type: e, text: r, query: a, startIndex: i, endIndex: o}
            }
        }, {
            key: "loadSuggestions", value: function () {
                var e = this;
                if (!this.suggestions.hasChildNodes()) {
                    var n = this.suggester.getAttribute("data-url");
                    if (n) {
                        var r = v[n] || (v[n] = t.fetchText(n));
                        return r.then(function (t) {
                            return e.onSuggestionsLoaded(t)
                        })
                    }
                }
            }
        }, {
            key: "onSuggestionsLoaded", value: function (e) {
                var t = this;
                return l["default"].parseHTML(e).forEach(function (e) {
                    return t.suggestions.appendChild(e)
                }), document.activeElement === this.textarea ? (this.currentSearch = null, this.checkQuery()) : void 0
            }
        }]), e
    }();
    e["default"] = p
}),define("github/legacy/behaviors/suggester", ["../../jquery", "../../suggester", "../../fuzzy-filter-sort-list"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e, t, n) {
        var r = n[3], a = n[4], i = t - a.length, o = t;
        return {type: e, text: r, query: a, startIndex: i, endIndex: o}
    }

    function i(e) {
        var t = e.getAttribute("data-emoji-name");
        return j[t] = " " + o(e).replace(/_/g, " "), t
    }

    function o(e) {
        return e.getAttribute("data-text").trim().toLowerCase()
    }

    function s(e, t) {
        var n = j[e].indexOf(t);
        return n > -1 ? 1e3 - n : 0
    }

    function u(e, t) {
        var n = e.search(t);
        return n > -1 ? 1e3 - n : 0
    }

    function l(e, t) {
        var n = void 0, r = void 0, a = void 0, i = void 0, o = c(e, t[0]);
        if (0 !== o.length) {
            if (1 === t.length)return [o[0], 1, []];
            for (i = null, r = 0, a = o.length; a > r; r++) {
                var s = o[r];
                if (n = d(e, t, s + 1)) {
                    var u = n[n.length - 1] - s;
                    (!i || u < i[1]) && (i = [s, u, n])
                }
            }
            return i
        }
    }

    function c(e, t) {
        for (var n = 0, r = []; (n = e.indexOf(t, n)) > -1;)r.push(n++);
        return r
    }

    function d(e, t, n) {
        var r = void 0, a = void 0, i = void 0, o = [];
        for (r = a = 1, i = t.length; i >= 1 ? i > a : a > i; r = i >= 1 ? ++a : --a) {
            if (n = e.indexOf(t[r], n), -1 === n)return;
            o.push(n++)
        }
        return o
    }

    function f() {
        return 2
    }

    function h(e) {
        var t = void 0;
        if (e) {
            var n = e.toLowerCase().split("");
            t = function (t) {
                if (!t)return 0;
                var r = l(t, n);
                if (!r)return 0;
                var a = e.length / r[1];
                return a /= r[0] / 2 + 1
            }
        } else t = f;
        return {score: t}
    }

    function m(e) {
        var t = e.match(/`{3,}/g);
        return t || (t = v(e).match(/`/g)), null != t && t.length % 2
    }

    function v(e) {
        return e.replace(/`{3,}[^`]*\n(.+)?\n`{3,}/g, "")
    }

    var p = r(e), g = r(t), y = r(n), b = {
        mention: {
            typeid: "mention",
            match: /(^|\s)(@([a-z0-9\-_\/]*))$/i,
            replace: "$1@$value ",
            search: function (e, t) {
                var n = h(t), r = p["default"](e).find("ul.mention-suggestions"), a = y["default"](r[0], t, {
                    limit: 5,
                    text: o,
                    score: function (e, t, r) {
                        var a = n.score(e, t, r), i = r.getAttribute("data-mentionable-score");
                        return null !== i ? a * parseFloat(i) : a
                    }
                });
                return Promise.resolve([r, a])
            }
        },
        auditLogUser: {
            typeid: "auditLogUser",
            match: /(^|\s)((\-?actor:|\-?user:)([a-z0-9\-\+_]*))$/i,
            replace: "$1$3$value ",
            search: function (e, t) {
                var n = p["default"](e).find("ul.user-suggestions"), r = y["default"](n[0], t, {limit: 5});
                return Promise.resolve([n, r])
            },
            normalizeMatch: a
        },
        auditLogOrg: {
            typeid: "auditLogOrg",
            match: /(^|\s)((\-?org:)([a-z0-9\-\+_]*))$/i,
            replace: "$1$3$value ",
            search: function (e, t) {
                var n = p["default"](e).find("ul.org-suggestions"), r = y["default"](n[0], t, {limit: 5});
                return Promise.resolve([n, r])
            },
            normalizeMatch: a
        },
        auditLogAction: {
            typeid: "auditLogAction",
            match: /(^|\s)((\-?action:)([a-z0-9\.\-\+_]*))$/i,
            replace: "$1$3$value ",
            search: function (e, t) {
                var n = p["default"](e).find("ul.action-suggestions"), r = y["default"](n[0], t, {limit: 5});
                return Promise.resolve([n, r])
            },
            normalizeMatch: a
        },
        auditLogRepo: {
            typeid: "auditLogRepo",
            match: /(^|\s)((\-?repo:)([a-z0-9\/\-\+_]*))$/i,
            replace: "$1$3$value ",
            search: function (e, t) {
                var n = p["default"](e).find("ul.repo-suggestions"), r = y["default"](n[0], t, {limit: 5});
                return Promise.resolve([n, r])
            },
            normalizeMatch: a
        },
        auditLogCountry: {
            typeid: "auditLogCountry",
            match: /(^|\s)((\-?country:)([a-z0-9\-\+_]*))$/i,
            replace: "$1$3$value ",
            search: function (e, t) {
                var n = p["default"](e).find("ul.country-suggestions"), r = y["default"](n[0], t, {limit: 5});
                return Promise.resolve([n, r])
            },
            normalizeMatch: a
        },
        emoji: {
            typeid: "emoji", match: /(^|\s)(:([a-z0-9\-\+_]*))$/i, replace: "$1$value ", getValue: function (e) {
                var t = e.firstElementChild;
                return t && "G-EMOJI" === t.tagName && !t.firstElementChild ? t.textContent : e.getAttribute("data-value")
            }, search: function (e, t) {
                var n = p["default"](e).find("ul.emoji-suggestions");
                t = " " + t.toLowerCase().replace(/_/g, " ");
                var r = y["default"](n[0], t, {limit: 5, text: i, score: s});
                return Promise.resolve([n, r])
            }
        },
        hashed: {
            typeid: "issue",
            match: /(^|\s)(\#([a-z0-9\-_\/]*))$/i,
            replace: "$1#$value ",
            search: function (e, t) {
                var n = void 0, r = p["default"](e).find("ul.hashed-suggestions"), a = /^\d+$/.test(t) ? (n = new RegExp("\\b" + t), function (e) {
                    return u(e, n)
                }) : h(t).score, i = y["default"](r[0], t, {limit: 5, text: o, score: a});
                return Promise.resolve([r, i])
            }
        }
    }, j = {};
    p["default"](document).on("focusin:delayed", ".js-suggester-field", function () {
        new g["default"]({
            input: this,
            suggester: this.closest(".js-suggester-container").querySelector(".js-suggester"),
            types: b,
            disable: m
        }).setup()
    })
}),define("github/local-storage", ["exports"], function (e) {
    function t(e) {
        try {
            return localStorage.getItem(e)
        } catch (t) {
            return null
        }
    }

    function n(e, t) {
        try {
            localStorage.setItem(e, t)
        } catch (n) {
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.getItem = t, e.setItem = n
}),define("github/legacy/behaviors/survey", ["../../typecast", "invariant", "../../observe", "../../local-storage", "../../form", "../../google-analytics", "../../jquery"], function (e, t, n, r, a, i, o) {
    function s(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function u() {
        var e = document.querySelector(".js-survey");
        y["default"](e, "Missing `js-survey` element");
        var t = e.getAttribute("data-survey-slug");
        return y["default"](null != t, "Missing `data-survey-slug` attribute"), "survey-" + t
    }

    function l() {
        return parseInt(r.getItem(u())) || 0
    }

    function c() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
        r.setItem(u(), l() + e)
    }

    function d() {
        return "github.dev" === location.hostname || location.search.match(/show-survey=1/) ? !0 : l() < j
    }

    function f(e) {
        if (e.getAttribute("data-optional-question"))return !0;
        var t = e.querySelector("input.js-other-choice"), n = e.querySelector("input[type=text]");
        if (t && t.checked) {
            var r = n.value.trim();
            return r
        }
        return e.querySelector("input:checked") ? !0 : !1
    }

    function h(e) {
        var t = e.closest(".js-survey"), n = t.querySelector(".js-survey-button");
        n.disabled = !f(e)
    }

    function m(e) {
        var t = e.querySelector("input.js-other-choice"), n = e.querySelector("input[type=text]");
        t && (n.classList.toggle("d-none", !t.checked), t.checked && n.focus())
    }

    function v(e, t) {
        var n = e.querySelector(".js-survey-form"), r = e.querySelectorAll(".js-survey-box-header, .js-survey-body, .js-survey-footer"), o = e.querySelector(".js-survey-complete");
        t.classList.toggle("d-none", !0), Array.from(r).forEach(function (e) {
            return e.classList.toggle("d-none", !0)
        }), o.classList.toggle("d-none", !1), i.trackEvent({
            category: "survey",
            action: "click",
            label: "submit"
        }), c(j), n && a.submit(n), e.classList.contains("js-survey-fixed") && setTimeout(function () {
            return e.classList.toggle("anim-fade-down", !0)
        }, 5e3)
    }

    function p(e, t, n) {
        var r = n.getAttribute("data-next-question"), a = e.querySelector(".js-question[data-question='" + r + "']"), o = e.querySelector(".js-question-number");
        i.trackEvent({
            category: "survey",
            action: "click",
            label: "next",
            value: r
        }), o.textContent = parseInt(r) + 1, a.classList.toggle("d-none", !1), h(a), a.getAttribute("data-last-question") && (a.querySelector("textarea").focus(), t.textContent = "Submit", t.classList.add("btn-primary"))
    }

    var g = s(e), y = s(t), b = s(o), j = 3;
    n.observe(".js-survey", function (e) {
        d() ? (i.trackEvent({
            category: "survey",
            action: "show",
            interactive: !1
        }), c(), e.classList.toggle("d-none", !1)) : e.classList.toggle("d-none", !0)
    }), b["default"](document).on("ajaxSuccess", ".js-survey-form", function () {
        i.trackEvent({category: "survey", action: "success"})
    }), b["default"](document).on("click", ".js-survey-button", function () {
        var e = this.closest(".js-survey"), t = e.querySelector(".js-question:not(.d-none)"), n = t.getAttribute("data-last-question"), r = this;
        t.classList.toggle("d-none", !0), n ? v(e, r) : p(e, r, t)
    }), b["default"](document).on("click", ".js-dismiss-survey", function (e) {
        i.trackEvent({
            category: "survey",
            action: "click",
            label: "dismiss"
        }), g["default"](document.querySelector(".js-survey"), HTMLElement).classList.toggle("anim-fade-down", !0), c(j), e.preventDefault()
    }), b["default"](document).on("change", ".js-survey", function () {
        var e = this.querySelector(".js-question:not(.d-none)");
        h(e), m(e)
    }), n.observe(".js-survey input[type=text]", function (e) {
        b["default"](e).on("input", function () {
            var e = this.closest(".js-survey"), t = e.querySelector(".js-question:not(.d-none)");
            h(t)
        })
    })
}),define("github/legacy/behaviors/tag_input", ["../../typecast", "../../observe", "delegated-events", "../../fetch", "../../jquery", "../../suggester", "../../fuzzy-filter", "../../hotkey", "../../fuzzy-filter-sort-list"], function (e, t, n, r, a, i, o, s, u) {
    function l(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function c(e, t) {
        if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
    }

    var d = l(e), f = l(a), h = l(i), m = l(s), v = l(u), p = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(), g = function () {
        function e(t) {
            c(this, e), this.container = t.container, this.selections = t.selections, this.inputWrap = t.inputWrap, this.input = t.input, this.suggestions = t.suggestions, this.tagTemplate = t.tagTemplate, this.form = this.input.closest("form"), this.delayTimer = null
        }

        return p(e, [{
            key: "setup", value: function () {
                var e = this;
                this.container.addEventListener("click", function (t) {
                    t.target.matches(".js-remove") ? e.removeTag(t) : e.onFocus()
                }), this.input.addEventListener("focus", this.onFocus.bind(this)), this.input.addEventListener("blur", this.onBlur.bind(this)), this.input.addEventListener("keydown", this.onKeyDown.bind(this)), this.form.addEventListener("submit", this.onSubmit.bind(this)), this.setupSuggester()
            }
        }, {
            key: "setupSuggester", value: function () {
                var e = this.suggestions.cloneNode(!0);
                this.container.appendChild(e), this.suggester = new h["default"]({
                    input: this.input,
                    suggester: this.suggestions,
                    suggestions: e,
                    repositionManually: !0,
                    teardownManually: !0,
                    onActivate: this.repositionSuggester.bind(this),
                    types: {
                        tag: {
                            match: /.+/i,
                            onSelection: this.selectTag.bind(this),
                            search: this.filterSuggestions.bind(this),
                            normalizeMatch: this.normalizeSuggestionMatch.bind(this)
                        }
                    }
                }), this.suggester.setup(), this.container.classList.add("js-suggester-container"), this.suggestions.classList.add("js-navigation-container", "suggester")
            }
        }, {
            key: "onFocus", value: function () {
                this.inputWrap.classList.add("focus"), this.input != document.activeElement && this.input.focus()
            }
        }, {
            key: "onBlur", value: function () {
                this.inputWrap.classList.remove("focus"), this.isSuggesterVisible() || this.onSubmit()
            }
        }, {
            key: "onSubmit", value: function () {
                this.val() && (this.selectTag(this.val()), this.suggester.deactivate())
            }
        }, {
            key: "onKeyDown", value: function (e) {
                switch (m["default"](e)) {
                    case"backspace":
                        this.onBackspace(e);
                        break;
                    case"enter":
                    case"tab":
                        this.taggifyValueWhenSuggesterHidden(e);
                        break;
                    case",":
                    case"space":
                        this.taggifyValue(e)
                }
            }
        }, {
            key: "taggifyValueWhenSuggesterHidden", value: function (e) {
                !this.isSuggesterVisible() && this.val() && (e.preventDefault(), this.selectTag(this.val()))
            }
        }, {
            key: "taggifyValue", value: function (e) {
                this.val() && (e.preventDefault(), this.selectTag(this.val()), this.suggester.deactivate())
            }
        }, {
            key: "selectTag", value: function (e) {
                var t = this.normalizeTag(e), r = this.selectedTags();
                t && r.indexOf(t) < 0 && (this.selections.appendChild(this.templateTag(t)), this.input.value = "", n.fire(this.form, "tags:changed"))
            }
        }, {
            key: "removeTag", value: function (e) {
                e.preventDefault(), e.target.closest(".js-tag-input-tag").remove(), n.fire(this.form, "tags:changed")
            }
        }, {
            key: "templateTag", value: function (e) {
                var t = this.tagTemplate.cloneNode(!0);
                return d["default"](t.querySelector("input"), HTMLInputElement).value = e, t.querySelector(".js-placeholder-tag-name").replaceWith(e), t.classList.remove("d-none", "js-template"), t
            }
        }, {
            key: "normalizeTag", value: function (e) {
                return e.toLowerCase().trim().replace(/[\s,']+/g, "-")
            }
        }, {
            key: "onBackspace", value: function () {
                if (!this.val()) {
                    var e = this.selections.querySelector("li:last-child .js-remove");
                    e && e.click()
                }
            }
        }, {
            key: "val", value: function () {
                return this.input.value
            }
        }, {
            key: "repositionSuggester", value: function (e) {
                e.style.position = "absolute", e.style.top = this.container.clientHeight + "px"
            }
        }, {
            key: "filterSuggestions", value: function (e, t) {
                var n = this, a = f["default"](e).find("ul.js-tag-suggestions"), i = a[0];
                if (i.hasAttribute("data-url"))return new Promise(function (e) {
                    clearTimeout(n.delayTimer), n.delayTimer = setTimeout(function () {
                        if (n.input.value.trim().length < 1 || !i)return e([a, 0]);
                        var o = new URL(i.getAttribute("data-url"), window.location.origin), s = new URLSearchParams(o.search.slice(1));
                        s.append("q", t), o.search = s.toString(), r.fetchSafeDocumentFragment(document, o).then(function (t) {
                            if (n.input.value.trim().length < 1)return e([a, 0]);
                            i.innerHTML = "", i.appendChild(t);
                            var r = a.find("li").length;
                            e([a, r])
                        })
                    }, 300)
                });
                var s = this.selectedTags(), u = v["default"](i, t, {
                    limit: 5, score: function (e, t) {
                        return s.indexOf(e) >= 0 ? 0 : s.indexOf(n.normalizeTag(e)) >= 0 ? 0 : o.fuzzyScore(e, t)
                    }
                });
                return Promise.resolve([a, u])
            }
        }, {
            key: "normalizeSuggestionMatch", value: function (e, t, n) {
                return {type: e, text: n[0], query: n[0]}
            }
        }, {
            key: "selectedTags", value: function () {
                var e = this.selections.querySelectorAll("input");
                return Array.from(e).map(function (e) {
                    return e.value
                }).filter(function (e) {
                    return e.length > 0
                })
            }
        }, {
            key: "isSuggesterVisible", value: function () {
                return !!this.suggestions.offsetParent
            }
        }]), e
    }();
    t.observe(".js-tag-input-container", function (e) {
        new g({
            container: e,
            inputWrap: e.querySelector(".js-tag-input-wrapper"),
            input: e.querySelector('input[type="text"]'),
            suggestions: e.querySelector(".js-tag-input-options"),
            selections: e.querySelector(".js-tag-input-selected-tags"),
            tagTemplate: e.querySelector(".js-template")
        }).setup()
    })
}),define("github/legacy/behaviors/team-members", ["../../jquery", "../../fetch", "../../observe"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a() {
        function e(e) {
            return 0 === e.total ? e.members.push("This team has no members") : e.total > e.members.length && e.members.push(e.total - e.members.length + " more"), i(u, o(e.members))
        }

        var n = void 0;
        if (n = this.getAttribute("data-url")) {
            var r = t.fetchJSON(n), a = this.getAttribute("data-id"), u = s["default"](".js-team-mention[data-id='" + a + "']");
            u.removeAttr("data-url");
            var l = function (e) {
                return function (t) {
                    var n = (null != t.response ? t.response.status : void 0) || 500, r = function () {
                        switch (n) {
                            case 404:
                                return this.getAttribute("data-permission-text");
                            default:
                                return this.getAttribute("data-error-text")
                        }
                    }.call(e);
                    return i(u, r)
                }
            }(this);
            return r.then(e, l)
        }
    }

    function i(e, t) {
        return e.attr("aria-label", t), e.addClass("tooltipped tooltipped-s tooltipped-multiline")
    }

    function o(e) {
        var t = void 0;
        return 0 === e.length ? "" : 1 === e.length ? e[0] : 2 === e.length ? e.join(" and ") : ([].splice.apply(e, [-1, 9e9].concat(t = "and " + e.slice(-1))), e.join(", "))
    }

    var s = r(e);
    n.observe(".js-team-mention", function (e) {
        s["default"](e).on("mouseenter", a)
    })
}),define("github/legacy/behaviors/timeline_marker", ["../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("ajaxBeforeSend", function (e, t, r) {
        if (!r.crossDomain) {
            var a = n["default"](".js-timeline-marker");
            a.length && t.setRequestHeader("X-Timeline-Last-Modified", a.attr("data-last-modified"))
        }
    })
}),define("github/legacy/behaviors/timeline_progressive_disclosure", ["../../dimensions", "../../observe", "delegated-events"], function (e, t, n) {
    function r(e) {
        for (var t = 0; t < u.length; t++) {
            var n = u[t].exec(e);
            if (null != n)return [n[1], n[2]]
        }
    }

    function a(e, t, n) {
        var r = new URL(e.getAttribute("data-fragment-url"), window.location.origin), a = new URLSearchParams(r.search.slice(1));
        a.append("focus_type", t), a.append("focus_value", n), r.search = a.toString(), e.src = r.toString()
    }

    function i() {
        return window.location.hash.slice(1)
    }

    var o = function () {
        function e(e, t) {
            var n = [], r = !0, a = !1, i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (u) {
                a = !0, i = u
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a)throw i
                }
            }
            return n
        }

        return function (t, n) {
            if (Array.isArray(t))return t;
            if (Symbol.iterator in Object(t))return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    n.on("click", ".js-timeline-progressive-disclosure-button", function () {
        var e = this.closest(".js-timeline-progressive-disclosure-container");
        e.src = this.getAttribute("data-url")
    });
    var s = null;
    t.observe(".js-timeline-progressive-disclosure-container", function () {
        return {
            add: function (t) {
                return t.addEventListener("loadstart", function () {
                    return this.classList.add("is-loading"), !0
                }), t.addEventListener("loadend", function () {
                    return this.classList.remove("is-loading"), !0
                }), t.addEventListener("load", function () {
                    if (t === s) {
                        s = null;
                        var n = i(), r = document.getElementById(n);
                        if (r) {
                            var a = r.closest(".js-details-container");
                            null != a && a.classList.add("open");
                            var o = e.overflowOffset(r);
                            null != o && (o.top < 0 || o.bottom < 0) && r.scrollIntoView()
                        }
                    }
                    return !0
                }), t.addEventListener("error", function () {
                    return this.src = "", !0
                })
            }
        }
    });
    var u = [/^(commitcomment)-(\d+)$/, /^(commits-pushed)-([0-9a-f]{7})$/, /^(discussion)_r(\d+)$/, /^(discussion-diff)-(\d+)(?:[LR]-?\d+)?$/, /^(event)-(\d+)$/, /^(issuecomment)-(\d+)$/, /^(ref-commit)-([0-9a-f]{7})$/, /^(ref-issue)-(\d+)$/, /^(ref-pullrequest)-(\d+)$/];
    !function () {
        var e = i();
        if (!document.getElementById(e)) {
            var t = document.querySelector(".js-timeline-progressive-disclosure-container");
            if (t) {
                var n = r(e);
                if (n) {
                    var u = o(n, 2), l = u[0], c = u[1];
                    return a(t, l, c), s = t
                }
            }
        }
    }()
}),define("github/page-focused", ["exports"], function (e) {
    function t(e) {
        return new Promise(function (t) {
            function n() {
                e.hasFocus() && (t(), e.removeEventListener("visibilitychange", n), window.removeEventListener("focus", n), window.removeEventListener("blur", n))
            }

            e.addEventListener("visibilitychange", n), window.addEventListener("focus", n), window.addEventListener("blur", n), n()
        })
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = t
}),define("github/in-viewport", ["exports", "./jquery", "./observe", "./page-focused"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        var t = e.getBoundingClientRect(), n = d["default"](window).height(), r = d["default"](window).width();
        if (0 === t.height)return !1;
        if (t.height < n)return t.top >= 0 && t.left >= 0 && t.bottom <= n && t.right <= r;
        var a = Math.ceil(n / 2);
        return t.top >= 0 && t.top + a < n
    }

    function o(e) {
        for (var t = e.elements, n = [], r = 0, a = t.length; a > r; r++) {
            var o = t[r];
            if (i(o)) {
                var s = e["in"];
                n.push(null != s ? s.call(o, o, e) : void 0)
            } else {
                var u = e.out;
                n.push(null != u ? u.call(o, o, e) : void 0)
            }
        }
        return n
    }

    function s(e) {
        document.hasFocus() && window.scrollY !== m && (m = window.scrollY, e.checkPending || (e.checkPending = !0, window.requestAnimationFrame(function () {
            e.checkPending = !1, o(e)
        })))
    }

    function u(e, t) {
        0 === t.elements.length && (window.addEventListener("scroll", t.scrollHandler, {
            capture: !0,
            passive: !0
        }), f["default"](document).then(function () {
            return o(t)
        })), t.elements.push(e)
    }

    function l(e, t) {
        var n = t.elements.indexOf(e);
        -1 !== n && t.elements.splice(n, 1), 0 === t.elements.length && window.removeEventListener("scroll", t.scrollHandler, {
            capture: !0,
            passive: !0
        })
    }

    function c(e, t) {
        null != t.call && (t = {"in": t});
        var r = {
            id: h++,
            selector: e,
            "in": t["in"],
            out: t.out,
            elements: [],
            checkPending: !1,
            scrollHandler: function () {
                s(r)
            }
        };
        return n.observe(e, {
            add: function (e) {
                u(e, r)
            }, remove: function (e) {
                l(e, r)
            }
        }), r
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = c;
    var d = a(t), f = a(r), h = 0, m = -1
}),define("github/legacy/behaviors/unread_comments", ["../../observe", "../../form", "../../jquery", "../../in-viewport"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i() {
        if (document.hasFocus()) {
            var e = document.querySelector(".js-timeline-marker-form");
            e && e instanceof HTMLFormElement && t.submit(e)
        }
    }

    function o(e) {
        return e.classList.remove("js-unread-item", "unread-item")
    }

    var s = a(n), u = a(r), l = 0;
    u["default"](".js-unread-item", {
        "in": function () {
            o(this)
        }
    }), e.observe(".js-unread-item", {
        add: function () {
            l++
        }, remove: function (e) {
            l--, 0 === l && i(e)
        }
    }), s["default"](document).on("socket:message", ".js-discussion", function (e) {
        var t = void 0, n = void 0;
        if (this === e.target) {
            var r = document.querySelectorAll(".js-unread-item");
            for (t = 0, n = r.length; n > t; t++) {
                var a = r[t];
                o(a)
            }
        }
    })
}),define("github/legacy/behaviors/unread_item_counter", ["../../observe"], function (e) {
    function t() {
        var e = n ? "(" + n + ") " : "";
        return document.title.match(r) ? document.title = document.title.replace(r, e) : document.title = "" + e + document.title
    }

    var n = 0, r = /^\(\d+\)\s+/;
    e.observe(".js-unread-item", {
        add: function () {
            n++, t()
        }, remove: function () {
            n--, t()
        }
    })
}),define("github/legacy/behaviors/user_content", ["../../jquery", "../../fragment-target"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r() {
        if (location.hash && !document.querySelector(":target")) {
            var e = void 0;
            try {
                e = decodeURIComponent(location.hash.slice(1))
            } catch (n) {
                return
            }
            var r = t.findElementByFragmentName(document, "user-content-" + e);
            null != r && r.scrollIntoView()
        }
    }

    var a = n(e);
    window.addEventListener("hashchange", r), a["default"](r), document.addEventListener("pjax:success", r)
}),define("github/legacy/behaviors/user_resize", ["../../jquery", "../../debounce"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r() {
        var e = null, t = o["default"](function () {
            return e = null
        }, 200), n = {x: 0, y: 0};
        i["default"](this).on("mousemove.userResize", function (r) {
            if (n.x !== r.clientX || n.y !== r.clientY) {
                var a = this.style.height;
                e && e !== a && i["default"](this).trigger("user:resize"), e = a, t()
            }
            n = {x: r.clientX, y: r.clientY}
        })
    }

    function a() {
        i["default"](this).off("mousemove.userResize")
    }

    var i = n(e), o = n(t);
    i["default"].event.special["user:resize"] = {setup: r, teardown: a}
}),define("github/legacy/behaviors/will-transition-once", ["../../observe"], function (e) {
    function t(e) {
        return e.target.classList.remove("will-transition-once")
    }

    e.observe(".will-transition-once", {
        add: function (e) {
            e.addEventListener("transitionend", t)
        }, remove: function (e) {
            e.removeEventListener("transitionend", t)
        }
    })
}),define("github/legacy/graphs/calendar-sample", ["invariant", "delegated-events", "../../fetch"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var a = r(e);
    t.on("click", ".js-new-user-contrib-example", function (e) {
        function t(e) {
            var t = document.createElement("div");
            t.innerHTML = e;
            var n = i.querySelector(".js-calendar-graph-svg");
            n.replaceWith(t.children[0])
        }

        function r() {
            return i.classList.remove("sample-graph")
        }

        e.preventDefault();
        var i = document.querySelector(".js-calendar-graph");
        a["default"](i instanceof HTMLElement, "`js-calendar-graph` element must exist"), i.classList.contains("sample-graph") || (i.classList.add("sample-graph"), n.fetchText(this.getAttribute("href")).then(t, r))
    })
}),define("github/legacy/graphs/network", ["../../typecast", "../../observe", "../../fetch", "../../jquery", "invariant"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e, t) {
        if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
    }

    var s = i(e), u = i(r), l = i(a), c = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(), d = function () {
        function e(t, n, r) {
            o(this, e), this.container = t, this.width = n, this.height = r, this.ctx = this.initCanvas(this.container, this.width, this.height), this.startLoader("Loading graph data"), this.loadMeta()
        }

        return c(e, [{
            key: "initCanvas", value: function (e) {
                var t = e.getElementsByTagName("canvas")[0];
                l["default"](t instanceof HTMLCanvasElement), t.style.zIndex = "0";
                var n = t.width, r = t.height, a = t.getContext("2d");
                l["default"](a);
                var i = window.devicePixelRatio || 1, o = a.webkitBackingStorePixelRatio || a.mozBackingStorePixelRatio || a.msBackingStorePixelRatio || a.oBackingStorePixelRatio || a.backingStorePixelRatio || 1, s = i / o;
                return 1 === s ? a : (t.width = n * s, t.height = r * s, t.style.width = n + "px", t.style.height = r + "px", a.scale(s, s), a)
            }
        }, {
            key: "startLoader", value: function (e) {
                return this.ctx.save(), this.ctx.font = "14px 'Helvetica Neue', Arial, sans-serif", this.ctx.fillStyle = "#cacaca", this.ctx.textAlign = "center", this.ctx.fillText(e, this.width / 2, 155), this.ctx.restore(), this.displayLoader()
            }
        }, {
            key: "stopLoader", value: function () {
                var e = this.container.querySelector(".large-loading-area");
                l["default"](e), e.classList.add("d-none")
            }
        }, {
            key: "displayLoader", value: function () {
                var e = this.container.querySelector(".large-loading-area");
                l["default"](e), e.classList.remove("d-none")
            }
        }, {
            key: "loadMeta", value: function () {
                var e, t, r;
                return regeneratorRuntime.async(function (a) {
                    for (; ;)switch (a.prev = a.next) {
                        case 0:
                            return a.prev = 0, e = this.container.getAttribute("data-network-graph-meta-url"), a.next = 4, regeneratorRuntime.awrap(n.fetchPoll(e, {headers: {accept: "application/json"}}));
                        case 4:
                            return t = a.sent, a.next = 7, regeneratorRuntime.awrap(t.json());
                        case 7:
                            r = a.sent, this.init(r), a.next = 14;
                            break;
                        case 11:
                            a.prev = 11, a.t0 = a["catch"](0), this.initError(a.t0);
                        case 14:
                        case"end":
                            return a.stop()
                    }
                }, null, this, [[0, 11]])
            }
        }, {
            key: "init", value: function (e) {
                var t = void 0, n = void 0, r = void 0, a = void 0;
                if (g) {
                    var i = this.focus = e.focus, o = this.nethash = e.nethash, s = this.spaceMap = e.spacemap, u = this.userBlocks = e.blocks, l = this.commits = function () {
                        var n = void 0, a = void 0, i = e.dates, o = [];
                        for (r = n = 0, a = i.length; a > n; r = ++n)t = i[r], o.push(new f(r, t));
                        return o
                    }(), c = this.users = {}, d = e.users;
                    for (n = 0, a = d.length; a > n; n++) {
                        var y = d[n];
                        this.users[y.name] = y
                    }
                    var b = this.chrome = new h(this, this.ctx, this.width, this.height, i, l, u, c), j = this.graph = new m(this, this.ctx, this.width, this.height, i, l, c, s, u, o);
                    this.mouseDriver = new v(this.container, b, j), this.keyDriver = new p(b, j), this.stopLoader(), j.drawBackground(), b.draw(), j.requestInitialChunk()
                }
            }
        }, {
            key: "initError", value: function () {
                this.stopLoader(), this.ctx.clearRect(0, 0, this.width, this.height), this.startLoader("Graph could not be drawn due to a network problem.")
            }
        }]), e
    }(), f = function () {
        function e(t, n) {
            o(this, e), this.time = t, this.date = new Date(n), this.requested = null, this.populated = null
        }

        return c(e, [{
            key: "populate", value: function (e, t, n) {
                this.user = t, this.author = e.author, this.date = new Date(e.date.replace(" ", "T")), this.gravatar = e.gravatar, this.id = e.id, this.login = e.login, this.message = e.message, this.space = e.space, this.time = e.time, this.parents = this.populateParents(e.parents, n), this.requested = !0, this.populated = new Date
            }
        }, {
            key: "populateParents", value: function (e, t) {
                var n = void 0, r = void 0, a = function () {
                    var a = void 0, i = void 0, o = [];
                    for (a = 0, i = e.length; i > a; a++)n = e[a], r = t[n[1]], r.id = n[0], r.space = n[2], o.push(r);
                    return o
                }();
                return a
            }
        }]), e
    }(), h = function () {
        function e(t, n, r, a, i, s, u, l) {
            o(this, e), this.network = t, this.ctx = n, this.width = r, this.height = a, this.focus = i, this.commits = s, this.userBlocks = u, this.users = l, this.namesWidth = 120, this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], this.userBgColors = ["#fff", "#f7f7f7"], this.headerColor = "#f7f7f7", this.dividerColor = "#ddd", this.headerHeight = 40, this.dateRowHeight = 30, this.graphTopOffset = 10 + this.headerHeight + this.dateRowHeight, this.nameLineHeight = 24, this.offsetX = this.namesWidth + (this.width - this.namesWidth) / 2 - this.focus * this.nameLineHeight, this.offsetY = 0, this.contentHeight = this.calcContentHeight(), this.graphMidpoint = this.namesWidth + (this.width - this.namesWidth) / 2, this.activeUser = null
        }

        return c(e, [{
            key: "moveX", value: function (e) {
                return this.offsetX += e, this.offsetX > this.graphMidpoint ? this.offsetX = this.graphMidpoint : this.offsetX < this.graphMidpoint - this.commits.length * this.nameLineHeight ? this.offsetX = this.graphMidpoint - this.commits.length * this.nameLineHeight : void 0
            }
        }, {
            key: "moveY", value: function (e) {
                return this.offsetY += e, this.offsetY > 0 || this.contentHeight < this.height - this.graphTopOffset ? this.offsetY = 0 : this.offsetY < -this.contentHeight + this.height / 2 ? this.offsetY = -this.contentHeight + this.height / 2 : void 0
            }
        }, {
            key: "calcContentHeight", value: function () {
                var e = void 0, t = void 0, n = 0, r = this.userBlocks;
                for (e = 0, t = r.length; t > e; e++) {
                    var a = r[e];
                    n += a.count
                }
                return n * this.nameLineHeight
            }
        }, {
            key: "hover", value: function (e, t) {
                var n = void 0, r = void 0, a = this.userBlocks;
                for (n = 0, r = a.length; r > n; n++) {
                    var i = a[n];
                    if (e > 0 && e < this.namesWidth && t > this.graphTopOffset + this.offsetY + i.start * this.nameLineHeight && t < this.graphTopOffset + this.offsetY + (i.start + i.count) * this.nameLineHeight)return this.users[i.name]
                }
                return null
            }
        }, {
            key: "draw", value: function () {
                return this.drawTimeline(this.ctx), this.drawUsers(this.ctx)
            }
        }, {
            key: "drawTimeline", value: function (e) {
                var t = void 0, n = void 0, r = void 0, a = void 0, i = void 0, o = void 0, s = void 0, u = void 0;
                for (e.fillStyle = this.headerColor, e.fillRect(0, 0, this.width, this.headerHeight), e.fillStyle = this.dividerColor, e.fillRect(0, this.headerHeight - 1, this.width, 1), o = parseInt((0 - this.offsetX) / this.nameLineHeight), 0 > o && (o = 0), i = o + parseInt(this.width / (this.nameLineHeight - 1)), i > this.commits.length && (i = this.commits.length), e.save(), e.translate(this.offsetX, 0), a = null, r = null, n = t = s = o, u = i; u >= s ? u > t : t > u; n = u >= s ? ++t : --t) {
                    var l = this.commits[n], c = this.months[l.date.getMonth()];
                    if (c !== a) {
                        e.font = "bold 12px 'Helvetica Neue', Arial, sans-serif", e.fillStyle = "#555";
                        var d = this.ctx.measureText(c).width;
                        e.fillText(c, n * this.nameLineHeight - d / 2, this.headerHeight / 2 + 4), a = c
                    }
                    var f = l.date.getDate();
                    if (f !== r) {
                        e.font = "12px 'Helvetica Neue', Arial, sans-serif", e.fillStyle = "#555";
                        var h = this.ctx.measureText(f.toString()).width;
                        e.fillText(f.toString(), n * this.nameLineHeight - h / 2, this.headerHeight + this.dateRowHeight / 2 + 3), r = f, e.fillStyle = "#ddd", e.fillRect(n * this.nameLineHeight, this.headerHeight, 1, 6)
                    }
                }
                return e.restore()
            }
        }, {
            key: "drawUsers", value: function (e) {
                var t = void 0, n = void 0, r = void 0;
                e.fillStyle = "#fff", e.fillRect(0, 0, this.namesWidth, this.height), e.save(), e.translate(0, this.headerHeight + this.dateRowHeight + this.offsetY);
                var a = this.userBlocks;
                for (n = t = 0, r = a.length; r > t; n = ++t) {
                    var i = a[n];
                    e.fillStyle = this.userBgColors[n % 2], e.fillRect(0, i.start * this.nameLineHeight, this.namesWidth, i.count * this.nameLineHeight), this.activeUser && this.activeUser.name === i.name && (e.fillStyle = "rgba(0, 0, 0, 0.05)", e.fillRect(0, i.start * this.nameLineHeight, this.namesWidth, i.count * this.nameLineHeight));
                    var o = (i.start + i.count / 2) * this.nameLineHeight + 3;
                    e.fillStyle = "rgba(0, 0, 0, 0.1)", e.fillRect(0, i.start * this.nameLineHeight + i.count * this.nameLineHeight - 1, this.namesWidth, 1), e.fillStyle = "#333", e.font = "13px 'Helvetica Neue', Arial, sans-serif", e.textAlign = "center", e.fillText(i.name, this.namesWidth / 2, o, 96)
                }
                e.restore(), e.fillStyle = this.headerColor, e.fillRect(0, 0, this.namesWidth, this.headerHeight), e.fillStyle = "#777", e.font = "12px 'Helvetica Neue', Arial, sans-serif", e.fillText("Owners", 40, this.headerHeight / 2 + 3);
                var s = 10;
                return e.fillStyle = this.dividerColor, e.fillRect(this.namesWidth - 1, s, 1, this.headerHeight - 2 * s), e.fillStyle = this.dividerColor, e.fillRect(0, this.headerHeight - 1, this.namesWidth, 1), e.fillStyle = this.dividerColor, e.fillRect(this.namesWidth - 1, this.headerHeight, 1, this.height - this.headerHeight)
            }
        }]), e
    }(), m = function () {
        function e(t, n, r, a, i, s, u, l, c, d) {
            o(this, e);
            var f = void 0, h = void 0, m = void 0, v = void 0, p = void 0, g = void 0, y = void 0, b = void 0, j = void 0, w = void 0, L = void 0;
            this.network = t, this.ctx = n, this.width = r, this.height = a, this.focus = i, this.commits = s, this.users = u, this.spaceMap = l, this.userBlocks = c, this.nethash = d, this.namesWidth = 120, this.headerHeight = 40, this.dateRowHeight = 30, this.graphTopOffset = 10 + this.headerHeight + this.dateRowHeight, this.bgColors = ["#fff", "#f9f9f9"], this.nameLineHeight = 24, this.spaceColors = ["#c0392b", "#3498db", "#2ecc71", "#8e44ad", "#f1c40f", "#e67e22", "#34495e", "#e74c3c", "#2980b9", "#1abc9c", "#9b59b6", "#f39c12", "#7f8c8d", "#2c3e50", "#d35400", "#e74c3c", "#95a5a6", "#bdc3c7", "#16a085", "#27ae60"], this.offsetX = this.namesWidth + (this.width - this.namesWidth) / 2 - this.focus * this.nameLineHeight, this.offsetY = 0, this.bgCycle = 0, this.marginMap = {}, this.gravatars = {}, this.activeCommit = null, this.contentHeight = this.calcContentHeight(), this.graphMidpoint = this.namesWidth + (this.width - this.namesWidth) / 2, this.showRefs = !0, this.lastHotLoadCenterIndex = null, this.connectionMap = {}, this.spaceUserMap = {};
            var S = this.userBlocks;
            for (h = 0, p = S.length; p > h; h++)for (f = S[h], m = v = w = f.start, L = f.start + f.count; L >= w ? L > v : v > L; m = L >= w ? ++v : --v)this.spaceUserMap[m] = this.users[f.name];
            this.headsMap = {};
            var x = this.userBlocks;
            for (b = 0, g = x.length; g > b; b++) {
                f = x[b];
                var k = this.users[f.name], E = k.heads;
                for (j = 0, y = E.length; y > j; j++) {
                    var _ = E[j];
                    this.headsMap[_.id] || (this.headsMap[_.id] = []);
                    var T = {name: k.name, head: _};
                    this.headsMap[_.id].push(T)
                }
            }
        }

        return c(e, [{
            key: "moveX", value: function (e) {
                return this.offsetX += e, this.offsetX > this.graphMidpoint ? this.offsetX = this.graphMidpoint : this.offsetX < this.graphMidpoint - this.commits.length * this.nameLineHeight && (this.offsetX = this.graphMidpoint - this.commits.length * this.nameLineHeight), this.hotLoadCommits()
            }
        }, {
            key: "moveY", value: function (e) {
                return this.offsetY += e, this.offsetY > 0 || this.contentHeight < this.height - this.graphTopOffset ? this.offsetY = 0 : this.offsetY < -this.contentHeight + this.height / 2 ? this.offsetY = -this.contentHeight + this.height / 2 : void 0
            }
        }, {
            key: "toggleRefs", value: function () {
                return this.showRefs = !this.showRefs
            }
        }, {
            key: "calcContentHeight", value: function () {
                var e = void 0, t = void 0, n = 0, r = this.userBlocks;
                for (e = 0, t = r.length; t > e; e++) {
                    var a = r[e];
                    n += a.count
                }
                return n * this.nameLineHeight
            }
        }, {
            key: "hover", value: function (e, t) {
                var n = void 0, r = void 0, a = void 0, i = void 0, o = this.timeWindow();
                for (r = n = a = o.min, i = o.max; i >= a ? i >= n : n >= i; r = i >= a ? ++n : --n) {
                    var s = this.commits[r], u = this.offsetX + s.time * this.nameLineHeight, l = this.offsetY + this.graphTopOffset + s.space * this.nameLineHeight;
                    if (e > u - 5 && u + 5 > e && t > l - 5 && l + 5 > t)return s
                }
                return null
            }
        }, {
            key: "hotLoadCommits", value: function () {
                var e = void 0, t = 200;
                if (e = parseInt((-this.offsetX + this.graphMidpoint) / this.nameLineHeight), 0 > e && (e = 0), e > this.commits.length - 1 && (e = this.commits.length - 1), !(this.lastHotLoadCenterIndex && Math.abs(this.lastHotLoadCenterIndex - e) < 10)) {
                    this.lastHotLoadCenterIndex = e;
                    var n = this.backSpan(e, t), r = this.frontSpan(e, t);
                    if (n || r) {
                        var a = n ? n[0] : r[0], i = r ? r[1] : n[1];
                        return this.requestChunk(a, i)
                    }
                }
            }
        }, {
            key: "backSpan", value: function (e, t) {
                var n = void 0, r = void 0, a = void 0, i = void 0, o = void 0, s = void 0, u = void 0, l = void 0;
                for (i = null, r = n = u = e; (0 >= u ? 0 >= n : n >= 0) && r > e - t; r = 0 >= u ? ++n : --n)if (!this.commits[r].requested) {
                    i = r;
                    break
                }
                if (null !== i) {
                    for (o = null, s = null, r = a = l = i; (0 >= l ? 0 >= a : a >= 0) && r > i - t; r = 0 >= l ? ++a : --a)if (this.commits[r].requested) {
                        o = r;
                        break
                    }
                    return o ? s = o + 1 : (s = i - t, 0 > s && (s = 0)), [s, i]
                }
                return null
            }
        }, {
            key: "frontSpan", value: function (e, t) {
                var n = void 0, r = void 0, a = void 0, i = void 0, o = void 0, s = void 0, u = void 0, l = void 0, c = void 0, d = void 0;
                for (l = null, r = n = i = e, o = this.commits.length; (o >= i ? o > n : n > o) && e + t > r; r = o >= i ? ++n : --n)if (!this.commits[r].requested) {
                    l = r;
                    break
                }
                if (null !== l) {
                    for (c = null, d = null, r = a = s = l, u = this.commits.length; (u >= s ? u > a : a > u) && l + t > r; r = u >= s ? ++a : --a)if (this.commits[r].requested) {
                        c = r;
                        break
                    }
                    return d = c ? c - 1 : l + t >= this.commits.length ? this.commits.length - 1 : l + t, [l, d]
                }
                return null
            }
        }, {
            key: "chunkUrl", value: function () {
                return s["default"](document.querySelector(".js-network-graph-container"), HTMLElement).getAttribute("data-network-graph-chunk-url") || ""
            }
        }, {
            key: "requestInitialChunk", value: function () {
                var e, t, r;
                return regeneratorRuntime.async(function (a) {
                    for (; ;)switch (a.prev = a.next) {
                        case 0:
                            if (g) {
                                a.next = 2;
                                break
                            }
                            return a.abrupt("return");
                        case 2:
                            return e = u["default"].param({nethash: this.nethash}), t = this.chunkUrl() + "?" + e, a.next = 6, regeneratorRuntime.awrap(n.fetchJSON(t));
                        case 6:
                            r = a.sent, this.importChunk(r), this.draw(), l["default"](this.network && this.network.chrome), this.network.chrome.draw();
                        case 11:
                        case"end":
                            return a.stop()
                    }
                }, null, this)
            }
        }, {
            key: "requestChunk", value: function (e, t) {
                var r, a, i, o, s, c;
                return regeneratorRuntime.async(function (d) {
                    for (; ;)switch (d.prev = d.next) {
                        case 0:
                            if (r = void 0, a = void 0, i = void 0, o = void 0, g) {
                                d.next = 6;
                                break
                            }
                            return d.abrupt("return");
                        case 6:
                            for (a = r = i = e, o = t; o >= i ? o >= r : r >= o; a = o >= i ? ++r : --r)this.commits[a].requested = new Date;
                            return s = this.chunkUrl() + "?" + u["default"].param({
                                    nethash: this.nethash,
                                    start: e,
                                    end: t
                                }), d.next = 10, regeneratorRuntime.awrap(n.fetchJSON(s));
                        case 10:
                            c = d.sent, this.importChunk(c), this.draw(), l["default"](this.network && this.network.chrome), this.network.chrome.draw(), this.lastHotLoadCenterIndex = this.focus;
                        case 16:
                        case"end":
                            return d.stop()
                    }
                }, null, this)
            }
        }, {
            key: "importChunk", value: function (e) {
                var t = this, n = void 0, r = void 0, a = void 0, i = void 0;
                if (e.commits) {
                    var o = e.commits, s = [], u = function () {
                        var e = o[n], a = t.spaceUserMap[e.space], u = t.commits[e.time];
                        u.populate(e, a, t.commits), s.push(function () {
                            var e = void 0, t = void 0, n = u.parents, a = [];
                            for (e = 0, t = n.length; t > e; e++)i = n[e], a.push(function () {
                                var e = void 0, t = void 0, n = void 0, a = [];
                                for (r = e = t = i.time + 1, n = u.time; n >= t ? n > e : e > n; r = n >= t ? ++e : --e)this.connectionMap[r] = this.connectionMap[r] || [], a.push(this.connectionMap[r].push(u));
                                return a
                            }.call(this));
                            return a
                        }.call(t))
                    };
                    for (n = 0, a = o.length; a > n; n++)u();
                    return s
                }
            }
        }, {
            key: "timeWindow", value: function () {
                var e = void 0, t = void 0;
                return t = parseInt((this.namesWidth - this.offsetX + this.nameLineHeight) / this.nameLineHeight), 0 > t && (t = 0), e = t + parseInt((this.width - this.namesWidth) / this.nameLineHeight), e > this.commits.length - 1 && (e = this.commits.length - 1), {
                    min: t,
                    max: e
                }
            }
        }, {
            key: "draw", value: function () {
                var e = void 0, t = void 0, n = void 0, r = void 0, a = void 0, i = void 0, o = void 0, s = void 0, u = void 0, l = void 0, c = void 0, d = void 0, f = void 0, h = void 0, m = void 0, v = void 0, p = void 0, g = void 0, y = void 0, b = void 0, j = void 0, w = void 0, L = void 0, S = void 0;
                this.drawBackground();
                var x = this.timeWindow(), k = x.min, E = x.max;
                this.ctx.save(), this.ctx.translate(this.offsetX, this.offsetY + this.graphTopOffset);
                var _ = {}, T = this.spaceMap;
                for (n = t = 0, i = T.length; i > t; n = ++t)for (L = this.spaceMap.length - n - 1, r = a = v = k, p = E; p >= v ? p >= a : a >= p; r = p >= v ? ++a : --a)e = this.commits[r], e.populated && e.space === L && (this.drawConnection(e), _[e.id] = !0);
                for (n = l = g = k, y = E; y >= g ? y >= l : l >= y; n = y >= g ? ++l : --l) {
                    var q = this.connectionMap[n];
                    if (q)for (c = 0, o = q.length; o > c; c++)e = q[c], _[e.id] || (this.drawConnection(e), _[e.id] = !0)
                }
                var M = this.spaceMap;
                for (n = d = 0, s = M.length; s > d; n = ++d)for (L = this.spaceMap.length - n - 1, r = f = b = k, j = E; j >= b ? j >= f : f >= j; r = j >= b ? ++f : --f)e = this.commits[r], e.populated && e.space === L && (e === this.activeCommit ? this.drawActiveCommit(e) : this.drawCommit(e));
                if (this.showRefs)for (r = h = w = k, m = E; m >= w ? m >= h : h >= m; r = m >= w ? ++h : --h)if (e = this.commits[r], e.populated) {
                    var C = this.headsMap[e.id];
                    if (C) {
                        var A = 0;
                        for (S = 0, u = C.length; u > S; S++) {
                            var H = C[S];
                            if (this.spaceUserMap[e.space].name === H.name) {
                                var I = this.drawHead(e, H.head, A);
                                A += I
                            }
                        }
                    }
                }
                return this.ctx.restore(), this.activeCommit ? this.drawCommitInfo(this.activeCommit) : void 0
            }
        }, {
            key: "drawBackground", value: function () {
                var e = void 0, t = void 0, n = void 0;
                this.ctx.clearRect(0, 0, this.width, this.height), this.ctx.save(), this.ctx.translate(0, this.offsetY + this.graphTopOffset), this.ctx.clearRect(0, -10, this.width, this.height);
                var r = this.userBlocks;
                for (t = e = 0, n = r.length; n > e; t = ++e) {
                    var a = r[t];
                    this.ctx.fillStyle = this.bgColors[t % 2], this.ctx.fillRect(0, a.start * this.nameLineHeight - 10, this.width, a.count * this.nameLineHeight), this.ctx.fillStyle = "#DDDDDD", this.ctx.fillRect(0, (a.start + a.count) * this.nameLineHeight - 11, this.width, 1)
                }
                return this.ctx.restore()
            }
        }, {
            key: "drawCommit", value: function (e) {
                var t = e.time * this.nameLineHeight, n = e.space * this.nameLineHeight;
                return this.ctx.beginPath(), this.ctx.arc(t, n, 3, 0, 2 * Math.PI, !1), this.ctx.fillStyle = this.spaceColor(e.space), this.ctx.fill()
            }
        }, {
            key: "drawActiveCommit", value: function (e) {
                var t = e.time * this.nameLineHeight, n = e.space * this.nameLineHeight;
                return this.ctx.beginPath(), this.ctx.arc(t, n, 6, 0, 2 * Math.PI, !1), this.ctx.fillStyle = this.spaceColor(e.space), this.ctx.fill()
            }
        }, {
            key: "drawCommitInfo", value: function (e) {
                var t = void 0, n = void 0, r = void 0, a = 3, i = 340, o = 56, s = e.message ? this.splitLines(e.message, 48) : [], u = Math.max(o, 38 + 16 * s.length), l = this.offsetX + e.time * this.nameLineHeight, c = this.graphTopOffset + this.offsetY + e.space * this.nameLineHeight;
                return n = 0, r = 0, n = l < this.graphMidpoint ? l + 10 : l - (i + 10), r = c < 40 + (this.height - 40) / 2 ? c + 10 : c - u - 10, this.ctx.save(), this.ctx.translate(n, r), this.ctx.fillStyle = "#fff", this.ctx.strokeStyle = "rgba(0, 0, 0, 0.2)", this.ctx.lineWidth = 1, this.roundRect(0, 0, i, u, a), t = this.gravatars[e.gravatar], t ? this.drawGravatar(t, 10, 10) : (t = new Image, t.src = e.gravatar, t.onload = function (a) {
                    return function () {
                        return a.activeCommit === e ? (a.drawGravatar(t, n + 10, r + 10), a.gravatars[e.gravatar] = t) : void 0
                    }
                }(this)), this.ctx.fillStyle = "#000", this.ctx.font = "bold 12px 'Helvetica Neue', Arial, sans-serif", this.ctx.fillText(e.author, 55, 24), this.ctx.fillStyle = "#bbb", this.ctx.font = "11px Consolas, Menlo, Courier, monospace", this.ctx.fillText(e.id.slice(0, 7), 280, 24), this.drawMessage(s, 55, 41), this.ctx.restore()
            }
        }, {
            key: "drawGravatar", value: function (e, t, n) {
                var r = 32;
                return this.ctx.save(), this.ctx.fillStyle = "#fff", this.ctx.strokeStyle = "rgba(0, 0, 0, 0.0)", this.ctx.lineWidth = .1, this.roundRect(t + 2, n + 2, r, r, 4), this.ctx.clip(), this.ctx.drawImage(e, t + 2, n + 2, r, r), this.ctx.restore()
            }
        }, {
            key: "roundRect", value: function (e, t, n, r, a) {
                return this.ctx.beginPath(), this.ctx.moveTo(e, t + a), this.ctx.lineTo(e, t + r - a), this.ctx.quadraticCurveTo(e, t + r, e + a, t + r), this.ctx.lineTo(e + n - a, t + r), this.ctx.quadraticCurveTo(e + n, t + r, e + n, t + r - a), this.ctx.lineTo(e + n, t + a), this.ctx.quadraticCurveTo(e + n, t, e + n - a, t), this.ctx.lineTo(e + a, t), this.ctx.quadraticCurveTo(e, t, e, t + a), this.ctx.fill(), this.ctx.stroke()
            }
        }, {
            key: "drawMessage", value: function (e, t, n) {
                var r = void 0, a = void 0, i = void 0;
                this.ctx.font = "12px 'Helvetica Neue', Arial, sans-serif", this.ctx.fillStyle = "#000000";
                var o = [];
                for (a = r = 0, i = e.length; i > r; a = ++r) {
                    var s = e[a];
                    o.push(this.ctx.fillText(s, t, n + 16 * a))
                }
                return o
            }
        }, {
            key: "splitLines", value: function (e, t) {
                var n = void 0, r = void 0, a = void 0, i = e.split(" "), o = [];
                for (a = "", n = 0, r = i.length; r > n; n++) {
                    var s = i[n];
                    a.length + 1 + s.length < t ? a = "" === a ? s : a + " " + s : (o.push(a), a = s)
                }
                return o.push(a), o
            }
        }, {
            key: "drawHead", value: function (e, t, n) {
                this.ctx.font = "11px 'Helvetica Neue', Arial, sans-serif", this.ctx.save();
                var r = this.ctx.measureText(t.name).width;
                this.ctx.restore();
                var a = e.time * this.nameLineHeight, i = e.space * this.nameLineHeight + 5 + n, o = 2.5;
                return this.ctx.save(), this.ctx.translate(a, i - o), this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)", this.ctx.beginPath(), this.ctx.moveTo(0, o), this.ctx.lineTo(-4, 10), this.ctx.quadraticCurveTo(-9, 10, -9, 15), this.ctx.lineTo(-9, 15 + r), this.ctx.quadraticCurveTo(-9, 15 + r + 5, -4, 15 + r + 5), this.ctx.lineTo(4, 15 + r + 5), this.ctx.quadraticCurveTo(9, 15 + r + 5, 9, 15 + r), this.ctx.lineTo(9, 15), this.ctx.quadraticCurveTo(9, 10, 4, 10), this.ctx.lineTo(0, o), this.ctx.fill(), this.ctx.fillStyle = "#fff", this.ctx.font = "12px 'Helvetica Neue', Arial, sans-serif", this.ctx.textBaseline = "middle", this.ctx.scale(.85, .85), this.ctx.rotate(Math.PI / 2), this.ctx.fillText(t.name, 19, -.5), this.ctx.restore(), r + this.nameLineHeight
            }
        }, {
            key: "drawConnection", value: function (e) {
                var t = void 0, n = void 0, r = void 0, a = e.parents, i = [];
                for (n = t = 0, r = a.length; r > t; n = ++t) {
                    var o = a[n];
                    0 === n ? o.space === e.space ? i.push(this.drawBasicConnection(o, e)) : i.push(this.drawBranchConnection(o, e)) : i.push(this.drawMergeConnection(o, e))
                }
                return i
            }
        }, {
            key: "drawBasicConnection", value: function (e, t) {
                var n = this.spaceColor(t.space);
                return this.ctx.strokeStyle = n, this.ctx.lineWidth = 2, this.ctx.beginPath(), this.ctx.moveTo(e.time * this.nameLineHeight, t.space * this.nameLineHeight), this.ctx.lineTo(t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.ctx.stroke()
            }
        }, {
            key: "drawBranchConnection", value: function (e, t) {
                var n = this.spaceColor(t.space);
                return this.ctx.strokeStyle = n, this.ctx.lineWidth = 2, this.ctx.beginPath(), this.ctx.moveTo(e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.ctx.lineTo(e.time * this.nameLineHeight, t.space * this.nameLineHeight), this.ctx.lineTo(t.time * this.nameLineHeight - 10, t.space * this.nameLineHeight), this.ctx.stroke(), this.threeClockArrow(n, t.time * this.nameLineHeight, t.space * this.nameLineHeight)
            }
        }, {
            key: "drawMergeConnection", value: function (e, t) {
                var n = void 0, r = this.spaceColor(e.space);
                if (this.ctx.strokeStyle = r, this.ctx.lineWidth = 2, this.ctx.beginPath(), e.space > t.space) {
                    this.ctx.moveTo(e.time * this.nameLineHeight, e.space * this.nameLineHeight);
                    var a = this.safePath(e.time, t.time, e.space);
                    return a ? (this.ctx.lineTo(t.time * this.nameLineHeight - 10, e.space * this.nameLineHeight), this.ctx.lineTo(t.time * this.nameLineHeight - 10, t.space * this.nameLineHeight + 15), this.ctx.lineTo(t.time * this.nameLineHeight - 5.7, t.space * this.nameLineHeight + 7.5), this.ctx.stroke(), this.oneClockArrow(r, t.time * this.nameLineHeight, t.space * this.nameLineHeight)) : (n = this.closestMargin(e.time, t.time, e.space, -1), e.space === t.space + 1 && e.space === n + 1 ? (this.ctx.lineTo(e.time * this.nameLineHeight, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 15, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 9.5, n * this.nameLineHeight + 7.7), this.ctx.stroke(), this.twoClockArrow(r, t.time * this.nameLineHeight, n * this.nameLineHeight), this.addMargin(e.time, t.time, n)) : e.time + 1 === t.time ? (n = this.closestMargin(e.time, t.time, t.space, 0), this.ctx.lineTo(e.time * this.nameLineHeight, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 15, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 15, t.space * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 9.5, t.space * this.nameLineHeight + 7.7), this.ctx.stroke(), this.twoClockArrow(r, t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.addMargin(e.time, t.time, n)) : (this.ctx.lineTo(e.time * this.nameLineHeight + 10, e.space * this.nameLineHeight - 10), this.ctx.lineTo(e.time * this.nameLineHeight + 10, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 10, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 10, t.space * this.nameLineHeight + 15), this.ctx.lineTo(t.time * this.nameLineHeight - 5.7, t.space * this.nameLineHeight + 7.5), this.ctx.stroke(), this.oneClockArrow(r, t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.addMargin(e.time, t.time, n)))
                }
                return n = this.closestMargin(e.time, t.time, t.space, -1), n < t.space ? (this.ctx.moveTo(e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.ctx.lineTo(e.time * this.nameLineHeight, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 12.7, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 12.7, t.space * this.nameLineHeight - 10), this.ctx.lineTo(t.time * this.nameLineHeight - 9.4, t.space * this.nameLineHeight - 7.7), this.ctx.stroke(), this.fourClockArrow(r, t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.addMargin(e.time, t.time, n)) : (this.ctx.moveTo(e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.ctx.lineTo(e.time * this.nameLineHeight, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 12.7, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 12.7, t.space * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 9.4, t.space * this.nameLineHeight + 7.7), this.ctx.stroke(), this.twoClockArrow(r, t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.addMargin(e.time, t.time, n))
            }
        }, {
            key: "addMargin", value: function (e, t, n) {
                return this.marginMap[n] || (this.marginMap[n] = []), this.marginMap[n].push([e, t])
            }
        }, {
            key: "oneClockArrow", value: function (e, t, n) {
                return this.ctx.fillStyle = e, this.ctx.beginPath(), this.ctx.moveTo(t - 3, n + 10.5), this.ctx.lineTo(t - 9, n + 5.5), this.ctx.lineTo(t - 2.6, n + 3.5), this.ctx.fill()
            }
        }, {
            key: "twoClockArrow", value: function (e, t, n) {
                return this.ctx.fillStyle = e, this.ctx.beginPath(), this.ctx.moveTo(t - 12.4, n + 6.6), this.ctx.lineTo(t - 9.3, n + 10.6), this.ctx.lineTo(t - 3.2, n + 2.4), this.ctx.fill()
            }
        }, {
            key: "threeClockArrow", value: function (e, t, n) {
                return this.ctx.fillStyle = e, this.ctx.beginPath(), this.ctx.moveTo(t - 10, n - 3.5), this.ctx.lineTo(t - 10, n + 3.5), this.ctx.lineTo(t - 4, n), this.ctx.fill()
            }
        }, {
            key: "fourClockArrow", value: function (e, t, n) {
                return this.ctx.fillStyle = e, this.ctx.beginPath(), this.ctx.moveTo(t - 12.4, n - 6.6), this.ctx.lineTo(t - 9.3, n - 10.6), this.ctx.lineTo(t - 3.2, n - 2.4), this.ctx.fill()
            }
        }, {
            key: "safePath", value: function (e, t, n) {
                var r = void 0, a = void 0, i = this.spaceMap[n];
                for (r = 0, a = i.length; a > r; r++) {
                    var o = i[r];
                    if (this.timeInPath(e, o))return o[1] === t
                }
                return !1
            }
        }, {
            key: "closestMargin", value: function (e, t, n, r) {
                var a = void 0, i = void 0, o = void 0, s = void 0, u = this.spaceMap.length;
                for (o = r, i = !1, a = !1, s = !1; !a || !i;) {
                    if (n + o >= 0 && this.safeMargin(e, t, n + o))return n + o;
                    0 > n + o && (i = !0), n + o > u && (a = !0), s === !1 && 0 === o ? (o = -1, s = !0) : o = 0 > o ? -o - 1 : -o - 2
                }
                return n > 0 ? n - 1 : 0
            }
        }, {
            key: "safeMargin", value: function (e, t, n) {
                var r = void 0, a = void 0;
                if (!this.marginMap[n])return !0;
                var i = this.marginMap[n];
                for (r = 0, a = i.length; a > r; r++) {
                    var o = i[r];
                    if (this.pathsCollide([e, t], o))return !1
                }
                return !0
            }
        }, {
            key: "pathsCollide", value: function (e, t) {
                return this.timeWithinPath(e[0], t) || this.timeWithinPath(e[1], t) || this.timeWithinPath(t[0], e) || this.timeWithinPath(t[1], e)
            }
        }, {
            key: "timeInPath", value: function (e, t) {
                return e >= t[0] && e <= t[1]
            }
        }, {
            key: "timeWithinPath", value: function (e, t) {
                return e > t[0] && e < t[1]
            }
        }, {
            key: "spaceColor", value: function (e) {
                return 0 === e ? "#000000" : this.spaceColors[e % this.spaceColors.length]
            }
        }]), e
    }(), v = function () {
        function e(t, n, r) {
            var a = this;
            o(this, e);
            var i = document.body;
            l["default"](i), this.chrome = n, this.graph = r, this.dragging = !1, this.lastPoint = {
                x: 0,
                y: 0
            }, this.lastHoverCommit = null, this.lastHoverUser = null, this.pressedCommit = null, this.pressedUser = null, this.canvas = t.getElementsByTagName("canvas")[0], this.canvasOffset = u["default"](this.canvas).offset(), this.canvas.style.cursor = "move", i.addEventListener("mouseup", function (e) {
                return a.up(e)
            }), i.addEventListener("mousemove", function (e) {
                return a.docmove(e)
            }), this.canvas.addEventListener("mousedown", function (e) {
                return a.down(e)
            }), this.canvas.addEventListener("mousemove", function (e) {
                return a.move(e)
            }), this.canvas.addEventListener("mouseout", function (e) {
                return a.out(e)
            })
        }

        return c(e, [{
            key: "up", value: function () {
                this.dragging = !1, this.pressedCommit && this.graph.activeCommit && this.graph.activeCommit === this.pressedCommit ? window.open("/" + this.graph.activeCommit.user.name + "/" + this.graph.activeCommit.user.repo + "/commit/" + this.graph.activeCommit.id) : this.pressedUser && this.chrome.activeUser && this.chrome.activeUser === this.pressedUser && (window.location = "/" + this.chrome.activeUser.name + "/" + this.chrome.activeUser.repo + "/network"), this.pressedCommit = null, this.pressedUser = null
            }
        }, {
            key: "down", value: function () {
                this.graph.activeCommit ? this.pressedCommit = this.graph.activeCommit : this.chrome.activeUser ? this.pressedUser = this.chrome.activeUser : this.dragging = !0
            }
        }, {
            key: "docmove", value: function (e) {
                var t = e.pageX, n = e.pageY;
                this.dragging && (this.graph.moveX(t - this.lastPoint.x), this.graph.moveY(n - this.lastPoint.y), this.graph.draw(), this.chrome.moveX(t - this.lastPoint.x), this.chrome.moveY(n - this.lastPoint.y), this.chrome.draw()), this.lastPoint.x = t, this.lastPoint.y = n
            }
        }, {
            key: "move", value: function (e) {
                var t = e.pageX, n = e.pageY;
                if (this.dragging) this.graph.moveX(t - this.lastPoint.x), this.graph.moveY(n - this.lastPoint.y), this.graph.draw(), this.chrome.moveX(t - this.lastPoint.x), this.chrome.moveY(n - this.lastPoint.y), this.chrome.draw(); else {
                    var r = this.chrome.hover(t - this.canvasOffset.left, n - this.canvasOffset.top);
                    if (r !== this.lastHoverUser) this.canvas.style.cursor = r ? "pointer" : "move", this.chrome.activeUser = r, this.chrome.draw(), this.lastHoverUser = r; else {
                        var a = this.graph.hover(t - this.canvasOffset.left, n - this.canvasOffset.top);
                        a !== this.lastHoverCommit && (this.canvas.style.cursor = a ? "pointer" : "move", this.graph.activeCommit = a, this.graph.draw(), this.chrome.draw(), this.lastHoverCommit = a)
                    }
                }
                this.lastPoint.x = t, this.lastPoint.y = n
            }
        }, {
            key: "out", value: function () {
                this.graph.activeCommit = null, this.chrome.activeUser = null, this.graph.draw(), this.chrome.draw(), this.lastHoverCommit = null, this.lastHoverUser = null
            }
        }]), e
    }(), p = function () {
        function e(t, n) {
            var r = this;
            o(this, e), this.chrome = t, this.graph = n, this.dirty = !1, document.addEventListener("keydown", function (e) {
                return r.down(e)
            })
        }

        return c(e, [{
            key: "moveBothX", value: function (e) {
                this.graph.moveX(e), this.chrome.moveX(e), this.graph.activeCommit = null, this.dirty = !0
            }
        }, {
            key: "moveBothY", value: function (e) {
                this.graph.moveY(e), this.chrome.moveY(e), this.graph.activeCommit = null, this.dirty = !0
            }
        }, {
            key: "toggleRefs", value: function () {
                this.graph.toggleRefs(), this.dirty = !0
            }
        }, {
            key: "redraw", value: function () {
                this.dirty && (this.graph.draw(), this.chrome.draw()), this.dirty = !1
            }
        }, {
            key: "down", value: function (e) {
                if ("INPUT" === e.target.nodeName)return !0;
                if (e.shiftKey)switch (e.which) {
                    case 37:
                    case 72:
                        return this.moveBothX(999999), this.redraw();
                    case 38:
                    case 75:
                        return this.moveBothY(999999), this.redraw();
                    case 39:
                    case 76:
                        return this.moveBothX(-999999), this.redraw();
                    case 40:
                    case 74:
                        return this.moveBothY(-999999), this.redraw()
                } else switch (e.which) {
                    case 37:
                    case 72:
                        return this.moveBothX(100), this.redraw();
                    case 38:
                    case 75:
                        return this.moveBothY(30), this.redraw();
                    case 39:
                    case 76:
                        return this.moveBothX(-100), this.redraw();
                    case 40:
                    case 74:
                        return this.moveBothY(-30), this.redraw();
                    case 84:
                        return this.toggleRefs(), this.redraw()
                }
            }
        }]), e
    }(), g = !1;
    t.observe(".js-network-graph-container", {
        add: function (e) {
            g = !0, new d(e, 980, 600)
        }, remove: function () {
            g = !1
        }
    }, HTMLElement)
}),define("github/legacy/pages/account_membership", ["../../observe", "invariant", "../../typecast"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e) {
        var t = e.options[e.selectedIndex];
        i["default"](t);
        var n = t.hasAttribute("data-already-member"), r = e.form;
        i["default"](r), r.classList.toggle("is-member", n), r.classList.toggle("is-not-member", !n)
    }

    var i = r(t), o = r(n);
    e.observe(".js-account-membership", function (e) {
        var t = o["default"](e, HTMLSelectElement);
        a(t), t.addEventListener("change", function () {
            a(t)
        })
    })
}),define("github/legacy/pages/audit_log", ["../../form", "../../jquery", "../../fetch"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a() {
        return l["default"](".js-audit-log-export-button").removeClass("disabled")
    }

    function i() {
        return l["default"](".js-audit-log-export-button").addClass("disabled")
    }

    function o() {
        function e() {
            var e = f.slice(0, h).join("");
            return t.text("Exporting" + e), h >= 3 ? h = 0 : h += 1
        }

        var t = l["default"](".js-audit-log-export-status");
        return m.set(t[0], t.text()), c = setInterval(e, d), i()
    }

    function s() {
        a();
        var e = l["default"](".js-audit-log-export-status");
        return e.text(m.get(e[0])), clearInterval(c), h = 0
    }

    function u() {
        s();
        var e = document.getElementById("ajax-error-message");
        e && e.classList.add("visible")
    }

    var l = r(t), c = null, d = 300, f = [".", ".", "."], h = 0, m = new WeakMap;
    l["default"](document).on("ajaxSend", ".js-audit-log-export", o), l["default"](document).on("ajaxError", ".js-audit-log-export", u), l["default"](document).on("ajaxSuccess", ".js-audit-log-export", function (e, t, r, a) {
        function i() {
            return s(), window.location = a.export_url
        }

        return n.fetchPoll(a.job_url).then(i, u)
    }), l["default"](document).on("navigation:open", ".audit-search-form .js-suggester", function () {
        e.submit(this.closest("form"))
    })
}),define("github/legacy/pages/billing_settings/coupon_redemption", ["../../../observe", "../../../document-ready", "../../../jquery"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e) {
        if (e.length) {
            var t = e.attr("data-login"), n = e.attr("data-plan");
            o["default"](".js-account-row, .js-choose-account").removeClass("selected"), e.addClass("selected"), e.find(".js-choose-account").addClass("selected"), o["default"](".js-account").val(t), o["default"](".js-plan-section").removeClass("d-none"), o["default"](".js-billing-plans").addClass("d-none");
            var r = o["default"](".js-billing-plans[data-login='" + t + "']");
            r.removeClass("d-none");
            var a = o["default"](".js-plan-row", r);
            return i(1 === a.length ? a : o["default"]("[data-name='" + n + "']", r))
        }
    }

    function i(e) {
        if (e.length) {
            var t = e.attr("data-name"), n = parseInt(e.attr("data-cost"), 10), r = e.closest(".js-billing-plans"), a = "true" === r.attr("data-has-billing"), i = r.attr("data-login");
            return o["default"](".js-plan-row, .js-choose-plan").removeClass("selected"), e.addClass("selected"), e.find(".js-choose-plan").addClass("selected"), e.find(".js-choose-plan-radio").prop("checked", !0), o["default"](".js-plan").val(t), 0 === n || a ? o["default"](".js-billing-section").addClass("has-removed-contents") : o["default"](".js-billing-section[data-login='" + i + "']").removeClass("has-removed-contents")
        }
    }

    var o = r(n);
    o["default"](document).on("submit", ".js-find-coupon-form", function (e) {
        var t = e.target.action, n = o["default"]("#code").val();
        return window.location = t + "/" + encodeURIComponent(n), e.stopPropagation(), e.preventDefault()
    }), o["default"](document).on("click", ".js-choose-account", function (e) {
        return o["default"](".js-plan-row, .js-choose-plan").removeClass("selected"), o["default"](".js-plan").val(""), o["default"](".js-billing-section").addClass("has-removed-contents"), a(o["default"](this).closest(".js-account-row")), e.stopPropagation(), e.preventDefault()
    }), o["default"](document).on("click", ".js-choose-plan", function (e) {
        return i(o["default"](this).closest(".js-plan-row")), e.stopPropagation(), e.preventDefault()
    }), e.observe(".js-choose-plan-radio:checked", {
        add: function (e) {
            i(o["default"](e).closest(".js-plan-row"))
        }
    }), e.observe(".js-plan-row.selected", {
        add: function (e) {
            return o["default"](e).closest("form").find(".js-redeem-button").prop("disabled", o["default"](e).hasClass("free-plan"))
        }
    }), t.ready.then(function () {
        a(o["default"](".js-account-row.selected")), i(o["default"](".js-plan-row.selected"))
    })
}),define("github/legacy/pages/billing_settings/survey", ["delegated-events"], function (e) {
    function t(t, n) {
        var r = t.closest(".js-survey-question-form"), a = r.querySelector(".js-survey-other-text");
        r.classList.toggle("is-other-selected", n), n ? (a.addAttribute("required", "required"), a.focus()) : a.removeAttribute("required"), e.fire(a, "change")
    }

    e.on("change", ".js-survey-select", function () {
        var e = this, n = e.options[e.selectedIndex];
        t(e, n.classList.contains("js-survey-option-other"))
    }), e.on("change", ".js-survey-radio", function () {
        t(this, this.classList.contains("js-survey-radio-other"))
    })
}),define("github/blob-anchor", ["exports"], function (e) {
    function t(e) {
        var t = e.match(/\#?(?:L)(\d+)/g);
        return t ? t.map(function (e) {
            return parseInt(e.replace(/\D/g, ""))
        }) : []
    }

    function n(e) {
        var t = e.match(/(file-.+?-)L\d+?/i);
        return t ? t[1] : ""
    }

    function r(e) {
        var r = t(e), a = n(e);
        return {lineRange: r, anchorPrefix: a}
    }

    function a(e) {
        var t = e.lineRange, n = e.anchorPrefix;
        switch (t.sort(i), t.length) {
            case 1:
                return "#" + n + "L" + t[0];
            case 2:
                return "#" + n + "L" + t[0] + "-L" + t[1];
            default:
                return "#"
        }
    }

    function i(e, t) {
        return e - t
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.parseLineRange = t, e.parseFileAnchor = r, e.formatLineRange = a
}),define("github/legacy/pages/blob", ["delegated-events", "../../blob-anchor", "../../jquery", "../../hash-change"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        var t = void 0, n = void 0;
        n = e.lineRange, t = e.anchorPrefix;
        var r = l["default"](".js-file-line");
        if (r.length) {
            if (r.css("background-color", ""), 1 === n.length)return l["default"]("#" + t + "LC" + n[0]).css("background-color", "#f8eec7");
            if (n.length > 1) {
                for (var a = n[0], i = []; a <= n[1];)l["default"]("#" + t + "LC" + a).css("background-color", "#f8eec7"), i.push(a++);
                return i
            }
        }
    }

    function o(e) {
        var n = void 0, r = void 0, a = void 0;
        return null == e && (e = t.parseFileAnchor(window.location.hash)), a = e.lineRange, n = e.anchorPrefix, i(e), !d && (r = l["default"]("#" + n + "LC" + a[0])).length && l["default"](window).scrollTop(r.offset().top - .33 * l["default"](window).height()), d = !1
    }

    function s(e, t) {
        var n = void 0, r = void 0, a = "FORM" === e.nodeName ? "action" : "href";
        return n = e.getAttribute(a), (r = n.indexOf("#")) >= 0 && (n = n.substr(0, r)), n += t, e.setAttribute(a, n)
    }

    function u(e) {
        var t = void 0;
        d = !0;
        var n = null != (t = l["default"](window).scrollTop()) ? t : 0;
        return e(), l["default"](window).scrollTop(n)
    }

    var l = a(n), c = a(r), d = !1;
    c["default"](function () {
        var e = void 0, t = void 0;
        if (document.querySelector(".js-file-line-container")) {
            setTimeout(o, 0);
            var n = window.location.hash, r = document.querySelectorAll(".js-update-url-with-hash"), a = [];
            for (e = 0, t = r.length; t > e; e++) {
                var i = r[e];
                a.push(s(i, n))
            }
            return a
        }
    }), l["default"](document).on("mousedown", ".js-line-number", function (e) {
        var n = t.parseFileAnchor(this.id);
        if (e.shiftKey) {
            var r = t.parseLineRange(window.location.hash);
            n.lineRange.unshift(r[0])
        }
        return u(function () {
            return window.location.hash = t.formatLineRange(n)
        }), !1
    }), l["default"](document).on("submit", ".js-jump-to-line-form", function () {
        var t = this.querySelector(".js-jump-to-line-field"), n = t.value.replace(/[^\d\-]/g, ""), r = n.split("-").map(function (e) {
            return parseInt(e, 10)
        }).filter(function (e) {
            return e > 0
        }).sort(function (e, t) {
            return e - t
        });
        return r.length && (window.location.hash = "L" + r.join("-L")), e.fire(document, "facebox:close"), !1
    })
}),define("github/legacy/pages/blob/blob_edit", ["../../../onfocus", "../../../typecast", "../../../code-editor", "../../../jquery", "../../../visible", "../../../fetch", "../../../observe"], function (e, t, n, r, a, i, o) {
    function s(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function u(e) {
        var t = e[0], n = t.querySelector(".js-blob-filename");
        if (!n)return !0;
        var r = n.value;
        return "." === r || ".." === r || ".git" === r ? !1 : /\S/.test(n.value)
    }

    function l(e) {
        var t = e.querySelector(".js-blob-contents");
        return t ? "true" === t.getAttribute("data-allow-unchanged") ? !0 : g(t) : !0
    }

    function c(e) {
        var t = e.querySelector(".js-new-filename-field");
        return g(t)
    }

    function d(e) {
        e = _["default"](".js-blob-form");
        var t = e[0];
        return Array.from(e.find(".js-check-for-fork")).some(T["default"]) ? !1 : u(e) ? l(t) || c(t) : !1
    }

    function f(e) {
        var t = e.find(".js-blob-contents")[0];
        return t ? _["default"](t).attr("data-allow-unchanged") ? !0 : g(t) : !1
    }

    function h(e) {
        var t = e[0], n = t.querySelector(".js-blob-contents");
        return g(n) || c(t)
    }

    function m(e) {
        var t = _["default"](e).attr("data-github-confirm-unload");
        return ("yes" === t || "true" === t) && (t = ""), null == t && (t = "false"), "no" === t || "false" === t ? null : function () {
            return t
        }
    }

    function v() {
        var e = _["default"](".js-blob-form");
        if (e[0])return e.find(".js-blob-submit").prop("disabled", !d(e)), e.find(".js-blob-contents-changed").val(f(e)), M ? h(e) ? window.onbeforeunload = M : window.onbeforeunload = null : void 0
    }

    function p(e) {
        for (var t = e.querySelectorAll("input"), n = [], r = 0, a = t.length; a > r; r++) {
            var i = t[r];
            "hidden" === i.getAttribute("type") && i.getAttribute("class") && (null == i.getAttribute("data-default-value") ? n.push(i.setAttribute("data-default-value", i.value)) : n.push(void 0))
        }
        return n
    }

    function g(e) {
        return null == e ? !0 : "hidden" === e.type ? e.value !== e.getAttribute("data-default-value") : e.value !== e.defaultValue
    }

    function y(e) {
        var t = e.querySelector(".js-blob-contents"), n = e.querySelector(".js-new-filename-field"), r = e.querySelector(".js-blob-filename");
        return t && n && r && null != r.defaultValue && r.defaultValue.length ? q.set(t, n.value) : void 0
    }

    function b(e) {
        return null != e[0] && (S(e), L(e)), v()
    }

    function j(e) {
        function t() {
            e[0].focus(), e[0].setSelectionRange(0, 0)
        }

        for (var n = []; e.val().split("/").length > 1;) {
            var r = e.val(), a = r.split("/"), i = a[0], o = a.slice(1).join("/");
            "" === i || "." === i || ".git" === i ? (e.val(o), n.push(window.setTimeout(t, 1))) : ".." === i ? n.push(x(e)) : n.push(k(e, i, o))
        }
        return n
    }

    function w(e) {
        var t = !0, n = !1, r = void 0;
        try {
            for (var a, i = document.querySelectorAll(".js-template-suggestion")[Symbol.iterator](); !(t = (a = i.next()).done); t = !0) {
                var o = a.value, s = o.getAttribute("data-template-suggestion-pattern");
                if (s) {
                    var u = new RegExp(s, "i");
                    o.classList.toggle("d-none", !u.test(e))
                }
            }
        } catch (l) {
            n = !0, r = l
        } finally {
            try {
                !t && i["return"] && i["return"]()
            } finally {
                if (n)throw r
            }
        }
    }

    function L(e) {
        var t = void 0, n = void 0, r = void 0, a = void 0, i = void 0, o = void 0, s = void 0, u = e.closest("form"), l = _["default"](".js-blob-contents"), c = u.find(".js-new-blob-commit-summary");
        a = e.val() ? "Create " + e.val() : "Create new file";
        var d = q.get(l[0]) || "", f = _["default"](".js-new-filename-field").val();
        return q["delete"](l[0]), a = (null != d ? d.length : void 0) && f !== d && null != e[0] ? (q["delete"](l), n = g(l[0]), t = n ? "Update and rename" : "Rename", e.val().length && f.length ? (s = d.split("/"), i = f.split("/"), o = !0, r = s.length - 1, s.forEach(function (e, t) {
            return t !== r && e !== i[t] ? o = !1 : void 0
        }), s.length === i.length && o ? t + " " + s[r] + " to " + i[r] : t + " " + d + " to " + f) : t + " " + d) : (null != d ? d.length : void 0) && f === d ? "Update " + e.val() : a, c.attr("placeholder", a), _["default"](".js-commit-message-fallback").val(a)
    }

    function S(e) {
        var t = _["default"](".breadcrumb").children(".js-path-segment"), n = "";
        return t.each(function () {
            var e = _["default"](this);
            return n = n + e.text() + "/"
        }), n += e.val(), _["default"](".js-new-filename-field").val(n)
    }

    function x(e, t) {
        null == t && (t = !1), t || e.val(e.val().replace("../", ""));
        var n = void 0;
        if (n = function () {
                e[0].focus(), e[0].setSelectionRange(0, 0)
            }, 1 !== e.parent().children(".separator").length) {
            e.prev().remove();
            var r = e.prev().children().children().html();
            e.prev().remove(), t && (e.val("" + r + e.val()), n = function () {
                t && (e[0].focus(), e[0].setSelectionRange(r.length, r.length))
            })
        }
        return w(e.val()), window.setTimeout(n, 1)
    }

    function k(e, t, n) {
        function r() {
            e[0].focus(), e[0].setSelectionRange(0, 0)
        }

        if (null == n && (n = ""), t = t.replace(/[^-.a-z_0-9 ]+/gi, "-"), t = t.replace(/^-+|-+$/g, ""), t = t.trim(), t.length > 0) {
            var a = e.parent().children(".js-repo-root, [itemtype]").children("a").last().attr("href");
            if (!a) {
                var i = e.parent().children(".js-repo-root, [itemtype]").children("span").children("a").last(), o = i.attr("data-branch"), s = i.attr("href");
                a = s + "/tree/" + o
            }
            var u = _["default"](".js-crumb-template").clone().removeClass("js-crumb-template");
            u.find("a[itemscope]").attr("href", a + "/" + t), u.find("span").text(t);
            var l = _["default"](".js-crumb-separator").clone().removeClass("js-crumb-separator");
            e.before(u, l)
        }
        return e.val(n), w(e.val()), window.setTimeout(r, 1)
    }

    var E = s(t), _ = s(r), T = s(a), q = new WeakMap, M = null;
    o.observe(".js-blob-form", function (e) {
        p(e), y(e), v(), M = m(e), _["default"](e).on("submit", function () {
            return window.onbeforeunload = null
        })
    }), _["default"](document).on("change", ".js-blob-contents", function () {
        return b(_["default"](".js-blob-filename")), v()
    }), e.onInput(".js-blob-filename", function (e) {
        var t = e.target;
        _["default"](".js-blob-contents").attr("data-filename", t.value), w(t.value), b(_["default"](t))
    }), e.onInput(".js-breadcrumb-nav", function (e) {
        var t = e.target;
        j(_["default"](t)), b(_["default"](t))
    }), e.onHotkey("keydown", ".js-breadcrumb-nav", function (e, t) {
        var n = e.target;
        if ("backspace" === t && 0 === n.selectionStart && 0 === n.selectionEnd) {
            var r = E["default"](n.parentNode, HTMLElement);
            1 !== r.querySelectorAll(".separator").length && (x(_["default"](n), !0), e.preventDefault())
        }
        b(_["default"](n))
    }), e.onInput(".js-new-blob-commit-summary", function (e) {
        var t = e.target, n = E["default"](t.closest(".js-file-commit-form"), HTMLElement), r = E["default"](n.querySelector(".js-too-long-error"), HTMLElement);
        r.classList.toggle("d-none", t.value.length <= 50)
    }), o.observe(".js-check-for-fork", function (e) {
        e.addEventListener("load", function () {
            return v()
        })
    }), _["default"](document).on("change", ".js-gitignore-template input[type=radio]", function () {
        var e = n.getCodeEditor(_["default"](this).closest(".js-blob-form").find(".js-code-editor")[0]);
        if (null != e)return i.fetchText(this.getAttribute("data-template-url")).then(function (t) {
            return e.setCode(t)
        })
    }), _["default"](document).on("change", ".js-license-template input[type=radio]", function () {
        var e = n.getCodeEditor(_["default"](this).closest(".js-blob-form").find(".js-code-editor")[0]), t = _["default"](this).attr("data-template-contents");
        return null == t || null == e ? void 0 : e.setCode(t)
    })
}),define("github/legacy/pages/blob/csv", ["../../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function n(e) {
        var t = void 0, n = void 0;
        e = e.toLowerCase();
        var r = a["default"](".js-csv-data tbody tr"), i = [];
        for (t = 0, n = r.length; n > t; t++) {
            var o = r[t], s = a["default"](o).text().toLowerCase();
            -1 === s.indexOf(e) ? i.push(a["default"](o).hide()) : i.push(a["default"](o).show())
        }
        return i
    }

    function r(e) {
        var t = e.target.value;
        null != t && n(t), e.preventDefault()
    }

    var a = t(e);
    a["default"](document).on("focus", ".js-csv-filter-field", function () {
        return a["default"](this).on("keyup", r)
    }), a["default"](document).on("blur", ".js-csv-filter-field", function () {
        return a["default"](this).off("keyup", r)
    })
}),define("github/legacy/pages/codesearch/advanced_search", ["../../../onfocus", "../../../document-ready", "../../../jquery"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a() {
        function e(e) {
            return e.Users > e.Code && e.Users > e.Repositories ? "Users" : e.Code > e.Users && e.Code > e.Repositories ? "Code" : "Repositories"
        }

        var t = void 0;
        t = [];
        var n = o["default"](".js-advanced-search-input").val(), r = {
            Repositories: 0,
            Users: 0,
            Code: 0
        }, a = o["default"]("input[type=text].js-advanced-search-prefix, select.js-advanced-search-prefix");
        t = i(a, function (e, t, n) {
            return "" === e ? "" : ("" !== t && r[n]++, "" !== t ? "" + e + t : void 0)
        }), o["default"].merge(t, i(o["default"]("input[type=checkbox].js-advanced-search-prefix"), function (e, t, n) {
            var a = this.checked;
            return a ? (r[n]++, "" + e + a) : void 0
        }));
        var s = o["default"].trim(t.join(" "));
        return o["default"](".js-type-value").val(e(r)), o["default"](".js-search-query").val(o["default"].trim(n + " " + s)), o["default"](".js-advanced-query").empty(), o["default"](".js-advanced-query").text("" + s), o["default"](".js-advanced-query").prepend(o["default"]("<span>").text(o["default"].trim(n)), " ")
    }

    function i(e, t) {
        return o["default"].map(e, function (e) {
            function n(e) {
                return -1 !== e.search(/\s/g) ? '"' + e + '"' : e
            }

            var r = o["default"].trim(o["default"](e).val()), a = o["default"](e).attr("data-search-prefix"), i = o["default"](e).attr("data-search-type");
            return "" === a ? t.call(e, a, r, i) : -1 !== r.search(/\,/g) && "location" !== a ? r.split(/\,/).map(function (r) {
                return t.call(e, a, n(o["default"].trim(r)), i)
            }) : t.call(e, a, n(r), i)
        })
    }

    var o = r(n);
    e.onInput(".js-advanced-search-prefix", function () {
        a()
    }), o["default"](document).on("change", ".js-advanced-search-prefix", a), o["default"](document).on("focusin", ".js-advanced-search-input", function () {
        return o["default"](this).closest(".js-advanced-search-label").addClass("focus")
    }), o["default"](document).on("focusout", ".js-advanced-search-input", function () {
        return o["default"](this).closest(".js-advanced-search-label").removeClass("focus")
    }), o["default"](document).on("click", ".js-see-all-search-cheatsheet", function () {
        return o["default"](".js-more-cheatsheet-info").removeClass("d-none"), !1
    }), t.ready.then(function () {
        o["default"](".js-advanced-search-input").length && a()
    })
}),define("github/legacy/pages/commits", ["../../jquery", "../../navigation", "invariant", "delegated-events"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var i = a(e), o = a(n);
    i["default"](document).on("navigation:keyopen", ".commits-list-item", function () {
        return i["default"](this).find(".commit-title > a").first().click(), !1
    }), r.on("navigation:keydown", ".commits-list-item", function (e) {
        o["default"](e instanceof CustomEvent), "c" === e.detail.hotkey && (i["default"](this).find(".commit-title > a").first().click(), e.preventDefault(), e.stopPropagation())
    }), i["default"](document).on("menu:activated", ".js-diffbar-commits-menu", function (e) {
        var n = e.target.querySelector(".in-range");
        t.focus(this, n, "instant")
    })
}),define("github/legacy/pages/compare", ["../../form", "../../jquery", "../../hash-change", "invariant", "../../visible", "delegated-events", "../../observe"], function (e, t, n, r, a, i, o) {
    function s(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var u = s(t), l = s(n), c = s(r), d = s(a);
    u["default"](document).on("click", ".js-compare-tabs a", function () {
        return u["default"](this).closest(".js-compare-tabs").find("a").removeClass("selected"), u["default"](this).addClass("selected"), u["default"]("#commits_bucket, #files_bucket, #commit_comments_bucket").hide(), u["default"](this.hash).show(), !1
    }), l["default"](function () {
        return u["default"](this).closest("#files_bucket")[0] && !d["default"](this) ? u["default"]('a.tabnav-tab[href="#files_bucket"]').click() : void 0
    }), u["default"](document).on("click", ".js-toggle-range-editor-cross-repo", function () {
        return u["default"](".js-range-editor").toggleClass("is-cross-repo"), !1
    }), i.on("pjax:click", ".js-range-editor", function (e) {
        c["default"](e instanceof CustomEvent);
        var t = e.detail.options;
        u["default"](".js-compare-pr").hasClass("open") && !t.url.match(/expand=1/) && (null == t.data && (t.data = {}), t.data.expand = "1")
    }), u["default"](document).on("navigation:open", "form.js-commitish-form", function () {
        var t = this, n = u["default"](t), r = n.find(".js-new-item-name").text(), a = u["default"]("<input>", {
            type: "hidden",
            name: "new_compare_ref",
            value: r
        });
        n.append(a), e.submit(t)
    }), o.observe(".js-compare-pr.open", {
        add: function () {
            var e = document.body;
            c["default"](e), e.classList.add("is-pr-composer-expanded")
        }, remove: function () {
            var e = document.body;
            c["default"](e), e.classList.remove("is-pr-composer-expanded")
        }
    })
}),define("github/legacy/pages/diffs/helpers", ["exports"], function (e) {
    function t(e) {
        var t = e.match(/\#(diff\-[a-f0-9]+)([L|R])(\d+)-?([L|R])?(\d+)?$/i);
        if (null != t && 6 === t.length)return t;
        var n = e.match(/\#(discussion\-diff\-[0-9]+)([L|R])(\d+)-?([L|R])?(\d+)$/i);
        return null != n && 6 === n.length ? n : null
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.matchHash = t
}),define("github/legacy/pages/diffs/expander", ["../../../preserve-position", "../../../jquery", "../../../hash-change", "../../../fragment-target", "../../../sticky-scroll-into-view", "./helpers", "../../../diffs/progressive", "../../../fetch"], function (e, t, n, r, a, i, o, s) {
    function u(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function l(e, t) {
        return Promise.all(e.map(function (e) {
            return c(e, t)
        }))
    }

    function c(t, n) {
        var r = void 0;
        if (n) {
            var a = "R" === n.slice(-1) ? "data-right-range" : "data-left-range", i = parseInt(t.getAttribute(a).split("-")[0], 10);
            r = n + i
        } else r = t.hash.slice(1);
        var o = void 0;
        return o = t.getAttribute("data-url"), o += "&anchor=" + encodeURIComponent(r), o = o.replace(/[?&]/, "?"), new Promise(function (n, r) {
            return s.fetchText(o).then(function (r) {
                var a = f["default"](t).closest(".js-expandable-line"), i = a.next(".file-diff-line");
                return e.preservingScrollPosition(i[0], function () {
                    a.replaceWith(r)
                }), n()
            }, r)
        })
    }

    function d(e, t, n, r) {
        var a = void 0, i = void 0, o = void 0, s = void 0, u = void 0;
        n = parseInt(n, 10), r = parseInt(r, 10);
        var l = f["default"](e).find(".js-expand"), c = [];
        for (i = 0, o = l.length; o > i; i++) {
            var d = l[i], h = "R" === t ? "data-right-range" : "data-left-range";
            s = d.getAttribute(h).split("-"), u = parseInt(s[0], 10), a = parseInt(s[1], 10), n >= u && a >= n ? c.push(d) : u >= n && r >= a ? c.push(d) : r >= u && a >= r && c.push(d)
        }
        return c
    }

    var f = u(t), h = u(n);
    h["default"](function () {
        var e = void 0, t = void 0, n = void 0, s = void 0, u = void 0, c = void 0, h = window.location.hash;
        if (h && (u = i.matchHash(h))) {
            e = u[1], c = u[2], n = u[3], s = u[5];
            var m = e + c + n, v = e + c;
            if (!r.findElementByFragmentName(document, m) || s) {
                var p = 0, g = 1;
                return (t = function () {
                    var i = void 0, u = void 0;
                    if (u = f["default"](r.findElementByFragmentName(document, e)).next()[0]) {
                        if ((i = d(u, c, n, s)).length)return l(i, v).then(function () {
                            var e = r.findElementByFragmentName(document, m);
                            if (s && (i = d(u, c, n, s)).length)return t();
                            if (e instanceof HTMLElement) a.scrollIntoView(e); else if (g > p)return p++, t()
                        });
                        var h = r.findElementByFragmentName(document, m);
                        if (h instanceof HTMLElement) a.scrollIntoView(h); else if (!h) {
                            var y = u.querySelector(".js-diff-load-container");
                            if (!y)return;
                            o.loadDiff(y).then(function () {
                                var e = r.findElementByFragmentName(document, m);
                                e instanceof HTMLElement && a.scrollIntoView(e)
                            }, function () {
                                a.scrollIntoView(u)
                            })
                        }
                    }
                })()
            }
        }
    }), f["default"](document).on("click", ".js-expand", function () {
        return c(this, null), !1
    })
}),define("github/legacy/pages/diffs/line-comments", ["../../../form", "invariant", "../../../observe", "delegated-events", "../../../onfocus", "../../../parse-html", "../../../jquery"], function (e, t, n, r, a, i, o) {
    function s(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function u(e) {
        var t = e.closest("tr");
        return w["default"](t).next(".js-inline-comments-container")[0]
    }

    function l(e) {
        var t = e.closest("tr"), n = p("#js-inline-comments-single-container-template"), r = n.querySelector(".js-inline-comment-form");
        return r && b(r, {
            path: e.getAttribute("data-path"),
            anchor: e.getAttribute("data-anchor"),
            position: e.getAttribute("data-position"),
            line: e.getAttribute("data-line")
        }), t.after(n), n
    }

    function c(e) {
        var t = e.match(/^new_inline_comment_diff_([\w-]+)_(\d+)_(\d+)$/) || [], n = L(t, 3), r = n[1], a = n[2];
        if (r) {
            var i = document.querySelector(".js-inline-comment-form input[name='in_reply_to'][value='" + a + "']");
            i && f(i.closest(".js-line-comments"))
        }
    }

    function d(e) {
        var t = e.match(/^new_inline_comment_diff_([\w-]+)_(\d+)$/) || [], n = L(t, 3), r = n[1], a = n[2];
        if (r) {
            var i = document.querySelector(".js-add-line-comment[data-anchor='" + r + "'][data-position='" + a + "']");
            i && i.click()
        }
    }

    function f(e) {
        var t = e.querySelector(".js-inline-comment-form-container");
        t.classList.add("open"), t.querySelector(".js-write-tab").click(), t.querySelector(".js-comment-field").focus()
    }

    function h(e) {
        e.reset();
        var t = e.closest(".js-inline-comment-form-container");
        t.classList.remove("open"), v()
    }

    function m(t) {
        var n = t.querySelector(".js-toggle-file-notes");
        n && e.changeValue(n, !0)
    }

    function v() {
        var e = !0, t = !1, n = void 0;
        try {
            for (var r, a = document.querySelectorAll(".file .js-inline-comments-container")[Symbol.iterator](); !(e = (r = a.next()).done); e = !0) {
                var i = r.value, o = w["default"](i).find(".js-comments-holder > *"), s = o.length > 0, u = w["default"](i).find(".js-inline-comment-form-container").hasClass("open");
                s || u || w["default"](i).remove()
            }
        } catch (l) {
            t = !0, n = l
        } finally {
            try {
                !e && a["return"] && a["return"]()
            } finally {
                if (t)throw n
            }
        }
    }

    function p(e) {
        var t = document.querySelector(e);
        j["default"](t instanceof HTMLElement, e + " must match an HTMLElement");
        var n = t.firstElementChild;
        j["default"](null != n, "template must have a child");
        var r = n.cloneNode(!0), a = r.querySelector("textarea");
        return a && a instanceof HTMLTextAreaElement && (a.value = ""), r
    }

    function g(e, t, n) {
        var r = w["default"](e).find(".js-line-comments." + t)[0];
        if (r)return r;
        r = p("#js-inline-comments-split-form-container-template"), r.classList.add(t);
        var a = r.querySelector(".js-inline-comment-form");
        a && b(a, n);
        var i = w["default"](e).find("." + t);
        return i.last().after(r), i.remove(), r
    }

    function y(e) {
        var t = w["default"](e).next(".js-inline-comments-container")[0];
        return t ? t : (t = p("#js-inline-comments-split-container-template"), e.after(t), t)
    }

    function b(e, t) {
        var n = !0, r = !1, a = void 0;
        try {
            for (var i, o = e.elements[Symbol.iterator](); !(n = (i = o.next()).done); n = !0) {
                var s = i.value;
                s.name in t && (s.value = t[s.name])
            }
        } catch (u) {
            r = !0, a = u
        } finally {
            try {
                !n && o["return"] && o["return"]()
            } finally {
                if (r)throw a
            }
        }
        var l = e.querySelector(".js-comment-field");
        l.id = l.id.replace(/^r\d+ /, "").replace("${anchor}", t.anchor).replace("${position}", t.position)
    }

    var j = s(t), w = s(o), L = function () {
        function e(e, t) {
            var n = [], r = !0, a = !1, i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (u) {
                a = !0, i = u
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a)throw i
                }
            }
            return n
        }

        return function (t, n) {
            if (Array.isArray(t))return t;
            if (Symbol.iterator in Object(t))return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    r.on("click", ".js-add-single-line-comment", function () {
        m(this.closest(".file"));
        var e = u(this) || l(this), t = Array.from(e.querySelectorAll(".js-line-comments")).pop();
        f(t)
    }), r.on("click", ".js-add-split-line-comment", function () {
        m(this.closest(".file"));
        var e = void 0;
        switch (this.getAttribute("data-type")) {
            case"addition":
                e = "js-addition";
                break;
            case"deletion":
                e = "js-deletion"
        }
        var t = y(this.closest("tr")), n = g(t, e, {
            type: this.getAttribute("data-type"),
            anchor: this.getAttribute("data-anchor"),
            path: this.getAttribute("data-path"),
            position: this.getAttribute("data-position"),
            line: this.getAttribute("data-line")
        }), r = Array.from(n.querySelectorAll(".js-line-comments")).pop();
        f(r)
    }), r.on("click", ".js-toggle-inline-comment-form", function () {
        f(this.closest(".js-line-comments"))
    }), r.on("quote:selection", ".js-line-comments", function () {
        f(this)
    }), a.onHotkey("keydown", ".js-inline-comment-form .js-comment-field", function (e, t) {
        var n = e.target;
        n.classList.contains("js-navigation-enable") || "esc" === t && 0 === n.value.length && (h(n.closest(".js-inline-comment-form")), e.preventDefault())
    }), r.on("click", ".js-hide-inline-comment-form", function () {
        h(this.closest(".js-inline-comment-form"))
    }), w["default"](document).on("ajaxSuccess", ".js-inline-comment-form", function (e, t, n, r) {
        if (this === e.target) {
            var a = r.inline_comment;
            if (a) {
                var o = this.closest(".js-line-comments");
                o.querySelector(".js-comments-holder").append(i.parseHTML(document, a))
            }
            var s = r.inline_comment_thread;
            if (s) {
                var u = this.closest(".js-line-comments");
                u.replaceWith(i.parseHTML(document, s))
            }
            h(this)
        }
    }), w["default"](document).on("ajaxError", ".js-inline-comment-form", function (e, t) {
        if (this === e.target) {
            var n = void 0, r = JSON.parse(t.responseText), a = this.querySelector(".js-comment-form-error");
            n = r.errors ? Array.isArray(r.errors) ? r.errors.join(", ") : r.errors : "There was an error posting your comment.", a.textContent = n, a.style.display = "block", e.preventDefault()
        }
    }), document.addEventListener("session:resume", function (e) {
        c(e.detail.targetId), d(e.detail.targetId)
    }), n.observe(".js-comment", {remove: v})
}),define("github/legacy/pages/diffs/line-highlight", ["../../../observe", "../../../jquery"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(t, n, r) {
        return e.observe(t, function (e) {
            function t(e) {
                u && r(u, !1), u = i["default"](e.target).closest(n)[0], u && r(u, !0)
            }

            function a() {
                return e.addEventListener("mouseenter", l), e.addEventListener("mouseleave", s), e.addEventListener("mouseover", t)
            }

            function o() {
                return e.removeEventListener("mouseenter", l), e.removeEventListener("mouseleave", s), e.removeEventListener("mouseover", t)
            }

            var s = void 0, u = null, l = s = function () {
                u && r(u, !1), u = null
            };
            return {add: a, remove: o}
        })
    }

    function a(e) {
        return Math.floor(e / 2)
    }

    var i = n(t);
    r(".diff-table", "td.blob-code, td.blob-num", function (e, t) {
        var n = void 0, r = void 0, i = void 0, o = void 0, s = void 0, u = void 0, l = void 0, c = e.parentNode, d = c.children;
        if (4 === d.length)for (r = i = 0, s = d.length; s > i; r = ++i)n = d[r], n === e && (l = a(r));
        var f = [];
        for (r = o = 0, u = d.length; u > o; r = ++o)n = d[r], (null == l || a(r) === l) && f.push(n.classList.toggle("is-hovered", t));
        return f
    })
}),define("github/legacy/pages/diffs/linkable-line-number", ["delegated-events", "../../../observe", "../../../hash-change", "../../../fragment-target", "./helpers"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e) {
        return Math.floor(e / 2)
    }

    function s() {
        var e = void 0, t = void 0, n = void 0, i = void 0, s = void 0, u = void 0, c = void 0, d = void 0;
        if (l) {
            for (n = 0, s = l.length; s > n; n++)e = l[n], e.classList.remove("selected-line");
            l = null
        }
        var f = window.location.hash, h = a.matchHash(f);
        if (h) {
            var m = h[1], v = h[2], p = h[3], g = m + v + p;
            if (g && (c = r.findElementByFragmentName(document, g)), c && c.classList.contains("js-linkable-line-number")) {
                var y = c.parentNode, b = y.children;
                if (4 === b.length)for (t = i = 0, u = b.length; u > i; t = ++i)e = b[t], e === c && (d = o(t));
                l = function () {
                    var n = void 0, r = void 0, a = [];
                    for (t = n = 0, r = b.length; r > n; t = ++n)e = b[t], (null == d || o(t) === d) && (e.classList.toggle("selected-line"), a.push(e));
                    return a
                }()
            }
        }
    }

    var u = i(n);
    e.on("click", ".js-linkable-line-number", function (e) {
        window.location.hash = this.id, e.preventDefault()
    });
    var l = null;
    u["default"](s), t.observe(".blob-expanded", s), t.observe(".js-diff-progressive-loader", function (e) {
        e.addEventListener("load", s)
    }), t.observe(".js-diff-entry-loader", function (e) {
        e.addEventListener("load", s)
    })
}),define("github/legacy/pages/diffs/prose_diff", ["../../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("click", ".js-rich-diff.collapsed .js-expandable", function (e) {
        e.preventDefault(), n["default"](e.target).closest(".js-rich-diff").removeClass("collapsed")
    }), n["default"](document).on("click", ".js-show-rich-diff", function (e) {
        e.preventDefault(), n["default"](this).closest(".js-warn-no-visible-changes").addClass("d-none").hide().siblings(".js-no-rich-changes").removeClass("d-none").show()
    })
}),define("github/legacy/pages/diffs/split", ["../../../observe", "invariant"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r() {
        var e = document.body;
        a["default"](e);
        var t = document.querySelector("meta[name=diff-view]"), n = t && t instanceof HTMLMetaElement ? t.content : "", r = document.querySelector(".file-diff-split"), i = "split" === n && r || document.querySelector(".wants-full-width-container");
        e.classList.toggle("full-width", i)
    }

    var a = n(t);
    e.observe("meta[name=diff-view]", {add: r, remove: r}), e.observe(".file-diff-split", {
        add: r,
        remove: r
    }), e.observe(".js-compare-tabs .tabnav-tab.selected", {
        add: r,
        remove: r
    }), e.observe(".wants-full-width-container", {add: r, remove: r})
}),define("github/legacy/pages/diffs/toggle-file-notes", ["invariant", "../../../observe", "../../../form", "delegated-events"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var i = a(e);
    r.on("change", ".js-toggle-file-notes", function () {
        this.closest(".file").classList.toggle("show-inline-notes", this.checked)
    }), r.on("click", ".js-toggle-all-file-notes", function (e) {
        var t = document.querySelectorAll(".js-toggle-file-notes"), r = !1, a = !0, o = !1, s = void 0;
        try {
            for (var u, l = t[Symbol.iterator](); !(a = (u = l.next()).done); a = !0) {
                var c = u.value;
                c.checked && (r = !0)
            }
        } catch (d) {
            o = !0, s = d
        } finally {
            try {
                !a && l["return"] && l["return"]()
            } finally {
                if (o)throw s
            }
        }
        var f = !0, h = !1, m = void 0;
        try {
            for (var v, p = t[Symbol.iterator](); !(f = (v = p.next()).done); f = !0) {
                var g = v.value;
                i["default"](g instanceof HTMLInputElement, "Element must be an HTMLInputElement"), n.changeValue(g, !r)
            }
        } catch (d) {
            h = !0, m = d
        } finally {
            try {
                !f && p["return"] && p["return"]()
            } finally {
                if (h)throw m
            }
        }
        e.preventDefault()
    }), t.observe(".js-inline-comments-container", function (e) {
        var t = void 0, n = e.closest(".file");
        if (n) {
            var r = t = function () {
                var e = null != n.querySelector(".js-inline-comments-container");
                n.classList.toggle("has-inline-notes", e)
            };
            return {add: r, remove: t}
        }
    })
}),define("github/legacy/pages/diffs/tr-collapsing", ["../../../observe"], function (e) {
    function t(e) {
        var t = e.parentElement, n = t.querySelectorAll("td.js-line-comments").length, r = t.querySelectorAll("td.js-line-comments.is-collapsed").length;
        t.classList.toggle("is-collapsed", r > 0 && n === r)
    }

    e.observe("td.js-line-comments.is-collapsed", {
        add: function (e) {
            t(e)
        }, remove: function (e) {
            t(e)
        }
    })
}),define("github/legacy/pages/directory", ["../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("focusin", ".js-url-field", function () {
        var e = this;
        return setTimeout(function () {
            return n["default"](e).select()
        }, 0)
    })
}),define("github/legacy/pages/early_access_tracking", ["../../google-analytics", "../../jquery"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(t);
    !function () {
        document.querySelector(".js-account-membership-form") && (r["default"](document).one("change.early-access-tracking", ".js-account-membership-form", function () {
            e.trackEvent({category: "Large File Storage", action: "attempt", label: "location: early access form"})
        }), r["default"](document).on("submit.early-access-tracking", ".js-account-membership-form", function () {
            e.trackEvent({category: "Large File Storage", action: "submit", label: "location: early access form"})
        }))
    }()
}),define("github/legacy/pages/edit_repositories/options", ["../../../onfocus", "../../../typecast", "../../../jquery", "../../../visible", "../../../fetch"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o() {
        return u["default"](Array.from(u["default"](".js-repo-toggle-team:checked")).filter(l["default"]))
    }

    var s = i(t), u = i(n), l = i(r), c = /[^0-9A-Za-z_\-.]/g;
    e.onInput(".js-repository-name", function (e) {
        var t = e.target, n = s["default"](e.target.form, HTMLFormElement), r = s["default"](n.querySelector(".js-rename-repository-button"), HTMLButtonElement), a = u["default"](".js-form-note");
        a.html("Will be renamed as <strong>" + t.value.replace(c, "-") + "</strong>"), c.test(t.value) ? a.show() : a.hide(), r.disabled = !t.value || t.value === t.getAttribute("data-original-name")
    }), u["default"](document).on("click", ".js-repo-team-suggestions-view-all", function () {
        return a.fetchText(this.href).then(function (e) {
            return function (t) {
                var n = o().map(function () {
                    return this.value
                }), r = u["default"](e).closest("ul");
                return r.html(t), n.each(function () {
                    return r.find(".js-repo-toggle-team[value=" + this + "]").prop("checked", !0)
                })
            }
        }(this)), !1
    })
}),define("github/legacy/pages/edit_repositories/repository-collabs", ["../../../jquery", "../../../typecast", "../../../observe", "../../../form"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e, t) {
        var n = t.querySelector(".js-repo-access-error");
        return n.textContent = e, n.classList.remove("d-none")
    }

    function o() {
        var e = void 0, t = void 0, n = document.querySelectorAll(".js-repo-access-error"), r = [];
        for (e = 0, t = n.length; t > e; e++) {
            var a = n[e];
            a.textContent = "", r.push(a.classList.add("d-none"))
        }
        return r
    }

    function s(e) {
        return e.classList.toggle("is-empty", !e.querySelector(".js-repo-access-entry"))
    }

    function u() {
        var e = document.getElementById("collaborators");
        e && (f["default"](e.querySelector(".js-add-new-collab"), HTMLButtonElement).disabled = !0, d["default"](e.querySelector(".js-add-repo-access-field")).data("autocompleted"))
    }

    function l(e) {
        var t = void 0, n = void 0, r = document.querySelector(".js-repo-access-team-select");
        if (r) {
            var a = 0, i = r.querySelectorAll(".js-repo-access-team-select-option");
            for (t = 0, n = i.length; n > t; t++) {
                var o = i[t], s = o.classList;
                e === o.getAttribute("data-team-id") && (s.add("has-access"), s.remove("selected")), s.contains("has-access") || a++
            }
            if (0 === a)return f["default"](r.closest(".js-repo-access-group"), HTMLElement).classList.add("no-form")
        }
    }

    function c(e) {
        var t = document.querySelector(".js-repo-access-team-select");
        if (t) {
            var n = t.querySelector("[data-team-id='" + e + "']");
            return n && n.classList.remove("has-access"), f["default"](t.closest(".js-repo-access-group"), HTMLElement).classList.remove("no-form")
        }
    }

    var d = a(e), f = a(t);
    n.observe(".js-add-new-collab", u), d["default"](document).on("autocomplete:autocompleted:changed", ".js-add-repo-access-field", function () {
        return d["default"](this).data("autocompleted") ? this.form.querySelector(".js-add-new-collab").disabled = !1 : u()
    }), d["default"](document).on("selectmenu:selected", ".js-repo-access-team-select", function () {
        var e = this.querySelector(".js-repo-access-team-select-option.selected").getAttribute("data-team-id"), t = this.closest(".js-repo-access-group").querySelector(".js-add-repo-access-field");
        t.value = e, r.submit(t.form)
    }), d["default"](document).on("ajaxSend", ".js-add-repo-access-form", function () {
        o()
    }), d["default"](document).on("ajaxSuccess", ".js-add-repo-access-form", function (e, t, n, r) {
        var a = void 0, o = this.closest(".js-repo-access-group"), c = this.querySelector(".js-add-repo-access-field");
        a = "teams" === o.id ? o.querySelector(".js-repo-access-list") : o.querySelector(".js-repo-access-list-invites");
        var d = c.value;
        return c.value = "", r.error ? i(r.error, o) : (u(), a.insertAdjacentHTML("beforeend", r.html), s(o), "teams" === o.id ? l(d) : void 0)
    }), d["default"](document).on("ajaxSuccess", ".js-remove-repo-access-form", function () {
        o();
        var e = this.closest(".js-repo-access-entry"), t = this.closest(".js-repo-access-group");
        return "teams" === t.id && c(e.getAttribute("data-team-id")), e.remove(), s(t)
    }), d["default"](document).on("ajaxError", ".js-remove-repo-access-form", function () {
        return i(this.getAttribute("data-error-message"), this.closest(".js-repo-access-group")), !1
    })
}),define("github/legacy/pages/edit_repositories/repository-options", ["invariant", "../../../fetch", "delegated-events", "../../../observe", "../../../throttled-input", "../../../jquery"], function (e, t, n, r, a, i) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s(e) {
        var t = e.querySelector(".js-authorized-pushers"), n = parseInt(t.getAttribute("data-limit")), r = t.querySelectorAll(".js-authorized-user-or-team").length;
        t.classList.toggle("at-limit", r >= n)
    }

    var u = o(e), l = o(i);
    l["default"](document).on("change", ".js-default-branch", function () {
        var e = document.querySelector(".js-default-branch-confirmation");
        u["default"](e instanceof HTMLInputElement, ".js-default-branch-confirmation must exist and be an HTMLInputElement");
        var t = document.querySelector(".js-change-default-branch-button");
        u["default"](t instanceof HTMLButtonElement, ".js-change-default-branch-button must exist and be an HTMLButtonElement"), t.disabled = this.value === e.getAttribute("data-original-value"), e.value = this.value
    }), n.on("change", ".js-repo-features-form input[type=checkbox]", function () {
        var e = this.closest(".js-repo-option").querySelector(".js-status-indicator");
        e.classList.remove("status-indicator-success", "status-indicator-failed"), e.classList.add("status-indicator-loading")
    }), l["default"](document).on("ajaxSuccess", ".js-repo-features-form", function (e, t, n, r) {
        Array.from(this.querySelectorAll(".status-indicator-loading")).forEach(function (e) {
            e.classList.remove("status-indicator-loading"), e.classList.add("status-indicator-success")
        }), /^\s*</.test(r) && l["default"](document.querySelector(".js-repo-nav")).replaceWith(r)
    }), l["default"](document).on("ajaxError", ".js-repo-features-form", function () {
        Array.from(this.querySelectorAll(".status-indicator-loading")).forEach(function (e) {
            e.classList.remove("status-indicator-loading"), e.classList.add("status-indicator-failed");
            var t = e.closest(".js-repo-option").querySelector("input[type=checkbox]");
            t.checked = !t.checked
        })
    }), n.on("change", ".js-merge-features-form input[type=checkbox]", function () {
        Array.from(this.form.querySelectorAll(".errored")).forEach(function (e) {
            return e.classList.remove("errored")
        });
        var e = this.closest(".js-repo-option"), t = e.querySelector(".js-status-indicator");
        t.classList.remove("status-indicator-success", "status-indicator-failed"), t.classList.add("status-indicator-loading")
    }), l["default"](document).on("ajaxSuccess", ".js-merge-features-form", function () {
        Array.from(this.querySelectorAll(".errored")).forEach(function (e) {
            return e.classList.remove("errored")
        }), Array.from(this.querySelectorAll(".js-select-one-warning")).forEach(function (e) {
            e.classList.add("d-none")
        }), Array.from(this.querySelectorAll(".status-indicator-loading")).forEach(function (e) {
            e.classList.remove("status-indicator-loading"), e.classList.add("status-indicator-success")
        })
    }), l["default"](document).on("ajaxError", ".js-merge-features-form", function (e) {
        Array.from(this.querySelectorAll(".js-select-one-warning")).forEach(function (e) {
            e.classList.remove("d-none")
        }), Array.from(this.querySelectorAll(".status-indicator-loading")).forEach(function (e) {
            e.classList.remove("status-indicator-loading"), e.classList.add("status-indicator-failed");
            var t = e.closest(".js-repo-option");
            t.classList.add("errored");
            var n = t.querySelector("input[type=checkbox]");
            n.checked = !n.checked
        }), Array.from(this.querySelectorAll(".status-indicator-success")).forEach(function (e) {
            e.classList.remove("status-indicator-success")
        }), e.preventDefault()
    }), l["default"](document).on("change", ".js-protect-branch", function () {
        var e = this.closest(".js-protected-branch-settings"), t = this.checked;
        Array.from(e.querySelectorAll(".js-protected-branch-options")).forEach(function (e) {
            e.classList.toggle("active", t)
        }), Array.from(e.querySelectorAll(".js-protected-branch-option")).forEach(function (e) {
            t ? e.removeAttribute("disabled") : e.setAttribute("disabled", "disabled")
        })
    }), l["default"](document).on("change", ".js-required-status-toggle", function () {
        var e = this.closest(".js-protected-branch-settings"), t = e.querySelector(".js-required-statuses");
        t.classList.toggle("d-none", !this.checked)
    }), l["default"](document).on("change", ".js-required-status-checkbox", function () {
        var e = this.closest(".js-protected-branches-item");
        e.querySelector(".js-required-status-badge").classList.toggle("d-none", !this.checked)
    }), n.on("change", ".js-authorized-branch-pushers-toggle, .js-authorized-review-dismisser-toggle", function () {
        var e = this.closest(".js-protected-branch-options"), t = e.querySelector(".js-authorized-pushers");
        t.classList.toggle("d-none", !this.checked), t.querySelector(".js-autocomplete-field").focus()
    }), l["default"](document).on("change", ".js-protected-branch-include-admin-toggle", function () {
        var e = this.closest(".js-protected-branch-options"), t = e.querySelectorAll(".js-protected-branch-admin-permission");
        Array.from(t).forEach(function (e) {
            e.classList.toggle("d-none"), e.classList.toggle("active", !e.classList.contains("d-none"))
        })
    }), l["default"](document).on("autocomplete:result", ".js-add-protected-branch-user-or-team", function (e, n) {
        var r = this.closest(".js-protected-branch-options"), a = this.closest(".js-autocomplete-container"), i = new URL(a.getAttribute("data-url"), window.location.origin), o = new URLSearchParams(i.search.slice(1));
        o.append("item", n), i.search = o.toString();
        var u = r.querySelector(".js-authorized-users-and-teams"), l = u.querySelector("div[data-user-or-team-name='" + n + "']");
        l ? (a.querySelector(".js-autocomplete-field").value = "", l.querySelector(".js-protected-branch-pusher").classList.add("user-already-added")) : t.fetchText(i).then(function (e) {
            a.querySelector(".js-autocomplete-field").value = "", u.insertAdjacentHTML("beforeend", e), s(r)
        })
    }), n.on("click", ".js-remove-authorized-user-or-team", function () {
        var e = this.closest(".js-protected-branch-options");
        this.closest(".js-authorized-user-or-team").remove(), s(e)
    }), r.observe("#pages-cname-field", function (e) {
        a.addThrottledInputEventListener(e, function () {
            var e = document.querySelector(".js-pages-cname-save-btn");
            u["default"](e instanceof HTMLButtonElement, ".js-pages-cname-save-btn must be a button"), e.disabled = this.value === this.defaultValue
        })
    }), l["default"](document).on("selectmenu:selected", ".js-pages-source", function () {
        var e = document.querySelector(".js-pages-source-btn-text");
        u["default"](e instanceof HTMLElement, ".js-pages-source-btn-text must exist");
        var t = e.getAttribute("data-original-text") === e.textContent, n = document.querySelector(".js-pages-source-save-btn");
        u["default"](n instanceof HTMLButtonElement, "Missing element [`.js-pages-source-save-btn`]"), n.disabled = t;
        var r = document.querySelector(".js-pages-theme-source-value");
        if (r && r instanceof HTMLInputElement) {
            var a = this.querySelector(".selected input").value, i = document.querySelector(".js-pages-theme-source-note"), o = document.querySelector(".js-pages-theme-source-note-value");
            if (u["default"](i instanceof HTMLElement && o instanceof HTMLElement, ".js-pages-theme-source-note and .js-pages-theme-source-note-value must exist"), "none" === a) {
                var s = r.getAttribute("data-original-value"), l = o.getAttribute("data-original-text");
                u["default"](null != s && null != l, "Missing attributes [`data-original-value`, `data-original-text`]"), r.value = s, o.textContent = l, i.classList.remove("hide-note")
            } else r.value = a, o.textContent = e.textContent, t ? i.classList.add("hide-note") : i.classList.remove("hide-note")
        }
    }), r.observe(".js-enable-btn", function (e) {
        e.disabled = !1, e.classList.remove("tooltipped"), e.removeAttribute("aria-label")
    })
}),define("github/legacy/pages/editors/render", ["../../../observe", "../../../code-editor", "../../../jquery", "../../../visible"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        if (null != e) {
            var t = p.get(e[0]);
            if (null != t)return t.load = t.hello = null, t.helloTimer && (clearTimeout(t.helloTimer), t.helloTimer = null), t.loadTimer ? (clearTimeout(t.loadTimer), t.loadTimer = null) : void 0
        }
    }

    function o(e) {
        if (!p.get(e[0])) {
            var t = 10, n = 45, r = {load: null, hello: null, helloTimer: null, loadTimer: null};
            r.load = Date.now(), r.helloTimer = setTimeout(l(e, function () {
                return !r.hello
            }), 1e3 * t), r.loadTimer = setTimeout(l(e), 1e3 * n), p.set(e[0], r)
        }
    }

    function s(e) {
        return e.addClass("is-render-requested")
    }

    function u(e) {
        return null != e ? (e.removeClass(v), e.addClass("is-render-failed"), i(e)) : void 0
    }

    function l(e, t) {
        return null == t && (t = function () {
            return !0
        }), function () {
            var n = void 0, r = function () {
                try {
                    return Array.from(e).some(m["default"])
                } catch (t) {
                    return Array.from(e).filter(m["default"]).length > 0
                }
            }();
            return !r || e.hasClass("is-render-ready") || e.hasClass("is-render-failed") || e.hasClass("is-render-failed-fatally") || t && !t() ? void 0 : (n = p.get(e[0])) ? (console.error("Render timeout: " + JSON.stringify(n) + " Now: " + Date.now()), u(e)) : console.error("No timing data on $:", e)
        }
    }

    function c(e) {
        var t = h["default"](e || this), n = p.get(t[0]);
        (null != n ? n.load : 0) || (i(t), o(t), t.addClass("is-render-automatic"), s(t))
    }

    function d(e) {
        var t = ".js-render-target";
        return e ? h["default"](t + "[data-identity='" + e + "']") : h["default"](t)
    }

    function f(e, n, r, a, i) {
        var o = void 0, s = void 0, l = void 0, c = void 0;
        switch (a) {
            case"hello":
                var d = p.get(e[0]) || {untimed: !0};
                if (d.hello = Date.now(), l = {
                        type: "render:cmd",
                        body: {cmd: "ack", ack: !0}
                    }, o = {
                        type: "render:cmd",
                        body: {cmd: "branding", branding: !1}
                    }, c = null != (s = e.find("iframe").get(0)) ? s.contentWindow : void 0, c && "function" == typeof c.postMessage && c.postMessage(JSON.stringify(l), "*"), c && "function" == typeof c.postMessage && c.postMessage(JSON.stringify(o), "*"), e.hasClass("is-local")) {
                    var f = t.getCodeEditor(e.parents(".js-code-editor")[0]);
                    return null == f ? null : (o = {
                        type: "render:data",
                        body: f.code()
                    }, c && "function" == typeof c.postMessage ? c.postMessage(JSON.stringify(o), "*") : null)
                }
                break;
            case"error":
                return u(e);
            case"error:fatal":
                return u(e), e.addClass("is-render-failed-fatal");
            case"error:invalid":
                return u(e, "invalid"), e.addClass("is-render-failed-invalid");
            case"loading":
                return e.removeClass(v), e.addClass("is-render-loading");
            case"loaded":
                return e.removeClass(v), e.addClass("is-render-loaded");
            case"ready":
                if (e.removeClass(v), e.addClass("is-render-ready"), null != i && null != i.height)return e.height(i.height);
                break;
            case"resize":
                return null != i && null != i.height && e.hasClass("is-render-ready") ? e.height(i.height) : console.error("Resize event sent without height or before ready");
            default:
                return console.error("Unknown message [" + n + "]=>'" + a + "'")
        }
    }

    var h = a(n), m = a(r), v = ["is-render-pending", "is-render-ready", "is-render-loading", "is-render-loaded"].reduce(function (e, t) {
        return e + " " + t
    }), p = new WeakMap;
    e.observe(".js-render-target", c), h["default"](window).on("message", function (e) {
        var t = void 0, n = void 0, r = void 0, a = void 0, i = void 0, o = void 0, s = void 0, u = void 0, l = void 0;
        if (s = null != (o = e.originalEvent) ? o : e, n = s.data, a = s.origin, n && a) {
            u = function () {
                try {
                    return JSON.parse(n)
                } catch (t) {
                    return e = t, n
                }
            }(), l = u.type, r = u.identity, t = u.body, i = u.payload;
            var c = d(r);
            if (l && t && 1 === c.length && a === c.attr("data-host") && "render" === l)return f(c, l, r, t, i)
        }
    })
}),define("github/legacy/pages/explore", ["../../document-ready", "../../jquery"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(t);
    e.ready.then(function () {
        function e() {
            t.find(".selected").removeClass("selected");
            var e = t.find("input[type=radio]:enabled:checked");
            return e.closest(".newsletter-frequency-choice").addClass("selected")
        }

        var t = r["default"](".js-newsletter-frequency-choice");
        t.length && (t.on("change", "input[type=radio]", function () {
            e()
        }), e())
    }), r["default"](document).on("ajaxSuccess", ".js-subscription-toggle", function () {
        var e = r["default"](this).find(".selected .notice");
        return e.addClass("visible"), setTimeout(function () {
            return e.removeClass("visible")
        }, 2e3)
    }), r["default"](document).on("ajaxSuccess", ".js-explore-newsletter-subscription-container", function (e, t) {
        return r["default"](this).replaceWith(t.responseText)
    })
}),define("github/legacy/pages/files/ref_create", ["../../../form", "../../../jquery"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(t);
    r["default"](document).on("navigation:open", ".js-create-branch", function () {
        return e.submit(this), !1
    })
}),define("github/legacy/pages/files/repo_next", ["delegated-events"], function (e) {
    e.on("click", ".js-toggle-lang-stats", function (e) {
        var t = document.querySelector(".js-stats-switcher-viewport");
        if (null != t) {
            var n = 0 !== t.scrollTop ? "is-revealing-overview" : "is-revealing-lang-stats";
            t.classList.toggle(n), e.preventDefault()
        }
    })
}),define("github/legacy/pages/generated_pages/theme_picker", ["../../../typecast", "../../../document-ready", "../../../form", "../../../jquery"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    }

    var o = a(e), s = a(r), u = function () {
        function e(e) {
            var t = s["default"](e);
            this.name = t.attr("data-theme-name"), this.slug = t.attr("data-theme-slug"), this.gem = t.attr("data-theme-gem"), this.selected = t.hasClass("selected"), this.baseHref = t.attr("href")
        }

        return e.prototype.wrappedKey = function (e, t) {
            return null == t && (t = null), t ? t + "[" + e + "]" : e
        }, e.prototype.params = function (e) {
            null == e && (e = null);
            var t = {};
            return t[this.wrappedKey("theme_slug", e)] = this.slug, t
        }, e.prototype.previewSrc = function () {
            return [this.baseHref, s["default"].param(this.params())].join("&")
        }, e
    }(), l = function () {
        function e() {
            this.updateScrollLinks = i(this.updateScrollLinks, this), this.scrollThemeLinksContainer = i(this.scrollThemeLinksContainer, this), this.onPublishClick = i(this.onPublishClick, this), this.onHideClick = i(this.onHideClick, this), this.onThemeLinkClick = i(this.onThemeLinkClick, this), this.onThemeNavNextClick = i(this.onThemeNavNextClick, this), this.onThemeNavPrevClick = i(this.onThemeNavPrevClick, this), this.onScrollForwardsClick = i(this.onScrollForwardsClick, this), this.onScrollBackwardsClick = i(this.onScrollBackwardsClick, this), this.onPagePreviewLoad = i(this.onPagePreviewLoad, this), this.$pagePreview = s["default"]("#page-preview"), this.$contextLoader = s["default"](".theme-picker-spinner"), this.$fullPicker = s["default"](".theme-picker-thumbs"), this.$miniPicker = s["default"](".theme-picker-controls"), this.$scrollBackwardsLinks = s["default"](".theme-toggle-full-left"), this.$scrollForwardsLinks = s["default"](".theme-toggle-full-right"), this.$prevLinks = s["default"](".theme-picker-prev"), this.$nextLinks = s["default"](".theme-picker-next"), this.themeLinksContainer = this.$fullPicker.find(".js-theme-selector"), this.themeLinks = this.themeLinksContainer.find(".theme-selector-thumbnail"), this.themes = [], this.themeLinks.each(function (e) {
                return function (t, n) {
                    var r = new u(n);
                    return r.selected && (e.selectedTheme = r), e.themes.push(r)
                }
            }(this)), this.selectedTheme = this.selectedTheme || this.themes[0], this.$pagePreview.on("load", this.onPagePreviewLoad), this.$scrollBackwardsLinks.click(this.onScrollBackwardsClick), this.$scrollForwardsLinks.click(this.onScrollForwardsClick), this.$prevLinks.click(this.onThemeNavPrevClick), this.$nextLinks.click(this.onThemeNavNextClick), this.themeLinks.click(this.onThemeLinkClick), s["default"](".theme-picker-view-toggle").click(this.onHideClick), s["default"]("#page-edit").click(this.onEditClick), s["default"]("#page-publish").click(this.onPublishClick), this.theme(this.selectedTheme), this.updateScrollLinks()
        }

        return e.prototype.onPagePreviewLoad = function () {
            this.$contextLoader.removeClass("visible")
        }, e.prototype.onScrollBackwardsClick = function () {
            return this.scrollThemeLinksContainer(-1)
        }, e.prototype.onScrollForwardsClick = function () {
            return this.scrollThemeLinksContainer(1)
        }, e.prototype.onThemeNavPrevClick = function () {
            return this.theme(this.prevTheme())
        }, e.prototype.onThemeNavNextClick = function () {
            return this.theme(this.nextTheme())
        }, e.prototype.onThemeLinkClick = function (e) {
            return this.theme(this.themeForLink(e.currentTarget)), !1
        }, e.prototype.onHideClick = function (e) {
            this.$fullPicker.toggle(), this.$miniPicker.toggle(), this.scrollToTheme(this.theme(), !1);
            var t = s["default"](e.currentTarget);
            return t.toggleClass("open")
        }, e.prototype.onEditClick = function () {
            return n.submit(o["default"](document.getElementById("page-edit-form"), HTMLFormElement)), !1
        }, e.prototype.onPublishClick = function () {
            var e = s["default"]("#page-publish-form"), t = this.theme();
            return t && e.find('input[name="page[theme_slug]"]').val(t.slug), n.submit(o["default"](document.getElementById("page-publish-form"), HTMLFormElement)), !1
        }, e.prototype.scrollThemeLinksContainer = function (e) {
            var t = this.themeLinksContainer.scrollLeft(), n = this.themeLinksContainer.outerWidth(!1), r = t + n * e;
            return this.themeLinksContainer.animate({scrollLeft: r}, 400, function (e) {
                return function () {
                    return e.updateScrollLinks()
                }
            }(this)), !1
        }, e.prototype.updateScrollLinks = function () {
            var e = this.themeLinksContainer.scrollLeft();
            if (0 >= e)return this.$scrollBackwardsLinks.addClass("disabled"), this.$scrollForwardsLinks.removeClass("disabled");
            this.$scrollBackwardsLinks.removeClass("disabled");
            var t = this.themeLinksContainer[0].scrollWidth, n = t - this.themeLinksContainer.outerWidth(!1);
            return e >= n ? this.$scrollForwardsLinks.addClass("disabled") : this.$scrollForwardsLinks.removeClass("disabled")
        }, e.prototype.selectedThemeIndex = function () {
            return this.themes.indexOf(this.selectedTheme)
        }, e.prototype.prevTheme = function () {
            var e = (this.selectedThemeIndex() - 1) % this.themes.length;
            return 0 > e && (e += this.themes.length), this.themes[e]
        }, e.prototype.nextTheme = function () {
            return this.themes[(this.selectedThemeIndex() + 1) % this.themes.length]
        }, e.prototype.themeForLink = function (e) {
            return this.themes[this.themeLinks.index(s["default"](e))]
        }, e.prototype.linkForTheme = function (e) {
            return s["default"](this.themeLinks[this.themes.indexOf(e)])
        }, e.prototype.scrollToTheme = function (e, t) {
            null == t && (t = !0);
            var n = this.linkForTheme(e), r = this.themes.indexOf(e), a = n.outerWidth(!0), i = r * a, o = this.themeLinksContainer.scrollLeft(), s = o + this.themeLinksContainer.outerWidth(!1);
            return o > i || i + a > s ? t ? this.themeLinksContainer.animate({scrollLeft: i}, 500) : this.themeLinksContainer.scrollLeft(i) : void 0
        }, e.prototype.theme = function (e) {
            return null == e && (e = null), e ? (this.selectedTheme = e, this.showPreviewFor(e), this.themeLinks.removeClass("selected"), this.linkForTheme(e).addClass("selected"), this.scrollToTheme(e), this.$miniPicker.find(".js-theme-name").text(e.name), !1) : this.selectedTheme
        }, e.prototype.showPreviewFor = function (e) {
            if (this.$contextLoader.addClass("visible"), e.gem) this.$pagePreview.attr("src", e.baseHref); else {
                var t = this.$fullPicker.find("form");
                t.find('input[name="theme_slug"]').val(e.slug), n.submit(t[0])
            }
        }, e
    }();
    t.ready.then(function () {
        document.getElementById("theme-picker-wrap") && new l
    })
}),define("github/legacy/pages/gist/drag_drop", ["../../../typecast", "../../../observe", "../../../google-analytics", "invariant"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        l["default"](document.querySelector(".js-gist-dropzone"), HTMLElement).classList.remove("d-none"), e.stopPropagation(), e.preventDefault()
    }

    function o(e) {
        null != e.target.classList && e.target.classList.contains("js-gist-dropzone") && e.target.classList.add("d-none")
    }

    function s(e) {
        var t = void 0, r = void 0, a = e.dataTransfer.files, i = function () {
            var r = a[t];
            n.trackEvent({category: "Interaction", action: "File Drop", label: r.type}), u(r).then(function (t) {
                r = t.file;
                var n = t.data;
                return e.target.dispatchEvent(new CustomEvent("gist:filedrop", {
                    bubbles: !0,
                    cancelable: !0,
                    detail: {file: r, text: n}
                }))
            }, function () {
            })
        };
        for (t = 0, r = a.length; r > t; t++)i();
        l["default"](document.querySelector(".js-gist-dropzone"), HTMLElement).classList.add("d-none"), e.stopPropagation(), e.preventDefault()
    }

    function u(e) {
        return new Promise(function (t, n) {
            var r = new FileReader;
            return r.onload = function () {
                var a = r.result;
                return a && !/\0/.test(a) ? t({file: e, data: a}) : n(new Error("invalid file"))
            }, r.readAsText(e)
        })
    }

    var l = a(e), c = a(r);
    t.observe(".js-gist-dropzone", {
        add: function () {
            var e = document.body;
            c["default"](e), e.addEventListener("dragenter", i), e.addEventListener("dragleave", o), e.addEventListener("dragover", i), e.addEventListener("drop", s)
        }, remove: function () {
            var e = document.body;
            c["default"](e), e.removeEventListener("dragenter", i), e.removeEventListener("dragleave", o), e.removeEventListener("dragover", i), e.removeEventListener("drop", s)
        }
    })
}),define("github/legacy/pages/gist/gist_edit", ["invariant", "../../../document-ready", "../../../observe", "../../../code-editor", "../../../throttled-input", "../../../jquery", "../../../focused", "../../../fetch"], function (e, t, n, r, a, i, o, s) {
    function u(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function l(e) {
        var t = void 0, n = void 0, r = void 0, a = void 0, i = void 0, o = e.querySelector(".js-gist-files"), s = document.getElementById("js-gist-file-template");
        p["default"](s);
        var u = document.createElement("div");
        u.innerHTML = s.textContent;
        var l = u.querySelectorAll("[id]");
        for (n = 0, a = l.length; a > n; n++)t = l[n], t.removeAttribute("id");
        var c = u.querySelector(".js-code-textarea");
        null != c && c.setAttribute("id", "blob_contents_" + Date.now());
        var d = u.children;
        for (r = 0, i = d.length; i > r; r++)t = d[r], o.append(t);
        return o.lastElementChild
    }

    function c(e) {
        var t = void 0, n = void 0, r = e.querySelectorAll(".js-gist-file");
        for (t = 0, n = r.length; n > t; t++) {
            var a = r[t], i = a.querySelector(".js-gist-filename"), o = a.querySelector(".js-blob-contents");
            if (!i.value && !o.value)return a
        }
        return l(e)
    }

    function d(e) {
        return r.getAsyncCodeEditor(e.closest(".js-code-editor"))
    }

    function f(e) {
        var t = void 0, n = void 0, r = e.querySelectorAll(".js-code-textarea");
        for (t = 0, n = r.length; n > t; t++) {
            var a = r[t];
            if (a.value.trim().length > 0)return !0
        }
        return !1
    }

    function h() {
        var e = void 0, t = void 0, n = document.querySelectorAll(".js-gist-create"), r = [];
        for (e = 0, t = n.length; t > e; e++) {
            var a = n[e];
            p["default"](a instanceof HTMLButtonElement, "`.js-gist-create` must be HTMLButtonElement"), r.push(a.disabled = !f(a.form))
        }
        return r
    }

    function m() {
        var e = this, t = e.getAttribute("data-language-detection-url");
        return t ? s.fetchJSON(t + "?filename=" + encodeURIComponent(e.value)).then(function (t) {
            return d(e).then(function (e) {
                return e.setMode(t.language)
            })
        }) : void 0
    }

    function v(e) {
        var t = void 0, n = void 0, r = e.querySelectorAll(".js-remove-gist-file"), a = [];
        for (t = 0, n = r.length; n > t; t++) {
            var i = r[t];
            a.push(i.classList.toggle("d-none", r.length < 2))
        }
        return a
    }

    var p = u(e), g = u(i), y = u(o);
    g["default"](document).on("change", ".js-code-textarea", function () {
        return h()
    }), y["default"](document, ".js-gist-filename", {
        focusin: function () {
            var e = this, t = this.closest(".js-code-editor");
            d(t).then(function () {
                a.addThrottledInputEventListener(e, m)
            })
        }, focusout: function () {
            a.removeThrottledInputEventListener(this, m)
        }
    }), g["default"](document).on("click", ".js-add-gist-file", function () {
        var e = this.closest(".js-blob-form");
        return l(e).scrollIntoView(), !1
    }), g["default"](document).on("gist:filedrop", ".js-blob-form", function (e) {
        var t = void 0, n = void 0, r = void 0;
        n = e.originalEvent.detail, t = n.file, r = n.text;
        var a = c(this), i = a.querySelector(".js-gist-filename");
        return i.value = t.name, m.call(i), d(i).then(function (e) {
            return e.setCode(r)
        }), a.scrollIntoView()
    }), g["default"](document).on("click", ".js-remove-gist-file", function () {
        var e = void 0, t = void 0, n = this.closest(".js-gist-file"), r = n.querySelectorAll(".js-gist-deleted input");
        for (e = 0, t = r.length; t > e; e++) {
            var a = r[e];
            a.disabled = !1
        }
        return n.querySelector(".js-code-editor").remove(), !1
    }), t.ready.then(function () {
        h()
    }), n.observe(".js-remove-gist-file", function (e) {
        var t = e.closest(".js-gist-files");
        return {
            add: function () {
                return v(t)
            }, remove: function () {
                return v(t)
            }
        }
    })
}),define("github/legacy/pages/gist/task_lists", ["../../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("ajaxComplete", ".js-gist-file-update-container .js-comment-update", function (e, t) {
        if (200 === t.status) {
            var n = JSON.parse(t.responseText);
            if (this.action = n.url, n.authenticity_token) {
                var r = this.querySelector("input[name=authenticity_token]");
                r.value = n.authenticity_token
            }
        }
    })
}),define("github/legacy/pages/header", ["../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("click", ".js-skip-to-content", function () {
        return n["default"]("#start-of-content").next().attr("tabindex", "-1").focus(), !1
    })
}),define("github/legacy/pages/hooks", ["invariant", "../../form", "../../throttled-input", "../../fetch", "../../jquery", "../../sudo", "../../facebox", "delegated-events", "../../observe"], function (e, t, n, r, a, i, o, s, u) {
    function l(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function c(e) {
        var t = h["default"](".js-hook-event-checkbox");
        return t.prop("checked", !1), null != e ? t.filter(e).prop("checked", !0) : void 0
    }

    function d() {
        var e = h["default"](this), n = e.find(".js-value"), r = e.closest("form"), a = r.find(".js-enforcement-value")[0];
        a.value = n.text().split("_")[0];
        var i = r.find(".js-final-value")[0];
        return "undefined" != typeof i && (n.text().split("_")[1] ? i.value = !1 : i.value = !0), t.submit(r[0])
    }

    var f = l(e), h = l(a), m = l(i), v = l(o), p = new WeakMap, g = {
        isHttpFragment: function (e) {
            return 0 === "http://".indexOf(e) || 0 === "https://".indexOf(e)
        }, isValidHttpUrl: function (e) {
            e = e.trim();
            var t = function () {
                try {
                    return new URL(e)
                } catch (t) {
                }
            }();
            if (null == t)return !1;
            var n = /^https?/.test(t.protocol), r = t.href === e || t.href === e + "/";
            return n && r
        }
    };
    u.observe(".js-hook-url-field", function (e) {
        function t(e) {
            var t = h["default"](e).closest("form"), n = /^https:\/\/.+/.test(e.val());
            return t.toggleClass("is-ssl", n)
        }

        function r(e) {
            var t = e.val(), n = g.isHttpFragment(t) || g.isValidHttpUrl(t);
            return e.closest("form").toggleClass("is-invalid-url", !n)
        }

        var a = h["default"](e);
        a.on("keyup", function () {
            return t(a)
        }), n.addThrottledInputEventListener(a[0], function () {
            r(a)
        }), t(a), r(a)
    }), h["default"](document).on("click", ".js-hook-toggle-ssl-verification", function (e) {
        return e.preventDefault(), h["default"](".js-ssl-hook-fields").toggleClass("is-not-verifying-ssl"), h["default"](".js-ssl-hook-fields").hasClass("is-not-verifying-ssl") ? (h["default"](".js-hook-ssl-verification-field").val("1"), s.fire(document, "facebox:close")) : h["default"](".js-hook-ssl-verification-field").val("0")
    }), h["default"](document).on("change", ".js-hook-event-choice", function () {
        var e = "custom" === h["default"](this).val();
        return h["default"](".js-hook-events-field").toggleClass("is-custom", e), !0
    }), h["default"](document).on("submit", ".js-hook-form", function () {
        var e = h["default"](this), t = e.find(".js-hook-event-choice:checked").val();
        return "custom" === t && h["default"](".js-hook-wildcard-event").prop("checked", !1), "push" === t && c('[value="push"]'), "all" === t && c(".js-hook-wildcard-event"), !0
    }), h["default"](document).on("details:toggled", ".js-hook-secret", function () {
        var e = h["default"](this), t = e.find("input[type=password]");
        return e.hasClass("open") ? t.removeAttr("disabled").focus() : t.attr("disabled", "disabled")
    }), h["default"](document).on("details:toggled", ".js-hook-delivery-item", function () {
        var e = h["default"](this), t = this.querySelector(".js-hook-delivery-details");
        return p.get(e[0]) ? void 0 : m["default"]("low").then(function () {
            function n(e) {
                return h["default"](t).replaceWith(e), t.classList.remove("is-loading")
            }

            function a() {
                return t.classList.add("has-error"), t.classList.remove("is-loading")
            }

            return p.set(e[0], !0), t.classList.add("is-loading"), r.fetchText(t.getAttribute("data-url")).then(n, a)
        })
    }), h["default"](document).on("click", ".js-hook-delivery-details .js-tabnav-tab", function () {
        var e = h["default"](this), t = e.closest(".js-hook-delivery-details");
        t.find(".js-tabnav-tab").removeClass("selected");
        var n = t.find(".js-tabnav-tabcontent").removeClass("selected");
        return e.addClass("selected"), n.filter(function () {
            return this.getAttribute("data-tab-name") === e.attr("data-tab-target")
        }).addClass("selected")
    }), h["default"](document).on("click", ".js-hook-deliveries-pagination-button", function (e) {
        e.preventDefault();
        var t = this, n = h["default"](this).parent();
        return m["default"]("low").then(function () {
            return n.addClass("loading"), r.fetchText(t.getAttribute("href")).then(function (e) {
                return n.replaceWith(e)
            })
        })
    }), h["default"](document).on("click", ".js-redeliver-hook-delivery-init-button", function (e) {
        e.preventDefault();
        var t = this.getAttribute("href");
        return m["default"]("low").then(function () {
            return v["default"]({div: t})
        })
    }), h["default"](document).on("ajaxSuccess", ".js-redeliver-hook-form", function (e, t) {
        var n = this.getAttribute("data-delivery-guid"), r = h["default"](".js-hook-delivery-details").filter(function () {
            return this.getAttribute("data-delivery-guid") === n
        }), a = r.closest(".js-hook-delivery-item");
        s.fire(document, "facebox:close");
        var i = h["default"](t.responseText);
        return r.replaceWith(i), i.on("load", function () {
            return r = a.find(".js-hook-delivery-details"), a.find(".js-item-status").removeClass("success pending failure").addClass(r.attr("data-status-class")), a.find(".js-item-status-tooltip").attr("aria-label", r.attr("data-status-message"))
        })
    }), h["default"](document).on("ajaxError", ".js-redeliver-hook-form", function () {
        return h["default"](this).siblings(".js-redelivery-dialog").addClass("failed")
    }), h["default"](document).on("submit", ".js-test-hook-form", function (e) {
        e.preventDefault();
        var t = this;
        return m["default"]("low").then(function () {
            function e() {
                return t.dispatchEvent(new CustomEvent("ajaxComplete", {bubbles: !0}))
            }

            function n() {
                return i.classList.add("success")
            }

            function a(e) {
                i.classList.add("error");
                var t = i.querySelector(".js-test-hook-message-errors");
                return f["default"](t instanceof HTMLElement, "Missing `.js-test-hook-message-errors` element"), null != e.response ? e.response.json().then(function (e) {
                    return t.textContent = e.errors
                }) : t.textContent = "Network request failed"
            }

            var i = document.querySelector(".js-test-hook-message");
            return f["default"](i instanceof HTMLElement, "Missing `.js-test-hook-message` element"), i.classList.remove("error", "success"), r.fetch(t.action, {
                method: t.method,
                body: h["default"](t).serialize(),
                headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
            }).then(n, a).then(e, e)
        })
    }), h["default"](document).on("click", ".js-hook-enforcement-select .js-navigation-item", d)
}),define("github/legacy/pages/integrations", ["../../jquery", "../../observe", "../../query-selector"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a() {
        var e = document.getElementById("js-update-integration-permissions");
        null != e && e.removeAttribute("disabled")
    }

    var i = r(e);
    t.observe(".js-integration-permissions-selector", function () {
        i["default"]("[id^=integration_permission_]").on("change", function () {
            var e = this.getAttribute("data-permission"), t = this.getAttribute("data-resource"), r = n.querySelectorAll(document, '.js-integration-hook-event[data-resource="' + t + '"]', HTMLInputElement), o = n.querySelectorAll(document, ".js-integration-single-file-resource", HTMLInputElement), s = n.querySelectorAll(document, '.js-dropdown-container[data-resource="' + t + '"]', HTMLElement);
            a(), "none" !== e ? (i["default"](".js-integration-hook-event-permission-error[data-resource='" + t + "']").addClass("d-none"), i["default"](".js-integration-single-file-permission-error").addClass("d-none"), r.forEach(function (e) {
                return e.readOnly = !1
            }), o.forEach(function (e) {
                return e.readOnly = !1
            }), this.closest(".js-list-group-item").classList.remove("disabled"), s.forEach(function (e) {
                return e.classList.remove("d-none")
            })) : (s.forEach(function (e) {
                return e.classList.add("anim-fade-in")
            }), s.forEach(function (e) {
                return e.classList.add("d-none")
            }), this.closest(".js-list-group-item").classList.add("disabled"), r.forEach(function (e) {
                e.readOnly = !0, e.checked = !1
            }), "single_file" === t && o.forEach(function (e) {
                e.readOnly = !0, e.value = ""
            }))
        }), i["default"]("[name^=integration]").on("change", function () {
            a()
        }), i["default"](".js-integration-hook-event").on("click", function () {
            return this.readOnly === !0 ? (i["default"](this.closest(".js-send-events")).find(".js-integration-hook-event-permission-error").removeClass("d-none"), !1) : void 0
        }), i["default"](".js-integration-single-file-resource").on("click", function () {
            return this.readOnly === !0 ? (i["default"](this.closest(".js-single-file")).find(".js-integration-single-file-permission-error").removeClass("d-none"),
                !1) : void 0
        })
    })
}),define("github/legacy/pages/issues/filters", ["../../../form", "../../../jquery"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(t);
    r["default"](document).on("navigation:open", ".js-issues-custom-filter", function () {
        var t = this, n = r["default"](t), a = n.find(".js-new-item-name").text(), i = n.attr("data-name"), o = r["default"]("<input>", {
            type: "hidden",
            name: i,
            value: a
        });
        n.append(o), e.submit(t)
    })
}),define("github/legacy/pages/issues/label_editor", ["../../../throttled-input", "../../../jquery", "../../../setimmediate", "../../../focused"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e, t) {
        return e.closest(".js-label-editor").find(".js-color-editor-bg").css("background-color", t), e.css("color", s(t, -.5)), e.css("border-color", t)
    }

    function o(e) {
        var t = "#c00", n = l["default"](e).closest(".js-color-editor");
        return n.find(".js-color-editor-bg").css("background-color", t), e.css("color", "#c00"), e.css("border-color", t)
    }

    function s(e, t) {
        var n = void 0;
        e = String(e).toLowerCase().replace(/[^0-9a-f]/g, ""), e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), t = t || 0;
        var r = "#";
        n = void 0;
        for (var a = 0; 3 > a;)n = parseInt(e.substr(2 * a, 2), 16), n = Math.round(Math.min(Math.max(0, n + n * t), 255)).toString(16), r += ("00" + n).substr(n.length), a++;
        return r
    }

    function u() {
        var e = l["default"](this), t = l["default"](this).closest(".js-label-editor");
        "#" !== e.val().charAt(0) && e.val("#" + e.val()), t.removeClass("is-valid is-not-valid");
        var n = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e.val());
        n ? (t.addClass("is-valid"), i(e, e.val())) : (t.addClass("is-not-valid"), o(e))
    }

    var l = a(t), c = a(n), d = a(r);
    d["default"](document, ".js-color-editor-input", {
        focusin: function () {
            e.addThrottledInputEventListener(this, u)
        }, focusout: function () {
            e.removeThrottledInputEventListener(this, u)
        }
    }), l["default"](document).on("mousedown", ".js-color-chooser-color", function () {
        l["default"](this).closest(".js-color-editor").removeClass("open");
        var e = l["default"](this).closest(".js-label-editor"), t = "#" + l["default"](this).attr("data-hex-color"), n = e.find(".js-color-editor-input");
        return e.removeClass("is-valid is-not-valid"), n.val(t), i(n, t)
    }), l["default"](document).on("submit", ".js-label-editor form", function () {
        var e = void 0, t = l["default"](this).find(".js-color-editor-input");
        return e = t.val(), e.length < 6 && (e = e[1] + e[1] + e[2] + e[2] + e[3] + e[3]), t.val(e.replace("#", ""))
    }), l["default"](document).on("focusin", ".js-label-editor", function () {
        return l["default"](this).closest(".js-label-editor").addClass("open")
    }), l["default"](document).on("reset", ".js-create-label", function () {
        var e = l["default"](this).find(".color-chooser span").removeAttr("data-selected"), t = e.eq(Math.floor(Math.random() * e.length)), n = "#" + t.attr("data-selected", "").attr("data-hex-color");
        return c["default"](function (e) {
            return function () {
                var t = l["default"](e).find(".js-color-editor-input");
                return t.attr("data-original-color", n).attr("value", n), i(t, t.val())
            }
        }(this))
    }), l["default"](document).on("reset", ".js-update-label", function () {
        return c["default"](function (e) {
            return function () {
                var t = l["default"](e).find(".js-color-editor-input");
                return i(t, t.attr("data-original-color"))
            }
        }(this))
    })
}),define("github/legacy/pages/issues/labels", ["invariant", "../../../inflector", "../../../number-helpers", "../../../jquery"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e, t) {
        return e.closest("div.js-details-container").classList.toggle("is-empty", t)
    }

    function o(e) {
        var r = document.querySelector(".js-labels-count");
        s["default"](r instanceof HTMLElement, "Missing `.js-labels-count` element");
        var a = n.parseFormattedNumber(r.textContent), i = a + e;
        r.textContent = n.formatNumber(i);
        var o = document.querySelector(".js-labels-label");
        return s["default"](o instanceof HTMLElement, "Missing `.js-labels-label` element"), t.pluralizeNode(i, o), i
    }

    var s = a(e), u = a(r);
    u["default"](document).on("click", ".js-edit-label", function () {
        u["default"](this).closest(".labels-list-item").addClass("edit")
    }), u["default"](document).on("click", ".js-edit-label-cancel", function () {
        this.form.reset(), u["default"](this).closest(".labels-list-item").removeClass("edit")
    }), u["default"](document).on("ajaxSuccess", ".js-create-label", function (e, t, n, r) {
        this.reset(), u["default"](this).nextAll(".table-list").prepend(r), o(1), i(this, !1)
    }), u["default"](document).on("ajaxSuccess", ".js-update-label", function (e, t, n, r) {
        u["default"](this).closest(".labels-list-item").replaceWith(r)
    }), u["default"](document).on("ajaxSend", ".js-update-label, .js-create-label", function () {
        u["default"](this).find(".error").text("")
    }), u["default"](document).on("ajaxError", ".js-update-label, .js-create-label", function (e, t) {
        return u["default"](this).find(".error").text(t.responseText), !1
    }), u["default"](document).on("ajaxSuccess", ".js-delete-label", function () {
        var e = o(-1);
        i(this, 0 === e), u["default"](this).closest(".labels-list-item").fadeOut()
    })
}),define("github/legacy/pages/issues/legacy", ["../../../hash-change"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](function (e) {
        var t = e.newURL, n = t.match(/\/issues#issue\/(\d+)$/);
        if (n) {
            var r = n[1];
            return window.location = t.replace(/\/?#issue\/.+/, "/" + r)
        }
    }), n["default"](function (e) {
        var t = void 0, n = void 0, r = e.newURL, a = r.match(/\/issues#issue\/(\d+)\/comment\/(\d+)$/);
        return a ? (n = a[1], t = a[2], window.location = r.replace(/\/?#issue\/.+/, "/" + n + "#issuecomment-" + t)) : void 0
    })
}),define("github/legacy/pages/issues/list", ["../../../form", "../../../observe", "../../../jquery", "invariant", "delegated-events"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(t) {
        var n = t.querySelector(".js-issues-list-check");
        n && e.changeValue(n, !n.checked)
    }

    var s = i(n), u = i(r);
    t.observe(".js-issues-list-check:checked", {
        add: function (e) {
            e.closest(".js-issue-row").classList.add("selected")
        }, remove: function (e) {
            e.closest(".js-issue-row").classList.remove("selected")
        }
    }), a.on("navigation:keydown", ".js-issue-row", function (e) {
        u["default"](e instanceof CustomEvent), "x" === e.detail.hotkey && (o(this), e.preventDefault(), e.stopPropagation())
    }), s["default"]("#js-issues-search").focus(function () {
        return this.value = this.value
    })
}),define("github/text", ["exports"], function (e) {
    function t(e) {
        return e.dispatchEvent(new CustomEvent("change", {bubbles: !0, cancelable: !1}))
    }

    function n(e, n, r) {
        var a = e.value.substring(0, e.selectionEnd), i = e.value.substring(e.selectionEnd);
        a = a.replace(n, r), i = i.replace(n, r), e.value = a + i, e.selectionStart = a.length, e.selectionEnd = a.length, t(e)
    }

    function r(e, n) {
        var r = e.selectionEnd, a = e.value.substring(0, r), i = e.value.substring(r), o = "" === e.value || a.match(/\n$/) ? "" : "\n";
        e.value = a + o + n + i, e.selectionStart = r + n.length, e.selectionEnd = r + n.length, t(e)
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.replaceText = n, e.insertText = r
}),define("github/legacy/pages/issues/replies", ["invariant", "delegated-events", "../../../text"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var a = r(e);
    t.on("selectmenu:selected", ".js-saved-reply-container", function (e) {
        var t = e.target.querySelector(".js-saved-reply-body");
        a["default"](t instanceof HTMLElement);
        var r = t.textContent.trim(), i = this.closest(".js-previewable-comment-form"), o = i.querySelector(".js-comment-field");
        n.insertText(o, r);
        var s = i.querySelector(".js-saved-reply-id");
        s.value = t.getAttribute("data-saved-reply-id")
    })
}),define("github/legacy/pages/issues/sidebar", ["../../../form", "../../../jquery", "../../../typecast", "../../../fetch", "invariant", "delegated-events"], function (e, t, n, r, a, i) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s(e, t) {
        e.replaceWith.apply(e, d["default"].parseHTML(t))
    }

    function u(e, t) {
        var n = l(e);
        t && n.push(t);
        var a = e.getAttribute("data-authenticity-token");
        null == a && (a = e.closest("form").elements.authenticity_token.value), n.push({
            name: "authenticity_token",
            value: a
        }), r.fetchText(e.getAttribute("data-url"), {
            method: "post",
            body: d["default"].param(n),
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
        }).then(function (t) {
            s(e.closest(".js-discussion-sidebar-item"), t)
        })
    }

    function l(e) {
        var t = void 0, n = void 0, r = e.closest("form"), a = d["default"](r).serializeArray(), i = [];
        for (t = 0, n = a.length; n > t; t++) {
            var o = a[t];
            d["default"].contains(e, c(r, o)) && i.push(o)
        }
        return i
    }

    function c(e, t) {
        var n = void 0, r = void 0, a = e.elements;
        for (n = 0, r = a.length; r > n; n++) {
            var i = a[n];
            if (i.name === t.name && i.value === t.value)return i
        }
    }

    var d = o(t), f = o(n), h = o(a);
    i.on("selectmenu:selected", ".js-issue-sidebar-form", function (t) {
        function n() {
            "FORM" === r.tagName ? e.submit(r) : u(r)
        }

        var r = this, a = t.target, i = a.closest(".js-select-menu");
        h["default"](i instanceof HTMLElement);
        var o = i.hasAttribute("data-multiple");
        if (a.hasAttribute("data-clear-assignees")) {
            var s = a.closest(".js-menu-content");
            h["default"](s instanceof HTMLElement);
            var l = s.querySelectorAll('input[name="issue[user_assignee_ids][]"]:checked'), c = !0, f = !1, m = void 0;
            try {
                for (var v, p = l[Symbol.iterator](); !(c = (v = p.next()).done); c = !0) {
                    var g = v.value;
                    h["default"](g instanceof HTMLInputElement), g.disabled = !1, g.checked = !1
                }
            } catch (y) {
                f = !0, m = y
            } finally {
                try {
                    !c && p["return"] && p["return"]()
                } finally {
                    if (f)throw m
                }
            }
            n()
        } else if (o) {
            var b = i.getAttribute("data-max-options");
            if (b) {
                var j = Number(b), w = i.querySelectorAll('input[type="checkbox"]:checked').length, L = w > j;
                h["default"](i instanceof HTMLElement);
                var S = i.querySelector(".js-max-warning");
                h["default"](S instanceof HTMLElement), S.classList.toggle("d-none", !L)
            }
            d["default"](r).off(".deferredSubmit"), d["default"](r).one("menu:deactivate.deferredSubmit", n)
        } else n()
    }), d["default"](document).on("ajaxSuccess", ".js-discussion-sidebar-item", function (e, t, n, r) {
        var a = e.target.classList;
        a.contains("js-issue-sidebar-form") && s(this, r)
    }), i.on("click", "div.js-issue-sidebar-form .js-suggested-reviewer", function (e) {
        var t = this.closest(".js-issue-sidebar-form");
        u(t, {name: this.name, value: this.value}), e.preventDefault()
    }), i.on("click", "div.js-issue-sidebar-form .js-issue-assign-self", function (e) {
        var t = this.closest(".js-issue-sidebar-form");
        u(t, {name: this.name, value: this.value}), e.preventDefault()
    }), i.on("change", ".js-project-menu-checkbox", function () {
        var e = f["default"](this, HTMLInputElement), t = f["default"](this.closest(".js-project-menu-container"), HTMLElement), n = !0, r = !1, a = void 0;
        try {
            for (var i, o = t.querySelectorAll(".js-project-menu-checkbox")[Symbol.iterator](); !(n = (i = o.next()).done); n = !0) {
                var s = i.value;
                if (s = f["default"](s, HTMLInputElement), s !== e && s.name === e.name) {
                    s.checked = e.checked;
                    var u = f["default"](s.closest(".select-menu-item"), HTMLElement);
                    u.classList.toggle("selected", s.checked)
                }
            }
        } catch (l) {
            r = !0, a = l
        } finally {
            try {
                !n && o["return"] && o["return"]()
            } finally {
                if (r)throw a
            }
        }
    })
}),define("github/legacy/pages/issues/triage", ["../../../fetch", "../../../select-menu/loading", "../../../jquery", "../../../menu", "../../../setimmediate", "../../../query-selector"], function (e, t, n, r, a, i) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var s = o(n), u = o(a);
    s["default"](document).on("change", ".js-issues-list-check", function () {
        s["default"]("#js-issues-toolbar").toggleClass("triage-mode", s["default"](".js-issues-list-check:checked").length > 0)
    }), s["default"](document).on("change", ".js-issues-list-check", function () {
        var e = i.querySelectorAll(document, ".js-issues-list-check:checked", HTMLInputElement), n = Array.from(e).map(function (e) {
            return [e.name, e.value]
        }), r = document.querySelectorAll("#js-issues-toolbar .js-issues-toolbar-triage .js-select-menu"), a = !0, o = !1, s = void 0;
        try {
            for (var u, l = r[Symbol.iterator](); !(a = (u = l.next()).done); a = !0) {
                var c = u.value;
                t.setLoadingData(c, n), c.classList.add("js-load-contents")
            }
        } catch (d) {
            o = !0, s = d
        } finally {
            try {
                !a && l["return"] && l["return"]()
            } finally {
                if (o)throw s
            }
        }
    }), s["default"](document).on("selectmenu:selected", ".js-issues-toolbar-triage .js-navigation-item", function () {
        var e = void 0, t = this.closest(".js-menu-container").hasAttribute("data-submits-hash"), n = s["default"](this).closest("form"), a = s["default"](this).hasClass("selected"), i = s["default"](this).attr("data-name"), o = s["default"](this).attr("data-value");
        e = t ? s["default"]("<input>", {
            type: "hidden",
            name: i + "[" + o + "]",
            value: a ? "1" : "0"
        }) : s["default"]("<input>", {type: "hidden", name: i, value: a ? o : ""}), u["default"](function (e) {
            return function () {
                r.deactivate(e.closest(".js-menu-container"))
            }
        }(this)), n.find(".js-issues-triage-fields").append(e), n.addClass("will-submit")
    }), s["default"](document).on("menu:deactivate", ".js-issues-toolbar-triage .js-menu-container", function (t) {
        var n = void 0;
        if (n = this.querySelector("form.will-submit")) {
            this.classList.add("is-loading");
            var a = e.fetchJSON(n.getAttribute("action"), {
                method: n.getAttribute("method"),
                body: s["default"].param(s["default"](n).serializeArray()),
                headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
            });
            a.then(function (t) {
                return function (n) {
                    function a() {
                        return r.deactivate(t.closest(".js-menu-container")), location.reload()
                    }

                    function i() {
                        return t.classList.add("has-error")
                    }

                    var o = e.fetchPoll(n.job.url, {headers: {accept: "application/json"}});
                    return o.then(a, i)
                }
            }(this)), n.classList.remove("will-submit"), t.preventDefault()
        }
    })
}),define("github/date-input", ["exports", "./jquery"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e, t) {
        "object" != typeof t && (t = {}), a["default"].extend(this, r.DEFAULT_OPTS, t), this.input = a["default"](e), this.bindMethodsToObj("show", "hide", "hideIfClickOutside", "keydownHandler", "selectDate"), this.build(), this.selectDate(), this.show(), this.input.hide(), this.input.data("datePicker", this)
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = r;
    var a = n(t);
    r.DEFAULT_OPTS = {
        month_names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        short_month_names: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        short_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        start_of_week: 1
    }, r.prototype = {
        build: function () {
            var e = a["default"]('<p class="month-nav"><span class="date-button prev" title="[Page-Up]">\u25c0</span> <span class="month-name"></span> <span class="date-button next" title="[Page-Down]">\u25b6</span></p>');
            this.monthNameSpan = a["default"](".month-name", e), a["default"](".prev", e).click(this.bindToObj(function () {
                this.moveMonthBy(-1)
            })), a["default"](".next", e).click(this.bindToObj(function () {
                this.moveMonthBy(1)
            }));
            var t = a["default"]('<p class="year-nav"><span class="date-button prev" title="[Ctrl+Page-Up]">\u25c0</span> <span class="year-name"></span> <span class="date-button next" title="[Ctrl+Page-Down]">\u25b6</span></p>');
            this.yearNameSpan = a["default"](".year-name", t), a["default"](".prev", t).click(this.bindToObj(function () {
                this.moveMonthBy(-12)
            })), a["default"](".next", t).click(this.bindToObj(function () {
                this.moveMonthBy(12)
            }));
            var n = a["default"]("<div></div>").append(e, t), r = "<table><thead><tr>";
            a["default"](this.adjustDays(this.short_day_names)).each(function () {
                r += "<th>" + this + "</th>"
            }), r += "</tr></thead><tbody></tbody></table>", this.dateSelector = this.rootLayers = a["default"]('<div class="date-selector"></div>').append(n, r).insertAfter(this.input), this.tbody = a["default"]("tbody", this.dateSelector), this.input.change(this.bindToObj(function () {
                this.selectDate()
            })), this.selectDate()
        }, selectMonth: function (e) {
            var t = new Date(e.getFullYear(), e.getMonth(), 1);
            if (!this.currentMonth || this.currentMonth.getFullYear() != t.getFullYear() || this.currentMonth.getMonth() != t.getMonth()) {
                this.currentMonth = t;
                for (var n = this.rangeStart(e), r = this.rangeEnd(e), i = this.daysBetween(n, r), o = "", s = 0; i >= s; s++) {
                    var u = new Date(n.getFullYear(), n.getMonth(), n.getDate() + s, 12, 0);
                    this.isFirstDayOfWeek(u) && (o += "<tr>"), o += u.getMonth() == e.getMonth() ? '<td class="selectable-day" date="' + this.dateToString(u) + '">' + u.getDate() + "</td>" : '<td class="unselected-month" date="' + this.dateToString(u) + '">' + u.getDate() + "</td>", this.isLastDayOfWeek(u) && (o += "</tr>")
                }
                this.tbody.empty().append(o), this.monthNameSpan.empty().append(this.monthName(e)), this.yearNameSpan.empty().append(this.currentMonth.getFullYear()), a["default"](".selectable-day", this.tbody).mousedown(this.bindToObj(function (e) {
                    this.changeInput(a["default"](e.target).attr("date"))
                })), a["default"]("td[date='" + this.dateToString(new Date) + "']", this.tbody).addClass("today"), a["default"]("td.selectable-day", this.tbody).mouseover(function () {
                    a["default"](this).addClass("hover")
                }), a["default"]("td.selectable-day", this.tbody).mouseout(function () {
                    a["default"](this).removeClass("hover")
                })
            }
            a["default"](".selected", this.tbody).removeClass("selected"), a["default"]('td[date="' + this.selectedDateString + '"]', this.tbody).addClass("selected")
        }, selectDate: function (e) {
            "undefined" == typeof e && (e = this.stringToDate(this.input.val())), e || (e = new Date), this.selectedDate = e, this.selectedDateString = this.dateToString(this.selectedDate), this.selectMonth(this.selectedDate)
        }, resetDate: function () {
            a["default"](".selected", this.tbody).removeClass("selected"), this.changeInput("")
        }, changeInput: function (e) {
            this.input.val(e).change(), this.hide()
        }, show: function () {
            this.rootLayers.css("display", "block"), a["default"]([window, document.body]).click(this.hideIfClickOutside), this.input.unbind("focus", this.show), this.rootLayers.keydown(this.keydownHandler), this.setPosition()
        }, hide: function () {
        }, hideIfClickOutside: function (e) {
            e.target == this.input[0] || this.insideSelector(e) || this.hide()
        }, insideSelector: function (e) {
            var t = a["default"](e.target);
            if (t.parents(".date-selector").length || t.is(".date-selector"))return !0;
            var n = this.dateSelector.position();
            return n.right = n.left + this.dateSelector.outerWidth(), n.bottom = n.top + this.dateSelector.outerHeight(), e.pageY < n.bottom && e.pageY > n.top && e.pageX < n.right && e.pageX > n.left
        }, keydownHandler: function (e) {
            switch (e.keyCode) {
                case 9:
                case 27:
                    return void this.hide();
                case 13:
                    this.changeInput(this.selectedDateString);
                    break;
                case 33:
                    this.moveDateMonthBy(e.ctrlKey ? -12 : -1);
                    break;
                case 34:
                    this.moveDateMonthBy(e.ctrlKey ? 12 : 1);
                    break;
                case 38:
                    this.moveDateBy(-7);
                    break;
                case 40:
                    this.moveDateBy(7);
                    break;
                case 37:
                    this.moveDateBy(-1);
                    break;
                case 39:
                    this.moveDateBy(1);
                    break;
                default:
                    return
            }
            e.preventDefault()
        }, stringToDate: function (e) {
            var t = e.match(/^(\d{1,2}) ([^\s]+) (\d{4,4})$/);
            return t ? new Date(t[3], this.shortMonthNum(t[2]), t[1], 12, 0) : null
        }, dateToString: function (e) {
            return e.getDate() + " " + this.short_month_names[e.getMonth()] + " " + e.getFullYear()
        }, setPosition: function () {
            var e = this.input.offset();
            this.rootLayers.css({
                top: e.top + this.input.outerHeight(),
                left: e.left
            }), this.ieframe && this.ieframe.css({
                width: this.dateSelector.outerWidth(),
                height: this.dateSelector.outerHeight()
            })
        }, moveDateBy: function (e) {
            var t = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate() + e);
            this.selectDate(t)
        }, moveDateMonthBy: function (e) {
            var t = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + e, this.selectedDate.getDate());
            t.getMonth() == this.selectedDate.getMonth() + e + 1 && t.setDate(0), this.selectDate(t)
        }, moveMonthBy: function (e) {
            var t = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + e, this.currentMonth.getDate());
            this.selectMonth(t)
        }, monthName: function (e) {
            return this.month_names[e.getMonth()]
        }, bindToObj: function (e) {
            var t = this;
            return function () {
                return e.apply(t, arguments)
            }
        }, bindMethodsToObj: function () {
            for (var e = 0; e < arguments.length; e++)this[arguments[e]] = this.bindToObj(this[arguments[e]])
        }, indexFor: function (e, t) {
            for (var n = 0; n < e.length; n++)if (t == e[n])return n
        }, monthNum: function (e) {
            return this.indexFor(this.month_names, e)
        }, shortMonthNum: function (e) {
            return this.indexFor(this.short_month_names, e)
        }, shortDayNum: function (e) {
            return this.indexFor(this.short_day_names, e)
        }, daysBetween: function (e, t) {
            return e = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), t = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()), (t - e) / 864e5
        }, changeDayTo: function (e, t, n) {
            var r = n * (Math.abs(t.getDay() - e - 7 * n) % 7);
            return new Date(t.getFullYear(), t.getMonth(), t.getDate() + r)
        }, rangeStart: function (e) {
            return this.changeDayTo(this.start_of_week, new Date(e.getFullYear(), e.getMonth()), -1)
        }, rangeEnd: function (e) {
            return this.changeDayTo((this.start_of_week - 1) % 7, new Date(e.getFullYear(), e.getMonth() + 1, 0), 1)
        }, isFirstDayOfWeek: function (e) {
            return e.getDay() == this.start_of_week
        }, isLastDayOfWeek: function (e) {
            return e.getDay() == (this.start_of_week - 1) % 7
        }, adjustDays: function (e) {
            for (var t = [], n = 0; n < e.length; n++)t[n] = e[(n + this.start_of_week) % 7];
            return t
        }
    }
}),define("github/legacy/pages/milestones", ["../../has-interactions", "../../observe", "../../jquery", "../../date-input"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var i = a(n), o = a(r);
    t.observe("input.js-date-input", function (e) {
        i["default"](e).next(".date-selector").remove(), new o["default"](e)
    }), i["default"](document).on("click", ".js-date-input-clear", function () {
        return i["default"]("input.js-date-input").data("datePicker").resetDate(), !1
    }), i["default"](document).on("change click", ".js-milestone-edit-form", function () {
        var t = this.querySelector(".js-milestone-edit-cancel");
        e.hasDirtyFields(this) ? t.setAttribute("data-confirm", t.getAttribute("data-confirm-changes")) : t.removeAttribute("data-confirm")
    })
}),define("github/legacy/pages/notifications", ["invariant", "../../form", "../../jquery", "delegated-events"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        return e.classList.contains("read") ? void 0 : (e.classList.toggle("unread"), e.classList.toggle("read"))
    }

    var o = a(e), s = a(n);
    s["default"](document).on("click", ".js-notification-target", function (e) {
        e.which > 1 || i(this.closest(".js-notification"))
    }), s["default"](document).on("ajaxSuccess", ".js-delete-notification", function () {
        i(this.closest(".js-notification"))
    }), s["default"](document).on("ajaxSuccess", ".js-mute-notification", function () {
        i(this.closest(".js-notification"));
        var e = this.closest(".js-notification");
        e.classList.toggle("muted")
    }), s["default"](document).on("ajaxSuccess", ".js-unmute-notification", function () {
        var e = this.closest(".js-notification");
        e.classList.toggle("muted")
    }), s["default"](document).on("ajaxSuccess", ".js-mark-visible-as-read", function () {
        var e = void 0, t = void 0, n = void 0, r = void 0, a = this.closest(".js-notifications-browser"), i = a.querySelectorAll(".unread");
        for (e = 0, t = i.length; t > e; e++) {
            var o = i[e];
            o.classList.remove("unread"), o.classList.add("read")
        }
        return null != (n = a.querySelector(".js-mark-visible-as-read")) && n.classList.add("mark-all-as-read-confirmed"), null != (r = a.querySelector(".js-mark-as-read-confirmation")) ? r.classList.add("mark-all-as-read-confirmed") : void 0
    }), s["default"](document).on("ajaxSuccess", ".js-mark-remaining-as-read", function () {
        var e = void 0, t = void 0, n = this.closest(".js-notifications-browser");
        return null != (e = n.querySelector(".js-mark-remaining-as-read")) && e.classList.add("d-none"), null != (t = n.querySelector(".js-mark-remaining-as-read-confirmation")) ? t.classList.remove("d-none") : void 0
    }), r.on("navigation:keydown", ".js-notification", function (e) {
        switch (o["default"](e instanceof CustomEvent), e.detail.hotkey) {
            case"I":
            case"e":
            case"y":
                t.submit(this.querySelector(".js-delete-notification")), e.preventDefault(), e.stopPropagation();
                break;
            case"M":
            case"m":
                t.submit(this.querySelector(".js-mute-notification")), e.preventDefault(), e.stopPropagation()
        }
    }), s["default"](document).on("navigation:keyopen", ".js-notification", function () {
        i(this)
    }), s["default"](document).on("ajaxSend", ".js-notifications-subscription", function () {
        this.querySelector(".js-spinner").classList.remove("d-none")
    }), s["default"](document).on("ajaxComplete", ".js-notifications-subscription", function () {
        this.querySelector(".js-spinner").classList.add("d-none")
    })
}),define("github/legacy/pages/notifications/subscriptions", ["../../../typecast", "../../../updatable-content", "../../../jquery"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a() {
        o["default"](".js-setting-toggle .js-status-indicator").removeClass("status-indicator-success").removeClass("status-indicator-loading").removeClass("status-indicator-failed")
    }

    var i = r(e), o = r(n);
    o["default"](document).on("ajaxSend", ".js-setting-toggle", function () {
        a(), o["default"](this).find(".js-status-indicator").addClass("status-indicator-loading")
    }), o["default"](document).on("ajaxError", ".js-setting-toggle", function () {
        a(), o["default"](this).find(".js-status-indicator").addClass("status-indicator-failed")
    }), o["default"](document).on("ajaxSuccess", ".js-setting-toggle", function () {
        a(), o["default"](this).find(".js-status-indicator").addClass("status-indicator-success")
    }), o["default"](document).on("change", ".js-participating-email input, .js-subscribed-email input", function () {
        o["default"](".js-participating-email input:checked")[0] || o["default"](".js-subscribed-email input:checked")[0] ? o["default"](".js-notification-emails").removeClass("d-none") : o["default"](".js-notification-emails").addClass("d-none")
    }), o["default"](document).on("ajaxSend", ".js-unignore-form, .js-ignore-form", function () {
        o["default"](this).closest(".js-subscription-row").addClass("loading")
    }), o["default"](document).on("ajaxError", ".js-unignore-form, .js-ignore-form", function () {
        o["default"](this).closest(".js-subscription-row").removeClass("loading"), o["default"](this).find(".btn-sm").addClass("btn-danger").attr("title", "There was a problem unignoring this repo.")
    }), o["default"](document).on("ajaxSuccess", ".js-unignore-form", function () {
        o["default"](this).closest(".js-subscription-row").removeClass("loading").addClass("unsubscribed")
    }), o["default"](document).on("ajaxSuccess", ".js-ignore-form", function () {
        o["default"](this).closest(".js-subscription-row").removeClass("loading unsubscribed")
    }), o["default"](document).on("ajaxSend", ".js-unsubscribe-form, .js-subscribe-form", function () {
        o["default"](this).closest(".js-subscription-row").addClass("loading")
    }), o["default"](document).on("ajaxError", ".js-unsubscribe-form, .js-subscribe-form", function () {
        o["default"](this).closest(".js-subscription-row").removeClass("loading"), o["default"](this).find(".btn-sm").addClass("btn-danger").attr("title", "There was a problem with unsubscribing :(")
    }), o["default"](document).on("ajaxSuccess", ".js-unsubscribe-form", function () {
        o["default"](this).closest(".js-subscription-row").removeClass("loading").addClass("unsubscribed")
    }), o["default"](document).on("ajaxSuccess", ".js-subscribe-form", function () {
        o["default"](this).closest(".js-subscription-row").removeClass("loading unsubscribed")
    }), o["default"](document).on("ajaxSuccess", ".js-thread-subscription-status", function (e, n, r, a) {
        t.replaceContent(i["default"](document.querySelector(".js-thread-subscription-status"), HTMLElement), a)
    })
}),define("github/legacy/pages/oauth", ["../../typecast", "../../jquery", "delegated-events", "../../observe"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        return e.querySelectorAll(".js-integrations-install-repo-picked .js-repository-picker-result").length
    }

    function o(e) {
        return i(e) > 0
    }

    function s(e) {
        var t = +e.getAttribute("data-max-repos");
        return t ? i(e) >= t : void 0
    }

    function u(e) {
        var t = e.querySelector(".js-all-repositories-radio");
        return t.checked || o(e)
    }

    function l() {
        var e = 0;
        0 !== document.querySelectorAll(".js-integrations-install-repo-picked:not(.d-none)").length && (e = document.querySelectorAll(".js-repository-picker-result:not(.d-none)").length);
        var t = "";
        if (e > 0) {
            var n = e > 1 ? "repositories" : "repository";
            t = "Selected " + e + " " + n
        }
        return d["default"](".js-integration-total-repos").text(t)
    }

    var c = a(e), d = a(t);
    d["default"](document).on("ajaxSend", ".js-toggler-container .js-set-approval-state", function () {
        return this.closest(".js-toggler-container").classList.add("loading")
    }), d["default"](document).on("ajaxComplete", ".js-toggler-container .js-set-approval-state", function () {
        return this.closest(".js-toggler-container").classList.remove("loading")
    }), d["default"](document).on("ajaxSuccess", ".js-toggler-container .js-set-approval-state", function (e, t, n, r) {
        if (1 === r.approval_state) this.closest(".js-toggler-container").classList.add("on"); else if (2 === r.approval_state) {
            var a = this.closest(".js-toggler-container");
            a.classList.add("revoked"), a.classList.remove("on")
        }
    }), d["default"](document).on("ajaxSuccess", ".js-request-approval-facebox-form", function () {
        var e = this.getAttribute("data-container-id");
        return c["default"](document.getElementById(e), HTMLElement).classList.add("on"), n.fire(document, "facebox:close")
    }), r.observe(".js-integrations-install-form", function (e) {
        function t() {
            return n.disabled = !u(this), null !== e.querySelector(".flash") ? (i.disabled = s(this), e.querySelector(".flash").classList.toggle("d-none", !s(this))) : void 0
        }

        var n = e.querySelector(".js-integrations-install-form-submit"), r = e.querySelector(".js-autocomplete"), a = r.getAttribute("data-search-url"), i = e.querySelector(".js-autocomplete-field");
        e.addEventListener("change", t), t.call(e), d["default"](document).on("click", ".js-repository-picker-remove", function () {
            var n = this.closest(".js-repository-picker-result");
            return n.remove(), 0 === c["default"](document.querySelector(".js-integrations-install-repo-picked"), HTMLElement).children.length && c["default"](document.querySelector(".js-min-repository-error"), HTMLElement).classList.remove("d-none"), l(), t.call(e)
        }), d["default"](document).on("focus", ".js-integrations-install-repo-picker .js-autocomplete-field", function () {
            return c["default"](document.querySelector(".js-select-repositories-radio"), HTMLInputElement).checked = !0, t.call(e)
        }), d["default"](document).on("autocomplete:autocompleted:changed", ".js-integrations-install-repo-picker", function () {
            var e = void 0, t = void 0, n = a, i = document.querySelectorAll(".js-integrations-install-repo-picked .js-selected-repository-field");
            for (e = 0, t = i.length; t > e; e++) {
                var o = c["default"](i[e], HTMLInputElement);
                n += ~n.indexOf("?") ? "&" : "?", n += o.name + "=" + encodeURIComponent(o.value)
            }
            return r.setAttribute("data-search-url", n)
        }), d["default"](document).on("autocomplete:result", ".js-integrations-install-repo-picker", function (n, r) {
            var a = this.querySelector("#repo-result-" + r), o = e.querySelector(".js-integrations-install-repo-picked");
            return a.classList.remove("d-none"), o.insertBefore(a, o.firstChild), i.value = "", e.querySelector(".js-autocomplete-results").innerHTML = "", c["default"](document.querySelector(".js-min-repository-error"), HTMLElement).classList.add("d-none"), l(), t.call(e)
        }), d["default"](document).on("click", ".js-all-repositories-radio", function () {
            c["default"](document.querySelector(".js-integrations-install-repo-picked, .js-min-repository-error"), HTMLElement).classList.add("d-none"), l()
        }), d["default"](document).on("click", ".js-select-repositories-radio", function () {
            c["default"](document.querySelector(".js-integrations-install-repo-picked"), HTMLElement).classList.remove("d-none"), l()
        }), d["default"](document).on("submit", ".js-integrations-install-form", function () {
            this.querySelector(".js-all-repositories-radio").checked ? Array.from(this.querySelectorAll('input[name="repository_ids[]"]')).forEach(function (e) {
                return e.remove()
            }) : d["default"](".js-autocomplete-results").empty()
        })
    })
}),define("github/legacy/pages/orgs", ["delegated-events"], function (e) {
    e.on("submit", ".org form[data-results-container]", function (e) {
        e.preventDefault()
    })
}),define("github/legacy/pages/orgs/invitations/new", ["../../../../jquery", "../../../../visible", "../../../../fetch"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a() {
        return i["default"](Array.from(i["default"](".js-invitation-toggle-team:checked")).filter(o["default"]))
    }

    var i = r(e), o = r(t);
    i["default"](document).on("click", ".js-invitations-team-suggestions-view-all", function () {
        return n.fetchText(this.href).then(function (e) {
            return function (t) {
                var n = a().map(function () {
                    return this.value
                }), r = i["default"](e).closest("ul");
                return r.html(t), n.each(function () {
                    return r.find(".js-invitation-toggle-team[value=" + this + "]").prop("checked", !0)
                })
            }
        }(this)), !1
    })
}),define("github/legacy/pages/orgs/invitations/reinstate", ["invariant", "delegated-events", "../../../../observe"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a() {
        var e = document.querySelector(".js-org-reinstate-forms"), t = document.querySelectorAll(".js-org-reinstate-option:checked");
        if (e && 1 === t.length) {
            var n = t[0].getAttribute("data-form");
            i["default"](null != n, "Missing attribute `data-form`");
            var r = e.getElementsByClassName("js-togglable-form"), a = !0, o = !1, s = void 0;
            try {
                for (var u, l = r[Symbol.iterator](); !(a = (u = l.next()).done); a = !0) {
                    var c = u.value;
                    c.classList.add("d-none")
                }
            } catch (d) {
                o = !0, s = d
            } finally {
                try {
                    !a && l["return"] && l["return"]()
                } finally {
                    if (o)throw s
                }
            }
            var f = document.getElementById(n);
            i["default"](f, "Couldn't find selected form: " + n), f.classList.remove("d-none")
        }
    }

    var i = r(e);
    t.on("change", ".js-org-reinstate-option", a), n.observe(".js-org-reinstate-forms", a)
}),define("github/legacy/pages/orgs/members/change-role", ["invariant", "delegated-events"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e);
    t.on("change", ".js-change-org-role-selector", function (e) {
        var t = e.target;
        if (r["default"](t instanceof HTMLInputElement), t.form) {
            var n = t.form.querySelector(".js-change-org-role-submit");
            n instanceof HTMLButtonElement && (n.disabled = !1)
        }
    })
}),define("github/legacy/pages/orgs/members/index", ["invariant", "../../../../fetch", "delegated-events", "../../../../form", "../../../../onfocus", "../../../../throttled-input", "../../../../jquery", "../../../../typecast", "../../../../sudo", "../../../../setimmediate", "../../../../facebox", "../../../../document-ready"], function (e, t, n, r, a, i, o, s, u, l, c, d) {
    function f(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function h() {
        var e = Array.from(document.querySelectorAll(".js-bulk-actions-container .js-bulk-actions-toggle:checked"));
        return e.map(function (e) {
            return e.closest(".js-bulk-actions-item").getAttribute("data-bulk-actions-id")
        }).sort()
    }

    function m(e) {
        var n = this, a = e.target;
        v["default"](a instanceof HTMLElement);
        var i = e.currentTarget;
        v["default"](i instanceof HTMLElement);
        var o = a.getAttribute("data-member-name") || a.value;
        if (o) {
            var s = i.getAttribute("data-action-type");
            if (s) {
                var u = i.closest(".js-add-members-container");
                if (u) {
                    var l = parseInt(u.getAttribute("data-accessible-repositories-count"));
                    if (isNaN(l) || 1 > l) b["default"](function () {
                        return r.submit(n)
                    }); else {
                        e.preventDefault();
                        var c = new URL(u.getAttribute("data-url"), window.location.origin), d = new URLSearchParams(c.search.slice(1));
                        d.append("member", o), d.append("action_type", s), c.search = d.toString(), u.classList.add("loading"), t.fetchSafeDocumentFragment(document, c).then(function (e) {
                            u.classList.remove("loading"), u.innerHTML = null, u.appendChild(e)
                        })["catch"]()
                    }
                }
            }
        }
    }

    var v = f(e), p = f(o), g = f(s), y = f(u), b = f(l), j = f(c);
    n.on("click", ".js-member-remove-confirm-button", function (e) {
        e.preventDefault();
        var n = new URL(this.getAttribute("data-url"), window.location.origin), r = new URLSearchParams(n.search.slice(1)), a = this.getAttribute("data-member-id");
        if (a) r.append("member_ids[]", a); else {
            var i = !0, o = !1, s = void 0;
            try {
                for (var u, l = h()[Symbol.iterator](); !(i = (u = l.next()).done); i = !0) {
                    var c = u.value;
                    r.append("member_ids[]", c)
                }
            } catch (d) {
                o = !0, s = d
            } finally {
                try {
                    !i && l["return"] && l["return"]()
                } finally {
                    if (o)throw s
                }
            }
        }
        n.search = r.toString(), j["default"](function () {
            t.fetchText(n).then(j["default"])
        })
    }), n.on("click", ".js-membership-tab", function () {
        var e = this.getAttribute("data-membership"), t = document.querySelector(".js-member-filter-field"), n = "membership";
        v["default"](t instanceof HTMLInputElement, "`.js-member-filter-field` must be an input");
        var r = t.value, a = new RegExp(n + ":[a-z]+"), o = r.toString().trim().replace(a, "");
        t.value = (o + " " + e).replace(/\s\s/, " "), t.focus(), i.dispatchThrottledInputEvent(t);
        var s = g["default"](document.querySelector(".js-membership-tabs"), HTMLElement);
        s.classList.remove("selected"), this.classList.add("selected")
    }), n.on("click", ".js-member-search-filter", function (e) {
        e.preventDefault();
        var t = this.getAttribute("data-filter"), n = this.closest(".js-select-menu").getAttribute("data-filter-on"), r = document.querySelector(".js-member-filter-field");
        v["default"](r instanceof HTMLInputElement, "`.js-member-filter-field` must be an input");
        var a = r.value, o = new RegExp(n + ":[a-z]+"), s = a.toString().trim().replace(o, "");
        r.value = (s + " " + t).replace(/\s\s/, " "), r.focus(), i.dispatchThrottledInputEvent(r)
    }), p["default"](document).on("ajaxSend ajaxComplete", ".js-add-team-member-or-repo-form", function (e) {
        this === e.target && this.classList.toggle("is-sending", "ajaxSend" === e.type)
    });
    for (var w = navigator.userAgent.match(/Macintosh/) ? "meta" : "ctrl", L = [".js-add-team-member-or-repo-form", ".js-add-team-member-form"], S = 0; S < L.length; S++) {
        var x = L[S];
        a.onHotkey("keydown", x + " .js-autocomplete-field", function (e, t) {
            ("enter" === t || t === w + "+enter") && e.preventDefault()
        })
    }
    p["default"](document).on("autocomplete:result", ".js-bulk-add-team-form .js-autocomplete-field", function (e) {
        var n = p["default"](this).data("autocompleted");
        if (n.indexOf("/") > 0) {
            var r = this.form.action, a = this.form.method, i = new FormData(this.form);
            y["default"]("low").then(function () {
                j["default"](function () {
                    t.fetchText(r, {method: a, body: i}).then(j["default"])
                })
            }), e.stopPropagation()
        }
    }), p["default"](document).on("autocomplete:result", ".js-add-team-member-or-repo-form", function () {
        var e = this;
        b["default"](function () {
            return r.submit(e)
        })
    });
    var k = "";
    d.ready.then(function () {
        var e = document.querySelector(".js-add-members-container");
        e && (k = e.innerHTML)
    }), n.on("click", ".js-approve-membership-request", m), p["default"](document).on("autocomplete:result", ".js-add-team-member-form", m), document.addEventListener("facebox:close", function () {
        var e = document.querySelector(".js-add-members-container");
        e && (e.innerHTML = k)
    }), p["default"](document).on("ajaxSuccess", ".js-add-team-member-or-repo-form", function (e, t) {
        var n = void 0, r = void 0, a = void 0, i = void 0;
        try {
            i = JSON.parse(t.responseText)
        } catch (o) {
        }
        n = i ? p["default"](i.list_item_html) : p["default"](t.responseText);
        var s = p["default"](".js-member-list");
        this.querySelector(".js-autocomplete-field").value = "";
        var u = n.attr("data-login");
        if (u) {
            var l = s.children();
            for (r = 0, a = l.length; a > r; r++) {
                var c = l[r];
                if (c.getAttribute("data-login") === u) {
                    p["default"](c).remove();
                    break
                }
            }
        }
        s.prepend(n);
        var d = !s.children().length;
        s.closest(".js-org-section").toggleClass("is-empty", d)
    }), p["default"](document).on("ajaxError", ".js-add-team-member-or-repo-form", function (e, t) {
        if (!/<html/.test(t.responseText)) {
            var n = p["default"](".js-member-list").siblings(".js-blankslate"), r = void 0;
            try {
                var a = JSON.parse(t.responseText);
                r = a.message_html
            } catch (i) {
                r = p["default"](t.responseText)
            }
            return p["default"](".flash-messages").remove(), n.before(r), !1
        }
    })
}),define("github/legacy/pages/orgs/members/show", ["../../../../fetch", "delegated-events", "../../../../facebox"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var a = r(n);
    t.on("click", ".js-remove-member-button", function (t) {
        t.preventDefault();
        var n = new URL(this.getAttribute("data-url"), window.location.origin), r = new URLSearchParams(n.search.slice(1));
        r.append("member_ids[]", this.getAttribute("data-user-id")), r.append("redirect_to_path", this.getAttribute("data-redirect-to-path")), n.search = r.toString(), a["default"](function () {
            e.fetchText(n).then(a["default"])
        })
    })
}),define("github/legacy/pages/orgs/migration/customize_member_privileges", ["../../../../typecast", "../../../../document-ready", "../../../../jquery", "../../../../debounce"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i() {
        var e = c["default"](document.querySelector(".js-save-member-privileges-button-container"), HTMLElement);
        return e.classList.toggle("member-privilege-radios-preserved", l())
    }

    function o() {
        return "" === c["default"](document.querySelector(".js-customize-member-privileges-default-repository-permission-radio:checked"), HTMLInputElement).value
    }

    function s() {
        return "0" === c["default"](document.querySelector(".js-customize-member-privileges-repository-creation-radio:checked"), HTMLInputElement).value
    }

    function u() {
        return "secret" === c["default"](document.querySelector(".js-customize-member-privileges-team-privacy-radio:checked"), HTMLInputElement).value
    }

    function l() {
        return o() && s() && u()
    }

    var c = a(e), d = a(n), f = a(r);
    d["default"](document).on("change", ".js-customize-member-privileges-default-repository-permission-radio", function () {
        var e = c["default"](document.querySelector(".js-migrate-ability-list-item-default-repository-permission"), HTMLElement);
        return e.classList.toggle("migrate-ability-not-possible", o()), i()
    }), d["default"](document).on("change", ".js-customize-member-privileges-repository-creation-radio", function () {
        var e = c["default"](document.querySelector(".js-migrate-ability-list-item-members-can-create-repositories"), HTMLElement);
        return e.classList.toggle("migrate-ability-not-possible", s()), i()
    }), d["default"](document).on("change", ".js-customize-member-privileges-team-privacy-radio", function () {
        var e = c["default"](document.querySelector(".js-migrate-ability-list-item-team-privacy"), HTMLElement);
        return e.classList.toggle("migrate-ability-not-possible", u()), i()
    }), t.ready.then(function () {
        var e = document.querySelector(".js-org-migration-settings-sidebar");
        if (null != e) {
            var t = e.getBoundingClientRect();
            if (null != t) {
                var n = 16, r = t.top + window.pageYOffset - n, a = e.style.position, o = e.style.top, s = e.style.left, u = e.style.width, l = f["default"](function () {
                    var i = e.parentNode;
                    if (null != i && i instanceof HTMLElement) {
                        var l = i.getBoundingClientRect(), c = l.right - t.width;
                        return window.pageYOffset >= r ? (e.style.position = "fixed", e.style.top = n + "px", e.style.left = c + "px", e.style.width = "250px") : (e.style.position = a, e.style.top = o, e.style.left = s, e.style.width = u)
                    }
                }, 5);
                window.addEventListener("scroll", l, {passive: !0}), window.addEventListener("resize", l, {passive: !0}), i()
            }
        }
    })
}),define("github/legacy/pages/orgs/migration/index", ["../../../../throttled-input", "../../../../typecast", "../../../../fetch", "../../../../observe"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e, t) {
        return o["default"](document.querySelector(".js-rename-owners-team-button"), HTMLElement).classList.toggle("disabled", !e), o["default"](document.querySelector(".js-rename-owners-team-errors"), HTMLElement).innerHTML = t, o["default"](document.querySelector(".js-rename-owners-team-note"), HTMLElement).classList.toggle("d-none", "" !== t)
    }

    var o = a(t);
    r.observe(".js-rename-owners-team-input", function (t) {
        e.addThrottledInputEventListener(t, function () {
            var e = this.form, t = this.value.trim().toLowerCase();
            if ("owners" === t || "" === t)return i(!1, "");
            e.classList.add("is-sending");
            var r = new URL(this.getAttribute("data-check-url"), window.location.origin), a = new URLSearchParams(r.search.slice(1));
            return a.append("name", t), r.search = a.toString(), n.fetchText(r).then(function (t) {
                t = t.trim();
                var n = "" === t;
                return e.classList.remove("is-sending"), i(n, t)
            })
        })
    })
}),define("github/legacy/pages/orgs/new", ["../../../typecast", "../../../form", "delegated-events", "../../../observe", "../../../onfocus", "../../../jquery"], function (e, t, n, r, a, i) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var s = o(e), u = o(i);
    a.onInput(".js-new-organization-name", function (e) {
        var t = e.target, n = s["default"](t.closest("dd"), HTMLElement), r = n.querySelector(".js-field-hint-name");
        r && ("innerText" in r ? r.innerText = t.value : r.textContent = t.value)
    }), a.onInput(".js-company-name-input", function (e) {
        var t = document.querySelector(".js-company-name-text");
        if (t) {
            var n = s["default"](document.querySelector(".js-tos-link"), HTMLElement), r = s["default"](document.querySelector(".js-corp-tos-link"), HTMLElement);
            n.classList.add("d-none"), n.setAttribute("aria-hidden", "true"), r.classList.remove("d-none"), r.setAttribute("aria-hidden", "false");
            var a = " on behalf of your company, " + e.target.value;
            "innerText" in t ? t.innerText = a : t.textContent = a
        }
    }), r.observe(".js-company-owned:not(:checked)", {
        add: function () {
            var e = s["default"](document.querySelector(".js-company-name-input"), HTMLInputElement), n = s["default"](document.querySelector(".js-company-name-text"), HTMLElement), r = s["default"](document.querySelector(".js-tos-link"), HTMLElement), a = s["default"](document.querySelector(".js-corp-tos-link"), HTMLElement);
            return e.removeAttribute("required"), t.changeValue(e, ""), r.classList.remove("d-none"), r.setAttribute("aria-hidden", "false"), a.classList.add("d-none"), a.setAttribute("aria-hidden", "true"), "innerText" in n ? n.innerText = "" : n.textContent = ""
        }
    }), r.observe(".js-company-owned:checked", {
        add: function () {
            var e = s["default"](document.querySelector(".js-company-name-input"), HTMLElement);
            e.setAttribute("required", "required"), n.fire(e, "change"), a.onInput(".js-company-name-input", function () {
                var e = s["default"](document.querySelector(".js-company-name-text"), HTMLElement), t = s["default"](document.querySelector(".js-tos-link"), HTMLElement), n = s["default"](document.querySelector(".js-corp-tos-link"), HTMLElement);
                return e ? function () {
                    return t.classList.add("d-none"), t.setAttribute("aria-hidden", "true"), n.classList.remove("d-none"), n.setAttribute("aria-hidden", "false"), "innerText" in e ? e.innerText = " on behalf of your company, " + this.value : e.textContent = " on behalf of your company, " + this.value
                } : void 0
            })
        }
    }), r.observe(".js-company-owned-autoselect", function (e) {
        function n() {
            if (r.checked && r.form) {
                var e = s["default"](r.form.querySelector(".js-company-owned"), HTMLInputElement);
                t.changeValue(e, !0)
            }
        }

        var r = s["default"](e, HTMLInputElement);
        r.addEventListener("change", n), n()
    }), u["default"](document).on("ajaxSend", ".js-org-list-item .js-org-remove-item", function () {
        return this.closest(".js-org-list-item").classList.add("d-none")
    }), u["default"](document).on("ajaxSuccess", ".js-org-list-item .js-org-remove-item", function () {
        return this.closest(".js-org-list-item").remove()
    }), u["default"](document).on("ajaxError", ".js-org-list-item .js-org-remove-item", function () {
        this.closest(".js-org-list-item").classList.remove("d-none");
        var e = this.getAttribute("data-error-message");
        return e ? alert(e) : void 0
    })
}),define("github/legacy/pages/orgs/per_seat", ["../../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function n(e) {
        var t = void 0, n = e.selectors;
        for (t in n) {
            var a = n[t];
            r["default"](t).text(a)
        }
        var i = 100 === e.filled_seats_percent;
        return r["default"](".js-live-update-seats-percent").css("width", e.filled_seats_percent + "%"), r["default"](".js-need-more-seats").toggleClass("d-none", !i), r["default"](".js-add-team-member-or-repo-form").toggleClass("d-none", i)
    }

    var r = t(e);
    r["default"](document).on("ajaxSuccess", ".js-per-seat-invite-field, .js-per-seat-invite .js-org-remove-item", function (e, t) {
        return n(JSON.parse(t.responseText))
    })
}),define("github/legacy/pages/orgs/repositories/index", ["../../../../observe", "../../../../hotkey"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(t);
    e.observe(".js-repository-fallback-search", function (e) {
        e.addEventListener("keypress", function (e) {
            if ("enter" === r["default"](e)) {
                var t = new URL(this.getAttribute("data-url"), window.location.origin), n = new URLSearchParams(t.search.slice(1)), a = n.get("q") || "";
                n.set("q", a + " " + this.value), t.search = n.toString(), window.location = t.toString()
            }
        })
    })
}),define("github/legacy/pages/orgs/repositories/permission-select", ["../../../../form", "../../../../jquery"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(t);
    r["default"](document).on("selectmenu:selected", ".js-select-repo-permission", function () {
        e.submit(this)
    }), r["default"](document).on("ajaxSend", ".js-select-repo-permission", function () {
        return this.classList.remove("was-successful")
    }), r["default"](document).on("ajaxSuccess", ".js-select-repo-permission", function (e, t, n, r) {
        var a = void 0;
        return this.classList.add("was-successful"), null != (a = this.closest(".js-org-repo")) ? a.classList.toggle("with-higher-access", r.members_with_higher_access) : void 0
    })
}),define("github/legacy/pages/orgs/security_settings/index", ["../../../../observe", "../../../../facebox"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(t);
    e.observe(".js-two-factor-needs-enforced", function (e) {
        e.addEventListener("submit", function (e) {
            var t = e.target, n = t.querySelector("input[type=checkbox]");
            n.checked && (e.preventDefault(), r["default"]({div: "#confirm-2fa-requirement"}))
        })
    }), e.observe(".js-two-factor-enforcement-poller", function (e) {
        var t = e.getAttribute("data-redirect-url");
        e.addEventListener("load", function () {
            window.location.href = t
        })
    })
}),define("github/legacy/pages/orgs/settings/change-default-repository-permission", ["invariant", "../../../../form", "../../../../jquery"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var a = r(e), i = r(n);
    i["default"](document).on("click", ".js-change-default-repository-permission-confirm", function (e) {
        e.preventDefault();
        var n = document.querySelector(".js-change-default-repository-permission-form");
        a["default"](n instanceof HTMLFormElement, "`.js-change-default-repository-permission-form` must be a form"), t.submit(n)
    })
}),define("github/remote-submit", ["exports"], function (e) {
    function t(e) {
        var t = e.querySelector("input.is-submit-button-value");
        return t instanceof HTMLInputElement ? t : null
    }

    function n(e) {
        var n = e.closest("form");
        if (n instanceof HTMLFormElement) {
            var r = t(n);
            if (e.name) {
                var a = e.matches("input[type=submit]") ? "Submit" : "", i = e.value || a;
                r || (r = document.createElement("input"), r.type = "hidden", r.classList.add("is-submit-button-value"), n.prepend(r)), r.name = e.name, r.value = i
            } else r && r.remove()
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.findPersistedSubmitButtonValue = t, e.persistSubmitButtonValue = n;
    e.submitSelectors = ["form button[type=submit][data-disable-with]", "form input[type=submit][data-disable-with]", "form[data-remote-submit] button:not([type])", "form[data-remote-submit] button[type=submit]", "form[data-remote-submit] input[type=submit]", "form[data-remote] button:not([type])", "form[data-remote] button[type=submit]", "form[data-remote] input[type=submit]"].join(", ")
}),define("github/warn-unsaved-changes", ["./has-interactions", "./observe"], function (e, t) {
    function n() {
        e.hasDirtyFields(this) ? r(this) : a()
    }

    function r(e) {
        var t = e.getAttribute("data-warn-unsaved-changes") || "Changes you made may not be saved.";
        window.onbeforeunload = function (e) {
            return e.returnValue = t, t
        }
    }

    function a() {
        window.onbeforeunload = null
    }

    t.observe("[data-warn-unsaved-changes]", function (e) {
        e.addEventListener("input", n), e.addEventListener("change", n), e.addEventListener("submit", a)
    })
}),define("github/legacy/pages/orgs/settings/security", ["delegated-events", "../../../../facebox", "../../../../form", "invariant", "../../../../typecast", "../../../../remote-submit", "../../../../warn-unsaved-changes"], function (e, t, n, r, a, i) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s() {
        return _["default"](document.querySelector(".js-saml-provider-settings-form"), HTMLFormElement)
    }

    function u() {
        return s().querySelector(".js-saml-form-inputs")
    }

    function l() {
        return document.querySelector(".js-org-saml-confirm-enforcement-hidden")
    }

    function c() {
        var e = document.querySelector(".js-org-saml-previously-enforced");
        return E["default"](e instanceof HTMLInputElement, "`.js-org-saml-previously-enforced` must be HTMLInputElement"), "1" === e.value
    }

    function d() {
        return "0" === l().value
    }

    function f() {
        var e = document.querySelector(".js-org-has-unlinked-saml-members");
        return E["default"](e instanceof HTMLInputElement, "`.js-org-has-unlinked-saml-members` must be HTMLInputElement"), "1" === e.value
    }

    function h(e) {
        e && e.classList.remove("d-none")
    }

    function m(e) {
        e && e.classList.add("d-none")
    }

    function v() {
        var e = document.querySelector(".js-org-enable-saml");
        return E["default"](e instanceof HTMLInputElement, "`.js-org-enable-saml` must be an HTMLInputElement"), e.checked
    }

    function p() {
        return !v()
    }

    function g() {
        var e = document.querySelector(".is-submit-button-value");
        return E["default"](e instanceof HTMLInputElement, "`.is-submit-button-value` must be an HTMLInputElement"), e
    }

    function y() {
        return "test_settings" === g().name
    }

    function b() {
        return "save_settings" === g().name
    }

    function j() {
        var e = document.querySelector(".js-org-saml-enforce");
        return E["default"](e instanceof HTMLInputElement, "`.js-org-saml-enforce` must be an HTMLInputElement"), e.checked
    }

    function w() {
        return j() && d() && !c() && f()
    }

    function L() {
        k["default"]({div: "#disable-saml-confirmation"})
    }

    function S() {
        k["default"]({div: "#enforce-saml-confirmation"})
    }

    function x() {
        s().submit()
    }

    var k = o(t), E = o(r), _ = o(a);
    e.on("click", ".js-org-enable-saml", function (e) {
        e.currentTarget.checked ? h(u()) : m(u())
    }), e.on("click", ".js-saml-submit", function (e) {
        e.preventDefault(), i.persistSubmitButtonValue(e.currentTarget), n.submit(s())
    }), e.on("click", ".js-org-saml-confirm-enforce-button", function () {
        l().value = "true", n.submit(s())
    }), e.on("submit", ".js-saml-provider-settings-form", function (e) {
        e.preventDefault(), y() ? x() : b() && (p() ? L() : w() ? S() : x())
    }), document.addEventListener("facebox:close", function () {
        var e = document.querySelector("#facebox .js-disable-saml-confirmation");
        if (e) {
            var t = document.querySelector(".js-org-enable-saml");
            t && t instanceof HTMLInputElement && (t.checked = !0, h(u()))
        }
    })
}),define("github/legacy/pages/orgs/team", ["../../../typecast", "../../../fetch", "delegated-events", "../../../jquery", "../../../sudo"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var o = i(e), s = i(r), u = i(a);
    s["default"](document).on("autocomplete:autocompleted:changed", ".js-team-add-user-name", function () {
        var e = s["default"](".js-team-add-user-button")[0];
        e.disabled = !s["default"](this).data("autocompleted")
    }), n.on("click", ".js-team-remove-user", function (e) {
        e.preventDefault(), s["default"](".js-team-add-user-form").removeClass("d-none"), s["default"](".js-team-add-user-name").focus(), this.closest("li").remove()
    }), n.on("click", ".js-team-add-user-button", function (e) {
        e.preventDefault();
        var n = this.closest(".js-team-add-user-form"), r = n.querySelector(".js-team-add-user-name"), a = r.value;
        if (a && s["default"](r).data("autocompleted")) {
            r.value = "";
            var i = o["default"](document.querySelector(".js-team-user-logins"), HTMLElement), l = !0, c = !1, d = void 0;
            try {
                for (var f, h = i.querySelectorAll("li")[Symbol.iterator](); !(l = (f = h.next()).done); l = !0) {
                    var m = f.value;
                    if (m.getAttribute("data-login") === a)return
                }
            } catch (v) {
                c = !0, d = v
            } finally {
                try {
                    !l && h["return"] && h["return"]()
                } finally {
                    if (c)throw d
                }
            }
            u["default"]("low").then(function () {
                var e = new URL(n.getAttribute("data-template-url"), window.location.origin), o = new URLSearchParams(e.search.slice(1));
                o.append("member", a), e.search = o.toString(), t.fetchSafeDocumentFragment(document, e).then(function (e) {
                    i.appendChild(e), s["default"](".js-login-field").prop("disabled", !1), n.classList.add("d-none")
                }), r.focus()
            })
        }
    })
}),define("github/legacy/pages/orgs/teams/change-visibility", ["invariant", "delegated-events"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e);
    t.on("change", ".js-change-team-visibility-selector", function (e) {
        var t = e.target;
        if (r["default"](t instanceof HTMLInputElement), t.form) {
            var n = t.form.querySelector(".js-change-team-visibility-submit");
            n instanceof HTMLButtonElement && (n.disabled = !1)
        }
    })
}),define("github/legacy/pages/orgs/teams/import", ["../../../../typecast", "../../../../throttled-input", "../../../../observe", "../../../../jquery"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var i = a(e), o = a(r), s = new WeakMap;
    o["default"](document).on("ajaxSend", ".js-ldap-import-groups-container", function (e, t) {
        return t.setRequestHeader("X-Context", "import")
    }), o["default"](document).on("autocomplete:autocompleted:changed", ".js-team-ldap-group-field", function () {
        var e = void 0;
        (e = this.closest(".js-ldap-group-adder")) && (e.classList.remove("is-exists"), e.querySelector(".js-ldap-group-adder-button").disabled = !o["default"](this).data("autocompleted"))
    }), o["default"](document).on("navigation:open", ".js-team-ldap-group-autocomplete-results .js-navigation-item", function () {
        var e = o["default"](this).closest(".js-ldap-group-adder"), t = o["default"](this).attr("data-dn");
        return e.find(".js-team-ldap-dn-field").val(t), o["default"](this).closest(".js-ldap-import-groups-container").find(".js-ldap-group-dn").map(function (n, r) {
            o["default"](r).text() === t && (e.addClass("is-exists"), e[0].querySelector(".js-ldap-group-adder-button").disabled = !0)
        })
    }), o["default"](document).on("ajaxSend", ".js-import-container", function () {
        this.classList.add("is-importing"), this.querySelector(".js-ldap-group-adder-button").disabled = !0
    }), o["default"](document).on("ajaxComplete", ".js-import-container", function () {
        return o["default"](this).removeClass("is-importing")
    }), o["default"](document).on("ajaxSuccess", ".js-ldap-group-adder", function (e, t, n, r) {
        return o["default"](this).closest(".js-ldap-import-groups-container").removeClass("is-empty").find(".js-ldap-imported-groups").prepend(o["default"](r)), this.reset(), o["default"](this).find(".js-team-ldap-group-field").focus(), this.querySelector(".js-ldap-group-adder-button").disabled = !0, o["default"](".js-import-form-actions").removeClass("d-none")
    }), o["default"](document).on("submit", ".js-team-remove-group", function () {
        this.closest(".js-team").classList.add("is-removing"), i["default"](document.querySelector(".js-team-ldap-group-field"), HTMLElement).focus()
    }), o["default"](document).on("ajaxSuccess", ".js-team-remove-group", function () {
        this.closest(".js-team").remove(), document.querySelector(".js-team:not(.is-removing)") || (i["default"](document.querySelector(".js-ldap-import-groups-container"), HTMLElement).classList.add("is-empty"), i["default"](document.querySelector(".js-import-form-actions"), HTMLElement).classList.add("d-none"))
    }), o["default"](document).on("ajaxError", ".js-team-remove-group", function () {
        this.closest(".js-team").classList.remove("is-removing")
    }), o["default"](document).on("click", ".js-edit-team", function (e) {
        return o["default"](this).closest(".js-team").hasClass("is-removing") ? !1 : (e.preventDefault(), o["default"](this).closest(".js-team").addClass("is-editing"), o["default"](this).closest(".js-team").find(".js-team-name-field").focus())
    }), o["default"](document).on("click", ".js-save-button", function () {
        return o["default"](this).hasClass("disabled") ? !1 : o["default"](this).closest(".js-team").addClass("is-sending")
    }), o["default"](document).on("click", ".js-cancel-team-edit", function (e) {
        e.preventDefault();
        var t = o["default"](this).closest(".js-team").removeClass("is-editing"), n = t.find(".js-team-form").removeClass("is-exists");
        return n.find(".js-slug").text(n.find(".js-slug").attr("data-original-slug")), n[0].reset()
    }), o["default"](document).on("ajaxSuccess", ".js-team-form:not(.is-checking)", function (e, t, n, r) {
        return t.nameCheck ? void 0 : o["default"](this).closest(".js-team").removeClass("is-editing").replaceWith(o["default"](r))
    }), o["default"](document).on("ajaxSuccess", ".js-team-form.is-checking", function (e, t, n, r) {
        var a = o["default"](this).removeClass("is-checking"), i = a.find(".js-team-name-field")[0];
        return s["delete"](i), r.error ? (a.find(".js-save-button").addClass("disabled"), "exists" === r.error ? (a.addClass("is-exists"), a.find(".js-slug").html(r.slug)) : void 0) : (a.closest(".js-team").find(".js-slug").html(r.slug), a.find(".js-save-button").removeClass("disabled"))
    }), o["default"](document).on("ajaxError", ".js-team-form", function (e, t) {
        return t.nameCheck && "abort" === t.statusText ? !1 : void 0
    }), n.observe(".js-team-name-field", function (e) {
        t.addThrottledInputEventListener(e, function () {
            var e = o["default"](this), t = e.closest(".js-team-form"), n = s.get(e[0]);
            null != n && n.abort(), t.removeClass("is-exists").addClass("is-checking"), t.find(".js-save-button").addClass("disabled");
            var r = o["default"].ajax({
                url: e.attr("data-check-url"),
                type: "GET",
                context: this,
                data: {name: this.value}
            });
            r.nameCheck = !0, s.set(e[0], r)
        })
    })
}),define("github/legacy/pages/orgs/teams/index", ["../../../../typecast", "../../../../throttled-input", "delegated-events"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var a = r(e);
    n.on("click", ".js-team-search-filter", function (e) {
        e.preventDefault();
        var n = this.getAttribute("data-filter"), r = this.closest(".js-select-menu").getAttribute("data-filter-on"), i = a["default"](document.querySelector(".js-team-search-field"), HTMLInputElement), o = i.value, s = new RegExp(r + ":[a-z]+"), u = o.toString().trim().replace(s, "");
        i.value = (u + " " + n).replace(/\s\s/, " "), i.focus(), t.dispatchThrottledInputEvent(i)
    })
}),define("github/legacy/pages/orgs/teams/new", ["../../../../throttled-input", "../../../../fetch", "../../../../observe", "delegated-events", "../../../../typecast", "../../../../facebox"], function (e, t, n, r, a, i) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s(e) {
        var n = e.value.trim(), r = e.form;
        r.classList.add("is-sending"), r.classList.remove("is-name-check-fail"), r.classList.remove("is-name-check-success");
        var a = new URL(e.getAttribute("data-check-url"), window.location.origin), i = new URLSearchParams(a.search.slice(1));
        i.append("name", n), a.search = i.toString(), t.fetchText(a).then(function (t) {
            var a = void 0;
            r.classList.remove("is-sending"), r.querySelector(".js-team-name-errors").innerHTML = t || "";
            var i = null != (a = e.getAttribute("data-original")) ? a.trim() : void 0, o = i && n === i, s = !!r.querySelector(".js-error"), u = (s || !n) && !o;
            return r.querySelector(".js-create-team-button").disabled = u, r.classList.toggle("is-name-check-fail", s), r.classList.toggle("is-name-check-success", !s && n)
        })
    }

    var u = o(a), l = o(i);
    n.observe(".js-new-team", function (t) {
        e.addThrottledInputEventListener(t, function () {
            s(t)
        })
    }), n.observe(".js-new-org-team", function (e) {
        var t = e.querySelector(".js-new-team");
        t.value && s(t)
    }), r.on("click", ".js-create-team-button", function (e) {
        var n = u["default"](e.currentTarget.closest("form"), HTMLElement), r = u["default"](n.querySelector("#team-parent-team-name"), HTMLInputElement), a = r.getAttribute("data-original-team-name"), i = r.value;
        if (a !== i) {
            e.preventDefault();
            var o = n.getAttribute("data-change-parent-summary-url") || "";
            o = o + "?parent_team=" + i, l["default"](function () {
                t.fetchSafeDocumentFragment(document, o).then(function (e) {
                    l["default"](e, "change-parent-summary")
                })
            })
        }
    }), r.on("click", ".js-confirm-change-parent", function () {
        u["default"](document.querySelector(".js-org-team-form"), HTMLFormElement).submit()
    })
}),define("github/legacy/pages/orgs/teams/show", ["../../../../typecast", "delegated-events"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e);
    t.on("click", ".js-rename-owners-team-next-btn", function () {
        return r["default"](document.querySelector(".js-rename-owners-team-about-content"), HTMLElement).classList.toggle("migrate-owners-content-hidden"), r["default"](document.querySelector(".js-rename-owners-team-rename-form"), HTMLElement).classList.toggle("migrate-owners-content-hidden")
    })
}),define("github/legacy/pages/orgs/transform", ["../../../observe"], function (e) {
    e.observe(".js-org-transform-poller", function (e) {
        var t = e.getAttribute("data-redirect-url");
        e.addEventListener("load", function () {
            return window.location.href = t
        })
    })
}),define("github/legacy/pages/pages_composer", ["../../jquery", "../../document-ready"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e);
    t.ready.then(function () {
        function e(e, t) {
            var n = r["default"](t), a = e.value;
            e.value = n.text(), n.text(a)
        }

        r["default"]("#load-readme").click(function () {
            function t() {
                return this.value !== o && i.hide(), n.off("change keyup", t)
            }

            var n = r["default"]("#gollum-editor-body"), a = r["default"]("#editor-body-buffer"), i = r["default"]("#undo-load-readme"), o = a.text();
            e(n, a);
            var s = r["default"](this);
            return this.disabled = !0, s.text(s.attr("data-readme-name") + " loaded"), i.show(), n.on("change keyup", t), !1
        }), r["default"]("#undo-load-readme").click(function () {
            e(r["default"]("#gollum-editor-body"), r["default"]("#editor-body-buffer"));
            var t = r["default"]("#load-readme");
            return t[0].disabled = !1, t.text("Load " + t.attr("data-readme-name")), r["default"](this).hide(), !1
        })
    })
}),define("github/legacy/pages/pull_requests/composer", ["delegated-events", "../../../jquery"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(t);
    e.on("change", ".js-collab-checkbox", function () {
        Array.from(this.form.querySelectorAll(".errored")).forEach(function (e) {
            return e.classList.remove("errored")
        });
        var e = this.closest(".js-collab-option"), t = e.querySelector(".js-status-indicator");
        t.classList.remove("status-indicator-success", "status-indicator-failed"), t.classList.add("status-indicator-loading")
    }), r["default"](document).on("ajaxSuccess", ".js-collab-form", function () {
        Array.from(this.querySelectorAll(".errored")).forEach(function (e) {
            return e.classList.remove("errored")
        }), Array.from(this.querySelectorAll(".status-indicator-loading")).forEach(function (e) {
            e.classList.remove("status-indicator-loading"), e.classList.add("status-indicator-success")
        })
    }), r["default"](document).on("ajaxError", ".js-collab-form", function (e) {
        Array.from(this.querySelectorAll(".status-indicator-loading")).forEach(function (e) {
            e.classList.remove("status-indicator-loading"), e.classList.add("status-indicator-failed");
            var t = e.closest(".js-collab-option");
            t.classList.add("errored");
            var n = t.querySelector(".js-collab-checkbox");
            n.checked = !n.checked
        }), Array.from(this.querySelectorAll(".status-indicator-success")).forEach(function (e) {
            e.classList.remove("status-indicator-success")
        }), e.preventDefault()
    })
}),define("github/legacy/pages/pull_requests/discussion-timeline-regrouping", ["../../../observe"], function (e) {
    function t(e, t) {
        var n = e.querySelector("table.timeline-commits > tbody"), r = t.querySelectorAll("table.timeline-commits > tbody > tr.commit");
        Array.from(r).forEach(function (e) {
            n.appendChild(e)
        }), t.remove()
    }

    e.observe(".discussion-item.discussion-commits", {
        add: function (e) {
            var n = e.previousElementSibling;
            n && n.matches(".discussion-item.discussion-commits") && !e.querySelector(".discussion-item-header") && t(n, e)
        }
    })
}),define("github/legacy/pages/pull_requests/merge", ["../../../updatable-content", "../../../jquery", "../../../visible"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var a = r(t), i = r(n);
    a["default"](document).on("details:toggled", ".js-pull-merging", function () {
        var e = a["default"](this).find(".js-merge-pull-request");
        e.toggleClass("is-dirty", Array.from(e).some(i["default"]))
    }), a["default"](document).on("ajaxSuccess", ".js-merge-pull-request", function (t, n, r, i) {
        var o = void 0;
        this.reset(), a["default"](this).removeClass("is-dirty");
        var s = i.updateContent;
        for (o in s) {
            var u = s[o], l = document.querySelector(o);
            l && e.replaceContent(l, u)
        }
    }), a["default"](document).on("session:resume", function (e) {
        e = e.originalEvent;
        var t = document.getElementById(e.detail.targetId);
        if (t) {
            var n = a["default"](t).closest(".js-merge-pull-request");
            n.closest(".js-details-container").addClass("open")
        }
    }), a["default"](document).on("change", ".js-merge-method", function () {
        var e = this.closest(".js-merge-pr");
        e.classList.toggle("is-merging", "merge" === this.value), e.classList.toggle("is-squashing", "squash" === this.value), e.classList.toggle("is-rebasing", "rebase" === this.value);
        var t = e.querySelectorAll(".js-merge-pull-request .js-merge-commit-button"), n = !0, r = !1, a = void 0;
        try {
            for (var i, o = t[Symbol.iterator](); !(n = (i = o.next()).done); n = !0) {
                var s = i.value;
                s.type = this.value === s.value ? "submit" : "button"
            }
        } catch (u) {
            r = !0, a = u
        } finally {
            try {
                !n && o["return"] && o["return"]()
            } finally {
                if (r)throw a
            }
        }
        var l = e.closest(".js-pull-merging"), c = l.getAttribute("data-url");
        c = c.replace(/merge_type=(\w+)/, "merge_type=" + this.value), l.setAttribute("data-url", c)
    }), a["default"](document).on("change", ".js-merge-button-toggle", function () {
        var e = void 0, t = void 0, n = this.closest(".js-merge-pr"), r = !this.checked, a = n.querySelectorAll(".js-merge-commit-button");
        for (e = 0, t = a.length; t > e; e++) {
            var i = a[e];
            i.disabled = r
        }
    }), a["default"](document).on("navigation:open", ".js-merge-method-menu .js-navigation-item", function () {
        var e = this.closest(".js-merge-pr"), t = e.querySelector(".js-merge-title"), n = e.querySelector(".js-merge-message");
        t.defaultValue === t.value && (t.defaultValue = this.getAttribute("data-input-title-value")), n.defaultValue === n.value && (n.defaultValue = this.getAttribute("data-input-message-value"))
    })
}),define("github/legacy/pages/pull_requests/merging_error", ["../../../jquery", "../../../fetch"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e);
    r["default"](document).on("ajaxError", ".js-handle-pull-merging-errors", function (e, t) {
        var n = void 0, a = this.closest(".js-pull-merging");
        if (a.classList.add("is-error"), 422 === t.status && (n = t.responseText)) {
            var i = a.querySelector(".js-pull-merging-error");
            r["default"](i).replaceWith(n)
        }
        return !1
    }), r["default"](document).on("click", ".js-pull-merging-refresh", function () {
        var e = this.closest(".js-pull-merging"), n = e.getAttribute("data-url");
        return t.fetchText(n).then(function (t) {
            return r["default"](e).replaceWith(t)
        }), !1
    })
}),define("github/legacy/pages/pull_requests/restore_branch", ["../../../observe", "../../../jquery"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r() {
        i["default"](".pull-request-ref-restore").removeClass("last").last().addClass("last")
    }

    function a() {
        var e = i["default"]("#js-pull-restorable").length;
        i["default"](".js-pull-discussion-timeline").toggleClass("is-pull-restorable", e)
    }

    var i = n(t);
    e.observe(".pull-request-ref-restore", {add: r, remove: r}), e.observe("#js-pull-restorable", {add: a, remove: a})
}),define("github/legacy/pages/pulls/show", ["../../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("pjax:end", function () {
        n["default"](".js-pull-refresh-on-pjax").trigger("socket:message")
    })
}),define("github/legacy/pages/repositories/fork", ["invariant"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    document.addEventListener("facebox:reveal", function () {
        var e = document.querySelector("#facebox .js-fork-select-fragment");
        if (e) {
            var t = e.getAttribute("data-url");
            n["default"](t, "Missing attribute `data-url`"), e.setAttribute("src", t)
        }
    })
}),define("github/legacy/pages/repositories/pulse", ["../../../jquery", "../../../pjax"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e), a = n(t);
    r["default"](document).on("change", ".js-pulse-period", function (e) {
        var t = r["default"](e.target).attr("data-url");
        return a["default"]({url: t, container: "#js-repo-pjax-container"})
    })
}),define("github/legacy/pages/repositories/repo_new", ["../../../form", "../../../document-ready", "../../../jquery", "invariant", "delegated-events"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    }

    var s = i(n), u = i(r), l = function () {
        function t() {
            var t = this;
            this.validate = o(this.validate, this), this.updateUpsell = o(this.updateUpsell, this), this.selectedPrivacyToggleElement = o(this.selectedPrivacyToggleElement, this), this.handlePrivacyChange = o(this.handlePrivacyChange, this), this.handleOwnerChange = o(this.handleOwnerChange, this), this.elements = {
                $ownerContainer: s["default"](".js-owner-container"),
                $iconPreviewPublic: s["default"](".js-icon-preview-public"),
                $iconPreviewPrivate: s["default"](".js-icon-preview-private"),
                $upgradeUpsell: s["default"]("#js-upgrade-container").hide(),
                $upgradeConfirmationCheckbox: s["default"](".js-confirm-upgrade"),
                $upsells: s["default"](".js-upgrade"),
                $privacyToggles: s["default"](".js-privacy-toggle"),
                $privateRadio: s["default"](".js-privacy-toggle[value=false]"),
                $publicRadio: s["default"](".js-privacy-toggle[value=true]"),
                $repoNameField: s["default"]("input[type=text].js-repo-name"),
                $form: s["default"]("#new_repository"),
                $licenseContainer: s["default"](".js-license-container"),
                $suggestion: s["default"](".js-reponame-suggestion")
            }, this.current_login = s["default"]("input[name=owner]:checked").prop("value"), this.privateRepo = this.selectedPrivacyToggleElement() == this.elements.$privateRadio, this.changedPrivacyManually = this.privateRepo, this.elements.$ownerContainer.on("change", "input[type=radio]", this.handleOwnerChange), this.elements.$privacyToggles.on("change", function (e) {
                return function (t) {
                    return e.handlePrivacyChange(t.targetElement, t)
                }
            }(this)), this.elements.$upgradeUpsell.on("change input", "input", this.validate), this.elements.$form.on("repoform:validate", this.validate), this.elements.$suggestion.on("click", function (n) {
                var r = t.elements.$repoNameField[0];
                e.changeValue(r, n.target.textContent), n.preventDefault()
            }), this.handleOwnerChange(), this.validate()
        }

        return t.prototype.handleOwnerChange = function () {
            this.current_login = s["default"]("input[name=owner]:checked").prop("value"), a.fire(this.elements.$repoNameField[0], "change");
            var e = this.elements.$ownerContainer.find(".select-menu-item.selected");
            return this.changedPrivacyManually || ("private" === e.attr("data-default") ? this.elements.$privateRadio.prop("checked", "checked").change() : this.elements.$publicRadio.prop("checked", "checked").change()), "yes" === e.attr("data-permission") ? (s["default"](".with-permission-fields").show(), s["default"](".without-permission-fields").hide(), s["default"](".errored").show(), s["default"]("dl.warn").show()) : (s["default"](".with-permission-fields").hide(), s["default"](".without-permission-fields").show(), s["default"](".errored").hide(), s["default"]("dl.warn").hide()), this.updateUpsell(), this.handlePrivacyChange()
        }, t.prototype.handlePrivacyChange = function (e, t) {
            null == e && (e = this.selectedPrivacyToggleElement()), null == t && (t = null), t && !t.isTrigger && (this.changedPrivacyManually = !0);
            var n = this.elements.$upgradeUpsell.find(".js-billing-section");
            return "false" === e.val() ? (this.privateRepo = !0, this.elements.$upgradeUpsell.show(), n.removeClass("has-removed-contents"), this.elements.$upgradeUpsell.find("input[type=checkbox]").prop("checked", "checked"), this.elements.$iconPreviewPublic.hide(), this.elements.$iconPreviewPrivate.show()) : (this.privateRepo = !1, this.elements.$upgradeUpsell.hide(), n.addClass("has-removed-contents"), this.elements.$upgradeUpsell.find("input[type=checkbox]").prop("checked", null), this.elements.$form.attr("action", this.elements.$form.attr("data-url")), this.elements.$iconPreviewPrivate.hide(), this.elements.$iconPreviewPublic.show()), this.validate()
        }, t.prototype.selectedPrivacyToggleElement = function () {
            return this.elements.$privateRadio.is(":checked") ? this.elements.$privateRadio : this.elements.$publicRadio
        }, t.prototype.updateUpsell = function () {
            var e = this.elements.$upsells.filter("[data-login=" + this.current_login + "]");
            return this.elements.$upgradeUpsell.html(e)
        }, t.prototype.validate = function () {
            var e = void 0;
            e = !0, this.elements.$repoNameField.is(".is-autocheck-successful") || (e = !1);
            var t = this.elements.$upgradeUpsell.find("input[type=checkbox]");
            return this.privateRepo && t.length && !t.is(":checked") && (e = !1), this.elements.$form.find("button.primary").prop("disabled", !e)
        }, t
    }();
    t.ready.then(function () {
        return s["default"](".page-new-repo").length ? new l : void 0
    }), a.on("autocheck:send", "#repository_name", function (e) {
        u["default"](e instanceof CustomEvent);
        var t = e.detail, n = s["default"](this), r = n.closest("form").find("input[name=owner]:checked").val();
        t.owner = r, n.trigger("repoform:validate")
    }), a.on("autocheck:complete", "#repository_name", function () {
        return s["default"](this).trigger("repoform:validate")
    }), a.on("autocheck:success", "#repository_name", function (e) {
        u["default"](e instanceof CustomEvent);
        var t = void 0;
        if (null != e.detail && (t = e.detail.trim()), t) {
            var n = this.closest("dl.form-group");
            n.classList.add("warn");
            var r = document.createElement("dd");
            r.classList.add("warning"), r.innerHTML = t, n.append(r)
        }
    })
}),define("github/legacy/pages/repositories/side_navigation", ["../../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    document.addEventListener("pjax:end", function () {
        var e = void 0, t = void 0, r = void 0, a = void 0, i = void 0, o = n["default"](document.head).find("meta[name='selected-link']").attr("value");
        if (null != o) {
            var s = n["default"](".js-sidenav-container-pjax .js-selected-navigation-item").removeClass("selected");
            for (e = 0, r = s.length; r > e; e++) {
                var u = s[e], l = null != (i = n["default"](u).attr("data-selected-links")) ? i : "", c = l.split(" ");
                for (t = 0, a = c.length; a > t; t++) {
                    var d = c[t];
                    d === o && n["default"](u).addClass("selected")
                }
            }
        }
    })
}),define("github/legacy/pages/repository_imports/show", ["../../../typecast", "../../../form", "../../../jquery"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++)n[t] = e[t];
            return n
        }
        return Array.from(e)
    }

    var i = r(e), o = r(n);
    o["default"](document).on("change", ".js-repository-import-owner-container input", function () {
        var e = this.getAttribute("data-upsell"), t = this.getAttribute("data-billing-url");
        i["default"](document.querySelector(".js-repository-import-billing-url"), HTMLAnchorElement).href = t, i["default"](document.querySelector(".js-repository-import-upsell"), HTMLElement).classList.toggle("d-none", "false" == e), i["default"](document.querySelector(".js-repository-import-no-upsell"), HTMLElement).classList.toggle("d-none", "true" == e)
    }), o["default"](document).on("socket:message", ".repository-import", function (e, t) {
        t.redirect_to && (document.location.href = t.redirect_to, e.stopImmediatePropagation())
    }), o["default"](document).on("change", ".js-repository-import-lfs-opt", function () {
        var e = this.getAttribute("data-percent-used"), t = this.closest(".js-repository-import-lfs-container"), n = this.getAttribute("data-used");
        t.querySelector(".js-repository-import-lfs-warn").classList.toggle("d-none", !(e > 100)), t.querySelector(".js-usage-bar").classList.toggle("exceeded", e >= 100), t.querySelector(".js-usage-bar").setAttribute("aria-label", e + "%"), t.querySelector(".js-repository-import-lfs-progress").style.width = e + "%", t.querySelector("span.js-usage-text").innerText = n
    }), o["default"](document).on("menu:activated selectmenu:load", ".js-repository-import-author-select-menu", function () {
        var e = this.querySelector(".js-repository-import-author-autocomplete");
        e.focus(), e.select()
    }), o["default"](document).on("autocomplete:result", ".js-repository-import-author-autocomplete", function () {
        var e = this.closest(".js-repository-import-author"), n = e.querySelector(".js-author-login-info");
        t.changeValue(n, this.value)
    }), o["default"](document).on("ajaxSuccess", ".js-repository-import-author-form", function (e, t, n, r) {
        var i = o["default"].parseHTML(r.trim()), s = this.closest(".js-repository-import-author");
        s.replaceWith.apply(s, a(i))
    }), o["default"](document).on("click", ".js-repository-import-projects-cancel-button", function () {
        var e = i["default"](document.querySelector(".js-repository-import-projects-cancel-form"), HTMLFormElement);
        t.submit(e)
    })
}),define("github/legacy/pages/sessions/two_factor", ["../../../typecast", "../../../fetch", "delegated-events", "../../../jquery", "invariant"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o() {
        var e = document.body;
        d["default"](e), e.classList.add("is-sending"), e.classList.remove("is-sent", "is-not-sent")
    }

    function s() {
        var e = document.body;
        d["default"](e), e.classList.add("is-sent"), e.classList.remove("is-sending")
    }

    function u(e) {
        var t = document.body;
        d["default"](t), e && (l["default"](document.querySelector(".js-sms-error"), HTMLElement).textContent = e), t.classList.add("is-not-sent"), t.classList.remove("is-sending")
    }

    var l = i(e), c = i(r), d = i(a);
    c["default"](document).on("ajaxSend", ".js-send-auth-code", o), c["default"](document).on("ajaxSuccess", ".js-send-auth-code", s), c["default"](document).on("ajaxError", ".js-send-auth-code", function (e, t) {
        u(t.responseText), e.preventDefault()
    }), n.on("click", ".js-send-two-factor-code", function () {
        var e = this.form, n = e.querySelector(".js-country-code-select").value, r = e.querySelector(".js-sms-number").value, a = n + " " + r;
        o();
        var i = this.getAttribute("data-authenticity-token");
        null == i && (i = e.elements.authenticity_token.value);
        var l = new FormData;
        l.append("number", a), l.append("authenticity_token", i), t.fetch(this.getAttribute("data-url"), {
            method: "post",
            body: l
        }).then(function () {
            s(), Array.from(e.querySelectorAll(".js-2fa-enable")).forEach(function (e) {
                return e.disabled = !1
            }), e.querySelector(".js-2fa-otp").focus()
        })["catch"](function (t) {
            t.response && t.response.text().then(u), Array.from(e.querySelectorAll(".js-2fa-enable")).forEach(function (e) {
                return e.disabled = !0
            })
        })
    }), n.on("click", ".js-enable-enable-two-factor-auth-button", function () {
        var e = l["default"](document.querySelector(".js-enable-two-factor-auth-button"), HTMLButtonElement);
        e.disabled = !1, e.removeAttribute("aria-label"), e.classList.remove("tooltipped")
    }), document.addEventListener("facebox:reveal", function () {
        var e = document.querySelector("#facebox .js-two-factor-set-sms-fallback");
        e && (c["default"](".js-configure-sms-fallback .facebox-alert").text("").hide(), c["default"](".js-configure-sms-fallback").show(), c["default"](".js-verify-sms-fallback").hide())
    }), c["default"](document).on("ajaxSuccess", ".js-two-factor-set-sms-fallback", function (e, t) {
        switch (t.status) {
            case 200:
            case 201:
                window.location.reload();
                break;
            case 202:
                c["default"](".js-configure-sms-fallback").hide(), c["default"](".js-verify-sms-fallback").show(), c["default"](".js-fallback-otp").focus()
        }
    }), c["default"](document).on("ajaxError", ".js-two-factor-set-sms-fallback", function (e, t) {
        switch (t.status) {
            case 422:
                return c["default"](".js-configure-sms-fallback .facebox-alert").text(t.responseText).show(), !1;
            case 429:
                return c["default"](".js-configure-sms-fallback .facebox-alert").text(t.responseText).show(), !1
        }
    })
}),define("github/legacy/pages/settings/user/saved-replies", ["../../../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("ajaxSuccess", ".js-saved-reply-delete", function () {
        var e = this.closest(".js-saved-reply-container"), t = e.querySelectorAll(".js-saved-reply-list-item").length;
        e.classList.toggle("has-replies", t > 1), this.closest(".js-saved-reply-list-item").remove()
    })
}),define("github/legacy/pages/settings/user/settings", ["../../../../typecast", "../../../../form", "delegated-events", "../../../../observe", "../../../../jquery", "../../../../facebox"], function (e, t, n, r, a, i) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s(e) {
        if (!document.querySelector(".js-blocked-user-list")) {
            var t = e.querySelector(".blankslate");
            t.classList.add("d-none")
        }
    }

    function u(e, t) {
        var n = e.querySelector(".js-add-new-blocked-user");
        n.disabled = !t
    }

    var l = o(e), c = o(a);
    r.observe(".js-email-global-unsubscribe-form", function (e) {
        e.querySelector(".js-email-global-unsubscribe-submit").disabled = !0
    }), c["default"](document).on("change", ".js-email-global-unsubscribe-form", function () {
        var e = void 0, t = function () {
            var t = void 0, n = void 0, r = this.querySelectorAll(".js-email-global-unsubscribe"), a = [];
            for (t = 0, n = r.length; n > t; t++)e = r[t], e.checked && a.push(e);
            return a
        }.call(this);
        return this.querySelector(".js-email-global-unsubscribe-submit").disabled = t[0].defaultChecked
    }), c["default"](document).on("ajaxError", ".js-remove-ssh-key", function () {
        return c["default"](this).removeClass("disabled").find("span").text("Error. Try again.")
    }), c["default"](document).on("ajaxSuccess", ".js-remove-ssh-key", function () {
        n.fire(document, "facebox:close");
        var e = this.getAttribute("data-row-id");
        return l["default"](document.getElementById(e), HTMLElement).remove(), 0 === c["default"](".js-ssh-keys-box li").length ? c["default"](".js-ssh-keys-container").removeClass("has-keys") : void 0
    }), c["default"](document).on("ajaxError", ".js-remove-gpg-key", function () {
        return c["default"](this).removeClass("disabled").find("span").text("Error. Try again.")
    }), c["default"](document).on("ajaxSuccess", ".js-remove-gpg-key", function () {
        n.fire(document, "facebox:close");
        var e = this.getAttribute("data-row-id");
        return l["default"](document.getElementById(e), HTMLElement).remove(), 0 === c["default"](".js-gpg-keys-box li").length ? c["default"](".js-gpg-keys-container").removeClass("has-keys") : void 0
    }), c["default"](document).on("ajaxSend", ".js-verify-ssh-key", function () {
        return c["default"](this).addClass("disabled").find("span").text("Verifying\u2026")
    }), c["default"](document).on("ajaxError", ".js-verify-ssh-key", function () {
        return c["default"](this).removeClass("disabled").find("span").text("Error. Try again.")
    }), c["default"](document).on("ajaxSuccess", ".js-verify-ssh-key", function () {
        var e = this.closest("li");
        return e.querySelector(".js-unverified-user-key-notice").remove(), e.querySelector(".js-user-key-icon").classList.remove("unverified-user-key"), this.remove()
    }), c["default"](document).on("ajaxSuccess", ".js-leave-collaborated-repo", function (e) {
        var t = e.target.getAttribute("data-repo-id"), n = l["default"](document.querySelector(".js-collab-repo[data-repo-id='" + t + "']"), HTMLElement);
        n.remove(), i.close()
    }), c["default"](document).on("ajaxSuccess", ".js-newsletter-unsubscribe-form", function () {
        var e = void 0, t = void 0, n = document.querySelectorAll(".js-newsletter-unsubscribe-message"), r = [];
        for (e = 0, t = n.length; t > e; e++) {
            var a = n[e];
            r.push(a.classList.toggle("d-none"))
        }
        return r
    }), c["default"](document).on("click", ".js-show-new-ssh-key-form", function () {
        return c["default"](".js-new-ssh-key-box").toggle().find(".js-ssh-key-title").focus(), !1
    }), c["default"](document).on("click", ".js-show-new-gpg-key-form", function () {
        return c["default"](".js-new-gpg-key-box").toggle().find(".js-gpg-key-public-key").focus(), !1
    }), c["default"](document).on("ajaxSuccess", ".js-revoke-access-form", function () {
        var e = this.getAttribute("data-id"), t = this.getAttribute("data-type-name"), n = l["default"](document.querySelector(".js-revoke-item[data-type='" + t + "'][data-id='" + e + "']"), HTMLElement);
        i.close(), n.remove(), n.classList.contains("new-token") && l["default"](document.querySelector(".js-flash-new-token"), HTMLElement).remove()
    }), c["default"](document).on("click", ".js-delete-oauth-application-image", function () {
        var e = this.closest(".js-uploadable-container"), n = e.closest("form"), r = this.getAttribute("data-app-logo-destroy-path"), a = this.getAttribute("data-app-logo-destroy-method"), i = this.getAttribute("data-app-logo-destroy-field-name"), o = this.getAttribute("data-app-logo-destroy-field-value"), s = this.getAttribute("data-app-logo-destroy-authenticity-token");
        return n.action = r, c["default"](n).append('<input name="' + i + '" type="hidden" value="' + o + '">'), c["default"](n).append('<input name="authenticity_token" type="hidden" value="' + s + '">'), c["default"](n).append('<input name="_method" type="hidden" value="' + a + '">'), t.submit(n), !1
    }), c["default"](document).on("click", ".js-new-callback", function (e) {
        e.preventDefault();
        var t = c["default"](e.currentTarget).closest(".js-callback-urls"), n = t.find(".js-callback-url").first().clone();
        return n.removeClass("is-default-callback"), n.find("input").val(""), t.addClass("has-many"), c["default"](e.currentTarget).before(n)
    }), c["default"](document).on("click", ".js-delete-callback", function (e) {
        e.preventDefault();
        var t = c["default"](e.currentTarget).closest(".js-callback-urls");
        c["default"](e.currentTarget).closest(".js-callback-url").remove();
        var n = t.find(".js-callback-url");
        return n.length <= 1 ? t.removeClass("has-many") : void 0
    }), c["default"](document).on("click", ".js-oauth-application-whitelist .js-deny-this-request", function (e) {
        c["default"](e.currentTarget).siblings("#state").val("denied"), t.submit(this.closest(".js-org-application-access-form"))
    }), c["default"](document).on("ajaxSuccess", ".js-org-application-access-form", function () {
        return window.location.reload()
    }), c["default"](document).on("click", ".js-user-rename-warning-continue", function () {
        var e = void 0, t = void 0, n = document.querySelectorAll(".js-user-rename-warning, .js-user-rename-form"), r = [];
        for (e = 0, t = n.length; t > e; e++) {
            var a = n[e];
            r.push(a.classList.toggle("d-none"))
        }
        return r
    }), c["default"](document).on("change", ".js-checkbox-scope", function () {
        var e = void 0, t = void 0, n = this.closest(".js-check-scope-container"), r = n.querySelectorAll(".js-checkbox-scope"), a = [];
        for (e = 0, t = r.length; t > e; e++) {
            var i = r[e];
            i !== this ? (i.checked = this.checked, a.push(i.disabled = this.checked)) : a.push(void 0)
        }
        return a
    }), c["default"](document).on("click", ".js-generate-integration-key", function () {
        n.fire(document, "facebox:close");
        var e = l["default"](document.querySelector(".js-integration-key-management-wrapper"), HTMLElement);
        return e.classList.add("downloading")
    }), r.observe(".js-block-users-form", function (e) {
        u(e, !1)
    }), c["default"](document).on("ajaxSuccess", ".js-block-users-form", function (e, n, r, a) {
        var i = l["default"](document.querySelector(".js-user-block-settings-list"), HTMLElement), o = l["default"](i.querySelector(".js-blocked-list"), HTMLElement);
        u(this);
        var c = this.querySelector(".js-add-blocked-user-field");
        t.changeValue(c, ""), s(i), o.insertAdjacentHTML("afterbegin", a)
    }), c["default"](document).on("autocomplete:autocompleted:changed", ".js-add-blocked-user-field", function () {
        u(this.form, c["default"](this).data("autocompleted"))
    })
}),define("github/legacy/pages/settings/user/user_sessions", ["../../../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("ajaxSuccess", ".js-user-sessions-revoke", function () {
        var e = this.closest(".js-user-sessions-container");
        this.closest(".js-user-session").remove(), e && n["default"](e).toggleClass("has-active-sessions", n["default"](e).find(".js-user-session").length)
    })
}),define("github/legacy/pages/signup", ["../../document-ready", "../../observe", "../../google-analytics", "../../jquery"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var i = a(r);
    e.ready.then(function () {
        return i["default"](".js-email-notice-trigger").focus(function () {
            return i["default"](".js-email-notice").addClass("notice-highlight")
        }), i["default"](".js-email-notice-trigger").blur(function () {
            return i["default"](".js-email-notice").removeClass("notice-highlight")
        })
    }), t.observe(".js-plan-choice:checked", {
        add: function (e) {
            return i["default"](e).closest(".plan-row").addClass("selected")
        }, remove: function (e) {
            return i["default"](e).closest(".plan-row").removeClass("selected")
        }
    }), t.observe(".js-setup-organization:checked", {
        add: function () {
            var e = i["default"](".js-choose-plan-submit");
            return e.attr("data-default-text") || e.attr("data-default-text", e.text()), e.text(e.attr("data-org-text"))
        }, remove: function () {
            var e = i["default"](".js-choose-plan-submit");
            return e.text(e.attr("data-default-text"))
        }
    });
    var o = new WeakMap;
    t.observe(".js-signup-form", function (e) {
        e.addEventListener("input", function (t) {
            if (t.target.closest("input[type=text]") && !o.get(e)) {
                var r = e.querySelector(".js-signup-source");
                n.trackEvent({category: "Signup", action: "Attempt", label: r.value}), o.set(e, !0)
            }
        })
    })
}),define("github/legacy/pages/site-search", ["../../onfocus", "delegated-events", "../../typecast", "invariant"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e, t) {
        var n = o["default"](document.querySelector(".js-site-search-form"), HTMLFormElement);
        o["default"](document.querySelector(".js-site-search"), HTMLElement).classList.toggle("scoped-search", t);
        var r = void 0, a = void 0;
        t ? (r = n.getAttribute("data-scoped-search-url"), a = e.getAttribute("data-scoped-placeholder")) : (r = n.getAttribute("data-unscoped-search-url"), a = e.getAttribute("data-unscoped-placeholder")), s["default"]("string" == typeof r), s["default"]("string" == typeof a), n.setAttribute("action", r), e.setAttribute("placeholder", a)
    }

    var o = a(n), s = a(r);
    e.onHotkey("keyup", ".js-site-search-field", function (e, t) {
        var n = e.target, r = 0 === n.value.length;
        r && "backspace" === t && n.classList.contains("is-clearable") && i(n, !1), r && "esc" === t && i(n, !0), n.classList.toggle("is-clearable", r)
    }), e.onFocus(".js-site-search-focus", function (e) {
        function t() {
            n.classList.remove("focus"), s["default"](e instanceof HTMLInputElement), 0 === e.value.length && e.classList.contains("js-site-search-field") && i(e, !0), e.removeEventListener("blur", t)
        }

        var n = o["default"](e.closest(".js-chromeless-input-container"), HTMLElement);
        n.classList.add("focus"), e.addEventListener("blur", t)
    }), t.on("submit", ".js-site-search-form", function (e) {
        var t = o["default"](o["default"](e.target, HTMLFormElement).querySelector(".js-site-search-type-field"), HTMLInputElement);
        t.value = new URLSearchParams(window.location.search).get("type")
    })
}),define("github/legacy/pages/site/contact", ["../../../observe"], function (e) {
    e.observe(".js-contact-javascript-flag", function (e) {
        e.value = "true"
    })
}),define("github/legacy/pages/site/features", ["../../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("click", ".js-segmented-nav-button", function (e) {
        var t = n["default"](this).attr("data-selected-tab"), r = n["default"](this).closest(".js-segmented-nav");
        return r.find(".js-segmented-nav-button").removeClass("selected"), r.siblings(".js-selected-nav-tab").removeClass("active"), n["default"](this).addClass("selected"), n["default"]("." + t).addClass("active"), e.preventDefault()
    })
}),define("github/legacy/pages/site/header_notifications", ["../../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("socket:message", ".js-notification-indicator", function (e, t) {
        n["default"](this).attr({
            "aria-label": t.aria_label,
            "data-ga-click": t.ga_click
        }), n["default"]("span", this).attr("class", t.span_class)
    })
}),define("github/legacy/pages/site/keyboard_shortcuts", ["../../../jquery", "../../../visible", "../../../facebox", "../../../fetch"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i() {
        var e = "/site/keyboard_shortcuts?url=" + window.location.pathname;
        return u["default"](function () {
            return r.fetchText(e).then(function (e) {
                return u["default"](e, "shortcuts")
            })
        })
    }

    var o = a(e), s = a(t), u = a(n);
    o["default"](document).on("click", ".js-keyboard-shortcuts", function () {
        return i(), !1
    }), o["default"](document).on("click", ".js-see-all-keyboard-shortcuts", function () {
        return this.remove(), o["default"](".facebox .js-hidden-pane").css("display", "table-row-group"), !1
    }), o["default"](document).on("keypress", function (e) {
        return e.target === document.body && 63 === e.which ? (Array.from(o["default"](".facebox")).some(s["default"]) ? n.close() : i(), !1) : void 0
    })
}),define("github/legacy/pages/site_status", ["../../typecast", "../../observe"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e);
    t.observe(".js-site-status-container", function (e) {
        var t = e.querySelector(".js-site-status-message"), n = e.querySelector(".js-site-status-time"), a = e.querySelector(".flash"), i = r["default"](document.querySelector("meta[name=site-status-api-url]"), HTMLMetaElement).content;
        window.fetch(i).then(function (e) {
            return e.json()
        }).then(function (r) {
            if (null != r.status && "good" !== r.status) {
                t.textContent = r.body, n.setAttribute("datetime", r.created_on);
                var i = "major" === r.status ? "error" : "warn";
                a.classList.add("flash-" + i), e.classList.remove("d-none")
            }
        })
    })
}),define("github/legacy/pages/stafftools/ldap", ["../../../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("ajaxSend", ".js-action-ldap-create", function () {
        return n["default"](this).find(".btn-sm").addClass("disabled")
    }), n["default"](document).on("ajaxError", ".js-action-ldap-create", function () {
        return !1
    }), n["default"](document).on("ajaxComplete", ".js-action-ldap-create", function (e, t) {
        var r = n["default"](this), a = 500 === t.status ? "Oops, something went wrong." : t.responseText;
        return r.find(".js-message").show().html(" &ndash; " + a), 200 === t.status && r.find(".btn").hide(), !1
    })
}),define("github/legacy/pages/tree_finder", ["../../typecast", "../../observe", "../../fetch", "../../fuzzy-filter", "../../onfocus", "../../throttled-input", "../../navigation"], function (e, t, n, r, a, i, o) {
    function s(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function u(e, t) {
        var a = document.getElementById(e.getAttribute("data-results"));
        if (a) {
            var i = f.get(a);
            if (!i)return void(null == d && (d = n.fetchJSON(a.getAttribute("data-url")).then(function (t) {
                f.set(a, t.paths), u(e), d = null
            })["catch"](function () {
                d = null
            })));
            var s = c["default"](c["default"](a.querySelector(".js-tree-browser-result-template"), HTMLElement).firstElementChild, HTMLElement), l = c["default"](a.querySelector(".js-tree-finder-results"), HTMLElement);
            null == t && (t = e.value);
            var h = void 0, m = void 0;
            t ? (h = r.fuzzyRegexp(t), m = r.fuzzySort(i, t)) : m = i, a.classList.toggle("filterable-empty", !m.length);
            for (var v = document.createDocumentFragment(), p = m.slice(0, 50), g = 0, y = p.length; y > g; g++) {
                var b = p[g], j = s.cloneNode(!0), w = c["default"](j.getElementsByClassName("js-tree-finder-path")[0], HTMLAnchorElement), L = new URL(w.href);
                L.pathname = L.pathname + "/" + encodeURI(b), w.href = L.href, w.textContent = b, r.fuzzyHighlightElement(w, t, h), v.appendChild(j)
            }
            l.innerHTML = "", l.appendChild(v), o.focus(l)
        }
    }

    function l(e) {
        u(e.target)
    }

    var c = s(e), d = null, f = new WeakMap;
    a.onHotkey("keydown", ".js-tree-finder-field", function (e, t) {
        "esc" === t && (e.preventDefault(), history.back())
    }), t.observe(".js-tree-finder-field", {
        init: function (e) {
            u(e)
        }, add: function (e) {
            i.addThrottledInputEventListener(e, l), e.focus()
        }, remove: function (e) {
            i.removeThrottledInputEventListener(e, l)
        }
    })
}),define("github/legacy/pages/users/contributions", ["../../../typecast", "../../../fetch", "invariant", "../../../history", "../../../jquery", "../../../pjax", "delegated-events", "../../../inflector", "../../../number-helpers", "../../../observe"], function (e, t, n, r, a, i, o, s, u, l) {
    function c(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function d() {
        var e = T["default"](document.querySelector(".js-calendar-graph"), HTMLElement);
        return e.getAttribute("data-url")
    }

    function f(e) {
        return e.target.matches("rect.day") ? m(e.target) : void 0
    }

    function h() {
        var e = document.querySelector(".svg-tip");
        null != e && e.remove()
    }

    function m(e) {
        var t = document.body;
        q["default"](t);
        var n = S(e.getAttribute("data-date")), r = parseInt(e.getAttribute("data-count")), a = 0 === r ? "No" : u.formatNumber(r), i = P[n.getUTCMonth()].slice(0, 3) + " " + n.getUTCDate() + ", " + n.getUTCFullYear(), o = M["default"]('<div class="svg-tip svg-tip-one-line">\n  <strong>' + a + " " + s.pluralize(r, "contribution") + "</strong> on " + i + "\n</div>").get(0);
        M["default"](".svg-tip").remove(), t.appendChild(o);
        var l = e.getBoundingClientRect(), c = l.left + window.pageXOffset - o.offsetWidth / 2 + l.width / 2, d = l.bottom + window.pageYOffset - o.offsetHeight - 2 * l.height;
        return o.style.top = d + "px", o.style.left = c + "px"
    }

    function v(e) {
        var t = document.getElementById("js-contribution-activity");
        t && C["default"]({url: e, container: t, scrollTo: !1, replace: !0})
    }

    function p(e, n) {
        var r, a, i, o;
        return regeneratorRuntime.async(function (s) {
            for (; ;)switch (s.prev = s.next) {
                case 0:
                    return r = T["default"](document.querySelector(".js-calendar-graph"), HTMLElement), a = r.getAttribute("data-graph-url"), q["default"](null != a, "Missing attribute `data-graph-url`"), i = a + "?from=" + L(e) + "&to=" + L(n) + "&full_graph=1", s.next = 6, regeneratorRuntime.awrap(t.fetchSafeDocumentFragment(document, i));
                case 6:
                    o = s.sent, T["default"](document.querySelector(".js-contribution-graph"), HTMLElement).replaceWith(o);
                case 8:
                case"end":
                    return s.stop()
            }
        }, null, this)
    }

    function g(e) {
        A = e, I = null, D = null;
        var t = d() + "?tab=overview&period=" + A;
        return j(), v(t)
    }

    function y(e, t) {
        var n = void 0, r = void 0;
        return r = e.getAttribute("class").trim().split(" "), r = function () {
            var e = void 0, a = void 0, i = [];
            for (e = 0, a = r.length; a > e; e++)n = r[e], n !== t && i.push(n);
            return i
        }(), e.setAttribute("class", r.join(" "))
    }

    function b(e, t) {
        var n = e.getAttribute("class") + " " + t;
        return e.setAttribute("class", n.trim())
    }

    function j(e, t) {
        function n(n) {
            var r = S(n.getAttribute("data-date")).getTime();
            return e && t ? e.getTime() <= r && r <= t.getTime() : r === e.getTime()
        }

        var r = void 0, a = void 0, i = void 0, o = void 0, s = void 0, u = T["default"](document.querySelector(".js-calendar-graph"), HTMLElement), l = u.querySelectorAll("rect.day");
        for (a = 0, o = l.length; o > a; a++)r = l[a], y(r, "active");
        if (u.classList.remove("days-selected"), e || t) {
            u.classList.add("days-selected");
            var c = [];
            for (i = 0, s = l.length; s > i; i++)r = l[i], n(r) && c.push(b(r, "active"));
            return c
        }
    }

    function w(e) {
        return ("0" + e).slice(-2)
    }

    function L(e) {
        return e.getUTCFullYear() + "-" + w(e.getUTCMonth() + 1) + "-" + w(e.getUTCDate())
    }

    function S(e) {
        var t = void 0, n = void 0, r = void 0, a = void 0, i = void 0;
        return r = function () {
            var t = void 0, n = void 0, r = e.split("-"), i = [];
            for (t = 0, n = r.length; n > t; t++)a = r[t], i.push(parseInt(a));
            return i
        }(), i = r[0], n = r[1], t = r[2], new Date(Date.UTC(i, n - 1, t))
    }

    function x(e, t, n) {
        var r = void 0, a = void 0, i = void 0, o = void 0, s = d() + "?tab=overview";
        if (e >= I && D >= e)return void g("weekly");
        if ("object" == typeof t && (H = t, t = !0), H && t) {
            var u = new Date(H.getTime() - 26784e5), l = new Date(H.getTime() + 26784e5), c = e > H ? [H, e] : [e, H];
            r = c[0], a = c[1], u > r && (r = u), a > l && (a = l), i = [r, a], I = i[0], D = i[1], s += "&from=" + L(r) + "&to=" + L(a)
        } else r = e, o = [r, null], I = o[0], D = o[1], s += "&from=" + L(r);
        return H = e, A = "custom", j(r, a), n ? void 0 : v(s)
    }

    function k(e, t) {
        var n = new Date(Date.parse("1 " + e + " " + t + " 00:00:00 UTC")), r = new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth() + 1, 0));
        p(n, r)
    }

    function E(e) {
        var t = e.closest(".js-details-container");
        t && t.classList.add("open");
        var n = 62, r = e.getBoundingClientRect(), a = 10, i = window.scrollY + r.top - n - a;
        window.scrollTo(0, i)
    }

    function _() {
        var e = window.location.hash;
        if (e && !(e.indexOf("#event-") < 0)) {
            var t = e.slice(1, e.length), n = document.getElementById(t);
            n && E(n)
        }
    }

    var T = c(e), q = c(n), M = c(a), C = c(i), A = null, H = null, I = null, D = null;
    o.on("pjax:send", "#js-contribution-activity", function () {
        this.classList.add("loading")
    }), o.on("pjax:complete", "#js-contribution-activity", function () {
        this.classList.remove("loading")
    }), l.observe(".js-calendar-graph-svg", function (e) {
        var t = void 0, n = void 0, r = e.closest(".js-calendar-graph");
        r.addEventListener("mouseover", f), r.addEventListener("mouseout", h), t = r.getAttribute("data-from"), t && (t = H = S(t)), n = r.getAttribute("data-to"), n && (n = S(n))
    }), o.on("click", ".js-calendar-graph rect.day", function (e) {
        var t = S(this.getAttribute("data-date"));
        x(t, e.shiftKey, !1)
    });
    var P = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    o.on("click", ".js-year-link", function (e) {
        e.preventDefault(), e.stopPropagation();
        var t = T["default"](document.querySelector(".js-year-link.selected"), HTMLElement), n = e.target;
        t.classList.remove("selected"), n.classList.add("selected");
        var r = n.innerText, a = new Date, i = a.getUTCFullYear();
        if (parseInt(i) === parseInt(r)) {
            var o = a.getUTCMonth(), s = new Date(i, o, 1);
            return p(s, a)
        }
        return k("December", r)
    }), _(), window.addEventListener("hashchange", function (e) {
        var t = e.newURL || window.location.href, n = t.slice(t.indexOf("#") + 1, t.length), r = document.getElementById(n);
        return r ? (e.stopPropagation(), void E(r)) : !0
    }), l.observe(".js-profile-timeline-year-list.js-sticky", function (e) {
        var t = T["default"](document.getElementById("js-contribution-activity"), HTMLElement);
        t.style.minHeight = e.offsetHeight + "px"
    }), M["default"](document).on("ajaxSuccess", ".js-show-more-timeline-form", function (e, t, n) {
        var a = document.querySelector(".js-show-more-timeline-form");
        if (a) {
            var i = a.getAttribute("data-year");
            q["default"](null != i, "Missing attribute `data-year`");
            var o = T["default"](document.querySelector(".js-year-link.selected"), HTMLElement), s = T["default"](document.getElementById("year-link-" + i), HTMLElement);
            o.classList.remove("selected"), s.classList.add("selected")
        }
        document.title = e.target.getAttribute("data-title"), r.pushState(null, "", n.url)
    })
}),define("github/legacy/pages/users/pinned-repositories", ["invariant", "delegated-events", "../../../hotkey"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e, t, n) {
        var r = e.querySelector(".js-remaining-pinned-repos-count"), a = r.getAttribute("data-remaining-label"), i = n - t;
        r.textContent = i + " " + a, r.classList.toggle("text-red", 1 > i)
    }

    function i(e) {
        var t = parseInt(e.getAttribute("data-max-repo-count"), 10), n = e.querySelectorAll("input[type=checkbox]:checked").length, r = Array.from(e.querySelectorAll("input[type=checkbox]"));
        n === t ? r.forEach(function (e) {
            return e.disabled = !e.checked
        }) : t > n && r.forEach(function (e) {
            return e.disabled = !1
        });
        var i = e.closest(".js-pinned-repos-selection-form");
        a(i, n, t)
    }

    function o(e) {
        var t = Array.from(e.querySelectorAll(".js-pinned-repo-source"));
        if (t.length < 1)return [!0, !0];
        var n = [], r = !0, a = !1, i = void 0;
        try {
            for (var o, s = e.querySelectorAll(".js-pinned-repo-source:checked")[Symbol.iterator](); !(r = (o = s.next()).done); r = !0) {
                var u = o.value;
                u instanceof HTMLInputElement && n.push(u)
            }
        } catch (l) {
            a = !0, i = l
        } finally {
            try {
                !r && s["return"] && s["return"]()
            } finally {
                if (a)throw i
            }
        }
        var c = n.map(function (e) {
            return e.value
        }), d = c.indexOf("owned") > -1, f = c.indexOf("contributed") > -1;
        return d && !f || !d && f ? n.forEach(function (e) {
            return e.disabled = !0
        }) : n.forEach(function (e) {
            return e.disabled = !1
        }), [d, f]
    }

    function s(e) {
        var t = e.classList.contains("js-owned-repo"), n = e.classList.contains("js-contributed-repo");
        return [t, n]
    }

    function u(e) {
        e instanceof KeyboardEvent && "enter" === c["default"](e) && e.preventDefault();
        var t = e.target.closest(".js-pinned-repos-selection-form");
        l["default"](t instanceof HTMLElement);
        var n = t.querySelector(".js-pinned-repos-filter");
        l["default"](n instanceof HTMLInputElement);
        var r = (n.value || "").trim().toLowerCase(), a = r.length < 1, i = t.querySelectorAll(".js-pinned-repos-selection"), u = o(t), f = d(u, 2), h = f[0], m = f[1], v = !1;
        Array.from(i).forEach(function (e) {
            l["default"](e instanceof HTMLElement);
            var t = e.querySelector(".js-repo");
            l["default"](t instanceof HTMLElement);
            var n = t.textContent.trim(), i = s(e), o = d(i, 2), u = o[0], c = o[1], f = e.querySelector('input[type="checkbox"]');
            l["default"](f instanceof HTMLInputElement);
            var p = f.checked, g = n.toLowerCase().indexOf(r) > -1, y = (a || g) && (u && h || c && m), b = p || y;
            b && (v = !0), e.classList.toggle("d-none", !b)
        });
        var p = t.querySelector(".js-no-repos-message");
        l["default"](p instanceof HTMLElement), p.classList.toggle("d-none", v)
    }

    var l = r(e), c = r(n), d = function () {
        function e(e, t) {
            var n = [], r = !0, a = !1, i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (u) {
                a = !0, i = u
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a)throw i
                }
            }
            return n
        }

        return function (t, n) {
            if (Array.isArray(t))return t;
            if (Symbol.iterator in Object(t))return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.on("change", ".js-pinned-repos-selection-list input[type=checkbox]", function () {
        var e = this.closest(".js-pinned-repos-selection");
        e.classList.toggle("selected", this.checked), i(e.closest(".js-pinned-repos-selection-list"))
    }), t.on("keyup", ".js-pinned-repos-filter", u), t.on("change", ".js-pinned-repos-filter", u), t.on("search", ".js-pinned-repos-filter", u), t.on("change", ".js-pinned-repo-source", u), document.addEventListener("facebox:reveal", function () {
        var e = document.querySelector("#facebox .js-pinned-repos-settings-fragment");
        if (e) {
            var t = e.getAttribute("data-url");
            l["default"](t, "`data-url` must exist"), e.setAttribute("src", t)
        }
    })
}),define.register("sortablejs"),function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(e) : "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = e() : "undefined" != typeof Package ? Sortable = e() : window.Sortable = e()
}(function () {
    "use strict";
    function e(e, t) {
        if (!e || !e.nodeType || 1 !== e.nodeType)throw"Sortable: `el` must be HTMLElement, and not " + {}.toString.call(e);
        this.el = e, this.options = t = g({}, t), e[R] = this;
        var n = {
            group: Math.random(),
            sort: !0,
            disabled: !1,
            store: null,
            handle: null,
            scroll: !0,
            scrollSensitivity: 30,
            scrollSpeed: 10,
            draggable: /[uo]l/i.test(e.nodeName) ? "li" : ">*",
            ghostClass: "sortable-ghost",
            chosenClass: "sortable-chosen",
            ignore: "a, img",
            filter: null,
            animation: 0,
            setData: function (e, t) {
                e.setData("Text", t.textContent)
            },
            dropBubble: !1,
            dragoverBubble: !1,
            dataIdAttr: "data-id",
            delay: 0,
            forceFallback: !1,
            fallbackClass: "sortable-fallback",
            fallbackOnBody: !1
        };
        for (var r in n)!(r in t) && (t[r] = n[r]);
        Y(t);
        for (var i in this)"_" === i.charAt(0) && (this[i] = this[i].bind(this));
        this.nativeDraggable = t.forceFallback ? !1 : B, a(e, "mousedown", this._onTapStart), a(e, "touchstart", this._onTapStart), this.nativeDraggable && (a(e, "dragover", this), a(e, "dragenter", this)), $.push(this._onDragOver), t.store && this.sort(t.store.get(this))
    }

    function t(e) {
        w && w.state !== e && (s(w, "display", e ? "none" : ""), !e && w.state && L.insertBefore(w, y), w.state = e)
    }

    function n(e, t, n) {
        if (e) {
            n = n || O, t = t.split(".");
            var r = t.shift().toUpperCase(), a = new RegExp("\\s(" + t.join("|") + ")(?=\\s)", "g");
            do if (">*" === r && e.parentNode === n || ("" === r || e.nodeName.toUpperCase() == r) && (!t.length || ((" " + e.className + " ").match(a) || []).length == t.length))return e; while (e !== n && (e = e.parentNode))
        }
        return null
    }

    function r(e) {
        e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.preventDefault()
    }

    function a(e, t, n) {
        e.addEventListener(t, n, !1)
    }

    function i(e, t, n) {
        e.removeEventListener(t, n, !1)
    }

    function o(e, t, n) {
        if (e)if (e.classList) e.classList[n ? "add" : "remove"](t); else {
            var r = (" " + e.className + " ").replace(P, " ").replace(" " + t + " ", " ");
            e.className = (r + (n ? " " + t : "")).replace(P, " ")
        }
    }

    function s(e, t, n) {
        var r = e && e.style;
        if (r) {
            if (void 0 === n)return O.defaultView && O.defaultView.getComputedStyle ? n = O.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), void 0 === t ? n : n[t];
            t in r || (t = "-webkit-" + t), r[t] = n + ("string" == typeof n ? "" : "px")
        }
    }

    function u(e, t, n) {
        if (e) {
            var r = e.getElementsByTagName(t), a = 0, i = r.length;
            if (n)for (; i > a; a++)n(r[a], a);
            return r
        }
        return []
    }

    function l(e, t, n, r, a, i, o) {
        var s = O.createEvent("Event"), u = (e || t[R]).options, l = "on" + n.charAt(0).toUpperCase() + n.substr(1);
        s.initEvent(n, !0, !0), s.to = t, s.from = a || t, s.item = r || t, s.clone = w, s.oldIndex = i, s.newIndex = o, t.dispatchEvent(s), u[l] && u[l].call(e, s)
    }

    function c(e, t, n, r, a, i) {
        var o, s, u = e[R], l = u.options.onMove;
        return o = O.createEvent("Event"), o.initEvent("move", !0, !0), o.to = t, o.from = e, o.dragged = n, o.draggedRect = r, o.related = a || t, o.relatedRect = i || t.getBoundingClientRect(), e.dispatchEvent(o), l && (s = l.call(u, o)), s
    }

    function d(e) {
        e.draggable = !1
    }

    function f() {
        U = !1
    }

    function h(e, t) {
        var n = e.lastElementChild, r = n.getBoundingClientRect();
        return (t.clientY - (r.top + r.height) > 5 || t.clientX - (r.right + r.width) > 5) && n
    }

    function m(e) {
        for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--;)r += t.charCodeAt(n);
        return r.toString(36)
    }

    function v(e) {
        var t = 0;
        if (!e || !e.parentNode)return -1;
        for (; e && (e = e.previousElementSibling);)"TEMPLATE" !== e.nodeName.toUpperCase() && t++;
        return t
    }

    function p(e, t) {
        var n, r;
        return function () {
            void 0 === n && (n = arguments, r = this, setTimeout(function () {
                1 === n.length ? e.call(r, n[0]) : e.apply(r, n), n = void 0
            }, t))
        }
    }

    function g(e, t) {
        if (e && t)for (var n in t)t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
    }

    var y, b, j, w, L, S, x, k, E, _, T, q, M, C, A, H, I, D = {}, P = /\s+/g, R = "Sortable" + (new Date).getTime(), N = window, O = N.document, F = N.parseInt, B = !!("draggable" in O.createElement("div")), z = function (e) {
        return e = O.createElement("x"), e.style.cssText = "pointer-events:auto", "auto" === e.style.pointerEvents
    }(), U = !1, W = Math.abs, $ = ([].slice, []), V = p(function (e, t, n) {
        if (n && t.scroll) {
            var r, a, i, o, s = t.scrollSensitivity, u = t.scrollSpeed, l = e.clientX, c = e.clientY, d = window.innerWidth, f = window.innerHeight;
            if (k !== n && (x = t.scroll, k = n, x === !0)) {
                x = n;
                do if (x.offsetWidth < x.scrollWidth || x.offsetHeight < x.scrollHeight)break; while (x = x.parentNode)
            }
            x && (r = x, a = x.getBoundingClientRect(), i = (W(a.right - l) <= s) - (W(a.left - l) <= s), o = (W(a.bottom - c) <= s) - (W(a.top - c) <= s)), i || o || (i = (s >= d - l) - (s >= l), o = (s >= f - c) - (s >= c), (i || o) && (r = N)), (D.vx !== i || D.vy !== o || D.el !== r) && (D.el = r, D.vx = i, D.vy = o, clearInterval(D.pid), r && (D.pid = setInterval(function () {
                r === N ? N.scrollTo(N.pageXOffset + i * u, N.pageYOffset + o * u) : (o && (r.scrollTop += o * u), i && (r.scrollLeft += i * u))
            }, 24)))
        }
    }, 30), Y = function (e) {
        var t = e.group;
        t && "object" == typeof t || (t = e.group = {name: t}), ["pull", "put"].forEach(function (e) {
            e in t || (t[e] = !0)
        }), e.groups = " " + t.name + (t.put.join ? " " + t.put.join(" ") : "") + " "
    };
    return e.prototype = {
        constructor: e, _onTapStart: function (e) {
            var t = this, r = this.el, a = this.options, i = e.type, o = e.touches && e.touches[0], s = (o || e).target, u = s, c = a.filter;
            if (!("mousedown" === i && 0 !== e.button || a.disabled) && (s = n(s, a.draggable, r))) {
                if (q = v(s), "function" == typeof c) {
                    if (c.call(this, e, s, this))return l(t, u, "filter", s, r, q), void e.preventDefault()
                } else if (c && (c = c.split(",").some(function (e) {
                        return e = n(u, e.trim(), r), e ? (l(t, e, "filter", s, r, q), !0) : void 0
                    })))return void e.preventDefault();
                (!a.handle || n(u, a.handle, r)) && this._prepareDragStart(e, o, s)
            }
        }, _prepareDragStart: function (e, t, n) {
            var r, i = this, s = i.el, l = i.options, c = s.ownerDocument;
            n && !y && n.parentNode === s && (A = e, L = s, y = n, b = y.parentNode, S = y.nextSibling, C = l.group, r = function () {
                i._disableDelayedDrag(), y.draggable = !0, o(y, i.options.chosenClass, !0), i._triggerDragStart(t)
            }, l.ignore.split(",").forEach(function (e) {
                u(y, e.trim(), d)
            }), a(c, "mouseup", i._onDrop), a(c, "touchend", i._onDrop), a(c, "touchcancel", i._onDrop), l.delay ? (a(c, "mouseup", i._disableDelayedDrag), a(c, "touchend", i._disableDelayedDrag), a(c, "touchcancel", i._disableDelayedDrag), a(c, "mousemove", i._disableDelayedDrag), a(c, "touchmove", i._disableDelayedDrag), i._dragStartTimer = setTimeout(r, l.delay)) : r())
        }, _disableDelayedDrag: function () {
            var e = this.el.ownerDocument;
            clearTimeout(this._dragStartTimer), i(e, "mouseup", this._disableDelayedDrag), i(e, "touchend", this._disableDelayedDrag), i(e, "touchcancel", this._disableDelayedDrag), i(e, "mousemove", this._disableDelayedDrag), i(e, "touchmove", this._disableDelayedDrag)
        }, _triggerDragStart: function (e) {
            e ? (A = {
                target: y,
                clientX: e.clientX,
                clientY: e.clientY
            }, this._onDragStart(A, "touch")) : this.nativeDraggable ? (a(y, "dragend", this), a(L, "dragstart", this._onDragStart)) : this._onDragStart(A, !0);
            try {
                O.selection ? O.selection.empty() : window.getSelection().removeAllRanges()
            } catch (t) {
            }
        }, _dragStarted: function () {
            L && y && (o(y, this.options.ghostClass, !0), e.active = this, l(this, L, "start", y, L, q))
        }, _emulateDragOver: function () {
            if (H) {
                if (this._lastX === H.clientX && this._lastY === H.clientY)return;
                this._lastX = H.clientX, this._lastY = H.clientY, z || s(j, "display", "none");
                var e = O.elementFromPoint(H.clientX, H.clientY), t = e, n = " " + this.options.group.name, r = $.length;
                if (t)do {
                    if (t[R] && t[R].options.groups.indexOf(n) > -1) {
                        for (; r--;)$[r]({clientX: H.clientX, clientY: H.clientY, target: e, rootEl: t});
                        break
                    }
                    e = t
                } while (t = t.parentNode);
                z || s(j, "display", "")
            }
        }, _onTouchMove: function (t) {
            if (A) {
                e.active || this._dragStarted(), this._appendGhost();
                var n = t.touches ? t.touches[0] : t, r = n.clientX - A.clientX, a = n.clientY - A.clientY, i = t.touches ? "translate3d(" + r + "px," + a + "px,0)" : "translate(" + r + "px," + a + "px)";
                I = !0, H = n, s(j, "webkitTransform", i), s(j, "mozTransform", i), s(j, "msTransform", i), s(j, "transform", i), t.preventDefault()
            }
        }, _appendGhost: function () {
            if (!j) {
                var e, t = y.getBoundingClientRect(), n = s(y), r = this.options;
                j = y.cloneNode(!0), o(j, r.ghostClass, !1), o(j, r.fallbackClass, !0), s(j, "top", t.top - F(n.marginTop, 10)), s(j, "left", t.left - F(n.marginLeft, 10)), s(j, "width", t.width), s(j, "height", t.height), s(j, "opacity", "0.8"), s(j, "position", "fixed"), s(j, "zIndex", "100000"), s(j, "pointerEvents", "none"), r.fallbackOnBody && O.body.appendChild(j) || L.appendChild(j), e = j.getBoundingClientRect(), s(j, "width", 2 * t.width - e.width), s(j, "height", 2 * t.height - e.height)
            }
        }, _onDragStart: function (e, t) {
            var n = e.dataTransfer, r = this.options;
            this._offUpEvents(), "clone" == C.pull && (w = y.cloneNode(!0), s(w, "display", "none"), L.insertBefore(w, y)), t ? ("touch" === t ? (a(O, "touchmove", this._onTouchMove), a(O, "touchend", this._onDrop), a(O, "touchcancel", this._onDrop)) : (a(O, "mousemove", this._onTouchMove), a(O, "mouseup", this._onDrop)), this._loopId = setInterval(this._emulateDragOver, 50)) : (n && (n.effectAllowed = "move", r.setData && r.setData.call(this, n, y)), a(O, "drop", this), setTimeout(this._dragStarted, 0))
        }, _onDragOver: function (e) {
            var r, a, i, o = this.el, u = this.options, l = u.group, d = l.put, m = C === l, v = u.sort;
            if (void 0 !== e.preventDefault && (e.preventDefault(), !u.dragoverBubble && e.stopPropagation()), I = !0, C && !u.disabled && (m ? v || (i = !L.contains(y)) : C.pull && d && (C.name === l.name || d.indexOf && ~d.indexOf(C.name))) && (void 0 === e.rootEl || e.rootEl === this.el)) {
                if (V(e, u, this.el), U)return;
                if (r = n(e.target, u.draggable, o), a = y.getBoundingClientRect(), i)return t(!0), void(w || S ? L.insertBefore(y, w || S) : v || L.appendChild(y));
                if (0 === o.children.length || o.children[0] === j || o === e.target && (r = h(o, e))) {
                    if (r) {
                        if (r.animated)return;
                        g = r.getBoundingClientRect()
                    }
                    t(m), c(L, o, y, a, r, g) !== !1 && (y.contains(o) || (o.appendChild(y), b = o), this._animate(a, y), r && this._animate(g, r))
                } else if (r && !r.animated && r !== y && void 0 !== r.parentNode[R]) {
                    E !== r && (E = r, _ = s(r), T = s(r.parentNode));
                    var p, g = r.getBoundingClientRect(), x = g.right - g.left, k = g.bottom - g.top, q = /left|right|inline/.test(_.cssFloat + _.display) || "flex" == T.display && 0 === T["flex-direction"].indexOf("row"), M = r.offsetWidth > y.offsetWidth, A = r.offsetHeight > y.offsetHeight, H = (q ? (e.clientX - g.left) / x : (e.clientY - g.top) / k) > .5, D = r.nextElementSibling, P = c(L, o, y, a, r, g);
                    if (P !== !1) {
                        if (U = !0, setTimeout(f, 30), t(m), 1 === P || -1 === P) p = 1 === P; else if (q) {
                            var N = y.offsetTop, O = r.offsetTop;
                            p = N === O ? r.previousElementSibling === y && !M || H && M : O > N
                        } else p = D !== y && !A || H && A;
                        y.contains(o) || (p && !D ? o.appendChild(y) : r.parentNode.insertBefore(y, p ? D : r)), b = y.parentNode, this._animate(a, y), this._animate(g, r)
                    }
                }
            }
        }, _animate: function (e, t) {
            var n = this.options.animation;
            if (n) {
                var r = t.getBoundingClientRect();
                s(t, "transition", "none"), s(t, "transform", "translate3d(" + (e.left - r.left) + "px," + (e.top - r.top) + "px,0)"), t.offsetWidth, s(t, "transition", "all " + n + "ms"), s(t, "transform", "translate3d(0,0,0)"), clearTimeout(t.animated), t.animated = setTimeout(function () {
                    s(t, "transition", ""), s(t, "transform", ""), t.animated = !1
                }, n)
            }
        }, _offUpEvents: function () {
            var e = this.el.ownerDocument;
            i(O, "touchmove", this._onTouchMove), i(e, "mouseup", this._onDrop), i(e, "touchend", this._onDrop), i(e, "touchcancel", this._onDrop)
        }, _onDrop: function (t) {
            var n = this.el, r = this.options;
            clearInterval(this._loopId), clearInterval(D.pid), clearTimeout(this._dragStartTimer), i(O, "mousemove", this._onTouchMove), this.nativeDraggable && (i(O, "drop", this), i(n, "dragstart", this._onDragStart)), this._offUpEvents(), t && (I && (t.preventDefault(), !r.dropBubble && t.stopPropagation()), j && j.parentNode.removeChild(j), y && (this.nativeDraggable && i(y, "dragend", this), d(y), o(y, this.options.ghostClass, !1), o(y, this.options.chosenClass, !1), L !== b ? (M = v(y), M >= 0 && (l(null, b, "sort", y, L, q, M), l(this, L, "sort", y, L, q, M), l(null, b, "add", y, L, q, M), l(this, L, "remove", y, L, q, M))) : (w && w.parentNode.removeChild(w), y.nextSibling !== S && (M = v(y), M >= 0 && (l(this, L, "update", y, L, q, M), l(this, L, "sort", y, L, q, M)))), e.active && ((null === M || -1 === M) && (M = q), l(this, L, "end", y, L, q, M), this.save())), L = y = b = j = S = w = x = k = A = H = I = M = E = _ = C = e.active = null)
        }, handleEvent: function (e) {
            var t = e.type;
            "dragover" === t || "dragenter" === t ? y && (this._onDragOver(e), r(e)) : ("drop" === t || "dragend" === t) && this._onDrop(e)
        }, toArray: function () {
            for (var e, t = [], r = this.el.children, a = 0, i = r.length, o = this.options; i > a; a++)e = r[a], n(e, o.draggable, this.el) && t.push(e.getAttribute(o.dataIdAttr) || m(e));
            return t
        }, sort: function (e) {
            var t = {}, r = this.el;
            this.toArray().forEach(function (e, a) {
                var i = r.children[a];
                n(i, this.options.draggable, r) && (t[e] = i)
            }, this), e.forEach(function (e) {
                t[e] && (r.removeChild(t[e]), r.appendChild(t[e]))
            })
        }, save: function () {
            var e = this.options.store;
            e && e.set(this)
        }, closest: function (e, t) {
            return n(e, t || this.options.draggable, this.el)
        }, option: function (e, t) {
            var n = this.options;
            return void 0 === t ? n[e] : (n[e] = t, void("group" === e && Y(n)))
        }, destroy: function () {
            var e = this.el;
            e[R] = null, i(e, "mousedown", this._onTapStart), i(e, "touchstart", this._onTapStart), this.nativeDraggable && (i(e, "dragover", this), i(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function (e) {
                e.removeAttribute("draggable")
            }), $.splice($.indexOf(this._onDragOver), 1), this._onDrop(), this.el = e = null
        }
    }, e.utils = {
        on: a, off: i, css: s, find: u, is: function (e, t) {
            return !!n(e, t, e)
        }, extend: g, throttle: p, closest: n, toggleClass: o, index: v
    }, e.create = function (t, n) {
        return new e(t, n)
    }, e.version = "1.4.2", e
}),define.registerEnd(),define("github/legacy/pages/users/pinned-repository-reordering", ["delegated-events", "../../../fetch", "../../../observe", "sortablejs"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        var t = e.item, n = e.oldIndex;
        l = t.parentNode.children[n + 1]
    }

    function o(e) {
        var n = e.oldIndex, r = e.newIndex, a = e.item;
        if (n !== r) {
            var i = a.closest(".js-pinned-repos-reorder-form"), o = i.closest(".js-pinned-repos-reorder-container"), s = o.querySelector(".js-pinned-repos-spinner"), c = o.querySelector(".js-pinned-repos-reorder-error");
            c.textContent = "", s.style.display = "inline-block", u.option("disabled", !0), t.fetchText(i.action, {
                method: i.method,
                body: new FormData(i)
            })["catch"](function () {
                c.textContent = "Something went wrong.";
                var e = a.parentNode;
                l ? e.insertBefore(a, l) : e.appendChild(a)
            }).then(function () {
                s.style.display = "none", u.option("disabled", !1)
            })
        }
    }

    var s = a(r), u = null, l = null;
    n.observe(".js-pinned-repos-reorder-list", function (e) {
        u = s["default"].create(e, {
            animation: 150,
            item: ".js-pinned-repo-list-item",
            handle: ".js-pinned-repository-reorder",
            onUpdate: o,
            onStart: i,
            chosenClass: "is-dragging"
        })
    }), e.on("submit", ".js-pinned-repos-reorder-form", function (e) {
        e.preventDefault()
    })
}),define("github/legacy/pages/users/profile-sidebar", ["../../../typecast", "../../../observe"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e);
    t.observe(".js-user-profile-sticky-fields.is-stuck", function () {
        var e = r["default"](document.querySelector(".js-user-profile-sticky-bar"), HTMLElement);
        return {
            add: function () {
                e.classList.add("is-stuck")
            }, remove: function () {
                e.classList.remove("is-stuck")
            }
        }
    }), t.observe(".js-user-profile-follow-button.is-stuck", function () {
        var e = r["default"](document.querySelector(".js-user-profile-sticky-bar"), HTMLElement);
        return {
            add: function () {
                e.classList.add("is-follow-stuck")
            }, remove: function () {
                e.classList.remove("is-follow-stuck")
            }
        }
    }), t.observe(".js-user-profile-following-toggle .js-toggler-container.on", function () {
        var e = r["default"](document.querySelector(".js-user-profile-following-mini-toggle .js-toggler-container"), HTMLElement);
        return {
            add: function () {
                e.classList.add("on")
            }, remove: function () {
                e.classList.remove("on")
            }
        }
    }), t.observe(".js-user-profile-following-mini-toggle .js-toggler-container.on", function () {
        var e = r["default"](document.querySelector(".js-user-profile-following-toggle .js-toggler-container"), HTMLElement);
        return {
            add: function () {
                e.classList.add("on")
            }, remove: function () {
                e.classList.remove("on")
            }
        }
    })
}),define("github/legacy/pages/wiki", ["../../fetch", "../../document-ready", "../../jquery", "invariant", "../../sso"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var o = i(n), s = i(r), u = i(a);
    t.ready.then(function () {
        function t() {
            var r = document.getElementById("current-version");
            s["default"](r instanceof HTMLInputElement);
            var a = r.value;
            a && u["default"]().then(function () {
                e.fetchText("_current").then(function (e) {
                    if (a == e) setTimeout(t, 5e3); else if (!n) {
                        var r = document.getElementById("gollum-error-message");
                        r && (r.textContent = "Someone has edited the wiki since you started. Please reload this page and re-apply your changes.", r.style.display = "block"), o["default"]("#gollum-editor-submit").attr("disabled", "disabled"), o["default"]("#gollum-editor-submit").attr("value", "Cannot Save, Someone Else Has Edited")
                    }
                })
            })
        }

        var n = !1;
        o["default"]("#gollum-editor-body").each(t), o["default"]("#gollum-editor-submit").click(function () {
            n = !0
        })
    })
}),define("github/legacy/index", ["./behaviors/ajax-pagination", "./behaviors/ajax_error", "./behaviors/ajax_loading", "./behaviors/analytics", "./behaviors/autocheck", "./behaviors/autocomplete", "./behaviors/autosearch_form", "./behaviors/autosubmit", "./behaviors/billing/addons", "./behaviors/billing/credit_card_fields", "./behaviors/billing/payment_methods", "./behaviors/browser-features-stats", "./behaviors/bundle-download-stats", "./behaviors/buttons", "./behaviors/check_all", "./behaviors/clippable_behavior", "./behaviors/commenting/ajax", "./behaviors/commenting/close", "./behaviors/commenting/edit", "./behaviors/commenting/focus", "./behaviors/commenting/markdown-toolbar", "./behaviors/commenting/preview", "./behaviors/conversation-anchor-stats", "./behaviors/crop_avatar", "./behaviors/dirty_menus", "./behaviors/disable", "./behaviors/facebox", "./behaviors/facebox-button", "./behaviors/filterable", "./behaviors/flash", "./behaviors/focus_delay", "./behaviors/g-emoji-element", "./behaviors/issue-references", "./behaviors/js-immediate-updates", "./behaviors/labeled_button", "./behaviors/minibutton_accessibility", "./behaviors/notice", "./behaviors/permalink", "./behaviors/pjax", "./behaviors/pjax-loader", "./behaviors/pjax/beforeunload", "./behaviors/pjax/exceptions", "./behaviors/pjax/head", "./behaviors/pjax_timing", "./behaviors/print_popup", "./behaviors/quick_submit", "./behaviors/quicksearch", "./behaviors/quote-markdown-selection", "./behaviors/quote_selection", "./behaviors/reactions", "./behaviors/removed_contents", "./behaviors/repo-list", "./behaviors/session-resume", "./behaviors/size_to_fit", "./behaviors/social", "./behaviors/socket_channel", "./behaviors/stale_session", "./behaviors/suggester", "./behaviors/survey", "./behaviors/tag_input", "./behaviors/team-members", "./behaviors/timeline_marker", "./behaviors/timeline_progressive_disclosure", "./behaviors/unread_comments", "./behaviors/unread_item_counter", "./behaviors/user_content", "./behaviors/user_resize", "./behaviors/will-transition-once", "./graphs/calendar-sample", "./graphs/network", "./pages/account_membership", "./pages/audit_log", "./pages/billing_settings/coupon_redemption", "./pages/billing_settings/survey", "./pages/blob", "./pages/blob/blob_edit", "./pages/blob/csv", "./pages/codesearch/advanced_search", "./pages/commits", "./pages/compare", "./pages/diffs/expander", "./pages/diffs/line-comments", "./pages/diffs/line-highlight", "./pages/diffs/linkable-line-number", "./pages/diffs/prose_diff", "./pages/diffs/split", "./pages/diffs/toggle-file-notes", "./pages/diffs/tr-collapsing", "./pages/directory", "./pages/early_access_tracking", "./pages/edit_repositories/options", "./pages/edit_repositories/repository-collabs", "./pages/edit_repositories/repository-options", "./pages/editors/render", "./pages/explore", "./pages/files/ref_create", "./pages/files/repo_next", "./pages/generated_pages/theme_picker", "./pages/gist/drag_drop", "./pages/gist/gist_edit", "./pages/gist/task_lists", "./pages/header", "./pages/hooks", "./pages/integrations", "./pages/issues/filters", "./pages/issues/label_editor", "./pages/issues/labels", "./pages/issues/legacy", "./pages/issues/list", "./pages/issues/replies", "./pages/issues/sidebar", "./pages/issues/triage", "./pages/milestones", "./pages/notifications", "./pages/notifications/subscriptions", "./pages/oauth", "./pages/orgs", "./pages/orgs/invitations/new", "./pages/orgs/invitations/reinstate", "./pages/orgs/members/change-role", "./pages/orgs/members/index", "./pages/orgs/members/show", "./pages/orgs/migration/customize_member_privileges", "./pages/orgs/migration/index", "./pages/orgs/new", "./pages/orgs/per_seat", "./pages/orgs/repositories/index", "./pages/orgs/repositories/permission-select", "./pages/orgs/security_settings/index", "./pages/orgs/settings/change-default-repository-permission", "./pages/orgs/settings/security", "./pages/orgs/team", "./pages/orgs/teams/change-visibility", "./pages/orgs/teams/import", "./pages/orgs/teams/index", "./pages/orgs/teams/new", "./pages/orgs/teams/show", "./pages/orgs/transform", "./pages/pages_composer", "./pages/pull_requests/composer", "./pages/pull_requests/discussion-timeline-regrouping", "./pages/pull_requests/merge", "./pages/pull_requests/merging_error", "./pages/pull_requests/restore_branch", "./pages/pulls/show", "./pages/repositories/fork", "./pages/repositories/pulse", "./pages/repositories/repo_new", "./pages/repositories/side_navigation", "./pages/repository_imports/show", "./pages/sessions/two_factor", "./pages/settings/user/saved-replies", "./pages/settings/user/settings", "./pages/settings/user/user_sessions", "./pages/signup", "./pages/site-search", "./pages/site/contact", "./pages/site/features", "./pages/site/header_notifications", "./pages/site/keyboard_shortcuts", "./pages/site_status", "./pages/stafftools/ldap", "./pages/tree_finder", "./pages/users/contributions", "./pages/users/pinned-repositories", "./pages/users/pinned-repository-reordering", "./pages/users/profile-sidebar", "./pages/wiki"], function () {
}),define("github/length-limited-input-with-warning", ["./observe"], function (e) {
    function t() {
        var e = this, t = parseInt(e.getAttribute("data-input-max-length"), 10), n = e.value, r = n.replace(/(\r\n|\n|\r)/g, "\r\n"), a = t - r.length;
        0 >= a && (e.value = r.substr(0, t), a = 0);
        var i = e.getAttribute("data-warning-text"), o = e.closest(".js-length-limited-input-container"), s = o.querySelector(".js-length-limited-input-warning");
        5 >= a ? (s.textContent = i.replace(new RegExp("{{remaining}}", "g"), a), s.classList.remove("d-none")) : (s.textContent = "", s.classList.add("d-none"))
    }

    e.observe(".js-length-limited-input", {
        add: function (e) {
            e.addEventListener("input", t), e.addEventListener("change", t)
        }, remove: function (e) {
            e.removeEventListener("input", t), e.removeEventListener("change", t)
        }
    })
}),define("github/link-prefetch-viewed", ["./observe"], function (e) {
    e.observe("link[rel=prefetch-viewed]", {
        init: function () {
            requestIdleCallback(function () {
                fetch(location.href, {
                    method: "HEAD",
                    credentials: "same-origin",
                    headers: {Purpose: "prefetch-viewed"}
                })
            })
        }
    })
}),define("github/marketplace/callouts", ["../jquery", "../typecast"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e), a = n(t);
    r["default"](document).on("ajaxSuccess", ".js-dismiss-marketplace-callout", function (e) {
        var t = a["default"](e.target.closest(".js-marketplace-callout-container"), HTMLElement);
        t.remove()
    })
}),define("github/marketplace/supported-languages", ["exports", "../typecast", "invariant", "delegated-events"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        var t = Array.from(e.querySelectorAll("input:checked")), n = t.map(function (e) {
            return s["default"](e, HTMLInputElement).value
        });
        return n.filter(function (e) {
            return e.length > 0
        })
    }

    function o(e, t) {
        u["default"](e instanceof HTMLElement);
        var n = s["default"](e.querySelector(".js-preview-supported-languages-button"), HTMLButtonElement), r = s["default"](e.querySelector(".js-no-supported-languages-container"), HTMLElement);
        t.length > 0 ? (n.textContent = t.join(", "),
            r.classList.add("d-none"), n.classList.remove("d-none")) : (n.classList.add("d-none"), r.classList.remove("d-none"))
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.selectedLanguageNames = i;
    var s = a(t), u = a(n);
    r.on("selectmenu:selected", ".js-languages-select-menu", function () {
        var e = s["default"](this, HTMLElement), t = i(e);
        o(e, t)
    })
}),define("github/marketplace/edit", ["../jquery", "sortablejs", "../typecast", "../fetch", "invariant", "../observe", "delegated-events", "../onfocus", "./supported-languages", "../form"], function (e, t, n, r, a, i, o, s, u, l) {
    function c(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function d(e, t) {
        var n = e.sort(), r = t.sort();
        return n.length === r.length && n.every(function (e, t) {
                return e === r[t]
            })
    }

    function f(e) {
        var t = e.closest(".js-marketplace-listing-form-container"), n = t.querySelector(".js-marketplace-listing-error-container");
        n.classList.remove("visible")
    }

    function h(e, t) {
        var n = L["default"](e.closest(".js-marketplace-listing-form-container"), HTMLElement), r = L["default"](n.querySelector(".js-marketplace-listing-error-container"), HTMLElement);
        r.classList.add("visible");
        var a = L["default"](r.querySelector(".js-marketplace-listing-error"), HTMLElement);
        a.textContent = t
    }

    function m(e) {
        var t = e.querySelector(".js-marketplace-listing-save-notice");
        t && (t.classList.add("visible"), setTimeout(function () {
            return t.classList.remove("visible")
        }, 1500))
    }

    function v(e) {
        var t = e.querySelector(".js-marketplace-listing-save-error");
        t && (t.classList.add("visible"), setTimeout(function () {
            return t.classList.remove("visible")
        }, 1500))
    }

    function p(e, t) {
        var n = e.querySelector(".js-marketplace-listing-bgcolor");
        n && (n.style.backgroundColor = "#" + t)
    }

    function g(e) {
        return "function" == typeof TextEncoder ? new TextEncoder("utf-8").encode(e).length : ~-encodeURI(e).split(/%..|./).length
    }

    function y(e, t, n) {
        S["default"](n instanceof HTMLElement);
        var r = L["default"](n.closest(".js-listing-characters-remaining-container"), HTMLElement), a = L["default"](r.querySelector(".js-listing-characters-remaining"), HTMLElement), i = String(a.getAttribute("data-suffix")), o = g(e), s = t - o;
        a.textContent = s + " " + i, a.classList.toggle("text-red", 5 >= s)
    }

    function b(e) {
        var t = e.item;
        t.setAttribute("data-old-index", e.oldIndex);
        var n = t.querySelector(".js-marketplace-listing-screenshot-resequence-form"), r = n.elements.namedItem("marketplace_listing_screenshot[previousScreenshotId]"), a = t.previousElementSibling;
        a ? r.value = a.getAttribute("data-screenshot-id") : r.value = "", l.submit(n)
    }

    var j = c(e), w = c(t), L = c(n), S = c(a);
    o.on("click", ".js-marketplace-error-dismiss", function () {
        f(this)
    }), j["default"](document).on("ajaxSend", ".js-marketplace-listing-form", function () {
        f(this)
    }), j["default"](document).on("ajaxSuccess", ".js-marketplace-listing-form", function (e, t, n, r) {
        if (r) {
            if (r.path) {
                var a = window.location.pathname, i = r.path;
                if (a !== i)return void(window.location.href = i)
            }
            r.bgcolor && p(this, r.bgcolor)
        }
        m(this)
    }), j["default"](document).on("ajaxError", ".js-marketplace-listing-form", function (e, t) {
        t.responseJSON && t.responseJSON.error && (e.preventDefault(), h(this, t.responseJSON.error))
    }), j["default"](document).on("ajaxSend", ".js-marketplace-listing-screenshot-resequence-form", function () {
        f(this)
    }), j["default"](document).on("ajaxSuccess", ".js-marketplace-listing-screenshot-resequence-form", function () {
        var e = L["default"](this.parentElement, HTMLElement);
        e.removeAttribute("data-old-index")
    }), j["default"](document).on("ajaxError", ".js-marketplace-listing-screenshot-resequence-form", function (e) {
        var t = L["default"](this.parentElement, HTMLElement), n = parseInt(t.getAttribute("data-old-index"), 10), r = L["default"](t.parentElement, HTMLElement);
        r.removeChild(t), r.children[n] ? r.insertBefore(t, r.children[n]) : r.appendChild(t), e.preventDefault(), h(this, "Error updating screenshot sequence, please try again later.")
    }), j["default"](document).on("ajaxSuccess", ".js-marketplace-listing-screenshot-update-form", function () {
        var e = L["default"](this.querySelector(".js-marketplace-listing-screenshot-caption-field"), HTMLInputElement), t = L["default"](this.querySelector(".js-marketplace-listing-screenshot-caption-present"), HTMLElement), n = L["default"](this.querySelector(".js-marketplace-listing-screenshot-caption-empty"), HTMLElement);
        t.textContent = e.value, e.value.trim().length < 1 ? (t.classList.add("d-none"), n.classList.remove("d-none")) : (t.classList.remove("d-none"), n.classList.add("d-none")), m(this)
    }), j["default"](document).on("ajaxError", ".js-marketplace-listing-screenshot-update-form", function (e) {
        e.preventDefault(), v(this)
    }), j["default"](document).on("ajaxSend", ".js-marketplace-listing-screenshot-delete-form", function () {
        f(this);
        var e = L["default"](this.querySelector(".js-marketplace-listing-screenshot-delete-button"), HTMLButtonElement);
        e.disabled = !0
    }), j["default"](document).on("ajaxError", ".js-marketplace-listing-screenshot-delete-form", function (e, t) {
        t.responseJSON && t.responseJSON.error && (e.preventDefault(), h(this, t.responseJSON.error));
        var n = L["default"](this.querySelector(".js-marketplace-listing-screenshot-delete-button"), HTMLButtonElement);
        n.disabled = !1
    }), j["default"](document).on("ajaxSuccess", ".js-marketplace-listing-screenshot-delete-form", function () {
        var e = L["default"](this.closest(".js-marketplace-listing-screenshot-container"), HTMLElement);
        e.remove()
    }), s.onInput("textarea.js-listing-characters-remaining-field", function (e) {
        var t = L["default"](e.target, HTMLTextAreaElement), n = parseInt(t.getAttribute("data-character-limit"), 10);
        y(t.value, n, t)
    }), s.onInput("input.js-listing-characters-remaining-field", function (e) {
        var t = L["default"](e.target, HTMLInputElement), n = t.maxLength;
        y(t.value, n, t)
    }), o.on("menu:deactivate", ".js-edit-marketplace-listing-supported-languages .js-select-menu", function () {
        var e = L["default"](this, HTMLElement), t = e.getAttribute("data-supported-language-names") || "", n = t.split(","), a = u.selectedLanguageNames(e), i = L["default"](e.closest("form"), HTMLFormElement), o = !d(n, a);
        if (o) {
            if (0 === a.length) {
                var s = L["default"](e.querySelector(".js-no-selected-languages"), HTMLInputElement);
                s.checked = !0
            }
            r.fetchJSON(i.action, {method: i.method, body: new FormData(i)}).then(function () {
                e.setAttribute("data-supported-language-names", a.toString()), m(i)
            })["catch"](function () {
                h(i, "Something went wrong")
            })
        }
    }), i.observe(".js-draggable-screenshots-container", function (e) {
        w["default"].create(e, {animation: 150, draggable: ".js-draggable-screenshot", onUpdate: b})
    })
}),define("github/marketplace/edit-pricing", ["../typecast", "delegated-events"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e, t) {
        var n = a["default"](t.querySelector(".js-marketplace-plan-name"), HTMLElement), r = a["default"](e.querySelector(".js-marketplace-plan-name-field"), HTMLInputElement).value;
        n.textContent = r;
        var i = a["default"](e.querySelector(".js-marketplace-edit-price-model"), HTMLSelectElement).value, o = t.querySelectorAll(".js-marketplace-plan-unit-name"), s = a["default"](t.querySelector(".js-marketplace-plan-per-unit-info"), HTMLElement);
        if ("PER_UNIT" === i) {
            var u = a["default"](e.querySelector(".js-marketplace-plan-unit-name-field"), HTMLInputElement).value, l = !0, c = !1, d = void 0;
            try {
                for (var f, h = o[Symbol.iterator](); !(l = (f = h.next()).done); l = !0) {
                    var m = f.value;
                    m.textContent = u, m.classList.remove("d-none")
                }
            } catch (v) {
                c = !0, d = v
            } finally {
                try {
                    !l && h["return"] && h["return"]()
                } finally {
                    if (c)throw d
                }
            }
            s.classList.remove("d-none")
        } else {
            var p = !0, g = !1, y = void 0;
            try {
                for (var b, j = o[Symbol.iterator](); !(p = (b = j.next()).done); p = !0) {
                    var w = b.value;
                    w.classList.add("d-none")
                }
            } catch (v) {
                g = !0, y = v
            } finally {
                try {
                    !p && j["return"] && j["return"]()
                } finally {
                    if (g)throw y
                }
            }
            s.classList.add("d-none")
        }
        if ("FREE" === i) {
            var L = t.querySelectorAll(".js-marketplace-plan-dollars-container"), S = !0, x = !1, k = void 0;
            try {
                for (var E, _ = L[Symbol.iterator](); !(S = (E = _.next()).done); S = !0) {
                    var T = E.value;
                    T.classList.add("d-none")
                }
            } catch (v) {
                x = !0, k = v
            } finally {
                try {
                    !S && _["return"] && _["return"]()
                } finally {
                    if (x)throw k
                }
            }
        } else {
            var q = a["default"](t.querySelector(".js-marketplace-plan-monthly-dollars"), HTMLElement), M = a["default"](e.querySelector(".js-marketplace-plan-monthly-price-field"), HTMLInputElement).value;
            q.textContent = M;
            var C = a["default"](q.closest(".js-marketplace-plan-dollars-container"), HTMLElement);
            C.classList.remove("d-none");
            var A = a["default"](t.querySelector(".js-marketplace-plan-yearly-dollars"), HTMLElement), H = a["default"](e.querySelector(".js-marketplace-plan-yearly-price-field"), HTMLInputElement).value;
            A.textContent = H;
            var I = a["default"](A.closest(".js-marketplace-plan-dollars-container"), HTMLElement);
            I.classList.remove("d-none")
        }
        var D = a["default"](t.querySelector(".js-marketplace-plan-bullets"), HTMLElement);
        D.innerHTML = "";
        var P = e.querySelectorAll(".js-marketplace-plan-bullet-field"), R = a["default"](t.querySelector(".js-marketplace-plan-bullet-template"), HTMLTemplateElement), N = !0, O = !1, F = void 0;
        try {
            for (var B, z = P[Symbol.iterator](); !(N = (B = z.next()).done); N = !0) {
                var U = B.value, W = a["default"](U, HTMLInputElement).value;
                if (!(W.trim().length < 1)) {
                    var $ = R.content.cloneNode(!0), V = a["default"]($.querySelector(".js-marketplace-plan-bullet"), HTMLElement);
                    V.textContent = W, D.appendChild($)
                }
            }
        } catch (v) {
            O = !0, F = v
        } finally {
            try {
                !N && z["return"] && z["return"]()
            } finally {
                if (O)throw F
            }
        }
        var Y = a["default"](t.querySelector(".js-marketplace-plan-description"), HTMLElement), J = a["default"](e.querySelector(".js-marketplace-plan-description-field"), HTMLInputElement).value;
        Y.textContent = J
    }

    var a = n(e);
    t.on("change", "select.js-marketplace-edit-price-model", function () {
        var e = a["default"](this, HTMLSelectElement), t = e.options[e.selectedIndex], n = a["default"](e.closest(".js-marketplace-edit-plan-editor"), HTMLElement), r = t.value, i = String(t.getAttribute("data-note")), o = a["default"](n.querySelector(".js-marketplace-plan-edit-unit-note"), HTMLElement);
        n.setAttribute("data-model", r), o.innerText = i;
        var s = String(e.getAttribute("data-related-input")), u = a["default"](n.querySelector(s), HTMLInputElement);
        u.required = t.hasAttribute("data-related-input-required")
    }), t.on("click", ".js-marketplace-plan-preview-toggle", function () {
        var e = a["default"](this, HTMLButtonElement), t = this.closest(".js-marketplace-edit-plan-container"), n = String(e.getAttribute("data-default-text")), i = String(e.getAttribute("data-toggle-text")), o = a["default"](t.querySelector(".js-marketplace-edit-plan-editor"), HTMLElement), s = a["default"](t.querySelector(".js-marketplace-edit-plan-preview"), HTMLElement);
        s.classList.toggle("d-none"), o.classList.toggle("d-none"), e.innerText === n ? e.innerText = i : e.innerText = n, s.classList.contains("d-none") || r(o, s)
    }), t.on("change", ".js-marketplace-plan-dollar-field", function () {
        var e = a["default"](this, HTMLInputElement), t = a["default"](e.closest(".js-marketplace-plan-dollar-field-container"), HTMLElement);
        t.classList.toggle("is-errored", !e.checkValidity())
    })
}),define("github/marketplace/order", ["../typecast", "../fetch", "invariant", "../onfocus"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var i = a(e), o = a(n);
    r.onInput(".js-marketplace-order-quantity", function (e) {
        var n = i["default"](e.target, HTMLInputElement), r = parseInt(n.value, 10).toFixed(), a = n.getAttribute("data-url");
        o["default"](a, "`data-url` must exist");
        var s = new URL(a, window.location.origin), u = new URLSearchParams(s.search.slice(1));
        u.set("quantity", r), s.search = u.toString(), t.fetchSafeDocumentFragment(document, s).then(function (e) {
            var t = i["default"](document.querySelector(".js-marketplace-order-preview"), HTMLElement);
            t.innerHTML = "", t.appendChild(e)
        })
    })
}),define("github/manage-membership-navigation", ["./observe"], function (e) {
    e.observe(".js-manage-requests-tabs-item", function (e) {
        e.addEventListener("click", function () {
            var e = this.closest(".js-manage-memberships-container");
            e.querySelector(".js-manage-invitations-tabs-item").classList.remove("selected"), this.classList.add("selected");
            var t = e.querySelector(".js-manage-invitations-list"), n = e.querySelector(".js-manage-requests-list");
            t.classList.add("d-none"), n.classList.remove("d-none")
        })
    }), e.observe(".js-manage-invitations-tabs-item", function (e) {
        e.addEventListener("click", function () {
            var e = this.closest(".js-manage-memberships-container");
            e.querySelector(".js-manage-requests-tabs-item").classList.remove("selected"), this.classList.add("selected");
            var t = e.querySelector(".js-manage-requests-list"), n = e.querySelector(".js-manage-invitations-list");
            t.classList.add("d-none"), n.classList.remove("d-none")
        })
    })
}),define("github/milestone-dragging", ["./jquery", "sortablejs", "./debounce", "./fetch", "./has-interactions", "invariant", "./navigation", "./observe", "delegated-events", "./preserve-position", "./form", "./google-analytics", "./sso"], function (e, t, n, r, a, i, o, s, u, l, c, d, f) {
    function h(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function m(e) {
        var t, n;
        return regeneratorRuntime.async(function (i) {
            for (; ;)switch (i.prev = i.next) {
                case 0:
                    if (!a.hasInteractions(e)) {
                        i.next = 2;
                        break
                    }
                    return i.abrupt("return");
                case 2:
                    return t = e.getAttribute("data-url"), i.next = 5, regeneratorRuntime.awrap(r.fetchSafeDocumentFragment(document, t));
                case 5:
                    n = i.sent, l.preserveInteractivePosition(function () {
                        e.replaceWith(n)
                    });
                case 7:
                case"end":
                    return i.stop()
            }
        }, null, this)
    }

    function v(e, t) {
        return e.querySelectorAll(".js-draggable-issue")[t]
    }

    function p(e, t) {
        k({
            item: t,
            newIndex: Array.from(e.querySelectorAll(".js-draggable-issue")).indexOf(t),
            trackingLabel: "keyboard-shortcut"
        }), o.refocus(t.closest(".js-navigation-container"), t)
    }

    function g(e) {
        if (!x.has(e)) {
            var t = j["default"].create(e, {
                animation: 150,
                item: ".js-draggable-issue",
                handle: ".js-drag-handle",
                onUpdate: k,
                chosenClass: "is-dragging"
            });
            x.set(e, t)
        }
    }

    function y(e) {
        var t = x.get(e);
        t && t.destroy()
    }

    var b = h(e), j = h(t), w = h(n), L = h(i), S = h(f), x = new WeakMap;
    b["default"](document).on("socket:message", ".js-milestone-issues", function () {
        var e = this.querySelector(".js-draggable-issues-container");
        if ("1" === e.getAttribute("data-is-sorting"))return void e.removeAttribute("data-is-sorting");
        var t = this;
        S["default"]().then(function () {
            m(t)
        })
    }), b["default"](document).on("ajaxSuccess", ".js-milestone-sort-form", function (e, t, n, r) {
        r.error ? this.querySelector(".js-milestone-changed").classList.remove("d-none") : this.querySelector(".js-timestamp").value = r.updated_at
    });
    var k = w["default"](function (e) {
        var t = e.newIndex, n = e.item, r = n.closest(".js-draggable-issues-container"), a = n.getAttribute("data-id"), i = v(r, t - 1), o = i && i.getAttribute("data-id"), s = r.closest(".js-milestone-sort-form");
        s.querySelector(".js-item-id").value = a, s.querySelector(".js-prev-id").value = o || "", d.trackEvent({
            category: "Milestone",
            action: "reorder",
            label: e.trackingLabel || "drag-and-drop"
        }), r.setAttribute("data-is-sorting", "1"), c.submit(s)
    }, 200);
    u.on("navigation:keydown", ".js-draggable-issue", function (e) {
        L["default"](e instanceof CustomEvent);
        var t = this.closest(".js-draggable-issues-container");
        if ("J" === e.detail.hotkey) {
            var n = this.nextElementSibling;
            n && (this.parentNode.insertBefore(this, n.nextElementSibling), p(t, this), e.preventDefault(), e.stopPropagation())
        } else"K" === e.detail.hotkey && (this.parentNode.insertBefore(this, this.previousElementSibling), p(t, this), e.preventDefault(), e.stopPropagation())
    }), s.observe(".js-draggable-issues-container", {
        add: g,
        remove: y
    }), s.observe(".js-backfill-status", function (e) {
        setTimeout(function () {
            e.setAttribute("src", e.getAttribute("data-xsrc"))
        }, 3e3)
    })
}),define("github/mobile-preference", ["delegated-events"], function (e) {
    e.on("submit", ".js-mobile-preference-form", function () {
        var e = this.querySelector(".js-mobile-preference-anchor-field");
        e.value = window.location.hash.substr(1)
    })
}),define("github/notifications", ["./navigation", "./fetch", "invariant", "./observe", "delegated-events"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o() {
        var t = document.querySelector(".js-notifications-sidebar");
        if (t) {
            var n = t.querySelector(".js-navigation-container");
            n && (t.classList.contains("d-none") ? e.pop(n) : e.push(n))
        }
    }

    var s = i(n);
    a.on("click", ".js-toggle-notifications-sidebar", function (e) {
        e.preventDefault(), e.stopPropagation(), this.blur();
        var t = document.querySelector(".js-notifications-sidebar");
        t && (t.classList.toggle("d-none"), s["default"](null != document.body && document.body instanceof HTMLElement, "body doesn't exist."), document.body.classList.toggle("notifications-sidebar-showing"), o())
    }), r.observe(".js-notification-include-fragment", function (e) {
        var n = e.getAttribute("data-src");
        t.fetchSafeDocumentFragment(document, n).then(function (t) {
            e.replaceWith(t), o()
        })
    })
}),define("github/notifications/filtering", ["../menu", "../fetch", "invariant", "delegated-events"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var i = a(n);
    r.on("click", ".js-notification-domain-button", function (n) {
        var r = n.target;
        i["default"](r instanceof HTMLElement);
        var a = r.getAttribute("data-src"), o = r.closest(".js-notifications-sidebar");
        i["default"](o instanceof HTMLElement);
        var s = o.querySelector(".js-notifications-content-container");
        i["default"](s instanceof HTMLElement), s instanceof HTMLElement && (e.deactivate(r.closest(".js-menu-container")), t.fetchSafeDocumentFragment(document, a).then(function (e) {
            s.innerHTML = "", s.appendChild(e);
            var t = o.querySelector(".js-notification-inbox-title");
            i["default"](t instanceof HTMLElement), t.textContent = r.title
        }))
    })
}),define("github/notifications/live-updates", ["exports", "../jquery", "../fetch", "invariant"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        s["default"](e.classList.contains("js-notification-cell"), "refreshNotificationCell must be passed a js-notification-cell");
        var t = e.getAttribute("data-src");
        n.fetchSafeDocumentFragment(document, t).then(function (t) {
            var n = t.querySelector(".js-notification-cell");
            n.classList.toggle("navigation-focus", e.classList.contains("navigation-focus")), e.replaceWith(n)
        })
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.refreshNotificationCell = i;
    var o = a(t), s = a(r);
    o["default"](document).on("socket:message", ".js-notification-channel", function (e) {
        if (e.target === e.currentTarget) {
            var t = this.querySelector(".js-load-newer-notifications");
            t && t.classList.add("js-notification-include-fragment")
        }
    }), o["default"](document).on("socket:message", ".js-notification-cell", function (e) {
        e.target === e.currentTarget && i(e.target)
    })
}),define("github/notifications/pagination", ["../in-viewport", "delegated-events"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e);
    t.on("click", ".js-notification-load-prev-page", function () {
        this.classList.add("js-notification-include-fragment")
    }), r["default"](".js-notification-load-prev-page", function () {
        this.classList.remove("js-notification-load-prev-page"), this.classList.add("js-notification-include-fragment")
    })
}),define("github/notifications/quick-actions", ["../jquery", "invariant", "delegated-events", "./live-updates", "../form"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e) {
        e.classList.add("is-dirty");
        var t = e.querySelector(".js-notification-mark-read");
        t instanceof HTMLFormElement && a.submit(t)
    }

    function s(e) {
        e.classList.add("is-dirty");
        var t = e.querySelector(".js-notification-mark-unread");
        t instanceof HTMLFormElement && a.submit(t)
    }

    var u = i(e), l = i(t), c = {I: o, U: s};
    n.on("navigation:keydown", ".js-notification-cell", function (e) {
        l["default"](e instanceof CustomEvent);
        var t = c[e.detail.hotkey];
        t && t(e.target)
    }), u["default"](document).on("ajaxSuccess", ".js-notification-update", function (e) {
        r.refreshNotificationCell(e.target.closest(".js-notification-cell"))
    })
}),define("github/oauth", ["invariant", "./observe", "./page-focused"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var a = r(e), i = r(n);
    t.observe("#js-oauth-authorize-btn", function (e) {
        i["default"](document).then(function () {
            setTimeout(function () {
                a["default"](e instanceof HTMLButtonElement), e.disabled = !1
            }, 1e3)
        })
    })
}),define("github/octolytics-tracking", ["./typecast", "delegated-events"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e) {
        var t = Math.floor((new Date).getTime() / 1e3);
        e.timestamp = t;
        var n = a["default"](document.head && document.head.querySelector('meta[name="octolytics-event-url"]'), HTMLMetaElement), r = n.content;
        if ("sendBeacon" in navigator) {
            var i = new Blob([JSON.stringify(e)], {type: "application/vnd.github-octolytics+json"});
            navigator.sendBeacon(r, i)
        } else {
            var o = new XMLHttpRequest;
            o.open("POST", r, !0), o.setRequestHeader("Content-Type", "application/vnd.github-octolytics+json"), o.send(JSON.stringify(e))
        }
    }

    var a = n(e);
    t.on("click", "[data-octo-click]", function (e) {
        if (window._octo) {
            var t = e.target, n = t.getAttribute("data-octo-click"), i = {};
            i.event_type = n;
            var o = {}, s = {}, u = {}, l = [];
            t.hasAttribute("data-octo-dimensions") && (l = (t.getAttribute("data-octo-dimensions") || "").split(","));
            var c = document.head ? document.head.querySelectorAll("meta[name]") : [], d = !0, f = !1, h = void 0;
            try {
                for (var m, v = c[Symbol.iterator](); !(d = (m = v.next()).done); d = !0) {
                    var p = m.value, g = a["default"](p, HTMLMetaElement);
                    if (g.name.startsWith("octolytics-dimension-")) {
                        var y = g.name.replace(/^octolytics-dimension-/, "");
                        o[y] = g.content
                    } else if (g.name.startsWith("octolytics-measure-")) {
                        var b = g.name.replace(/^octolytics-measure-/, "");
                        s[b] = g.content
                    } else if (g.name.startsWith("octolytics-context-")) {
                        var j = g.name.replace(/^octolytics-context-/, "");
                        u[j] = g.content
                    } else if (g.name.startsWith("octolytics-actor-")) {
                        var w = g.name.replace(/^octolytics-/, "").replace(/-/g, "_");
                        o[w] = g.content
                    } else if (g.name.startsWith("octolytics-")) {
                        var L = g.name.replace(/^octolytics-/, "").replace(/-/g, "_");
                        i[L] = g.content
                    }
                }
            } catch (S) {
                f = !0, h = S
            } finally {
                try {
                    !d && v["return"] && v["return"]()
                } finally {
                    if (f)throw h
                }
            }
            if (t.hasAttribute("data-ga-click")) {
                var x = t.getAttribute("data-ga-click") || "", k = x.split(",").map(function (e) {
                    return e.trim()
                });
                o.category = k[0], o.action = k[1]
            }
            var E = !0, _ = !1, T = void 0;
            try {
                for (var q, M = l[Symbol.iterator](); !(E = (q = M.next()).done); E = !0) {
                    var C = q.value, A = C.split(":");
                    o[A[0]] = A[1]
                }
            } catch (S) {
                _ = !0, T = S
            } finally {
                try {
                    !E && M["return"] && M["return"]()
                } finally {
                    if (_)throw T
                }
            }
            i.dimensions = o, i.measures = s, i.context = u, r(i)
        }
    })
}),define("github/orgs/team-discussions", ["../jquery", "invariant", "delegated-events"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e) {
        var t = e.target.closest(".js-teams-write-a-post");
        if (t) {
            var n = t.querySelector(".js-comment-container"), r = t.querySelector(".js-post-placeholder");
            n && !n.classList.contains("d-none") && (n.classList.add("d-none"), r && r.classList.remove("d-none"), t.classList.add("js-team-discussions-post-toggle"), t.classList.remove("active"))
        }
    }

    var i = r(e), o = r(t);
    n.on("click", ".js-team-discussions-team-description-toggle", function () {
        var e = document.querySelector(".js-team-discussions-team-description"), t = document.querySelector(".js-team-discussions-team-description-form");
        e && e.classList.toggle("d-none"), t && t.classList.toggle("d-none")
    }), n.on("click", ".js-team-discussions-post-toggle", function (e) {
        var t = e.target.closest(".js-teams-write-a-post");
        if (t) {
            var n = t.querySelector(".js-comment-container"), r = t.querySelector(".js-post-placeholder"), a = t.querySelector(".js-comment-field");
            n && n.classList.remove("d-none"), r && r.classList.add("d-none"), a && a.focus(), t.classList.remove("js-team-discussions-post-toggle"), t.classList.add("active")
        }
    }), n.on("click", ".js-hide-post-form", function (e) {
        a(e)
    }), i["default"](document).on("ajaxComplete", ".js-new-comment-form", function (e) {
        a(e)
    }), i["default"](document).on("ajaxComplete", ".js-team-discussions-team-description-form", function () {
        var e = document.querySelector(".js-team-discussions-team-description"), t = document.querySelector(".js-team-discussions-team-description-form"), n = document.querySelector(".js-team-discussions-team-description .description"), r = document.querySelector(".js-team-discussions-team-description-field");
        o["default"](n instanceof HTMLSpanElement), o["default"](r instanceof HTMLTextAreaElement), e && e.classList.toggle("d-none"), t && t.classList.toggle("d-none"), r.value.trim() ? (n.innerText = r.value, r.defaultValue = r.value) : (n.innerText = "This team has no description", r.defaultValue = "")
    })
}),define("github/capture-keypresses", ["exports", "invariant"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e) {
        var t = e.createElement("textarea");
        return t.style.position = "fixed", t.style.top = "0", t.style.left = "0", t.style.opacity = "0", a["default"](e.body), e.body.appendChild(t), t.focus(), function () {
            return t.blur(), t.remove(), t.value
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = r;
    var a = n(t)
}),define("github/pjax/capture-keypresses", ["../capture-keypresses", "../form", "delegated-events"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var a = r(e), i = null;
    n.on("pjax:click", ".js-pjax-capture-input", function () {
        i = a["default"](document)
    }), n.on("pjax:end", "#js-repo-pjax-container", function () {
        if (i) {
            var e = i(), n = document.querySelector(".js-pjax-restore-captured-input");
            n instanceof HTMLInputElement && e && t.changeValue(n, e), i = null
        }
    })
}),define("github/pjax/history-navigate", ["../history", "invariant", "delegated-events"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var a = r(t);
    n.on("pjax:click", ".js-pjax-history-navigate", function (t) {
        a["default"](t instanceof CustomEvent), this.href === e.getBackURL() ? (history.back(), t.detail.relatedEvent.preventDefault(), t.preventDefault()) : this.href === e.getForwardURL() && (history.forward(), t.detail.relatedEvent.preventDefault(), t.preventDefault())
    })
}),define("github/pjax/link-prefetch", ["../pjax", "../observe", "./prefetch"], function (e, t, n) {
    t.observe("link[rel=pjax-prefetch]", {
        init: function (t) {
            var r = e.fetch(t, {headers: {Purpose: "prefetch"}});
            n.setPrefetchResponse(t, r)
        }
    })
}),define("github/project-cards-filter", ["exports", "./history", "./typecast"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e) {
        var t = e.match(g) || [], n = {}, r = function (e) {
            var t = p.find(function (t) {
                return e.match(new RegExp("^" + t + ":.*"))
            });
            if (t) {
                var r = e.replace(new RegExp(t + ':|"', "g"), "");
                if (0 !== r.length) {
                    var a = n[t] || [];
                    a.push(r), n[t] = a
                }
            } else if (e.length > 0) {
                var i = n.title || [];
                i.push(e), n.title = i
            }
        }, a = !0, i = !1, o = void 0;
        try {
            for (var s, u = t[Symbol.iterator](); !(a = (s = u.next()).done); a = !0) {
                var l = s.value;
                r(l)
            }
        } catch (c) {
            i = !0, o = c
        } finally {
            try {
                !a && u["return"] && u["return"]()
            } finally {
                if (i)throw o
            }
        }
        return n
    }

    function i(e, t) {
        for (var n in t) {
            var r = e.getAttribute("data-card-" + n) || "", a = [];
            "" !== r.trim() && (a = JSON.parse(r));
            var i = !0, u = !1, l = void 0;
            try {
                for (var c, d = t[n][Symbol.iterator](); !(i = (c = d.next()).done); i = !0) {
                    var f = c.value;
                    if ("title" === n) {
                        if (!o(f, a))return !1
                    } else if (!s(f, a))return !1
                }
            } catch (h) {
                u = !0, l = h
            } finally {
                try {
                    !i && d["return"] && d["return"]()
                } finally {
                    if (u)throw l
                }
            }
        }
        return !0
    }

    function o(e, t) {
        return t.some(function (t) {
            return t.startsWith(e)
        })
    }

    function s(e, t) {
        return -1 !== t.indexOf(e)
    }

    function u(e, n) {
        var r = new URL(window.location.toString());
        "" === n ? r.searchParams["delete"](e) : r.searchParams.set(e, n), t.replaceState(t.getState(), document.title, r.toString())
    }

    function l(e, t) {
        var n = !0, r = !1, a = void 0;
        try {
            for (var i, o = document.querySelectorAll(".js-project-fullscreen-link")[Symbol.iterator](); !(n = (i = o.next()).done); n = !0) {
                var s = i.value, u = new URL(s.getAttribute("href") || "", window.location.origin);
                "" === t ? u.searchParams["delete"](e) : u.searchParams.set(e, t), s.setAttribute("href", u.toString())
            }
        } catch (l) {
            r = !0, a = l
        } finally {
            try {
                !n && o["return"] && o["return"]()
            } finally {
                if (r)throw a
            }
        }
    }

    function c() {
        var e = document.querySelector(".js-card-filter-input");
        if (e instanceof HTMLInputElement) {
            var t = v["default"](document.querySelector(".js-project-columns-container"), HTMLElement), n = e.value.trim().toLowerCase(), r = a(n), o = !0, s = !1, c = void 0;
            try {
                for (var d, f = t.querySelectorAll(".js-project-column-card")[Symbol.iterator](); !(o = (d = f.next()).done); o = !0) {
                    var h = d.value;
                    h.classList.toggle("d-none", !i(h, r))
                }
            } catch (m) {
                s = !0, c = m
            } finally {
                try {
                    !o && f["return"] && f["return"]()
                } finally {
                    if (s)throw c
                }
            }
            var p = !0, g = !1, y = void 0;
            try {
                for (var b, j = t.querySelectorAll(".js-project-column")[Symbol.iterator](); !(p = (b = j.next()).done); p = !0) {
                    var w = b.value, L = v["default"](w.querySelector(".js-filtered-column-card-count"), HTMLElement);
                    if (n.length > 0) {
                        var S = w.querySelectorAll(".js-project-column-card:not(.d-none)").length, x = S.toString() + " result";
                        1 !== S && (x += "s"), L.textContent = x, L.classList.remove("d-none")
                    } else L.classList.add("d-none")
                }
            } catch (m) {
                g = !0, y = m
            } finally {
                try {
                    !p && j["return"] && j["return"]()
                } finally {
                    if (g)throw y
                }
            }
            var k = v["default"](document.querySelector(".js-card-filter-clear"), HTMLElement);
            k.classList.toggle("d-none", 0 === n.length), u(e.name, n), l(e.name, n)
        }
    }

    function d(e) {
        var t = e.value.slice(0, e.selectionEnd), n = e.value.slice(e.selectionEnd), r = 0 === e.value.trim().length;
        if (y.test(t))return !1;
        var a = b.test(t) && j.test(n);
        return r || a
    }

    function f(e) {
        d(e) ? h(e) : m()
    }

    function h(e) {
        var t = document.querySelector(".js-card-filter-suggester");
        if (t instanceof HTMLElement) {
            t.classList.remove("d-none");
            var n = e.value.slice(0, e.selectionEnd), r = (n.match(L) || [])[0], a = v["default"](t.querySelector(".js-card-filter-suggester-helper-container"), HTMLElement), i = v["default"](a.querySelector(".js-card-filter-suggester-helper"), HTMLElement);
            w.test(e.value) ? (i.textContent = e.value, a.classList.remove("d-none")) : a.classList.add("d-none");
            var o = v["default"](t.querySelector(".js-card-filter-suggestions-header"), HTMLElement), s = !1, u = !0, l = !1, c = void 0;
            try {
                for (var d, f = t.querySelectorAll(".js-card-filter-suggestion")[Symbol.iterator](); !(u = (d = f.next()).done); u = !0) {
                    var h = d.value, m = h.getAttribute("data-value");
                    m && m.startsWith(r) ? (h.classList.remove("d-none"), s = !0) : (h.classList.add("d-none"), h.classList.remove("navigation-focus"))
                }
            } catch (p) {
                l = !0, c = p
            } finally {
                try {
                    !u && f["return"] && f["return"]()
                } finally {
                    if (l)throw c
                }
            }
            o.classList.toggle("d-none", !s)
        }
    }

    function m() {
        var e = document.querySelector(".js-card-filter-suggester");
        e instanceof HTMLElement && e.classList.add("d-none")
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.filterCards = c, e.updateSuggestionsDisplay = f, e.hideSuggestions = m;
    var v = r(n), p = ["assignee", "author", "is", "label", "repo", "state", "type"], g = /[^\s:]+:(".*"|[^\s]*)|[^\s]+/g, y = /:"[^"]*"?$/, b = /(^|\s+)[^\s:]+$/, j = /^(\s|$)/, w = /(^|\s)[^\s:]+$/, L = /\S*$/
}),define("github/magic-move", ["exports", "invariant", "./once"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a() {
        return new Promise(window.requestAnimationFrame)
    }

    function i(e) {
        var t = new WeakMap, n = !0, r = !1, a = void 0;
        try {
            for (var i, o = e[Symbol.iterator](); !(n = (i = o.next()).done); n = !0) {
                var s = i.value;
                t.set(s, s.getBoundingClientRect())
            }
        } catch (u) {
            r = !0, a = u
        } finally {
            try {
                !n && o["return"] && o["return"]()
            } finally {
                if (r)throw a
            }
        }
        return t
    }

    function o(e, t, n) {
        var r, i, o, s;
        return regeneratorRuntime.async(function (c) {
            for (; ;)switch (c.prev = c.next) {
                case 0:
                    return r = t.get(e), i = n.get(e), u["default"](r && i, "Must have old and new positions for the element to animate"), o = r.left - i.left, s = r.top - i.top, c.next = 7, regeneratorRuntime.awrap(a());
                case 7:
                    return e.style.transform = "translateZ(0) translate(" + o + "px, " + s + "px)", e.style.transition = "transform 0s", c.next = 11, regeneratorRuntime.awrap(a());
                case 11:
                    return e.style.transform = "", e.style.transition = "", c.abrupt("return", l["default"](e, "transitionend"));
                case 14:
                case"end":
                    return c.stop()
            }
        }, null, this)
    }

    function s(e, t) {
        var n = i(e), r = [], a = !0, s = !1, u = void 0;
        try {
            for (var l, c = e[Symbol.iterator](); !(a = (l = c.next()).done); a = !0) {
                var d = l.value;
                r.push(o(d, t, n))
            }
        } catch (f) {
            s = !0, u = f
        } finally {
            try {
                !a && c["return"] && c["return"]()
            } finally {
                if (s)throw u
            }
        }
        return Promise.all(r)
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.recordPositions = i, e.animate = s;
    var u = r(t), l = r(n)
}),define("github/project-updater", ["exports", "./magic-move", "./typecast", "./debounce", "./fetch"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e) {
        if (e) {
            m && clearTimeout(m);
            var t = f["default"](document.querySelector(".js-project-updated-message"), HTMLElement);
            t.textContent = e, t.classList.remove("d-none"), m = setTimeout(function () {
                t.textContent = "", t.classList.add("d-none")
            }, 3e3)
        }
    }

    function s(e) {
        for (; e.firstChild;)e.removeChild(e.firstChild)
    }

    function u(e, t) {
        var n = "project-column-" + e.id, r = document.getElementById(n);
        if (r)return r;
        var a = document.createElement("include-fragment");
        return a.id = n, a.src = t + "/" + e.id, a
    }

    function l(e, t) {
        var n = "card-" + e, r = document.getElementById(n);
        if (r)return r;
        var a = document.createElement("include-fragment");
        return a.id = n, a.src = t + "/" + e, a.onerror = function () {
            a.remove()
        }, a
    }

    function c(e, t) {
        var n = Array.from(e.querySelectorAll(".js-project-column")), r = n.map(function (e) {
            return e.getAttribute("data-id");
        }), a = t.columns.map(function (e) {
            return String(e.id)
        });
        return a.join(",") !== r.join(",")
    }

    function d(e, n) {
        var r, i, d, h, m, v, p, g, y, b, j, w, L, S, x, k, E, _, T, q, M, C, A, H, I, D, P, R, N, O, F, B, z, U, W, $, V, Y, J;
        return regeneratorRuntime.async(function (X) {
            for (; ;)switch (X.prev = X.next) {
                case 0:
                    if (r = document.activeElement, o(n.message), i = e.querySelectorAll(".js-project-column"), d = t.recordPositions(i), h = e.getAttribute("data-url"), m = e.getAttribute("data-columns-url"), v = e.getAttribute("data-cards-url"), X.t0 = n.state, X.t0) {
                        X.next = 12;
                        break
                    }
                    return X.next = 11, regeneratorRuntime.awrap(a.fetchJSON(h));
                case 11:
                    X.t0 = X.sent;
                case 12:
                    if (p = X.t0, !c(e, p)) {
                        X.next = 43;
                        break
                    }
                    for (g = {}, y = document.createDocumentFragment(), b = !0, j = !1, w = void 0, X.prev = 19, L = p.columns[Symbol.iterator](); !(b = (S = L.next()).done); b = !0)x = S.value, k = u(x, m), E = k.querySelector(".js-project-column-cards"), E && (g[E.id] = E.scrollTop), y.appendChild(k);
                    X.next = 27;
                    break;
                case 23:
                    X.prev = 23, X.t1 = X["catch"](19), j = !0, w = X.t1;
                case 27:
                    X.prev = 27, X.prev = 28, !b && L["return"] && L["return"]();
                case 30:
                    if (X.prev = 30, !j) {
                        X.next = 33;
                        break
                    }
                    throw w;
                case 33:
                    return X.finish(30);
                case 34:
                    return X.finish(27);
                case 35:
                    _ = e.querySelector(".js-new-project-column-container"), _ && _.remove(), s(e), e.appendChild(y), _ && e.appendChild(_);
                    for (T in g)E = f["default"](document.getElementById(T), HTMLElement), E.scrollTop = g[T];
                    return X.next = 43, regeneratorRuntime.awrap(t.animate(i, d));
                case 43:
                    q = e.querySelectorAll(".js-project-column-card"), M = t.recordPositions(q), C = !0, A = !1, H = void 0, X.prev = 48, I = p.columns[Symbol.iterator]();
                case 50:
                    if (C = (D = I.next()).done) {
                        X.next = 85;
                        break
                    }
                    if (P = D.value, R = document.getElementById("project-column-" + P.id)) {
                        X.next = 55;
                        break
                    }
                    return X.abrupt("return");
                case 55:
                    for (N = R.querySelector(".js-project-column-name"), N && (N.textContent = P.name, O = R.querySelector(".js-project-column-name-field"), O instanceof HTMLInputElement && (O.value = P.name, O.setAttribute("value", P.name))), F = R.querySelector(".js-column-card-count"), F && (F.textContent = P.card_ids.length), B = document.createDocumentFragment(), z = !0, U = !1, W = void 0, X.prev = 63, $ = P.card_ids[Symbol.iterator](); !(z = (V = $.next()).done); z = !0)Y = V.value, B.appendChild(l(Y, v));
                    X.next = 71;
                    break;
                case 67:
                    X.prev = 67, X.t2 = X["catch"](63), U = !0, W = X.t2;
                case 71:
                    X.prev = 71, X.prev = 72, !z && $["return"] && $["return"]();
                case 74:
                    if (X.prev = 74, !U) {
                        X.next = 77;
                        break
                    }
                    throw W;
                case 77:
                    return X.finish(74);
                case 78:
                    return X.finish(71);
                case 79:
                    J = f["default"](R.querySelector(".js-project-column-cards"), HTMLElement), s(J), J.appendChild(B);
                case 82:
                    C = !0, X.next = 50;
                    break;
                case 85:
                    X.next = 91;
                    break;
                case 87:
                    X.prev = 87, X.t3 = X["catch"](48), A = !0, H = X.t3;
                case 91:
                    X.prev = 91, X.prev = 92, !C && I["return"] && I["return"]();
                case 94:
                    if (X.prev = 94, !A) {
                        X.next = 97;
                        break
                    }
                    throw H;
                case 97:
                    return X.finish(94);
                case 98:
                    return X.finish(91);
                case 99:
                    return X.next = 101, regeneratorRuntime.awrap(t.animate(q, M));
                case 101:
                    r && document.activeElement !== r && r.focus();
                case 102:
                case"end":
                    return X.stop()
            }
        }, null, this, [[19, 23, 27, 35], [28, , 30, 34], [48, 87, 91, 99], [63, 67, 71, 79], [72, , 74, 78], [92, , 94, 98]])
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.updateProject = void 0;
    var f = i(n), h = i(r), m = void 0;
    e.updateProject = h["default"](d, 100)
}),define("github/projects", ["./throttled-input", "./project-cards-filter", "delegated-events", "./jquery", "sortablejs", "./typecast", "./menu", "./debounce", "./fetch", "./focused", "./hash-change", "./hotkey", "invariant", "./observe", "./form", "./project-updater", "./sso"], function (e, t, n, r, a, i, o, s, u, l, c, d, f, h, m, v, p) {
    function g(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function y(e) {
        e.classList.add("highlighted"), e.scrollIntoView();
        var t = e.closest(".js-project-column");
        t && (t.scrollTop = 0), setTimeout(function () {
            e.classList.remove("highlighted")
        }, 4e3)
    }

    function b(e, t) {
        if (!t)return H["default"](e.elements.namedItem("card_id"), HTMLInputElement).value = "", H["default"](e.elements.namedItem("content_id"), HTMLInputElement).value = "", void(H["default"](e.elements.namedItem("content_type"), HTMLInputElement).value = "");
        var n = t.getAttribute("data-card-id");
        n ? (H["default"](e.elements.namedItem("card_id"), HTMLInputElement).value = n, H["default"](e.elements.namedItem("content_id"), HTMLInputElement).value = "", H["default"](e.elements.namedItem("content_type"), HTMLInputElement).value = "") : (H["default"](e.elements.namedItem("card_id"), HTMLInputElement).value = "", H["default"](e.elements.namedItem("content_id"), HTMLInputElement).value = t.getAttribute("data-content-id"), H["default"](e.elements.namedItem("content_type"), HTMLInputElement).value = t.getAttribute("data-content-type")), H["default"](e.elements.namedItem("client_uid"), HTMLInputElement).value = F
    }

    function j(e, t) {
        if (e) {
            var n = e.querySelector(".js-column-card-count"), r = parseInt(n.textContent.trim());
            n.textContent = r + t
        }
    }

    function w(e) {
        var t = e.item.closest(".js-project-column");
        j(t, 1);
        var n = e.from && e.from.closest(".js-project-column");
        n && j(n, -1)
    }

    function L(e) {
        var t = e.item, n = t.closest(".js-project-column");
        if (w(e), n) {
            var r = n.querySelector(".js-project-content-form");
            r.reset(), b(r, t);
            var a = t.previousElementSibling;
            a ? r.elements.namedItem("previous_card_id").value = a.getAttribute("data-card-id") : r.elements.namedItem("previous_card_id").value = "", m.submit(r)
        }
    }

    function S(e) {
        var t = e.item, n = H["default"](document.querySelector(".js-reorder-columns-form"), HTMLFormElement);
        H["default"](n.elements.namedItem("column_id"), HTMLInputElement).value = t.getAttribute("data-id");
        var r = t.previousElementSibling;
        r && (H["default"](n.elements.namedItem("previous_column_id"), HTMLInputElement).value = r.getAttribute("data-id")), m.submit(n)
    }

    function x(e) {
        var t = e.from;
        t.classList.contains("js-project-pending-cards") && 0 === t.querySelectorAll(".js-project-column-card").length && t.closest(".js-project-pending-cards-container").remove()
    }

    function k(e) {
        var t = H["default"](document.querySelector(e), HTMLElement);
        t.classList.remove("d-none")
    }

    function E(e) {
        var t = H["default"](document.querySelector(e), HTMLElement);
        t.classList.add("d-none")
    }

    function _() {
        var e = document.querySelector(".js-project-activity-results");
        if (e) {
            var t = e.getAttribute("data-project-activity-url");
            N["default"](t, "`data-project-activity-url` must exist");
            var n = new URL(t, window.location.origin);
            e.setAttribute("src", n.toString())
        }
    }

    function T() {
        var e = this.querySelector("textarea"), t = this.closest(".js-project-note-form"), n = t.querySelector("button"), r = e.value || "", a = Number(e.getAttribute("data-maxlength")), i = t.querySelector(".js-note-limit-warning"), o = r.match(/\n/g), s = o ? r.length + o.length : r.length;
        if (a >= s ? n.removeAttribute("disabled") : n.disabled = !0, s > a - 100) {
            var u = a - s, l = 1 === Math.abs(u) ? "character" : "characters";
            i.textContent = u + " " + l + " remaining.", i.classList.remove("d-none"), i.classList.toggle("text-red", 0 > u)
        } else i.classList.add("d-none")
    }

    function q(e) {
        return "esc" === R["default"](e) ? void this.closest(".js-details-container").classList.remove("open") : void 0
    }

    function M() {
        var e, t, n, r;
        return regeneratorRuntime.async(function (a) {
            for (; ;)switch (a.prev = a.next) {
                case 0:
                    return e = this.getAttribute("data-results-url"), t = this.closest(".js-select-menu"), t.classList.add("is-sending"), a.next = 5, regeneratorRuntime.awrap(u.fetchText(e + "?query=" + this.value));
                case 5:
                    n = a.sent, t.classList.remove("is-sending"), r = t.querySelector(".js-project-repository-picker-results"), r.innerHTML = n, r.style.display = "block";
                case 10:
                case"end":
                    return a.stop()
            }
        }, null, this)
    }

    var C = g(r), A = g(a), H = g(i), I = g(s), D = g(l), P = g(c), R = g(d), N = g(f), O = g(p), F = void 0, B = document.querySelector(".js-client-uid");
    B && (F = B.getAttribute("data-uid") || ""), n.on("card:testAction", ".js-project-column-card", function () {
        L({item: this})
    }), n.on("column:testAction", ".js-project-column", function () {
        S({item: this})
    }), C["default"](document).on("ajaxSuccess", ".js-project-update-card", function (e, t, n, r) {
        var a = C["default"].parseHTML(r)[0], i = a.getAttribute("data-card-id"), o = void 0;
        if (i && (o = document.querySelector('[data-card-id="' + i + '"]')), !o) {
            var s = a.getAttribute("data-content-type"), u = a.getAttribute("data-content-id");
            o = document.querySelector('[data-content-type="' + s + '"][data-content-id="' + u + '"]')
        }
        C["default"](o).replaceWith(a)
    }), C["default"](document).on("ajaxSuccess", ".js-convert-note-to-issue-form", function () {
        n.fire(document, "facebox:close")
    }), C["default"](document).on("change", ".js-convert-note-to-issue-form", function () {
        var e = this.elements.namedItem("repository_id"), t = this.querySelector(".js-convert-note-to-issue-button");
        !e || e.value ? t.removeAttribute("disabled") : t.disabled = !0
    }), C["default"](document).on("submit", ".js-convert-note-to-issue-form", function (e) {
        var t = this.elements.namedItem("repository_id");
        t && !t.value && e.preventDefault()
    }), C["default"](document).on("ajaxSuccess", ".js-create-project-column", function (e, t, r, a) {
        var i = C["default"].parseHTML(a)[0], o = i.classList.contains("js-column-form-container");
        if (o) this.closest(".js-column-form-container").replaceWith(i); else {
            var s = H["default"](document.querySelector(".js-new-project-column-container"), HTMLElement);
            s.insertAdjacentHTML("beforebegin", a), Array.from(document.querySelectorAll(".js-create-project-column")).forEach(function (e) {
                N["default"](e instanceof HTMLFormElement, "Every .js-create-project-column must be a HTMLFormElement"), b(e, null)
            }), n.fire(document, "facebox:close")
        }
    }), C["default"](document).on("ajaxSuccess", ".js-update-project-column", function (e, t, r, a) {
        var i = C["default"].parseHTML(a)[0], o = i.classList.contains("js-column-form-container");
        if (o) this.closest(".js-column-form-container").replaceWith(i); else {
            var s = this.getAttribute("data-column-id"), u = document.querySelector('.js-project-column[data-id="' + s + '"]');
            u.replaceWith(i), n.fire(document, "facebox:close")
        }
    }), C["default"](document).on("ajaxSuccess", ".js-delete-project-column", function () {
        var e = this.getAttribute("data-column-id");
        if (!e)throw new Error("Unable to get attribute `data-column-id`");
        H["default"](document.querySelector('.js-project-column[data-id="' + e + '"]'), HTMLElement).remove(), n.fire(document, "facebox:close")
    }), h.observe(".js-project-column-card", function (e) {
        e.id === document.location.hash.substr(1) && setTimeout(function () {
            y(e)
        }, 1)
    }), C["default"](document).on("ajaxSuccess", ".js-delete-card", function () {
        var e = this.closest(".js-project-column");
        e && j(e, -1);
        var t = this.closest(".js-project-triage-pane");
        this.closest(".js-project-column-card").remove(), t && m.submit(t.querySelector(".js-project-search-form"))
    }), C["default"](document).on("ajaxSuccess", ".js-note-form", function (e, t, r, a) {
        var i = C["default"].parseHTML(a)[0], o = i.classList.contains("js-note-form-container");
        if (o) this.closest(".js-note-form-container").replaceWith(i); else {
            var s = this.getAttribute("data-card-id"), u = document.getElementById("card-" + s);
            u.replaceWith(i), n.fire(document, "facebox:close")
        }
    }), n.on("click", ".js-card-link-fallback", function () {
        o.deactivate(this.closest(".js-menu-container"))
    }), P["default"](function (e) {
        if (e.target.matches && e.target.matches(".js-project-column-card")) {
            var t = e.target;
            y(t)
        }
    }), n.on("click", ".js-show-project-triage", function () {
        k(".js-project-triage-pane"), k(".js-project-menu-pane")
    }), n.on("click", ".js-hide-project-triage", function () {
        E(".js-project-triage-pane")
    }), n.on("click", ".js-show-project-menu", function () {
        k(".js-project-menu-pane")
    }), n.on("click", ".js-show-project-activity", function () {
        _(), k(".js-project-activity-pane")
    }), n.on("click", ".js-hide-project-activity", function () {
        E(".js-project-activity-pane")
    }), n.on("click", ".js-hide-project-menu", function () {
        var e = Array.from(document.querySelectorAll(".js-project-pane"));
        e.forEach(function (e) {
            e.classList.add("d-none")
        })
    }), n.on("click", ".js-show-triage", function () {
        var e = this.closest(".js-project-triage-pane"), t = e.querySelector(".js-project-search-form");
        t.querySelector(".js-show-triage-field").value = "show", m.submit(t)
    }), n.on("click", ".js-hide-triage", function () {
        var e = this.closest(".js-project-triage-pane"), t = e.querySelector(".js-project-search-form");
        t.querySelector(".js-show-triage-field").value = "", m.submit(t)
    }), C["default"](document).on("ajaxSuccess", ".js-project-search-form", function (e, t, n, r) {
        var a = this.closest(".js-project-triage-pane");
        a.querySelector(".js-project-search-results").innerHTML = r
    }), C["default"](document).on("ajaxSuccess", ".js-project-activity-form", function (e, t, n, r) {
        var a = this.closest(".js-project-activity-pane"), i = a.querySelector(".js-project-activity-container");
        i && (N["default"](i instanceof HTMLElement), i.innerHTML = r), a && (N["default"](a instanceof HTMLElement), a.classList.remove("Details--on"))
    }), h.observe(".js-project-column-card", function (e) {
        if (e.getAttribute("data-card-id")) {
            var t = e.getAttribute("data-content-type"), n = e.getAttribute("data-content-id"), r = document.getElementById("card-" + t + "-" + n);
            r && r.remove()
        }
    }), h.observe(".js-project-note-form", {
        add: function (e) {
            e.addEventListener("input", T), e.addEventListener("keyup", q)
        }, remove: function (e) {
            e.removeEventListener("input", T), e.removeEventListener("keyup", q)
        }
    }), D["default"](document, ".js-project-repository-picker-field", {
        focusin: function () {
            e.addThrottledInputEventListener(this, M)
        }, focusout: function () {
            e.removeThrottledInputEventListener(this, M)
        }
    }), C["default"](document).on("ajaxSend", ".js-project-note-form", function () {
        var e = this.querySelector("textarea");
        this.querySelector("button").disabled = !0, e.disabled = !0
    }), C["default"](document).on("ajaxSuccess", ".js-project-note-form", function (e, t, n, r) {
        var a = this.closest(".js-project-column");
        if (a) {
            var i = a.querySelector(".js-project-column-cards");
            C["default"](i).prepend(r), j(a, 1)
        }
        this.querySelector(".js-note-limit-warning").classList.add("d-none");
        var o = this.querySelector("textarea");
        o.disabled = !1, o.value = "", o.focus()
    });
    var z = I["default"](t.filterCards, 1);
    n.on("click", ".js-card-filter-clear", function () {
        var e = H["default"](document.querySelector(".js-card-filter-input"), HTMLInputElement);
        e.value = "", n.fire(e, "input")
    }), h.observe(".js-project-column-card", {add: z, remove: z}), h.observe(".js-card-filter-input", function (n) {
        n.addEventListener("input", I["default"](t.filterCards, 500)), e.addThrottledInputEventListener(n, function () {
            t.updateSuggestionsDisplay(n)
        })
    }), n.on("focusin", ".js-card-filter-input", function () {
        this instanceof HTMLInputElement && t.updateSuggestionsDisplay(this)
    }), C["default"](document).on("focusout:delayed", ".js-card-filter-input", function () {
        t.hideSuggestions()
    }), n.on("click", ".js-card-filter-suggestion", function () {
        var e = H["default"](document.querySelector(".js-card-filter-input"), HTMLInputElement);
        e.focus()
    }), n.on("navigation:keydown", ".js-card-filter-suggester", function (e) {
        switch (N["default"](e instanceof CustomEvent), e.detail.hotkey) {
            case"esc":
                e.preventDefault(), t.hideSuggestions();
                break;
            case"left":
            case"right":
            case"enter":
                t.hideSuggestions()
        }
    }), C["default"](document).on("navigation:open", ".js-card-filter-suggester", function (e) {
        var r = document.querySelector(".js-card-filter-input");
        if (r instanceof HTMLInputElement) {
            var a = H["default"](document.querySelector(".js-card-filter-suggester"), HTMLElement), i = e.target.getAttribute("data-value"), o = r.value.slice(0, r.selectionEnd).replace(/\S+$/, ""), s = r.value.slice(r.selectionEnd);
            a.classList.contains("d-none") || (e.preventDefault(), r.value = o + i + s, n.fire(r, "input"), t.updateSuggestionsDisplay(r)), t.hideSuggestions()
        }
    }), C["default"](document).on("socket:message", ".js-project-columns-container", function (e, t) {
        if (F !== t.client_uid) {
            var n = this;
            O["default"]().then(function () {
                v.updateProject(n, t)
            });
            var r = document.querySelector(".js-project-search-form");
            r && m.submit(H["default"](r, HTMLFormElement))
        }
    }), C["default"](document).on("socket:message", function (e, t) {
        if (t && t.is_project_activity) {
            var n = document.querySelector(".js-project-activity-pane");
            n && n.classList.add("Details--on")
        }
    }), h.observe(".js-project-columns-drag-container", function (e) {
        A["default"].create(e, {animation: 150, draggable: ".js-project-column", group: "project-column", onUpdate: S})
    }), h.observe(".js-card-drag-container", function (e) {
        A["default"].create(e, {
            animation: 150,
            draggable: ".js-project-column-card",
            group: "project-card",
            onAdd: L,
            onUpdate: L
        })
    }), h.observe(".js-project-search-results-drag-container", function (e) {
        A["default"].create(e, {
            sort: !1,
            animation: 150,
            draggable: ".js-project-column-card",
            group: {name: "project-card", put: !1, pull: !0},
            onRemove: x,
            onAdd: L,
            onUpdate: L
        })
    }), h.observe(".js-project-column-card", function (e) {
        if (e.getAttribute("data-card-id")) {
            var t = e.getAttribute("data-content-type"), n = e.getAttribute("data-content-id"), r = document.getElementById("card-" + t + "-" + n);
            r && r.remove()
        }
    }), h.observe(".js-client-uid-field", function (e) {
        e.value = F
    })
}),define("github/proxy-site-reporting", ["./proxy-site-detection", "./failbot"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e), a = "$__", i = document.querySelector("meta[name=js-proxy-site-detection-payload]"), o = document.querySelector("meta[name=expected-hostname]");
    if (i instanceof HTMLMetaElement && o instanceof HTMLMetaElement && r["default"](document)) {
        var s = {
            url: window.location.href,
            expectedHostname: o.content,
            documentHostname: document.location.hostname,
            proxyPayload: i.content
        }, u = new Error, l = {};
        l["" + a] = btoa(JSON.stringify(s)), t.reportError(u, l)
    }
}),define("github/pulls/change-base", ["../jquery", "../menu", "../facebox"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var a = r(e), i = r(n);
    a["default"](document).on("selectmenu:select", ".js-pull-base-branch-item", function (e) {
        var n = this.closest(".js-select-menu");
        t.deactivate(n), e.preventDefault(), n.querySelector(".js-pull-change-base-branch-field").value = this.getAttribute("data-branch"), i["default"](n.querySelector(".js-change-base-facebox").innerHTML)
    })
}),define("github/pulls/commits-range-selection", ["../jquery", "../once", "../pjax"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e, t, n) {
        var r = Array.from(e.querySelectorAll(".js-navigation-item")), a = r.indexOf(t), i = r.indexOf(n);
        if (-1 === a)throw new Error("Couldn't find startIndex in container");
        if (-1 === i)throw new Error("Couldn't find endItem in container");
        if (o(e), r[i].classList.add("is-last-in-range"), a > i) {
            var u = [i, a];
            a = u[0], i = u[1]
        }
        s["default"](r).addClass("js-navigation-open"), s["default"](r.slice(a, i + 1)).addClass("is-range-selected").removeClass("js-navigation-open")
    }

    function i(e) {
        var t, n;
        return regeneratorRuntime.async(function (r) {
            for (; ;)switch (r.prev = r.next) {
                case 0:
                    return n = function (n) {
                        a(e, t, n.target)
                    }, t = null, t = e.querySelector(".js-navigation-item.navigation-focus"), t && (a(e, t, t), s["default"](e).on("navigation:focus", n)), r.next = 6, regeneratorRuntime.awrap(u["default"](window, "keyup", function (e) {
                        return !e.shiftKey
                    }));
                case 6:
                    s["default"](e).off("navigation:focus", n), o(e);
                case 8:
                case"end":
                    return r.stop()
            }
        }, null, this)
    }

    function o(e) {
        s["default"](e).find(".js-navigation-item").removeClass("is-range-selected is-last-in-range")
    }

    var s = r(e), u = r(t), l = r(n);
    s["default"](document).on("navigation:open", ".js-diffbar-commits-list .js-navigation-item", function (e) {
        if (e.shiftKey) {
            e.preventDefault();
            var t = this.closest(".js-diffbar-commits-menu");
            if (this.classList.contains("is-range-selected")) {
                e.stopPropagation();
                var n = t.querySelectorAll(".js-navigation-item.is-range-selected"), r = n[0], a = n[n.length - 1], o = t.getAttribute("data-range-url"), s = r.getAttribute("data-parent-commit"), u = a.getAttribute("data-commit"), c = s && u ? s + ".." + u : u, d = o.replace("$range", c);
                l["default"]({url: d, container: "#js-repo-pjax-container"})
            } else e.stopImmediatePropagation(), i(t)
        }
    })
}),define("github/pulls/reviews", ["../jquery", "../menu", "../hash-change", "delegated-events", "../once", "../inflector"], function (e, t, n, r, a, i) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s(e, t) {
        var n = e.closest(".js-review-state-classes"), r = n.querySelectorAll(".js-pending-review-comment").length;
        t && (r += t), n.classList.toggle("is-review-pending", r > 0);
        var a = !0, o = !1, s = void 0;
        try {
            for (var u, l = document.querySelectorAll(".js-pending-review-comment-count")[Symbol.iterator](); !(a = (u = l.next()).done); a = !0) {
                var c = u.value;
                c.textContent = r
            }
        } catch (f) {
            o = !0, s = f
        } finally {
            try {
                !a && l["return"] && l["return"]()
            } finally {
                if (o)throw s
            }
        }
        var h = !0, m = !1, v = void 0;
        try {
            for (var p, g = document.querySelectorAll(".js-pending-comment-count-type")[Symbol.iterator](); !(h = (p = g.next()).done); h = !0) {
                var y = p.value;
                i.pluralizeNode(r, y)
            }
        } catch (f) {
            m = !0, v = f
        } finally {
            try {
                !h && g["return"] && g["return"]()
            } finally {
                if (m)throw v
            }
        }
        if (r > 0) {
            var b = e.querySelector(".js-menu-target");
            b.classList.add("anim-pulse-in"), d["default"](b, "animationend").then(function () {
                return b.classList.remove("anim-pulse-in")
            })
        }
    }

    function u(e) {
        var t = document.querySelector(".js-reviews-container");
        t && setTimeout(function () {
            return s(t, e)
        })
    }

    var l = o(e), c = o(n), d = o(a);
    c["default"](function () {
        var e = window.location.hash.slice(1);
        if ("submit-review" === e) {
            var n = document.querySelector(".js-reviews-container");
            t.activate(n)
        }
    }), l["default"](document).on("ajaxSuccess", ".js-inline-comment-form", function () {
        u()
    }), l["default"](document).on("ajaxSuccess", ".js-pending-review-comment .js-comment-delete", function () {
        u(-1)
    }), r.on("click", ".js-review-menu-target", function () {
        var e = this.form.querySelector(".js-review-requests-menu");
        t.activate(e)
    })
}),define("github/releases", ["exports", "delegated-events", "./jquery", "./typecast", "./fetch", "./pjax", "invariant", "./observe", "./history"], function (e, t, n, r, a, i, o, s, u) {
    function l(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function c(e) {
        var n = e.form;
        y["default"](n instanceof HTMLFormElement);
        var r = n.querySelector("#release_draft");
        y["default"](r instanceof HTMLInputElement), r.value = "1", a.fetchJSON(n.action, {
            method: n.method,
            body: new FormData(n)
        }).then(function (r) {
            d(e, "is-saved"), setTimeout(d, 5e3, e, "is-default"), t.fire(n, "release:saved", {release: r})
        })["catch"](function () {
            d(e, "is-failed")
        }), d(e, "is-saving")
    }

    function d(e, t) {
        var n;
        (n = e.classList).remove.apply(n, b), e.classList.add(t), e.disabled = "is-saving" === t
    }

    function f(e) {
        var t, n = document.querySelector(".release-target-wrapper"), r = document.querySelector(".js-release-tag");
        if (null != n && null != r) {
            switch (e) {
                case"is-valid":
                    n.classList.add("d-none");
                    break;
                case"is-loading":
                    break;
                default:
                    n.classList.remove("d-none")
            }
            (t = r.classList).remove.apply(t, j), r.classList.add(e)
        }
    }

    function h(e) {
        if (e.value && e.value !== w.get(e)) {
            f("is-loading"), w.set(e, e.value);
            var t = new URL(e.getAttribute("data-url"), window.location.origin), n = new URLSearchParams(t.search.slice(1));
            n.append("tag_name", e.value), t.search = n.toString(), a.fetchJSON(t).then(function (t) {
                "duplicate" === t.status && parseInt(e.getAttribute("data-existing-id")) === parseInt(t.release_id) ? f("is-valid") : (g["default"](document.querySelector(".js-release-tag .js-edit-release-link"), HTMLElement).setAttribute("href", t.url), f("is-" + t.status))
            })["catch"](function () {
                f("is-invalid")
            })
        }
    }

    function m(e, t, n) {
        return t + "/releases/" + e + "/" + n
    }

    function v(e) {
        var t = e.closest("form"), n = t.querySelector(".js-previewable-comment-form");
        if (n) {
            var r = n.getAttribute("data-base-preview-url");
            r || (r = n.getAttribute("data-preview-url"), n.setAttribute("data-base-preview-url", r));
            var a = e.querySelectorAll('input[name="release[tag_name]"], input[name="release[target_commitish]"]:checked'), i = new URL(r, window.location.origin), o = new URLSearchParams(i.search.slice(1)), s = !0, u = !1, l = void 0;
            try {
                for (var c, d = a[Symbol.iterator](); !(s = (c = d.next()).done); s = !0) {
                    var f = c.value;
                    f.value && o.append(f.name, f.value)
                }
            } catch (h) {
                u = !0, l = h
            } finally {
                try {
                    !s && d["return"] && d["return"]()
                } finally {
                    if (u)throw l
                }
            }
            i.search = o.toString(), n.setAttribute("data-preview-url", i.toString())
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.saveDraft = c;
    var p = l(n), g = l(r), y = l(o);
    t.on("click", ".js-save-draft", function (e) {
        c(this), e.preventDefault()
    }), t.on("click", ".js-timeline-tags-expander", function () {
        this.closest(".js-timeline-tags").classList.remove("is-collapsed")
    });
    var b = ["is-default", "is-saving", "is-saved", "is-failed"];
    t.on("release:saved", ".js-release-form", function (e) {
        y["default"](e instanceof CustomEvent);
        var t = e.detail.release, n = this, r = n.getAttribute("data-repo-url"), a = t.update_url || m("tag", r, t.tag_name);
        if (n.setAttribute("action", a), t.update_authenticity_token) {
            var o = n.querySelector("input[name=authenticity_token]");
            o.value = t.update_authenticity_token
        }
        var s = t.edit_url || m("edit", r, t.tag_name);
        u.replaceState(i.getState(), document.title, s);
        var l = document.querySelector("#delete_release_confirm form");
        if (l) {
            var c = t.delete_url || m("tag", r, t.tag_name);
            if (l.setAttribute("action", c), t.delete_authenticity_token) {
                var d = g["default"](l.querySelector("input[name=authenticity_token]"), HTMLInputElement);
                d.value = t.delete_authenticity_token
            }
        }
        var f = n.querySelector("#release_id");
        f.value || (f.value = t.id, p["default"](n).append('<input type="hidden" name="_method" value="put">'))
    }), t.on("click", ".js-publish-release", function () {
        g["default"](document.querySelector("#release_draft"), HTMLInputElement).value = "0"
    });
    var j = ["is-loading", "is-empty", "is-valid", "is-invalid", "is-duplicate", "is-pending"], w = new WeakMap;
    s.observe(".js-release-tag-field", function (e) {
        h(e), e.addEventListener("blur", function () {
            h(e)
        })
    }), t.on("change", ".js-release-tag", function () {
        v(this)
    }), s.observe(".js-release-form .js-previewable-comment-form", function (e) {
        var t = e.closest("form").querySelector(".js-release-tag");
        v(t)
    })
}),define("github/repository-search", ["delegated-events", "./form"], function (e, t) {
    e.on("selectmenu:selected", ".js-repo-filter-select-menu", function () {
        t.submit(this.closest("form"))
    })
}),define("github/select-menu/ajax", ["../jquery", "../menu"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e);
    r["default"](document).on("ajaxSuccess", ".js-select-menu:not([data-multiple])", function () {
        t.deactivate(this)
    }), r["default"](document).on("ajaxSend", ".js-select-menu:not([data-multiple])", function () {
        r["default"](this).addClass("is-loading")
    }), r["default"](document).on("ajaxComplete", ".js-select-menu", function () {
        r["default"](this).removeClass("is-loading")
    }), r["default"](document).on("ajaxError", ".js-select-menu", function () {
        r["default"](this).addClass("has-error")
    }), r["default"](document).on("menu:deactivate", ".js-select-menu", function () {
        r["default"](this).removeClass("is-loading has-error")
    })
}),define("github/select-menu/base", ["../jquery", "../typecast", "../form", "../menu", "delegated-events"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e) {
        var t = new CustomEvent("selectmenu:select", {bubbles: !0, cancelable: !0});
        return e.dispatchEvent(t), t.defaultPrevented
    }

    var s = i(e), u = i(t);
    s["default"](document).on("navigation:open", ".js-select-menu:not([data-multiple]) .js-navigation-item", function () {
        var e = o(this);
        if (!e) {
            var t = s["default"](this), n = this.closest(".js-select-menu");
            s["default"](n).find(".js-navigation-item.selected").removeClass("selected"), t.addClass("selected"), t.removeClass("indeterminate"), t.find("input[type=radio], input[type=checkbox]").prop("checked", !0).change(), a.fire(this, "selectmenu:selected"), s["default"](n).hasClass("is-loading") || r.deactivate(n)
        }
    }), s["default"](document).on("navigation:open", ".js-select-menu[data-multiple] .js-navigation-item", function () {
        var e = o(this);
        if (!e) {
            var t = s["default"](this), r = t.hasClass("selected");
            t.toggleClass("selected", !r), t.removeClass("indeterminate");
            var i = t.find("input[type=radio], input[type=checkbox]");
            i.prop("checked", !r).change();
            var l = !0, c = !1, d = void 0;
            try {
                for (var f, h = t[0].querySelectorAll("input[type=radio], input[type=checkbox]")[Symbol.iterator](); !(l = (f = h.next()).done); l = !0) {
                    var m = f.value;
                    n.changeValue(u["default"](m, HTMLInputElement), !r)
                }
            } catch (v) {
                c = !0, d = v
            } finally {
                try {
                    !l && h["return"] && h["return"]()
                } finally {
                    if (c)throw d
                }
            }
            a.fire(this, "selectmenu:selected")
        }
    })
}),define("github/select-menu/button", ["../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = t(e);
    n["default"](document).on("selectmenu:selected", ".js-select-menu .js-navigation-item", function () {
        var e = this.closest(".js-select-menu"), t = n["default"](this).find(".js-select-button-text");
        t[0] && n["default"](e).find(".js-select-button").html(t.html());
        var r = n["default"](this).find(".js-select-menu-item-gravatar");
        t[0] && n["default"](e).find(".js-select-button-gravatar").html(r.html())
    })
}),define("github/select-menu/css", ["../jquery", "../visible"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e), a = n(t);
    r["default"](document).on("selectmenu:change", ".js-select-menu .select-menu-list", function (e) {
        var t = r["default"](this).find(".js-navigation-item");
        if (t.removeClass("last-visible"), r["default"](Array.from(t).filter(a["default"])).last().addClass("last-visible"), !this.hasAttribute("data-filterable-for")) {
            var n = r["default"](e.target).hasClass("filterable-empty");
            r["default"](this).toggleClass("filterable-empty", n)
        }
    })
}),define("github/select-menu/filterable", ["../jquery", "delegated-events"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e);
    r["default"](document).on("menu:activated selectmenu:load", ".js-select-menu", function () {
        var e = this.querySelector(".js-filterable-field");
        e && e.focus()
    }), r["default"](document).on("menu:deactivate", ".js-select-menu", function () {
        var e = this.querySelector(".js-filterable-field");
        e && (e.value = "", t.fire(e, "filterable:change"));
        var n = !0, r = !1, a = void 0;
        try {
            for (var i, o = this.querySelectorAll(".js-navigation-item.selected")[Symbol.iterator](); !(n = (i = o.next()).done); n = !0) {
                var s = i.value, u = s.querySelector("input[type=radio], input[type=checkbox]");
                u && s.classList.toggle("selected", u.checked)
            }
        } catch (l) {
            r = !0, a = l
        } finally {
            try {
                !n && o["return"] && o["return"]()
            } finally {
                if (r)throw a
            }
        }
        var c = document.activeElement;
        if (c && this.contains(c))try {
            c.blur()
        } catch (d) {
        }
    })
}),define("github/select-menu/navigation", ["../navigation", "../jquery"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(t);
    r["default"](document).on("menu:activate", ".js-select-menu", function () {
        r["default"](this).find(":focus").blur(), r["default"](this).find(".js-menu-target").addClass("selected");
        var t = this.querySelector(".js-navigation-container");
        t && e.push(t)
    }), r["default"](document).on("menu:deactivate", ".js-select-menu", function () {
        r["default"](this).find(".js-menu-target").removeClass("selected");
        var t = this.querySelector(".js-navigation-container");
        t && e.pop(t)
    }), r["default"](document).on("filterable:change selectmenu:tabchange", ".js-select-menu .select-menu-list", function () {
        var t = this.closest(".js-select-menu"), n = t.querySelector(".js-navigation-container");
        n && e.refocus(n, this)
    })
}),define("github/select-menu/new", ["../jquery", "delegated-events"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e, t) {
        for (var n = e.querySelectorAll(".js-select-button-text, .js-select-menu-filter-text"), r = 0, a = n.length; a > r; r++) {
            var i = n[r], o = i.textContent.toLowerCase().trim();
            if (o === t.toLowerCase())return !0
        }
        return !1
    }

    var a = n(e);
    a["default"](document).on("filterable:change", ".js-select-menu .select-menu-list", function (e) {
        e = e.originalEvent;
        var n = this.querySelector(".js-new-item-form");
        if (n) {
            var i = e.relatedTarget.value;
            if ("" === i || r(this, i)) a["default"](this).removeClass("is-showing-new-item-form"); else {
                a["default"](this).addClass("is-showing-new-item-form");
                var o = n.querySelector(".js-new-item-name");
                "innerText" in o ? o.innerText = i : o.textContent = i;
                var s = n.querySelector(".js-new-item-value");
                s && (s.value = i)
            }
        }
        t.fire(e.target, "selectmenu:change")
    })
}),define("github/select-menu/tabs", ["../jquery", "delegated-events", "../observe"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e) {
        var t = !0, n = !1, r = void 0;
        try {
            for (var a, i = e.closest(".js-select-menu").querySelectorAll(".js-select-menu-tab")[Symbol.iterator](); !(t = (a = i.next()).done); t = !0) {
                var o = a.value;
                o !== e && (o.classList.remove("selected"), o.setAttribute("aria-current", !1))
            }
        } catch (s) {
            n = !0, r = s
        } finally {
            try {
                !t && i["return"] && i["return"]()
            } finally {
                if (n)throw r
            }
        }
        e.classList.add("selected"), e.setAttribute("aria-current", !0)
    }

    function i(e, n) {
        var r = e.getAttribute("data-tab-filter"), a = e.closest(".js-select-menu"), i = a.querySelectorAll(".js-select-menu-tab-bucket"), o = !0, s = !1, u = void 0;
        try {
            for (var l, c = i[Symbol.iterator](); !(o = (l = c.next()).done); o = !0) {
                var d = l.value;
                d.getAttribute("data-tab-filter") === r && (d.classList.toggle("selected", n), n && t.fire(d, "selectmenu:tabchange"))
            }
        } catch (f) {
            s = !0, u = f
        } finally {
            try {
                !o && c["return"] && c["return"]()
            } finally {
                if (s)throw u
            }
        }
    }

    var o = r(e);
    o["default"](document).on("menu:activate selectmenu:load", ".js-select-menu", function () {
        var e = this.querySelectorAll(".js-select-menu-tab"), t = e[0], n = !0, r = !1, i = void 0;
        try {
            for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done); n = !0) {
                var u = o.value;
                if (u.classList.contains("selected")) {
                    t = u;
                    break
                }
            }
        } catch (l) {
            r = !0, i = l
        } finally {
            try {
                !n && s["return"] && s["return"]()
            } finally {
                if (r)throw i
            }
        }
        t && a(t)
    }), o["default"](document).on("click", ".js-select-menu .js-select-menu-tab", function () {
        a(this);
        var e = this.closest(".js-select-menu").querySelector(".js-filterable-field");
        if (e) {
            var t = this.getAttribute("data-filter-placeholder");
            t && e.setAttribute("placeholder", t), e.focus()
        }
        return !1
    }), n.observe(".js-select-menu .js-select-menu-tab.selected", {
        add: function (e) {
            i(e, !0)
        }, remove: function (e) {
            i(e, !1)
        }
    })
}),define("github/select-menu", ["./select-menu/ajax", "./select-menu/base", "./select-menu/button", "./select-menu/css", "./select-menu/filterable", "./select-menu/loading", "./select-menu/navigation", "./select-menu/new", "./select-menu/tabs"], function () {
}),define("github/skip-autofill", ["invariant", "./onfocus"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e);
    t.onFocus(".js-skip-password-autofill", function (e) {
        r["default"](e instanceof HTMLInputElement), e.type = "password"
    })
}),define("github/smooth-scroll-anchor", ["./typecast", "./fragment-target", "delegated-events", "./scrollto"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var i = a(e), o = a(r);
    n.on("click", ".js-smoothscroll-anchor", function (e) {
        e.preventDefault();
        var n = this, r = i["default"](t.findFragmentTarget(document, n.hash), HTMLElement);
        o["default"](r, {duration: 250})
    })
}),define("github/sso-auto-replay", ["./observe", "./form"], function (e, t) {
    e.observe("form.js-auto-replay-enforced-sso-request", function (e) {
        t.submit(e)
    })
}),define("github/sudo-required", ["delegated-events", "./observe", "./sudo"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(n, r) {
        function a(t) {
            o || (t.preventDefault(), t.stopImmediatePropagation(), i["default"](r).then(function () {
                o = !0, t.target.submit(), o = !1
            })["catch"](function (n) {
                e.fire(t.target, "sudo:failed", {error: n})
            }))
        }

        t.observe(n, {
            add: function (e) {
                e.addEventListener("submit", a)
            }, remove: function (e) {
                e.removeEventListener("submit", a)
            }
        })
    }

    var i = r(n), o = !1;
    a("form.js-sudo-required", "low"), a("form.js-high-risk-sudo-required", "high")
}),define("github/task-list", ["jquery", "./observe", "delegated-events", "./form"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e) {
        e.target.classList.add("hovered")
    }

    function o(e) {
        e.target.classList.remove("hovered")
    }

    function s(e, t) {
        if (e.parentNode === t.parentNode)for (; e;) {
            if (e === t)return !0;
            e = e.previousElementSibling
        }
        return !1
    }

    function u(e, t) {
        return e.closest(".js-comment-body") === t.closest(".js-comment-body")
    }

    function l(e) {
        var t = e.parentNode, n = Array.from(t.children).filter(function (e) {
            return "OL" === e.nodeName || "UL" === e.nodeName
        });
        return n.indexOf(e)
    }

    function c(e) {
        e.dataTransfer.setData("text/plain", e.target.textContent.trim()), _ = e.target, L = !1, S = e.target, T = S.closest(".contains-task-list"), S.classList.add("is-ghost"), E = Array.from(S.parentNode.children), k = E.indexOf(S), x = E[k + 1] || null
    }

    function d(e) {
        if (S) {
            var t = e.currentTarget;
            if (!u(S, t))return void e.stopPropagation();
            e.preventDefault(), e.dataTransfer.dropEffect = "move", _ !== t && S && (S.classList.add("is-dragging"), _ = t, s(S, t) ? t.before(S) : t.after(S))
        }
    }

    function f(e) {
        if (S) {
            L = !0;
            var t = Array.from(S.parentNode.children).indexOf(S), n = e.currentTarget.closest(".contains-task-list");
            if (k !== t || T !== n) {
                T === n && t > k && t++;
                var r = e.target.closest(".js-task-list-container");
                j(r, "reordered", {operation: "move", src: [l(T), k], dst: [l(n), t]})
            }
        }
    }

    function h() {
        S.classList.remove("is-dragging"), S.classList.remove("is-ghost"), L || T.insertBefore(S, x), S = null, x = null, L = !1, _ = null
    }

    function m(e) {
        if (S) {
            var t = e.currentTarget;
            if (!u(S, t))return void e.stopPropagation();
            e.preventDefault(), e.dataTransfer.dropEffect = "move"
        }
    }

    function v() {
        var e = document.createElement("span"), t = document.createElementNS("http://www.w3.org/2000/svg", "svg"), n = document.createElementNS("http://www.w3.org/2000/svg", "path");
        return e.classList.add("handle"), t.classList.add("drag-handle"), t.setAttribute("aria-hidden", "true"), t.setAttribute("width", "16"), t.setAttribute("height", "15"), t.setAttribute("version", "1.1"), t.setAttribute("viewBox", "0 0 16 15"), n.setAttribute("d", "M12,4V5H4V4h8ZM4,8h8V7H4V8Zm0,3h8V10H4v1Z"), t.appendChild(n), e.appendChild(t), e
    }

    function p() {
        this.closest(".task-list-item").setAttribute("draggable", !0)
    }

    function g() {
        S || this.closest(".task-list-item").setAttribute("draggable", !1)
    }

    function y(e) {
        e.querySelectorAll(".js-task-list-field").length > 0 && (e.classList.add("is-task-list-enabled"), Array.from(e.querySelectorAll(".task-list-item")).forEach(function (e) {
            return e.classList.add("enabled")
        }), Array.from(e.querySelectorAll(".task-list-item-checkbox")).forEach(function (e) {
            return e.disabled = !1
        }))
    }

    function b(e) {
        e.classList.remove("is-task-list-enabled"), Array.from(e.querySelectorAll(".task-list-item")).forEach(function (e) {
            return e.classList.remove("enabled")
        }), Array.from(e.querySelectorAll(".task-list-item-checkbox")).forEach(function (e) {
            return e.disabled = !0
        })
    }

    function j(e, t, n) {
        var a = e.querySelector(".js-comment-update");
        b(e);
        var i = document.createElement("input");
        i.setAttribute("type", "hidden"), i.setAttribute("name", "task_list_track"), i.setAttribute("value", t), a.appendChild(i);
        var o = document.createElement("input");
        if (o.setAttribute("type", "hidden"), o.setAttribute("name", "task_list_operation"), o.setAttribute("value", JSON.stringify(n)), a.appendChild(o), !a.elements.task_list_key) {
            var s = document.createElement("input");
            s.setAttribute("type", "hidden"), s.setAttribute("name", "task_list_key"), s.setAttribute("value", a.querySelector(".js-task-list-field").getAttribute("name").split("[")[0]), a.appendChild(s)
        }
        e.classList.remove("is-comment-stale"), r.submit(a)
    }

    var w = a(e), L = !1, S = null, x = null, k = null, E = null, _ = null, T = null;
    t.observe(".contains-task-list", function (e) {
        var t = e.closest(".js-task-list-container");
        t && y(t)
    }), n.on("change", ".js-comment-body > .contains-task-list, .js-gist-file-update-container .markdown-body > .contains-task-list", function (e) {
        var t = this.closest(".js-task-list-container"), n = Array.from(this.querySelectorAll("li")), r = e.target, a = n.indexOf(r.closest(".task-list-item"));
        j(t, "checked:" + (r.checked ? 1 : 0), {operation: "check", position: [l(this), a], checked: r.checked})
    }), t.observe(".js-reorderable-task-lists .js-comment-body > .contains-task-list > .task-list-item", function (e) {
        if (!(e.closest(".js-comment-body").querySelectorAll(".task-list-item").length <= 1) && e.closest(".is-task-list-enabled")) {
            var t = v();
            e.insertBefore(t, e.firstChild), t.addEventListener("mouseenter", p), t.addEventListener("mouseleave", g), e.addEventListener("dragstart", c), e.addEventListener("dragenter", d), e.addEventListener("dragend", h), e.addEventListener("drop", f), e.addEventListener("dragover", m), e.addEventListener("mouseenter", i), e.addEventListener("mouseleave", o)
        }
    }), w["default"](document).on("ajaxComplete", ".js-comment-update", function (e, t) {
        var n = this.closest(".js-task-list-container");
        if (n) {
            var r = this.elements.task_list_track;
            r && r.remove();
            var a = this.elements.task_list_operation;
            if (a && a.remove(), 200 !== t.status || /^\s*</.test(t.responseText)) {
                if (422 === t.status && t.stale) {
                    var i = JSON.parse(t.responseText);
                    if (i) {
                        var o = i.updated_markdown, s = i.updated_html, u = i.version;
                        if (o && s && u) {
                            var l = n.querySelector(".js-comment-body"), c = n.querySelector(".js-task-list-field");
                            l.innerHTML = s, c.value = o, n.dataset.bodyVersion = u
                        }
                    } else window.location.reload()
                }
            } else {
                if (a) {
                    var d = JSON.parse(t.responseText);
                    d.source && (n.querySelector(".js-task-list-field").value = d.source)
                }
                y(n)
            }
        }
    })
}),define("github/team-breadcrumbs", ["./typecast", "invariant", "delegated-events", "./updatable-content"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var i = a(e), o = a(t);
    n.on("click", ".js-expandable-team-breadcrumbs .js-team-breadcrumb-trigger", function (e) {
        o["default"](e.target instanceof HTMLElement);
        var t = i["default"](e.target.closest(".js-expandable-team-breadcrumbs"), HTMLElement);
        t && (t.classList.add("is-loading"), r.updateContent(t)["catch"]().then(function () {
            t.classList.remove("is-loading")
        }))
    })
}),define("github/team-hierarchy", ["./fetch", "./jquery", "./throttled-input", "./typecast", "invariant", "./observe", "delegated-events"], function (e, t, n, r, a, i, o) {
    function s(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function u(t, n, r) {
        if (null != n[0]) {
            var a = !0, i = !1, o = void 0;
            try {
                for (var s, u = n[Symbol.iterator](); !(a = (s = u.next()).done); a = !0) {
                    var l = s.value;
                    l.classList.remove("d-none")
                }
            } catch (c) {
                i = !0, o = c
            } finally {
                try {
                    !a && u["return"] && u["return"]()
                } finally {
                    if (i)throw o
                }
            }
            t.classList.add("is-open"), m = !1
        } else e.fetchSafeDocumentFragment(document, r).then(function (e) {
            t.after(e), t.classList.add("is-open"), m = !1
        })
    }

    function l(e, t) {
        c(t), e.classList.remove("is-open"), m = !1
    }

    function c(e) {
        var t = !0, n = !1, r = void 0;
        try {
            for (var a, i = e[Symbol.iterator](); !(t = (a = i.next()).done); t = !0) {
                var o = a.value, s = String(o.getAttribute("data-team-slug")), u = document.querySelectorAll('.js-sub-team[data-parent-team-slug="' + s + '"]');
                c(u), o.classList.remove("is-open"), o.classList.add("d-none")
            }
        } catch (l) {
            n = !0, r = l
        } finally {
            try {
                !t && i["return"] && i["return"]()
            } finally {
                if (n)throw r
            }
        }
    }

    var d = s(t), f = s(r), h = s(a), m = !1;
    o.on("click", ".js-open-sub-team", function (e) {
        if (h["default"](e.currentTarget instanceof HTMLElement), m === !1) {
            m = !0;
            var t = e.currentTarget.getAttribute("data-parent-team-slug");
            if (t) {
                var n = document.querySelectorAll('.js-sub-team[data-parent-team-slug="' + t + '"]'), r = e.currentTarget.closest(".js-team-row");
                if (h["default"](r instanceof HTMLElement), r.classList.contains("is-open")) l(r, n); else {
                    var a = e.currentTarget.getAttribute("data-sub-team-url");
                    u(r, n, a)
                }
            }
        }
    }), o.on("click", ".js-show-more-child-teams", function () {
        if (m === !1) {
            m = !0;
            var t = this.closest(".js-team-row"), n = this.getAttribute("data-sub-team-url"), r = t.parentNode;
            e.fetchSafeDocumentFragment(document, n).then(function (e) {
                t.before(e), r && r.removeChild(t), m = !1
            })
        }
    }), i.observe(".js-parent-team-field", function (t) {
        n.addThrottledInputEventListener(t, function () {
            var n = t.getAttribute("data-contents-url"), r = t.value.trim(), a = e.fetchText(n + "&query=" + r);
            return a.then(function (e) {
                document.getElementsByClassName("js-parent-team-results")[0].innerHTML = e
            })
        })
    }), d["default"](document).on("menu:activated selectmenu:load", ".js-parent-team-select-menu", function () {
        this.getElementsByClassName("js-parent-team-field")[0].focus()
    }), o.on("selectmenu:selected", ".js-select-parent-team", function () {
        var e = this.getAttribute("data-parent-team-id"), t = f["default"](document.getElementById("team-parent-team-id"), HTMLInputElement), n = this.getElementsByClassName("js-parent-team-name")[0].innerHTML, r = f["default"](document.getElementById("team-parent-team-name"), HTMLInputElement);
        e !== t.value && (t.value = e, r.value = n)
    }), o.on("selectmenu:selected", ".js-clear-parent-selection", function () {
        document.getElementsByClassName("js-select-button")[0].innerHTML = "Select parent team"
    })
}),define("github/simulated-performance-timing", ["exports", "./session-storage"], function (e, t) {
    function n() {
        var e = t.getItem(a);
        return e ? parseInt(e, 10) : void 0
    }

    function r() {
        t.setItem(a, Date.now().toString())
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.getSimulatedNavigationStart = n;
    var a = "navigationStart";
    window.performance || window.performance.timing || window.addEventListener("pagehide", r)
}),define("github/timing-stats", ["./timers", "./simulated-performance-timing", "./document-ready", "./stats"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i() {
        if (window.chrome && window.chrome.loadTimes) {
            var e = window.chrome.loadTimes();
            return Math.round(1e3 * e.firstPaintTime)
        }
    }

    function o() {
        var e = {};
        e.crossBrowserLoadEvent = Date.now();
        var n = window.performance && window.performance.timing;
        if (n)for (var r in n) {
            var a = n[r];
            "number" == typeof a && (e[r] = a)
        } else {
            var o = t.getSimulatedNavigationStart();
            o && (e.simulatedNavigationStart = o)
        }
        var s = i();
        return s && (e.chromeFirstPaintTime = s), e
    }

    function s() {
        var e = [], t = window.performance;
        if (t) {
            var n = !0, r = !1, a = void 0;
            try {
                for (var i, o = t.getEntriesByType("resource")[Symbol.iterator](); !(n = (i = o.next()).done); n = !0) {
                    var s = i.value, u = {};
                    e.push(u);
                    for (var l in s) {
                        var c = s[l];
                        ("number" == typeof c || "string" == typeof c) && (u[l] = c)
                    }
                }
            } catch (d) {
                r = !0, a = d
            } finally {
                try {
                    !n && o["return"] && o["return"]()
                } finally {
                    if (r)throw a
                }
            }
        }
        return e
    }

    var u = a(r);
    !function () {
        var t, r;
        return regeneratorRuntime.async(function (a) {
            for (; ;)switch (a.prev = a.next) {
                case 0:
                    return a.next = 2, regeneratorRuntime.awrap(n.loaded);
                case 2:
                    return a.next = 4, regeneratorRuntime.awrap(e.delay(0));
                case 4:
                    t = o(), Object.keys(t).length > 1 && u["default"]({timing: t}), r = s(), r.length && u["default"]({resources: r});
                case 8:
                case"end":
                    return a.stop()
            }
        }, null, this)
    }()
}),define("github/issues/bookmark-toggler", ["../jquery", "../typecast"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e), a = n(t);
    r["default"](document).on("ajaxError", ".js-bookmark-toggler-container", function (e, t) {
        var n = JSON.parse(t.responseText);
        if (n && n.error) {
            e.preventDefault();
            var r = a["default"](this.closest(".js-bookmark-toggler-container"), HTMLElement), i = a["default"](document.querySelector(".js-bookmarking-error"), HTMLElement), o = a["default"](i.querySelector(".js-bookmarking-error-message"), HTMLElement);
            r.classList.toggle("on"), i.classList.add("visible"), o.textContent = n.error
        }
    })
}),define("github/toggler", ["./jquery", "delegated-events", "./issues/bookmark-toggler"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e);
    t.on("click", ".js-toggler-container .js-toggler-target", function (e) {
        if (1 === e.which) {
            var t = this.closest(".js-toggler-container");
            t.classList.toggle("on")
        }
    }), r["default"](document).on("ajaxSend", ".js-toggler-container", function () {
        this.classList.remove("success", "error"), this.classList.add("loading")
    }), r["default"](document).on("ajaxComplete", ".js-toggler-container", function () {
        this.classList.remove("loading")
    }), r["default"](document).on("ajaxSuccess", ".js-toggler-container", function () {
        this.classList.add("success")
    }), r["default"](document).on("ajaxError", ".js-toggler-container", function () {
        this.classList.add("error")
    })
}),define("github/topics", ["./jquery", "./typecast", "./fetch", "invariant", "delegated-events", "./form", "./details"], function (e, t, n, r, a, i, o) {
    function s(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function u(e) {
        var t = v["default"](e, HTMLElement).querySelector(".js-repo-topics-save-notice");
        t && (t.classList.remove("d-none"), m["default"](t).fadeIn(400, function () {
            t.classList.add("d-inline-block"), setTimeout(function () {
                m["default"](t).fadeOut(400, function () {
                    t.classList.remove("d-inline-block"), t.classList.add("d-none")
                })
            }, 1500)
        }))
    }

    function l(e) {
        p["default"](e instanceof HTMLElement);
        var t = e.querySelector(".js-topic-suggestions-box");
        p["default"](t instanceof HTMLElement);
        var n = t.querySelectorAll(".js-topic-suggestion");
        n.length < 1 && t.remove()
    }

    function c(e) {
        var t = v["default"](document.querySelector(".js-repo-meta-container"), HTMLElement), n = v["default"](document.getElementById("topics-list-container"), HTMLElement), r = v["default"](t.querySelector(".js-repo-meta-edit"), HTMLElement), a = v["default"](t.querySelector(".js-edit-repo-meta-button"), HTMLButtonElement);
        a.classList.toggle("d-none", e), n.classList.toggle("d-none", e), r.classList.toggle("d-none", e)
    }

    function d() {
        c(!0)
    }

    function f() {
        c(!1);
        var e = v["default"](document.getElementById("topics-list-container"), HTMLElement), t = e.getAttribute("data-url");
        p["default"](t, "`data-url` must exist"), n.fetchSafeDocumentFragment(document, t).then(function (t) {
            e.innerHTML = "", e.appendChild(t)
        })
    }

    function h(e) {
        p["default"](e instanceof HTMLElement);
        var t = e.querySelector(".js-topic-suggestions-container");
        if (t) {
            var r = t.getAttribute("data-url");
            p["default"](r, "`data-url` must exist"), n.fetchSafeDocumentFragment(document, r).then(function (e) {
                t.innerHTML = "", t.appendChild(e)
            })
        }
    }

    var m = s(e), v = s(t), p = s(r);
    m["default"](document).on("ajaxSuccess", ".js-accept-topic-form", function () {
        var e = v["default"](this.closest(".js-topic-suggestion"), HTMLElement), t = this.closest(".js-topic-form-area"), n = e.closest(".js-topic-save-notice-container"), r = v["default"](this.closest(".js-topic-form-area"), HTMLElement), a = v["default"](r.querySelector(".js-template"), HTMLElement), i = v["default"](r.querySelector(".js-tag-input-selected-tags"), HTMLElement), o = a.cloneNode(!0), s = e.querySelector('input[name="input[name]"]');
        p["default"](s instanceof HTMLInputElement);
        var c = s.value.toString();
        v["default"](o.querySelector("input"), HTMLInputElement).value = c, v["default"](o.querySelector(".js-placeholder-tag-name"), HTMLElement).replaceWith(c), o.classList.remove("d-none", "js-template"), i.appendChild(o), e.remove(), h(t), l(t), u(n)
    }), a.on("click", ".js-repo-topics-form-done", function (e) {
        p["default"](e.target instanceof HTMLElement), o.toggleDetailsTarget(e.target), f()
    }), m["default"](document).on("ajaxSuccess", ".js-decline-topic-form", function () {
        u(this.closest(".js-topic-save-notice-container"));
        var e = this.closest(".js-topic-form-area");
        this.closest(".js-topic-suggestion").remove(), h(e), l(e)
    }), m["default"](document).on("ajaxSend", ".js-repo-topics-edit-form", function () {
        var e = this.closest(".js-topic-form-area");
        e.classList.remove("errored");
        var t = e.querySelector(".js-topic-error");
        t.textContent = "";
        var n = e.querySelectorAll(".js-tag-input-tag.invalid-topic"), r = !0, a = !1, i = void 0;
        try {
            for (var o, s = n[Symbol.iterator](); !(r = (o = s.next()).done); r = !0) {
                var u = o.value;
                u.classList.remove("invalid-topic")
            }
        } catch (l) {
            a = !0, i = l
        } finally {
            try {
                !r && s["return"] && s["return"]()
            } finally {
                if (a)throw i
            }
        }
    }), m["default"](document).on("ajaxSuccess", ".js-repo-topics-edit-form", function () {
        u(this.closest(".js-topic-save-notice-container")), h(this.closest(".js-topic-form-area"))
    }), m["default"](document).on("ajaxError", ".js-repo-topics-edit-form", function (e, t) {
        if (t.responseJSON) {
            if (t.responseJSON.message) {
                e.preventDefault();
                var n = this.closest(".js-topic-form-area");
                n.classList.add("errored");
                var r = n.querySelector(".js-topic-error");
                r.textContent = t.responseJSON.message
            }
            if (t.responseJSON.invalidTopics) {
                var a = t.responseJSON.invalidTopics, i = this.querySelectorAll(".js-topic-input"), o = !0, s = !1, u = void 0;
                try {
                    for (var l, c = a[Symbol.iterator](); !(o = (l = c.next()).done); o = !0) {
                        var d = l.value, f = !0, h = !1, m = void 0;
                        try {
                            for (var v, p = i[Symbol.iterator](); !(f = (v = p.next()).done); f = !0) {
                                var g = v.value;
                                g.value === d && g.closest(".js-tag-input-tag").classList.add("invalid-topic")
                            }
                        } catch (y) {
                            h = !0, m = y
                        } finally {
                            try {
                                !f && p["return"] && p["return"]()
                            } finally {
                                if (h)throw m
                            }
                        }
                    }
                } catch (y) {
                    s = !0, u = y
                } finally {
                    try {
                        !o && c["return"] && c["return"]()
                    } finally {
                        if (s)throw u
                    }
                }
            }
        }
    }), a.on("tags:changed", ".js-repo-topics-edit-form", function (e) {
        var t = v["default"](e.target, HTMLFormElement);
        i.submit(t)
    }), a.on("click", ".js-repo-topics-form-toggle", function (e) {
        var t = v["default"](e.target.closest(".js-repo-meta-container"), HTMLElement), n = t.querySelector(".js-repo-topics-form-fragment");
        if (n) {
            n.classList.remove("d-none");
            var r = n.getAttribute("data-url");
            p["default"](r, "`data-url` must exist"), n.setAttribute("src", r)
        }
        var a = t.querySelector(".js-repository-topics-container"), i = v["default"](a, HTMLElement).classList.contains("open");
        i ? d() : f()
    }), a.on("click", ".js-edit-repo-meta-toggle", function (e) {
        var t = v["default"](e.target.closest(".js-repo-meta-container"), HTMLElement), n = t.querySelector(".js-repo-meta-edit"), r = v["default"](n, HTMLElement).classList.contains("open"), a = t.querySelector(".js-repository-topics-container");
        a && (a = v["default"](a, HTMLElement), a.classList.toggle("d-none", r))
    })
}),define("github/touch-events-observer", ["./observe"], function (e) {
    function t() {
    }

    e.observe(".js-touch-events", {
        add: function (e) {
            e.addEventListener("click", t)
        }, remove: function (e) {
            e.removeEventListener("click", t)
        }
    })
}),define.register("jstimezonedetect"),function (e) {
    var t = function () {
        "use strict";
        var e = "s", n = {
            DAY: 864e5,
            HOUR: 36e5,
            MINUTE: 6e4,
            SECOND: 1e3,
            BASELINE_YEAR: 2014,
            MAX_SCORE: 864e6,
            AMBIGUITIES: {
                "America/Denver": ["America/Mazatlan"],
                "Europe/London": ["Africa/Casablanca"],
                "America/Chicago": ["America/Mexico_City"],
                "America/Asuncion": ["America/Campo_Grande", "America/Santiago"],
                "America/Montevideo": ["America/Sao_Paulo", "America/Santiago"],
                "Asia/Beirut": ["Asia/Amman", "Asia/Jerusalem", "Europe/Helsinki", "Asia/Damascus", "Africa/Cairo", "Asia/Gaza", "Europe/Minsk"],
                "Pacific/Auckland": ["Pacific/Fiji"],
                "America/Los_Angeles": ["America/Santa_Isabel"],
                "America/New_York": ["America/Havana"],
                "America/Halifax": ["America/Goose_Bay"],
                "America/Godthab": ["America/Miquelon"],
                "Asia/Dubai": ["Asia/Yerevan"],
                "Asia/Jakarta": ["Asia/Krasnoyarsk"],
                "Asia/Shanghai": ["Asia/Irkutsk", "Australia/Perth"],
                "Australia/Sydney": ["Australia/Lord_Howe"],
                "Asia/Tokyo": ["Asia/Yakutsk"],
                "Asia/Dhaka": ["Asia/Omsk"],
                "Asia/Baku": ["Asia/Yerevan"],
                "Australia/Brisbane": ["Asia/Vladivostok"],
                "Pacific/Noumea": ["Asia/Vladivostok"],
                "Pacific/Majuro": ["Asia/Kamchatka", "Pacific/Fiji"],
                "Pacific/Tongatapu": ["Pacific/Apia"],
                "Asia/Baghdad": ["Europe/Minsk", "Europe/Moscow"],
                "Asia/Karachi": ["Asia/Yekaterinburg"],
                "Africa/Johannesburg": ["Asia/Gaza", "Africa/Cairo"]
            }
        }, r = function (e) {
            var t = -e.getTimezoneOffset();
            return null !== t ? t : 0
        }, a = function () {
            var t = r(new Date(n.BASELINE_YEAR, 0, 2)), a = r(new Date(n.BASELINE_YEAR, 5, 2)), i = t - a;
            return 0 > i ? t + ",1" : i > 0 ? a + ",1," + e : t + ",0"
        }, i = function () {
            var e, t;
            if ("undefined" != typeof Intl && "undefined" != typeof Intl.DateTimeFormat && (e = Intl.DateTimeFormat(), "undefined" != typeof e && "undefined" != typeof e.resolvedOptions))return t = e.resolvedOptions().timeZone, t && (t.indexOf("/") > -1 || "UTC" === t) ? t : void 0
        }, o = function (e) {
            for (var t = new Date(e, 0, 1, 0, 0, 1, 0).getTime(), n = new Date(e, 12, 31, 23, 59, 59).getTime(), r = t, a = new Date(r).getTimezoneOffset(), i = null, o = null; n - 864e5 > r;) {
                var u = new Date(r), l = u.getTimezoneOffset();
                l !== a && (a > l && (i = u), l > a && (o = u), a = l), r += 864e5
            }
            return i && o ? {s: s(i).getTime(), e: s(o).getTime()} : !1
        }, s = function f(e, t, r) {
            "undefined" == typeof t && (t = n.DAY, r = n.HOUR);
            for (var a = new Date(e.getTime() - t).getTime(), i = e.getTime() + t, o = new Date(a).getTimezoneOffset(), s = a, u = null; i - r > s;) {
                var l = new Date(s), c = l.getTimezoneOffset();
                if (c !== o) {
                    u = l;
                    break
                }
                s += r
            }
            return t === n.DAY ? f(u, n.HOUR, n.MINUTE) : t === n.HOUR ? f(u, n.MINUTE, n.SECOND) : u
        }, u = function (e, t, n, r) {
            if ("N/A" !== n)return n;
            if ("Asia/Beirut" === t) {
                if ("Africa/Cairo" === r.name && 13983768e5 === e[6].s && 14116788e5 === e[6].e)return 0;
                if ("Asia/Jerusalem" === r.name && 13959648e5 === e[6].s && 14118588e5 === e[6].e)return 0
            } else if ("America/Santiago" === t) {
                if ("America/Asuncion" === r.name && 14124816e5 === e[6].s && 1397358e6 === e[6].e)return 0;
                if ("America/Campo_Grande" === r.name && 14136912e5 === e[6].s && 13925196e5 === e[6].e)return 0
            } else if ("America/Montevideo" === t) {
                if ("America/Sao_Paulo" === r.name && 14136876e5 === e[6].s && 1392516e6 === e[6].e)return 0
            } else if ("Pacific/Auckland" === t && "Pacific/Fiji" === r.name && 14142456e5 === e[6].s && 13961016e5 === e[6].e)return 0;
            return n
        }, l = function (e, r) {
            for (var a = function (t) {
                for (var a = 0, i = 0; i < e.length; i++)if (t.rules[i] && e[i]) {
                    if (!(e[i].s >= t.rules[i].s && e[i].e <= t.rules[i].e)) {
                        a = "N/A";
                        break
                    }
                    if (a = 0, a += Math.abs(e[i].s - t.rules[i].s), a += Math.abs(t.rules[i].e - e[i].e), a > n.MAX_SCORE) {
                        a = "N/A";
                        break
                    }
                }
                return a = u(e, r, a, t)
            }, i = {}, o = t.olson.dst_rules.zones, s = o.length, l = n.AMBIGUITIES[r], c = 0; s > c; c++) {
                var d = o[c], f = a(o[c]);
                "N/A" !== f && (i[d.name] = f)
            }
            for (var h in i)if (i.hasOwnProperty(h))for (var m = 0; m < l.length; m++)if (l[m] === h)return h;
            return r
        }, c = function (e) {
            var n = function () {
                for (var e = [], n = 0; n < t.olson.dst_rules.years.length; n++) {
                    var r = o(t.olson.dst_rules.years[n]);
                    e.push(r)
                }
                return e
            }, r = function (e) {
                for (var t = 0; t < e.length; t++)if (e[t] !== !1)return !0;
                return !1
            }, a = n(), i = r(a);
            return i ? l(a, e) : e
        }, d = function () {
            var e = i();
            return e || (e = t.olson.timezones[a()], "undefined" != typeof n.AMBIGUITIES[e] && (e = c(e))), {
                name: function () {
                    return e
                }
            }
        };
        return {determine: d}
    }();
    t.olson = t.olson || {}, t.olson.timezones = {
        "-720,0": "Etc/GMT+12",
        "-660,0": "Pacific/Pago_Pago",
        "-660,1,s": "Pacific/Apia",
        "-600,1": "America/Adak",
        "-600,0": "Pacific/Honolulu",
        "-570,0": "Pacific/Marquesas",
        "-540,0": "Pacific/Gambier",
        "-540,1": "America/Anchorage",
        "-480,1": "America/Los_Angeles",
        "-480,0": "Pacific/Pitcairn",
        "-420,0": "America/Phoenix",
        "-420,1": "America/Denver",
        "-360,0": "America/Guatemala",
        "-360,1": "America/Chicago",
        "-360,1,s": "Pacific/Easter",
        "-300,0": "America/Bogota",
        "-300,1": "America/New_York",
        "-270,0": "America/Caracas",
        "-240,1": "America/Halifax",
        "-240,0": "America/Santo_Domingo",
        "-240,1,s": "America/Asuncion",
        "-210,1": "America/St_Johns",
        "-180,1": "America/Godthab",
        "-180,0": "America/Argentina/Buenos_Aires",
        "-180,1,s": "America/Montevideo",
        "-120,0": "America/Noronha",
        "-120,1": "America/Noronha",
        "-60,1": "Atlantic/Azores",
        "-60,0": "Atlantic/Cape_Verde",
        "0,0": "UTC",
        "0,1": "Europe/London",
        "60,1": "Europe/Berlin",
        "60,0": "Africa/Lagos",
        "60,1,s": "Africa/Windhoek",
        "120,1": "Asia/Beirut",
        "120,0": "Africa/Johannesburg",
        "180,0": "Asia/Baghdad",
        "180,1": "Europe/Moscow",
        "210,1": "Asia/Tehran",
        "240,0": "Asia/Dubai",
        "240,1": "Asia/Baku",
        "270,0": "Asia/Kabul",
        "300,1": "Asia/Yekaterinburg",
        "300,0": "Asia/Karachi",
        "330,0": "Asia/Kolkata",
        "345,0": "Asia/Kathmandu",
        "360,0": "Asia/Dhaka",
        "360,1": "Asia/Omsk",
        "390,0": "Asia/Rangoon",
        "420,1": "Asia/Krasnoyarsk",
        "420,0": "Asia/Jakarta",
        "480,0": "Asia/Shanghai",
        "480,1": "Asia/Irkutsk",
        "525,0": "Australia/Eucla",
        "525,1,s": "Australia/Eucla",
        "540,1": "Asia/Yakutsk",
        "540,0": "Asia/Tokyo",
        "570,0": "Australia/Darwin",
        "570,1,s": "Australia/Adelaide",
        "600,0": "Australia/Brisbane",
        "600,1": "Asia/Vladivostok",
        "600,1,s": "Australia/Sydney",
        "630,1,s": "Australia/Lord_Howe",
        "660,1": "Asia/Kamchatka",
        "660,0": "Pacific/Noumea",
        "690,0": "Pacific/Norfolk",
        "720,1,s": "Pacific/Auckland",
        "720,0": "Pacific/Majuro",
        "765,1,s": "Pacific/Chatham",
        "780,0": "Pacific/Tongatapu",
        "780,1,s": "Pacific/Apia",
        "840,0": "Pacific/Kiritimati"
    }, t.olson.dst_rules = {
        years: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        zones: [{
            name: "Africa/Cairo",
            rules: [{e: 12199572e5, s: 12090744e5}, {e: 1250802e6, s: 1240524e6}, {
                e: 12858804e5,
                s: 12840696e5
            }, !1, !1, !1, {e: 14116788e5, s: 1406844e6}]
        }, {
            name: "Africa/Casablanca",
            rules: [{e: 12202236e5, s: 12122784e5}, {e: 12508092e5, s: 12438144e5}, {
                e: 1281222e6,
                s: 12727584e5
            }, {e: 13120668e5, s: 13017888e5}, {e: 13489704e5, s: 1345428e6}, {
                e: 13828392e5,
                s: 13761e8
            }, {e: 14142888e5, s: 14069448e5}]
        }, {
            name: "America/Asuncion",
            rules: [{e: 12050316e5, s: 12243888e5}, {e: 12364812e5, s: 12558384e5}, {
                e: 12709548e5,
                s: 12860784e5
            }, {e: 13024044e5, s: 1317528e6}, {e: 1333854e6, s: 13495824e5}, {
                e: 1364094e6,
                s: 1381032e6
            }, {e: 13955436e5, s: 14124816e5}]
        }, {
            name: "America/Campo_Grande",
            rules: [{e: 12032172e5, s: 12243888e5}, {e: 12346668e5, s: 12558384e5}, {
                e: 12667212e5,
                s: 1287288e6
            }, {e: 12981708e5, s: 13187376e5}, {e: 13302252e5, s: 1350792e6}, {
                e: 136107e7,
                s: 13822416e5
            }, {e: 13925196e5, s: 14136912e5}]
        }, {
            name: "America/Goose_Bay",
            rules: [{e: 122559486e4, s: 120503526e4}, {e: 125704446e4, s: 123648486e4}, {
                e: 128909886e4,
                s: 126853926e4
            }, {e: 13205556e5, s: 129998886e4}, {e: 13520052e5, s: 13314456e5}, {
                e: 13834548e5,
                s: 13628952e5
            }, {e: 14149044e5, s: 13943448e5}]
        }, {
            name: "America/Havana",
            rules: [{e: 12249972e5, s: 12056436e5}, {e: 12564468e5, s: 12364884e5}, {
                e: 12885012e5,
                s: 12685428e5
            }, {e: 13211604e5, s: 13005972e5}, {e: 13520052e5, s: 13332564e5}, {
                e: 13834548e5,
                s: 13628916e5
            }, {e: 14149044e5, s: 13943412e5}]
        }, {
            name: "America/Mazatlan",
            rules: [{e: 1225008e6, s: 12074724e5}, {e: 12564576e5, s: 1238922e6}, {
                e: 1288512e6,
                s: 12703716e5
            }, {e: 13199616e5, s: 13018212e5}, {e: 13514112e5, s: 13332708e5}, {
                e: 13828608e5,
                s: 13653252e5
            }, {e: 14143104e5, s: 13967748e5}]
        }, {
            name: "America/Mexico_City",
            rules: [{e: 12250044e5, s: 12074688e5}, {e: 1256454e6, s: 12389184e5}, {
                e: 12885084e5,
                s: 1270368e6
            }, {e: 1319958e6, s: 13018176e5}, {e: 13514076e5, s: 13332672e5}, {
                e: 13828572e5,
                s: 13653216e5
            }, {e: 14143068e5, s: 13967712e5}]
        }, {
            name: "America/Miquelon",
            rules: [{e: 12255984e5, s: 12050388e5}, {e: 1257048e6, s: 12364884e5}, {
                e: 12891024e5,
                s: 12685428e5
            }, {e: 1320552e6, s: 12999924e5}, {e: 13520016e5, s: 1331442e6}, {
                e: 13834512e5,
                s: 13628916e5
            }, {e: 14149008e5, s: 13943412e5}]
        }, {
            name: "America/Santa_Isabel",
            rules: [{e: 12250116e5, s: 1207476e6}, {e: 12564612e5, s: 12389256e5}, {
                e: 12885156e5,
                s: 12703752e5
            }, {e: 13199652e5, s: 13018248e5}, {e: 13514148e5, s: 13332744e5}, {
                e: 13828644e5,
                s: 13653288e5
            }, {e: 1414314e6, s: 13967784e5}]
        }, {
            name: "America/Santiago",
            rules: [{e: 1206846e6, s: 1223784e6}, {e: 1237086e6, s: 12552336e5}, {
                e: 127035e7,
                s: 12866832e5
            }, {e: 13048236e5, s: 13138992e5}, {e: 13356684e5, s: 13465584e5}, {
                e: 1367118e6,
                s: 13786128e5
            }, {e: 13985676e5, s: 14100624e5}]
        }, {
            name: "America/Sao_Paulo",
            rules: [{e: 12032136e5, s: 12243852e5}, {e: 12346632e5, s: 12558348e5}, {
                e: 12667176e5,
                s: 12872844e5
            }, {e: 12981672e5, s: 1318734e6}, {e: 13302216e5, s: 13507884e5}, {
                e: 13610664e5,
                s: 1382238e6
            }, {e: 1392516e6, s: 14136876e5}]
        }, {
            name: "Asia/Amman",
            rules: [{e: 1225404e6, s: 12066552e5}, {e: 12568536e5, s: 12381048e5}, {
                e: 12883032e5,
                s: 12695544e5
            }, {e: 13197528e5, s: 13016088e5}, !1, !1, {e: 14147064e5, s: 13959576e5}]
        }, {
            name: "Asia/Damascus",
            rules: [{e: 12254868e5, s: 120726e7}, {e: 125685e7, s: 12381048e5}, {
                e: 12882996e5,
                s: 12701592e5
            }, {e: 13197492e5, s: 13016088e5}, {e: 13511988e5, s: 13330584e5}, {
                e: 13826484e5,
                s: 1364508e6
            }, {e: 14147028e5, s: 13959576e5}]
        }, {name: "Asia/Dubai", rules: [!1, !1, !1, !1, !1, !1, !1]}, {
            name: "Asia/Gaza",
            rules: [{e: 12199572e5, s: 12066552e5}, {e: 12520152e5, s: 12381048e5}, {
                e: 1281474e6,
                s: 126964086e4
            }, {e: 1312146e6, s: 130160886e4}, {e: 13481784e5, s: 13330584e5}, {
                e: 13802292e5,
                s: 1364508e6
            }, {e: 1414098e6, s: 13959576e5}]
        }, {
            name: "Asia/Irkutsk",
            rules: [{e: 12249576e5, s: 12068136e5}, {e: 12564072e5, s: 12382632e5}, {
                e: 12884616e5,
                s: 12697128e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Jerusalem",
            rules: [{e: 12231612e5, s: 12066624e5}, {e: 1254006e6, s: 1238112e6}, {
                e: 1284246e6,
                s: 12695616e5
            }, {e: 131751e7, s: 1301616e6}, {e: 13483548e5, s: 13330656e5}, {
                e: 13828284e5,
                s: 13645152e5
            }, {e: 1414278e6, s: 13959648e5}]
        }, {
            name: "Asia/Kamchatka",
            rules: [{e: 12249432e5, s: 12067992e5}, {e: 12563928e5, s: 12382488e5}, {
                e: 12884508e5,
                s: 12696984e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Krasnoyarsk",
            rules: [{e: 12249612e5, s: 12068172e5}, {e: 12564108e5, s: 12382668e5}, {
                e: 12884652e5,
                s: 12697164e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Omsk",
            rules: [{e: 12249648e5, s: 12068208e5}, {e: 12564144e5, s: 12382704e5}, {
                e: 12884688e5,
                s: 126972e7
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Vladivostok",
            rules: [{e: 12249504e5, s: 12068064e5}, {e: 12564e8, s: 1238256e6}, {
                e: 12884544e5,
                s: 12697056e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Yakutsk",
            rules: [{e: 1224954e6, s: 120681e7}, {e: 12564036e5, s: 12382596e5}, {
                e: 1288458e6,
                s: 12697092e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Yekaterinburg",
            rules: [{e: 12249684e5, s: 12068244e5}, {e: 1256418e6, s: 1238274e6}, {
                e: 12884724e5,
                s: 12697236e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Yerevan",
            rules: [{e: 1224972e6, s: 1206828e6}, {e: 12564216e5, s: 12382776e5}, {
                e: 1288476e6,
                s: 12697272e5
            }, {e: 13199256e5, s: 13011768e5}, !1, !1, !1]
        }, {
            name: "Australia/Lord_Howe",
            rules: [{e: 12074076e5, s: 12231342e5}, {e: 12388572e5, s: 12545838e5}, {
                e: 12703068e5,
                s: 12860334e5
            }, {e: 13017564e5, s: 1317483e6}, {e: 1333206e6, s: 13495374e5}, {
                e: 13652604e5,
                s: 1380987e6
            }, {e: 139671e7, s: 14124366e5}]
        }, {
            name: "Australia/Perth",
            rules: [{e: 12068136e5, s: 12249576e5}, !1, !1, !1, !1, !1, !1]
        }, {
            name: "Europe/Helsinki",
            rules: [{e: 12249828e5, s: 12068388e5}, {e: 12564324e5, s: 12382884e5}, {
                e: 12884868e5,
                s: 1269738e6
            }, {e: 13199364e5, s: 13011876e5}, {e: 1351386e6, s: 13326372e5}, {
                e: 13828356e5,
                s: 13646916e5
            }, {e: 14142852e5, s: 13961412e5}]
        }, {
            name: "Europe/Minsk",
            rules: [{e: 12249792e5, s: 12068352e5}, {e: 12564288e5, s: 12382848e5}, {
                e: 12884832e5,
                s: 12697344e5
            }, !1, !1, !1, !1]
        }, {
            name: "Europe/Moscow",
            rules: [{e: 12249756e5, s: 12068316e5}, {e: 12564252e5, s: 12382812e5}, {
                e: 12884796e5,
                s: 12697308e5
            }, !1, !1, !1, !1]
        }, {
            name: "Pacific/Apia",
            rules: [!1, !1, !1, {e: 13017528e5, s: 13168728e5}, {e: 13332024e5, s: 13489272e5}, {
                e: 13652568e5,
                s: 13803768e5
            }, {e: 13967064e5, s: 14118264e5}]
        }, {
            name: "Pacific/Fiji",
            rules: [!1, !1, {e: 12696984e5, s: 12878424e5}, {e: 13271544e5, s: 1319292e6}, {
                e: 1358604e6,
                s: 13507416e5
            }, {e: 139005e7, s: 1382796e6}, {e: 14215032e5, s: 14148504e5}]
        }, {
            name: "Europe/London",
            rules: [{e: 12249828e5, s: 12068388e5}, {e: 12564324e5, s: 12382884e5}, {
                e: 12884868e5,
                s: 1269738e6
            }, {e: 13199364e5, s: 13011876e5}, {e: 1351386e6, s: 13326372e5}, {
                e: 13828356e5,
                s: 13646916e5
            }, {e: 14142852e5, s: 13961412e5}]
        }]
    }, "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = t : "undefined" != typeof define && null !== define && null != define.amd ? define([], function () {
        return t
    }) : "undefined" == typeof e ? window.jstz = t : e.jstz = t
}(),define.registerEnd(),define("github/tz-cookie", ["jstimezonedetect", "./timezone"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r() {
        try {
            return a["default"].determine().name()
        } catch (e) {
            if (!(e instanceof RangeError))throw e
        }
    }

    var a = n(e), i = n(t);
    requestIdleCallback(function () {
        var e = i["default"]() || r();
        if (e) {
            var t = "https:" === location.protocol ? "secure" : "";
            document.cookie = "tz=" + encodeURIComponent(e) + "; path=/; " + t
        }
    })
}),define.register("u2f-api-polyfill"),
function () {
    var e = "chrome" in window && window.navigator.userAgent.indexOf("Edge") < 0;
    if (!("u2f" in window) && e) {
        var t, n = window.u2f = {};
        n.EXTENSION_ID = "kmendfapggjehodndflmmgagdbamhnfd", n.MessageTypes = {
            U2F_REGISTER_REQUEST: "u2f_register_request",
            U2F_REGISTER_RESPONSE: "u2f_register_response",
            U2F_SIGN_REQUEST: "u2f_sign_request",
            U2F_SIGN_RESPONSE: "u2f_sign_response",
            U2F_GET_API_VERSION_REQUEST: "u2f_get_api_version_request",
            U2F_GET_API_VERSION_RESPONSE: "u2f_get_api_version_response"
        }, n.ErrorCodes = {
            OK: 0,
            OTHER_ERROR: 1,
            BAD_REQUEST: 2,
            CONFIGURATION_UNSUPPORTED: 3,
            DEVICE_INELIGIBLE: 4,
            TIMEOUT: 5
        }, n.U2fRequest, n.U2fResponse, n.Error, n.Transport, n.Transports, n.SignRequest, n.SignResponse, n.RegisterRequest, n.RegisterResponse, n.RegisteredKey, n.GetJsApiVersionResponse, n.getMessagePort = function (e) {
            if ("undefined" != typeof chrome && chrome.runtime) {
                var t = {type: n.MessageTypes.U2F_SIGN_REQUEST, signRequests: []};
                chrome.runtime.sendMessage(n.EXTENSION_ID, t, function () {
                    chrome.runtime.lastError ? n.getIframePort_(e) : n.getChromeRuntimePort_(e)
                })
            } else n.isAndroidChrome_() ? n.getAuthenticatorPort_(e) : n.isIosChrome_() ? n.getIosPort_(e) : n.getIframePort_(e)
        }, n.isAndroidChrome_ = function () {
            var e = navigator.userAgent;
            return -1 != e.indexOf("Chrome") && -1 != e.indexOf("Android")
        }, n.isIosChrome_ = function () {
            return ["iPhone", "iPad", "iPod"].indexOf(navigator.platform) > -1
        }, n.getChromeRuntimePort_ = function (e) {
            var t = chrome.runtime.connect(n.EXTENSION_ID, {includeTlsChannelId: !0});
            setTimeout(function () {
                e(new n.WrappedChromeRuntimePort_(t))
            }, 0)
        }, n.getAuthenticatorPort_ = function (e) {
            setTimeout(function () {
                e(new n.WrappedAuthenticatorPort_)
            }, 0)
        }, n.getIosPort_ = function (e) {
            setTimeout(function () {
                e(new n.WrappedIosPort_)
            }, 0)
        }, n.WrappedChromeRuntimePort_ = function (e) {
            this.port_ = e
        }, n.formatSignRequest_ = function (e, r, a, i, o) {
            if (void 0 === t || 1.1 > t) {
                for (var s = [], u = 0; u < a.length; u++)s[u] = {
                    version: a[u].version,
                    challenge: r,
                    keyHandle: a[u].keyHandle,
                    appId: e
                };
                return {type: n.MessageTypes.U2F_SIGN_REQUEST, signRequests: s, timeoutSeconds: i, requestId: o}
            }
            return {
                type: n.MessageTypes.U2F_SIGN_REQUEST,
                appId: e,
                challenge: r,
                registeredKeys: a,
                timeoutSeconds: i,
                requestId: o
            }
        }, n.formatRegisterRequest_ = function (e, r, a, i, o) {
            if (void 0 === t || 1.1 > t) {
                for (var s = 0; s < a.length; s++)a[s].appId = e;
                for (var u = [], s = 0; s < r.length; s++)u[s] = {
                    version: r[s].version,
                    challenge: a[0],
                    keyHandle: r[s].keyHandle,
                    appId: e
                };
                return {
                    type: n.MessageTypes.U2F_REGISTER_REQUEST,
                    signRequests: u,
                    registerRequests: a,
                    timeoutSeconds: i,
                    requestId: o
                }
            }
            return {
                type: n.MessageTypes.U2F_REGISTER_REQUEST,
                appId: e,
                registerRequests: a,
                registeredKeys: r,
                timeoutSeconds: i,
                requestId: o
            }
        }, n.WrappedChromeRuntimePort_.prototype.postMessage = function (e) {
            this.port_.postMessage(e)
        }, n.WrappedChromeRuntimePort_.prototype.addEventListener = function (e, t) {
            var n = e.toLowerCase();
            "message" == n || "onmessage" == n ? this.port_.onMessage.addListener(function (e) {
                t({data: e})
            }) : console.error("WrappedChromeRuntimePort only supports onMessage")
        }, n.WrappedAuthenticatorPort_ = function () {
            this.requestId_ = -1, this.requestObject_ = null
        }, n.WrappedAuthenticatorPort_.prototype.postMessage = function (e) {
            var t = n.WrappedAuthenticatorPort_.INTENT_URL_BASE_ + ";S.request=" + encodeURIComponent(JSON.stringify(e)) + ";end";
            document.location = t
        }, n.WrappedAuthenticatorPort_.prototype.getPortType = function () {
            return "WrappedAuthenticatorPort_"
        }, n.WrappedAuthenticatorPort_.prototype.addEventListener = function (e, t) {
            var n = e.toLowerCase();
            if ("message" == n) {
                var r = this;
                window.addEventListener("message", r.onRequestUpdate_.bind(r, t), !1)
            } else console.error("WrappedAuthenticatorPort only supports message")
        }, n.WrappedAuthenticatorPort_.prototype.onRequestUpdate_ = function (e, t) {
            var n = JSON.parse(t.data), r = (n.intentURL, n.errorCode, null);
            n.hasOwnProperty("data") && (r = JSON.parse(n.data)), e({data: r})
        }, n.WrappedAuthenticatorPort_.INTENT_URL_BASE_ = "intent:#Intent;action=com.google.android.apps.authenticator.AUTHENTICATE", n.WrappedIosPort_ = function () {
        }, n.WrappedIosPort_.prototype.postMessage = function (e) {
            var t = JSON.stringify(e), n = "u2f://auth?" + encodeURI(t);
            location.replace(n)
        }, n.WrappedIosPort_.prototype.getPortType = function () {
            return "WrappedIosPort_"
        }, n.WrappedIosPort_.prototype.addEventListener = function (e, t) {
            var n = e.toLowerCase();
            "message" !== n && console.error("WrappedIosPort only supports message")
        }, n.getIframePort_ = function (e) {
            var t = "chrome-extension://" + n.EXTENSION_ID, r = document.createElement("iframe");
            r.src = t + "/u2f-comms.html", r.setAttribute("style", "display:none"), document.body.appendChild(r);
            var a = new MessageChannel, i = function (t) {
                "ready" == t.data ? (a.port1.removeEventListener("message", i), e(a.port1)) : console.error('First event on iframe port was not "ready"')
            };
            a.port1.addEventListener("message", i), a.port1.start(), r.addEventListener("load", function () {
                r.contentWindow.postMessage("init", t, [a.port2])
            })
        }, n.EXTENSION_TIMEOUT_SEC = 30, n.port_ = null, n.waitingForPort_ = [], n.reqCounter_ = 0, n.callbackMap_ = {}, n.getPortSingleton_ = function (e) {
            n.port_ ? e(n.port_) : (0 == n.waitingForPort_.length && n.getMessagePort(function (e) {
                for (n.port_ = e, n.port_.addEventListener("message", n.responseHandler_); n.waitingForPort_.length;)n.waitingForPort_.shift()(n.port_)
            }), n.waitingForPort_.push(e))
        }, n.responseHandler_ = function (e) {
            var t = e.data, r = t.requestId;
            if (!r || !n.callbackMap_[r])return void console.error("Unknown or missing requestId in response.");
            var a = n.callbackMap_[r];
            delete n.callbackMap_[r], a(t.responseData)
        }, n.sign = function (e, r, a, i, o) {
            void 0 === t ? n.getApiVersion(function (s) {
                t = void 0 === s.js_api_version ? 0 : s.js_api_version, console.log("Extension JS API Version: ", t), n.sendSignRequest(e, r, a, i, o)
            }) : n.sendSignRequest(e, r, a, i, o)
        }, n.sendSignRequest = function (e, t, r, a, i) {
            n.getPortSingleton_(function (o) {
                var s = ++n.reqCounter_;
                n.callbackMap_[s] = a;
                var u = "undefined" != typeof i ? i : n.EXTENSION_TIMEOUT_SEC, l = n.formatSignRequest_(e, t, r, u, s);
                o.postMessage(l)
            })
        }, n.register = function (e, r, a, i, o) {
            void 0 === t ? n.getApiVersion(function (s) {
                t = void 0 === s.js_api_version ? 0 : s.js_api_version, console.log("Extension JS API Version: ", t), n.sendRegisterRequest(e, r, a, i, o)
            }) : n.sendRegisterRequest(e, r, a, i, o)
        }, n.sendRegisterRequest = function (e, t, r, a, i) {
            n.getPortSingleton_(function (o) {
                var s = ++n.reqCounter_;
                n.callbackMap_[s] = a;
                var u = "undefined" != typeof i ? i : n.EXTENSION_TIMEOUT_SEC, l = n.formatRegisterRequest_(e, r, t, u, s);
                o.postMessage(l)
            })
        }, n.getApiVersion = function (e, t) {
            n.getPortSingleton_(function (r) {
                if (r.getPortType) {
                    var a;
                    switch (r.getPortType()) {
                        case"WrappedIosPort_":
                        case"WrappedAuthenticatorPort_":
                            a = 1.1;
                            break;
                        default:
                            a = 0
                    }
                    return void e({js_api_version: a})
                }
                var i = ++n.reqCounter_;
                n.callbackMap_[i] = e;
                var o = {
                    type: n.MessageTypes.U2F_GET_API_VERSION_REQUEST,
                    timeoutSeconds: "undefined" != typeof t ? t : n.EXTENSION_TIMEOUT_SEC,
                    requestId: i
                };
                r.postMessage(o)
            })
        }
    }
}(),define.registerEnd(),define.register("ios-security-key"),function (e, t) {
    var n = {
        pingPong: function () {
            this.whenReady_ = [], this.isReady_ = !1, this.send("ping"), this.receive("pong", this.isReady), this.receive("ping", function () {
                this.send("pong"), this.isReady()
            })
        }, receive: function (e, t) {
            window.addEventListener("u2f-" + e, function (e) {
                t.apply(this, e.detail)
            }.bind(this))
        }, send: function (e) {
            var t = Array.from(arguments).slice(1);
            window.dispatchEvent(new CustomEvent("u2f-" + e, {detail: t}))
        }, whenReady: function (e) {
            this.isReady_ ? e.apply(this) : this.whenReady_.push(e)
        }, isReady: function () {
            for (this.isReady_ = !0; cb = this.whenReady_.shift();)cb.apply(this)
        }
    }, r = function () {
        this.rpcRequester("register"), this.rpcRequester("sign"), this.pingPong()
    };
    r.prototype = n, r.prototype.rpcRequester = function (e) {
        this[e] = function () {
            var t = Array.from(arguments);
            t.unshift(e + "-request");
            var n = t.pop();
            this.receive(e + "-response", n), this.whenReady(function () {
                this.send.apply(this, t)
            })
        }
    }, !t.u2f && navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform) && (t.u2f = new r), t[""] = e
}({}, function () {
    return this
}()),define.registerEnd(),define("github/u2f", ["exports", "./metadata", "u2f-api-polyfill", "ios-security-key"], function (e, t) {
    function n() {
        return !!window.u2f || "true" === t.getMetadataByName(document, "u2f-support")
    }

    function r() {
        for (var e = arguments.length, t = Array(e), n = 0; e > n; n++)t[n] = arguments[n];
        return new Promise(function (e, n) {
            var r;
            (r = window.u2f).sign.apply(r, t.concat([function (t) {
                if (null != t.errorCode && 0 !== t.errorCode) {
                    var r = new Error("Signing request failed");
                    r.code = t.errorCode, n(r)
                } else e(t)
            }]))
        })
    }

    function a() {
        for (var e = arguments.length, t = Array(e), n = 0; e > n; n++)t[n] = arguments[n];
        return new Promise(function (e, n) {
            var r;
            (r = window.u2f).register.apply(r, t.concat([function (t) {
                if (null != t.errorCode && 0 !== t.errorCode) {
                    var r = new Error("Device registration failed");
                    r.code = t.errorCode, n(r)
                } else e(t)
            }]))
        })
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.u2fEnabledBrowser = n, e.u2fSign = r, e.u2fRegister = a
}),define("github/u2f-auth-form", ["exports", "./typecast", "delegated-events", "./u2f"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i() {
        var e = o["default"](document.querySelector(".js-u2f-auth-form"), HTMLFormElement), t = o["default"](e.querySelector(".js-u2f-auth-response"), HTMLInputElement), a = e.getAttribute("data-app-id"), i = e.getAttribute("data-challenge"), s = e.getAttribute("data-sign-requests");
        if (null != s) {
            var u = JSON.parse(s);
            Array.from(document.querySelectorAll(".js-u2f-error")).forEach(function (e) {
                return e.classList.add("d-none")
            });
            var l = document.querySelector(".js-u2f-login-waiting");
            null != l && l.classList.remove("d-none"), r.u2fSign(a, i, u).then(function (r) {
                t.value = JSON.stringify(r), n.fire(e, "submit") && e.submit()
            }, function (e) {
                var t = ".js-u2f-auth-error";
                switch (e.code) {
                    case 4:
                        t = ".js-u2f-auth-not-registered-error";
                        break;
                    case 5:
                        t = ".js-u2f-auth-timeout"
                }
                var n = document.querySelector(t);
                null != n && n.classList.remove("d-none"), null != l && l.classList.add("d-none")
            })
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.waitForDevice = i;
    var o = a(t)
}),define("github/u2f-login", ["./observe", "delegated-events", "./u2f", "./u2f-auth-form"], function (e, t, n, r) {
    t.on("click", ".js-u2f-auth-retry", function () {
        r.waitForDevice()
    }), e.observe(".js-u2f-auth-form-body", function (e) {
        e.classList.toggle("unavailable", !n.u2fEnabledBrowser()), n.u2fEnabledBrowser() && r.waitForDevice()
    })
}),define("github/u2f-settings", ["./u2f", "./jquery", "./typecast", "./fetch", "./observe", "delegated-events"], function (e, t, n, r, a, i) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s(e, t, n) {
        if (null == n) {
            var r = e.getAttribute(t);
            return null == r ? null : JSON.parse(r)
        }
        e.setAttribute(t, JSON.stringify(n))
    }

    function u(e) {
        var t = g["default"](document.querySelector(".js-add-u2f-registration-form"), HTMLFormElement);
        return s(t, "data-sign-requests", e)
    }

    function l(e) {
        var t = g["default"](document.querySelector(".js-add-u2f-registration-form"), HTMLFormElement);
        return s(t, "data-register-requests", e)
    }

    function c(e) {
        e.register_requests && l(e.register_requests), e.sign_requests && u(e.sign_requests)
    }

    function d(e) {
        var t = document.createElement("div");
        t.innerHTML = e;
        var n = t.firstChild;
        null != n && g["default"](document.querySelector(".js-u2f-registrations"), HTMLElement).appendChild(n)
    }

    function f(e, t) {
        var n = g["default"](document.querySelector(".js-new-u2f-registration"), HTMLElement);
        n.classList.add("is-showing-error"), n.classList.remove("is-sending"), Array.from(n.querySelectorAll(".js-u2f-error")).forEach(function (e) {
            return e.classList.add("d-none")
        });
        var r = g["default"](n.querySelector(e), HTMLElement);
        null != t && (r.textContent = t), r.classList.remove("d-none")
    }

    function h() {
        var e = g["default"](document.querySelector(".js-new-u2f-registration"), HTMLElement);
        e.classList.remove("is-sending", "is-active"), g["default"](document.querySelector(".js-u2f-registration-nickname-field"), HTMLInputElement).value = ""
    }

    function m(e) {
        var t = g["default"](document.querySelector(".js-add-u2f-registration-form"), HTMLFormElement);
        g["default"](t.elements.namedItem("response"), HTMLInputElement).value = JSON.stringify(e), r.fetchJSON(t.action, {
            method: t.method,
            body: new FormData(t)
        }).then(function (e) {
            c(e), h(), d(e.registration)
        })["catch"](function (e) {
            e.response ? e.response.json().then(function (e) {
                c(e), f(".js-u2f-server-error", e.error)
            }) : f(".js-u2f-network-error")
        })
    }

    function v() {
        var t = g["default"](document.querySelector(".js-new-u2f-registration"), HTMLElement);
        t.classList.add("is-sending"), t.classList.remove("is-showing-error");
        var n = g["default"](document.querySelector(".js-add-u2f-registration-form"), HTMLElement), r = n.getAttribute("data-app-id");
        if (null == r)throw new Error("invalid appId");
        e.u2fRegister(r, l(), u()).then(m)["catch"](function (e) {
            var t = ".js-u2f-other-error";
            switch (e.code) {
                case 4:
                    t = ".js-u2f-registered-error";
                    break;
                case 5:
                    t = ".js-u2f-timeout-error"
            }
            f(t)
        })
    }

    var p = o(t), g = o(n);
    p["default"](document).on("ajaxSend", ".js-u2f-registration-delete", function () {
        this.closest(".js-u2f-registration").classList.add("is-sending")
    }), p["default"](document).on("ajaxSuccess", ".js-u2f-registration-delete", function (e, t) {
        c(t.responseJSON), this.closest(".js-u2f-registration").remove()
    }), i.on("click", ".js-add-u2f-registration-link", function () {
        var e = g["default"](document.querySelector(".js-new-u2f-registration"), HTMLElement);
        e.classList.add("is-active"), e.classList.remove("is-showing-error");
        var t = g["default"](document.querySelector(".js-u2f-registration-nickname-field"), HTMLInputElement);
        t.focus()
    }), i.on("click", ".js-u2f-register-retry", function () {
        v()
    }), i.on("submit", ".js-add-u2f-registration-form", function (e) {
        e.preventDefault(), v()
    }), a.observe(".js-u2f-box", function (t) {
        t.classList.toggle("available", e.u2fEnabledBrowser())
    })
}),define("github/updatable-content-observer", ["./jquery", "./updatable-content"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = n(e);
    r["default"](document).on("socket:message", ".js-updatable-content", function (e, n) {
        if (this === e.target) {
            var r = n && n.wait;
            null == r ? t.updateContent(e.target) : setTimeout(function () {
                t.updateContent(e.target)
            }, r)
        }
    })
}),define("github/upload/avatar", ["../facebox", "../fetch", "invariant", "delegated-events"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var i = a(e), o = a(n);
    r.on("upload:setup", ".js-upload-avatar-image", function (e) {
        o["default"](e instanceof CustomEvent);
        var t = e.detail.policyRequest, n = this.getAttribute("data-alambic-organization"), r = this.getAttribute("data-alambic-owner-type"), a = this.getAttribute("data-alambic-owner-id");
        n && t.body.append("organization_id", n), r && t.body.append("owner_type", r), a && t.body.append("owner_id", a)
    }), r.on("upload:complete", ".js-upload-avatar-image", function (e) {
        o["default"](e instanceof CustomEvent);
        var n = e.detail.result, r = "/settings/avatars/" + n.id;
        i["default"](function () {
            t.fetchText(r).then(i["default"])
        })
    })
}),define("github/png-scanner", ["exports"], function (e) {
    function t(e, t) {
        if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var n = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(), r = 2303741511, a = 4, i = function () {
        function e(n) {
            t(this, e), this.dataview = new DataView(n), this.pos = 0
        }

        return n(e, null, [{
            key: "fromFile", value: function (t) {
                return new Promise(function (n, r) {
                    var a = new FileReader;
                    a.onload = function () {
                        n(new e(a.result))
                    }, a.onerror = function () {
                        r(a.error)
                    }, a.readAsArrayBuffer(t)
                })
            }
        }]), n(e, [{
            key: "advance", value: function (e) {
                return this.pos += e
            }
        }, {
            key: "readInt", value: function (e) {
                var t = this, n = function () {
                    switch (e) {
                        case 1:
                            return t.dataview.getUint8(t.pos);
                        case 2:
                            return t.dataview.getUint16(t.pos);
                        case 4:
                            return t.dataview.getUint32(t.pos);
                        default:
                            throw new Error("bytes parameter must be 1, 2 or 4")
                    }
                }();
                return this.advance(e), n
            }
        }, {
            key: "readChar", value: function () {
                return this.readInt(1)
            }
        }, {
            key: "readShort", value: function () {
                return this.readInt(2)
            }
        }, {
            key: "readLong", value: function () {
                return this.readInt(4)
            }
        }, {
            key: "readString", value: function (e) {
                for (var t = [], n = 0; e > n; n++)t.push(String.fromCharCode(this.readChar()));
                return t.join("")
            }
        }, {
            key: "scan", value: function (e) {
                if (this.readLong() !== r)throw new Error("invalid PNG");
                for (this.advance(4); ;) {
                    var t = this.readLong(), n = this.readString(4), i = this.pos + t + a;
                    if (e.call(this, n, t) === !1 || "IEND" === n)break;
                    this.pos = i
                }
            }
        }]), e
    }();
    e["default"] = i
}),define("github/image-dimensions", ["exports", "./png-scanner"], function (e, t) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var r = n(t), a = .0254;
    e["default"] = function (e) {
        var t, n, i;
        return regeneratorRuntime.async(function (o) {
            for (; ;)switch (o.prev = o.next) {
                case 0:
                    if ("image/png" === e.type) {
                        o.next = 2;
                        break
                    }
                    return o.abrupt("return", null);
                case 2:
                    return t = e.slice(0, 10240, e.type), o.next = 5, regeneratorRuntime.awrap(r["default"].fromFile(t));
                case 5:
                    return n = o.sent, i = {width: 0, height: 0, ppi: 1}, n.scan(function (e) {
                        switch (e) {
                            case"IHDR":
                                return i.width = this.readLong(), i.height = this.readLong(), !0;
                            case"pHYs":
                                var t = this.readLong(), n = this.readLong(), r = this.readChar(), o = void 0;
                                return 1 === r && (o = a), o && (i.ppi = Math.round((t + n) / 2 * o)), !1;
                            case"IDAT":
                                return !1
                        }
                        return !0
                    }), o.abrupt("return", i);
                case 9:
                case"end":
                    return o.stop()
            }
        }, null, this)
    }
}),define("github/upload/markdown", ["../text", "../image-dimensions", "invariant", "delegated-events", "../setimmediate"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e) {
        return e.toLowerCase().replace(/[^a-z0-9\-_]+/gi, ".").replace(/\.{2,}/g, ".").replace(/^\.|\.$/gi, "")
    }

    function s(e) {
        var t = l(e) ? "!" : "";
        return t + "[Uploading " + e.name + "\u2026]()"
    }

    function u(e) {
        return o(e).replace(/\.[^.]+$/, "").replace(/\./g, " ")
    }

    function l(e) {
        return ["image/gif", "image/png", "image/jpg", "image/jpeg"].indexOf(e.type) > -1
    }

    function c(e) {
        var t = e.split(".").pop().toLowerCase();
        return ["gif", "png", "jpg", "jpeg"].indexOf(t) > -1
    }

    var d = i(t), f = i(n), h = i(a), m = 144;
    r.on("upload:setup", ".js-upload-markdown-image", function (t) {
        f["default"](t instanceof CustomEvent);
        var n = this.querySelector(".js-comment-field");
        n.setCustomValidity("uploading"), e.insertText(n, s(t.detail.file) + "\n")
    }), r.on("upload:complete", ".js-upload-markdown-image", function (t) {
        function n(t) {
            var n = "[" + r.file.name + "](" + r.policy.asset.href + ")";
            if (l(r.file)) {
                var a = u(r.policy.asset.name), s = r.policy.asset.href;
                if (t && t.ppi === m) {
                    var c = Math.round(t.width / 2);
                    n = '<img width="' + c + '" alt="' + a + '" src="' + s + '">'
                } else n = "![" + a + "](" + s + ")"
            }
            i.setCustomValidity(""), e.replaceText(i, o, n)
        }

        f["default"](t instanceof CustomEvent);
        var r = t.detail, a = this, i = a.querySelector(".js-comment-field"), o = s(r.file);
        d["default"](r.file).then(n, function (e) {
            n(), h["default"](function () {
                throw e
            })
        })
    }), r.on("upload:error", ".js-upload-markdown-image", function (t) {
        f["default"](t instanceof CustomEvent);
        var n = this.querySelector(".js-comment-field"), r = s(t.detail.file);
        n.setCustomValidity(""), e.replaceText(n, r, "")
    }), r.on("upload:invalid", ".js-upload-markdown-image", function (t) {
        f["default"](t instanceof CustomEvent);
        var n = this.querySelector(".js-comment-field"), r = s(t.detail.file);
        n.setCustomValidity(""), e.replaceText(n, r, "")
    }), r.on("upload:drop:links", ".js-upload-markdown-image", function (t) {
        f["default"](t instanceof CustomEvent);
        var n = this.querySelector(".js-comment-field");
        t.detail.links.forEach(function (t) {
            var r = c(t) ? "\n![](" + t + ")\n" : t;
            e.insertText(n, r)
        })
    }), r.on("upload:drop:text", ".js-upload-markdown-image", function (t) {
        f["default"](t instanceof CustomEvent);
        var n = this.querySelector(".js-comment-field");
        e.insertText(n, t.detail.text)
    })
}),define("github/upload/marketplace-listing-screenshot", ["../typecast", "../fetch", "invariant", "delegated-events"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var i = a(e), o = a(n);
    r.on("upload:setup", ".js-upload-marketplace-listing-screenshot", function (e) {
        o["default"](e instanceof CustomEvent);
        var t = e.detail.policyRequest, n = this.getAttribute("data-marketplace-listing-id");
        n && t.body.append("marketplace_listing_id", n)
    }), r.on("upload:complete", ".js-upload-marketplace-listing-screenshot", function () {
        var e = this.getAttribute("data-screenshots-url");
        o["default"](e, "`data-screenshots-url` must exist");
        var n = i["default"](document.querySelector(".js-marketplace-listing-screenshots-container"), HTMLElement);
        t.fetchSafeDocumentFragment(document, e).then(function (e) {
            n.innerHTML = "", n.appendChild(e)
        })
    })
}),define("github/upload/release-file", ["../typecast", "invariant", "delegated-events", "../releases", "../setimmediate"], function (e, t, n, r, a) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e) {
        return e.closest("form").querySelector("#release_id").value
    }

    var s = i(e), u = i(t), l = i(a);
    n.on("click", ".js-release-remove-file", function () {
        var e = this.closest(".js-release-file");
        e.classList.add("delete"), e.querySelector("input.destroy").value = "true"
    }), n.on("click", ".js-release-undo-remove-file", function () {
        var e = this.closest(".js-release-file");
        e.classList.remove("delete"), e.querySelector("input.destroy").value = ""
    });
    var c = [];
    n.on("release:saved", ".js-release-form", function () {
        l["default"](function () {
            c.forEach(function (e) {
                return e()
            }), c.length = 0
        });
        var e = 0;
        Array.from(this.querySelectorAll(".js-releases-field .js-release-file")).forEach(function (t) {
            t.classList.contains("delete") ? t.remove() : t.classList.contains("js-template") || e++
        });
        var t = this.querySelector(".js-releases-field");
        t.classList.toggle("not-populated", !e), t.classList.toggle("is-populated", e)
    }), n.on("upload:setup", ".js-upload-release-file", function (e) {
        function t() {
            a.body.append("release_id", o(l));
            var e = document.querySelectorAll(".js-releases-field .js-release-file.delete .id");
            if (e.length) {
                var t = Array.from(e).map(function (e) {
                    return s["default"](e, HTMLInputElement).value
                });
                a.body.append("deletion_candidates", t.join(","))
            }
        }

        u["default"](e instanceof CustomEvent);
        var n = e.detail, a = n.policyRequest, i = n.preprocess, l = this;
        if (o(l)) t(); else if (i.push(new Promise(function (e) {
                return c.push(e)
            }).then(t)), 1 === c.length) {
            var d = document.querySelector("button.js-save-draft");
            d instanceof HTMLButtonElement && r.saveDraft(d)
        }
    }), n.on("upload:start", ".js-upload-release-file", function (e) {
        u["default"](e instanceof CustomEvent);
        var t = e.detail.policy;
        this.querySelector(".js-upload-meter").classList.remove("d-none");
        var n = t.asset.replaced_asset;
        n && Array.from(document.querySelectorAll(".js-releases-field .js-release-file .id")).forEach(function (e) {
            null != e && e instanceof HTMLInputElement && Number(e.value) === n && s["default"](e.closest(".js-release-file"), HTMLElement).remove()
        })
    }), n.on("upload:complete", ".js-upload-release-file", function (e) {
        u["default"](e instanceof CustomEvent);
        var t = e.detail, n = t.policy, r = s["default"](document.querySelector(".js-releases-field"), HTMLElement), a = s["default"](r.querySelector(".js-template"), HTMLElement).cloneNode(!0);
        a.classList.remove("template", "js-template"), s["default"](a.querySelector("input.id"), HTMLInputElement).value = n.asset.id || t.result.id;
        var i = n.asset.name || n.asset.href.split("/").pop();
        Array.from(a.querySelectorAll(".filename")).forEach(function (e) {
            e instanceof HTMLInputElement ? e.value = i : e.textContent = i
        });
        var o = n.asset.size ? "(" + (n.asset.size / 1048576).toFixed(2) + " MB)" : "";
        s["default"](a.querySelector(".filesize"), HTMLElement).textContent = o, r.appendChild(a), r.classList.remove("not-populated"), r.classList.add("is-populated"), this.querySelector(".js-upload-meter").classList.add("d-none")
    }), n.on("upload:progress", ".js-upload-release-file", function (e) {
        u["default"](e instanceof CustomEvent);
        var t = this.querySelector(".js-upload-meter");
        t.style.width = e.detail.percent + "%"
    })
}),define("github/upload/upload-manifest-file", ["../fetch", "../jquery", "../typecast", "invariant", "../observe", "delegated-events", "../once", "../pjax"], function (e, t, n, r, a, i, o, s) {
    function u(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function l(e, t) {
        var n = e.closest(".js-upload-manifest-file-container"), r = n.querySelector(".js-upload-progress");
        r.classList.add("active"), e.classList.add("is-progress-bar");
        var a = r.querySelector(".js-upload-meter-text");
        a.querySelector(".js-upload-meter-range-start").textContent = t.batch.uploaded + 1, a.querySelector(".js-upload-meter-range-end").textContent = t.batch.size
    }

    function c(e) {
        e.classList.remove("is-progress-bar");
        var t = e.closest(".js-upload-manifest-file-container"), n = t.querySelector(".js-upload-progress");
        n.classList.remove("active");
        var r = t.querySelector(".js-upload-meter-text");
        r.querySelector(".js-upload-meter-filename").textContent = ""
    }

    function d(e) {
        return e._path ? e._path + "/" + e.name : e.name
    }

    function f() {
        c(this)
    }

    var h = u(t), m = u(n), v = u(r), p = u(o), g = u(s), y = [], b = new WeakMap;
    i.on("upload:drop:setup", ".js-upload-manifest-file", function (e) {
        v["default"](e instanceof CustomEvent);
        var t = e.detail.files, n = parseInt(this.getAttribute("data-directory-upload-max-files"), 10);
        t.length > n && (e.preventDefault(), this.classList.add("is-too-many"))
    }), i.on("upload:drop:setup", ".js-upload-manifest-tree-view", function (e) {
        v["default"](e instanceof CustomEvent), e.preventDefault();
        var t = e.detail.upload, n = m["default"](document.querySelector("#js-repo-pjax-container"), HTMLElement);
        p["default"](n, "pjax:success").then(function () {
            t(n.querySelector(".js-uploadable-container"))
        }), g["default"]({url: this.getAttribute("data-drop-url"), container: n})
    }), i.on("upload:setup", ".js-upload-manifest-file", function (t) {
        function n() {
            a.body.append("upload_manifest_id", b.get(o))
        }

        v["default"](t instanceof CustomEvent);
        var r = t.detail, a = r.policyRequest, i = r.preprocess;
        l(this, t.detail);
        var o = this;
        if (b.get(o) ? n() : i.push(new Promise(function (e) {
                return y.push(e)
            }).then(n)), !(y.length > 1 || b.get(o))) {
            var s = this.closest(".js-upload-manifest-file-container").querySelector(".js-upload-manifest-form");
            e.fetchJSON(s.action, {method: s.method, body: new FormData(s)}).then(function (e) {
                var t = m["default"](document.querySelector(".js-manifest-commit-form"), HTMLFormElement);
                m["default"](t.elements.namedItem("manifest_id"), HTMLInputElement).value = e.upload_manifest.id, b.set(o, e.upload_manifest.id), y.forEach(function (e) {
                    return e()
                }), y.length = 0
            })
        }
    }), i.on("upload:start", ".js-upload-manifest-file", function (e) {
        v["default"](e instanceof CustomEvent);
        var t = e.detail, n = this.closest(".js-upload-manifest-file-container"), r = n.querySelector(".js-upload-progress"), a = r.querySelector(".js-upload-meter-text");
        a.querySelector(".js-upload-meter-range-start").textContent = t.batch.uploaded + 1, a.querySelector(".js-upload-meter-filename").textContent = d(t.file)
    }), i.on("upload:complete", ".js-upload-manifest-file", function (e) {
        v["default"](e instanceof CustomEvent);
        var t = e.detail, n = document.querySelector(".js-manifest-commit-file-template"), r = n.rows[0].cloneNode(!0);
        r.querySelector(".name").textContent = d(t.file);
        var a = t.policy.asset.id || t.result.id;
        r.querySelector(".js-remove-manifest-file-form").elements.file_id.value = a;
        var i = m["default"](document.querySelector(".js-manifest-file-list"), HTMLElement);
        i.classList.remove("d-none"), this.classList.add("is-file-list");
        var o = m["default"](document.querySelector(".js-upload-progress"), HTMLElement);
        o.classList.add("is-file-list");
        var s = m["default"](i.querySelector(".js-manifest-file-list-root"), HTMLElement);
        s.appendChild(r), t.batch.isFinished() && c(this)
    }), i.on("upload:progress", ".js-upload-manifest-file", function (e) {
        v["default"](e instanceof CustomEvent);
        var t = e.detail, n = this.closest(".js-upload-manifest-file-container"), r = n.querySelector(".js-upload-meter");
        r.style.width = t.batch.percent() + "%"
    }), i.on("upload:error", ".js-upload-manifest-file", f), i.on("upload:invalid", ".js-upload-manifest-file", f), h["default"](document).on("ajaxSuccess", ".js-remove-manifest-file-form", function () {
        var e = this.closest(".js-manifest-file-list-root");
        if (this.closest(".js-manifest-file-entry").remove(), !e.hasChildNodes()) {
            var t = e.closest(".js-manifest-file-list");
            t.classList.add("d-none");
            var n = m["default"](document.querySelector(".js-upload-manifest-file"), HTMLElement);
            n.classList.remove("is-file-list");
            var r = m["default"](document.querySelector(".js-upload-progress"), HTMLElement);
            r.classList.remove("is-file-list")
        }
    }), a.observe(".js-manifest-ready-check", function (t) {
        var n = t.getAttribute("data-redirect-url");
        e.fetchPoll(t.getAttribute("data-poll-url")).then(function () {
            window.location = n
        })["catch"](function () {
            m["default"](document.querySelector(".js-manifest-ready-check"), HTMLElement).classList.add("d-none"), m["default"](document.querySelector(".js-manifest-ready-check-failed"), HTMLElement).classList.remove("d-none")
        })
    })
}),define("github/uploads", ["./fetch", "delegated-events", "invariant", "./observe", "./upload/avatar", "./upload/markdown", "./upload/marketplace-listing-screenshot", "./upload/release-file", "./upload/upload-manifest-file"], function (e, t, n, r) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function i(e, t) {
        if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
    }

    function o(e) {
        return e.closest("form").elements.authenticity_token.value
    }

    function s(e, t) {
        var n;
        (n = e.classList).remove.apply(n, U), e.classList.add(t)
    }

    function u(n, r) {
        var a = function (a) {
            var i = l(a, r), o = [];
            return t.fire(r, "upload:setup", {
                batch: n,
                file: a,
                policyRequest: i,
                preprocess: o
            }) ? void Promise.all(o).then(function () {
                return e.fetchJSON(i.url, i)
            }).then(function (e) {
                var t = d(n, a, e, r);
                W.upload(a, t)
            })["catch"](function (e) {
                if (t.fire(r, "upload:invalid", {
                        batch: n,
                        file: a,
                        error: e
                    }), e.response) e.response.text().then(function (t) {
                    var n = e.response.status, i = c({status: n, body: t}, a);
                    s(r, i)
                }); else {
                    var i = c({status: 0});
                    s(r, i)
                }
            }) : {v: void 0}
        }, i = !0, o = !1, u = void 0;
        try {
            for (var f, h = n.files[Symbol.iterator](); !(i = (f = h.next()).done); i = !0) {
                var m = f.value, v = a(m);
                if ("object" == typeof v)return v.v
            }
        } catch (p) {
            o = !0, u = p
        } finally {
            try {
                !i && h["return"] && h["return"]()
            } finally {
                if (o)throw u
            }
        }
    }

    function l(e, t) {
        var n = t.getAttribute("data-upload-policy-url"), r = t.getAttribute("data-upload-repository-id"), a = t.getAttribute("data-upload-policy-authenticity-token");
        null == a && (a = o(t));
        var i = new FormData;
        return i.append("name", e.name), i.append("size", e.size), i.append("content_type", e.type), i.append("authenticity_token", a), r && i.append("repository_id", r), e._path && i.append("directory", e._path), {
            url: n,
            method: "post",
            body: i,
            headers: {}
        }
    }

    function c(e, t) {
        if (400 === e.status)return "is-bad-file";
        if (422 !== e.status)return "is-failed";
        var n = JSON.parse(e.body);
        if (!n || !n.errors)return "is-failed";
        var r = !0, a = !1, i = void 0;
        try {
            for (var o, s = n.errors[Symbol.iterator](); !(r = (o = s.next()).done); r = !0) {
                var u = o.value;
                switch (u.field) {
                    case"size":
                        var l = t ? t.size : null;
                        return null != l && 0 === parseInt(l) ? "is-empty" : "is-too-big";
                    case"file_count":
                        return "is-too-many";
                    case"width":
                    case"height":
                        return "is-bad-dimensions";
                    case"name":
                        return "already_exists" === u.code ? "is-duplicate-filename" : "is-bad-file";
                    case"content_type":
                        return "is-bad-file";
                    case"uploader_id":
                        return "is-bad-permissions";
                    case"repository_id":
                        return "is-repository-required";
                    case"format":
                        return "is-bad-format"
                }
            }
        } catch (c) {
            a = !0, i = c
        } finally {
            try {
                !r && s["return"] && s["return"]()
            } finally {
                if (a)throw i
            }
        }
        return "is-failed"
    }

    function d(n, r, a, i) {
        var u = a.upload_authenticity_token;
        null == u && (u = o(i));
        var l = a.asset_upload_authenticity_token;
        return null == l && (l = o(i)), {
            to: a.upload_url,
            form: a.form,
            header: a.header,
            sameOrigin: a.same_origin,
            csrf: u,
            start: function () {
                s(i, "is-uploading"), t.fire(i, "upload:start", {batch: n, file: r, policy: a})
            },
            progress: function (e) {
                n.progress(r, e), t.fire(i, "upload:progress", {batch: n, file: r, percent: e})
            },
            complete: function (o) {
                if (n.completed(r), o && o.href && (a.asset || (a.asset = {}), a.asset.href = o.href), a.asset_upload_url && a.asset_upload_url.length > 0) {
                    var u = new FormData;
                    u.append("authenticity_token", l), e.fetchJSON(a.asset_upload_url, {method: "put", body: u})
                }
                t.fire(i, "upload:complete", {batch: n, file: r, policy: a, result: o}), s(i, "is-default")
            },
            error: function (e) {
                t.fire(i, "upload:error", {batch: n, file: r, policy: a});
                var o = c(e);
                s(i, o)
            }
        }
    }

    function f(e) {
        return Array.from(e.types).indexOf("Files") >= 0
    }

    function h(e) {
        return Array.from(e.types).indexOf("text/uri-list") >= 0
    }

    function m(e) {
        return Array.from(e.types).indexOf("text/plain") >= 0
    }

    function v(e) {
        return e.reduce(function (e, t) {
            return e.concat(Array.isArray(t) ? v(t) : t)
        }, [])
    }

    function p(e) {
        return e.name.startsWith(".")
    }

    function g(e) {
        return Array.from(e).filter(function (e) {
            return !p(e)
        })
    }

    function y(e, t) {
        return t.getFilesAndDirectories ? t.getFilesAndDirectories().then(function (e) {
            var n = g(e).map(function (e) {
                return y(t.path, e)
            });
            return Promise.all(n)
        }) : (t._path = e, t)
    }

    function b(e) {
        return y("", e).then(v)
    }

    function j(e) {
        return new Promise(function (t, n) {
            e.file(t, n)
        })
    }

    function w(e) {
        return new Promise(function (t, n) {
            e.createReader().readEntries(t, n)
        })
    }

    function L(e, t) {
        return t.isDirectory ? w(t).then(function (e) {
            var n = g(e).map(function (e) {
                return L(t.fullPath, e)
            });
            return Promise.all(n)
        }) : j(t).then(function (t) {
            return t._path = e, t
        })
    }

    function S(e) {
        return e.items && Array.from(e.items).some(function (e) {
                return e.webkitGetAsEntry && e.webkitGetAsEntry().isDirectory
            })
    }

    function x(e) {
        var t = Array.from(e.items).map(function (e) {
            return e.webkitGetAsEntry()
        }), n = g(t).map(function (e) {
            return L("", e)
        });
        return Promise.all(n).then(v)
    }

    function k(e, t) {
        var n = new $(e);
        u(n, t)
    }

    function E(e) {
        return f(e) ? "copy" : h(e) ? "link" : m(e) ? "copy" : "none"
    }

    function _(e) {
        switch (e) {
            case"image/gif":
                return "image.gif";
            case"image/png":
                return "image.png";
            case"image/jpeg":
                return "image.jpg"
        }
    }

    function T(e) {
        e.preventDefault()
    }

    function q(e) {
        e.preventDefault()
    }

    function M(e) {
        var t = this;
        if (!J) {
            clearTimeout(V), V = setTimeout(function () {
                return t.classList.remove("dragover")
            }, 200);
            var n = E(e.dataTransfer);
            e.dataTransfer.dropEffect = n, this.classList.add("dragover"), e.stopPropagation(), e.preventDefault()
        }
    }

    function C(e) {
        e.dataTransfer.dropEffect = "none", this.classList.remove("dragover"), e.stopPropagation(), e.preventDefault()
    }

    function A(e) {
        e.target.classList && e.target.classList.contains("js-document-dropzone") && this.classList.remove("dragover")
    }

    function H(e) {
        var n = document.body;
        O["default"](n), this.classList.remove("dragover"), n.classList.remove("dragover");
        var r = e.dataTransfer;
        if (f(r)) {
            var a = null;
            a = this.hasAttribute("data-directory-upload") && r.getFilesAndDirectories ? b(r) : this.hasAttribute("data-directory-upload") && S(r) ? x(r) : Promise.resolve(g(r.files));
            var i = this;
            a.then(function (e) {
                if (!e.length)return void s(i, "is-hidden-file");
                var n = k.bind(null, e), r = !t.fire(i, "upload:drop:setup", {upload: n, files: e});
                r || k(e, i)
            })
        } else if (h(r)) {
            var o = (r.getData("text/uri-list") || "").split("\r\n");
            o.length && t.fire(this, "upload:drop:links", {links: o})
        } else m(r) && t.fire(this, "upload:drop:text", {text: r.getData("text/plain")});
        e.stopPropagation(), e.preventDefault()
    }

    function I(e) {
        if (e.clipboardData && e.clipboardData.items) {
            var t = Array.from(e.clipboardData.items).map(function (e) {
                return [e, _(e.type)]
            }).filter(function (e) {
                return e[1]
            }).shift();
            if (t) {
                var n = F(t, 2), r = n[0], a = n[1], i = r.getAsFile();
                i.name = a, k([i], this), e.preventDefault()
            }
        }
    }

    function D(e) {
        e.target.classList.contains("js-manual-file-chooser") && (k(e.target.files, this), e.target.value = "")
    }

    function P() {
        var e = void 0;
        e = this.classList.contains("js-uploadable-container") ? this : this.querySelector(".js-uploadable-container"), s(e, "is-default")
    }

    function R() {
        J = !0
    }

    function N() {
        J = !1
    }

    var O = a(n), F = function () {
        function e(e, t) {
            var n = [], r = !0, a = !1, i = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
            } catch (u) {
                a = !0, i = u
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (a)throw i
                }
            }
            return n
        }

        return function (t, n) {
            if (Array.isArray(t))return t;
            if (Symbol.iterator in Object(t))return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }(), B = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(), z = function () {
        function e() {
            i(this, e), this.uploads = [], this.busy = !1
        }

        return B(e, [{
            key: "upload", value: function (e, t) {
                function n() {
                }

                this.uploads.push({
                    file: e,
                    to: t.to,
                    sameOrigin: t.sameOrigin,
                    csrf: t.csrf,
                    form: t.form || {},
                    header: t.header || {},
                    start: t.start || n,
                    progress: t.progress || n,
                    complete: t.complete || n,
                    error: t.error || n
                }), this.process()
            }
        }, {
            key: "process", value: function () {
                var e = this;
                if (!this.busy && 0 !== this.uploads.length) {
                    var t = this.uploads.shift();
                    this.busy = !0;
                    var n = new XMLHttpRequest;
                    n.open("POST", t.to, !0);
                    for (var r in t.header)n.setRequestHeader(r, t.header[r]);
                    n.onloadstart = function () {
                        t.start()
                    }, n.onload = function () {
                        204 === n.status ? t.complete({}) : 201 === n.status ? t.complete(JSON.parse(n.responseText)) : t.error({
                            status: n.status,
                            body: n.responseText
                        }), e.busy = !1, e.process()
                    }, n.onerror = function () {
                        t.error({status: 0, body: ""}), e.busy = !1, e.uploads = []
                    }, n.upload.onprogress = function (e) {
                        if (e.lengthComputable) {
                            var n = Math.round(e.loaded / e.total * 100);
                            t.progress(n)
                        }
                    };
                    var a = new FormData;
                    t.sameOrigin && a.append("authenticity_token", t.csrf);
                    for (var i in t.form)a.append(i, t.form[i]);
                    a.append("file", t.file), n.send(a)
                }
            }
        }]), e
    }(), U = ["is-default", "is-uploading", "is-bad-file", "is-duplicate-filename", "is-too-big", "is-too-many", "is-hidden-file", "is-failed", "is-bad-dimensions", "is-empty", "is-bad-permissions", "is-repository-required", "is-bad-format"], W = new z, $ = function () {
        function e(t) {
            i(this, e), this.files = Array.from(t), this.percentages = this.files.map(function () {
                return 0
            }), this.size = this.files.length, this.total = this.files.reduce(function (e, t) {
                return e + t.size
            }, 0), this.uploaded = 0
        }

        return B(e, [{
            key: "percent", value: function () {
                var e = this, t = this.files.map(function (t, n) {
                    return t.size * e.percentages[n] / 100
                }).reduce(function (e, t) {
                    return e + t
                });
                return Math.round(t / this.total * 100)
            }
        }, {
            key: "progress", value: function (e, t) {
                var n = this.files.indexOf(e);
                return this.percentages[n] = t
            }
        }, {
            key: "completed", value: function () {
                return this.uploaded += 1
            }
        }, {
            key: "isFinished", value: function () {
                return this.uploaded === this.files.length
            }
        }]), e
    }(), V = null, Y = 0, J = !1;
    r.observe(".js-document-dropzone", {
        add: function (e) {
            var t = document.body;
            O["default"](t), t.addEventListener("dragstart", R), t.addEventListener("dragend", N), t.addEventListener("dragenter", M), t.addEventListener("dragover", M), t.addEventListener("dragleave", A), e.addEventListener("drop", H)
        }, remove: function (e) {
            var t = document.body;
            O["default"](t), t.removeEventListener("dragstart", R), t.removeEventListener("dragend", N), t.removeEventListener("dragenter", M), t.removeEventListener("dragover", M), t.removeEventListener("dragleave", A), e.removeEventListener("drop", H)
        }
    }), r.observe(".js-uploadable-container", {
        add: function (e) {
            0 === Y++ && (document.addEventListener("drop", T), document.addEventListener("dragover", q)), e.addEventListener("dragenter", M), e.addEventListener("dragover", M), e.addEventListener("dragleave", C), e.addEventListener("drop", H), e.addEventListener("paste", I), e.addEventListener("change", D);
            var t = e.closest("form");
            null != t && t.addEventListener("reset", P)
        }, remove: function (e) {
            0 === --Y && (document.removeEventListener("drop", T), document.removeEventListener("dragover", q)), e.removeEventListener("dragenter", M), e.removeEventListener("dragover", M), e.removeEventListener("dragleave", C), e.removeEventListener("drop", H), e.removeEventListener("paste", I), e.removeEventListener("change", D);
            var t = e.closest("form");
            null != t && t.removeEventListener("reset", P)
        }
    })
}),define("github/user-select-contain", ["delegated-events"], function (e) {
    function t() {
        var e = document.createElement("div");
        e.style.cssText = "-ms-user-select: element; user-select: contain;";
        var t = e;
        return "element" === t.msUserSelect || "contain" === t.userSelect
    }

    !t() && window.getSelection && e.on("click", ".user-select-contain", function () {
        var e = window.getSelection();
        if (e.rangeCount) {
            var t = e.getRangeAt(0).commonAncestorContainer;
            this.contains(t) || e.selectAllChildren(this)
        }
    })
}),define("github/remote", ["./remote-submit", "./jquery", "./sso"], function (e, t, n) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var a = r(t), i = r(n);
    a["default"](document).on("submit", "form[data-remote]", function (e) {
        var t = a["default"](this), n = {};
        n.context = this;
        var r = t.attr("method");
        r && (n.type = r);
        var o = this.action;
        o && (n.url = o);
        var s = t.serializeArray();
        s && (n.data = s);
        var u = t.attr("data-type");
        return u && (n.dataType = u), i["default"]().then(function () {
            a["default"].ajax(n)
        }), e.preventDefault(), !1
    }), a["default"](document).on("ajaxSend", "[data-remote]", function (e, t) {
        a["default"](this).data("remote-xhr", t)
    }), a["default"](document).on("ajaxComplete", "[data-remote]", function () {
        var e = a["default"](this);
        "function" == typeof e.removeData && e.removeData("remote-xhr")
    }), a["default"](document).on("click", e.submitSelectors, function () {
        e.persistSubmitButtonValue(this)
    }), a["default"](document).on("ajaxComplete", "form", function () {
        var t = e.findPersistedSubmitButtonValue(this);
        t && t.remove()
    })
}),define("github-bootstrap", ["./github/accessibility-report", "./github/behaviors/html-validation", "./github/biztools/showcase", "./github/branches", "./github/bulk-actions", "./github/bust-frames", "./github/collector-api", "./github/community", "./github/dashboard", "./github/delegated-account-recovery", "./github/details", "./github/diffs/progressive", "./github/diffs/prose", "./github/diffs/toc-summary", "./github/button-outline", "./github/feature-detection", "./github/fixed-offset-fragment-navigation-observer", "./github/gfm", "./github/git-clone-help", "./github/google-analytics-tracking", "./github/hash-change", "./github/homepage/play-video", "./github/legacy/index", "./github/length-limited-input-with-warning", "./github/link-prefetch-viewed", "./github/marketplace/callouts", "./github/marketplace/edit", "./github/marketplace/edit-pricing", "./github/marketplace/order", "./github/marketplace/supported-languages", "./github/manage-membership-navigation", "./github/menu", "./github/milestone-dragging", "./github/mobile-preference", "./github/notifications", "./github/notifications/filtering", "./github/notifications/live-updates", "./github/notifications/pagination", "./github/notifications/quick-actions", "./github/oauth", "./github/octolytics-tracking", "./github/orgs/team-discussions", "./github/pjax", "./github/pjax/capture-keypresses", "./github/pjax/history-navigate", "./github/pjax/link-prefetch", "./github/project-cards-filter", "./github/project-updater", "./github/projects", "./github/proxy-site-reporting", "./github/pulls/change-base", "./github/pulls/commits-range-selection", "./github/pulls/reviews", "./github/releases", "./github/repository-search", "./github/select-menu", "./github/skip-autofill", "./github/smooth-scroll-anchor", "./github/sso-auto-replay", "./github/sso", "./github/sticky", "./github/sudo-required", "./github/task-list", "./github/team-breadcrumbs", "./github/team-hierarchy", "./github/timing-stats", "./github/toggler", "./github/topics", "./github/touch-events-observer", "./github/tz-cookie", "./github/u2f-login", "./github/u2f-settings", "./github/updatable-content-observer", "./github/uploads", "./github/user-select-contain", "./github/remote"], function () {
}),ghImport("github-bootstrap")["catch"](function (e) {
    setTimeout(function () {
        throw e
    })
});
