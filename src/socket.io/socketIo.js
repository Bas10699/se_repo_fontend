import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import { ip } from '../Support/Service'

class SocketIo extends Component {
    constructor() {
        super()

        this.state = {
            input: '',
            num: '',
            message: [],
            endpoint: ip+'ss/ss'// เชื่อมต่อไปยัง url ของ realtime server
        }
    }

    componentDidMount = () => {
        this.response()

    }

    // เมื่อมีการส่งข้อมูลไปยัง server
    send = (message) => {
        const { endpoint, input } = this.state
        console.log(endpoint, input)
        const socket = socketIOClient(endpoint)
        socket.emit('sent-message', input)
        this.setState({ input: '' })
    }

    // รอรับข้อมูลเมื่อ server มีการ update
    response = () => {
        const { endpoint, message } = this.state
        let temp = message
        const socket = socketIOClient(endpoint)

        socket.on('broadcast', (num) => {
            console.log(num)
            this.setState({ num: num.message })
        })
        socket.on('new-message', (messageNew) => {
            temp.push(messageNew)
            this.setState({ message: temp })
        })
    }

    changeInput = (e) => {
        this.setState({ input: e.target.value })
    }

    render() {
        const { input, message } = this.state
        return (
            <div className='App' style={{paddingTop:'100px'}}>
                <div style={style}>
                    {this.state.num}
                    <input value={input} onChange={this.changeInput} />
                    <button onClick={() => this.send()}>Send</button>
                </div>
                {
                    message.map((data, i) =>
                        <div key={i} style={style} >
                            {i + 1} : {data}
                        </div>
                    )
                }
            </div>
        )
    }
}

const style = { marginTop: 20, paddingLeft: 50 }

export default SocketIo