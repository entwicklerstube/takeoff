const { pascalCase } = require('../../../utils.js');

module.exports = props => `import ${pascalCase(props.name)} from "./";

describe("Util - ${pascalCase(props.name)}", () => {
  it("returns true", () => {
    expect(true, "to be true");
  });
});
`;
