import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')
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

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev=>prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev,e.target.value])
    }
  }


  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=>prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }


  const applyFilter = () => {
    let productsCopy = products.slice();


    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy)
  }


  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high' :
        setFilterProducts(fpCopy.sort((x,y)=>(x.price - y.price)));
        break;

      case 'high-low' :
        setFilterProducts(fpCopy.sort((x,y)=>(y.price - x.price)));
        break;
      
      default:
        applyFilter();
        break;
    }
  }


  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Bộ lọc
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-s font-medium'>TẤT CẢ SẢN PHẨM</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox"  value={'quan'} onChange={toggleCategory}/> Nam
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox"  value={'ao'} onChange={toggleCategory}/> Nữ
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox"  value={'bag'} onChange={toggleCategory}/> Phụ kiện
            </p>
          </div>
        </div>


        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-s font-medium'>Loại</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>


          {categorylist?.map((category) => (
              <div>
                    <p className='flex gap-2'>
                      <input className='w-3' type="checkbox"  value={category.name} onChange={toggleSubCategory}/>{category.name}</p>
              </div>
          ))}
          </div>
        </div>
      </div>

    
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'TẤT CẢ'} text2={'SẢN PHẨM'}/>

          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sắp xếp theo: Có liên quan</option>
            <option value="low-high">Sắp xếp theo: Thấp đến Cao</option>
            <option value="high-low">Sắp xếp theo: Cao đến Thấp</option>
          </select>
        </div>

        {/*product*/}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
              filterProducts.map((item,index)=>(
                <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} bestseller={item.bestseller} status={item.status}/>
              ))
            }
        </div>
      </div>
    </div>
  )
}

export default Collection
