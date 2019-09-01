import React, { Component } from 'react';
import '../App.css';
import { user_token } from '../Support/Constance';
import { ip, get, post } from '../Support/Service';
import { NavLink } from 'react-router-dom';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Signin" + this.state);
    }

    get_users = async () => {
        let object = {
            username: this.state.username,
            password: this.state.password
        };
        try {
            await post(object, "user/user_login", null).then(res => {
                if (res.success) {
                    // alert(res.token)
                    localStorage.setItem("user_token", res.token);
                    window.location.href = "/";
                    console.log("Signin" + res.token);
                } else {
                    alert(res.error_message);
                }
            });
        } catch (error) {
            alert(error);
        }
        console.log("Signin" + this.state);
    }

    facebook = async () => {
        console.log("facebook");
        try {
            await get("auth/facebook", null).then(res => {
                if (res.success) {
                    console.log("facebook : " + res.token);
                }
                else {
                    window.location.href = "/Signup";
                }
            });
        } catch (error) {
            alert("alert_facebook" + error);
        }
    }

    render() {
        return (
            <div className="App" >
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>เข้าสู่ระบบ</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-4"></div>
                    
                    <div className="col-4">
                        <h4> ชื่อผู้ใช้งาน </h4>
                        <input type="text" id="username" 
                        placeholder="กรอกชื่อบัญชีผู้ใช้" 
                        name="username" onChange={this.handleChange} 
                        />
                        <h4> รหัสผ่าน </h4>
                        <input type="password" id="password" 
                        placeholder="กรอกรหัสผ่าน" 
                        name="password" onChange={this.handleChange} 
                        />

                        <button className="BTN_Signin" 
                        onClick={() => this.get_users(
                            this.state.username, 
                            this.state.password)}>
                            เข้าสู่ระบบ
                        </button>
                        <NavLink to={'/Signup'}><button className="BTN_Signup" >สร้างบัญชีผู้ใช้</button></NavLink>
                    </div>


                    <div className="col-4"></div>
                </div>
            </div >
        );
    }
}

export default Signin;