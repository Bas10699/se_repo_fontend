//se-middle สรุปยอดการซื้อ-ขาย
import React, { Component } from 'react'
import { user_token } from '../Support/Constance';
import { get } from '../Support/Service';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class M_Summary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            summery_trader: [],
            search_product: []
        }
    }

    componentWillMount() {
        this.get_summery_trader()
    }

    get_summery_trader = async () => {
        try {
            await get('neutrally/get_summary_order_trader', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        summery_trader: result.result,
                        search_product: result.result
                    })

                    setTimeout(() => {
                        console.log("get_product", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                    alert(result.error_message)
                }
            });
        } catch (error) {
            alert("get_product error" + error);
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
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>สรุปยอดการซื้อ-ขาย</h2>
                        {/* 
                        <select >
                            <option>รายเดือน</option>
                            <option>รายสัปดาห์</option>
                        </select> */}
                    </div>
                </div>
                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10" style={{textAlign:"center"}}>
                        <h4>เลือกวันที่ <input type="date" /> ถึง <input type="date" /></h4>
                        เเสดงรายการจากวันที่ ปปป ถึงวันที่ ผผผ มียอดรวม 000 บาท
                        <table>
                            <tr>
                                <th>ลำดับ</th>
                                <th>วันที่</th>
                                <th>รหัสใบสั่งซื้อ</th>                                
                                <th>ยอดสั่งซื้อ</th>
                            </tr>
                        </table>
                        <div className="Row">
                            <div className="col-6" style={{ backgroundColor: "#ccc" }}>
                                {/* กราฟเเท่ง ยอดขายรายเดือน */}
                            </div>
                            <div className="col-1"></div>
                            <div className="col-6" style={{ backgroundColor: "#ccc" }}>
                                {/* กราฟพายยอดขาย se ย่อย */}
                            </div>
                        </div>
                        {/* <div className="Row">
                            <div className="col-6">
                                <HighchartsReact highcharts={Highcharts} options={options} />
                            </div>
                            <div className="col-1"></div> */}
                        {/* <div className="col-6" style={{ backgroundColor: "#ccc" }}>
                                กราฟพายยอดขาย se ย่อย
                            </div> */}
                        {/* </div> */}

                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        )
    }
}
export default M_Summary;