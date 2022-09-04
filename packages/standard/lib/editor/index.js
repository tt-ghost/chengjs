"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editorconfig = void 0;
const utils_1 = require("../utils");
const editorconfig = () => (0, utils_1.writeFile)('.editorconfig');
exports.editorconfig = editorconfig;
