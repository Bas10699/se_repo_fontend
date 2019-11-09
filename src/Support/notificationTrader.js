import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import { ip } from './Service'

class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noti: false,
            messageNew: '',
            step: 0,
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
                messageNew: messageNew,
                step: 1
            })
            this.openSnackBar()
        })
        socket.on('new_confirm_payment', (messageNew) => {
            console.log('gg', messageNew)
            this.setState({
                messageNew: messageNew,
                step: 2
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
        const { noti, messageNew, step } = this.state
        let render_show
        switch (step) {
            case 1: render_show = <div className={noti ? "notiShow" : "notiHide"} style={{ cursor: 'pointer' }} onClick={() => this.to()}>
                ยืนยันการสั่งซื้อ {messageNew}<br />
                กรุณาชำระเงินตามกำหนด
                </div>
                break;
            case 2: render_show = <div className={noti ? "notiShow" : "notiHide"} style={{ cursor: 'pointer' }} onClick={() => this.to()}>
                ใบสั่งซื้อเลขที่ {messageNew}<br />
                ตรวจสอบการชำระเงินแล้ว
                </div>
                break;
            default: render_show = <div className={noti ? "notiShow" : "notiHide"} style={{ cursor: 'pointer' }} onClick={() => this.to()}>
                การแจ้งเตือน
                </div>
                break;
        }
        return render_show
        
    }
}
export default Notification