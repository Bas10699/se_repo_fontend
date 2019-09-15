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
                            {this.props.status >= 0 ?
                                <li className="Status" >
                                    <img src={one} alt="one"
                                        style={{ width: "25px", marginTop: "-10px", marginLeft: "0%", zIndex: "1000" }} />
                                    <br /><div style={{ textAlign: "center", marginLeft: "-90%" }}>ส่งใบสั่งซื้อ<br />
                                        {moment(this.props.order.order_date).format('DD/MM/YYYY HH:mm')}
                                        <PdfOrder data={this.props.order} />
                                    </div></li>
                                : <li className="Standat" >
                                    <img src={one} alt="one"
                                        style={{ width: "25px", marginTop: "-10px", marginLeft: "0%", filter: "grayscale(100%)", backgroundColor: "white" }} />
                                    <br /><div style={{ textAlign: "center", marginLeft: "-90%" }}>ส่งใบสั่งซื้อ</div></li>}

                            {this.props.status >= 1 ?
                                <li className="Status" >
                                    <img src={two} alt="two"
                                        style={{ width: "25px", marginTop: "-10px", marginLeft: "0%", zIndex: "1000" }} />
                                    <br /><div style={{ textAlign: "center", marginLeft: "-90%" }}>ยืนยันคำสั่งซื้อแล้ว<br />
                                        {moment(this.props.order.order_date).format('DD/MM/YYYY HH:mm')}
                                        <PdfInvoice data={this.props.invoice} />
                                    </div></li>
                                : <li className="Standat">
                                    <img src={twodis} alt="two"
                                        style={{ width: "25px", marginTop: "-10px", marginLeft: "0%", filter: "grayscale(100%)", backgroundColor: "white" }} />
                                    <br /><div style={{ textAlign: "center", marginLeft: "-90%" }}>ยืนยันคำสั่งซื้อแล้ว</div></li>}

                            {this.props.status >= 2 ? <li className="Status" >
                                <img src={three} alt="three"
                                    style={{ width: "25px", marginTop: "-10px", marginLeft: "0%", zIndex: "1000" }} />
                                <br /><div style={{ textAlign: "center", marginLeft: "-90%" }}>ชำระเงินแล้ว<br />
                                    {moment(this.props.order.order_date).format('DD/MM/YYYY HH:mm')}<br />
                                    <button className="BTN_PDF" onClick={() => this.setState({ OpenProofPaymet: true })} >หลักฐานการโอน</button>
                                    </div></li>
                                : <li className="Standat" >
                                    <img src={threedis} alt="three"
                                        style={{ width: "25px", marginTop: "-10px", marginLeft: "0%", filter: "grayscale(100%)", backgroundColor: "white" }} />
                                    <br /><div style={{ textAlign: "center", marginLeft: "-90%" }}>ชำระเงินแล้ว</div></li>}

                            {this.props.status >= 3 ? <li className="Status" >
                                <img src={four} alt="four"
                                    style={{ width: "25px", marginTop: "-10px", marginLeft: "0%", zIndex: "1000" }} />
                                <br /><div style={{ textAlign: "center", marginLeft: "-90%" }}>สินค้าทำการจัดส่ง<br />
                                    {moment(this.props.order.order_date).format('DD/MM/YYYY HH:mm')}<br/>
                                    <PdfBill data={this.props.bill}/>
                                    </div></li>
                                : <li className="Standat" >
                                    <img src={fourdis} alt="four"
                                        style={{ width: "25px", marginTop: "-10px", marginLeft: "0%", filter: "grayscale(100%)", backgroundColor: "white" }} />
                                    <br /><div style={{ textAlign: "center", marginLeft: "-90%" }}>สินค้าทำการจัดส่ง</div></li>}

                            {this.props.status >= 4 ? <li className="Statusles" >
                                <img src={five} alt="five"
                                    style={{ width: "25px", marginTop: "-10px", marginLeft: "98%", zIndex: "1000" }} />
                                <br /><div style={{ textAlign: "center", marginLeft: "55%", width: "200px" }}>ตรวจสอบสินค้า<br />
                                    {moment(this.props.order.order_date).format('DD/MM/YYYY HH:mm')}<br/>
                                    {/* <button className="BTN_PDF">ตรวจสอบ</button> */}
                                    </div></li>
                                : <li className="Standatles" >
                                    <img src={fivedis} alt="fivedis"
                                        style={{ width: "25px", marginTop: "-10px", marginLeft: "98%", filter: "grayscale(100%)", backgroundColor: "white" }} />
                                    <br /><div style={{ textAlign: "center", marginLeft: "95%", width: "100px" }}>ตรวจสอบสินค้า</div></li>}
                        </ul>

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