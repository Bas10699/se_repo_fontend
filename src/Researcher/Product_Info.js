import React, { Component } from 'react';

class Product_Info extends Component {
    render () {
        return (
            <div className="App">

                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>ข้อมูลผลิตภัณฑ์</h3>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-12">
                        <table style={{ textAlign: "center" }}>
                            <tr>
                                <th>ชื่อผลิตภัณฑ์</th>
                                <th>สารอาหารที่ต้องการ</th>
                                <th>จำนวนผลิตภัณฑ์</th>
                                <th>ระยะเวลาการพัฒนา</th>
                                <th>กรอกข้อมูล</th>
                                <th>พัฒนาเสร็จสิ้น</th>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
} export default Product_Info;