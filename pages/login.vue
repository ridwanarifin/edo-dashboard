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
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              required
              outlined
              clearable
              type="email"
            />
          </validation-provider>

          <validation-provider v-slot="{ valid, errors }" name="password" rules="required">
            <v-text-field
              v-model="forms.password"
              class="mt-2"
              label="Password"
              :success="valid"
              :disabled="pending"
              :loading="pending"
              :error-messages="errors"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              outlined
              required
              clearable
              @click:append="show = !show"
            />
          </validation-provider>

          <v-card-actions class="mt-n3">
            <v-spacer />
            <v-btn
              large
              type="submit"
              :disabled="pending"
              :loading="pending"
              class="align-self-end ml-auto"
              color="primary"
            >
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
      }
    }
  },
  computed: {
    pending () {
      return this.$store.state.pending
    }
  },
  methods: {
    on_submit () {
      this.$store.dispatch('UserLogin', this.forms)
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
