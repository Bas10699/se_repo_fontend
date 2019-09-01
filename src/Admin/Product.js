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
            search_order: []
        }
    }

    componentWillMount() {
        this.get_product()
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

    render() {
        return (
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
        )
    }
}
export default Product;