import {
  mdiHomeOutline,
  mdiAccountMultipleOutline,
  mdiCogOutline
} from '@mdi/js'

export default {
  supervisor: [
    {
      title: 'Dashboard',
      to: '/supervisor/e-do',
      icon: mdiHomeOutline
    },
    {
      title: 'User Management',
      to: '/supervisor/e-do',
      icon: mdiAccountMultipleOutline
    }
  ],
  superadmin: [
    {
      title: 'User management',
      to: '/superadmin/user-management',
      icon: mdiAccountMultipleOutline
    },
    {
      title: 'Setting',
      to: '/setting',
      icon: mdiCogOutline
    }],
  admin: [
    {
      title: 'Dashboard',
      to: '/admin/e-do',
      icon: mdiHomeOutline
    },
    {
      title: 'Setting',
      to: '/setting',
      icon: mdiCogOutline
    }
  ],
  dokumen: [
    {
      title: 'Dashboard',
      to: '/dokumen',
      icon: mdiHomeOutline
    },
    {
      title: 'Setting',
      to: '/setting',
      icon: mdiCogOutline
    }
  ]
}
