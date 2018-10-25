import StationsToInquirer, { getToQuestions } from "./";

describe.only("Library - Stations to Inquirer", () => {
  describe("getToQuestions", () => {
    it("returns an array", () => {
      expect(getToQuestions(), "to be an array");
    });

    it("settles up an inquirer-question with the correct minimal props", () => {
      expect(getToQuestions("firstname"), "to equal", [
        {
          type: "input",
          name: "firstname"
        }
      ]);
    });
  });

  describe("StationsToInquirer", () => {
    it("asd", async () => {
      const mockPrompt = require("mock-prompt");

      // inject the answer inquirer will give
      mockPrompt({ foobar: "hello foo" });

      const b = await StationsToInquirer();

      // console.log(b);
    });
  });
});
