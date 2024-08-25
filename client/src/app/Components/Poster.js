"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Poster = () => {
  const allProducts=useSelector(state=>state.products.products);
  const [categoryProduct,setCategoryProduct]=useState(null);

  useEffect(()=>{
     const filterProduct=allProducts.filter(product=>product.billBoards.categoryOne=="Hero Bill Board");
     const randomNumber=Math.floor(Math.random()*filterProduct.length);
     setCategoryProduct(filterProduct[randomNumber]);
  },[allProducts])
  return (
    <div className='w-full h-fit mt-5 mb-5 md:px-10'>
       <div className='w-full h-[200px] md:h-[300px] lg:h-[400px] bg-black text-white flex'>
            <div className='w-[50%] h-full flex flex-col justify-around pl-2'>
               <div className='w-full h-fit'>
                <p className='text-[#00FF66] text-sm pb-3 md:text-xl'>Categories</p>
                <p className='font-bold md:text-3xl lg:text-5xl'>{categoryProduct?.productName}</p>
               </div>
               <Link href={`/Detail/${categoryProduct?.productName}`}  className='w-fit h-fit bg-[#00FF66] text-sm px-4 py-3  rounded md:text-lg md:px-6'>Buy Now</Link>


            </div>
            <div style={{backgroundImage:"url(./images/elipse.png)",backgroundSize:"cover",backgroundPosition:"left" ,backgroundRepeat:"no-repeat"}} className='w-[50%] h-full  flex  items-center'>
             
                   <img src={categoryProduct?.productImage} alt='' className='w-full h-[60%] object-contain' />
               
            </div>

       </div>
    </div>
  )
}

export default Poster
