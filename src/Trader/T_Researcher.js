import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token } from '../Support/Constance'
import { element } from 'prop-types'

class T_Researcher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            demand: []
        }
    }

    componentWillMount() {
        this.get_send_demand()
    }
    get_send_demand = async () => {
        try {
            await get('trader/get_send_demand_personal', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        demand: result.result
                    })
                    console.log('demand', result.result)
                }
                else {
                    alert(result.error_message)
                }
            })
        } catch (error) {
            alert(error)
        }
    }
    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>ตรวจสอบการพัฒนาผลิตภัณฑ์</h2>
                    </div>
                </div>
                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <table>
                            <tr>
                                <th>ชื่อผลิตภัณฑ์</th>
                                <th>สถานะการพัฒนา</th>
                                <th>ระยะเวลา</th>
                                <th>ยกเลิก</th>
                            </tr>
                            {this.state.demand.map((element) => {
                                return (
                                    <tr style={{ textAlign: "center" }}>
                                        <td>{element.product_name}</td>
                                        <td>{element.product_status}</td>
                                        <td>
                                            <div style={{ color: "green" }}>เริ่มวันที่ : 1/10/2562 </div>
                                            <div style={{ color: "red" }}>กำหนดส่ง : 31/12/2562</div>
                                        </td>
                                        <td><button className="BTN_Cencle">ยกเลิก</button></td>
                                    </tr>
                                )
                            })}
                            {/* <tr style={{ textAlign: "center" }}>
                                <td>น้ำมันพืชใจข้าว</td>
                                <td>อยู่ในขั้นตอนการวิจัย</td>
                                <td>
                                    <div style={{ color: "green" }}>เริ่มวันที่ : 1/10/2562 </div>
                                    <div style={{ color: "red" }}>กำหนดส่ง : 31/12/2562</div>
                                </td>
                                <td><button className="BTN_Cencle">ยกเลิก</button></td>
                            </tr>

                            <tr style={{ textAlign: "center" }}>
                                <td>ผ้าหางกระรอก 100 % </td>
                                <td>อยู่ในขั้นตอนการวิจัย</td>
                                <td>
                                    <div style={{ color: "green" }}>เริ่มวันที่ : 1/10/2562 </div>
                                    <div style={{ color: "red" }}>กำหนดส่ง : 31/12/2562</div>
                                </td>
                                <td><button className="BTN_Cencle">ยกเลิก</button></td>
                            </tr> */}

                        </table>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>


        )
    }
}
export default T_Researcher