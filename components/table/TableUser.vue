<template>
  <v-flex align-self-center>
    <v-skeleton-loader
      :loading="pending"
      type="table"
    >
      <v-data-table
        :headers="headers"
        :items="users.data"
        :page.sync="page"
        :search.sync="search_table"
        :items-per-page.sync="itemsPerPage"
        class="elevation-1 py-5 px-sm-6"
        loading-text="Loading... Please wait"
        hide-default-footer
        @page-count="$emit('page-count', $event)"
      >
        <template v-slot:[`item.email`]="{ item: { email } }">
          <div class="py-md-5 my-md-4 text-subtitle-2">
            {{ email }}
          </div>
        </template>

        <template v-slot:[`item.name`]="{ item: { name } }">
          <div class="py-md-5 my-md-4 text-subtitle-2">
            {{ name }}
          </div>
        </template>

        <template v-slot:[`item.role`]="{ item: { role } }">
          <div class="py-md-5 my-md-4 text-subtitle-2">
            {{ role }}
          </div>
        </template>

        <template v-slot:[`item.created_at`]="{ item: { created_at } }">
          <div class="py-md-5 my-md-4 text-subtitle-2">
            {{ formatted_date(created_at) }}
          </div>
        </template>

        <template v-slot:[`item.updated_at`]="{ item: { updated_at, created_at } }">
          <div class="py-md-5 my-md-4 text-subtitle-2">
            {{ formatted_date(updated_at) || formatted_date(created_at) }}
          </div>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            icon
            color="primary"
            @click.prevent="user_edit(item)"
          >
            <v-icon v-text="$icon.mdiPencilOutline" />
          </v-btn>

          <v-btn
            icon
            color="red"
            @click.prevent="user_delete(item)"
          >
            <v-icon v-text="$icon.mdiTrashCanOutline" />
          </v-btn>
        </template>

        <!-- footer -->
        <template #footer="{ props: { pagination } }">
          <v-row
            align="center"
            justify-sm="space-between"
            class="mt-10"
          >
            <v-col cols="12">
              <v-divider class="mb-5" />
            </v-col>

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
  </v-flex>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { HeaderTableUser } from '~/utils/headers.js'

export default {
  props: {
    itemsPerPage: {
      type: Number,
      required: true,
      default: 10
    },
    pageCount: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data: () => ({
    headers: HeaderTableUser,
    page: 1
  }),
  computed: {
    ...mapGetters([
      'pending',
      'users'
    ]),
    ...mapFields('form', [
      'search_table',
      'dialog.edit_user',
      'dialog.delete_user',
      'user'
    ])
  },
  methods: {
    formatted_date (params) {
      const date = this.$moment(params)
      return date.isValid() && date.format('DD/MM/YYYY - hh:mm')
    },
    user_edit (params) {
      this.user = _.pick(params, [
        'user_id',
        'email',
        'name',
        'role'
      ])
      this.edit_user = true
    },
    user_delete (params) {
      this.user = _.pick(params, [
        'user_id',
        'email',
        'name',
        'role'
      ])
      this.delete_user = true
    }
  }
}
</script>
