<template>
  <v-container class="mx-auto px-sm-5">
    <section>
      <app-status-edos />
    </section>

    <v-divider class="my-3" />

    <section>
      <table-document-edo />
    </section>

    <dialog-delete-edo />
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import AppStatusEdos from '~/components/AppStatusEdos.vue'
import DialogDeleteEdo from '~/components/dialog/DialogDeleteEdo.vue'
import TableDocumentEdo from '~/components/table/TableDocumentEdo.vue'

export default {
  components: {
    AppStatusEdos,
    TableDocumentEdo,
    DialogDeleteEdo
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
      to: '/dokumen/e-do',
      exact: true
    }]
  },
  middleware: 'dokumenscl',
  head: {
    title: 'Dokumen Dashboard — SCL e-DO'
  }
}
</script>
