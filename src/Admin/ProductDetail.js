//รายละเอียดสินค้า
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import Modal from 'react-responsive-modal'
import { user_token, addComma, } from '../Support/Constance';
import { ip, get, post } from '../Support/Service';
import queryString from 'query-string';

import { Accordion, AccordionItem } from 'react-light-accordion';

class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            get_user: null,
            product_data: [],
            plant: [],
            plant_id: [],
            amount: 0,
            data: [],
            price: [],
            data_cart: [],
            total_plant: [],
            total_price: [],
            cart_product: [],
            status: null,
            loading: true,

            default_image: 'https://www.lamonde.com/pub/media/catalog/product/placeholder/default/Lamonde_-_Image_-_No_Product_Image_4.png',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onCloseModal = () => {
        this.setState({ open: false, OpenComfrim: false, OpenBill: false });

    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    componentWillMount() {
        this.get_product()
        this.get_user()
    }


    get_user = async () => {
        try {
            await get('user/show_user', user_token).then((result) => {
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
        let url = this.props.location.search;
        let params = queryString.parse(url);
        console.log(params);
        try {
            await post(params, 'trader/get_product_information', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        product_data: result.result,
                        price: result.result.price,
                        // plant: result.result.plant,
                        loading: false,
                    })

                    setTimeout(() => {
                        console.log("get_product1", result.result)
                    }, 500)
                } else {
                    window.location.href = "/Product";
                    alert(result.error_message)
                }
            });
        } catch (error) {
            alert("get_product2" + error);
        }
    }

    add_cart = async () => {
        console.log(this.state.product_data)
        // this.state.plant.map((element, index) => {
        //     this.state.data.push({
        //         plant_id: element.plant_id,
        //         total_plant: this.state.total_plant = element.volume * this.state.amount,
        //     })
        // })

        let data = {
            plant_id: this.state.product_data.product_id,
            total_plant:this.state.amount
        }
        // console.log(data)
        try {
            await post(data, 'trader/add_cart_trader', user_token).then((result) => {
                if (result.success) {
                    window.location.href = '/T_cart'

                    setTimeout(() => {
                        console.log("get_product11", result)
                    }, 500)
                } else {
                    alert(result.error_message)
                }
            });
        } catch (error) {
            alert("get_product22" + error);
        }
    }

    sum_data = (data) => {
        let sum = 0;

        for (var i = 0; i < data.length; i++) {
            let data_sum = data[i];
            sum += data_sum;
            sum.toLocaleString()
        }
        return sum;
    }




    volume_check = (data_price, index) => {

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

        let dataSortVolume = data_price.sort(compare)
        let price = 0

        dataSortVolume.map((element) => {
            if (this.state.amount >= element.volume) {
                price = element.price
            }
        })


        return price
    }

    sort_price = (data_price) => {
        let dataSortVolume = data_price.sort(compare)
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
        return dataSortVolume
    }

    sum_price = (data) => {
        let sum = 0;
        data.map((element) => {
            sum += (element.price * element.amount)
        })

        return sum;
    }

    render_Step = (status) => {
        let render_Show
        switch (status) {
            case 0: render_Show = <div style={{ color: "red", fontSize: '32px' }}>สินค้าหมด</div>
                break;
            default:
                break;
        }
        return render_Show
    }

    render() {

        return (
            <div>
                {this.state.loading ?
                    <div><div className="loader"></div><h5 style={{ textAlign: 'center', marginTop: '28%' }}>กำลังโหลด...</h5></div>
                    :
                    <div className="App">
                        {/* <div className="Row">
                    <div className="col-12" style={{padding:"220"}}></div>
                </div> */}
                        <div className="Row">
                            <div className="col-5">
                                {this.state.product_data.image ? <img className="IMG_Detail" src={ip + this.state.product_data.image} alt={this.state.product_data.product_name} /> : <img className="IMG_Detail" src={this.state.default_image} alt={this.state.product_data.product_name} />}
                            </div>
                            <div className="col-1"></div>
                            <div className="col-5">
                                <h3>{this.state.product_data.product_name}</h3>
                                <h5>{this.state.product_data.product_status}</h5>


                                {/* <h4>ราคาขายปลีก</h4> */}
                                {this.sort_price(this.state.price).map((element, index) => {
                                    return (<h4 style={{ margin: "0" }}>{addComma(element.volume)} กิโลกรัมขึ้นไป ราคา {element.price} บาท/กิโลกรัม </h4>)
                                })}
                                {/* <h4>ราคาขาย  บาท/กิโลกรัม</h4> */}
                                <input type="number"
                                    name="quantity" min="1"
                                    id="amount" placeholder="จำนวนที่ต้องการสั่งซื้อ"
                                    onChange={this.handleChange} />
                                <button className="BTN_AddCart" style={{width:"150px"}} onClick={() => { this.add_cart() }}>เพิ่มในตะกร้าสินค้า</button>

                                {this.render_Step(this.state.product_data.amount_stock)}

                                {this.state.plant.map((element_plant, index_plant) => {
                                    return (
                                        <h4>จำนวนที่มีอยู่ {addComma(this.sum_data(element_plant.data))} กิโลกรัม</h4>
                                    )
                                }
                                )}
                                <h4>ยอดคำสั่งซื้อทั้งหมด {this.volume_check(this.state.price) * this.state.amount} บาท</h4>
                            </div>
                            <div className="col-1"></div>


                        </div>
                        <div className="Row">
                            <div className="col-1"></div>
                            <div className="col-10">
                                {/* <h3 style={{ textAlign: "center" }}>รายการวัตถุดิบ</h3>

                        <table>
                            <tr>
                                <th>ลำดับ</th>
                                <th>รหัสวัตถุดิบ</th>
                                <th>ชื่อวัตถุดิบ</th>
                                <th>ราคา / หน่วย</th>
                                <th>จำนวนที่มีอยู่</th>
                                <th>จำนวนที่ต้องใช้ในการผลิต</th>
                                <th>สถานะวัตถุดิบ</th>
                                <th>ราคารวมทั้งหมด</th>
                            </tr>
                            {
                                this.state.plant.map((element_plant, index_plant) => {
                                    return (
                                        <tr>
                                            <td style={{ textAlign: "center" }}>{index_plant + 1}</td>
                                            <td style={{ textAlign: "center" }}>PCODE-{element_plant.plant_id}</td>
                                            <td>{element_plant.plant_name}</td>
                                            <td style={{ textAlign: "center" }}>{this.volume_check(element_plant.price)} บาท</td>
                                            <td style={{ textAlign: "center" }}>{(this.sum_data(element_plant.data))} กิโลกรัม</td>
                                            <td style={{ textAlign: "center" }}>
                                                {(this.state.total_plant = element_plant.volume * this.state.amount)} กิโลกรัม
                                            </td>
                                            <td>{this.sum_data(element_plant.data) - this.state.total_plant < 0
                                                ? <div style={{ color: "red", textAlign: "center" }}>
                                                    ขาดวัตถุดิบ {(this.state.total_plant - this.sum_data(element_plant.data))} กิโลกรัม
                                                </div>
                                                :
                                                <div style={{ color: "green", textAlign: "center" }}>
                                                    วัตถุดิบมีเพียงพอ
                                                 </div>}
                                            </td>
                                            <td style={{ textAlign: "right" }}>
                                                {(this.state.total_price = this.volume_check(element_plant.price) * this.state.total_plant)} บาท
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </table> */}
                                {/* <div className="Row">
                            <div className="col-10">
                                <h4>ยอดคำสั่งซื้อทั้งหมด</h4>
                            </div>
                            <div className="col-2">
                                <h4 style={{ color: "red" }}>{(this.state.total_price)} บาท</h4>
                            </div>
                        </div> */}
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </div>
                }
            </div>

        );
    }
}
export default ProductDetail;