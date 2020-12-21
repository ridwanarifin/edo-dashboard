<template>
  <v-app>
    <drawer-dashboard />
    <v-main id="main">
      <appbar class="mb-5 px-md-5" />
      <nuxt />
    </v-main>
    <v-footer :absolute="false" app>
      <span>&copy; {{ $moment().format('YYYY') }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import DrawerDashboard from '@/components/DrawerDasboardScl.vue'
import Appbar from '@/components/Appbar.vue'

export default {
  components: { DrawerDashboard, Appbar },
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
    background-color: #F5F5FB !important;
    height: auto !important;
  }
</style>
