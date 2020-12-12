<template>
  <v-app>
    <v-main id="login" class="justify-center align-center">
      <nuxt />
    </v-main>
    <v-footer absolute app>
      <span>&copy; {{ $moment().format('YYYY') }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  #login {
    background: #F5F5FB !important;
  }
</style>
