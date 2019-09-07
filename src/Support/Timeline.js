import React, { Component } from 'react';
import { post } from '../Support/Service';
import { user_token, addComma } from '../Support/Constance';
import queryString from 'query-string';
import PdfOrder from './PdfOrder';
import PdfInvoice from './PdfInvoice'
import { NavLink } from 'react-router-dom'
import moment from 'moment'

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
                            {this.props.status >= 0 ? <li className="Status" >ส่งใบสั่งซ์้อ<br/>{moment(this.props.order.order_date).format('DD/MM/YYYY HH:mm')}</li> : <li className="Standat" >ส่งใบสั่งซื้อ<br/>{moment(this.props.order.order_date).format('DD/MM/YYYY HH:mm')}</li>}
                            {this.props.status >= 1 ? <li className="Status" >ยืนยันคำสั่งซื้อแล้ว<br/>{moment(this.props.order.order_date).format('DD/MM/YYYY HH:mm')}</li> : <li className="Standat">ยืนยันคำสั่งซื้อแล้ว<br/>{moment(this.props.order.order_date).format('DD/MM/YYYY HH:mm')}</li>}
                            {this.props.status >= 2 ? <li className="Status" >ชำระเงินแล้ว</li> : <li className="Standat" >ชำระเงินแล้ว</li>}
                            {this.props.status >= 3 ? <li className="Status" >สั่งซื้อสำเร็จ</li> : <li className="Standat" >สั่งซื้อสำเร็จ</li>}
                        </ul>
                        <div className="Row">
                            <div className="col-2"></div>
                                <div className="col-2"  style={{marginLeft: "-110px", marginTop: "-20px" }}>
                                    {this.props.status >= 1 ? <PdfOrder data={this.props.order} /> : null}
                                </div>
                                <div className="col-2"  style={{marginLeft: "75px", marginTop: "-20px" }}>
                                    {this.props.status >= 2 ? <PdfInvoice data={this.props.invoice} /> : null}
                                </div>
                           
                            <div className="col-2"></div>
                        </div>

                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        )
    }
}
export default Timeline;