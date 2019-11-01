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

class M_Farmer extends Component {
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
            open1: false,
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
        this.setState({ open: false, open1: false })
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

    select_se = (event) => {
        let result = this.state.get_se
        this.setState({
            se_name: result[event.target.value].se_name,
            plants: result[event.target.value].plant,
            data_month: result[event.target.value].plant[0].data,
            index_plant: 0

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
            credits: {
                enabled: false
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

        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ marginBottom: "0", marginTop: "10px", marginLeft: "50px" }}>
                            เลือก Neo-firm
                        <select className="select" name="volum" onChange={this.select_se}>
                                {this.state.get_se.map((ele_get_se, index) => {
                                    return (
                                        <option name="volum" value={index}>
                                            {ele_get_se.se_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </h2>
                        <h3 style={{ textAlign: "center" }}>ประสิทธิภาพการปลูกพืชของเกษตรกร {this.state.se_name}</h3>
                        {/* <h4>{this.state.volume_farmer.map((element)=>{
                            return(<p>จากจำนวนเกษตรกรทั้งหมด {element.sum_farmer} คน</p>)
                        })}</h4> */}
                    </div>
                </div>

                <div className="Row">
                    



                    <div className="col-7" style={{paddingLeft:"25px"}}>
                        <h4 style={{ textAlign: "center" }} id="#go">รายชื่อเกษตรที่มีผลผลิตที่ส่งมอบได้ในเดือน </h4>
                        {this.state.data_month ?
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
            </div>

        )
    }
}
export default M_Farmer