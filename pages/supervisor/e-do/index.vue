<template>
  <v-container class="mx-auto px-md-5">
    <card-list-status-edo :count="count" />

    <v-row justify="space-between" align="end" class="my-10">
      <v-col cols="12" md="7">
        <v-row align="end" class="py-0">
          <!-- Search e-DO -->
          <v-col cols="12" sm>
            <v-text-field
              v-model="search"
              :disabled="$fetchState.pending"
              prepend-inner-icon="mdi-magnify"
              label="Search e-DO"
              solo
              hide-details
              rounded
              clearable
            />
          </v-col>
          <!-- end Search e-DO -->

          <!-- Filter by -->
          <v-col cols="12" sm="auto">
            <v-btn large :disabled="$fetchState.pending" @click.stop="dialog_filter = true">
              Filter By <v-icon>mdi-filter-outline</v-icon>
            </v-btn>
          </v-col>
          <!-- end Filter by -->

          <!-- Show data action -->
          <v-col cols="12" sm="2">
            <v-row no-gutters align="end">
              <v-col cols="12">
                Show Data
              </v-col>
              <v-col class="mt-3">
                <v-text-field
                  :disabled="$fetchState.pending"
                  :value="itemsPerPage"
                  label="Show Data"
                  type="number"
                  min="-1"
                  solo
                  hide-details
                  @input="itemsPerPage = parseInt($event)"
                />
              </v-col>
            </v-row>
          </v-col>
          <!-- end Show data action -->
        </v-row>
      </v-col>
    </v-row>

    <!-- Table -->
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-skeleton-loader :loading="$fetchState.pending" type="table">
          <v-data-table
            :headers="tabelHeaders"
            :items="tabelDataFilter"
            :search.sync="search"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            class="py-6"
            loading-text="Loading... Please wait"
            hide-default-footer
            calculate-widths
            @page-count="pageCount = $event"
            @pagination="pagination = $event"
          >
            <!-- Released at -->
            <template v-slot:[`item.released_at`]="{ item }">
              <div class="py-md-6 text-subtitle-2">
                {{ datetime_formated(item.released_at) }}
              </div>
            </template>
            <!-- end Relased at -->

            <!-- House BL number -->
            <template v-slot:[`item.house_bl_number`]="{ item }">
              <div class="py-md-6 text-subtitle-2">
                {{ item.house_bl_number }}
              </div>
            </template>
            <!-- end House BL number -->

            <!-- e-DO number -->
            <template v-slot:[`item.edo_number`]="{ item }">
              <div class="py-md-6 text-subtitle-2">
                {{ item.edo_number }}
              </div>
            </template>
            <!-- end e-DO number -->

            <!-- Consignee name -->
            <template v-slot:[`item.consignee_name`]="{ item }">
              <div class="py-md-6 text-subtitle-2">
                {{ item.consignee_name }}
              </div>
            </template>
            <!-- end Consignee name -->

            <!-- Created at -->
            <template v-slot:[`item.created_at`]="{ item }">
              <div class="py-md-6 text-subtitle-2">
                {{ datetime_formated(item.created_at) }}
              </div>
            </template>
            <!-- end Created at -->

            <!-- Status e-DO -->
            <template v-slot:[`item.status`]="{ item }">
              <div class="py-md-6 text-subtitle-2" :style="`color: ${getColor(item.status)}`">
                {{ item.status }}
              </div>
            </template>
            <!-- end Status e-DO -->

            <!-- Detail action -->
            <template v-slot:[`item.detail`]="{ item }">
              <v-btn
                text
                nuxt
                class="text-capitalize"
                :to="`${$route.path}/detail/${item.edo_number}`"
              >
                Detail
              </v-btn>
            </template>
            <!-- end Detail action -->
          </v-data-table>
        </v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row align="center" justify="space-between">
      <!-- Showing -->
      <v-col v-show="pageCount" cols="12" sm="6">
        <v-skeleton-loader :loading="$fetchState.pending" type="text">
          <div>Showing {{ pagination.pageStop - pagination.pageStart }} of {{ pagination.itemsLength }} data</div>
        </v-skeleton-loader>
      </v-col>
      <!-- end Showing -->

      <!-- Pagination table -->
      <v-col v-show="pageCount" cols="12" sm="6" md="3">
        <v-skeleton-loader v-if="$fetchState.pending" type="text" />
        <v-pagination
          v-else
          v-model="page"
          circle
          :length="pageCount"
        />
      </v-col>
      <!-- end Pagination table -->
    </v-row>

    <!-- Dialog Filter -->
    <v-dialog
      v-model="dialog_filter"
      persistent
      max-width="500px"
      transition="slide-y-reverse-transition"
    >
      <v-card>
        <v-toolbar flat>
          <span class="headline">Filter by</span>
          <v-spacer />
          <v-btn icon @click.stop="dialog_filter = !dialog_filter">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-divider />

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="menuDateFrom"
                  v-model="menuDateFrom"
                  :close-on-content-click="false"
                  :return-value.sync="dateFrom"
                  transition="slide-x-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFrom"
                      label="Start date from"
                      prepend-inner-icon="mdi-calendar"
                      clearable
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker v-model="dateFrom" no-title>
                    <v-spacer />
                    <v-btn text color="primary" @click="menuDateFrom = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menuDateFrom.save(dateFrom)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6">
                <v-menu
                  ref="menuDateTo"
                  v-model="menuDateTo"
                  :close-on-content-click="false"
                  :return-value.sync="dateTo"
                  transition="slide-x-reverse-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateTo"
                      label="End date to"
                      prepend-inner-icon="mdi-calendar"
                      clearable
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker v-model="dateTo" no-title>
                    <v-spacer />
                    <v-btn text color="primary" @click="menuDateTo = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menuDateTo.save(dateTo)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  v-model="statusSearch"
                  :items="[{
                    text: 'All',
                    value: 'ALL'
                  }, {
                    text: 'Unpaid',
                    value: 'UNPAID'
                  }, {
                    text: 'Paid',
                    value: 'PAID'
                  }, {
                    text: 'Rejected',
                    value: 'REJECTED'
                  }, {
                    text: 'Released',
                    value: 'RELEASED'
                  }, {
                    text: 'On Hold',
                    value: 'ON HOLD'
                  }]"
                  item-text="text"
                  item-value="value"
                  label="Status"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="houseBlSearch"
                  label="House BL Number"
                  clearable
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="vesselSearch"
                  label="Vessel Name"
                  clearable
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click.stop="dialog_filter = false">
            Cancel
          </v-btn>
          <v-btn color="primary" @click.prevent="on_submit_filter">
            Filter now
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end Dialog Filter -->
  </v-container>
