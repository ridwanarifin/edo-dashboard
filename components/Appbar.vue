<template>
  <!-- <v-app-bar fixed flat tile app> -->
  <v-container class="mx-auto mt-sm-10">
    <v-row align="center" justify="space-between">
      <v-col cols="12" class="pb-0">
        <v-skeleton-loader type="chip" width="200px">
          <crumbs />
        </v-skeleton-loader>
      </v-col>

      <v-col cols="auto" class="pt-0">
        {{ date }} [ {{ time }} ]
      </v-col>

      <v-col cols="auto" class="pt-0">
        <v-skeleton-loader :loading="!$auth.$state.loggedIn" type="chip">
          <v-menu transition="slide-y-transition" offset-y open-on-hover close-on-content-click>
            <template #activator="{on, attrs}">
              <div class="text-h6 text-capitalize">
                Hi, {{ $auth.user.role }} {{ $auth.user.name }}

                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </div>
            </template>

            <v-list>
              <v-list-item nuxt to="/logout" replace>
                <v-list-item-action>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Logout
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
  <!-- </v-app-bar> -->
</template>

<script>
import Crumbs from '@/components/Breadcrumbs.vue'

export default {
  components: { Crumbs },

  data () {
    return {
      momentDate: this.$moment()
    }
  },

  computed: {
    time () {
      return this.momentDate.format('HH:mm:ss')
    },
    date () {
      return this.momentDate.format('DD MMM YYYY')
    }
  },

  created () {
    this.$nextTick(() => {
      setInterval(() => this.updateCurrentTime(), 1000)
    })
  },

  methods: {
    updateCurrentTime () {
      this.momentDate = this.$moment()
    }
  }
}
</script>
