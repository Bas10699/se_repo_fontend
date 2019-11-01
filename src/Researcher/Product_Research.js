import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ConfirmProduct from './Confirm_Product';
import Product_Info from './Product_Info';
import Check_Details from './Check_Details';
import Product_History from './Product_History';

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
            default:
                break;
        }
        return (
            <div className="App">
                <div className="tab">

                    <NavLink to={"/Product_Research/Confirm_Product"}>
                        <button>ยืนยันการพัฒนาผลิตภัณฑ์</button>
                    </NavLink>
                    <NavLink to={"/Product_Research/Product_Info"}>
                        <button>ข้อมูลผลิตภัณฑ์</button>
                    </NavLink>
                    <NavLink to={"/Product_Research/Check_Details"}>
                        <button>ตรวจสอบรายละเอียด</button>
                    </NavLink>
                    <NavLink to={"/Product_Research/Product_History"}>
                        <button>ประวัติการพัฒนาผลิตภัณฑ์</button>
                    </NavLink>
                    
                </div>
                {render_page}

            </div>
        )
    }
} export default Product_Research;