import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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

class Confirm_Product extends Component {
    render () {
        return (
            <div className="App">

                {/* <NavLink to={"/Confirm_Product"}>
                    <button>ยืนยันการพัฒนาผลิตภัณฑ์</button>
                </NavLink>
                <NavLink to={"/Product_Info"}>
                    <button>ข้อมูลผลิตภัณฑ์</button>
                </NavLink>
                <NavLink to={"/Check_Details"}>
                    <button>ตรวจสอบรายละเอียด</button>
                </NavLink>
                <NavLink to={"/Product_History"}>
                    <button>ประวัติการพัฒนาผลิตภัณฑ์</button>
                </NavLink> */}

                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>ประวัติการพัฒนาผลิตภัณฑ์</h3>
                    </div>
                </div>
                
                <div className="Row">
                    <div className="col-12">
                        <table style={{ textAlign: "center" }}>
                            <tr>
                                <th>ชื่อผลิตภัณฑ์</th>
                                <th>ชื่อสูตร</th>
                                <th>สารอาหาร</th>
                                <th>วัตถุดิบ</th>
                                <th>รูปภาพ</th>
                            </tr>
                            {
                                order.map((element, index) => {
                                    return (
                                        <tr>
                                            <td>{element.name_order}</td>
                                            <td>ชื่อสูตร</td>
                                            <td>
                                                <NavLink>
                                                    <button>
                                                        สารอาหาร
                                                    </button>
                                                </NavLink>
                                            </td>
                                            <td>
                                                <NavLink>
                                                    <button>
                                                        วัตถุดิบ
                                                    </button>
                                                </NavLink>
                                            </td>
                                            <td>
                                                <NavLink>
                                                    <button>
                                                        รูปภาพ
                                                    </button>
                                                </NavLink>
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