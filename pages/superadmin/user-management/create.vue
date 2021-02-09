<template>
  <v-container class="mx-auto">
    <section class="px-sm-3">
      <form-create-user />
    </section>
  </v-container>
</template>

<script>
import FormCreateUser from '~/components/form/FormCreateUser.vue'
export default {
  components: { FormCreateUser }

}
</script>
