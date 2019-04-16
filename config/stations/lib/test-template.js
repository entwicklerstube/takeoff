const pascalCase = require("change-case").pascalCase;

module.exports = props => `import ${pascalCase(props.name)} from "./";

describe("Lib - ${pascalCase(props.name)}", () => {
  it("returns true", () => {
    expect(true, "to be true");
  });
});
`;
