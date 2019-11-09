import React, { Component } from 'react'

class Create_Info extends Component {
    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>สร้างสูตร</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-5">กราฟ</div>
                    <div className="col-5">กรอกข้อมูล</div>
                    <div className="col-1"></div>
                </div>
            </div>
        )
    }
}
export default Create_Info;