import React, {useContext} from 'react';
import { GlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';
import MenuIcon from './icons/menuicon.svg';
import CloseIcon from './icons/closeicon.svg';
import CartIcon from './icons/carticon.svg';
import axios from 'axios';


const Header = () => {
  const state = useContext(GlobalState);
  ///get isLogged state from the state obj
  const [isLoggedIn] = state.userAPI.isLoggedIn;
  const [isAdmin] = state.userAPI.isAdmin;
const [cart]=state.userAPI.cart;

  const handleUserLogout= async()=>{
    await axios.get(`/user/logout`);
    localStorage.clear();
    window.location.href='/';
  }

  const RenderAdminRouter = () => {
    return (
      <>
        <li>
          <Link to='/add_product'>Add Product</Link>
        </li>
        <li>
          <Link to='/category'>Category</Link>
        </li>
      </>
    );
  };

  const RenderLoggedInRouter = () => {
    return (
      <>
        <li>
          <Link to='/history'>History</Link>
        </li>
        <li>
          <Link to='/' onClick={handleUserLogout}>Logout</Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <div className='menu'>
        <img src={MenuIcon} alt='' width='30' />
      </div>

      <div className='logo'>
        <h1>
          <Link to='/'>{isAdmin ? 'Admin' : 'VegOnline'}</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to='/'>{isAdmin ? 'Products' : 'Shop'}</Link>
        </li>

        {isAdmin && RenderAdminRouter()}
        {isLoggedIn ? (
          RenderLoggedInRouter()
        ) : (
          <>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
          <Link to='/register'>Register</Link>
        </li>
        </>
        )}
        
        <li>
          <img className='menu' src={CloseIcon} alt='' width='30' />
        </li>
      </ul>
      {isAdmin ? ' ':<div className='cart'>
        <span>{cart.length}</span>
        <Link to='/cart'>
          <img src={CartIcon} alt='' width='30' />
        </Link>
      </div>}
      
    </header>
  );
};

export default Header;
