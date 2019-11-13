import React, { Component } from 'react';

class Checkbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChecked: false,
            click: false,
            option: []
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
                 <table>
                            <tr>
                                <th>ชื่อสูตร</th>
                                {this.props.option.map((e_product_plan_name, index) => {
                                    return (
                                        <th>
                                            <div>
                                                {/* <label class="switch"> */}
                                                    <input type="checkbox" value={e_product_plan_name.plan_id}
                                                     onClick={(event) => { this.onCheck(event) }}
                                                    />
                                                    {/* {console.log("active",index)} */}
                                                    {/* <span class="slider round"></span>
                                                </label> */}
                                            </div>
                                            {e_product_plan_name.product_plan_name}
                                        </th>
                                    )
                                }
                                )}

                            </tr>
                            <tr>
                                <th>สารอาหาร</th>
                                {this.props.option.map((e_product_plan_name, index) => {
                                    return (
                                        <td>{e_product_plan_name.nutrient_precent.map((e_nutrient_precent) => {

                                            return (
                                                <div>{e_nutrient_precent.name}</div>
                                            )
                                        })}</td>
                                    )
                                }
                                )}

                            </tr>
                            <tr>
                                <th>วัตถุดิบ</th>
                                {this.props.option.map((e_product_plan_name, index) => {
                                    return (
                                        <td>{e_product_plan_name.plant.map((e_plant) => {
                                            return (
                                                <div>{e_plant.plant_name} {e_plant.plant_volume} {e_plant.plant_volume_type}</div>
                                            )
                                        })}</td>
                                    )
                                }
                                )}
                            </tr>
                            <tr>
                                <th>ราคาต้นทุน</th>
                            </tr>

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