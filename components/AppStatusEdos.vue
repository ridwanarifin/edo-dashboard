<template>
  <v-row align="center" justify="space-between">
    <template v-if="pending || $_.isEmpty(statusEdos)">
      <v-col
        v-for="item in 5"
        :key="item"
        cols="12"
        sm="6"
        md="3"
      >
        <v-skeleton-loader
          loading
          type="image"
          height="104"
          min-width="90"
        />
      </v-col>
    </template>

    <template v-else>
      <v-col
        v-for="(item, key) in statusEdos"
        :key="key"
        cols="12"
        sm="6"
        md="auto"
      >
        <card-status-edo
          :title="item.title"
          :color="item.color"
          :icon="item.icon"
          :count="item.count"
        />
      </v-col>
    </template>
  </v-row>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import CardStatusEdo from '~/components/CardStatusEdo.vue'

export default {
  components: { CardStatusEdo },
  data: () => ({
    items: []
  }),
  computed: {
    ...mapGetters([
      'pending',
      'count_status_edos'
    ]),
    statusEdos: {
      // eslint-disable-next-line
      get: function () {
        if (this.pending || _.isEmpty(this.count_status_edos)) { return [] }
        return this.items
      },
      // eslint-disable-next-line
      set: function (v) {
        this.items = v
      }
    }
  },
  watch: {
    count_status_edos (newVal) {
      this.statusEdos = [{
        title: 'Unpaid',
        color: this.getHexStatusColor('Unpaid'),
        icon: this.$icon.mdiCircleOutline,
        count: newVal.unpaid
      }, {
        title: 'Paid',
        color: this.getHexStatusColor('Paid'),
        icon: this.$icon.mdiCheckboxMarkedCircleOutline,
        count: newVal.paid
      }, {
        title: 'Rejected',
        color: this.getHexStatusColor('Rejected'),
        icon: this.$icon.mdiCloseCircleOutline,
        count: newVal.rejected
      }, {
        title: 'Released',
        color: this.getHexStatusColor('Released'),
        icon: this.$icon.mdiTruckOutline,
        count: newVal.released
      }, {
        title: 'On Hold',
        color: this.getHexStatusColor('On Hold'),
        icon: this.$icon.mdiDelta,
        count: newVal.hold_on ||
          newVal.on_hold
      }]
    }
  }
}
</script>
