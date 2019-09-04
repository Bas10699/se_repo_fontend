//หน้าเเรก
import React, { Component } from 'react';
import { user_token } from '../Support/Constance';
import { ip, get } from '../Support/Service';
import { NavLink } from 'react-router-dom'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_data: [],
            search_order: [],
            default_image:'https://www.lamonde.com/pub/media/catalog/product/placeholder/default/Lamonde_-_Image_-_No_Product_Image_4.png'
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

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <div className="HeaderArea">
                            <div className="Row">
                                <div className="col-6" style={{ backgroundColor: "black" }}>
                                    <img alt="Product" />
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
                    <div className="col-1" ></div>
                    <div className="col-10">
                        {//จะเเสดงเเค่ 4 ตัวสินค้า
                            this.state.product_data.map((element, index) => {
                                for (var i = 0; index < 4; i++) {
                                    return (

                                        <div className="HeaderAreaCard">
                                            {element.image? <img alt="Product" src={ip + element.image} />:<img alt="Product" src={this.state.default_image} />}
                                            <h4>{element.product_name}</h4>
                                            <h5>ราคาปลีก บาท</h5>
                                            <NavLink to={"/EditProduct/product?product_id=" + element.product_id}><button>รายละเอียดเพิ่มเติม</button></NavLink>
                                        </div>
                                    )
                                }


                            })
                        }
                    </div>
                    <div className="col-1"> </div>
                </div>
            </div>
        );
    }
}
export default Home;