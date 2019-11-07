//se-sub สรุปยอดขายสินค้า

import React, { Component } from 'react'
import { get } from '../Support/Service'
import { addComma,user_token } from '../Support/Constance'
import moment from 'moment'
import {NavLink} from 'react-router-dom'

class S_Summary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            farmer: [],
        }
    }
    componentWillMount() {
        this.get_static()
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
                        <h2 style={{ textAlign: "center" }}>ประวัติการสั่งซื้อ</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <table style={{textAlign:"center"}}>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ชื่อ - นามสกุล เกษตรกร</th>
                                <th>พืช</th>
                                <th>จำนวนที่สั่งซื้อ (กิโลกรัม)</th>
                                <th>วันที่</th>
                                <th>เลขใบสั่งซื้อ</th>
                            </tr>

                            {this.state.farmer.map((e, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}.</td>
                                        <td style={{textAlign:"left"}}>{e.order_farmer_title_name}{e.order_farmer_name} {e.order_farmer_lastname}</td>
                                        <td>{e.order_farmer_plant}</td>
                                        <td>{addComma(e.order_farmer_plant_volume)}</td>
                                        <td>{moment(e.order_farmer_date).utc().add('years', 543).format("DD/MM/YYYY")}</td>
                                        <td><NavLink to={'S_Order/Order?orderId='+e.order_se_id}>{e.order_se_id}</NavLink></td>
                                        
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                    <div className="col-2"></div>

                </div>

            </div>
        )
    }
}
export default S_Summary