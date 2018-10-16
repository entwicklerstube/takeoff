const pascalCase = require("change-case").pascalCase;

module.exports = props => `import ${pascalCase(props.name)} from "./";

describe("Util - ${pascalCase(props.name)}", () => {
    it("returns an empty array since there are no stations", () => {
      expect(true).toBeTruthy();
    });
});
`;
