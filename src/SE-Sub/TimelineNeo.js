import React, { Component } from 'react';
import { post, ip } from '../Support/Service';
import { user_token, addComma } from '../Support/Constance';
import queryString from 'query-string';
import PdfOrder from '../SE-Middle/pdfOrderNeo';
import PdfInvoice from '../Support/PdfInvoice'
import PdfBill from '../Support/PdfBill'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import one from '../Image/one.png'
import two from '../Image/two.png'
import twodis from '../Image/twodis.png'
import three from '../Image/three.png'
import threedis from '../Image/threedis.png'
import four from '../Image/four.png'
import fourdis from '../Image/fourdis.png'
import five from '../Image/five.png'
import fivedis from '../Image/fivedis.png'
import Modal from 'react-responsive-modal'

// import FrequencyPlant from './frequency_plant'
// import HTimeline from '../Timeline';

class TimelineNeo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            num: false,
            order: [],
            detail: [],
            plant: null,
            data: [],
            status: 1,
            OpenProofPaymet: false,
            photo_profile: "https://i.stack.imgur.com/l60Hf.png",
            tag0: "https://image.flaticon.com/icons/svg/1161/1161832.svg",
            tag1: "https://image.flaticon.com/icons/svg/1161/1161833.svg",
            tag_default: "https://image.flaticon.com/icons/svg/1161/1161830.svg"
        }
    }

    onCloseModal = () => {
        this.setState({ OpenProofPaymet: false });

    };

    confirm_payment = async () => {
        const object = {
            order_se_id: this.props.order.order_se_id,
            status: 3
        }
        try {
            await post(object, 'neo_firm/update_order_se_status', user_token).then((result) => {
                if (result.success) {
                    window.location.reload()
                    setTimeout(() => {
                        console.log("confirm_payment", result.result)
                    }, 500)
                } else {
                    // window.location.href = "/";
                    alert(result.error_message)
                    console.log("confirm_payment_err", result.result)
                }
            })
        }
        catch (error) {
            alert("confirm_payment" + error);
        }
    }



    render_Step = (status) => {
        let render_Show
        switch (status) {
            case 1: render_Show = <div>ใบสั่งซื้อ</div>
                break;
            case 2: render_Show = <div>ยืนยันคำสั่งซื้อ</div>
                break;
            case 3: render_Show = <div>ใบเเจ้งหนี้</div>
                break;
            case 4: render_Show = <div>ใบเสร็จ</div>
                break;

            default:
                break;
        }
        return render_Show
    }
    sum_price = (data_price) => {
        let sum = 0;
        data_price.map((element) => {
            sum += (element.price * element.amount)
        })
        return sum;

    }

    render() {

        return (
            <div className="App">
                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <ul className="Progressbar">
                            <li className={this.props.status >= 0 ? "Standat1" : "Standat1"}>
                                <img src={one} alt="one"
                                    style={{ width: "25px", marginTop: "-10px", marginLeft: "112%" }} />
                                <div style={{ marginLeft: "105%", width: "100%" }}>
                                    ส่งใบสั่งซื้อ
                                    </div>
                                {/* {this.props.status >= 0 ? 
                                    <div style={{ marginLeft: "88%", width: "150%" }}><PdfOrder data={this.props.order} /></div>
                                    :
                                    null 
                                 } */}
                            </li>


                            <li className={this.props.status >= 1 ? "Status" : "Standat"}>
                                <img src={this.props.status >= 1 ? two : twodis} alt="two"
                                    style={{ width: "25px", marginTop: "-10px", marginLeft: "100%", zIndex: "1000" }} />
                                <div style={{ marginLeft: "86%", width: "100%" }} >
                                    ยืนยันคำสั่งซื้อแล้ว
                                    </div>
                                {/* {this.props.status >= 1 ?
                                    <div style={{ marginLeft: "75%", width: "160%" }}>
                                        <PdfInvoice data={this.props.invoice} order={this.props.order} />
                                    </div>
                                    :
                                    null
                                } */}
                            </li>

                            <li className={this.props.status >= 3 ? "Status" : "Standat"}>
                                <img src={this.props.status >= 3 ? three : threedis} alt="three"
                                    style={{ width: "25px", marginTop: "-10px", marginLeft: "100%", zIndex: "1000" }} />
                                <div style={{ marginLeft: "93%", width: "100%" }} >
                                    ชำระเงินแล้ว
                                    </div>
                                {/* {this.props.status >= 2 ?
                                    <div style={{ marginLeft: "75%", width: "160%" }}>
                                        <button className="BTN_PDF" onClick={() => this.setState({ OpenProofPaymet: true })} >หลักฐานการโอน</button>
                                    </div>
                                    :
                                    null
                                } */}

                            </li>
                            <li className={this.props.status >= 4 ? "Status" : "Standat"}>
                                <img src={this.props.status >= 4 ? four : fourdis} alt="four"
                                    style={{ width: "25px", marginTop: "-10px", marginLeft: "100%", zIndex: "1000" }} />
                                <div style={{ marginLeft: "86%", width: "100%" }} >
                                    สินค้าทำการจัดส่ง
                                    </div>
                                {/* {this.props.status >= 2 ?
                                    <div style={{ marginLeft: "75%", width: "160%" }}>
                                        <PdfBill data={this.props.order} invoice={this.props.invoice} payment={this.props.payment} />
                                    </div>
                                    :
                                    null
                                } */}

                            </li>

                            {/* <li className={this.props.status >= 4 ? "Status" : "Standat"}>
                                <img src={this.props.status >= 4 ? five : fivedis} alt="five"
                                    style={{ width: "25px", marginTop: "-10px", marginLeft: "100%", zIndex: "1000" }} />
                                <div style={{ marginLeft: "86%", width: "100%" }} >
                                    ตรวจสอบสินค้า
                                    </div>
                            </li> */}

                        </ul>

                    </div>
                </div>

                {this.props.status >= 0 ?
                    <div style={{ marginLeft: "2.5%", width: "30%", marginTop: "-40px" }}>
                        {console.log('gg', this.props.order)}
                        <PdfOrder data={this.props.order} />
                    </div>
                    :
                    null
                }
                {this.props.status >= 1 ?
                    <div style={{ marginLeft: "22.8%", width: "30%", marginTop: "-40px" }}>
                        <PdfInvoice data={this.props.invoice} order={this.props.order} />
                    </div>
                    :
                    null
                }
                {this.props.status >= 3 ?
                    <div style={{ marginLeft: "43.1%", width: "30%", marginTop: "-40px" }}>
                         <PdfBill data={this.props.order} invoice={this.props.invoice} payment={this.props.payment} />
                    </div>
                    :
                    null
                }
                {this.props.status >= 4 ?
                    <div style={{ marginLeft: "53%", width: "30%", marginTop: "-40px" }}>
                        {/* <PdfBill data={this.props.order} invoice={this.props.invoice} payment={this.props.payment} /> */}
                    </div>
                    :
                    null
                }
                <Modal open={this.state.OpenProofPaymet} onClose={this.onCloseModal}>
                    <div className="Row">
                        <div className="col-12" >
                            <h3 style={{ textAlign: "center" }}>รายละเอียดการชำระเงิน</h3>
                        </div>
                    </div>
                    <div className="Row" style={{ width: "800px" }}>
                        <div className="col-7" >
                            <a target="_blank" href={ip + this.props.order.order_se_payment_image}>
                                <img src={ip + this.props.order.order_se_payment_image}
                                    style={{ height: "100%", width: "80%", display: "block", marginLeft: "auto", marginRight: "auto", objectFit: "cover" }} alt="หลักฐานการโอน" />
                            </a>
                        </div>
                        <div className="col-5">

                            <h4>อ้างอิงถึงใบสั่งซื้อเลขที่ : {this.props.order.order_se_id} </h4>
                            <h4>อ้างอิงถึงใบแจ้งหนี้เลขที่ : {this.props.order.order_se_invoice_id}</h4>
                            <h4>วันที่กำหนดชำระเงิน : {moment(this.props.order.order_se_invoice_date_send).format('DD/MM/YYYY')}</h4>
                            <h4>วันที่ชำระเงิน : {moment(this.props.order.order_se_Payment_date).format('DD/MM/YYYY')} </h4>
                            <h4>เวลาที่ชำระเงิน : {this.props.order.order_se_Payment_time}</h4>
                            {/* <h4>จำนวนเงิน : {addComma(this.sum_price(this.props.detail))} บาท</h4> */}

                            {/* <button className="BTN_CONFIRM" onClick={() => this.confirm_payment()} >ออกใบเสร็จ</button>
                            <button className="BTN_PDF" onClick={() => this.setState({ OpenBill: false })}>ยกเลิก</button> */}
                        </div>

                    </div>
                </Modal>
            </div>
        )
    }
}
export default TimelineNeo;