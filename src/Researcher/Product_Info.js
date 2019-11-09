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
        this.setState({ open: true, product_name: product_name });
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
                                    let nutrient = JSON.parse(element.nutrient)
                                    if (element.product_researcher_status == 1) {
                                        return (
                                            <tr>
                                                <td>{element.product_name}</td>
                                                <td>{nutrient.map((element_n, index) => {
                                                    return element_n + " "
                                                })}</td>
                                                <td>{element.volume} {element.volume_type}</td>
                                                <td>
                                                    กรุณาส่งสูตรก่อน :  <div style={{ color: "red" }}>{moment(element.time_end).utc().add('years', 543).format("DD/MM/YYYY")}</div></td>
                                                <td>
                                                    <NavLink to="/Create_Info" ><button className="BTN_Signin" style={{ margin: "0" }}>สร้างสูตร</button></NavLink>

                                                </td>

                                            </tr>
                                        )
                                    }

                                })
                            }
                        </table>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        )
    }
} export default Confirm_Product;