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
            isInEdit: false,
            password: true,
            new_password: true,
            new_password_again: true,
            password1: null,
            new_password1: null,
            new_password_again1: null
        };
        this.Password_Show = this.Password_Show.bind(this);
        this.New_Password_Show = this.New_Password_Show.bind(this);
        this.New_Password_Again_Show = this.New_Password_Again_Show.bind(this);

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

    Password_Show = () => {
        this.setState({ password: !this.state.password });
    }

    New_Password_Show = () => {
        this.setState({ new_password: !this.state.new_password });
    }

    New_Password_Again_Show = () => {
        this.setState({ new_password_again: !this.state.new_password_again });
    }

    Check_Password = () => {
        if (this.state.new_password1 === null) {
            alert("กรอกรหัสผ่านใหม่");
        } else if (this.state.new_password_again1 === null) {
            alert("กรอกรหัสผ่านยืนยัน");
        } else if (this.state.new_password1 !== this.state.new_password_again1) {
            alert("รหัสผ่านไม่ตรงกัน");
            return false;
        } else {
            alert("รหัสผ่านตรงกัน");
            window.location.href = "/User";
            return true;
        }
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

    render_type = (user_type) => {
        let render_user
        switch (user_type) {
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


    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>เเก้ไขข้อมูลผู้ใช้งาน</h2>
                    </div>
                </div>
                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-4">
                        <h3 style={{ textAlign: "center" }}>ข้อมูลส่วนตัว</h3>
                        <h4>ชื่อ</h4>
                        < input
                            type="text" id="name"
                            placeholder={this.state.get_user ? this.state.get_user.name : null}
                            onChange={this.handleChange}
                        />
                        <h4>นามสกุล</h4>
                        < input
                            type="text" id="lastname"
                            placeholder={this.state.get_user ? this.state.get_user.lastname : null}
                            onChange={this.handleChange}
                        />
                        <h4>ประเภทผู้ใช้งาน</h4>
                        <h4>{this.render_type(this.state.get_user ? this.state.get_user.user_type : null)}</h4>
                        <h4>อีเมล์</h4>
                        < input
                            type="text" id="email"
                            placeholder={this.state.get_user ? this.state.get_user.email : null}
                            onChange={this.handleChange}
                        />
                        <h4>เบอร์โทรศัพท์</h4>
                        < input
                            type="text" id="phone"
                            placeholder={this.state.get_user ? this.state.get_user.phone : null}
                            onChange={this.handleChange}
                        />
                        <h4>ชื่อผู้ใช้งาน</h4>
                        < input
                            type="text" id="username"
                            placeholder={this.state.get_user ? this.state.get_user.username : null}
                            onChange={this.handleChange}
                        />
                        <h4>ที่อยู่</h4>
                        < input
                            type="text" id="address"
                            placeholder={this.state.get_user ? this.state.get_user.address : null}
                            onChange={this.handleChange}
                        />
                        <button className="BTN_Signin" onClick={() => this.Show_Alert_Data()}>บันทึกข้อมูลผู้ใช้งาน</button>
                        <NavLink to={"/User"}><button className="BTN_Signup">ยกเลิก</button></NavLink>
                    </div>
                    <div className="col-1"></div>



                    <div className="col-4">
                        <h3 style={{ textAlign: "center" }}>รหัสผ่าน</h3>

                        <h4>กรอกรหัสผ่านเก่า</h4>
                        <input type="password"
                            id="password1"
                            onChange={this.handleChange}
                        />
                        <input type="checkbox" id="show_password"
                            name="show_password"
                            onClick={this.Password_Show}
                        />แสดงรหัสผ่าน
                        <h4>กรอกรหัสผ่านใหม่</h4>
                        <input type="password"
                            id="new_password1"
                            onChange={this.handleChange}
                        />

                        <h4>ยืนยันรหัสผ่านใหม่</h4>
                        <input type="password"
                            id="new_password_again1"
                            onChange={this.handleChange}
                        />
                        <button onClick={() => this.Check_Password()} className="BTN_Signin">ยืนยัน</button>
                        <NavLink to={"/User"}><button className="BTN_Signup">ยกเลิก</button></NavLink>

                    </div>
                    <div className="col-1"></div>
                </div>

            </div>
        )
    }
}
export default EditUser;