import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class Chart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data_series:[],
            options: {
                plotOptions: {
                  bar: {
                    horizontal: true,
                    dataLabels: {
                      position: 'top',
                    },
                  }
                },
                dataLabels: {
                  enabled: true,
                  offsetX: 50,
                  style: {
                    fontSize: '12px',
                    colors: ['#black']
                  }
                },
                stroke: {
                  show: true,
                  width: 1,
                  colors: ['#fff']
                },
    
                xaxis: {
                    categories: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ค.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
                }
              },
              series: this.props.data
        }
        
    }

    render() {
        return (
            <div className="App">
                <div id="chart">
                    <ReactApexChart
                        options={this.state.options}
                        series={this.state.series}
                        type="bar"
                        height="250px"
                        width="100%" />
                </div>
            </div>
        );
    }
}

export default Chart;