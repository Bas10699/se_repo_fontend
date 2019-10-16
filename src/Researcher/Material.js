import React, { Component } from 'react';

class Material extends Component {
    render () {
        return (
            <div className="App">

                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>ข้อมูลวัตถุดิบ</h3>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <h3 style={{ textAlign: "center" }}>กราฟข้อมูลวัตถุดิบ(เหมือนหน้าวัตถุดิบที่ส่งมอบของ SE ย่อย)</h3>
                    </div>
                    <div className="col-2"></div>
                </div>

            </div>
        )
    }
} export default Material;