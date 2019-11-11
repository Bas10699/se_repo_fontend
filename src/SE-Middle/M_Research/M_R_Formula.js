import React, { Component } from 'react'
import { get, post, ip } from '../../Support/Service'
import { user_token } from '../../Support/Constance'
import queryString from 'query-string';

class M_R_Formula extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_plan: []
        }
    }
    componentWillMount() {
        this.get_product_plan()
    }

    get_product_plan = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        try {
            await post(params, 'neutrally/get_product_plan', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        product_plan: result.result
                    })
                    console.log(result.result)
                }
                else {
                    alert(result.error_message)
                    window.location.href = "/M_Demand/M_R_Trace"
                }
            })
        }
        catch (error) {
            alert(error)
        }
    }

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>ทำการกรองสูตรพัฒนาผลิตภัณฑ์ ชื่อผลิตภัณฑ์</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <table>
                            <tr>
                                <th>ชื่อสูตร</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                            </tr>
                            <tr>
                                <th>สารอาหาร</th>
                            </tr>
                            <tr>
                                <th>วัตุดิบ</th>
                            </tr>
                            <tr>
                                <th>ราคาต้นทุน</th>
                            </tr>
                            <tr>
                                <th></th>
                            </tr>
                        </table>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        )
    }
}
export default M_R_Formula