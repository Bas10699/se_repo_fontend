//หน้าซื้อสินค้าของ SE M กับ SE S

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import Modal from 'react-responsive-modal'
import { user_token, addComma, } from '../Support/Constance';
import { ip, get, post } from '../Support/Service';
import queryString from 'query-string';

import { Accordion, AccordionItem } from 'react-light-accordion';

class M_Product extends Component {

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>คำสั่งซื้อวัตถุดิบของหมายเลขคำสั่งซื้อ</h2></div>
                </div>
                {/* <div className="Row">
                    <div className="col-2" style={{ marginRight: "2%" }}>
                        {this.state.product_data.image ? <img className="IMG_Detail_SEM" src={ip + this.state.product_data.image} alt={this.state.product_data.product_name} /> : <img className="IMG_Detail" src={this.state.default_image} alt={this.state.product_data.product_name} />}
                    </div>
                    {console.log("product_data : ", this.state.product_data)}
                    <div className="col-6">
                        <h3>{this.state.product_data.product_name}</h3>
                        <h5>{this.state.product_data.product_status}</h5>
                        <h4>จำนวนที่มีอยู่ {addComma(this.state.product_data.amount_stock)} กิโลกรัม</h4>
                        <h4>จำนวนที่ต้องสั่งซื้อ {this.props.amount} กิโลกรัม</h4>

                        {
                            this.state.frequency.map((element, index) => {
                                return (
                                    <Accordion allowMultipleExpanded={true}>
                                        {
                                            element.se.map((element_se, index_se) => {
                                                return (
                                                    <AccordionItem title={element_se.name + " " + "(จำนวนเปอร์เซ็นที่ส่งมา xx%)"}>

                                                        <table style={{ textAlign: "center" }}>
                                                            <tr>
                                                                <th rowSpan="2">จำนวนครั้งที่ส่ง</th>
                                                                <th colSpan="12">เดือน</th>
                                                            </tr>
                                                            <tr>
                                                                {this.state.month.map((element_month) => {
                                                                    return (
                                                                        <th>{element_month} </th>
                                                                    )
                                                                })}
                                                            </tr>
                                                            {element_se.rang.map((element_rang, index_rang) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{index_rang + 1}</td>
                                                                        {element_rang.data.map((element_data) => {
                                                                            return (
                                                                                <td>{addComma(element_data)}</td>
                                                                            )
                                                                        })}
                                                                    </tr>

                                                                )
                                                            })
                                                            }

                                                            <tr>
                                                                <th>รวมทั้งหมด</th>
                                                                {this.sum_data_in_month(element_se, index_se).map((ele_sum) => {
                                                                    return (
                                                                        <th>{addComma(ele_sum)}</th>
                                                                    )
                                                                })}

                                                            </tr>
                                                        </table>
                                                    </AccordionItem>
                                                )
                                            })
                                        }
                                    </Accordion>
                                )
                            })
                        }



                    </div>
                    <div className="col-4" style={{
                        borderLeft: "2px solid black",
                        paddingRight: "15px",
                        paddingLeft: "15px",
                    }}>
                        <h3>รายการสั่งซื้อวัตถุดิบ</h3>
                        {
                            this.state.frequency.map((element, index) => {
                                return (
                                    <div>
                                        {
                                            element.se.map((element_se, index_se) => {
                                                return (
                                                    <div>
                                                        <input type="checkbox" />{element_se.name}
                                                        <div>
                                                            <input type="number" style={{ marginTop: "0px" }}
                                                                name="quantity" min="1"
                                                                id="amount" placeholder="จำนวนที่ต้องการสั่งซื้อ"
                                                                onChange={this.handleChange} /></div>
                                                        <div>
                                                            <h4 style={{ marginTop: "10px" }}>+ ราคาขนส่ง</h4>
                                                            <h4 style={{ textAlign: "right", marginTop: "-10px" }}> ราคารวม xxx บาท</h4>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <h3>รวมทั้งหมด</h3>

                                        <button className="BTN_AddCart" onClick={() => { this.onOpenModal() }}>ยืนยันการสั่งซื้อ</button>
                                    </div>
                                )
                            })
                        }

                    </div>


                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal}>
                    <div className="Row">
                        <div className="col-12">
                            <h3 style={{ textAlign: "center" }}>รายการสั่งซื้อวัตถุดิบ "ชื่อวัตถุดิบ"</h3>
                            รายชื่อ SE ที่สั่ง จำนวนที่สั่งซื้อ + ราคาขนส่ง รวมทั้งหมด
                           ราคารวมทั้งหมด
            <button className="BTN_Signin" onClick={() => { this.Comfirm() }}>ออกใบคำสั่งซื้อ</button>
                            <button className="BTN_Signup" onClick={() => { this.onCloseModal() }}>ยกเลิก</button>
                        </div>
                    </div>

                </Modal> */}
            </div>
        )
    }
}

export default M_Product;
