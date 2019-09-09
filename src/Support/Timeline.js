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
import three from '../Image/three.png'
import four from '../Image/four.png'

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
            photo_profile: "https://i.stack.imgur.com/l60Hf.png",
            tag0: "https://image.flaticon.com/icons/svg/1161/1161832.svg",
            tag1: "https://image.flaticon.com/icons/svg/1161/1161833.svg",
            tag_default: "https://image.flaticon.com/icons/svg/1161/1161830.svg"
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
                                        style={{ width: "25px", marginTop: "-10px", marginLeft: "-199px", zIndex: "1000" }} />
                                    <br />ส่งใบสั่งซ์้อ<br />
                                    {moment(this.props.order.order_date).format('DD/MM/YYYY HH:mm')}</li>
                                : <li className="Standat" >
                                    <img src={one} alt="one"
                                        style={{ width: "25px", marginTop: "-10px", marginLeft: "-199px", filter: "grayscale(100%)" }} />
                                    <br />ส่งใบสั่งซื้อ</li>}

                            {this.props.status >= 1 ?
                                <li className="Status" >
                                    <img src={two} alt="two"
                                        style={{ width: "25px", marginTop: "-10px", marginLeft: "-199px", zIndex: "1000" }} />
                                    <br />ยืนยันคำสั่งซื้อแล้ว<br />
                                    {moment(this.props.order.order_date).format('DD/MM/YYYY HH:mm')}</li>
                                : <li className="Standat">
                                    <img src={two} alt="two"
                                        style={{ width: "25px", marginTop: "-10px", marginLeft: "-199px", filter: "grayscale(100%)" }} />
                                    <br />ยืนยันคำสั่งซื้อแล้ว</li>}

                            {this.props.status >= 2 ? <li className="Status" >
                                <img src={three} alt="three"
                                    style={{ width: "25px", marginTop: "-10px", marginLeft: "-199px", zIndex: "1000" }} />
                                <br />ชำระเงินแล้ว<br />
                                {moment(this.props.order.order_date).format('DD/MM/YYYY HH:mm')}</li>
                                : <li className="Standat" >
                                    <img src={three} alt="three"
                                        style={{ width: "25px", marginTop: "-10px", marginLeft: "-199px", filter: "grayscale(100%)" }} />
                                    <br />ชำระเงินแล้ว</li>}

                            {this.props.status >= 3 ? <li className="Status" >
                                <img src={four} alt="four"
                                    style={{ width: "25px", marginTop: "-10px", marginLeft: "-199px", zIndex: "1000" }} />
                                <br />สั่งซื้อสำเร็จ<br />
                                {moment(this.props.order.order_date).format('DD/MM/YYYY HH:mm')}</li>
                                : <li className="Standat" >
                                    <img src={four} alt="four"
                                        style={{ width: "25px", marginTop: "-10px", marginLeft: "-199px", filter: "grayscale(100%)" }} />
                                    <br />สั่งซื้อสำเร็จ</li>}
                        </ul>



                        <div className="Row">
                            <div className="col-2"></div>
                            <div className="col-2" style={{ marginLeft: "-110px", marginTop: "-20px" }}>
                                {this.props.status >= 0 ? <PdfOrder data={this.props.order} /> : null}
                            </div>
                            <div className="col-2" style={{ marginLeft: "75px", marginTop: "-20px" }}>
                                {this.props.status >= 1 ? <PdfInvoice data={this.props.invoice} /> : null}
                            </div>
                            <div className="col-2" style={{ marginLeft: "75px", marginTop: "-20px" }}>
                                {this.props.status >= 3 ? <button className="BTN_PDF" >หลักฐานการโอน</button> : null}
                            </div>
                            <div className="col-2" style={{ marginLeft: "75px", marginTop: "-20px" }}>
                                {this.props.status >= 3 ? "ปุ่มดูใบเสร็จ" : null}
                            </div>
                        </div>

                    </div>
                    <div className="col-2"></div>
                </div>
                {/* <a target="_blank" href={ip + this.state.payment.image_proof}>
                    <img src={ip + this.state.payment.image_proof}
                        style={{ height: "100%", width: "80%", display: "block", marginLeft: "auto", marginRight: "auto", objectFit: "cover" }} alt="หลักฐานการโอน" />
                </a> */}
            </div>
        )
    }
}
export default Timeline;