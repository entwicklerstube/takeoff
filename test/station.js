import test from 'ava';

const { getOfficialStations } = require('../lib/station')
const mock = require('mock-fs');

// test.beforeEach(() => mock({
// 	'stations/node-module': { '__station__.js': 'hey' }
// }))
//
// test.afterEach(() => mock.restore())

test('getOfficialStations returns a array', t => {
	t.type('asd');
});

// test('getOfficialStations returns a array', async t => {
// 	t.true(await getOfficialStations());
// 	// t.is(await getOfficialStations(), []);
// });



// describe('lib/station', () => {
//   beforeEach(() => {
//     mock({
//       'stations/node-module': { '__station__.js': 'hey' }
//     });
//   })
//
//   afterEach(() => {
//     mock.restore()
//   })
//
//   it('returns array with available stations', () => {
//     expect(getOfficialStations()).to.eventually.have.property('hey')
//     // eventually
//   })
// })
