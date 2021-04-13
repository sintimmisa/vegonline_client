import { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryAPI = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get('https://vegonlineserver.herokuapp.com/api/category');
      setCategories(res.data);
    };
    getCategories();
  }, []);
  return{
    categories: [categories, setCategories]
  }
};

export default CategoryAPI;
