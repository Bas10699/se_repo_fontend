import React, { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { post } from '../Support/Service'
import { user_token } from '../Support/Constance';

import queryString from 'query-string';

class Create_Info extends Component {


    get_demand_detail = async()=>{
        let url = this.props.location.search;
        let params = queryString.parse(url);
        let obj = {
            product_id: this.state.product_id,
        }
        console.log("obj",obj)
        // try {
        //     await post(obj,'researcher/get_demand_detail',user_token).then((result)=>{
        //         if (result.success) {
                    
        //             alert('ยืนยันรับงานวิจัย เรียบร้อย')

        //         }
        //         else {
        //             alert(result.error_message)
        //         }
        //     })
        // } catch (error) {
            
        // }
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
        <h2 style={{ textAlign: "center" }}>สร้างสูตร </h2>
                    </div>
                </div>

                <div className="Row">
                    
                    <div className="col-6">
                    <HighchartsReact highcharts={Highcharts} options={options} />
                    
                    <table style={{ textAlign: "center",marginLeft:"30px",width:"90%" }}>
                                <tr>
                                    <th colSpan="4">รายชื่อวัตถุดิบ</th>
                                </tr>
                                <tr>
                                    <th>ชื่อพืช </th>
                                    <th>จำนวน/หน่วย</th>
                                </tr>
                                <tr>
                                    <td>ข้าวหอมมะลิ</td>
                                    <td>95 กิโลกรัม</td>
                                </tr>
                            </table>
                    </div>
                    <div className="col-5">
                        <h3 style={{ margin: "0", textAlign: "center" }}>กรอกสูตรพัฒนา</h3>
                        <div className="Row">
                            <div className="col-12">
                                <h5 style={{ marginBottom: "10px" }}>ชื่อสูตรผลิตภัณฑ์</h5>
                                <input type="text" style={{ width: "500px" }} />
                            </div>
                        </div>
                        <div className="Row">
                            <div className="col-6">
                                <h5 style={{ marginBottom: "10px" }}>ข้อมูลสารอาหาร</h5>
                                <input type="text" style={{ width: "250px" }} />
                            </div>
                            <div className="col-6">
                                <h5 style={{ marginBottom: "10px" }}>ปริมาณสารอาหาร</h5>
                                <input type="text" style={{ width: "50px" }} />%
                            <button className="Add" style={{ float: "right",marginTop:"-10px"  }}>เพิ่มปริมาณสารอาหาร</button>
                            </div>
                        </div>
                        <div className="Row">
                            <div className="col-5">
                                <h5 style={{ marginBottom: "10px" }}>วัตถุดิบที่ใช้</h5>
                                <input type="text" style={{ width: "200px" }} />
                            </div>
                            <div className="col-2">
                                <h5 style={{ marginBottom: "10px" }}>ปริมาณ</h5>
                                <input type="text" style={{ width: "50px" }} />
                            </div>
                            <div className="col-2">
                                <h5 style={{ marginBottom: "10px" }}>หน่วย</h5>
                                <input type="text" style={{ width: "50px" }} />
                            </div>
                            <div className="col-3">
                            <button className="Add" style={{ float: "right",marginTop:"58px" }}>เพิ่มข้อมูล</button>
                            </div>
                        </div>
                        <div className="Row">
                            <div className="col-12">
                                <h5 style={{ marginBottom: "10px" }}>เลือกรูปภาพ</h5>
                                <input type="file" placeholder="กรุณาเลือกรูปภาพ" style={{ width: "500px" }} />
                            </div>
                        </div>
                        <button className="BTN_Signin">ตกลง</button>
                        <button className="BTN_Cencle" style={{marginTop:"20px"}}>ยกเลิก</button>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        )
    }
}
export default Create_Info;