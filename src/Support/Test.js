import React, { Component } from 'react'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

    }

    addprice = () => {
        this.setState({
            data: [...this.state.data, ""]
        })
        console.log("add",this.state.data)
    }

    handleChange = (e, index) => {
        this.state.data[index] = e.target.value
        this.setState({
            data: this.state.data
        })
    }

    delete = (index) => {
        this.state.data.splice(index, 1)

        console.log("show data",this.state.data)
        this.setState({
            data:this.state.data
        })
    }


    render() {



        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        Test
                        {
                            this.state.data.map((data, index) => {
                                return (
                                    <div key={index}>
                                        <input value={data} onChange={(e) => this.handleChange(e, index)} />
                                        <button onClick={() => this.delete(index)}>ลบ</button>
                                    </div>
                                )
                            })
                        }
                        <button onClick={(e) => this.addprice(e)}>เพิ่ม</button>

                    </div>
                </div>

            </div>
        )
    }

}
export default Test;