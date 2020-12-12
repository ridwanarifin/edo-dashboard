<template>
  <v-container fluid class="py-10 px-md-5">
    <validation-observer ref="observer" v-slot="{ invalid, handleSubmit }">
      <form @submit.prevent="handleSubmit(on_submit)">
        <v-row>
          <v-col cols="12" sm="6">
            <validation-provider v-slot="{ valid, errors }" rules="required|email" name="e-mail">
              <label for="email" class="text-body-1">E-mail</label>
              <v-text-field
                id="email"
                v-model="form.email"
                class="mt-3"
                placeholder="Input e-mail"
                type="email"
                :rules="errors"
                :success="valid"
                :loading="isSubmiting"
                solo
                required
                clearable
              />
            </validation-provider>
          </v-col>

          <v-col cols="12" sm="6">
            <validation-provider v-slot="{ valid, errors }" rules="required" name="name">
              <label for="name" class="text-body-1">Name</label>
              <v-text-field
                id="name"
                v-model="form.name"
                class="mt-3"
                placeholder="Input name"
                :rules="errors"
                :success="valid"
                :loading="isSubmiting"
                solo
                required
                clearable
              />
            </validation-provider>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <validation-provider v-slot="{ valid, errors }" rules="required" name="role">
              <label for="role" class="text-body-1">Role</label>
              <v-select
                id="role"
                v-model="form.role"
                class="mt-3 text-capitalize"
                placeholder="Select role"
                :items="roleItems"
                :rules="errors"
                :success="valid"
                :loading="isSubmiting"
                solo
                required
                clearable
              />
            </validation-provider>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <validation-provider v-slot="{ valid, errors }" rules="required" vid="form.password" name="password">
              <label for="password" class="text-body-1">Password</label>
              <v-text-field
                id="password"
                v-model="form.password"
                class="mt-3"
                placeholder="Input password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                :rules="errors"
                :success="valid"
                :loading="isSubmiting"
                solo
                required
                clearable
                @click:append="show1 = !show1"
              />
            </validation-provider>
          </v-col>

          <v-col cols="12" sm="6">
            <validation-provider v-slot="{ valid, errors }" name="re-type password" rules="required|confirmed:form.password">
              <label for="rePassword" class="text-body-1">Re-type Password</label>
              <v-text-field
                id="rePassword"
                v-model="rePassword"
                class="mt-3"
                placeholder="Input password again"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                :rules="errors"
                :success="valid"
                :loading="isSubmiting"
                solo
                required
                clearable
                @click:append="show2 = !show2"
              />
            </validation-provider>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn text color="red" @click="cancel">
              Cancel
            </v-btn>
          </v-col>
          <v-col>
            <v-btn :loading="isSubmiting" :disabled="invalid" color="primary" type="submit">
              Create
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </validation-observer>
  </v-container>
</template>

<script>
import qs from 'querystring'
import { initRole } from '@/utils'

export default {
  meta: {
    crumbs: [{
      to: '/superadmin/user-management/',
      exact: true,
      text: 'User Management'
    }, {
      to: '/superadmin/user-management/create',
      exact: true,
      text: 'Create User'
    }]
  },
  middleware: 'superadminscl',

  data () {
    return {
      isSubmiting: false,
      form: {
        email: '',
        name: '',
        role: '',
        password: ''
      },
      roleItems: initRole,
      rePassword: '',
      success: false,

      show1: false,
      show2: false
    }
  },

  computed: {
    observer () { return this.$refs.observer }
  },

  methods: {
    async on_submit () {
      this.isSubmiting = true
      await this.$axios.$post('/api/e_do/users', qs.stringify(this.form))
        .then((response) => {
          this.$toast.global.app_success(`User ${this.forms.name} successfully created`)
          this.cancel()
        })
        .catch((err) => {
          err && this.$toast.global.app_error(`User ${this.forms.name} failed to delete.`)
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
  },

  fetchOnServer: false
}
</script>
