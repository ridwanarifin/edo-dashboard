<template>
  <v-row align="center" justify="center">
    <v-col cols="12">
      <v-alert :value="alertShow" type="error" outlined transition="slide-y-transition" tile>
        {{ error }}
      </v-alert>
    </v-col>

    <v-col v-if="!$vuetify.breakpoint.mobile" cols="12">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <div class="text-center">
            <v-tabs
              v-model="tabs"
              background-color="transparent"
              grow
            >
              <v-tab href="#scan">
                Scan e-DO
              </v-tab>
              <v-tab href="#input">
                Input e-DO
              </v-tab>
            </v-tabs>
          </div>
        </v-col>
        <v-col cols="12" sm="8" class="text-center">
          <v-tabs-items v-model="tabs">
            <v-tab-item value="scan" class="pt-10">
              <scan-edo
                :show="result"
                :show-loading="showLoading"
                :is-qrcode="isQrcode"
                :no-stream-api-support="noStreamApiSupport"
                @on-decode="onDecode"
                @stream-init="onInit"
                @drop-zone-init="logErrors"
                @click-scan="_handleClickMe"
              />
            </v-tab-item>

            <v-tab-item value="input" class="pt-10">
              <input-edo />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-col>

    <v-col v-else cols="12" class="py-0">
      <v-row align="center" justify="center">
        <v-col v-show="bottomNav === 'scan'" cols="12">
          <scan-edo
            :show="result"
            :show-loading="showLoading"
            :is-qrcode="isQrcode"
            :no-stream-api-support="noStreamApiSupport"
            @on-decode="onDecode"
            @stream-init="onInit"
            @drop-zone-init="logErrors"
            @click-scan="_handleClickMe"
          />
        </v-col>

        <v-col v-show="bottomNav === 'input'" cols="12">
          <input-edo />
        </v-col>

        <v-bottom-navigation
          v-model="bottomNav"
          dark
          shift
          absolute
          background-color="blue darken-1"
        >
          <v-btn value="scan">
            <span>Scan</span>
            <v-icon v-text="icons.scan" />
          </v-btn>

          <v-btn value="input">
            <span>Input e-DO</span>
            <v-icon v-text="icons.input" />
          </v-btn>
        </v-bottom-navigation>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import {
  mdiQrcodeScan,
  mdiNoteSearch
} from '@mdi/js'
import ScanEdo from '~/components/ScanEdo.vue'
import InputEdo from '~/components/InputEdo.vue'

export default {
  layout: 'spl',
  meta: {
    crumbs: [{
      to: '/spl/admin',
      disabled: true,
      text: 'Dashboard'
    }]
  },
  components: { ScanEdo, InputEdo },
  data () {
    return {
      result: '',
      isQrcode: false,
      alertShow: false,
      showLoading: false,
      noStreamApiSupport: false,

      error: '',
      tabs: 'scan',
      bottomNav: 'scan',
      icons: {
        scan: mdiQrcodeScan,
        input: mdiNoteSearch
      }
    }
  },
  watch: {
    alertShow (val) {
      if (!val) { return }
      setTimeout(() => {
        this.alertShow = false
      }, 9000)
    }
  },
  methods: {
    _handleClickMe (e) {
      if (this.alertShow) {
        this.alertShow = false
      }
      this.isQrcode = true
    },

    async onDecode (result) {
      try {
        this.showLoading = true
        this.result = await result
      } finally {
        this.showLoading = false
        this.$router.push(`/spl/admin/e-do/detail/${this.result}`)
      }
    },

    logErrors (promise) {
      promise.catch(console.error)
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permission'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        }
      } finally {
        if (!this.error) {
          this.alertShow = false
        } else {
          this.alertShow = true
          this.isQrcode = false
        }
      }
    }
  },
  head: {
    title: 'Admin - SPL e-DO'
  },

  middleware ({ store, redirect }) {
    if (store.state.auth.role === 'kasir') {
      return redirect('/spl/kasir')
    }
  }
}
</script>

<style lang="scss">
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .8;
  position: absolute;
  width: 100%;
  cursor: pointer;
}
</style>
