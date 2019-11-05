import React, { Component } from 'react'
import { user_token } from '../Support/Constance'
import { get, post } from '../Support/Service'
import T_Researcher from './T_Researcher'
import { element } from 'prop-types'

class T_Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_name: '',
            nutrient: [],
            resear_name: "",
            page: 1
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        if (e.key === 'Enter') {
            this.add_resear()
        }
    }

    send_demand = async (status) => {
        let object = {
            product_name: this.state.product_name,
            nutrient: JSON.stringify(this.state.nutrient),
            volume:this.state.volume,
            volume_type:this.state.volume_type,
            product_status: status
        }
        try {
            await post(object, 'trader/add_send_demand', user_token).then((result) => {
                if (result.success) {
                    alert('เรียบร้อย')
                    window.location.href='/T_Order/trace'
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

    add_resear = () => {
        let nutrient = this.state.nutrient
        if (this.state.resear_name) {
            nutrient.push(this.state.resear_name)
            this.setState({
                nutrient: nutrient,
                resear_name: ""
            })
        }

    }
    delete_reseqr = (index) =>{
        let nutrient = this.state.nutrient
        nutrient.splice(index,1)
        this.setState({
            nutrient: nutrient
        })

    }

    render_page = (page) => {
        let return_page
        switch (page) {
            case 1:
                return_page = <div className="App">
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
                                        <input id='volume' onChange={this.handleChange} type="number" style={{ width: "70%", marginLeft: "20px" }} />
                                    </div>
                                    <div className="col-6">
                                        <h5 style={{ marginBottom: "7px" }}>หน่วย</h5>
                                        <input id='volume_type' onChange={this.handleChange} type="text" style={{ width: "30%", marginLeft: "0px" }} />
                                    </div>
                                </div>

                                <h5 style={{ marginBottom: "0" }}>สารอาหารที่ต้องการ</h5>
                                <input
                                    id='resear_name'
                                    onChange={this.handleChange}
                                    value={this.state.resear_name}
                                    onKeyUp={this.handleChange}
                                    type="text"
                                    style={{ width: "69%", marginLeft: "20px" }} />
                                <button className="Add" style={{ marginTop: "0" }} onClick={() => this.add_resear()}>เพิ่มสารอาหาร</button>

                            </div>
                            <div className="Row">
                                <div className="col-12">
                                    <h4>สารอาหารที่เลือก</h4>
                                    <table>
                                        {this.state.nutrient.map((element,index) => {
                                            return (
                                                <tr>
                                                    <td>{element}</td>
                                                    <td style={{ float: "right" }}><button className="BTN_Cencle" onClick={()=>this.delete_reseqr(index)}>ลบ</button></td>
                                                </tr>
                                            )
                                        })}

                                    </table>
                                </div>

                            </div>
                            <div style={{ marginTop: "25px" }}>
                                <button className="BTN_Cencle">ยกเลิก</button>
                                <button className="BTN_Signup" style={{ marginTop: "0" }} onClick={() => this.send_demand(1)}>ส่งความต้องการพัฒนา</button>
                                <button className="BTN_Signin" style={{ marginTop: "0" }} onClick={() => this.send_demand(0)}>บันทึกเป็นฉบับร่าง</button>

                            </div>

                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>

                break;
            case 2: return_page = <T_Researcher />

                break;
            default:
                break;
        }
        return return_page;
    }



    render() {
        let pa = this.props.match.params
        let page = 0
        console.log(pa)
        if(pa.DD){
            page = 2
        }
        else{
            page = 1
        }
        return (
            <div className="App">
                <div className="tab">
                    <button onClick={() => window.location.href="/T_Order"}>ส่งความต้องการพัฒนาผลิตภัณฑ์</button>
                    <button onClick={() => window.location.href="/T_Order/trace"}>ติดตามการพัฒนาผลิตภัณฑ์</button>
                </div>
                {this.render_page(page)}
            </div>
        )
    }
}
export default T_Order;