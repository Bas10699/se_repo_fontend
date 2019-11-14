import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { user_token } from '../Support/Constance';
import { get, post, ip } from '../Support/Service';
import Modal from 'react-responsive-modal';
import cart_img from '../Image/cart.png'
import nutrients_img from '../Image/nutrients_img.png'

class Confirm_Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            material: false,
            product_plan: [],
            nutrient_precent: [],
            plant: [],
        }
    }
    componentWillMount() {
        this.get_history_product_plan()
    }

    get_history_product_plan = async () => {
        try {
            await get('researcher/get_history_product_plan_detail', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        product_plan: result.result
                    })
                    console.log(result.result)
                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert(error)
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    on_Open_Modal = (index) => {
        let product_plan = this.state.product_plan

        this.setState({
            open: true,
            nutrient_precent: product_plan[index].nutrient_precent
        });
    }

    on_Close_Modal = () => {
        this.setState({ open: false, material: false });
    };

    Material = (index) => {
        let product_plan = this.state.product_plan

        this.setState({
            material: true,
            plant: product_plan[index].plant
        });
    }

    Image = () => {
        alert("ดูรูปภาพ")
    }

    render() {
        return (
            <div className="App">

                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>ประวัติการพัฒนาผลิตภัณฑ์</h3>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <table style={{ textAlign: "center" }}>
                            <tr>
                                <th>ชื่อผลิตภัณฑ์</th>
                                <th>ชื่อสูตร</th>
                                <th>สารอาหาร</th>
                                <th>วัตถุดิบ</th>
                                {/* <th>รูปภาพ</th> */}
                            </tr>
                            {
                                this.state.product_plan.map((element, index) => {
                                    return (
                                        <tr>
                                            <td>{element.product_name}</td>
                                            <td>{element.product_plan_name}</td>
                                            <td>
                                                <NavLink>
                                                    <img src={nutrients_img} style={{ width: "30px" }} onClick={() => this.on_Open_Modal(index)} />
                                                    <Modal open={this.state.open} onClose={this.on_Close_Modal}>
                                                        <div className="Row">
                                                            <div className="col-12">
                                                                <h3 style={{ textAlign: "center" }}>สารอาหารทั้งหมด</h3>
                                                                <table>
                                                                    <tr>
                                                                        <td>
                                                                            <h4>
                                                                                ลำดับ
                                                                            </h4>
                                                                        </td>
                                                                        <td>
                                                                            <h4>
                                                                                ชื่อสารอาหาร
                                                                            </h4>
                                                                        </td>
                                                                        <td>
                                                                            <h4>
                                                                                ปริมาณ(%)
                                                                            </h4>
                                                                        </td>
                                                                    </tr>
                                                                    {
                                                                        this.state.nutrient_precent.map((element, index) => {
                                                                            return (
                                                                                <tr>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{element.name}</td>
                                                                                    <td>{element.y}</td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </Modal>
                                                </NavLink>
                                            </td>
                                            <td>
                                                <NavLink>
                                                    <img src={cart_img} style={{ width: "30px" }} onClick={() => this.Material(index)} />
                                                    <Modal open={this.state.material} onClose={this.on_Close_Modal}>
                                                        <div className="Row">
                                                            <div className="col-12">
                                                                <h3 style={{ textAlign: "center" }}>วัตถุดิบทั้งหมด</h3>
                                                            </div>
                                                        </div>
                                                        <div className="Row">
                                                            <div className="col-12">
                                                                <table>
                                                                    <tr>
                                                                        <td>
                                                                            <h4>
                                                                                ลำดับ
                                                                            </h4>
                                                                        </td>
                                                                        <td>
                                                                            <h4>
                                                                                ชื่อวัตถุดิบ
                                                                            </h4>
                                                                        </td>
                                                                        <td>
                                                                            <h4>
                                                                                ปริมาณ
                                                                            </h4>
                                                                        </td>
                                                                        <td>
                                                                            <h4>
                                                                                หน่วย
                                                                            </h4>
                                                                        </td>
                                                                    </tr>
                                                                    {
                                                                        this.state.plant.map((element, index) => {
                                                                            return (
                                                                                <tr>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{element.plant_name}</td>
                                                                                    <td>{element.plant_volume}</td>
                                                                                    <td>{element.plant_volume_type}</td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </Modal>
                                                </NavLink>
                                            </td>
                                            {/* <td>

                                                <a target="_blank" href={ip + element.image}>
                                                    <img src={ip + element.image} style={{ width: "30px" }} />
                                                </a>

                                            </td> */}
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