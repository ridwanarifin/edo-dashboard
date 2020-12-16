<template>
  <v-app>
    <v-app-bar
      height="80"
      dark
      color="primary"
      :clipped-right="clipped"
      fixed
      app
      class="px-md-6"
    >
      <v-row no-gutters justify="space-between" align="center" class="container mx-auto">
        <v-col cols="auto">
          <v-btn text large nuxt replace to="/">
            SPL LOGO
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-row align="center" justify="end">
            <template>
              <v-col cols="auto" class="hidden-xs-only">
                <div class="text-button text-capitalize">
                  Hi, {{ $auth.hasScope ('adminspl') ? 'Admin' : 'Kasir' }} {{ $auth.user.name }}
                </div>
              </v-col>
              <v-col cols="auto" class="hidden-xs-only">
                <v-btn text nuxt to="/spl/setting">
                  Setting <v-icon class="ml-3">
                    mdi-cog
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="auto" class="hidden-xs-only">
                <v-btn light color="white" nuxt to="/logout" replace>
                  Logout <v-icon class="ml-3">
                    mdi-logout
                  </v-icon>
                </v-btn>
              </v-col>
            </template>

            <template v-if="$vuetify.breakpoint.xs">
              <v-col cols="auto">
                <v-btn icon @click.prevent="rightDrawer = !rightDrawer">
                  <v-icon>mdi-menu</v-icon>
                </v-btn>
              </v-col>
            </template>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main id="main">
      <v-container>
        <breadcumbs />
        <nuxt />
      </v-container>
    </v-main>

    <v-navigation-drawer
      v-model.trim="rightDrawer"
      disable-resize-watcher
      dark
      color="primary"
      right
      fixed
      app
    >
      <v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title py-6">
              Hi {{ $auth.hasScope ('adminspl') ? 'Admin' : 'Kasir' }} {{ $auth.user.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item>
      <v-list>
        <v-list-item nuxt to="/spl/setting">
          <v-list-item-action>
            <v-icon>
              mdi-cog
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Setting</v-list-item-title>
        </v-list-item>

        <v-divider class="my-3" />

        <v-list-item class="text-center justify-center">
          <v-btn
            light
            min-width="60"
            large
            nuxt
            to="/logout"
            replace
          >
            <v-icon class="mr-3">
              mdi-logout
            </v-icon> Logout
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Breadcumbs from '@/components/Breadcrumbs.vue'
export default {
  components: { Breadcumbs },
  data () {
    return {
      clipped: false,
      fixed: false,
      miniVariant: false,
      rightDrawer: false,
      title: 'SPL LOGO'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 1500)
    })
  }
}
</script>

<style lang="scss" scoped>
#main {
  background: #ffffff !important;
}
</style>
