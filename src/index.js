#!/usr/bin/env node
const commander = require('commander');
const chalk = require('chalk');
const packageJson = require('../package.json');
const fs = require('fs-extra');
const path = require('path');

let projectDir;

const program = new commander.Command(packageJson.name)
	.version(packageJson.version)
	.arguments('<project-directory>')
	.usage(`${chalk.green('<project-directory>')}`)
	.action((name) => {
		projectDir = name;
	})
	// .option('--auth', 'use auth starter')
	.parse(process.argv);

if (projectDir === undefined) {
	console.error('Please specify the project directory:');
	console.log(
		`  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
	);
	console.log();
	console.log('For example:');
	console.log(`  ${chalk.cyan(program.name())} ${chalk.green('cg-starter')}`);
	process.exit(1);
}

const projectDestination = path.join(process.cwd(), projectDir);

fs.copySync(
	path.join(
		__dirname,
		'../public',
		'auth-starter'
		// program.auth ? 'auth-starter' : 'main-starter'
	),
	projectDir
);

process.chdir(projectDestination);
