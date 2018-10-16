import fs, { lstatSync } from "fs";
import { promisify } from "util";
import { resolve, extname } from "path";

const readdir = promisify(fs.readdir);

// Finds stations by folder-structure ignoring the content of the files
export const findStationsInFolder = async ({
  takeoffStationsFolderKeyword = ".takeoff", // by default we're searching for .takeoff folders
  root = process.cwd() // by default we're searching in the cwd
} = {}) => {
  const folders = await readdir(root);
  let stations = [];

  const takeoffFolderIndex = folders.findIndex(
    folder => folder === takeoffStationsFolderKeyword
  );

  if (takeoffFolderIndex >= 0) {
    const nextStations = await readdir(resolve(folders[takeoffFolderIndex]));

    stations = stations.concat(nextStations);
  }

  // strip file-types
  stations = stations.map(
    station => station.substr(0, station.lastIndexOf(".")) || station
  );

  return stations;
};

// @TODO, refactore
const extractStationName = path => {
  const removeIndex = path.replace("/index.js", "").replace(".js", "");
  const splittedByFolders = removeIndex.split("/");

  // throw path;

  return splittedByFolders[splittedByFolders.length - 1];
};

// Opens the station - if its an JS file - and returns the export, it also uses the filename as station-name fallback
export const resolveStation = async stationPath => {
  try {
    const stationFileExtension = extname(stationPath);

    // if its a file and has a js extension we should be able to load it via "require"
    if (stationFileExtension === ".js") {
      let stationJS = require(stationPath);

      // if there are the required fields its a valid station and we can pass it through
      if (stationJS && stationJS.get && stationJS.exec) {
        stationJS.title = stationJS.title || extractStationName(stationPath);
        return stationJS;
      }

      return false;
      // if its no file an has no extension it's a folder
    } else if (stationFileExtension === "") {
      return resolveStation(resolve(stationPath, "index.js"));
    }
    // if its no JS file and no folder we ignore it
  } catch (error) {
    return false;
  }
};

const getAvailableStations = async () => {};

export default getAvailableStations;
