//หน้าเเรก
import React, { Component } from 'react';
import { user_token } from '../Support/Constance';
import { ip, get } from '../Support/Service';
import { NavLink } from 'react-router-dom'
import Product_Research from '../Researcher/Product_Research'
import Product from './Product'
import S_Plants_in_network from '../SE-Sub/S_Plants_in_network'
import M_Plan from '../SE-Middle/M_Plan'


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_data: [],
            product_random:[],
            get_user:[],
            search_order: [],
            default_image: 'https://www.lamonde.com/pub/media/catalog/product/placeholder/default/Lamonde_-_Image_-_No_Product_Image_4.png'
        }
    }

    componentWillMount() {
        this.get_user()
    }

    render_page = (type_user) =>{
        let return_page
        switch (type_user) {
            case "1": return_page = <div><Product_Research /></div>
                
                break;
                case "2": return_page = <div><Product /></div>
                
                break;
                case "3": return_page = <div><S_Plants_in_network /></div>
                
                break;
                case "4": return_page = <div><M_Plan /></div>
                
                break;
                case "5": return_page = <div>5</div>
                
                break;
        
            default:
                break;
        }
        return return_page
    }
   
    get_user = async () => {
        try {
            await get('user/get_user', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_user: result.result,
                        bank_information: result.result.bank_information
                    })

                    if (result.result.type_user === "2") {
                        this.get_demand_tarder()
                    }
                    setTimeout(() => {
                        console.log("get_user", result.result)
                    }, 500)
                } else {
                    // window.location.href = "/";
                    //alert("user1"+result.error_message);
                }
            });
        } catch (error) {
            alert("get_user2" + error);
        }
    }

    render() {

        let product_data = []
        let len =  Math.floor((Math.random() * (  this.state.product_data.length-1 ) ) + 1) 
        product_data = this.state.product_data[len]

        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                    {this.state.get_user ? this.render_page(this.state.get_user.type_user) : null}
                        {product_data ?
                            <div className="HeaderArea">
                                <div className="Row">
                                    <div className="col-6" style={{ backgroundColor: "black" }}>
                                        {product_data.image ? <img alt="Product" src={ip + product_data.image} /> : <img alt="Product" src={this.state.default_image} />}
                                    </div>
                                    <div className="col-1"></div>
                                    <div className="col-5">
                                        <h2>{product_data.product_name}</h2>
                                        <h4>ราคาขายปลีก</h4>
                                        <NavLink to={"/Product/product?product_id=" + product_data.product_id}><button className="BTN_Buy">ซื้อสินค้า</button></NavLink>
                                    </div>

                                </div>
                            </div>
                            : null}
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
                                            {element.image ? <img alt="Product" src={ip + element.image} /> : <img alt="Product" src={this.state.default_image} />}
                                            <h4 style={{marginTop:"0"}}>{element.product_name}</h4>
                                            <h5 style={{margin:"0"}}>ราคาปลีก บาท</h5>
                                            <NavLink to={"/Product/product?product_id=" + element.product_id}><button>รายละเอียดเพิ่มเติม</button></NavLink>
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