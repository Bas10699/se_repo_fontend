import React, { Component } from 'react'
import { NavLink, Prompt } from 'react-router-dom'
import { user_token, addComma } from '../Support/Constance';
import { ip, get, post } from '../Support/Service';
import queryString from 'query-string';

class AddProduct extends Component {
    render(){
        return(
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{textAlign:"center"}}>เพิ่มสินค้า</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-5">รูป</div>
                    <div className="col-1"></div>
                    <div className="col-5"><h4>ชื่อสินค้า</h4>
                        <input type="text"
                            name="product_data" id="product_name"/>

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


            </div>
        )
    }
}
export default AddProduct;