import React, { Component } from 'react';
import { get, post, ip } from '../Support/Service'
import { user_token, addComma } from '../Support/Constance'

class Product_Information extends Component {
    constructor(props) {
        super(props)
        this.state = {
            get_data: [],
            currentPage: 1,
            todosPerPage: 10,
            get_plant_all: [],
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
                        get_plant_all: result.result
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
    render() {

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
                {this.state.get_plant_all.map((element) => {
                    return (
                        <div>{element.name}</div>
                    )
                })}

            </div>
        )
    }
} export default Product_Information;