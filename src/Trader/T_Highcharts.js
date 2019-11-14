import React, { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
class T_Highcharts extends Component {
    render() {
        let index_plant = this.state.product_plan
        let options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'กราฟแสดงผลอัตราส่วนสารอาหาร',
                style: {
                    fontSize: '20px',
                    fontFamily: 'fc_lamoonregular'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
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
                name: 'อัตราส่วน',
                style: {
                    fontSize: '20px',
                    fontFamily: 'fc_lamoonregular'
                },
                colorByPoint: true,
                data: this.props.name
            }]
        };
        return (
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        )
    }
}
export default T_Highcharts;