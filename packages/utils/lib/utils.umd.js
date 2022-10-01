/**
 * name: @chengjs/utils
 * version: v0.1.0
 * author: vChengzi <ttghost@126.com>
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.cutils = {}));
})(this, (function (exports) { 'use strict';

    /**
     * 列表转对象
     * @param list eg: [2,4]
     * @returns { 2: 2, 4: 3 }
     */
    const mapListToObject = (list) => {
        return list.reduce((result, val) => ((result[val] = val), result), {});
    };

    const BASE_TYPE = [
        "string",
        "number",
        "boolean",
        "undefined",
        "bigint",
        "symbol",
        null,
    ];
    const is = (val, type) => {
        return Object.prototype.toString.call(val) === `[object ${type}]`;
    };
    const isBaseType = (val) => val === null || BASE_TYPE.indexOf(typeof val) !== -1;
    const isFunction = (val) => is(val, "Function");
    const isString = (val) => is(val, "String");
    const isBoolean = (val) => is(val, "Boolean");
    const isNumber = (val) => is(val, "Number");
    const isNull = (val) => is(val, "Null");
    const isUndefined = (val) => is(val, "Undefined");
    const isSymbol = (val) => is(val, "Symbol");
    const isBigInt = (val) => is(val, "BigInt");
    const isArray = (val) => Array.isArray(val);
    const isObject = (val) => is(val, "Object");
    const isPromise = (val) => is(val, "Promise");
    const isRegExp = (val) => is(val, "RegExp");
    const isDom = (val) => is(val, "Element");
    const isDate = (val) => {
        // 为数字或Date对象时，Invalid Date 也是Date 类型， 需排除掉
        if ((is(val, "Date") || isString(val)) && !isNaN(new Date(val).valueOf())) {
            return true;
        }
        // 为数字时，去掉正负极限，去掉小数
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
                // 循环引用返回第一次clone的引用
                if (map.has(val))
                    return map.get(val);
                map.set(val, newVal);
                newVal.push(...val.map((item) => {
                    if (isFunction(item))
                        return null;
                    return clone(item);
                }));
                return newVal;
            }
            if (isObject(val)) {
                const newVal = {};
                // 循环引用返回第一次clone的引用
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

    /**
     * 解析URL
     * @param url url 地址
     * @returns object
     */
    const parseURL = (url) => {
        const [start, end = ""] = url.split("?");
        const [protocol, domainAndPath = ""] = start.split(/:?\/\//);
        // const [domain, port = 80] = domainAndPath.split(":");
        const [paramsString = "", hash = ""] = end.split("#");
        const paramsList = paramsString.split("&");
        const params = paramsList.reduce((result, val) => {
            const [key, value] = val;
            // 数字类型转为数字
            const parsedVal = isNaN(Number(value)) ? value : Number(value);
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
        const domainRegStr = "((?:[a-zA-Z\\d][a-zA-Z\\d-]*\\.)+[a-zA-Z\\d]+)";
        const portRegStr = "(?::(\\d+))?";
        const pathRegStr = "((?:\\/[a-zA-Z-\\d]+)*)";
        const reg = new RegExp(domainRegStr + portRegStr + pathRegStr);
        const [, domain = "", port = "80", path = ""] = domainAndPath.match(reg) || [];
        return {
            protocol,
            domain,
            port,
            path,
            params,
            hash,
        };
    };

    /**
     * 复制字符串到系统剪切板中
     * @param text 待复制的文本
     * @returns void
     * @examples
     * ```js
     * copy('copy test')
     * ```
     */
    async function copy(text) {
        if (typeof window === "undefined")
            return;
        const readPromise = await navigator.permissions.query({
            name: "clipboard-read",
        });
        const writePromise = await navigator.permissions.query({
            name: "clipboard-write",
        });
        const [readPerm, writePerm] = await Promise.all([readPromise, writePromise]);
        if (["granted", "prompt"].indexOf(readPerm.state) > -1 ||
            ["granted", "prompt"].indexOf(writePerm.state) > -1) {
            await navigator.clipboard.writeText(text);
        }
        else {
            await Promise.reject("请授权剪切板");
        }
    }

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
