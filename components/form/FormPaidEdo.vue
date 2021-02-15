<template>
  <v-alert
    tile
    colored-border
    type="info"
    border="top"
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
          :loading="pending"
          class="pa-0 mt-n1"
        >
          <v-card-text class="pt-2 pb-0">
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
              name="house b/l number"
              rules="confirmed:houseBlConfirm|required"
            >
              <label for="hbn">
                House B/L Number
              </label>

              <v-text-field
                id="hbn"
                v-model.lazy="house_bl_number"
                :loading="pending"
                :disabled="pending"
                :error-messages="errors"
                :clear-icon="$icon.mdiClose"
                solo
                required
                clearable
                class="mt-3"
                placeholder="Input house bl number"
              />
            </validation-provider>
          </v-card-text>

          <v-divider class="mb-4" />

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
              color="primary"
              :loading="pending"
              :disabled="pending"
            >
              Continue
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
      'dialog.paid_edo',
      'edo_paid.house_bl_number'
    ]),
    houseBlConfirm () { return this.houseBlNumber },
    observer () { return this.$refs.observer }
  },
  methods: {
    ...mapMutations('form', {
      resetEdoPaid: 'RESET_EDO_PAID'
    }),
    ...mapActions([
      'updatePaidEdo'
    ]),
    async on_submit () {
      await this.updatePaidEdo()
        .then(() => {
          this.on_cancel()
          this.$emit('submit-resolve')
        })
    },
    on_cancel () {
      this.observer.reset()
      this.resetEdoPaid()
      this.paid_edo = false
    }
  }
}
</script>
