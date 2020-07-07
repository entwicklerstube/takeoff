import fs from 'fs';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);

/**
 * @name findTemplates
 * @param path Absolute system path where the template folder should be
 */
export const findTemplates = async (path: string): Promise<string[]> => {
  const templates: object[] = [];

  const asd: string[] = await readdir(process.cwd());

  // console.log('asd');
  // console.log(asd);

  return asd;
};
