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

const Product = [
    {
        Product_name: "ยาสมุนไพรลดความอ้วน",
        Product_nutrients: 'โปรตีน',
        Product_number: '10 กล่อง',
        Check_true_img: "https://www.nipa.co.th/wp-content/uploads/2019/03/okt.png",
        Check_false_img: "https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png",
        Fill_out_img: "https://nl2561.nlpoly.com/wp-content/uploads/2018/05/f25.png",
        Develop_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYMcV_tU_MuKHFjcO_cxa_wvoJOJulAKzOU80H4nnltqnkxCFp",
        Nutrients_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjvAUn9nip0Sbmsw0nek8f9rJ4aLW98ZtvwZzSRI4Jw_AI0zy",
        Material_img: "https://www.bahtdiaw.com/img/logo/cart.png",
        img: "http://www.wongtawan.com/wp-content/uploads/product_shoot_88.jpg",
        // Clean_food_img: "https://food.mthai.com/app/uploads/2019/03/Clean-food.jpg",
        // Milk_img: "https://www.honestdocs.co/system/blog_articles/main_hero_images/000/004/572/large/iStock-854296650_%281%29.jpg",
        Edit_data_img: "https://th.seaicons.com/wp-content/uploads/2017/02/edit-icon.png",
        Delete_data_img: "https://inwfile.com/s-dm/7dvzz2.png",
        Send_information_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQwHV0w_GqHEPvyssqRe-vKuUbfjZdsy_Q6l-oiKL5t1yRG_v7"
    },
    {
        Product_name: "อาหารคลีน",
        Product_nutrients: 'คาร์โบไฮเดรต, โปรตีน',
        Product_number: '20 ชิ้น',
        Check_true_img: "https://www.nipa.co.th/wp-content/uploads/2019/03/okt.png",
        Check_false_img: "https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png",
        Fill_out_img: "https://nl2561.nlpoly.com/wp-content/uploads/2018/05/f25.png",
        Develop_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYMcV_tU_MuKHFjcO_cxa_wvoJOJulAKzOU80H4nnltqnkxCFp",
        Nutrients_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjvAUn9nip0Sbmsw0nek8f9rJ4aLW98ZtvwZzSRI4Jw_AI0zy",
        Material_img: "https://www.bahtdiaw.com/img/logo/cart.png",
        // Herbal_medicines_img: "http://www.wongtawan.com/wp-content/uploads/product_shoot_88.jpg",
        img: "https://food.mthai.com/app/uploads/2019/03/Clean-food.jpg",
        // Milk_img: "https://www.honestdocs.co/system/blog_articles/main_hero_images/000/004/572/large/iStock-854296650_%281%29.jpg",
        Edit_data_img: "https://th.seaicons.com/wp-content/uploads/2017/02/edit-icon.png",
        Delete_data_img: "https://inwfile.com/s-dm/7dvzz2.png",
        Send_information_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQwHV0w_GqHEPvyssqRe-vKuUbfjZdsy_Q6l-oiKL5t1yRG_v7"
    },
    {
        Product_name: "นมเพิ่มความสูง",
        Product_nutrients: 'วิตามิน',
        Product_number: '30 กล่อง',
        Check_true_img: "https://www.nipa.co.th/wp-content/uploads/2019/03/okt.png",
        Check_false_img: "https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png",
        Fill_out_img: "https://nl2561.nlpoly.com/wp-content/uploads/2018/05/f25.png",
        Develop_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYMcV_tU_MuKHFjcO_cxa_wvoJOJulAKzOU80H4nnltqnkxCFp",
        Nutrients_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjvAUn9nip0Sbmsw0nek8f9rJ4aLW98ZtvwZzSRI4Jw_AI0zy",
        Material_img: "https://www.bahtdiaw.com/img/logo/cart.png",
        // Herbal_medicines_img: "http://www.wongtawan.com/wp-content/uploads/product_shoot_88.jpg",
        // Clean_food_img: "https://food.mthai.com/app/uploads/2019/03/Clean-food.jpg",
        img: "https://www.honestdocs.co/system/blog_articles/main_hero_images/000/004/572/large/iStock-854296650_%281%29.jpg",
        Edit_data_img: "https://th.seaicons.com/wp-content/uploads/2017/02/edit-icon.png",
        Delete_data_img: "https://inwfile.com/s-dm/7dvzz2.png",
        Send_information_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQwHV0w_GqHEPvyssqRe-vKuUbfjZdsy_Q6l-oiKL5t1yRG_v7"
    }
]

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
            data_edit_nutrient: []

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
        this.setState({ open: false, material: false, edit_data: false });
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

    Edit_data = (index) => {
        let data = this.state.product_plan
        this.setState({
            edit_data: true,
            data_edit: data[index],
            data_edit_nutrient: data[index].nutrient_precent
        });
    }

    Delete_Product = () => {
        alert("ยกเลิกรายการ")
    }

    Send_information = () => {
        alert("ส่งข้อมูลเรียบร้อยเเล้ว")
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
                    <div className="col-12">
                        <table style={{ textAlign: "center" }}>
                            <tr>
                                <th>ชื่อผลิตภัณฑ์</th>
                                <th>ชื่อสูตร</th>
                                <th>สารอาหาร</th>
                                <th>วัตถุดิบ</th>
                                <th>รูปภาพ</th>
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
                                                    <img src={cart_img} style={{ width: "30px" }} onClick={() => { this.Material(index) }} />
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
                                            <td>
                                                <NavLink>
                                                    <img src={ip + element.image} style={{ width: "30px" }} onClick={() => { this.Image() }} />
                                                </NavLink>
                                            </td>
                                            <td>
                                                <NavLink>
                                                    <img src={edit_icon} style={{ width: "30px" }} onClick={() => { this.Edit_data(index) }} />
                                                    <Modal open={this.state.edit_data} onClose={this.on_Close_Modal}>
                                                        <div className="Row">
                                                            <div className="col-12">
                                                                <h3 style={{ textAlign: "center" }}>พัฒนาผลิตภัณฑ์</h3>
                                                                <h4 style={{ textAlign: "center" }}>ชื่อผลิตภัณฑ์ : {this.state.data_edit.product_name}</h4>
                                                                <h4>ชื่อสูตรผลิตภัณฑ์</h4>
                                                                <input type="text" value={this.state.data_edit.product_plan_name} style={{ width: "500px" }} />
                                                            </div>
                                                        </div>
                                                        <div className="Row">
                                                            <div className="col-6">
                                                                <h4>ข้อมูลสารอาหาร</h4>
                                                            </div>
                                                            <div className="col-6">
                                                                <h4>ปริมาณสารอาหาร</h4>

                                                                <button>เพิ่มข้อมูล</button>
                                                            </div>
                                                        </div>
                                                        {this.state.data_edit_nutrient.map((element) => {
                                                            return (
                                                                <div className="Row">
                                                                    <div className="col-6">
                                                                        <input value={element.name} />
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <input value={element.y} />
                                                                    </div>
                                                                </div>
                                                            )

                                                        })}
                                                        <div className="Row">
                                                            <div className="col-6">
                                                                <h4>วัตถุดิบที่ใช้</h4>
                                                                <input type="text" style={{ width: "200px" }} />
                                                            </div>
                                                            <div className="col-3">
                                                                <h4>ปริมาณ</h4>
                                                                <input type="text" style={{ width: "50px" }} />
                                                            </div>
                                                            <div className="col-3">
                                                                <h4>หน่วย</h4>
                                                                <input type="text" style={{ width: "50px" }} />
                                                                <button>เพิ่มข้อมูล</button>
                                                            </div>
                                                        </div>
                                                        <div className="Row">
                                                            <div className="col-12">
                                                                <h4>เลือกรูปภาพ</h4>
                                                                <input type="search" placeholder="กรุณาเลือกรูปภาพ" style={{ width: "500px" }} />
                                                            </div>
                                                        </div>
                                                        <NavLink>
                                                            <button>
                                                                ตกลง
                                                            </button>
                                                        </NavLink>
                                                        <NavLink>
                                                            <button>
                                                                ยกเลิก
                                                            </button>
                                                        </NavLink>
                                                    </Modal>
                                                </NavLink>
                                            </td>
                                            <td>
                                                <NavLink>
                                                    <img src={delete_icon} style={{ width: "30px" }} onClick={() => { this.Delete_Product() }} />
                                                </NavLink>
                                            </td>
                                            <td>
                                                <NavLink>
                                                    <img src={send_data_icon} style={{ width: "30px" }} onClick={() => { this.Send_information() }} />
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