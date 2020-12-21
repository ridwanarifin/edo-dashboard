import Vue from 'vue'
import _ from 'lodash'
import {
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
import {
  required,
  email,
  numeric,
  confirmed
} from 'vee-validate/dist/rules'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} is required.'
})

extend('email', {
  ...email,
  message: '{_field_} is not valid.'
})

extend('numeric', {
  ...numeric,
  message: '{_field_} must be valid numeric.'
})

extend('confirmed', confirmed)

const components = [{
  name: 'ValidationObserver',
  component: ValidationObserver
}, {
  name: 'ValidationProvider',
  component: ValidationProvider
}]

_.each(components, ({ name, component }) => {
  Vue.component(name, component)
})
