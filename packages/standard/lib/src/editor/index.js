"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editorConfig = void 0;
const utils_1 = require("../utils");
const editorConfig = () => (0, utils_1.writeFile)('.editorconfig');
exports.editorConfig = editorConfig;
