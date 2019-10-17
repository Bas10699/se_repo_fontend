//รายละเอียดการซื้อสินค้า
import React, { Component } from 'react';
import queryString from 'query-string';
import { get, post, ip } from '../Support/Service'
import { user_token, addComma } from '../Support/Constance'
import Timeline from './TimelineNeo'
import Checkbox from '../Support/Checkbox'
import moment from 'moment'
import Modal from 'react-responsive-modal'

class S_OrderDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            order: '',
            farmer: [],
            plants: [],
            search_order: [],
            check_array: [],
            OpenProofPaymet: false,
        }
    }

    componentWillMount() {
        this.get_order()
        this.get_skill_farmer()
    }

    onCloseModal = () => {
        this.setState({ OpenProofPaymet: false });

    };

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
                            <h5>เดือนที่ต้องการ</h5>
                            <button onClick={() => this.setState({ OpenProofPaymet: true })}>ออกใบเเจ้งหนี้</button>
                        </div>


                    </div>
                    <div className="col-1"></div>

                    <div className="col-7">

                        <h4 style={{ margin: "0px" }}>เกษตรกรที่พร้อมส่งมอบ</h4>

                        <Checkbox option={this.state.farmer}
                            check_array={this.state.check_array}
                            return_func={(event) => {
                                this.setState({
                                    check_array: event
                                })
                            }} />


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
                        <div className="col-7" >
                            <h5>สั่งซื้อ {this.state.order.plant_name} กับเกษตรกร</h5>
                            
                            {this.state.check_array+"\n"}
                            {console.log(this.state.check_array)}
                            <h5>รวมจำนวนทั้งหมด {this.state.order.amount} กิโลกรัม</h5>
                            <h4 style={{ color: "red" }}>รวมเงินทั้งหมด XX บาท</h4>

                        </div>
                        <div className="col-5">
                            {/* ออก PDF */}
                            <button className="BTN_Signin" >ออกใบสำคัญรับเงิน</button>

                        </div>
                    </div>
                </Modal>










            </div >
        )
    }
}
export default S_OrderDetail;