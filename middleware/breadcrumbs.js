export default function ({ route, store }) {
  const defaultBreadcrumbs = [{
    to: route.path,
    disabled: true,
    text: route.name === 'index' ? 'Dashboard' : route.name.replace(/-/g, '')
  }]

  const result = route.meta.reduce((crumbs, meta) => meta.crumbs || crumbs, defaultBreadcrumbs)
  store.commit('breadcrumbs/setBreadcrumbs', result)
}
