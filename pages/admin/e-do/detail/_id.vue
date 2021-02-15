<template>
  <div>
    <section>
      <app-bar-detail-edo-admin
        :pending="pending"
        :data="data"
      />

      <app-detail-edo
        :pending="pending"
        :data="data"
      />
    </section>

    <dialog-paid-edo
      :house-bl-number="data.house_bl_number"
      @submit-resolve="submitResolve"
    />

    <dialog-hold-edo
      v-if="data"
      :house-bl-number="data.house_bl_number"
      @submit-resolve="submitResolve"
    />

    <dialog-reject-edo
      :house-bl-number="data.house_bl_number"
      @submit-resolve="submitResolve"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import AppDetailEdo from '~/components/AppDetailEdo.vue'
import DialogHoldEdo from '~/components/dialog/DialogHoldEdo.vue'
import AppBarDetailEdoAdmin from '~/components/AppBarDetailEdoAdmin.vue'
import DialogPaidEdo from '~/components/dialog/DialogPaidEdo.vue'
import DialogRejectEdo from '~/components/dialog/DialogRejectEdo.vue'

export default {
  components: {
    AppDetailEdo,
    DialogHoldEdo,
    AppBarDetailEdoAdmin,
    DialogPaidEdo,
    DialogRejectEdo
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
    ]),
    submitResolve () {
      this.$fetch()
    }
  },
  meta: {
    crumbs: [{
      text: 'Dashboard',
      to: '/admin',
      exact: true
    }, {
      text: 'Detail e-DO'
    }]
  },
  middleware: 'adminscl',
  head: {
    title: 'Detail e-DO | Admin Dashboard — SCL e-DO'
  }
}
</script>
