import { mkdir } from 'fs';
import { path } from 'change-case';

/**
 * Convert the case-type of a string to paramCase
 * @import `import { createFolder } from 'takeoff/utils'`
 * @example
 * await createFolder('hello-world')
 * // => successfully created the folder 'hello-world' in the "__dirname" folder
 */
export const createFolder = async ({ path, options = {} }) => {
  mkdir(path, options, err => {
    if (err) {
      throw err;
    }
    return true;
  });
};

export default createFolder;
