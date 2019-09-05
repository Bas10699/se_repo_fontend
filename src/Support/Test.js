import React, { Component } from "react";

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            tasks: []
        };
    }

    addTask = () => {
        this.state.input &&
            this.setState(({ tasks, input: value }) => ({
                tasks: [...tasks, { value, key: new Date().getTime() }],
                input: ""
            }));
        console.log("addTask", this.state.tasks);
    };

    setValue = ({ target: { value: input } }) => {
        this.setState({
            input
        });
    };

    delete = index => {
        this.state.tasks.splice(index, 1);

        console.log("show data", this.state.data);
        this.setState({
            tasks: this.state.tasks
        });
    };

    render() {

        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        Test
            <div>
                            {this.state.tasks.map((task, index) => (
                                <div key={task.key}>
                                    {task.value}
                                    <button onClick={() => this.delete(index)}>ลบ</button>
                                </div>
                            ))}

                            <input onChange={this.setValue} value={this.state.input} />
                            {console.log("value", this.state.input)}
                            <button onClick={this.addTask}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Test;
