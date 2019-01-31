require('@babel/register');
require('@babel/polyfill');

const expect = require('unexpected').clone();
expect.use(require('unexpected-sinon'));

global.expect = expect;
