import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { user_token } from '../Support/Constance';
import { get, post } from '../Support/Service';
import Modal from 'react-responsive-modal';
import moment from 'moment'

class Confirm_Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            get_demand: [],
            Fill_out_img: "https://nl2561.nlpoly.com/wp-content/uploads/2018/05/f25.png",

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
        this.get_demand()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    get_demand = async () => {
        try {
            await get('researcher/get_demand_personal', user_token).then((result) => {
                if (result.success) {
                    console.log("get_demand", result.result)
                    this.setState({
                        get_demand: result.result
                    })
                    setTimeout(() => {
                        console.log("get_demand", result.result)
                    }, 500)
                } else {
                    console.log("get_demand", result.result)
                }
            });
        } catch (error) {
            alert("get_demand" + error);
        }
    }

    on_Open_Modal = (product_name) => {
        this.setState({ open: true,product_name:product_name });
    }

    on_Close_Modal = () => {
        this.setState({ open: false });
    };

    Finish = () => {
        alert("พัฒนาเสร็จสิ้น")
    }

    render() {
        return (
            <div className="App">

                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>ข้อมูลผลิตภัณฑ์</h3>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <table style={{ textAlign: "center" }}>
                            <tr>
                                <th>ชื่อผลิตภัณฑ์</th>
                                <th>สารอาหารที่ต้องการ</th>
                                <th>จำนวนผลิตภัณฑ์</th>
                                <th>ระยะเวลาการพัฒนา</th>
                                <th>กรอกข้อมูล</th>
                            </tr>
                            {
                                this.state.get_demand.map((element, index) => {
                                    let nutrient=JSON.parse(element.nutrient)
                                    return (
                                        <tr>
                                            <td>{element.product_name}</td>
                                            <td>{nutrient.map((element_n, index) => {
                                                return element_n+" "
                                            })}</td>
                                            <td>{element.volume} {element.volume_type}</td>
                                            <td>
                                               กรุณาส่งสูตรก่อน :  <div style={{ color: "red" }}>{moment(element.time_end).utc().add('years', 543).format("DD/MM/YYYY")}</div></td>
                                            <td>
                                                <NavLink to="/Create_Info"><button>สร้างสูตร</button></NavLink> 
                                                    {/* <img alt="กรอกสูตร" src={this.state.Fill_out_img} style={{ width: "30px",cursor:"pointer" }} onClick={() => { this.on_Open_Modal(element.product_name) }} /> */}
                                            </td>
                                            
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                    <div className="col-1"></div>
                </div>


                <Modal open={this.state.open} onClose={this.on_Close_Modal}>
                    <div className="Row" style={{ width: "800px" }}>
                        <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>พัฒนาผลิตภัณฑ์ {this.state.product_name}</h3>
                            <h4>ชื่อสูตรผลิตภัณฑ์</h4>
                            <input type="text" style={{ width: "90%" }} />
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-6">
                            <h4>ข้อมูลสารอาหาร</h4>
                            <input type="text" style={{ width: "250px" }} />
                        </div>
                        <div className="col-6">
                            <h4>ปริมาณสารอาหาร</h4>
                            <input type="text" style={{ width: "50px" }} />%
                            <button className="BTN_CONFIRM" style={{width:"50%",float:"right"}}>เพิ่มปริมาณสารอาหาร</button>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-6">
                            <h4>วัตถุดิบที่ใช้</h4>
                            <input type="text" style={{ width: "200px" }} />
                        </div>
                        <div className="col-3">
                            <h4>ปริมาณ</h4>
                            <input type="text" style={{ width: "50px" }} />
                        </div>
                        <div className="col-3">
                            <h4>หน่วย</h4>
                            <input type="text" style={{ width: "50px" }} />
                            <button>เพิ่มข้อมูล</button>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-12">
                            <h4>เลือกรูปภาพ</h4>
                            <input type="file" placeholder="กรุณาเลือกรูปภาพ" style={{ width: "500px" }} />
                        </div>
                    </div>
                    <button>ตกลง</button>
                    <button>ยกเลิก</button>
                </Modal>
            </div>
        )
    }
} export default Confirm_Product;