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
            summary_personal: [],
            farmer_or: [],
            summary_personal_or: [],
            dateStart: null,
            dateEnd: null
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentWillMount() {
        this.get_static()
        this.get_summary_personal()

    }
    get_summary_personal = async () => {
        try {
            await get('neo_firm/get_summary_personal', user_token).then((result) => {
                if (result.success) {
                    console.log(result.result)
                    this.setState({
                        summary_personal: result.result,
                        summary_personal_or: result.result

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
                    this.setState({ farmer: result.result, farmer_or: result.result })
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

    filterDate = () => {

        let format = 'DD/MM/YYYY'
        let dateStart = moment(this.state.dateStart).format(format)
        let dateEnd = moment(this.state.dateEnd).format(format)
        console.log(dateStart, dateEnd)
        // var time = moment() gives you current time. no format required.
        let date_fil = []
        let date_se = []
        let money = 0
        this.state.summary_personal_or.map((element) => {
            let date = moment(element.order_se_Payment_date).utc().format(format)
            let time = moment(date, format),
                beforeTime = moment(dateStart, format),
                afterTime = moment(dateEnd, format);

            if (time.isBetween(beforeTime, afterTime, null, '[]')) {

                // console.log('is between')
                date_fil.push(element)
                // money += (element.amount * element.price)

            } else {
                // console.log('is not between')
            }
        })
        this.state.farmer_or.map((element) => {
            let date = moment(element.order_farmer_date).utc().format(format)
            let time = moment(date, format),
                beforeTime = moment(dateStart, format),
                afterTime = moment(dateEnd, format);

            if (time.isBetween(beforeTime, afterTime, null, '[]')) {

                // console.log('is between')
                date_se.push(element)

            } else {
                // console.log('is not between')
            }
        })
        this.setState({
            summary_personal: date_fil,
            farmer: date_se,

        })

    }

    sum_in_out_money = (data) => {
        let sum_se = this.state.farmer
        let date = []
        let result = []
        data.map((ele_data) => {
            let date_data = moment(ele_data.order_se_Payment_date).utc().format('DD/MM/YYYY')
            let index = date.findIndex((elem) => elem === date_data)
            if (index < 0) {
                date.push(date_data)
            }
        })
        date.map((ee) => {
            sum_se.map((ele) => {
                let date_se = moment(ele.order_farmer_date).utc().format('DD/MM/YYYY')
                if (ee !== date_se) {
                    let index = date.findIndex((elem) => elem === date_se)
                    if (index < 0) {
                        date.push(date_se)
                    }
                }
            })
        })

        date.map((e_in) => {
            let monney_in = 0
            let monney_out = 0
            data.map((e_data) => {
                let date_data = moment(e_data.order_se_Payment_date).utc().format('DD/MM/YYYY')
                if (e_in === date_data) {
                    // console.log('gg',e_data)
                    monney_in += (e_data.amount * e_data.order_se_price)
                }
            })
            sum_se.map((s_data) => {
                let date_se = moment(s_data.order_farmer_date).utc().format('DD/MM/YYYY')
                if (e_in === date_se) {
                    console.log('gg', s_data)
                    monney_out += (s_data.order_farmer_plant_volume * s_data.order_farmer_plant_cost)
                }
            })
            result.push({
                date: e_in,
                monney_in: monney_in,
                monney_out: monney_out
            })
        })
        console.log('555', result)
        return result
    }

    sum_money_all = (data) => {
        let sum = 0
        data.map((ele) => {
            sum += ele.monney_in - ele.monney_out
        })
        return sum
    }

    render() {
        return (
            <div className='App'>
                <div className="Row">
                    <div className="col-12" style={{ textAlign: "center" }}>
                        <h2 >สรุปยอดขาย</h2>
                        <h4>เลือกวันที่ <input type="date" id='dateStart' onChange={this.handleChange} /> ถึง <input type="date" id='dateEnd' onChange={this.handleChange} />
                            <button onClick={() => this.filterDate()} style={{ fontFamily: "fc_lamoonregular", fontSize: "16px" }}>ค้นหา</button></h4>
                        <h4 style={{ margin: "0" }}>ยอดรวม {this.sum_money_all(this.sum_in_out_money(this.state.summary_personal))} บาท</h4>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8" style={{ textAlign: "center" }}>

                        <table>
                            <tr>
                                {/* <th>ลำดับ</th> */}
                                <th>วันที่</th>
                                <th>รายรับ</th>
                                <th>รายจ่าย</th>
                                <th>คงเหลือ</th>
                            </tr>
                            {this.sum_in_out_money(this.state.summary_personal).map((item, index) => {
                                return (
                                    <tr>
                                        {/* <td>{index + 1}</td> */}
                                        <td>{item.date}</td>
                                        {/* <td>{item.plant_name}</td> */}
                                        <td style={{ color: "green" }} >{item.monney_in}</td>
                                        <td style={{ color: "red" }} >{item.monney_out}</td>
                                        <td>{item.monney_in - item.monney_out}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <th colSpan="3">รวม</th>
                                <th>{this.sum_money_all(this.sum_in_out_money(this.state.summary_personal))}</th>
                            </tr>
                        </table>

                    </div>
                    <div className="col-2"></div>

                </div>

            </div>
        )
    }
}
export default S_Summary