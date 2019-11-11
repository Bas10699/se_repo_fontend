import React, { Component } from 'react';
import '../App.css';
import { user_token } from '../Support/Constance';
import { ip, get, post } from '../Support/Service';
import { NavLink } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null
        }
    }

    handleChange = (e) => {
        console.log('va', e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })
        if (e.key === 'Enter') {
            this.get_users()
        }
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
    // responseFacebook(response) {
    //     console.log(response);
    //     if (response) {
    //         let obj = {
    //             facebook_id: response.userID,
    //             name: response.name,
    //             email: response.email
    //         }
    //         FacebookLogin(obj)
    //     }
    // }


    responseFacebook = async (response) => {
        console.log(response)
        if (response.userID) {
            let obj = {
                facebook_id: response.userID,
                name: response.name,
                email: response.email
            }
            try {
                await post(obj, 'user/facebook_login', null).then((result) => {
                    if (result.success) {
                        localStorage.setItem("user_token", result.token);
                        window.location.href = "/";
                        console.log("Signin" + result.token);
                    }
                    else {
                        alert(result.error_message)
                    }
                })
            }
            catch (error) {
                alert(error)
            }
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
                            placeholder="somying1234"
                            name="username" onChange={this.handleChange}
                        />
                        <h4> รหัสผ่าน </h4>
                        <input type="password" id="password"
                            placeholder="กรอกรหัสผ่าน"
                            name="password" onKeyUp={this.handleChange}
                        />

                        <FacebookLogin
                            textButton=" เข้าสู่ระบบด้วย facebook"
                            cssClass="facebook-button"
                            icon="fa-facebook"
                            appId="872871633077260"
                            autoLoad={false}
                            fields="name,email,picture"
                            // scope="public_profile,user_friends,user_actions.books"
                            callback={this.responseFacebook}
                        />

                        <button className="BTN_Signin"
                            onClick={() => this.get_users()} >

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