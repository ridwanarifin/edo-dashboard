<template>
  <v-container fluid class="px-md-5">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6">
          <label for="email" class="text-body-1">Your e-mail</label>
          <v-text-field
            placeholder="E-mail"
            :value="$auth.user.email"
            disabled
            solo
          />
        </v-col>

        <v-col cols="12" sm="6">
          <label for="currentPassword" class="text-body-1">Your name</label>
          <v-text-field
            label="Name"
            :value="$auth.user.name"
            disabled
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
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="4">
          <label for="currentPassword" class="text-body-1">Current Password</label>
          <v-text-field
            id="currentPassword"
            v-model="currentPassword"
            class="mt-3"
            placeholder="Input your recent password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            :rules="[rules.currentPasswordRules, passwordConfirm]"
            solo
            validate-on-blur
            required
            :loading="isSubmiting"
            :disabled="isSubmiting"
            @click:append="show1 = !show1"
          />
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <label for="password" class="text-body-1">New Password</label>
          <v-text-field
            id="password"
            v-model="password"
            class="mt-3"
            placeholder="Input new password"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            :rules="rules.passwordRules"
            solo
            validate-on-blur
            required
            :loading="isSubmiting"
            :disabled="isSubmiting"
            @click:append="show2 = !show2"
          />
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <label for="rePassword" class="text-body-1">Re-type Password</label>
          <v-text-field
            id="rePassword"
            v-model="rePassword"
            class="mt-3"
            placeholder="Input password again"
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show3 ? 'text' : 'password'"
            :rules="[rules.rePasswordRules, retypePassword]"
            solo
            validate-on-blur
            required
            :loading="isSubmiting"
            :disabled="isSubmiting"
            @click:append="show3 = !show3"
          />
        </v-col>
      </v-row>

      <v-row justify="end" class="text-right">
        <v-col cols="auto">
          <v-btn :disabled="isSubmiting" text color="red" @click="clear">
            Cancel
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn :loading="isSubmiting" :disabled="!valid" color="primary" @click="submit">
            Update
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import qs from 'querystring'

export default {
  meta: {
    crumbs: [{
      text: 'Setting',
      to: '/setting'
      // disabled: false
    }]
  },

  data () {
    return {
      valid: true,
      isSubmiting: false,
      rules: {
        currentPasswordRules: v => !!v || 'Current password is required.',
        passwordRules: [v => !!v || 'Password is required.'],
        rePasswordRules: v => !!v || 'Re-type password is required.'
      },
      currentPassword: '',
      password: '',
      rePassword: '',

      show1: false,
      show2: false,
      show3: false
    }
  },

  computed: {
    retypePassword () {
      return () => (this.password === this.rePassword) || "Password doesn't match."
    },
    passwordConfirm () {
      return () => (this.currentPassword === this.$auth.user.currentPassword) || 'Incorrect password.'
    }
  },

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.isSubmiting = true
        this.$toast.global.app_loading()
        this.$axios.put(`/api/e_do/edit_password/${this.$auth.user.id}`, qs.stringify(this.password))
          .then((response) => {
            this.$auth.setUser({ ...this.$auth.user, currentPassword: this.password })
            this.$toast.global.app_success('Password successfully updated.')
          })
          .catch((err) => {
            err && this.$toast.global.app_error('Failed to change password')
          })
          .finally(() => {
            this.isSubmiting = false
            this.clear()
            this.$router.replace('/logout')
          })
      }
    },

    clear () {
      this.$refs.form.reset()
    },

    cancel () {
      this.clear()
      this.$router.back()
    }
  }
}
</script>
