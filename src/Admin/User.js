//ข้อมูลผู้ใช้งาน
//1 = admin
//2 = trader
//3 = se-middle
//4 = se-sub
import React, { Component } from 'react';
import { user_token } from '../Support/Constance';
import { get } from '../Support/Service';
import { NavLink } from 'react-router-dom'
import { element } from 'prop-types';
import Modal from 'react-responsive-modal'



class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            order: [
                {
                    name_order: "ยาสมุนไพรลดความอ้วน",
                    status: "0",
                    detial_order: "สมุนไพรที่ช่วยขับเหงื่อ มีฤทธิ์ร้อน กระตุ้นให้หิวน้ำ"
                },
                {
                    name_order: "อาหารคลีน",
                    status: "0",
                    detial_order: "เน้นผัก รสชาติอร่อย ไม่มีน้ำตาลเเต่มีความหวาน ชงดื่มได้"
                },
                {
                    name_order: "นมเพิ่มความสูง",
                    status: "1",
                    detial_order: "วัตถุดิบที่เพิ่มเเคลเซียมเยอะๆ กินง่าย ชงดื่มได้ทั้งร้อนเเละเย็น"
                }
            ],
            order_1: '',
            type_user: 1,
            bank_information: [],
            get_user: null,
            isInEdit: false,
            user_image: null,
            edit: "https://image.flaticon.com/icons/svg/148/148926.svg",
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
        };
    }

    render_type = (type_user) => {
        let render_user
        switch (type_user) {
            case "1":
                render_user = <div > นักวิจัย </div>
                break;
            case "2":
                render_user = <div > ผู้ประกอบการ </div>
                break;
            case "3":
                render_user = <div > SE ย่อย </div>
                break;
            case "4":
                render_user = <div > SE กลาง  </div>
                break;
            case "5":
                render_user = <div > Admin </div>
                break;

            default:
                render_user = <div className="FontDanger"> เกิดข้อผิดพลาด </div>
                break;
        }
        return render_user
    }

    get_user = async () => {
        try {
            await get('user/get_user', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_user: result.result,
                        bank_information: result.result.bank_information
                    })

                    if (result.result.type_user === "2") {
                        this.get_demand_tarder()
                    }
                    setTimeout(() => {
                        console.log("get_user", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                    //alert("user1"+result.error_message);
                }
            });
        } catch (error) {
            alert("get_user2" + error);
        }
    }

    get_demand_tarder = async () => {
        try {
            await get('trader/get_send_demand', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        order: result.result
                    })
                    console.log('get_demand_tarder', result.result)
                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('get_demand_tarder' + error)
        }
    }



    componentWillMount() {
        this.get_user()
    }

    status_show = (status) => {
        let return_status
        switch (status) {
            case "1":
                return_status = <div style={{ color: "#FFB731", textAlign: "center" }}>ฉบับร่าง</div>
                break;

            case "0":
                return_status = <div style={{ color: "green", textAlign: "center" }}>ส่งเเล้ว</div>
                break;

            default:
                return_status = <div style={{ color: "red", textAlign: "center" }}>เกิดข้อผิดพลาด</div>
                break;
        }
        return return_status;
    }

    onCloseModal = () => {
        this.setState({ isInEdit: false });

    };

    open = (index) => {
        console.log("order", this.state.order)
        let order = this.state.order[index]

        this.setState({
            isInEdit: true,
            order_1: order
        });


    }

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>ข้อมูลผู้ใช้งาน</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <table>
                            <tr>
                                <th>ชื่อ - นามสกุล</th>
                                <td>{this.state.get_user ? this.state.get_user.name : null} {this.state.get_user ? this.state.get_user.last_name : null}</td>
                            </tr>
                            <tr>
                                <th>ประเภทผู้ใช้งาน</th>
                                <td>{this.state.get_user ? this.render_type(this.state.get_user.type_user) : null}</td>
                            </tr>
                            <tr>
                                <th>อีเมล์</th>
                                <td>{this.state.get_user ? this.state.get_user.email : null}</td>
                            </tr>
                            <tr>
                                <th>เบอร์โทรศัพท์</th>
                                <td>{this.state.get_user ? this.state.get_user.phone : null}</td>
                            </tr>
                            <tr>
                                <th>ชื่อผู้ใช้งาน</th>
                                <td>{this.state.get_user ? this.state.get_user.username : null}</td>
                            </tr>
                            <tr>
                                <th>ที่อยู่</th>
                                <td>{this.state.get_user ? this.state.get_user.address : null}</td>
                            </tr>

                        </table>
                        {this.state.get_user ? this.state.get_user.type_user === '4' || this.state.get_user.type_user === '3' ?
                            this.state.bank_information ?
                                this.state.bank_information.map((element) => {
                                    return (
                                        <div className="_Card">
                                            สัญลักษณ์ธนาคาร
                            <h3 style={{ margin: "0px" }}>{element.bankName}</h3>
                                            <h4 style={{ margin: "0px" }}>ชื่อบัญชีธนาคาร {element.bankAccount} เลขที่บัญชี {element.bankNo}</h4>
                                        </div>
                                    )
                                })
                                : null
                            : null
                            : null}


                        {this.state.get_user ? this.state.get_user.type_user === '2' ?
                            <div>
                                <h4 style={{ marginBottom: "0px" }}>ความต้องการที่บันทึกไว้</h4>
                                <table>
                                    <tr>
                                        <th>ลำดับ</th>
                                        <th>ชื่อผลิตภัณฑ์</th>
                                        <th colSpan="2">สถานะ</th>

                                    </tr>
                                    {this.state.order.map((element, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{element.product_name}</td>
                                                <td style={{ textAlign: "center" }}>{this.status_show(element.product_status)}</td>
                                                <td><button style={{ backgroundColor: "transparent", border: "none", float: "right" }}
                                                    onClick={() => { this.open(index) }} >
                                                    <img src={this.state.edit} alt="edit" style={{ width: "20px", marginTop: "50%", cursor: "pointer" }} />
                                                </button></td>
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>

                            : null
                            : null}

                    </div>
                    <div className="col-3"></div>


                </div>

                <Modal open={this.state.isInEdit} onClose={this.onCloseModal} >
                    <div className="Row">
                        <div className="col-12" >
                            <h3 style={{ textAlign: "center" }}>แก้ไขรายละเอียด</h3>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-12">
                            <div>
                                <h5>ชื่อโครงการพัฒนา <input type="text" style={{ width: "50%" }}
                                    value={this.state.order_1.name_order}
                                /></h5>
                                <h5 style={{ marginBottom: "0" }}>รายละเอียด</h5>
                                <textarea name="message" rows="10" style={{ width: "100%" }}
                                    value={this.state.order_1.detial_order}
                                />
                            </div>
                            <div>
                                <button className="BTN_Cencle" onClick={() => { this.onCloseModal() }}>ยกเลิก</button>
                                {this.state.order_1.status == "1" ?
                                    <button className="BTN_Signup" style={{ marginTop: "0" }}
                                        onClick={() => { this.setState({ detial_order: "0" }) }}>
                                        ส่งความต้องการพัฒนา
                                    </button>
                                    : null}

                                {this.state.order_1.status == "1" ?
                                    <button className="BTN_Signin" style={{ marginTop: "0" }}>
                                        บันทึกเป็นฉบับร่าง
                                        </button>
                                    : <button className="BTN_Signin" style={{ marginTop: "0" }}>
                                        แก้ไขข้อมูล
                                    </button>}


                            </div>

                        </div>
                    </div>


                </Modal>

            </div>
        )
    }
}
export default User;