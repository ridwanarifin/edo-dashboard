<template>
  <v-container class="mx-auto">
    <form-create-edo />
  </v-container>
</template>

<script>
import FormCreateEdo from '~/components/form/FormCreateEdo.vue'
export default {
  components: { FormCreateEdo },
  meta: {
    crumbs: [{
      text: 'Dashboard',
      to: '/dokumen/e-do',
      exact: true
    }, {
      text: 'Create e-DO',
      to: '/dokumen/e-do/create',
      exact: true
    }]
  },
  middleware: 'dokumenscl',
  head: {
    title: 'Create e-DO | Dokumen Dashboard — SCL e-DO'
  }
}
</script>
