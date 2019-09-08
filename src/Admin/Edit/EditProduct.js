//แก้ไขสินค้า
import React, { Component } from 'react';
import { NavLink, Prompt } from 'react-router-dom'
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
            addInputBox: null,
            open_up_image: false,
            default_image: 'https://www.lamonde.com/pub/media/catalog/product/placeholder/default/Lamonde_-_Image_-_No_Product_Image_4.png',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        this.get_product()
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
            product_name: this.state.product_data.product_name
        });
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
        let url = this.props.location.search
        let params = queryString.parse(url);
        let object = {
            product_id: params.product_id,
            image: this.state.default_image,
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

    handleInputChange(e) {
        this.setState({
            [e.target.id]: e.target.value
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
                    default_image: reader.result,
                    open_up_image: true
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
                        {this.state.open_up_image ? <img className="IMG_Detail" src={this.state.default_image} alt={this.state.product_data.product_name} /> : this.state.product_data.image ? <img className="IMG_Detail" src={ip + this.state.product_data.image} alt={this.state.product_data.product_name} /> : <img className="IMG_Detail" src={this.state.default_image} alt={this.state.product_data.product_name} />}
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
                            form="usrform" value={this.state.product_data.product_detail}
                            onChange={this.handleInputChange} />


                        <h4>ราคาทุน (รับซื้อจาก SE ย่อย)</h4>
                        <h4><input type="number" style={{ width: "20%" }}
                            name="cost" id="cost" min="1"
                            value={this.state.cost}
                            onChange={this.handleInputChange} /> บาท / กิโลกรัม</h4>


                        <h4>ราคาขาย</h4>
                        <h4><input type="number" style={{ width: "20%" }}
                            name="cart_product" id="cart_product" min="1"
                            value={addComma(this.sum_price(this.state.cart_product))}
                            onChange={this.handleInputChange} /> บาท /

                            <input type="number" style={{ width: "20%" }}
                                name="cart_product" id="cart_product" min="1"
                                value={addComma(this.sum_price(this.state.cart_product))}
                                onChange={this.handleInputChange} />
                            หน่วย
                            <select style={{ width: "20%" }} name="volum">
                                <option value="kg">กิโลกรัม</option>
                                <option value="tun">ตัน</option>
                            </select>
                        </h4>

                        <button className="BTN_AddCart" >เพิ่มราคาขาย</button>
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
                            onClick={() => { if (window.confirm('บันทึกการเปลี่ยนแปลง?')) { this.edit_product() }; }}>
                            บันทึกการเปลี่ยนแปลง
                        </button>
                        <button className="BTN_Signup" onClick={() => this.refreshPage()} style={{ float: "right" }} >ยกเลิก</button>
                    </div>
                    <div className="col-1"></div>
                </div>
                <Prompt when={this.state.open_up_image} message="คุณยังไม่ได้บันทึกการเปลี่ยนแปลง ต้องการออกจากหน้านี้ไหม" />
            </div>

        )
    }
}
export default EditProduct;