</template>

<script>
import _ from 'lodash'
import CardListStatusEdo from '@/components/CardListStatusEdo.vue'
import {
  getColorStatus,
  HeaderTabSupervisorEDO
} from '@/utils'
export default {
  meta: {
    crumbs: [{
      text: 'Dashboard',
      exact: true,
      to: '/supervisor/e-do'
    }]
  },
  components: {
    CardListStatusEdo
  },
  async fetch () {
    await this.get_all()
  },
  data () {
    return {
      count: {
        total: null,
        requested: null,
        approved: null,
        rejected: null,
        picked_up: null
      },

      modalDeleteDialog: false,
      loadingDelete: false,
      contextDelete: {
        edo_id: '',
        edo_number: ''
      },

      search: '',

      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      pagination: {},

      tabelHeaders: HeaderTabSupervisorEDO,
      tabelData: [],
      allEdo: [],
      tabelDataFilter: [],

      // filter
      dialog_filter: false,
      menuDateFrom: false,
      menuDateTo: false,
      statusSearch: 'ALL',
      inputSearch: '',
      vesselSearch: '',
      houseBlSearch: '',
      dateTo: '',
      dateFrom: ''
    }
  },
  fetchOnServer: false,
  watch: {
    allEdo (val) {
      const notPickedUp = _.filter(val, function (o) {
        return _.upperCase(o.status) !== 'PICKED UP'
      })

      this.tabelData = notPickedUp && notPickedUp
      this.tabelDataFilter = notPickedUp && notPickedUp
    },

    // statusSearch (val) {
    //   const filteredEdo = val === 'ALL' || val === undefined ? this.tabelData : _.filter (this.tabelData, { status: val })
    //   this.tabelDataFilter= filteredEdo
    // },
    houseBlSearch (newVal) {
      const filteredEdo = !newVal
        ? this.tabelData
        : _.filter(this.tabelData, { house_bl_number: newVal })
      this.tabelDataFilter = filteredEdo
    },
    vesselSearch (newVal) {
      const filteredEdo = !newVal
        ? this.tabelData
        : _.filter(this.tabelData, { ocean_vessel: newVal })
      this.tabelDataFilter = filteredEdo
    }
  },
  methods: {
    /**
     * Get e-DO & Get total e-DO
     */
    async get_all () {
      this.$toast.global.app_loading()
      await Promise.all([
        this.get_all_edo(),
        this.get_total_edo()
      ])
        .then(() => {
          this.$toast.clear()
        })
    },
    /**
     * Get e-DO (all e-DO)
     */
    async get_all_edo () {
      try {
        const response = await this.$axios.get('/api/e_do')
        if (response.status === 200) {
          const { data } = response.data
          this.allEdo = data
        }
      } catch (error) {
        this.$toast.global.app_error('Failed to load e-DO.')
      }
    },
    /**
     * Get total e-DO
     */
    async get_total_edo () {
      try {
        const response = await this.$axios.get('/api/e_do/total_e_do')
        if (response.status === 200) {
          const { data } = response
          this.count = data
        }
      } catch (error) {
        this.$toast.global.app_error('Failed to get total e-DO.')
      }
    },
    /**
     * Datetime format
     */
    datetime_formated (params) {
      const dateFormated = this.$moment(params)

      if (!dateFormated.isValid()) { return '-' }
      return dateFormated.format('DD/MM/YYYY - hh:mm:ss')
    },
    /**
     * Submit filter
     */
    on_submit_filter () {
      const filteredStatusEdo = this.statusSearch === 'ALL' || this.statusSearch === undefined
        ? this.tabelData
        : _.filter(this.tabelData, { status: this.statusSearch })
      const filteredDatebetweenEdo = _.filter(filteredStatusEdo, (data) => {
        if (!this.dateFrom && !this.dateTo) { return true } else if (!this.dateTo) {
          return this.$moment(data.created_at).isSameOrAfter(this.dateFrom)
        } else if (!this.dateFrom) {
          return this.$moment(data.created_at).isSameOrBefore(this.dateTo)
        } else {
          return this.$moment(data.created_at).isBetween(this.dateFrom, this.dateTo)
        }
      })

      this.tabelDataFilter = filteredDatebetweenEdo || filteredStatusEdo
      this.dialog_filter = false
    },

    getColor (params) { return getColorStatus(params) }
  },
  head: {
    title: 'Supervisor Dashboard - SCL e-DO'
  }
}
</script>
