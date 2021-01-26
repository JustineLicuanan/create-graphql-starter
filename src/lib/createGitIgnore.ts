import { writeFileSync } from 'fs-extra';
import { join } from 'path';

type CreateGitIgnore = (appDir: string) => void;

const createGitIgnore: CreateGitIgnore = appDir => {
  process.chdir(join(process.cwd(), appDir));
  writeFileSync('.gitignore', 'node_modules/\ndist/\ndatabase.sqlite*\n.env\n');
};

export default createGitIgnore;
