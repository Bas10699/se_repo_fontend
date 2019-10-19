//พืชที่มีอยู่ในเครือข่ายตัวเองที่ส่งมอบได้
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token, addComma } from '../Support/Constance'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import top from '../Image/top.png'
import Pagination from "../Support/Pagination";

Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});

class S_Plants_in_network extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            todosPerPage: 10,
            plants: [],
            se_name: null,
            index_plant: 0,
            data_month: [],
            month_detail: []
        }
    }
    componentWillMount() {
        this.get_plant()
    }
    get_plant = async () => {
        try {
            await get('neo_firm/get_plant_in_network', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        se_name: result.result[0].se_name,
                        plants: result.result[0].plant,
                        data_month: result.result[0].plant[0].data

                    })
                    console.log('get_plant', result.result[0])
                }
                else {
                    alert(result.error_message)
                }
            })

        } catch (error) {
            alert('get_plant: ' + error)

        }
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
        return (
            <div className="App">

                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>ผลผลิตที่ส่งมอบได้ในเครือ {this.state.se_name}</h2>
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
        )
    }
}
export default S_Plants_in_network