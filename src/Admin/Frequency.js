import React, { Component } from 'react';
import { post, ip } from '../Support/Service';
import { user_token, addComma } from '../Support/Constance';
import Modal from 'react-responsive-modal'

class Frequency extends Component {
    constructor(props) {
        super(props)
        this.state = {
            frequency: [],
            se: [],
            data: []

        }
    }
    componentWillMount() {
        this.get_freq()
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

    sum_data = (data) => {
        let sum = 0;

        for (var i = 0; i < data.length; i++) {
            let data_sum = data[i];
            sum += data_sum;
            sum.toLocaleString()
        }
        return sum;
    }

    render() {
        return (
            <div>
                <button onClick={() => { this.onOpenModal() }}
                    className="BTN_AddCart"
                    style={{ width: "250px", float: "right" }}>
                    ทำการสั่งซื้อวัตถุดิบจาก SE ย่อย
                </button>

                
                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="Row">
                        <div className="col-1" />
                        <div className="col-10">
                            <h3 style={{ textAlign: "center" }}>รายละเอียดวัตถุดิบ "{this.props.plant_name}"</h3>
                            <h4>จำนวนวัตถุดิบทั้งหมด xxx กิโลกรัม</h4>
                            <h4>จำนวนที่สั่งซื้อ {addComma(this.props.amount)} กิโลกรัม</h4>
                            {
                                this.state.frequency.map((element, index) => {
                                    return (
                                        <table>
                                            <tr>
                                                <th>ชื่อ SE</th>
                                                <th>จำนวนที่มีอยู่ในสต๊อก</th>
                                                <th>ราคาขนส่ง</th>
                                                <th>ช่วงส่งมอบ</th>
                                            </tr>
                                            {
                                                element.se.map((element_se, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{element_se.name}</td>
                                                            <td>{element_se.rang.map((element_rang, index) => {
                                                                return (
                                                                    <div> สั่งครั้งที่ {index + 1} :
                                                                    {addComma(this.sum_data(element_rang.data))}
                                                                    </div>
                                                                )
                                                            })
                                                            }</td>
                                                            <td>x</td>
                                                            <td>x</td>
                                                        </tr>

                                                    )
                                                })
                                            }


                                        </table>
                                    )
                                })
                            }


                            <button className="BTN_Signin" onClick={() => { this.Comfirm() }}>ออกใบคำสั่งซื้อ</button>
                            <button className="BTN_Signup" onClick={() => { this.onCloseModal() }}>ยกเลิก</button>

                        </div>
                        <div className="col-1" />
                    </div>
                </Modal>
            </div>
        )
    }
}
export default Frequency;