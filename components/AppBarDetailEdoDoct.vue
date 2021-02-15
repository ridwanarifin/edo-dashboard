<template>
  <v-row
    class="container mx-auto"
    align="center"
    justify-sm="space-between"
  >
    <v-col
      cols="12"
      sm="auto"
    >
      <v-row align="center">
        <v-col
          cols="12"
          sm="auto"
        >
          <v-btn
            :loading="pending || !data"
            :disabled="pending || !data"
            @click.prevent="createPDF(data)"
          >
            <span>Print</span>

            <v-icon
              class="ml-2"
              v-text="$icon.mdiPrinter"
            />
          </v-btn>
        </v-col>

        <v-col
          cols="12"
          sm="auto"
        >
          <v-btn
            nuxt
            exact
            color="teal accent-4"
            :dark="isCanEdit(data.status)"
            :loading="pending || !data"
            :disabled="pending || !data || !isCanEdit(data.status)"
            :to="`/dokumen/e-do/edit/${$route.params.id}`"
          >
            <span>Edit</span>

            <v-icon
              class="ml-2"
              v-text="$icon.mdiPencilOutline"
            />
          </v-btn>
        </v-col>
      </v-row>
    </v-col>

    <v-col
      cols="12"
      sm="6"
      class="text-sm-right"
    >
      <v-btn
        dark
        color="error"
        :loading="pending || !data"
        :disabled="pending || !data"
        @click.prevent="deleteEdo(data)"
      >
        <span>Delete</span>

        <v-icon
          class="ml-2"
          v-text="$icon.mdiTrashCanOutline"
        />
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import _ from 'lodash'
import { mapFields } from 'vuex-map-fields'

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
    ...mapFields('form', [
      'dialog.delete_edo',
      'edo_delete.edo_id',
      'edo_delete.edo_number'
    ])
  },
  methods: {
    isCanEdit (params) {
      if (_.isEqual(_.upperCase(params), 'REJECTED')) {
        return true
      }

      return false
    },
    deleteEdo (params) {
      this.edo_id = params.edo_id
      this.edo_number = params.edo_number
      this.delete_edo = true
    }
  }
}
</script>
