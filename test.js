const path = require('path');
const mockFs = require('mock-fs');
const mockRequire = require('mock-require');
const expect = require('chai').expect;
const {readFile} = require('fs-extra');

const {getPredefinedStations, getCustomStations, loadStationByName} = require('./lib/station');
const {createFile, createFilesByList} = require('./lib/wizard');

describe('lib/station', () => {
  // describe('getPredefinedStations', () => {
  //   beforeEach(() => {
  //     mockFs({
  //       'stations/node-module': {},
  //       'stations/component': {}
  //     });
  //   });
  // 
  //   afterEach(() => {
  //     mockFs.restore();
  //   });
  // 
  //   it('returns array with available stations', async () => {
  //     const officialStations = await getPredefinedStations();
  //     expect(officialStations).to.be.a('array');
  //   });
  // 
  //   it('returns mocked stations', async () => {
  //     const officialStations = await getPredefinedStations();
  // 
  //     expect(officialStations).to.have.lengthOf(2);
  // 
  //     expect(officialStations[0]).to.have.property('name', 'component');
  //     expect(officialStations[0]).to.have.property('type', 'predefined');
  // 
  //     expect(officialStations[1]).to.have.property('name', 'node-module');
  //     expect(officialStations[1]).to.have.property('type', 'predefined');
  //   });
  // 
  //   it('returns empty array if no mocked stations are available', async () => {
  //     mockFs.restore();
  // 
  //     mockFs({
  //       stations: {}
  //     });
  // 
  //     const officialStations = await getPredefinedStations();
  //     expect(officialStations).to.deep.equal([]);
  //   });
  // });

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

      expect(customStations[0]).to.have.property('name', 'custom-station');
      expect(customStations[0]).to.have.property('type', 'custom');
    });

    it('returns empty array if .takeoff folder doesnt exist ', async () => {
      mockFs.restore();

      const customStations = await getCustomStations();
      expect(customStations).to.deep.equal([]);
    });
  });

  describe('loadStationByName', () => {
    beforeEach(() => {
      const predfinedPath = path.resolve(__dirname, 'stations');
      const stationsPath = path.resolve(process.cwd(), '.takeoff');

      mockFs({
        [path.resolve(stationsPath, 'custom-station', '__station.js')]: {},
        [path.resolve(predfinedPath, 'predefined-station', '__station.js')]: {}
      });

      const mockRequireCustomStationPath = path.resolve(__dirname, '.takeoff', 'custom-station', '__station.js');
      mockRequire(mockRequireCustomStationPath, {mockedType: 'custom-station'});

      const mockRequirePredefinedPath = path.resolve(predfinedPath, 'predefined-station', '__station.js');
      mockRequire(mockRequirePredefinedPath, {mockedType: 'predefined-station'});
    });

    afterEach(() => {
      mockFs.restore();
    });

    it('returns a object', async () => {
      const station = await loadStationByName({name: 'custom-station', type: 'custom'});

      expect(station).to.be.a('object');
    });

    it('returns station information from predefined station', async () => {
      const station = await loadStationByName({name: 'predefined-station', type: 'predefined'});

      expect(station.mockedType).to.equal('predefined-station');
    });

    it('returns station information from custom station', async () => {
      const station = await loadStationByName({name: 'custom-station', type: 'custom'});

      expect(station.mockedType).to.equal('custom-station');
    });
  });
});

describe('lib/wizard', () => {
  beforeEach(() => mockFs());
  afterEach(() => mockFs.restore());

  describe('createFile', () => {
    it('creates a file with specific content', async () => {
      const createFileContent = 'This is my uniq content which i expect to be in the file';
      const createFileName = 'my/test/file.js';

      await createFile({filename: createFileName, template: createFileContent});

      const readContentFile = await readFile(createFileName, 'utf8');

      expect(readContentFile).to.equal(createFileContent);
    });
  });

  describe('createFilesByList', () => {
    it('creates a list of files in a row', async () => {
      await createFilesByList([{
        filename: 'my/test/file.js', template: 'This is my uniq content which i expect to be in the file'
      }, {
        filename: 'some-file.jsx', template: '<div>jsx?</div>'
      }]);

      const readMyTestFileContent = await readFile('my/test/file.js', 'utf8');
      expect(readMyTestFileContent).to.equal('This is my uniq content which i expect to be in the file');

      const readSomeFileJSXContent = await readFile('some-file.jsx', 'utf8');
      expect(readSomeFileJSXContent).to.equal('<div>jsx?</div>');
    });
  });
});
