//เเถบเมนู
import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

import { user_token } from '../Support/Constance';
import { get } from '../Support/Service';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            get_user: null,
        };
    }

    componentWillMount() {
        this.get_user()
    }

    get_user = async () => {
        try {
            await get('show/show_user', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_user: result.result
                    })
                    setTimeout(() => {
                        console.log("get user : ", result.result)
                    }, 500)
                } else {
                }
            });
        } catch (error) {
            alert("get user error : " + error);
        }
    }

    render_type = (user_type) => {
        let render_user
        switch (user_type) {
            case "2": // Trader
                render_user =
                    <div className="App">
                        <div className="Navbar">
                            <NavLink exact to="/" className="NavbarLeft">LogoBrand</NavLink>
                            <ul>
                                <li><NavLink exact to="/" activeClassName="Active" className="NavbarText">หน้าเเรก</NavLink></li>
                                <li><NavLink exact to="/Product" activeClassName="Active" className="NavbarText">สินค้า</NavLink></li>
                                <li><NavLink exact to="/T_Cart" activeClassName="Active" className="NavbarText">ตระกร้าสินค้า</NavLink></li>
                                <li><NavLink exact to="/T_Buying" activeClassName="Active" className="NavbarText">ประวัติการซื้อ</NavLink></li>


                                <NavLink to="/Signin" activeClassName="Active" className="NavbarRight" onClick={this.logOut.bind(this)} >ออกจากระบบ</NavLink>
                                <NavLink exact to="/User" activeClassName="Active" className="NavbarRight" >{this.state.get_user.username}</NavLink>
                            </ul>
                        </div>
                    </div>
                break;

            case "3": // SE-Sub
                render_user =
                    <div className="App">
                        <div className="Navbar">
                            <NavLink exact to="/" className="NavbarLeft">LogoBrand</NavLink>
                            <ul>
                                <li><NavLink exact to="/" activeClassName="Active" className="NavbarText">หน้าเเรก</NavLink></li>
                                <li><NavLink exact to="/Product" activeClassName="Active" className="NavbarText">สินค้า</NavLink></li>
                                <li><NavLink exact to="/T_Buying" activeClassName="Active" className="NavbarText">ประวัติการซื้อ</NavLink></li>
                                <li><NavLink exact to="/M_Order" activeClassName="Active" className="NavbarText">คำสั่งซื้อผู้ประกอบการ</NavLink></li>

                                <NavLink to="/Signin" activeClassName="Active" className="NavbarRight" onClick={this.logOut.bind(this)} >ออกจากระบบ</NavLink>
                                <NavLink exact to="/User" activeClassName="Active" className="NavbarRight" >{this.state.get_user.username}</NavLink>
                            </ul>
                        </div>
                    </div>
                break;


            case "4": // SE-Middle
                render_user =
                    <div className="App">
                        <div className="Navbar">
                            <NavLink exact to="/" className="NavbarLeft">LogoBrand</NavLink>
                            <ul>
                                <li><NavLink exact to="/" activeClassName="Active" className="NavbarText">หน้าเเรก</NavLink></li>
                                <li><NavLink exact to="/Product" activeClassName="Active" className="NavbarText">สินค้า</NavLink></li>
                                <li><NavLink exact to="/T_Cart" activeClassName="Active" className="NavbarText">ตระกร้าสินค้า</NavLink></li>
                                <li><NavLink exact to="/T_Buying" activeClassName="Active" className="NavbarText">ประวัติการซื้อ</NavLink></li>
                                <li><NavLink exact to="/M_Order" activeClassName="Active" className="NavbarText">คำสั่งซื้อผู้ประกอบการ</NavLink></li>
                                <li><NavLink exact to="/M_Summary" activeClassName="Active" className="NavbarText">สรุปยอดซื้อ-ขาย</NavLink></li>

                                <NavLink to="/Signin" activeClassName="Active" className="NavbarRight" onClick={this.logOut.bind(this)} >ออกจากระบบ</NavLink>
                                <NavLink exact to="/User" activeClassName="Active" className="NavbarRight" >{this.state.get_user.username}</NavLink>
                            </ul>
                        </div>
                    </div>
                break;

            case "5": // admin
                render_user =
                    <div className="App">
                        <div className="Navbar">
                            <NavLink exact to="/" className="NavbarLeft">LogoBrand</NavLink>
                            <ul>
                                <li><NavLink exact to="/" activeClassName="Active" className="NavbarText">หน้าเเรก</NavLink></li>
                                {/* <li><NavLink exact to="/Product" activeClassName="Active" className="NavbarText">สินค้า</NavLink></li> */}
                                {/* <li><NavLink exact to="/M_Order" activeClassName="Active" className="NavbarText">คำสั่งซื้อผู้ประกอบการ</NavLink></li> */}
                                <li><NavLink exact to="#userAll" activeClassName="Active" className="NavbarText">ผู้ใช้งาน</NavLink></li>
                                <NavLink to="/Signin" activeClassName="Active" className="NavbarRight" onClick={this.logOut.bind(this)} >ออกจากระบบ</NavLink>
                                <NavLink exact to="/User" activeClassName="Active" className="NavbarRight" >{this.state.get_user.username}</NavLink>
                            </ul>
                        </div>
                    </div>
                break;

            default:
                render_user =
                    <div className="App">
                        <div className="Navbar">
                            <NavLink exact to="/" className="NavbarLeft">LogoBrand</NavLink>
                            <ul>
                                <NavLink to="/Signin" activeClassName="Active" className="NavbarRight" onClick={this.logOut.bind(this)} >ออกจากระบบ</NavLink>
                                {/* <NavLink exact to="/User" activeClassName="Active" className="NavbarRight" >{this.state.get_user.username}</NavLink> */}
                            </ul>
                        </div>
                    </div>
                break;
        }
        return render_user
    }

    logOut = (e) => {
        e.preventDefault()
        localStorage.removeItem('user_token')
        window.location.href='/'
        // this.props.history.push('/')
    }



    render() {
        const loginRegLink = (
            <div className="App">
                <div className="Navbar">
                    <NavLink exact to="/" className="NavbarLeft">LogoBrand</NavLink>
                    <ul>
                        <NavLink to="/signin" activeClassName="Active" className="NavbarRight">เข้าสู่ระบบ</NavLink>
                        <NavLink to="/signup" activeClassName="Active" className="NavbarRight">ลงทะเบียน</NavLink>
                    </ul>

                </div>
            </div >
        )

        const userLink = (
            <div className="App">
                <div className="Navbar">
                    {this.render_type(this.state.get_user ? this.state.get_user.user_type : null)}
                    
                </div>
            </div >
        )

        return (
            <div>
                {localStorage.user_token ? userLink : loginRegLink}
            </div>
        )
    }
}
export default withRouter(Navbar);