<template>
  <div>
    <v-skeleton-loader
      :loading="pending"
      type="table"
    >
      <v-data-table
        :loading="pending"
        :headers="headers"
        :items="dataFiltered"
        :page.sync="page"
        :search.sync="search"
        :items-per-page.sync="itemsPerPage"
        loading-text="Loading... Please wait"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template #top="{ pagination }">
          <table-header-admin-edo
            :pending="pending"
            :total="pagination.itemsLength"
            :items-per-page="itemsPerPage"
            :search="search"
            @input-per-page="itemsPerPage = $_.toInteger($event)"
            @search="search = $event"
            @click-filter-by="filter_edo_history = true"
          />
        </template>

        <template #[`item.released_at`]="{ item: { released_at } }">
          <div class="py-md-5 my-md-4 text-subtitle-2">
            {{ formatDateTime(released_at) }}
          </div>
        </template>

        <template #[`item.house_bl_number`]="{ item: { house_bl_number } }">
          <div class="py-md-5 my-md-4 text-subtitle-2">
            {{ house_bl_number }}
          </div>
        </template>

        <template #[`item.edo_number`]="{ item: { edo_number } }">
          <div class="py-md-5 my-md-4 text-subtitle-2">
            {{ edo_number }}
          </div>
        </template>

        <template #[`item.consignee_name`]="{ item: { consignee_name } }">
          <div class="py-md-5 my-md-4">
            <v-tooltip bottom transition="fade-transition">
              <template #activator="{on, attrs}">
                <span
                  class="text-subtitle-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ consignee_name | truncate(25) }}
                </span>
              </template>

              <span>{{ consignee_name }}</span>
            </v-tooltip>
          </div>
        </template>

        <template #[`item.created_at`]="{ item: { created_at } }">
          <div class="py-md-5 my-md-4 text-subtitle-2">
            {{ formatDateTime(created_at) }}
          </div>
        </template>

        <template #[`item.status`]="{ item: { status } }">
          <div
            class="py-md-5 my-md-4 text-subtitle-2"
            :style="`color: ${getHexStatusColor(status)}`"
          >
            {{ status }}
          </div>
        </template>

        <template #[`item.detail`]="{ item: { edo_number } }">
          <v-btn
            text
            nuxt
            exact
            :to="`${$route.path}/detail/${edo_number}`"
            class="text-capitalize"
          >
            Detail
          </v-btn>
        </template>

        <!-- footer -->
        <template #footer="{ props: { pagination } }">
          <v-row
            v-show="pagination.itemsLength"
            align="center"
            justify-sm="space-between"
            class="mt-15"
          >
            <v-col cols="auto">
              Showing
              <span class="mx-1">{{ pagination.pageStart + 1 }}</span>
              -
              <span class="mx-1">{{ pagination.pageStop }}</span>
              of
              <span class="mx-1">{{ pagination.itemsLength }}</span>
              data
            </v-col>

            <v-col cols="auto">
              <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="10"
                circle
              />
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-skeleton-loader>

    <dialog-filter-edo-history
      @submit-filter="submitFilter"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { HeaderTableTabHistory } from '~/utils'
import DialogFilterEdoHistory from '~/components/dialog/DialogFilterEdoHistory.vue'
import TableHeaderAdminEdo from '~/components/table/TableHeaderAdminEdo.vue'

export default {
  components: {
    DialogFilterEdoHistory,
    TableHeaderAdminEdo
  },
  data: () => ({
    headers: HeaderTableTabHistory,
    page: 1,
    itemsPerPage: 5,
    pageCount: 0,
    search: '',
    filter: []
  }),
  computed: {
    ...mapGetters([
      'pending',
      'edos'
    ]),
    ...mapFields('form', [
      'dialog.filter_edo_history',
      'edo_history.status',
      'edo_history.date_to',
      'edo_history.date_from',
      'edo_history.house_bl_number',
      'edo_history.vessel_name'
    ]),
    dataFiltered: {
      // eslint-disable-next-line
      get: function () {
        return this.filter
      },
      // eslint-disable-next-line
      set: function (v) {
        this.filter = v
      }
    }
  },
  watch: {
    edos (newVal) {
      if (_.isEmpty(newVal.data)) { return null }

      this.dataFiltered = _.filter(newVal.data, obj => (
        _.upperCase(obj.status) !== 'UNPAID')
      )
    }
  },
  mounted () {
    if (_.isEmpty(this.edos) || _.isEmpty(this.edos.data)) { return null }

    this.dataFiltered = _.filter(this.edos.data, obj => (
      _.upperCase(obj.status) !== 'UNPAID')
    )
  },
  methods: {
    submitFilter () {
      let baseData = _.filter(this.edos.data, obj => (
        _.upperCase(obj.status) !== 'UNPAID')
      )

      // date from & to
      if (this.date_from && this.date_to) {
        baseData = _.filter(baseData, obj => (
          this.$moment(obj.created_at)
            .isBetween(this.date_from, this.date_to)
        ))
      } else if (this.date_from && _.isEmpty(this.date_to)) {
        baseData = _.filter(baseData, obj => (
          this.$moment(obj.created_at)
            .isSameOrAfter(this.date_from)
        ))
      } else if (this.date_to && _.isEmpty(this.date_from)) {
        baseData = _.filter(baseData, obj => (
          this.$moment(obj.created_at)
            .isSameOrBefore(this.date_to)
        ))
      }

      // status
      if (this.status !== 'ALL') {
        baseData = _.filter(baseData, { status: this.status })
      }

      // house bl
      if (!_.isEmpty(this.house_bl_number)) {
        baseData = _.filter(baseData, obj => (
          _.includes(obj.house_bl_number, this.house_bl_number)
        ))
      }

      // vessel
      if (!_.isEmpty(this.vessel_name)) {
        baseData = _.filter(baseData, obj => (
          _.includes(obj.ocean_vessel, this.vessel_name)
        ))
      }

      this.dataFiltered = baseData
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-data-table {
  background-color: transparent !important;
  .v-data-table__wrapper {
    background-color: #FFFFFF;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14),
      0px 1px 3px 0px rgba(0, 0, 0, 0.12) !important;
    padding-top: 20px !important;
    padding-bottom: 20px !important;

    @media #{map-get($display-breakpoints, 'sm-and-up')} {
      padding-right: 24px !important;
      padding-left: 24px !important;
    }
  }
}
</style>
