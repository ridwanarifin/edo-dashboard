<template>
  <v-container>
    <validation-observer ref="observer" v-slot="{ invalid, handleSubmit }">
      <form @submit.prevent="handleSubmit(on_submit)" @reset.prevent="cancel">
        <v-row>
          <v-col cols="12" sm="6">
            <label for="email" class="text-body-1">Your e-mail</label>
            <v-text-field
              placeholder="E-mail"
              :value="$auth.user.email"
              readonly
              solo
            />
          </v-col>

          <v-col cols="12" sm="6">
            <label for="currentPassword" class="text-body-1">Your name</label>
            <v-text-field
              label="Name"
              :value="$auth.user.name"
              readonly
              solo
            />
          </v-col>
        </v-row>

        <v-divider class="my-10" />

        <v-row>
          <v-col cols="12">
            <div class="headline font-weight-bold">
              Change Password
            </div>

            <validation-provider hidden vid="$auth.user.currentPassword">
              <v-text-field
                v-model="$auth.user.currentPassword"
                hidden
              />
            </validation-provider>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="4">
            <label for="currentPassword" class="text-body-1">Current Password</label>
            <validation-provider v-slot="{ valid, errors }" name="current password" rules="required|confirmed:$auth.user.currentPassword">
              <v-text-field
                id="currentPassword"
                v-model="currentPassword"
                class="mt-3"
                placeholder="Input your recent password"
                solo
                required
                :success="valid"
                :error-messages="errors"
                :loading="isSubmiting"
                :disabled="isSubmiting"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
              />
            </validation-provider>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <label for="password" class="text-body-1">New Password</label>
            <validation-provider v-slot="{ valid, errors }" name="password" rules="required" vid="password">
              <v-text-field
                id="password"
                v-model="password"
                class="mt-3"
                placeholder="Input new password"
                solo
                required
                :success="valid"
                :error-messages="errors"
                :loading="isSubmiting"
                :disabled="isSubmiting"
                :type="show2 ? 'text' : 'password'"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show2 = !show2"
              />
            </validation-provider>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <label for="rePassword" class="text-body-1">Re-type Password</label>
            <validation-provider v-slot="{ valid, errors }" name="re-type password" rules="required|confirmed:password">
              <v-text-field
                id="rePassword"
                v-model="rePassword"
                class="mt-3"
                placeholder="Input password again"
                solo
                required
                :success="valid"
                :error-messages="errors"
                :loading="isSubmiting"
                :disabled="isSubmiting"
                :type="show3 ? 'text' : 'password'"
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show3 = !show3"
              />
            </validation-provider>
          </v-col>
        </v-row>

        <v-row justify="end" class="text-right">
          <v-col cols="auto">
            <v-btn text color="red" type="reset" :disabled="isSubmiting">
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="primary" type="submit" :disabled="invalid" :loading="isSubmiting">
              Update
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </validation-observer>
  </v-container>
</template>

<script>
import qs from 'querystring'

export default {
  layout: 'spl',
  meta: {
    crumbs: [{
      text: 'Setting',
      exact: true,
      to: '/spl/setting'
    }]
  },

  data () {
    return {
      isSubmiting: false,
      currentPassword: '',
      password: '',
      rePassword: '',

      show1: false,
      show2: false,
      show3: false
    }
  },

  computed: {
    observer () { return this.$refs.observer }
  },

  methods: {
    async on_submit () {
      this.isSubmiting = true
      this.$toast.global.app_loading()
      await this.$axios.put(`/api/e_do/edit_password/${this.$auth.user.id}`, qs.stringify(this.password))
        .then((response) => {
          this.clear()
          this.$auth.setUser({ ...this.$auth.user, currentPassword: this.password })
          this.$toast.global.app_success('Password successfully updated.')
        })
        .catch((err) => {
          err && this.$toast.global.app_error('Failed to change password')
        })
        .finally(() => {
          this.isSubmiting = false
        })
    },

    clear () {
      this.observer.reset()
    },

    cancel () {
      this.clear()
      this.$router.back()
    }
  }
}
</script>
