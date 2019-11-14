import React, { Component } from 'react'
import { get, post, ip } from '../../Support/Service'
import { user_token } from '../../Support/Constance'
import queryString from 'query-string';
import Checkbox from '../M_Research/Checkbox_F'

class M_R_Formula extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_plan: [],
            nutrient_precent: [],
            plant: [],
            active: false,
            manu: false,
            check_array: [],
            plant_stock: []
        }
    }
    componentWillMount() {
        this.get_product_plan()
        this.get_plant_stock()
    }

    get_plant_stock = async () => {
        try {
            await get('neutrally/get_plant_stock', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        plant_stock: result.result
                    })
                    console.log(result.result)
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

    get_product_plan = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        try {
            await post(params, 'neutrally/get_product_plan', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        product_plan: result.result,
                    })
                    console.log(result.result)
                }
                else {
                    alert(result.error_message)
                    window.location.href = "/M_Demand/M_R_Trace"
                }
            })
        }
        catch (error) {
            alert(error)
        }
    }

    send_plan = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        let obj = {
            plan_id: this.state.check_array,
            product_id: params.product_id
        }
        console.log('send', obj)
        try {
            await post(obj, 'neutrally/send_plan_product_to_trader', user_token).then((result) => {
                if (result.success) {
                    alert('สำเร็จ')
                }
                else {
                    alert(result.success)
                }
            })
        }
        catch (error) {
            alert(error)
        }
    }

    // price_ = () => {
    //     let product_plan = this.state.product_plan
    //     let plant_stock = this.state.plant_stock
    //     product_plan.map((ele_product)=>{
    //         plant_stock.map()
    //     })
    // }

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>ทำการกรองสูตรพัฒนาผลิตภัณฑ์ {this.state.product_plan.map((e,index)=>{
                            for (var i = 0; index < 1; i++) {
                                return (
                                <div>{e.product_name}</div>
                            )
                            }
                            
                        })}</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10">

                        <Checkbox
                            option={this.state.product_plan}
                            check_array={this.state.check_array}
                            return_func={(event) => {
                                // console.log('event', event)
                                this.setState({
                                    check_array: event
                                })
                            }} />

                        <button className="BTN_Signin" onClick={() => this.send_plan()}>ส่งสูตร</button>


                        {/* <table>
                            <tr>
                                <th>ชื่อสูตร</th>
                                {this.state.product_plan.map((e_product_plan_name, index) => {
                                    return (
                                        <th>
                                            <div>
                                                <label class="switch">
                                                    <input type="checkbox" value={index}
                                                    onChange={() => this.setState(
                                                        { active: !this.state.active }
                                                    )}
                                                    />
                                                    {console.log("active",this.state.active,index)}
                                                    <span class="slider round"></span>
                                                </label>
                                            </div>
                                            {e_product_plan_name.product_plan_name}
                                        </th>
                                    )
                                }
                                )}

                            </tr>
                            <tr>
                                <th>สารอาหาร</th>
                                {this.state.product_plan.map((e_product_plan_name, index) => {
                                    return (
                                        <td>{e_product_plan_name.nutrient_precent.map((e_nutrient_precent) => {

                                            return (
                                                <div>{e_nutrient_precent.name}</div>
                                            )
                                        })}</td>
                                    )
                                }
                                )}

                            </tr>
                            <tr>
                                <th>วัตถุดิบ</th>
                                {this.state.product_plan.map((e_product_plan_name, index) => {
                                    return (
                                        <td>{e_product_plan_name.plant.map((e_plant) => {
                                            return (
                                                <div>{e_plant.plant_name} {e_plant.plant_volume} {e_plant.plant_volume_type}</div>
                                            )
                                        })}</td>
                                    )
                                }
                                )}
                            </tr>
                            <tr>
                                <th>ราคาต้นทุน</th>
                            </tr>

                        </table> */}
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        )
    }
}
export default M_R_Formula