import { writeFile } from 'fs';
import { join } from 'path';

/**
 * Create a foder
 * @import `import { createFile } from 'takeoff/utils'`
 * @example
 * await createFile('world.md')
 * // => successfully created the file 'world.md' in the "__dirname" folder
 */
export const createFile = async (path, content, encoding = 'utf-8') => {
  writeFile(path, content, encoding, err => {
    if (err) {
      throw err;
    }
    return true;
  });
};

export default createFile;
