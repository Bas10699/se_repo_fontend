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
            date_proof: null,
            time_proof: null,
            open: false,
            photo_profile: "https://i.stack.imgur.com/l60Hf.png",
            tag0: "https://image.flaticon.com/icons/svg/1161/1161832.svg",
            tag1: "https://image.flaticon.com/icons/svg/1161/1161833.svg",
            tag_default: "https://image.flaticon.com/icons/svg/1161/1161830.svg",
            default_image: 'https://www.lamonde.com/pub/media/catalog/product/placeholder/default/Lamonde_-_Image_-_No_Product_Image_4.png',
            image_payment: 'https://www.ahvc.com.sg/wp/wp-content/uploads/2016/07/default_image-800x800.png'
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
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
                <div className='_Card'>
                    <div className="Row">
                        <div className="col-12">
                            <h4>&nbsp; สถานะการสั่งซื้อ : รอการยืนยันการสั่งซื้อ</h4>
                            <h5>&nbsp; รอ SE กลาง ยืนยันการสั่งซื้อ และส่งใบแจ้งหนี้กลับมา</h5>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-5"></div>
                        <div className="col-2"><PdfInvoice data={this.state.order} /></div>
                        <div className="col-5"></div>
                    </div>
                </div>

                break;

            case 1: render_show =
                <div className='_Card'>
                    <div className="Row">
                        <div className="col-12">
                            <h4>&nbsp; สถานะการสั่งซื้อ : รอการยืนยันการชำระเงิน</h4>
                            <h5>&nbsp; กรุณาชำระเงินผ่าน {this.state.invoice_detail.BankName} {this.state.invoice_detail.BankNo} {this.state.invoice_detail.BankAccountName}</h5>
                            <h5>&nbsp; ก่อนวันที่ {moment(this.state.invoice.date_send).utc().add('years', 543).format("DD/MM/YYYY")} &nbsp; เมื่อโอนเงินแล้วให้ยืนยันและส่งหลักฐานการชำระเงิน </h5>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-6"><PdfInvoice data={this.state.invoice} /></div>
                        <div className="col-6">
                            <button className='BTN_CONFIRM' onClick={() => this.onOpenModal()}>แจ้งชำระเงิน</button>
                        </div>
                    </div>
                </div>
                break;

            case 2: render_show =
                <div className='_Card'>
                    <div className="Row">
                        <div className="col-12">
                            <h4>&nbsp; สถานะการสั่งซื้อ : รอ SE กลางตรวจสอบการโอนเงิน</h4>
                            <h5>&nbsp; รอ SE กลาง ตรวจสอบการโอนเงิน หลังจากตรวจสอบเรียบร้อยจะส่งใบเสร็จกลับมา</h5>
                        </div>
                    </div>
                    {/* <div className="Row">
                        <div className="col-6"><PdfInvoice data={this.state.invoice} /></div>
                        <div className="col-6">
                            <button className='BTN_CONFIRM' onClick={() => this.onOpenModal()}>แจ้งชำระเงิน</button>
                        </div>
                    </div> */}
                </div>

                break;

            case 3: render_show =
                <div className='_Card'>
                    <div className="Row">
                        <div className="col-12">
                            <h4>&nbsp; สถานะการสั่งซื้อ : เรียบร้อย</h4>

                        </div>
                    </div>
                    {/* <div className="Row">
                        <div className="col-6"><PdfInvoice data={this.state.invoice} /></div>
                        <div className="col-6">
                            <button className='BTN_CONFIRM' onClick={() => this.onOpenModal()}>แจ้งชำระเงิน</button>
                        </div>
                    </div> */}
                </div>
                break;

            default: render_show =
                <div className='_Card'>
                    <div className="Row">
                        <div className="col-12">
                            <h4>&nbsp; สถานะการสั่งซื้อ : เกิดข้อผิดพลาด</h4>

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

    add_proof_payment = async () => {
        let payment = {
            order_id: this.state.order.order_id,
            date_proof: this.state.date_proof,
            time_proof: this.state.time_proof,
            image_proof: this.state.image_payment,
        }
        try {
            await post(payment, 'trader/add_proof_of_payment_trader', user_token).then((result) => {
                if (result.success) {
                    window.location.reload()
                    setTimeout(() => {
                        console.log('add_proof_of_payment_trader', result.result)
                    }, 500)
                }
            })
        } catch (error) {
            alert('add_proof_payment: ' + error)
        }
    }

    sum_price = (data_price) => {
        let sum = 0;
        data_price.map((element) => {
            sum += (element.price * element.amount)
        })
        return sum;

    }
    uploadpicture = (e) => {

        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) {

        } else {
            reader.readAsDataURL(file)

            reader.onloadend = () => {
                console.log("img", reader.result)
                this.setState({
                    image_payment: reader.result,
                });
            }
        }

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

                <Timeline status={this.state.order.order_status} order={this.state.order} invoice={this.state.invoice} />

                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">{this.render_status(this.state.order.order_status)}</div>
                    <div className="col-2"></div>
                </div>





                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <h3 style={{ textAlign: "center" }}>รายการสั่งซื้อ</h3>
                        <table style={{ textAlign: "center" }}>
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
                                            <td>{element_plant.image ? <img alt="Product" className="Product" src={ip + element_plant.image} /> : <img alt="Product" className="Product" src={this.state.default_image} />}</td>
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

                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="Row" style={{ width: "500px" }}>
                        <div className="col-1" />
                        <div className="col-10">
                            <h3 style={{ textAlign: "center" }}>แจ้งการชำระเงิน</h3>
                            <h4>อ้างอิงถึงใบสั่งซื้อเลขที่ : {this.state.order.order_id}</h4>
                            <h4>โอนเงินไปในบัญชี : {this.state.invoice_detail.BankNo} {this.state.invoice_detail.BankName} {this.state.invoice_detail.BankAccountName} </h4>
                            <h4 style={{ color: "red" }}>ยอดคำสั่งซื้อทั้งหมด {addComma(this.sum_price(this.state.detail))} บาท</h4>

                            <h4>เวลาที่โอนเงินวันที่โอนเงิน</h4>
                            <input type="date" name="date_send" id='date_proof' onChange={this.handleChange} />
                            <h4>เวลาที่โอนเงิน</h4>
                            <input type="time" name="time" id='time_proof' onChange={this.handleChange} />
                            <h4>แนบหลักฐานการโอนเงิน</h4>
                            <div>
                                <input type="file"
                                    onChange={(e) => this.uploadpicture(e)} />
                            </div>
                            <img src={this.state.image_payment}
                                style={{ width: "150px", display: "block", marginLeft: "auto", marginRight: "auto", marginBottom:"20px" }} alt="หลักฐานการโอน" />
                            
                        </div>
                        <div className="col-1" />
                        
                    </div>
                    <div className="Row">
                        <div className="col-6"><button className="BTN_PDF"  onClick={() => { this.onCloseModal() }}>ยกเลิก</button></div>
                        <div className="col-6"><button className='BTN_CONFIRM' onClick={() => { if (window.confirm('ยืนยันการชำระเงิน ?')) { this.add_proof_payment() }; }}>ส่งหลักฐานการโอน</button></div>
                    </div>
                </Modal>
            </div >
        )
    }
}
export default BuyingDetail;