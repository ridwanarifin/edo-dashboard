<template>
  <v-dialog
    v-model.lazy="paid_edo"
    persistent
    max-width="600px"
    transition="slide-y-transition"
  >
    <form-paid-edo
      :house-bl-number="houseBlNumber"
      @submit-resolve="$emit('submit-resolve')"
    />
  </v-dialog>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import FormPaidEdo from '~/components/form/FormPaidEdo.vue'
export default {
  components: { FormPaidEdo },
  props: {
    houseBlNumber: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapFields('form', [
      'dialog.paid_edo'
    ])
  }
}
</script>
