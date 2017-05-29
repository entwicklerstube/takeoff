const mock = require('mock-fs');
const expect = require('chai').expect

const { getPredefinedStations, getCustomStations, loadStationByName } = require('./lib/station')

describe('lib/station', () => {
  describe('getPredefinedStations', () => {
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
      const officialStations = await getPredefinedStations()
      expect(officialStations).to.be.a('array')
    })

    it('returns mocked station', async () => {
      const officialStations = await getPredefinedStations()
      expect(officialStations).to.deep.equal(['component', 'node-module'])
    })

    it('returns empty array if no mocked stations are available', async () => {
      mock.restore()

      mock({
        'stations': {}
      });

      const officialStations = await getPredefinedStations()
      expect(officialStations).to.deep.equal([])
    })
  })

  describe('getCustomStations', () => {
    beforeEach(() => {
      mock({
        '.takeoff/custom-station': {}
      });
    })

    afterEach(() => {
      mock.restore()
    })

    it('returns array', async () => {
      const customStations = await getCustomStations()
      expect(customStations).to.be.a('array')
    })

    it('returns array with custom stations (in a .takeoff folder)', async () => {
      const customStations = await getCustomStations()
      expect(customStations).to.deep.equal(['custom-station'])
    })

    it('returns empty array if .takeoff folder doesnt exist ', async () => {
      mock.restore()

      const customStations = await getCustomStations()
      expect(customStations).to.deep.equal([])
    })
  })

  describe('loadStationByName', () => {
    it('returns a object', async () => {
      const station = await loadStationByName()
      expect(station).to.be.a('object')
    })

    it('returns a object', async () => {
      const station = await loadStationByName()
      expect(station).to.be.a('object')
    })
  })
})












//
