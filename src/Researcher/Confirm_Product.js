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
            open: false,
            get_demand: [],
            Check_true_img: "https://image.flaticon.com/icons/svg/190/190411.svg",
            Check_false_img: "https://image.flaticon.com/icons/svg/190/190406.svg",
            date_end: "",
            date_start: "",
            product_researcher_status: 1,
            nutrient: [],
        }
    }

    componentWillMount() {
        this.get_user()
        this.get_demand()
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

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    on_Open_Modal = (product_name, volume, volume_type, product_id) => {

        this.setState({
            open: true,
            product_name: product_name,
            volume: volume,
            volume_type: volume_type,
            product_id: product_id
        });
    }

    on_Close_Modal = () => {
        this.setState({ open: false });
    };



    get_demand = async () => {
        try {
            await get('researcher/get_demand_personal', user_token).then((result) => {
                if (result.success) {
                    console.log("get_demand", result.result)
                    this.setState({
                        get_demand: result.result
                    })
                    setTimeout(() => {
                        console.log("get_demand", result.result)
                    }, 500)
                } else {
                    console.log("get_demand", result.result)
                }
            });
        } catch (error) {
            alert("get_demand" + error);
        }
    }

    // confirm = (product_name) => {
    //     this.setState({
    //         product_researcher_status:1
    //     })
    //     setTimeout(() => {
    //         console.log("รับวิจัย",this.state.product_name,"start", this.state.date_start,"end", this.state.date_end,this.state.product_researcher_status)
    //     })

    // }

    Delete_Product = async (product_name, volume, volume_type, product_id) => {
        // this.setState({
        //     product_name: product_name,
        //     volume:volume,
        //     volume_type:volume_type,
        //     product_id:product_id
        // });
        let obj = {
            product_id: product_id,
            product_name: product_name,
            product_researcher_status: 2,
            volume: volume,
            volume_type: volume_type,
        }
        console.log("obj", obj)
        try {
            await post(obj, 'researcher/confirm_resercher_damand', user_token).then((result) => {
                if (result.success) {
                    alert("ไม่รับผลิตภัณฑ์" + product_name)
                    // window.location.reload()

                }
                else {
                    alert(result.error_message)
                }
            })

        } catch (error) {

        }
    }

    confirm = async () => {

        let obj = {
            product_id: this.state.product_id,
            product_name: this.state.product_name,
            product_researcher_status: this.state.product_researcher_status,
            volume: this.state.volume,
            volume_type: this.state.volume_type,
            time_start: this.state.date_start,
            time_end: this.state.date_end,
        }
        console.log("obj", obj)
        try {
            await post(obj, 'researcher/confirm_resercher_damand', user_token).then((result) => {
                if (result.success) {
                    alert('ยืนยันรับงานวิจัย เรียบร้อย')
                    window.location.reload()

                }
                else {
                    alert(result.error_message)
                }
            })

        } catch (error) {

        }
    }

    render_status = (product_researcher_status) => {
        let return_product_researcher_status
        switch (product_researcher_status) {
            case 0: return_product_researcher_status = <div>รอการตอบรับ</div>
                break;
            case 1: return_product_researcher_status = <div style={{color:"green"}}>ยืนยันเเล้ว</div>
                break;
            case 2: return_product_researcher_status = <div style={{color:"red"}}>ยกเลิกเเล้ว</div>
                break;

            default:
                break;
        }
        return return_product_researcher_status
    }




    render() {
        return (
            <div className="App">

                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>ยืนยันการพัฒนาผลิตภัณฑ์</h3>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <table style={{ textAlign: "center" }}>
                            <tr>
                                <th>ชื่อผลิตภัณฑ์</th>
                                <th>สารอาหารที่ต้องการ</th>
                                <th>จำนวนผลิตภัณฑ์</th>
                                <th>กำหนดตอบรับ</th>
                                <th>ยืนยันการพัฒนา</th>
                            </tr>

                            {
                                this.state.get_demand.map((element, index) => {
                                    let nutrient = JSON.parse(element.nutrient)
                                    return (
                                        <tr>
                                            <td>{element.product_name}</td>
                                            <td>{nutrient.map((element_n, index) => {
                                                return element_n + " "
                                            })}</td>
                                            <td>{element.volume} {element.volume_type}</td>
                                            <td></td>
                                            <td>
                                                {element.product_researcher_status == 0 ? <div><NavLink>
                                                    <img alt="ยืนยัน" src={this.state.Check_true_img} style={{ width: "30px" }} onClick={() => { this.on_Open_Modal(element.product_name, element.volume, element.volume_type, element.product_id) }} />
                                                </NavLink>
                                                    <NavLink>
                                                        <img alt="ยกเลิก" src={this.state.Check_false_img} style={{ width: "30px" }} onClick={() => { this.Delete_Product(element.product_name, element.volume, element.volume_type, element.product_id) }} />
                                                    </NavLink></div>
                                                    : this.render_status(element.product_researcher_status)}


                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                    <div className="col-1"></div>
                </div>
                <Modal open={this.state.open} onClose={this.on_Close_Modal}>
                    <div className="Row">
                        <div className="col-12">
                            <h3 style={{ textAlign: "center" }}>พัฒนาผลิตภัณฑ์ {this.state.product_name}</h3>
                            <h4 style={{ textAlign: "center" }}>จำนวน {this.state.volume} {this.state.volume_type}</h4>
                        </div>
                    </div>
                    <div className="Row">
                        <div className="col-12">
                        </div>
                    </div>
                    <NavLink>
                        <button onClick={() => this.confirm()} className="BTN_Signin">ตกลง</button>
                    </NavLink>
                    <NavLink>
                        <button onClick={() => this.setState({ open: false })} className="BTN_Signup">ยกเลิก</button>
                    </NavLink>
                </Modal>
            </div>
        )
    }
} export default Confirm_Product;