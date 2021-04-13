import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserAPI = (token) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    //check is token is true and return setisloggedIn(true)
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get(`https://vegonlineserver.herokuapp.com/user/info`, {
            headers: { Authorization: token },
          });

          setIsLoggedIn(true);

          //if role is admin setIsAdmin to true
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setCart(res.data.cart);
         console.log(res.data.cart);
        } catch (error) {
          alert(error.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get('/api/payment', {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get('/user/history', {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, callback, isAdmin]);

  const addToCart = async (product) => {
    //if user is not login return please login msg
    if (!isLoggedIn) return alert('Please login to continue!');

    //check product id is not same as produ in cart
    const check = cart.every((item) => {
      return item._id !== product._id;
    });
    //if check is true set to cart
    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        '/user/add_to_cart',
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      alert('This product has been added to cart!');
    }
  };
  return {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addToCart: addToCart,
    history: [history, setHistory],
    callback: [callback, setCallback],
  };
};

export default UserAPI;
