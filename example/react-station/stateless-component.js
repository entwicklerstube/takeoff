const t = require('outdent');

module.exports = ({name}) => t`
import React from 'react';
import PropTypes from 'prop-types';

const MyStatelessComponent ({ name }) => (
  <div className='container'>
    <span>hello: ${name}</span>
  </div>
);

MyStatelessComponent.propTypes = {
  name: PropTypes.string
}

export default MyStatelessComponent;
`;
