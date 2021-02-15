<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="miniVariant"
    :clipped="clipped"
    color="primary"
    fixed
    dark
    app
  >
    <v-list class="my-10">
      <v-list-item class="px-2">
        <!-- <v-list-item-avatar v-if="miniVariant">
          <v-img
            :src="require('~/assets/img/logo-scl-tiny.png')"
            :lazy-src="require('~/assets/img/logo-scl-tiny.png')"
            contain
            class="mx-auto"
          >
            <template #placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                />
              </v-row>
            </template>
          </v-img>
        </v-list-item-avatar>

        <v-list-item-content
          v-else
          class="px-5"
        >
          <v-img
            :src="require('~/assets/img/logo-scl.png')"
            :lazy-src="require('~/assets/img/logo-scl.png')"
            contain
            max-width="calc(20vw - 8rem)"
            class="mx-auto"
          >
            <template #placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                />
              </v-row>
            </template>
          </v-img>
        </v-list-item-content> -->

        <v-btn
          icon
          class="ml-auto"
          @click.stop="$emit('on-minivariant', !miniVariant)"
        >
          <v-icon
            v-text="$icon.mdiMenu"
          />
        </v-btn>
      </v-list-item>
    </v-list>

    <v-list>
      <v-list-item-group v-model="selectedMenu">
        <v-list-item
          v-for="(item, i) in menus"
          :key="i"
          :to="item.to"
          :value="item.title"
          nuxt
          exact
          class="pr-0 font-weight-medium"
        >
          <v-list-item-action>
            <v-icon v-text="item.icon" />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title
              v-text="item.title"
            />
          </v-list-item-content>

          <img
            v-show="selectedMenu == item.title"
            :src="require('~/assets/img/drawer-divider.svg')"
            alt="divider-active"
          >
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// eslint-disable-next-line
import { mdiMenu } from '@mdi/js'
import { Drawer } from '~/utils'
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
  },
  data () {
    return {
      selected: null
    }
  },
  computed: {
    selectedMenu: {
      // eslint-disable-next-line
      get: function () {
        return this.selected
      },
      // eslint-disable-next-line
      set: function (v) {
        this.selected = v
      }
    },
    menus () {
      return Drawer[this.$auth.user.role]
    }
  }
}
</script>
