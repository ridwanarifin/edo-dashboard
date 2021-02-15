<template>
  <v-dialog
    v-model.lazy="filter_edo_history"
    persistent
    max-width="600px"
    transition="slide-y-transition"
  >
    <form-filter-edo-history
      @submit="$emit('submit-filter')"
    />
  </v-dialog>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import FormFilterEdoHistory from '~/components/form/FormFilterEdoHistory.vue'
export default {
  components: { FormFilterEdoHistory },
  computed: {
    ...mapFields('form', [
      'dialog.filter_edo_history'
    ])
  }
}
</script>
