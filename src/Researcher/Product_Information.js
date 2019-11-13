import React, { Component } from 'react';
import { get, post, ip } from '../Support/Service'
import { user_token, addComma } from '../Support/Constance'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class Product_Information extends Component {
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
            index_plant: 0

        }
    }
    componentWillMount() {
        this.get_data()
        this.get_plant_all_mount()
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

    filterPlant = (e) => {
        var updatedList = this.state.get_plant_all_origin;
        updatedList = updatedList.filter(function (item) {
            return item.name.search(e.target.value) !== -1;
        });
        this.setState({
            get_plant_all: updatedList,
        });
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

    show_chart = (index) => {
        let plant = this.state.plants
        this.setState({
            index_plant: index,
            data_month: plant[index].data
        })
    }

    render() {

        let { plants, index_plant } = this.state
        let index = index_plant

        var options = {

            title: {
                text: plants[index] ? plants[index].name : null,
                style: {
                    fontSize: '24px',
                    fontFamily: 'fc_lamoonregular'
                }
            },
            credits: {
                enabled: false
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
                data: plants[index] ? plants[index].data : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

                {/* <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <h3 style={{ textAlign: "center" }}>ข้อมูลผลผลิต</h3>

                        <table style={{ textAlign: "center" }}>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ชื่อพืช</th>
                                <th>จำนวนที่มีอยู่</th>
                            </tr>
                            {this.state.get_data.map((element, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{element.name}</td>
                                        <td>{addComma(element.volume_all)} กิโลกรัม</td>
                                    </tr>
                                )
                            })}
                        </table>

                    </div>
                </div> */}

                <div className="Row">
                    {/* <div className="col-1"></div> */}

                    <div className="col-2" style={{ marginTop: "-8px" }}>


                        <div className='ex3'>
                            <h3 style={{ textAlign: "center" }}>รายชื่อพืช</h3>
                            <input type='text' onChange={this.filterPlant} style={{ width: "88%", marginTop: "20px", marginBottom: "15px", marginLeft: "2px" }} />
                            {this.state.get_plant_all.map((element, index) => {
                                return (

                                    <div style={{ cursor: 'pointer', marginLeft: "10px", fontSize: "22px" }}
                                        onClick={() => this.show_chart(index)} >
                                        {index + 1}. {element.name}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='col-8' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <br />
                        <HighchartsReact highcharts={Highcharts} options={options} />


                    </div>
                    <div className='col-2'>

                        <table className="s_plant" style={{ marginTop: "100px" }}>
                            <tr>
                                <th colSpan="3">จำนวนที่ส่งมอบในเเต่ละเดือน</th>
                            </tr>
                            {this.state.data_month.map((element, index) => {
                                return (
                                    <tr style={{ cursor: 'pointer' }} >
                                        <th>{this.rander_month(index + 1)}</th>
                                        <td style={{ textAlign: "right" }}>{addComma(element)}</td>
                                        <td style={{ textAlign: "center" }}>กิโลกรัม</td>
                                    </tr>
                                )
                            })}
                            <div id="Top" />
                        </table>
                    </div>
                </div>

            </div>
        )
    }
} export default Product_Information;