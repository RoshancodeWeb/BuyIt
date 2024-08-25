"use client"
import Loading from '@/app/Components/Loading';
import useLoadData from '@/app/utils/useLoadData';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Router } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useSelector } from 'react-redux';
import { ToastContainer, toast,Zoom, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const items = Array.from({ length: 10 }, (_, i) => i);
  const params=useParams(); 
  const allProducts=useSelector(state=>state.products.products);
  const { loading,error } =allProducts?{loading:false,error:null}:useLoadData();

  const [categoryProducts,setCategoryProducts]=useState([]);
  const userType=useSelector(state=>state.user.userType);
   
  useEffect(()=>{
    console.log(allProducts);
    const {category}=params;
    if(category=="All"){
      setCategoryProducts(allProducts);
    }else{
      const filteredProducts=allProducts.filter(product=>product.Category==decodeURIComponent(category));
      setCategoryProducts(filteredProducts);
    }
    
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
  if (loading) {
    return <Loading/>; 
  }

  if (error) {
    return <div className='h-[100vh] '>Error loading data. Please try again later.</div>;
  }

    return (
      <div className='products w-full min-h-[320px]  pl-2  mt-10 flex flex-col gap-5 items-center  mb-10 md:flex-row  md:flex-wrap md:items-start md:justify-center'>
             {categoryProducts.map((product,index)=>{
                  return(
                      <div  key={index} className='w-[230px] h-[280px]  rounded  shadow-sm shadow-slate-300 inline-block mr-5 cursor-pointer'>
                      <div className='w-full h-[70%]  relative  flex items-center justify-center bg-gray-100'>
                            {product.productDiscount!==0?(<div className='w-fit h-fit  absolute top-2 left-2 text-sm text-white font-light px-3 py-1 bg-[#DB4444] rounded '>
                            -{product.realDiscount}%
                            </div>):<></>}
                          <div className='w-fit h-fit absolute right-2 top-2 flex flex-col gap-2'>
                          {userType=="admin"?<></>:<FaRegHeart className='text-xl cursor-pointer' onClick={()=>addToWishList(product._id)}/>}
                          <GrView className='text-xl cursor-pointer'/>
                          </div>
                          <div className='w-[60%] h-[60%] '>
                              <img src={product.productImage} alt='product' className='w-full h-full object-contain'/>
                          </div>
  
                      </div>
                      <div className='w-full h-[30%] shadow-sm flex flex-col pl-2'>
                          <p className='font-bold tracking-tighter w-full h-fit'>{product.productName}</p>
                          <p className='font-semibold text-[#DB4444] w-full h-fit'>{product.productPrice}$<span className="pl-2 font-normal text-lighter text-gray-400 line-through">{product.productDiscount}$</span></p>
                          <div className='w-full h-fit flex justify-between pr-2 items-center'>
                         <img src="../images/star.png" className='h-6 w-32' alt='rating' />
                         <Link href={`/Detail/${product.productName}`} className='underline text-blue-700 w-fit h-fit ' prefetch={false}>Details</Link>
                        </div>
                      </div>
  
                  </div>
                  )
             })}
      <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="light"
      
      />
      </div>
    )
  }
  

const page = ({params}) => {
  const category=decodeURIComponent(params?.category);
  return (
    <div className='w-full min-h-screen mt-[100px]'>
      <div className="w-full h-fit pt-1 text-[12px] flex items-start gap-1 md:text-sm lg:text-lg ">
        <Link className="w-fit h-fit text-[#7D8184]" href="/">
          Home /
        </Link>
        <p className="w-fit h-fit"> {category}</p>
      </div>
      <Products/>
     
    </div>
  )
}

export default page
