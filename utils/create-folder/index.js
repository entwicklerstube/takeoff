import { mkdir } from 'fs';

/**
 * Create a foder
 * @import `import { createFolder } from 'takeoff/utils'`
 * @example
 * await createFolder('hello-world')
 * // => successfully created the folder 'hello-world' in the "__dirname" folder
 */
export const createFolder = async (path, options = {}) => {
  mkdir(path, options, err => {
    if (err) {
      throw err;
    }
    return true;
  });
};

export default createFolder;
