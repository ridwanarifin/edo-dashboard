<template>
  <v-navigation-drawer
    dark
    permanent
    color="#3273DC"
    :mini-variant="mini"
    app
    class="pt-5"
  >
    <v-list>
      <v-list-item class="justify-end">
        <v-list-item-action>
          <v-btn icon @click.stop="onToggle">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-list-item
        v-for="(item, i) in menus"
        :key="i"
        :to="item.to"
        nuxt
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { Drawer } from '@/utils'
export default {
  data () {
    return {
      mini: false
    }
  },

  computed: {
    menus () {
      return Drawer[this.$auth.user.role]
    }
  },

  methods: {
    onToggle (e) {
      this.mini = !this.mini
    }
  }
}
</script>
