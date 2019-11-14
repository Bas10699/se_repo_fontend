import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token, addComma } from '../Support/Constance'
import Modal from 'react-responsive-modal'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import delete_icon from '../Image/delete-icon.png'
import { async } from 'q'

class Create_Nutrients extends Component {
    constructor(props) {
        super(props)
        this.state = {
            get_data: [],
            currentPage: 1,
            todosPerPage: 10,
            get_plant_all: [],
            get_plant_all_origin: [],
            plants: '',
            data_month: [],
            index_plant: 0,
            open: false,
            name: "",
            nutrient_graph: []
        }
    }
    componentWillMount() {
        this.get_data()
        this.get_plant_all_mount()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
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

    get_data = async () => {
        try {
            await get('researcher/get_plant', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_data: result.result,
                    })
                    setTimeout(() => {
                        console.log("get_data", result.result)
                    }, 500)
                } else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {

        }
    }


    get_plant_all_mount = async () => {
        try {
            await get('researcher/get_plant_all_mount', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_plant_all_origin: result.result,
                        get_plant_all: result.result,
                        plants: result.result,
                        data_month: result.result[0].data
                    })
                    console.log('plant', result.result)
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
    add_nutrient_information = async () => {
        let obj = {
            nutrient: this.state.nutrient_graph,
            plant_name: this.state.name
        }
        try {
            await post(obj, 'researcher/add_nutrient_information', user_token).then((result) => {
                if (result.success) {
                    alert('สำเร็จ')
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

    set_nutrients = (name) => {
        console.log("set_nutrients", name)
        this.setState({
            open: true,
            name: name,
            nutrient_graph: [],
            nutrient_data: null,
            nutrient_volume: null,
        })
    }

    onCloseModal = () => {
        // window.location.reload()
        this.setState({ open: false });

    };

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
                        <h2 style={{ textAlign: "center" }}>จัดการสารอาหาร</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <table>
                            <tr>
                                <th>รายชื่อพืช</th>
                                <th>จัดการสารอาหาร</th>
                            </tr>
                            {this.state.get_plant_all.map((element, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}. {element.name}</td>
                                        <td><div onClick={() => this.set_nutrients(element.name)}>จัดการสารอาหาร</div></td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                    <div className="col-2"></div>
                </div>

                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="Row" style={{ width: "800px" }}>
                        <div className="col-12">
                            <h3 style={{ textAlign: "center" }}>จัดการสารอาหาร {this.state.name}</h3>
                            <div className="Row">
                                <div className="col-7">
                                    <HighchartsReact highcharts={Highcharts} options={options} />
                                </div>
                                <div className="col-5">
                                    รายการสารอาหาร
                                        {this.state.nutrient_graph.map((ele, index) => {
                                                    <img src={delete_icon} style={{ width: "30px", cursor: "pointer",marginTop:"15px" }} alt="cancle" onClick={() => this.delete_nutrient_graph(index)} />
                                </div>
                            </div>

                            <div className="Row">
                                <div className="col-1"></div>
                                <div className="col-5">
                                    <h5 style={{ marginBottom: "10px" }}>ข้อมูลสารอาหาร</h5>
                                    <input type="text" id='nutrient_data' onChange={this.handleChange} style={{ width: "250px" }} />
                                </div>
                                <div className="col-5">
                                    <h5 style={{ marginBottom: "10px" }}>ปริมาณสารอาหาร</h5>
                                    <input type="text" id='nutrient_volume' onChange={this.handleChange} style={{ width: "50px" }} /> กรัม
                                    <button className="Add" onClick={() => this.add_nutrient_graph()} style={{ float: "right", marginTop: "-10px" }}>เพิ่มปริมาณสารอาหาร</button>
                                    {/* <button className="BTN_Edit" onClick={() => this.onOpenModal()} style={{ float: "right", marginTop: "10px" }}>แก้ไขปริมาณสารอาหาร</button> */}
                                </div>
                            </div>
                            <button className="BTN_Signin" onClick={()=>this.add_nutrient_information()}>บันทึก</button>
                            <button className="BTN_Signup" onClick={this.onCloseModal}>ยกเลิก</button>

                        </div>
                    </div>

                </Modal>


            </div>
        )
    }
}
export default Create_Nutrients