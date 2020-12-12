
export const state = () => ({
  data: []
})

export const mutations = {
  setBreadcrumbs (state, crumbs) {
    state.data = crumbs
  }
}
