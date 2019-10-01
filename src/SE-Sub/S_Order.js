//se-sub คำสั่งซื้อจาก se-middle
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token } from '../Support/Constance'

class S_Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order_se: [],
        }
    }
    componentWillMount() {
        this.get_order_se()
    }
    get_order_se = async () => {
        try {
            await get('neo_firm/get_order_se', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        order_se: result.result
                    })
                    console.log(result)
                }
                else {
                    alert(result.error_message)
                }
            })
        } catch (error) {
            alert('get_order_se: ' + error)

        }
    }
    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>คำสั่งซื้อจาก Neo_firm</h2>
                    </div>
                </div>


                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-4">
                        <input type="search" placeholder="ค้นหา" 
                        // onChange={this.filterID} 
                        />
                    </div>
                    <div className="col-4">
                        <input type="date" name="date" placeholder="ค้นหา" 
                        // onChange={this.filterDate} 
                        />
                        {/* <button onClick={() => this.SortId()} className="BTN_AddCart">เรียงล่าสุด</button> */}
                    </div>
                    <div className="col-2"></div>
                </div>



                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <table style={{ textAlign: "center" }}>
                            <tr>
                                <th>ลำดับ</th>
                                <th>รหัสใบสั่งซื้อ</th>
                                <th>ชื่อพืช</th>
                                <th>วันที่</th>
                                <th>จำนวน</th>
                            </tr>
                            {this.state.order_se.map((element, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{element.order_se_id}</td>
                                    <td>{element.plant_name}</td>
                                    <td></td>
                                    <td>{element.amount}</td>
                                </tr>
                            )
                        })}
                        </table>
                        
                    </div>
                    <div className="col-2"></div>
                </div>

            </div>

        )
    }
}
export default S_Order