<template>
  <div>
    <v-container class="mx-auto">
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="6"
          class="py-0"
        >
          <v-row align="center">
            <!-- created at -->
            <v-col
              cols="12"
              sm="auto"
            >
              <div class="text--disabled mb-1">
                Created At
              </div>

              <v-skeleton-loader
                v-if="pending || !data"
                type="table-cell"
              />

              <div
                v-else
                class="font-weight-medium"
                v-text="formatDateTime(data.created_at)"
              />
            </v-col>

            <!-- created by -->
            <v-col
              cols="12"
              sm="auto"
            >
              <div class="text--disabled mb-1">
                Created By
              </div>

              <v-skeleton-loader
                v-if="pending || !data"
                type="table-cell"
              />

              <div
                v-else
                class="font-weight-medium"
                v-text="data.created_by || '-'"
              />
            </v-col>

            <!-- status -->
            <v-col
              cols="12"
              sm="auto"
            >
              <div class="text--disabled mb-1">
                Status
              </div>

              <v-skeleton-loader
                v-if="pending || !data"
                type="table-cell"
              />

              <div
                v-else
                class="font-weight-medium"
                :style="{ color: getHexStatusColor(data.status) }"
                v-text="data.status"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-row
            no-gutters
            justify-sm="end"
          >
            <!-- qrcode -->
            <v-skeleton-loader
              v-if="pending || !data"
              type="image"
              width="80"
              height="80"
            />

            <qrcode
              v-else
              :value="data.edo_number"
              :options="{width: 80, height: 80}"
            />

            <!-- edo number -->
            <div class="ml-3 d-flex flex-column justify-center">
              <div class="text--disabled mb-1">
                e-DO Number
              </div>

              <v-skeleton-loader
                v-if="pending || !data"
                type="text"
              />

              <div
                v-else
                class="font-weight-bold"
                v-text="data.edo_number"
              />
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-divider class="my-8" />

    <!-- notes rejection / on hold -->
    <v-container
      v-show="showNotes"
      class="mx-auto"
    >
      <div class="text--disabled mb-1">
        Notes
      </div>

      <div
        class="text-h6"
        v-text="data.status_description || '-'"
      />
    </v-container>

    <v-divider v-show="showNotes" class="my-8" />

    <v-container class="mx-auto">
      <v-row justify-sm="space-between">
        <!-- shipper name -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Shipper Name
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.shipper_name"
          />
        </v-col>

        <!-- consignee name -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Consignee Name
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.consignee_name"
          />
        </v-col>
      </v-row>

      <v-row justify-sm="space-between">
        <!-- shipper email -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Shipper Email
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.shipper_email || '-'"
          />
        </v-col>

        <!-- consignee email -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Consignee Email
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.consignee_email || '-'"
          />
        </v-col>
      </v-row>

      <v-row justify-sm="space-between">
        <!-- shipper address -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Shipper Address
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.shipper_address || '-'"
          />
        </v-col>

        <!-- consignee address -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Consignee Address
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.consignee_address || '-'"
          />
        </v-col>
      </v-row>

      <v-row justify-sm="space-between">
        <!-- notify -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Notify
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.notify || '-'"
          />
        </v-col>

        <!-- house bl number -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            House BL Number
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.house_bl_number || '-'"
          />
        </v-col>
      </v-row>

      <v-row justify-sm="space-between">
        <!-- notify address -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Notify Address
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.notify || '-'"
          />
        </v-col>
      </v-row>

      <v-row justify-sm="space-between">
        <!-- mbl number -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            MB/L Number
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.mbl_number || '-'"
          />
        </v-col>

        <!-- house bl date -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            House BL Date
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="formatDateTime(data.house_bl_date)"
          />
        </v-col>
      </v-row>

      <v-row justify-sm="space-between">
        <!-- arrival date -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Arrival Date (ETA)
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="formatDateTime(data.arrival_date)"
          />
        </v-col>

        <!-- place of receipt -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Place of Receipt
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.place_of_receipt || '-'"
          />
        </v-col>
      </v-row>

      <v-row justify-sm="space-between">
        <!-- container seal number -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Container/Seal Number
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.container_seal_number || '-'"
          />
        </v-col>

        <!-- ocean vessel -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Ocean Vessel
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.ocean_vessel || '-'"
          />
        </v-col>
      </v-row>

      <v-row justify-sm="space-between">
        <!-- port of lading -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Port of Lading
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.port_of_loading || '-'"
          />
        </v-col>

        <!-- voyage number -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Voyage Number
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.voyage_number || '-'"
          />
        </v-col>
      </v-row>

      <v-row justify-sm="space-between">
        <!-- port of discharges -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Port of Discharges
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.port_of_discharges || '-'"
          />
        </v-col>

        <!-- final destination -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Final Destination
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.port_of_discharges || '-'"
          />
        </v-col>
      </v-row>

      <v-row justify-sm="space-between">
        <!-- gross weight -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Gross Weight (Kg)
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.gross_weight + ' KGM' || '-'"
          />
        </v-col>

        <!-- number of package -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Number of Package
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.number_of_package || '-'"
          />
        </v-col>
      </v-row>

      <v-row justify-sm="space-between">
        <!-- measurement -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Measurement (CBM)
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.measurment + ' M3' || '-'"
          />
        </v-col>
      </v-row>

      <v-row justify-sm="space-between">
        <!-- description of goods -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Description of Goods
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.description_of_goods || '-'"
          />
        </v-col>

        <!-- marks and number -->
        <v-col
          cols="12"
          sm
        >
          <div class="text--disabled mb-1">
            Marks and Number
          </div>

          <v-skeleton-loader
            v-if="pending || !data"
            type="table-cell"
          />

          <div
            v-else
            class="text-h6 "
            v-text="data.marks_and_number || '-'"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-divider class="my-3 my-sm-7" />

    <v-container class="mx-auto text-md-right">
      <v-btn
        :loading="pending || !data"
        :disabled="pending || !data"
        color="primary"
        @click.prevent="$router.go(-1)"
      >
        Back to dashboard
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import _ from 'lodash'

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
  computed: {
    showNotes () {
      if (this.pending) { return false }

      switch (_.upperCase(this.data.status)) {
        case 'REJECTED': return true
        case 'ON HOLD': return true
        case 'HOLD ON': return true
        default: return false
      }
    }
  }
}
</script>
