//ติดตามผลการแปรรูป
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { user_token } from '../../Support/Constance';
import { get, post } from '../../Support/Service';

class M_R_Trace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formula: [],
            get_demand: [],

        }
    }

    componentWillMount() {
        this.get_demand()
    }



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
                                <th>ผู้สั่งพัฒนาผลิตภัณฑ์</th>
                                <th>ชื่อผลิตภัณฑ์</th>
                                <th>สารอาหารที่ต้องการ</th>
                                <th>จำนวน</th>
                                <th>สูตร</th>
                                {/* <th>รายละเอียด</th> */}
                            </tr>
                            {this.state.get_demand.map((element, index) => {
                                return (
                                    <tr>
                                        <td>{element.name} {element.last_name}</td>
                                        <td>{element.product_name}</td>
                                        <td>{element.nutrient.map((e, index) => {
                                            return e + " "
                                        })}</td>
                                        <td>{element.volume} {element.volume_type}</td>
                                        {element.product_status > 2 ?
                                            <td><NavLink to={"/M_R_Formula/product?product_id=" + element.product_id}><button className="BTN_Signin" style={{ margin: "0", float: "left" }}>กรองสูตร</button></NavLink></td>
                                            :
                                            <td>รอนักวิจัยส่งสูตรพัฒนา</td>}

                                        {/* <td>ชื่อนักวิจัยที่รับผิดชอบ</td> */}
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        )
    }
} export default M_R_Trace;