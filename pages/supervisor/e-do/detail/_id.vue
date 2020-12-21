<template>
  <div class="pa-5">
    <!-- Print action -->
    <!-- <v-row class="mt-8">
      <v-col cols="12" sm="auto" class="mb-5">
        <v-btn class="mr-3" :disabled="!isCanPrint" :loading="loadingDelete || $fetchState.pending" @click.prevent="crete_pdf">
          Print <v-icon class="ml-2">
            mdi-printer
          </v-icon>
        </v-btn>
      </v-col>
    </v-row> -->
    <!-- end Print action -->

    <v-container class="mx-auto">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" class="py-0">
          <v-row align="center">
            <!-- Created at -->
            <v-col cols="12" sm="auto">
              <div class="label">
                Created At
              </div>
              <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" loading type="table-cell" />
              <div v-else class="font-weight-bold">
                {{ created_at_formated }}
              </div>
            </v-col>
            <!-- end Created at -->

            <!-- Created By -->
            <v-col cols="12" sm="auto">
              <div class="label">
                Created By
              </div>
              <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" loading type="table-cell" />
              <div v-else class="font-weight-bold text-capitalize">
                {{ edo.created_by }}
              </div>
            </v-col>
            <!-- end Created By -->

            <!-- Status e-DO -->
            <v-col cols="12" sm="auto">
              <div class="label">
                Status
              </div>
              <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" loading type="table-cell" />
              <div v-else class="font-weight-bold" :style="{color: colors(edo.status)}">
                {{ edo.status }}
              </div>
            </v-col>
            <!-- end Status e-DO -->
          </v-row>
        </v-col>

        <v-col cols="12" sm="6">
          <v-row no-gutters justify-sm="end">
            <!-- QrCode -->
            <v-col cols="12" sm="auto">
              <v-skeleton-loader v-if="$fetchState.pending" loading type="image" width="80" height="80" />
              <qrcode
                v-else
                :value="edo.edo_number"
                :options="{width: 80, height: 80}"
              />
            </v-col>
            <!-- end QrCode -->

            <!-- e-DO Number -->
            <v-col cols="12" sm="auto">
              <div class="ml-3 d-flex flex-column justify-center">
                <div class="label">
                  e-DO Number
                </div>
                <v-skeleton-loader v-if="$fetchState.pending" loading type="table-cell" />
                <div v-else class="font-weight-bold">
                  {{ edo.edo_number }}
                </div>
              </div>
            </v-col>
            <!-- end e-DO Number -->
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-divider class="my-8" />

    <v-container class="mx-auto">
      <v-row v-show="isShowNotes" align="center">
        <v-col cols="12" sm>
          <div class="label-reject">
            Notes
          </div>
          <div class="text-h5">
            {{ edo.status_description || '-' }}
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-divider v-show="isShowNotes" class="my-8" />

    <v-container class="mx-auto">
      <v-row align="center" justify="space-between">
        <!-- Shipper name -->
        <v-col cols="12" sm>
          <div class="label">
            Shipper name
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. shipper_name }}
          </div>
        </v-col>
        <!-- end Shipper name -->

        <!-- Consignee name -->
        <v-col cols="12" sm>
          <div class="label">
            Consignee name
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. consignee_name }}
          </div>
        </v-col>
        <!-- end Consignee name -->
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- Shipper e-mail -->
        <v-col cols="12" sm>
          <div class="label">
            Shipper e-mail
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. shipper_email || '-' }}
          </div>
        </v-col>
        <!-- end Shipper e-mail -->

        <!-- Consignee e-mail -->
        <v-col cols="12" sm>
          <div class="label">
            Consignee e-mail
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. consignee_email }}
          </div>
        </v-col>
        <!-- end Consignee e-mail -->
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- Shipper address -->
        <v-col cols="12" sm>
          <div class="label">
            Shipper address
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. shipper_address }}
          </div>
        </v-col>
        <!-- end Shipper address -->

        <!-- Consignee address -->
        <v-col cols="12" sm>
          <div class="label">
            Consignee address
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. consignee_address }}
          </div>
        </v-col>
        <!-- end Consignee address -->
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- Notify -->
        <v-col cols="12" sm>
          <div class="label">
            Notify
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. notify }}
          </div>
        </v-col>
        <!-- end Notify -->

        <!-- House BL number -->
        <v-col cols="12" sm>
          <div class="label">
            House BL Number
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. house_bl_number }}
          </div>
        </v-col>
        <!-- end House BL number -->
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- Notify address -->
        <v-col cols="12" sm>
          <div class="label">
            Notify Address
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. notify }}
          </div>
        </v-col>
        <!-- end Notify address -->

        <!-- Number of quantity -->
        <!-- <v-col cols="12" sm>
          <div class="label">No. of quantity</div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell"></v-skeleton-loader>
          <div v-else class="text-h5">
            {{ edo. number_of_quantity || '-' }}
          </div>
        </v-col> -->
        <!-- end Number of quantity -->
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- MBL number -->
        <v-col cols="12" sm>
          <div class="label">
            MB/L Number
          </div>
          <div class="text-h5">
            {{ edo. mbl_number }}
          </div>
        </v-col>
        <!-- end MBL number -->

        <!-- House BL date -->
        <v-col cols="12" sm>
          <div class="label">
            House BL Date
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ $moment(edo. house_bl_date).format("DD/MM/YYYY") }}
          </div>
        </v-col>
        <!-- end House BL date -->
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- Arrival date -->
        <v-col cols="12" sm>
          <div class="label">
            Arrival Date (ETA)
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ $moment(edo. arrival_date).format("DD/MM/YYYY") }}
          </div>
        </v-col>
        <!-- end Arrival date -->

        <!-- Place of receipt -->
        <v-col cols="12" sm>
          <div class="label">
            Place of receipt
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. place_of_receipt }}
          </div>
        </v-col>
        <!-- end Place of receipt -->
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- Container seal number -->
        <v-col cols="12" sm>
          <div class="label">
            Container/Seal number
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. container_seal_number }}
          </div>
        </v-col>
        <!-- end Container seal number -->

        <!-- Ocean vessel -->
        <v-col cols="12" sm>
          <div class="label">
            Ocean vessel
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. ocean_vessel }}
          </div>
        </v-col>
        <!-- end Ocean vessel -->
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- Port of lading -->
        <v-col cols="12" sm>
          <div class="label">
            Port of lading
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. port_of_loading }}
          </div>
        </v-col>
        <!-- end Port of lading -->

        <!-- Voyage number -->
        <v-col cols="12" sm>
          <div class="label">
            Voyage Number
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. voyage_number }}
          </div>
        </v-col>
        <!-- end Voyage number -->
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- Final destination -->
        <v-col cols="12" sm>
          <div class="label">
            Final Destination
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. final_destination }}
          </div>
        </v-col>
        <!-- end Final destination -->

        <!-- Port of discharges -->
        <v-col cols="12" sm>
          <div class="label">
            Port of discharges
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. port_of_discharges }}
          </div>
        </v-col>
        <!-- end Port of discharges -->
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- Gross weight -->
        <v-col cols="12" sm>
          <div class="label">
            Gross weight (Kg)
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. gross_weight }} KGM
          </div>
        </v-col>
        <!-- end Gross weight -->

        <!-- Number of package -->
        <v-col cols="12" sm>
          <div class="label">
            Number of Package
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. number_of_package }}
          </div>
        </v-col>
        <!-- end Number of package -->

        <!-- Package -->
        <!-- <v-col cols="12" sm>
          <div class="label">Package</div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell"></v-skeleton-loader>
          <div v-else class="text-h5">
            {{ edo. package }}
          </div>
        </v-col> -->
        <!-- end Package -->
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- Measurement -->
        <v-col cols="12" sm>
          <div class="label">
            Measurement (CBM)
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. measurment }} M3
          </div>
        </v-col>
        <!-- end Measurement -->
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- Description of goods -->
        <v-col cols="12" sm>
          <div class="label">
            Description of goods
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. description_of_goods }}
          </div>
        </v-col>
        <!-- end Description of goods -->

        <!-- Marks and number -->
        <v-col cols="12" sm>
          <div class="label">
            Marks and number
          </div>
          <v-skeleton-loader v-if="loadingDelete || $fetchState.pending" type="table-cell" />
          <div v-else class="text-h5">
            {{ edo. marks_and_number }}
          </div>
        </v-col>
        <!-- end Marks and number -->
      </v-row>
    </v-container>

    <v-divider class="my-7" />

    <v-container class="mx-auto">
      <v-row align="center" justify="end" class="text-sm-right">
        <v-col cols="12">
          <v-btn color="primary" @click="() => $router.back()">
            Back to dashboard
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {
  getColorStatus
} from '@/utils'
import _ from 'lodash'
import pdfmake from 'pdfmake'

