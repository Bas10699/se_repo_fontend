//se-sub คำสั่งซื้อจาก se-middle
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token } from '../Support/Constance'

class S_Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order_se: [],
        }
    }
    componentWillMount() {
        this.get_order_se()
    }
    get_order_se = async () => {
        try {
            await get('neo_firm/get_order_se', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        order_se: result.result
                    })
                    console.log(result)
                }
                else {
                    alert(result.error_message)
                }
            })
        } catch (error) {
            alert('get_order_se: '+error)

        }
    }
    render() {
        return (
            <div>
                <br></br><br></br>
                {this.state.order_se.map((element, index) => {
                    return (
                        <div style={{textAlign:'center'}}>
                            <div>{index+1}</div>
                            <div>{element.order_se_id}</div>
                            <div>{element.plant_name}</div>
                            <div>{element.amount}</div>
                            <br></br>
                        </div>
                    )
                })}
            </div>

        )
    }
}
export default S_Order