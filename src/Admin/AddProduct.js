import React, { Component } from 'react'
import { NavLink, Prompt } from 'react-router-dom'
import { user_token, addComma } from '../Support/Constance';
import { ip, get, post } from '../Support/Service';

class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_name: null,
            product_detail: null,
            cost: 0
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    add_product = async () => {
        let obj = {

        }
        try {
            await post('')
        }
        catch (error) {
            alert(error)
        }
    }
    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>เพิ่มสินค้า</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-5">รูป</div>
                    <div className="col-1"></div>
                    <div className="col-5"><h4>ชื่อสินค้า</h4>
                        <input type="text"
                            name="product_data" id="product_name" />

                        <h4>รายละเอียดสินค้า</h4>
                        <textarea rows="4" cols="80" name="product_detail" id="product_detail"
                            form="usrform" />


                        <h4>ราคาทุน (รับซื้อจาก SE ย่อย)</h4>
                        <h4><input type="number" style={{ width: "20%" }}
                            name="cost" id="cost" min="1"
                        /> บาท / กิโลกรัม</h4>


                        <h4>ราคาขาย</h4>
                        <h4><input type="number" style={{ width: "20%" }}
                            name="cart_product" id="cart_product" min="1"
                        /> บาท /
    
                            <input type="number" style={{ width: "20%" }}
                                name="cart_product" id="cart_product" min="1"
                            />
                            หน่วย
                            <select style={{ width: "20%" }} name="volum">
                                <option value="kg">กิโลกรัม</option>
                                <option value="tun">ตัน</option>
                            </select>
                        </h4>

                        <button className="BTN_AddCart" >เพิ่มราคาขาย</button></div>
                    <div className="col-1"></div>
                </div>
                <div className="Row">
                    <div className="col-8">
                    </div>
                    <button>เพิ่มสินค้า</button>
                </div>
            </div>
        )
    }
}
export default AddProduct;