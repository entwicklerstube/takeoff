const t = require('outdent');

module.exports = () => t`
const test = require('ava');

test(t => {
	t.deepEqual([1, 2], [1, 2]);
});
`;
