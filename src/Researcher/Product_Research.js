import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ConfirmProduct from './Confirm_Product';
import Product_Info from './Product_Info';
import Check_Details from './Check_Details';
import Product_History from './Product_History';
import Create_Nutrients from './Create_Nutrients';

class Product_Research extends Component {

    render() {
        let url = this.props.location.pathname;
        console.log(this.props)

        let render_page
        switch (url) {
            case "/Product_Research/Confirm_Product": render_page = <ConfirmProduct />
                break;
            case "/Product_Research/Product_Info": render_page = <Product_Info />
                break;
            case "/Product_Research/Check_Details": render_page = <Check_Details />
                break;
            case "/Product_Research/Product_History": render_page = <Product_History />
                break;
                case "/Product_Research/Create_Nutrients": render_page = <Create_Nutrients />
                break;
            default:
                break;
        }
        return (
            <div className="App">
                <div className="tab" >

                    <NavLink to={"/Product_Research/Confirm_Product"}>
                        <button style={{width:"20%"}}>ยืนยันการพัฒนาผลิตภัณฑ์</button>
                    </NavLink>
                    <NavLink to={"/Product_Research/Product_Info"}>
                        <button style={{width:"20%"}}>ข้อมูลผลิตภัณฑ์</button>
                    </NavLink>
                    <NavLink to={"/Product_Research/Check_Details"}>
                        <button style={{width:"20%"}}>ตรวจสอบรายละเอียด</button>
                    </NavLink>
                    <NavLink to={"/Product_Research/Product_History"}>
                        <button style={{width:"20%"}}>ประวัติการพัฒนาผลิตภัณฑ์</button>
                    </NavLink>
                    <NavLink to={"/Product_Research/Create_Nutrients"}>
                        <button style={{width:"20%"}}>จัดการสารอาหาร</button>
                    </NavLink>
                    
                </div>
                {render_page}

            </div>
        )
    }
} export default Product_Research;