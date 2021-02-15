<template>
  <v-dialog
    v-model.lazy="hold_edo"
    persistent
    max-width="768px"
    transition="slide-y-transition"
  >
    <form-hold-edo
      :house-bl-number="houseBlNumber"
      @submit-resolve="$emit('submit-resolve')"
    />
  </v-dialog>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import FormHoldEdo from '~/components/form/FormHoldEdo.vue'
export default {
  components: { FormHoldEdo },
  props: {
    houseBlNumber: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapFields('form', [
      'dialog.hold_edo'
    ])
  }
}
</script>
