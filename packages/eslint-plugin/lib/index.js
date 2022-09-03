"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const typescript_1 = __importDefault(require("./configs/typescript"));
const vue_1 = __importDefault(require("./configs/vue"));
const react_1 = __importDefault(require("./configs/react"));
const react_all_1 = __importDefault(require("./configs/react-all"));
const recommended_1 = __importDefault(require("./configs/recommended"));
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ['standard'],
    // parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
    // '@typescript-eslint'
    ],
    rules: {},
    configs: {
        typescript: typescript_1.default,
        vue: vue_1.default,
        react: react_1.default,
        'react-all': react_all_1.default,
        recommended: recommended_1.default
    }
};
