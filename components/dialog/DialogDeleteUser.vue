<template>
  <v-dialog
    v-model="delete_user"
    max-width="600px"
    transition="slide-y-transition"
    persistent
    :disabled="pending"
  >
    <v-alert
      type="warning"
      border="top"
      class="ma-0 pt-7"
      colored-border
      :icon="$icon.mdiAlertOutline"
      :close-icon="$icon.mdiClose"
    >
      <v-card
        tile
        flat
        :loading="pending"
      >
        <v-card-title class="pt-0">
          Are you sure you want to delete this User ?
        </v-card-title>

        <v-card-text>
          <pre class="text-left">
            Name  : {{ user.name }}
            Email : {{ user.email }}
            Role  : {{ user.role }}
          </pre>
        </v-card-text>

        <v-divider class="mb-1" />

        <v-card-actions>
          <v-btn
            text
            color="primary"
            :loading="pending"
            :disabled="pending"
            @click.prevent="dialog_close"
          >
            Close
          </v-btn>

          <v-spacer />

          <v-btn
            dark
            color="red"
            :loading="pending"
            :disabled="pending"
            @click.prevent="dialog_submit"
          >
            Yes, Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-alert>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  computed: {
    ...mapFields('form', [
      'dialog.delete_user',
      'user'
    ]),
    ...mapGetters([
      'pending'
    ])
  },
  methods: {
    ...mapActions([
      'getAllUser',
      'deleteUser'
    ]),
    dialog_close () {
      this.delete_user = false
      this.user = {
        user_id: null,
        email: null,
        name: null,
        role: null,
        password: null
      }
    },
    async dialog_submit () {
      await this.deleteUser()
        .finally(() => {
          this.dialog_close()
          this.getAllUser()
        })
    }
  }
}
</script>
