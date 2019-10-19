import React, { Component } from 'react';

class Checkbox extends Component {
    state = {
        isChecked: false,
        click: false,
        farmer: []
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
        this.setState(({ click }) => (
            {
                click: !click
            }
        ));
    }

  


    render() {


        return (
            <div>
                    {
                        this.props.option.map((option_element, index) => {
                            return (
                                <div>
                                    <input type="checkbox" value={option_element.name}
                                            amount={option_element.year_value}
                                            onClick={(event) => { this.onCheck(event) }} />
                                            {option_element.name}
                                        
                                    
                                            <input type="number" style={{ marginTop: "0px" }}
                                                name="quantity" min="1"
                                                id={index} placeholder="จำนวนที่ต้องการสั่งซื้อ"
                                                value={option_element.amount}
                                                onChange={this.handleChange_se} />
                                            + ราคาขนส่ง
                                    
                                    <h5 style={{marginTop:"0",marginBottom:"5px",textAlign:"right"}}>ราคารวม {option_element.amount*this.props.cost} บาท</h5>
                                </div>
                            )
                        })
                    }
                    
            </div>
        );
    }
}

// Checkbox.propTypes = {
//   label: PropTypes.string.isRequired,
//   handleCheckboxChange: PropTypes.func.isRequired,
// };

export default Checkbox;