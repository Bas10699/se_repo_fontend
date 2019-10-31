//se-sub วางแผนการเพาะปลูกให้กับเกษตรกร
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token, sortData, addComma } from '../Support/Constance'
import { NavLink } from 'react-router-dom'
import Checkbox from './CheckboxPlan'

import Modal from 'react-responsive-modal'
class S_Plan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            currentPage: 1,
            todosPerPage: 10,
            farmer: [],
            plants: [],
            data_month: [],
            open: false,
            search_order: [],
            get_user: null,
            check_array: [],
            order_farmer: [],
            data:'',
        }
    }

    componentWillMount() {
        this.get_skill_farmer()
        this.get_plant()
    }

    get_plant = async () => {
        try {
            await get('neo_firm/get_plant_in_network', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        data_month: result.result[0].plant[0].data

                    })
                    console.log('get_plant', result.result[0])
                }
                else {
                    alert(result.error_message)
                }
            })

        } catch (error) {
            alert('get_plant: ' + error)

        }
    }

    get_skill_farmer = async () => {
        try {
            await get('neo_firm/get_farmer_se', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        farmer: this.sort_plant(result.result),
                        plants: result.result,
                        search_order: result.result
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

    sort_plant = (data) => {
        const order = data
        function compare(a, b) {
            const order_idA = a.year_value
            const order_idB = b.year_value

            let comparison = 0;
            if (order_idA < order_idB) {
                comparison = 1;
            } else if (order_idA > order_idB) {
                comparison = -1;
            }
            return comparison;
        }
        let sort_order = order.sort(compare)

        // this.setState({
        //     farmer:sort_order
        // })

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

    plants_se = (data) => {
        let disnict_plant = []
        let disnict_plant_sum = []
        data.map((el, i) => {
            let index = disnict_plant.findIndex((find) => find === el.plant)
            if (index < 0) {
                if (el.plant !== null && el.plant !== undefined) {
                    disnict_plant.push(el.plant)
                }
            }
        })
        disnict_plant.map((ele_plant) => {
            let value = 0
            data.map((ele_data) => {
                if (ele_data.plant === ele_plant) {
                    value += ele_data.year_value
                }
            })
            disnict_plant_sum.push({
                plant: ele_plant,
                year_value: value
            })
        })



        return this.sort_plant(disnict_plant_sum)
    }

    onCloseModal = () => {
        this.setState({ open: false })
    }

    openModel = () => {
        let farmer = this.state.farmer
        let selectFarmer = []

        this.state.check_array.map((element) => {

            selectFarmer.push({
                title_name: farmer[element.check].title_name,
                first_name: farmer[element.check].first_name,
                last_name: farmer[element.check].last_name,
                plant: farmer[element.check].plant,
                amount: element.amount
            })

        })
        console.log(selectFarmer)
        this.setState({
            open: true,
            selectFarmer: selectFarmer
        })
    }

    addPlant = async () => {
        this.setState({
            return_page: 2,
            open: false,
        })
        let data = {
            check_array: this.state.check_array,
            date:this.state.data
        }
        console.log("data",data)
        try {
            await post(data, 'neo_firm/add_planing_farmer', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        check_array: result.result,
                        date:result.date
                    })

                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('addplant: ' + error)
        }
    }

    get_order_plan = async ()=>{
        
        try {
            await get('neo_firm/get_planing_farmer', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        farmer: this.sort_plant(result.result),
                        check_array: result.result,
                        data:result.result.date
                    })

                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('get_order plan: ' + error)
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    render_plan = (page) => {
        let return_page;
        switch (page) {
            case 1: return_page =
                <div>
                    <div className="Row">
                        <div className="col-1"></div>
                        <div className="col-10">

                            <table>
                                <tr>
                                    <th>ชื่อวัตถุดิบ</th>
                                    <th>จำนวนที่มีอยู่ในสต๊อก</th>
                                    <th>จำนวนที่สั่งซื้อ</th>
                                    <th>วัตถุดิบขาด</th>
                                    <th>วางแผน</th>
                                </tr>
                                {this.plants_se(this.state.plants).map((ele_plant, index) => {
                                    return (
                                        <tr>
                                            <td>{ele_plant.plant}</td>
                                            <td>{addComma(ele_plant.year_value)}</td>
                                            <td></td>
                                            <td></td>
                                            <td><button onClick={() => this.openModel()}>วางแผน</button></td>
                                        </tr>

                                    )
                                })}

                            </table>


                        </div>
                        <div className="col-1"></div>
                    </div>

                    <Modal open={this.state.open} onClose={this.onCloseModal}>
                        <div className="Row">
                            <div className="col-12" >
                                <h3 style={{ textAlign: "center" }}>วางแผนการเพาะปลูก</h3>
                            </div>
                        </div>
                        <div className="Row">
                            <div className="col-12">
                                วันที่ต้องการ : <input type="date" id="date" onChange={this.handleChange} />
                                <button onClick={() => this.addPlant()}>ยืนยันการวางแผน</button>

                                <Checkbox
                                    option={this.state.farmer}
                                    check_array={this.state.check_array}
                                    return_func={(event) => {
                                        console.log('event', event)
                                        this.setState({
                                            check_array: event
                                        })
                                    }} />
                            </div>

                        </div>

                    </Modal>
                </div>
                break;

            case 2: return_page =
                <div>
                    <div className="Row">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <h4 style={{ textAlign: "center" }}>รายชื่อเกษตรกรที่เลือกปลูก</h4>
                            
                            {this.state.order_farmer.map((element, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}. {element.order_farmer_title_name} {element.order_farmer_name} {element.order_farmer_last_name}
                                        </td>
                                        <td>จำนวน {element.order_farmer_plant_volume} กิโลกรัม</td>
                                    </tr>
                                )
                            })}
                            <table>
                                <tr>
                                    <th>ชื่อพืช</th>
                                    <th>รายชื่อเกษตรกรที่เลือกปลูก</th>
                                    <th>ระยะเวลาที่กำหนด</th>
                                </tr>
                                <tr>
                                    <td>ข้าวโพด</td>
                                    <td>
                                        <div>นายสำรวย นอนนา</div>
                                        <div>นางสาวสมหมาย สมหวัง</div>
                                    </td>
                                    <td>ระยะเวลาที่เลือก</td>
                                </tr>
                            </table>

                        </div>
                        <div className="col-1"></div>
                    </div>


                </div>

                break;

            default:
                break;
        }
        return return_page;
    }

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>วางแผนการเพาะปลูก</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="tab">
                            <button onClick={() => { this.setState({ page: 2 }) }}>ติดตามการวางแผน</button>
                            <button onClick={() => { this.setState({ page: 1 }) }}>วางแผนการเพาะปลูกให้กับเกษตรกร</button>
                        </div>

                    </div>
                    <div className="col-1"></div>
                </div>

                {this.render_plan(this.state.page)}

            </div>
        )
    }
}
export default S_Plan;