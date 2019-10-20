//เเถบเมนู
import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

import { user_token } from '../Support/Constance';
import { get, ip } from '../Support/Service';
import bell from '../Image/bell.png'

import socketIOClient from 'socket.io-client'

import NotificationMiddle from '../Support/notificationMiddle'
import NotificationTrader from '../Support/notificationTrader'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            get_user: null,
            news: false,

        };
    }

    componentWillMount() {
        this.get_user()
    }

    componentDidMount() {
        this.response()
    }
    response = () => {
        const socket = socketIOClient(ip)
        socket.on('new-noti', (messageNew) => {
            console.log(messageNew)
            this.setState({ news: true })
        })
    }

    get_user = async () => {
        try {
            await get('show/show_user', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_user: result.result,
                        news: result.result.noti
                    })
                    // setTimeout(() => {
                    //     console.log("get user : ", result.result)
                    // }, 500)
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
            case "1": //นักวิจัย
                render_user =
                    <div className="App">
                        <div className="Navbar">
                            <NavLink exact to="/" className="NavbarLeft">LogoBrand</NavLink>
                            <ul>
                                <li><NavLink exact to="/" activeClassName="Active" className="NavbarText">หน้าเเรก</NavLink></li>
                                <li><NavLink exact to="/Planting_Planning" activeClassName="Active" className="NavbarText">การวางแผนเพาะปลูก</NavLink></li>
                                <li><NavLink exact to="/Product_Information" activeClassName="Active" className="NavbarText">ข้อมูลผลผลิต</NavLink></li>
                                <li><NavLink exact to="/Product_Research" activeClassName="Active" className="NavbarText">การวิจัยผลิตภัณฑ์</NavLink></li>
                                
                                <div className="NavbarRight" activeClassName="Active">
                                    <div className="dropdown" activeClassName="Active">
                                        <NavLink exact to="/User" className="dropbtn" activeClassName="Active">{this.state.get_user.username}</NavLink>
                                        <div className="dropdown-content">
                                            <NavLink to={"/EditUser"} activeClassName="Active" className="NavbarRight">แก้ไขข้อมูล</NavLink>
                                            <NavLink to="/Signin" activeClassName="Active" className="NavbarRight" onClick={this.logOut.bind(this)} >ออกจากระบบ</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                break;
            case "2": // Trader
                render_user =
                    <div className="App">
                        <div className="Navbar">
                            <NavLink exact to="/" className="NavbarLeft">LogoBrand</NavLink>
                            <ul>
                                <li><NavLink exact to="/" activeClassName="Active" className="NavbarText">หน้าเเรก</NavLink></li>
                                <li><NavLink exact to="/Product" activeClassName="Active" className="NavbarText">สินค้า</NavLink></li>
                                <li><NavLink exact to="/T_Order" activeClassName="Active" className="NavbarText">พัฒนาผลิตภัณฑ์</NavLink></li>
                                <li><NavLink exact to="/T_Cart" activeClassName="Active" className="NavbarText">ตระกร้าสินค้า</NavLink></li>
                                <li><NavLink exact to="/T_Buying" activeClassName="Active" className="NavbarText">ประวัติการซื้อ</NavLink></li>


                                <div className="NavbarRight" activeClassName="Active">
                                    <div className="dropdown" activeClassName="Active">
                                        <NavLink exact to="/User" className="dropbtn" activeClassName="Active">{this.state.get_user.username}</NavLink>
                                        <div className="dropdown-content">
                                            <NavLink to={"/EditUser"} activeClassName="Active" className="NavbarRight">แก้ไขข้อมูล</NavLink>
                                            <NavLink to="/Signin" activeClassName="Active" className="NavbarRight" onClick={this.logOut.bind(this)} >ออกจากระบบ</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </ul>
                        </div>
                        <NotificationTrader/>
                    </div>
                break;

            case "3": // SE-Sub
                render_user =
                    <div >
                        <div className="Navbar">
                            <NavLink exact to="/S_Plants_in_network" className="NavbarLeft">LogoBrand</NavLink>
                            <ul>
                                {/* <li><NavLink exact to="/" activeClassName="Active" className="NavbarText">หน้าเเรก</NavLink></li> */}
                                {/* <li><NavLink exact to="/Product" activeClassName="Active" className="NavbarText">สินค้า</NavLink></li> */}
                                {/* <li><NavLink exact to="/T_Buying" activeClassName="Active" className="NavbarText">ประวัติการซื้อ</NavLink></li> */}

                                <li><NavLink exact to="/S_Plants_in_network" activeClassName="Active" className="NavbarText">ผลผลิตที่ส่งมอบได้</NavLink></li>
                                <li><NavLink exact to="/S_Order" activeClassName="Active" className="NavbarText">รายการขายสินค้า</NavLink></li>
                                <li><NavLink exact to="/S_skill_farmer" activeClassName="Active" className="NavbarText">ข้อมูลเกษตรกร</NavLink></li>
                                <li><NavLink exact to="/S_Certified" activeClassName="Active" className="NavbarText">มาตรฐาน</NavLink></li>


                                <div className="NavbarRight" activeClassName="Active">
                                    <div className="dropdown" activeClassName="Active">
                                        <NavLink exact to="/User" className="dropbtn" activeClassName="Active">{this.state.get_user.username}</NavLink>
                                        <div className="dropdown-content">
                                            <NavLink to={"/EditUser"} activeClassName="Active" className="NavbarRight">แก้ไขข้อมูล</NavLink>
                                            <NavLink to="/Signin" activeClassName="Active" className="NavbarRight" onClick={this.logOut.bind(this)} >ออกจากระบบ</NavLink>
                                        </div>
                                    </div>
                                </div>
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
                                <li><NavLink exact to="/M_Plan" activeClassName="Active" className="NavbarText">Neo-firm</NavLink></li>
                                <li><NavLink exact to="/Product" activeClassName="Active" className="NavbarText">สินค้า</NavLink></li>
                                <li><NavLink exact to="/M_Demand" activeClassName="Active" className="NavbarText">การวิจัยผลิตภัณฑ์</NavLink></li>
                                {/* <li><NavLink exact to="/T_Cart" activeClassName="Active" className="NavbarText">ตระกร้าสินค้า</NavLink></li> */}
                                <li><NavLink exact to="/M_Buying" activeClassName="Active" className="NavbarText">ประวัติการซื้อ</NavLink></li>
                                <li><NavLink exact to="/M_Order" activeClassName="Active" className="NavbarText">คำสั่งซื้อผู้ประกอบการ</NavLink></li>
                                <li><NavLink exact to="/M_Summary" activeClassName="Active" className="NavbarText">สรุปยอดซื้อ-ขาย</NavLink></li>
                                {/* <li><NavLink exact to="/M_BB" activeClassName="Active" className="NavbarText">ประวัติการซื้อ</NavLink></li> */}


                                {/* <NavLink to="/signup"><img src={bell} alt="bell"
                                    onClick={() => this.setState({ news: false })} />
                                    <span className={this.state.news ? "badge" : null} />
                                </NavLink> */}
                                <div className="NavbarRight" activeClassName="Active">
                                    <div className="dropdown" activeClassName="Active">
                                        <NavLink exact to="/User" className="dropbtn" activeClassName="Active">{this.state.get_user.username}</NavLink>
                                        <div className="dropdown-content">
                                            <NavLink to={"/EditUser"} activeClassName="Active" className="NavbarRight">แก้ไขข้อมูล</NavLink>
                                            <NavLink to="/Signin" activeClassName="Active" className="NavbarRight" onClick={this.logOut.bind(this)} >ออกจากระบบ</NavLink>
                                        </div>
                                    </div>
                                </div>

                            </ul>
                        </div>
                        <NotificationMiddle />
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
                                <li><NavLink exact to="/M_Order" activeClassName="Active" className="NavbarText">คำสั่งซื้อ</NavLink></li>
                                <li><NavLink exact to="#" activeClassName="Active" className="NavbarText">ข้อมูลวัตถุดิบ</NavLink></li>
                                <li><NavLink exact to="#" activeClassName="Active" className="NavbarText">วางแผนการเพาะปลูก</NavLink></li>
                                <li><NavLink exact to="/UserAll" activeClassName="Active" className="NavbarText">ผู้ใช้งาน</NavLink></li>

                                <div className="NavbarRight" activeClassName="Active">
                                    <div className="dropdown" activeClassName="Active">
                                        <NavLink exact to="/User" className="dropbtn" activeClassName="Active">{this.state.get_user.username}</NavLink>
                                        <div className="dropdown-content">
                                            <NavLink to={"/EditUser"} activeClassName="Active" className="NavbarRight">แก้ไขข้อมูล</NavLink>
                                            <NavLink to="/Signin" activeClassName="Active" className="NavbarRight" onClick={this.logOut.bind(this)} >ออกจากระบบ</NavLink>
                                        </div>
                                    </div>
                                </div>
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
        window.location.href = '/'
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