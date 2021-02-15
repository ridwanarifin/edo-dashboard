<template>
  <v-dialog
    v-model.lazy="filter_edo_doct"
    persistent
    max-width="600px"
    transition="slide-y-transition"
  >
    <form-filter-doct-edo
      @submit="$emit('submit-filter')"
    />
  </v-dialog>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import FormFilterDoctEdo from '~/components/form/FormFilterDoctEdo.vue'
export default {
  components: { FormFilterDoctEdo },
  computed: {
    ...mapFields('form', [
      'dialog.filter_edo_doct'
    ])
  }
}
</script>
