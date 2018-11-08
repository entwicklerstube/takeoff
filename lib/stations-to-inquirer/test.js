import StationsToInquirer, { getToQuestions } from "./";
import inquirer from "inquirer";
import chalk from "chalk";

describe("Library - Stations to Inquirer", () => {
  describe("getToQuestions", () => {
    it("returns an array", () => {
      expect(getToQuestions(), "to be an array");
    });

    it("returns an inquirer-question with the correct minimal props", () => {
      const inquirerQuestion = getToQuestions("firstname");

      expect(inquirerQuestion[0].type, "to equal", "input");
      expect(inquirerQuestion[0].name, "to equal", "firstname");
    });

    it("returns an question got from an array", () => {
      const inquirerQuestion = getToQuestions(["firstname", "lastname"]);

      expect(inquirerQuestion[0].name, "to equal", "firstname");
      expect(inquirerQuestion[1].name, "to equal", "lastname");
    });

    it("returns an question got from an object", () => {
      const inquirerQuestion = getToQuestions({
        type: "password",
        name: "age"
      });

      expect(inquirerQuestion[0].type, "to equal", "password");
      expect(inquirerQuestion[0].name, "to equal", "age");
    });

    it("returns an question got from objects in an array", () => {
      const inquirerQuestion = getToQuestions([
        {
          name: "firstname"
        },
        {
          type: "password",
          name: "age"
        }
      ]);

      expect(inquirerQuestion[0], "to equal", {
        type: "input",
        name: "firstname"
      });

      expect(inquirerQuestion[1], "to equal", {
        type: "password",
        name: "age"
      });
    });

    it("returns an question got from a function", () => {
      const inquirerQuestion = getToQuestions(() => ["country"]);

      expect(inquirerQuestion[0], "to be a function");
      expect(inquirerQuestion[0](), "to equal", {
        type: "input",
        name: "country"
      });
    });

    it("returns an question got from mixed kinds of props", () => {
      const inquirerQuestion = getToQuestions([
        "topic",
        [{ name: "firstname" }, { name: "lastname" }],
        { type: "password", name: "age" },
        () => ["country"]
      ]);

      expect(inquirerQuestion[0].name, "to equal", "topic");
      expect(inquirerQuestion[1].name, "to equal", "firstname");
      expect(inquirerQuestion[2].name, "to equal", "lastname");
      expect(inquirerQuestion[3].name, "to equal", "age");

      // passed functions have to be executed, but they return a valid question-object
      expect(inquirerQuestion[4]().name, "to equal", "country");
    });
  });

  describe("StationsToInquirer", () => {
    it("returns an object", () => {
      expect(StationsToInquirer(), "not to be an array");
      expect(StationsToInquirer(), "to be an object");
    });

    it("returns all required inquirer keys for a prompt", () => {
      expect(StationsToInquirer(), "to have keys", [
        "type",
        "name",
        "message",
        "choices"
      ]);
    });

    it("returns the inquirer-question with type list", () => {
      expect(StationsToInquirer().type, "to equal", "list");
    });

    it("returns the station name found in the station-dir", () => {
      const stationsList = StationsToInquirer([
        {
          stationsDir: ".takeoff",
          pathToStation: "/Users/user/Code/project-x",
          absolutePath: "/Users/user/Code/project-x/.takeoff",
          pathFromHome: "Code/takeoff",
          isCurrentWorkingDirectory: true,
          stations: [
            {
              name: "Get my firstname"
            }
          ]
        }
      ]);

      expect(stationsList.choices[0].name, "to equal", "Get my firstname");
    });

    describe("handles stations from different directories", () => {
      const stationsList = StationsToInquirer([
        {
          stationsDir: ".takeoff",
          pathToStation: "/Users/user/Code",
          absolutePath: "/Users/user/Code/.takeoff",
          pathFromHome: "Code",
          isCurrentWorkingDirectory: false,
          stations: [
            {
              name: "Return my IP"
            }
          ]
        },
        {
          stationsDir: ".takeoff",
          pathToStation: "/Users/user/Code/project-x",
          absolutePath: "/Users/user/Code/project-x/.takeoff",
          pathFromHome: "Code/takeoff",
          isCurrentWorkingDirectory: true,
          stations: [
            {
              name: "Get my firstname"
            }
          ]
        }
      ]);

      it("returns the station with a seperator if stations from two different stations are available", () => {
        expect(
          stationsList.choices[0],
          "to equal",
          new inquirer.Separator("~/Code/takeoff")
        );
        expect(stationsList.choices[1].name, "to equal", "Get my firstname");
        expect(
          stationsList.choices[2],
          "to equal",
          new inquirer.Separator("~/Code")
        );
        expect(stationsList.choices[3].name, "to equal", "Return my IP");
      });

      it("returns the found station with description", () => {
        const stationsList = StationsToInquirer([
          {
            stations: [
              {
                name: "Get my firstname",
                description: "Station which logs my firstname"
              }
            ]
          }
        ]);

        expect(
          stationsList.choices[0].name,
          "to equal",
          `Get my firstname · ${chalk.grey("Station which logs my firstname")}`
        );
      });
    });
  });
});
