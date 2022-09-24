/**
 * name: @chengjs/utils
 * version: v0.1.0
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.cutils = {}));
})(this, (function (exports) { 'use strict';

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

    Object.defineProperty(exports, '__esModule', { value: true });

}));
