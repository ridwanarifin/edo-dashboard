<template>
  <validation-observer
    v-slot="{ handleSubmit }"
    ref="observer"
  >
    <form
      @submit.prevent="handleSubmit(on_submit)"
      @reset.prevent="close"
    >
      <v-card :loading="pending">
        <v-card-title>
          Filter by
          <v-spacer />

          <v-btn
            icon
            :disabled="pending"
            @click.prevent="close"
          >
            <v-icon v-text="$icon.mdiClose" />
          </v-btn>
        </v-card-title>

        <v-divider />

        <v-card-text class="px-sm-5">
          <v-row align="center">
            <!-- date from -->
            <v-col cols="6">
              <v-menu
                v-model.lazy="menu1"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model.lazy="dateFromFormat"
                    :disabled="pending"
                    :loading="pending"
                    :prepend-icon="$icon.mdiCalendar"
                    :clear-icon="$icon.mdiClose"
                    readonly
                    clearable
                    label="Date From"
                    placeholder="pick a date from"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>

                <v-date-picker
                  v-model.lazy="date_from"
                  @input="menu1 = false"
                />
              </v-menu>
            </v-col>

            <!-- date to -->
            <v-col cols="6">
              <v-menu
                v-model.lazy="menu2"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model.lazy="dateToFormat"
                    :disabled="pending"
                    :loading="pending"
                    :prepend-icon="$icon.mdiCalendar"
                    :clear-icon="$icon.mdiClose"
                    clearable
                    label="Date To"
                    placeholder="pick a date to"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>

                <v-date-picker
                  v-model.lazy="date_to"
                  @input="menu2 = false"
                />
              </v-menu>
            </v-col>
          </v-row>

          <v-row align="center">
            <!-- status -->
            <v-col cols="6">
              <v-autocomplete
                v-model.lazy="status"
                :items="statusItems"
                :disabled="pending"
                :loading="pending"
                chips
                label="Status"
                placeholder="pick a status"
              />
            </v-col>

            <!-- house bl number -->
            <v-col cols="6">
              <v-text-field
                v-model.lazy="house_bl_number"
                :disabled="pending"
                :loading="pending"
                :clear-icon="$icon.mdiClose"
                clearable
                label="House BL Number"
                placeholder="input house bl number"
              />
            </v-col>

            <!-- vessel name -->
            <v-col cols="6">
              <v-text-field
                v-model.lazy="vessel_name"
                :disabled="pending"
                :loading="pending"
                :clear-icon="$icon.mdiClose"
                clearable
                label="Vessel Name"
                placeholder="input vessel name"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-sm-5">
          <v-spacer />
          <v-btn
            text
            type="reset"
            color="primary"
            :loading="pending"
          >
            Cancel
          </v-btn>

          <v-btn
            type="submit"
            color="primary"
            :disabled="pending"
            :loading="pending"
          >
            Filter now
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </validation-observer>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
export default {
  data () {
    return {
      menu1: false,
      menu2: false,
      statusItems: [
        'ALL',
        'UNPAID',
        'PAID',
        'REJECTED',
        'RELEASED',
        'ON HOLD'
      ]
    }
  },
  computed: {
    observer () {
      return this.$refs.observer
    },
    ...mapFields('form', [
      'dialog.filter_edo_doct',
      'edo_doct.date_from',
      'edo_doct.date_to',
      'edo_doct.status',
      'edo_doct.house_bl_number',
      'edo_doct.vessel_name'
    ]),
    ...mapGetters([
      'pending'
    ]),
    dateFromFormat: {
      // eslint-disable-next-line
      get: function () {
        return this.formatDate(this.date_from)
      },
      // eslint-disable-next-line
      set: function (v) {
        this.date_from = v
      }
    },
    dateToFormat: {
      // eslint-disable-next-line
      get: function () {
        return this.formatDate(this.date_to)
      },
      // eslint-disable-next-line
      set: function (v) {
        this.date_to = v
      }
    }
  },
  methods: {
    on_submit () {
      this.$emit('submit')
      this.close()
    },
    close () {
      this.observer.reset()
      this.filter_edo_doct = false
    }
  }
}
</script>
