<template>
  <v-container>
    <v-card class="mx-auto pa-10" max-width="500" rounded="">
      <v-img
        class="mx-auto mb-10"
        :src="require('@/assets/img/logo-scl-login.png')"
        :lazy-src="require('@/assets/img/logo-scl-login.png')"
        max-width="190"
      >
        <template #placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            />
          </v-row>
        </template>
      </v-img>

      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(on_submit)">
          <validation-provider v-slot="{ valid, errors }" name="e-mail" rules="required|email">
            <v-text-field
              v-model="forms.email"
              class="mt-2"
              label="Email"
              :success="valid"
              :loading="isSubmiting"
              :disabled="isSubmiting"
              :error-messages="errors"
              required
              outlined
              type="email"
            />
          </validation-provider>

          <validation-provider v-slot="{ valid, errors }" name="password" rules="required">
            <v-text-field
              v-model="forms.password"
              class="mt-2"
              label="Password"
              :success="valid"
              :disabled="isSubmiting"
              :loading="isSubmiting"
              :error-messages="errors"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              outlined
              required
              @click:append="show = !show"
            />
          </validation-provider>

          <v-card-actions class="mt-n3">
            <v-spacer />
            <v-btn
              large
              type="submit"
              :disabled="isSubmiting"
              :loading="isSubmiting"
              class="align-self-end ml-auto"
              color="primary">
              Login
            </v-btn>
          </v-card-actions>
        </form>
      </validation-observer>
    </v-card>
  </v-container>
</template>

<script>
export default {
  layout: 'auth',
  data () {
    return {
      show: false,
      forms: {
        email: '',
        password: ''
      },

      isSubmiting: false
    }
  },

  methods: {
    async on_submit () {
      try {
        this.isSubmiting = true
        this.$toast.global.app_loading()
        await this.$store.dispatch('UserLogin', this.forms)
      } catch (error) {
        const msg = error.response.data && ', ' + error.response.data.message
        this.$toast.global.app_error('Login failed' + msg)
      } finally {
        this.isSubmiting = false
        this.$toast.clear()
      }
    }
  },

  head: {
    title: 'Authentication'
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep label {
    font-size: 16px !important;
    line-height: 24px !important;
    color: #373A3C !important;
  }
</style>
