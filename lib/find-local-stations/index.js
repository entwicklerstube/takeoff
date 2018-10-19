import fs, { lstatSync, existsSync } from "fs";
import { promisify } from "util";
import { resolve, parse, relative } from "path";
import debug from "debug";

const readdir = promisify(fs.readdir);
const log = debug("takeoff:find-local-stations");
const logError = debug("takeoff:find-local-stations:error");

/**
 * Pass any path and it searches for stations as folder or file
 * @param {string} path
 * @returns {array} List of found stations within the name and the absolute path
 */
export const findStationsByPath = async path => {
  const foundStations = [];
  if (existsSync(path) && lstatSync(path).isDirectory()) {
    const itemsInStationDir = await readdir(path);

    itemsInStationDir.forEach(itemName => {
      const stationPath = resolve(path, itemName);
      const station = lstatSync(stationPath);

      if (station.isFile()) {
        log("Found station as file", stationPath);
        parseStation(stationPath);
        foundStations.push({
          name: parse(itemName).name,
          path: stationPath
        });
      } else if (station.isDirectory()) {
        const stationWithIndexJSPath = resolve(stationPath, "index.js");

        log("Found station as folder", stationWithIndexJSPath);
        if (
          existsSync(stationWithIndexJSPath) &&
          lstatSync(stationWithIndexJSPath).isFile()
        ) {
          foundStations.push({
            name: itemName,
            path: stationWithIndexJSPath
          });
        }
      }
    });
  }

  return foundStations;
};

/**
 * Calculate an array of cumulated paths calculated recursive to the shortest path
 * @param {string} rootPath
 * @returns {array} List of paths
 */
export const getRecursivePaths = rootPath => {
  if (!rootPath) return [];
  if (rootPath === "/") return [rootPath];

  return rootPath
    .split("/")
    .map((_1, pathIndex, paths) =>
      paths.filter((_2, pathCollIndex) => pathCollIndex <= pathIndex)
    )
    .map(paths => paths.filter(path => path.length > 0))
    .map(paths => "/" + paths.join("/"));
};

/**
 * Parses station by path and returns inner values
 * @param {string} stationPath
 * @returns {array} List of found stations, important: one file can contain multiple
 */
export const parseStation = (stationPath = "") => {
  /**
   * NEXT STEPS
   * - Load Station and check if a "get" param and "exec" func is available
   *   IMPORTANT: Users can also define an array as station
   */
  const parsedStations = [];

  if (existsSync(stationPath) && lstatSync(stationPath).isFile()) {
    try {
      const requirePath = "./" + relative(process.cwd(), stationPath);

      const requiredStation = require(requirePath);

      if (requiredStation.get && requiredStation.exec) {
        parsedStations.push(requiredStation);
      } else {
        logError('A station always requires a "get" and "exec" prop');
      }
    } catch (err) {
      logError("The station is not valid:", stationPath, err);
    }
  } else {
    logError("The station is not available:", stationPath);
  }

  return parsedStations;
};

/**
 * Returns all stations up the tree
 * @param {string} stationsDir
 * @param {string} root
 * @returns {array} List of stations grouped by the folders they're found
 */
const FindLocalStations = async ({
  stationsDir = ".takeoff", // <-- should this be an array?
  root = process.cwd()
} = {}) => {
  log(
    `Get recursive all stations up the tree from root "${root}" searched by stations-dir "${stationsDir}"`
  );

  const paths = getRecursivePaths(root);
  const stationsByPath = [];

  for (const path of paths) {
    const stationPath = resolve(path, stationsDir);
    const foundStations = await findStationsByPath(stationPath);

    if (foundStations.length > 0) {
      stationsByPath.push({
        stationsDir,
        pathToStation: path,
        absolutePath: stationPath,
        pathFromHome: path.replace(process.env.HOME + "/", ""),
        isCurrentWorkingDirectory: process.cwd() === path,
        stations: foundStations
      });
    }
  }

  return stationsByPath;
};

export default FindLocalStations;
