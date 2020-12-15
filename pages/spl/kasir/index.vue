<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-alert :value="alertShow" type="error" outlined transition="slide-y-transition" tile>
        {{ error }}
      </v-alert>
    </v-col>
    <v-col cols="12" sm="8">
      <div class="text-center">
        <v-tabs grow background-color="transparent">
          <v-tab>Scan e-DO</v-tab>
          <v-tab>Input e-DO</v-tab>

          <v-tab-item>
            <v-container class="pt-10">
              <v-row v-if="isQrcode">
                <template v-show="!result">
                  <qrcode-drop-zone @decode="onDecode" @init="logErrors">
                    <qrcode-stream @decode="onDecode" @init="onInit" />
                  </qrcode-drop-zone>

                  <qrcode-capture v-if="noStreamApiSupport" @decode="onDecode" />
                </template>
                <v-progress-circular v-show="showLoading" :indeterminate="showLoading" />
              </v-row>

              <v-hover v-else v-slot="{hover}">
                <v-img
                  :src="require('@/assets/img/1.png')"
                  :lazy-src="require('@/assets/img/1.png')"
                  aspect-ratio="16/9"
                  max-width="348"
                  height="348"
                  class="mx-auto"
                  ripple
                >
                  <v-expand-transition>
                    <div v-if="hover" class="d-flex text-h4 transition-ease-in-out primary darken-2 v-card--reveal" style="height: 80%; color: white" @click.prevent="_handleClickMe">
                      Click me to scan
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-hover>
            </v-container>
          </v-tab-item>

          <v-tab-item>
            <v-container class="pt-10">
              <validation-observer v-slot="{ invalid, handleSubmit }">
                <form @submit.prevent="handleSubmit($router.push(`/kasir/e-do/${edoNumberField}`))">
                  <label for="edoNumber">Input e-DO number</label>
                  <validation-provider v-slot="{ valid, errors }" name="e-do number" rules="required">
                    <v-text-field
                      id="edoNumber"
                      v-model="edoNumberField"
                      class="my-3"
                      :success="valid"
                      :error-messages="errors"
                      solo
                      required
                      clearable
                    />
                  </validation-provider>
                  <v-btn type="submit" :disabled="invalid" color="primary">
                    Process
                  </v-btn>
                </form>
              </validation-observer>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-col>
  </v-row>
</template>

<script>

export default {
  layout: 'spl',
  meta: {
    crumbs: [{
      to: '/kasir',
      disabled: true,
      text: 'Dashboard'
    }]
  },
  middleware ({ store, redirect }) {
    if (store.state.auth.role === 'adminspl') {
      return redirect('/admin')
    }
  },

  data () {
    return {
      isSubmiting: false,
      edoNumberField: '',

      isQrcode: false,
      noStreamApiSupport: false,
      result: '',
      showLoading: false,

      alertShow: false,
      error: ''
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
        this.$toast.global.app_loading()
        this.showLoading = true
        this.result = await result
      } finally {
        this.showLoading = false
        this.$router.push(`/kasir/e-do/${this.result}`)
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
