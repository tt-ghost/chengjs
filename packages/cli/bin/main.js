#!/usr/bin/env node
const { Command } = require('commander')
const inquirer = require('inquirer')
const pkg = require('../package.json')

const program = new Command()
const prompts = [
  {
    name: 'desc',
    message: '请输入描述信息',
    default: pkg.description || ''
  }, {
    name: 'author',
    message: '请输入作者',
    default: pkg.author || ''
  }
]

program
  .name(pkg.name)
  .description(pkg.description)
  .version(pkg.version)

program.description('获取版本')
  .option('-v, --version', '获取版本')

// program.command('create')
//   .description('打包')
//   .argument('<string>', 'string to split')
//   .option('--first', 'display just the first substring')
//   .option('-s, --separator <char>', 'separator character', ',')
//   .action(async (str, options) => {
//     const limit = options.first ? 1 : undefined;
//     console.log(str.split(options.separator, limit));
//     const answers = await inquirer.prompt(prompts)
//     console.log('answers: ', answers)
//   });

program.command('build')
  .description('打包')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action(async (str, options) => {
    const limit = options.first ? 1 : undefined
    console.log(str.split(options.separator, limit))
    const answers = await inquirer.prompt(prompts)
    console.log('answers: ', answers)
  })

program.command('init')
  .description('初始化项目')
  // .argument('<string>', '项目名称', pkg.name || '')
  // .option('--first', 'display just the first substring')
  // .option('-s, --separator <char>', 'separator character', ',')
  .action(async (str, options) => {
    console.log(999, str, options)
    // 1. download template
    // 2. add standard
    // 3. check project
  })

program.parse()
