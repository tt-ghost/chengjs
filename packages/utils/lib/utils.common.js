/**
 * name: @chengjs/utils
 * version: v0.1.0
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
    // 函数、bitInt、Symbol类型的数据，在作为object值时会删除，在数组中转为null
    // const isIgnoreType = (val) =>
    //   isFunction(val) || isSymbol(val) || isBigInt(val) || isUndefined(val);
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
