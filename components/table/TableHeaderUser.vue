<template>
  <v-row
    align="center"
    align-sm="end"
    justify="space-between"
  >
    <v-col
      cols="auto"
      class="font-weight-bold"
    >
      <div class="d-flex mb-md-5">
        <span class="mr-4">Total user :</span>
        <v-skeleton-loader
          min-width="30"
          :loading="pending"
          type="chip"
        >
          {{ users.total }}
        </v-skeleton-loader>
      </div>
    </v-col>

    <v-col
      cols="auto"
      md="7"
      class="py-0"
    >
      <v-row
        align="center"
        align-sm="end"
        justify-sm="space-between"
      >
        <v-col
          cols="12"
          md="auto"
        >
          <v-text-field
            v-model="search_table"
            label="Search User"
            :prepend-inner-icon="$icon.mdiMagnify"
            :clear-icon="$icon.mdiClose"
            :disabled="pending"
            solo
            rounded
            hide-details
          />
        </v-col>

        <v-col
          cols="auto"
          md="2"
        >
          <div>Show Data</div>
          <v-text-field
            :value="itemsPerPage"
            label="Items per page"
            type="number"
            min="-1"
            max="15"
            solo
            hide-details
            :disabled="pending"
            @input="$emit('input-per-page', $event)"
          />
        </v-col>

        <v-col
          cols="12"
          sm="auto"
        >
          <v-btn
            color="primary"
            nuxt
            :to="`/superadmin/user-management/create`"
            :disabled="pending"
            :loading="pending"
          >
            Create new user
            <v-icon
              class="ml-3"
              v-text="$icon.mdiPlusCircleOutline"
            />
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  props: {
    itemsPerPage: {
      type: Number,
      required: true,
      default: 10
    }
  },
  computed: {
    ...mapGetters([
      'pending',
      'users'
    ]),
    ...mapFields('form', [
      'search_table'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>
