import React, { Component } from 'react'
import {user_token} from '../Support/Constance'
import {get,post} from '../Support/Service'

class T_Order extends Component {
    constructor(props){
        super(props)
        this.state = {
            product_name:'',
            nutrient:''
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    send_demand = async (status) =>{
        let object = {
            product_name: this.state.product_name,
            nutrient: this.state.nutrient,
            product_status:status
        }
        try{
            await post(object,'trader/add_send_demand',user_token).then((result)=>{
                if(result.success){
                    alert('เรียบร้อย')
                }
                else{
                    alert(result.error_message)
                }
            })

        }
        catch(error){
            alert('send_demand: '+error)
        }
    }

    render() {
        return (
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{ textAlign: "center" }}>ส่งความต้องการพัฒนาผลิตภัณฑ์</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div>
                            <h5>ชื่อโครงการพัฒนา <input id='product_name' onChange={this.handleChange} type="text" style={{width:"50%"}}/></h5>
                            <h5 style={{marginBottom:"0"}}>รายละเอียด</h5>
                        <textarea name="message" rows="10" id='nutrient' onChange={this.handleChange} style={{ width: "100%" }}></textarea>
                        </div>
                        <div>
                            <button className="BTN_Cencle">ยกเลิก</button>
                            <button className="BTN_Signup" style={{marginTop:"0"}} onClick={()=>this.send_demand(1)}>ส่งความต้องการพัฒนา</button>
                            <button className="BTN_Signin" style={{marginTop:"0"}} onClick={()=>this.send_demand(0)}>บันทึกเป็นฉบับร่าง</button>
                            
                        </div>

                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        )
    }
}
export default T_Order;