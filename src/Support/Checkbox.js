import React, { Component } from 'react';
import Pagination from "../Support/Pagination";

class Checkbox extends Component {
    state = {
        currentPage: 1,
        todosPerPage: 10,
        isChecked: false,
        click: false,
        amount:0,
        farmer: [],
        result:[],
        aa:[]
    }

    toggleCheckboxChange = () => {
        const { handleCheckboxChange, label } = this.props;

        this.setState(({ isChecked }) => (
            {
                isChecked: !isChecked,
            }
        ));

        handleCheckboxChange(label);
    }

    handleChange = (e) =>{
        console.log(e.target.name)
        let aa = this.state.aa
        let result = this.state.result
        console.log(result)
        result.map((element,index)=>{
            if(element.check === e.target.name){
                result[index].amount = parseInt(e.target.value)
            }
        })
        console.log(result)
        // this.setState({
            
        //     amount:e.target.value
        // })
        this.props.return_func(result)
    }

    onCheck = (event) => {
        console.log("Check", event.target.value)


        let check_array = this.props.check_array
        let index = check_array.findIndex((array_event) => {
            return array_event.check === event.target.value

        })
        console.log("index", index)

        if (index !== -1) {
            check_array.splice(index, 1)
        }
        else {
            check_array.push({
                [event.target.id]:event.target.value,
                amount:0
            })
            this.setState({
                result: check_array
            })
        }

        this.setState(({ click }) => (
            {
                click: !click
            }
        ));
    }

    changeCurrentPage = numPage => {
        this.setState({ currentPage: numPage });
        //fetch a data
        //or update a query to get data
    };

    render() {
        let todos = []
        const { currentPage, todosPerPage } = this.state;
        this.props.option.map((element, index) => {
            todos.push({
                num: index + 1,
                ...element
            })
        })

        // Logic for displaying todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

        return (
            <div>
                <table>
                    <tr>
                        <th>ลำดับ </th>
                        <th>ชื่อ - นามสกุล</th>
                        <th>จำนวนผลผลิตต่อปี</th>
                        <th>เดือนที่ส่งมอบ</th>
                        <th>จำนวนที่สั่ง</th>
                    </tr>
                    {
                        currentTodos.map((option_element, index) => {
                            return (
                                <tr>
                                    <td><input type="checkbox" value={index} id='check'
                                        amount={true}
                                        onClick={(event) => { this.onCheck(event) }} /> {index + 1} .
                                        </td>
                                    <td>{option_element.title_name} {option_element.first_name} {option_element.last_name}</td>

                                    <td>{option_element.year_value}</td>
                                    <td>{option_element.end_plant}</td>
                                    <td>
                                        <input id='amount' name={index} onChange={this.handleChange} />
                                         กิโลกรัม
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
                <div style={{ textAlign: 'center' }}>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(todos.length / todosPerPage)}
                        changeCurrentPage={this.changeCurrentPage}
                        theme="square-fill"
                    />

                </div>
            </div>
        );
    }
}

// Checkbox.propTypes = {
//   label: PropTypes.string.isRequired,
//   handleCheckboxChange: PropTypes.func.isRequired,
// };

export default Checkbox;