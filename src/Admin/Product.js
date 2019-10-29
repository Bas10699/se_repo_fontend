//เเสดงสินค้า
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { user_token } from '../Support/Constance';
import { ip, get, post } from '../Support/Service';

class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_data: [],
            search_order: [],
            grt_user: null,
            default_image: 'https://www.lamonde.com/pub/media/catalog/product/placeholder/default/Lamonde_-_Image_-_No_Product_Image_4.png'
        }
    }

    componentWillMount() {
        this.get_product()
        this.get_user()
    }

    get_user = async () => {
        try {
            await get('user/show_user', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_user: result.result
                    })
                    setTimeout(() => {
                        console.log("get user : ", result.result)
                    }, 500)
                } else {
                }
            });
        } catch (error) {
            alert("get user error : " + error);
        }
    }

    get_product = async () => {
        try {
            await get('trader/get_product', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        product_data: result.result,
                        search_order: result.result,
                    })

                    setTimeout(() => {
                        console.log("get_product", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                    alert(result.error_message)
                }
            });
        } catch (error) {
            alert("get_product error" + error);
        }
    }

    filterSearch = (event) => {
        var updatedList = this.state.product_data;
        updatedList = updatedList.filter(function (item) {
            return item.product_name.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({
            search_order: updatedList,
        });
    }

    delete = () => {
        alert("ลบสินค้า")
    }

    render_type = (type_user) => {
        let render_product
        switch (type_user) {

            case "2":
            case "1":
            case "3":
            case "5": // Trader
                render_product =
                    <div className="App">
                        <div className="Row">
                            <div className="col-8"></div>
                            <div className="col-3">
                                <input type="search" placeholder="ค้นหา" onChange={this.filterSearch} />
                            </div>
                            <div className="col-1"></div>
                        </div>

                        <div className="Row">
                            <div className="col-1"></div>
                            <div className="col-10">
                                <h2 style={{ textAlign: "center" }}>สินค้า</h2>

                                {
                                    this.state.search_order ?
                                        this.state.search_order.map((element, index) => {
                                            return (
                                                <div className="Card">
                                                    {element.image === '' ? <img alt="Product" src={this.state.default_image} /> : <img alt="Product" src={ip + element.image} />}
                                                    <h4>{element.product_name}</h4>
                                                    <NavLink to={"/Product/product?product_id=" + element.product_id}><button >รายละเอียดเพิ่มเติม</button></NavLink>
                                                </div>
                                            )
                                        })
                                        :
                                        this.state.product_data.map((element, index) => {
                                            return (
                                                <div className="Card">
                                                    {element.image === '' ? <img alt="Product" src={this.state.default_image} /> : <img alt="Product" src={ip + element.image} />}
                                                    <h4>{element.product_name}</h4>
                                                    <NavLink to={"/Product/product?product_id=" + element.product_id}><button >รายละเอียดเพิ่มเติม</button></NavLink>
                                                </div>
                                            )
                                        })
                                }

                                <div className="col-1"></div>
                            </div>
                        </div>
                    </div>
                break;

            case "4": // ผู้ใช้อื่นๆ
                render_product =
                    <div className="App">

                        <div className="Row">
                            <div className="col-1"></div>
                            <div className="col-10"><h2 style={{ textAlign: "center", marginBottom: "-20px" }}>สินค้า</h2></div>
                            <div className="col-1"></div>
                        </div>


                        <div className="Row">
                            <div className="col-2"></div>
                            <div className="col-3">
                                <input type="search" placeholder="ค้นหา" onChange={this.filterSearch} />
                            </div>
                            <div className="col-6">
                                <NavLink to={"/AddProduct"}><button className="BTN_Signin" style={{ marginTop: "55px", marginRight: "35px" }}>เพิ่มสินค้า</button></NavLink>

                            </div>
                            {/* <div className="col-1"></div> */}
                        </div>

                        <div className="Row">
                            <div className="col-1"></div>
                            <div className="col-10">


                                {
                                    this.state.search_order ?
                                        this.state.search_order.map((element, index) => {
                                            return (
                                                <div className="Card">
                                                    <div className='X' onClick={() => { this.delete() }}>ลบ</div>
                                                    {element.image === '' ? <img alt="Product" src={this.state.default_image} /> : <img alt="Product" src={ip + element.image} />}
                                                    <h4>{element.product_name}</h4>
                                                    <NavLink to={"/EditProduct/product?product_id=" + element.product_id}><button >แก้ไขสินค้า</button></NavLink>
                                                </div>
                                            )
                                        })
                                        :
                                        this.state.product_data.map((element, index) => {
                                            return (
                                                <div className="Card">
                                                    {element.image === '' ? <img alt="Product" src={this.state.default_image} /> : <img alt="Product" src={ip + element.image} />}
                                                    <h4>{element.product_name}</h4>
                                                    <NavLink to={"/EditProduct/product?product_id=" + element.product_id}><button >แก้ไขสินค้า</button></NavLink>
                                                </div>
                                            )
                                        })
                                }

                                <div className="col-1"></div>
                            </div>
                        </div>
                    </div>
                break;

            default:
                render_product = <div> เกิดข้อผิดพลาด </div>
                break;
        }
        return render_product
    }

    render() {
        return (
            <div>
                {this.state.get_user ? this.render_type(this.state.get_user.type_user) : null}
            </div>
        )
    }
}
export default Product;