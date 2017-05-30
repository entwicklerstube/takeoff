const t = require('outdent');

module.exports = props => t`
const myModule = () => {
  console.log('hello', ${props.packagename})
};

module.exports = myModule;
`;
