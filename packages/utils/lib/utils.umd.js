/**
 * name: @chengjs/utils
 * version: v0.1.0
 * author: vChengzi <ttghost@126.com>
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.utils = {}));
})(this, (function (exports) { 'use strict';

    const mapListToObject = (list) => {
        return list.reduce((result, val) => ((result[val] = val), result), {});
    };

    const BASE_TYPE = [
        'string',
        'number',
        'boolean',
        'undefined',
        'bigint',
        'symbol',
        null
    ];
    const is = (val, type) => {
        return Object.prototype.toString.call(val) === `[object ${type}]`;
    };
    const isBaseType = (val) => val === null || BASE_TYPE.indexOf(typeof val) !== -1;
    const isFunction = (val) => is(val, 'Function');
    const isString = (val) => is(val, 'String');
    const isBoolean = (val) => is(val, 'Boolean');
    const isNumber = (val) => is(val, 'Number');
    const isNull = (val) => is(val, 'Null');
    const isUndefined = (val) => is(val, 'Undefined');
    const isSymbol = (val) => is(val, 'Symbol');
    const isBigInt = (val) => is(val, 'BigInt');
    const isArray = (val) => Array.isArray(val);
    const isObject = (val) => is(val, 'Object');
    const isPromise = (val) => is(val, 'Promise');
    const isRegExp = (val) => is(val, 'RegExp');
    const isDom = (val) => is(val, 'Element');
    const isDate = (val) => {
        if ((is(val, 'Date') || isString(val)) && !isNaN(new Date(val).valueOf())) {
            return true;
        }
        if (isNumber(val) &&
            val !== Infinity &&
            val !== -Infinity &&
            val === parseInt(val)) {
            return true;
        }
        return false;
    };

    const deepClone = (val) => {
        const map = new Map();
        const clone = (val) => {
            if (isFunction(val))
                return undefined;
            if (isSymbol(val))
                return Symbol(val.description);
            if (isBaseType(val))
                return val;
            if (isArray(val)) {
                const newVal = [];
                if (map.has(val))
                    return map.get(val);
                map.set(val, newVal);
                newVal.push(...val.map(item => {
                    if (isFunction(item))
                        return null;
                    return clone(item);
                }));
                return newVal;
            }
            if (isObject(val)) {
                const newVal = {};
                if (map.has(val))
                    return map.get(val);
                map.set(val, newVal);
                for (const key in val) {
                    if (isFunction(val[key]))
                        continue;
                    newVal[key] = clone(val[key]);
                }
                return newVal;
            }
        };
        return clone(val);
    };

    const parseURL = (url) => {
        const [start, end = ''] = url.split('?');
        const [protocol, domainAndPath = ''] = start.split(/:?\/\//);
        const [paramsString = '', hash = ''] = end.split('#');
        const paramsList = paramsString.split('&');
        const params = paramsList.reduce((result, val) => {
            const [key, value] = val.split('=');
            let parsedVal;
            if (value === '') {
                parsedVal = value;
            }
            else {
                parsedVal = isNaN(Number(value)) ? value : Number(value);
            }
            if (key in result) {
                if (Array.isArray(result[key])) {
                    result[key].push(parsedVal);
                }
                else {
                    result[key] = [result[key], parsedVal];
                }
            }
            else {
                result[key] = parsedVal;
            }
            return result;
        }, {});
        const domainRegStr = '((?:[a-z\\d][a-z\\d-]*\\.)+[a-z\\d]+)';
        const portRegStr = '(?::(\\d+))?';
        const pathRegStr = '((?:\\/[a-z-\\d]+)*)';
        const reg = new RegExp(domainRegStr + portRegStr + pathRegStr, 'i');
        const [, domain = '', port = '', path = ''] = domainAndPath.match(reg) || [];
        return {
            protocol,
            domain,
            port,
            path,
            params,
            hash
        };
    };

    async function copy(text) {
        if (typeof window === 'undefined')
            return;
        const readPromise = await navigator.permissions.query({
            name: 'clipboard-read'
        });
        const writePromise = await navigator.permissions.query({
            name: 'clipboard-write'
        });
        const [readPerm, writePerm] = await Promise.all([readPromise, writePromise]);
        if (['granted', 'prompt'].indexOf(readPerm.state) > -1 ||
            ['granted', 'prompt'].indexOf(writePerm.state) > -1) {
            await navigator.clipboard.writeText(text);
        }
        else {
            await Promise.reject('请授权剪切板');
        }
    }

    const REG_URI_PROTOCOL = '(?:([a-z]+):\\/\\/)?';
    const REG_URI_DOMAIN = '((?:[a-z\\d][a-z\\d-]*\\.)+[a-z\\d]+)';
    const REG_URI_PORT = '(?::(\\d+))?';
    const REG_URI_PATH = '((?:\\/[a-z-\\d]+)*)';

    const DEFAULT_REQUEST_OPTION = {
        method: 'GET',
        mode: 'cors',
        baseURL: '',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {},
        credentials: 'same-origin',
        cache: 'default',
        redirect: 'follow',
        referrer: 'client'
    };
    const mergeOption = opt => {
        const { headers = {}, method, ...others } = opt || {};
        return Object.assign({}, others, {
            method: (method || '').toUpperCase(),
            headers: { ...DEFAULT_REQUEST_OPTION.headers, ...headers }
        });
    };
    class HTTP {
        constructor(opt) {
            this.option = mergeOption(opt);
        }
        async fetch(url, opt) {
            await window.fetch(url, opt);
        }
        parseAPI(api) {
            const result = {
                method: 'GET',
                url: api
            };
            if (api.indexOf(':') > -1) {
                const [, method = '', url = api] = api.match(/(^[a-zA-Z]+):\s+(.*)/) || [];
                if (method)
                    result.method = method;
                if (url)
                    result.url = url;
            }
            return result;
        }
        resolve(url = '') {
            if (new RegExp(REG_URI_DOMAIN, 'i').test(url)) {
                return url;
            }
            else {
                return (this.option.baseURL.replace(/\/$/, '') + '/' + url.replace(/^\//, ''));
            }
        }
        create(apis) {
            const result = {};
            for (const name in apis) {
                const { method: urlMethod, url } = this.parseAPI(apis[name]);
                result[name] = (data, option) => {
                    console.log(123, data);
                    const { headers, method, ...others } = option || {};
                    const opt = {
                        method: (method || '').toUpperCase() || urlMethod,
                        headers: headers || {},
                        ...others,
                        body: data !== null ? JSON.stringify(data) : undefined
                    };
                    if (['GET', 'HEAD'].indexOf(opt.method) > -1)
                        opt.body = undefined;
                    return this.fetch(this.resolve(url), opt);
                };
            }
            return result;
        }
    }

    exports.HTTP = HTTP;
    exports.REG_URI_DOMAIN = REG_URI_DOMAIN;
    exports.REG_URI_PATH = REG_URI_PATH;
    exports.REG_URI_PORT = REG_URI_PORT;
    exports.REG_URI_PROTOCOL = REG_URI_PROTOCOL;
    exports.copy = copy;
    exports.deepClone = deepClone;
    exports.is = is;
    exports.isArray = isArray;
    exports.isBaseType = isBaseType;
    exports.isBigInt = isBigInt;
    exports.isBoolean = isBoolean;
    exports.isDate = isDate;
    exports.isDom = isDom;
    exports.isFunction = isFunction;
    exports.isNull = isNull;
    exports.isNumber = isNumber;
    exports.isObject = isObject;
    exports.isPromise = isPromise;
    exports.isRegExp = isRegExp;
    exports.isString = isString;
    exports.isSymbol = isSymbol;
    exports.isUndefined = isUndefined;
    exports.mapListToObject = mapListToObject;
    exports.parseURL = parseURL;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
