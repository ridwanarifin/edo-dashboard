<template>
  <validation-observer
    v-slot="{ handleSubmit, reset }"
    ref="observer"
  >
    <form
      @submit.prevent="handleSubmit(submit_update)"
      @reset.prevent="reset"
    >
      <v-card :loading="loading">
        <v-card-title class="pa-5">
          <span class="headline">Edit user</span>

          <v-spacer />

          <v-btn
            icon
            @click.prevent="dialog_close"
          >
            <v-icon v-text="$icon.mdiClose" />
          </v-btn>
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-5">
          <v-row
            align="center"
            justify="space-between"
          >
            <!-- email -->
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="email"
                rules="required|email"
              >
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  type="email"
                  :loading="pending"
                  :disabled="pending"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>

            <!-- name -->
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="name"
                rules="required"
              >
                <v-text-field
                  v-model="name"
                  label="Name"
                  :loading="pending"
                  :disabled="pending"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>

            <!-- role -->
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="role"
                rules="required"
              >
                <v-autocomplete
                  v-model="role"
                  label="Role"
                  :items="roles"
                  :loading="pending"
                  :disabled="pending"
                  :error-messages="errors"
                  class="text-capitalize"
                />
              </validation-provider>
            </v-col>

            <!-- password -->
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="password"
              >
                <v-text-field
                  v-model="password"
                  :append-icon="show ? $icon.mdiEye : $icon.mdiEyeOff"
                  :type="show ? 'text' : 'password'"
                  :loading="pending"
                  :disabled="pending"
                  :error-messages="errors"
                  label="Password"
                  @click:append.stop="show = !show"
                />
              </validation-provider>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-5">
          <v-spacer />

          <v-btn
            text
            type="reset"
            color="blue darken-1"
            :loading="pending"
            :disabled="pending"
            @click.prevent="dialog_close"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            type="submit"
            :loading="pending"
            :disabled="pending"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </validation-observer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
export default {
  data: () => ({
    show: false,
    roles: [
      'admin',
      'dokumen',
      'kasir',
      'adminspl',
      'superadmin',
      'supervisor'
    ]
  }),
  computed: {
    ...mapGetters([
      'pending'
    ]),
    ...mapFields('form', [
      'dialog.edit_user',
      'user',
      'user.email',
      'user.name',
      'user.role',
      'user.password'
    ]),
    observer () {
      return this.$refs.observer
    }
  },
  methods: {
    ...mapActions([
      'getAllUser',
      'updateUser'
    ]),
    // update user
    async submit_update () {
      await this.updateUser()
        .finally(async () => {
          this.dialog_close()
          await this.getAllUser()
        })
    },
    // close dialog
    dialog_close () {
      this.edit_user = false
      this.user = {
        user_id: null,
        email: null,
        name: null,
        role: null,
        password: null
      }
      this.observer.reset()
    }
  }
}
</script>
