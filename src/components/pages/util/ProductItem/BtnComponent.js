import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';

const BtnComponent = ({ product }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addToCart=state.userAPI.addToCart;
  return (
    <div className='row-btn'>
      {isAdmin ? (
        <>
          <Link
            className='btn'
            id='buy-now'
            to='#'
            
          >
            Edit
          </Link>
          <Link
            className='btn'
            id='details'
            to={`/delete_product/${product._id}`}
          >
            Delete
          </Link>
        </>
      ) : (
        <>
          <Link
            className='btn'
            id='buy-now'
            to='#!'
            onClick={() => addToCart(product)}
          >
            Buy Now
          </Link>
          <Link className='btn' id='details' to={`/details/${product._id}`}>
            Details
          </Link>
        </>
      )}
    </div>
  );
};

export default BtnComponent;
