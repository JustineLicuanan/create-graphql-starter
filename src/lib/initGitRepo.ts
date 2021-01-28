import { green } from 'chalk';
import { execSync } from 'child_process';

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
			'git init && git add . && git commit -m "Initialize project with create-tsa"',
			{ stdio: 'ignore' }
		);
	}
};

export default initGitRepo;
