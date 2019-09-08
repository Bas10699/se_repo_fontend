//se-middle สรุปยอดการซื้อ-ขาย
import React, { Component } from 'react'
import { user_token } from '../Support/Constance';
import { get } from '../Support/Service';

class M_Summary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_data: [],
            search_product: []
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
                        search_product: result.result
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

    filterSearch = (event) => {
        var updatedList = this.state.product_data;
        updatedList = updatedList.filter(function (item) {
            return item.product_name.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({
            search_product: updatedList,
        });
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
                        <table style={{ textAlign: "center", marginLeft: "5px" }}>
                            <tr>
                                <th rowSpan="1">ชื่อวัตถุดิบ</th>
                                <th colSpan="14" style={{ border: "1px solid #f1c40f" }}>ยอดขาย</th>
                            </tr>
                            <tr>
                                <th><input style={{ width: "100%" }} onChange={this.filterSearch} /></th>
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
                                        <option value="32">32</option>
                                        <option value="33">33</option>
                                        <option value="34">34</option>
                                        <option value="35">35</option>
                                        <option value="36">36</option>
                                        <option value="37">37</option>
                                        <option value="38">38</option>
                                        <option value="39">39</option>
                                        <option value="40">40</option>
                                        <option value="41">41</option>
                                        <option value="42">42</option>
                                        <option value="43">43</option>
                                        <option value="44">44</option>
                                        <option value="45">45</option>
                                        <option value="46">46</option>
                                        <option value="47">47</option>
                                        <option value="48">48</option>
                                        <option value="49">49</option>
                                        <option value="50">50</option>
                                        <option value="51">51</option>
                                        <option value="52">52</option>
                                    </select>
                                </th>
                                <th>คิดเป็นเงิน</th>
                                <th style={{ borderLeft: "1px solid #f1c40f" }}>ยอดขายเดือน</th>
                                <th>
                                    <select name="month">
                                        <option value="January">มกราคม</option>
                                        <option value="February">กุมภาพันธ์</option>
                                        <option value="March">มีนาคม</option>
                                        <option value="April">เมษายน</option>
                                        <option value="May">พฤษภาคม</option>
                                        <option value="June">มิถุนายน</option>
                                        <option value="July">กรกฎาคม</option>
                                        <option value="August">สิงหาคม</option>
                                        <option value="September">กันยายน</option>
                                        <option value="October">ตุลาคม</option>
                                        <option value="November">พฤศจิกายน</option>
                                        <option value="December">ธันวายน</option>
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
                                this.state.search_product ?
                                    this.state.search_product.map((element, index) => {
                                        return (
                                            <tr>
                                                <td style={{ textAlign: "left" }}>{element.product_name}</td>
                                                <td style={{ borderLeft: "1px solid #f1c40f" }} colSpan="2">1200</td>
                                                <td>500</td>
                                                <td style={{ borderLeft: "1px solid #f1c40f" }} colSpan="2">5000</td>
                                                <td>1500</td>
                                                <td style={{ borderLeft: "1px solid #f1c40f" }} colSpan="2">10500</td>
                                                <td>50000</td>
                                                <td style={{ borderLeft: "1px solid #f1c40f" }} colSpan="2">16700</td>
                                                <td style={{ borderRight: "1px solid #f1c40f" }}>52000</td>
                                                <td style={{ borderLeft: "1px solid #f1c40f" }}>16700</td>
                                                <td style={{ borderRight: "1px solid #f1c40f" }}>52000</td>
                                            </tr>
                                        )
                                    })
                                    :
                                    this.state.product_data.map((element, index) => {
                                        return (
                                            <tr>
                                                <td style={{ textAlign: "left" }}>{element.product_name}</td>
                                                <td style={{ borderLeft: "1px solid #f1c40f" }} colSpan="2">1200</td>
                                                <td>500</td>
                                                <td style={{ borderLeft: "1px solid #f1c40f" }} colSpan="2">5000</td>
                                                <td>1500</td>
                                                <td style={{ borderLeft: "1px solid #f1c40f" }} colSpan="2">10500</td>
                                                <td>50000</td>
                                                <td style={{ borderLeft: "1px solid #f1c40f" }} colSpan="2">16700</td>
                                                <td style={{ borderRight: "1px solid #f1c40f" }}>52000</td>
                                                <td style={{ borderLeft: "1px solid #f1c40f" }}>16700</td>
                                                <td style={{ borderRight: "1px solid #f1c40f" }}>52000</td>
                                            </tr>
                                        )
                                    })

                            }
                            <tr>
                                <th colSpan="1" style={{ borderRight: "1px solid #f1c40f" }}>รวมยอดเงิน</th>
                                <td colSpan="3" style={{ borderRight: "1px solid #f1c40f" }}>รวม</td>
                                <td colSpan="3" style={{ borderRight: "1px solid #f1c40f" }}>รวม</td>
                                <td colSpan="3" style={{ borderRight: "1px solid #f1c40f" }}>รวม</td>
                                <td colSpan="3" style={{ borderRight: "1px solid #f1c40f" }}>รวม</td>
                                <td colSpan="3" style={{ borderRight: "1px solid #f1c40f" }}>รวม</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default M_Summary;