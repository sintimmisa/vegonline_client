import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../util/ProductItem';
import LoadingComponent from '../util/LoadingComponent';

const Products = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [isAdmin]=state.userAPI.isAdmin;

  //console.log(products);
  return (
    <>
      <div className='products'>
        {products.map((product) => {
          return <ProductItem key={product._id} product={product} isAdmin={isAdmin} />;
        })}
      </div>
      {products.length === 0 && <LoadingComponent />}
    </>
  );
};

export default Products;
