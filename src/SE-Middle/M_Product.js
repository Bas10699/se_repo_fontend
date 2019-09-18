//รายละเอียดสินค้า
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import Modal from 'react-responsive-modal'
import { user_token, } from '../Support/Constance';
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
            amount: 1,
            data: [],
            order: [],
            sum_vol: '',
            quantity: '',
            price: [],
            data_cart: [],
            total_plant: [],
            total_price: [],
            cart_product: [],
            frequency: [],
            status: null,
            month: [
                'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ค.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
            ],

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
        this.get_order()
        this.get_user()
        // this.setState({
        //     status: this.props.status
        // })
    }

    get_order = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        const object = {
            order_id: params.order_id
        }
        // console.log('obj', object)
        try {
            await post(object, 'neutrally/get_order_info', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        order: result.result,
                        detail: result.result.detail,
                    })
                    setTimeout(() => {
                        console.log("get_order", result.result)
                    }, 500)
                } else {
                    // window.location.href = "/sales_sum";
                    alert(result.error_message)
                    console.log("get_order", result.result)
                }
            });
        } catch (error) {
            alert("get_order" + error);
        }
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

    get_freq = async (name) => {
        let object = {
            plant_name: name
        }
        console.log('object', object)
        try {
            await post(object, 'neutrally/get_chart_frequency_all', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        frequency: result.result,
                        sum_vol: result.result[0].sum,
                        se: result.result
                    })
                    // this.sum_data_in_month()
                    setTimeout(() => {
                        console.log('get_freq', result.result)
                    })
                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('get_freq' + error)
        }

    }


    get_product = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        const object = {
            product_id: params.product_id
        }
        try {
            await post(object, 'trader/get_product_information', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        product_data: result.result,
                        price: result.result.price,
                        plant: result.result.plant,
                    })
                    this.get_freq(result.result.product_name)

                    setTimeout(() => {
                        this.order_quantity()
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

    // add_cart = async () => {

    //     this.state.plant.map((element, index) => {
    //         this.state.data.push({
    //             plant_id: element.plant_id,
    //             total_plant: this.state.total_plant = element.volume * this.state.amount,
    //         })
    //     })

    //     let data = {
    //         data_plant: this.state.data
    //     }
    //     try {
    //         await post(data, 'trader/add_cart_trader', user_token).then((result) => {
    //             if (result.success) {
    //                 window.location.href = '/T_cart'

    //                 setTimeout(() => {
    //                     console.log("get_product11", result)
    //                 }, 500)
    //             } else {
    //                 alert(result.error_message)
    //             }
    //         });
    //     } catch (error) {
    //         alert("get_product22" + error);
    //     }
    // }

    sum_data = (data) => {
        let sum = 0;

        for (var i = 0; i < data.length; i++) {
            let data_sum = data[i];
            sum += data_sum;
            sum.toLocaleString()
        }
        return sum;
    }

    sum_data_in_month = (dd) => {
        let sum_se = []
        let Jan = 0;
        let Feb = 0;
        let Mar = 0;
        let Apr = 0;
        let May = 0;
        let Jun = 0;
        let Jul = 0;
        let Aug = 0;
        let Sep = 0;
        let Oct = 0;
        let Nov = 0;
        let Dec = 0;
        dd.rang.map((ele_rang) => {
            ele_rang.data.map((ele_rang_data, index) => {
                if (index === 0) {
                    Jan += ele_rang_data
                }
                else if (index === 1) {
                    Feb += ele_rang_data
                }
                else if (index === 2) {
                    Mar += ele_rang_data
                }
                else if (index === 3) {
                    Apr += ele_rang_data
                }
                else if (index === 4) {
                    May += ele_rang_data
                }
                else if (index === 5) {
                    Jun += ele_rang_data
                }
                else if (index === 6) {
                    Jul += ele_rang_data
                }
                else if (index === 7) {
                    Aug += ele_rang_data
                }
                else if (index === 8) {
                    Sep += ele_rang_data
                }
                else if (index === 9) {
                    Oct += ele_rang_data
                }
                else if (index === 10) {
                    Nov += ele_rang_data
                }
                else if (index === 11) {
                    Dec += ele_rang_data
                }
                else { }

            })
        })
        sum_se = [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec]


        return sum_se
    }


    volume_check = (data_price, index) => {
        let dataSortVolume = data_price.sort(compare)
        let price = 0
        dataSortVolume.map((element) => {
            if (this.state.amount >= element.volume) {
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

    percent_volume = (volume) => {
        let sum = 0
        volume.map((element) => {
            sum += element
        })
        sum = (sum / this.state.frequency[0].sum) * 100
        return sum.toFixed(2)
    }
    sum_volume = (volume) => {
        let sum = 0
        volume.map((element) => {
            sum += element
        })
        return sum
    }
    order_quantity = () => {
        let re = 0
        this.state.detail.map((element) => {
            if (element.plant_id === this.state.product_data.product_id) {
                re = element.amount
            }
        })
        this.setState({
            quantity: re
        })
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

    render_page = (user_type) => {
        let render_page
        switch (user_type) {

            case "4": render_page =

                <div className="App">

                    <div className="Row">
                        <div className="col-12">
                            <h2 style={{ textAlign: "center" }}>คำสั่งซื้อวัตถุดิบของหมายเลขคำสั่งซื้อ {this.state.order.order_id}</h2></div>
                    </div>
                    <div className="Row">
                        <div className="col-2" style={{ marginRight: "2%" }}>
                            {this.state.product_data.image ? <img className="IMG_Detail_SEM" src={ip + this.state.product_data.image} alt={this.state.product_data.product_name} /> : <img className="IMG_Detail" src={this.state.default_image} alt={this.state.product_data.product_name} />}
                        </div>
                        {console.log("product_data : ", this.state.product_data)}
                        <div className="col-6">
                            <h3>{this.state.product_data.product_name}</h3>
                            <h5>{this.state.product_data.product_status}</h5>
                            <h4>จำนวนที่มีอยู่ {this.state.sum_vol} กิโลกรัม</h4>
                            <h4>จำนวนที่ต้องสั่งซื้อ {this.state.quantity} กิโลกรัม</h4>

                            {
                                this.state.frequency.map((element, index) => {
                                    return (
                                        <Accordion allowMultipleExpanded={true}>
                                            {
                                                element.se.map((element_se, index_se) => {
                                                    return (
                                                        <AccordionItem title={
                                                            <div className="Row">
                                                                <div className="col-7" style={{ textAlign: 'left' }}>{element_se.name + " : " + this.sum_volume(this.sum_data_in_month(element_se)) + ' กิโลกรัม'}
                                                                </div>
                                                                <div className="col-3">
                                                                    <progress className="progress" value={this.percent_volume(this.sum_data_in_month(element_se))} max="100" />
                                                                    <div style={{marginTop:"-39px",marginLeft:"5px",color:"white"}}>{this.percent_volume(this.sum_data_in_month(element_se))}%</div>
                                                                    {/* <div class="progress">
                                                                        <div class="progress-bar progress-bar-striped active" role="progressbar"
                                                                            aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" width={this.percent_volume(this.sum_data_in_month(element_se))}>
                                                                            {this.percent_volume(this.sum_data_in_month(element_se))}
                                                                        </div>
                                                                    </div> */}
                                                                </div>
                                                            </div>}>

                                                            <table style={{ textAlign: "center" }}>
                                                                <tr>
                                                                    <th rowSpan="2">จำนวนครั้งที่ส่ง</th>
                                                                    <th colSpan="12">เดือน</th>
                                                                </tr>
                                                                <tr>
                                                                    {this.state.month.map((element_month) => {
                                                                        return (
                                                                            <th>{element_month} </th>
                                                                        )
                                                                    })}
                                                                </tr>
                                                                {element_se.rang.map((element_rang, index_rang) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{index_rang + 1}</td>
                                                                            {element_rang.data.map((element_data) => {
                                                                                return (
                                                                                    <td>{(element_data)}</td>
                                                                                )
                                                                            })}
                                                                        </tr>

                                                                    )
                                                                })
                                                                }

                                                                <tr>
                                                                    <th>รวมทั้งหมด</th>
                                                                    {this.sum_data_in_month(element_se, index_se).map((ele_sum) => {
                                                                        return (
                                                                            <th>{(ele_sum)}</th>
                                                                        )
                                                                    })}

                                                                </tr>
                                                            </table>
                                                        </AccordionItem>
                                                    )
                                                })
                                            }
                                        </Accordion>
                                    )
                                })
                            }
                            {/* <input type="number"
                              name="quantity" min="1"
                              id="amount" placeholder="จำนวนที่ต้องการสั่งซื้อ"
                              onChange={this.handleChange} />
                          <button className="BTN_AddCart" onClick={() => { this.add_cart() }}>เพิ่มในตะกร้าสินค้า</button> */}


                        </div>
                        <div className="col-4" style={{
                            borderLeft: "2px solid black",
                            paddingRight: "15px",
                            paddingLeft: "15px",
                        }}>
                            <h3>รายการสั่งซื้อวัตถุดิบ</h3>
                            {
                                this.state.frequency.map((element, index) => {
                                    return (
                                        <div>
                                            {
                                                element.se.map((element_se, index_se) => {
                                                    return (
                                                        <div>
                                                            <input type="checkbox" />{element_se.name}
                                                            <div>
                                                                <input type="number" style={{ marginTop: "0px" }}
                                                                    name="quantity" min="1"
                                                                    id="amount" placeholder="จำนวนที่ต้องการสั่งซื้อ"
                                                                    onChange={this.handleChange} /></div>
                                                            <div>
                                                                <h4 style={{ marginTop: "10px" }}>+ ราคาขนส่ง</h4>
                                                                <h4 style={{ textAlign: "right", marginTop: "-10px" }}> ราคารวม xxx บาท</h4>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <h3>รวมทั้งหมด</h3>

                                            <button className="BTN_AddCart" onClick={() => { this.onOpenModal() }}>ยืนยันการสั่งซื้อ</button>
                                        </div>
                                    )
                                })
                            }

                        </div>


                        <div className="col-1"></div>
                    </div>
                    <Modal open={this.state.open} onClose={this.onCloseModal}>
                        <div className="Row">
                            <div className="col-12">
                                <h3 style={{ textAlign: "center" }}>รายการสั่งซื้อวัตถุดิบ "ชื่อวัตถุดิบ"</h3>
                                รายชื่อ SE ที่สั่ง จำนวนที่สั่งซื้อ + ราคาขนส่ง รวมทั้งหมด
                               ราคารวมทั้งหมด
                             <button className="BTN_Signin">ออกใบคำสั่งซื้อ</button>
                                <button className="BTN_Signup" onClick={() => { this.onCloseModal() }}>ยกเลิก</button>
                            </div>
                        </div>

                    </Modal>
                </div>
                break;

            default: render_page = <div className="App">
                <h1>เกิดข้อผิดพลาด</h1>
            </div>
                break;
        }
        return render_page
    }

    render() {

        return (
            <div>
                {this.render_page(this.state.get_user ? this.state.get_user.user_type : null)}


            </div>
        );
    }
}
export default ProductDetail;