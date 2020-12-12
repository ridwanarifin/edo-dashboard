<template>
  <v-container fluid class="py-10 px-md-5">
    <v-row class="mb-5" align="end" justify="space-between">
      <v-col cols="12" sm="auto">
        <v-row no-gutters class="font-weight-bold">
          <span class="mr-4">Total user :</span> <v-skeleton-loader min-width="30" :loading="$fetchState.pending" type="chip">
            {{ total }}
          </v-skeleton-loader>
        </v-row>
      </v-col>

      <v-col cols="12" sm="auto">
        <v-row no-gutters align="end" class="py-0">
          <v-col cols="auto" class="mr-sm-3">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search User"
              solo
              hide-details
              rounded
              :disabled="$fetchState.pending"
            />
          </v-col>

          <v-col cols="auto" class="mr-sm-3">
            <v-row no-gutters>
              <v-col cols="12">
                Show Data
              </v-col>
              <v-col class="mt-3">
                <v-text-field
                  :value="itemsPerPage"
                  label="Items per page"
                  type="number"
                  min="-1"
                  max="15"
                  solo
                  hide-details
                  :disabled="$fetchState.pending"
                  @input="inputSearch"
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="auto">
            <v-btn
              color="primary"
              nuxt
              :to="`/superadmin/user-management/create`"
              :disabled="$fetchState.pending"
              :loading="$fetchState.pending"
            >
              Create new user <v-icon class="ml-3">
                mdi-plus-circle-outline
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-skeleton-loader :loading="$fetchState.pending" type="table">
          <v-data-table
            :headers="headers"
            :items="users"
            :search.sync="search"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            :loading="isUserLoading"
            hide-default-footer
            class="elevation-1 py-5 px-sm-6"
            loading-text="Loading... Please wait"
            @page-count="pageCount = $event"
          >
            <template v-slot:[`item.email`]="{ item }">
              <div class="py-md-5 my-md-4 text-subtitle-2">
                {{ item.email }}
              </div>
            </template>

            <template v-slot:[`item.name`]="{ item }">
              <div class="py-md-5 my-md-4 text-subtitle-2">
                {{ item.name }}
              </div>
            </template>

            <template v-slot:[`item.role`]="{ item }">
              <div class="py-md-5 my-md-4 text-subtitle-2">
                {{ item.role }}
              </div>
            </template>

            <template v-slot:[`item.created_at`]="{ item }">
              <div class="py-md-5 my-md-4 text-subtitle-2">
                {{ $moment(item.created_at).format('DD/MM/YYYY - hh:mm:ss') }}
              </div>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="primary" icon @click="_edit(item)">
                <v-icon>
                  mdi-pencil-outline
                </v-icon>
              </v-btn>

              <v-btn color="red" icon @click="_delete(item)">
                <v-icon>
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row justify="space-between" align="center">
      <v-col cols="12" sm="6">
        <v-skeleton-loader :loading="$fetchState.loading" type="text">
          <div>Showing {{ page * itemsPerPage }} of {{ users.length }} Data </div>
        </v-skeleton-loader>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-pagination
          v-model="page"
          circle
          :length="pageCount"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from 'lodash'
import { HeaderTableUser, initRole } from '@/utils'

export default {
  meta: {
    crumbs: [{
      text: 'Dashboard',
      exact: true,
      to: '/supervisor/e-do'
    }, {
      text: 'User Management',
      exact: true,
      to: '/supervisor/user-management'
    }]
  },
  middleware: 'superadminscl',

  async fetch () {
    this.$toast.global.app_loading()
    await Promise.all([
      this.getAllUser()
    ])
      .then(() => {
        this.$toast.clear()
      })
  },

  data: () => ({
    search: '',
    users: [],
    headers: HeaderTableUser,
    total: null,

    page: 1,
    pageCount: 0,
    itemsPerPage: 5,

    show: false,

    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedUser: {
      email: '',
      name: '',
      role: ''
    },
    userPassword: '',
    passwordEncrypted: '',
    defaultUser: {
      email: '',
      name: '',
      role: ''
    },
    roleItems: initRole,
    isUserLoading: false
  }),
  fetchOnServer: false,

  methods: {
    inputSearch (event) {
      this.itemsPerPage = _.toInteger(event, 10)
    },

    async getAllUser () {
      try {
        const response = await this.$axios.get('/api/e_do/users')
        if (response.status === 200) {
          const { data } = response.data
          const totalUser = response.data['total users']
          this.users = data
          this.total = totalUser
        }
      } catch (error) {
        const response = error.response.data
        const message = response && response.message && ` , ${response.message}`
        this.$toast.global.app_error(`Failed to load all user${message}`)
      }
    },

    kebabCase: params => _.kebabCase(params)
  }
}
</script>
