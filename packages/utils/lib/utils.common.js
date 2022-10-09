/**
 * name: @chengjs/utils
 * version: v0.2.3
 * author: Chengzi <ttghost@126.com>
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
const random = (len = 8) => {
    const num = '0123456789';
    const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const char = letter + num;
    const first = letter.charAt(Math.floor(Math.random() * letter.length));
    let last = '';
    if (len <= 0)
        len = 8;
    if (len > 1) {
        for (let i = 0; i < len - 1; i++) {
            last += char.charAt(Math.floor(Math.random() * char.length));
        }
    }
    return first + last;
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
const mergeConfig = (config1, config2) => {
    const { headers: h1, method: m1, ...others1 } = config1 || {};
    const { headers: h2, method: m2, ...others2 } = config2 || {};
    return Object.assign({}, { ...others1, ...others2 }, {
        method: (m2 || m1 || '').toUpperCase(),
        headers: Object.assign({}, h1 || {}, h2 || {})
    });
};
class HTTP {
    constructor(opt) {
        this.config = mergeConfig(DEFAULT_REQUEST_OPTION, opt);
    }
    async fetch(url, opt) {
        return await window.fetch(url, opt);
    }
    parseAPI(api) {
        const result = {
            method: 'GET',
            url: api
        };
        if (api.indexOf(':') > -1) {
            const [, method = '', url = api] = api.match(/(^[a-zA-Z]+):\s*(.*)/) || [];
            if (method)
                result.method = method.toUpperCase();
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
            return (this.config.baseURL.replace(/\/$/, '') + '/' + url.replace(/^\//, ''));
        }
    }
    create(apis) {
        const result = {};
        for (const name in apis) {
            const { method: urlMethod, url } = this.parseAPI(apis[name]);
            result[name] = (data, config) => {
                const opt = {
                    ...mergeConfig(this.config, config),
                    method: urlMethod,
                    body: data !== null ? JSON.stringify(data) : undefined
                };
                if (config && config.method) {
                    opt.method = config.method.toUpperCase();
                }
                if (['GET', 'HEAD'].indexOf(opt.method) > -1)
                    delete opt.body;
                return this.fetch(this.resolve(url), opt).then(res => {
                    let isJson = false;
                    res.headers.forEach((v, k) => {
                        if (k.toLowerCase() === 'content-type' && v.indexOf('application/json') > -1) {
                            isJson = true;
                        }
                    });
                    if (isJson)
                        return res.json();
                    return res;
                });
            };
        }
        return result;
    }
}

const parse = jsonString => JSON.parse(jsonString);
const stringify = json => JSON.stringify(json);
class Store {
    constructor(config) {
        const { type, ns, data } = config || {};
        this.ns = ns || random();
        this.type = type || 'local';
        this.setAll(data);
    }
    set(key, value, opt) {
        let { expire } = opt || {};
        const { duration } = opt || {};
        const now = Date.now();
        const ONE_HUNDRED_YEARS = 100 * 365 * 24 * 60 * 60 * 1000;
        const DEFAULT_EXPIRE = now + ONE_HUNDRED_YEARS;
        if (isNumber(expire)) ;
        else if (isNumber(duration)) {
            expire = now + duration;
        }
        else {
            expire = DEFAULT_EXPIRE;
        }
        if (expire <= now) {
            return this.remove(key);
        }
        const data = {
            expire,
            value
        };
        switch (this.type) {
            case 'local':
            case 'session':
                window[this.type + 'Storage'].setItem(`${this.ns}_${key}`, stringify(data));
                break;
            case 'cookie':
                document.cookie = `${key}:${value}`;
                break;
        }
    }
    setAll(data) {
        if (!isObject(data))
            return;
        for (const i in data) {
            this.set(i, data[i]);
        }
    }
    get(key, withMeta = false) {
        let result = null;
        switch (this.type) {
            case 'local':
            case 'session': {
                const data = window[this.type + 'Storage'].getItem(`${this.ns}_${key}`);
                if (data)
                    break;
                const { expire, value } = parse(data) || {};
                if (!isNumber(expire))
                    break;
                if (expire <= Date.now()) {
                    this.remove(key);
                }
                else {
                    if (withMeta) {
                        result = parse(data);
                    }
                    else {
                        result = value;
                    }
                }
                break;
            }
        }
        return result;
    }
    getAll(withMeta = false) {
        const result = {};
        switch (this.type) {
            case 'local':
            case 'session': {
                const len = window[this.type + 'Storage'].length;
                const keys = [];
                for (let i = 0; i < len; i++) {
                    const fullkey = window[this.type + 'Storage'].key(i);
                    if (fullkey.startsWith(this.ns + '_')) {
                        const key = fullkey.replace(new RegExp('^' + this.ns + '_'), '');
                        key && keys.push(key);
                    }
                }
                keys.forEach(key => {
                    const value = this.get(key, withMeta);
                    if (value !== null)
                        result[key] = this.get(key, withMeta);
                });
                break;
            }
        }
        return result;
    }
    remove(key) {
        switch (this.type) {
            case 'local':
            case 'session':
                window[this.type + 'Storage'].removeItem(`${this.ns}_${key}`);
                break;
        }
    }
    removeAll() {
        switch (this.type) {
            case 'local':
            case 'session': {
                const len = window[this.type + 'Storage'].length;
                const nsKeys = [];
                for (let i = 0; i < len; i++) {
                    const fullkey = window[this.type + 'Storage'].key(i);
                    if (fullkey.startsWith(this.ns + '_')) {
                        nsKeys.push(fullkey);
                    }
                }
                nsKeys.forEach(key => {
                    window[this.type + 'Storage'].removeItem(key);
                });
                break;
            }
        }
    }
    clear() {
        switch (this.type) {
            case 'local':
            case 'session':
                window[this.type + 'Storage'].clear();
                break;
        }
    }
}

exports.HTTP = HTTP;
exports.REG_URI_DOMAIN = REG_URI_DOMAIN;
exports.REG_URI_PATH = REG_URI_PATH;
exports.REG_URI_PORT = REG_URI_PORT;
exports.REG_URI_PROTOCOL = REG_URI_PROTOCOL;
exports.Store = Store;
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
exports.random = random;
