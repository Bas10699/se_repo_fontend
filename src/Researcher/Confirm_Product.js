import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { element } from 'prop-types';
import { user_token } from '../Support/Constance';
import { get, post } from '../Support/Service';
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

class Confirm_Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name_order: null,
            nutrients: null,
            number: null,
            status: null,
            detial_order: null
        }
    }

    get_user = async () => {
        try {
            await get('show', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_user: result.result
                    })
                    setTimeout(() => {
                        console.log("get_user", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {
            alert("get_user2" + error);
        }
    }

    componentWillMount() {
        this.get_user()
    }

    delete = () => {
        alert("ลบรายการ")
    }

    onOpenModal = () => {
        this.setState({ open: true});
    }

    render () {
        return (
            <div className="App">

                <NavLink to={"/Confirm_Product"}>
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
                </NavLink>

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
                                                <NavLink>
                                                    <button onClick={() => this.onOpenModal()}>
                                                        ยืนยัน
                                                    </button>
                                                    <Modal open={this.state.open} onClose={this.onCloseModal}>
                                                        <div className="Row">
                                                            <div className="col-12">
                                                                <h3 style={{ textAlign: "center" }}>พัฒนาผลิตภัณฑ์</h3>
                                                                <h4 style={{ textAlign: "center" }}>ชื่อผลิตภัณฑ์</h4>
                                                                <NavLink>
                                                                    <button>
                                                                        ตกลง
                                                                    </button>
                                                                </NavLink>
                                                                <NavLink>
                                                                    <button>
                                                                        ยกเลิก
                                                                    </button>
                                                                </NavLink>
                                                            </div>
                                                        </div>
                                                    </Modal>
                                                </NavLink>
                                                <NavLink>
                                                    <button onClick={() => this.delete()}>
                                                        ยกเลิก
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