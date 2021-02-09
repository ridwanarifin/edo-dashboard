<template>
  <v-container class="mx-auto px-sm-5">
    <section class="mb-15">
      <table-header-user
        :loading="false"
        :items-per-page="itemsPerPage"
        @input-per-page="itemsPerPage = $_.toInteger($event, 10)"
      />
    </section>

    <section>
      <table-user
        :items-per-page="itemsPerPage"
        :page-count="pageCount"
        @page-count="pageCount = $event"
      />
    </section>

    <dialog-edit-user />
    <dialog-delete-user />
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import DialogDeleteUser from '~/components/dialog/DialogDeleteUser.vue'
import DialogEditUser from '~/components/dialog/DialogEditUser.vue'
import TableHeaderUser from '~/components/table/TableHeaderUser.vue'
import TableUser from '~/components/table/TableUser.vue'

export default {
  components: {
    TableUser,
    TableHeaderUser,
    DialogEditUser,
    DialogDeleteUser
  },
  meta: {
    crumbs: [{
      text: 'User Management',
      exact: true,
      to: '/superadmin/user-management'
    }]
  },
  async fetch () {
    await this.getAllUser()
  },
  fetchOnServer: false,
  data: () => ({
    itemsPerPage: 10,
    pageCount: 0
  }),
  methods: mapActions([
    'getAllUser'
  ]),
  head: {
    title: 'User Management - SCL e-DO'
  }
}
</script>
