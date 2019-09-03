//รายละเอียดคำสั่งซื้อสินค้า SE-M ซื้อของจาก SE-S
import React, { Component } from 'react';
import { post } from '../Support/Service';
import { user_token, addComma } from '../Support/Constance';
import queryString from 'query-string';
import moment from 'moment'
import Timeline from 'react-time-line'
// import PdgOrder from './PdfOrder'
// import FrequencyPlant from './frequency_plant'
// import HTimeline from '../Timeline';

const events = [

    { ts: "2562-08-23T13:22:46.587Z", text: 'ออกใบคำสั่งซื้อ' },
];

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
            await post(params, 'neutrally/get_order_info', user_token).then((result) => {
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

    // sum_price = (data_price) => {
    //     let sum = 0;
    //     data_price.map((element) => {
    //         sum += (element.price * element.amount)
    //     })
    //     return sum;

    // }

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
                    {/* เริ่ม */}
                    <div className="col-6">
                        <h4 style={{ textAlign: "right", marginRight: "10px" }}>รหัสใบสั่งซื้อ</h4>
                        <h4 style={{ textAlign: "right", marginRight: "10px" }}>วันที่ใบสั่งซื้อ</h4>
                        <h4 style={{ textAlign: "right", marginRight: "10px" }}>ผู้ซื้อ</h4>
                    </div>
                    <div className="col-2">
                        <h4 style={{ textAlign: "left" }}>{this.state.order.order_id}</h4>
                        <h4 style={{ textAlign: "left" }}>{moment(this.state.order.order_date).utc().format("DD/MM/YYYY")}</h4>
                        <h4 style={{ textAlign: "left" }}>{this.state.order.name} {this.state.order.lastname}</h4>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <Timeline items={events} />
                    </div>
                    <div className="col-4"></div>
                </div>


                {/* <PdgOrder data={this.state.order} /> */}

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
                                                <img alt="Product" />
                                            </div>
                                            <div className="col-10">
                                                <h4>{element_plant.plant_name}</h4>
                                                <button className="BTN_AddCart" style={{width:"250px", float:"right",marginTop:"-75px"}}>ทำการสั่งซื้อวัตถุดิบจาก SE ย่อย</button>
                                                <div className="Row" style={{ marginTop: "-30px" }}>
                                                    <div className="col-4">
                                                        <h4>จำนวนที่สั่ง {addComma(element_plant.amount)} กิโลกรัม</h4>
                                                    </div>
                                                    <div className="col-4">
                                                        <h5>ราคาต่อหน่วย {element_plant.price} บาท</h5>
                                                    </div>
                                                    <div className="col-3">
                                                        <h4 style={{ textAlign: "right" }}>รวม {addComma(element_plant.price * element_plant.amount)} บาท</h4>
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
                                        <div className="col-9">
                                            <h4>ยอดคำสั่งซื้อทั้งหมด</h4>
                                        </div>
                                        <div className="col-3">
                                            {/* <h4 style={{ color: "red" }}>{addComma(this.sum_price(this.state.cart_product))} บาท</h4> */}
                                            <h4 style={{ color: "red" ,textAlign: "right" }}>ราคารวม บาท</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-2"></div>
            {/*     </div >
            {this.state.num ? <FrequencyPlant data_plant={this.state.plant} /> : ''} 
            </div > */}
            </div>
            
        )
    }
}
export default OrderDetail;