//แก้ไข User
import React, { Component } from 'react';
import { user_token, addComma } from '../../Support/Constance';
import { ip, get, post } from '../../Support/Service';
import { NavLink } from 'react-router-dom';
import Modal from 'react-responsive-modal'

const invoice = [
    {
        bankNo: "123-4-56789-0",
        bankName: "นายบัญชี ธนาคาร",
        bankAccount: "ธนาคารกรุงไทย"
    },
    {
        bankNo: "012-3-45678-9",
        bankName: "นายบัญชี ธนาคาร",
        bankAccount: "ธนาคารไทยพาณิชย์"
    }

]
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
            get_user: '',
            isInEdit: false,
            password: true,
            password1: null,
            new_password1: null,
            new_password_again1: null,
            open: false,

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

    Password_Show = () => {
        this.setState({ password: !this.state.password });
    }

    Check_Password = () => {
        if (this.state.new_password1 === null) {
            alert("กรุณากรอกรหัสผ่านใหม่");
        } else if (this.state.new_password_again1 === null) {
            alert("กรุณากรอกรหัสผ่านยืนยัน");
        } else if (this.state.new_password1 !== this.state.new_password_again1) {
            alert("รหัสผ่านไม่ตรงกัน");

        } else {
            this.change_password(this.state.new_password1)
        }
    }
    change_password = async (new_password) => {
        let object = {
            password: this.state.password1,
            newpassword: new_password
        }
        console.log(object)
        try {
            await post(object, 'user/user_update_password', user_token).then((result) => {
                if (result.success) {
                    alert(result.message)
                    window.location.reload()
                }
                else {
                    alert(result.error_message)
                }
            })

        } catch (error) {
            alert('change_password: ' + error)
        }
    }

    update_data_user = async () => {
        let object = {
            name: this.state.get_user.name,
            lastname: this.state.get_user.lastname,
            email: this.state.get_user.email,
            phone: this.state.get_user.phone,
            username: this.state.get_user.username,
            address: this.state.get_user.address
        }
        try {
            await post(object, 'user/user_update_data', user_token).then((result) => {
                if (result.success) {
                    alert(result.message)
                    window.location.reload()
                }
                else {
                    alert(result.error_message)
                }
            })
        } catch (error) {
            alert('update_data_user' + error)
        }

    }

    handleChange = (e) => {
        let users = this.state.get_user
        users[e.target.id] = e.target.value
        this.setState({
            get_user: users
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


    onOpenModal = () => {
        this.setState({ open: true });
    };
    openEdit = () => {
        this.setState({ open: true });
    }
    onCloseModal = () => {
        this.setState({ open: false, openEdit: false });

    };

    add_invoice = () => {
        alert("เพิ่มบัญชีธนาคารเรียบร้อย")
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
                            value={this.state.get_user.name}
                            onChange={this.handleChange}
                        />
                        <h4>นามสกุล</h4>
                        < input
                            type="text" id="lastname"
                            value={this.state.get_user.lastname}
                            onChange={this.handleChange}
                        />
                        <h4>ประเภทผู้ใช้งาน : {this.render_type(this.state.get_user ? this.state.get_user.user_type : null)}</h4>
                        <h4>อีเมล์</h4>
                        < input
                            type="text" id="email"
                            value={this.state.get_user.email}
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
                        <h4>ที่อยู่</h4>
                        < input
                            type="text" id="address"
                            value={this.state.get_user.address}
                            onChange={this.handleChange}
                        />
                        <button className="BTN_Signin" onClick={() => this.update_data_user()}>บันทึกข้อมูลผู้ใช้งาน</button>
                        <NavLink to={"/User"}><button className="BTN_Signup">ยกเลิก</button></NavLink>
                    </div>
                    <div className="col-1"></div>



                    <div className="col-4">
                        <div className="">
                            <h3 style={{ textAlign: "center" }}>รหัสผ่าน</h3>

                            <h4>กรอกรหัสผ่านเก่า</h4>
                            <input type={this.state.password ? "password" : "text"}
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

                        <hr style={{ marginTop: "80px" }} />
                        <h3 style={{ textAlign: "center", marginTop: "50px" }}>บัญชีธนาคาร</h3>

                        <button className='BTN_CONFIRM' style={{ float: "right", marginTop: "-20px", width:"100%"}} onClick={() => this.onOpenModal()}>เพิ่มบัญชีธนาคาร</button>

                        {invoice.map((element_in, index) => {
                            return (
                                <div className="Card" style={{ width: "45%", marginTop: "10px" }}>
                                    <h4 >{element_in.bankName}</h4>
                                    <h5 style={{ marginTop: "-20px" }}>{element_in.bankAccount}</h5>
                                    <h5 style={{ marginTop: "-20px" }}>{element_in.bankNo}</h5>
                                    <button onClick={() => this.setState({ openEdit: true })}>แก้ไข</button>
                                </div>

                            )
                        })}

                        <Modal open={this.state.open} onClose={this.onCloseModal}>
                            <div className="Row">
                                <div className="col-12"><h2 style={{ textAlign: "center" }}>เพิ่มบัญชีธนาคาร</h2></div>
                            </div>
                            <div className="Row" style={{ width: "500px" }}>

                                <div className="col-10">

                                    <h5>ชื่อธนาคาร</h5> <input type="text" placeholder="ธนาคารกรุงไทย, ธนาคารไทยพาณิชย์" />
                                    <h5>เลขที่บัญชี</h5> <input type="text" pattern="[0-9]{1,}" placeholder="123-4-56789-0" />
                                    <h5>ชื่อบัญชี</h5> <input type="text" placeholder="นางบัญชี ธนาคาร, Miss.bunshe Thanakan" />

                                    <button className="BTN_PDF" onClick={() => { this.onCloseModal() }}>ยกเลิก</button>
                                    <button className='BTN_CONFIRM' onClick={() => { this.add_invoice() }}>เพิ่มบัญชี</button></div>
                            </div>
                        </Modal>

                        <Modal open={this.state.openEdit} onClose={this.onCloseModal}>
                            <div className="Row">
                                <div className="col-12"><h2 style={{ textAlign: "center" }}>แก้ไขบัญชีธนาคาร</h2></div>
                            </div>
                            <div className="Row" style={{ width: "500px" }}>
                                <div className="col-10">
                                    <h5>ชื่อธนาคาร</h5> <input type="text" placeholder="ธนาคารกรุงไทย, ธนาคารไทยพาณิชย์" />
                                    <h5>เลขที่บัญชี</h5> <input type="text" pattern="[0-9]{1,}" placeholder="123-4-56789-0" />
                                    <h5>ชื่อบัญชี</h5> <input type="text" placeholder="นางบัญชี ธนาคาร, Miss.bunshe Thanakan" />

                                    <button className="BTN_PDF" onClick={() => { this.onCloseModal() }}>ยกเลิก</button>
                                    <button className='BTN_CONFIRM' onClick={() => { this.add_invoice() }}>ยืนยัน</button></div>
                            </div>
                        </Modal>



                    </div>
                    <div className="col-1"></div>
                </div>

            </div>
        )
    }
}
export default EditUser;