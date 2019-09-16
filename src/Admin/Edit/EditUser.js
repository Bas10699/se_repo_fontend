//แก้ไข User
import React, { Component } from 'react';
import { user_token } from '../../Support/Constance';
import { ip, get, post } from '../../Support/Service';
import { NavLink } from 'react-router-dom';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastname: '',
            email: '',
            phone: '',
            username: '',
            address: '',
            user_style: 1,
            get_user: null,
            isInEdit: false
        };
    }

    render_type = (user_type) => {
        let render_user
        switch (user_type) {
            case "2":
                render_user = 'ผู้ประกอบการ'
                break;
            case "3":
                render_user = 'SE ย่อย'
                break;
            case "4":
                render_user = 'SE กลาง'
                break;
            case "5":
                render_user = 'Admin'
                break;

            default:
                render_user = <div className="FontDanger"> เกิดข้อผิดพลาด </div>
                break;
        }
        return render_user
    }

    Show_Alert_Data = () => {
        alert(this.state.name + '\n' + this.state.lastname + '\n' + this.state.render_type + '\n' + this.state.email + '\n' + this.state.phone + '\n' + this.state.username + '\n' + this.state.address)
        // alert('ถูกต้อง')
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    get_user = async () => {
        try {
            await get('show/show_user', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_user: result.result
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



    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>เเก้ไขข้อมูลผู้ใช้งาน</h2>
                    </div>
                </div>
                <div className="Row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <table>
                            <tr>
                                <th>ชื่อ</th>
                                < input style={{ marginTop: "0px" }}
                                    type="text" id="name"
                                    placeholder={this.state.get_user ? this.state.get_user.name : null}
                                    onChange={this.handleChange}
                                />
                            </tr>
                            <tr>
                                <th>นามสกุล</th>
                                < input style={{ marginTop: "0px" }} type="text" id="lastname"
                                    placeholder={this.state.get_user ? this.state.get_user.lastname : null} 
                                    onChange={this.handleChange}
                                />
                            </tr>
                            <tr>
                                <th>ประเภทผู้ใช้งาน</th>
                                < input style={{ marginTop: "0px" }} type="text" id="render_type"
                                    placeholder={this.state.get_user ? this.render_type(this.state.get_user.user_type) : null} 
                                    onChange={this.handleChange}
                                />
                            </tr>
                            <tr>
                                <th>อีเมล์</th>
                                < input style={{ marginTop: "0px" }} type="text" id="email"
                                    placeholder={this.state.get_user ? this.state.get_user.email : null} onChange={this.handleChange}
                                />
                            </tr>
                            <tr>
                                <th>เบอร์โทรศัพท์</th>
                                < input style={{ marginTop: "0px" }} type="text" id="phone"
                                    placeholder={this.state.get_user ? this.state.get_user.phone : null} onChange={this.handleChange}
                                />
                            </tr>
                            <tr>
                                <th>ชื่อผู้ใช้งาน</th>
                                < input style={{ marginTop: "0px" }} type="text" id="username"
                                    placeholder={this.state.get_user ? this.state.get_user.username : null} onChange={this.handleChange}
                                />
                            </tr>
                            <tr>
                                <th>ที่อยู่</th>
                                < input style={{ marginTop: "0px" }} type="text" id="address"
                                    placeholder={this.state.get_user ? this.state.get_user.address : null} onChange={this.handleChange}
                                />
                            </tr>
                            <p>
                                <NavLink to={"User"}>
                                    <button>ยกเลิก</button>
                                </NavLink>
                            </p>
                            <p>
                                <button onClick={() => this.Show_Alert_Data()}>บันทึกข้อมูลผู้ใช้งาน</button>
                            </p>
                        </table>
                    </div>
                    <div className="col-4"></div>
                </div>

            </div>
        )
    }
} export default EditUser;