import React, { Component } from 'react';

class Request extends Component {
    constructor(props) {
        super(props);
        this.stte = {
            product_type: null,
            product_category: null,
            other_details: null
        };
    }
    render () {
        return (
            <div className="App">

                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>รับข้อมูลความต้องการจาก SE กลาง</h3>
                    </div>
                </div>
                <div className="Row">
                    <div className="col-4"></div>
                    <div className="col-8">
                        <h4>ชนิดของสินค้า</h4>
                        <input type="text" 
                            id="product_type"
                        />
                        <h4>ประเภทของสินค้า</h4>
                        <input type="text"
                            id="product_category"
                        />
                        <h4>รายละเอียดอื่นๆ</h4>
                        <textarea rows="5" cols="100"
                            id="other_details"
                        />
                        <button className="BTN_Signin">ส่งความต้องการ</button>
                        <button className="BTN_Signup">ยกเลิก</button>
                    </div>
                    <div className="col-4"></div>
                </div>

            </div>
        )
    }
} export default Request;