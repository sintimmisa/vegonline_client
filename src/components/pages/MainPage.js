import React,{useContext} from 'react';
import {Switch,Route} from 'react-router-dom';
import Products from './products/Products';
import ProductDetails from './products/ProductDetails';
import Login from './auth/Login';
import Register from './auth/Register';
import OrderHistory from './history/OrderHistory';
import OrderDetails from './history/OrderDetails';
import Categories from './categories/Categories';
import Cart from './cart/Cart';
import NotFound from './util/NotFound';

import {GlobalState} from '../../GlobalState';

const MainPage = () => {
    const state=useContext(GlobalState);
    const [isLoggedIn]=state.userAPI.isLoggedIn;
    const [isAdmin]=state.userAPI.isAdmin;
    return (
      <Switch>
        <Route path='/' exact component={Products} />
        <Route path='/details/:id' exact component={ProductDetails} />
        <Route path='/login' exact component={isLoggedIn ? NotFound : Login} />
        <Route
          path='/register'
          exact
          component={isLoggedIn ? NotFound : Register}
        />
        <Route
          path='/history'
          exact
          component={isLoggedIn ? OrderHistory : NotFound}
        />

        <Route
          path='/category'
          exact
          component={isLoggedIn ? Categories : NotFound}
        />
        <Route
          path='/history/:id'
          exact
          component={isLoggedIn ? OrderDetails : NotFound}
        />
        <Route path='/cart' exact component={Cart} />
        <Route path='*' exact component={NotFound} />
      </Switch>
    );
}

export default MainPage;