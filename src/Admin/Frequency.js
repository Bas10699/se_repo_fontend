import React, { Component } from 'react';
import { post, ip } from '../Support/Service';
import { user_token, addComma } from '../Support/Constance';
import Modal from 'react-responsive-modal'
import { Accordion, AccordionItem } from 'react-light-accordion';
import { NavLink } from 'react-router-dom'

class Frequency extends Component {
    constructor(props) {
        super(props)
        this.state = {
            frequency: [],
            se: [],
            data: [],
            month: [],
            volume: 0,
            select_month: [],
            status:null,
        }
    }
    componentWillMount() {
        this.get_freq()
        this.setState({
            status:this.props.status
        })
    }

    onCloseModal = () => {
        this.setState({ open: false, OpenComfrim: false, OpenBill: false });

    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    get_freq = async () => {
        let object = {
            plant_name: this.props.plant_name
        }
        try {
            await post(object, 'neutrally/get_chart_frequency_all', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        frequency: result.result,
                        se: result.result
                    })
                    // this.sum_data_in_month()
                    setTimeout(() => {
                        console.log('get_freq', result.result)
                    })
                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('get_freq' + error)
        }

    }

    sum_data = (data, index) => {
        let sum = 0;

        for (var i = 0; i < data.length; i++) {
            let data_sum = data[i];
            sum += data_sum;
            sum.toLocaleString()
        }
        return sum;
    }

    sum_data_in_month = (dd, index) => {
        let sum_se = []
        let Jan = 0;
        let Feb = 0;
        let Mar = 0;
        let Apr = 0;
        let May = 0;
        let Jun = 0;
        let Jul = 0;
        let Aug = 0;
        let Sep = 0;
        let Oct = 0;
        let Nov = 0;
        let Dec = 0;
        dd.rang.map((ele_rang) => {
            ele_rang.data.map((ele_rang_data, index) => {
                if (index === 0) {
                    Jan += ele_rang_data
                }
                else if (index === 1) {
                    Feb += ele_rang_data
                }
                else if (index === 2) {
                    Mar += ele_rang_data
                }
                else if (index === 3) {
                    Apr += ele_rang_data
                }
                else if (index === 4) {
                    May += ele_rang_data
                }
                else if (index === 5) {
                    Jun += ele_rang_data
                }
                else if (index === 6) {
                    Jul += ele_rang_data
                }
                else if (index === 7) {
                    Aug += ele_rang_data
                }
                else if (index === 8) {
                    Sep += ele_rang_data
                }
                else if (index === 9) {
                    Oct += ele_rang_data
                }
                else if (index === 10) {
                    Nov += ele_rang_data
                }
                else if (index === 11) {
                    Dec += ele_rang_data
                }
                else { }

            })
        })
        sum_se = [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec]


        return sum_se
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    Comfirm = () =>{
        this.setState({
            status:1,
            open: false
        })
        alert("ทำการสั่งซื้อเรียบร้อย")
    }

    render() {
        let month = [
            'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ค.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
        ]

        return (
            <div>
                {this.state.status <= 5 ? 
                <NavLink to={"/Product/product?product_id=" + this.props.product_id}>
                <button 
                
                // onClick={() => { this.onOpenModal() }}
                    className="BTN_AddCart"
                    style={{ width: "250px", float: "right" }}>
                    ทำการสั่งซื้อวัตถุดิบ
                </button> </NavLink> 
                : "ทำการสั่งซื้อเเล้ว"}
                {console.log("status", this.state.status)}
                


                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="Row">
                        <div className="col-12">
                            <h3 style={{ textAlign: "center" }}>รายละเอียดวัตถุดิบ "{this.props.plant_name}"</h3>
                            <h4>จำนวนวัตถุดิบทั้งหมด xx กิโลกรัม</h4>
                            <h4>จำนวนที่สั่งซื้อ {addComma(this.props.amount)} กิโลกรัม</h4>
                            <h4>ต้องสั่งซื้ออีก {addComma(this.props.amount - this.state.volume > 0 ? this.props.amount - this.state.volume : "ซื้อวัตถุดิบครบเเล้ว")} กิโลกรัม</h4>
                            <h5>จาก SE name : จำนวนที่สั่งซื้อจาก SE นี้ </h5>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-12" style={{ width: "1000px" }}>
                            {
                                this.state.frequency.map((element, index) => {
                                    return (
                                        <Accordion allowMultipleExpanded={true}>
                                            {
                                                element.se.map((element_se, index_se) => {
                                                    return (
                                                        <AccordionItem title={element_se.name + " " + "(จำนวนเปอร์เซ็นที่ส่งมา xx%)"}>
                                                            <h4>สั่งซื้อจำนวน : <input style={{ width: "20%" }} type="number" name="volume" id="volume"
                                                                onChange={(e) => { this.handleChange(e) }} min="0"
                                                                max={this.props.amount} />
                                                            </h4>
                                                            <h4>เลือกเดือนที่จะสั่งซื้อ :
                                                                <select id="select_month">
                                                                    {month.map((element_select, index_select) => {
                                                                        return (
                                                                            <option value={index_select}>{element_select}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                            </h4>
                                                            <table style={{ textAlign: "center" }}>
                                                                <tr>
                                                                    <th rowSpan="2">จำนวนครั้งที่ส่ง</th>
                                                                    <th colSpan="12">เดือน</th>
                                                                </tr>
                                                                <tr>
                                                                    {month.map((element_month) => {
                                                                        return (
                                                                            <th>{element_month} </th>
                                                                        )
                                                                    })}
                                                                </tr>
                                                                {element_se.rang.map((element_rang, index_rang) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{index_rang + 1}</td>
                                                                            {element_rang.data.map((element_data) => {
                                                                                return (
                                                                                    <td>{addComma(element_data)}</td>
                                                                                )
                                                                            })}
                                                                        </tr>

                                                                    )
                                                                })
                                                                }

                                                                <tr>
                                                                    <th>รวมทั้งหมด</th>
                                                                    {/* {this.state.data.sum.map((ele_sum)=>{
                                                                        console.log(ele_sum)
                                                                    })} */}
                                                                    {this.sum_data_in_month(element_se, index_se).map((ele_sum) => {
                                                                        return (
                                                                            <th>{addComma(ele_sum)}</th>
                                                                        )
                                                                    })}

                                                                </tr>
                                                            </table>
                                                        </AccordionItem>
                                                    )
                                                })
                                            }
                                        </Accordion>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-12">
                            <button className="BTN_Signin" onClick={() => { this.Comfirm() }}>ออกใบคำสั่งซื้อ</button>
                            <button className="BTN_Signup" onClick={() => { this.onCloseModal() }}>ยกเลิก</button>
                        </div>
                    </div>

                </Modal>
            </div>
        )
    }
}
export default Frequency;