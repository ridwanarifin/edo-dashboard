<template>
  <v-dialog
    v-model.lazy="reject_edo"
    persistent
    max-width="768px"
    transition="slide-y-transition"
  >
    <form-reject-edo
      :house-bl-number="houseBlNumber"
      @submit-resolve="$emit('submit-resolve')"
    />
  </v-dialog>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import FormRejectEdo from '~/components/form/FormRejectEdo.vue'
export default {
  components: { FormRejectEdo },
  props: {
    houseBlNumber: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapFields('form', [
      'dialog.reject_edo'
    ])
  }
}
</script>
