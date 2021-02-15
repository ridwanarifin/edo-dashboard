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
  </v-container>
</template>

<script>
import _ from 'lodash'
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
    }
  }
}
</script>
