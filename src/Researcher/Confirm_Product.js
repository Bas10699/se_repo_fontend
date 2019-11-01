import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { user_token } from '../Support/Constance';
import { get, post } from '../Support/Service';
import Modal from 'react-responsive-modal';

const Product = [
    {
        Product_name: "ยาสมุนไพรลดความอ้วน",
        Product_nutrients: 'โปรตีน',
        Product_number: '10 กล่อง',
        Check_true_img: "https://www.nipa.co.th/wp-content/uploads/2019/03/okt.png",
        Check_false_img: "https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png"
    },
    {
        Product_name: "อาหารคลีน",
        Product_nutrients: 'คาร์โบไฮเดรต, โปรตีน',
        Product_number: '20 ชิ้น',
        Check_true_img: "https://www.nipa.co.th/wp-content/uploads/2019/03/okt.png",
        Check_false_img: "https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png"
    },
    {
        Product_name: "นมเพิ่มความสูง",
        Product_nutrients: 'วิตามิน',
        Product_number: '30 กล่อง',
        Check_true_img: "https://www.nipa.co.th/wp-content/uploads/2019/03/okt.png",
        Check_false_img: "https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png"
    }
]

class Confirm_Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    get_user = async () => {
        try {
            await get('show', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_user: result.result
                    })
                    setTimeout(() => {
                        console.log("get_user", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {
            alert("get_user2" + error);
        }
    }

    componentWillMount() {
        this.get_user()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    on_Open_Modal = () => {
        this.setState({ open: true });
    }

    on_Close_Modal = () => {
        this.setState({ open: false });
    };

    Delete_Product = () => {
        alert ("ยกเลิกรายการ")
    }

    render () {
        return (
            <div className="App">

                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>ยืนยันการพัฒนาผลิตภัณฑ์</h3>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-12">
                        <table style={{ textAlign: "center" }}>
                            <tr>
                                <th>ชื่อผลิตภัณฑ์</th>
                                <th>สารอาหารที่ต้องการ</th>
                                <th>จำนวนผลิตภัณฑ์</th>
                                <th>ยืนยันการพัฒนา</th>
                            </tr>
                            {
                                Product.map((element, index) => {
                                    return (
                                        <tr>
                                            <td>{element.Product_name}</td>
                                            <td>{element.Product_nutrients}</td>
                                            <td>{element.Product_number}</td>
                                            <td>
                                                <NavLink>
                                                    <img src={element.Check_true_img} style={{ width: "30px" }} onClick={() => {this.on_Open_Modal()}}/>
                                                    <Modal open={this.state.open} onClose={this.on_Close_Modal}>
                                                        {/* <div className="Row">
                                                            <div className="col-12">
                                                                <h3 style={{ textAlign: "center" }}>พัฒนาผลิตภัณฑ์</h3>
                                                                <h4>ชื่อผลิตภัณฑ์ :</h4>
                                                                <div>วันที่เริ่มต้นการพัฒนา</div>
                                                                <input type="date" name="date" id="date" onChange={this.handleChange} style={{ marginTop: "-100px", marginLeft: "-100px" }}/>
                                                                <div>วันที่สิ้นสุดการพัฒนา</div>
                                                                <input type="date" name="date" id="date" onChange={this.handleChange}/>
                                                                <div>
                                                                    <NavLink>
                                                                        <button>ตกลง</button>
                                                                    </NavLink>
                                                                    <NavLink>
                                                                        <button>ยกเลิก</button>
                                                                    </NavLink>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                        <div className="Row">
                                                            <div className="col-12">
                                                                <h3 style={{ textAlign: "center" }}>พัฒนาผลิตภัณฑ์</h3>
                                                                <h4 style={{ textAlign: "center" }}>ชื่อผลิตภัณฑ์ : {element.Product_name}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="Row">
                                                            <div className="col-12">
                                                                <table style={{ textAlign: "center" }}>
                                                                    <tr>
                                                                        <th style={{ color: "green" }}>วันที่เริ่มต้นการพัฒนา</th>
                                                                    </tr>
                                                                </table>
                                                                <input type="date" name="date" id="date" style={{ width: "500px" }} onChange={this.handleChange}/>
                                                            </div>
                                                        </div>
                                                        <div className="Row">
                                                            <div className="col-12">
                                                                <table style={{ textAlign: "center" }}>
                                                                    <tr>
                                                                        <th style={{ color: "red" }}>วันที่สิ้นสุดการพัฒนา</th>
                                                                    </tr>
                                                                </table>
                                                                <input type="date" name="date" id="date" style={{ width: "500px" }} onChange={this.handleChange}/>
                                                            </div>
                                                        </div>
                                                        <NavLink>
                                                            <button>ตกลง</button>
                                                        </NavLink>
                                                        <NavLink>
                                                            <button>ยกเลิก</button>
                                                        </NavLink>
                                                    </Modal>
                                                </NavLink>
                                                <NavLink>
                                                    <img src={element.Check_false_img} style={{ width: "30px" }} onClick={() => {this.Delete_Product()}}/>
                                                </NavLink>
                                            </td>
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
} export default Confirm_Product;