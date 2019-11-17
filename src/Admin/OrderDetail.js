//รายละเอียดคำสั่งซื้อสินค้า SE-M ซื้อของจาก SE-S
import React, { Component } from 'react';
import { get, post, ip } from '../Support/Service';
import { user_token, addComma } from '../Support/Constance';
import queryString from 'query-string';
import moment from 'moment'
import Timeline from '../Support/Timeline'
import PdfOrder from '../Support/PdfOrder'
import Modal from 'react-responsive-modal'
import PdfInvoice from '../Support/PdfInvoice'
import PdfBill from '../Support/PdfBill'
import Frequency from './Frequency'
import { NavLink } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import DateSelect from '../Support/dateSelect'


// import FrequencyPlant from './frequency_plant'
// import HTimeline from '../Timeline';


class OrderDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            num: false,
            order: [],
            detail: [],
            invoice: [],
            invoice_detail: [],
            plant: null,
            data: [],
            payment: [],
            get_user: [],
            OpenComfrim: false,
            OpenBill: false,
            detail_send: null,
            date_send: null,
            bank_information: [],
            BankAccountName: null,
            BankName: null,
            BankNo: null,
            logistic: 1,
            photo_profile: "https://i.stack.imgur.com/l60Hf.png",
            tag0: "https://image.flaticon.com/icons/svg/1161/1161832.svg",
            tag1: "https://image.flaticon.com/icons/svg/1161/1161833.svg",
            tag_default: "https://image.flaticon.com/icons/svg/1161/1161830.svg",
            default_image: 'https://www.lamonde.com/pub/media/catalog/product/placeholder/default/Lamonde_-_Image_-_No_Product_Image_4.png'
        }
    }



    componentWillMount() {
        this.get_user()
        this.get_order()
        this.setState({
            isMenuOpened: false
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleClick() {
        // toggles the menu opened state
        this.setState({ isMenuOpened: !this.state.isMenuOpened });
    }

    get_user = async () => {
        try {
            await get('user/get_user', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_user: result.result,
                        bank_information: result.result.bank_information
                    })

                    if (result.result.type_user === "2") {
                        this.get_demand_tarder()
                    }
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
        let url = this.props.location.search;
        let params = queryString.parse(url);
        const object = {
            order_id: params.aa
        }
        console.log('obj', object)
        try {
            await post(object, 'neutrally/get_order_info', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        order: result.result,
                        detail: result.result.detail,
                    })
                    if (result.result.order_status > 0) {
                        this.get_invoice()
                    }
                    if (result.result.order_status > 1) {
                        this.get_proof_of_payment()
                    }
                    setTimeout(() => {
                        console.log("get_order", result.result)
                    }, 500)
                } else {
                    window.location.href = "/M_Order";
                    alert(result.error_message)
                    // console.log("get_order", result.result)
                }
            });
        } catch (error) {
            alert("get_order" + error);
        }
    }

    get_invoice = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        const object = {
            order_id: params.aa
        }
        try {
            await post(object, 'trader/get_invoice_trader', user_token).then((result) => {
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

    add_invoice = async () => {
        let detail = this.state.bank_information
        let object = {
            order_id: this.state.order.order_id,
            date_send: this.state.date_send,
            detail: JSON.stringify(detail),
            status: 0,
            email: this.state.order.email
        }
        console.log("วันที่ส่ง", this.state.date_send)

        try {
            await post(object, 'neutrally/add_invoice_neutrally', user_token).then((result) => {
                if (result.success) {
                    const socket = socketIOClient(ip)
                    socket.emit('send-noti-se', this.state.order.order_id)
                    window.location.reload()
                }
                else {
                    alert(result.error_message)
                    console.log("get_order", result.result)
                }
            })
        }
        catch (error) {
            alert("add_invoice_neutrally" + error);
        }
    }

    get_proof_of_payment = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        const object = {
            order_id: params.aa
        }
        console.log('obj', object)
        try {
            await post(object, 'trader/get_proof_of_payment_trader', user_token).then((result) => {
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

    confirm_payment = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        const object = {
            order_id: params.aa,
            status: 3
        }
        try {
            await post(object, 'neutrally/update_status_order_trader', user_token).then((result) => {
                if (result.success) {
                    const socket = socketIOClient(ip)
                    socket.emit('confirm_payment', this.state.order.order_id)
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

    send_logistic = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        const object = {
            order_id: params.aa,
            status: 4
        }
        try {
            await post(object, 'neutrally/update_status_order_trader', user_token).then((result) => {
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

    cancel_order = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        this.state.detail.map((element)=>{
            element.status=-1
        })
        const object = {
            order_id: params.aa,
            detail:this.state.detail,
            status: -1
        }
        if (window.confirm('ยืนยันการยกเลิกคำสั่งซื้อ')) {
            try {
                await post(object, 'neutrally/cancel_order_trader', user_token).then((result) => {
                    if (result.success) {
                        window.location.reload()
                        setTimeout(() => {
                            console.log("cancel_order_trader", result)
                        }, 500)
                    } else {
                        // window.location.href = "/";
                        alert(result.error_message)
                        console.log("cancel_order_trader", result)
                    }
                })
            }
            catch (error) {
                alert("cancel_order_trader" + error);
            }
        }
    }

    sum_price = (data_price) => {
        let sum = 0;
        data_price.map((element) => {
            sum += (element.price * element.amount)
        })
        return sum;

    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false, OpenComfrim: false, OpenBill: false });

    };



    onOpenModalComfrim = () => {
        this.setState({ open: true });
    };
    callbackFunction = (childData) => {
        this.setState({ date: childData })
        // alert(childData)
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
                                <h5 style={{ margin: "0" }}>ต้องทำการสั่งซื้อวัตถุดิบ เเล้วจึงกดยืนยันการสั่งซื้อ<br />เพื่อออกใบเเจ้งหนี้ให้กับ {this.state.order.name} {this.state.order.last_name}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-12" style={{ marginLeft: "50px" }}>
                            <PdfOrder data={this.state.order} />
                            <button style={{ marginTop: "15px" }}
                                className='BTN_CONFIRM'
                                onClick={() => this.setState({ OpenComfrim: true })}>
                                ยืนยันการสั่งซื้อ
                            </button>
                        </div>
                    </div>
                </div>
                break;

            case 1: render_show =
                <div>
                    <div className="Row">
                        <div className="col-12">
                            <div className='_Card'>
                                <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อ</h3>
                                <h5>รอผู้ประกอบการดำเนินการยืนยันการชำระเงิน</h5>
                                {/* <h5>รอ SE กลาง ยืนยันการสั่งซื้อ และส่งใบแจ้งหนี้กลับมา</h5> */}
                            </div>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-12" style={{ marginLeft: "50px" }}><PdfInvoice data={this.state.invoice} /></div>
                        <button onClick={() => this.cancel_order()} style={{ marginRight: "100px" }}>ยกเลิกคำสั่งซื้อ</button>
                        {/* <div className="col-6">
                            <button
                                className='BTN_CONFIRM'
                                onClick={() => this.setState({ OpenComfrim: true })}>Activity</button></div> */}
                    </div>
                </div>
                break;

            case 2: render_show =
                <div>
                    <div className="Row">
                        <div className="col-12">
                            <div className='_Card'>

                                <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อ</h3>
                                <h5>ผู้ประกอบการชำระเงินแล้ว</h5>
                                <h5>รอ SE กลาง ออกใบเสร็จ</h5>
                            </div>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-12" style={{ marginLeft: "50px" }}>
                            <button className="BTN_PDF" onClick={() => this.setState({ OpenBill: true })}>ตรวจสอบหลักฐานการโอน</button>
                            {/* <PdfInvoice data={this.state.order} /> */}</div>
                    </div>
                </div>

                break;

            // case 3: render_show =
            //     <div className='_Card'>
            //         <div className="Row">
            //             <div className="col-12">
            //                 <h4>สถานะการสั่งซื้อ : จัดส่งสินค้าเรียบร้อย รอผู้ประกอบการดำเนินการยืนยันตรวจสอบสินค้า</h4>
            //             </div>
            //         </div>
            //     </div>
            //     break;

            case 3: render_show =
                <div>
                    <div className="Row">
                        <div className="col-12">
                            <div className='_Card'>
                                <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อ</h3>
                                <h5>{this.state.logistic == 1 ?
                                    // <div>
                                    //     <h5>ขนส่งแบบ รถไฟ</h5>
                                    //     กรอกหมายเลขพัสดุ : <input />
                                    // </div>
                                    <div>
                                        รอการขนส่ง
                                </div>
                                    :
                                    <div>
                                        รอระบบขนส่งจาก {this.state.order.name} {this.state.order.last_name}
                                    </div>}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-12" style={{ marginLeft: "50px" }}>
                            <button className="BTN_PDF" onClick={() => this.send_logistic()}>ยืนยันจัดส่ง</button>

                        </div>
                    </div>
                </div>
                break;

            case 4: render_show =
                <div>
                    <div className="Row">
                        <div className="col-12">
                            <div className='_Card'>
                                <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อ</h3>
                                <h5>เรียบร้อย
                            </h5>
                            </div>
                        </div>
                    </div>

                </div>
                break;
            case -1: render_show =
                <div>
                    <div className="Row">
                        <div className="col-12">
                            <div className='_Card'>
                                <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อ</h3>
                                <h4 style={{ color: 'red' }}>ถูกยกเลิก
                                </h4>
                            </div>
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

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>รายละเอียดคำสั่งซื้อสินค้า {this.state.order.order_id}</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-8"></div>
                    {/* เริ่ม */}
                    <div className="col-1">
                        <h5 style={{ textAlign: "left", marginRight: "10px", margin: "0" }}>รหัสใบสั่งซื้อ</h5>
                        <h5 style={{ textAlign: "left", marginRight: "10px", margin: "0" }}>วันที่ใบสั่งซื้อ</h5>
                        <h5 style={{ textAlign: "left", marginRight: "10px", margin: "0" }}>ผู้ซื้อ</h5>
                    </div>
                    <div className="col-2">
                        <h5 style={{ textAlign: "left", margin: "0" }}>{this.state.order.order_id}</h5>
                        <h5 style={{ textAlign: "left", margin: "0" }}>{moment(this.state.order.order_date).utc().format("DD/MM/YYYY")}</h5>
                        <h5 style={{ textAlign: "left", margin: "0" }}>{this.state.order.name} {this.state.order.last_name}</h5>
                    </div>
                </div>


                <Timeline status={this.state.order.order_status} order={this.state.order} detail={this.state.detail} invoice={this.state.invoice} payment={this.state.payment} />

                <div className="Row" style={{ marginTop: "50px" }}>
                    <div className="col-1"></div>
                    <div className="col-6">
                        <h3 style={{ textAlign: "center" }}>รายการสั่งซื้อ</h3>
                        <table style={{ textAlign: "center" }}>
                            <tr>
                                <th>รูป</th>
                                <th>ชื่อวัตถุดิบ</th>
                                <th>จำนวนที่สั่ง (กิโลกรัม)</th>
                                <th>ราคาต่อหน่วย (บาท)</th>
                                <th>ราคารวม (บาท)</th>
                                <th>ทำการสั่งซื้อ</th>
                            </tr>

                            {
                                this.state.detail.map((element_plant, index) => {
                                    return (
                                        <tr>
                                            <td>{element_plant.image ? <img alt="Product" className="Product" src={ip + element_plant.image} /> : <img alt="Product" className="Product" src={this.state.default_image} />}</td>
                                            <td>{element_plant.plant_name}</td>
                                            <td>{addComma(element_plant.amount)}</td>
                                            <td>{element_plant.price}</td>
                                            <td>{addComma(element_plant.price * element_plant.amount)}</td>
                                            {console.log("test", this.state.detail)}
                                            <td>{
                                                element_plant.status === -1 ?
                                                    <div style={{ color: 'red' }}>ถูกยกเลิกแล้ว</div> :
                                                    element_plant.status === 1 ?
                                                        "ทำการสั่งซื้อเเล้ว" :
                                                        <NavLink to={`/M_Product?product_id=P%20${element_plant.plant_id}&order_id=${this.state.order.order_id}`}>
                                                            <button
                                                                className="BTN_AddCart"
                                                                style={{ float: "right" }}>
                                                                ทำการสั่งซื้อวัตถุดิบ
                                                        </button>
                                                        </NavLink>

                                            }

                                            </td>
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
                                        <div className="col-5">
                                            <h4>ยอดคำสั่งซื้อทั้งหมด</h4>
                                        </div>
                                        <div className="col-7">
                                            <h4 style={{ color: "red", textAlign: "left" }}>{addComma(this.sum_price(this.state.detail))} บาท</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="col-5">{this.render_status(this.state.order.order_status)}</div>

                </div>

                <Modal open={this.state.OpenComfrim} onClose={this.onCloseModal}>
                    <div className="Row" style={{ width: "500px" }}>
                        <div className="col-11">
                            <h3 style={{ textAlign: "center" }}>รายละเอียดใบแจ้งหนี้</h3>
                            <h4>อ้างอิงถึงใบสั่งซื้อเลขที่ : {this.state.order.order_id}</h4>
                            <h4>ชำระเงินภายในวันที่</h4>
                            {/* <input type="date" name="date_send" id="date_send" onChange={this.handleChange} /> */}
                            <DateSelect parentCallback={this.callbackFunction} />

                            <h4 style={{ marginTop: "-30px" }}> ข้อมูลการชำระเงิน</h4>

                            {this.state.bank_information ?
                                this.state.bank_information.map((element) => {
                                    return (
                                        <div className="_Card">

                                            <h4 style={{ margin: "0px" }}>{element.bankName}</h4>
                                            <h5 style={{ margin: "0px" }}>ชื่อบัญชีธนาคาร {element.bankAccount}</h5>
                                            <h5 style={{ margin: "0px" }}> เลขที่บัญชี {element.bankNo}</h5>
                                        </div>
                                    )
                                })
                                : null}
                        </div>
                        <div className="col-1" />
                    </div>
                    <div className="Row" style={{ width: "500px" }}>
                        <div className="col-12">
                            <button className="BTN_PDF" onClick={() => { this.onCloseModal() }}>ยกเลิก</button>
                            <button className='BTN_CONFIRM' onClick={() => { this.add_invoice() }}>ออกใบแจ้งหนี้</button>
                        </div>
                    </div>
                </Modal>

                <Modal open={this.state.OpenBill} onClose={this.onCloseModal}>
                    <div className="Row">
                        <div className="col-12" >
                            <h3 style={{ textAlign: "center" }}>รายละเอียดการชำระเงิน</h3>
                        </div>
                    </div>
                    <div className="Row" style={{ width: "800px" }}>
                        <div className="col-7" >
                            <a href={ip + this.state.payment.image_proof}>
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
                            <button className="BTN_CONFIRM" onClick={() => this.confirm_payment()} >ออกใบเสร็จ</button>
                            <button className="BTN_PDF" onClick={() => this.setState({ OpenBill: false })}>ยกเลิก</button>

                        </div>
                    </div>
                </Modal>



            </div>

        )
    }
}
export default OrderDetail;