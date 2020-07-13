import mock from "mock-fs";
import mockRequire from "mock-require";

import findStations, { isPathDir } from ".";
import { resolve } from "path";
import { simpleStation, wrongStation } from "../__mock__/station";

const minimalStationContentTemplate = `module.exports = { get: 'name', exec: function() {} }`;

describe("FindStations", () => {
  afterEach(mock.restore);

  describe("Basics", () => {
    it("returns array", async () => {
      mock({ ".takeoff": {} });
      expect(Array.isArray(await findStations({ path: process.cwd() }))).to
        .true;
    });

    it("throws error if .takeoff folder doesnt exist", async () => {
      mock({});

      try {
        await findStations({ path: process.cwd() });
      } catch (error) {
        expect(error.message).to.equal("takeoff station folder not found.");
      }
    });

    it("returns found station-indexes from .takeoff folder", async () => {
      mock({
        "some-dir": {},
        ".takeoff": {
          "my-station.js": minimalStationContentTemplate,
          "create-station": {
            "index.js": minimalStationContentTemplate,
          },
        },
      });

      const foundStations = await findStations({ path: process.cwd() });

      console.log(foundStations);

      expect(foundStations).to.have.lengthOf(2);
    });
  });
  describe("Helper / isValidStation", () => {
    it("detects if a station is executable", async () => {
      mock({
        ".takeoff": {
          "my-station.js": minimalStationContentTemplate,
        },
      });

      mockRequire(`${process.cwd()}/.takeoff/my-station.js`, simpleStation);

      const foundStations = await findStations({ path: process.cwd() });

      expect(foundStations[0].isValid).to.be.true;
    });

    it("detects if a station not valid", async () => {
      mock({
        ".takeoff": {
          "my-station.js": minimalStationContentTemplate,
        },
      });

      mockRequire(`${process.cwd()}/.takeoff/my-station.js`, wrongStation);

      const foundStations = await findStations({ path: process.cwd() });

      expect(foundStations[0].isValid).to.be.false;
    });
  });

  describe("Helper / isPathDir", () => {
    it("returns false if the path directs to a file", () => {
      mock({
        "some-file.txt": "hello world",
      });

      expect(isPathDir(resolve(process.cwd(), "some-file.txt"))).to.be.false;
    });

    it("returns true if the path directs to a folder", () => {
      mock({
        files: {
          "some-file.txt": "hello world",
        },
      });

      expect(isPathDir(resolve(process.cwd(), "files"))).to.be.true;
    });
  });
});
