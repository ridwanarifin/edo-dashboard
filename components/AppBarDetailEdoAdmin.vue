<template>
  <v-container class="mx-auto">
    <!-- alert -->
    <v-alert
      v-model.lazy="statusAlert.model"
      :color="statusAlert.color"
      :icon="statusAlert.icon"
      transition="slide-x-reverse-transition"
      outlined
      text
    >
      {{ statusAlert.title }}
    </v-alert>

    <v-row
      align="center"
      justify-sm="space-between"
    >
      <v-col
        cols="12"
        sm="auto"
      >
        <v-row align="center">
          <!-- print -->
          <v-col
            cols="12"
            sm="auto"
          >
            <v-btn
              :disabled="pending || !data"
              :loading="pending || !data"
              @click.prevent="createPDF(data)"
            >
              <span>Print</span>

              <v-icon
                class="ml-2"
                v-text="$icon.mdiPrinter"
              />
            </v-btn>
          </v-col>

          <!-- paid -->
          <v-col
            cols="12"
            sm="auto"
          >
            <v-btn
              :dark="isCanPaidAndReject"
              :loading="pending || !data"
              :disabled="pending || !data || !isCanPaidAndReject"
              :color="getHexStatusColor('paid')"
              @click.prevent="onPaid(data)"
            >
              <span>Paid</span>

              <v-icon
                class="ml-2"
                v-text="$icon.mdiCheckboxMarkedCircleOutline"
              />
            </v-btn>
          </v-col>

          <!-- send to consignee -->
          <v-col
            v-show="isCanSend"
            cols="12"
            sm="auto"
          >
            <v-btn
              dark
              link
              :loading="pending || !data"
              :color="getHexStatusColor('paid')"
              :href="`mailto:${data.consignee_email}`"
            >
              <span>Send to consignee</span>

              <v-icon
                class="ml-2"
                v-text="$icon.mdiCheckboxMarkedCircleOutline"
              />
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        cols="12"
        sm="auto"
      >
        <v-row
          align="center"
          justify-sm="space-between"
        >
          <!-- on hold -->
          <v-col
            cols="12"
            sm="auto"
          >
            <v-btn
              :dark="isCanHold"
              :loading="pending || !data"
              :disabled="pending || !data || !isCanHold"
              :color="getHexStatusColor('on hold')"
              @click.prevent="onHold(data)"
            >
              <span>Hold this e-DO</span>

              <v-icon
                class="ml-2"
                v-text="$icon.mdiDelta"
              />
            </v-btn>
          </v-col>

          <!-- reject -->
          <v-col
            cols="12"
            sm="auto"
          >
            <v-btn
              :dark="isCanPaidAndReject"
              :loading="pending || !data"
              :disabled="pending || !data || !isCanPaidAndReject"
              :color="getHexStatusColor('rejected')"
              @click.prevent="onReject(data)"
            >
              <span>Reject</span>

              <v-icon
                class="ml-2"
                v-text="$icon.mdiCloseCircleOutline"
              />
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from 'lodash'
import { mapMutations } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  props: {
    pending: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    alert: {
      rejected: false,
      on_hold: false,
      released: false
    },
    contextAlert: {
      model: false,
      title: null,
      color: null,
      icon: null
    }
  }),
  computed: {
    ...mapFields('form', [
      'dialog.hold_edo',
      'dialog.paid_edo',
      'dialog.reject_edo'
    ]),
    statusAlert: {
      // eslint-disable-next-line
      get: function () {
        return this.contextAlert
      },
      // eslint-disable-next-line
      set: function (v) {
        this.contextAlert = this.setContextAlert(v)
      }
    },
    isCanPaidAndReject () {
      if (this.pending || !this.data) { return false }

      const a = _.upperCase(this.data.status)
      return _.isEqual(a, 'UNPAID') ||
      _.isEqual(a, 'ON HOLD') ||
      _.isEqual(a, 'HOLD ON')
    },
    isCanSend () {
      if (this.pending || !this.data) { return false }

      const a = _.upperCase(this.data.status)
      return _.isEqual(a, 'PAID')
    },
    isCanHold () {
      if (this.pending || !this.data) { return false }

      const a = _.upperCase(this.data.status)
      return _.isEqual(a, 'PAID')
    }
  },
  watch: {
    data (newVal) {
      this.statusAlert = newVal
    }
  },
  methods: {
    setContextAlert (params) {
      const c = params && _.upperCase(params.status)
      switch (c) {
        case 'REJECTED':
          return {
            model: true,
            title: `e-DO ${params.edo_number} has been Rejected at ${params.rejected_at}`,
            color: this.getHexStatusColor(c),
            icon: this.$icon.mdiAlertOctagonOutline
          }
        case 'RELEASED':
          return {
            model: true,
            title: `e-DO ${params.edo_number} has been Released at ${params.released_at}`,
            color: this.getHexStatusColor(c),
            icon: this.$icon.mdiCheckboxMarkedCircleOutline
          }
        case 'ON HOLD':
          return {
            model: true,
            title: `e-DO ${params.edo_number} has been Hold at ${params.reissued_at}`,
            color: this.getHexStatusColor(c),
            icon: this.$icon.mdiDelta
          }
        default:
          return {
            model: false,
            title: null,
            color: null,
            icon: null
          }
      }
    },
    ...mapMutations('form', [
      'updateField'
    ]),
    onPaid (params) {
      this.updateField({
        path: 'edo_paid.edo_id',
        value: params.edo_id
      })
      this.updateField({
        path: 'edo_paid.edo_number',
        value: params.edo_number
      })
      this.paid_edo = true
    },
    onHold (params) {
      this.updateField({
        path: 'edo_hold.edo_id',
        value: params.edo_id
      })
      this.updateField({
        path: 'edo_hold.edo_number',
        value: params.edo_number
      })
      this.hold_edo = true
    },
    onReject (params) {
      this.updateField({
        path: 'edo_reject.edo_id',
        value: params.edo_id
      })
      this.updateField({
        path: 'edo_reject.edo_number',
        value: params.edo_number
      })
      this.reject_edo = true
    }
  }
}
</script>
