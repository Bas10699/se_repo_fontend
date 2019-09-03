//ตระกร้าสินค้า
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { user_token, addComma } from '../Support/Constance';
import { get, post } from '../Support/Service';
import Modal from 'react-responsive-modal'

class T_Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart_product: [],
            render_cart: null,
            total_price: [],
            open: false,
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
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

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentWillMount() {
        this.get_product()
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
                    window.location.href = "/T_Crat";
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
        let object = {
            detail: this.state.cart_product,
            order_status: "0"
        }
        try {
            await post(object, 'trader/add_order', user_token).then((result) => {
                if (result.success) {
                    alert("ระบบดำเนินการส่งใบสั่งซื้อเรียบร้อย")
                    window.location.href = "/T_Buying";
                }
                else {
                    alert(result.error_message)
                }
            })

        }
        catch (error) {
            alert("get_cart_trader" + error);
        }

    }

    sum_price = (data) => {
        let sum = 0;
        data.map((element) => {
            sum += (element.price * element.amount)
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
                                                {/* <img src={ip + 'trader/image/' + this.state.product_data.image} alt={this.state.product_data.product_name} /> */}
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
                                                    <div className="col-10">
                                                        <h5>ราคา</h5>
                                                    </div>
                                                    <div className="col-2">
                                                        <h4>{addComma(element.price * element.amount)} บาท</h4>
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
                                        <div className="col-10">
                                            <h4>ยอดคำสั่งซื้อทั้งหมด</h4>
                                        </div>
                                        <div className="col-2">
                                            <h4 style={{ color: "red" }}>{addComma(this.sum_price(this.state.cart_product))} บาท</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="BTN_AddCart" style={{ float: "left" }} onClick={() => { this.edit_amount() }}>ยืนยันการแก้ไขจำนวน</button>
                        <button className="BTN_AddCart" style={{ float: "right" }} onClick={() => { this.onOpenModal() }}>สั่งซื้อ</button>
                        <Modal open={this.state.open} onClose={this.onCloseModal} little>
                            <h5>วันที่กำหนดส่ง</h5>
                            <input></input>
                            <h5>ที่อยู่ในการจัดส่ง</h5>
                            <input></input>
                            <h5>ผู้จัดทำ</h5>
                            <input></input>
                            <h5>ผู้ตรวจสอบ</h5>
                            <input></input><br/><br/>
                            <button onClick={()=>{this.onCloseModal()}}>ยกเลิก</button>
                            <button>ยืนยันการสั่งซื้อ</button>
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