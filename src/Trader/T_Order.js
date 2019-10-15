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
                        <div>
                            <h5>ชื่อโครงการพัฒนา <input type="text" style={{width:"50%"}}/></h5>
                            <h5 style={{marginBottom:"0"}}>รายละเอียด</h5>
                        <textarea name="message" rows="10" style={{ width: "100%" }}></textarea>
                        </div>
                        <div>
                            <button className="BTN_Cencle">ยกเลิก</button>
                            <button className="BTN_Signup" style={{marginTop:"0"}}>ส่งความต้องการพัฒนา</button>
                            <button className="BTN_Signin" style={{marginTop:"0"}}>บันทึกเป็นฉบับร่าง</button>
                            
                        </div>

                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        )
    }
}
export default T_Order;