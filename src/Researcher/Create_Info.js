import React, { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { post } from '../Support/Service'
import { user_token } from '../Support/Constance';
import Modal from 'react-responsive-modal'

import queryString from 'query-string';
import { async } from 'q';

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
            default_image: null
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
        plants.push({
            plant_name: this.state.plant_name,
            plant_volume: parseInt(this.state.plant_volume),
            plant_volume_type: this.state.plant_volume_type
        })
        this.setState({
            plants: plants
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
                    window.location.href='/Product_Research/Product_Info'
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

                        รายละเอียดผลิตภัณฑ์ที่ต้องการ<br />
                        สารอาหารที่ต้องการ {this.state.demand_detail_nutrient.map((ele_nut) => {
                            return ele_nut + " "
                        })}<br />
                        จำนวน {this.state.demand_detail.volume} {this.state.demand_detail.volume_type}

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
                            </tr>
                            {this.state.plants.map((ele_plant) => {
                                return (
                                    <tr>
                                        <td>{ele_plant.plant_name}</td>
                                        <td>{ele_plant.plant_volume} {ele_plant.plant_volume_type}</td>
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
                        <div className="Row">
                            <div className="col-6">
                                <h5 style={{ marginBottom: "10px" }}>ข้อมูลสารอาหาร</h5>
                                <input type="text" id='nutrient_data' onChange={this.handleChange} style={{ width: "250px" }} />
                            </div>
                            <div className="col-6">
                                <h5 style={{ marginBottom: "10px" }}>ปริมาณสารอาหาร</h5>
                                <input type="text" id='nutrient_volume' onChange={this.handleChange} style={{ width: "50px" }} />%
                            <button className="Add" onClick={() => this.add_nutrient_graph()} style={{ float: "right", marginTop: "-10px" }}>เพิ่มปริมาณสารอาหาร</button>
                                <button className="Add" onClick={() => this.onOpenModal()} style={{ float: "right", marginTop: "-10px" }}>แก้ไขปริมาณสารอาหาร</button>
                            </div>
                        </div>
                        <div className="Row">
                            <div className="col-5">
                                <h5 style={{ marginBottom: "10px" }}>วัตถุดิบที่ใช้</h5>
                                <input type="text" id='plant_name' onChange={this.handleChange} style={{ width: "200px" }} />
                            </div>
                            <div className="col-2">
                                <h5 style={{ marginBottom: "10px" }}>ปริมาณ</h5>
                                <input type="text" id='plant_volume' onChange={this.handleChange} style={{ width: "50px" }} />
                            </div>
                            <div className="col-2">
                                <h5 style={{ marginBottom: "10px" }}>หน่วย</h5>
                                <input type="text" id='plant_volume_type' onChange={this.handleChange} style={{ width: "50px" }} />
                            </div>
                            <div className="col-3">
                                <button className="Add" onClick={() => this.add_plants()} style={{ float: "right", marginTop: "58px" }}>เพิ่มข้อมูล</button>
                            </div>
                        </div>
                        <div className="Row">
                            <div className="col-12">
                                <h5 style={{ marginBottom: "10px" }}>เลือกรูปภาพ</h5>
                                <input type="file" placeholder="กรุณาเลือกรูปภาพ" onChange={this.uploadpicture} style={{ width: "500px" }} />
                            </div>
                        </div>
                        <button className="BTN_Signin" onClick={() => this.add_product_plan()}>ตกลง</button>
                        <button className="BTN_Cencle" style={{ marginTop: "20px" }}>ยกเลิก</button>
                    </div>
                    <div className="col-1"></div>
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className='App'>ข้อมูลสารอาหาร
                    {this.state.nutrient_graph.map((ele, index) => {
                        return (
                            <div>
                                {index + 1}.
                                <input id={index} value={ele.name} onChange={this.nutrientChangeName} />
                                <input id={index} value={ele.y} onChange={this.nutrientChangeY} />
                                <button onClick={() => this.delete_nutrient_graph(index)}>ลบ</button>
                            </div>
                        )
                    })}
                    </div>
                </Modal>
            </div>
        )
    }
}
export default Create_Info;