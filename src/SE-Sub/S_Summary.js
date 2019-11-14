//se-sub สรุปยอดขายสินค้า

import React, { Component } from 'react'
import { get } from '../Support/Service'
import { addComma, user_token } from '../Support/Constance'
import moment from 'moment'
import { NavLink } from 'react-router-dom'

class S_Summary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            farmer: [],
            summary_personal: []
        }
    }
    componentWillMount() {
        this.get_static()

    }
    get_summary_personal = async () => {
        try {
            await get('neo_firm/get_summary_personal', user_token, (err, result) => {
                if (result.success) {
                    this.setState({
                        summary_personal: result.result
                    })
                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert(error)
        }
    }

    get_static = async () => {
        try {
            await get('neo_firm/get_trading_statistics_farmer', user_token).then((result) => {
                if (result.success) {
                    this.setState({ farmer: result.result })
                    console.log("static", result.result)
                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('get_static: ' + error)
        }
    }

    render() {
        return (
            <div className='App'>
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>สรุปยอดขาย</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8" style={{ textAlign: "center" }}>
                        <h4>เลือกวันที่ <input type="date" id='dateStart' onChange={this.handleChange} /> ถึง <input type="date" id='dateEnd' onChange={this.handleChange} /></h4>
                        <button onClick={() => this.filterDate()}>ค้นหา</button>
                        เเสดงรายการจากวันที่ ปปป ถึงวันที่ ผผผ มียอดรวม {this.state.sum_money} บาท
                        <table>
                            <tr>
                                <th>ลำดับ</th>
                                <th>วันที่</th>
                                <th>ชื่อพืช</th>
                                <th>จำนวน</th>
                                <th>ราคารวม</th>
                            </tr>
                            {/* {this.state.summery_trader.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{moment(item.date_of_payment).utc().format('DD/MM/YYYY')}</td>
                                        <td>{item.plant_name}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.amount * item.price}</td>
                                    </tr>
                                )
                            })} */}
                        </table>

                    </div>
                    <div className="col-2"></div>

                </div>

            </div>
        )
    }
}
export default S_Summary