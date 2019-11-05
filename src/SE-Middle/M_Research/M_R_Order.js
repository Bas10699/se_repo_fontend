//เรียกดูคำสั่งแปรรูปผลิตภัณฑ์
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { element } from 'prop-types';
import { user_token } from '../../Support/Constance';
import { get, post } from '../../Support/Service';
import Modal from 'react-responsive-modal';
import Checkbox from '../M_Research/Checkbox_R'

// const researcher = [
//     {
//         name: "ดร.จำปา ดอกจำปี",
//         skill: 'นักพัฒนาผลิตภัณฑ์ทางเกษตร',
//         stock: '10 ชิ้น',      
//     },
//     {
//         name: "ดร.ฉลาม ไม่กินเนื้อ",
//         skill: 'นักพัฒนาผลิตภัณฑ์ทางทะเล',
//         stock: '0 ชิ้น',      
//     },
//     {
//         name: "ดร.สำอางค์ คนสวย",
//         skill: 'นักพัฒนาผลิตภัณฑ์ทางเครื่องสำงอางค์',
//         stock: '5 ชิ้น',      
//     }
// ]

class M_R_Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            get_demand: [],
            check_array:[],
            open:false,
            researcher:[],
            date:"",
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentWillMount() {
        this.get_demand()
        this.get_reaearcher()
    }

    get_reaearcher = async () => {
        try {
            await get('neutrally/get_name_researcher',user_token).then((result) => {
                if(result.success){
                    this.setState({
                        researcher:result.result
                    })
                    console.log("get_reaearcher",result.result)
                }
                else{
                    alert(result.error_message)
                }
            })
            
        } catch (error) {
            alert('get_reaearcher' + error)
        }
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

    send_data = () => {
        console.log("send_data",this.state.date+" : "+this.state.check_array)
        this.setState({open:false})
    }

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>คำสั่งแปรรูปผลิตภัณฑ์</h3>
                    </div>
                </div>
                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10">
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
                    <div className="col-1"></div>
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="Row" style={{ width: "800px" }}>
                        <div className="col-12">
                            
                            <h3 style={{ textAlign: "center" }}>รายชื่อนักวิจัยสำหรับการพัฒนา [ชื่อผลิตภัณฑ์]</h3>
                            กำหนดวันที่ต้องการ <input type="date" id="date" onChange={this.handleChange}/>
                            <Checkbox
                                    option={this.state.researcher}
                                    check_array={this.state.check_array}
                                    return_func={(event) => {
                                        console.log('event', event)
                                        this.setState({
                                            check_array: event
                                        })
                                    }} />
                                    
                                    <button onClick={()=>this.send_data()}>ยืนยัน</button>
                        </div>
                    </div>
                    
                </Modal>

            </div>
        )
    }
} export default M_R_Order;