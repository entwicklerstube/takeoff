const statelessComponent = require('./stateless-component');

module.exports = {
  requiredProps: ['componentName', 'username'],
  run: props => ({
    files: [{
      filename: `components/${props.componentName}.jsx`,
      template: statelessComponent(props)
    }]
  })
};
