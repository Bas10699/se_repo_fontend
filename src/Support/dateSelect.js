import React, { Component } from 'react';
import moment from 'moment'
import 'moment/locale/th';
const year = moment().utc(7).add('year', 543).format('YYYY')
const day = moment().utc(7).format('DD')
const month = moment().utc(7).format('MM')
const month_t = moment().utc(7).format('MMMM')
const Month = [
    { pid: "01", lable: "มกราคม", key: "0110" },
    { pid: "02", lable: "กุมภาพันธ์", key: "0100" },
    { pid: "03", lable: "มีนาคม", key: "0110" },
    { pid: "04", lable: "เมษายน", key: "0100" },
    { pid: "05", lable: "พฤษภาคม", key: "0110" },
    { pid: "06", lable: "มิถุนายน", key: "0100" },
    { pid: "07", lable: "กรกฎาคม", key: "0110" },
    { pid: "08", lable: "สิงหาคม", key: "0110" },
    { pid: "09", lable: "กันยายน", key: "0100" },
    { pid: "10", lable: "ตุลาคม", key: "0110" },
    { pid: "11", lable: "พฤศจิกายน", key: "0100" },
    { pid: "12", lable: "ธันวาคม", key: "0110" },
]
class DateSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            day: day,
            day_array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            month: month,
            month_array: Month,
            year: year,
            year_array: []

        }
    }
    handleChangeMonth = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(e.target.value)
        setTimeout(() => {
            this.setMonthDay()
            this.props.parentCallback(this.state.year + '-' + this.state.month + '-' + this.state.day)
        });

    }

    handleChangeYear = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
        setTimeout(() => {
            this.setMonthDay()
            this.props.parentCallback(this.state.year + '-' + this.state.month + '-' + this.state.day)
        });

    }

    _oninput_day = (event, index) => {
        let Month = [
            { pid: "01", lable: "มกราคม", key: "0110" },
            { pid: "02", lable: "กุมภาพันธ์", key: "0100" },
            { pid: "03", lable: "มีนาคม", key: "0110" },
            { pid: "04", lable: "เมษายน", key: "0100" },
            { pid: "05", lable: "พฤษภาคม", key: "0110" },
            { pid: "06", lable: "มิถุนายน", key: "0100" },
            { pid: "07", lable: "กรกฎาคม", key: "0110" },
            { pid: "08", lable: "สิงหาคม", key: "0110" },
            { pid: "09", lable: "กันยายน", key: "0100" },
            { pid: "10", lable: "ตุลาคม", key: "0110" },
            { pid: "11", lable: "พฤศจิกายน", key: "0100" },
            { pid: "12", lable: "ธันวาคม", key: "0110" },
        ]

        this.setState({ day: event.target.value })
        let month_array = []
        if (parseInt(event.target.value) < 31) {
            Month.map((element, index) => {
                month_array.push(element)
            })
        }
        else if (parseInt(event.target.value) === 31) {
            Month.map((element, index) => {
                if (element.key === "0110") {
                    month_array.push(element)
                }
            })
        }
        this.setState({ month_array: month_array })
        setTimeout(() => {
            this.props.parentCallback(this.state.year + '-' + this.state.month + '-' + this.state.day)
        });

        // console.log("เดือน", month_array)
    }
    componentWillMount() {
        this.setyear()
        this.setMonthDay()
        this.props.parentCallback(this.state.year + '-' + this.state.month + '-' + this.state.day)
    }
    setyear = () => {
        let yearset = []
        for (let i = 0; i < 10; i++) {
            yearset.push(parseInt(year) + i)
        }
        this.setState({
            year_array: yearset
        })
    }
    setMonthDay = () => {
        let month = this.state.month
        // alert(month)
        Month.map((ele) => {
            if (month === "02") {
                this.setState({
                    day_array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
                })
            }
            else if (ele.pid === month && ele.key === "0100") {
                this.setState({
                    day_array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
                })
            }
            else if (ele.pid === month && ele.key === "0110") {
                this.setState({
                    day_array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
                })
            }

        })
    }
    render() {

        return (
            <div>
                {/* {console.log(this.state.day, this.state.month, this.state.year)} */}
                <select onChange={this._oninput_day}>
                    <option selected disabled hidden>{this.state.day}</option>
                    {this.state.day_array.map((ele, index) => {
                        return (
                            <option value={index + 1}>{ele}</option>
                        )

                    })}
                </select>
                <select id='month' onChange={this.handleChangeMonth}>
                    <option selected disabled hidden>{month_t}</option>
                    {this.state.month_array.map((ele) => {
                        return (
                            <option value={ele.pid}>{ele.lable}</option>
                        )

                    })}
                </select>
                <select id='year' onChange={this.handleChangeYear}>
                    <option selected disabled hidden>{this.state.year}</option>
                    {this.state.year_array.map((ele) => {
                        return (
                            <option>{ele}</option>
                        )

                    })}
                </select>
            </div>
        );
    }
}


export default DateSelect;