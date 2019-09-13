import React, { Component } from 'react';
import moment from 'moment'
import ThaiBaht from 'thai-baht-text'
import {addComma} from './Constance'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew Bold.ttf',
    italics: 'THSarabunNew Italic.ttf',
    bolditalics: 'THSarabunNew BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}

class PdfOrder extends Component {


  printPDF() {
    var total_price = 0
    var tax = 0
    var Purchase_orders = {
      content: [
        {
          text: 'ชื่อบริษัท',
          bold: true ,
          style: 'header',
          alignment: 'center'
        },
        {
          text: '2571/1 ถ.รามคำเเหง เเขวงหัวหมาก เขตบางกะปิ กรุงเทพฯ 10240',
          alignment: 'center'
        },
        {
          text: 'โทร. 0-2739-5900 โทรสาร 0-2739-5910 เลขประจำตัวผู้เสียภาษี 3125523223',
          alignment: 'center'
        },
        {
          columns: [
            {
              text: ''
            },
            {
              text: 'ใบสั่งซื้อ',
              bold: true ,
              style: 'subheader',
              alignment: 'center'
            },
            {
              table: {
                widths: [50, 100],
                body: [
                  [{ text: 'เลขที่', style: 'subheader1', alignment: 'center' ,fillColor: '#cccccc'}, this.props.data.order_id],
                  [{ text: 'วันที่', style: 'subheader1', alignment: 'center' ,fillColor: '#cccccc'}, moment(this.props.data.order_date).utc().format("DD/MM/YYYY")]
                ]
              }
            },
          ]
        },
        {
          columns: [
            {
              style: 'tableExample',
              table: {
                widths: [280, 212.5],
                heights: 90,
                body: [
                  [`ผู้ติดต่อ \t\t${this.props.data.name} ${this.props.data.lastname} \nชื่อบริษัท \t  บริษัท เอสคอร์ท เอ็นจิเนียริ่ง เอ็นเตอร์ไพรส์ จำกัด \nสาขา \t\t   สำนักงานใหญ่ \nที่อยู่ \t\t\t${this.props.data.address} \n\nโทร. \t\t\t${this.props.data.phone} `,
                    `วันที่กำหนดส่ง ${moment(this.props.data.date_send).format('DD/MM/YYYY')}\nจำนวนวันเครดิต \nที่อยู่จัดส่ง \n${this.props.data.address_send}`]
                ]
              }
            },
          ]
        },
        {
          columns: [
            {
              table: {
                style: 'tableExample',
                widths: [20.5, 40, 178, 40, 40, 65, 65],
                heights: ['*', 280],
                body: [
                  [{ text: 'ลำดับ', style: 'subheader1', alignment: 'center', bold: true ,fillColor: '#cccccc'},
                  { text: 'รหัสสินค้า', style: 'subheader1', alignment: 'center' , bold: true ,fillColor: '#cccccc'},
                  { text: 'รายการ', style: 'subheader1', alignment: 'center' , bold: true ,fillColor: '#cccccc'},
                  { text: 'ราคา/หน่วย', style: 'subheader1', alignment: 'center', bold: true  ,fillColor: '#cccccc'},
                  { text: 'จำนวน', style: 'subheader1', alignment: 'center', bold: true  ,fillColor: '#cccccc'},
                  { text: 'หน่วยนับ', style: 'subheader1', alignment: 'center', bold: true  ,fillColor: '#cccccc'},
                  { text: 'จำนวนเงิน', style: 'subheader1', alignment: 'center', bold: true ,fillColor: '#cccccc' }],
                  [{
                    table: {
                      widths: [20.5, 42, 176, 40, 40, 65, 65],
                      body: [
                        ...this.props.data.detail.map((element, index) => {
                          total_price+=element.price * element.amount
                          return [{ text: index + 1, alignment: 'center' },
                          { text: element.plant_id, alignment: 'center' },
                          element.plant_name,
                          { text: addComma(element.price), alignment: 'center' },
                          { text: addComma(element.amount), alignment: 'center' },
                          { text: 'กิโลกรัม', alignment: 'center' },
                          { text: addComma(element.price * element.amount), alignment: 'center' }]
                        })
                      ]
                    },
                    layout: 'noBorders'
                  }, '', '', '', '', '', ''],
                ]

              }
            }
          ]
        },
        {
          columns: [
            {
              table: {
                widths: [320,80, 84.5],
                body: [
                  [{ text: 'หมายเหตุ',rowSpan: 4,border: [true, false, true, true],},
                    { border: [true, false, true, true],text: 'รวมเงิน',  }, 
                    { border: [true, false, true, true],text: addComma(total_price),alignment: 'right'}],
                  ['',{ text: 'ส่วนลด' }, ' '],
                  ['',{ text: 'มูลค่าหลังหักส่วนลด' }, {text:addComma(total_price),alignment: 'right'}],
                  ['',{ text: 'ภาษีมูลค่าเพิ่ม \t7%' }, {text:addComma(tax=Math.ceil(total_price*0.07)),alignment: 'right'}],
                  [{ text: ThaiBaht(total_price+tax), alignment: 'center',fillColor: '#dddddd' },'จำนวนเงินทั้งสิ้น', {text:addComma(total_price+tax),alignment: 'right'}]
                ],
              }
            },
            
          ]
        },
        {
          columns: [
            {
              table: {
                widths: [250],
                heights: [15, 89],
                body: [
                  [{ text: 'เงื่อนไขอื่นๆ', style: 'subheader1',border: [true, false, true, true], }],
                  ['\n(1) โปรดระบุเลขที่ใบสั่งซื้อข้างต้น ในใบส่งของทุกฉบับ \n(2) การวางบิลเเละการรับเช็ค เป็นไปตามกำหนดเวลาที่บริษัทกำหนดไว้ \n(3) ในการวางบิลเพื่อเรียกเก็บ ให้เเนบสำเนาใบสั่งซื้อกำกับมาด้วย']
                ]
              }
            },
            {
              table: {
                widths: [110, 124],
                heights: 50,
                body: [
                  [{text:'ผู้จัดทำ \n\n_______________ \n\nผู้ตรวจสอบ \n\n_______________',border: [false, false, true, true],}, {text:'\n\n\n\n\n_________________________ \nผู้มีอำนาจลงนาม',border: [true, false, true, true],}]
                ]
              }
            }
          ]
        }
      ],

      styles: {
        header: {
          fontSize: 22,
          bold: true
        },
        subheader: {
          fontSize: 16,
          bold: true
        },
        subheader1: {
          fontSize: 12,
          bold: true
        },
        tableExample: {
          margin: [0, 5, 0, 5]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
      defaultStyle: {
        font: 'THSarabunNew',
      }
    }

    pdfMake.createPdf(Purchase_orders).open()
    

  }
  render() {
    return (
      <div>
        <button className="BTN_PDF" onClick={() => { this.printPDF() }}>ดูรายละเอียดใบสั่งซื้อ</button>
      </div>
    )
  }

}
export default PdfOrder;