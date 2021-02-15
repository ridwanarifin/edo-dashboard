<template>
  <v-container class="mx-auto px-sm-5">
    <section class="mb-5">
      <app-status-edos />
    </section>

    <section>
      <v-tabs
        v-model="tabs"
        show-arrows
        background-color="transparent"
      >
        <v-tab href="#new-edo">
          New e-DO
        </v-tab>
        <v-tab href="#history">
          History
        </v-tab>
      </v-tabs>

      <v-divider class="mb-5" />

      <v-tabs-items
        v-model="tabs"
        style="background: transparent"
      >
        <v-tab-item value="new-edo" class="pa-2">
          <table-admin-edo-new />
        </v-tab-item>

        <v-tab-item value="history" class="pa-2">
          <table-admin-edo-history />
        </v-tab-item>
      </v-tabs-items>
    </section>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import AppStatusEdos from '~/components/AppStatusEdos.vue'
import TableAdminEdoHistory from '~/components/table/TableAdminEdoHistory.vue'
import TableAdminEdoNew from '~/components/table/TableAdminEdoNew.vue'

export default {
  components: {
    AppStatusEdos,
    TableAdminEdoNew,
    TableAdminEdoHistory
  },
  async fetch () {
    await this.getAllEdo()
  },
  data () {
    return {
      tabs: 'history'
    }
  },
  methods: {
    ...mapActions([
      'getAllEdo'
    ])
  },
  meta: {
    crumbs: [{
      text: 'Dashboard',
      to: '/admin/e-do',
      exact: true
    }]
  },
  middleware: 'adminscl',
  head: {
    title: 'Admin Dashboard — SCL e-DO'
  }
}
</script>
