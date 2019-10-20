//ตระกร้าสินค้า
import React, { Component } from 'react';
import { user_token, addComma, user_token_decoded } from '../Support/Constance';
import { get, post, ip } from '../Support/Service';
import moment from 'moment'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class S_Certified extends Component {
    constructor(props) {
        super(props)
        this.state = {
            get_farmer: []
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
            }

        })

        this.setState({
            get_farmer: chemical_date,
        });

    }

    render() {
        const options = {
            chart: {
                renderTo: 'container',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'ไม่ได้ใช้สารเคมี'
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
            series: [{
                name: 'Jane',
                data: [
                    { name: '1 ปี', y: 338 },
                    { name: '2 ปี', y: 299 },
                    { name: '3 ปี', y: 400 },
                    { name: 'มากกว่า 3 ปี', y: 287 }
                ]
            }]
        };
        return (
            <div className='App'>
                <div className='Row'>
                    <div className="col-1"></div>
                    <div className="col-3">
                        <h4 style={{cursor:'pointer'}} onClick={() => this.setState({get_farmer:this.state.get_origin})}>เกษตรทั้งหมด จำนวน 1347 คน</h4>
                        <h4 style={{cursor:'pointer'}} onClick={() => this.filter_chemical_date(1)}>ไม่ได้ใช้สารเคมี 1 ปี จำนวน 338 คน</h4>
                        <h4 style={{cursor:'pointer'}} onClick={() => this.filter_chemical_date(2)}>ไม่ได้ใช้สารเคมี 2 ปี จำนวน 299 คน</h4>
                        <h4 style={{cursor:'pointer'}} onClick={() => this.filter_chemical_date(3)}>ไม่ได้ใช้สารเคมี 3 ปี จำนวน 400 คน</h4>
                        <h4 style={{cursor:'pointer'}} onClick={() => this.filter_chemical_date(4)}>ไม่ได้ใช้สารเคมีมากกว่า 3 ปี จำนวน 287 คน</h4>
                        <h4 style={{cursor:'pointer'}} onClick={() => this.filter_area_storage()}>พื้นที่เพาะปลูกทีได้รับการรับรองมาตรฐาน จำนวน 0 คน</h4>
                    </div>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>

                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-2"></div>
                    <div className="col-8">
                        <h4>รายชื่อเกษตร</h4>
                        <table>
                            <tr>
                                <th>
                                    ลำดับ
                            </th>
                                <th>
                                    ชื่อ-สกุล
                        </th>
                                <th>
                                    ครั้งสุดท้ายที่ใช้สารเคมี
                            </th>
                                <th>
                                    พื้นที่เพาะปลูกทีได้รับการรับรองมาตรฐาน
                        </th>
                            </tr>



                            {this.state.get_farmer.map((element, index) => {
                                let diff = moment().utc(7).add('years', 543).diff(moment(element.chemical_date), 'year', true)
                                console.log(diff)
                                return (
                                    <tr>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            {element.last_name} {element.first_name} {element.last_name}
                                        </td>
                                        <td>
                                            {element.chemical_date} (คิดเป็น {parseInt(diff)} ปี)
                                </td>
                                        <td>
                                            {element.area_storage}
                                        </td>
                                    </tr>


                                )
                            })}
                        </table>
                    </div>
                </div>

            </div>

        )
    }
}
export default S_Certified