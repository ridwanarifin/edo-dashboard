<template>
  <div class="px-5 py-5">
    <v-row>
      <!-- Alert Status e-DO -->
      <v-col cols="12">
        <template>
          <v-alert
            v-show="alert.show"
            :icon="alert.icon"
            :type="alert.type"
            width="calc(100vw - 200)"
            transition="slide-x-reverse-transition"
            outlined
          >
            {{ alert.message }}
          </v-alert>
        </template>
      </v-col>
      <!-- end Alert Status e-DO -->
    </v-row>

    <v-row>
      <!-- Card Status e-DO -->
      <v-col cols="12" sm="6">
        <v-skeleton-loader v-if="$fetchState.pending" loading type="image" min-width="90" height="104" />
        <card-secondary-status-edo
          v-else
          :color="card.color"
          :icon="card.icon"
          :title="card.title"
          :status="card.status"
        />
      </v-col>
      <!-- end Card Status e-DO -->
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-row>
          <!-- Created At -->
          <v-col cols="12" sm>
            <div class="label">
              Created At
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" loading type="text" />
            <div v-else class="font-weight-bold">
              {{ created_at_formated }}
            </div>
          </v-col>
          <!-- end Created At -->

          <!-- Created By -->
          <v-col cols="12" sm>
            <div class="label">
              Created By
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" loading type="text" />
            <div v-else class="font-weight-bold text-capitalize">
              {{ edo.created_by }}
            </div>
          </v-col>
          <!-- end Created By -->

          <!-- Status e-DO -->
          <v-col cols="12" sm>
            <div class="label">
              Status
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" loading type="text" />
            <div v-else class="font-weight-bold" :style="{color: colors(edo.status)}">
              {{ edo.status }}
            </div>
          </v-col>
          <!-- end Status e-DO -->
        </v-row>
      </v-col>

      <v-col cols="12" sm>
        <v-row justify-sm="end">
          <!-- QrCode -->
          <v-skeleton-loader v-if="$fetchState.pending" loading type="image" width="80" height="80" />
          <qrcode
            v-else
            :value="edo.edo_number"
            :options="{width: 80, height: 80}"
          />
          <!-- end QrCode -->

          <!-- e-DO Number -->
          <div class="ml-3 d-flex flex-column justify-center">
            <div class="label">
              e-DO Number
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" loading type="text" />
            <div v-else class="font-weight-bold">
              {{ edo.edo_number }}
            </div>
          </div>
          <!-- end e-DO Number -->
        </v-row>
      </v-col>
    </v-row>
    <v-divider class="my-8" />

    <v-row>
      <v-col>
        <v-row>
          <!-- Shipper name -->
          <v-col cols="12" sm>
            <div class="label">
              Shipper name
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. shipper_name }}
            </div>
          </v-col>
          <!-- end Shipper name -->

          <!-- Consignee name -->
          <v-col cols="12" sm>
            <div class="label">
              Consignee name
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. consignee_name }}
            </div>
          </v-col>
          <!-- end Consignee name -->
        </v-row>

        <v-row>
          <!-- Shipper e-mail -->
          <v-col cols="12" sm>
            <div class="label">
              Shipper e-mail
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. shipper_email || '-' }}
            </div>
          </v-col>
          <!-- end Shipper e-mail -->

          <!-- Consignee e-mail -->
          <v-col cols="12" sm>
            <div class="label">
              Consignee e-mail
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. consignee_email }}
            </div>
          </v-col>
          <!-- end Consignee e-mail -->
        </v-row>

        <v-row>
          <!-- Shipper address -->
          <v-col cols="12" sm>
            <div class="label">
              Shipper address
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. shipper_address }}
            </div>
          </v-col>
          <!-- end Shipper address -->

          <!-- Consignee address -->
          <v-col cols="12" sm>
            <div class="label">
              Consignee address
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. consignee_address }}
            </div>
          </v-col>
          <!-- end Consignee address -->
        </v-row>

        <v-row>
          <!-- Notify -->
          <v-col cols="12" sm>
            <div class="label">
              Notify
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. notify }}
            </div>
          </v-col>
          <!-- end Notify -->

          <!-- House BL Number -->
          <v-col cols="12" sm>
            <div class="label">
              House BL Number
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. house_bl_number }}
            </div>
          </v-col>
          <!-- end House BL Number -->
        </v-row>

        <v-row>
          <!-- Notify address -->
          <v-col cols="12" sm>
            <div class="label">
              Notify Address
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. notify }}
            </div>
          </v-col>
          <!-- end Notify address -->
        </v-row>

        <v-row>
          <!-- MBL number -->
          <v-col cols="12" sm>
            <div class="label">
              MB/L Number
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. mbl_number }}
            </div>
          </v-col>
          <!-- end MBL number -->

          <!-- House BL date -->
          <v-col cols="12" sm>
            <div class="label">
              House BL Date
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. house_bl_date }}
            </div>
          </v-col>
          <!-- end House BL date -->
        </v-row>

        <v-row>
          <!-- Arrival date -->
          <v-col cols="12" sm>
            <div class="label">
              Arrival Date (ETA)
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. arrival_date }}
            </div>
          </v-col>
          <!-- end Arrival date -->

          <!-- Place of receipt -->
          <v-col cols="12" sm>
            <div class="label">
              Place of receipt
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. place_of_receipt }}
            </div>
          </v-col>
          <!-- end Place of receipt -->
        </v-row>

        <v-row>
          <!-- Container seal number -->
          <v-col cols="12" sm>
            <div class="label">
              Container/Seal number
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. container_seal_number }}
            </div>
          </v-col>
          <!-- end Container seal number -->

          <!-- Ocean vessel -->
          <v-col cols="12" sm>
            <div class="label">
              Ocean vessel
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. ocean_vessel }}
            </div>
          </v-col>
          <!-- end Ocean vessel -->
        </v-row>

        <v-row>
          <!-- Port of lading -->
          <v-col cols="12" sm>
            <div class="label">
              Port of lading
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. port_of_loading }}
            </div>
          </v-col>
          <!-- end Port of lading -->

          <!-- Voyage number -->
          <v-col cols="12" sm>
            <div class="label">
              Voyage Number
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. voyage_number }}
            </div>
          </v-col>
          <!-- end Voyage number -->
        </v-row>

        <v-row>
          <!-- Final destination -->
          <v-col cols="12" sm>
            <div class="label">
              Final Destination
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. final_destination }}
            </div>
          </v-col>
          <!-- end Final destination -->

          <!-- Port of discharges -->
          <v-col cols="12" sm>
            <div class="label">
              Port of discharges
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. port_of_discharges }}
            </div>
          </v-col>
          <!-- end Port of discharges -->
        </v-row>

        <v-row>
          <!-- Gross weight -->
          <v-col cols="12" sm>
            <div class="label">
              Gross weight (Kg)
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. gross_weight }} KGM
            </div>
          </v-col>
          <!-- end Gross weight -->
        </v-row>

        <v-row>
          <!-- Number of package -->
          <v-col cols="12" sm>
            <div class="label">
              Number of Package
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. number_of_package }}
            </div>
          </v-col>
          <!-- end Number of package -->

          <!-- Measurement -->
          <v-col cols="12" sm>
            <div class="label">
              Measurement
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. measurment }} M3
            </div>
          </v-col>
          <!-- end Measurement -->
        </v-row>

        <v-row>
          <!-- Description of goods -->
          <v-col cols="12" sm>
            <div class="label">
              Description of goods
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. description_of_goods }}
            </div>
          </v-col>
          <!-- end Description of goods -->

          <!-- Marks and number -->
          <v-col cols="12" sm>
            <div class="label">
              Marks and number
            </div>
            <v-skeleton-loader v-if="$fetchState.pending" type="table-cell" />
            <div v-else class="text-h5">
              {{ edo. marks_and_number }}
            </div>
          </v-col>
          <!-- end Marks and number -->
        </v-row>
      </v-col>
    </v-row>

    <v-divider class="my-7" />

    <v-row justify="end" class="text-right">
      <v-btn color="primary" @click="() => $router.back()">
        Back to dashboard
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import _ from 'lodash'
import { getColorStatus } from '@/utils'
import * as Colors from '@/utils/colors'

