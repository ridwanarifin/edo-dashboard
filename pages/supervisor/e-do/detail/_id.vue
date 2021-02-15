<template>
  <div>
    <section>
      <app-bar-detail-edo-visor
        :pending="pending"
        :data="data"
      />

      <app-detail-edo
        :pending="pending"
        :data="data"
      />
    </section>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import AppDetailEdo from '~/components/AppDetailEdo.vue'
import AppBarDetailEdoVisor from '~/components/AppBarDetailEdoVisor.vue'

export default {
  components: {
    AppDetailEdo,
    AppBarDetailEdoVisor
  },
  async fetch () {
    this.pending = true
    await this.asyncGetEdoByID(this.$route.params.id)
      .then((ress) => {
        this.data = _.head(ress.data)
      })
      .catch((err) => {
        const { data: { data } } = err.response
        this.data = { error: data }
      })
      .finally(() => {
        this.pending = false
      })
  },
  data: () => ({
    pending: false,
    data: {}
  }),
  methods: {
    ...mapActions([
      'asyncGetEdoByID'
    ])
  },
  meta: {
    crumbs: [{
      to: '/supervisor/e-do',
      exact: true,
      text: 'Dashboard',
      replace: true
    }, {
      to: '/supervisor/e-do',
      text: 'Detail e-DO',
      disabled: true
    }]
  },
  head: {
    title: 'Detail e-DO | Supervisor Dashboard — SCL e-DO'
  }
}
</script>
