<template>
  <v-container>
    <validation-observer v-slot="{ invalid, handleSubmit }">
      <form @submit.prevent="handleSubmit($router.push(`${$route.path}/e-do/detail/${edoNumberField}`))">
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
</template>

<script>
export default {
  data: () => ({
    edoNumberField: ''
  })
}
</script>
