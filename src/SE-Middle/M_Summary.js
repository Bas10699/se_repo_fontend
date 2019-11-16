//se-middle สรุปยอดการซื้อ-ขาย
import React, { Component } from 'react'
import { user_token, addComma, sortData } from '../Support/Constance';
import { get } from '../Support/Service';
import moment from 'moment'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Modal from 'react-responsive-modal'
import DateSelect from '../Support/dateSelect'

class M_Summary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            summery_trader: [],
            search_product: [],
            dateStart: '',
            dateEnd: '',
            sum_money: 0,
            summery_se: [],
            summery_se_origin: [],
            open: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    onCloseModel = () => {
        this.setState({
            open: false
        })
    }

    componentWillMount() {
        this.get_summery_trader()
        this.get_summery_se()
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
        this.state.summery_trader_origin.map((element) => {
            let date = moment(element.date_of_payment).utc().format(format)
            let time = moment(date, format),
                beforeTime = moment(dateStart, format),
                afterTime = moment(dateEnd, format);

            if (time.isBetween(beforeTime, afterTime, null, '[]')) {

                // console.log('is between')
                date_fil.push(element)
                money += (element.amount * element.price)

            } else {
                // console.log('is not between')
            }
        })
        this.state.summery_se_origin.map((element) => {
            let date = moment(element.order_se_Payment_date).utc().format(format)
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
            summery_trader: date_fil,
            summery_se: date_se,
            sum_money: money
        })

    }

    get_summery_trader = async () => {
        try {
            await get('neutrally/get_summary_order_trader', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        summery_trader: result.result,
                        summery_trader_origin: result.result,
                        // search_product: result.result
                    })

                    setTimeout(() => {
                        console.log("summery_trader", result.result)
                    }, 500)
                } else {
                    alert(result.error_message)
                }
            });
        } catch (error) {
            alert("get_summery_trader" + error);
        }
    }

    get_summery_se = async () => {
        try {
            await get('neutrally/get_summary_order_se', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        summery_se: result.result,
                        summery_se_origin: result.result,
                        // search_product: result.result
                    })

                    setTimeout(() => {
                        console.log("summery_se", result.result)
                    }, 500)
                } else {
                    alert(result.error_message)
                }
            });
        } catch (error) {
            alert("get_summery_se" + error);
        }
    }

    sum_in_out_money = (data) => {
        let sum_se = this.state.summery_se
        let date = []
        let result = []
        data.map((ele_data) => {
            let date_data = moment(ele_data.date_of_payment).utc().format('DD/MM/YYYY')
            let index = date.findIndex((elem) => elem === date_data)
            if (index < 0) {
                date.push(date_data)
            }
        })
        date.map((ee) => {
            sum_se.map((ele) => {
                let date_se = moment(ele.order_se_Payment_date).utc().format('DD/MM/YYYY')
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
                let date_data = moment(e_data.date_of_payment).utc().format('DD/MM/YYYY')
                if (e_in === date_data) {
                    // console.log('gg',e_data)
                    monney_in += (e_data.amount * e_data.price)
                }
            })
            sum_se.map((s_data) => {
                let date_se = moment(s_data.order_se_Payment_date).utc().format('DD/MM/YYYY')
                if (e_in === date_se) {
                    console.log('gg', s_data)
                    monney_out += (s_data.amount * s_data.order_se_price)
                }
            })
            result.push({
                date: e_in,
                monney_in: monney_in,
                monney_out: monney_out
            })
        })
        console.log('555', result)
        return sortData(result, 'date', false)
    }

    sum_money_all = (data) => {
        let sum = 0
        data.map((ele) => {
            sum += ele.monney_in - ele.monney_out
        })
        return sum
    }

    // filterSearch = (event) => {
    //     var updatedList = this.state.summery_trader;
    //     updatedList = updatedList.filter(function (item) {
    //         return item.product_name.toLowerCase().search(
    //             event.target.value.toLowerCase()) !== -1;
    //     });
    //     this.setState({
    //         search_product: updatedList,
    //     });
    // }

    callbackFunction_start = (childData) => {
        this.setState({ dateStart: childData })
        // alert(childData)
    }

    callbackFunction_end = (childData) => {
        this.setState({ dateEnd: childData })
        // alert(childData)
    }

    render() {
        var options = {

            title: {
                text: null,
                style: {
                    fontSize: '24px',
                    fontFamily: 'fc_lamoonregular'
                }
            },
            credits: {
                enabled: false
            },

            xAxis: {
                categories: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
            },

            yAxis: {
                // type: 'logarithmic',
                // minorTickInterval: 10
                title: {
                    text: '<span style="font-size:15px;">จำนวน (กิโลกรัม)</span>',
                    style: {
                        fontSize: '20px',
                        fontFamily: 'fc_lamoonregular'
                    }
                }
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        // format: '{point.y}'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:14px">{point.key}</span><br/><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0;font-size:10px">จำนวน : </td>' +
                    '<td style="padding:0"><b>{point.y} กิโลกรัม </b></td></tr>',
                footerFormat: '</table>',
            },
            series: [{
                type: 'line',
                colorByPoint: true,
                data: [2, 0, 5, 0, 0, 4, 0, 4, 0, 0, 0, 0],
                showInLegend: false,
                labels: {
                    enabled: true,
                    rotation: 0,
                    color: '{series.color}',
                    align: 'center',
                    format: '(point.y)}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '20px',
                        fontFamily: 'fc_lamoonregular'

                    }
                }
            }],


        }

        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12" style={{ textAlign: "center" }}>
                        <h2 >สรุปยอดการซื้อ-ขาย</h2>
                        <h4>
                            เลือกวันที่
                            {/* <input type="date" id='dateStart' onChange={this.handleChange} /> */}
                            <DateSelect parentCallback={this.callbackFunction_start} />
                            ถึง
                             {/* <input type="date" id='dateEnd' onChange={this.handleChange} /> */}
                            <DateSelect parentCallback={this.callbackFunction_end} />

                            <button onClick={() => this.filterDate()} style={{ fontFamily: "fc_lamoonregular", fontSize: "16px" }}>ค้นหา</button>
                        </h4>

                        <h4 style={{ margin: "0" }}>มียอดรวม {addComma(this.sum_money_all(this.sum_in_out_money(this.state.summery_trader)))} บาท&nbsp;
                            <u style={{ cursor: 'pointer', color: 'blue' }} onClick={() => this.setState({ open: true })} >ดูรายละเอียดเพิ่มเติม</u>
                        </h4>
                    </div>
                </div>
                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10" style={{ textAlign: "center", paddingRight: "10px" }}>


                        <table>
                            <tr>
                                <th>วันที่</th>
                                <th>รายรับ</th>
                                <th>รายจ่าย</th>
                                <th style={{ borderLeft: "1px solid #ccc" }}>คงเหลือ</th>
                            </tr>
                            {this.sum_in_out_money(this.state.summery_trader).map((item, index) => {
                                return (
                                    <tr>
                                        {/* <td>{index + 1}</td> */}
                                        <td>{item.date}</td>
                                        {/* <td>{item.plant_name}</td> */}
                                        <td style={{ color: "green" }}>{addComma(item.monney_in)}</td>
                                        <td style={{ color: "red" }}>{addComma(item.monney_out)}</td>
                                        <td style={{ borderLeft: "1px solid #ccc" }}>{addComma(item.monney_in - item.monney_out)}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <th colSpan="3">รวม</th>
                                <th style={{ borderLeft: "1px solid #ccc" }}>{addComma(this.sum_money_all(this.sum_in_out_money(this.state.summery_trader)))}</th>

                            </tr>
                        </table>

                    </div>
                    <Modal open={this.state.open} onClose={this.onCloseModel}>
                        <div className="Row">
                            <div className="col-12">
                                <h2 style={{ textAlign: "center" }}>รายละเอียดเพิ่มเติม</h2>
                            </div>
                        </div>
                        <div className="Row" style={{ width: "800px" }}>

                            {/* <div className="col-1"></div> */}
                            <div className="col-6" style={{ textAlign: "center", paddingLeft: "10px" }}>
                                <h3 style={{ color: "green" }}>รายรับ</h3>
                                <table>
                                    <tr>
                                        <th>ลำดับ</th>
                                        <th>วันที่</th>
                                        <th>ชื่อพืช</th>
                                        <th>จำนวน</th>
                                        <th>ราคารวม</th>
                                    </tr>
                                    {this.state.summery_trader.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{moment(item.date_of_payment).utc().format('DD/MM/YYYY')}</td>
                                                <td>{item.plant_name}</td>
                                                <td>{addComma(item.amount)}</td>
                                                <td>{addComma(item.amount * item.price)}</td>
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>

                            <div className="col-6" style={{ textAlign: "center", paddingLeft: "10px" }}>
                                <h3 style={{ color: "red" }}>รายจ่าย</h3>
                                <table>
                                    <tr>
                                        <th>ลำดับ</th>
                                        <th>วันที่</th>
                                        <th>ชื่อพืช</th>
                                        <th>จำนวน</th>
                                        <th>ราคารวม</th>
                                    </tr>
                                    {this.state.summery_se.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{moment(item.order_se_Payment_date).utc().format('DD/MM/YYYY')}</td>
                                                <td>{item.plant_name}</td>
                                                <td>{addComma(item.amount)}</td>
                                                <td>{addComma(item.amount * item.order_se_price)}</td>
                                            </tr>
                                        )
                                    })}
                                </table>

                            </div>
                        </div>
                    </Modal>

                    <div className="col-1"></div>
                </div>
            </div>
        )
    }
}
export default M_Summary;