"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettierIgnore = exports.prettier = void 0;
const _prettier_1 = __importDefault(require("./.prettier"));
exports.prettier = _prettier_1.default;
const utils_1 = require("../utils");
const prettierIgnore = () => (0, utils_1.writeFile)('.prettierignore');
exports.prettierIgnore = prettierIgnore;
