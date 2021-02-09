export default function ({ $axios, $swal, app }) {
  $axios.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      // const code = parseInt(error.response && error.response.status)
      const message = error.response && error.response.data && error.response.data.message

      if (message && message.includes('expired')) {
        $swal({
          icon: 'error',
          title: 'Expired',
          text: 'Token expired.',
          timer: 3500
        })
        app.$auth.logout()
      }

      return Promise.reject(error)
    }
  )
}
