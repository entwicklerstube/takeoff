import createFolder from './';

describe.only('Util - CreateFolder', () => {
  it('returns a string', async () => {
    expect(await createFolder(), 'to be a string');
  });
});
