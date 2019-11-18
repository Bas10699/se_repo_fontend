import React, { Component } from 'react';
import { element } from 'prop-types';

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

    sum_money = (data) => {
        let money = 0
        data.map((element) => {
            let unit = 1
            if (element.plant_volume_type === 'มิลลิกรัม') {
                unit = 0.000001
            }
            else if (element.plant_volume_type === 'กรัม') {
                unit = 0.001
            }
            else {
                unit = 1
            }
            money += (element.plant_volume * unit) * element.price
        })
        return money
    }


    render() {

        // console.log(this.props.check_array)
        return (
            <div>
                <table>
                    <tr>
                        <th style={{ borderRight: "1px solid #ccc" }}>ชื่อสูตร</th>
                        {this.props.option.map((e_product_plan_name, index) => {
                            return (
                                <th style={{ borderRight: "1px solid #ccc" }}>
                                    <div>
                                        <input type="checkbox" id="checkbox" value={e_product_plan_name.plan_id}
                                            onClick={(event) => { this.onCheck(event) }}
                                        />
                                        {e_product_plan_name.product_plan_name}
                                    </div>

                                </th>
                            )
                        }
                        )}

                    </tr>
                    <tr>
                        <th style={{ borderRight: "1px solid #ccc" }}>สารอาหาร</th>
                        {this.props.option.map((e_product_plan_name, index) => {
                            return (
                                <td style={{ borderRight: "1px solid #ccc" }}>{e_product_plan_name.nutrient_precent.map((e_nutrient_precent) => {

                                    return (
                                        <div>{e_nutrient_precent.name}</div>
                                    )
                                })}</td>
                            )
                        }
                        )}

                    </tr>
                    <tr>
                        <th style={{ borderRight: "1px solid #ccc" }}>วัตถุดิบ</th>
                        {this.props.option.map((e_product_plan_name, index) => {
                            return (
                                <td style={{ borderRight: "1px solid #ccc" }}>{e_product_plan_name.plant.map((e_plant) => {
                                    return (
                                        <div>{e_plant.plant_name} {e_plant.plant_volume} {e_plant.plant_volume_type}</div>
                                    )
                                })}</td>
                            )
                        }
                        )}
                    </tr>
                    <tr>
                        <th style={{ borderRight: "1px solid #ccc" }}>ราคาต้นทุน</th>
                        {this.props.option.map((e_product_plan_name, index) => {
                            return (
                                <td style={{ borderRight: "1px solid #ccc" }}>{e_product_plan_name.price.map((e_plant) => {
                                    let unit = 1
                                    if (e_plant.plant_volume_type === 'มิลลิกรัม') {
                                        unit = 0.000001
                                    }
                                    else if (e_plant.plant_volume_type === 'กรัม') {
                                        unit = 0.001
                                    }
                                    else {
                                        unit = 1
                                    }
                                    return (
                                        <div>{e_plant.plant_name} {e_plant.plant_volume} {e_plant.plant_volume_type} {(e_plant.plant_volume * unit) * e_plant.price} บาท

                                        </div>
                                    )
                                })}
                                    <br /><b>รวม {this.sum_money(e_product_plan_name.price)} บาท</b>
                                </td>
                            )
                        }
                        )}
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