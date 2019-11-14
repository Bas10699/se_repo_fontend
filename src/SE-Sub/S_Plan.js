//se-sub วางแผนการเพาะปลูกให้กับเกษตรกร
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token, sortData, addComma } from '../Support/Constance'
import { NavLink } from 'react-router-dom'
import Checkbox from './CheckboxPlan'
import moment from 'moment'

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
            date: '',
            selectPlant: null,
            want: [],
            show_data: [],
        }
    }

    componentWillMount() {
        this.get_skill_farmer()
        this.get_plant()
        this.get_order_plan()
        this.get_planing_se_personal()
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

    get_planing_se_personal = async () => {
        try {
            await get('neo_firm/get_planing_se_personal', user_token).then((result) => {
                if (result.success) {
                    this.setState({ want: result.result })
                    console.log('GGGGG', result.result)
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
        let want = this.state.want
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
            let volume_want = 0
            data.map((ele_data) => {
                if (ele_data.plant === ele_plant) {
                    value += ele_data.year_value
                }
            })
            want.map((ele_want) => {
                if (ele_plant === ele_want.plant) {
                    volume_want += ele_want.volume
                }
            })

            disnict_plant_sum.push({
                plant: ele_plant,
                year_value: value,
                volume_want: volume_want
            })
        })

        // console.log(disnict_plant_sum)

        return this.sort_plant(disnict_plant_sum)
    }

    onCloseModal = () => {
        this.setState({ open: false })
    }

    openModel = (plant) => {
        let farmer = this.state.farmer
        let selectFarmer = []

        this.state.check_array.map((element) => {

            selectFarmer.push({
                title_name: farmer[element.check].title_name,
                first_name: farmer[element.check].first_name,
                last_name: farmer[element.check].last_name,
                plant: farmer[element.check].plant,
                amount: element.amount,
            })

        })
        console.log("jhjh", selectFarmer)
        this.setState({
            open: true,
            selectFarmer: selectFarmer,
            selectPlant: plant
        })
    }

    addPlant = async () => {
        this.setState({
            open: false,
        })
        let data = {
            check_array: this.state.check_array,
            date: this.state.date,
            name_plant: this.state.selectPlant
        }
        console.log("data", data)
        try {
            await post(data, 'neo_firm/add_planing_farmer', user_token).then((result) => {
                if (result.success) {
                    window.location.reload()
                    this.setState({
                        page: 2,
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

    get_order_plan = async () => {

        try {
            await get('neo_firm/get_planing_farmer', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        order_farmer: result.result,
                        order_farmer_origin: result.result
                        // farmer: this.sort_plant(result.result),
                        // check_array: result.result,
                        // data:result.result.date
                    })
                    // this.show()
                    console.log("listfarmer func", result.result)
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

    // show = () => {
    //     let order_farmer = this.state.order_farmer
    //     let want = this.state.want
    //     let result = []
    //     order_farmer.map((element) => {
    //         let volume = 0
    //         want.map((ele_want) => {
    //             if (ele_want.plant == element.planing_farmer_plant) {
    //                 volume += ele_want.volume
    //             }
    //         })
    //         result.push({
    //             ...element,
    //             want: volume
    //         })
    //     })

    //     this.setState({
    //         show_data: result
    //     })

    // }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    filterPlant = (e) => {
        if (this.state.page === 1) {
            var updatedList = this.state.search_order;
            updatedList = updatedList.filter(function (item) {
                return item.plant.search(e.target.value) !== -1;
            });
            this.setState({
                plants: updatedList,
            });
        }
        if (this.state.page === 2) {
            var updatedList = this.state.order_farmer_origin;
            updatedList = updatedList.filter(function (item) {
                return item.planing_farmer_plant.search(e.target.value) !== -1;
            });
            this.setState({
                order_farmer: updatedList,
            });
        }

    }

    render_plan = (page) => {
        let return_page;
        switch (page) {
            case 1: return_page =
                <div>

                    <div className="Row">
                        <div className="col-1"></div>
                        <div className="col-10">

                            <table style={{ textAlign: "center" }}>
                                <tr>
                                    <th>ชื่อวัตถุดิบ</th>
                                    {/* <th>จำนวนที่มีอยู่ในสต๊อก</th> */}

                                    <th>จำนวนที่สั่ง</th>
                                    {/* <th>วัตถุดิบขาด</th> */}

                                    <th>วางแผน</th>

                                </tr>
                                {this.plants_se(this.state.plants).map((ele_plant, index) => {
                                    return (
                                        <tr>
                                            <td>{ele_plant.plant}</td>
                                            {/* <td>{addComma(ele_plant.year_value)}</td> */}
                                            <td>{ele_plant.volume_want}</td>
                                            {/* <td></td> */}
                                            <td><button onClick={() => this.openModel(ele_plant.plant)} style={{ fontFamily: "fc_lamoonregular", fontSize: "16px" }}>วางแผน</button></td>
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
                                <h3 style={{ textAlign: "center" }}>วางแผนการเพาะปลูก {this.state.selectPlant}</h3>
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
                            {/* {console.log("list fermer", this.state.order_farmer)} */}

                            <table>
                                <tr>
                                    <th>วันที่เริ่มต้น</th>
                                    <th>ชื่อพืช</th>
                                    <th>รายชื่อเกษตรกรที่เลือกปลูก</th>
                                    <th>จำนวนที่ต้องการ</th>
                                    <th>ระยะเวลาที่กำหนด</th>
                                </tr>
                                {this.state.order_farmer.map((element, index) => {
                                    return (
                                        <tr>
                                            <td>วันที่เริ่มต้น</td>
                                            <td>{element.planing_farmer_plant}</td>
                                            <td>{element.planing_farmer_name}</td>
                                            <td>{element.planing_farmer_volume}</td>
                                            <td>กำหนดส่งก่อน : {moment(element.planing_farmer_date).format('DD/MM/YYYY')}</td>
                                        </tr>
                                    )
                                })}
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
                            <button onClick={() => { this.setState({ page: 1 }) }}>วางแผนการเพาะปลูกให้กับเกษตรกร</button>
                            <button onClick={() => { this.setState({ page: 2 }) }}>ติดตามการวางแผน</button>

                            <input type="text" placeholder="ค้นหาพืช" onChange={this.filterPlant}
                                style={{ width: "40%", marginTop: "5px", marginLeft: "25px" }} />
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