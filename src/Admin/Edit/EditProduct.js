//แก้ไขสินค้า
import React, { Component } from 'react';
import { NavLink, Prompt, Redirect } from 'react-router-dom'
import { user_token, addComma } from '../../Support/Constance';
import { ip, get, post } from '../../Support/Service';
import queryString from 'query-string';

class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_data: [],
            search_order: [],
            plant: [],
            plant_id: [],
            price_p: [],
            amount: 1,
            data: [],
            data_cart: [],
            total_plant: [],
            total_price: [],
            cart_product: [],
            addInputBox: null,
            open_up: false,
            edit_image: false,
            default_image: 'https://www.lamonde.com/pub/media/catalog/product/placeholder/default/Lamonde_-_Image_-_No_Product_Image_4.png',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        if (!user_token) {
            this.props.history.push('/')
        } else {
            this.get_product()
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
                        plant: result.result.plant
                    })
                    this.updateDataInForm()
                    setTimeout(() => {
                        console.log("get_product_information", result.result)
                    }, 500)

                } else {
                    window.location.href = "/Product";
                    alert(result.error_message)
                }
            });
        } catch (error) {
            alert("get_product_information " + error);
        }
    }

    updateDataInForm() {
        this.setState({
            cost: this.state.product_data.cost,
            product_name: this.state.product_data.product_name,
            details: this.state.product_data.details,
            price_p: this.state.product_data.price,
            amount_stock: this.state.product_data.amount_stock,
            volume_sold: this.state.product_data.volume_sold
        });
        if (this.state.product_data.image) {
            this.setState({
                default_image: ip + this.state.product_data.image
            })
        }
    }

    filterSearch = (event) => {
        var updatedList = this.state.product_data;
        updatedList = updatedList.filter(function (item) {
            return item.product_name.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({
            search_order: updatedList,
        });
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

    sum_price = (data) => {
        let sum = 0;
        data.map((element) => {
            sum += (element.price * element.amount)
        })

        return sum;
    }

    refreshPage = () => {
        window.location.reload();
    }

    edit_product = async () => {
        if (this.state.edit_image) {
            var image = this.state.default_image
        }
        else {
            var image = 0
        }
        if (this.state.open_up) {
            let url = this.props.location.search
            let params = queryString.parse(url);
            let object = {
                product_id: params.product_id,
                image: image,
                product_name: this.state.product_name,
                details: this.state.details,
                cost: this.state.cost,
                volume_sold: this.state.volume_sold,
                price: JSON.stringify(this.state.price_p)


            };
            console.log('gg', object)

            try {
                await post(object, "neutrally/update_plant_stock", user_token)
                    .then((result) => {
                        console.log("edit1" + result);
                        if (result.success) {
                            window.location.reload();
                        } else {
                            alert("edit_alert : " + result.error_message);
                        }
                    });
            } catch (error) {
                alert('update_plant_stock error:' + error);
            }
            console.log("edit2" + this.state);
        }
        else {
            window.location.reload()
        }
    }
    add_price = () => {
        let PriceSell = this.state.price_p
        PriceSell.push({
            price: 0,
            volume: 0,
        })
        this.setState({
            price_p: PriceSell
        })
    }

    handleInputChange(e) {
        this.setState({
            [e.target.id]: e.target.value,
            open_up: true
        });
    }
    handleChange_price = (event) => {

        let price = this.state.price_p

        if ([event.target.id] == 'price') {
            price[event.target.name].price = parseInt(event.target.value)
        }
        if ([event.target.id] == 'volume') {
            price[event.target.name].volume = parseInt(event.target.value)
        }

        this.setState({
            price_p: price,
            open_up: true
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
                    default_image: reader.result,
                    open_up: true,
                    edit_image: true
                });
            }
        }

    }

    delete_index = (index) => {
        
        alert("ลบ ราคา")
    }

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>แก้ไขสินค้า</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-5">
                        <img className="IMG_Detail" src={this.state.default_image} alt="product" />
                        <input type="file"
                            onChange={(e) => this.uploadpicture(e)} />
                    </div>
                    <div className="col-1"></div>
                    <div className="col-5">
                        <h4>ชื่อสินค้า</h4>
                        <input type="text"
                            name="product_data" id="product_name"
                            value={this.state.product_name}
                            onChange={(e) => this.handleInputChange(e)} />

                        <h4>รายละเอียดสินค้า</h4>
                        <textarea rows="4" cols="80" name="product_detail" id="product_detail"
                            form="usrform" value={this.state.details}
                            onChange={this.handleInputChange} />


                        <h4>ราคาทุน (รับซื้อจาก SE ย่อย)</h4>
                        <h4><input type="number" style={{ width: "20%" }}
                            name="cost" id="cost" min="1"
                            value={this.state.cost}
                            onChange={this.handleInputChange} /> บาท / กิโลกรัม</h4>
                        <h4>จำนวนที่มีอยู่ในคลัง</h4>
                        <h4><input type="number" style={{ width: "20%" }}
                            name="amount_stock" id="amount_stock" min="0"
                            value={this.state.amount_stock}
                            onChange={this.handleInputChange} /> กิโลกรัม</h4>
                        <p>ขายไปแล้ว {this.state.volume_sold} กิโลกรัม</p>


                        <h4>ราคาขาย</h4>
                        {this.state.price_p.map((element, index) => {
                            return (
                                <h4>
                                    <input type="number" style={{ width: "20%" }}
                                        name={index} id="price" min="1"
                                        value={element.price}
                                        onChange={this.handleChange_price} /> บาท /

                            <input type="number" style={{ width: "20%" }}
                                        name={index} id="volume" min="1"
                                        value={element.volume}
                                        onChange={this.handleChange_price} />
                                    หน่วย
                            <select style={{ width: "20%" }} name="volum">
                                        <option value="kg">กิโลกรัม</option>
                                        <option value="tun">ตัน</option>
                                    </select>
                                    <button onClick={() => { this.delete_index(index) }} style={{background: "red" , border:"none" ,color:"white", borderRadius:"50%",padding: "2px 6px"}}>x</button>
                                </h4>
                            )
                        })
                        }

                        <button className="BTN_AddCart" onClick={() => this.add_price()}>เพิ่มราคาขาย</button>
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
                                            <td style={{ textAlign: "center" }}>{addComma(element_plant.price[0].price)} บาท</td>
                                            <td style={{ textAlign: "center" }}>{addComma(this.sum_data(element_plant.data))} กิโลกรัม</td>
                                            <td style={{ textAlign: "center" }}>
                                                {addComma(this.state.total_plant = element_plant.volume * this.state.amount)} กิโลกรัม
                                            </td>
                                            <td>{this.sum_data(element_plant.data) - this.state.total_plant < 0
                                                ? <div style={{ color: "red", textAlign: "center" }}>
                                                    ขาดวัตถุดิบ {addComma(this.state.total_plant - this.sum_data(element_plant.data))} กิโลกรัม
                                                </div>
                                                :
                                                <div style={{ color: "green", textAlign: "center" }}>
                                                    วัตถุดิบมีเพียงพอ
                                                 </div>}
                                            </td>
                                            <td style={{ textAlign: "right" }}>
                                                {addComma(this.state.total_price = element_plant.price * this.state.total_plant)} บาท
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </table> */}

                        <button className="BTN_Signin" 
                            style={{ float: "right",marginBottom:"30px" }}
                            onClick={() => { this.edit_product() }}>
                            บันทึกการเปลี่ยนแปลง
                        </button>
                        <button style={{marginBottom:"30px"}} className="BTN_Signup" onClick={() => this.refreshPage()} style={{ float: "right" }} >ยกเลิก</button>
                    </div>
                    <div className="col-1"></div>
                </div>
                <Prompt when={this.state.open_up} message="คุณยังไม่ได้บันทึกการเปลี่ยนแปลง ต้องการออกจากหน้านี้ไหม" />
            </div>

        )
    }
}
export default EditProduct;