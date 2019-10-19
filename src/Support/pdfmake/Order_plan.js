import React, { Component } from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

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
        var Order_plan = {
            content: [
                {
                    text: 'ชื่อบริษัท',
                    style: 'header',
                    alignment: 'center'
                },
                {
                    text: 'ที่อยู่',
                    alignment: 'center'
                },
                {
                    columns: [
                        {
                            text: ''
                        },
                        {
                            text: 'แผนการสั่งซื้อ',
                            style: 'subheader',
                            alignment: 'center'
                        },
                        {
                            table: {
                                widths: [30, 120],
                                body: [
                                    [{text: 'เลขที่', style: 'subheader1', alignment: 'center'}, '11111-11111'],
                                    [{text: 'วันที่', style: 'subheader1', alignment: 'center'}, '19/10/2562']
                                ]
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            table: {
                                widths: [50, 100],
                                dody: [
                                    [{text: 'ชื่อผู้รับ', style: 'subheader1', alignment: 'center'}, ''],
                                    [{text: 'ที่อยู่', style: 'subheader1', alignment: 'center'}, ''],
                                    [{text: 'เบอร์โทร', style: 'subheader1', alignment: 'center'}, '']
                                ]
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            table: {
                                widths: [20, 50, 150, 30, 30, 50, 50],
                                body: [
                                    [{text: 'ลำดับ', style: 'subheader1', alignment: 'center'}, {text: 'รหัสสินค้า', style: 'subheader1', alignment: 'center'}, {text: 'รายการ', style: 'subheader1', alignment: 'center'}, {text: 'ราคา/หน่วย', style: 'subheader1', alignment: 'center'}, {text: 'จำนวน', style: 'subheader1', alignment: 'center'}, {text: 'หน่ยย', style: 'subheader1', alignment: 'center'}, {text: 'จำนวนเงิน', style: 'subheader1', alignment: 'center'}]
                                ]
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            table: {
                                widths: [20, 50, 150, 30, 50, 50],
                                heights: 300,
                                body: [
                                    ['1 \n2',
                                    '1234 \nCar-10',
                                    'ข้าว \nขนส่ง',
                                    '10 \n1',
                                    '50 \n50',
                                    'กิโลกรัม \nกิโลกรัม',
                                    '500 \n50']
                                ]
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            table: {
                                widths: [300],
                                heights: [100],
                                body: [
                                    [{text: 'หมายเหตุ', style: 'subheader1'}]
                                ]
                            }
                        },
                        {
                            table: {
                                widths: [50, 150],
                                body: [
                                    [{text: 'รวมเงิน', style: 'subheader1'}, ''],
                                    [{text: 'ส่วนลด', style: 'subheader1'}, ''],
                                    [{text: 'มูลค่าหลังหักส่วนลด', style: 'subheader1'}, ''],
                                    [{text: 'ภาษีมูลค่าเพิ่ม', style: 'subheader1'}, '']
                                ]
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            table: {
                                widths: [250],
                                body: [
                                    [{text: '(จำนวนเงินภาษาไทย)', style: 'subheader1', alignment: 'center'}]
                                ]
                            }
                        },
                        {
                            table: {
                                widths: [100, 150],
                                body: [
                                    [{text: 'จำนวนเงินทั้งสิ้น', style: 'subheader1'}, '']
                                ]
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            table: {
                                widths: [250],
                                heights: [100],
                                body: [
                                    [{text: 'เงื่อนไข', style: 'subheader1', alignment: 'center'}],
                                    ['']
                                ]
                            }
                        },
                        {
                            table: {
                                widths: [100],
                                heights: [100],
                                body: [
                                    []
                                ]
                            }
                        },
                        {
                            table: {
                                widths: [100],
                                heights: [100],
                                body: [
                                    []
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
                }
            },
            defaultStyle: {
                font: 'THSarabunNew'
            }
        }
        pdfMake.createPdf(Order_plan).open()
    }

    render () {
        return (
            <div>{this.printPDF()}</div>
        )
    }
} export default Order_plan;