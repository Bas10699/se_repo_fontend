import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { user_token, addComma } from '../Support/Constance';
import { ip, get, post } from '../Support/Service';
import queryString from 'query-string';
import TimelineNeo from '../SE-Sub/TimelineNeo';
import Modal from 'react-responsive-modal'
import moment from 'moment'

class M_BuyingDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            OpenComfrim: false,
            OpenBill: false,
            OpenProofPaymet: false,
            order: [],
            data: [],
            click: false,
            clicks: false,
            get_order: '',
            date_proof: null,
            time_proof: null,
            image_payment: null,
            order_se_invoice_detail: [],
            get_product: '',
            search_order: [],
            render_history: null,
            photo_profile: "https://i.stack.imgur.com/l60Hf.png",
            image_paymentdef: 'https://www.ahvc.com.sg/wp/wp-content/uploads/2016/07/default_image-800x800.png'
        }
    }
    componentWillMount() {
        this.get_order()
        // this.get_user()
    }

    get_order = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        try {
            await post(params, 'neutrally/get_order_se', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_order: result.result,
                        order_se_invoice_detail: result.result.order_se_invoice_detail
                    })
                    setTimeout(() => {
                        console.log("neutrally/get_order_se", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                    //alert("user1"+result.error_message);
                }
            });
        } catch (error) {
            alert("neutrally/get_order_se2" + error);
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
                                <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อสินค้า {this.state.get_order.plant_name}</h3>
                                <h5>รอ {this.state.get_order.name} ยืนยันการสั่งซื้อ <br /> และส่งใบแจ้งหนี้กลับมา</h5>
                            </div>
                        </div>
                    </div>
                    <div className="Row">
                        {/* <div className="col-6"><PdfOrder data={this.state.order} /></div> */}
                    </div>
                </div>

                break;

            case 1: render_show =
                <div>
                    <div className="Row">
                        <div className="col-12">
                            <div className='_Card'>

                                <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อสินค้า {this.state.get_order.plant_name}</h3>
                                <h5 style={{ margin: "0px" }}>รอการยืนยันการชำระเงิน</h5>
                                <h5 style={{ margin: "0px" }}>กรุณาชำระเงินผ่าน : {this.state.order_se_invoice_detail ?
                                    this.state.order_se_invoice_detail.map((element, index) => {
                                        return (
                                            <div>
                                                <h4 style={{ margin: "0px" }}>{element.bankName}</h4>
                                                <h5 style={{ margin: "0px" }}>ชื่อบัญชีธนาคาร {element.bankAccount} เลขที่บัญชี {element.bankNo}</h5>
                                            </div>
                                        )
                                    }) : null}

                                    {console.log("getorder", this.state.get_order)}
                                </h5>

                            </div>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-12" style={{ marginLeft: "50px" }}>
                            {/* <PdfInvoice data={this.state.invoice} order={this.state.order} /> */}
                            <button className='BTN_CONFIRM' onClick={() => this.onOpenModal()}>แจ้งชำระเงิน</button>
                        </div>
                    </div>
                </div>
                break;

            case 2: render_show =
                <div>
                    <div className="Row">
                        <div className="col-12">
                            <div className='_Card'>

                                <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อสินค้า {this.state.get_order.plant_name}</h3>
                                <h5 style={{ margin: "0px" }}>รอ {this.state.get_order.name} ตรวจสอบการโอนเงิน</h5>
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

            case 3: render_show =
                <div>
                    <div className="Row">
                        <div className="col-12">
                            <div className='_Card'>

                                <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อสินค้า {this.state.get_order.plant_name}</h3>
                                <h5 style={{ margin: "0px" }}>รอ {this.state.get_order.name} ส่งสินค้า</h5>

                            </div>
                        </div>
                    </div>
                    {/* <div className="Row">
                        <div className="col-12" style={{ marginLeft: "50px" }}>
                            <button onClick={() => this.setState({ OpenProofPaymet: true })}
                                className="BTN_PDF">ดูหลักฐานการโอนเงิน</button>
                        </div>
                    </div> */}
                    </div>
                break;

            case 4: render_show =
                <div className='_Card'>
                    <div className="Row">
                        <div className="col-12">
                            <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อสินค้า {this.state.get_order.plant_name}</h3>
                            <h5>{this.state.get_order.se_name} ส่งสินค้าเรียบร้อย</h5>

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
                            <h3 style={{ textAlign: "center" }}>สถานะการสั่งซื้อสินค้า {this.state.get_order.plant_name}</h3>
                            <h4>เกิดข้อผิดพลาด</h4>

                        </div>
                    </div>
                </div>

                break;
        }
        return render_show;
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false, OpenComfrim: false, OpenBill: false, OpenProofPaymet: false });

    };



    onOpenModalComfrim = () => {
        this.setState({ open: true });
    };

    add_proof_payment = async () => {
        let payment = {
            order_se_id: this.state.get_order.order_se_id,
            order_se_Payment_date: this.state.date_proof,
            order_se_Payment_time: this.state.time_proof,
            image_proof: this.state.image_payment,
        }
        try {
            await post(payment, 'neutrally/add_order_se_payment', user_token).then((result) => {
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

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
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
                        <h2 style={{ textAlign: "center" }}>รายละเอียดคำสั่งซื้อกับ {this.state.get_order.name}</h2>
                        
                    </div>
                </div>

                <div className="Row">
                    <div className="col-10" style={{ textAlign: "right" }}>
                        <h4 style={{margin:"0"}}>วันที่ {moment(this.state.get_order.order_se_date).utc().add('years', 543).format("DD/MM/YYYY")}<br />
                        เลขที่ใบสั่งซื้อ {this.state.get_order.order_se_id}<br/>
                        </h4>

                    </div>
                </div>

                <div className="Row">
                    <div className="col-12" style={{ textAlign: "center" }}>
                        <TimelineNeo status={this.state.get_order.order_se_status} order={this.state.get_order} />
                    </div>
                </div>

                <div className="Row" style={{ marginTop: "50px" }}>
                    <div className="col-3"></div>
                    <div className="col-6">{this.render_status(this.state.get_order.order_se_status)}</div>
                    {console.log("status", this.state.get_order.order_se_status)}

                </div>




                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="Row" style={{ width: "500px" }}>
                        <div className="col-11">
                            <h3 style={{ textAlign: "center" }}>แจ้งการชำระเงิน</h3>
                            <h4>อ้างอิงถึงใบสั่งซื้อเลขที่ : {this.state.get_order.order_se_id}</h4>

                            <h4>โอนเข้าบัญชี :
                            <select style={{ fontFamily: "fc_lamoonregular", fontSize: "24px" }}>
                                    {this.state.order_se_invoice_detail ?
                                        this.state.order_se_invoice_detail.map((element, index) => {
                                            return (
                                                <option>{element.bankName}</option>
                                            )
                                        }) : null}
                                </select></h4>
                            {/* <h4 style={{ color: "red" }}>ยอดคำสั่งซื้อทั้งหมด {addComma(this.sum_price(this.state.detail))} บาท</h4> */}
                            <div className="Row">
                                <div className="col-6">
                                    <h4>วันที่โอนเงิน</h4>
                                    <input type="date" name="date_send" id='date_proof' onChange={this.handleChange} />
                                </div>
                                <div className="col-1"></div>
                                <div className="col-5">
                                    <h4>เวลาที่โอนเงิน</h4>
                                    <input type="time" name="time" id='time_proof' onChange={this.handleChange} />
                                </div>
                            </div>

                            <h4>แนบหลักฐานการโอนเงิน</h4>
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
                        <div className="col-12"><button className="BTN_PDF" onClick={() => { this.onCloseModal() }}>ยกเลิก</button>
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
                            <a target="_blank" href={ip + this.state.get_order.order_se_payment_image}>
                                <img src={ip + this.state.get_order.order_se_payment_image}
                                    style={{ height: "100%", width: "80%", display: "block", marginLeft: "auto", marginRight: "auto", objectFit: "cover" }} alt="หลักฐานการโอน" />
                            </a>
                        </div>
                        <div className="col-5">

                            <h4>อ้างอิงถึงใบสั่งซื้อเลขที่ : {this.state.get_order.order_se_id} </h4>
                            <h4>อ้างอิงถึงใบแจ้งหนี้เลขที่ : {this.state.get_order.order_se_invoice_id}</h4>
                            <h4>วันที่กำหนดชำระเงิน : {moment(this.state.get_order.order_se_invoice_date_send).format('DD/MM/YYYY')}</h4>
                            <h4>วันที่ชำระเงิน : {moment(this.state.get_order.order_se_Payment_date).format('DD/MM/YYYY')} </h4>
                            <h4>เวลาที่ชำระเงิน : {this.state.get_order.order_se_Payment_time}</h4>
                            {/* <h4>จำนวนเงิน : {addComma(this.state.get_order.amount)} บาท</h4> */}

                        </div>
                    </div>
                </Modal>

            </div>
        )
    }
}
export default M_BuyingDetail;