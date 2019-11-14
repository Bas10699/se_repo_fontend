import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token } from '../Support/Constance'
import Modal from 'react-responsive-modal'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import queryString from 'query-string';
import { thisExpression } from '@babel/types'
import { element } from 'prop-types'

class T_Researcher_F extends Component {
    constructor(props) {
        super(props)
        this.state = {
            demand: [],
            open: false,
            product_plan: [],
            nutrient_precent: [],
            index_plant:0,
        }
    }


    componentWillMount() {
        this.get_send_demand()
        this.post_product_plan()
    }
    onCloseModal = () => {
        this.setState({ open: false })
    }
    onOpen = () => {
        this.setState({ open: true })
    }

    post_product_plan = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        let obj = {
            product_id: this.state.demand.product_id
        }
        try {
            await post(params, 'trader/get_product_plan', user_token).then((result) => {
                if (result.success) {
                    this.setState({ product_plan: result.result })
                    console.log("post_product_plan", result.result)
                }
            })
        } catch (error) {

        }
    }

    get_send_demand = async () => {
        try {
            await get('trader/get_send_demand_personal', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        demand: result.result,
                        nutrient_precent: result.result.nutrient_precent

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

    rander_status = (status) => {
        let return_status
        switch (status) {
            case 1:
            case 2: return_status = <div>รอการวิจัย</div>
                break;
            case 3: return_status =
                <div>
                    <button className="BTN_Signin" style={{ margin: "0", float: "left" }} onClick={() => this.onOpen()}>สูตรผลิตภัณฑ์</button>
                </div>
                break;

            default: return_status = <div>เกิดข้อผิดพลาด</div>
                break;
        }
        return return_status
    }
    render() {
        let index_plant = this.state.index_plant
        let options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'กราฟแสดงผลอัตราส่วนสารอาหาร',
                style: {
                    fontSize: '20px',
                    fontFamily: 'fc_lamoonregular'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    style: {
                        fontSize: '20px',
                        fontFamily: 'fc_lamoonregular'
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'อัตราส่วน',
                style: {
                    fontSize: '20px',
                    fontFamily: 'fc_lamoonregular'
                },
                colorByPoint: true,
                data: this.state.nutrient_precent[index_plant].data
            }]
        };
        return (
            <div className="App">
                <div className="tab">
                    <button onClick={() => window.location.href = "/T_Order"}>ส่งความต้องการพัฒนาผลิตภัณฑ์</button>
                    <button onClick={() => window.location.href = "/T_Order/trace"}>ติดตามการพัฒนาผลิตภัณฑ์</button>
                </div>
                {/* {this.render_page(page)} */}
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>สูตรพัฒนาผลิตภัณฑ์ </h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-12" >
                        <h3 style={{ textAlign: "center" }}>รายละเอียด</h3>
                    </div>
                </div>
                {this.state.product_plan.map((e) => {
                    return (
                        <div className="Row">
                            <div className="col-6">
                                <HighchartsReact highcharts={Highcharts} options={options} />
                            </div>
                            <div className="col-5">
                                <table style={{ textAlign: "center" }}>
                                    <tr>
                                        <th colSpan="3">รายชื่อวัตถุดิบ</th>
                                    </tr>
                                    <tr>
                                        <th>ชื่อวัตถุดิบ</th>
                                        <th>จำนวนที่ใช้</th>
                                        <th>หน่วย</th>
                                    </tr>
                                    {e.plant.map((element, index) => {
                                        return (
                                            <tr>
                                                <td>{element.plant_name}</td>
                                                <td>{element.plant_volume}</td>
                                                <td>{element.plant_volume_type}</td>
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    )
                })}
            </div>


        )
    }
}
export default T_Researcher_F