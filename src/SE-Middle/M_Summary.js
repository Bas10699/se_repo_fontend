//se-middle สรุปยอดการซื้อ-ขาย
import React, { Component } from 'react'
import { user_token } from '../Support/Constance';
import { get } from '../Support/Service';

class M_Summary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_data: [],
            search_product: []
        }
    }

    componentWillMount() {
        this.get_product()
    }

    get_product = async () => {
        try {
            await get('trader/get_product', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        product_data: result.result,
                        search_product: result.result
                    })

                    setTimeout(() => {
                        console.log("get_product", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                    alert(result.error_message)
                }
            });
        } catch (error) {
            alert("get_product error" + error);
        }
    }

    filterSearch = (event) => {
        var updatedList = this.state.product_data;
        updatedList = updatedList.filter(function (item) {
            return item.product_name.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({
            search_product: updatedList,
        });
    }

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>สรุปยอดการซื้อ-ขาย</h2>
                    </div>
                </div>
                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="Row">
                            <div className="col-6" style={{backgroundColor:"#ccc"}}>
                                กราฟเเท่ง ยอดขายรายเดือน
                            </div>
                            <div className="col-1"></div>
                            <div className="col-6" style={{backgroundColor:"#ccc"}}>
                                กราฟพายยอดขาย se ย่อย
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        )
    }
}
export default M_Summary;