export default {
  layout: 'spl',
  middleware ({ route, store }) {
    const crumbs = [{
      to: '/',
      exact: true,
      text: 'Dashboard',
      replace: true
    }, {
      to: route.path,
      exact: true,
      text: 'Detail e-DO'
    }]
    store.commit('breadcrumbs/setBreadcrumbs', crumbs)
  },
  async fetch () {
    try {
      this.$toast.global.app_loading()
      await this.search_edo()
      this.alert.message = `e-DO ${this.$route.params.id} is valid from SCL System`
      this.alert.type = 'success'
      this.alert.icon = 'mdi-checkbox-marked-circle-outline'
    } catch (error) {
      this.alert.message = `e-DO ${this.$route.params.id} is not valid or has been deleted from SCL System`
      this.alert.type = 'error'
      this.alert.icon = 'mdi-close-circle-outline'
    } finally {
      this.alert.show = true
      this.$toast.clear()
    }
  },
  fetchOnServer: false,
  data () {
    return {
      edo: {},
      confirmDelete: '',
      alert: {
        show: false,
        message: '',
        icon: 'mdi-checkbox-marked-circle-outline',
        type: 'success'
      },
      card: {
        title: 'e-DO Status',
        icon: '',
        color: '',
        status: ''
      }
    }
  },
  computed: {
    isNotEmpty () { return !_.isEmpty(this.edo) },
    isCanPickedUp () { return this.isNotEmpty && _.isEqual(this.edo.status, 'PAID') },
    created_at_formated () {
      const dateFormated = this.$moment(this.edo.created_at, 'DD-MM-YYYY hh:mm:ss', 'id')
      return dateFormated.isValid() ? dateFormated.format('DD/MM/YYYY hh:mm:ss') : this.edo.created_at
    }
  },
  watch: {
    edo (newVal) {
      const { status } = newVal
      this.get_card_status(status)
    }
  },
  methods: {
    colors (params) { return getColorStatus(params) },
    async search_edo () {
      try {
        const response = await this.$axios.get(`/api/e_do/search/e_do_number/${this.$route.params.id}`)
        if (response) {
          const { data } = response.data
          this.edo = data[0]
        }
      } catch (err) {
        this.$toast.global.app_error('Failed to get e-DO' + err.response.message)
      }
    },
    get_card_status (params) {
      const context = _.upperCase(params)
      this.card.status = _.isEqual('Hold on') ? 'On Hold' : _.capitalize(params)
      switch (context) {
        case 'PAID':
          this.card.icon = 'mdi-checkbox-marked-circle-outline'
          this.card.color = Colors.primary
          break
        case 'REJECTED':
          this.card.icon = 'mdi-close-circle-outline'
          this.card.color = Colors.danger
          break
        case 'RELEASED':
          this.card.icon = 'mdi-truck-outline'
          this.card.color = Colors.purple
          break
        case 'HOLD ON':
          this.card.icon = 'mdi-delta'
          this.card.color = Colors.warning
          break
        default:
          this.card.icon = 'mdi-magnify'
          this.card.color = Colors.link
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .label {
    color: #B5B5B5 !important;
  }
</style>
