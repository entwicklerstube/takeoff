module.exports = {
  requiredProps: ['content'],
  run: props => ({
    files: [{
      filename: 'my-file.txt',
      template: `My Content: ${props.content}`
    }]
  })
};
