import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);

    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,5));
    },[products])


  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
            <Title text1={'CHỦ ĐỀ'} text2={' WORLDS 2024'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            For best use of the 2024 T1 Uniform Jersey, we recommend hand washing before first use. Please be sure to turn the product inside out when hand washing.            </p>

      </div>
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            latestProducts.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} bestseller={item.bestseller} status={item.status}/>
            ))
        }
    </div>

    </div>
  )
}

export default LatestCollection
