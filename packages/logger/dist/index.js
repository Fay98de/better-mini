'use strict';

var React = require('react');
var Taro = require('@tarojs/taro');
var components = require('@tarojs/components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Taro__default = /*#__PURE__*/_interopDefaultLegacy(Taro);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

function getCurrentPageId() {
    var currentInstance = Taro__default['default'].getCurrentInstance();
    console.log(currentInstance);
    var page = currentInstance.page;
    // 不同平台的页面 id 取值不一样
    var pageId = page.$id || page.__wxExparserNodeId__;
    return String(pageId);
}
var Logger = /** @class */ (function (_super) {
    __extends(Logger, _super);
    function Logger(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            show: true,
            logs: [],
        };
        _this.toggle = function () {
            var show = _this.state.show;
            _this.setState({ show: !show });
        };
        _this.clear = function () {
            _this.setState({ logs: [] });
        };
        _this.init();
        return _this;
    }
    Logger.getLogger = function () {
        var pageId = getCurrentPageId();
        var logger = Logger.instances[pageId];
        if (!logger) {
            throw new Error('Logger component is not found, seems it is not add to the page?');
        }
        return logger;
    };
    Logger.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var logger = this.getLogger();
        logger.handleLog('log', args);
    };
    Logger.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var logger = this.getLogger();
        logger.handleLog('error', args);
    };
    Logger.prototype.init = function () {
        var pageId = getCurrentPageId();
        Logger.instances[pageId] = this;
    };
    Logger.prototype.stringify = function (o) {
        var beautify = this.props.beautify;
        if (typeof o === 'undefined')
            return 'undefined';
        if (typeof o === 'string')
            return o;
        return beautify ? JSON.stringify(o, undefined, '\u00a0\u00a0') : JSON.stringify(o);
    };
    Logger.prototype.handleLog = function (type, args) {
        var _this = this;
        var _a = this.props, visible = _a.visible, beautify = _a.beautify, _b = _a.max, max = _b === void 0 ? Logger.LOG_MAX : _b;
        if (!visible)
            return;
        var logArgs = args.map(function (o) {
            return _this.stringify(o);
        });
        var id = "log-" + Date.now();
        var log = { id: id, type: type, text: logArgs.join(beautify ? '\r\n' : '\u00a0\u00a0') };
        var logs = __spread(this.state.logs);
        logs.push(log);
        var start = Math.max(logs.length - max, 0);
        logs = logs.slice(start);
        this.setState({ currentLogId: id, logs: logs });
    };
    Logger.prototype.render = function () {
        var _a = this.props, className = _a.className, visible = _a.visible;
        var _b = this.state, show = _b.show, currentLogId = _b.currentLogId, logs = _b.logs;
        if (!visible)
            return null;
        return (React__default['default'].createElement(components.View, __assign({}, this.props, { className: classnames('logger-view', className, { show: show }) }),
            React__default['default'].createElement(components.ScrollView, { className: "logger-list", scrollY: true, scrollIntoView: currentLogId }, logs.map(function (log, index) { return (React__default['default'].createElement(components.Text, { key: index, id: log.id, className: classnames('logger-text', log.type), style: { backgroundColor: index % 2 ? '#eee' : undefined }, selectable: true }, log.text)); })),
            React__default['default'].createElement(components.View, { className: "logger-btn btn-toggle", onClick: this.toggle }, show ? '展开' : '收起'),
            React__default['default'].createElement(components.View, { className: "logger-btn btn-clear", onClick: this.clear }, "\u6E05\u7A7A")));
    };
    Logger.LOG_MAX = 30;
    Logger.instances = {};
    Logger.defaultProps = {
        visible: false,
        beautify: true,
        max: Logger.LOG_MAX,
    };
    return Logger;
}(React__default['default'].PureComponent));

module.exports = Logger;
//# sourceMappingURL=index.js.map
