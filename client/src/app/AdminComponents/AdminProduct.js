"use client"
import React, { useEffect, useState } from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import Link from 'next/link';
import useLoadData from '../utils/useLoadData';
import { useSelector } from 'react-redux';
import Loading from '../Components/Loading';

const Products = ({categoryName}) => {
  const {loading,error}=useLoadData();
  let allProducts=useSelector(state=>state.products.products);
  const [categoryProducts,setCategoryProducts]=useState([]);
   
  useEffect(()=>{
   
    
    if(categoryName=="All Products"){
      setCategoryProducts(allProducts);
    }else{
  
      const filteredProducts=allProducts.filter(product=>product.Category==categoryName);
      setCategoryProducts(filteredProducts);
    }
    
  },[allProducts,categoryName])

  const deleteProduct=async(productId)=>{
     
     const response=await fetch(`http://localhost:8000/owner/deleteProduct/${productId}`,{
        method:"DELETE",
        credentials:"include"
     });
     const data=await response.json();
     console.log(data);
     if(data.success){
      allProducts=allProducts.filter(product=>product._id!=productId);
      setCategoryProducts(allProducts);
     }
    
    }
    if (loading) {
      return <Loading/>; // Optionally, add a spinner or loading indicator
    }

    if (error) {
      return <div className='h-[100vh] '>Error loading data. Please try again later.</div>;
    }
  
      return (
        <div className='products w-full min-h-fit  pl-2  mt-10 flex flex-col md:flex-row gap-3 items-center md:items-start md:justify-center flex-wrap pb-5  '>
               {categoryProducts.map((product,index)=>{
                    return(
                      
                        <div  key={index} className='w-[230px] h-[280px]  rounded  shadow-sm shadow-slate-300  mr-5 cursor-pointer'>
                        <div className='w-full h-[70%]  relative  flex items-center justify-center bg-gray-100'>
                            {product.realDiscount?<div className='w-fit h-fit  absolute top-2 left-2 text-sm text-white font-light px-3 py-1 bg-[#DB4444] rounded '>
                            -{product?.realDiscount}%
                            </div>:<></>}
                            
                            
                            <div className='w-fit h-fit  absolute top-2 right-2 text-sm  font-light px-2 py-2 bg-white rounded-full '>
                             <Link href={`/EditProduct/${product?._id}`} ><MdEdit className='text-black tex-2xl' /></Link>
                            </div>

                            <div className='w-[60%] h-[60%] '>
                                <img src={product.productImage} alt='product' className='w-full h-full object-contain'/>
                            </div>
    
                        </div>
                        <div className='w-full h-[30%] shadow-sm flex flex-col pl-2'>
                            <p className='font-bold tracking-tighter w-full h-fit'>{product?.productName}</p>
                            <p className='font-semibold text-[#DB4444] w-full h-fit'>{product?.productPrice}$<span className="pl-2 font-normal text-lighter text-gray-400 line-through">{product?.productDiscount}$</span></p>
                            <div className='w-full h-fit flex justify-between pr-2 items-center'>
                             <img src="./images/star.png" className='h-6 w-32' alt='rating' />
                             <button  className='underline text-blue-700 w-fit h-fit ' onClick={()=>deleteProduct(product?._id)}>Delete</button>
                            </div>
                            
                        </div>
    
                    </div>
                    )
               })}
        </div>
      )
    }

   

const AdminProduct = ({ categoryName,setAddProduct}) => {
  return (
    <div className='w-full min-h-screen pt-1'>
        <div className='w-full h-fit flex justify-between items-center'>
           <p className='text-sm md:text-xl font-bold lg:text-2xl'>{categoryName}</p>
           <button onClick={()=>{ localStorage.setItem("addProduct","true"); setAddProduct((localStorage.getItem("addProduct")==="true"));}} className=' text-[12px]  md:text-lg flex w-fit h-fit items-center border-[1px] border-black px-4 py-2 gap-1 hover:bg-slate-200'><IoMdAddCircleOutline/>Add New Products</button>
        </div>
        <Products categoryName={categoryName}/>
        
    </div>
  )
}

export default AdminProduct
