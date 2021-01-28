#!/usr/bin/env node
import { cyan, green } from 'chalk';
import { Command } from 'commander';

import copyTemplate from './lib/copyTemplate';
import initGitRepo from './lib/initGitRepo';
const pkg = require('../package.json');

let appDir: any;
const program = new Command(cyan(`npx ${pkg.name}`))
	.version(pkg.version)
	.description(pkg.description)
	.usage(green('<app-directory> [options]'))
	.arguments('[app-directory]')
	.action((appDirectory) => {
		appDir = appDirectory;
	})
	.option('-s, --simple', 'Use simple template')
	.parse();

if (!appDir) {
	program.outputHelp();
	console.log();
	console.log('For example:');
	console.log(`  ${program.name()} ${green('my-app')}\n`);
	process.exit();
}

console.log();

const options = program.opts();
copyTemplate(appDir, options);
initGitRepo();

console.log(`${green('Done!')}\n`);
