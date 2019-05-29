const { pascalCase } = require('../../../utils.js');

module.exports = props => `export const ${pascalCase(props.name)} = () => {
  return true;
};

export default ${pascalCase(props.name)};
`;
