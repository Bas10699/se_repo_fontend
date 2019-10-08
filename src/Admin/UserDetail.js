//ข้อมูลผู้ใช้งาน
//1 = admin
//2 = trader
//3 = se-middle
//4 = se-sub
import React, { Component } from 'react';
import { user_token } from '../Support/Constance';
import { get, post } from '../Support/Service';
import { NavLink } from 'react-router-dom'
import queryString from 'query-string';
import Modal from 'react-responsive-modal'

class UserDetail extends Component {
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
            get_user: '',
            isInEdit: false,
            user_image: null,
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
        };
    }

    render_type = (user_type) => {
        let render_user
        switch (user_type) {
            case "1":
                render_user = 'นักวิจัย'
                break;
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

    handleChange = (e) => {
        let users = this.state.get_user
        users[e.target.id] = e.target.value
        this.setState({
            get_user: users
        })
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    get_user = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        try {
            await post(params, 'user/show_user', user_token).then((result) => {
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
                            <div className="_Card">
                                สัญลักษณ์ธนาคาร
                            <h3 style={{ margin: "0px" }}>ชื่อธนาคาร</h3>
                                <h4 style={{ margin: "0px" }}>ชื่อบัญชีธนาคาร เลขที่บัญชี</h4>
                            </div> : null : null}

                        <button className="BTN_Signin" onClick={() => this.onOpenModal()}>แก้ไขข้อมูล</button>
                    </div>
                    <div className="col-3"></div>


                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="App">
                        <div className="Row">
                            <div className="col-12">
                                <h2 style={{ textAlign: "center" }}>เเก้ไขข้อมูลผู้ใช้งาน</h2>
                            </div>
                        </div>
                        <div className="Row">
                            <div className="col-1"></div>
                            <div className="col-4">
                                <h4>ชื่อ</h4>
                                < input
                                    type="text" id="name"
                                    value={this.state.get_user.name}
                                    onChange={this.handleChange}
                                />
                                <h4>อีเมล์</h4>
                                < input
                                    type="text" id="email"
                                    value={this.state.get_user.email}
                                    onChange={this.handleChange}
                                />
                                <h4>ที่อยู่</h4>
                                < input
                                    type="text" id="address"
                                    value={this.state.get_user.address}
                                    onChange={this.handleChange}
                                />
                                <h4>ประเภทผู้ใช้งาน</h4>
                                <select id="user_type" name="user_type" onChange={this.handleChange}>
                                    <option>{this.render_type(this.state.get_user.user_type)}</option>
                                    <option value='2'>ผู้ประกอบการ</option>
                                    <option value='4'>SE กลาง</option>
                                    <option value='3'>SE ย่อย</option>
                                </select>
                                
                            </div>
                            <div className="col-1"></div>



                            <div className="col-4">
                                <h4>นามสกุล</h4>
                                < input
                                    type="text" id="lastname"
                                    value={this.state.get_user.lastname}
                                    onChange={this.handleChange}
                                />

                                <h4>เบอร์โทรศัพท์</h4>
                                < input
                                    type="text" id="phone"
                                    value={this.state.get_user.phone}
                                    onChange={this.handleChange}
                                />
                                <h4>ชื่อผู้ใช้งาน</h4>
                                < input
                                    type="text" id="username"
                                    value={this.state.get_user.username}
                                    onChange={this.handleChange}
                                />
                                <button className="BTN_Signup" onClick={()=> this.onCloseModal()}>ยกเลิก</button>
                                <button className="BTN_Signin" onClick={() => this.update_data_user()}>บันทึกข้อมูลผู้ใช้งาน</button>

                            </div>
                            <div className="col-1"></div>
                        </div>

                    </div>
                </Modal>

            </div>
        )
    }
}
export default UserDetail;