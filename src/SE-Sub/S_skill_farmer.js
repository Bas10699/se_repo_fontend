//ความสามารถของเกษตร
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token } from '../Support/Constance'

class S_skill_farmer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            farmer: [],
            plants: []
        }
    }

    componentWillMount() {
        this.get_skill_farmer()
    }
    get_skill_farmer = async () => {
        try {
            await get('neo_firm/get_farmer_se', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        farmer: result.result
                    })

                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('get_skill_farmer: ' + error)
        }
    }

    plants_se = (data) => {
        let disnict_plant = []

        data.map((el, i) => {
            let index = disnict_plant.findIndex((find) => find === el.plant)
            if (index < 0) {
                if (el.plant !== null && el.plant !== undefined) {
                    disnict_plant.push(el.plant)
                }
            }
        })
        return disnict_plant
    }

    sort_plant = (data) => {
        const order = data
        function compare(a, b) {
            const order_idA = parseInt(a.deliver_value)
            const order_idB = parseInt(b.deliver_value)

            let comparison = 0;
            if (order_idA < order_idB) {
                comparison = 1;
            } else if (order_idA > order_idB) {
                comparison = -1;
            }
            return comparison;
        }
        let sort_order = order.sort(compare)


        // let disnict_plant = []

        // sort_order.map((el, i) => {
        //     let index = disnict_plant.findIndex((find) => find === el.plant)
        //     if (index < 0) {
        //         if (el.plant !== null && el.plant !== undefined) {
        //             disnict_plant.push(el.plant)
        //         }
        //     }
        // })
        // console.log('data', disnict_plant)
        return sort_order
    }

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>รายชื่อเกษตรกรในเครือข่าย</h2>
                    </div>
                </div>

                <div className="Row" style={{marginTop:"-50px"}}>
                <div className='col-3'></div>
                    <div className="col-8" >
                        <input type="search" placeholder="ค้นหา" 
                        // onChange={this.filterID} 
                        />
                    </div>
                    <div className='col-1'></div>
                </div>


                <div className='Row'>
                    <div className='col-1'></div>
                    <div className='col-2'>
                        {/* พืชที่ปลูก
                {this.plants_se(this.state.farmer).map((ele, index) => {
                            return (
                                <div>
                                    {index + 1}. {ele}
                                </div>
                            )
                        })} */}
                        <b>พืชที่เกษตรในเครือข่ายปลูกได้ดี</b>
                        {this.plants_se(this.sort_plant(this.state.farmer)).map((ele_plant, index) => {
                            return (
                                <div>
                                    <b>{index + 1}. {ele_plant}</b>
                                </div>
                            )
                        })}
                    </div>
                    <div className='col-8'>
                        <b>รายชื่อเกษตรที่ปลูกพืช</b>
                        <table>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ชื่อ</th>
                                <th>พืชที่ปลูก
                                    <select>
                                        <option value="0">--แสดงพืชทั้งหมด--</option>
                                        {this.plants_se(this.sort_plant(this.state.farmer)).map((ele_plant, index) => {
                                            return (

                                                <option value={index + 1}>{ele_plant}</option>

                                            )
                                        })}
                                    </select> </th>
                                <th colSpan="2">ปลูกได้</th>
                                <th colSpan="2">ส่งมอบ</th>
                                <th colSpan="2">ผลผลิตต่อไร่</th>
                            </tr>
                            {this.sort_plant(this.state.farmer).map((element, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1} .</td>
                                        <td>{element.title_name}{element.first_name}  {element.last_name}</td>
                                        <td><b>{element.plant}</b></td>
                                        <td style={{ textAlign: "right" }}>{element.year_value} </td>
                                        <td>{element.year_value_unit}</td>
                                        <td style={{ textAlign: "center" }}>{element.deliver_value}</td>
                                        <td>กิโลกรัม</td>
                                        <td style={{ textAlign: "center" }}>{element.product_value}</td>
                                        <td>กิโลกรัม</td>
                                    </tr>
                                )
                            })}
                        </table>

                    </div>
                    <div className='col-1'></div>
                </div>

            </div>
        )
    }
}
export default S_skill_farmer
