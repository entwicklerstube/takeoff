import mock from "mock-fs";
import mockRequire from "mock-require";

import FindLocalStations, {
  findStationsByPath,
  getRecursivePaths,
  parseStationsByPath,
  parseStationByType
} from "./";

import { resolve } from "path";

const minimalStationContentTemplate = `module.exports = { get: 'name', exec: function() {} }`;
const minimalStationContentObject = { get: "name", exec: () => {} };

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
          "my-station.js": minimalStationContentTemplate
        }
      });

      mockRequire("./.takeoff/my-station.js", minimalStationContentObject);

      const foundStationsbyPath = await findStationsByPath(dotTakeoffDir);

      expect(foundStationsbyPath, "to have length", 1);
      expect(foundStationsbyPath[0].name, "to equal", "my-station");
      expect(
        foundStationsbyPath[0].path,
        "to equal",
        resolve(dotTakeoffDir, "my-station.js")
      );
    });

    it("returns the station if its an index file within a folder", async () => {
      mock({
        ".takeoff": {
          "some-station": {
            "index.js": minimalStationContentTemplate
          }
        }
      });

      mockRequire(
        "./.takeoff/some-station/index.js",
        minimalStationContentObject
      );

      const foundStationsbyPath = await findStationsByPath(dotTakeoffDir);

      expect(foundStationsbyPath, "to have length", 1);
      expect(foundStationsbyPath[0].name, "to equal", "some-station");
      expect(
        foundStationsbyPath[0].path,
        "to equal",
        resolve(dotTakeoffDir, "some-station", "index.js")
      );
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
      mockRequire("./.takeoff/example-station.js", minimalStationContentObject);

      // mock fs for finding the bin
      mock({
        ".takeoff": {
          "example-station.js": minimalStationContentTemplate
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
          "some-station.js": minimalStationContentTemplate
        }
      });

      const parsedStations = parseStationsByPath(
        resolve(process.cwd(), ".takeoff/some-station.js")
      );

      expect(parsedStations, "to be an empty array");
    });

    it("returns a stations when the file returns a valid station", () => {
      mockRequire("./.takeoff/some-station.js", {
        get: "some-prop-we-need",
        exec: () => {}
      });

      // mock fs for finding the bin
      mock({
        ".takeoff": {
          "some-station.js": minimalStationContentTemplate
        }
      });

      const parsedStations = parseStationsByPath(
        resolve(process.cwd(), ".takeoff/some-station.js")
      );

      expect(parsedStations, "to have length", 1);
      expect(parsedStations[0].get, "to equal", "some-prop-we-need");
      expect(parsedStations[0].exec, "to be a function");
    });

    it("returns multiple stations when the file returns multiple stations", () => {
      mockRequire("./.takeoff/some-stations.js", [
        {
          get: "prop-1",
          exec: () => {}
        },
        {
          get: "prop-2",
          exec: () => {}
        }
      ]);

      // mock fs for finding the bin
      mock({
        ".takeoff": {
          "some-stations.js":
            "module.exports = [{ get: 'prop-1', exec: function() {} }, { get: 'prop-2', exec: function() {} }]"
        }
      });

      const parsedStations = parseStationsByPath(
        resolve(process.cwd(), ".takeoff/some-stations.js")
      );

      expect(parsedStations, "to have length", 2);
      expect(parsedStations[0].get, "to equal", "prop-1");
      expect(parsedStations[0].exec, "to be a function");
      expect(parsedStations[1].get, "to equal", "prop-2");
      expect(parsedStations[1].exec, "to be a function");
    });
  });

  describe("parseStationByType", () => {
    it("returns an array", () => {
      expect(parseStationByType(), "to be an object");
    });

    it("returns nothing if no station is found", () => {
      expect(
        parseStationByType({ thisIs: "no-station" }),
        "to be an empty array"
      );
    });

    it("returns the found station-object with the required props to be detected as station", () => {
      const parsedStation = parseStationByType(minimalStationContentObject);

      expect(parsedStation, "to be an array");
      expect(parsedStation, "to have length", 1);
      expect(parsedStation[0], "to have keys", ["get", "exec"]);
    });

    it("returns multiple stations if the station-object contains multiple", () => {
      const parsedStations = parseStationByType([
        { get: "firstname", exec: n => n },
        { get: "lastname", exec: n => n }
      ]);

      expect(parsedStations, "to have length", 2);
      expect(parsedStations[0].get, "to equal", "firstname");
      expect(parsedStations[1].get, "to equal", "lastname");
    });
  });

  describe("FindLocalStations", () => {
    let foundStations;

    beforeEach(async () => {
      // mock paths for "fs"
      mock({
        "/root": {
          ".takeoff": {
            "station-1": minimalStationContentTemplate,
            "station-1.5": {
              "index.js": minimalStationContentTemplate
            }
          },
          Users: {
            ".takeoff": {
              "station-2": minimalStationContentTemplate
            },
            "my-user": {
              ".takeoff": {
                "station-3": minimalStationContentTemplate
              },
              projects: {
                ".takeoff": {
                  "station-4": minimalStationContentTemplate
                },
                "my-customer": {
                  ".takeoff": {
                    "station-5": minimalStationContentTemplate
                  },
                  "the-project": {
                    ".takeoff": {
                      "station-6": minimalStationContentTemplate
                    }
                  }
                }
              }
            }
          }
        }
      });

      // mock modules for "require"
      mockRequire(
        "./../../../../../.takeoff/station-1",
        minimalStationContentObject
      );
      mockRequire(
        "./../../../../../.takeoff/station-1.5/index.js",
        minimalStationContentObject
      );
      mockRequire(
        "./../../../../.takeoff/station-2",
        minimalStationContentObject
      );
      mockRequire("./../../../.takeoff/station-3", minimalStationContentObject);
      mockRequire("./../../.takeoff/station-4", minimalStationContentObject);
      mockRequire("./../.takeoff/station-5", minimalStationContentObject);
      mockRequire("./.takeoff/station-6", minimalStationContentObject);

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
      expect(foundStations[0].stations[0].name, "to equal", "station-1");
      expect(
        foundStations[0].stations[0].path,
        "to equal",
        "/root/.takeoff/station-1"
      );
      expect(foundStations[0].stations[0].get, "to equal", "name");
      expect(foundStations[0].stations[0].exec, "to be a function");

      expect(foundStations[0].stations[1].name, "to equal", "station-1.5");
      expect(
        foundStations[0].stations[1].path,
        "to equal",
        "/root/.takeoff/station-1.5/index.js"
      );
      expect(foundStations[0].stations[1].get, "to equal", "name");
      expect(foundStations[0].stations[1].exec, "to be a function");
    });
  });
});
