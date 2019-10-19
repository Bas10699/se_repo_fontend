import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './Admin/Navbar'
import Home from './Admin/Home'
import T_Cart from './Trader/T_Cart';
import Product from './Admin/Product';
import T_Buying from './Trader/T_Buying';
import User from './Admin/User';
import ProductDetail from './Admin/ProductDetail';
import BuyingDetail from './Admin/BuyingDetail';
import Signin from './Admin/Signin';
import Signup from './Admin/Signup';
import M_Order from './SE-Middle/M_Order';
import OrderDetail from './Admin/OrderDetail';
import EditProduct from './Admin/Edit/EditProduct';
import Test from './Support/Test';
import M_Summary from './SE-Middle/M_Summary';
import AddProduct from './Admin/AddProduct';
import EditUser from './Admin/Edit/EditUser';
import M_Product from './SE-Middle/M_Product';
import UserAll from './Admin/UserAll';
import M_Buying from './SE-Middle/M_Buying';
import UserDetail from './Admin/UserDetail'
import S_Order from './SE-Sub/S_Order'
import S_Plants_in_network from './SE-Sub/S_Plants_in_network'
import S_skill_farmer from './SE-Sub/S_skill_farmer'
import S_OrderDetail from './SE-Sub/S_OrderDetail'
// import Researcher from './Researcher/Researcher';
// import Request from './Researcher/Request';
// import Results from './Researcher/Results';
// import Material from './Researcher/Material';
import T_Order from './Trader/T_Order';
import M_BuyingDetail from './SE-Middle/M_BuyingDetail';
import SocketIo from './socket.io/socketIo'
import M_Plan from './SE-Middle/M_Plan';

import Planting_Planning from './Researcher/Planting_Planning';
import Product_Information from './Researcher/Product_Information';
import Product_Research from './Researcher/Product_Research';

import Confirm_Product from './Researcher/Confirm_Product';
import Product_Info from './Researcher/Product_Info';
import Check_Details from './Researcher/Check_Details';
import Product_History from './Researcher/Product_History';

import Order_plan from './Support/pdfmake/Order_plan';
import Quotation from './Support/pdfmake/Quotation';

function App() {
  return (
    <Router exact path="/">
      
      <Navbar />

      <Route exact path='/Test' component={Test}/>
      <Route exact path='/UserAll' component={UserAll}/>
      <Route exact path='/Signin' component={Signin}/>
      <Route exact path='/Signup' component={Signup}/>
      <Route exact path='/' component={Home}/>
      <Route exact path='/T_Cart' component={T_Cart}/>
      <Route exact path='/T_Order' component={T_Order}/>
      <Route exact path='/Product' component={Product}/>
      <Route exact path='/Product/:productID' component={ProductDetail}/>
      <Route exact path='/T_Buying' component={T_Buying}/>
      <Route exact path='/T_Buying/:orderID' component={BuyingDetail}/>
      <Route exact path='/User' component={User}/>
      <Route exact path='/EditUser' component={EditUser}/>
      <Route exact path='/M_Product' component={M_Product}/>
      <Route exact path='/M_Order' component={M_Order}/>
      <Route exact path='/M_Order/:orderID' component={OrderDetail}/>
      <Route exact path='/EditProduct/:productID' component={EditProduct}/>
      <Route exact path='/M_Summary' component={M_Summary}/>
      <Route exact path='/AddProduct' component={AddProduct}/>
      <Route exact path='/M_Buying' component={M_Buying}/>
      {/* <Route exact path='/M_Buying/:orderID' component={M_BuyingDetail}/> */}
      <Route exact path='/user/:UserID' component={UserDetail}/>
      <Route exact path='/S_Order' component={S_Order}/>
      <Route exact path='/S_Plants_in_network' component={S_Plants_in_network}/>
      <Route exact path='/S_skill_farmer' component={S_skill_farmer}/>
      <Route exact path='/S_Order/:OrderId' component={S_OrderDetail}/>
      <Route exact path='/M_Plan' component={M_Plan}/>
      
      {/* <Route exact path='/Researcher' component={Researcher}/> */}
      {/* <Route exact path='/Request' component={Request}/> */}
      {/* <Route exact path='/Results' component={Results}/> */}
      {/* <Route exact path='/Material' component={Material}/> */}

      <Route exact path='/Planting_Planning' component={Planting_Planning}/>
      <Route exact path='/Product_Information' component={Product_Information}/>
      <Route exact path='/Product_Research' component={Product_Research}/>

      <Route exact path='/Confirm_Product' component={Confirm_Product}/>
      <Route exact path='/Product_Info' component={Product_Info}/>
      <Route exact path='/Check_Details' component={Check_Details}/>
      <Route exact path='/Product_History' component={Product_History}/>

      <Route exact path='/Order_plan' component={Order_plan}/>
      <Route exact path='/Quotation' component={Quotation}/>

    </Router>
  );
}

export default App;
