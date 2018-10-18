import mock from "mock-fs";
import findStations, { findStationsByPath, getRecursivePaths } from "./";
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

  describe("find local stations", () => {
    it("returns all found and valid stations up the folder system", async () => {
      mock({
        "/root": {
          ".takeoff": {
            "station-1": minimalStationContent
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

      // change the cwd to the deepest mocked folder
      process.chdir("/root/Users/my-user/projects/my-customer/the-project");

      expect(await findStations({ root: process.cwd() }), "to equal", [
        [{ name: "station-1", path: "/root/.takeoff/station-1" }],
        [{ name: "station-2", path: "/root/Users/.takeoff/station-2" }],
        [
          {
            name: "station-3",
            path: "/root/Users/my-user/.takeoff/station-3"
          }
        ],
        [
          {
            name: "station-4",
            path: "/root/Users/my-user/projects/.takeoff/station-4"
          }
        ],
        [
          {
            name: "station-5",
            path: "/root/Users/my-user/projects/my-customer/.takeoff/station-5"
          }
        ],
        [
          {
            name: "station-6",
            path:
              "/root/Users/my-user/projects/my-customer/the-project/.takeoff/station-6"
          }
        ]
      ]);
    });
  });
});
