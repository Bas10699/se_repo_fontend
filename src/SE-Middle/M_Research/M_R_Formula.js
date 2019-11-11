import React,{Component} from 'react'
class M_R_Formula extends Component {
    render(){
        return(
            <div className="App">
                <div className="Row">
                    <div className="col-12">
                        <h2 style={{textAlign:"center"}}>ทำการกรองสูตรพัฒนาผลิตภัณฑ์ ชื่อผลิตภัณฑ์</h2>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <table>
                            <tr>
                                <th>ชื่อสูตร</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                            </tr>
                            <tr>
                                <th>สารอาหาร</th>
                            </tr>
                            <tr>
                                <th>วัตุดิบ</th>
                            </tr>
                            <tr>
                                <th>ราคาต้นทุน</th>
                            </tr>
                            <tr>
                                <th></th>
                            </tr>
                        </table>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        )
    }
}
export default M_R_Formula