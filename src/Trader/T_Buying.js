//ประวัติการซื้อ
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { user_token, addComma } from '../Support/Constance';
import { get } from '../Support/Service';
import moment from 'moment'

class T_Buying extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: [],
            data: [],
            get_user: null,
            get_product: null,
            search_order: [],
            render_history: null,
            photo_profile: "https://i.stack.imgur.com/l60Hf.png"
        }
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

    render_status = (order_status) => {
        let render_tag

        switch (order_status) {
            case 0: render_tag = <div> กำลังดำเนินการ </div>
                break;
            case 1: render_tag = <div> กำลังดำเนินการ </div>
                break;
            case 2:
                render_tag = <div> กำลังดำเนินการ </div>
                break;
            case 3:
                render_tag = <div> สำเร็จแล้ว </div>
                break;
            default:
                render_tag = <div> เกิดข้อผิดพลาด </div>
                break;
        }
        return render_tag
    }

    componentWillMount() {
        this.get_order()
        this.get_user()
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

    get_order = async () => {
        try {
            await get('trader/get_order', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        order: result.result,
                        search_order: result.result,
                        render_history: 1
                    })

                    setTimeout(() => {
                        console.log("get_product1", result.result)
                    }, 500)
                } else {
                    window.location.href = "/product_information";
                    alert(result.error_message)
                }
            });
        } catch (error) {
            alert("get_cart_trader" + error);
        }
    }

    sum_price = (data_price) => {
        let sum = 0;
        data_price.map((element) => {
            sum += (element.price * element.amount)
        })
        return sum;

    }


    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>ประวัติการซื้อ</h2>
                    </div>
                </div>


                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-4">
                        <input type="search" placeholder="ค้นหา" onChange={this.filterID} />
                    </div>
                    <div className="col-4">
                        <input type="date" name="date" placeholder="ค้นหา" onChange={this.filterDate} />
                    </div>
                    <div className="col-2"></div>
                </div>

                <div className="Row">
                    <div className="col-2"></div>

                    <div className="col-8">
                        <table style={{ textAlign: "center" }}>
                            <tr>
                                <th>รหัสใบสั่งซื้อ</th>
                                <th>วันที่</th>
                                <th>สถานะการสั่งซื้อ</th>
                                <th>ยอดการสั่งซื้อ</th>
                                <th>รายละเอียด</th>
                            </tr>
                            {
                                this.state.search_order ?
                                    this.state.search_order.map((element, index) => {
                                        return (
                                            <tr>
                                                <td>{element.order_id}</td>
                                                <td>{moment(element.order_date).utc().format("DD/MM/YYYY, HH:mm")}</td>
                                                <td>{this.render_status(element.order_status)}</td>
                                                <td>{addComma(this.sum_price(element.detail))} บาท</td>
                                                <td><NavLink to={"/T_Buying/order?order_id=" + element.order_id} style={{ textDecoration: "none" }}><button className="BTN_Detail" style={{ marginTop: "5px" }}>รายละเอียด</button></NavLink></td>
                                            </tr>
                                        )
                                    })
                                    :
                                    this.state.order.map((element, index) => {
                                        return (
                                            <tr>
                                                <td>{element.order_id}</td>
                                                <td>{moment(element.order_date).utc().format("DD/MM/YYYY, HH:mm")}</td>
                                                <td>{this.render_status(element.order_status)}</td>
                                                <td>{addComma(this.sum_price(element.detail))} บาท</td>
                                                <td><NavLink to={"/T_Buying/order?order_id=" + element.order_id} style={{ textDecoration: "none" }}><button className="BTN_Detail" style={{ marginTop: "5px" }}>รายละเอียด</button></NavLink></td>
                                            </tr>
                                        )
                                    })
                            }
                        </table>
                    </div>
                </div>

                <div className="col-2"></div>
            </div>
        )
    }
}
export default T_Buying;