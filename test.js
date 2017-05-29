const path = require('path');
const mockFs = require('mock-fs');
const mockRequire = require('mock-require');
const expect = require('chai').expect;

const {getPredefinedStations, getCustomStations, loadStationByName} = require('./lib/station');

describe('lib/station', () => {
  describe('getPredefinedStations', () => {
    beforeEach(() => {
      mockFs({
        'stations/node-module': {},
        'stations/component': {}
      });
    });

    afterEach(() => {
      mockFs.restore();
    });

    it('returns array with available stations', async () => {
      const officialStations = await getPredefinedStations();
      expect(officialStations).to.be.a('array');
    });

    it('returns mocked station', async () => {
      const officialStations = await getPredefinedStations();
      expect(officialStations).to.deep.equal(['component', 'node-module']);
    });

    it('returns empty array if no mocked stations are available', async () => {
      mockFs.restore();

      mockFs({
        stations: {}
      });

      const officialStations = await getPredefinedStations();
      expect(officialStations).to.deep.equal([]);
    });
  });

  describe('getCustomStations', () => {
    beforeEach(() => {
      mockFs({
        '.takeoff/custom-station': {}
      });
    });

    afterEach(() => {
      mockFs.restore();
    });

    it('returns array', async () => {
      const customStations = await getCustomStations();
      expect(customStations).to.be.a('array');
    });

    it('returns array with custom stations (in a .takeoff folder)', async () => {
      const customStations = await getCustomStations();
      expect(customStations).to.deep.equal(['custom-station']);
    });

    it('returns empty array if .takeoff folder doesnt exist ', async () => {
      mockFs.restore();

      const customStations = await getCustomStations();
      expect(customStations).to.deep.equal([]);
    });
  });

  describe('loadStationByName', () => {
    beforeEach(() => {
      mockFs({
        '.takeoff/custom-station': {}
      });

      const mockRequireCustomStationPath = path.resolve(__dirname, '.takeoff', 'custom-station', '__station.js');
      mockRequire(mockRequireCustomStationPath, {mocked: 'station'});
    });

    afterEach(() => {
      mockFs.restore();
    });

    it('returns a object', async () => {
      const station = await loadStationByName('custom-station');
      expect(station).to.be.a('object');
    });

    // It('returns a object', async () => {
    //   const station = await loadStationByName();
    //   expect(station).to.be.a('object');
    // });
    //
    // it('returns a object', async () => {
    //   const station = await loadStationByName();
    //   expect(station).to.be.a('object');
    // });
  });
});

//
