import React, { Component } from 'react';
import {get,post,ip} from '../Support/Service'
import { user_token } from '../Support/Constance';
import { element } from 'prop-types';
class M_Demand extends Component{
    constructor(props){
        super(props)
        this.state = {
            get_demand:[]
        }
    }
    componentWillMount(){
        this.get_demand()
    }
    get_demand = async () =>{
        try{
            await get('researcher/get_demand_trader_all',user_token).then((result)=>{
                if(result.success){
                    this.setState({
                        get_demand:result.result
                    })
                    console.log(result.result)
                }
                else{
                    alert(result.error_message)
                }
            })
        }
        catch(error){
            alert('get_demand'+error)
        }
    }
    render(){
        return(
            <div className='App'>
                <h1>ที่เหลือดูใน console</h1>
                {this.state.get_demand.map((element)=>{
                    return(
                        <div>{element.product_name}</div>
                    )
                })}

            </div>
        )
    }
}
export default M_Demand