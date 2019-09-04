//แก้ไขสินค้า
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
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
            amount: 1,
            data: [],
            data_cart: [],
            total_plant: [],
            total_price: [],
            cart_product: [],
            pro_name: null,
            pro_amount: null,
            pro_cost: null,
            pro_details: null,
            pro_price: null,
            pro_status: null,
            pro_id: null,
            pro_image: null,
            addInputBox: null,
            default_image: 'https://www.lamonde.com/pub/media/catalog/product/placeholder/default/Lamonde_-_Image_-_No_Product_Image_4.png',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        this.get_product()
        this.setState(this.props.location.params)
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





    onSubmit(e) {
        const new_product = {
            pro_name: this.refs.pro_name.value,
            pro_amount: this.refs.state.pro_amount.value,
            pro_cost: this.refs.state.pro_cost.value,
            pro_details: this.refs.state.pro_details.value,
            pro_price: this.refs.state.pro_price.value,
            pro_status: this.refs.state.pro_status.value,
            pro_id: this.refs.state.pro_id.value,
            pro_image: this.refs.state.pro_image.value
        }
        this.edit_product(new_product);
        e.preventDefault();
    }

    updata() {
        this.setState({
            pro_name: this.state.get_product.pro_name,
            pro_amount: this.state.get_product.pro_amount,
            pro_cost: this.state.get_product.pro_cost,
            pro_details: this.state.get_product.pro_details,
            pro_price: this.state.get_product.pro_price,
            pro_status: this.state.get_product.pro_status,
            pro_id: this.state.get_product.pro_id,
            pro_image: this.state.get_product.pro_image
        });
    }

    edit_product = async () => {

        let object = {
            pro_name: this.state.pro_name,
            pro_amount: this.state.pro_amount,
            pro_cost: this.state.pro_cost,
            pro_details: this.state.pro_details,
            pro_price: this.state.pro_price,
            pro_status: this.state.pro_status,
            pro_id: this.state.pro_id,
            pro_image: this.state.pro_image
        };
        console.log("image", this.state.pro_image)

        try {
            await post(object, "neutrally/update_plant_stock", user_token)
                .then(res => {
                    console.log("edit1" + res);

                    if (res.success) {
                        alert("แก้ไขข้อมูลสินค้าเรียบร้อย");
                        window.location.href = "/Product";
                    } else {
                        alert("edit_alert : " + res.error_message);
                    }
                });
        } catch (error) {
            alert('update_plant_stock error:' + error);
        }
        console.log("edit2" + this.state);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
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
                    default_image: reader.result
                });
            }
        }

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
                        {this.state.product_data.image ? <img className="IMG_Detail" src={ip + this.state.product_data.image} alt={this.state.product_data.product_name} /> : <img className="IMG_Detail" src={this.state.default_image} alt={this.state.product_data.product_name} />}
                        <input type="file"
                            onChange={(e) => this.uploadpicture(e)} />

                    </div>
                    <div className="col-1"></div>
                    <div className="col-5">
                        <h4>ชื่อสินค้า</h4><input type="text"
                            name="product_name" id="product_name"
                            value={this.state.product_data.product_name}
                            onChange={this.handleInputChange} />

                        <h4>รายละเอียดสินค้า</h4>
                        <textarea rows="4" cols="80" name="product_detail" id="product_detail"
                            form="usrform" value={this.state.product_data.product_detail}
                            onChange={this.handleInputChange} />


                        <h4>ราคาขายปลีก</h4>
                        <h4><input type="number" style={{ width: "20%" }}
                            name="cart_product" id="cart_product" min="1"
                            value={addComma(this.sum_price(this.state.cart_product))}
                            onChange={this.handleInputChange} />บาท / กิโลกรัม</h4>


                        <h4>ราคาขายส่ง</h4>
                        <h4><input type="number" style={{ width: "20%" }}
                            name="cart_product" id="cart_product" min="1"
                            value={addComma(this.sum_price(this.state.cart_product))}
                            onChange={this.handleInputChange} /> บาท /

                            <input type="number" style={{ width: "20%" }}
                                name="cart_product" id="cart_product" min="1"
                                value={addComma(this.sum_price(this.state.cart_product))}
                                onChange={this.handleInputChange} />
                            หน่วย
                            <select style={{ width: "20%" }}>
                                <option value="kg">กิโลกรัม</option>
                                <option value="tun">ตัน</option>
                            </select>
                        </h4>

                        <button className="BTN_AddCart" >เพิ่มราคาส่ง</button>
                    </div>
                    <div className="col-1"></div>


                </div>
                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <h3 style={{ textAlign: "center" }}>รายการวัตถุดิบ</h3>

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
                                            <td style={{ textAlign: "center" }}>{addComma(element_plant.price)} บาท</td>
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
                        </table>

                        <button className="BTN_Signin"
                            style={{ float: "right" }}
                            onClick={() => this.edit_product()}>
                            บันทึกการเปลี่ยนแปลง
                        </button>
                        <button className="BTN_Signup" style={{ float: "right" }} >ยกเลิก</button>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>

        )
    }
}
export default EditProduct;