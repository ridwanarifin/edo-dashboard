<template>
  <v-row
    align="center"
    justify="space-between"
  >
    <v-col
      cols="12"
      class="pb-0"
    >
      <crumbs />
    </v-col>

    <v-col
      cols="auto"
      class="pt-0"
    >
      {{ date }} [ {{ time }} ]
    </v-col>

    <v-col
      cols="auto"
      class="pt-0"
    >
      <v-menu
        offset-y
        close-on-content-click
        transition="slide-y-transition"
      >
        <template #activator="{on, attrs}">
          <div class="text-h6 text-capitalize">
            Hi, {{ $auth.user.role }} {{ $auth.user.name }}

            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon v-text="$icon.mdiChevronDown" />
            </v-btn>
          </div>
        </template>

        <v-list>
          <v-list-item
            nuxt
            replace
            to="/logout"
          >
            <v-list-item-action>
              <v-icon v-text="$icon.mdiLogout" />
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                Logout
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
import Crumbs from '~/components/Breadcrumbs.vue'

export default {
  components: { Crumbs },
  data () {
    return {
      momentDate: this.$moment()
    }
  },
  computed: {
    time () {
      return this.momentDate.format('HH:mm')
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
