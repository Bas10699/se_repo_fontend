//เรียกดูคำสั่งแปรรูปผลิตภัณฑ์
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { element } from 'prop-types';
import { user_token } from '../../Support/Constance';
import { get, post } from '../../Support/Service';
import Modal from 'react-responsive-modal';
import Checkbox from '../M_Research/Checkbox_R'

const researcher = [
    {
        name: "ดร.จำปา ดอกจำปี",
        skill: 'นักพัฒนาผลิตภัณฑ์ทางเกษตร',
        stock: '10 ชิ้น',      
    },
    {
        name: "ดร.ฉลาม ไม่กินเนื้อ",
        skill: 'นักพัฒนาผลิตภัณฑ์ทางทะเล',
        stock: '0 ชิ้น',      
    },
    {
        name: "ดร.สำอางค์ คนสวย",
        skill: 'นักพัฒนาผลิตภัณฑ์ทางเครื่องสำงอางค์',
        stock: '5 ชิ้น',      
    }
]

class M_R_Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            get_demand: [],
            check_array:[],
            open:false,

        }
    }
    componentWillMount() {
        this.get_demand()
    }
    get_demand = async () => {
        try {
            await get('researcher/get_demand_trader_all', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_demand: result.result
                    })
                    console.log(result.result)
                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('get_demand' + error)
        }
    }

    onCloseModal = () => {
        this.setState({ open: false });

    };

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>คำสั่งแปรรูปผลิตภัณฑ์</h3>
                    </div>
                </div>
                <div className="Row">
                    <div className="col-12">
                        <table>
                            <tr>
                                <th>ผู้สั่งพัฒนาผลิตภัณฑ์</th>
                                <th>ชื่อผลิตภัณฑ์</th>
                                <th>ข้อมูล</th>
                                <th>ส่งความต้องการ</th>
                                <th>ชื่อนักวิจัยทีเลือก</th>
                                <th>นักวิจัยยืนยัน</th>
                            </tr>

                            {this.state.get_demand.map((element) => {
                                return (
                                    <tr style={{textAlign:"center"}}>
                                        <td>trader 1</td>
                                        <td>{element.product_name}</td>
                                        <td></td>
                                        <td><button onClick={()=>this.setState({ open: true })}>เลือกนักวิจัย</button></td>
                                        <td>{this.state.check_array}</td>
                                        <td>ตกลง : ยกเลิก</td>
                                        
                                    </tr>
                                    
                                )
                            })}

                        </table>




                    </div>
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="Row" style={{ width: "500px" }}>
                        <div className="col-11">
                            <h3 style={{ textAlign: "center" }}>รายชื่อนักวิจัยสำหรับการพัฒนา [ชื่อผลิตภัณฑ์]</h3>
                            <Checkbox
                                    option={researcher}
                                    check_array={this.state.check_array}
                                    return_func={(event) => {
                                        console.log('event', event)
                                        this.setState({
                                            check_array: event
                                        })
                                    }} />
                                    กำหนดวันที่ต้องการ <input />
                                    <button onClick={()=>this.onCloseModal()}>ยืนยัน</button>
                        </div>
                        <div className="col-1" />
                    </div>
                    
                </Modal>

            </div>
        )
    }
} export default M_R_Order;