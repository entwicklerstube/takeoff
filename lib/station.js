const fs = require('fs');
const path = require('path');
const {generate} = require('shortid');

const baseDir = {
  predefined: path.resolve(__dirname, '../stations'),
  custom: path.resolve(process.cwd(), '.takeoff')
};

const getPredefinedStations = () => new Promise((resolve, reject) => {
  const stationsFolder = path.resolve(__dirname, '../stations');

  fs.readdir(stationsFolder, (err, files = []) => {
    if (err) {
      reject(err);
    }
    resolve(
      files
        .filter(file => !/.DS_Store|_shared/.test(file))
        .filter(file => fs.lstatSync(path.join(stationsFolder, file)).isDirectory())
        .map(file => ({name: file, value: generate(), type: 'predefined'}))
      );
  });
});

const getCustomStations = () => new Promise((resolve, reject) => {
  const stationsFolder = path.resolve(process.cwd(), '.takeoff');
  if (fs.existsSync(stationsFolder)) {
    fs.readdir(stationsFolder, (err, files = []) => {
      if (err) {
        reject(err);
      }
      resolve(
        files
          .filter(file => fs.lstatSync(path.join(stationsFolder, file)).isDirectory())
          .map(file => ({name: file, value: generate(), type: 'custom'}))
        );
    });
  } else {
    resolve([]);
  }
});

const loadStationByName = ({name, type}) => new Promise((resolve, reject) => {
  const stationPath = path.resolve(baseDir[type], name, '__station.js');
  let requiredStation = {};

  if (fs.existsSync(stationPath)) {
    requiredStation = require(stationPath);
  } else {
    reject(new Error(`Station "${name}" not found.`));
  }

  resolve(requiredStation);
});

module.exports = {getPredefinedStations, getCustomStations, loadStationByName};
