//รายละเอียดการซื้อสินค้า
import React, { Component } from 'react';
import queryString from 'query-string';
import { get, post, ip } from '../Support/Service'
import { user_token, addComma } from '../Support/Constance'
import Timeline from './TimelineNeo'
import Checkbox from '../Support/Checkbox'
import moment from 'moment'
import Modal from 'react-responsive-modal'
import { element } from 'prop-types';

class S_OrderDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            order: '',
            selectFarmer: [],
            farmer: [],
            plants: [],
            search_order: [],
            check_array: [],
            OpenProofPaymet: false,
            openIN: false,
            get_user: ''
        }
    }

    componentWillMount() {
        this.get_order()
        this.get_skill_farmer()
        this.get_user()
    }

    onCloseModal = () => {
        this.setState({ OpenProofPaymet: false, openIN: false });

    };

    get_user = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        try {
            await post(params, 'user/show_user', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_user: result.result
                    })
                    setTimeout(() => {
                        console.log("get_user", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                    //alert("user1"+result.error_message);
                }
            });
        } catch (error) {
            alert("get_user2" + error);
        }
    }

    get_order = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        let obj = {
            order_id: params.orderId
        }

        try {
            await post(obj, 'neo_firm/get_detail_order_se', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        order: result.result
                    })
                    console.log(result.result)
                    setTimeout(() => { this.filterPlant(result.result.plant_name) }, 500)

                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('get_order: ' + error)
        }
    }

    get_skill_farmer = async () => {
        try {
            await get('neo_firm/get_farmer_se', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        farmer: this.sort_plant(result.result),
                        plants: result.result,
                        search_order: result.result
                    })

                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('get_skill_farmer: ' + error)
        }
    }

    sort_plant = (data) => {
        const order = data
        function compare(a, b) {
            const order_idA = a.year_value
            const order_idB = b.year_value

            let comparison = 0;
            if (order_idA < order_idB) {
                comparison = 1;
            } else if (order_idA > order_idB) {
                comparison = -1;
            }
            return comparison;
        }
        let sort_order = order.sort(compare)
        return sort_order
    }

    openModel = () => {
        let farmer = this.state.farmer
        let selectFarmer = []

        this.state.check_array.map((element) => {

            selectFarmer.push({
                title_name: farmer[element.check].title_name,
                first_name: farmer[element.check].first_name,
                last_name: farmer[element.check].last_name,
                plant: farmer[element.check].plant,
                amount: element.amount
            })

        })
        console.log(selectFarmer)
        this.setState({
            OpenProofPaymet: true,
            selectFarmer: selectFarmer
        })
    }

    render_Step = (status) => {
        let render_Show
        switch (status) {
            case 0: render_Show = 'คำสั่งซื้อ'
                break;
            case 1: render_Show = 'ยืนยันคำสั่งซื้อ'
                break;
            case 2: render_Show = 'ชำระเงินเเล้ว'
                break;
            case 3: render_Show = 'สินค้าทำการจัดส่ง'
                break;
            case 4: render_Show = 'ตรวจสอบสินค้า'
                break;

            default:
                break;
        }
        return render_Show
    }

    filterPlant = (data) => {
        var updatedList = this.state.plants;
        // console.log(updatedList)
        updatedList = updatedList.filter(function (item) {
            return item.plant.search(data) !== -1;
        });
        this.setState({
            farmer: updatedList,
        });
        // console.log('up',updatedList)
    }

    ChStatus = () => {
        this.setState({
            OpenProofPaymet: false,
            openIN: false,
            order: this.state.order.order_se_status
        })
    }

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>ใบสั่งซื้อเลขที่ {this.state.order.order_se_id}</h2>
                    </div>
                </div>



                <div className="Row">
                    <div className="col-12" style={{ textAlign: "center" }}>
                        <Timeline status={this.state.order.order_se_status} />
                    </div>
                </div>

                <div className="Row" style={{ marginTop: "30px" }}>
                    <div className="col-1"></div>
                    <div className="col-2">
                        <div className="Card" style={{ width: "100%" }}>
                            <h4>{this.state.order.plant_name} </h4>
                            <h5>จำนวน {this.state.order.amount} กิโลกรัม</h5>
                            <h5>ราคา</h5>
                            <button onClick={() => this.openModel()}>ออกใบสำคัญรับเงิน</button>
                        </div>


                    </div>
                    <div className="col-1"></div>

                    <div className="col-7">
                        {this.state.order.order_se_status >= 0 ?
                            <div>
                                <h4 style={{ margin: "0px" }}>เกษตรกรที่พร้อมส่งมอบ</h4>
                                <Checkbox
                                    option={this.state.farmer}
                                    check_array={this.state.check_array}
                                    return_func={(event) => {
                                        console.log('event', event)
                                        this.setState({
                                            check_array: event
                                        })
                                    }} />
                            </div>
                            :
                            <div>
                                <h4 style={{ margin: "0px" }}>เกษตรกรที่ทำการสั่งซื้อ</h4>
                                {this.state.selectFarmer.map((element, index) => {
                                    return (
                                        <div>
                                            {index + 1}. {element.title_name} {element.first_name} {element.last_name}
                                            จำนวน {element.amount} กิโลกรัม
                                            <button>PDF</button>
                                        </div>
                                    )
                                })}

                                บัญชีธนาคาร
                                {/* {this.state.get_user ? 
                                    this.state.bank_information.map((element) => {
                                        return (
                                            <div className="_Card">
                                                สัญลักษณ์ธนาคาร
                            <h3 style={{ margin: "0px" }}>{element.bankName}</h3>
                                                <h4 style={{ margin: "0px" }}>ชื่อบัญชีธนาคาร {element.bankAccount} เลขที่บัญชี {element.bankNo}</h4>
                                            </div>
                                        )
                                    })
                                    : <button>เพิ่มบัญชีธนาคาร</button>
                                    } */}
                                <div className="_Card">
                                    สัญลักษณ์ธนาคาร
                            <h3 style={{ margin: "0px" }}>ธนาคารกรุงไทย</h3>
                                    <h4 style={{ margin: "0px" }}>ชื่อบัญชีธนาคาร เกษตรกรอินทรีย์อีสาน เลขที่บัญชี 123-4-56789-0</h4>
                                </div>
                                <button onClick={() => this.setState({ openIN: true })}>ออกใบเเจ้งหนี้</button>
                                <button>เพิ่มบัญชีธนาคาร</button>
                                

                            </div>
                        }
                    </div>
                    <div className="col-1"></div>
                </div>

                <Modal open={this.state.OpenProofPaymet} onClose={this.onCloseModal}>
                    <div className="Row">
                        <div className="col-12" >
                            <h3 style={{ textAlign: "center" }}>แผนการสั่งซื้อ</h3>
                        </div>
                    </div>
                    <div className="Row" style={{ width: "800px" }}>
                        <div className="col-12" >
                            <h5>สั่งซื้อ {this.state.order.plant_name} กับเกษตรกร</h5>

                            {this.state.selectFarmer.map((element, index) => {
                                return <div>
                                    {index + 1}. {element.title_name} {element.first_name} {element.last_name}
                                    จำนวน {element.amount} กิโลกรัม
                                </div>
                            })}


                            <h5>รวมจำนวนทั้งหมด {this.state.order.amount} กิโลกรัม</h5>
                            <h4 style={{ color: "red" }}>รวมเงินทั้งหมด XX บาท</h4>

                            <button className="BTN_Signin" onClick={() => { this.ChStatus() }}>ออกใบสำคัญรับเงิน</button>

                        </div>
                    </div>
                </Modal>


                {/* ใบเเจ้งหนี้ */}
                <Modal open={this.state.openIN} onClose={this.onCloseModal}>
                    <div className="Row">
                        <div className="col-12" >
                            <h3 style={{ textAlign: "center" }}>ออกใบเเจ้งหนี้</h3>
                        </div>
                    </div>
                    <div className="Row" style={{ width: "800px" }}>
                        <div className="col-12" >
                            <h2 style={{ textAlign: "center" }}>ใบสั่งซื้อเลขที่ {this.state.order.order_se_id}</h2>
                            <h5>สั่งซื้อ {this.state.order.plant_name} กับเกษตรกร</h5>

                            {this.state.selectFarmer.map((element, index) => {
                                return <div>
                                    {index + 1}. {element.title_name} {element.first_name} {element.last_name}
                                    จำนวน {element.amount} กิโลกรัม
                                </div>
                            })}

                            กำหนดวันชำระเงิน : <input type="date" />
                            <h5>รวมจำนวนทั้งหมด {this.state.order.amount} กิโลกรัม</h5>
                            <h4 style={{ color: "red" }}>รวมเงินทั้งหมด XX บาท</h4>

                            <button className="BTN_Signin" onClick={() => { this.ChStatus() }}>ออกใบเเจ้งหนี้</button>

                        </div>
                    </div>
                </Modal>









            </div >
        )
    }
}
export default S_OrderDetail;