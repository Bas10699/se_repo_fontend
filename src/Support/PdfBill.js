import React, { Component } from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.fonts = {
    THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew Bold.ttf',
        italics: 'THSarabunNew',
        bolditalics: 'THSarabunNew BoldItalic.ttf'
    },
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic (1).ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
    }
}

class Bill extends Component {

    printPDF = () => {
        var Bill = {
            content: [
                {
                    text: 'ชื่อบริษัท',
                    style: 'header',
                    alignment: 'center'
                },
                {
                    text: '287 หมู่ 5 ตำบลสันทรายน้อย อำเภอสันทรายน้อย จังหวัดเชียงใหม่ 50210',
                    alignment: 'center'
                },
                {
                    text: 'โทร. 02-402-8068,081-359-7689 เลขประจำตัวผู้เสียภาษี 0505557001854',
                    alignment: 'center'
                },
                {
                    columns: [
                        {
                            text: ''
                        },
                        {
                            text: 'ใบเสร็จ',
                            style: 'subheader',
                            alignment: 'center'
                        },
                        {
                            table: {
                                widths: [50, 100],
                                body: [
                                    [{text: 'เลขที่', style: 'subheader1', alignment: 'center'}, 'BN610605-002'],
                                    [{text: 'วันที่', style: 'subheader1', alignment: 'center'}, '05/06/2561']
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
                                body: [
                                    ['ผู้ติดต่อ \tอนุสรา เเสนมา \nชื่อบริษัท   บริษัท โชคอนัน จำกัด \nสาขา \t   สำนักงานใหญ่ \t\t\tเลขประจำตัวผู้เสียภาษี 3110801586225 \nที่อยู่ \t23/8 หมู่ที่ 6 ตำบล เอกราช']
                                ]
                            }
                        },
                        {
                            table: {
                                widths: [192.5],
                                heights: 62.5,
                                body: [
                                    ['วันที่นัดชำระ \t\t\t05/06/2561 \nเงื่อนไขการชำระเงิน']
                                ]
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            table: {
                                widths: [25, 40, 134.5, 40, 40, 60, 40, 60],
                                body: [
                                    [{text: 'ลำดับที่', style: 'subheader1', alignment: 'center'}, {text: 'รหัสสินค้า', style: 'subheader1', alignment: 'center'}, {text: 'รายการ', style: 'subheader1', alignment: 'center'}, {text: 'จำนวน', style: 'subheader1', alignment: 'center'}, {text: 'หน่วย', style: 'subheader1', alignment: 'center'}, {text: 'ราคา/หน่วย', style: 'subheader1', alignment: 'center'}, {text: 'ส่วนลด', style: 'subheader1', alignment: 'center'}, {text: 'จำนวนเงิน', style: 'subheader1', alignment: 'center'}]
                                ]
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            table: {
                                widths: [25, 40, 134.5, 40, 40, 60, 40, 60],
                                heights: 300,
                                body: [
                                    ['1 \n2',
                                    'IC-0013 \nDM-003',
                                    'ปริ๊นเตอร์ SAMSUNG รุ่น S1001 \nน้ำบริสุทธิ์',
                                    '3.00 \n1.00',
                                    'เครื่อง \nลิตร',
                                    '4,500.00 \n3,500.00',
                                    ' \n ',
                                    '13,500.00 \n3,500.00']
                                ]
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            table: {
                                widths: [502.5],
                                heights: 50,
                                body: [
                                    [{text: 'หมายเหตุ', style: 'subheader1'}]
                                ]
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            table: {
                                widths: [324.5, 80, 80],
                                body: [
                                    [{text: 'สองหมื่นเจ็ดพันแปดร้อยยี่สิบบ้าทถ้วน', alignment: 'center'}, {text: 'จำนวนเงินทั้งสิ้น', style: 'subheader1', alignment: 'center'}, '27,820.00']
                                ]
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            table: {
                                widths: [159],
                                heights: 80,
                                body: [
                                    ['ในนาม \n\nสำนักงานใหญ่ \n_________________________ \nผู้มีอำนาจลงนาม']
                                ]
                            }
                        },
                        {
                            table: {
                                widths: [159],
                                heights: 80,
                                body: [
                                    ['\nจัดเตรียมโดย ____________________ \n\nตรวจสอบโดย ____________________']
                                ]
                            }
                        },
                        {
                            table: {
                                widths: [159],
                                heights: 80,
                                body: [
                                    ['ชำระโดย \nเงินสด \tเช็ค \nธนาคาร \nเลขที่__________ \t\tวันที่__________ \nผู้รับเงิน']
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

        pdfMake.createPdf(Bill).open()

    }

    render() {
        return (

            <div>
            <button className="BTN_PDF" onClick={() => { this.printPDF() }} >ดูรายละเอียดใบเสร็จ</button>
            </div>

        )
    }
} export default Bill;