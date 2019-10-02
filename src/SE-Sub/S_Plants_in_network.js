//พืชที่มีอยู่ในเครือข่ายตัวเองที่ส่งมอบได้
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token } from '../Support/Constance'

class S_Plants_in_network extends Component {
    constructor(props) {
        super(props)
        this.state = {
            plants: []

        }
    }
    componentWillMount() {
        this.get_plant()
    }
    get_plant = async () => {
        try {
            await get('neo_firm/get_plant_in_network', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        plants: result.result[0].plant
                    })
                    console.log(result.result[0])
                }
                else {
                    alert(result.error_message)
                }
            })

        } catch (error) {
            alert('get_plant: ' + error)

        }
    }
    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>ผลผลิตที่ส่งมอบได้</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        {this.state.plants.map((element) => {
                            return (
                                <div>{element.name}</div>
                            )
                        })}
                    </div>
                    <div className="col-1"></div>
                </div>

            </div>
        )
    }
}
export default S_Plants_in_network