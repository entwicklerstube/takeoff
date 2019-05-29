import createFile from './';
import fs from 'fs';
import { promisify } from 'util';
import mock from 'mock-fs';

const readdir = promisify(fs.readdir);

describe('Util - CreateFile', () => {
  beforeEach(() => mock.restore());

  it('returns a string', async () => {
    mock({});

    await createFile('./hello-world.md');

    const folderFiles = await readdir('./');

    expect(folderFiles, 'to have length', 1);
    expect(folderFiles[0], 'to equal', 'hello-world.md');
  });
});
