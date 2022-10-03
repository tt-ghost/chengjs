"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintIgnore = void 0;
const utils_1 = require("../utils");
const eslintIgnore = () => (0, utils_1.writeFile)('.eslintignore');
exports.eslintIgnore = eslintIgnore;
