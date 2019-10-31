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
            click: 1,
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
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentWillMount() {
        this.get_plant()
        this.get_all_plant()
        this.get_list_neo()
        this.get_volume_fermer()
    }

    onCloseModal = () => {
        this.setState({ open: false })
    }

    get_volume_fermer = async () => {
        try {
            await get('neutrally/get_count_se_all', user_token).then((result) => {
                if (result.success) {
                    this.setState({ volume_fermer: result.result })
                    console.log('get_volume_fermer', result.result)
                }
                else {
                    alert(result.error_message)
                }
            })

        } catch (error) {
            alert('get_volume_fermer: ' + error)
        }
    }

    get_all_plant = async () => {
        try {
            await get('neutrally/get_plant_name', user_token).then((result) => {
                if (result.success) {
                    this.setState({ name_plant: result.result })
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

    openModel = (plant) => {
        let se = this.state.se
        let selectSE = []

        this.state.check_array.map((element) => {

            selectSE.push({
                se_name: se[element.check].se_name,
                data: se[element.check].data,
                amount: element.amount,
            })

        })
        console.log("jhjh", selectSE)
        this.setState({
            open: true,
            selectSE: selectSE,
            Plant: plant
        })
    }

    comfirmPlan = async (plant) => {
        this.setState({
            open: true,
            selectPlant: plant
        })
        let data = {
            name_plant: plant,
            check_array: this.state.check_array,
            date: this.state.date,
        }
        console.log("data", data)
        try {
            await post(data, 'neutrally/get_plant_volume_all_se', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        list_neo: result.result
                    })
                }

                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('addplant: ' + error)
        }
    }


    get_plant = async () => {
        try {
            await get('neutrally/get_plant_all_se', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_se: result.result,
                        se_name: result.result[0].se_name,
                        plants: result.result[0].plant,
                        data_month: result.result[0].plant[0].data

                    })
                    console.log('get_plant', result.result)
                }
                else {
                    alert(result.error_message)
                }
            })

        } catch (error) {
            alert('get_plant: ' + error)

        }
    }

    select_se = (index) => {
        let result = this.state.get_se
        this.setState({
            se_name: result[index].se_name,
            plants: result[index].plant,
            data_month: result[index].plant[0].data

        })
    }

    show_chart = (index) => {
        let plant = this.state.plants
        this.setState({
            index_plant: index,
            data_month: plant[index].data
        })
    }

    show_detail_month = (plant, index) => {
        let plants = this.state.plants
        console.log('index', plants[plant])
        this.setState({
            month_detail: plants[plant].detail[index]
        })
    }

    rander_month = (index) => {
        let return_month
        switch (index) {
            case 1: return_month = <b>ม.ค.</b>
                break;
            case 2: return_month = <b>ก.พ.</b>
                break;
            case 3: return_month = <b>มี.ค.</b>
                break;
            case 4: return_month = <b>เม.ย.</b>
                break;
            case 5: return_month = <b>พ.ค.</b>
                break;
            case 6: return_month = <b>มิ.ย.</b>
                break;
            case 7: return_month = <b>ก.ค.</b>
                break;
            case 8: return_month = <b>ส.ค.</b>
                break;
            case 9: return_month = <b>ก.ย.</b>
                break;
            case 10: return_month = <b>ต.ค.</b>
                break;
            case 11: return_month = <b>พ.ย.</b>
                break;
            case 12: return_month = <b>ธ.ค.</b>
                break;
            default:
                break;
        }
        return return_month
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
                    window.location.reload()
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
                    console.log("get_list_neo", result, result)
                }
                else {
                    alert(result.error_message)
                }
            })

        } catch (error) {
            alert('get_list_neo: ' + error)
        }
    }

    sum_volume = (count_farmer) => {
        let sum = 0;
        count_farmer.map((element) => {
            return (
                sum += (element.count_farmer)
            )

        })
        return sum;

    }


    changeCurrentPage = numPage => {
        this.setState({ currentPage: numPage });
        //fetch a data
        //or update a query to get data
    };

    render() {

        const { month_detail, currentPage, todosPerPage } = this.state;
        // Logic for displaying todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = month_detail.slice(indexOfFirstTodo, indexOfLastTodo);

        let plant = this.state.plants
        let index = this.state.index_plant
        console.log('chart plant', plant[index])
        var options = {

            title: {
                text: plant[index] ? plant[index].name : null,
                style: {
                    fontSize: '24px',
                    fontFamily: 'fc_lamoonregular'
                }
            },

            xAxis: {
                categories: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
            },

            yAxis: {
                type: 'logarithmic',
                // minorTickInterval: 10
                title: {
                    text: '<span style="font-size:15px;">จำนวน (กิโลกรัม)</span>',
                    style: {
                        fontSize: '20px',
                        fontFamily: 'fc_lamoonregular'
                    }
                }
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        // format: '{point.y}'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:14px">{point.key}</span><br/><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0;font-size:10px">จำนวน : </td>' +
                    '<td style="padding:0"><b>{point.y} กิโลกรัม </b></td></tr>',
                footerFormat: '</table>',
            },
            series: [{
                type: 'column',
                colorByPoint: true,
                data: plant[index] ? plant[index].data : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                showInLegend: false,
                labels: {
                    enabled: true,
                    rotation: 0,
                    color: '{series.color}',
                    align: 'center',
                    format: '(point.y)}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '20px',
                        fontFamily: 'fc_lamoonregular'

                    }
                }
            }],


        }

        let reander_plan = (click) => {
            let return_plan
            switch (click) {
                case 1: return_plan = <div className="App">

                    <div className="Row">
                        <div className="col-12">
                            <h2 style={{ marginBottom: "0", marginTop: "10px", marginLeft: "50px" }}>เลือก Neo-firm</h2>
                            {this.state.get_se.map((ele_get_se, index) => {
                                return (
                                    <button onClick={() => this.select_se(index)} style={{ width: "20%", margin: "0" }} className="selectShowb">
                                        {ele_get_se.se_name}
                                    </button>
                                )
                            })}
                            <h3 style={{ textAlign: "center" }}>ผลผลิตที่ส่งมอบได้ในเครือ {this.state.se_name}</h3>
                        </div>
                    </div>

                    <div className="Row">
                        {/* <div className="col-1"></div> */}
                        <div className="col-1" style={{ marginLeft: "10px" }}>
                            ผลผลิตที่ส่งมอบได้
                        {this.state.plants.map((element, index) => {
                                return (
                                    <div style={{ cursor: 'pointer' }} onClick={() => this.show_chart(index)}> {index + 1}. {element.name}</div>
                                )
                            })}
                        </div>
                        {/* <div className="col-1"></div> */}
                        <div className='col-9'>
                            <HighchartsReact highcharts={Highcharts} options={options} />


                        </div>
                        {/* <div className="col-1"></div> */}
                        <div className="col-2" style={{ marginLeft: "10px" }}>
                            <div style={{ textAlign: "center" }}>
                                {this.state.plants[this.state.index_plant] ?
                                    this.state.plants[this.state.index_plant].name
                                    :
                                    null
                                }
                            </div>
                            <table className="s_plant">
                                {this.state.data_month.map((element, index) => {
                                    return (
                                        <tr style={{ cursor: 'pointer' }} onClick={() => this.show_detail_month(this.state.index_plant, index)}>
                                            <th>{this.rander_month(index + 1)}</th>
                                            <td style={{ textAlign: "right" }}>{addComma(element)}</td>
                                            <td style={{ textAlign: "center" }}>กิโลกรัม</td>
                                        </tr>
                                    )
                                })}<div id="Top" />
                            </table>

                        </div>
                    </div>
                    <div>
                        <h4 style={{ textAlign: "center" }}>รายชื่อเกษตรที่มีผลผลิตที่ส่งมอบได้ในเดือน </h4>
                    </div>
                    <div className="Row">
                        <div className="col-1"></div>
                        <div className="col-10">
                            {this.state.data_month ?
                                <div>

                                    <table>
                                        <tr>
                                            <th>ลำดับ</th>
                                            <th>ชื่อ</th>
                                            <th>พืชที่ปลูก </th>
                                            <th>เดือนที่ส่งมอบ</th>
                                            <th>จํานวนผลผลิตที่ส่งมอบต่อครั้ง</th>
                                            <th>จำนวนครั้งส่งมอบ</th>
                                            <th>รวม</th>
                                        </tr>
                                        {currentTodos.map((ele_detail, index) => {
                                            return (
                                                <tr style={{ textAlign: "center" }}>
                                                    <td>{index + 1}</td>
                                                    <td style={{ textAlign: "left" }}>{ele_detail.title_name}{ele_detail.first_name}  {ele_detail.last_name}</td>
                                                    <td><b>{ele_detail.plant}</b></td>
                                                    <td>{ele_detail.end_plant}</td>
                                                    {addComma(ele_detail.deliver_value * 1) == 0 ?
                                                        <td style={{ color: "red" }}><b>{addComma(ele_detail.deliver_value * 1)}</b></td>
                                                        :
                                                        <td><b>{addComma(ele_detail.deliver_value * 1)}</b></td>
                                                    }

                                                    <td>{addComma(ele_detail.deliver_frequency_number)}</td>

                                                    {addComma(ele_detail.deliver_value * 1) == 0 ?
                                                        <td style={{ color: "red" }}>{addComma((ele_detail.deliver_value * 1) * ele_detail.deliver_frequency_number)}</td>
                                                        :
                                                        <td>{addComma((ele_detail.deliver_value * 1) * ele_detail.deliver_frequency_number)}</td>
                                                    }

                                                </tr>
                                            )
                                        })
                                        }

                                    </table>
                                </div>
                                : null}
                            <div className="Row">
                                <div className="col-4"></div>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={Math.ceil(month_detail.length / todosPerPage)}
                                    changeCurrentPage={this.changeCurrentPage}
                                    theme="square-i"
                                />

                            </div>
                        </div>
                    </div>
                    <a href="#Top" style={{ textDecoration: "none", }}><img alt="top" src={top} className="top" /></a>


                </div>

                    break;

                case 2: return_plan =
                    <div>
                        <div className="Row">
                            <div className="col-1"></div>
                            <div className="col-10">
                                <table>
                                    <tr>
                                        <th>ชื่อวัตถุดิบ</th>
                                        {/* <th>จำนวนที่สั่งซื้อ</th>
                                        <th>วัตถุดิบขาด</th> */}
                                        <th>วางแผน</th>
                                    </tr>
                                    {this.state.name_plant.map((element, index) => {
                                        return (
                                            <tr>
                                                <td>{element}</td>
                                                {/* <td>1100</td>
                                                <td>100</td> */}
                                                <td><button onClick={() => this.comfirmPlan(element)}>วางแผน</button></td>
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
                                    วันที่ต้องการ : <input type="date" id="date" onChange={this.handleChange} />
                                    <button onClick={() => this.addPlant(this.state.selectPlant)}>ยืนยันการวางแผน</button>
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
                                <h4 style={{ textAlign: "center" }}>รายชื่อ Neo-firm ที่เลือกปลูก</h4>
                                {console.log("list fermer", this.state.check_array)}

                                <table>
                                    <tr>
                                        <th>รายชื่อ Neo-firm ที่เลือกปลูก</th>
                                        <th>ชื่อพืช</th>

                                        <th>จำนวนที่ต้องการ</th>
                                        {/* <th>ระยะเวลาที่กำหนด</th> */}
                                    </tr>
                                    {
                                        this.state.listplan.map((element, index) => {
                                            return (
                                                <tr>
                                                    <td>{element.se_name}</td>
                                                    <td>{element.plant}</td>

                                                    <td>{element.volume}</td>
                                                    {/* <td>{element.planing_farmer_volume}</td>
                                            <td>กำหนดส่งก่อน : {moment(element.planing_farmer_date).format('DD/MM/YYYY')}</td> */}
                                                </tr>
                                            )
                                        })
                                    }

                                </table>

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
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h4>จำนวนเกษตรกรในเครือเเต่ละ Neo-firm</h4>
                        <table>
                            <tr>
                                <th>ชื่อ Neo_firm</th>
                                <th>จำนวนเกษตรกรในเครือ</th>
                            </tr>
                            {this.state.volume_fermer.map((element, index) => {
                                return (
                                    <tr>
                                        <td style={{textAlign:"center"}}>{element.se_name}</td>
                                        <td style={{textAlign:"center"}}>{element.count_farmer}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <th>รวม</th>
                                <th>{this.sum_volume(this.state.volume_fermer)}</th>
                            </tr>
                        </table>
                        <div className="tab">
                            <button onClick={() => this.setState({ click: 1 })}>ดูความถี่การส่งมอบ</button>
                            <button onClick={() => this.setState({ click: 2 })}>วางแผนเพาะปลูก</button>
                            <button onClick={() => this.setState({ click: 3 })}>ติดตามการเพาะปลูก</button>
                            {this.state.click >= 2 ? <input type="text" placeholder="ค้นหา"
                                style={{ width: "20%", marginTop: "5px", marginLeft: "25px" }} /> : null}
                        </div>

                    </div>
                </div>
                {reander_plan(this.state.click)}
            </div>

        )
    }
}
export default M_Plan