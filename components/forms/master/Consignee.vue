
<template>
  <div>
    <v-data-table
      class="px-5 py-6"
      :loading="isLoading"
      :headers="headers"
      :items="data"
      :search="search"
      :items-per-page="-1"
    >
      <template #top>
        <v-toolbar flat tile tag="div">
          <v-toolbar-title>Consignee</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn :disabled="isLoading" :loading="isLoading" color="primary" class="mb-2" @click.stop="dialog = true">New</v-btn>
        </v-toolbar>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon :disabled="isLoading" color="primary" class="mr-2" @click="_edit(item)">mdi-pencil-outline</v-icon>
        <v-icon :disabled="isLoading" color="red" class="mr-2" @click="_delete(item)">mdi-trash-can-outline</v-icon>
      </template>
    </v-data-table>

    <v-dialog
      v-model="dialog"
      persistent
      :overlay="false"
      max-width="768px"
      transition="slide-y-reverse-transition"
    >
      <validation-observer ref="consigneeRef" v-slot="{handleSubmit, invalid}">
      <v-card tag="form" @submit.prevent="handleSubmit(_submit)" @reset.prevent="_close">
        <v-toolbar flat tile class="px-sm-6" tag="div">
          <v-toolbar-title class="px-0">
            {{ actionTitle }} Consignee
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="_close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="px-0">
          <v-container class="px-sm-8">
            <v-row>
              <v-col cols="12" sm="6" md>
                <validation-provider
                  v-slot="{errors}"
                  name="Consignee Name"
                  rules="required"
                >
                  <v-text-field
                    v-model.trim="models.consignee_name"
                    :error-messages="errors"
                    label="Name"
                    clearable required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6" md>
                <validation-provider
                  name="Consignee Email"
                  rules="required|email"
                  v-slot="{errors}"
                >
                  <v-text-field
                    v-model.trim="models.consignee_email"
                    :error-messages="errors"
                    label="Email"
                    type="email"
                    clearable required
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <validation-provider
                  name="Consignee Address"
                  rules="required"
                  v-slot="{errors}"
                >
                  <v-textarea
                    v-model.trim="models.consignee_address"
                    :error-messages="errors"
                    label="Address"
                    clearable required
                  ></v-textarea>
                </validation-provider>
              </v-col>
            </v-row>
          </v-container>
          <v-divider></v-divider>
          <v-card-actions class="container px-sm-8">
            <v-btn text color="red" type="reset" @reset.prevent="_close">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="invalid" type="submit" @submit.prevent="_submit">{{ actionButtonTitle }}</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
      </validation-observer>
    </v-dialog>

    <v-dialog
      v-model="dialogDelete"
      persistent
      max-width="600px"
      transition="scale-transition"
    >
      <v-alert colored-border type="warning" border="top" icon="mdi-alert-outline" close-icon class="ma-0 pt-7">
        <div class="text-h6">
          Are you sure you want to delete this Consignee ?
        </div>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-btn text color="primary" @click="_closeDelete">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn dark color="red" @click="_deleteConfirm">Delete</v-btn>
        </v-card-actions>
      </v-alert>
    </v-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import { required, email, numeric } from 'vee-validate/dist/rules';
import { extend, ValidationProvider, ValidationObserver, setInteractionMode } from 'vee-validate';

setInteractionMode ('eager');
extend ('required', {...required, message: '{_field_} is required.'});
extend ('email', {...email, message: 'Email must be valid.'});
export default {
  props: {
    data: { type: Array, required: true },
    headers: { type: Array, required: true },
    isLoading: { type: Boolean, default: false }
  },
  components: {
    ValidationObserver, ValidationProvider
  },
  data () {
    return {
      dialog: false,
      dialogDelete: false,
      models: {
        consignee_name: '',
        consignee_email: '',
        consignee_address: ''
      },
      defaultItem: {
        consignee_name: '',
        consignee_email: '',
        consignee_address: ''
      },
      editIndex: -1,
      search: '',
    }
  },

  computed: {
    actionTitle() {
      return this.editIndex === -1 ? 'Create' : 'Edit'
    },
    actionButtonTitle() {
      return this.editIndex === -1 ? 'Create' : 'Update'
    }
  },

  methods: {
    _edit(params) {
      this.editIndex = _.indexOf(this.data, params)
      this.models = _.assign({}, params)
      this.dialog = true
    },

    _delete(params) {
      this.editIndex = _.indexOf(this.data, params)
      this.models = _.assign({}, params)
      this.dialogDelete = true
    },

    _deleteConfirm() {
      this.$emit('onDelete', this.models)
      this._closeDelete()
    },

    _close() {
      this.dialog = false
      this.$nextTick(() => {
        this.models = _.assign({}, this.defaultItem)
        this.editIndex = -1
        this.$refs.consigneeRef.reset()
      })
    },

    _closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.models = _.assign({}, this.defaultItem)
        this.editIndex = -1
      })
    },

    _submit() {
      if (this.actionTitle === 'Create') {
        this.$emit ('onCreate', this.models)
      } else if (this.actionTitle === 'Edit') {
        this.$emit ('onUpdate', this.models)
      }

      this._close ();
    }
  }
}
</script>
<style>

</style>
