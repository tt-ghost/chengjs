"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitignore = void 0;
const utils_1 = require("../utils");
const gitignore = () => (0, utils_1.writeFile)('.gitignore');
exports.gitignore = gitignore;
