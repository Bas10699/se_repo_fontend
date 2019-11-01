//รายละเอียดการซื้อสินค้า
import React, { Component } from 'react';
import queryString from 'query-string';
import { get, post, ip } from '../Support/Service'
import { user_token, addComma,sortData } from '../Support/Constance'
import Timeline from './TimelineNeo'
import Checkbox from '../Support/Checkbox'
import moment from 'moment'
import Modal from 'react-responsive-modal'
import S_BillFarmerPdf from './S_BillFarmerPdf'

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
            status: 0,
            order_farmer: [],
            get_user: [],
            bank: [],
            date_send: moment().utc(7).add('years', 543).format('DD/MM/YYYY')

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

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
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
                        order: result.result,
                    })
                    if (result.result.order_farmer_status == 1) {
                        this.get_order_farmer()
                    }
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

    get_user = async () => {
        try {
            await get('user/get_user', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_user: result.result,
                        bank: result.result.bank_information
                    })
                    // console.log('get_user',result.result)
                } else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {

        }
    }

    get_order_farmer = async () => {
        let obj = {
            order_se_id: this.state.order.order_se_id
        }
        try {
            await post(obj, 'neo_firm/get_order_farmer', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        order_farmer: result.result
                    })
                    console.log("order_farmer",result.result)

                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('get_order_farmer: ' + error)
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

    summ = (data) => {
        let sum = 0
        data.map((element) => {
            sum += element.amount
        })
        return sum
    }

    summoney = (data) => {
        let sum = 0
        data.map((element) => {
            sum += element.amount * this.state.order.cost
        })
        return sum
    }

    ChStatus = async () => {
        let order = this.state.order
        order.order_se_status = 1
        this.setState({
            OpenProofPaymet: false,
            openIN: false,
            // order: this.state.order.order_se_status
        })
        let obj = {
            order_se_id: this.state.order.order_se_id,
            order_se_invoice_date: moment().utc(7).add('years', 543).format(),
            order_se_invoice_date_send: this.state.date_send,
            order_se_invoice_detail: JSON.stringify(this.state.bank)
        }
        try {
            await post(obj, 'neo_firm/add_invoice_se', user_token).then((result) => {
                if (result.success) {
                    alert('ยืนยันคำสั่งซื้อ และส่งใบแจ้งหนี้เรียบร้อย')
                    window.location.reload()
                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('ChStatus: ' + error)
        }


    }

    status = async () => {
        this.setState({
            status: 1,
            OpenProofPaymet: false,
        })
        let obj = {
            object: this.state.selectFarmer,
            order_se_id: this.state.order.order_se_id,
            plant_name: this.state.order.plant_name,
            cost: this.state.order.cost

        }
        console.log("status",obj)
        try {
            await post(obj, 'neo_firm/add_order_farmer', user_token).then((result) => {
                if (result.success) {
                    alert('ออกใบสำเร็จ')
                    window.location.reload()
                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('Status: ' + error)
        }
    }

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>ใบสั่งซื้อเลขที่ {this.state.order.order_trader_id}</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-12" style={{ textAlign: "center" }}>
                        <Timeline status={this.state.order.order_se_status} order={this.state.order}/>
                    </div>
                </div>

                <div className="Row" style={{ marginTop: "70px" }}>
                    <div className="col-1"></div>
                    <div className="col-2">
                        <div className="Card" style={{ width: "100%" }}>
                            <h4>{this.state.order.plant_name} </h4>
                            <h5>จำนวน {this.state.order.amount} กิโลกรัม</h5>
                            <h5>ราคา {this.state.order.cost} บาท/กิโลกรัม</h5>
                            {this.state.order.order_farmer_status == null ? <button onClick={() => this.openModel()}>ออกใบสำคัญรับเงิน</button> : <div style={{ color: "red" }}>"ออกใบสำคัญรับเงินเเล้ว"</div>}
                        </div>


                    </div>
                    <div className="col-1"></div>

                    <div className="col-7">
                        {this.state.order.order_farmer_status == null ?
                            <div>
                                <h4 style={{ marginTop: "10px" }}>เกษตรกรที่พร้อมส่งมอบ</h4>
                                {console.log("ggggg",this.state.farmer)}
                                <Checkbox
                                    option={sortData(this.state.farmer,"")}
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
                                <h4 style={{ marginTop: "10px" }}>เกษตรกรที่ทำการสั่งซื้อ</h4>
                                
                                <table>
                                    {this.state.order_farmer.map((element, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}. {element.order_farmer_title_name} {element.order_farmer_name} {element.order_farmer_last_name}
                                                </td>
                                                <td>จำนวน {element.order_farmer_plant_volume} กิโลกรัม</td>
                                                <td><S_BillFarmerPdf data={element}/></td>
                                            </tr>
                                        )
                                    })}
                                </table>
                                {console.log("list farmer",this.state.order_farmer)}
                                {this.state.order.order_se_status == 0 ?
                                <button onClick={() => this.setState({ openIN: true })} className="BTN_Signin" style={{ float: "left" }}>ออกใบเเจ้งหนี้</button>
                                :null
                            }
                                
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
                                    }  */}
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
                            <h5>สั่งซื้อ {this.state.order.plant_name} กับเกษตรกร  ราคา {this.state.order.cost} บาท/กิโลกรัม</h5>
                            <table>
                                {this.state.selectFarmer.map((element, index) => {
                                    return <tr>
                                        <td>{index + 1}. {element.title_name} {element.first_name} {element.last_name}</td>
                                        <td>จำนวน {element.amount} กิโลกรัม </td>
                                        <td>{element.amount * this.state.order.cost} บาท</td>
                                    </tr>
                                })}

                            </table>


                            <h5>รวมจำนวนทั้งหมด {this.summ(this.state.selectFarmer)} กิโลกรัม</h5>
                            <h4 style={{ color: "red" }}>รวมเงินทั้งหมด {this.summoney(this.state.selectFarmer)} บาท</h4>

                            <button className="BTN_Signin" onClick={() => { this.status() }}>ออกใบสำคัญรับเงิน</button>

                        </div>
                    </div>
                </Modal>


                {/* ใบเเจ้งหนี้ */}
                <Modal open={this.state.openIN} onClose={this.onCloseModal}>
                    <div className="Row">
                        <div className="col-12" >
                            <h2 style={{ textAlign: "center" }}>ออกใบเเจ้งหนี้ของใบสั่งซื้อเลขที่ {this.state.order.order_se_id}</h2>
                        </div>
                    </div>
                    <div className="Row" style={{ width: "800px" }}>
                        <div className="col-12" >

                            <h4>สั่งซื้อ {this.state.order.plant_name} รวมจำนวนทั้งหมด {this.state.order.amount} กิโลกรัม</h4>

                            {this.state.selectFarmer.map((element, index) => {
                                return <div>
                                    {index + 1}. {element.title_name} {element.first_name} {element.last_name}

                                </div>
                            })}

                            กำหนดวันชำระเงิน : <input type="date" id="date_send" onChange={this.handleChange} />
                            <h4 style={{ color: "red" }}>รวมเงินทั้งหมด {this.state.order.cost * this.state.order.amount} บาท</h4>

                            {this.state.bank ?
                                this.state.bank.map((element) => {
                                return (
                                    <div className="_Card">
                                        <h4 style={{ margin: "0px" }}>{element.bankName}</h4>
                                        <h5 style={{ margin: "0px" }}>ชื่อบัญชีธนาคาร {element.bankAccount} เลขที่บัญชี {element.bankNo}</h5>
                                    </div>
                                )
                            })
                            :null
                            }

                            <button className="BTN_Signin" onClick={() => { this.ChStatus() }}>ออกใบเเจ้งหนี้</button>

                        </div>
                    </div>
                </Modal>
            </div >
        )
    }
}
export default S_OrderDetail;