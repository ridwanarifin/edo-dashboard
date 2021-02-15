<template>
  <v-container class="mx-auto">
    <section class="px-sm-3">
      <form-create-user />
    </section>
  </v-container>
</template>

<script>
import FormCreateUser from '~/components/form/FormCreateUser.vue'
export default {
  components: { FormCreateUser },
  meta: {
    crumbs: [{
      text: 'User Management',
      exact: true,
      to: '/superadmin/user-management'
    }, {
      text: 'Create User',
      exact: true,
      to: '/superadmin/user-management/create'
    }]
  },
  head: {
    title: 'Create User | User Management — SCL e-DO'
  }
}
</script>
