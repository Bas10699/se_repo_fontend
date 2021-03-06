import React, { Component } from 'react';

class Checkbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChecked: false,
            click: false,
            farmer: []
        }
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
        // console.log("Check", event.target.value)

        let check_array = this.props.check_array
        if (check_array.length === 0) {
            check_array.push(event.target.value)
        }
        else {
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
        }
        this.props.return_func(check_array)
        this.setState(({ click }) => (
            {
                click: !click
            }
        ));
    }




    render() {

        // console.log(this.props.check_array)
        return (
            <div>
                <table style={{ textAlign: "center" }}>
                    <tr>
                        <th>ลำดับ</th>
                        <th>ชื่อ - นามสกุล</th>
                        <th>พัฒนาเเล้ว</th>
                        <th>กำลังพัฒนาผลิตภัณฑ์</th>
                    </tr>

                    {
                        this.props.option.map((option_element, index) => {
                            return (
                                <tr>
                                    <td><input type="checkbox" value={option_element.user_id}
                                        id='check'
                                        onClick={(event) => { this.onCheck(event) }} />
                                        {index + 1} .</td>
                                    <td style={{ textAlign: "left" }}>{option_element.name} {option_element.last_name}</td>
                                    <td>จำนวนที่เคยพัฒนาเสร็จสิ้นไปแล้ว</td>
                                    <td>{option_element.count_pro_resear}</td>
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