module.exports = {
  requiredProps: ['content'],
  run: props => ({
    files: [{
      filename: '.takeoff/my-file.txt',
      template: `My Content: ${props.content}`
    }]
  })
};
