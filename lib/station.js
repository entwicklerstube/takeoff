const fs = require('fs');
const path = require('path');
const util = require('util');

const promiseReaddir = util.promisify(fs.readdir);

const discover = require('./discover');
const projectFolder = '.takeoff';

const generate = () => Math.random().toString(16).slice(2);

const getStations = async () => {

  try {
    const roots = await discover.findRoots(process.cwd(), projectFolder);

    const stationsPaths = roots.map( r => path.resolve(r,projectFolder));

    let stations = [];

    for(const stationsPath of stationsPaths) {

      const files = await promiseReaddir(stationsPath);

      const newStations = files
        .filter(file => fs.lstatSync(path.join(stationsPath, file)).isDirectory())
        .map(file => ({name: file, value: generate(), stationsPath}));

      stations = stations.concat(newStations);
    }

    return stations;
  } catch(e) {

    return [];
  }
};

const loadStationByName = ({name, stationsPath}) => {
  const stationPath = path.resolve(stationsPath, name, '__station.js');

  if (fs.existsSync(stationPath)) {

    return require(stationPath);
  } else {

    throw new Error(`Station "${name}" not found.`);
  }
};

module.exports = { getStations, loadStationByName };
