const pascalCase = require("change-case").pascalCase;

module.exports = props => `import ${pascalCase(props.name)} from "./";

describe("Lib - ${pascalCase(props.name)}", () => {
    it("returns an empty array since there are no stations", () => {
      expect(true).toBeTruthy();
    });
});
`;
