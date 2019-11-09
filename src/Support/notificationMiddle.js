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
        socket.on('new-noti', (messageNew) => {
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
            }, 3000);
        });
    }

    to = () => {
        window.location.href = '/M_Order/gg?aa=' + this.state.messageNew
    }

    render() {
        const { noti, messageNew, step } = this.state
        let render_show
        switch (step) {
            case 1: render_show = <div className={noti ? "notiShow" : "notiHide"} style={{ cursor: 'pointer' }} onClick={() => this.to()}>
                มีคำสั่งซื้อใหม่ {messageNew} <br />
                กรุณาตรวจสอบและยืนยันคำสั่งซื้อ
                </div>
                break;
            case 2: render_show = <div className={noti ? "notiShow" : "notiHide"} style={{ cursor: 'pointer' }} onClick={() => this.to()}>
                มีคำสั่งซื้อใหม่ {messageNew} <br />
                กรุณาตรวจสอบและยืนยันคำสั่งซื้อ
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