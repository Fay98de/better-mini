"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_proxy_1 = require("./api-proxy");
var wx_config_1 = require("./wx.config");
var proxy = api_proxy_1.createApiProxy({ wx: wx }, wx_config_1.default);
exports.default = proxy;
//# sourceMappingURL=wx.js.map