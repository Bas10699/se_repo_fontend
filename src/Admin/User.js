//ข้อมูลผู้ใช้งาน
//1 = admin
//2 = trader
//3 = se-middle
//4 = se-sub
import React, { Component } from 'react';
import { user_token } from '../Support/Constance';
import { get } from '../Support/Service';

class User extends Component {
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
            get_user: null,
            isInEdit: false,
            user_image: null,
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
        };
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
                    
                    </div>
                    <div className="col-3"></div>
                        
                    
                </div>


                
            </div>
        )
    }
}
export default User;