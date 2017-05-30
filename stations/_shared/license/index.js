const mit = require('./mit');
const apacheLicense2 = require('./mit');

module.exports = props => {
  switch (props.license) {
    case 'mit':
      return mit(props);

    case 'apache-license-2':
      return apacheLicense2();

    default:
      return 'No license';
  }
};
