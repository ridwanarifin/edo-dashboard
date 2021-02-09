<template>
  <v-container class="mx-auto text-center">
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>

    <h1 v-else class="headline mb-2">
      {{ otherError }}
    </h1>

    <v-btn
      text
      large
      color="primary"
      @click="refresh"
    >
      <v-icon
        class="mr-2"
        v-text="$icon.mdiRefresh"
      />
      <span>Rerfresh</span>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  layout: 'auth',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  methods: {
    refresh () {
      console.log(this.$nuxt)
      this.$nextTick(() => {
        window.location.reload()
      })
      // console.log(this.$nuxt.refreshOnlineStatus())
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
