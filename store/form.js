// import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  pending: false,
  search_table: null,
  dialog: {
    edit_user: false,
    delete_user: false,
    filter_edo_history: false,
    filter_edo_new: false,
    filter_edo_doct: false,
    hold_edo: false,
    paid_edo: false,
    reject_edo: false,
    delete_edo: false
  },
  user: {
    user_id: null,
    email: null,
    name: null,
    role: null,
    password: null
  },
  edo_history: {
    date_from: null,
    date_to: null,
    status: 'ALL',
    house_bl_number: null,
    vessel_name: null
  },
  edo_new: {
    date_from: null,
    date_to: null,
    status: 'ALL',
    house_bl_number: null,
    vessel_name: null
  },
  edo_doct: {
    date_from: null,
    date_to: null,
    status: 'ALL',
    house_bl_number: null,
    vessel_name: null
  },
  edo_hold: {
    edo_id: null,
    edo_number: null,
    house_bl_number: null,
    description: null
  },
  edo_paid: {
    edo_id: null,
    edo_number: null,
    house_bl_number: null
  },
  edo_reject: {
    edo_id: null,
    edo_number: null,
    house_bl_number: null,
    description: null
  },
  edo_delete: {
    edo_id: null,
    edo_number: null
  },
  edo_create: {
    shipper_name: null,
    consignee_name: null,
    shipper_email: null,
    consignee_email: null,
    shipper_address: null,
    consignee_address: null,
    notify: null,
    house_bl_number: null,
    notify_address: null,
    mbl_number: null,
    house_bl_date: null,
    arrival_date: null,
    place_of_receipt: null,
    container_seal_number: null,
    ocean_vessel: null,
    port_of_loading: null,
    voyage_number: null,
    final_destination: null,
    port_of_discharges: null,
    gross_weight: null,
    number_of_package: null,
    measurment: null,
    description_of_goods: null,
    marks_and_number: null
  },
  edo_edit: {
    shipper_name: null,
    consignee_name: null,
    shipper_email: null,
    consignee_email: null,
    shipper_address: null,
    consignee_address: null,
    notify: null,
    house_bl_number: null,
    notify_address: null,
    mbl_number: null,
    house_bl_date: null,
    arrival_date: null,
    place_of_receipt: null,
    container_seal_number: null,
    ocean_vessel: null,
    port_of_loading: null,
    voyage_number: null,
    final_destination: null,
    port_of_discharges: null,
    gross_weight: null,
    number_of_package: null,
    measurment: null,
    description_of_goods: null,
    marks_and_number: null
  }
})

export const getters = {
  getField
}

export const mutations = {
  updateField,
  /**
   * @param {Object} payload
   * data user edit
   */
  SET_EDIT_USER (state, payload) {
    state.user = payload
  },
  // reset user edit
  RESET_EDIT_USER (state) {
    state.user = {
      user_id: null,
      email: null,
      name: null,
      role: null,
      password: null
    }
  },
  // reset edo history - filter
  RESET_EDO_HISTORY (state) {
    state.edo_history = {
      date_from: null,
      date_to: null,
      status: 'ALL',
      house_bl_number: null,
      vessel_name: null
    }
  },
  // reset edo new - filter
  RESET_EDO_NEW (state) {
    state.edo_new = {
      date_from: null,
      date_to: null,
      status: 'ALL',
      house_bl_number: null,
      vessel_name: null
    }
  },
  // reset edo hold - dialog on hold
  RESET_EDO_HOLD (state) {
    state.edo_hold = {
      edo_id: null,
      edo_number: null,
      house_bl_number: null,
      description: null
    }
  },
  // reset edo paid - dialog paid
  RESET_EDO_PAID (state) {
    state.edo_paid = {
      edo_id: null,
      edo_number: null,
      house_bl_number: null
    }
  },
  // reset edo reject - dialog reject
  RESET_EDO_REJECT (state) {
    state.edo_reject = {
      edo_id: null,
      edo_number: null,
      house_bl_number: null,
      description: null
    }
  },
  // reset edo delete - dialog delete
  RESET_EDO_DELETE (state) {
    state.edo_delete = {
      edo_id: null,
      edo_number: null
    }
  },
  // reset create edo
  RESET_EDO_CREATE (state) {
    state.edo_create = {
      shipper_name: null,
      consignee_name: null,
      shipper_email: null,
      consignee_email: null,
      shipper_address: null,
      consignee_address: null,
      notify: null,
      house_bl_number: null,
      notify_address: null,
      mbl_number: null,
      house_bl_date: null,
      arrival_date: null,
      place_of_receipt: null,
      container_seal_number: null,
      ocean_vessel: null,
      port_of_loading: null,
      voyage_number: null,
      final_destination: null,
      port_of_discharges: null,
      gross_weight: null,
      number_of_package: null,
      measurment: null,
      description_of_goods: null,
      marks_and_number: null
    }
  },
  // reset edit edo
  RESET_EDO_EDIT (state) {
    state.edo_edit = {
      shipper_name: null,
      consignee_name: null,
      shipper_email: null,
      consignee_email: null,
      shipper_address: null,
      consignee_address: null,
      notify: null,
      house_bl_number: null,
      notify_address: null,
      mbl_number: null,
      house_bl_date: null,
      arrival_date: null,
      place_of_receipt: null,
      container_seal_number: null,
      ocean_vessel: null,
      port_of_loading: null,
      voyage_number: null,
      final_destination: null,
      port_of_discharges: null,
      gross_weight: null,
      number_of_package: null,
      measurment: null,
      description_of_goods: null,
      marks_and_number: null
    }
  }
}

export const actions = {}
