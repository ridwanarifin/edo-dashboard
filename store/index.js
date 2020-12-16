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
    this.$toast.global.app_loading()
    await this.$auth.loginWith('local', { data: qs.stringify(data) })
      .then((response) => {
        this.$toast.clear()
        commit('setAuth', { token: response.data.id_token, password: data.password })
      })
      .catch((error) => {
        this.$toast.clear()
        console.log(error)
        const msg = error.response.data && ', ' + error.response.data.message
        this.$toast.global.app_error('Login failed' + msg)
      })
  }
}

export const plugins = [
  process.client ? createPersistedState() : null
]
