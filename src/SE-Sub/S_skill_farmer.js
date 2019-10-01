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
            <div>
                <br></br>
                <br></br>
                <div className='Row'>
                    <div className='col-2'></div>
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
                        {this.sort_plant(this.state.farmer).map((element, index) => {
                            return (
                                <div>
                                    <br></br>
                                    {index + 1} .
                            <div>ชื่อ {element.title_name}{element.first_name}  {element.last_name}</div>
                                    <div>พืชที่ปลูก <b>{element.plant}</b> ปลูกได้ {element.year_value} {element.year_value_unit}</div>
                                    <div>ส่งมอบ {element.deliver_value} กิโลกรัม</div>
                                    <div>ผลผลิตต่อไร่ {element.product_value} กิโลกรัม</div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        )
    }
}
export default S_skill_farmer
