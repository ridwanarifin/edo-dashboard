<template>
  <v-container>
    <v-row v-if="showQr">
      <template v-show="!show">
        <qrcode-drop-zone @decode="on_decode" @init="on_drop_zone_init">
          <qrcode-stream @decode="on_decode" @init="on_stream_init" />
        </qrcode-drop-zone>

        <qrcode-capture v-if="noStreamApiSupport" @decode="on_decode" />
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
          <div v-if="hover" class="d-flex text-h4 transition-ease-in-out primary darken-2 v-card--reveal" style="height: 80%; color: white" @click.prevent="$emit('click-scan')">
            Click me to scan
          </div>
        </v-expand-transition>
      </v-img>
    </v-hover>
  </v-container>
</template>

<script>
export default {
  props: {
    isQrcode: {
      type: Boolean,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    },
    noStreamApiSupport: {
      type: Boolean,
      required: true
    },
    showLoading: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      showQr: this.isQrcode
    }
  },
  watch: {
    isQrcode (newVal) {
      this.showQr = newVal
    }
  },
  methods: {
    on_decode (args) {
      this.$emit('on-decode', args)
    },
    on_drop_zone_init (args) {
      this.$emit('drop-zone-init', args)
    },
    on_stream_init (args) {
      this.$emit('stream-init', args)
    }
  }
}
</script>
