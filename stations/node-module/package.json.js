const t = require('outdent');

module.exports = props => t`
{
  "name": "${props.packagename}",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "git@github.com:entwicklerstube/${props.project}.git",
  "author": "${props.username}${props.user_email ? ` <${props.user_email}>` : ''}",
  "license": "${props.license}",
  "scripts": {
    "test": "mocha test.js"
  }
}`;
