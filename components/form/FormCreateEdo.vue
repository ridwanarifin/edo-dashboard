<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit }"
  >
    <form
      @submit.prevent="handleSubmit(on_submit)"
      @reset.prevent="on_cancel"
    >
      <v-row
        align="center"
        justify-sm="space-between"
      >
        <!-- shipper name -->
        <v-col
          cols="12"
          sm="6"
        >
          <validation-provider
            v-slot="{ errors }"
            name="shipper name"
            rules="required"
          >
            <label for="sn">
              Shipper Name
            </label>

            <v-text-field
              id="sn"
              v-model.lazy="shipper_name"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input shipper name"
            />
          </validation-provider>
        </v-col>

        <!-- consignee name -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="cn">
            Consignee Name
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="consignee name"
            rules="required"
          >
            <v-text-field
              id="cn"
              v-model.lazy="consignee_name"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input consignee name"
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row
        align="center"
        justify-sm="space-between"
      >
        <!-- shipper email -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="se">
            Shipper Email
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="shipper email"
            rules="required|email"
          >
            <v-text-field
              id="se"
              v-model.lazy="shipper_email"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input shipper email"
            />
          </validation-provider>
        </v-col>

        <!-- consignee email -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="ce">
            Consignee Email
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="consignee email"
            rules="required|email"
          >
            <v-text-field
              id="ce"
              v-model.lazy="consignee_email"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input consignee email"
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row
        align="center"
        justify-sm="space-between"
      >
        <!-- shipper address -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="sa">
            Shipper Address
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="shipper address"
            rules="required"
          >
            <v-textarea
              id="sa"
              v-model.lazy="shipper_address"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input shipper address"
            />
          </validation-provider>
        </v-col>

        <!-- consignee address -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="ca">
            Consignee Address
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="consignee address"
            rules="required"
          >
            <v-textarea
              id="ca"
              v-model.lazy="consignee_address"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input consignee address"
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row
        align="center"
        justify-sm="space-between"
      >
        <!-- notify -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="n">
            Notify
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="notify"
            rules="required"
          >
            <v-text-field
              id="n"
              v-model.lazy="notify"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="notify to"
            />
          </validation-provider>
        </v-col>

        <!-- house bl number -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="hbn">
            House BL Number
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="house bl number"
            rules="required"
          >
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
        </v-col>
      </v-row>

      <v-row
        align="center"
        justify-sm="space-between"
      >
        <!-- notify address -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="na">
            Notify Address
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="notify address"
            rules="required"
          >
            <v-textarea
              id="na"
              v-model.lazy="notify_address"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input notify address"
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row
        align="center"
        justify-sm="space-between"
      >
        <!-- mb/l number -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="mn">
            MB/L Number
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="mb/l number"
            rules="required"
          >
            <v-text-field
              id="mn"
              v-model.lazy="mbl_number"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input mb/l number"
            />
          </validation-provider>
        </v-col>

        <!-- house bl date -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="hbd">
            House BL Date
          </label>

          <v-menu
            v-model.lazy="menu1"
            min-width="auto"
            max-width="290px"
          >
            <template #activator="{ on, attrs }">
              <validation-provider
                v-slot="{ errors }"
                name="house bl date"
                rules="required"
              >
                <v-text-field
                  id="hbd"
                  v-model.lazy="houseBLDateFormatted"
                  :loading="pending"
                  :disabled="pending"
                  :clear-icon="$icon.mdiClose"
                  :prepend-icon="$icon.mdiCalendar"
                  :error-messages="errors"
                  solo
                  readonly
                  required
                  clearable
                  persistent-hint
                  class="mt-3"
                  hint="DD/MM/YYYY"
                  placeholder="Choose house bl date"
                  v-bind="attrs"
                  v-on="on"
                />
              </validation-provider>
            </template>

            <v-date-picker
              v-model.lazy="house_bl_date"
              @input="menu1 = false"
            />
          </v-menu>
        </v-col>
      </v-row>

      <v-row
        align="center"
        justify-sm="space-between"
      >
        <!-- arrival date -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="ad">
            Arrival Date <small>(ETA)</small>
          </label>

          <v-menu
            v-model.lazy="menu2"
            min-width="auto"
            max-width="290px"
          >
            <template #activator="{ on, attrs }">
              <validation-provider
                v-slot="{ errors }"
                name="arrival date"
                rules="required"
              >
                <v-text-field
                  id="ad"
                  v-model.lazy="arrivalDateFormatted"
                  :loading="pending"
                  :disabled="pending"
                  :clear-icon="$icon.mdiClose"
                  :prepend-icon="$icon.mdiCalendar"
                  :error-messages="errors"
                  solo
                  readonly
                  required
                  clearable
                  persistent-hint
                  class="mt-3"
                  hint="DD/MM/YYYY"
                  placeholder="Choose arrival date"
                  v-bind="attrs"
                  v-on="on"
                />
              </validation-provider>
            </template>

            <v-date-picker
              v-model.lazy="arrival_date"
              @input="menu2 = false"
            />
          </v-menu>
        </v-col>

        <!-- place of receipt -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="pr">
            Place of Receipt
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="place of receipt"
            rules="required"
          >
            <v-text-field
              id="pr"
              v-model.lazy="place_of_receipt"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input place of receipt"
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row
        align="center"
        justify-sm="space-between"
      >
        <!-- container seal number -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="csn">
            Container Seal Number
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="place of receipt"
            rules="required"
          >
            <v-text-field
              id="csn"
              v-model.lazy="container_seal_number"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input container seal number"
            />
          </validation-provider>
        </v-col>

        <!-- ocean vessel -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="ov">
            Ocean Vessel
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="ocean vessel"
            rules="required"
          >
            <v-text-field
              id="ov"
              v-model.lazy="ocean_vessel"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input ocean vessel"
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row
        align="center"
        justify-sm="space-between"
      >
        <!-- port of lading -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="pl">
            Port of Lading
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="port of lading"
            rules="required"
          >
            <v-text-field
              id="pl"
              v-model.lazy="port_of_loading"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input port of lading"
            />
          </validation-provider>
        </v-col>

        <!-- voyage number -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="vn">
            Voyage Number
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="port of lading"
            rules="required"
          >
            <v-text-field
              id="vn"
              v-model.lazy="voyage_number"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input voyage number"
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row
        align="center"
        justify-sm="space-between"
      >
        <!-- final destination -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="fd">
            Final Destination
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="final destination"
            rules="required"
          >
            <v-text-field
              id="fd"
              v-model.lazy="final_destination"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input final destination"
            />
          </validation-provider>
        </v-col>

        <!-- port of discharge -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="pd">
            Port of Discharge
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="final destination"
            rules="required"
          >
            <v-text-field
              id="pd"
              v-model.lazy="port_of_discharges"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input port of discharge"
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row
        align="center"
        justify-sm="space-between"
      >
        <!-- gross weight -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="gw">
            Gross Weight
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="gross weight"
            rules="required"
          >
            <v-text-field
              id="gw"
              v-model.lazy="gross_weight"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              suffix="kg"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input gross weight"
            />
          </validation-provider>
        </v-col>

        <!-- number of packages -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="np">
            Number of Package
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="number of package"
            rules="required"
          >
            <v-text-field
              id="np"
              v-model.lazy="number_of_package"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input number of package"
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row
        align="center"
        justify-sm="space-between"
      >
        <!-- measurement -->
        <v-col
          cols="m"
          sm="6"
        >
          <label for="sn">
            Measurement
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="measurement"
            rules="required"
          >
            <v-text-field
              id="m"
              v-model.lazy="measurment"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              suffix="cmb"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input measurement"
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row
        align="center"
        justify-sm="space-between"
      >
        <!-- description of goods -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="dg">
            Description of Goods
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="description of goods"
            rules="required"
          >
            <v-textarea
              id="dg"
              v-model.lazy="description_of_goods"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input description of goods"
            />
          </validation-provider>
        </v-col>

        <!-- marks and number -->
        <v-col
          cols="12"
          sm="6"
        >
          <label for="mn">
            Marks and Number
          </label>

          <validation-provider
            v-slot="{ errors }"
            name="marks and number"
            rules="required"
          >
            <v-textarea
              id="mn"
              v-model.lazy="marks_and_number"
              :loading="pending"
              :disabled="pending"
              :error-messages="errors"
              :clear-icon="$icon.mdiClose"
              solo
              required
              clearable
              class="mt-3"
              placeholder="Input marks and number"
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-divider class="my-5" />

      <v-row
        align="center"
        justify-sm="space-between"
      >
        <v-col cols="auto">
          <v-btn
            color="primary"
            @click.prevent="$router.go(-1)"
          >
            Go back
          </v-btn>

          <v-btn
            text
            outlined
            type="reset"
            color="error"
          >
            clear
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            type="submit"
            color="primary"
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </validation-observer>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
export default {
  data: () => ({
    menu1: false,
    menu2: false
  }),
  computed: {
    ...mapState([
      'pending'
    ]),
    ...mapFields('form', [
      'edo_create.shipper_name',
      'edo_create.consignee_name',
      'edo_create.shipper_email',
      'edo_create.consignee_email',
      'edo_create.shipper_address',
      'edo_create.consignee_address',
      'edo_create.notify',
      'edo_create.house_bl_number',
      'edo_create.notify_address',
      'edo_create.mbl_number',
      'edo_create.house_bl_date',
      'edo_create.arrival_date',
      'edo_create.place_of_receipt',
      'edo_create.container_seal_number',
      'edo_create.ocean_vessel',
      'edo_create.port_of_loading',
      'edo_create.voyage_number',
      'edo_create.final_destination',
      'edo_create.port_of_discharges',
      'edo_create.gross_weight',
      'edo_create.number_of_package',
      'edo_create.measurment',
      'edo_create.description_of_goods',
      'edo_create.marks_and_number'
    ]),
    houseBLDateFormatted: {
      // eslint-disable-next-line
      get: function () {
        return this.formatDate(this.house_bl_date)
      },
      // eslint-disable-next-line
      set: function (v) {
        this.house_bl_date = v
      }
    },
    arrivalDateFormatted: {
      // eslint-disable-next-line
      get: function () {
        return this.formatDate(this.arrival_date)
      },
      // eslint-disable-next-line
      set: function (v) {
        this.arrival_date = v
      }
    },
    observer () { return this.$refs.observer }
  },
  methods: {
    ...mapMutations('form', {
      resetCreateEdo: 'RESET_EDO_CREATE'
    }),
    ...mapActions([
      'createEdo'
    ]),
    async on_submit () {
      await this.createEdo()
        .then(() => {
          this.on_cancel()
          this.$router.go(-1)
        })
    },
    on_cancel () {
      this.observer.reset()
      this.resetCreateEdo()
    }
  }
}
</script>
