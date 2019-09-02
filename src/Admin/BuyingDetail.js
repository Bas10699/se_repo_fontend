//รายละเอียดการซื้อสินค้า
import React, { Component } from 'react';
import Timeline from 'react-time-line'
import { user_token, addComma } from '../Support/Constance';
import { get, post } from '../Support/Service';
import queryString from 'query-string';
import moment from 'moment'
import PDF from '../Support/PDF'
import { NavLink } from 'react-router-dom'

const events = [

    { ts: "2562-09-02T12:22:46.587Z", text: 'ใบเเจ้งหนี้' },
    { ts: "2562-09-01T12:22:46.587Z", text: 'ยืนยันคำสั่งซื้อ' },
    { ts: "2562-09-01T13:22:46.587Z", text: 'ออกใบคำสั่งซื้อ' },
];

class BuyingDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            order: [],
            detail: [],
            plant: [],
            data: [],
            data_price:[],
            cart_product:[],
            photo_profile: "https://i.stack.imgur.com/l60Hf.png",
            tag0: "https://image.flaticon.com/icons/svg/1161/1161832.svg",
            tag1: "https://image.flaticon.com/icons/svg/1161/1161833.svg",
            tag_default: "https://image.flaticon.com/icons/svg/1161/1161830.svg"
        }
    }


    render_status = (order_status) => {
        let render_tag

        switch (order_status) {
            case 0:
                render_tag = <div>
                    <img className="tag" src={this.state.tag0} alt="Status" />
                    <div className="FontWarning" > กำลังดำเนินการ </div>
                </div>
                break;
            case 1:
                render_tag = <div>
                    <img className="tag" src={this.state.tag1} alt="Status" />
                    <div className="FontSuccess"> สำเร็จแล้ว </div>
                </div>
                break;
            default:
                render_tag = <div>
                    <img className="tag" src={this.state.tag_default} alt="Status" />
                    <div className="FontDanger"> เกิดข้อผิดพลาด </div>
                </div>
                break;
        }
        return render_tag
    }


    componentWillMount() {
        this.get_order()
    }

    get_order = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        try {
            await post(params, 'trader/get_order_info', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        order: result.result,
                        detail: result.result.detail,
                        plant: result.result.plant,
                    })
                    setTimeout(() => {
                        console.log("get_product1", result.result)
                    }, 500)
                } else {
                    window.location.href = "/manage_order";
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
                        <h2 style={{ textAlign: "center" }}>รายละเอียดใบซื้อสินค้า {this.state.order.order_id}</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-2"></div>
                    {/* เริ่ม */}
                    <div className="col-6">
                        <h4 style={{ textAlign: "right" }}>รหัสใบสั่งซื้อ</h4>
                        <h4 style={{ textAlign: "right" }}>วันที่ใบสั่งซื้อ</h4>
                    </div>
                    <div className="col-2">
                        <h4 style={{ textAlign: "right" }}>{this.state.order.order_id}</h4>
                        <h4 style={{ textAlign: "right" }}>{moment(this.state.order.order_date).utc().add('years', 543).format("DD/MM/YYYY")}</h4>
                    </div>
                </div>



                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <PDF data={this.state.order}/>
                    </div>
                    <div className="col-2"></div>
                </div>



                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <Timeline items={events} />
                    </div>
                    <div className="col-2"></div>
                </div>



                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <h3 style={{ textAlign: "center" }}>รายการสั่งซื้อ</h3>

                        {
                            this.state.detail.map((element_plant, index) => {
                                return (
                                    <div className="BuyDetailCard">
                                        <div className="Row">
                                            <div className="col-2">
                                                <img alt="Product"/>
                                            </div>
                                            <div className="col-10">
                                                <h4>{element_plant.plant_name}</h4>
                                                <div className="Row" style={{marginTop:"-30px"}}>
                                                    <div className="col-4">
                                                        <h4>จำนวนที่สั่ง {addComma(element_plant.amount)} กิโลกรัม</h4>
                                                    </div>
                                                    <div className="col-4">
                                                        <h5>ราคาต่อหน่วย {element_plant.price} บาท</h5>
                                                    </div>
                                                    <div className="col-3">
                                                        <h4 style={{textAlign:"right"}}>รวม {addComma(element_plant.price * element_plant.amount)} บาท</h4>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }



                        <div className="TotalCart">
                            <div className="Row">
                                <div className="col-2">
                                </div>
                                <div className="col-1"></div>
                                <div className="col-9">

                                    <div className="Row">
                                        <div className="col-10">
                                            <h4>ยอดคำสั่งซื้อทั้งหมด</h4>
                                        </div>
                                        <div className="col-2">
                                        <h4 style={{ color: "red" }}>{addComma(this.sum_price(this.state.cart_product))} บาท</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div >
            </div >
        )
    }
}
export default BuyingDetail;