<template>
  <v-alert
    tile
    colored-border
    type="error"
    border="right"
    elevation="2"
    class="pt-5 ma-0"
  >
    <validation-observer
      ref="observer"
      v-slot="{ handleSubmit }"
    >
      <form
        @submit.prevent="handleSubmit(on_submit)"
        @reset.prevent="on_cancel"
      >
        <v-card
          flat
          tile
          :loading="pending"
          class="pa-0 mt-n1"
        >
          <v-card-title class="pt-0">
            Reject this e-DO
            <span class="text--info mx-1">
              {{ edo_number }}
            </span>
            ?
          </v-card-title>

          <v-card-text class="py-0">
            <div v-show="false">
              <validation-provider
                vid="houseBlConfirm"
              >
                <v-text-field
                  v-model="houseBlConfirm"
                  type="hidden"
                  readonly
                  hide-details
                />
              </validation-provider>
            </div>

            <validation-provider
              v-slot="{ errors }"
              name="house bl number"
              rules="confirmed:houseBlConfirm|required"
            >
              <label for="hbn">
                House BL Number
              </label>

              <v-text-field
                id="hbn"
                v-model.lazy="house_bl_number"
                :disabled="pending"
                :loading="pending"
                :error-messages="errors"
                :clear-icon="$icon.mdiClose"
                solo
                required
                clearable
                class="mt-3"
                placeholder="Input house bl number"
              />
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="notes"
              rules="required"
            >
              <label for="nt">
                Notes
              </label>

              <v-textarea
                id="nt"
                v-model.lazy="description"
                :disabled="pending"
                :loading="pending"
                :error-messages="errors"
                :clear-icon="$icon.mdiClose"
                solo
                required
                clearable
                class="mt-3"
                placeholder="Enter your comment here"
              />
            </validation-provider>
          </v-card-text>

          <v-divider class="my-4" />

          <v-card-actions class="justify-sm-end">
            <v-btn
              text
              type="reset"
              color="error"
              :loading="pending"
            >
              Cancel
            </v-btn>

            <v-btn
              type="submit"
              color="error"
              :loading="pending"
              :disabled="pending"
            >
              Yes, reject
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </validation-observer>
  </v-alert>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  props: {
    houseBlNumber: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState([
      'pending'
    ]),
    ...mapFields('form', [
      'edo_reject.edo_number',
      'edo_reject.house_bl_number',
      'edo_reject.description',
      'dialog.reject_edo'
    ]),
    houseBlConfirm () { return this.houseBlNumber },
    observer () { return this.$refs.observer }
  },
  methods: {
    ...mapMutations('form', {
      resetEdoReject: 'RESET_EDO_REJECT'
    }),
    ...mapActions([
      'updateRejectEdo'
    ]),
    async on_submit () {
      await this.updateRejectEdo()
        .then(() => {
          this.on_cancel()
          this.$emit('submit-resolve')
        })
    },
    on_cancel () {
      this.reject_edo = false
      this.resetEdoReject()
      this.observer.reset()
    }
  }
}
</script>
