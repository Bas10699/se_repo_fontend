//พืชที่มีอยู่ในเครือข่ายตัวเองที่ส่งมอบได้
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token } from '../Support/Constance'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class S_Plants_in_network extends Component {
    constructor(props) {
        super(props)
        this.state = {
            plants: [],
            se_name: null,
            index_plant: 0,
            data_month:[]
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
                    console.log(result.result[0])
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

    render() {
        let plant = this.state.plants
        let index = this.state.index_plant
        console.log('555', plant[index])
        var options = {

            title: {
                text: plant[index]? plant[index].name : null
            },

            xAxis: {
                categories: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
            },

            yAxis: {
                // type: 'logarithmic',
                // minorTickInterval: 10
            },

            series: [{
                type: 'column',
                colorByPoint: true,
                data: plant[index] ? plant[index].data : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                showInLegend: false
            }]

        }
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>ผลผลิตที่ส่งมอบได้ของ {this.state.se_name}</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-2">
                        ผลผลิตที่ส่งมอบได้
                        {this.state.plants.map((element, index) => {
                            return (
                                <div style={{cursor:'pointer'}} onClick={() => this.show_chart(index)}> {index+1}. {element.name}</div>
                            )
                        })}
                    </div>
                    <div className='col-6'>
                        <HighchartsReact highcharts={Highcharts} options={options} />
                    </div>
                    <div className="col-1"></div>
                    <div className="col-1">
                        {this.state.data_month.map((element, index) => {
                            return (
                                <div style={{cursor:'pointer'}}>{index+1}. {element} </div>
                            )
                        })}
                    </div>
                    <div className="col-1"></div>
                </div>

            </div>
        )
    }
}
export default S_Plants_in_network