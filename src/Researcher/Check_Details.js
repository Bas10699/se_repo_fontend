import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { user_token } from '../Support/Constance';
import { get, post, ip } from '../Support/Service';
import Modal from 'react-responsive-modal';
import cart_img from '../Image/cart.png'
import nutrients_img from '../Image/nutrients_img.png'
import edit_icon from '../Image/edit-icon.png'
import delete_icon from '../Image/delete-icon.png'
import send_data_icon from '../Image/send-data-icon.png'


class Confirm_Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            material: false,
            edit_data: false,
            product_plan: [],
            nutrient_precent: [],
            plant: [],
            data_edit: '',
            data_edit_nutrient: [],
            data_edit_plant: [],


        }
    }

    componentWillMount() {
        this.get_product_plan_detail()
    }

    get_product_plan_detail = async () => {
        try {
            await get('researcher/get_product_plan_detail', user_token).then((result) => {
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

    delete_product_plan_detail = async (plan) => {
        let obj = {
            plan_id: plan.plan_id
        }
        try {
            await post(obj, 'researcher/delete_product_plan', user_token).then((result) => {
                if (result.success) {
                    alert('ลบสูตรพัฒนาแล้ว')
                    window.location.reload()
                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {

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

    on_Close_Modal_edit = () => {
        if (window.confirm('คุณแน่ใจหรือไม่?')) {
            // Save it!
            window.location.reload()
        } else {
            // Do nothing!
        }
    }

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

    Edit_data = (index) => {
        let data = this.state.product_plan
        this.setState({
            edit_data: true,
            data_edit: data[index],
            data_edit_nutrient: data[index].nutrient_precent,
            data_edit_plant: data[index].plant
        });
    }

    send_developer_demand = async (plan) => {
        let obj = {
            plan_id: plan.plan_id,
            product_id: plan.product_id
        }
        console.log(obj)
        try {
            await post(obj, 'researcher/send_developer_demand', user_token).then((result) => {
                if (result.success) {
                    alert('ส่งข้อมูลเรียบร้อย')
                    window.location.reload()
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

    render() {
        return (
            <div className="App">

                <div className="Row">
                    <div className="col-12">
                        <h3 style={{ textAlign: "center" }}>ตรวจสอบรายละเอียด</h3>
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
                                <th>เเก้ไขข้อมูล</th>
                                <th>ลบข้อมูล</th>
                                <th>ส่งข้อมูล</th>
                            </tr>
                            {
                                this.state.product_plan.map((element, index) => {
                                    return (
                                        <tr>
                                            <td>{element.product_name}</td>
                                            <td>{element.product_plan_name}</td>
                                            <td>
                                                <NavLink>
                                                    <img src={nutrients_img} style={{ width: "30px" }} onClick={() => { this.on_Open_Modal(index) }} />
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
                                                    <img src={cart_img} style={{ width: "30px" }} alt="img" onClick={() => { this.Material(index) }} />
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
                                                                                    <td>
                                                                                        
                                                                                        {element.plant_volume_type}
                                                                                        </td>
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
                                                        <img src={ip + element.image} style={{ width: "30px" }} alt="img" />
                                                    </a>
                                            </td> */}
                                            <td>
                                                <img src={edit_icon} style={{ width: "30px" }} onClick={() => { this.Edit_data(index) }} />
                                                <Modal open={this.state.edit_data} onClose={this.on_Close_Modal_edit}>
                                                    <div className="Row" style={{ width: "600px" }}>
                                                        <div className="col-12" >
                                                            <h3 style={{ textAlign: "center" }}>พัฒนาผลิตภัณฑ์</h3>
                                                            <h4 style={{ textAlign: "center" }}>ชื่อผลิตภัณฑ์ : {this.state.data_edit.product_name}</h4>
                                                            <h4>ชื่อสูตรผลิตภัณฑ์</h4>
                                                            <input type="text" value={this.state.data_edit.product_plan_name} style={{ width: "500px" }} />
                                                        </div>
                                                    </div>
                                                    <div className="Row">
                                                        <div className="col-5">
                                                            <h4>ข้อมูลสารอาหาร</h4>
                                                            {/* <input type="text" value={element.name} style={{ width: "200px" }} /> */}
                                                        </div>
                                                        <div className="col-5">
                                                            <h4>ปริมาณสารอาหาร</h4>
                                                            {/* <input type="text" style={{ width: "200px" }} /> */}
                                                        </div>

                                                    </div>
                                                    {this.state.data_edit_nutrient.map((element) => {
                                                        return (
                                                            <div className="Row">
                                                                <div className="col-5">
                                                                    <input type="text" style={{ width: "200px" }} value={element.name} />
                                                                </div>
                                                                <div className="col-5">
                                                                    <input type="text" style={{ width: "200px" }} value={element.y} />
                                                                </div>
                                                                <img src={delete_icon} style={{ width: "30px" }} />
                                                            </div>
                                                        )

                                                    })}
                                                    <button className="Add" style={{ marginTop: "25px" }}>เพิ่มสารอาหาร</button>
                                                    <div className="Row">
                                                        <div className="col-6">
                                                            <h4>วัตถุดิบที่ใช้</h4>
                                                            {/* <input type="text" style={{ width: "200px" }} /> */}
                                                        </div>
                                                        <div className="col-3">
                                                            <h4>ปริมาณ</h4>
                                                            {/* <input type="text" style={{ width: "50px" }} /> */}
                                                        </div>
                                                        <div className="col-3">
                                                            <h4>หน่วย</h4>
                                                            {/* <input type="text" style={{ width: "50px" }} /> */}

                                                        </div>
                                                    </div>
                                                    {this.state.data_edit_plant.map((element) => {
                                                        return (
                                                            <div className="Row">
                                                                <div className="col-6">
                                                                    <input type="text" style={{ width: "200px" }} value={element.plant_name} />
                                                                </div>
                                                                <div className="col-3">
                                                                    <input type="text" style={{ width: "50px" }} value={element.plant_volume} />
                                                                </div>
                                                                <div className="col-2">
                                                                <select type="select" style={{ width: "90px" }}
                                                                value={element.plant_volume_type}>
                                                                                            <option>มิลลิกรัม</option>
                                                                                            <option>กรัม</option>
                                                                                            <option>กิโลกรัม</option>
                                                                                        </select>
                                                                    {/* <input type="text" style={{ width: "50px" }} value={element.plant_volume_type} /> */}
                                                                </div>
                                                                <img src={delete_icon} style={{ width: "30px" }} />
                                                            </div>
                                                        )

                                                    })}
                                                    <button className="Add" style={{ marginTop: "25px" }}>เพิ่มวัตถุดิบ</button>
                                                    {/* <div className="Row">
                                                            <div className="col-12">
                                                                <h4>เลือกรูปภาพ</h4>
                                                                <input type="file" placeholder="กรุณาเลือกรูปภาพ" style={{ width: "500px" }} /><br />
                                                                <img src={ip + element.image} style={{ width: "240px" }} onClick={() => { this.Image() }} />
                                                            </div>
                                                        </div> */}
                                                    <button className="BTN_Signin" style={{ marginTop: "100px" }}>ตกลง</button>
                                                    <button className="BTN_Signup" style={{ marginTop: "100px" }} onClick={() => { this.on_Close_Modal_edit() }}>ยกเลิก</button>
                                                </Modal>
                                            </td>
                                            <td>
                                                <NavLink>
                                                    <img src={delete_icon} style={{ width: "30px" }} onClick={() => { this.delete_product_plan_detail(element) }} />
                                                </NavLink>
                                            </td>
                                            <td>
                                                <NavLink>
                                                    <img src={send_data_icon} style={{ width: "30px" }} onClick={() => { this.send_developer_demand(element) }} />
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