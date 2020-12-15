import _ from 'lodash'

export default function ({ store, redirect, $auth, $router, route }) {
  const role = _.upperCase($auth.user.role)
  switch (role) {
    case 'DOKUMEN':
      if (!_.isEqual(route.path, '/dokumen/e-do')) { return redirect('/dokumen/e-do') }
      break
    case 'ADMIN':
      if (!_.isEqual(route.path, '/admin/e-do')) { return redirect('/admin/e-do') }
      break
    case 'SUPERADMIN':
      if (!_.isEqual(route.path, '/superadmin/user-management')) { return redirect('/superadmin/user-management') }
      break
    case 'SUPERVISOR':
      if (!_.isEqual(route.path, '/supervisor/e-do')) { return redirect('/supervisor/e-do') }
      break
    case 'ADMINSPL':
      if (!_.isEqual(route.path, '/spl/admin')) { return redirect('/spl/admin') }
      break
    case 'KASIR':
      if (!_.isEqual(route.path, '/spl/kasir')) { return redirect('/spl/kasir') }
      break
    default:
      if ($auth.loggedIn) { return redirect('/logout') }
      break
  }
}
