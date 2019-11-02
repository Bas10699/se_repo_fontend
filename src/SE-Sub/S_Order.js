//se-sub คำสั่งซื้อจาก se-middle
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token } from '../Support/Constance'
import {NavLink} from 'react-router-dom'
import moment from 'moment'
import one from '../Image/one.png'
import two from '../Image/two.png'
import twodis from '../Image/twodis.png'
import three from '../Image/three.png'
import threedis from '../Image/threedis.png'
import four from '../Image/four.png'
import fourdis from '../Image/fourdis.png'
import five from '../Image/five.png'
import fivedis from '../Image/fivedis.png'

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

    render_status = (order_status) => {
        let render_tag

        switch (order_status) {
            case 0:
                render_tag = <div>
                    <img src={one} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={twodis} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={threedis} style={{ width: "25px", height: "25px", marginRight: "5px"}} alt="1" />
                    <img src={fourdis} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    {/* <img src={fivedis} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" /> */}
                </div>
                break;
            case 1:case 2:
                render_tag = <div>
                    <img src={one} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={two} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={threedis} style={{ width: "25px", height: "25px", marginRight: "5px"}} alt="1" />
                    <img src={fourdis} style={{ width: "25px", height: "25px", marginRight: "5px"}} alt="1" />
                    {/* <img src={fivedis} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" /> */}
                </div>
                break;
             case 3:
                render_tag = <div>
                    <img src={one} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={two} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={three} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={fourdis} style={{ width: "25px", height: "25px", marginRight: "5px"}} alt="1" />
                    {/* <img src={fivedis} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" /> */}
                </div>
                break;
           
                case 4:
                render_tag = <div>
                    <img src={one} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={two} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={three} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    <img src={four} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                    {/* <img src={fivedis} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" /> */}
                </div>
                break;
                // case 4:
                // render_tag = <div>
                //     <img src={one} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                //     <img src={two} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                //     <img src={three} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                //     <img src={four} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                //     <img src={five} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="1" />
                // </div>
                // break;
                
            default:
                render_tag = <div>
                    <div className="FontDanger"> เกิดข้อผิดพลาด </div>
                </div>
                break;
        }
        return render_tag
    }


    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>คำสั่งซื้อจาก Neo_trust</h2>
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
                                <th>สถานะ</th>
                            </tr>
                            {this.state.order_se.map((element, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td><NavLink to={'S_Order/Order?orderId='+element.order_se_id}>{element.order_se_id}</NavLink></td>
                                    <td>{element.plant_name}</td>
                                    <td>{moment(element.order_se_date).utc().format('DD/MM/YYYY')}</td>
                                    <td>{element.amount} กิโลกรัม</td>
                                    <td>{this.render_status(element.order_se_status)}</td>



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