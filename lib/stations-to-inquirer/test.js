import StationsToInquirer from "./";

describe("Library - Stations to Inquirer", () => {
  describe("StationsToInquirer", () => {
    it.only("asd", async () => {
      const mockPrompt = require("mock-prompt");

      // inject the answer inquirer will give
      mockPrompt({ foobar: "hello foo" });

      const b = await StationsToInquirer();

      console.log(b);
    });
  });
});
