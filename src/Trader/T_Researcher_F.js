import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token } from '../Support/Constance'
import Modal from 'react-responsive-modal'
import T_Highcharts from './T_Highcharts'

import queryString from 'query-string';

class T_Researcher_F extends Component {
    constructor(props) {
        super(props)
        this.state = {
            demand: [],
            open: false,
            product_plan: [],
            nutrient_precent: [],
            index_plant: 0,
            // name:"",
            // y:"",
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
            await post(params, 'trader/get_product_plan_price', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        product_plan: result.result,
                        // nutrient_precent: result.result.nutrient_precent
                    })
                    console.log("post_product_plan", result.result)
                    // console.log("pie : ",result.nutrient_precent)
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

    sum_money = (data) => {
        let price = data.price
        let result = 0
        price.map((ele) => {
            let unit = 1
            if (ele.plant_volume_type === 'มิลลิกรัม') {
                unit = 0.000001
            }
            else if (ele.plant_volume_type === 'กรัม') {
                unit = 0.001
            }
            else {
                unit = 1
            }

            result = ele.plant_volume * unit * ele.price * data.volume

        })

        return result.toFixed(2)

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
        const { product_plan } = this.state
        let product_name = product_plan[0] ? product_plan[0].product_name : null
        return (
            <div className="App">
                <div className="tab">
                    <button onClick={() => window.location.href = "/T_Order"}>ส่งความต้องการพัฒนาผลิตภัณฑ์</button>
                    <button onClick={() => window.location.href = "/T_Order/trace"}>ติดตามการพัฒนาผลิตภัณฑ์</button>
                </div>
                {/* {this.render_page(page)} */}
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>สูตรพัฒนาผลิตภัณฑ์ {product_name}</h2>
                    </div>
                </div>


                {this.state.product_plan.map((e) => {

                    return (
                        <div>
                            <div className="Row">

                                <div className="col-6">
                                    <T_Highcharts data={e.nutrient_precent} name={e.product_plan_name} />
                                </div>
                                <div className="col-5">
                                    <table style={{ textAlign: "center" }}>
                                        <tr>
                                            <th colSpan="4">รายชื่อวัตถุดิบ</th>
                                        </tr>
                                        <tr>
                                            <th>ชื่อวัตถุดิบ</th>
                                            <th>จำนวนที่ใช้</th>
                                            <th>หน่วย</th>
                                            <th>ราคา/กิโลกรัม (บาท)</th>
                                        </tr>
                                        {e.price.map((element, index) => {
                                            let unit = 1
                                            if (element.plant_volume_type === 'มิลลิกรัม') {
                                                unit = 0.000001
                                            }
                                            else if (element.plant_volume_type === 'กรัม') {
                                                unit = 0.001
                                            }
                                            else {
                                                unit = 1
                                            }
                                            return (
                                                <tr>
                                                    <td>{element.plant_name}</td>
                                                    <td>{element.plant_volume}</td>
                                                    <td>{element.plant_volume_type}</td>
                                                    <td>{(element.plant_volume * unit * element.price * e.volume).toFixed(2)}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <th colSpan="3">ราคารวม</th>
                                            <th>{this.sum_money(e)}</th>
                                        </tr>
                                    </table>
                                </div>
                                <div className="col-1"></div>
                            </div>
                            <hr style={{ width: "90%", marginBottom: "100px" }} />
                        </div>
                    )
                })}


            </div>


        )
    }
}
export default T_Researcher_F