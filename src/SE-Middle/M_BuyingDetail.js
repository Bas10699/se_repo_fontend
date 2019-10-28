import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { user_token, addComma } from '../Support/Constance';
import { get, post } from '../Support/Service';
import queryString from 'query-string';
import TimelineNeo from '../SE-Sub/TimelineNeo';
import Modal from 'react-responsive-modal'
import moment from 'moment'

class M_BuyingDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open:false,
            OpenComfrim:false,
            OpenBill:false,
            OpenProofPaymet:false,
            order: [],
            data: [],
            click: false,
            clicks: false,
            get_order: '',
            get_product: '',
            search_order: [],
            render_history: null,
            photo_profile: "https://i.stack.imgur.com/l60Hf.png"
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
                        get_order: result.result
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

    // get_order = async () => {
    //     try {
    //         await get('neutrally/get_order_se_all', user_token).then((result) => {
    //             if (result.success) {
    //                 this.setState({
    //                     order: result.result,
    //                     search_order: result.result,
    //                     render_history: 1
    //                 })


    //                 setTimeout(() => {
    //                     console.log("get_product1", result.result)
    //                 }, 500)
    //             } else {
    //                 window.location.href = "/product_information";
    //                 alert(result.error_message)
    //             }
    //         });
    //     } catch (error) {
    //         alert("get_cart_trader" + error);
    //     }
    // }

    render_status = (order_status) => {
        let render_show
        switch (order_status) {
            case 0: render_show =
                <div className='_Card'>
                    <div className="Row">
                        <div className="col-12">
                            <h4>สถานะการสั่งซื้อ : รอการยืนยันการสั่งซื้อ</h4>
                            <h5>รอ {this.state.get_order.se_name} ยืนยันการสั่งซื้อ และส่งใบแจ้งหนี้กลับมา</h5>
                        </div>
                    </div>
                    <div className="Row">
                        {/* <div className="col-6"><PdfOrder data={this.state.order} /></div> */}
                    </div>
                </div>

                break;

            case 1: render_show =
                <div className='_Card'>
                    <div className="Row">
                        <div className="col-12">
                            <h4>สถานะการสั่งซื้อ : รอการยืนยันการชำระเงิน</h4>
                            <h5>กรุณาชำระเงินผ่าน : </h5>
                            {/* รายชื่อธนาคาร {this.state.invoice_detail.BankName} {this.state.invoice_detail.BankNo} {this.state.invoice_detail.BankAccountName}</h5> */}
                            {/* <h5>ก่อนวันที่ {moment(this.state.invoice.date_send).utc().add('years', 543).format("DD/MM/YYYY")} เมื่อโอนเงินแล้วให้ยืนยันและส่งหลักฐานการชำระเงิน </h5> */}
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-6">
                            {/* <PdfInvoice data={this.state.invoice} order={this.state.order} /> */}
                            <button className='BTN_CONFIRM' onClick={() => this.onOpenModal()}>แจ้งชำระเงิน</button>
                        </div>
                    </div>
                </div>
                break;

            case 2: render_show =
                <div className='_Card'>
                    <div className="Row">
                        <div className="col-12">
                            <h4>สถานะการสั่งซื้อ : รอ {this.state.get_order.se_name} ตรวจสอบการโอนเงิน</h4>
                            <h5>รอ {this.state.get_order.se_name} ตรวจสอบการโอนเงิน หลังจากตรวจสอบเรียบร้อยจะส่งใบเสร็จกลับมา</h5>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-6">
                            <button onClick={() => this.setState({ OpenProofPaymet: true })}
                                className="BTN_PDF">ดูหลักฐานการโอนเงิน</button>
                        </div>
                    </div>
                </div>

                break;

            case 3: render_show =
                <div className='_Card'>
                    <div className="Row">
                        <div className="col-12">
                            <h4>สถานะการสั่งซื้อ : สินค้าได้ทำการจัดสั่งเเล้ว ผู้ประกอบการกรุณาตรวจสอบสินค้าและใบเสร็จ</h4>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-6">
                            <button className='BTN_CONFIRM' onClick={() => this.confirm()}>ยืนยันได้รับสินค้า</button>
                        </div>
                    </div>
                </div>
                break;

            case 4: render_show =
                <div className='_Card'>
                    <div className="Row">
                        <div className="col-12">
                            <h4>สถานะการสั่งซื้อ : เรียบร้อย</h4>

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
                            <h4>สถานะการสั่งซื้อ : เกิดข้อผิดพลาด</h4>

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
        this.setState({ open: false, OpenComfrim: false, OpenBill: false });

    };



    onOpenModalComfrim = () => {
        this.setState({ open: true });
    };

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>รายละเอียดคำสั่งซื้อกับ {this.state.get_order.se_name}</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-10" style={{ textAlign: "right" }}>
                        วันที่
                        เลขที่ใบสั่งซื้อ
                    </div>
                </div>

                <div className="Row">
                    <div className="col-12" style={{ textAlign: "center" }}>
                        <TimelineNeo status={this.state.get_order.order_se_status} order={this.state.get_order}/>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">{this.render_status(1)}</div>
                    <div className="col-2"></div>
                </div>




                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="Row" style={{ width: "500px" }}>
                        <div className="col-11">
                            <h3 style={{ textAlign: "center" }}>รายละเอียดใบแจ้งหนี้</h3>
                            {/* <h4>อ้างอิงถึงใบสั่งซื้อเลขที่ : {this.state.order.order_id}</h4>
                            <h4>ชำระเงินภายในวันที่</h4>
                            <input type="date" name="date_send" id="date_send" onChange={this.handleChange} />
                            <h4 style={{ marginTop: "-30px" }}> ข้อมูลการชำระเงิน</h4>
                            เเสดงรายชื่อธนาคารทั้งหมด

                            <h4>ชื่อธนาคาร <input name="BankName" type="bank" id="BankName" onChange={this.handleChange} /></h4>
                            <h4>เลขบัญชีธนาคาร <input name="BankNo" type="bank" id="BankNo" onChange={this.handleChange} /></h4>
                            <h4>ชื่อบัญชีธนาคาร  <input name="BankAccountName" type="bank" id="BankAccountName" onChange={this.handleChange} /></h4> */}
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
                            {/* <a href={ip + this.state.payment.image_proof}>
                                <img src={ip + this.state.payment.image_proof}
                                    style={{ height: "100%", width: "80%", display: "block", marginLeft: "auto", marginRight: "auto", objectFit: "cover" }} alt="หลักฐานการโอน" />
                            </a> */}
                        </div>
                        <div className="col-5">

                            {/* <h4>อ้างอิงถึงใบสั่งซื้อเลขที่ : {this.state.order.order_id} </h4>
                            <h4>อ้างอิงถึงใบแจ้งหนี้เลขที่ : {this.state.invoice.invoice_id}</h4>
                            <h4>วันที่กำหนดชำระเงิน : {moment(this.state.invoice.date_send).format('DD/MM/YYYY')}</h4>
                            <h4>วันที่ชำระเงิน : {moment(this.state.payment.date_proof).format('DD/MM/YYYY')} </h4>
                            <h4>เวลาที่ชำระเงิน : {this.state.payment.time_proof}</h4>
                            <h4>จำนวนเงิน : {addComma(this.sum_price(this.state.detail))} บาท</h4> */}
                            <button className="BTN_CONFIRM" onClick={() => this.confirm_payment()} >ออกใบเสร็จ</button>
                            <button className="BTN_PDF">ไม่พบ</button>

                        </div>
                    </div>
                </Modal>

            </div>
        )
    }
}
export default M_BuyingDetail;