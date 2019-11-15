//se-middle วางแผนเพาะปลูกให้กับ se-sub
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token, addComma } from '../Support/Constance'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import top from '../Image/top.png'
import Pagination from "../Support/Pagination";
import Modal from 'react-responsive-modal'
import Checkbox from './CheckboxMPlan'
import moment from 'moment'

Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});

class M_Plan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            todosPerPage: 10,
            plants: [],
            se_name: null,
            get_se: [],
            index_plant: 0,
            data_month: [],
            month_detail: [],
            click: 2,
            open: false,
            name_plant: [],
            list_neo: [],
            check_array: [],
            Plant: null,
            date: '',
            se: [],
            selectSE: null,
            selectPlant: '',
            listplan: [],
            volume_fermer: [],
            open1: false,
            detail: [],
            loading: true,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentWillMount() {
        // this.get_plant()
        this.get_all_plant()
        this.get_list_neo()
    }

    onCloseModal = () => {
        this.setState({ open: false, open1: false })
    }

    get_all_plant = async () => {
        try {
            await get('neutrally/get_plant_name', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        name_plant: result.result,
                        loading: false
                    })
                    console.log('get_allplant', result.result)
                }
                else {
                    alert(result.error_message)
                }
            })
        }

        catch (error) {
            alert('get_allplant: ' + error)
        }
    }


    comfirmPlan = async (plant) => {
       
        let data = {
            name_plant: plant,
            check_array: this.state.check_array,
            date: this.state.date,
        }
        this.setState({
            open: true,
            selectPlant: plant
        })
        console.log("data", data)
        try {
            await post(data, 'neutrally/get_plant_volume_all_se', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        list_neo: result.result
                    })
                }

                else {
                    alert('comfirmPlan', result.error_message)
                }
            })
        }
        catch (error) {
            alert('comfirmPlan: ' + error)
        }
    }

    addPlant = async (plant) => {
        let dataplan = {
            plant: plant,
            check_array: this.state.check_array,
            date: this.state.date,
        }
        console.log("dataplan", dataplan)

        try {
            await post(dataplan, 'neutrally/add_year_round', user_token).then((result) => {
                if (result.success) {
                    // window.location.reload()
                    this.setState({
                        open: false
                    })

                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('dataplan: ' + error)
        }
    }

    get_list_neo = async () => {
        try {
            await get('neutrally/get_year_round', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        listplan: result.result
                    })
                    console.log("get_list_neo", result.result)
                }
                else {
                    alert(result.error_message)
                }
            })

        } catch (error) {
            alert('get_list_neo: ' + error)
        }
    }

    GGG = (index) => {
        let aa = this.state.listplan
        let bb = aa[index].detail
        this.setState({
            open1: true,
            detail: bb
        })
    }

    render() {

        let reander_plan = (click) => {
            let return_plan
            switch (click) {

                case 2: return_plan =
                    <div>
                        <div className="Row">
                            <div className="col-1"></div>
                            <div className="col-10">
                                <table>
                                    <tr>
                                        <th>ชื่อวัตถุดิบ</th>
                                        <th>จำนวนที่สั่งซื้อ</th>
                                        <th>จำนวนที่มีอยู่ในคลัง</th>
                                        <th>วัตถุดิบขาด</th>
                                        <th>วางแผน</th>
                                    </tr>
                                    {this.state.name_plant.map((element, index) => {
                                        let want = (element.amount_want * 1) - (element.amount_stock * 1)
                                        return (
                                            <tr style={{ textAlign: "center" }}>
                                                <td>{element.plant_name}</td>
                                                <td>{element.amount_want}</td>
                                                <td>{element.amount_stock}</td>
                                                {want <= 0 ? <td style={{color:"green"}}>วัตถุดิบเพียงพอ</td> : <td>{want * 1}</td>}

                                                <td><button onClick={() => this.comfirmPlan(element.plant_name)} style={{ fontFamily: "fc_lamoonregular", fontSize: "16px" }}>วางแผน</button></td>
                                            </tr>
                                        )
                                    })}


                                </table>


                            </div>
                            <div className="col-1"></div>
                        </div>

                        <Modal open={this.state.open} onClose={this.onCloseModal}>
                            <div className="Row">
                                <div className="col-12" >
                                    <h3 style={{ textAlign: "center" }}>วางแผนการเพาะปลูก {this.state.selectPlant}</h3>
                                </div>
                            </div>
                            <div className="Row">
                                <div className="col-12">
                                    วันที่ต้องการ : <input type="date" id="date" onChange={this.handleChange} style={{ fontFamily: "fc_lamoonregular", fontSize: "16px" }} />
                                    <button onClick={() => this.addPlant(this.state.selectPlant)} style={{ fontFamily: "fc_lamoonregular", fontSize: "16px" }}>ยืนยันการวางแผน</button>
                                    <Checkbox
                                        option={this.state.list_neo}
                                        check_array={this.state.check_array}
                                        return_func={(event) => {
                                            console.log('event', event)
                                            this.setState({
                                                check_array: event
                                            })
                                        }} />

                                </div>

                            </div>

                        </Modal>
                    </div>
                    break;

                case 3: return_plan =
                    <div>
                        <div className="Row">
                            <div className="col-1"></div>
                            <div className="col-10">
                                <h4 style={{ textAlign: "center" }}>ติดตามการวางแผนการเพาะปลูก</h4>
                                {/* {console.log("list fermer", this.state.check_array)} */}

                                <table>
                                    <tr>
                                        {/* <th>เริ่มวันที่</th> */}
                                        <th>ชื่อพืช</th>
                                        <th>จำนวนที่ต้องการ</th>
                                        <th>วันที่ต้องการ</th>
                                        <th>รายละเอียด</th>

                                    </tr>
                                    {
                                        this.state.listplan.map((element, index) => {
                                            return (
                                                <tr style={{ textAlign: "center" }}>
                                                    {/* <td>วันที่เริ่มโครงการ</td> */}
                                                    <td>{element.plant}</td>
                                                    <td>{element.volume}</td>
                                                    <td>{moment(element.year_round_planing_date).format('DD/MM/YYYY')}</td>
                                                    {/* <td>{element.planing_farmer_volume}</td>
                                            <td>กำหนดส่งก่อน : {moment(element.planing_farmer_date).format('DD/MM/YYYY')}</td> */}
                                                    <td><button onClick={() => this.GGG(index)} style={{ fontFamily: "fc_lamoonregular", fontSize: "16px" }}>รายละเอียด</button></td>
                                                </tr>
                                            )
                                        })
                                    }

                                </table>
                                <Modal open={this.state.open1} onClose={this.onCloseModal}>
                                    <div className="Row" style={{ width: "500px" }}>
                                        <div className="col-12" >
                                            <h3 style={{ textAlign: "center" }}>วางแผนการเพาะปลูก {this.state.selectPlant}</h3>
                                        </div>
                                    </div>
                                    <div className="Row">
                                        <div className="col-12">
                                            <table>
                                                <tr>
                                                    <th>ลำดับ</th>
                                                    <th>ชื่อ SE ย่อย ที่เลือก</th>
                                                    <th>จำนวนที่ต้องการ</th>
                                                </tr>

                                                {this.state.detail.map((element, index) => {
                                                    return (
                                                        <tr>
                                                            <td>{index + 1}.</td>
                                                            <td>{element.se_name}</td>
                                                            <td>{element.volume}</td>
                                                            {/* <progress className="progress" value={element.volume} max="100" /> */}
                                                        </tr>
                                                    )
                                                })}
                                            </table>
                                        </div>

                                    </div>

                                </Modal>
                            </div>
                            <div className="col-1"></div>
                        </div>


                    </div>
                    break;
                default:
                    break;
            }
            return return_plan
        }

        return (
            <div>
                {this.state.loading ?
                    <div><div className="loader"></div><h5 style={{ textAlign: 'center', marginTop: '28%' }}>กำลังโหลด...</h5></div>
                    : <div className="App">
                        <div className="Row">
                            <div className="col-12">

                                <div className="tab">
                                    <button onClick={() => this.setState({ click: 2 })}>วางแผนเพาะปลูก</button>
                                    <button onClick={() => this.setState({ click: 3 })}>ติดตามการวางแผน</button>
                                    {this.state.click >= 2 ? <input type="text" placeholder="ค้นหา"
                                        style={{ width: "20%", marginTop: "5px", marginLeft: "25px" }} /> : null}
                                </div>

                            </div>
                        </div>
                        {reander_plan(this.state.click)}
                    </div>}
            </div>


        )
    }
}
export default M_Plan