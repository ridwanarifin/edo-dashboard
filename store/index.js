import qs from 'querystring'
import jwtDecode from 'jwt-decode'
import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
})

export const mutations = {
  setAuth (state, data) {
    const decode = jwtDecode(data.token)
    this.$auth.setUser({ ...decode, scope: [decode.role], currentPassword: data.password })
  }
}

export const actions = {
  async UserLogin ({ commit }, data) {
    const response = await this.$auth.loginWith('local', { data: qs.stringify(data) })
    commit('setAuth', { token: response.data.id_token, password: data.password })
  }
}

export const plugins = [
  createPersistedState()
]
