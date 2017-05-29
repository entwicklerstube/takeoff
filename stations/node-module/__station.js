const license = require('../_shared/license/mit.js');
const gitignore = require('./gitignore.js');
const readme = require('./readme.md.js');
const packageJson = require('./package.json.js');

module.exports = {
  requiredProps: ['name', 'email'],
  run: props => ({
    files: [{
      filename: 'package.json',
      template: packageJson(props)
    }, {
      filename: '.gitignore',
      template: gitignore(props)
    }, {
      filename: 'README.md',
      template: readme(props)
    }, {
      filename: 'LICENSE',
      template: license(props)
    }]
  })
};
