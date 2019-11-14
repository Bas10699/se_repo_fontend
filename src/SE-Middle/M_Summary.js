//se-middle สรุปยอดการซื้อ-ขาย
import React, { Component } from 'react'
import { user_token } from '../Support/Constance';
import { get } from '../Support/Service';
import moment from 'moment'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { element } from 'prop-types';

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
            summery_se_origin: []
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
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
        let money = 0
        this.state.summery_trader_origin.map((element) => {
            let date = moment(element.date_of_payment).utc().format(format)
            let time = moment(date, format),
                beforeTime = moment(dateStart, format),
                afterTime = moment(dateEnd, format);

            if (time.isBetween(beforeTime, afterTime, null, '[]')) {

                console.log('is between')
                date_fil.push(element)
                money += (element.amount * element.price)

            } else {
                console.log('is not between')
            }
        })
        this.setState({
            summery_trader: date_fil,
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
                            เลือกวันที่ <input type="date" id='dateStart' onChange={this.handleChange} /> ถึง <input type="date" id='dateEnd' onChange={this.handleChange} />
                            <button onClick={() => this.filterDate()} style={{ fontFamily: "fc_lamoonregular", fontSize: "16px" }}>ค้นหา</button>
                        </h4>

                        <h4 style={{ margin: "0" }}>มียอดรวม {this.state.sum_money} บาท</h4>
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
                                <th>คงเหลือ</th>
                            </tr>
                            {this.state.summery_trader.map((item, index) => {
                                return (
                                    <tr>
                                        {/* <td>{index + 1}</td> */}
                                        <td>{moment(item.date_of_payment).utc().format('DD/MM/YYYY')}</td>
                                        {/* <td>{item.plant_name}</td> */}
                                        <td style={{color:"green"}}>{item.amount}</td>
                                        <td style={{color:"red"}}>{item.amount * item.price}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <th colSpan="3">รวม</th>
                                <th>รายรับ-รายจ่าย</th>
                                
                            </tr>
                        </table>

                    </div>
                    {/* <div className="col-5" style={{ textAlign: "center", paddingLeft: "10px" }}>
                        <h3 style={{ color: "red" }}>รายจ่าย</h3>
                        <h4>เลือกวันที่ <input type="date" id='dateStart' onChange={this.handleChange} /> ถึง <input type="date" id='dateEnd' onChange={this.handleChange} />
                        <button onClick={() => this.filterDate()}>ค้นหา</button>
                        </h4>
                        <h4 style={{ margin: "0" }}>มียอดรวม {this.state.sum_money} บาท</h4>
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
                                        <td>{item.amount}</td>
                                        <td>{item.amount * item.order_se_price}</td>
                                    </tr>
                                )
                            })}
                        </table> */}

                    {/* </div> */}
                    <div className="col-1"></div>
                </div>
            </div>
        )
    }
}
export default M_Summary;