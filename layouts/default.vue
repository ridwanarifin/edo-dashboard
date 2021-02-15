<template>
  <v-app style="background: #F5F5FB">
    <lazy-app-drawer
      :drawer="drawer"
      :clipped="clipped"
      :mini-variant="miniVariant"
      @on-minivariant="on_click_minivariant"
    />

    <lazy-app-bar
      :drawer="drawer"
      :clipped="clipped"
      :mini-variant="miniVariant"
      @on-drawer="on_click_drawer"
      @on-clipped="on_click_clipped"
    />

    <v-main id="main">
      <lazy-app-toolbar class="mb-5 px-md-5" />
      <nuxt />
    </v-main>
    <!-- <v-footer :absolute="false" app>
      <span>&copy; {{ $moment().format('YYYY') }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  data: () => ({
    clipped: false,
    drawer: false,
    miniVariant: false
  }),
  methods: {
    on_click_drawer (args) {
      this.drawer = args
    },
    on_click_minivariant (args) {
      this.miniVariant = args
    },
    on_click_clipped (args) {
      this.clipped = args
    }
  }
}
</script>
