//se-sub วางแผนการเพาะปลูกให้กับเกษตรกร
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token, sortData, addComma } from '../Support/Constance'
import { NavLink } from 'react-router-dom'

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
                                            <td><button onClick={() => this.setState({ open: true })}>วางแผน</button></td>
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
                                <h3 style={{ textAlign: "center" }}>วางแผนการเพาะปลูก ชื่อพืช</h3>
                            </div>
                        </div>
                        <div className="Row">
                            <div className="col-12">

                                <table>
                                    <tr>
                                        <th></th>
                                        <th>ชื่อเกษตรกร</th>
                                        <th>พืชที่นิยมปลูก</th>
                                        <th>ความถี่การส่งมอบ</th>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" /></td>
                                        <td>นายสำรวย นอนนา</td>
                                        <td>พริก ข้าวโพก ถั่วเขียว</td>
                                        <td> 2 ครั้ง / เดือน</td>
                                    </tr>
                                    <tr>
                                    <td><input type="checkbox" /></td>
                                        <td>นางสาวสมหมาย สมหวัง</td>
                                        <td>พริก ข้าวหอมมะลิ ถั่วเขียว</td>
                                        <td> 2 ครั้ง / เดือน</td>
                                    </tr>
                                </table>
                            </div>

                        </div>
                        วันที่ต้องการ : <input type="date"/>
                        <button onClick={()=> this.setState({open:false})}>ยืนยันการวางแผน</button>
                    </Modal>
                </div>
                break;

            case 2: return_page =
                <div>
                    <div className="Row">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <h4 style={{textAlign:"center"}}>รายชื่อเกษตรกรที่เลือกปลูก</h4>
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