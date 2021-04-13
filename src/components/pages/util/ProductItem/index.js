import React,{useContext} from 'react';
import BtnComponent from './BtnComponent';


const ProductItem = ({product,isAdmin}) => {

    return (
        <div className='product-card'>
            {
                isAdmin && <input type='checkbox' checked={product.checked}/>
            }
            <img src={product.images.url} alt=''/>

            <div className='product-details'>
                <h2 title={product.title}>{product.title}</h2>
                <span>GHC {product.price} / Kg</span>
                <p>{product.description}</p>
            </div>
           <BtnComponent product={product}/>
            
        </div>
    )
}

export default ProductItem
