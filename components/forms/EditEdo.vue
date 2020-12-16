<template>
  <div class="px-md-5">
    <slot name="notification" />

    <v-container class="mx-auto">
      <v-row align="center" justify="space-between" class="my-5">
        <v-col cols="12" sm="6">
          <div style="color: #B5B5B5; font-size: 14px;">
            Created at
          </div>
          <v-skeleton-loader v-if="loading" type="table-cell" />
          <div v-else class="text-subtitle-1 text-capitalize">
            {{ created_at_formated }}
          </div>
        </v-col>

        <v-col cols="12" sm="6">
          <div style="color: #B5B5B5; font-size: 14px;">
            Created by
          </div>
          <v-skeleton-loader v-if="loading" type="table-cell" />
          <div v-else class="text-subtitle-1 text-capitalize">
            {{ models.created_by }}
          </div>
        </v-col>
      </v-row>
    </v-container>

    <validation-observer ref="observer" v-slot="{ invalid, handleSubmit }">
      <form @submit.prevent="handleSubmit(submit)">
        <v-container class="mx-auto">
          <v-row align="center" justify="space-between">
            <!-- Shipper name -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Shipper Name"
                rules="required"
              >
                <label class="labelText" for="shipperName">Shipper name</label>
                <v-text-field
                  id="shipperName"
                  v-model.trim="models.shipper_name"
                  placeholder="Input shipper name"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
            <!-- end Shipper name -->

            <!-- Consignee name -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Consignee Name"
                rules="required"
              >
                <label class="labelText" for="consigneeName">Consignee name</label>
                <!-- :items="selectData.consigneeName"
              @change="onChangeConsigneeName" -->
                <v-text-field
                  id="consigneeName"
                  v-model.trim="models.consignee_name"
                  placeholder="Input consignee name"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  item-text="consignee_name"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
          <!-- end Consignee name -->
          </v-row>

          <v-row align="center" justify="space-between">
            <!-- Shipper e-mail -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Shipper E-mail"
                rules="email"
              >
                <label class="labelText" for="shipperEmail">Shipper e-mail <small>(optional)</small></label>
                <v-text-field
                  id="shipperEmail"
                  v-model.trim="models.shipper_email"
                  type="email"
                  placeholder="Input shipper e-mail"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                />
              </validation-provider>
            </v-col>
            <!-- end Shipper e-mail -->

            <!-- Consignee e-mail -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Consignee Email"
                rules="required|email"
              >
                <label class="labelText" for="consigneeEmail">Consignee e-mail</label>
                <v-text-field
                  id="consigneeEmail"
                  v-model.trim="models.consignee_email"
                  type="email"
                  placeholder="Input consignee e-mail"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
          <!-- end Consignee e-mail -->
          </v-row>

          <v-row align="center" justify="space-between">
            <!-- Shipper address -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Shipper Address"
                rules="required"
              >
                <label class="labelText" for="shipperAddress">Shipper address</label>
                <v-textarea
                  id="shipperAddress"
                  v-model.trim="models.shipper_address"
                  placeholder="Input shipper address"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
            <!-- end Shipper address -->

            <!-- Consignee address -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Consignee Address"
                rules="required"
              >
                <label class="labelText" for="consigneeAddress">Consignee address</label>
                <v-textarea
                  id="consigneeAddress"
                  v-model.trim="models.consignee_address"
                  placeholder="Input consignee address"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
          <!-- end Consignee address -->
          </v-row>

          <v-row align="center" justify="space-between">
            <!-- Notify -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Notify"
                rules="required"
              >
                <label class="labelText" for="notify">Notify</label>
                <v-text-field
                  id="notify"
                  v-model.trim="models.notify"
                  placeholder="notify to"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
            <!-- end Notify -->

            <!-- House BL number -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="House BL Number"
                rules="required"
              >
                <label class="labelText" for="houseBlNumber">House BL number</label>
                <v-text-field
                  id="houseBlNumber"
                  v-model.trim="models.house_bl_number"
                  placeholder="Input House BL no"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
          <!-- end House BL number -->
          </v-row>

          <v-row align="center" justify="space-between">
            <!-- Notify address -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Notify Address"
                rules="required"
              >
                <label class="labelText" for="notifyAddress">Notify address</label>
                <v-textarea
                  id="notifyAddress"
                  v-model.trim="models.notify_address"
                  placeholder="Input notify address"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
          <!-- end Notify address -->

          <!-- No of quantity -->
          <!-- <v-col cols="12" sm="6">
            <validation-provider
              v-slot="{ errors, valid }"
              name="No. of quantity"
              rules="required"
            >
              <label class="labelText" for="noOfQuantity">No. of quantity</label>
              <v-text-field
                v-model.trim="models.number_of_quantity"
                id="noOfQuantity"
                placeholder="Input no."
                type="number"
                :loading="loading"
                :disabled="loading"
                :error-messages="errors"
                :success="valid"
                min="1"
                class="mt-3"
                solo clearable
                required
              ></v-text-field>
            </validation-provider>
          </v-col> -->
          <!-- end No of quantity -->
          </v-row>

          <v-row align="center" justify="space-between">
            <!-- MB/L number -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Input MB/L Number"
                rules="required"
              >
                <label class="labelText" for="mblNumber">MB/L number</label>
                <v-text-field
                  id="mblNumber"
                  v-model.trim="models.mbl_number"
                  placeholder="Input MB/L number"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
            <!-- end MB/L number -->

            <!-- House BL date -->
            <v-col cols="12" sm="6">
              <label for="houseBlDate">House BL date</label>
              <v-menu
                v-model="menu_house_bl_date"
                :close-on-content-click="false"
                transition="slide-x-reverse-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <validation-provider
                    v-slot="{ errors, valid }"
                    name="House BL Date"
                    rules="required"
                  >
                    <v-text-field
                      id="houseBlDate"
                      v-model="house_bl_date_formated"
                      hint="DD/MM/YYYY"
                      persistent-hint
                      append-icon="mdi-calendar"
                      placeholder="Choose House BL date"
                      :loading="loading"
                      :disabled="loading"
                      :error-messages="errors"
                      :success="valid"
                      class="mt-3"
                      readonly
                      v-bind="attrs"
                      solo
                      required
                      clearable
                      v-on="on"
                    />
                  </validation-provider>
                </template>
                <v-date-picker
                  v-model="models.house_bl_date"
                  no-title
                  @input="menu_house_bl_date = false"
                />
              </v-menu>
            </v-col>
          <!-- end House BL date -->
          </v-row>

          <v-row align="center" justify="space-between">
            <!-- Arrival date -->
            <v-col cols="12" sm="6">
              <label for="arrivalDate">Arrival date <small>(ETA)</small></label>
              <v-menu
                v-model="menu_arrival_date"
                :close-on-content-click="false"
                transition="slide-x-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <validation-provider
                    v-slot="{ errors, valid }"
                    name="Arrival Date"
                    rules="required"
                  >
                    <v-text-field
                      id="arrivalDate"
                      v-model="arrival_date_formated"
                      :loading="loading"
                      :disabled="loading"
                      :error-messages="errors"
                      :success="valid"
                      hint="DD/MM/YYYY"
                      persistent-hint
                      append-icon="mdi-calendar"
                      placeholder="Choose Arrival  date"
                      class="mt-3"
                      readonly
                      v-bind="attrs"
                      solo
                      required
                      clearable
                      v-on="on"
                    />
                  </validation-provider>
                </template>
                <v-date-picker
                  v-model="models.arrival_date"
                  no-title
                  @input="menu_arrival_date = false"
                />
              </v-menu>
            </v-col>
            <!-- end Arrival date -->

            <!-- Place of receipt -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Place Of Receipt"
                rules="required"
              >
                <label class="labelText" for="placeOfReceipt">Place of receipt</label>
                <v-text-field
                  id="placeOfReceipt"
                  v-model.trim="models.place_of_receipt"
                  placeholder="Input place of receipt"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
          <!-- end Place of receipt -->
          </v-row>

          <v-row align="center" justify="space-between">
            <!-- Container seal number -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Container Seal Number"
                rules="required"
              >
                <label class="labelText" for="containerSealNumber">Container seal number</label>
                <v-text-field
                  id="containerSealNumber"
                  v-model.trim="models.container_seal_number"
                  placeholder="Input container/seal number"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
            <!-- end Container seal number -->

            <!-- Ocean vessel -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Ocean Vessel"
                rules="required"
              >
                <label class="labelText" for="oceanVessel">Ocean vessel</label>
                <v-text-field
                  id="oceanVessel"
                  v-model.trim="models.ocean_vessel"
                  placeholder="Input ocean vessel"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
          <!-- end Ocean vessel -->
          </v-row>

          <v-row align="center" justify="space-between">
            <!-- Port of loading -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Port of lading"
                rules="required"
              >
                <label for="portOfLoading">Port of lading</label>
                <v-text-field
                  id="portOfLoading"
                  v-model.trim="models.port_of_loading"
                  placeholder="Input port of lading"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
            <!-- end port of loading -->

            <!-- Voyage number -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Voyage Number"
                rules="required"
              >
                <label class="labelText" for="voyageNumber">Voyage number</label>
                <v-text-field
                  id="voyageNumber"
                  v-model.trim="models.voyage_number"
                  placeholder="Input voyage number"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
          <!-- end Voyage number -->
          </v-row>

          <v-row align="center" justify="space-between">
            <!-- Final destination -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Final Destination"
                rules="required"
              >
                <label class="labelText" for="finalDestination">Final destination</label>
                <v-text-field
                  id="finalDestination"
                  v-model.trim="models.final_destination"
                  placeholder="Input final destination"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
            <!-- end Final destination -->

            <!-- Port of discharge -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Port of discharge"
                rules="required"
              >
                <label class="labelText" for="portOfDischarge">Port of discharge</label>
                <v-text-field
                  id="portOfDischarge"
                  v-model.trim="models.port_of_discharges"
                  placeholder="Input port of discharge"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
          <!-- end Port of discharge -->
          </v-row>

          <v-row align="center" justify="space-between">
            <!-- Gross weight -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Gross weight"
                rules="required"
              >
                <label class="labelText" for="grossWeight">Gross weight <small>(Kg)</small></label>
                <v-text-field
                  id="grossWeight"
                  v-model.trim="models.gross_weight"
                  placeholder="Input gross weight"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  suffix="kg"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
            <!-- end Gross weight -->

            <!-- Number of package -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Number of package"
                rules="required"
              >
                <label class="labelText" for="numberOfPackage">Number of package</label>
                <v-text-field
                  id="numberOfPackage"
                  v-model.trim="models.number_of_package"
                  placeholder="Input number of package"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
          <!-- end Number of package -->

          <!-- Package -->
          <!-- <v-col cols="12" sm="6">
            <validation-provider
              v-slot="{ errors, valid }"
              name="Package"
              rules="required"
            >
            <label class="labelText" for="package">Package</label>
            <v-text-field
              v-model.trim="models.package"
              id="package"
              placeholder="Input package"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              :success="valid"
              class="mt-3"
              solo clearable
              required
            ></v-text-field>
            </validation-provider>
          </v-col> -->
          <!-- end Package -->
          </v-row>

          <v-row align="center" justify="space-between">
            <!-- Measurement -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Measurement"
                rules="required"
              >
                <label class="labelText" for="grossWeight">Measurement <small>(CBM)</small></label>
                <v-text-field
                  id="grossWeight"
                  v-model.trim="models.measurment"
                  placeholder="Input measurement"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  suffix="cbm"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
          <!-- end Measurement -->
          </v-row>

          <v-row align="center" justify="space-between">
            <!-- Description of goods -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Description of goods"
                rules="required"
              >
                <label class="labelText" for="descriptionOfGoods">Description of goods</label>
                <v-textarea
                  id="descriptionOfGoods"
                  v-model.trim="models.description_of_goods"
                  placeholder="Input description of goods"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
            <!-- end Description of goods -->

            <!-- Marks and number -->
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors, valid }"
                name="Marks and number"
                rules="required"
              >
                <label class="labelText" for="marksAndNumber">Marks and number</label>
                <v-textarea
                  id="marksAndNumber"
                  v-model.trim="models.marks_and_number"
                  placeholder="Input marks and number"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :success="valid"
                  class="mt-3"
                  solo
                  clearable
                  required
                />
              </validation-provider>
            </v-col>
          <!-- end Marks and number -->
          </v-row>
        </v-container>

        <v-divider class="my-5" />

        <v-container class="mx-auto">
          <v-row align="center" justify="space-between">
            <v-col cols="auto">
              <v-btn color="primary" :disabled="loading" @click.prevent="go_back">
                Go back
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn color="primary" :loading="loading" :disabled="loading || invalid" type="submit">
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </form>
    </validation-observer>
  </div>
