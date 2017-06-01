const mit = require('./mit');
const apacheLicense2 = require('./apache-license-2.0');
const gnuGeneralPublicLicensev3 = require('./gnu-general-public-license-v3.0');

module.exports = props => {
  switch (props.license) {
    case 'mit':
      return mit(props);

    case 'apache-license-2.0':
      return apacheLicense2(props);

    case 'gnu-general-public-license-v3.0':
      return gnuGeneralPublicLicensev3(props);

    default:
      return 'No license';
  }
};
