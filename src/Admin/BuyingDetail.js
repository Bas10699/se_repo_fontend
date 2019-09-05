//รายละเอียดการซื้อสินค้า
import React, { Component } from 'react';
import Timeline from '../Support/Timeline'
import { user_token, addComma } from '../Support/Constance';
import { get, post, ip } from '../Support/Service';
import queryString from 'query-string';
import moment from 'moment'
import PdfOrder from '../Support/PdfOrder'
import PdfInvoice from '../Support/PdfInvoice'
import { NavLink } from 'react-router-dom'


class BuyingDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            order: [],
            detail: [],
            plant: [],
            data: [],
            data_price: [],
            cart_product: [],
            invoice:[],
            photo_profile: "https://i.stack.imgur.com/l60Hf.png",
            tag0: "https://image.flaticon.com/icons/svg/1161/1161832.svg",
            tag1: "https://image.flaticon.com/icons/svg/1161/1161833.svg",
            tag_default: "https://image.flaticon.com/icons/svg/1161/1161830.svg",
            default_image: 'https://www.lamonde.com/pub/media/catalog/product/placeholder/default/Lamonde_-_Image_-_No_Product_Image_4.png'

        }
    }


    render_status = (order_status) => {
        let render_show
        switch (order_status) {
            case 0: render_show =
                <div className="Row">
                    <div className='_Card'>
                        <div className="Row">
                            <div className="col-10">
                                <h4 >&nbsp; สถานะการสั่งซื้อ : รอการยืนยันการสั่งซื้อ </h4>
                                <p>&nbsp;  รอ SE กลาง ยืนยันการสั่งซื้อ และส่งใบแจ้งหนี้กลับมา</p>
                            </div>
                            <div className="col-2">
                                <PdfOrder data={this.state.order} />
                                <button className='BTN_CONFIRM' onClick={() => this.setState({ OpenComfrim: true })}>ยืนยันการสั่งซื้อ</button>
                            </div>
                        </div>
                    </div>
                </div>
                break;

            case 1: render_show =
                <div className="Row">
                    <div className='_Card'>
                        <div className="Row">
                            <div className="col-10">
                                <h4>&nbsp; สถานะการสั่งซื้อ : รอผู้ประกอบการดำเนินการยืนยันการชำระเงิน</h4>
                                <p>&nbsp; เมื่อโอนเงินแล้วให้ยืนยันและส่งหลักฐานการชำระเงิน </p>
                            </div>
                            <div className="col-2">
                                <PdfInvoice data={this.state.order} />
                                <button className='BTN_CONFIRM' onClick={() => this.setState({ OpenComfrim: true })}>ยืนยันการชำระเงิน</button>
                            </div>
                        </div>
                    </div>
                </div>
                break;

            case 2: render_show =
            
                <div className="Row">
                    <div className='_Card'>
                        <div className="Row">
                            <div className="col-10">
                                <h4>&nbsp; สถานะการสั่งซื้อ : รอผู้ประกอบการยืนยันการชำระเงิน</h4>
                                <p>&nbsp; </p>
                            </div>
                            <div className="col-2">
                                <PdfInvoice data={this.state.order} />
                            </div>
                        </div>
                    </div>
                </div>
                break;

            case 3: render_show =
                <div className="Row">
                    <div className='_Card'>
                        <div className="Row">
                            <div className="col-10">
                                <h4>&nbsp; สถานะการสั่งซื้อ : รอผู้ประกอบการยืนยันการชำระเงิน</h4>
                                <p>&nbsp; </p>
                            </div>
                            <div className="col-2">
                                <PdfInvoice data={this.state.order} />
                            </div>
                        </div>
                    </div>
                </div>
                break;

            default: render_show =
                <div className="Row">
                    <div className='_Card'>
                        <div className="Row">
                            <div className="col-10">
                                <h4>&nbsp; สถานะการสั่งซื้อ : เกิดข้อผิดพลาด</h4>
                                <p>&nbsp; </p>
                            </div>
                            <div className="col-2">
                                <PdfInvoice data={this.state.order} />
                            </div>
                        </div>
                    </div>
                </div>
                break;
        }
        return render_show;
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
    get_invoice = async ()=>{
        let url = this.props.location.search;
        let params = queryString.parse(url);
        try {
            await post(params, 'trader/get_invoice_trader', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        invoice: result.result,
                        
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



                {/* <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <PdfOrder data={this.state.order} />
                    </div>
                    <div className="col-2"></div>
                </div> */}

                <Timeline />

                {this.render_status(this.state.order.order_status)}



                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <h3 style={{ textAlign: "center" }}>รายการสั่งซื้อ</h3>
                        <table style={{textAlign:"center"}}>
                            <tr>
                                <th>รหัสสินค้า</th>
                                <th>รูป</th>
                                <th>ชื่อสินค้า</th>
                                <th>จำนวนที่สั่งซื้อ (กิโลกรัม)</th>
                                <th>ราคาต่อหน่วย (บาท)</th>
                                <th>ราคารวม (บาท)</th>
                            </tr>
                            {
                                this.state.detail.map((element_plant, index) => {
                                    return (
                                        <tr>
                                            <td>PCODE-{element_plant.plant_id}</td>
                                            <td>{element_plant.image ? <img alt="Product" className="Product"  src={ip + element_plant.image} /> : <img alt="Product" className="Product"  src={this.state.default_image} />}</td>
                                            <td>{element_plant.plant_name}</td>
                                            <td>{addComma(element_plant.amount)}</td>
                                            <td>{element_plant.price}</td>
                                            <td>{addComma(element_plant.price * element_plant.amount)}</td>
                                        
                                        </tr>
                                               
                                    )
                                })
                            }
                        </table>




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
                                            <h4 style={{ color: "red" }}>{addComma(this.sum_price(this.state.detail))} บาท</h4>
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