import React, { Component } from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import ThaiBaht from'thai-baht-text'

pdfMake.fonts = {
    THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew Bold.ttf',
        italics: 'THSarabunNew',
        bolditalics: 'THSarabunNew BoldItalic,ttf'
    },
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic (1).ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
    }
}

class Order_plan extends Component {

    printPDF = () => {
        console.log('gg',this.props)
        var Order_plan = {
            content: [
                {
                    text: 'ชื่อบริษัท',
                    bold: true,
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
                            text: 'ใบสำคัญรับเงิน',
                            bold: true,
                            style: 'subheader',
                            alignment: 'center'
                        },
                        {
                            table: {
                                widths: [50, 100],
                                body: [
                                    [{ text: 'เลขที่', style: 'subheader1', alignment: 'center', fillColor: '#cccccc' }, 'PO20102562-25'],
                                    [{ text: 'วันที่', style: 'subheader1', alignment: 'center', fillColor: '#cccccc' }, '20/10/2562']
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
                                widths: [503],
                                heights: 50,
                                body: [
                                    [`ผู้ติดต่อ \t\t${this.props.data.order_farmer_title_name}${this.props.data.order_farmer_name} ${this.props.data.order_farmer_lastname}  \nที่อยู่ \t\t   74 หมู่ 7 ตำบลสันทรายงาม อำเภอเทิง จังหวัดเชียงราย 57160 \nโทร \t\t\t086-4000208 `,
                                    ]
                                ]
                            }
                        },
                    ]
                },
                {
                    columns: [
                        {
                            table: {
                                widths: [20.5, 40, 178, 40, 40, 65, 65],
                                heights: ['*', 280],
                                body: [
                                    [{ text: 'ลำดับ', style: 'subheader1', alignment: 'center',bold: true, fillColor: '#cccccc' },
                                    { text: 'รหัสสินค้า', style: 'subheader1', alignment: 'center',bold: true, fillColor: '#cccccc' },
                                    { text: 'รายการ', style: 'subheader1', alignment: 'center',bold: true, fillColor: '#cccccc' },
                                    { text: 'ราคา/หน่วย', style: 'subheader1', alignment: 'center',bold: true, fillColor: '#cccccc' },
                                    { text: 'จำนวน', style: 'subheader1', alignment: 'center',bold: true, fillColor: '#cccccc' },
                                    { text: 'หน่วย', style: 'subheader1', alignment: 'center',bold: true, fillColor: '#cccccc' },
                                    { text: 'จำนวนเงิน', style: 'subheader1', alignment: 'center',bold: true, fillColor: '#cccccc' }],
                                    [{
                                        table: {
                                            widths: [20.5, 40, 178, 40, 40, 65, 65],
                                            body: [
                                                [{ text: '1', alignment: 'center' },
                                                { text: '15', alignment: 'center' },
                                                    'ข้าว กข.6',
                                                { text: '15', alignment: 'center' },
                                                { text: this.props.data.order_farmer_plant_volume, alignment: 'center' },
                                                { text: 'กิโลกรัม', alignment: 'center' },
                                                { text: this.props.data.order_farmer_plant_cost*this.props.data.order_farmer_plant_volume, alignment: 'center' }]

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
                                widths: [305.5,114, 65],
                                body: [
                                    [{ text: 'หมายเหตุ', rowSpan: 4, border: [true, false, true, true], },
                                    { border: [true, false, true, true], text: 'ราคาก่อนรวมภาษี', },
                                    { border: [true, false, true, true], text: ((this.props.data.order_farmer_plant_cost*this.props.data.order_farmer_plant_volume)-(this.props.data.order_farmer_plant_cost*this.props.data.order_farmer_plant_volume)*7/100), alignment: 'right' }],
                                    ['', { text: 'ส่วนลด'}, { text: '-', alignment: 'right' }],
                                    ['', { text: 'มูลค่าหลังหักส่วนลด' }, { text: '-', alignment: 'right' }],
                                    ['', { text: 'ภาษีมูลค่าเพิ่ม \t7%' }, { text: (this.props.data.order_farmer_plant_cost*this.props.data.order_farmer_plant_volume)*7/100 , alignment: 'right' }],
                                    [{ text: ThaiBaht(this.props.data.order_farmer_plant_cost*this.props.data.order_farmer_plant_volume), alignment: 'center', fillColor: '#dddddd' }, 'จำนวนเงินทั้งสิ้น', { text: this.props.data.order_farmer_plant_cost*this.props.data.order_farmer_plant_volume, alignment: 'right' }]
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
                                    [{ text: 'เงื่อนไขอื่นๆ', style: 'subheader1', border: [true, false, true, true], }],
                                    ['\n(1) โปรดระบุเลขที่ใบสั่งซื้อข้างต้น ในใบส่งของทุกฉบับ \n(2) การวางบิลเเละการรับเช็ค เป็นไปตามกำหนดเวลาที่บริษัทกำหนดไว้ \n(3) ในการวางบิลเพื่อเรียกเก็บ ให้เเนบสำเนาใบสั่งซื้อกำกับมาด้วย']
                                ]
                            }
                        },
                        {
                            table: {
                                widths: [110, 124],
                                heights: 50,
                                body: [
                                    [{ text: '\n\n\n\n\n_________________________ \nผู้รับเงิน', border: [false, false, true, true], }, { text: '\n\n\n\n\n_________________________ \nผู้มอบเงิน', border: [true, false, true, true], }]
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
                font: 'THSarabunNew'
            }
        }
        pdfMake.createPdf(Order_plan).open(window)
    }

    render() {
        return (
            <button className="BTN_Signup" onClick={() => this.printPDF()}>ดูใบสำคัญรับเงิน</button>
        )
    }
} export default Order_plan;