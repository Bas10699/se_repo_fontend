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

const order = [
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
]

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: '',
            lastname: '',
            email: '',
            phone: '',
            address: '',
            user_type: 1,
            bank_information: '',
            get_user: null,
            isInEdit: false,
            user_image: null,
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
        };
    }

    render_type = (user_type) => {
        let render_user
        switch (user_type) {
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

    componentWillMount() {
        this.get_user()
    }

    status_show = (status) => {
        let return_status
        switch (status) {
            case "1":
                return_status = <div>ฉบับร่าง</div>
                break;

            case "0":
                return_status = <div>ส่งเเล้ว</div>
                break;

            default:
                return_status = <div>เกิดข้อผิดพลาด</div>
                break;
        }
        return return_status;
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
                                <td>{this.state.get_user ? this.state.get_user.name : null} {this.state.get_user ? this.state.get_user.lastname : null}</td>
                            </tr>
                            <tr>
                                <th>ประเภทผู้ใช้งาน</th>
                                <td>{this.state.get_user ? this.render_type(this.state.get_user.user_type) : null}</td>
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
                        {this.state.get_user ? this.state.get_user.user_type === '4' ?
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
                            : null}


                        {this.state.get_user ? this.state.get_user.user_type === '2' ?
                        <div> 
                            <h4 style={{marginBottom:"0px"}}>ความต้องการที่บันทึกไว้</h4>
                            <table>                                
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>ชื่อผลิตภัณฑ์</th>
                                    <th>สถานะ</th>
                                    <th>แก้ไข/ลบ</th>
                                </tr>
                                {order.map((element, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{element.name_order}</td>
                                            <td>{this.status_show(element.status)}</td>
                                            <td>แก้ไข/ลบ</td>
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



            </div>
        )
    }
}
export default User;