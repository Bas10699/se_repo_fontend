//se-middle สรุปยอดการซื้อ-ขาย
import React, { Component } from 'react'
import { user_token } from '../Support/Constance';
import { ip, get, post } from '../Support/Service';

class M_Summary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_data: [],
        }
    }

    componentWillMount() {
        this.get_product()
    }

    get_product = async () => {
        try {
            await get('trader/get_product', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        product_data: result.result,
                    })

                    setTimeout(() => {
                        console.log("get_product", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                    alert(result.error_message)
                }
            });
        } catch (error) {
            alert("get_product error" + error);
        }
    }

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>สรุปยอดการซื้อ-ขาย</h2>
                    </div>
                </div>
                <div className="Row">
                    <div className="col-12">
                        <table style={{ textAlign: "center" }}>
                            <tr>
                                <th rowSpan="2">ลำดับ</th>
                                <th rowSpan="1">ชื่อวัตถุดิบ</th>
                                <th colSpan="14" style={{ border: "1px solid #f1c40f" }}>ยอดขาย</th>
                            </tr>
                            <tr>
                                <th><input style={{width:"50%"}}/></th>
                                <th style={{ borderLeft: "1px solid #f1c40f" }}>ยอดขายวัน</th>
                                <th>
                                    <select name="day">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                    </select>
                                </th>
                                <th>คิดเป็นเงิน</th>
                                <th style={{ borderLeft: "1px solid #f1c40f" }}>ยอดขายสัปดาห์</th>
                                <th>sdkjfls</th>
                                <th>คิดเป็นเงิน</th>
                                <th style={{ borderLeft: "1px solid #f1c40f" }}>ยอดขายเดือน</th>
                                <th>
                                    <select name="month">
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                    </select>
                                </th>
                                <th>คิดเป็นเงิน</th>
                                <th style={{ borderLeft: "1px solid #f1c40f" }}>ยอดขายปี</th>
                                <th>
                                    <select name="year">
                                        <option value="2563">2563</option>
                                        <option value="2562">2562</option>
                                        <option value="2561">2561</option>
                                        <option value="2560">2560</option>
                                        <option value="2559">2559</option>
                                        <option value="2558">2558</option>
                                        <option value="2557">2557</option>
                                        <option value="2556">2556</option>
                                        <option value="2555">2555</option>
                                        <option value="2554">2554</option>
                                        <option value="2553">2553</option>
                                        <option value="2552">2552</option>
                                        <option value="2551">2551</option>
                                        <option value="2550">2550</option>
                                    </select>
                                </th>
                                <th>คิดเป็นเงิน</th>
                                <th style={{ borderLeft: "1px solid #f1c40f" }}>ยอดขายทั้งหมด</th>
                                <th style={{ borderRight: "1px solid #f1c40f" }}>คิดเป็นเงิน</th>
                            </tr>

                            {
                                this.state.product_data.map((element, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td style={{textAlign:"left"}}>{element.product_name}</td>
                                            <td style={{ borderLeft: "1px solid #f1c40f" }} colSpan="2">1200 กิโลกรัม</td>
                                            <td>500 บาท</td>
                                            <td style={{ borderLeft: "1px solid #f1c40f" }} colSpan="2">5000 กิโลกรัม</td>
                                            <td>1500 บาท</td>
                                            <td style={{ borderLeft: "1px solid #f1c40f" }} colSpan="2">10500 กิโลกรัม</td>
                                            <td>50000 บาท</td>
                                            <td style={{ borderLeft: "1px solid #f1c40f" }} colSpan="2">16700 กิโลกรัม</td>
                                            <td style={{ borderRight: "1px solid #f1c40f" }}>52000 บาท</td>
                                            <td style={{ borderLeft: "1px solid #f1c40f" }}>16700 กิโลกรัม</td>
                                            <td style={{ borderRight: "1px solid #f1c40f" }}>52000 บาท</td>
                                        </tr>
                                    )
                                })
                            }

                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default M_Summary;