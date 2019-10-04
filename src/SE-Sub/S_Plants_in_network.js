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
            se_name: null

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
                        plants: result.result[0].plant
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
    render() {
        var options = {

            title: {
                text: 'Chart.update'
            },

            subtitle: {
                text: 'Plain'
            },

            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },

            series: [{
                type: 'column',
                colorByPoint: true,
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
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
                        {this.state.plants.map((element) => {
                            return (
                                <div>{element.name}</div>
                            )
                        })}
                    </div>
                    <div className='col-8'>
                        <HighchartsReact highcharts={Highcharts} options={options} />
                        </div>
                    <div className="col-1"></div>
                </div>

            </div>
        )
    }
}
export default S_Plants_in_network