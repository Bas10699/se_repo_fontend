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
            get_order: [],
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
                    <div className="col-8">
                        <table>
                            <tr>
                                <th>ลำดับ</th>
                                <th>วันที่</th>
                                <th>รหัสใบสั่งซื้อ</th>
                                <th>สถานะ</th>
                                <th>ชื่อ</th>
                                <th></th>
                            </tr>
                            {this.state.get_order.map((element, index) => {
                                return (
                                    <tr>
                                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                                        <td style={{ textAlign: "center" }}>{moment(element.order_date).utc().format("DD/MM/YYYY, HH:mm")}</td>
                                        <td style={{ textAlign: "center" }}>{element.order_id}</td>
                                        <td style={{ textAlign: "center" }}>{this.render_status(element.order_status)}</td>
                                        <td style={{ textAlign: "center" }}>{element.trader_id}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <NavLink to={"/M_Order/order?order_id=" + element.order_id} style={{textDecoration:"none"}}><button className="BTN_Detail">รายละเอียด</button></NavLink>
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        )
    }
}
export default M_Order;