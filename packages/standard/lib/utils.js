"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const writeFile = (filename) => {
    const fullpath = path_1.default.resolve(process.cwd(), filename);
    const isExist = fs_1.default.existsSync(path_1.default.resolve(fullpath));
    if (isExist)
        return console.warn(`${filename} has existed!`);
    fs_1.default.readFile(fullpath, (err, data) => {
        if (err)
            return console.warn(err);
        fs_1.default.writeFileSync(filename, data, { encoding: 'utf8' });
    });
};
exports.writeFile = writeFile;
