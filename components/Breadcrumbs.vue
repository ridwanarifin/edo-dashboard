<template>
  <v-breadcrumbs :items="getCrumbs" large class="px-0">
    <template #divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  computed: {
    getCrumbs () {
      return this.$store.state.breadcrumbs.data
    }
  }
}
</script>
