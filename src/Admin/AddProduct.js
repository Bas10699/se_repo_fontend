import React, { Component } from 'react'
import { NavLink, Prompt } from 'react-router-dom'
import { user_token, addComma } from '../Support/Constance';
import { ip, get, post } from '../Support/Service';
import { element } from 'prop-types';

class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_name: null,
            product_detail: null,
            cost: 0,
            price:[],
            amount_stock:0,
            kg:'',
            tun:'',
            amount_stock:0,
            money:0,
            volume:0,
            volum_type:null,
            default_image:null

        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    add_price = () =>{
        let price = this.state.price
        price.push({
            price:this.state.money,
            volume: this.state.volume
        })
        this.setState({
            price:price
        })
    }

    add_product = async () => {
        let obj = {
            plant_name:this.state.product_name,
            details:this.state.product_detail,
            cost:this.state.cost,
            price:this.state.price,
            amount_stock:this.state.amount_stock,
            image:this.state.default_image,


        }
        try {
            await post(obj,'neutrally/add_plant_stock',user_token).then((result)=>{
                if(result.success){
                    alert('เพิ่มสินค้าเรียบร้อย')
                    window.location.href='Product'
                }
                else{
                    alert(result.error_message)
                }
            })
        }
        catch (error) {
            alert(error)
        }
    }

    uploadpicture = (e) => {

        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) {

        } else {
            reader.readAsDataURL(file)

            reader.onloadend = () => {
                console.log("img", reader.result)
                this.setState({
                    default_image: reader.result,
                });
            }
        }

    }


    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>เพิ่มสินค้า</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-5"> 
                    <img className="IMG_Detail" src={this.state.default_image} alt="product" />
                    <input type="file" onChange={(e) => this.uploadpicture(e)} /></div>
                    <div className="col-1"></div>
                    <div className="col-6"><h4>ชื่อสินค้า</h4>
                        <input type="text" onChange={this.handleChange} style={{width:"400px"}}
                             id="product_name" />

                        <h4>รายละเอียดสินค้า</h4>
                        <textarea rows="4" cols="80" name="product_detail" id="product_detail" onChange={this.handleChange}
                            form="usrform" />


                        <h4>ราคาทุน (รับซื้อจาก SE ย่อย)</h4>
                        <h4><input type="number" style={{ width: "15%" }}
                             id="cost" min="1" onChange={this.handleChange}
                        /> บาท / กิโลกรัม</h4>

                        <h4>จำนวนสินค้าในคลัง</h4>
                        <h4><input type="number" style={{ width: "15%" }}
                             id="amount_stock" min="1" onChange={this.handleChange}
                        />  กิโลกรัม</h4>

                        <h4>ราคาขาย</h4>
                        {this.state.price.map((element)=>{
                            return(
                                <div>
                                    {element.volume} กิโลกรัม ขึ้นไป ราคา {element.price} บาท
                                </div>
                            )
                        })}
                        <h4><input type="number" style={{ width: "15%" }}
                            name="cart_product" id="money" min="1" onChange={this.handleChange}
                        /> บาท /
    
                            <input type="number" style={{ width: "15%" }}
                                name="cart_product" id="volume" min="1" onChange={this.handleChange}
                            />
                            หน่วย
                            <select style={{ width: "15%",marginRight:"0" }} onChange={this.handleChange} name="volum_type" 
                            className="select" type="select">
                                <option value="kg">กิโลกรัม</option>
                                <option value="tun">ตัน</option>
                            </select>
<button className="BTN_AddCart" onClick={()=>this.add_price()} style={{marginLeft:"20px"}}>+ ราคาขาย</button>       
                        </h4>
                 

                        
                        </div>
                    {/* <div className="col-1"></div> */}
                </div>
                <div className="Row">
                    <div className="col-8">
                    </div>
                    <button  className="BTN_Signin" onClick={()=>this.add_product()}>เพิ่มสินค้า</button>
                </div>
            </div>
        )
    }
}
export default AddProduct;