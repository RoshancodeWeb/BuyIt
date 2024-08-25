"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { GrView } from "react-icons/gr";
import { useSelector } from 'react-redux';



const ProductsBest = () => {
    const allProducts=useSelector(state=>state.products.products);
    const [forYouProducts,setForYouProducts]=useState([]);

    useEffect(()=>{
        const filter=allProducts.filter(product=>product.SpecialCategory.categoryOne=="Just For You");
        setForYouProducts(filter);
    },[allProducts])

      return (
        <div className='products w-full h-[320px]  pl-2  mt-10 whitespace-nowrap overflow-x-scroll  '>
               {forYouProducts.map((product,index)=>{
                    return(
                        <div key={index} className='w-[230px] h-[280px]  rounded  shadow-sm shadow-slate-300 inline-block mr-5 cursor-pointer'>
                        <div className='w-full h-[70%]  relative  flex items-center justify-center bg-gray-100'>
                            
                            <div className='w-fit h-fit absolute right-2 top-2 flex flex-col gap-2'>
                            <GrView className='text-xl cursor-pointer'/>
                            </div>
                            <div className='w-[60%] h-[60%] '>
                                <img src={product?.productImage} alt='product' className='w-full h-full object-contain'/>
                            </div>
    
                        </div>
                        <div className='w-full h-[30%] shadow-sm flex flex-col pl-2'>
                            <p className='font-bold tracking-tighter w-full h-fit'>{product?.Name}</p>
                            <p className='font-semibold text-[#DB4444] w-full h-fit'>{product?.productPrice}$</p>
                            <div className='w-full h-fit flex justify-between pr-2 items-center'>
                            <img src="./images/star.png" className='h-6 w-32' alt='rating' />
                            <Link href={`/Detail/${product?.productName}`} className='underline text-blue-700'>Details</Link>
                            </div>
                            
                        </div>
    
                    </div>
                    )
               })}
        </div>
      )
    }



const JustForYou = () => {
   
    return (
        <div className='w-full h-fit pl-1 mt-10 md:mt-20 pb-2'>
        <div className='w-full h-fit flex justify-between items-center'>
            <div className='w-fit h-fit flex items-start mt-2  gap-2'>
                <div className='w-8 h-12 rounded  bg-[#DB4444]'>
                </div>
                <p className='text-[#DB4444] text-sm lg:text-xl font-medium  h-full my-auto tracking-tighter'>Just For You</p>
            </div>
            <div className='w-fit h-fit  border-b-[1px] '>
                <Link href={`/Shop/All`} className='w-fit h-fit border-2 border-black px-5 py-2 hover:bg-slate-200 text-sm lg:text-xl'>See All</Link>
            </div>
        </div>
        <ProductsBest/>
        
        
    </div>
      
  )
}

export default JustForYou
