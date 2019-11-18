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
import StarRatingComponent from 'react-star-rating-component';

import DateSelect from '../Support/dateSelect'

class BuyingDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rating: 1,
            logistic: '',
            comfirmLog: 0,
            order: [],
            detail: [],
            plant: [],
            data: [],
            data_price: [],
            cart_product: [],
            invoice_detail: [],
            invoice: [],
            payment: [],
            date_proof: null,
            time_proof: null,
            open: false,
            review: false,
            OpenProofPaymet: false,
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

    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false, OpenProofPaymet: false, review: false });

    };

    confirm = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        const object = {
            order_id: params.order_id,
            order_status: 4
        }
        try {
            await post(object, 'trader/finish_trader_order', user_token).then((result) => {
                if (result.success) {
                    window.location.reload()
                    setTimeout(() => {
                        console.log("confirm_payment", result.result)
                    }, 500)
                } else {
                    // window.location.href = "/";
                    alert(result.error_message)
                    console.log("confirm_payment_err", result.result)
                }
            })
        }
        catch (error) {
            alert("confirm_payment" + error);
        }
    }

    add_review = async () => {
        alert(this.state.rating + " : " + this.state.review)
        let object = {
            rating_score: this.state.rating,
            review_detail: this.state.review
        }
        try {
            await post(object, 'trader/add_review_order', user_token).then((result) => {
                if (result.success) {
                    alert(result.message)
                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('add_review: ' + error)
        }
    }

    render_status = (order_status) => {
        let render_show
        switch (order_status) {
            case 0: render_show =
                <div>
                    <div className="Row">
                        <div className="col-12">
                            <div className='_Card'>
                                <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อ</h3>
                                <h5>รอ SE กลาง ยืนยันการสั่งซื้อ และส่งใบแจ้งหนี้กลับมา</h5>
                            </div>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-12" style={{ marginLeft: "50px" }}><PdfOrder data={this.state.order} /></div>
                    </div>
                </div>

                break;

            case 1: render_show =
                <div>
                    <div className="Row">
                        <div className="col-12">
                            <div className='_Card'>
                                <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อ</h3>
                                <h4 style={{ margin: "0" }}>รอการยืนยันการชำระเงิน</h4>
                                <h5 style={{ margin: "0" }}>กรุณาชำระเงินผ่าน :
                            {console.log("accountBank", this.state.invoice_detail)}
                                    {this.state.invoice_detail.map((element_bank, index) => {
                                        return (
                                            <div>
                                                {index + 1}. {element_bank.bankName} {element_bank.bankNo} {element_bank.bankAccount}
                                            </div>
                                        )
                                    })}
                                </h5>
                                <h5>ก่อนวันที่ {moment(this.state.invoice.date_send).utc().format("DD/MM/YYYY")} เมื่อโอนเงินแล้วให้ยืนยันและส่งหลักฐานการชำระเงิน </h5>
                            </div>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-12" style={{ marginLeft: "50px" }}><PdfInvoice data={this.state.invoice} order={this.state.order} />
                            <button className='BTN_CONFIRM' onClick={() => this.onOpenModal()} style={{ marginTop: "15px" }}>แจ้งชำระเงิน</button>
                        </div>
                    </div>
                </div>
                break;

            case 2: render_show =
                <div>
                    <div className="Row">
                        <div className="col-12">
                            <div className='_Card'>
                                <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อ</h3>
                                <h5>รอ SE กลาง ตรวจสอบการโอนเงิน</h5>
                            </div>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-12" style={{ marginLeft: "50px" }}>
                            <button onClick={() => this.setState({ OpenProofPaymet: true })}
                                className="BTN_PDF">ดูหลักฐานการโอนเงิน</button>
                        </div>
                    </div>
                </div>

                break;

            case 3:
                render_show =
                    <div>
                        <div className="Row">
                            <div className="col-12">
                                <div className='_Card'>
                                    <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อ</h3>
                                    <h4>รอ SE กลาง จัดส่งสินค้า</h4>

                                </div>
                            </div>
                        </div>

                        <div className="Row">
                            <div className="col-12" style={{ marginLeft: "50px" }}>
                                {/* {this.state.comfirmLog == 0 ? <button className='BTN_CONFIRM'
                                    onClick={() => this.setState({ comfirmLog: 1 })}
                                >ยืนยันการขนส่ง</button> : null} */}

                            </div>
                        </div>
                    </div >
                break;

            // case 4: render_show =
            //     <div className='_Card'>
            //         <div className="Row">
            //             <div className="col-12">
            //                 <h4>สถานะการสั่งซื้อ : ตรวจสอบสินค้า</h4>
            //             </div>
            //         </div>
            //         <div className="Row">
            //             <div className="col-6">
            //                 <button className='BTN_CONFIRM'>ยืนยันได้รับสินค้า</button>
            //             </div>
            //         </div>
            //     </div>
            //     break;

            case 4: render_show =
                <div>
                    <div className="Row">
                        <div className="col-12">
                            <div className='_Card'>

                                <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อ</h3>
                                <h4>ยืนยันได้รับสินค้า</h4>

                            </div>
                        </div>
                    </div>
                    <div className="Row">
                        {/* <div className="col-6"><PdfInvoice data={this.state.invoice} /></div> */}
                        <div className="col-12" style={{ marginLeft: "50px" }}>
                            <button className='BTN_CONFIRM' onClick={() => this.setState({ review: true })}>ยืนยันได้รับสินค้า</button>
                        </div>
                    </div>
                </div>
                break;

            case 5: render_show =
                <div>
                    <div className="Row">
                        <div className="col-12">
                            <div className='_Card'>

                                <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อ</h3>
                                <h4>เรียบร้อย</h4>

                            </div>
                        </div>
                    </div>
                    {/* <div className="Row">
                        <div className="col-12" style={{ marginLeft: "50px" }}>
                            <button className='BTN_CONFIRM' onClick={() => this.setState({ review: true })}>ยืนยันได้รับสินค้า</button>
                        </div>
                    </div> */}
                </div>
                break;

            case -1: render_show =
                <div className='_Card'>
                    <div className="Row">
                        <div className="col-12">
                            <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อ</h3>
                            <h4 style={{ color: 'red' }}>ถูกยกเลิก</h4>

                        </div>
                    </div>
                </div>
                break;



            default: render_show =
                <div className='_Card'>
                    <div className="Row">
                        <div className="col-12">
                            <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อ</h3>
                            <h4>เกิดข้อผิดพลาด</h4>

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
                    if (result.result.order_status > 1) {
                        this.get_proof_of_payment()
                    }
                    setTimeout(() => {
                        console.log("get_order_info", result.result)
                    }, 500)
                } else {
                    window.location.href = "/T_Buying";
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
        // alert('dd')
        try {
            await post(payment, 'trader/add_proof_of_payment_trader', user_token).then((result) => {
                if (result.success) {
                    window.location.reload()
                    setTimeout(() => {
                        console.log('add_proof_of_payment_trader', result.result)
                    }, 500)
                }
                else{
                    alert(result.error_message)
                }
            })
        } catch (error) {
            alert('add_proof_payment: ' + error)
        }
    }
    get_proof_of_payment = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        try {
            await post(params, 'trader/get_proof_of_payment_trader', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        payment: result.result,
                    })
                    setTimeout(() => {
                        console.log("get_proof_of_payment_trader", result.result)
                    }, 500)
                } else {
                    // window.location.href = "/sales_sum";
                    alert(result.error_message)
                    console.log("get_proof_of_payment_trader", result.result)
                }
            });
        } catch (error) {
            alert("get_proof_of_payment_trader" + error);
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

    callbackFunction = (childData) => {
        this.setState({ date_proof: childData })
        // alert(childData)
    }


    render() {
        const { rating } = this.state;
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
                        <h4 style={{ textAlign: "right", margin: "0" }}>รหัสใบสั่งซื้อ</h4>
                        <h4 style={{ textAlign: "right", margin: "0" }}>วันที่ใบสั่งซื้อ</h4>
                    </div>
                    <div className="col-2">
                        <h4 style={{ textAlign: "right", margin: "0" }}>{this.state.order.order_id}</h4>
                        <h4 style={{ textAlign: "right", margin: "0" }}>{moment(this.state.order.order_date).utc().format("DD/MM/YYYY")}</h4>
                    </div>
                </div>


                <Timeline status={this.state.order.order_status} order={this.state.order} detail={this.state.detail} invoice={this.state.invoice} payment={this.state.payment} />

                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-6">
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
                    <div className="col-5">{this.render_status(this.state.order.order_status)}</div>

                </div>


                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="Row" style={{ width: "500px" }}>
                        <div className="col-1" />
                        <div className="col-10">
                            <h3 style={{ textAlign: "center" }}>แจ้งการชำระเงิน</h3>
                            <h4 style={{ margin: "0" }}>อ้างอิงถึงใบสั่งซื้อเลขที่ : {this.state.order.order_id}</h4>
                            <h5 style={{ margin: "0" }}>
                                โอนเข้าบัญชี :
                            <select style={{ fontFamily: "fc_lamoonregular", fontSize: "20px" }} onChange={(e)=>this.setState({idd:e.target.value})}>
                                    {this.state.invoice_detail ?
                                        this.state.invoice_detail.map((element, index) => {
                                            return (
                                                <option value={index}>{element.bankName}</option>
                                            )
                                        }) : null}
                                </select></h5>
                                    <h5>{this.state.invoice_detail[this.state.idd]}</h5>
                            <h4 style={{ color: "red", marginTop: "10px" }}>ยอดคำสั่งซื้อทั้งหมด {addComma(this.sum_price(this.state.detail))} บาท</h4>
                            <div className="Row">
                                <div className="col-12">
                                    <h4 style={{ marginTop: "0" }}>วันที่โอนเงิน</h4>
                                    {/* <input type="date" name="date_send" id='date_proof' onChange={this.handleChange} /> */}
                                    <DateSelect parentCallback={this.callbackFunction} />
                                </div>
                            </div>
                            <div className="Row">
                                {/* <div className="col-1"></div> */}
                                <div className="col-5">
                                    <h4 style={{ marginTop: "0" }}>เวลาที่โอนเงิน</h4>
                                    <input type="time" name="time" id='time_proof' onChange={this.handleChange} />
                                </div>
                            </div>

                            <h4 style={{ margin: "0" }}>แนบหลักฐานการโอนเงิน</h4>
                            <div>
                                <input type="file"
                                    onChange={(e) => this.uploadpicture(e)} />
                            </div>
                            <img src={this.state.image_payment}
                                style={{ width: "150px", display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "20px" }} alt="หลักฐานการโอน" />

                        </div>
                        <div className="col-1" />

                    </div>
                    <div className="Row">
                        <div className="col-12">
                            <button className="BTN_Cencle" style={{ width: "200px" }} onClick={() => { this.onCloseModal() }}>ยกเลิก</button>
                            <button className='BTN_CONFIRM' onClick={() => { if (window.confirm('ยืนยันการชำระเงิน ?')) { this.add_proof_payment() }; }}>ส่งหลักฐานการโอน</button></div>
                    </div>
                </Modal>

                <Modal open={this.state.OpenProofPaymet} onClose={this.onCloseModal}>
                    <div className="Row">
                        <div className="col-12" >
                            <h3 style={{ textAlign: "center" }}>รายละเอียดการชำระเงิน</h3>
                        </div>
                    </div>
                    <div className="Row" style={{ width: "800px" }}>
                        <div className="col-7" >
                            <a target="_blank" href={ip + this.state.payment.image_proof}>
                                <img src={ip + this.state.payment.image_proof}
                                    style={{ height: "100%", width: "80%", display: "block", marginLeft: "auto", marginRight: "auto", objectFit: "cover" }} alt="หลักฐานการโอน" />
                            </a>
                        </div>
                        <div className="col-5">

                            <h4>อ้างอิงถึงใบสั่งซื้อเลขที่ : {this.state.order.order_id} </h4>
                            <h4>อ้างอิงถึงใบแจ้งหนี้เลขที่ : {this.state.invoice.invoice_id}</h4>
                            <h4>วันที่กำหนดชำระเงิน : {moment(this.state.invoice.date_send).format('DD/MM/YYYY')}</h4>
                            <h4>วันที่ชำระเงิน : {moment(this.state.payment.date_proof).format('DD/MM/YYYY')} </h4>
                            <h4>เวลาที่ชำระเงิน : {this.state.payment.time_proof}</h4>
                            <h4>จำนวนเงิน : {addComma(this.sum_price(this.state.detail))} บาท</h4>

                        </div>
                    </div>
                </Modal>

                <Modal open={this.state.review} onClose={this.onCloseModal}>
                    <div className="Row">
                        <div className="col-12" >
                            <h3 style={{ textAlign: "center" }}>รีวิว</h3>
                        </div>
                    </div>
                    <div className="Row" style={{ width: "800px" }}>
                        <div className="col-12">
                            <h4 style={{ marginBottom: "0" }}>ให้คะเเนน : {rating}</h4>
                            <h2 style={{ margin: "0" }}><StarRatingComponent
                                name="rating"
                                id='rating'
                                editing={true}
                                starCount={5}
                                value={rating}
                                onChange={this.handleChange}
                                onStarClick={this.onStarClick.bind(this)}
                            /></h2>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-12">
                            <h4>แสดงความคิดเห็น</h4>
                            <textarea rows="4" cols="110" name="review" id="review" onChange={this.handleChange} />
                        </div>

                    </div>

                    <div className="Row">
                        <div className="col-12" >
                            <button className='BTN_CONFIRM' onClick={() => this.add_review()} >ยืนยัน</button>
                        </div>
                    </div>
                </Modal>
            </div >
        )
    }
}
export default BuyingDetail;