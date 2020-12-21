<template>
  <v-dialog v-model="dialogModel" transition="slide-y-transition" max-width="768px" persistent>
    <v-alert
      tile
      border="right"
      colored-border
      type="error"
      elevation="2"
      class="pt-5 ma-0"
    >
      <ValidationObserver ref="rejectionObserver" v-slot="{ handleSubmit, invalid }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <v-card :loading="loading" flat class="pa-0 mt-n1">
            <v-card-title class="pt-0">
              Reject this e-DO &nbsp;<span style="color: #3273DC !important">{{ edoNumber }}</span> ?
              <v-spacer />
              <v-btn icon @click.prevent="_closeDialogReject">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>

            <v-card-text class="py-0">
              <ValidationProvider v-slot="{ errors }" name="Note rejection" rules="required">
                <label for="rejectNotes">Notes</label>
                <v-textarea
                  id="rejectNotes"
                  v-model.trim="form.description"
                  class="mt-3"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  placeholder="Enter your comment here"
                  solo
                  required
                />
              </ValidationProvider>
            </v-card-text>

            <v-card-actions class="px-5">
              <v-spacer />
              <v-btn text color="error" @click.prevent="onCancel">
                Cancel
              </v-btn>
              <v-btn
                color="error"
                :loading="loading"
                type="submit"
                :disabled="invalid || loading"
              >
                Yes, Reject
              </v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </ValidationObserver>
    </v-alert>
  </v-dialog>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    loading: { type: Boolean, default: false, required: true },
    dialog: { type: Boolean, default: false, required: true },
    edoNumber: { type: String, default: '', required: true }
  },
  data () {
    return {
      dialogModel: this.dialog,
      form: {
        description: ''
      }
    }
  },
  computed: {
    observer () { return this.$refs.rejectionObserver }
  },
  watch: {
    dialog (newValue) {
      this.dialogModel = newValue
    }
  },
  methods: {
    onSubmit () {
      this.$emit('onSubmit', {
        form: this.form
      })
      this.reset()
      // setTimeout(() => {
      // }, 1000);
    },
    onCancel () {
      this.$emit('onCancel')
      this.reset()
    },
    reset () {
      this.form.description = ''
      this.observer.reset()
    }
  }
}
</script>
