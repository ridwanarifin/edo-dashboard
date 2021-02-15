import Vue from 'vue'
import _ from 'lodash'

Vue.filter('truncate', (text, length, clamp) => {
  clamp = clamp || '...'
  return _.size(text) > length
    ? text.slice(0, length) + clamp
    : text
})
