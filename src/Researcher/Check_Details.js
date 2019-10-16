import React, { Component } from 'react';

class Check_Details extends Component {
    render () {
        return (
            <div className="App">

                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>ตรวจสอบรายละเอียด</h3>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-12">
                        <table style={{ textAlign: "center" }}>
                            <tr>
                                <th>ชื่อผลิตภัณฑ์</th>
                                <th>ชื่อสูตร</th>
                                <th>สารอาหาร</th>
                                <th>วัตถุดิบ</th>
                                <th>รูปภาพ</th>
                                <th>เเก้ไขข้อมูล</th>
                                <th>ลบข้อมูล</th>
                                <th>ส่งข้อมูล</th>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
} export default Check_Details;