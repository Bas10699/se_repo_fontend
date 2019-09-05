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
import StepTimeline from '../Support/StepTimeline'
import Modal from 'react-responsive-modal'

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
            invoice_detail: [],
            invoice: [],
            open:false,
            photo_profile: "https://i.stack.imgur.com/l60Hf.png",
            tag0: "https://image.flaticon.com/icons/svg/1161/1161832.svg",
            tag1: "https://image.flaticon.com/icons/svg/1161/1161833.svg",
            tag_default: "https://image.flaticon.com/icons/svg/1161/1161830.svg",
            default_image: 'https://www.lamonde.com/pub/media/catalog/product/placeholder/default/Lamonde_-_Image_-_No_Product_Image_4.png'

        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });

    };

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
                                <h4>&nbsp; สถานะการสั่งซื้อ : รอการยืนยันการชำระเงิน</h4>
                                <p>&nbsp; กรุณาชำระเงินผ่าน {this.state.invoice_detail.BankName} {this.state.invoice_detail.BankNo} {this.state.invoice_detail.BankAccountName}</p>
                                <p>&nbsp; เมื่อโอนเงินแล้วให้ยืนยันและส่งหลักฐานการชำระเงิน </p>
                            </div>
                            <div className="col-2">
                                <PdfInvoice data={this.state.order} />
                                <button className='BTN_CONFIRM' onClick={() => this.onOpenModal()}>ยืนยันการชำระเงิน</button>
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
                    if (result.result.order_status > 0) {
                        this.get_invoice()
                    }
                    setTimeout(() => {
                        console.log("get_order_info", result.result)
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
    get_invoice = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        try {
            await post(params, 'trader/get_invoice_trader', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        invoice: result.result,
                        invoice_detail: result.result.invoice_detail

                    })
                    setTimeout(() => {
                        console.log("get_invoice_trade", result.result)
                    }, 500)
                } else {
                    window.location.href = "/manage_order";
                    alert(result.error_message)
                }
            });
        } catch (error) {
            alert("get_invoice_trade" + error);
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

                <Timeline status={this.state.order.order_status}/>
                {/* <StepTimeline step={this.state.order.order_status}/> */}

                {this.render_status(this.state.order.order_status)}



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
                                                {element_plant.image ? <img alt="Product" src={ip + element_plant.image} /> : <img alt="Product" src={this.state.default_image} />}
                                            </div>
                                            <div className="col-10">
                                                <h4>{element_plant.plant_name}</h4>
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
                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="Row">
                        <div className="col-1" />
                        <div className="col-10">
                            <h3 style={{ textAlign: "center" }}>รายละเอียดใบแจ้งหนี้</h3>
                            <h4>อ้างอิงถึงใบสั่งซื้อเลขที่ : {this.state.order.order_id}</h4>
                            <h4>ชำระเงินภายในวันที่</h4>
                            <input type="date" name="date_send" id="date_send" onChange={this.handleChange} style={{ marginTop: "-50px" }} />
                            <h4 style={{ marginTop: "-30px" }}>ข้อมูลการชำระเงิน</h4>
                            <p>ชื่อธนาคาร <input name="BankName" id="BankName" onChange={this.handleChange}></input></p>

                            <p>เลขบัญชีธนาคาร <input name="BankNo" id="BankNo" onChange={this.handleChange}></input></p>

                            <p>ชื่อบัญชีธนาคาร  <input name="BankAccountName" id="BankAccountName" onChange={this.handleChange}></input></p>

                            <textarea rows="4" cols="95" name="detail_send" id="detail_send" onChange={this.handleChange}
                                form="usrform" />
                            <button className="BTN_Signin" onClick={() => { this.add_invoice() }}>ออกใบแจ้งหนี้</button>
                            <button className="BTN_Signup" onClick={() => { this.onCloseModal() }}>ยกเลิก</button>

                        </div>
                        <div className="col-1" />
                    </div>
                </Modal>
            </div >
        )
    }
}
export default BuyingDetail;