</template>
<script>
// import _ from 'lodash'

export default {
  props: {
    loading: { type: Boolean, required: true, default: false },

    models: {
      shipper_name: { type: String, required: true, default: '' },
      consignee_name: { type: String, required: true, default: '' },

      shipper_email: { type: String, required: true, default: '' },
      consignee_email: { type: String, required: true, default: '' },

      shipper_address: { type: String, required: true, default: '' },
      consignee_address: { type: String, required: true, default: '' },

      notify: { type: String, required: true, default: '' },
      house_bl_number: { type: String, required: true, default: '' },

      notify_address: { type: String, required: true, default: '' },
      // number_of_quantity: { type: [Number, String], required: true, default: 1 },

      mbl_number: { type: String, required: true, default: '' },
      house_bl_date: { type: String, required: true, default: '' },

      arrival_date: { type: String, required: true, default: '' },
      place_of_receipt: { type: String, required: true, default: '' },

      container_seal_number: { type: String, required: true, default: '' },
      ocean_vessel: { type: String, required: true, default: '' },

      port_of_loading: { type: String, required: true, default: '' },
      voyage_number: { type: String, required: true, default: '' },

      final_destination: { type: String, required: true, default: '' },
      port_of_discharges: { type: String, required: true, default: '' },

      gross_weight: { type: String, required: true, default: '' },
      // package: { type: String, required: true, default: "" },

      number_of_package: { type: String, required: true, default: '' },
      measurment: { type: String, required: true, default: '' },

      description_of_goods: { type: String, required: true, default: '' },
      marks_and_number: { type: String, required: true, default: '' }
      // pre_carriage: { type: String, default: "" },
    }
  },

  data () {
    return {
      menu_house_bl_date: false,
      menu_arrival_date: false
    }
  },

  computed: {
    house_bl_date_formated () {
      if (!this.models.house_bl_date) { return '' }
      return this.format_date(this.models.house_bl_date)
    },
    arrival_date_formated () {
      if (!this.models.arrival_date) { return '' }
      return this.format_date(this.models.arrival_date)
    },
    created_at_formated () {
      if (!this.models.created_at) { return }
      return this.$moment(this.models.created_at).format('DD/MM/YYYY - hh:mm:ss')
    }
  },

  methods: {
    format_date (date) {
      if (!date) { return null }

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    submit () {
      // this.$refs.observer.validate();
      this.$emit('onSubmit', {
        data: this.models,
        observer: this.$refs.observer
      })
    },

    clear (e) {
      this.$refs.observer.reset()
    },

    go_back (e) {
      this.$router.back()
    }
  },
  head: {
    title: 'Edit - SCL e-DO'
  }
}
</script>
