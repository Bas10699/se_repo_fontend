//ข้อมูลผู้ใช้งาน
//1 = admin
//2 = trader
//3 = se-middle
//4 = se-sub

import React, { Component } from 'react';
import { user_token,user_token_decoded } from '../Support/Constance';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    render_type = () => {
        let render_user
        switch (user_token_decoded.user_type) {
            case "2":
                render_user = <div > ผู้ประกอบการ </div>
                break;
            case "3":
                render_user = <div > SE ย่อย </div>
                break;
            case "4":
                render_user = <div > SE กลาง  </div>
                break;
            case "5":
                render_user = <div > Admin </div>
                break;

            default:
                render_user = <div className="FontDanger"> เกิดข้อผิดพลาด </div>
                break;
        }
        return render_user
    }


}
export default User;