const fs = require('fs');
const path = require('path');

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
      resolve(files.filter(file => fs.lstatSync(path.join(stationsFolder, file)).isDirectory()));
    });
  } else {
    resolve([]);
  }
});

const loadStationByName = (stationName = '') => new Promise((resolve, reject) => {
  const stationPath = path.resolve(__dirname, '../.takeoff', stationName, '__station__.js');
  let requiredStation = {};

  if (fs.existsSync(stationPath)) {
    requiredStation = require(stationPath);
  } else {
    reject(new Error(`Station "${stationName}" not found.`));
  }

  resolve(requiredStation);
});

module.exports = {getPredefinedStations, getCustomStations, loadStationByName};
