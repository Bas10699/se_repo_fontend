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
        formula: "เผาพลาญไขมัน",
        nutrients: 'โปรตีน',
        number: 10,
        price: 400,
        status: "0",
        detial_order: "สมุนไพรที่ช่วยขับเหงื่อ มีฤทธิ์ร้อน กระตุ้นให้หิวน้ำ"
    },
    {
        name_order: "อาหารคลีน",
        formula: "เพิ่มคาร์โบไฮเดรต",
        nutrients: 'คาร์โบไฮเดรต',
        number: 20,
        price: 50,
        status: "0",
        detial_order: "เน้นผัก รสชาติอร่อย ไม่มีน้ำตาลเเต่มีความหวาน ชงดื่มได้"
    },
    {
        name_order: "นมเพิ่มความสูง",
        formula: "แคลเซียมสูง",
        nutrients: 'วิตามิน',
        number: 20,
        price: 250,
        status: "1",
        detial_order: "วัตถุดิบที่เพิ่มเเคลเซียมเยอะๆ กินง่าย ชงดื่มได้ทั้งร้อนเเละเย็น"
    }
]

class M_R_Trace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,

        }
    }
    open = () => {
        this.setState({ open: true })
    }
    onCloseModal = () => {
        this.setState({ open: false });

    };
    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>ติดตามการแปรรูปผลิตภัณฑ์</h3>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10">
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
                            {order.map((element, index) => {
                                return (
                                    <tr>
                                        <td>{element.name_order}</td>
                                        <td>{element.formula}</td>
                                        <td>{element.number}</td>
                                        <td>{element.price}</td>
                                        <td>{element.number * element.price}</td>
                                        <td>รูป</td>
                                        <td><button onClick={() => { this.open() }}>รายละเอียด</button></td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                    <div className="col-1"></div>
                </div>

                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="Row" style={{ width: "500px" }}>
                        <div className="col-11">
                            <h3 style={{ textAlign: "center" }}>รายละเอียด</h3>

                            <button onClick={() => this.onCloseModal()}>ยืนยัน</button>
                        </div>
                        <div className="col-1" />
                    </div>

                </Modal>
            </div>
        )
    }
} export default M_R_Trace;