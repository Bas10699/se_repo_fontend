//รายละเอียดการซื้อสินค้า
import React, { Component } from 'react';
import queryString from 'query-string';

class S_OrderDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
           id:null
        }
    }
    
    componentWillMount() {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        console.log(params)
        this.setState({
            id: params.orderId
        })
    }

    render() {
        return (
            <div className="App" style={{textAlign:'center'}}>
                <h3>ใบสั่งซื้อเลขที่ {this.state.id}</h3>
            </div >
        )
    }
}
export default S_OrderDetail;