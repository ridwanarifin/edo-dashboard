import _ from 'lodash'

export default function (ctx) {
  const o = ctx.route.params.id
  const g = ctx.store.getters.edo_by_edo_number(o)

  // other than rejected status, it cannot be edited
  if (!_.isEqual(_.upperCase(g.status), 'REJECTED')) {
    return ctx.redirect('/')
  }
}
