const alignCenter = { align: 'center' }
const style = { ...alignCenter, justify: 'center' }

export const HeaderTabSupervisorEDO = [{
  text: 'Release Date',
  value: 'released_at',
  ...style
}, {
  text: 'House BL Number',
  value: 'house_bl_number'
}, {
  text: 'e-Do Number',
  value: 'edo_number'
}, {
  text: 'Consignee Name',
  value: 'consignee_name'
}, {
  text: 'Created at',
  value: 'created_at',
  ...style
}, {
  text: 'Status',
  value: 'status',
  ...style
}, {
  text: '',
  value: 'detail',
  sortable: false,
  ...style
}]

export const HeaderTableTabNewEDO = [{
  text: 'Release Date',
  value: 'released_at',
  ...style
}, {
  text: 'House BL Number',
  value: 'house_bl_number'
}, {
  text: 'e-Do Number',
  value: 'edo_number'
}, {
  text: 'Consignee Name',
  value: 'consignee_name'
}, {
  text: 'Created at',
  value: 'created_at',
  ...style
}, {
  text: 'Status',
  value: 'status',
  ...style
}, {
  text: 'Action',
  value: 'actions',
  sortable: false,
  ...style
}, {
  text: '',
  value: 'detail',
  sortable: false,
  ...style
}]

export const HeaderTableTabHistory = [{
  text: 'Release Date',
  value: 'released_at',
  ...style
}, {
  text: 'House BL Number',
  value: 'house_bl_number'
}, {
  text: 'e-Do Number',
  value: 'edo_number'
}, {
  text: 'Consignee Name',
  value: 'consignee_name'
}, {
  text: 'Created at',
  value: 'created_at',
  ...style
}, {
  text: 'Status',
  value: 'status',
  sortable: false,
  ...style
}, {
  text: '',
  value: 'detail',
  sortable: false,
  ...style
}]

export const HeaderTableUser = [{
  text: 'E-mail',
  value: 'email',
  ...style
}, {
  text: 'Name',
  value: 'name',
  ...style
}, {
  text: 'Role',
  value: 'role',
  ...style
}, {
  text: 'Created At',
  value: 'created_at',
  ...style
}, {
  text: 'Action',
  value: 'actions',
  sortable: false,
  ...style
}, {
  text: '',
  value: 'detail',
  sortable: false,
  ...style
}]

export const HeaderTableConsignee = [{
  text: 'ID',
  value: 'id'
}, {
  text: 'Name',
  value: 'consignee_name'
}, {
  text: 'Email',
  value: 'consignee_email'
}, {
  text: 'Address',
  value: 'consignee_address'
}, {
  text: 'Actions',
  value: 'actions',
  sortable: false,
  ...style
}]

export const HeaderTablePortOfLoading = [{
  text: 'ID',
  value: 'Id'
}, {
  text: 'Name',
  value: 'name'
}, {
  text: 'Actions',
  value: 'actions',
  sortable: false,
  ...style
}]

export const HeaderTablePortOfDischarge = [{
  text: 'ID',
  value: 'Id'
}, {
  text: 'Name',
  value: 'name'
}, {
  text: 'Actions',
  value: 'actions',
  sortable: false,
  ...style
}]

export const HeaderTableFinalDestination = [{
  text: 'ID',
  value: 'Id'
}, {
  text: 'Name',
  value: 'name'
}, {
  text: 'Actions',
  value: 'actions',
  sortable: false,
  ...style
}]
