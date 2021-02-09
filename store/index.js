import qs from 'querystring'
import _ from 'lodash'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  pending: false,
  users: {
    data: [],
    total: 0
  }
})

export const getters = {
  pending: state => state.pending,
  users: state => state.users
}

export const mutations = {
  setAuth (state, data) {
    const decode = jwtDecode(data.token)
    this.$auth.setUser({ ...decode, scope: [decode.role], currentPassword: data.password })
  },
  SET_PENDING (state, payload) {
    state.pending = payload
  },

  SET_USERS (state, payload) {
    state.users.data = payload.data
    state.users.total = payload['total users']
  }
}

export const actions = {
  async UserLogin ({ commit, state }, data) {
    commit('SET_PENDING', true)
    this.$toast.global.app_loading()
    await this.$auth.loginWith('local', { data: qs.stringify(data) })
      .then((response) => {
        this.$toast.clear()
        commit('setAuth', { token: response.data.id_token, password: data.password })
      })
      .catch((error) => {
        this.$toast.clear()
        if (error.response && error.response.data) {
          const msg = error.response.data && ', ' + error.response.data.message
          this.$toast.global.app_error('Login failed' + msg)
        } else {
          console.log(JSON.stringify(error))
          this.$toast.global.app_error('Login failed.')
        }
      })
      .finally(() => {
        commit('SET_PENDING', false)
      })
  },

  /**
   * create users
   */
  async createUser ({ commit, rootState }) {
    const a = _.pickBy(rootState.form.user, _.identity)
    const dataset = _.pickBy(a, (v, k) => k !== 'user_id')
    const token = this.$auth.getToken('local')
    // console.log(dataset)
    // console.log(token)

    commit('SET_PENDING', true)
    this.$toast.global.app_loading()
    await this.$axios({
      method: 'post',
      url: 'https://backend.smufreight.com:8092/api/e_do/users',
      data: dataset,
      headers: {
        Authorization: token
      }
    })
      .then((ress) => {
        this.$toast.clear()
        this.$swal({
          icon: 'success',
          title: 'Success Created',
          text: `User ${dataset.email} successfully created.`,
          timer: 3000
        })
      })
      .catch((err) => {
        this.$toast.clear()
        this.$swal({
          icon: 'error',
          title: 'Oops!',
          html: `Something when wrong.<br>User ${dataset.email} failed to create.`,
          timer: 3500
        })
        throw new Error(err)
      })
      .finally(() => {
        commit('SET_PENDING', false)
      })
  },

  /**
   * get all users
   */
  async getAllUser ({ commit }) {
    commit('SET_PENDING', true)
    this.$toast.global.app_loading()
    await this.$axios.$get('/api/e_do/users')
      .then((response) => {
        this.$toast.clear()
        commit('SET_USERS', response)
      })
      .catch((err) => {
        this.$toast.clear()
        this.$toast.global.app_error('Failed to load all user')
        throw new Error(err)
      })
      .finally(() => {
        commit('SET_PENDING', false)
      })
  },

  /**
   * update detail user
   */
  async updateUser ({ commit, rootState }) {
    const a = _.pickBy(rootState.form.user, _.identity)
    const uid = a && a.user_id
    const dataset = _.pickBy(a, (v, k) => k !== 'user_id')

    commit('SET_PENDING', true)
    this.$toast.global.app_loading()

    await this.$axios.$put(`/api/e_do/users/${uid}`, dataset)
      .then((ress) => {
        this.$toast.clear()
        this.$swal({
          icon: 'success',
          title: 'Success Updated',
          text: `User ${dataset.email} successfully updated.`,
          timer: 3000
        })
      })
      .catch((err) => {
        this.$toast.clear()
        this.$swal({
          icon: 'error',
          title: 'Update Failed',
          text: `User ${dataset.email} failed to update.`,
          timer: 3000
        })
        throw new Error(err)
      })
      .finally(() => {
        commit('SET_PENDING', false)
      })
  },

  /**
   * delete detail user
   */
  async deleteUser ({ commit, rootState }) {
    const a = _.pickBy(rootState.form.user, _.identity)
    const uid = a && a.user_id
    const dataset = _.pickBy(a, (v, k) => k !== 'user_id')

    commit('SET_PENDING', true)
    this.$toast.global.app_loading()

    await this.$axios.$delete(`/api/e_do/users/${uid}`)
      .then((ress) => {
        this.$toast.clear()
        this.$swal({
          icon: 'success',
          title: 'Success Deleted',
          text: `User ${dataset.email} successfully deleted.`,
          timer: 3000
        })
      })
      .catch((err) => {
        this.$toast.clear()
        this.$swal({
          icon: 'error',
          title: 'Failed Delete',
          text: `User ${dataset.email} failed to delete.`,
          timer: 3000
        })
        throw new Error(err)
      })
      .finally(() => {
        commit('SET_PENDING', false)
      })
  }
}
