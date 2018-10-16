const indexTemplate = require("./index-template");
const testTemplate = require("./test-template");

module.exports = {
  requiredProps: ["name"],
  run: props => ({
    files: [
      {
        filename: `utils/${props.name}/index.js`,
        template: indexTemplate(props)
      },
      {
        filename: `utils/${props.name}/test.js`,
        template: testTemplate(props)
      }
    ]
  })
};
