import { green } from 'chalk';
import { copySync } from 'fs-extra';
import { join } from 'path';

import createGitIgnore from './createGitIgnore';

type CopyTemplate = (appDir: string, options: { simple?: boolean }) => void;

const copyTemplate: CopyTemplate = (appDir, options) => {
	const templateSrc = options.simple ? 'simple-template' : 'auth-template';

	console.log(
		`${green(`Copying \`graphql ${templateSrc}\` to \`${appDir}\`...`)}\n`
	);

	copySync(join(__dirname, `../../public`, templateSrc), appDir);

	process.chdir(join(process.cwd(), appDir));
	createGitIgnore();
};

export default copyTemplate;
