const {exec} = require('child_process');
const path = require('path');
const execa = require('execa');
const license = require('../_shared/license');
const readme = require('../_shared/readme.md.js');
const gitignore = require('../_shared/gitignore.js');
const travisYml = require('./travis.yml.js');

const packageJson = require('./package.json.js');
const testJsWithMocha = require('./test-mocha.js');
const testJsWithAva = require('./test-ava.js');
const indexJs = require('./index.js');

const requiredNodePackages = [];

module.exports = {
  preTakeoff: (props, {emit, succeed}) => {
    if (props.createProjectFolder) {
      emit(`Create project folder ${props.name}`);
      execa('mkdir', [props.name]).then(succeed);
    } else {
      succeed();
    }
  },
  postTakeoff: (props, {emit, succeed}) => {
    emit('Install packages');
    let execOpts = {};

    if (props.createProjectFolder) {
      execOpts = {
        cwd: path.join(process.cwd(), props.name)
      };
    }

    const ls = exec(`yarn add ${requiredNodePackages.join(' ')}`, execOpts);

    ls.stdout.on('data', data => {
      emit(data.toString().trim().split('\n').pop());
    });

    ls.on('exit', () => {
      if (props.gitInit) {
        execa('git', ['init']).then(succeed);
      } else {
        succeed();
      }
    });
  },
  requiredProps: [{
    type: 'input',
    name: 'name',
    message: 'name',
    default: process.cwd().split('/').pop()
  }, {
    type: 'input',
    name: 'version',
    message: 'version',
    default: '1.0.0'
  }, {
    type: 'input',
    name: 'repositoryUrl',
    message: 'repository url',
    default: `git@github.com:${process.env.USER}/<package-name>`
  }, {
    type: 'input',
    name: 'author',
    message: 'author',
    default: process.env.USER
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
    }, {
      name: 'GNU General Public License v3.0',
      value: 'gnu-general-public-license-v3.0'
    }],
    default: 'mit'
  }, {
    type: 'list',
    name: 'testRunner',
    message: 'test-runner',
    choices: ['mocha', 'ava', 'skip'],
    default: 'skip'
  }, {
    type: 'list',
    name: 'linter',
    message: 'linter',
    choices: ['xo', 'standard', 'skip'],
    default: 'skip'
  }, {
    type: 'confirm',
    name: 'babel',
    message: 'babel with preset "es2015"',
    default: false
  }, {
    type: 'confirm',
    name: 'travisYml',
    message: 'create a .travis.yml',
    default: false
  }, {
    type: 'confirm',
    name: 'gitInit',
    message: 'git init',
    default: false
  }, {
    type: 'confirm',
    name: 'createProjectFolder',
    message: 'Create project folder?',
    default: true
  }],
  run: props => {
    let filePrefix = '';

    if (props.createProjectFolder) {
      filePrefix = `${props.name}/`;
    }

    const files = [{
      filename: `${filePrefix}package.json`,
      template: packageJson(props)
    }, {
      filename: `${filePrefix}.gitignore`,
      template: gitignore(props)
    }, {
      filename: `${filePrefix}README.md`,
      template: readme(props)
    }, {
      filename: `${filePrefix}LICENSE`,
      template: license(props)
    }, {
      filename: `${filePrefix}index.js`,
      template: indexJs(props)
    }];

    if (props.travisYml) {
      files.push({
        filename: `${filePrefix}.travis.yml`,
        template: travisYml()
      });
    }

    if (props.babel) {
      requiredNodePackages.push('babel-cli', 'babel-preset-es2015');
    }

    if (props.testRunner === 'mocha') {
      requiredNodePackages.push('mocha', 'chai');

      files.push({
        filename: `${filePrefix}test.js`,
        template: testJsWithMocha(props)
      });
    }

    if (props.testRunner === 'ava') {
      requiredNodePackages.push('ava');

      files.push({
        filename: `${filePrefix}test.js`,
        template: testJsWithAva(props)
      });
    }

    if (props.linter === 'standard') {
      requiredNodePackages.push('standard');
    }

    if (props.linter === 'xo') {
      requiredNodePackages.push('xo');
    }

    return {
      files
    };
  }
};
