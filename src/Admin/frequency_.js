import React, { Component } from 'react';
import { post, ip } from '../Support/Service';
import { user_token, addComma } from '../Support/Constance';
import Modal from 'react-responsive-modal'

class Frequency extends Component {
    constructor(props) {
        super(props)
        this.state = {
            frequency:[]

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
                        frequency: result.result
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
                            <h4>จำนวนที่สั่งซื้อ xxx กิโลกรัม</h4>
                            <table>
                                <tr>
                                    <th>ชื่อ SE</th>
                                    <th>จำนวนที่มีอยู่ในสต๊อก</th>
                                    <th>ราคาขนส่ง</th>
                                    <th>ช่วงส่งมอบ</th>
                                </tr>

                            </table>

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