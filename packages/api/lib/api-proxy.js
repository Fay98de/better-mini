"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiProxy = void 0;
var utils_1 = require("./utils");
function createApiProxy(target, options) {
    if (options === void 0) { options = {}; }
    var _a = Object.entries(target)[0], variable = _a[0], sdk = _a[1];
    var _b = options.syncPreset, syncPreset = _b === void 0 ? [] : _b, _c = options.syncApis, syncApis = _c === void 0 ? [] : _c, _d = options.props, props = _d === void 0 ? [] : _d;
    var cache = {};
    var paths = [];
    var values = [];
    var handler = {
        get: function (target, key, receiver) {
            if (target === sdk) {
                paths = [];
                values = [];
            }
            paths.push(key);
            var pathStr = paths.join('.');
            try {
                values = utils_1.getValues(sdk, paths);
            }
            catch (error) {
                throw new Error(variable + "." + pathStr + " is not exist.");
            }
            var value = values.slice().pop();
            if (props.includes(pathStr)) {
                return value;
            }
            var proxy = (cache[pathStr] = cache[pathStr] || utils_1.createProxy(value, handler));
            return proxy;
        },
        apply: function (target, thisArg, args) {
            var pathStr = paths.join('.');
            var fn = values.pop();
            var caller = values.pop() || sdk;
            if (typeof fn !== 'function') {
                throw new TypeError(variable + "." + pathStr + " is not function.");
            }
            var isSync = false;
            if (syncApis.includes(pathStr)) {
                isSync = true;
            }
            for (var _i = 0, syncPreset_1 = syncPreset; _i < syncPreset_1.length; _i++) {
                var reg = syncPreset_1[_i];
                if (reg.test(pathStr))
                    isSync = true;
            }
            if (isSync) {
                return fn.apply(caller, args);
            }
            var _a = new utils_1.Deferred(), resolve = _a.resolve, reject = _a.reject, promise = _a.promise;
            var options = args[0] || {};
            options.success = resolve;
            options.fail = reject;
            fn.call(caller, options);
            return promise;
        },
    };
    var proxy = utils_1.createProxy(sdk, handler);
    return proxy;
}
exports.createApiProxy = createApiProxy;
//# sourceMappingURL=api-proxy.js.map