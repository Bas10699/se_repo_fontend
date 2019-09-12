import React, { Component } from 'react';
import { post, ip } from '../Support/Service';
import { user_token, addComma } from '../Support/Constance';
import Modal from 'react-responsive-modal'
import { Accordion, AccordionItem } from 'react-light-accordion';

class Frequency extends Component {
    constructor(props) {
        super(props)
        this.state = {
            frequency: [],
            se: [],
            data: [],
            month: []
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
                    ทำการสั่งซื้อวัตถุดิบ
                </button>


                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="Row">
                        <div className="col-12" style={{ width: "500px" }}>
                            <h3 style={{ textAlign: "center" }}>รายละเอียดวัตถุดิบ "{this.props.plant_name}"</h3>
                            <h4>จำนวนวัตถุดิบทั้งหมด
                            {
                                    this.state.frequency.map((element, index) => {
                                        return (
                                            <div>
                                                {
                                                    element.se.map((element_se, index_se) => {
                                                        return (
                                                            <div>
                                                                {element_se.rang.map((element_rang, index_rang) => {
                                                                    return (
                                                                        <div>{this.sum_data(element_rang.data)}
                                                                        </div>
                                                                    )
                                                                })
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                                กิโลกรัม</h4>
                            <h4>จำนวนที่สั่งซื้อ {addComma(this.props.amount)} กิโลกรัม</h4>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-12">
                            {
                                this.state.frequency.map((element, index) => {
                                    return (
                                        <Accordion atomic={true}>
                                            {
                                                element.se.map((element_se, index_se) => {
                                                    return (
                                                        <AccordionItem title={element_se.name + " " + "(จำนวนเปอร์เซ็นที่ส่งมา xx%)"}>
                                                            <table>
                                                                <tr>
                                                                    <th>จำนวน</th>
                                                                </tr>
                                                                {element_se.rang.map((element_rang, index_rang) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{this.sum_data(element_rang.data)}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                }
                                                            </table>
                                                        </AccordionItem>
                                                    )
                                                })
                                            }
                                        </Accordion>
                                    )
                                })
                            }


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