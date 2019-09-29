//พืชที่มีอยู่ในเครือข่ายตัวเองที่ส่งมอบได้
import React, { Component } from 'react'
import { get, post, ip } from '../Support/Service'
import { user_token } from '../Support/Constance'
import { async } from 'q'

class S_Plants_in_network extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    componentWillMount(){
        this.get_plant()
    }
    get_plant = async () =>{
        try{
            await get('neo_firm/get_plant_in_network',user_token).then((result)=>{
                if(result.success){
                    console.log(result.result[0])
                }
                else{
                    alert(result.error_message)
                }
            })

        }catch(error){
            alert('get_plant: '+error)
            
        }
    }
    render(){
        return(
            <div>

            </div>
        )
    }
}
export default S_Plants_in_network