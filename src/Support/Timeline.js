import React, { Component } from 'react';
import { post, ip } from '../Support/Service';
import { user_token, addComma } from '../Support/Constance';
import queryString from 'query-string';
import PdfOrder from './PdfOrder';
import PdfInvoice from './PdfInvoice'
import PdfBill from './PdfBill'
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

class Timeline extends Component {
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
                                    style={{ width: "25px", marginTop: "-10px", marginLeft: "112%", zIndex: "1000" }} />
                                <div style={{ marginLeft: "105%", width: "100%" }}>
                                    ส่งใบสั่งซื้อ
                                    </div>
                                {/* {this.props.status >= 0 ?
                                    <div style={{ marginLeft: "88%", width: "150%" }}>
                                        <PdfOrder data={this.props.order} />
                                    </div>
                                    :
                                    null
                                } */}
                            </li>


                            <li className={this.props.status >= 1 ? "Status" : "Standat"}>
                                <img src={this.props.status >= 1 ? two : twodis} alt="two"
                                    style={{ width: "25px", marginTop: "-10px", marginLeft: "100%", zIndex: "1000" }} />
                                <div style={{ marginLeft: "86%", width: "100%" }}>
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
                                <div style={{ marginLeft: "84%", width: "100%" }} >
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

                            {/* <li className={this.props.status >= 5 ? "Status" : "Standat"}>
                                <img src={this.props.status >= 5 ? five : fivedis} alt="five"
                                    style={{ width: "25px", marginTop: "-10px", marginLeft: "100%", zIndex: "1000" }} />
                                <div style={{ marginLeft: "95%", width: "100%" }} >
                                    เรียบร้อย
                                    </div>
                            </li> */}

                        </ul>



                        {this.props.status >= 0 ?
                            <div style={{ marginLeft: "-7%", width: "40%", marginTop: "-40px" }}>
                                <PdfOrder data={this.props.order} />
                            </div>
                            :
                            null
                        }
                        {this.props.status >= 1 ?
                            <div style={{ marginLeft: "23.2%", width: "40%", marginTop: "-40px" }}>
                                <PdfInvoice data={this.props.invoice} order={this.props.order} />
                            </div>
                            :
                            null
                        }                        
                        {this.props.status >= 3 ?
                            <div style={{ marginLeft: "54.5%", width: "40%", marginTop: "-40px" }}>
                                <PdfBill data={this.props.order} invoice={this.props.invoice} payment={this.props.payment} />
                            </div>
                            :
                            null
                        }
                        {this.props.status >= 4 ?
                            <div style={{ marginLeft: "83%", width: "40%", marginTop: "-40px",marginBottom:"20px" }}>
                                หมายเลขพัสดุ : SHP4042678386
                            </div>
                            :
                            null
                        }
                    </div>
                </div>

                <Modal open={this.state.OpenProofPaymet} onClose={this.onCloseModal}>
                    <div className="Row">
                        <div className="col-12" >
                            <h3 style={{ textAlign: "center" }}>รายละเอียดการชำระเงิน</h3>
                        </div>
                    </div>
                    <div className="Row" style={{ width: "800px" }}>
                        <div className="col-7" >
                            <a target="_blank" href={ip + this.props.payment.image_proof}>
                                <img src={ip + this.props.payment.image_proof}
                                    style={{ height: "100%", width: "80%", display: "block", marginLeft: "auto", marginRight: "auto", objectFit: "cover" }} alt="หลักฐานการโอน" />
                            </a>
                        </div>
                        <div className="col-5">

                            <h4>อ้างอิงถึงใบสั่งซื้อเลขที่ : {this.props.order.order_id} </h4>
                            <h4>อ้างอิงถึงใบแจ้งหนี้เลขที่ : {this.props.invoice.invoice_id}</h4>
                            <h4>วันที่กำหนดชำระเงิน : {moment(this.props.invoice.date_send).format('DD/MM/YYYY')}</h4>
                            <h4>วันที่ชำระเงิน : {moment(this.props.payment.date_proof).format('DD/MM/YYYY')} </h4>
                            <h4>เวลาที่ชำระเงิน : {this.props.payment.time_proof}</h4>
                            <h4>จำนวนเงิน : {addComma(this.sum_price(this.props.detail))} บาท</h4>

                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default Timeline;