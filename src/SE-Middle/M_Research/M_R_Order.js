//เรียกดูคำสั่งแปรรูปผลิตภัณฑ์
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { element } from 'prop-types';
import { user_token } from '../../Support/Constance';
import { get, post } from '../../Support/Service';
import Modal from 'react-responsive-modal';
import Checkbox from '../M_Research/Checkbox_R'
import folder from '../../Image/folder.png'
import DateSelect from '../../Support/dateSelect'


class M_R_Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            get_demand: [],
            check_array: [],
            open: false,
            open1: false,
            researcher: [],
            date_line: "",
            date_comfirm: "",
            show_data: false,
            setdata: [],
            nutrient: [],
            name_product: null,
            id_product: null,
            list_research: [],
            get_send_data_line: [],
            product_researcher_status: null,
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
        // window.location.reload()
        this.setState({ open: false, open1: false, show_data: false, list_research: [] });

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
            list_research: this.state.list_research,
            product_id: this.state.id_product,
            date_confirm: this.state.date_comfirm,
            date_line: this.state.date_line,
            check: check,
            resear: resear,
            data: data,
        }
        console.log(obj)
        try {
            await post(obj, 'neutrally/update_name_resercher_damand', user_token).then((result) => {
                if (result.success) {
                    alert("เลือกนักวิจัยเรียบร้อย")
                    window.location.reload()
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

    send_data_line = async (product_id, product_name) => {
        this.setState({
            open1: true
        })
        let obj = {
            product_id: product_id,
            // date_line: this.state.date_line
        }
        console.log("send_data_line", obj)
        try {
            await post(obj, 'neutrally/get_product_researcher_confirm', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_send_data_line: result.result,
                        name_product: product_name

                    })
                    console.log("send_data_line", result.result)
                }
                else {
                    alert("send_data_line", result.error_message)
                }

            })
        } catch (error) {
            alert('send_data_line: ' + error)
        }

    }

    show = (element) => {
        this.setState({
            show_data: true,
            setdata: element,
            nutrient: element.nutrient
        })
        console.log("show", element)
    }

    render_status = (data) => {
        let return_comfirm
        switch (data.product_status) {
            case 1: return_comfirm = <div style={{ textAlign: "center" }}><button onClick={() => this.setState({
                open: true,
                name_product: data.product_name,
                id_product: data.product_id,
            })} className="BTN_Signin"
                style={{ float: "left", marginLeft: "23%", marginTop: "0", fontSize: "18px" }}>เลือกนักวิจัย</button></div>
                break;
            // case 2: return_comfirm = "ทำการเลือกนักวิจัยเรียบร้อยรอการตอบกลับ"
            //     break;
            case 3: case 2: return_comfirm =
                <div style={{ textAlign: "center" }}>
                    <button onClick={() => this.send_data_line(data.product_id, data.product_name)} className="BTN_Signup"
                        style={{ float: "left", marginLeft: "23%", marginTop: "0" }}>แสดงรายชื่อนักวิจัย</button></div>
                break;
            case 4: return_comfirm = "ยกเลิก"
                break;
            default: return_comfirm = "เกิดข้อผิดพลาด"
                break;
        }
        return return_comfirm
    }

    render_confirm = (product_researcher_status) => {
        // this.setState({product_researcher_status:product_researcher_status})
        let return_product_researcher_status
        switch (product_researcher_status) {
            case 0: return_product_researcher_status = <div>รอการตอบรับ</div>
                break;
            case 1: return_product_researcher_status = <div style={{ color: "green" }}>ยืนยันเเล้ว</div>
                break;
            case 2: return_product_researcher_status = <div style={{ color: "red" }}>ยกเลิกเเล้ว</div>
                break;

            default:
                break;
        }
        return return_product_researcher_status
    }

    callbackFunction = (childData) => {
        this.setState({ date_comfirm: childData })
        // alert(childData)
    }
    callbackFunction_line = (childData) => {
        this.setState({ date_line: childData })
        // alert(childData)
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
                                        <td>{element.name} {element.last_name}</td>
                                        <td>{element.product_name}</td>
                                        <td><img src={folder} style={{ width: "25px", cursor: "pointer" }} alt="ข้อมูล" onClick={() => this.show(element)} /></td>
                                        <td>{element.product_status >= 0 ? this.render_status(element)
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
                            <h5>กำหนดวันที่ตอบรับการพัฒนา
                                {/* <input type="date" id="date_comfirm" onChange={this.handleChange} /> */}
                                <DateSelect parentCallback={this.callbackFunction} />
                            </h5>
                            <h5>กำหนดวันที่ส่งสูตร
                                {/* <input type="date" id="date_line" onChange={this.handleChange} /> */}
                                <DateSelect parentCallback={this.callbackFunction_line} />
                            </h5>
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
                            <table>
                                <tr>
                                    <th>รายชื่อนักวิจัย</th>
                                    <th>การตอบรับ</th>
                                </tr>
                                {this.state.get_send_data_line.map((e, index) => {
                                    return (
                                        <tr>
                                            <td>{e.name} {e.last_name}</td>
                                            <td>{this.render_confirm(e.product_researcher_status)}</td>
                                        </tr>
                                    )
                                })}
                            </table>
                            <button
                                onClick={() => this.setState({ open1: false })}
                                className="BTN_Signin">ปิดหน้าต่างนี้</button>

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