const t = require('outdent');
const {camelize} = require('takeoff-utils');

const renderScriptsObject = ({testRunner, babel, linter}) => {
  const scripts = [{name: 'start', command: 'node index.js'}];

  if (testRunner === 'mocha') {
    scripts.push({name: 'test', command: 'mocha test.js'});
  }

  if (testRunner === 'ava') {
    scripts.push({name: 'test', command: 'ava test.js'});
  }

  if (babel === true) {
    scripts.push({name: 'build', command: 'babel index.js -d build --presets es2015'});
  }

  if (linter === 'standard') {
    scripts.push({name: 'lint', command: 'standard --fix'});
  }

  if (linter === 'xo') {
    scripts.push({name: 'lint', command: 'xo --fix'});
  }

  return scripts.map(script => `"${script.name}": "${script.command}"`).join(',\n    ');
};

module.exports = props => t`
{
  "name": "${props.name}",
  "version": "${props.version}",
  "main": "index.js",
  "repository": "${props.repositoryUrl.replace('<package-name>', props.name)}",
  "author": "${props.author}",
  "license": "${camelize(props.license, ' ')}",
  "scripts": {
    ${renderScriptsObject(props)}
  }
}`;
