//ตระกร้าสินค้า
import React, { Component } from 'react';
import { user_token, addComma, user_token_decoded } from '../Support/Constance';
import { get, post, ip } from '../Support/Service';
import moment from 'moment'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import arrow from '../Image/up-arrow.png'
import Pagination from "../Support/Pagination";

class S_Certified extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            todosPerPage: 10,
            get_farmer: [],
            click: false,
        }
    }

    componentWillMount() {
        this.get_Cert()
    }

    get_Cert = async () => {
        try {
            await get('neo_firm/get_Certified', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_farmer: result.result,
                        get_origin: result.result
                    })
                    console.log('get_fa', result.result)
                }
                else {
                    alert(result.error_message)
                }
            })
        }
        catch (error) {

        }
    }

    filter_area_storage = () => {
        let data = this.state.get_origin
        let area_storage = []
        data.map((element, index) => {

            if (element.area_storage !== "null") {
                area_storage.push(element)
            }
        })
        this.setState({
            get_farmer: area_storage
        })
    }

    filter_chemical_date = (num) => {
        let data = this.state.get_origin
        let chemical_date = []
        data.map((element) => {

            let chemical = parseInt(moment().utc(7).add('years', 543).diff(moment(element.chemical_date), 'year', true))

            switch (num) {
                case 0:
                case 1:
                case 2:
                case 3:
                    if (num === chemical) {
                        chemical_date.push(
                            element
                        )
                    }
                    break;
                case 4:
                    if (chemical >= 4) {
                        chemical_date.push(
                            element
                        )
                    }
                    break;
                default:
                    break;
            }


        })

        this.setState({
            get_farmer: chemical_date,
        });

    }
    changeCurrentPage = numPage => {
        this.setState({ currentPage: numPage });
        //fetch a data
        //or update a query to get data
    };

    render() {
        const { get_farmer, currentPage, todosPerPage } = this.state;
        // Logic for displaying todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = get_farmer.slice(indexOfFirstTodo, indexOfLastTodo);

        const options = {
            chart: {
                renderTo: 'container',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'column'
            },
            title: {
                text: 'กราฟแสดงจำนวนเกษตรกรที่ห่างจากการใช้สารเคมี',
                style: {
                    fontSize: '24px',
                    fontFamily: 'fc_lamoonregular'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            xAxis: {
                categories: ['น้อยกว่า 1 ปี', '1 ปี', '2 ปี', '3 ปี', 'มากกว่า 3 ปี']
            },
            series: [{
                name: 'Jane',
                data: [
                    { name: 'น้อยกว่า 1 ปี', y: 28 },
                    { name: '1 ปี', y: 338 },
                    { name: '2 ปี', y: 299 },
                    { name: '3 ปี', y: 400 },
                    { name: 'มากกว่า 3 ปี', y: 287 }
                ]
            }]
        };
        return (
            <div className='App'>
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>มาตรฐานของเกษตรกร</h2>
                    </div>
                </div>
                <div className="Row">
                    <div className="col-5">
                        <HighchartsReact highcharts={Highcharts} options={options} /> 
                        <h4 style={{ cursor: 'pointer' }} onClick={() => this.setState({ get_farmer: this.state.get_origin })}>เกษตรทั้งหมด จำนวน 1347 คน</h4>
                        <h4 style={{ cursor: 'pointer' }} onClick={() => this.filter_chemical_date(0)}>ไม่ได้ใช้สารเคมีน้อยกว่า 1 ปี จำนวน 140 คน</h4>
                        <h4 style={{ cursor: 'pointer' }} onClick={() => this.filter_chemical_date(1)}>ไม่ได้ใช้สารเคมี 1 ปี จำนวน 338 คน</h4>
                        <h4 style={{ cursor: 'pointer' }} onClick={() => this.filter_chemical_date(2)}>ไม่ได้ใช้สารเคมี 2 ปี จำนวน 299 คน</h4>
                        <h4 style={{ cursor: 'pointer' }} onClick={() => this.filter_chemical_date(3)}>ไม่ได้ใช้สารเคมี 3 ปี จำนวน 400 คน</h4>
                        <h4 style={{ cursor: 'pointer' }} onClick={() => this.filter_chemical_date(4)}>ไม่ได้ใช้สารเคมีมากกว่า 3 ปี จำนวน 287 คน</h4>
                        <h4 style={{ cursor: 'pointer' }} onClick={() => this.filter_area_storage()}>พื้นที่เพาะปลูกทีได้รับการรับรองมาตรฐาน จำนวน 0 คน</h4>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-3">

                    </div>

                </div>

                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <h4 style={{ textAlign: "center" }}>รายชื่อเกษตร</h4>
                        <table>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ชื่อ-สกุล</th>
                                <th>ครั้งสุดท้ายที่ใช้สารเคมี
                                    {this.click ?
                                        <img src={arrow} alt="arrow" style={{ width: "20px", cursor: "pointer", marginLeft: "5px" }} />
                                        :
                                        <img src={arrow} alt="arrow" style={{ width: "20px", transform: "scaleY(-1)", cursor: "pointer", marginLeft: "5px" }} />
                                    }
                                </th>
                                <th>พื้นที่เพาะปลูกทีได้รับการรับรองมาตรฐาน</th>
                            </tr>

                            {currentTodos.map((element, index) => {
                                let diff = moment().utc(7).add('years', 543).diff(moment(element.chemical_date), 'year', true)
                                console.log(diff)
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{element.title} {element.first_name} {element.last_name}</td>
                                        <td>{element.chemical_date} (คิดเป็น {parseInt(diff)} ปี)</td>
                                        <td>{element.area_storage}</td>
                                    </tr>


                                )
                            })}
                        </table>
                        <div style={{ textAlign: 'center' }}>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(get_farmer.length / todosPerPage)}
                                changeCurrentPage={this.changeCurrentPage}
                                theme="square-fill"
                            />
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}
export default S_Certified