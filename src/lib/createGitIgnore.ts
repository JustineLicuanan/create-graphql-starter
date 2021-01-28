import { writeFileSync } from 'fs-extra';

const createGitIgnore = () => {
	writeFileSync('.gitignore', 'node_modules/\ndist/\ndatabase.sqlite*\n.env\n');
};

export default createGitIgnore;
