<template>
  <v-row
    align="center"
    justify="space-between"
  >
    <v-col
      cols="12"
      sm="auto"
    >
      <v-row align-sm="center">
        <v-col cols="auto">
          <div class="d-flex">
            Total e-DO : &nbsp;
            <v-skeleton-loader
              min-width="30"
              :loading="pending"
              type="chip"
            >
              {{ total }}
            </v-skeleton-loader>
          </div>
        </v-col>

        <v-col cols="auto">
          <v-text-field
            :value="search"
            :prepend-inner-icon="$icon.mdiMagnify"
            :clear-icon="$icon.mdiClose"
            :disabled="pending"
            :loading="pending"
            solo
            rounded
            outlined
            clearable
            hide-details
            label="Search e-DO"
            @input="$emit('search', $event)"
          />
        </v-col>
      </v-row>
    </v-col>

    <v-col
      cols="12"
      sm="auto"
    >
      <v-row align-sm="end">
        <v-col cols="auto">
          <v-btn
            :loading="pending"
            @click.stop="$emit('click-filter-by')"
          >
            <span>Filter By</span>
            <v-icon v-text="$icon.mdiFilterOutline" />
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <div>Show Data</div>
          <v-text-field
            :value="itemsPerPage"
            :disabled="pending"
            :loading="pending"
            solo
            hide-details
            min="-1"
            max="20"
            type="number"
            label="Items per page"
            @input="$emit('input-per-page', $event)"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    total: {
      type: [String, Number],
      required: true,
      default: 0
    },
    pending: {
      type: Boolean,
      default: false
    },
    search: {
      type: String,
      default: ''
    },
    itemsPerPage: {
      type: [String, Number],
      required: true,
      default: 0
    }
  }
}
</script>
