//รายละเอียดการซื้อสินค้า
import React, { Component } from 'react';
import queryString from 'query-string';
import { get, post, ip } from '../Support/Service'
import { user_token } from '../Support/Constance'
import Timeline from './Timeline'

class S_OrderDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            order:''
        }
    }

    componentWillMount() {
        this.get_order()
    }

    get_order = async () => {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        let obj = {
            order_id: params.orderId
        }
        
        try {
            await post(obj,'neo_firm/get_detail_order_se',user_token).then((result)=>{
                if(result.success){
                    this.setState({
                        order:result.result
                    })
                    console.log(result.result)
                }
                else{
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert('get_order: '+error)
        }
    }

    render_Step = (status) => {
        let render_Show
        switch (status) {
            case 0: render_Show = 'คำสั่งซื้อ'
                break;
            case 1: render_Show = 'ยืนยันคำสั่งซื้อ'
                break;
            case 2: render_Show = 'ชำระเงินเเล้ว'
                break;
            case 3: render_Show = 'สินค้าทำการจัดส่ง'
                break;
            case 4: render_Show = 'ตรวจสอบสินค้า'
                break;

            default:
                break;
        }
        return render_Show
    }


    render() {
        return (
            <div className="App" style={{ textAlign: 'center' }}>
                <h3>ใบสั่งซื้อเลขที่ {this.state.order.order_se_id}</h3>
                
                <Timeline status={this.state.order.order_se_status} /><div>
                {this.state.order.plant_name} จำนวน {this.state.order.amount} กิโลกรัม สถานะ {this.render_Step(this.state.order.order_se_status)}</div>
            </div >
        )
    }
}
export default S_OrderDetail;