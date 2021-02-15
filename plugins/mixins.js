import Vue from 'vue'
import _ from 'lodash'
import pdfmake from 'pdfmake'

Vue.mixin({
  methods: {
    getHexStatusColor (params) {
      switch (_.upperCase(params)) {
        case 'RELEASED': return '#BB6BD9'
        case 'REJECTED': return '#FF3860'
        case 'UNPAID': return '#3273DC'
        case 'REISSUED': return '#3273DC'
        case 'PAID': return '#00D1B2'
        case 'HOLD ON': return '#FF8541'
        case 'ON HOLD': return '#FF8541'
        default: return null
      }
    },
    formatDate (params) {
      const date = this.$moment(params)
      if (!params || !date.isValid()) { return null }
      return date.format('DD/MM/YYYY')
    },
    formatDateTime (params) {
      const date = this.$moment(params)
      if (!date.isValid()) { return '-' }
      return date.format('DD/MM/YYYY - hh:mm')
    },
    createPDF (params) {
      const edo = params
      const arrivalDateFormatted = this.$moment(params.arrival_date).format('DD/MM/YYYY')
      const dateNow = this.$moment().format('DD/MM/YYYY')

      toDataURL(require('~/static/logo.png'), (dataURL) => {
        const docDefinition = {
          content: [{
            table: {
              widths: ['55%', '*'],
              headerRows: 2,
              body: [
                [{
                  rowSpan: 2,
                  text: [{
                    text: 'Shipper\n',
                    style: 'label'
                  }, {
                    text: edo.shipper_name + '\r\n' + edo.shipper_address || '-',
                    style: 'content'
                  }]
                }, {
                  layout: 'noBorders',
                  table: {
                    widths: ['*', '*'],
                    body: [[
                      [{
                        text: 'D/O No.',
                        style: 'label'
                      }, {
                        text: edo.edo_number,
                        style: 'content'
                      }],
                      [{
                        text: 'Print Date',
                        style: 'label'
                      }, {
                        text: dateNow,
                        style: 'content'
                      }]
                    ]]
                  }
                }],

                [{}, {
                  layout: 'noBorders',
                  table: {
                    widths: ['*', '*'],
                    body: [[
                      [{
                        text: 'House B/L No.',
                        style: 'label'
                      }, {
                        text: edo.house_bl_number,
                        style: 'content'
                      }],

                      [{
                        text: 'MB/L No.',
                        style: 'label'
                      }, {
                        text: edo.mbl_number,
                        style: 'content'
                      }]
                    ]]
                  }
                }],

                [{
                  text: [
                    {
                      text: 'Consignee\n',
                      style: 'label'
                    },
                    {
                      text: edo.consignee_name + '\r\n' + edo.consignee_address || '-',
                      style: 'content'
                    }
                  ]
                }, {
                  rowSpan: 2,
                  layout: 'noBorders',
                  table: {
                    widths: ['*'],
                    body: [[{
                      image: dataURL,
                      width: 150,
                      margin: [0, 20, 0, 20]
                    }], [{
                      qr: edo.edo_number,
                      fit: '70'
                    }]]
                  },
                  alignment: 'center'
                }],

                [{
                  text: [{
                    text: 'Notify\n',
                    style: 'label'
                  }, {
                    text: edo.notify,
                    style: 'content'
                  }]
                }, {
                }]
              ]
            }
          }, {
            table: {
              widths: ['*', '*', '*'],
              body: [
                [{
                  text: [{
                    text: 'Pre-carriage by\n',
                    style: 'label'
                  }, {
                    text: '-',
                    style: 'content'
                  }]
                }, {
                  text: [{
                    text: 'Place Of Receipt\n',
                    style: 'label'
                  }, {
                    text: edo.place_of_receipt,
                    style: 'content'
                  }]
                }, {
                  text: [{
                    text: 'Arrival Date\n',
                    style: 'label'
                  }, {
                    text: arrivalDateFormatted,
                    style: 'content'
                  }]
                }], [{
                  text: [{
                    text: 'Ocean Vessel\n',
                    style: 'label'
                  }, {
                    text: edo.ocean_vessel,
                    style: 'content'
                  }]
                }, {
                  text: [{
                    text: 'Voyage No.\n',
                    style: 'label'
                  }, {
                    text: edo.voyage_number,
                    style: 'content'
                  }]
                }, {
                  text: [{
                    text: 'Container/Seal no.\n',
                    style: 'label'
                  }, {
                    text: edo.container_seal_number,
                    style: 'content'
                  }]
                }],

                [{
                  text: [{
                    text: 'Port Of Lading\n',
                    style: 'label'
                  }, {
                    text: edo.port_of_loading,
                    style: 'content'
                  }]
                }, {
                  text: [{
                    text: 'Port Of Discharges\n',
                    style: 'label'
                  }, {
                    text: edo.port_of_discharges,
                    style: 'content'
                  }]
                }, {
                  text: [{
                    text: 'Final Destination\n',
                    style: 'label'
                  }, {
                    text: edo.final_destination,
                    style: 'content'
                  }]
                }],

                [{
                  colSpan: 2,
                  text: [{
                    text: 'Description Of Goods\n',
                    style: 'label'
                  }, {
                    text: edo.description_of_goods,
                    style: 'content'
                  }]
                }, {
                }, {
                  layout: 'noBorders',
                  table: {
                    body: [
                      [{
                        text: [{
                          text: 'Gross Weight\n',
                          style: 'label'
                        }, {
                          text: `${edo.gross_weight} KGM`,
                          style: 'content'
                        }],
                        margin: [0, 0, 0, 10]
                      }],
                      [{
                        text: [{
                          text: 'Measurement\n',
                          style: 'label'
                        }, {
                          text: `${edo.measurment} M3`,
                          style: 'content'
                        }],
                        margin: [0, 10, 0, 10]
                      }],
                      [{
                        text: [{
                          text: 'Number Of Package\n',
                          style: 'label'
                        }, {
                          text: edo.number_of_package,
                          style: 'content'
                        }],
                        margin: [0, 10, 0, 5]
                      }]
                    ]
                  }
                }],

                [{
                  colSpan: 3,
                  text: [{
                    text: 'Marks & Numbers\n',
                    style: 'label'
                  }, {
                    text: edo.marks_and_number,
                    style: 'content'
                  }]
                }]
              ]
            }
          }],
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

      function toDataURL (url, callback) {
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
      }
    }
  }
})
