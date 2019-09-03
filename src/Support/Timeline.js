import React, { Component } from 'react';
import { post } from '../Support/Service';
import { user_token, addComma } from '../Support/Constance';
import queryString from 'query-string';
import PdgOrder from './PdfOrder';
import { NavLink } from 'react-router-dom'

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
            photo_profile: "https://i.stack.imgur.com/l60Hf.png",
            tag0: "https://image.flaticon.com/icons/svg/1161/1161832.svg",
            tag1: "https://image.flaticon.com/icons/svg/1161/1161833.svg",
            tag_default: "https://image.flaticon.com/icons/svg/1161/1161830.svg"
        }
    }

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <ul className="Progressbar">
                            <NavLink to="#0"><li activeClassName="Active" className="Standat">ส่งใบสั่งซ์้อ</li></NavLink>
                            <NavLink to="#1"><li activeClassName="Active" className="Standat">ยืนยันคำสั่งซื้อ</li></NavLink>
                            <NavLink to="#2"><li activeClassName="Active" className="Standat">ใบเเจ้งหนี้</li></NavLink>
                            <NavLink to="#3"><li activeClassName="Active" className="Standat">ใบเสร็จ</li></NavLink>
                        </ul>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        )
    }
}
export default Timeline;