import fs, { existsSync, lstatSync } from "fs";
import { promisify } from "util";
import { resolve } from "path";

interface FindStation {
  path: string;
  stationsFolder?: string;
}

interface Station {
  indexName: string;
  isFolder: boolean;
  isValid: boolean;
  absolutePath: string;
}

const readdir = promisify(fs.readdir);

/**
 *
 * @param path Pass a path
 */
export const isPathDir = (path: string): boolean =>
  lstatSync(path).isDirectory();

/**
 *
 * @param path Pass a path
 */
export const isValidStation = (path: string): boolean => {
  try {
    // eslint-disable-next-line
    const loadedStation = require(path);
    return Boolean(loadedStation.get && loadedStation.exec);
  } catch (error) {
    return false;
  }
};

export default async ({
  path,
  stationsFolder = ".takeoff",
}: FindStation): Promise<Station[]> => {
  const foundStations: Station[] = [];
  const takeoffFolder = resolve(path, stationsFolder);

  if (existsSync(takeoffFolder) && isPathDir(takeoffFolder)) {
    const readTakeoffFolder = await readdir(takeoffFolder);

    readTakeoffFolder.forEach((station: string) => {
      const stationPath: string = resolve(takeoffFolder, station);

      foundStations.push({
        indexName: station,
        isFolder: isPathDir(stationPath),
        isValid: isValidStation(stationPath),
        absolutePath: stationPath,
      });
    });
  } else {
    throw new Error("takeoff station folder not found.");
  }

  return foundStations;
};
