//se-sub สรุปยอดขายสินค้า

import React,{Component} from 'react'
import { get } from '../Support/Service'
import {user_token} from '../Support/Constance'

class S_Summary extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    componentWillMount(){
        this.get_static()
    }

    get_static = async () =>{
        try{
            await get('neo_firm/get_trading_statistics_farmer',user_token).then((result)=>{
                if(result.success){
                    console.log(result.result)
                }
                else{
                    alert(result.error_message)
                }
            })
        }
        catch(error){
            alert('get_static: '+error)
        }
    }

    render(){
        return(
            <div className='App'>
                <div style={{textAlign:'center'}}> รายชื่อเกษตรที่เคยสั่งซื้อ </div>
                <table>
                    
                </table>
            </div>
        )
    }
}
export default S_Summary