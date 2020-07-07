import { findTemplates } from './';
import mock from 'mock-fs';
// import { expect } from 'chai';

describe('hey', () => {
  it('does', async () => {
    mock({
      'some-dir': {},
      'some-file': '',
      '.takeoff': {
        'my-station.js': 'hey',
      },
    });

    const a = await findTemplates(__dirname);

    console.log(a);
    global.expect(a).to.have.lengthOf(3);
  });
});

// describe('find-templates', () => {
//   describe('basics', () => {
//     it('returns an array', async () => {
//       expect(Array.isArray(await findTemplates('./'))).toBe(true);
//     });
//   });

//   describe('file handling', async () => {
//     const MOCK_FILES = {
//       '/test.js': 'module.exports = { hello: "world" }',
//     };

//     beforeEach(() => require('fs').__setMockFiles(MOCK_FILES));

//     it('find files', async () => {
//       const a = await findTemplates('/');

//       console.log('1');
//       console.log(a);

//       expect(a).toHaveLength(1);
//       // expect(a[0]).toEqual({
//       //   content: 'hello',
//       // });
//     });
//   });
// });
