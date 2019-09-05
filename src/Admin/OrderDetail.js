//รายละเอียดคำสั่งซื้อสินค้า SE-M ซื้อของจาก SE-S
import React, { Component } from 'react';
import { post, ip } from '../Support/Service';
import { user_token, addComma } from '../Support/Constance';
import queryString from 'query-string';
import moment from 'moment'
import Timeline from '../Support/Timeline'
import { OffCanvas, OffCanvasMenu } from 'react-offcanvas';
import PdfOrder from '../Support/PdfOrder'
import Modal from 'react-responsive-modal'


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
            plant: null,
            data: [],
            OpenComfrim: false,
            detail_send:null,
            date_send:null,
            photo_profile: "https://i.stack.imgur.com/l60Hf.png",
            tag0: "https://image.flaticon.com/icons/svg/1161/1161832.svg",
            tag1: "https://image.flaticon.com/icons/svg/1161/1161833.svg",
            tag_default: "https://image.flaticon.com/icons/svg/1161/1161830.svg",
            default_image: 'https://www.lamonde.com/pub/media/catalog/product/placeholder/default/Lamonde_-_Image_-_No_Product_Image_4.png'
        }
    }



    componentWillMount() {
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
    add_invoice = () =>{
            let object = {
                order_id: this.state.order.order_id,
                date_send: this.state.date_send,
                detail: this.state.detail_send,
                status: 0
            }
            console.log('object',object)
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
        this.setState({ open: false, OpenComfrim:false });
        
    };



    onOpenModalComfrim = () => {
        this.setState({ open: true });
    };

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

                {/* <div className="Row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <Timeline items={events} />
                    </div>
                    <div className="col-4"></div>
                </div> */}

                <Timeline data={this.state.order} />
                {/* <PdgOrder data={this.state.order} /> */}
                <div className="Row">
                    <div className='_Card'>
                        <div className="Row">
                            <div className="col-10">
                                <h4 >&nbsp; สถานะการสั่งซื้อ : รอยืนยันคำสั่งซื้อ</h4>
                                <p>&nbsp;  รอ SE กลาง ยืนยันการสั่งซื้อ และส่งใบแจ้งหนี้กลับมา</p>
                            </div>
                            <div className="col-2">
                                <PdfOrder data={this.state.order} />
                                <button className='BTN_CONFIRM' onClick={() => this.setState({OpenComfrim:true})}>ยืนยันการสั่งซื้อ</button>
                            </div>
                        </div>
                    </div>
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
                                                {element_plant.image ? <img alt="Product" src={ip + element_plant.image} /> : <img alt="Product" src={this.state.default_image} />}
                                            </div>
                                            <div className="col-10">
                                                <h4>{element_plant.plant_name}</h4>
                                                <button onClick={() => { this.onOpenModal() }}
                                                    className="BTN_AddCart"
                                                    style={{ width: "250px", float: "right", marginTop: "-75px" }}>
                                                    ทำการสั่งซื้อวัตถุดิบจาก SE ย่อย
                                                    </button>

                                                <div className="Row" style={{ marginTop: "-30px" }}>
                                                    <div className="col-5">
                                                        <h4>จำนวนที่สั่ง {addComma(element_plant.amount)} กิโลกรัม</h4>
                                                    </div>
                                                    <div className="col-3">
                                                        <h5>ราคาต่อหน่วย {element_plant.price} บาท</h5>
                                                    </div>
                                                    <div className="col-4">
                                                        <h4 style={{ textAlign: "right" }}>รวม {addComma(element_plant.price * element_plant.amount)} บาท</h4>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        <Modal open={this.state.open} onClose={this.onCloseModal}>
                            <div className="Row">
                                <div className="col-1" />
                                <div className="col-10">
                                    <h3 style={{ textAlign: "center" }}>รายละเอียดวัตถุดิบ {this.state.detail.plant_name}</h3>
                                    <h4>จำนวนวัตถุดิบทั้งหมด {this.state.detail.total_plant} กิโลกรัม</h4>
                                    <h4>จำนวนที่สั่งซื้อ {this.state.detail.amount} กิโลกรัม</h4>
                                    <table>
                                        <tr>
                                            <th>ชื่อ SE</th>
                                            <th>จำนวนที่มีอยู่ในสต๊อก</th>
                                            <th>ราคาขนส่ง</th>
                                            <th>ช่วงส่งมอบ</th>
                                        </tr>
                                    </table>

                                    <button className="BTN_Signin" onClick={() => { this.Comfirm() }}>ออกใบคำสั่งซื้อ</button>
                                    <button className="BTN_Signup" onClick={() => { this.onCloseModal() }}>ยกเลิก</button>

                                </div>
                                <div className="col-1" />
                            </div>
                        </Modal>

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
                                            <h4 style={{ color: "red", textAlign: "right" }}>ราคารวม {addComma(this.sum_price(this.state.detail))} บาท</h4>
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

                <Modal open={this.state.OpenComfrim} onClose={this.onCloseModal}>
                    <div className="Row">
                        <div className="col-1" />
                        <div className="col-10">
                            <h3 style={{ textAlign: "center" }}>รายละเอียดใบแจ้งหนี้</h3>
                            <h4>อ้างอิงถึงใบสั่งซื้อเลขที่ : {this.state.order.order_id}</h4>
                            <h4>ชำระเงินภายในวันที่</h4>
                            <input type="date" name="date_send" id="date_send" onChange={this.handleChange} style={{ marginTop: "-50px"}} />
                            <h4 style={{ marginTop: "-30px"}}>ข้อมูลการชำระเงิน</h4>
                            <p>ชื่อธนาคาร <input></input></p>
                            
                            <p>เลขบัญชีธนาคาร <input></input></p>
                            
                            <p>ชื่อบัญชีธนาคาร  <input></input></p>
                            
                            <textarea rows="4" cols="95" name="detail_send" id="detail_send" onChange={this.handleChange}
                                form="usrform" />
                            <button className="BTN_Signin" onClick={() => { this.add_invoice() }}>ออกใบแจ้งหนี้</button>
                            <button className="BTN_Signup" onClick={() => { this.onCloseModal() }}>ยกเลิก</button>

                        </div>
                        <div className="col-1" />
                    </div>
                </Modal>

            </div>

        )
    }
}
export default OrderDetail;