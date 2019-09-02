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

function App() {
  return (
    <Router exact path="/">
      <Navbar />

      <Route exact path='/Signin' component={Signin}/>
      <Route exact path='/Signup' component={Signup}/>
      <Route exact path='/' component={Home}/>
      <Route exact path='/T_Cart' component={T_Cart}/>
      <Route exact path='/Product' component={Product}/>
      <Route exact path='/Product/:productID' component={ProductDetail}/>
      <Route exact path='/T_Buying' component={T_Buying}/>
      <Route exact path='/T_Buying/:orderID' component={BuyingDetail}/>
      <Route exact path='/User' component={User}/>
      <Route exact path='/M_Order' component={M_Order}/>
      <Route exact path='/M_Order/:orderID' component={OrderDetail}/>
      <Route exact path='/EditProduct/:productID' component={EditProduct}/>

    </Router>
  );
}

export default App;
