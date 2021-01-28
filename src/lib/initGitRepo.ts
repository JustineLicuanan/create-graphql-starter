import { green } from 'chalk';
import { execSync } from 'child_process';

const pkg = require('../../package.json');

const isGitInstalled = () => {
	try {
		execSync('git --version', { stdio: 'ignore' });
		return true;
	} catch (err) {
		return false;
	}
};

const initGitRepo = () => {
	if (isGitInstalled()) {
		console.log(`${green('Initializing Git repository...')}\n`);

		execSync(
			`git init && git add . && git commit -m "Initialize project with ${pkg.name}"`,
			{ stdio: 'ignore' }
		);
	}
};

export default initGitRepo;
