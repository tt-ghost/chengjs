"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.npmrc = void 0;
const utils_1 = require("../utils");
const npmrc = () => (0, utils_1.writeFile)('.npmrc');
exports.npmrc = npmrc;
