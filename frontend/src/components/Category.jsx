import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";



const Category = () => {
    
  const [categorylist, setCategoryList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/category/list");
      if (response.data.success) {
        setCategoryList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);



  return (
    <div className="py-10 bg-gray-100">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Danh mục sản phẩm</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categorylist?.map((category) => (
          <div
            key={category.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};
export default Category