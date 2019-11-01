//ตระกร้าสินค้า
import React, { Component } from 'react';
import { user_token, addComma, user_token_decoded,sortData } from '../Support/Constance';
import { get, post, ip } from '../Support/Service';
import moment from 'moment'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import arrow from '../Image/up-arrow.png'
import Pagination from "../Support/Pagination";


class M_Default extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            todosPerPage: 15,
            get_farmer: [],
            volume_farmer:[],
            click: false,
            sumEach: [],
            sum_area_storage: [],
            name_se: [],
            index:30,
            volume_fermer:[]
        }
    }

    componentWillMount() {
        this.get_name_se_all()
        this.get_Cert_post()
        this.get_volume_fermer()
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

    get_name_se_all = async () => {
        try {
            await get('neutrally/get_name_se_all', user_token).then((result) => {
                if (result.success) {
                    this.setState({ name_se: result.result })
                    console.log('get_name_se_all', result.result)
                }
                else {
                    alert(result.error_message)
                }
            })

        } catch (error) {
            alert('get_name_se_all: ' + error)
        }
    }

    get_Cert = (e) =>{
        this.setState({
            index:e.target.value
        })
        this.get_Cert_post()
    }

    get_Cert_post = async () => {
        let index = this.state.index
        let obj = {
            user_id: index
        }
        try {
            await post(obj,'neutrally/get_Certified_farmer_se', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_farmer: result.result,
                        get_origin: result.result
                    })
                    this.sum()
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

    sum = () => {
        let farmer = this.state.get_origin
        let num0 = 0, num1 = 0, num2 = 0, num3 = 0, num4 = 0
        let area_storage = []
        farmer.map((element) => {
            let chemical = parseInt(moment().utc(7).add('years', 543).diff(moment(element.chemical_date), 'year', true))
            if (chemical === 0) {
                num0 += 1
            }
            else if (chemical === 1) {
                num1 += 1
            }
            else if (chemical === 2) {
                num2 += 1
            }
            else if (chemical === 3) {
                num3 += 1
            }
            else {
                num4 += 1
            }
            if (element.area_storage !== "null") {
                area_storage.push(element)
            }
        })
        this.setState({
            sumEach: [
                { name: 'น้อยกว่า 1 ปี', y: num0 },
                { name: '1 ปี', y: num1 },
                { name: '2 ปี', y: num2 },
                { name: '3 ปี', y: num3 },
                { name: 'มากกว่า 3 ปี', y: num4 }
            ],
            sum_area_storage: area_storage
        })
    }

    sort_date = () => {
        let data = this.state.get_farmer
        data.map((element)=>{
            element.chemical_date = moment(element.chemical_date).format('YYYYMMDD')
        })
        sortData(data,'chemical_date',this.state.click)
        data.map((element)=>{
            element.chemical_date = moment(element.chemical_date).format('DD-MM-YYYY')
        })
        this.setState({get_farmer:data})
        this.setState(({ click }) => ({ click: !click }))
    }

    filter_chemical_date = (e) => {
        let num = e.target.value
        console.log(num)
        let data = this.state.get_origin
        let chemical_date = []
        if (num === "all") {
            this.setState({
                get_farmer: this.state.get_origin,
                currentPage: 1,
            })
        }
        else {
            data.map((element) => {

                let chemical = parseInt(moment().utc(7).add('years', 543).diff(moment(element.chemical_date), 'year', true))

                switch (num) {
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                        if (num == chemical) {
                            chemical_date.push(
                                element
                            )
                        }
                        break;
                    case "4":
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
                currentPage: 1,
            });
        }

    }

    changeCurrentPage = numPage => {
        this.setState({ currentPage: numPage });
        //fetch a data
        //or update a query to get data
    };

    render() {
        let todos = []
        const { get_farmer, currentPage, todosPerPage } = this.state;
        get_farmer.map((element, index) => {
            // console.log(index+1)
            todos.push({
                num: index + 1,
                ...element
            })
        })
        // Logic for displaying todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

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
                categories: ['น้อยกว่า 1 ปี', '1 ปี', '2 ปี', '3 ปี', 'มากกว่า 3 ปี'],
                title: {
                    text: '<span style="font-size:20px;">ระยะเวลา</span>',
                    style: {
                        fontSize: '20px',
                        fontFamily: 'fc_lamoonregular'
                    }
                }
            },
            yAxis: {
                // type: 'logarithmic',
                // minorTickInterval: 10
                title: {
                    text: '<span style="font-size:20px;">จำนวน (คน)</span>',
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
                showInLegend: false,
                colorByPoint: true,
                data: this.state.sumEach

            }]
        };

        var linkStyle;
        if (this.state.hover) {
            linkStyle = { color: '#ed1212', cursor: 'pointer' }
        } else {
            linkStyle = { color: '#000' }
        }
        return (
            <div className='App'>
                 <div className="Row">
                    <div className="col-12">
                        <h2 style={{ marginBottom: "0", marginTop: "10px", marginLeft: "50px" }}>
                            เลือก Neo-firm
                        <select className="select" onChange={this.get_Cert} type="select">
                                {this.state.name_se.map((ele_get_se, index) => {
                                    return (
                                        <option value={ele_get_se.user_id}>
                                            {ele_get_se.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </h2>
                        <h3 style={{ textAlign: "center" }}>มาตรฐานเกษตกรในเครือ {this.state.name_neo}</h3>
                        {/* <h4>{this.state.volume_farmer.map((element)=>{
                            return(<p>จากจำนวนเกษตรกรทั้งหมด {element.sum_farmer} คน</p>)
                        })}</h4> */}
                    </div>
                </div>
                <div className="Row">
                    <div className="col-5">
                        <HighchartsReact highcharts={Highcharts} options={options} />
                        <h4 style={{ cursor: 'pointer', margin: "0", textAlign: "left",paddingLeft:"50px" }} onClick={() => this.filter_area_storage()}>พื้นที่เพาะปลูกทีได้รับการรับรองมาตรฐาน จำนวน 0 คน</h4>
                        <div style={{paddingLeft:"50px"}}>
                            <h4 style={{textAlign:"center"}}>จำนวนเกษตรกรในเครือข่าย</h4>
                            <table>
                                    <tr>
                                        <th>ชื่อ Neo_firm</th>
                                        <th>จำนวนเกษตรกรในเครือ</th>
                                    </tr>
                                    {this.state.volume_fermer.map((element, index) => {
                                        return (
                                            <tr>
                                                <td style={{ textAlign: "center" }}>{element.se_name}</td>
                                                <td style={{ textAlign: "center" }}>{element.count_farmer}</td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <th>รวม</th>
                                        <th>{this.sum_volume(this.state.volume_fermer)}</th>
                                    </tr>
                                </table>
                            </div>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-6">
                        {/* <h3 style={{ textAlign: "center", margin: "0" }}>เลือกการเเสดงรายชื่อเกษตรกร</h3> */}
                        <h5 style={{ textAlign: "center", margin: "0" }}>จำนวนปีที่ห่างจากการใช้สารเคมี :
                        <select name="type_user" onChange={this.filter_chemical_date}>
                                <option value="all">ทั้งหมด</option>
                                <option value="0" >น้อยกว่า 1 ปี</option>
                                <option value="1" >1 ปี</option>
                                <option value="2" >2 ปี</option>
                                <option value="3" >3 ปี</option>
                                <option value="4" >มากกว่า 3 ปี</option>
                            </select>
                        </h5>
                        {/* <h6 style={{ cursor: 'pointer',margin:"0" }} onClick={() => this.setState({ get_farmer: this.state.get_origin })}>เกษตรทั้งหมด จำนวน 1347 คน</h6>
                        <h6 style={{ cursor: 'pointer',margin:"0" }} onClick={() => this.filter_chemical_date(0)}>ไม่ได้ใช้สารเคมีน้อยกว่า 1 ปี จำนวน 140 คน</h6>
                        <h6 style={{ cursor: 'pointer',margin:"0" }} onClick={() => this.filter_chemical_date(1)}>ไม่ได้ใช้สารเคมี 1 ปี จำนวน 338 คน</h6>
                        <h6 style={{ cursor: 'pointer',margin:"0" }} onClick={() => this.filter_chemical_date(2)}>ไม่ได้ใช้สารเคมี 2 ปี จำนวน 299 คน</h6>
                        <h6 style={{ cursor: 'pointer',margin:"0" }} onClick={() => this.filter_chemical_date(3)}>ไม่ได้ใช้สารเคมี 3 ปี จำนวน 400 คน</h6>
                        <h6 style={{ cursor: 'pointer',margin:"0" }} onClick={() => this.filter_chemical_date(4)}>ไม่ได้ใช้สารเคมีมากกว่า 3 ปี จำนวน 287 คน</h6> */}


                        {/* <h4 style={{ cursor: 'pointer' }} onClick={() => this.filter_area_storage()}>พื้นที่เพาะปลูกทีได้รับการรับรองมาตรฐาน จำนวน {this.state.sum_area_storage.length} คน</h4> */}
                        {/* <h4 style={{ textAlign: "center" }}>รายชื่อเกษตร </h4> */}
                        <table>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ชื่อ-สกุล</th>
                                <th>ครั้งสุดท้ายที่ใช้สารเคมี
                                    {/* {this.click ?
                                        <img src={arrow} alt="arrow" style={{ width: "20px", cursor: "pointer", marginLeft: "5px" }} onClick={() => this.sort_date()} />
                                        :
                                        <img src={arrow} alt="arrow" style={{ width: "20px", transform: "scaleY(-1)", cursor: "pointer", marginLeft: "5px" }} onClick={() => this.sort_date()} />
                                    } */}
                                </th>
                                <th>พื้นที่เพาะปลูกทีได้รับการรับรองมาตรฐาน</th>
                            </tr>

                            {currentTodos.map((element, index) => {
                                let diff = moment().utc(7).add('years', 543).diff(moment(element.chemical_date), 'year', true)
                                // console.log(diff)
                                return (
                                    <tr>
                                        <td>{element.num}</td>
                                        <td>{element.title} {element.first_name} {element.last_name}</td>
                                        <td>{element.chemical_date} (คิดเป็น {parseInt(diff)} ปี)</td>
                                        <td>{element.area_storage !== "null" ? element.area_storage : "ไม่มี"}</td>
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


            </div >

        )
    }
}
export default M_Default