<script>
export default {
  mounted () {
    this.$nextTick(() => {
      this.$auth.logout()
      window.localStorage.clear()
    })
  }
}
</script>
