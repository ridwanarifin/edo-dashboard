<template>
  <v-dialog
    v-model="edit_user"
    max-width="600px"
    transition="slide-y-transition"
  >
    <form-edit-user />
  </v-dialog>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import FormEditUser from '../form/FormEditUser.vue'

export default {
  components: { FormEditUser },
  computed: {
    ...mapFields('form', [
      'dialog.edit_user'
    ])
  }
}
</script>
