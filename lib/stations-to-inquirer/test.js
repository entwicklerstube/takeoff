import StationsToInquirer, { getToQuestions } from "./";

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

  // describe.skip("StationsToInquirer", () => {
  //   it("asd", async () => {
  //     const mockPrompt = require("mock-prompt");

  //     // inject the answer inquirer will give
  //     mockPrompt({ foobar: "hello foo" });

  //     const b = await StationsToInquirer();

  //     // console.log(b);
  //   });
  // });
});
