"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitIgnore = void 0;
const utils_1 = require("../utils");
const gitIgnore = () => (0, utils_1.writeFile)('.gitignore');
exports.gitIgnore = gitIgnore;
