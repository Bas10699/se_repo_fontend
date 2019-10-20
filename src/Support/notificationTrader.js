import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import { ip } from './Service'

class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noti: false,
            messageNew: ''
        }
    }
    componentDidMount() {
        this.response()
    }
    response = () => {
        const socket = socketIOClient(ip)
        socket.on('new-noti-se', (messageNew) => {
            console.log('gg', messageNew)
            this.setState({
                messageNew: messageNew
            })
            this.openSnackBar()
        })
    }
    openSnackBar = () => {
        this.setState({ noti: true }, () => {
            setTimeout(() => {
                this.setState({ noti: false });
            }, 5000);
        });
    }

    to = () => {
        window.location.href = '/T_Buying/order?order_id=' + this.state.messageNew
    }

    render() {
        const { noti, messageNew } = this.state
        return (
            <div className={noti ? "notiShow" : "notiHide"} style={{ cursor: 'pointer' }} onClick={() => this.to()}>
                ยืนยันการสั่งซื้อ {messageNew}<br />
                กรุณาชำระเงินตามกำหนด
            </div>
        )
    }
}
export default Notification