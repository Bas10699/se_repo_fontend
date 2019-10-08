//ข้อมูลผู้ใช้งาน
//1 = admin
//2 = trader
//3 = se-middle
//4 = se-sub
import React, { Component } from 'react';
import { user_token } from '../Support/Constance';
import { get, post } from '../Support/Service';
import { NavLink } from 'react-router-dom'

class UserAll extends Component {
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
            get_user: [],
            isInEdit: false,
            user_image: null,
            cencel: "https://image.flaticon.com/icons/svg/148/148766.svg",
            edit: "https://image.flaticon.com/icons/svg/148/148926.svg",
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

    delete_user = async (id) => {
        let obj = {
            user_id: id
        }
        try {
            await post(obj, 'user/delete_user', user_token).then((result) => {
                if (result.success) {
                    window.location.reload()
                }
                else {
                    alert(result.error_message)
                }
            })

        } catch{

        }
    }

    componentWillMount() {
        this.get_user()
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
                    <div className="col-2"></div>
                    <div className="col-8">
                        <table style={{ textAlign: "center", border: "1px solid #f4f4f4" }}>
                            <tr style={{ border: "1px solid #f4f4f4" }}>
                                <th></th>
                                <th style={{ borderLeft: "1px solid #f4f4f4" }}>ลำดับ</th>
                                <th style={{ borderLeft: "1px solid #f4f4f4" }}>ID</th>
                                <th style={{ borderLeft: "1px solid #f4f4f4" }}>ชื่อ</th>
                                <th style={{ borderLeft: "1px solid #f4f4f4" }}>นามสกุล</th>
                                <th style={{ borderLeft: "1px solid #f4f4f4" }}>ประเภทผู้ใช้งาน</th>
                                <th style={{ borderLeft: "1px solid #f4f4f4" }}>ที่อยู่</th>
                                <th style={{ borderLeft: "1px solid #f4f4f4" }}></th>
                            </tr>
                            {this.state.get_user.map((element, index) => {
                                return (
                                    <tr style={{ borderLeft: "1px solid #f4f4f4" }}>
                                        <td>
                                            <button style={{ backgroundColor: "transparent", border: "none" }} onClick={() => { if (window.confirm('ยืนยันการลบบัญชีผู้ใช้')) { this.delete_user(element.user_id) } }}>
                                                <img src={this.state.cencel} alt="cancel" style={{ width: "20px", marginTop: "50%" }} />
                                            </button>
                                        </td>
                                        <td style={{ borderLeft: "1px solid #f4f4f4" }}>{index + 1}</td>
                                        <td style={{ borderLeft: "1px solid #f4f4f4" }}>{element.user_id}</td>
                                        <td style={{ textAlign: "left", width: "15%", borderLeft: "1px solid #f4f4f4" }}>{element.name}</td>
                                        <td style={{ textAlign: "left", width: "10%", borderLeft: "1px solid #f4f4f4" }}>{element.lastname}</td>
                                        <td style={{ borderLeft: "1px solid #f4f4f4" }}>{this.render_type(element.user_type)}</td>
                                        <td style={{ textAlign: "left", width: "30%", borderLeft: "1px solid #f4f4f4" }}>{element.address}</td>
                                        <td style={{ borderLeft: "1px solid #f4f4f4" }}>
                                            <NavLink to={'/user/userID?user_id=' + element.user_id}><img alt="edit" src={this.state.edit} style={{ width: "20px" }}/></NavLink>

                                            
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                    <div className="col-2"></div>


                </div>



            </div>
        )
    }
}
export default UserAll;