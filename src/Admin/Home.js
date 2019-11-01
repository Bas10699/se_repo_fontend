//หน้าเเรก
import React, { Component } from 'react';
import { user_token } from '../Support/Constance';
import { ip, get } from '../Support/Service';
import { NavLink } from 'react-router-dom'
import Product_Research from '../Researcher/Product_Research'
import Product from './Product'
import S_Plants_in_network from '../SE-Sub/S_Plants_in_network'
import M_Plan from '../SE-Middle/M_Plan'
import Defalut from './Defalut'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_data: [],
            product_random: [],
            search_order: [],
            get_user: [],
            default_image: 'https://www.lamonde.com/pub/media/catalog/product/placeholder/default/Lamonde_-_Image_-_No_Product_Image_4.png'
        }
    }

    componentWillMount() {
        this.get_user()
    }

    render_page = (type_user) => {
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

            default: return_page = <div><Defalut /></div>
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
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        {this.state.get_user ? this.render_page(this.state.get_user.type_user) :null}
                        
                    </div>
                </div>
            </div>


        );
    }
}
export default Home;