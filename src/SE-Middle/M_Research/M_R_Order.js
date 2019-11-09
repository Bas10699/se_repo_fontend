//เรียกดูคำสั่งแปรรูปผลิตภัณฑ์
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { element } from 'prop-types';
import { user_token } from '../../Support/Constance';
import { get, post } from '../../Support/Service';
import Modal from 'react-responsive-modal';
import Checkbox from '../M_Research/Checkbox_R'
import folder from '../../Image/folder.png'
import { throwStatement } from '@babel/types';


class M_R_Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            get_demand: [],
            check_array: [],
            open: false,
            open1: false,
            researcher: [],
            date: "",
            show_data: false,
            setdata: [],
            nutrient: [],
            name_product: null,
            id_product: null,
            list_research: []
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentWillMount() {
        this.get_demand()
        this.get_reaearcher()
    }

    get_reaearcher = async () => {
        try {
            await get('neutrally/get_name_researcher', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        researcher: result.result
                    })
                    console.log("get_reaearcher", result.result)
                }
                else {
                    alert(result.error_message)
                }
            })

        } catch (error) {
            alert('get_reaearcher' + error)
        }
    }

    get_demand = async () => {
        try {
            await get('researcher/get_demand_trader_all', user_token).then((result) => {
                if (result.success) {

                    let result_arr = []

                    result.result.map((result_element) => {
                        result_arr.push({
                            ...result_element,
                            list_research: []
                        })
                    })


                    setTimeout(() => {
                        this.setState({
                            get_demand: result_arr
                        })
                    }, 10)




                    console.log("get_demand", result.result)
                }
                else {
                    alert("get_demand", result.error_message)
                }
            })
        }
        catch (error) {
            alert('get_demand' + error)
        }
    }

    onCloseModal = () => {
        window.location.reload()
        this.setState({ open: false, show_data: false });

    };




    send_data = async () => {
        this.setState({ open: false, show_data: false });
        let check = this.state.check_array
        let resear = this.state.researcher
        let data = []
        // check.map((element) => {
        //     data.push(
        //         resear[element]
        //     )
        // })
        let obj = {
            data: this.state.list_research,
            product_id: this.state.id_product,
            date: this.state.date
        }
        console.log(obj)
        try {
            await post(obj, 'neutrally/update_name_resercher_damand', user_token).then((result) => {
                if (result.success) {
                    alert("เลือกนักวิจัยเรียบร้อย")
                    window.location.href = '/M_Demand/M_R_Trace'
                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('send: ' + error)
        }
        // this.setState({ open: false })
    }

    show = (element) => {
        this.setState({
            show_data: true,
            setdata: element,
            nutrient: element.nutrient
        })
        console.log("show", element)
    }

    render_status = (status) => {
        let return_comfirm
        switch (status) {
            case 1: return_comfirm = <div style={{ textAlign: "center" }}><button onClick={() => this.setState({
                open: true,
                name_product: element.product_name,
                id_product: element.product_id,
                list_research: element.list_research
            })} className="BTN_Signin"
                style={{ float: "left", marginLeft: "23%", marginTop: "0" }}>เลือกนักวิจัย</button></div>
                break;
            case 2: return_comfirm = "ทำการเลือกนักวิจัยเรียบร้อยรอการตอบกลับ"
                break;
            case 3: return_comfirm =
                <div style={{ textAlign: "center" }}>
                    <button onClick={() => this.setState({
                        open1: true,
                    })} className="BTN_Signin"
                        style={{ float: "left", marginLeft: "23%", marginTop: "0" }}>แสดงรายชื่อนักวิจัย</button></div>
                break;
            case 4: return_comfirm = "ยกเลิก"
                break;
            default: return_comfirm = "เกิดข้อผิดพลาด"
                break;
        }
        return return_comfirm
    }

    render() {
        let setdata = this.state.setdata
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>คำสั่งแปรรูปผลิตภัณฑ์</h3>
                    </div>
                </div>
                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <table>
                            <tr>
                                <th>ผู้สั่งพัฒนาผลิตภัณฑ์</th>
                                <th>ชื่อผลิตภัณฑ์</th>
                                <th>ข้อมูล</th>
                                <th>นักวิจัย</th>
                            </tr>

                            {this.state.get_demand.map((element, index) => {
                                return (
                                    <tr style={{ textAlign: "center" }}>
                                        <td>{element.trader_id}</td>
                                        <td>{element.product_name}</td>
                                        <td><img src={folder} style={{ width: "25px", cursor: "pointer" }} alt="ข้อมูล" onClick={() => this.show(element)} /></td>
                                        <td>{element.product_status >= 0 ? this.render_status(element.product_status)
                                            :
                                            null}
                                        </td>

                                    </tr>

                                )
                            })}

                        </table>
                    </div>
                    <div className="col-1"></div>
                </div>

                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="Row" style={{ width: "800px" }}>
                        <div className="col-12">

                            <h3 style={{ textAlign: "center" }}>รายชื่อนักวิจัยสำหรับการพัฒนา {this.state.name_product}</h3>
                            กำหนดวันที่ตอบรับการพัฒนา <input type="date" id="date" onChange={this.handleChange} />
                            <Checkbox
                                option={this.state.researcher}
                                check_array={this.state.list_research}
                                return_func={(event) => {
                                    console.log('event', event)
                                    this.setState({
                                        list_research: event
                                    })
                                }} />

                            <button onClick={() => this.send_data()} className="BTN_Signin">ยืนยัน</button>
                        </div>
                    </div>
                </Modal>


                <Modal open={this.state.open1} onClose={this.onCloseModal}>
                    <div className="Row" style={{ width: "800px" }}>
                        <div className="col-12">

                            <h3 style={{ textAlign: "center" }}>รายชื่อนักวิจัยที่เลือกพัฒนา {this.state.name_product}</h3>
                            กำหนดวันที่ส่งสูตร<input type="date" id="date" onChange={this.handleChange} />
                            <table>
                                <tr>
                                    <th>รายชื่อนักวิจัย</th>
                                    <th>พัฒนาเเล้ว</th>
                                    <th>ผลิตภัณฑ์ที่กำลังพัฒนา</th>
                                    <th>การตอบรับ</th>
                                </tr>
                                <tr>
                                    <td>ชื่อนักวิจัย</td>
                                    <td>ชื่อนักวิจัย</td>
                                    <td>ชื่อนักวิจัย</td>
                                    <td>ชื่อนักวิจัย</td>
                                </tr>
                            </table>

                            <button onClick={() => this.send_data()} className="BTN_Signin">ยืนยัน</button>
                        </div>
                    </div>

                </Modal>


                <Modal open={this.state.show_data} onClose={
                    this.onCloseModal

                }>
                    <div className="Row" style={{ width: "800px" }}>
                        <div className="col-12">

                            <h3 style={{ textAlign: "center" }}>รายละเอียด {setdata.product_name}</h3>
                            <table>
                                <tr>

                                    <th style={{ width: "30%" }}>สารอาหารที่ต้องการ</th>
                                    <td>{this.state.nutrient + "\n"}</td>
                                </tr>
                                <tr>
                                    <th>จำนวนผลิตภัณฑ์</th>
                                    <td><h4 style={{ margin: "0" }}>{setdata.volume} {setdata.volume_type}</h4></td>
                                </tr>
                            </table>
                            <button className="BTN_Signin" onClick={this.onCloseModal}>ปิดหน้าต่างนี้</button>
                        </div>
                    </div>

                </Modal>

            </div >
        )
    }
} export default M_R_Order;