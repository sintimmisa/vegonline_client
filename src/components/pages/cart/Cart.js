import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import PaypalButton from './PaypalButton';

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [callback,setCallback]=state.userAPI.callback;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };
    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      'https://vegonlineserver.herokuapp.com/user/add_to_cart',
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  /**
   * Function to increment quantity
   */

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    addToCart(cart); //addtocart
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    addToCart(cart); //addtocart
  };

  const removeProduct = (id) => {
    if (window.confirm('Do you want to delete this product?')) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    //console.log(payment);
    const {paymentID, address} =payment;

    await axios.post(`/api/payment`,{cart,paymentID,address},{
      headers:{Authorization:token}
    })
    setCart([]);
     addToCart([]);
    alert(`You have successfully placed an order!.`);
    setCallback(!callback);
  };

  /**
   * If cart is empty return same
   */

  if (cart.length === 0) {
    return <h2 style={{ textAlign: 'left', fontSize: '5rem' }}>Cart Empty</h2>;
  }

  return (
    <div>
      {cart.map((product) => (
        <div className='detail cart-container' key={product._id}>
          <img src={product.images.url} alt='' />
          <div className='info-box'>
            <h2>{product.title}</h2>

            <h3>GHC {product.price * product.quantity}</h3>
            <p>{product.description}</p>
            <p>{product.content}</p>
            <div className='amount'>
              <button onClick={() => decrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}> + </button>
            </div>
            <div className='delete' onClick={() => removeProduct(product._id)}>
              X
            </div>
          </div>
        </div>
      ))}
      <div className='total'>
        <h3>Total :GHC {total}</h3>
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </div>
    </div>
  );
};

export default Cart;
