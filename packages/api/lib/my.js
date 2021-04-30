"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_proxy_1 = require("./api-proxy");
var my_config_1 = require("./my.config");
var proxy = api_proxy_1.createApiProxy({ my: my }, my_config_1.default);
exports.default = proxy;
//# sourceMappingURL=my.js.map