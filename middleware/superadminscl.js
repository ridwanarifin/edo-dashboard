import _ from 'lodash'

export default function ({ store, redirect }) {
  const role = _.upperCase(store.state.auth.user.role)
  if (!_.isEqual(role, 'SUPERADMIN')) {
    switch (role) {
      case 'DOKUMEN':
        return redirect('/dokumen')
      case 'ADMIN':
        return redirect('/admin')
    }
  }
}
