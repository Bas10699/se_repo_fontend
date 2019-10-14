import React, { Component } from 'react'

class T_Order extends Component {
    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>ส่งความต้องการพัฒนาผลิตภัณฑ์</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        กรอกความต้องการพัฒนาผลิตภัณฑ์
                        
                        <button>ยกเลิก</button>
                        <button>บันทึกเป็นฉบับร่าง</button>
                        <button>ส่งความต้องการพัฒนา</button>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        )
    }
}
export default T_Order;