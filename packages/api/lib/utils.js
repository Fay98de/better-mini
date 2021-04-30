"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = exports.createProxy = exports.getValues = void 0;
function getValues(o, paths) {
    var tail = o;
    var result = [];
    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
        var key = paths_1[_i];
        var val = tail[key];
        tail = val;
        result.push(val);
    }
    return result;
}
exports.getValues = getValues;
function createProxy(target, handler) {
    var noop = function () { };
    var proxy = new Proxy(target || noop, handler);
    return proxy;
}
exports.createProxy = createProxy;
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    return Deferred;
}());
exports.Deferred = Deferred;
//# sourceMappingURL=utils.js.map