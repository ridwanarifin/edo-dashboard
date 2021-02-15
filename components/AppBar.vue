<template>
  <v-app-bar
    :clipped-left="clipped"
    fixed
    app
  >
    <v-app-bar-nav-icon
      @click.stop="$emit('on-drawer', !drawer)"
    />

    <v-btn
      icon
      @click.stop="$emit('on-clipped', !clipped)"
    >
      <v-icon v-text="$icon.mdiApplication" />
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    clipped: {
      type: Boolean,
      default: false
    },
    drawer: {
      type: Boolean,
      default: false
    },
    miniVariant: {
      type: Boolean,
      default: false
    }
  }
}
</script>
