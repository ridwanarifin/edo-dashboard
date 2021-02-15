<template>
  <v-container class="mx-auto px-sm-5">
    <section>
      <app-status-edos />
    </section>

    <v-divider class="my-3" />

    <section>
      <table-admin-edo-history />
    </section>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import AppStatusEdos from '~/components/AppStatusEdos.vue'
import TableAdminEdoHistory from '~/components/table/TableAdminEdoHistory.vue'

export default {
  components: {
    AppStatusEdos,
    TableAdminEdoHistory
  },
  async fetch () {
    await this.getAllEdo()
  },
  methods: {
    ...mapActions([
      'getAllEdo'
    ])
  },
  meta: {
    crumbs: [{
      text: 'Dashboard',
      exact: true,
      to: '/supervisor/e-do'
    }]
  },
  head: {
    title: 'Supervisor Dashboard — SCL e-DO'
  }
}
</script>
