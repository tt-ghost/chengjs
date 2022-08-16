"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const esbuild_1 = __importDefault(require("esbuild"));
const config_1 = __importDefault(require("./config"));
const util_1 = require("./util");
const configName = 'cheng.config.js';
const userConfigPath = path_1.default.resolve(process.cwd(), configName);
const userConfig = require(userConfigPath);
let config = (0, config_1.default)();
// 1、判断配置文件时候存在
const isExist = fs_1.default.existsSync(userConfigPath);
if (isExist) {
    // 2、配置字段检查
    const valid = (0, util_1.validate)(userConfig);
    if (valid) {
        // 3、配置合并
        config = (0, util_1.merge)(config, userConfig);
    }
}
// 4、运行配置
const { server } = config, others = __rest(config, ["server"]);
if (server) {
    esbuild_1.default.serve(server, others).then(serverResult => {
        console.log('serverResult: ', serverResult);
        // server.stop()
        http_1.default.createServer((req, res) => {
            const options = {
                hostname: serverResult.host,
                port: serverResult.port,
                path: req.url,
                method: req.method,
                headers: req.headers,
            };
            // Forward each incoming request to esbuild
            const proxyReq = http_1.default.request(options, (proxyRes) => {
                // If esbuild returns "not found", send a custom 404 page
                if (proxyRes.statusCode === 404) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>A custom 404 page</h1>');
                    return;
                }
                // Otherwise, forward the response from esbuild to the client
                res.writeHead(proxyRes.statusCode, proxyRes.headers);
                proxyRes.pipe(res, { end: true });
            });
            // Forward the body of the request to esbuild
            req.pipe(proxyReq, { end: true });
        }).listen(3000);
    });
}
else {
    esbuild_1.default.buildSync(others);
}
