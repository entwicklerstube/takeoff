import mock from "mock-fs";
import mockRequire from "mock-require";

import FindLocalStations, {
  findStationsByPath,
  getRecursivePaths,
  parseStationsByPath
} from "./";

import { resolve } from "path";

const minimalStationContent = `module.exports = { get: 'name', exec: function() {} }`;

describe("Library - Find local stations", () => {
  afterEach(mock.restore);
  const dotTakeoffDir = resolve(process.cwd(), ".takeoff");

  describe("findStationsByPath", () => {
    it("returns an array", async () => {
      expect(await findStationsByPath(dotTakeoffDir), "to be an array");
    });

    it("returns one station entry detected in cwd .takeoff folder", async () => {
      mock({
        "some-dir": {},
        "some-file": "",
        ".takeoff": {
          "my-station.js": minimalStationContent
        }
      });

      expect(await findStationsByPath(dotTakeoffDir), "to have length", 1);
      expect(await findStationsByPath(dotTakeoffDir), "to equal", [
        {
          name: "my-station",
          path: resolve(dotTakeoffDir, "my-station.js")
        }
      ]);
    });

    it("returns the station if its an index file within a folder", async () => {
      mock({
        ".takeoff": {
          "some-station": {
            "index.js": minimalStationContent
          }
        }
      });

      expect(await findStationsByPath(dotTakeoffDir), "to have length", 1);
      expect(await findStationsByPath(dotTakeoffDir), "to equal", [
        {
          name: "some-station",
          path: resolve(dotTakeoffDir, "some-station", "index.js")
        }
      ]);
    });
  });

  describe("getRecursivePaths", () => {
    it("returns an array", () => {
      expect(getRecursivePaths(), "to be an empty array");
    });

    it("returns only one station if no parent is available", () => {
      expect(getRecursivePaths("/"), "to equal", ["/"]);
    });

    it("returns parent paths if available", () => {
      const basePath = "/Users/my-user/Code/my-customer/some-project";
      expect(getRecursivePaths(basePath), "to equal", [
        "/",
        "/Users",
        "/Users/my-user",
        "/Users/my-user/Code",
        "/Users/my-user/Code/my-customer",
        basePath
      ]);
    });
  });

  describe("parseStationsByPath", () => {
    it("returns an array", () => {
      expect(parseStationsByPath(), "to be an empty array");
    });

    it("returns an empty array even with an file/folder which doesnt exist", () => {
      expect(parseStationsByPath("path/into/nowhere"), "to be an empty array");
    });

    it("returns a found and valid station with the required 'get' and 'exec' props", () => {
      mockRequire("./.takeoff/example-station.js", {
        get: "name",
        exec: () => {}
      });

      // mock fs for finding the bin
      mock({
        ".takeoff": {
          "example-station.js": minimalStationContent
        }
      });

      const parsedStations = parseStationsByPath(
        resolve(process.cwd(), ".takeoff/example-station.js")
      );

      expect(parsedStations, "to be an array");
    });

    it("returns no stations when the file is existent but not valid", () => {
      mockRequire("./.takeoff/some-station.js", {
        warning: "this station has no get or exec props"
      });

      // mock fs for finding the bin
      mock({
        ".takeoff": {
          "some-station.js": minimalStationContent
        }
      });

      const parsedStations = parseStationsByPath(
        resolve(process.cwd(), ".takeoff/some-station.js")
      );

      expect(parsedStations, "to be an empty array");
    });
  });

  describe("FindLocalStations", () => {
    let foundStations;

    beforeEach(async () => {
      mock({
        "/root": {
          ".takeoff": {
            "station-1": minimalStationContent,
            "station-1.5": {
              "index.js": minimalStationContent
            }
          },
          Users: {
            ".takeoff": {
              "station-2": minimalStationContent
            },
            "my-user": {
              ".takeoff": {
                "station-3": minimalStationContent
              },
              projects: {
                ".takeoff": {
                  "station-4": minimalStationContent
                },
                "my-customer": {
                  ".takeoff": {
                    "station-5": minimalStationContent
                  },
                  "the-project": {
                    ".takeoff": {
                      "station-6": minimalStationContent
                    }
                  }
                }
              }
            }
          }
        }
      });

      process.chdir("/root/Users/my-user/projects/my-customer/the-project");

      foundStations = await FindLocalStations({ root: process.cwd() });
    });

    it("returns an array", async () => {
      expect(foundStations, "to be an array");
    });

    it("returns array with all mocked stations up the hierarchy", () => {
      expect(foundStations, "to have length", 6);
    });

    it("returns items which are objects", () => {
      expect(foundStations[0], "to be an object");
    });

    it("returns station item with required props", () => {
      expect(foundStations[0], "to have keys", [
        "stationsDir",
        "pathToStation",
        "absolutePath",
        "pathFromHome",
        "isCurrentWorkingDirectory",
        "stations"
      ]);
    });

    it("returns found stations in station prop", () => {
      expect(foundStations[0].stations, "to equal", [
        {
          name: "station-1",
          path: "/root/.takeoff/station-1"
        },
        {
          name: "station-1.5",
          path: "/root/.takeoff/station-1.5/index.js"
        }
      ]);
    });
  });
});
