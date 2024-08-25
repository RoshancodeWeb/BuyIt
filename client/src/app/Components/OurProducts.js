"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useSelector } from 'react-redux';
import { ToastContainer, toast,Zoom, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OurProduct = () => {
    const allProducts=useSelector(state=>state.products.products);
    const [ourProducts,setOurProducts]=useState([]);
    const items = Array.from({ length: 8 }, (_, i) => i);
    const userType=useSelector(state=>state.user.userType);

  
    useEffect(()=>{
        const filteredProducts=allProducts.filter(product=>product.SpecialCategory.categoryTwo=="Our Product");
        setOurProducts(filteredProducts);
    },[allProducts])
  
    const addToWishList=async (productId)=>{
      try {
          const response=await fetch(`http://localhost:8000/product/addToWishList/${productId}`,{
              credentials:'include'
          });
          const data=await response.json();
          if(data.success){
              toast.success(`${data.message}`, {
                  toastId:"success1",
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                 
                  progress: undefined,
                  theme: "light",
                  transition: Zoom,
                  });
          }else{
              toast.error(`${data.message}`, {
                  toastId:"error1",
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                
                  progress: undefined,
                  theme: "light",
                  transition: Zoom,
                  });
          }
      
      } catch (error) {
          console.log(error);
      }
     
    }
        return (
        <div className='products w-full h-[600px]  pl-10 pb-10 md:pl-2 md:justify-around lg:pl-40 lg:pr-40 lg:justify-start mt-10  whitespace-nowrap flex flex-wrap gap-5    overflow-y-scroll  '>
               {ourProducts?.map((product,index)=>{
                    return(
                        <div key={index} className='w-[230px] h-[280px]  rounded  shadow-sm shadow-slate-300  cursor-pointer'>
                        <div className='w-full h-[70%]  relative  flex items-center justify-center bg-gray-100'>
                            
                            <div className='w-fit h-fit absolute right-2 top-2 flex flex-col gap-2'>
                            {userType=="admin"?<></>:<FaRegHeart className='text-xl cursor-pointer hover:scale-110' onClick={()=>addToWishList(product?._id)}/>}
                            <GrView className='text-xl cursor-pointer'/>
                            </div>
                            <div className='w-[60%] h-[60%] '>
                                <img src={product?.productImage} alt='product' className='w-full h-full object-contain'/>
                            </div>
              
                        </div>
                        <div className='w-full h-[30%] shadow-sm flex flex-col pl-2'>
                            <p className='font-bold tracking-tighter w-full h-fit'>{product?.productName}</p>
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

const OurProducts = () => {
  return (
    <div className='w-full h-fit pl-1 mt-10 md:mt-20 pb-2'>
    <div className='w-full h-fit'>
        <div className='w-full h-fit flex items-start mt-2  gap-2'>
            <div className='w-8 h-12 rounded  bg-[#DB4444]'>
            </div>
            <p className='text-[#DB4444] font-medium  h-full my-auto tracking-tighter'>Our Products</p>
        </div>
        <div className='w-full h-fit flex items-center justify-between md:justify-between md:pt-2'>
            <div className='w-fit h-fit pt-2'>
                <p className='text-xl md:text-3xl font-bold'>Explore Our Products</p>
            </div>
        </div>
    </div>
    <OurProduct/>
    <div className='w-full h-fit flex items-center justify-center pt-10 border-b-[1px] border-slate-200 pb-10 '>
            <Link href={`/Shop/All`} className='w-fit h-fit bg-[#DB4444] px-8 py-4 text-white rounded font-semibold'>View All Products</Link>
    </div>
    
</div>
  )
}

export default OurProducts
