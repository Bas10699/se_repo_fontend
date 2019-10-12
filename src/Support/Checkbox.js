import React, { Component } from 'react';

class Checkbox extends Component {
    state = {
        isChecked: false,
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

    onCheck = (event) => {
        console.log("Check", event.target.value)


        let check_array = this.props.check_array
        let index = check_array.findIndex((array_event) => {
            return array_event === event.target.value
        })
        console.log("index", index)

        if (index !== -1) {
            check_array.splice(index, 1)
        }
        else {
            check_array.push(event.target.value)
        }

        this.props.return_func(check_array)
    }



    render() {

        return (
            <div>
                <table>
                    <tr>
                        <th>ลำดับ</th>
                        <th>ชื่อ - นามสกุล</th>
                        <th>จำนวนผลผลิตต่อปี</th>
                        <th>เดือนที่ส่งมอบ</th>
                    </tr>
                    {
                        this.props.option.map((option_element, index) => {
                            return (
                                    <tr>
                                        <td><input type="checkbox" value={option_element.first_name+" "+option_element.last_name}
                                            onClick={(event) => { this.onCheck(event) }} /> {index+1} .
                                        </td>
                                        <td>{option_element.title_name} {option_element.first_name} {option_element.last_name}</td>
                                        <td style={{ textAlign: "center" }}><b>{option_element.plant}</b></td>
                                        <td>{option_element.year_value}</td>
                                    </tr>
                            )
                        })
                    }
                </table>
            </div>
        );
    }
}

// Checkbox.propTypes = {
//   label: PropTypes.string.isRequired,
//   handleCheckboxChange: PropTypes.func.isRequired,
// };

export default Checkbox;