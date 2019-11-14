import React, { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { post, get } from '../Support/Service'
import { user_token } from '../Support/Constance';
import Modal from 'react-responsive-modal'
import delete_icon from '../Image/delete-icon.png'

import queryString from 'query-string';

class Create_Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            demand_detail: '',
            demand_detail_nutrient: [],
            product_plan_name: null,
            nutrient_graph: [],
            nutrient_data: null,
            nutrient_volume: null,
            plants: [],
            plant_name: null,
            plant_volume: 0,
            plant_volume_type: null,
            open: false,
            default_image: null,
            nutrient_information: [],
            nutrient_information_plant: []
        }
    }
    onOpenModal = () => {
        this.setState({
            open: true
        })
    }
    onCloseModal = () => {
        this.setState({
            open: false
        })
    }

    componentWillMount() {
        this.get_demand_detail()
        this.get_nutrient_information()
        this.get_nutrient_information_plant()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    nutrientChangeName = (e) => {
        let nutrient_graph = this.state.nutrient_graph
        let index = e.target.id
        nutrient_graph[index].name = e.target.value
        this.setState({
            nutrient_graph: nutrient_graph
        })

    }
    nutrientChangeY = (e) => {
        let nutrient_graph = this.state.nutrient_graph
        let index = e.target.id
        nutrient_graph[index].y = parseInt(e.target.value)
        this.setState({
            nutrient_graph: nutrient_graph
        })

    }

    get_nutrient_information = async () => {
        try {
            await get('researcher/get_nutrient_information', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        nutrient_information: result.result
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

    get_nutrient_information_plant = async () => {
        try {
            await get('researcher/get_nutrient_information_plant', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        nutrient_information_plant: result.result
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

    add_nutrient_graph = () => {
        let nutrient = this.state.nutrient_graph
        console.log(this.state.nutrient_data, this.state.nutrient_volume)
        nutrient.push({
            name: this.state.nutrient_data,
            y: parseInt(this.state.nutrient_volume)
        })
        this.setState({
            nutrient_graph: nutrient,
        })
    }
    delete_nutrient_graph = (index) => {
        let nutrient_graph = this.state.nutrient_graph
        nutrient_graph.splice(index, 1)
        this.setState({
            nutrient_graph: nutrient_graph
        })
    }

    add_plants = () => {
        let plants = this.state.plants
        let plant_name = this.state.plant_name
        console.log('pla',plant_name)
        let nutrient = this.state.nutrient_graph
        plants.push({
            plant_name: this.state.plant_name,
            plant_volume: parseInt(this.state.plant_volume),
            plant_volume_type: this.state.plant_volume_type
        })

        var updatedList = this.state.nutrient_information;
        updatedList = updatedList.filter(function (item) {
            return item.plant_name.search(plant_name) !== -1;
        });

        updatedList.map((ele_list) => {
            nutrient.push({
                name: ele_list.nutrient_name,
                y: ele_list.volume * this.state.plant_volume
            })
        })

        this.setState({
            plants: plants,
            nutrient_graph:nutrient
        })

    }

    get_demand_detail = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        console.log("obj", params)
        try {
            await post(params, 'researcher/get_demand_detail', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        demand_detail: result.result,
                        demand_detail_nutrient: result.result.nutrient

                    })
                    // alert('ยืนยันรับงานวิจัย เรียบร้อย')
                    console.log(result.result)
                }
                else {
                    alert(result.error_message)
                }
            })
        } catch (error) {

        }
    }

    add_product_plan = async () => {
        let obj = {
            product_id: this.state.demand_detail.product_id,
            nutrient_precent: JSON.stringify(this.state.nutrient_graph),
            plant: JSON.stringify(this.state.plants),
            image: this.state.default_image,
            product_plan_name: this.state.product_plan_name
        }
        try {
            await post(obj, 'researcher/add_product_plan', user_token).then((result) => {
                if (result.success) {
                    alert('เพิ่มสูตรพัฒนาเรียบร้อย')
                    window.location.href = '/Product_Research/Product_Info'
                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('add_product_plan' + error)
        }
    }

    uploadpicture = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) {

        } else {
            reader.readAsDataURL(file)

            reader.onloadend = () => {
                console.log("img", reader.result)
                this.setState({
                    default_image: reader.result,
                });
            }
        }
    }

    render() {

        let options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'กราฟแสดงผลอัตราส่วนสารอาหาร',
                style: {
                    fontSize: '20px',
                    fontFamily: 'fc_lamoonregular'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    style: {
                        fontSize: '20px',
                        fontFamily: 'fc_lamoonregular'
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'อัตราส่วน',
                style: {
                    fontSize: '20px',
                    fontFamily: 'fc_lamoonregular'
                },
                colorByPoint: true,
                data: this.state.nutrient_graph
            }]
        };


        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>สร้างสูตรพัฒนาผลิตภัณฑ์ {this.state.demand_detail.product_name} </h2>
                        <h4 style={{ textAlign: "center" }}>
                            รายละเอียดผลิตภัณฑ์ที่ต้องการ<br />
                            สารอาหารที่ต้องการ {this.state.demand_detail_nutrient.map((ele_nut) => {
                                return ele_nut + " "
                            })}<br />
                            จำนวน {this.state.demand_detail.volume} {this.state.demand_detail.volume_type}
                        </h4>


                    </div>
                </div>

                <div className="Row">

                    <div className="col-6">

                        <HighchartsReact highcharts={Highcharts} options={options} />

                        <table style={{ textAlign: "center", marginLeft: "30px", width: "90%" }}>
                            <tr>
                                <th colSpan="4">รายชื่อวัตถุดิบ</th>
                            </tr>
                            <tr>
                                <th>ชื่อพืช </th>
                                <th>จำนวน/หน่วย</th>
                                {/* <th>ราคาต้นทุน/หน่วย (บาท)</th>
                                <th>ราคารวม (บาท)</th> */}
                                <th>ลบ</th>
                            </tr>
                            {this.state.plants.map((ele_plant) => {
                                return (
                                    <tr>
                                        <td>{ele_plant.plant_name}</td>
                                        <td>{ele_plant.plant_volume} {ele_plant.plant_volume_type}</td>
                                        {/* <td>ราคา</td> */}
                                        <td><img src={delete_icon} style={{ width: "30px" }} alt="cancle" /></td>
                                    </tr>
                                )
                            })}

                        </table>
                    </div>
                    <div className="col-5">
                        <h3 style={{ margin: "0", textAlign: "center" }}>กรอกสูตรพัฒนา</h3>
                        <div className="Row">
                            <div className="col-12">
                                <h5 style={{ marginBottom: "10px" }}>ชื่อสูตรผลิตภัณฑ์</h5>
                                <input type="text" id='product_plan_name' onChange={this.handleChange} style={{ width: "500px" }} />
                            </div>
                        </div>
                        {/* <div className="Row">
                            <div className="col-6">
                                <h5 style={{ marginBottom: "10px" }}>ข้อมูลสารอาหาร</h5>
                                <input type="text" id='nutrient_data' onChange={this.handleChange} style={{ width: "250px" }} />
                            </div>
                            <div className="col-6">
                                <h5 style={{ marginBottom: "10px" }}>ปริมาณสารอาหาร</h5>
                                <input type="text" id='nutrient_volume' onChange={this.handleChange} style={{ width: "50px" }} />กรัม
                                <button className="Add" onClick={() => this.add_nutrient_graph()} style={{ float: "right", marginTop: "-10px" }}>เพิ่มปริมาณสารอาหาร</button>
                                <button className="BTN_Edit" onClick={() => this.onOpenModal()} style={{ float: "right", marginTop: "10px" }}>แก้ไขปริมาณสารอาหาร</button>
                            </div>
                        </div> */}
                        <div className="Row">
                            <div className="col-5">
                                <h5 style={{ marginBottom: "10px" }}>วัตถุดิบที่ใช้</h5>
                                <input type="text" list="data" id='plant_name' onChange={this.handleChange} style={{ width: "200px" }} />

                                <datalist id="data">
                                    {this.state.nutrient_information_plant.map((item, key) =>
                                        <option key={key} value={item.plant_name} />
                                    )}
                                </datalist>

                            </div>
                            <div className="col-2">
                                <h5 style={{ marginBottom: "10px" }}>ปริมาณ</h5>
                                <input type="text" id='plant_volume' onChange={this.handleChange} style={{ width: "50px" }} />
                            </div>
                            <div className="col-4">
                                <h5 style={{ marginBottom: "10px" }}>หน่วย</h5>
                                <select onChange={this.handleChange} type="select" style={{width:"90px"}}>
                                    <option>มิลลิกรัม</option>
                                    <option>กรัม</option>
                                    <option>กิโลกรัม</option>
                                </select>
                                {/* <input type="text" id='plant_volume_type' onChange={this.handleChange} style={{ width: "50px" }} /> */}
                            </div>
                            <div className="col-1">
                                <button className="BTN_AddCart" onClick={() => this.add_plants()} style={{ float: "right", marginTop: "58px" }}>+ วัตถุดิบ</button>
                            </div>
                        </div>
                        {/* <div className="Row">
                            <div className="col-12">
                                <h5 style={{ marginBottom: "10px" }}>เลือกรูปภาพ</h5>
                                <input type="file" placeholder="กรุณาเลือกรูปภาพ" onChange={this.uploadpicture} style={{ width: "500px" }} />
                            </div>
                        </div> */}


                        {/* <input type="text" list="data" onChange={this._onChange} />

                        <datalist id="data">
                            {this.state.data.map((item, key) =>
                                <option key={key} value={item.displayValue} />
                            )}
                        </datalist> */}



                        <button className="BTN_Signin" onClick={() => this.add_product_plan()}>ตกลง</button>
                        <button className="BTN_Cencle" style={{ marginTop: "20px" }}>ยกเลิก</button>
                    </div>
                    <div className="col-1"></div>
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className='Row' style={{ width: "800px" }}>
                        <div className="col-12" style={{ width: "800px" }}>
                            <h2 style={{ textAlign: "center" }}>ข้อมูลสารอาหาร</h2>
                            <table>
                                {this.state.nutrient_graph.map((ele, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}.</td>
                                            <td><input type="text" id={index} value={ele.name} onChange={this.nutrientChangeName} /></td>
                                            <td><input type="number" style={{ marginLeft: "25px" }} id={index} value={ele.y} onChange={this.nutrientChangeY} /></td>
                                            <td><img src={delete_icon} style={{ width: "30px", cursor: "pointer" }} alt="cancle" onClick={() => this.delete_nutrient_graph(index)} /></td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>



                    </div>
                </Modal>
            </div>
        )
    }
}
export default Create_Info;