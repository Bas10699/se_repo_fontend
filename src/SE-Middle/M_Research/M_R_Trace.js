//ติดตามผลการแปรรูป
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { element } from 'prop-types';
import { user_token } from '../../Support/Constance';
import { get, post } from '../../Support/Service';
import Modal from 'react-responsive-modal';

const order = [
    {
        name_order: "ยาสมุนไพรลดความอ้วน",
        nutrients: 'โปรตีน',
        number: '10 กล่อง',
        status: "0",
        detial_order: "สมุนไพรที่ช่วยขับเหงื่อ มีฤทธิ์ร้อน กระตุ้นให้หิวน้ำ"
    },
    {
        name_order: "อาหารคลีน",
        nutrients: 'คาร์โบไฮเดรต',
        number: '20 ชิ้น',
        status: "0",
        detial_order: "เน้นผัก รสชาติอร่อย ไม่มีน้ำตาลเเต่มีความหวาน ชงดื่มได้"
    },
    {
        name_order: "นมเพิ่มความสูง",
        nutrients: 'วิตามิน',
        number: '20 กล่อง',
        status: "1",
        detial_order: "วัตถุดิบที่เพิ่มเเคลเซียมเยอะๆ กินง่าย ชงดื่มได้ทั้งร้อนเเละเย็น"
    }
]

class M_R_Trace extends Component {

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>ติดตามการแปรรูปผลิตภัณฑ์</h3>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-12">
                        <table>
                            <tr>
                                <th>ชื่อผลิตภัณฑ์</th>
                                <th>ชื่อสูตร</th>
                                <th>จำนวนที่สั่ง</th>
                                <th>ราคาต่อชิ้น</th>
                                <th>ราคาทั้งหมด</th>
                                <th>รูป</th>
                                <th>รายละเอียด</th>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
} export default M_R_Trace;