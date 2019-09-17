import React, { Component } from 'react';
import '../App.css';
import { user_token } from '../Support/Constance';
import { ip, get, post } from '../Support/Service';
import { NavLink } from 'react-router-dom';


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null,
            name: null,
            lastname: null,
            phone: null,
            address: null,
            user_type: 1
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    show_password() {
        var show_password = document.getElementById("password");
        if (show_password.type === "password") {
            show_password.type = "text";
        } else {
            show_password.type = "password";
        }
    }

    add_user = async () => {
        let object = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            name: this.state.name,
            lastname: this.state.lastname,
            phone: this.state.phone,
            address: this.state.address,
            user_type: this.state.user_type
        };

        try {
            await post(object, "user/user_register", null).then(res => {
                console.log("Signup" + res);

                if (res.success) {
                    alert("สร้างบัญชีผู้ใช้เรียบร้อย โปรดทำการเข้าสู่ระบบ");
                    window.location.href = "/Signin";
                } else {
                    alert(res.error_message);
                }
            });
        } catch (error) {
            alert(error);
        }
        console.log("Signup" + this.state);
    }


    render() {
        return (
            <div className="App" >
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>ลงทะเบียน</h2>
                    </div>
                </div>
                <div className="Row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <h4>ชื่อ</h4>
                        <input type="text" id="name"
                            placeholder="กรอกชื่อจริง" name="name"
                            onChange={this.handleChange}
                        />
                        <h4>นามสกุล</h4>
                        <input type="text" id="lastname"
                            placeholder="กรอกนามสกุล" name="lastname"
                            onChange={this.handleChange}
                        />
                        <h4>E-mail</h4>
                        <input type="email" id="email"
                            placeholder="กรอก E-mail" name="email"
                            onChange={this.handleChange}
                        />
                        <h4>เบอร์โทรศัพท์</h4>
                        <input type="tel" id="phone"
                            placeholder="กรอกเบอร์โทรศํพท์" name="phone"
                            onChange={this.handleChange}
                        />
                        <h4>ที่อยู่</h4>
                        <input type="text" id="address"
                            placeholder="กรอกที่อยู่ปัจจุบัน" name="address"
                            onChange={this.handleChange}
                        />
                        <h4>ชื่อบัญชีผู้ใช้</h4>
                        <input type="text" id="username"
                            placeholder="กรอกบัญชีผู้ใช้" name="username"
                            onChange={this.handleChange}
                        />
                        <h4>ประเภทผู้ใช้งาน</h4>
                        <select name="user_type" onChange={this.handleChange}>
                            <option value="2">ผู้ประกอบการ</option>
                            <option value="3">SE กลาง</option>
                            <option value="4">SE ย่อย</option>
                        </select>

                        <h4>รหัสผ่าน</h4>
                        <input type="password" id="password"
                            placeholder="กรอกรหัสผ่าน" name="password"
                            onChange={this.handleChange}
                        />
                        <input type="checkbox" id="show_password"
                            name="show_password"
                            onClick={this.show_password}
                        />แสดงรหัสผ่าน
                        <div>
                            <button className="BTN_Signin" style={{marginBottom:"30px"}}
                                onClick={() => this.add_user(
                                    this.state.username,
                                    this.state.password,
                                    this.state.email,
                                    this.state.name,
                                    this.state.last_name,
                                    this.state.phone,
                                    this.state.address,
                                    this.state.user_type
                                )}>
                                ลงทะเบียน
                        </button>
                            <NavLink to={'/Signin'}><button style={{marginBottom:"30px"}} className="BTN_Signup">มีบัญชีผู้ใช้เเล้ว</button></NavLink>
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
        );
    }
}

export default Signup;
