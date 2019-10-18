//ความสามารถของเกษตร
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token } from '../Support/Constance'
import { NavLink } from 'react-router-dom'
import za from '../Image/za.png'
import az from '../Image/az.png'
import top from '../Image/top.png'
import arrow from '../Image/up-arrow.png'
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css"; //for css

class S_skill_farmer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            todosPerPage: 10,
            farmer: [],
            plants: [],
            search_order: [],
            click1: false,
            click2: false,
            click3: false,
            click4: false,
            click5: false,
            click6: false,
            click: true,
            showHide1: true,
            showHide2: true,
            showHide3: true,
            showHide4: true,
            showHide5: true,
            showHide6: true,
            get_user: null,
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg",
        }
    }

    filterName = (event) => {
        var updatedList = this.state.plants;
        updatedList = updatedList.filter(function (item) {
            return item.first_name.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({
            farmer: updatedList,
        });
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
        if (this.state.click6 === true) {
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
                click6: false
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
                click6: true
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

    changeCurrentPage = numPage => {
        this.setState({ currentPage: numPage });
        //fetch a data
        //or update a query to get data
    };

    render() {
        let todos = []
        const { farmer, currentPage, todosPerPage } = this.state;
        farmer.map((element,index)=>{
            todos.push({
                num:index+1,
                ...element
            })
        })
        
        // Logic for displaying todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

        // const renderTodos = currentTodos.map((todo, index) => {
        //     return <li>{todo}</li>;
        // });

        // Logic for displaying page numbers
        // const pageNumbers = [];
        // for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
        //     pageNumbers.push(i);
        // }

        // const renderPageNumbers = pageNumbers.map(number => {
        //     return (
        //         <div onClick={() => this.handleClick(number)}>
        //             {number}
        //             &nbsp;
        //         </div>
        //     );
        // });
        return (
            <div className="App" id="#Top">
                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-10">
                        <h2 style={{ textAlign: "center" }}>ประสิทธิภาพการปลูกพืชของเกษตรกร</h2>
                    </div>
                </div>


                <div className='Row'>
                    <div className='col-1' style={{ marginTop: "-130px" }}>

                        <ol>
                            <div style={{ textAlign: "center", margin: "0px" }}>
                                {/* <img src={this.state.default_user_image} alt="se_photo" style={{width:"150px",marginTop:"10px",borderRadius:"50%"}}/> */}
                                <h5 style={{ padding: "10px 5px 10px 10px", margin: "0px" }}>{this.state.get_user ? this.state.get_user.name : null}</h5>
                            </div>
                            <hr style={{ boxShadow: "2px 2px 8px 0 rgba(0, 0, 0, 0.2)", border: "1px solid #ccc", width: "80%" }} />
                            <NavLink
                                style={{ color: "black", textDecoration: "none", width: "100%", textAlign: "center" }}>
                                <li style={{ textAlign: "left", marginLeft: "5px", paddingLeft: "5px" }} activeClassName="Active">--แสดงทั้งหมด--</li>
                            </NavLink>
                            {this.plants_se(this.state.plants).map((ele_plant, index) => {
                                return (
                                    <NavLink onClick={() => this.filterPlant(ele_plant.plant, this.setState({ currentPage: 1 }))}
                                        style={{ color: "black", textDecoration: "none", width: "100%", textAlign: "center" }}>
                                        <li style={{ textAlign: "left", marginLeft: "10px", paddingLeft: "10px" }} activeClassName="Active">{ele_plant.plant}</li>
                                    </NavLink>

                                )
                            })}

                        </ol>
                        <a href="#Top" style={{ textDecoration: "none", }}><img alt="top" src={top} className="top" /></a>
                    </div>

                    {/* <div className='col-1'></div> */}
                    <div className='col-11' style={{ marginTop: "-50px", marginLeft: "20px", marginRight: "10px" }} >
                        
                        <h4 style={{marginBottom:"0"}}>เลือกข้อมูลที่ต้องการเปรียบเทียบ</h4>
                        <input type="search" placeholder="ค้นหา" onChange={this.filterName} style={{margin:"10px" ,width:"80%"}}/>
                        <button className={this.state.showHide1 ? "selectShowb" : "selectShow"} onClick={() => { if (this.state.showHide1 === true) { this.setState({ showHide1: false }) } else { this.setState({ showHide1: true }) } }}>จํานวนผลผลิตที่ขายต่อปี</button>
                        <button className={this.state.showHide2 ? "selectShowb" : "selectShow"} onClick={() => { if (this.state.showHide2 === true) { this.setState({ showHide2: false }) } else { this.setState({ showHide2: true }) } }}>ผลผลิตต่อไร่</button>
                        <button className={this.state.showHide3 ? "selectShowb" : "selectShow"} onClick={() => { if (this.state.showHide3 === true) { this.setState({ showHide3: false }) } else { this.setState({ showHide3: true }) } }}>จำนวนการส่งมอบต่อครั้ง</button>
                        <button className={this.state.showHide4 ? "selectShowb" : "selectShow"} onClick={() => { if (this.state.showHide4 === true) { this.setState({ showHide4: false }) } else { this.setState({ showHide4: true }) } }}>เดือนที่ส่งมอบ</button>
                        <button className={this.state.showHide5 ? "selectShowb" : "selectShow"} onClick={() => { if (this.state.showHide5 === true) { this.setState({ showHide5: false }) } else { this.setState({ showHide5: true }) } }}>จำนวนการส่งมอบต่อครั้ง</button>
                        <button className={this.state.showHide6 ? "selectShowb" : "selectShow"} onClick={() => { if (this.state.showHide6 === true) { this.setState({ showHide6: false }) } else { this.setState({ showHide6: true }) } }}>พื้นที่ปลูก</button>
                        {/* {console.log(this.state.showHide1)} */}
                        <table>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ชื่อ - นามสกุล</th>
                                <th>พืชที่ปลูก </th>

                                {this.state.showHide1 ? <th colSpan="2" style={{ borderLeft: "1px solid #ccc" }}>จํานวนผลผลิตที่ขาย/ปี
                                {this.state.click1 ?
                                        <img src={arrow} alt="arrow" style={{ width: "20px", cursor: "pointer", marginLeft:"5px", marginLeft:"5px" }} onClick={() => this.year_value()} />
                                        :
                                        <img src={arrow} alt="arrow" style={{ width: "20px", transform: "scaleY(-1)", cursor: "pointer", marginLeft:"5px" }} onClick={() => this.year_value()} />
                                    }
                                </th> : null}
                                {this.state.showHide2 ? <th colSpan="2" style={{ borderLeft: "1px solid #ccc" }}>ผลผลิต/ไร่
                                {this.state.click2 ?
                                        <img src={arrow} alt="arrow" style={{ width: "20px", cursor: "pointer", marginLeft:"5px" }} onClick={() => this.product_value()} />
                                        :
                                        <img src={arrow} alt="arrow" style={{ width: "20px", transform: "scaleY(-1)", cursor: "pointer", marginLeft:"5px" }} onClick={() => this.product_value()} />
                                    }
                                </th> : null}
                                {this.state.showHide3 ? <th colSpan="2" style={{ borderLeft: "1px solid #ccc" }}>จำนวนการส่งมอบ/ครั้ง
                                {this.state.click3 ?
                                        <img src={arrow} alt="arrow" style={{ width: "20px", cursor: "pointer", marginLeft:"5px" }} onClick={() => this.product_value()} />
                                        :
                                        <img src={arrow} alt="arrow" style={{ width: "20px", transform: "scaleY(-1)", cursor: "pointer", marginLeft:"5px" }} onClick={() => this.product_value()} />
                                    }
                                </th> : null}
                                {this.state.showHide4 ? <th style={{ borderLeft: "1px solid #ccc" }}>เดือนที่ส่งมอบ
                                {this.state.click4 ?
                                        <img src={arrow} alt="arrow" style={{ width: "20px", cursor: "pointer", marginLeft:"5px" }} onClick={() => this.product_value()} />
                                        :
                                        <img src={arrow} alt="arrow" style={{ width: "20px", transform: "scaleY(-1)", cursor: "pointer", marginLeft:"5px" }} onClick={() => this.product_value()} />
                                    }
                                </th> : null}
                                {this.state.showHide5 ? <th style={{ borderLeft: "1px solid #ccc" }}>จำนวนครั้งส่งมอบ
                                {this.state.click5 ?
                                        <img src={arrow} alt="arrow" style={{ width: "20px", cursor: "pointer", marginLeft:"5px" }} onClick={() => this.product_value()} />
                                        :
                                        <img src={arrow} alt="arrow" style={{ width: "20px", transform: "scaleY(-1)", cursor: "pointer", marginLeft:"5px" }} onClick={() => this.product_value()} />
                                    }
                                </th> : null}
                                {this.state.showHide6 ? <th colSpan="2" style={{ borderLeft: "1px solid #ccc" }}>พื้นที่ปลูก
                                {this.state.click6 ?
                                        <img src={arrow} alt="arrow" style={{ width: "20px", cursor: "pointer", marginLeft:"5px" }} onClick={() => this.growingArea()} />
                                        :
                                        <img src={arrow} alt="arrow" style={{ width: "20px", transform: "scaleY(-1)", cursor: "pointer", marginLeft:"5px" }} onClick={() => this.growingArea()} />
                                    }
                                </th> : null}
                            </tr>
                            {
                                this.state.search_order ?
                                    currentTodos.map((element, index) => {
                                        return (
                                            <tr>
                                                <td style={{ textAlign: "center" }}>{element.num} .</td>
                                                <td>{element.title_name}{element.first_name}  {element.last_name}</td>
                                                <td style={{ textAlign: "center" }}><b>{element.plant}</b></td>
                                                {this.state.showHide1 ? <td style={{ textAlign: "right", borderLeft: "1px solid #ccc" }}>{element.year_value} </td>
                                                    : null}
                                                {this.state.showHide1 ? <td>กิโลกรัม</td> : null}

                                                {this.state.showHide2 ? <td style={{ textAlign: "right", borderLeft: "1px solid #ccc" }}>{element.product_value}</td>
                                                    : null}
                                                {this.state.showHide2 ? <td>กิโลกรัม</td> : null}

                                                {this.state.showHide3 ? <td style={{ textAlign: "right", borderLeft: "1px solid #ccc" }}>{element.deliver_value}</td>
                                                    : null}
                                                {this.state.showHide3 ? <td>กิโลกรัม</td> : null}

                                                {this.state.showHide4 ? <td style={{ textAlign: "center", borderLeft: "1px solid #ccc" }}>{element.end_plant}</td>
                                                    : null}
                                                {this.state.showHide5 ? <td style={{ textAlign: "center", borderLeft: "1px solid #ccc" }}>{element.deliver_frequency_number}</td>
                                                    : null}
                                                {this.state.showHide6 ? <td style={{ textAlign: "center", borderLeft: "1px solid #ccc" }}>{element.growingArea}</td>
                                                    : null}
                                                {this.state.showHide6 ? <td>ไร่</td> : null}
                                            </tr>
                                        )
                                        // }
                                    })

                                    :
                                    null

                            }

                        </table>
                        <div style={{textAlign:'center'}}>
                            
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(todos.length / todosPerPage)}
                                changeCurrentPage={this.changeCurrentPage}
                                theme="square-fill"
                            />
                            
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}
export default S_skill_farmer
