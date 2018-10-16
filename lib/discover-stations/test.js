import mock from "mock-fs";
import { resolve } from "path";

import { findStationsInFolder, resolveStation } from "./";

describe.skip("Library - Discover Stations", () => {
  afterEach(mock.restore);

  describe("findStationsInFolder", () => {
    it("returns an empty array since there are no stations", async () => {
      mock({}); // create an empty folder in process.cwd
      expect(await findStationsInFolder()).toEqual([]);
    });

    it("returns a list of stations we've settled up in a '.takeoff' folder", async () => {
      mock({
        ".takeoff": {
          component: {
            "index.js": ""
          },
          "util.js": ""
        }
      });
      expect(await findStationsInFolder()).toEqual(["component", "util"]);
    });
  });

  describe("resolveStation", () => {
    it("returns false if the station doesnt exist", async () => {
      mock(); // clear cwd
      expect(await resolveStation(resolve(process.cwd(), "bar"))).toBeFalsy();
    });

    it('returns the stations which are providing the required data "get" and "exec"', async () => {
      mock({
        "util.js": "module.exports = { get: 'name', exec: function() {} }"
      });

      const station = await resolveStation(resolve(process.cwd(), "util.js"));

      expect(station.title).toEqual("util");
      expect(typeof station.exec).toEqual("function");
    });

    it("returns the stations with prefered name defined in the export", async () => {
      const manualDefinedStationName = "Util Station";
      mock({
        "foo.js":
          "module.exports = { title: '" +
          manualDefinedStationName +
          "', get: 'name', exec: function() {} }"
      });

      const station = await resolveStation(resolve(process.cwd(), "foo.js"));

      expect(station.title).toEqual(manualDefinedStationName);
    });

    it("returns the correct station name of a folder within an index.js", async () => {
      mock({
        component: {
          "index.js": "module.exports = { get: 'name', exec: function() {} }"
        }
      });

      const station = await resolveStation(resolve(process.cwd(), "component"));

      expect(station.title).toEqual("component");
    });
  });
});
