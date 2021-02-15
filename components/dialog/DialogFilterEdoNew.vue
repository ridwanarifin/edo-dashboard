<template>
  <v-dialog
    v-model.lazy="filter_edo_new"
    persistent
    max-width="600px"
    transition="slide-y-transition"
  >
    <form-filter-edo-new
      @submit="$emit('submit-filter')"
    />
  </v-dialog>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import FormFilterEdoNew from '~/components/form/FormFilterEdoNew.vue'
export default {
  components: { FormFilterEdoNew },
  computed: {
    ...mapFields('form', [
      'dialog.filter_edo_new'
    ])
  }
}
</script>
