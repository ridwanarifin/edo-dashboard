<template>
  <v-dialog
    v-model.lazy="delete_edo"
    persistent
    max-width="600px"
    transition="slide-y-transition"
    :disabled="pending"
  >
    <v-alert
      colored-border
      border="top"
      type="warning"
      :icon="$icon.mdiAlertOutline"
      class="ma-0 pt-7"
    >
      <div class="text-h6">
        Delete this e-DO ?
        {{ edo_number }}
      </div>

      <v-divider class="mt-5" />

      <v-card-actions class="justify-space-between">
        <v-btn
          text
          color="error"
          :loading="pending"
          :disabled="pending"
          @click.prevent="cancelDelete"
        >
          Cancel
        </v-btn>

        <v-btn
          color="error"
          :loading="pending"
          :disabled="pending"
          @click.prevent="submitDelete"
        >
          Yes, Delete
        </v-btn>
      </v-card-actions>
    </v-alert>
  </v-dialog>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
export default {
  data: () => ({
    pending: false
  }),
  computed: {
    ...mapFields('form', [
      'dialog.delete_edo',
      'edo_delete.edo_number'
    ])
  },
  methods: {
    ...mapMutations('form', {
      resetDialog: 'RESET_EDO_DELETE'
    }),
    ...mapActions([
      'deleteEdo'
    ]),
    submitDelete () {
      this.pending = true
      this.deleteEdo()
        .finally(() => {
          this.pending = false
          this.cancelDelete()
        })
    },
    cancelDelete () {
      this.resetDialog()
      this.delete_edo = false
    }
  }
}
</script>
