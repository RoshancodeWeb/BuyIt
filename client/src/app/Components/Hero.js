"use client"
import React, { useEffect, useState } from 'react'
import { categories } from '../utils/constants'
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaApple } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination,Autoplay  } from 'swiper/modules';
import Link from 'next/link';
import { useSelector } from 'react-redux';


export const Slide = () => {
  const allProducts=useSelector(state=>state.products.products);
  const [hproducts,setHProducts]=useState([]);
  useEffect(()=>{ 
      const heroProducts=allProducts.filter(product=>product.billBoards["categoryOne"]=="Hero Bill Board");
      setHProducts(heroProducts);
  },[allProducts])
  return (
    <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={hproducts.length>1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false, 
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination,Autoplay]}
        className="mySwiper"
      >
        {hproducts && hproducts.map((product,index)=>{
          return(
            <SwiperSlide>
            <div key={index} className='sliderelement w-full md:w-[90%] mt-2 h-[200px] md:h-[250px] lg:h-[300px] bg-black flex text-white'>
                      <div className='w-[50%] h-full flex flex-col justify-center gap-2 pl-2'>
                          <div className='w-full h-fit flex items-center gap-2'>
                            <img src='./images/apple.png' alt='logoBrand' className='h-5 md:h-10'/>
                            <p className='font-extralight text-[12px] md:text-lg pt-2 lg:text-lg'>{product.productName}</p>
                          </div>
                          <p className='text-xl md:text-3xl lg:text-4xl font-bold'>Up to {product.realDiscount}%<span>off Voucher</span></p>
                          <div className='w-full h-fit '>
                            <Link className='flex items-center' href={`/Detail/${product.productName}`} >
                              <p className='underline text-[12px] md:text-lg'>Shop Now</p>
                              <IoIosArrowRoundForward  className='text-3xl pt-1'/>
                            </Link>
                            
                          </div>
                      </div>
                      <div className='w-[50%] h-full flex items-center justify-center pl-2'>
                          <div className='w-[80%] h-[80%]'>
                            <img src={product.productImage} alt='' className='w-full h-full object-contain' />
                          </div>
                      </div>
                  </div>
          </SwiperSlide>
          )
        })}
      </Swiper>
    
  )
}




const  Hero = () => {
  
  return (
    <div className='w-full h-fit  bg-white flex flex-col md:flex-row'>
      <div className='w-full   md:w-[30%]  md:flex-col  md:pt-10 md:border-r-2 md:border-slate-200 md:pl-2 md:h-fit md:whitespace-normal md:overflow-auto  h-[60px] border-b-[1px] md:border-b-0 border-slate-200  mt-[100px] flex   whitespace-nowrap overflow-x-auto items-center'>
         {categories.map((category,index)=>{
            return(
                <Link href={`/Shop/${category.name}`} key={index} className='w-fit px-2 md:w-full h-full md:p-2 md:hover:underline  border-l-[1px] border-r-[1px] md:border-l-0 md:border-r-0 flex items-center md:items-start md:justify-start  border-slate-200 md:pl-0 md:pr-0  cursor-pointer hover:bg-slate-200'>{category.name}</Link>
            )
         })}
      </div>
      <div className='slider1 w-full md:h-fit md:w-[70%] md:mt-[100px] flex  md:pl-10 '>
         <Slide/>
         
      </div>
      
    </div>
  )
}

export default Hero
