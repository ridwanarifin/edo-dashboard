<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit, reset }"
  >
    <form
      @submit.prevent="handleSubmit(on_submit)"
      @reset.prevent="reset"
    >
      <v-row
        align="center"
        justify="space-between"
      >
        <!-- email -->
        <v-col
          cols="12"
          sm="6"
        >
          <validation-provider
            v-slot="{ errors }"
            rules="required|email"
            name="email"
          >
            <label
              for="email"
              class="text-body-1"
            >E-mail</label>

            <v-text-field
              id="email"
              v-model="email"
              :rules="errors"
              :loading="pending"
              :disabled="pending"
              :clear-icon="$icon.mdiClose"
              class="mt-3"
              type="email"
              placeholder="Input e-mail"
              clearable
              required
              solo
            />
          </validation-provider>
        </v-col>

        <!-- name -->
        <v-col
          cols="12"
          sm="6"
        >
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="name"
          >
            <label
              for="name"
              class="text-body-1"
            >Name</label>

            <v-text-field
              id="name"
              v-model="name"
              :rules="errors"
              :loading="pending"
              :disabled="pending"
              :clear-icon="$icon.mdiClose"
              class="mt-3"
              placeholder="Input name"
              clearable
              required
              solo
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row
        align="center"
        justify="space-between"
      >
        <!-- role -->
        <v-col
          cols="12"
          sm="6"
        >
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="role"
          >
            <label
              for="role"
              class="text-body-1"
            >Role</label>

            <v-autocomplete
              id="role"
              v-model="role"
              :items="roles"
              :rules="errors"
              :loading="pending"
              :disabled="pending"
              :clear-icon="$icon.mdiClose"
              class="mt-3 text-capitalize"
              placeholder="Choose role"
              clearable
              required
              solo
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row
        align="center"
        justify="space-between"
      >
        <!-- password -->
        <v-col
          cols="12"
          sm="6"
        >
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            vid="password"
            name="password"
          >
            <label
              for="password"
              class="text-body-1"
            >Password</label>

            <v-text-field
              id="password"
              v-model="password"
              :rules="errors"
              :loading="pending"
              :disabled="pending"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? $icon.mdiEye : $icon.mdiEyeOff"
              :clear-icon="$icon.mdiClose"
              placeholder="Input password"
              class="mt-3"
              clearable
              required
              solo
              @click:append.prevent="show1 = !show1"
            />
          </validation-provider>
        </v-col>

        <!-- retype password -->
        <v-col
          cols="12"
          sm="6"
        >
          <validation-provider
            v-slot="{ errors }"
            name="re-type password"
            rules="required|confirmed:password"
          >
            <label
              for="rePassword"
              class="text-body-1"
            >Re-type Password</label>

            <v-text-field
              id="rePassword"
              v-model="rePassword"
              :rules="errors"
              :loading="pending"
              :disabled="pending"
              :clear-icon="$icon.mdiClose"
              :type="show2 ? 'text' : 'password'"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              placeholder="Input password again"
              class="mt-3"
              clearable
              required
              solo
              @click:append.prevent="show2 = !show2"
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-divider />

      <v-row
        align="center"
        justify="space-between"
      >
        <v-col cols="auto">
          <v-btn
            text
            color="red"
            type="reset"
            :loading="pending"
            :disabled="pending"
            @click.prevent="cancel"
          >
            Cancel
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            type="submit"
            color="primary"
            :loading="pending"
            :disabled="pending"
          >
            Create
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </validation-observer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { initRole } from '@/utils'

export default {
  data: () => ({
    rePassword: null,
    roles: initRole,
    show1: false,
    show2: false
  }),
  computed: {
    ...mapGetters([
      'pending'
    ]),
    ...mapFields('form', [
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
      'createUser'
    ]),
    cancel () {
      this.observer.reset()
      this.user = {
        user_id: null,
        email: null,
        name: null,
        role: null,
        password: null
      }
    },
    async on_submit () {
      await this.createUser()
        .finally(() => {
          this.cancel()
          this.$router.replace('/superadmin/user-management')
        })
    }
  }
}
</script>
