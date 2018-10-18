import fs, { lstatSync, existsSync } from "fs";
import { promisify } from "util";
import { resolve, parse } from "path";

const readdir = promisify(fs.readdir);

/**
 * Pass any path and it searches for stations as folder or file
 * @param {*} path
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
        foundStations.push({
          name: parse(itemName).name,
          path: stationPath
        });
      } else if (station.isDirectory()) {
        const stationWithIndexJSPath = resolve(stationPath, "index.js");

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

  let paths = rootPath.split("/");

  // Looks a bit confusing, but basicly it goes through the splitted path, then it
  // sums up all paths before the current one and adds them before returning in the reducer
  return paths.reduce(
    (beforePaths, _, currentPathIndex) => [
      ...beforePaths,
      "/" +
        paths
          .map((path, pathIndex) => (pathIndex <= currentPathIndex ? path : ""))
          .filter(path => path !== "")
          .join("/")
    ],
    []
  );
};

/**
 * Returns all stations up the tree
 * @param {string} stationsDir
 * @param {string} root
 * @returns {array} List asd
 */
export default async ({
  stationsDir = ".takeoff",
  root = process.cwd()
} = {}) => {
  const paths = getRecursivePaths(root);
  const stationsByPath = [];

  for (const path of paths) {
    const foundStations = await findStationsByPath(resolve(path, stationsDir));
    stationsByPath.push(foundStations);
  }

  return stationsByPath.filter(stations => stations.length > 0);
};
