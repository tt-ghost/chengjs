#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const program = new commander_1.Command();
const prompts = [
    {
        name: '描述',
        message: '请输入描述信息',
        default: '',
    }, {
        name: '作者',
        message: '请输入作者',
        default: '',
    }
];
program
    .name('cheng')
    .description('cheng cli')
    .version('0.1.0');
program.command('build')
    .description('打包')
    // .argument('<string>', 'string to split')
    // .option('--first', 'display just the first substring')
    // .option('-s, --separator <char>', 'separator character', ',')
    .action((str, options) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
    const answers = yield inquirer_1.default.prompt(prompts);
    console.log('answers: ', answers);
}));
program.parse();
