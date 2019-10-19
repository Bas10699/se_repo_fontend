import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Product_Research extends Component {
    render () {
        return (
            <div className="App">

                <NavLink to={"/Confirm_Product"}>
                    <button>ยืนยันการพัฒนาผลิตภัณฑ์</button>
                </NavLink>
                <NavLink to={"/Product_Info"}>
                    <button>ข้อมูลผลิตภัณฑ์</button>
                </NavLink>
                <NavLink to={"/Check_Details"}>
                    <button>ตรวจสอบรายละเอียด</button>
                </NavLink>
                <NavLink to={"/Product_History"}>
                    <button>ประวัติการพัฒนาผลิตภัณฑ์</button>
                </NavLink>

            </div>
        )
    } 
} export default Product_Research;