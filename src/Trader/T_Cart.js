//ตระกร้าสินค้า
import React, { Component } from 'react';
import { user_token, addComma, user_token_decoded } from '../Support/Constance';
import { get, post, ip } from '../Support/Service';
import Modal from 'react-responsive-modal'
import socketIOClient from 'socket.io-client'

class T_Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart_product: [],
            get_user: null,
            render_cart: null,
            address: null,
            total_price: [],
            open: false,
            default_image: 'https://www.lamonde.com/pub/media/catalog/product/placeholder/default/Lamonde_-_Image_-_No_Product_Image_4.png'
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleInputChange = (event, index) => {
        const value = event.target.value;

        let cart_product = this.state.cart_product //ตั้งตัวแปรแแทน state

        cart_product[index].amount = value
        this.setState({
            cart_product: cart_product
        })
    }
    address_change = (event) => {

        let address = this.state.get_user.address

        this.setState({
            address: address
        })
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentWillMount() {
        this.get_product()
        this.get_user()
    }

    get_user = async () => {
        try {
            await get('show/show_user', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_user: result.result
                    })
                    setTimeout(() => {
                        console.log("get user : ", result.result)
                    }, 500)
                } else {
                }
            });
        } catch (error) {
            alert("get user error : " + error);
        }
    }

    get_product = async () => {
        try {
            await get('trader/get_cart_trader', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        cart_product: result.result,
                        render_cart: 1
                    })
                    setTimeout(() => {
                        console.log("cart_product1", result.result)
                    }, 500)
                } else {
                }
            });
        } catch (error) {
            alert("get_cart_trader" + error);
        }
    }


    edit_amount = async () => {
        console.log(this.state.cart_product)

        let object = {
            data: this.state.cart_product
        }
        console.log(object)
        if (window.confirm("ยืนยันการแก้ไขจำนวน")) {
            try {
                await post(object, 'trader/update_cart_trader', user_token).then((result) => {
                    if (result.success) {
                        alert(result.message)
                    }
                    else {
                        window.location.href = "/Product";
                        alert(result.error_message)
                    }
                })

            }
            catch (error) {
                alert("update_cart_trader" + error);
            }
        }

    }

    delete_product = async (plant_id) => {
        let object = {
            plant_id: plant_id
        }
        try {
            await post(object, 'trader/delete_cart_product_tarder', user_token).then((result) => {
                if (result.success) {
                    alert(result.message)
                    window.location.href = "/T_Cart";
                }
                else {
                    window.location.href = "/Product";
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert("delete_cart_product_tarde" + error);
        }
    }
    // connect = () => {
    //     return (
    //         <Modal open={this.state.open} onClose={this.onCloseModal} little>
    //             <h2>Simple centered modal</h2>
    //         </Modal>
    //     )
    // }

    Comfirm = async () => {
        let detail = this.state.cart_product
        detail.map((element, index) => {
            element.price = this.volume_check(element.price, index)
        })

        let object = {
            detail: detail,
            date_send: this.state.date,
            address_send: this.state.address,
            order_status: "0"
        }

        try {
            await post(object, 'trader/add_order', user_token).then((result) => {
                if (result.success) {
                    
                    const socket = socketIOClient(ip)
                    socket.emit('send-noti', result.result)

                    alert("ระบบดำเนินการส่งใบสั่งซื้อเรียบร้อย")
                    window.location.href = "/T_Buying";
                }
                else {
                    alert(result.error_message)
                    window.location.reload()
                }
            })

        }
        catch (error) {
            alert("get_cart_trader" + error);
        }

    }

    // send_noti = () => {
    //     // const { endpoint, input } = this.state
    //     const socket = socketIOClient(ip)
    //     socket.emit('send-noti', 'Hello')
    //     // this.setState({ input: '' })
    //   }

    volume_check = (data_price, index) => {
        let cart_product = this.state.cart_product
        let dataSortVolume = data_price.sort(compare)
        let price = 0
        dataSortVolume.map((element) => {
            if (cart_product[index].amount >= element.volume) {
                price = element.price
            }
        })
        function compare(a, b) {
            const order_idA = a.volume
            const order_idB = b.volume

            let comparison = 0;
            if (order_idA > order_idB) {
                comparison = 1;
            } else if (order_idA < order_idB) {
                comparison = -1;
            }
            return comparison;
        }

        return price
    }

    sum_price = (data) => {
        let sum = 0;
        data.map((element, index) => {
            sum += (this.volume_check(element.price, index) * element.amount)
        })

        return sum;
    }


    render() {

        const cart_product = (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>ตระกร้าสินค้า</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-2"></div>
                    {/* เริ่ม */}
                    <div className="col-8">
                        {
                            this.state.cart_product.map((element, index) => {
                                return (
                                    <div className="CartCard">
                                        <div className="Row">
                                            <div className="col-2">
                                                {element.image ? <img alt="Product" src={ip + element.image} /> : <img alt="Product" src={this.state.default_image} />}
                                            </div>
                                            <div className="col-1"></div>
                                            <div className="col-9">
                                                <button
                                                    onClick={() => { this.delete_product(element.plant_id) }}>ลบ</button>
                                                <h4>{element.plant_name}</h4>

                                                <input type="number" name="amount"
                                                    value={element.amount}
                                                    onChange={(event) => { this.handleInputChange(event, index) }} />


                                                <div className="Row">
                                                    <div className="col-9">
                                                        <h4>ราคา {this.volume_check(element.price, index)} บาท / กิโลกรัม</h4>
                                                    </div>
                                                    <div className="col-3">
                                                        <h4>ราคารวม {addComma(this.volume_check(element.price, index) * element.amount)} บาท</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}


                        <div className="TotalCart">
                            <div className="Row">
                                <div className="col-2">
                                </div>
                                <div className="col-1"></div>
                                <div className="col-9">

                                    <div className="Row">
                                        <div className="col-7">
                                            <h4 style={{ textAlign: "right" }}>ยอดคำสั่งซื้อทั้งหมด</h4>
                                        </div>
                                        <div className="col-1"></div>
                                        <div className="col-4">
                                            <h4 style={{ color: "red", textAlign: "center" }}>{addComma(this.sum_price(this.state.cart_product))} บาท</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="BTN_Signin" style={{ float: "left" }} onClick={() => { this.edit_amount() }}>ยืนยันการแก้ไขจำนวน</button>
                        <button className="BTN_Signup" style={{ float: "right" }} onClick={() => { this.onOpenModal() }}>สั่งซื้อ</button>

                        <Modal open={this.state.open} onClose={this.onCloseModal}>
                            <div className="Row">
                                <div className="col-1" />
                                <div className="col-10">
                                    <h3 style={{ textAlign: "center" }}>รายละเอียดการจัดส่ง</h3>
                                    <h4>วันที่กำหนดส่ง</h4>
                                    <h5 style={{ color: "red" }} >** เลือกวันกำหนดส่ง กรณีสินค้าหมด หรือสั่งซื้อล่วงหน้า **</h5>
                                    <input type="date" name="date" id="date" onChange={this.handleChange} style={{ marginTop: "-50px", marginLeft: "-2px" }} />

                                    <h4>ที่อยู่จัดส่ง</h4>
                                    <input type="radio" name="address_new" onChange={this.address_change} />ที่อยู่เดิม
                                        <input type="radio" name="address_new" />ที่อยู่ใหม่
                                    <textarea rows="4" cols="95" name="address" id="address" value={this.state.address} onChange={this.handleChange}
                                        form="usrform" />
                                    <button className="BTN_Signin" onClick={() => { this.Comfirm() }}>ออกใบคำสั่งซื้อ</button>
                                    <button className="BTN_Signup" onClick={() => { this.onCloseModal() }}>ยกเลิก</button>

                                </div>
                                <div className="col-1" />
                            </div>
                        </Modal>


                    </div>
                    {/* จบ */}
                    <div className="col-2"></div>
                </div>
            </div>
        )

        const not_cart = (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>ไม่มีสินค้าในตะกร้า</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-10">
                        <img style={{ width: "100px", height: "100px", textAlign: "center", display: "block", marginLeft: "auto", marginRight: "auto" }}
                            alt="not_cart" src={"https://image.flaticon.com/icons/svg/138/138275.svg"} />
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        )

        return (
            <div>
                {this.state.render_cart ? cart_product : not_cart}
            </div>

        )
    }
}
export default T_Cart;