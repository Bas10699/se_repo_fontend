import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { user_token } from '../Support/Constance';
import { get, post } from '../Support/Service';
import Modal from 'react-responsive-modal';

const Product = [
    {
        Product_name: "ยาสมุนไพรลดความอ้วน",
        Product_nutrients: 'โปรตีน',
        Product_number: '10 กล่อง',
        Check_true_img: "https://www.nipa.co.th/wp-content/uploads/2019/03/okt.png",
        Check_false_img: "https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png",
        Fill_out_img: "https://nl2561.nlpoly.com/wp-content/uploads/2018/05/f25.png",
        Develop_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYMcV_tU_MuKHFjcO_cxa_wvoJOJulAKzOU80H4nnltqnkxCFp"
    },
    {
        Product_name: "อาหารคลีน",
        Product_nutrients: 'คาร์โบไฮเดรต, โปรตีน',
        Product_number: '20 ชิ้น',
        Check_true_img: "https://www.nipa.co.th/wp-content/uploads/2019/03/okt.png",
        Check_false_img: "https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png",
        Fill_out_img: "https://nl2561.nlpoly.com/wp-content/uploads/2018/05/f25.png",
        Develop_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYMcV_tU_MuKHFjcO_cxa_wvoJOJulAKzOU80H4nnltqnkxCFp"
    },
    {
        Product_name: "นมเพิ่มความสูง",
        Product_nutrients: 'วิตามิน',
        Product_number: '30 กล่อง',
        Check_true_img: "https://www.nipa.co.th/wp-content/uploads/2019/03/okt.png",
        Check_false_img: "https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png",
        Fill_out_img: "https://nl2561.nlpoly.com/wp-content/uploads/2018/05/f25.png",
        Develop_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYMcV_tU_MuKHFjcO_cxa_wvoJOJulAKzOU80H4nnltqnkxCFp"
    }
]

class Confirm_Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    get_user = async () => {
        try {
            await get('show', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_user: result.result
                    })
                    setTimeout(() => {
                        console.log("get_user", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {
            alert("get_user2" + error);
        }
    }

    componentWillMount() {
        this.get_user()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    on_Open_Modal = () => {
        this.setState({ open: true });
    }

    on_Close_Modal = () => {
        this.setState({ open: false });
    };

    Finish = () => {
        alert("พัฒนาเสร็จสิ้น")
    }

    render () {
        return (
            <div className="App">

                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>ข้อมูลผลิตภัณฑ์</h3>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-12">
                        <table style={{ textAlign: "center" }}>
                            <tr>
                                <th>ชื่อผลิตภัณฑ์</th>
                                <th>สารอาหารที่ต้องการ</th>
                                <th>จำนวนผลิตภัณฑ์</th>
                                <th>ระยะเวลาการพัฒนา</th>
                                <th>กรอกข้อมูล</th>
                                <th>พัฒนาเสร็จสิ้น</th>
                            </tr>
                            {
                                Product.map((element, index) => {
                                    return (
                                        <tr>
                                            <td>{element.Product_name}</td>
                                            <td>{element.Product_nutrients}</td>
                                            <td>{element.Product_number}</td>
                                            <td><div style={{ color: "green" }}> วันที่เริ่มต้น : {element.timeStrat}</div>
                                                <div style={{ color: "red" }}>วันที่สิ้นสุด : {element.timeEnd}</div></td>
                                            <td>
                                                <NavLink>
                                                    <img src={element.Fill_out_img} style={{ width: "30px" }} onClick={() => {this.on_Open_Modal()}}/>
                                                    <Modal open={this.state.open} onClose={this.on_Close_Modal}>
                                                        <div className="Row">
                                                            <div className="col-12">
                                                                <h3 style={{ textAlign: "center" }}>พัฒนาผลิตภัณฑ์</h3>
                                                                <h4 style={{ textAlign: "center" }}>ชื่อผลิตภัณฑ์ : </h4>
                                                                <h4>ชื่อสูตรผลิตภัณฑ์</h4>
                                                                <input type="text" style={{ width: "500px" }}/>
                                                            </div>
                                                        </div>
                                                        <div className="Row">
                                                            <div className="col-6">
                                                                <h4>ข้อมูลสารอาหาร</h4>
                                                                <input type="text" style={{ width: "200px" }}/>
                                                            </div>
                                                            <div className="col-6">
                                                                <h4>ปริมาณสารอาหาร</h4>
                                                                <input type="text" style={{ width: "200px" }}/>
                                                                <button>เพิ่มข้อมูล</button>
                                                            </div>
                                                        </div>
                                                        <div className="Row">
                                                            <div className="col-6">
                                                            <h4>วัตถุดิบที่ใช้</h4>
                                                                <input type="text" style={{ width: "200px" }}/>
                                                            </div>
                                                            <div className="col-3">
                                                            <h4>ปริมาณ</h4>
                                                                <input type="text" style={{ width: "50px" }}/>
                                                            </div>
                                                            <div className="col-3">
                                                            <h4>หน่วย</h4>
                                                                <input type="text" style={{ width: "50px" }}/>
                                                                <button>เพิ่มข้อมูล</button>
                                                            </div>
                                                        </div>
                                                        <div className="Row">
                                                            <div className="col-12">
                                                            <h4>เลือกรูปภาพ</h4>
                                                                <input type="search" placeholder="กรุณาเลือกรูปภาพ" style={{ width: "500px" }}/>
                                                            </div>
                                                        </div>
                                                        <NavLink>
                                                            <button>
                                                                ตกลง
                                                            </button>
                                                        </NavLink>
                                                        <NavLink>
                                                            <button>
                                                                ยกเลิก
                                                            </button>
                                                        </NavLink>
                                                    </Modal>
                                                </NavLink>
                                            </td>
                                            <td>
                                                <NavLink>
                                                    <img src={element.Develop_img} style={{ width: "30px" }} onClick={() => {this.Finish()}}/>
                                                </NavLink>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                </div>

            </div>
        )
    }
} export default Confirm_Product;