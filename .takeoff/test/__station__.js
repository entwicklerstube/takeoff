import testTemplate from './test.js'

export default {
  requiredProps: ['name'],
  config: props => {
    path: `lib/test/__${props.name}__.js`,
    template: testTemplate
  }
}
