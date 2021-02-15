<template>
  <section>
    <form-edit-edo
      :pending="pending"
      :data="data"
    />
  </section>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import FormEditEdo from '~/components/form/FormEditEdo.vue'

export default {
  components: { FormEditEdo },
  async fetch () {
    this.pending = true
    await this.asyncGetEdoByID(this.$route.params.id)
      .then((ress) => {
        this.data = _.head(ress.data)
      })
      .catch((err) => {
        throw new Error(err)
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
      text: 'Edit e-DO',
      to: '/dokumen/e-do',
      disabled: true
    }]
  },
  middleware: ['dokumenscl', 'editedo'],
  head: {
    title: 'Edit e-DO | Dokumen Dashboard — SCL e-DO'
  }
}
</script>