export default {
  meta: {
    crumbs: [{
      to: '/supervisor/e-do',
      exact: true,
      text: 'Dashboard',
      replace: true
    }, {
      to: '/supervisor/e-do',
      text: 'Detail e-DO',
      disabled: true
    }]
  },
  async fetch () {
    try {
      this.$toast.global.app_loading()
      const response = await this.$axios.get(`/api/e_do/search/e_do_number/${this.$route.params.id}`)
      if (response) {
        this.$toast.clear()
        const { data } = response.data
        this.edo = data[0]
      }
    } catch (error) {
      this.$toast.clear()
      const message = error.response && error.response.data && error.response.data.message && ` ,${error.response.data.message}`
      this.$toast.global.app_error(`Failed to get e-DO${message}`)
    }
  },
  fetchOnServer: false,

  data () {
    return {
      edo: {},
      dialog: false,
      loadingDelete: false,
      notif: {
        message: '',
        status: ''
      },
      confirmDelete: '',

      modalDeleteDialog: false
    }
  },

  computed: {
    // eslint-disable-next-line
    isShowNotes () { return this.isNotEmpty && _.isEqual(this.edo.status, 'REJECTED') || _.isEqual(this.edo.status, 'HOLD ON') || _.isEqual(this.edo.status, 'ON HOLD') },
    created_at_formated () {
      const dateFormated = this.$moment(this.edo.created_at, 'DD-MM-YYYY hh:mm:ss', 'id')
      return dateFormated.isValid() ? dateFormated.format('DD/MM/YYYY - hh:mm:ss') : this.edo.created_at
    }
  },

  methods: {
    colors (params) { return getColorStatus(params) },
    to_data_url (url, callback) {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        const reader = new FileReader()
        reader.onloadend = function () {
          callback(reader.result)
        }
        reader.readAsDataURL(xhr.response)
      }
      xhr.open('GET', url)
      xhr.responseType = 'blob'
      xhr.send()
    },

    crete_pdf (e) {
      const edo = this.edo
      const dateNow = this.$moment().format('DD/MM/YYYY')

      this.to_data_url(require('@/static/logo.png'), function (dataURL) {
        const docDefinition = {
          content: [
            {
              table: {
                widths: ['55%', '*'],
                headerRows: 2,
                body: [
                  [
                    {
                      rowSpan: 2,
                      text: [
                        {
                          text: 'Shipper\n',
                          style: 'label'
                        },
                        {
                          text: edo.shipper_name,
                          style: 'content'
                        }
                      ]
                    },
                    {
                      layout: 'noBorders',
                      table: {
                        widths: ['*', '*'],
                        body: [
                          [
                            [{
                              text: 'D/O No.',
                              style: 'label'
                            },
                            {
                              text: edo.edo_number,
                              style: 'content'
                            }],

                            [{
                              text: 'Print Date',
                              style: 'label'
                            },
                            {
                              text: dateNow,
                              style: 'content'
                            }]
                          ]
                        ]
                      }
                    }
                  ],

                  [
                    {},
                    {
                      layout: 'noBorders',
                      table: {
                        widths: ['*', '*'],
                        body: [
                          [
                            [{
                              text: 'House B/L No.',
                              style: 'label'
                            },
                            {
                              text: edo.house_bl_number,
                              style: 'content'
                            }],

                            [{
                              text: 'MB/L No.',
                              style: 'label'
                            },
                            {
                              text: edo.mbl_number,
                              style: 'content'
                            }]
                          ]
                        ]
                      }
                    }
                  ],

                  [
                    {
                      text: [
                        {
                          text: 'Consignee\n',
                          style: 'label'
                        },
                        {
                          text: edo.consignee_name,
                          style: 'content'
                        }
                      ]
                    },
                    {
                      rowSpan: 2,
                      layout: 'noBorders',
                      table: {
                        widths: ['*'],
                        body: [
                          [
                            {
                              image: dataURL,
                              width: 150,
                              margin: [0, 20, 0, 20]
                            }
                          ],
                          [
                            {
                              qr: edo.edo_number,
                              fit: '70'
                            }
                          ]
                        ]
                      },
                      alignment: 'center'
                    }
                  ],

                  [
                    {
                      text: [
                        {
                          text: 'Notify\n',
                          style: 'label'
                        },
                        {
                          text: edo.notify,
                          style: 'content'
                        }
                      ]
                    },
                    {}
                  ]
                ]
              }
            },
            {
              table: {
                widths: ['*', '*', '*'],
                body: [
                  [
                    {
                      text: [
                        {
                          text: 'Pre-carriage by\n',
                          style: 'label'
                        },
                        {
                          text: '-',
                          style: 'content'
                        }
                      ]
                    },
                    {
                      text: [
                        {
                          text: 'Place Of Receipt\n',
                          style: 'label'
                        },
                        {
                          text: edo.place_of_receipt,
                          style: 'content'
                        }
                      ]
                    },
                    {
                      text: [
                        {
                          text: 'Arrival Date\n',
                          style: 'label'
                        },
                        {
                          text: edo.arrival_date,
                          style: 'content'
                        }
                      ]
                    }
                  ],

                  [
                    {
                      text: [
                        {
                          text: 'Ocean Vessel\n',
                          style: 'label'
                        },
                        {
                          text: edo.ocean_vessel,
                          style: 'content'
                        }
                      ]
                    },
                    {
                      text: [
                        {
                          text: 'Voyage No.\n',
                          style: 'label'
                        },
                        {
                          text: edo.voyage_number,
                          style: 'content'
                        }
                      ]
                    },
                    {
                      text: [
                        {
                          text: 'Container/Seal no.\n',
                          style: 'label'
                        },
                        {
                          text: edo.container_seal_number,
                          style: 'content'
                        }
                      ]
                    }
                  ],

                  [
                    {
                      text: [
                        {
                          text: 'Port Of Lading\n',
                          style: 'label'
                        },
                        {
                          text: edo.port_of_loading,
                          style: 'content'
                        }
                      ]
                    },
                    {
                      text: [
                        {
                          text: 'Port Of Discharges\n',
                          style: 'label'
                        },
                        {
                          text: edo.port_of_discharges,
                          style: 'content'
                        }
                      ]
                    },
                    {
                      text: [
                        {
                          text: 'Final Destination\n',
                          style: 'label'
                        },
                        {
                          text: edo.final_destination,
                          style: 'content'
                        }
                      ]
                    }
                  ],

                  [
                    {
                      colSpan: 2,
                      text: [
                        {
                          text: 'Description Of Goods\n',
                          style: 'label'
                        },
                        {
                          text: edo.description_of_goods,
                          style: 'content'
                        }
                      ]
                    },
                    {},
                    {
                      layout: 'noBorders',
                      table: {
                        body: [
                          [
                            {
                              text: [
                                {
                                  text: 'Gross Weight\n',
                                  style: 'label'
                                },
                                {
                                  text: `${edo.gross_weight} KGM`,
                                  style: 'content'
                                }
                              ],
                              margin: [0, 0, 0, 10]
                            }
                          ],
                          [
                            {
                              text: [
                                {
                                  text: 'Measurement\n',
                                  style: 'label'
                                },
                                {
                                  text: `${edo.measurment} M3`,
                                  style: 'content'
                                }
                              ],
                              margin: [0, 10, 0, 10]
                            }
                          ],
                          [
                            {
                              text: [
                                {
                                  text: 'Number Of Package\n',
                                  style: 'label'
                                },
                                {
                                  text: edo.number_of_package,
                                  style: 'content'
                                }
                              ],
                              margin: [0, 10, 0, 5]
                            }
                          ]
                        ]
                      }
                    }
                  ],

                  [
                    {
                      colSpan: 3,
                      text: [
                        {
                          text: 'Marks & Numbers\n',
                          style: 'label'
                        },
                        {
                          text: edo.marks_and_number,
                          style: 'content'
                        }
                      ]
                    }
                  ]
                ]
              }
            }
          ],
          defaultStyle: {
            lineHeight: 1.2
          },
          styles: {
            label: {
              fontSize: 8
            },
            content: {
              bold: true,
              fontSize: 10
            }
          }
        }
        pdfmake.fonts = {
          Roboto: {
            normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
            bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
            italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
            bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
          }
        }
        return pdfmake.createPdf(docDefinition).print()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .label {
    color: #B5B5B5 !important;
  }
  .label-reject {
    color: #FF3860 !important;
  }
</style>
