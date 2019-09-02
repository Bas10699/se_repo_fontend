//se-middle คำสั่งซื้อจากผู้ประกอบการ
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service';
import { user_token } from '../Support/Constance';
import moment from 'moment'
import { NavLink } from 'react-router-dom';

class M_Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            get_order: []
        }
    }
    componentWillMount() {
        this.get_order();
    }

    get_order = async () => {
        try {
            await get('neutarlly/get_order_all', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_order: result.result
                    })
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
                    <div className="FontWarning" > กำลังดำเนินการ </div>
                </div>
                break;
            case 1:
                render_tag = <div>
                    <div className="FontSuccess"> สำเร็จแล้ว </div>
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
                        <input type="date" placeholder="ค้นหา" onChange={this.filterDate} />
                    </div>
                    <div className="col-2"></div>
                </div>

                <div className="Row">
                    <div className="col-2"></div>
                    {/* เริ่ม */}
                    <div className="col-8">
                        <div className="TotalCart">
                            <div className="Row">
                                <div className="col-2" style={{ textAlign: "center" }}>ลำดับ</div>
                                <div className="col-2" style={{ textAlign: "center" }}>รหัสใบสั่งซื้อ</div>
                                <div className="col-2" style={{ textAlign: "center" }}>วันที่</div>
                                <div className="col-2" style={{ textAlign: "center" }}>สถานะ</div>
                                <div className="col-2" style={{ textAlign: "center" }}>ชื่อผู้สั่ง</div>
                                <div className="col-2" style={{ textAlign: "left" }}></div>
                            </div>
                        </div>

                        {
                            this.state.search_order ?
                                this.state.search_order.map((element, index) => {
                                    return (
                                        <div className="BuyingCard">
                                            <div className="Row">
                                                <div className="col-2"><h4 style={{ textAlign: "center", marginTop: "15px" }}>{index + 1}</h4></div>
                                                <div className="col-2"><h4 style={{ textAlign: "center", marginTop: "15px" }}>{element.order_id}</h4></div>
                                                <div className="col-2"><h4 style={{ textAlign: "center", marginTop: "15px" }}>{moment(element.order_date).utc().format("DD/MM/YYYY, HH:mm")}</h4></div>
                                                <div className="col-2"><h4 style={{ textAlign: "center", marginTop: "15px" }}>{this.render_status(element.order_status)}</h4></div>
                                                <div className="col-2"><h4 style={{ textAlign: "center", marginTop: "15px" }}>{element.trader_id}</h4></div>
                                                <div className="col-2">
                                                    <NavLink to={"/M_Order/order?order_id=" + element.order_id} style={{ textDecoration: "none" }}>
                                                        <button className="BTN_Detail"  style={{ marginTop: "5px" }}>รายละเอียด</button>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                                :
                                this.state.get_order.map((element, index) => {
                                    return (
                                        <div className="BuyingCard">
                                            <div className="Row">
                                                <div className="col-2"><h4 style={{ textAlign: "center", marginTop: "15px" }}>{index + 1}</h4></div>
                                                <div className="col-2"><h4 style={{ textAlign: "center", marginTop: "15px" }}>{element.order_id}</h4></div>
                                                <div className="col-2"><h4 style={{ textAlign: "center", marginTop: "15px" }}>{moment(element.order_date).utc().format("DD/MM/YYYY, HH:mm")}</h4></div>
                                                <div className="col-2"><h4 style={{ textAlign: "center", marginTop: "15px" }}>{this.render_status(element.order_status)}</h4></div>
                                                <div className="col-2"><h4 style={{ textAlign: "center", marginTop: "15px" }}>{element.trader_id}</h4></div>
                                                <div className="col-2">
                                                    <NavLink to={"/M_Order/order?order_id=" + element.order_id} style={{ textDecoration: "none" }}>
                                                        <button className="BTN_Detail"  style={{ marginTop: "5px" }}>รายละเอียด</button>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>


            </div>
        )
    }
}
export default M_Order;