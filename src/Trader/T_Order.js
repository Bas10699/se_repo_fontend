import React, { Component } from 'react'
import { user_token } from '../Support/Constance'
import { get, post } from '../Support/Service'

class T_Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_name: '',
            nutrient: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    send_demand = async (status) => {
        let object = {
            product_name: this.state.product_name,
            nutrient: this.state.nutrient,
            product_status: status
        }
        try {
            await post(object, 'trader/add_send_demand', user_token).then((result) => {
                if (result.success) {
                    alert('เรียบร้อย')
                }
                else {
                    alert(result.error_message)
                }
            })

        }
        catch (error) {
            alert('send_demand: ' + error)
        }
    }

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>ส่งความต้องการพัฒนาผลิตภัณฑ์</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <div>
                            <h5 style={{ marginBottom: "7px" }}>ชื่อผลิตภัณฑ์ที่ต้องการ </h5>
                            <input id='product_name' onChange={this.handleChange} type="text" style={{ width: "93%", marginLeft: "20px" }} />
                            <div className="Row">
                                <div className="col-6">
                                    <h5 style={{ marginBottom: "7px" }}>ปริมาณที่ต้องการ</h5>
                                    <input id='volum' onChange={this.handleChange} type="number" style={{ width: "70%", marginLeft: "20px" }} />
                                </div>
                                <div className="col-6">
                                    <h5 style={{ marginBottom: "7px" }}>หน่วย</h5>
                                    <input id='vulum' onChange={this.handleChange} type="text" style={{ width: "30%", marginLeft: "0px" }} />
                                </div>
                            </div>

                            <h5 style={{ marginBottom: "0" }}>สารอาหารที่ต้องการ</h5>
                            <input id='resear_name' onChange={this.handleChange} type="text" style={{ width: "69%", marginLeft: "20px" }} />
                            <button className="Add" style={{ marginTop: "0" }}>เพิ่มสารอาหาร</button>

                        </div>
                        <div className="Row">

                        </div>
                        <div>
                            <button className="BTN_Cencle">ยกเลิก</button>
                            <button className="BTN_Signup" style={{ marginTop: "0" }} onClick={() => this.send_demand(1)}>ส่งความต้องการพัฒนา</button>
                            <button className="BTN_Signin" style={{ marginTop: "0" }} onClick={() => this.send_demand(0)}>บันทึกเป็นฉบับร่าง</button>

                        </div>

                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        )
    }
}
export default T_Order;