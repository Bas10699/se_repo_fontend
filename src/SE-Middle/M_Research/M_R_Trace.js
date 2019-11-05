//ติดตามผลการแปรรูป
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { element } from 'prop-types';
import { user_token } from '../../Support/Constance';
import { get, post } from '../../Support/Service';
import Modal from 'react-responsive-modal';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const order = [
    {
        name_order: "ยาสมุนไพรลดความอ้วน",
        formula: "เผาพลาญไขมัน",
        nutrients: 'โปรตีน',
        number: 10,
        price: 400,
        status: "0",
        detial_order: "สมุนไพรที่ช่วยขับเหงื่อ มีฤทธิ์ร้อน กระตุ้นให้หิวน้ำ"
    },
    {
        name_order: "อาหารคลีน",
        formula: "เพิ่มคาร์โบไฮเดรต",
        nutrients: 'คาร์โบไฮเดรต',
        number: 20,
        price: 50,
        status: "0",
        detial_order: "เน้นผัก รสชาติอร่อย ไม่มีน้ำตาลเเต่มีความหวาน ชงดื่มได้"
    },
    {
        name_order: "นมเพิ่มความสูง",
        formula: "แคลเซียมสูง",
        nutrients: 'วิตามิน',
        number: 20,
        price: 250,
        status: "1",
        detial_order: "วัตถุดิบที่เพิ่มเเคลเซียมเยอะๆ กินง่าย ชงดื่มได้ทั้งร้อนเเละเย็น"
    }
]

class M_R_Trace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            formula:[],
            get_demand:[],

        }
    }

    componentWillMount() {
        this.get_demand()
    }

    open = (formula) => {
        this.setState({ open: true,formula:formula })
    }

    onCloseModal = () => {
        this.setState({ open: false });

    };

    get_demand = async () => {
        try {
            await get('researcher/get_demand_trader_all', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_demand: result.result
                    })
                    console.log("get_demand", result.result)
                }
                else {
                    alert("get_demand", result.error_message)
                }
            })
        }
        catch (error) {
            alert('get_demand' + error)
        }
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
                        <h3 style={{ textAlign: "center" }}>ติดตามการแปรรูปผลิตภัณฑ์</h3>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <table>
                            <tr>
                                <th>ชื่อผลิตภัณฑ์</th>
                                <th>ชื่อสูตร</th>
                                <th>จำนวนที่สั่ง</th>
                                <th>ราคาต่อชิ้น</th>
                                <th>ราคาทั้งหมด</th>
                                <th>รูป</th>
                                <th>รายละเอียด</th>
                            </tr>
                            {order.map((element, index) => {
                                return (
                                    <tr>
                                        <td>{element.name_order}</td>
                                        <td>{element.formula}</td>
                                        <td>{element.number}</td>
                                        <td>{element.price}</td>
                                        <td>{element.number * element.price}</td>
                                        <td>รูป</td>
                                        <td><button onClick={() => { this.open(element.formula) }}>รายละเอียด</button></td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                    <div className="col-1"></div>
                </div>

                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="Row" style={{ width: "500px" }}>
                        <div className="col-11">
                            <h3 style={{ textAlign: "center" }}>รายละเอียด {this.state.formula}</h3>

                        </div>
                        <div className="col-1" />
                    </div>
                    <div className="Row">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={options} />
                            <table style={{ textAlign: "center" }}>
                                <tr>
                                    <th colSpan="4">รายชื่อวัตถุดิบ</th>
                                </tr>
                                <tr>
                                    <th>ชื่อพืช </th>
                                    <th>จำนวน/หน่วย</th>
                                    <th>ราคาเฉลี่ย</th>
                                    <th>ราคารวมเฉลี่ย</th>
                                </tr>
                                <tr>
                                    <td>ข้าวหอมมะลิ</td>
                                    <td>95</td>
                                    <td>3</td>
                                    <td>285</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <h4>ย้อนกลับ หมายเลขหน้าที่แสดง ถัดไป</h4> 
                    <button onClick={() => this.onCloseModal()} className="BTN_CONFIRM" style={{float:"right"}}>เลือกสูตรผลิตภัณฑ์นี้</button>
                </Modal>
            </div>
        )
    }
} export default M_R_Trace;