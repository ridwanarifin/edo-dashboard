import qs from 'querystring'
import _ from 'lodash'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  pending: false,
  users: {
    data: [],
    total: 0
  },
  edos: {
    data: [],
    total: 0,
    detail: {
      status: null,
      error: false,
      data: {}
    }
  },
  count_status_edos: {}
})

export const getters = {
  pending: state => state.pending,
  users: state => state.users,
  user_by_name: state => (name = 'default') => (
    _.find(state.users.data, { name })
  ),
  edos: state => state.edos,
  // eslint-disable-next-line
  edo_by_edo_number: state => edo_number => (
    _.find(state.edos.data, { edo_number })
  ),
  edo_detail: state => state.edos.detail,
  count_status_edos: state => state.count_status_edos
}

export const mutations = {
  setAuth (state, data) {
    const decode = jwtDecode(data.token)
    this.$auth.setUser({ ...decode, scope: [decode.role], currentPassword: data.password })
  },
  /**
   * @param {Boolean} payload
   */
  SET_PENDING (state, payload) {
    state.pending = payload
  },
  /**
   * @param {Object} payload
   * data all users
   */
  SET_USERS (state, payload) {
    state.users.data = payload.data
    state.users.total = payload['total users']
  },
  /**
   * @param {Object} payload
   * data all edos
   */
  SET_EDOS (state, payload) {
    state.edos = _.clone(payload)
  },
  /**
   * @param {Object} payload
   * data all status edos
   */
  SET_COUNT_STATUS_EDOS (state, payload) {
    state.count_status_edos = _.clone(payload)
  },
  /**
   * @param {Object} payload
   * data detail edo
   */
  SET_EDOS_DETAIL (state, payload) {
    state.edos.detail = _.clone(payload)
  },
  // reset edo detail
  RESET_EDOS_DETAIL (state, payload) {
    state.edos.detail = {
      status: null,
      error: false,
      data: {}
    }
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
  },

  /**
   * get all edo
   */
  async getAllEdo ({ commit, dispatch }) {
    commit('SET_PENDING', true)
    this.$toast.global.app_loading()

    await this.$axios.$get('/api/e_do')
      .then(async (ress) => {
        this.$toast.clear()
        commit('SET_EDOS', ress)
        await dispatch('getCountStatusEdo')
      })
      .catch((err) => {
        this.$toast.clear()
        throw new Error(err)
      })
      .finally(() => {
        commit('SET_PENDING', false)
      })
  },

  /**
   * get count edo
   */
  async getCountStatusEdo ({ commit }) {
    await this.$axios.$get('/api/e_do/total_e_do')
      .then((ress) => {
        commit('SET_COUNT_STATUS_EDOS', ress)
      })
      .catch((err) => {
        throw new Error(err)
      })
  },

  /**
   * get edo by id
   */
  async getEdoByID ({ commit }, params) {
    commit('SET_PENDING', true)
    this.$toast.global.app_loading()

    await this.$axios.$get(`/api/e_do/search/e_do_number/${params}`)
      .then((ress) => {
        this.$toast.clear()
        const dataset = {
          status: _.head(ress.data).status,
          error: false,
          data: _.head(ress.data)
        }
        commit('SET_EDOS_DETAIL', dataset)
      })
      .catch((err) => {
        this.$toast.clear()
        const dataset = {
          status: 'error',
          error: true,
          data: {}
        }
        commit('SET_EDOS_DETAIL', dataset)
        throw new Error(err)
      })
      .finally(() => {
        commit('SET_PENDING', false)
      })
  },

  /**
   * async get edo by id
   */
  async asyncGetEdoByID ({ commit }, params) {
    return await this.$axios.$get(`/api/e_do/search/e_do_number/${params}`)
  },

  /**
   * create edo
   */
  async createEdo ({ commit, dispatch, rootState }) {
    commit('SET_PENDING', true)
    this.$toast.global.app_loading()
    const dataset = rootState.form.edo_create
    await this.$axios.$post('/api/e_do', qs.stringify(dataset))
      .then(async (ress) => {
        this.$toast.clear()
        this.$toast.global.app_success('New e-DO has been created')
        await dispatch('getAllEdo')
      })
      .catch((err) => {
        this.$toast.global.app_error('New e-DO failed to create')
        throw new Error(err)
      })
      .finally(() => {
        commit('SET_PENDING', false)
      })
  },

  /**
   * delete edo
   */
  async deleteEdo ({ dispatch, rootState }) {
    await this.$axios.$delete(`/api/e_do/${rootState.form.edo_delete.edo_id}`)
      .then(async () => {
        this.$toast.global.app_success(
          `e-DO ${rootState.form.edo_delete.edo_number} successfully deleted`
        )
        await dispatch('getAllEdo')
      })
      .catch((err) => {
        this.$toast.global.app_error(
          `e-DO ${rootState.form.edo_delete.edo_number} failed to delete`
        )
        throw new Error(err)
      })
  },

  /**
   * update edo
   */
  async updateEdo ({ commit, rootState }) {
    commit('SET_PENDING', true)
    this.$toast.global.app_loading()
    const dataset = _.pickBy(rootState.form.edo_edit, _.identity)

    await this.$axios.$put(`/api/e_do/${dataset.edo_id}`, qs.stringify(dataset))
      .then((ress) => {
        this.$toast.clear()
        this.$toast.global.app_success(
          `e-DO ${dataset.edo_number} successfully updated`
        )
      })
      .catch((err) => {
        this.$toast.clear()
        this.$toast.global.app_error(
          `e-DO ${dataset.edo_number} failed to update`
        )
        throw new Error(err)
      })
      .finally(() => {
        commit('SET_PENDING', false)
      })
  },

  /**
   * update status paid edo
   */
  async updatePaidEdo ({ commit, dispatch, rootState }) {
    commit('SET_PENDING', false)
    this.$toast.global.app_loading()
    const dataset = rootState.form.edo_paid

    await this.$axios.$put(
      `/api/e_do/approve/${dataset.edo_id}`,
      qs.stringify(
        _.pick(dataset, ['house_bl_number'])
      )
    )
      .then(async (ress) => {
        this.$toast.clear()
        this.$toast.global.app_success(
          `e-DO ${dataset.edo_number} successfully updated`
        )
        await dispatch('getAllEdo')
      })
      .catch((err) => {
        this.$toast.clear()
        this.$toast.global.app_error(
          `e-DO ${dataset.edo_number} failed to update`
        )
        throw new Error(err)
      })
      .finally(() => {
        commit('SET_PENDING', false)
      })
  },

  /**
   * update status hold/reissue edo
   */
  async updateHoldEdo ({ commit, rootState }) {
    commit('SET_PENDING', true)
    this.$toast.global.app_loading()
    const dataset = rootState.form.edo_hold

    await this.$axios.$put(
      `/api/e_do/reissued/${dataset.edo_id}`,
      qs.stringify(
        _.pick(dataset, [
          'house_bl_number',
          'description'
        ])
      )
    )
      .then((ress) => {
        this.$toast.clear()
        this.$toast.global.app_success(
          `e-DO ${dataset.edo_number} successfully hold`
        )
      })
      .catch((err) => {
        this.$toast.clear()
        this.$toast.global.app_error(
          `e-DO ${dataset.edo_number} failed to update`
        )
        throw new Error(err)
      })
      .finally(() => {
        commit('SET_PENDING', false)
      })
  },

  /**
   * update status reject edo
   */
  async updateRejectEdo ({ commit, rootState }) {
    commit('SET_PENDING', true)
    this.$toast.global.app_loading()
    const dataset = rootState.form.edo_reject

    await this.$axios.$put(
      `/api/e_do/reject/${dataset.edo_id}`,
      qs.stringify(
        _.pick(dataset, [
          'house_bl_number',
          'description'
        ])
      )
    )
      .then((ress) => {
        this.$toast.clear()
        this.$toast.global.app_success(
          `e-DO ${dataset.edo_number} successfully rejected`
        )
      })
      .catch((err) => {
        this.$toast.clear()
        this.$toast.global.app_error(
          `e-DO ${dataset.edo_number} failed to update`
        )
        throw new Error(err)
      })
      .finally(() => {
        commit('SET_PENDING', false)
      })
  }
}
