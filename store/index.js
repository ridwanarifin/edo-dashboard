import qs from 'querystring'
import jwtDecode from 'jwt-decode'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
const ls = new SecureLS({ encodingType: 'aes', isCompression: false })

export const state = () => ({
  pending: false
})

export const mutations = {
  setAuth (state, data) {
    const decode = jwtDecode(data.token)
    this.$auth.setUser({ ...decode, scope: [decode.role], currentPassword: data.password })
  },
  pendingMutate (state, payload) {
    state.pending = payload
  }
}

export const actions = {
  async UserLogin ({ commit, state }, data) {
    commit('pendingMutate', true)
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
        commit('pendingMutate', false)
      })
  }
}

export const plugins = [
  createPersistedState({
    storage: {
      getItem: key => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: key => ls.remove(key)
    }
  })
]
