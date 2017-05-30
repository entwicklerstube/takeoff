const {spawn} = require('child_process');
const license = require('../_shared/license/mit.js');
const gitignore = require('./gitignore.js');
const readme = require('./readme.md.js');
const packageJson = require('./package.json.js');
const travisYml = require('./travis.yml.js');
const testJs = require('./test.js');
const indexJs = require('./index.js');

const requiredNodePackages = ['mocha', 'chai', 'nyc'];

module.exports = {
  postTakeoff: (props, {emit, succeed}) => {
    emit('Install packages');

    const ls = spawn('yarn', ['add'].concat(requiredNodePackages));

    ls.stdout.on('data', data => {
      emit(data.toString().trim().split('\n').pop());
    });

    ls.on('exit', succeed);
  },
  requiredProps: [{
    type: 'input',
    name: 'packagename',
    message: 'How do you want to call your node-module?',
    default: process.cwd().split('/').pop()
  }, {
    type: 'input',
    name: 'username',
    message: 'Whats your name?',
    default: process.env.USER
  }, {
    type: 'input',
    name: 'user_email',
    message: 'Whats your email?'
  }, {
    type: 'list',
    name: 'license',
    message: 'What license do you want?',
    choices: [{
      name: 'MIT',
      value: 'mit'
    }, {
      name: 'Apache License 2.0',
      value: 'apache-license-2.0'
    }]
  }],
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
    }, {
      filename: 'index.js',
      template: indexJs(props)
    }, {
      filename: '.travis.yml',
      template: travisYml()
    }, {
      filename: 'test.js',
      template: testJs(props)
    }]
  }
)};
