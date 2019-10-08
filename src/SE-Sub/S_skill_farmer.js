//ความสามารถของเกษตร
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token } from '../Support/Constance'
import { NavLink } from 'react-router-dom'
import za from '../Image/za.png'
import az from '../Image/az.png'

class S_skill_farmer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            farmer: [],
            plants: [],
            search_order: [],
            click: false,
            get_user: null,
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg",
        }
    }

    componentWillMount() {
        this.get_skill_farmer()
        this.get_user()
    }
    get_skill_farmer = async () => {
        try {
            await get('neo_firm/get_farmer_se', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        farmer: result.result,
                        plants: result.result,
                        search_order:result.result
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

    filterPlant = (data) => {
        var updatedList = this.state.plants;
        updatedList = updatedList.filter(function (item) {
            return item.plant.search(data) !== -1;
        });
        this.setState({
            farmer: updatedList,
        });
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

    get_user = async () => {
        try {
            await get('show/show_user', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_user: result.result
                    })
                    setTimeout(() => {
                        console.log("get_user", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                    //alert("user1"+result.error_message);
                }
            });
        } catch (error) {
            alert("get_user2" + error);
        }
    }

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-10">
                        <h2 style={{ textAlign: "center" }}>ประสิทธิภาพการปลูกพืชของเกษตรกร</h2>
                    </div>
                </div>


                <div className='Row'>
                    <div className='col-2' style={{ marginTop: "-130px" }}>

                        <ol>
                            <div style={{ textAlign: "center", margin: "0px" }}>
                                {/* <img src={this.state.default_user_image} alt="se_photo" style={{width:"150px",marginTop:"10px",borderRadius:"50%"}}/> */}
                                <h5 style={{ padding: "10px 5px 10px 10px", margin: "0px" }}>{this.state.get_user ? this.state.get_user.name : null}</h5>
                            </div>
                            <hr style={{ boxShadow: "2px 2px 8px 0 rgba(0, 0, 0, 0.2)", border: "1px solid #ccc", width: "80%" }} />
                            <NavLink
                                style={{ color: "black", textDecoration: "none", width: "100%", textAlign: "center" }}>
                                <li style={{ textAlign: "center" }} activeClassName="Active">--แสดงทั้งหมด--</li>
                            </NavLink>
                            {this.plants_se(this.state.plants).map((ele_plant, index) => {
                                return (
                                    <NavLink onClick={() => this.filterPlant(ele_plant.plant)}
                                        style={{ color: "black", textDecoration: "none", width: "100%", textAlign: "center" }}>
                                        <li style={{ textAlign: "center" }} activeClassName="Active">{ele_plant.plant}</li>
                                    </NavLink>

                                )
                            })}
                        </ol>
                    </div>

                    <div className='col-1'></div>
                    <div className='col-8' style={{ marginTop: "-50px" }}>
                        <input type="search" placeholder="ค้นหา" />
                        <table>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ชื่อ</th>
                                <th>พืชที่ปลูก </th>
                                <th colSpan="2" style={{ borderLeft: "1px solid #ccc" }}>จํานวนผลผลิตที่ขายต่อปี
                                {this.state.click ?
                                        <img src={za} alt="arrow" style={{ width: "20px" }} onClick={() => this.year_value('Min')} />
                                        :
                                        <img src={az} alt="arrow" style={{ width: "20px" }} onClick={() => this.year_value('Max')} />
                                    }
                                </th>
                                <th colSpan="2" style={{ borderLeft: "1px solid #ccc" }}>ผลผลิตต่อไร่
                                {this.state.click ?
                                        <img src={za} alt="arrow" style={{ width: "20px" }} onClick={() => this.product_value('Min')} />
                                        :
                                        <img src={az} alt="arrow" style={{ width: "20px" }} onClick={() => this.product_value('Max')} />
                                    }
                                </th>
                                <th colSpan="2" style={{ borderLeft: "1px solid #ccc" }}>พื้นที่ปลูก
                                {this.state.click ?
                                        <img src={za} alt="arrow" style={{ width: "20px" }} onClick={() => this.growingArea('Min')} />
                                        :
                                        <img src={az} alt="arrow" style={{ width: "20px" }} onClick={() => this.growingArea('Max')} />
                                    }
                                </th>
                            </tr>
                            {
                                this.state.search_order ?
                                    this.sort_plant(this.state.farmer).map((element, index) => {
                                        return (
                                            <tr>
                                                <td style={{textAlign:"center"}}>{index + 1} .</td>
                                                <td>{element.title_name}{element.first_name}  {element.last_name}</td>
                                                <td style={{textAlign:"center"}}><b>{element.plant}</b></td>
                                                <td style={{ textAlign: "right", borderLeft: "1px solid #ccc" }}>{element.year_value} </td>
                                                <td>กิโลกรัม</td>
                                                <td style={{ textAlign: "right", borderLeft: "1px solid #ccc" }}>{element.product_value}</td>
                                                <td>กิโลกรัม</td>
                                                <td style={{ textAlign: "center", borderLeft: "1px solid #ccc" }}>{element.growingArea}</td>
                                                <td>ไร่</td>
                                            </tr>
                                        )
                                        // }
                                    })
                                    :
                                    null

                            }

                        </table>

                    </div>
                    <div className='col-1'></div>
                </div>

            </div>
        )
    }
}
export default S_skill_farmer
