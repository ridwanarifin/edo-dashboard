import _ from 'lodash'

export default function ({ redirect, store }) {
  const role = _.upperCase(store.state.auth.user.role)
  if (!_.isEqual(role, 'ADMIN')) {
    switch (role) {
      case 'DOKUMEN':
        return redirect('/dokumen')
      case 'SUPERADMIN':
        return redirect('/superadmin')
    }
  }
}
