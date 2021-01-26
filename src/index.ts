#!/usr/bin/env node
import { green } from 'chalk';
import { Command } from 'commander';
import { copySync } from 'fs-extra';
import { join } from 'path';

import createGitIgnore from './lib/createGitIgnore';
const pkg = require('../package.json');

let appDir: any;
const program = new Command(pkg.name)
  .version(pkg.version)
  .description(pkg.description)
  .usage(green('<app-directory> [options]'))
  .arguments('[app-directory]')
  .action(appDirectory => {
    appDir = appDirectory;
  })
  .option('-s, --simple', 'Use simple template')
  .parse();

if (appDir === undefined) {
  program.help();
}

const options = program.opts();
copySync(
  join(
    __dirname,
    '../public',
    options.simple ? 'simple-template' : 'auth-template'
  ),
  appDir
);

createGitIgnore(appDir);
