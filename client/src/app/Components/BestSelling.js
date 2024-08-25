"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useSelector } from 'react-redux';
import { ToastContainer, toast,Zoom, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductsBest = () => {
    const allProducts=useSelector(state=>state.products.products);
    const [bestProducts,setBestProducts]=useState([]);
    const userType=useSelector(state=>state.user.userType);
    const items = Array.from({ length: 8 }, (_, i) => i);
  
    useEffect(()=>{
        console.log("Best Selling",allProducts);
        const filteredProducts=allProducts.filter(product=>product["soldTimes"]>=5);
        console.log("Best Selling",filteredProducts);
        setBestProducts(filteredProducts);

    },[allProducts])
    
    const addToWishList=async (productId)=>{
        try {
            const response=await fetch(`http://localhost:8000/product/addToWishList/${productId}`,{
                credentials:'include'
            });
            const data=await response.json();
            if(data.success){
                toast.success(`${data.message}`, {
                    toastId:"success2",
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable:false,
                    progress: undefined,
                    theme: "light",
                    transition: Zoom,
                    });
            }else{
                toast.error(`${data.message}`, {
                    toastId:"error2",
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable:false,
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
        <div className='products w-full h-[320px]  pl-2  mt-10 whitespace-nowrap overflow-x-scroll  '>
               {bestProducts?.map((product,index)=>{
                    return(
                        <div key={index} className='w-[230px] h-[280px]  rounded  shadow-sm shadow-slate-300 inline-block mr-5 cursor-pointer'>
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

const BestSelling = () => {
  return (
    <div className='w-full h-fit pl-1 mt-10 md:mt-20 pb-2'>
    <div className='w-full h-fit'>
        <div className='w-full h-fit flex items-start mt-2  gap-2'>
            <div className='w-8 h-12 rounded  bg-[#DB4444]'>
            </div>
            <p className='text-[#DB4444] font-medium  h-full my-auto tracking-tighter'>This Month</p>
        </div>
        <div className='w-full h-fit flex items-center justify-between md:justify-between md:pt-2'>
            <div className='w-fit h-fit pt-2'>
                <p className='text-xl md:text-3xl font-bold'>Best Selling Products</p>
            </div>
        </div>
    </div>
    <ProductsBest/>
    <div className='w-full h-fit flex items-center justify-center border-b-[1px] border-slate-200 pb-10 '>
            <Link href={`/Shop/All`} className='w-fit h-fit bg-[#DB4444] px-8 py-4 text-white rounded font-semibold'>View All Products</Link>
    </div>
    
</div>
  )
}

export default BestSelling
