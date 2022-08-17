#!/usr/bin/env node
import { Command } from 'commander'
import inquirer from 'inquirer';
  
// TODO: 格式化
const program = new Command();
   
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
]

program
  .name('cheng')
  .description('cheng cli')
  .version('0.1.0');

program.command('build')
  .description('打包')
  // .argument('<string>', 'string to split')
  // .option('--first', 'display just the first substring')
  // .option('-s, --separator <char>', 'separator character', ',')
  .action(async (str: string, options: any) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
    const answers = await inquirer.prompt(prompts)
    console.log('answers: ', answers)
  });

program.parse();
