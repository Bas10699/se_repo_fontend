import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token } from '../Support/Constance'
import Modal from 'react-responsive-modal'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {NavLink} from 'react-router-dom'

class T_Researcher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            demand: [],
            open: false,
        }
    }


    componentWillMount() {
        this.get_send_demand()
    }
    onCloseModal = () => {
        this.setState({ open: false })
    }
    onOpen = () => {
        this.setState({ open: true })
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

    rander_status = (status,product_id) => {
        let return_status
        switch (status) {
            case 1:
            case 2: return_status = <div>รอการวิจัย</div>
                break;
            case 4: return_status =
                <div>
                    <NavLink to={'/T_Researcher_F/product?product_id='+product_id}> <button className="BTN_Signin" style={{ margin: "0", display:"block",marginLeft:"auto",marginRight:"60px" }} onClick={()=>this.onOpen()}>สูตรผลิตภัณฑ์</button></NavLink>
                </div>
                break;

            default: return_status = <div>เกิดข้อผิดพลาด</div>
                break;
        }
        return return_status
    }
    render() {
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
                data: [{
                    name: 'โปรตีน',
                    y: 20,
                }, {
                    name: 'เเคลเซียม',
                    y: 60,
                }, {
                    name: 'คาร์โบไฮเดรต',
                    y: 10
                }]
            }]
        };
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
                                <th>สิ่งที่ต้องการ</th>
                                <th>จำนวน</th>
                                <th>สถานะการพัฒนา</th>
                            </tr>
                            {this.state.demand.map((element,index) => {
                                return (
                                    <tr style={{ textAlign: "center" }}>
                                        <td style={{ textAlign: "left" }}>{element.product_name}</td>
                                        <td style={{ textAlign: "left" }}>{element.nutrient + "\n"}</td>
                                        <td>{element.volume} {element.volume_type}</td>
                                        <td>{this.rander_status(element.product_status,element.product_id)}</td>
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
export default T_Researcher