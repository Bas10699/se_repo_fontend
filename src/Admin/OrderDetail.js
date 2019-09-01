//รายละเอียดคำสั่งซื้อสินค้า SE-M ซื้อของจาก SE-S
import React, { Component } from 'react';
import { get, post } from '../Support/Service';
import { user_token } from '../Support/Constance';
import queryString from 'query-string';
import moment from 'moment'
// import PdgOrder from './PdfOrder'
// import FrequencyPlant from './frequency_plant'
// import HTimeline from '../Timeline';

class OrderDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            num: false,
            order: [],
            detail: [],
            plant: null,
            data: [],
            photo_profile: "https://i.stack.imgur.com/l60Hf.png",
            tag0: "https://image.flaticon.com/icons/svg/1161/1161832.svg",
            tag1: "https://image.flaticon.com/icons/svg/1161/1161833.svg",
            tag_default: "https://image.flaticon.com/icons/svg/1161/1161830.svg"
        }
    }
    componentWillMount() {
        this.get_order()
    }

    get_order = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        try {
            await post(params, 'neutarlly/get_order_info', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        order: result.result,
                        detail: result.result.detail,
                    })
                    setTimeout(() => {
                        console.log("get_product1", result.result)
                    }, 500)
                } else {
                    // window.location.href = "/sales_sum";
                    // alert(result.error_message)
                    console.log("get_order", result.result)
                }
            });
        } catch (error) {
            alert("get_cart_trader" + error);
        }
    }



    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>รายละเอียดคำสั่งซื้อสินค้า {this.state.order.order_id}</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div>id order : {this.state.order.order_id}</div>
                        <div>ผู้สั่งซื้อ : {this.state.order.name} {this.state.order.lastname}</div>
                        <div>วันที่สั่งซื้อ : {moment(this.state.order.order_date).utc().format("DD/MM/YYYY, HH:mm")}</div>
                        {/* <PdgOrder data={this.state.order} /> */}
                        {/* <HTimeline /> */}
                        <div className="card">
                            <div className="container">
                                <h5>สถานะการสั่งซื้อ : รอยืนยันคำสั่งซื้อ</h5>
                                <p>รอตรวจสอบสินค้า และส่งใบแจ้งหนี้</p>
                                <button>ส่งใบแจ้งหนี้</button>
                            </div>
                        </div>
                        
                        <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>รายการ</h3>
                    </div>
                </div>
                        <table>
                            <tr>
                                <th>ลำดับ</th>
                                <th>รหัสวิตถุดิบ</th>
                                <th>ชื่อวัตถุดิบ</th>
                                <th>จำนวนที่สั่งซื้อ</th>
                                <th></th>
                            </tr>
                            {
                                this.state.detail.map((element_plant, index) => {
                                    return (
                                        <tr>
                                            <td style={{textAlign:"center"}}>{index + 1}</td>
                                            <td style={{textAlign:"center"}}>{element_plant.plant_id}</td>
                                            <td style={{textAlign:"left"}}>{element_plant.plant_name}</td>
                                            <td style={{textAlign:"center"}}>{element_plant.amount} กิโลกรัม</td>
                                            <td><button className="BTN_Detail" onClick={() => { this.setState({ num: true, plant: element_plant.plant_name }) }}>รายละเอียดวัตถุดิบ</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                    <div className="col-2"></div>
                </div>
                {/* {this.state.num ? <FrequencyPlant data_plant={this.state.plant} /> : ''} */}
            </div>
        )
    }
}
export default OrderDetail;