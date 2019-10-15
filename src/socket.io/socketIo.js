import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import {ip} from '../Support/Service'
import moment from 'moment'

class socketIO extends Component {
  constructor() {
    super()

    this.state = {
      input: '',
      message: [],
      endpoint: '192.168.1.7:3003/admin' // เชื่อมต่อไปยัง url ของ realtime server
    }
  }

  componentWillMount = () => {
    this.response()
  }

  // เมื่อมีการส่งข้อมูลไปยัง server
  send = (message) => {
    const { endpoint, input } = this.state
    const socket = socketIOClient(endpoint)
    socket.emit('sent-message', input)
    this.setState({ input: '' })
  }

  // รอรับข้อมูลเมื่อ server มีการ update
  response = () => {
    const { endpoint, message } = this.state
    const temp = message
    const socket = socketIOClient(endpoint)
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
          <input value={input} onChange={this.changeInput} />
          <button onClick={() => this.send()}>Send</button>
        </div>
        {
          message.map((data, i) =>
            <div key={i} style={style} >
              {data.add} : <b>{data.mes}</b> เวลา: {moment(data.time).format('HH:mm')}
            </div>
          )
        }
      </div>
    )
  }
}

const style = { marginTop: 20, paddingLeft: 50 }

export default socketIO