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
            grt_user: null
        }
    }

    componentWillMount() {
        this.get_product()
        this.get_user()
    }

    get_user = async () => {
        try {
            await get('show/show_user', user_token).then((result) => {
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

    render_type = (user_type) => {
        let render_product
        switch (user_type) {
            case "2": // Trader
                render_product =
                    <div className="App">
                        <div className="Row">
                            <div className="col-12">
                                <div className="HeaderArea">
                                    <div className="Row">
                                        <div className="col-6" style={{ backgroundColor: "black" }}>
                                            <img />
                                        </div>
                                        <div className="col-1"></div>
                                        <div className="col-5">
                                            <h2>ชื่อสินค้า</h2>
                                            <h4>ราคาขายปลีก</h4>
                                            <button className="BTN_Buy">ซื้อสินค้า</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                                    <img alt="Product" src={ip + 'trader/image/' + this.state.product_data.image} />
                                                    <h4>{element.product_name}</h4>
                                                    <NavLink to={"/Product/product?product_id=" + element.product_id}><button >รายละเอียดเพิ่มเติม</button></NavLink>
                                                </div>
                                            )
                                        })
                                        :
                                        this.state.product_data.map((element, index) => {
                                            return (
                                                <div className="Card">
                                                    <img alt="Product" src={ip + 'trader/image/' + this.state.product_data.image} />
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

            default: // ผู้ใช้อื่นๆ
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
                                <button className="BTN_Signin" style={{marginTop:"55px", marginRight:"35px"}}>เพิ่มสินค้า</button>
                                <button className="BTN_Signup" style={{marginTop:"55px"}}>ลบสินค้า</button>
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
                                                    <img alt="Product" src={ip + 'trader/image/' + this.state.product_data.image} />
                                                    <h4>{element.product_name}</h4>
                                                    <NavLink to={"/EditProduct/product?product_id=" + element.product_id}><button >รายละเอียดเพิ่มเติม</button></NavLink>
                                                </div>
                                            )
                                        })
                                        :
                                        this.state.product_data.map((element, index) => {
                                            return (
                                                <div className="Card">
                                                    <img alt="Product" src={ip + 'trader/image/' + this.state.product_data.image} />
                                                    <h4>{element.product_name}</h4>
                                                    <NavLink to={"/EditProduct/product?product_id=" + element.product_id}><button >รายละเอียดเพิ่มเติม</button></NavLink>
                                                </div>
                                            )
                                        })
                                }

                                <div className="col-1"></div>
                            </div>
                        </div>
                    </div>
                break;

            // default:
            //     render_product = <div> เกิดข้อผิดพลาด </div>
            //     break;
        }
        return render_product
    }

    render() {
        return (
            <div>
                {this.state.get_user ? this.render_type(this.state.get_user.user_type) : null}
            </div>
        )
    }
}
export default Product;