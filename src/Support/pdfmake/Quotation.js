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

class Quotation extends Component {

    printPDF = () => {
        var Quotation = {
            content: [
                {
                    text: 'ชื่อบริษัท',
                    style: 'header',
                    alignment: 'center'
                },
                {
                    text: '2571/1 อาคารซอฟต์เเวร์รีสอร์ท ถ.รามคำเเหง เเขวงหัวหมาก เขตบางกะปิ กรุงเทพฯ 10240',
                    alignment: 'center'
                },
                {
                    text: 'โทร. 0-2739-5900 โทรสาร 0-2739-5910,0-2739-5901,0-2739-5940',
                    alignment: 'center'
                },
                {
                    columns: [
                        {
                            text:''
                        },
                        {
                            text: 'ใบเสนอราคา',
                            style: 'subheader',
                            alignment: 'center'
                        },
                        {
                            table: {
                                widths: [30, 127.5],
                                body: [
                                    [{text: 'เลขที่', style: 'subheader1', alignment: 'center'}, 'QU171227-002'],
                                    [{text: 'วันที่', style: 'subheader1', alignment: 'center'}, '27/12/2017']
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
                                    ['ผู้ติดต่อ \t\tคุณ สมหมาย ศิริเลิศสมบัติ \nชื่อบริษัท \t  บริษัท สยามสไตรีนโมโนเมอร์ จำกัด \nสาขา \t\t   สำนักงานใหญ่ \t\t\t\tเลขประจำตัวผู้เสียภาษี \nที่อยู่ \t\t\t75/1 ซอยเเสงจันทร์-รูเบีย ถนนสุขุมวิท พระโขนง \nเขตคลองเตย กรุงเทพมหานคร \nโทร. \t\t\t0-2381-1038 \t\t\t\tโทรสาร \t\t0-2381-1037']
                                ]
                            }
                        },
                        {
                            columns: [
                                {
                                    table: {
                                        widths: [209.5],
                                        heights: 93.5,
                                        body: [
                                            ['วันที่กำหนดส่ง \nยืนยันราคาภายใน \nExpire Date \nจำนวนวันเครดิต \t30 วัน']
                                        ]
                                    }
                                }
                            ]            
                        }
                        
                    ]
                },
                {
                    columns: [
                        {
                            table: {
                                widths: [20, 50, 126, 40, 40, 70, 40, 70],
                                body: [
                                    [{text: 'ลำดับ', style: 'subheader1', alignment: 'center'}, {text: 'รหัสสินค้า', style: 'subheader1', alignment: 'center'}, {text: 'รายการ', style: 'subheader1', alignment: 'center'}, {text: 'จำนวน', style: 'subheader1', alignment: 'center'}, {text: 'หน่วย', style: 'subheader1', alignment: 'center'}, {text: 'ราคา/หน่วย', style: 'subheader1', alignment: 'center'}, {text: 'ส่วนลด', style: 'subheader1', alignment: 'center'}, {text: 'จำนวนเงิน', style: 'subheader1', alignment: 'center'}]
                                ]
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            table: {
                                widths: [20, 50, 126, 40, 40, 70, 40, 70],
                                heights: 250,
                                body: [
                                    ['1 \n2 \n3 \n4',
                                    'IC-001 \nIC-002 \nIC-003 \nIC-004',
                                    'CPU Socket AMD FM2 \nCPU Socket LGA-1151 \nCPU Socket AMD AM3+ \nจอภาพ LED ACER',
                                    '10.00 \n10.00 \n10.00 \n10.00',
                                    'กล่อง \nชิ้น \nชิ้น \nเครื่อง',
                                    '15,840.00 \n1,890.00 \n3,280.00 \n2,490.00',
                                    '',
                                    '158,400.00 \n18,900.00 \n32,800.00 \n24,900.00']
                                ]
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            table: {
                                widths: [312],
                                heights: 77.5,
                                body: [
                                    [{text: 'หมายเหตุ', style: 'subheader1'}]
                                ]
                            }
                        },
                        {
                            table: {
                                widths: [118, 70],
                                body: [
                                    [{text: 'รวมเงิน', style: 'subheader1'}, '235,000.00'],
                                    [{text: 'ส่วนลด \t\t\t\t\t\t5,000', style: 'subheader1'}, '5,000.00'],
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
                                widths: [312],
                                body: [
                                    [{text: '(สองแสนสามหมื่นบาทถ้วน)', style: 'subheader1', alignment: 'center'}]
                                ]
                            }
                        },
                        {
                            table: {
                                widths: [118, 70],
                                body: [
                                    [{text: 'จำนวนเงินทั้งสิ้น', style: 'subheader1'}, '230,000.00']
                                ]
                            }
                        }
                    ]
                },
                {
                    columns: [
                        {
                            table: {
                                widths: [160],
                                heights: 120,
                                body: [
                                    ['\n\n\n ______________________________________ \nผู้อนุมัติซื้อ \n\nวันที่']
                                ]
                            }
                        },
                        {
                            table: {
                                widths: [160],
                                heights: 100,
                                body: [
                                    ['\n\n\n ______________________________________ \nสุภาวดี ถีปรี \nพนักงานขาย \nวันที่ 27/12/2017']
                                ]
                            }
                        },
                        {
                            table: {
                                widths: [166.5],
                                heights: 120,
                                body: [
                                    ['\n\n\n\n ______________________________________ \n\nผู้จัดการฝ่ายขาย \n\nวันที่ ']
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

        pdfMake.createPdf(Quotation).open()

    }

    render() {
        return (

            <div>{this.printPDF()}</div>

        )
    }
} export default Quotation;