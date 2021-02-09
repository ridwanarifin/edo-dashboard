export default ({ $app }, inject) => {
  inject('_', require('lodash'))
  inject('icon', require('@mdi/js'))
}
