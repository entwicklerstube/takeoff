import fs, { lstatSync, existsSync } from 'fs';
import { promisify } from 'util';
import { resolve, parse, relative } from 'path';
import debug from 'debug';
import nanoid from 'nanoid';
import importFromCwd from 'import-cwd';

const readdir = promisify(fs.readdir);
const log = debug('takeoff:find-local-stations');
const logError = debug('takeoff:find-local-stations:error');

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
        log('Found station as file', stationPath);
        const foundStationsByModule = parseStationsByPath(stationPath);

        foundStationsByModule.forEach(station => {
          foundStations.push({
            id: nanoid(),
            name: parse(itemName).name,
            path: stationPath,
            ...station
          });
        });
      } else if (station.isDirectory()) {
        const stationWithIndexJSPath = resolve(stationPath, 'index.js');

        log('Found station as folder', stationWithIndexJSPath);
        if (
          existsSync(stationWithIndexJSPath) &&
          lstatSync(stationWithIndexJSPath).isFile()
        ) {
          const foundStationsByModule = parseStationsByPath(
            stationWithIndexJSPath
          );

          foundStationsByModule.forEach(station => {
            foundStations.push({
              id: nanoid(),
              name: itemName,
              path: stationWithIndexJSPath,
              ...station
            });
          });
        }
      }
    });
  }

  return foundStations;
};

/**
 * Calculate an array of paths calculated recursive to the shortest path
 * @param {string} rootPath
 * @returns {array} List of paths
 * @example
 * getRecursivePaths('/foo/bar/hello/world')
 * // returns
 * [
 *  '/'
 *  '/foo'
 *  '/foo/bar'
 *  '/foo/bar/hello'
 *  '/foo/bar/hello/world'
 * ]
 */
export const getRecursivePaths = rootPath => {
  if (!rootPath) return [];
  if (rootPath === '/') return [rootPath];

  const generatedPaths = rootPath
    .split('/')
    .map((_1, pathIndex, paths) =>
      paths.filter((_2, pathCollIndex) => pathCollIndex <= pathIndex)
    )
    .map(paths => paths.filter(path => path.length > 0))
    .map(paths => '/' + paths.join('/'));

  log(`Generated ${generatedPaths.length} possible paths up the tree`);

  return generatedPaths;
};

/**
 * Pass the response from a "require($station)" and the function will find the containing stations and return them
 * @param {object} stationModule the response of a require
 * @returns {array} Stations found in the object, by default its empty
 */
export const parseStationByType = (stationModule = {}) => {
  const parsedStations = [];
  const stationConstructor = stationModule.constructor;

  const parseStationObject = (station = {}) => {
    const stations = [];
    if (station && station.get && station.exec) {
      parsedStations.push(station);
    }
    return stations;
  };

  switch (stationConstructor) {
    case Object: {
      parsedStations.push(...parseStationObject(stationModule));
      break;
    }

    case Array: {
      stationModule.forEach(stationObject =>
        parsedStations.push(...parseStationObject(stationObject))
      );
      break;
    }
  }

  log(`Parsed ${parsedStations.length} stations from found station-files`);

  return parsedStations;
};

/**
 * Parses station by path and returns inner values
 * @param {string} stationPath
 * @returns {array} List of found stations, important: one file can contain multiple
 */
export const parseStationsByPath = (stationPath = '') => {
  const parsedStations = [];

  if (existsSync(stationPath) && lstatSync(stationPath).isFile()) {
    try {
      const requirePath = './' + relative(process.cwd(), stationPath);
      const requiredStation = require(requirePath);

      parsedStations.push(...parseStationByType(requiredStation));
    } catch (err) {
      logError('The station is not valid:', stationPath, err);
    }
  } else {
    logError('The station is not available:', stationPath);
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
  stationsDir = '.takeoff', // <-- should this be an array?
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
        pathFromHome: path.replace(process.env.HOME + '/', ''),
        isCurrentWorkingDirectory: process.cwd() === path,
        stations: foundStations
      });
    }
  }

  return stationsByPath;
};

export default FindLocalStations;
