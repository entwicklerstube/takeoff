const mock = require('mock-fs');
const expect = require('chai').expect

const { getOfficialStations } = require('./lib/station')

describe('lib/station', () => {
  beforeEach(() => {
    mock({
      'stations/node-module': {},
      'stations/component': {}
    });
  })

  afterEach(() => {
    mock.restore()
  })

  it('returns array with available stations', async () => {
    const officialStations = await getOfficialStations()
    expect(officialStations).to.be.a('array')
  })

  it('returns mocked station', async () => {
    const officialStations = await getOfficialStations()
    expect(officialStations).to.deep.equal(['component', 'node-module'])
  })

  it('returns empty array if no mocked stations are available', async () => {
    mock.restore()

    mock({
      'stations': {}
    });

    const officialStations = await getOfficialStations()
    expect(officialStations).to.deep.equal([])
  })
})
