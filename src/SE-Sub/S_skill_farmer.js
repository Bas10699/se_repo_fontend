//ความสามารถของเกษตร
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token } from '../Support/Constance'
import { NavLink } from 'react-router-dom'
import za from '../Image/za.png'
import az from '../Image/az.png'
import top from '../Image/top.png'

class S_skill_farmer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            farmer: [],
            plants: [],
            search_order: [],
            click1: false,
            click2: false,
            click3: false,
            click: true,
            showHide1: true,
            showHide2: true,
            showHide3: true,
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

    year_value = () => {
        const order = this.state.farmer
        if (this.state.click1 === true) {
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
            this.setState({
                farmer: sort_order,
                click1: false
            })
        }
        else {
            function compare(a, b) {
                const order_idA = a.year_value
                const order_idB = b.year_value

                let comparison = 0;
                if (order_idA > order_idB) {
                    comparison = 1;
                } else if (order_idA < order_idB) {
                    comparison = -1;
                }
                return comparison;
            }
            let sort_order = order.sort(compare)
            this.setState({
                farmer: sort_order,
                click1: true
            })
        }

    }
    product_value = () => {
        const order = this.state.farmer
        if (this.state.click2 === true) {
            function compare(a, b) {
                const order_idA = a.product_value
                const order_idB = b.product_value

                let comparison = 0;
                if (order_idA < order_idB) {
                    comparison = 1;
                } else if (order_idA > order_idB) {
                    comparison = -1;
                }
                return comparison;
            }
            let sort_order = order.sort(compare)
            this.setState({
                farmer: sort_order,
                click2: false
            })
        }
        else {
            function compare(a, b) {
                const order_idA = a.product_value
                const order_idB = b.product_value

                let comparison = 0;
                if (order_idA > order_idB) {
                    comparison = 1;
                } else if (order_idA < order_idB) {
                    comparison = -1;
                }
                return comparison;
            }
            let sort_order = order.sort(compare)
            this.setState({
                farmer: sort_order,
                click2: true
            })
        }

    }

    growingArea = () => {
        const order = this.state.farmer
        if (this.state.click3 === true) {
            function compare(a, b) {
                const order_idA = a.growingArea
                const order_idB = b.growingArea

                let comparison = 0;
                if (order_idA < order_idB) {
                    comparison = 1;
                } else if (order_idA > order_idB) {
                    comparison = -1;
                }
                return comparison;
            }
            let sort_order = order.sort(compare)
            this.setState({
                farmer: sort_order,
                click3: false
            })
        }
        else {
            function compare(a, b) {
                const order_idA = a.growingArea
                const order_idB = b.growingArea

                let comparison = 0;
                if (order_idA > order_idB) {
                    comparison = 1;
                } else if (order_idA < order_idB) {
                    comparison = -1;
                }
                return comparison;
            }
            let sort_order = order.sort(compare)
            this.setState({
                farmer: sort_order,
                click3: true
            })
        }

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
            <div className="App" id="#Top">
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
                                        <li style={{ textAlign: "left" ,marginLeft:"20px",paddingLeft:"20px" }} activeClassName="Active">{ele_plant.plant}</li>
                                    </NavLink>

                                )
                            })}

                        </ol>
                        <a href="#Top" style={{ textDecoration: "none", }}><img alt="top" src={top} className="top" /></a>
                    </div>

                    <div className='col-1'></div>
                    <div className='col-8' style={{ marginTop: "-50px" }}>
                        <input type="search" placeholder="ค้นหา" />
                        <h4>เลือกข้อมูลที่ต้องการเปรียบเทียบ</h4>
                        <button className={this.state.showHide1 ? "selectShowb":"selectShow"} onClick={() => { if (this.state.showHide1 === true) { this.setState({ showHide1: false }) } else { this.setState({ showHide1: true }) } }}>จํานวนผลผลิตที่ขายต่อปี</button>
                        <button className={this.state.showHide2 ? "selectShowb":"selectShow"} onClick={() => { if (this.state.showHide2 === true) { this.setState({ showHide2: false }) } else { this.setState({ showHide2: true }) } }}>ผลผลิตต่อไร่</button>
                        <button className={this.state.showHide3 ? "selectShowb":"selectShow"} onClick={() => { if (this.state.showHide3 === true) { this.setState({ showHide3: false }) } else { this.setState({ showHide3: true }) } }}>พื้นที่ปลูก</button>
                        {console.log(this.state.showHide1)}
                        <table>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ชื่อ - นามสกุล</th>
                                <th>พืชที่ปลูก </th>

                                {this.state.showHide1 ? <th colSpan="2" style={{ borderLeft: "1px solid #ccc" }}>จํานวนผลผลิตที่ขายต่อปี
                                {this.state.click1 ?
                                        <img src={za} alt="arrow" style={{ width: "20px" }} onClick={() => this.year_value()} />
                                        :
                                        <img src={az} alt="arrow" style={{ width: "20px" }} onClick={() => this.year_value()} />
                                    }
                                </th> : null}
                                {this.state.showHide2 ? <th colSpan="2" style={{ borderLeft: "1px solid #ccc" }}>ผลผลิตต่อไร่
                                {this.state.click2 ?
                                        <img src={za} alt="arrow" style={{ width: "20px" }} onClick={() => this.product_value()} />
                                        :
                                        <img src={az} alt="arrow" style={{ width: "20px" }} onClick={() => this.product_value()} />
                                    }
                                </th> : null}
                                {this.state.showHide3 ? <th colSpan="2" style={{ borderLeft: "1px solid #ccc" }}>พื้นที่ปลูก
                                {this.state.click3 ?
                                        <img src={za} alt="arrow" style={{ width: "20px" }} onClick={() => this.growingArea()} />
                                        :
                                        <img src={az} alt="arrow" style={{ width: "20px" }} onClick={() => this.growingArea()} />
                                    }
                                </th> : null}
                            </tr>
                            {
                                this.state.search_order ?
                                    this.state.farmer.map((element, index) => {
                                        return (
                                            <tr>
                                                <td style={{ textAlign: "center" }}>{index + 1} .</td>
                                                <td>{element.title_name}{element.first_name}  {element.last_name}</td>
                                                <td style={{ textAlign: "center" }}><b>{element.plant}</b></td>
                                                {this.state.showHide1 ? <td style={{ textAlign: "right", borderLeft: "1px solid #ccc" }}>{element.year_value} </td>
                                                    : null}
                                                {this.state.showHide1 ? <td>กิโลกรัม</td> : null}
                                                {this.state.showHide2 ? <td style={{ textAlign: "right", borderLeft: "1px solid #ccc" }}>{element.product_value}</td>
                                                    : null}
                                                {this.state.showHide2 ? <td>กิโลกรัม</td> : null}
                                                {this.state.showHide3 ? <td style={{ textAlign: "center", borderLeft: "1px solid #ccc" }}>{element.growingArea}</td>
                                                    : null}
                                                {this.state.showHide3 ? <td>ไร่</td> : null}
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
