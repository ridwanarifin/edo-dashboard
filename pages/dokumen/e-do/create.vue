<template>
  <create-edo-form :loading="isLoading" @onSubmit="onSubmit" />
</template>

<script>
import qs from 'querystring'
import CreateEdoForm from '@/components/forms/CreateEdo.vue'

export default {
  meta: {
    crumbs: [{
      text: 'Dashboard',
      href: '/dokumen/e-do',
      disabled: false
    }, {
      text: 'Create e-DO',
      href: '/dokumen/e-do/create',
      disabled: true
    }]
  },
  middleware: 'dokumenscl',
  components: { CreateEdoForm },

  data () {
    return {
      isLoading: false
    }
  },

  // async fetch () {
  //   this.isLoading = true;
  //   this.$toast.global.app_loading();

  //   await Promise.all([
  //     this.geAllConsignee (),
  //     this.getAllPortOfLading (),
  //     this.getAllPortOfDischarge (),
  //     this.getAllFinalDestination ()
  //   ])
  //   .finally (() => {
  //     this.isLoading = false;
  //     this.$toast.clear();
  //   });
  // },
  // fetchOnServer: false,

  methods: {
    onSubmit (params) {
      this.isLoading = true
      try {
        const response = this.$axios.post('/api/e_do', qs.stringify(params.data))
        if (response) {
          this.$toast.global.app_success('Success create edo')
        }
      } catch (error) {
        this.$toast.global.app_error('Failed create edo')
      } finally {
        this.isLoading = false
        this.$router.back()
      }
    },

    async geAllConsignee () {
      try {
        const response = await this.$axios.get('/api/e_do/consignee')
        if (response.status === 200) {
          const { data } = response.data
          this.dataSelect.consigneeName = data
        }
      } catch (error) {
        this.$toast.global.app_error('Failed to get consignee')
      }
    },

    async getAllPortOfLading () {
      try {
        const response = await this.$axios.get('/api/e_do/port_of_lading')
        if (response.status === 200) {
          const { data } = response.data
          this.dataSelect.portOfLoading = data
        }
      } catch (error) {
        this.$toast.global.app_error('Failed to get port of loading')
      }
    },

    async getAllPortOfDischarge () {
      try {
        const response = await this.$axios.get('/api/e_do/port_of_discharge')
        if (response.status === 200) {
          const { data } = response.data
          this.dataSelect.portOfDischarge = data
        }
      } catch (error) {
        this.$toast.global.app_error('Failed to get port of discharge')
      }
    },

    async getAllFinalDestination () {
      try {
        const response = await this.$axios.get('/api/e_do/final_destination')
        if (response.status === 200) {
          const { data } = response.data
          this.dataSelect.finalDestination = data
        }
      } catch (error) {
        this.$toast.global.app_error('Failed to get final destination')
      }
    }
  }
}
</script>
