//se-middle คำสั่งซื้อจากผู้ประกอบการ
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service';
import { user_token } from '../Support/Constance';
import moment from 'moment'
import { NavLink } from 'react-router-dom';
import one from '../Image/one.png'
import two from '../Image/two.png'
import twodis from '../Image/twodis.png'
import three from '../Image/three.png'
import threedis from '../Image/threedis.png'
import four from '../Image/four.png'
import fourdis from '../Image/fourdis.png'
import five from '../Image/five.png'
import fivedis from '../Image/fivedis.png'
import six from '../Image/six.png'
import sixdis from '../Image/sixdis.png'
import az from '../Image/az.png'
import za from '../Image/za.png'

class M_Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: [],
            search_order: [],
            click: false,
            clicks: false,
        }
    }
    componentWillMount() {
        this.get_order();
    }

    get_order = async () => {
        try {
            await get('neutrally/get_order_all', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        order: result.result,
                        search_order: result.result
                    })
                    this.Sortdate()
                    setTimeout(() => {
                        console.log("get_order", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {
            alert("get_order" + error);
        }
    }

    render_status = (order_status) => {
        let render_tag

        switch (order_status) {
            case 0:
                render_tag = <div>
                    <img src={one} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={twodis} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={threedis} style={{ width: "25px", height: "25px", marginRight: "5px"}} alt="1" />
                    <img src={fourdis} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={fivedis} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                </div>
                break;
            case 1:
                render_tag = <div>
                    <img src={one} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={two} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={threedis} style={{ width: "25px", height: "25px", marginRight: "5px"}} alt="1" />
                    <img src={fourdis} style={{ width: "25px", height: "25px", marginRight: "5px"}} alt="1" />
                    <img src={fivedis} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                </div>
                break;
            case 2:
                render_tag = <div>
                    <img src={one} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={two} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={three} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={fourdis} style={{ width: "25px", height: "25px", marginRight: "5px"}} alt="1" />
                    <img src={fivedis} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                </div>
                break;
            case 3:
                render_tag = <div>
                    <img src={one} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={two} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={three} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={four} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={fivedis} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                </div>
                break;
                case 4:
                render_tag = <div>
                    <img src={one} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={two} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={three} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={four} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={five} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                </div>
                break;
                
            default:
                render_tag = <div>
                    <div className="FontDanger"> เกิดข้อผิดพลาด </div>
                </div>
                break;
        }
        return render_tag
    }

    filterID = (event) => {
        var updatedList = this.state.order;
        updatedList = updatedList.filter(function (item) {
            return item.order_id.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({
            search_order: updatedList,
        });
    }

    filterDate = (event) => {
        var updatedList = this.state.order;
        updatedList = updatedList.filter(function (item) {
            return item.order_date.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({
            search_order: updatedList,
        });
    }
    
    Sortdate = () => {
        const order = this.state.order

        function compare(a, b) {
            const order_idA = a.order_date
            const order_idB = b.order_date

            let comparison = 0;
            if (order_idA < order_idB) {
                comparison = 1;
            } else if (order_idA > order_idB) {
                comparison = -1;
            }
            return comparison;
        }

        console.log(order.sort(compare));
        let sort_order = order.sort(compare)
        this.setState({ order: sort_order })

    }
    SortStatus = (e) => {
        const order = this.state.order

        if (e === 'Max') {
            function compare(a, b) {
                const order_idA = a.order_status
                const order_idB = b.order_status

                let comparison = 0;
                if (order_idA < order_idB) {
                    comparison = 1;
                } else if (order_idA > order_idB) {
                    comparison = -1;
                }
                return comparison;
            }
            let sort_order = order.sort(compare)
            this.setState({ order: sort_order,clicks: true })
        }
        if (e === 'Min') {
            function compare(a, b) {
                const order_idA = a.order_status
                const order_idB = b.order_status

                let comparison = 0;
                if (order_idA > order_idB) {
                    comparison = 1;
                } else if (order_idA < order_idB) {
                    comparison = -1;
                }
                return comparison;
            }
            let sort_order = order.sort(compare)
            this.setState({ order: sort_order,clicks: false })
        }
    }
    SortDate = (e) => {
        const order = this.state.order
        if (e === 'Max') {
            function compare(a, b) {
                const order_idA = a.order_date
                const order_idB = b.order_date

                let comparison = 0;
                if (order_idA < order_idB) {
                    comparison = 1;
                } else if (order_idA > order_idB) {
                    comparison = -1;
                }
                return comparison;
            }
            let sort_order = order.sort(compare)
            this.setState({ order: sort_order,click: true })
        }
        if (e === 'Min') {
            function compare(a, b) {
                const order_idA = a.order_date
                const order_idB = b.order_date

                let comparison = 0;
                if (order_idA > order_idB) {
                    comparison = 1;
                } else if (order_idA < order_idB) {
                    comparison = -1;
                }
                return comparison;
            }
            let sort_order = order.sort(compare)
            this.setState({ order: sort_order,click: false })
        }

    }

    SortId = () => {
        const bands = this.state.order

        function compare(a, b) {
            const order_idA = a.order_id.toUpperCase();
            const order_idB = b.order_id.toUpperCase();

            let comparison = 0;
            if (order_idA < order_idB) {
                comparison = 1;
            } else if (order_idA > order_idB) {
                comparison = -1;
            }
            return comparison;
        }

        console.log(bands.sort(compare));
        let sort_order = bands.sort(compare)
        this.setState({ order: sort_order })

    }


    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>คำสั่งซื้อจากผู้ประกอบการ</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-4">
                        <input type="search" placeholder="ค้นหา" onChange={this.filterID} />
                    </div>
                    <div className="col-4">
                        <input type="date" name="date" placeholder="ค้นหา" onChange={this.filterDate} />
                        <button onClick={() => this.SortId()} className="BTN_AddCart">เรียงล่าสุด</button>
                    </div>
                    <div className="col-2"></div>
                </div>


                <div className="Row">
                    <div className="col-2"></div>
                    {/* เริ่ม */}
                    <div className="col-8">
                        <table style={{ textAlign: "center" }}>
                            <tr>
                                <th>ลำดับ</th>
                                <th>รหัสใบสั่งซื้อ</th>
                                <th>
                                    
                                    วันที่สั่งซื้อ
                                    {this.state.click ?
                                        <img src={za} alt="arrow" style={{ width: "20px" }} onClick={() => this.SortDate('Min')} />
                                        :
                                        <img src={az} alt="arrow" style={{ width: "20px" }} onClick={() => this.SortDate('Max')} />
                                    }
                                </th>

                                <th>
                                   
                                    สถานะสั่งซื้อ
                                    {this.state.clicks ?
                                        <img src={za} alt="arrow" style={{ width: "20px" }} onClick={() => this.SortStatus('Min')} />
                                        :
                                        <img src={az} alt="arrow" style={{ width: "20px" }} onClick={() => this.SortStatus('Max')} />
                                    }
                                </th>
                                <th>ชื่อผู้สั่งซื้อ</th>
                                <th>รายละเอียด</th>
                            </tr>

                            {
                                this.state.search_order ?
                                    this.state.search_order.map((element, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{element.order_id}</td>
                                                <td>{moment(element.order_date).utc().format("DD/MM/YYYY, HH:mm")}</td>
                                                <td>{this.render_status(element.order_status)}</td>
                                                <td>{element.name} {element.lastname}</td>
                                                <td><NavLink to={"/M_Order/gg?aa=" + element.order_id} style={{ textDecoration: "none" }}>
                                                    <button className="BTN_Detail" style={{ marginTop: "5px" }}>รายละเอียด</button>
                                                </NavLink>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    this.state.order.map((element, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{element.order_id}</td>
                                                <td>{moment(element.order_date).utc().format("DD/MM/YYYY, HH:mm")}</td>
                                                <td>{this.render_status(element.order_status)}</td>
                                                <td>{element.trader_id}</td>
                                                <td><NavLink to={"/M_Order/gg?aa=" + element.order_id} style={{ textDecoration: "none" }}>
                                                    <button className="BTN_Detail" style={{ marginTop: "5px" }}>รายละเอียด</button>
                                                </NavLink>
                                                </td>
                                            </tr>

                                        )
                                    })
                            }
                        </table>
                    </div>
                </div>


            </div>
        )
    }
}
export default M_Order;