import React,{useState,useContext} from 'react';
import {GlobalState} from '../../../GlobalState';

const Categories = () => {
    const state=useContext(GlobalState);
    const [categories,setCategories]=state.categoriesAPI.categories;
    const [category,setCategory]=useState('');

    return (
        <div className="categories">
            <form action="">
                <label htmlFor="category" >Category</label>
                <input type="text" name="category" value={category} required/>
            </form>
            
        </div>
    )
}

export default Categories;
