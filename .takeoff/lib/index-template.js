const pascalCase = require("change-case").pascalCase;

module.exports = props => `const ${pascalCase(props.name)} = () => {
  return true;
};

export default ${pascalCase(props.name)};
`;
