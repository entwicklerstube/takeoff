const { join } = require('path');
const { createFolder, createFile } = require('../../../utils.js');

const indexTemplate = require('./index-template');
const testTemplate = require('./test-template');

module.exports = {
  name: 'Util',
  description: 'Create a new util',
  get: 'name',
  exec: async ({ name }) => {
    const nextUtilPath = join(process.cwd(), 'utils', name);

    await createFolder(nextUtilPath);
    await createFile(join(nextUtilPath, 'index.js'), indexTemplate({ name }));
    await createFile(join(nextUtilPath, 'test.js'), testTemplate({ name }));
  }
};
