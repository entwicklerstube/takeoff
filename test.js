const path = require('path');
const mockFs = require('mock-fs');
const mockRequire = require('mock-require');
const expect = require('chai').expect;
const {readFile} = require('fs-extra');

const {getStations, loadStationByName} = require('./lib/station');
const {createFile, createFilesByList} = require('./lib/wizard');

describe('lib/station', () => {

  describe('getStations', () => {

    afterEach(() => {
      mockFs.restore();
    });

    it('returns array', async () => {

      mockFs({
        '.takeoff/custom-station': {}
      });

      const stations = await getStations();
      expect(stations).to.be.a('array');
    });

    it('returns empty array if .takeoff folder doesnt exist ', async () => {
      mockFs({});

      const stations = await getStations();
      expect(stations).to.deep.equal([]);
    });
  });

  describe('loadStationByName', () => {

    const stationsPath = path.resolve(process.cwd(), '.takeoff');
    const sampleStation = path.resolve(stationsPath, 'custom-station', '__station.js');
    const mockRequireStationPath = path.resolve(__dirname, '.takeoff', 'custom-station', '__station.js');

    beforeEach(() => {

      mockFs({
        [sampleStation]: {},
      });

      mockRequire(mockRequireStationPath, {mockedType: 'custom-station'});
    });

    afterEach(() => {
      mockFs.restore();
    });

    it('returns a object', async () => {
      const station = await loadStationByName({name: 'custom-station', stationsPath});

      expect(station).to.be.a('object');
    });

    it('returns station information from station', async () => {
      const station = await loadStationByName({name: 'custom-station', stationsPath});

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
