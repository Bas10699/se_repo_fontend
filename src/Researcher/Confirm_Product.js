import React, { Component } from 'react';
import { user_token } from '../Support/Constance';
import { NavLink } from 'react-router-dom';
import { get, post, ip } from '../Support/Service';

const order = [
    {
        name_order: "ยาสมุนไพรลดความอ้วน",
        nutrients: "โปรตีน",
        number: "10 กล่อง",
        status: "0",
        detial_order: "สมุนไพรที่ช่วยขับเหงื่อ มีฤทธิ์ร้อน กระตุ้นให้หิวน้ำ"
    },
    {
        name_order: "อาหารคลีน",
        nutrients: "คาร์โบไฮเดรต",
        number: "20 ชิ้น",
        status: "0",
        detial_order: "เน้นผัก รสชาติอร่อย ไม่มีน้ำตาลเเต่มีความหวาน ชงดื่มได้"
    },
    {
        name_order: "นมเพิ่มความสูง",
        nutrients: "วิตามิน",
        number: "30 กล่อง",
        status: "1",
        detial_order: "วัตถุดิบที่เพิ่มเเคลเซียมเยอะๆ กินง่าย ชงดื่มได้ทั้งร้อนเเละเย็น"
    }
]

class Confirm_Product extends Component {
    render () {
        return (
            <div className="App">

                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>ยืนยันการพัฒนาผลิตภัณฑ์</h3>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-12">
                        <table style={{ textAlign: "center" }}>
                            <tr>
                                <th>ชื่อผลิตภัณฑ์</th>
                                <th>สารอาหารที่ต้องการ</th>
                                <th>จำนวนผลิตภัณฑ์</th>
                                <th>ยืนยันการพัฒนา</th>
                            </tr>  
                            {
                                order.map((element, index) => {
                                    return (
                                        <tr>
                                            <td>{element.name_order}</td>
                                            <td>{element.nutrients}</td>
                                            <td>{element.number}</td>
                                            <td>
                                                <NavLink to={"/Development"}>
                                                    <button>ยืนยัน</button>
                                                </NavLink>
                                                <button>ยกเลิก</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                </div>

            </div>
        )
    }
} export default Confirm_Product;
