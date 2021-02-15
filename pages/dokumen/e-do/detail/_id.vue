<template>
  <div>
    <section>
      <app-bar-detail-edo-doct
        :pending="pending"
        :data="data"
      />

      <app-detail-edo
        :pending="pending"
        :data="data"
      />
    </section>

    <dialog-delete-edo />
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import AppDetailEdo from '~/components/AppDetailEdo.vue'
import AppBarDetailEdoDoct from '~/components/AppBarDetailEdoDoct.vue'
import DialogDeleteEdo from '~/components/dialog/DialogDeleteEdo.vue'

export default {
  components: {
    AppDetailEdo,
    AppBarDetailEdoDoct,
    DialogDeleteEdo
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
      text: 'Dashboard',
      to: '/dokumen',
      exact: true
    }, {
      text: 'Detail e-DO',
      to: '/dokumen/e-do',
      disabled: true
    }]
  },
  middleware: 'dokumenscl',
  head: {
    title: 'Detail e-DO | Dokumen Dashboard — SCL e-DO'
  }
}
</script>
