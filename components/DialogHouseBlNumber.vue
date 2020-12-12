<template>
  <v-dialog v-model="dialogModel" transition="slide-y-transition" max-width="768px" persistent>
    <v-alert tile border="top" colored-border type="info" class="pt-5 ma-0">
      <validation-observer ref="observer" v-slot="{ handleSubmit, invalid }">
        <form @submit.prevent="handleSubmit(_onSubmit)">
          <v-card :loading="loading" flat class="pa-0 mt-n1">
            <v-card-text class="pt-2 pb-0">
              <validation-provider v-slot="{ errors }" name="House B/L Number" rules="required">
                <label for="houseBL">Input House B/L Number</label>
                <v-text-field
                  id="houseBL"
                  v-model="form.house_bl_number"
                  class="mt-3"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  placeholder="Input Here..."
                  solo
                />
              </validation-provider>
            </v-card-text>

            <v-card-actions class="px-5">
              <v-spacer />
              <v-btn :disabled="loading" text color="error" @click.prevent="_onCancel">
                Cancel
              </v-btn>
              <v-btn color="success" type="submit" :loading="loading" :disabled="invalid || loading">
                Continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </validation-observer>
    </v-alert>
  </v-dialog>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, required: true, default: false },
    dialog: { type: Boolean, required: true, default: false }
  },
  data () {
    return {
      dialogModel: this.dialog,
      form: {
        house_bl_number: ''
      }
    }
  },
  computed: {
    observer () {
      return this.$refs.observer
    }
  },
  watch: {
    dialog (newVal) {
      this.dialogModel = newVal
    }
  },
  methods: {
    _onSubmit () {
      this.$emit('onSubmit', {
        form: this.form
      })
      this.reset()
    },
    _onCancel () {
      this.$emit('onCancel')
      this.reset()
    },
    reset () {
      this.form.house_bl_number = ''
      this.observer.reset()
    }
  }
}
</script>
