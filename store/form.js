// import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  pending: false,
  search_table: null,
  dialog: {
    edit_user: false,
    delete_user: false
  },
  user: {
    user_id: null,
    email: null,
    name: null,
    role: null,
    password: null
  }
})

export const getters = {
  getField
}

export const mutations = {
  updateField,
  /**
   * @param {Object} payload
   * data user edit
   */
  SET_EDIT_USER (state, payload) {
    state.user = payload
  },
  // reset user edit
  RESET_EDIT_USER (state) {
    state.user = {
      user_id: null,
      email: null,
      name: null,
      role: null,
      password: null
    }
  }
}

export const actions = {}
