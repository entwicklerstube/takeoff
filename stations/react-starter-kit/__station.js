const {exec} = require('child_process');
const path = require('path');
// $ const execa = require('execa');
// const license = require('../_shared/license');
// const readme = require('../_shared/readme.md.js');
// const gitignore = require('../_shared/gitignore.js');
// const travisYml = require('./travis.yml.js');
// const packageJson = require('./package.json.js');
// const testJsWithMocha = require('./test-mocha.js');
// const testJsWithAva = require('./test-ava.js');
// const indexJs = require('./index.js');

const requiredNodePackages = [];

module.exports = {
  postTakeoff: (props, {emit, succeed}) => {
    emit('Install packages');
    let execOpts = {};

    if (props.createProjectFolder) {
      execOpts = {
        cwd: path.join(process.cwd(), props.name)
      };
    }
    const ls = exec(`git clone -o react-starter-kit -b master --single-branch https://github.com/kriasoft/react-starter-kit.git ${props.name} && cd ${props.name} && yarn install`, execOpts);

    ls.stdout.on('data', data => {
      emit(data.toString().trim().split('\n').pop());
    });

    ls.on('exit', () => {
      succeed();
    });
  },
  requiredProps: [{
    type: 'input',
    name: 'name',
    message: 'name',
    default: process.cwd().split('/').pop()
  }],
  run: () => {
    return {
      files: []
    };
  }
};
