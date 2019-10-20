import React, { Component } from 'react';
import { get, post, ip } from '../Support/Service'
import { user_token } from '../Support/Constance';
import { element } from 'prop-types';
import { NavLink } from 'react-router-dom';
import M_R_Order from './M_Research/M_R_Order';
import M_R_Trace from './M_Research/M_R_Trace';

class M_Demand extends Component {

    render() {
        let url = this.props.location.pathname;
        console.log(this.props)

        let render_page
        switch (url) {
            case "/M_Demand": render_page = <M_R_Order />
                break;
            case "/M_Demand/M_R_Trace": render_page = <M_R_Trace />
                break;
            default:
                break;
        }
        return (
            <div className='App'>
                 <div className="tab">
                    <NavLink to={"/M_Demand"}>
                        <button>เรียกดูคำสั่งแปรรูปผลิตภัณฑ์</button>
                    </NavLink>
                    <NavLink to={"/M_Demand/M_R_Trace"}>
                        <button>ติดตามผลการแปรรูป</button>
                    </NavLink>
                </div>
                {render_page}

            </div>


        )
    }
}
export default M_Demand