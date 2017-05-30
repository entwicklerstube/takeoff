const t = require('outdent');

module.exports = props => t`
const expect = require('chai').expect;

describe('test - ${props.packagename}', () => {
    it('does something', () => {
      expect(true).to.be.true;
    });
});
`;
