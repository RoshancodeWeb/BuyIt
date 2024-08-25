"use client"
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Loading from "../Components/Loading";
import useSWR from "swr";

const CheckoutProduct=({product,subtotal,index,checkOutId,quantity})=>{


    return(
        <div key={index} className="w-full product h-[70px] md:h-[100px] flex  mt-2 bg-white shadow-sm shadow-black">
                <div className="w-1/4 h-full  flex flex-col items-start md:flex-row md:justify-start md:items-center md:gap-2 p-1">
                    <img src={product?.productImage} alt=" " className="w-[80%] h-[80%] md:w-[25%] md:h-[60%] object-contain" />
                    <p className="text-[12px] md:text-xl">{product?.productName}</p>
                </div>
                <div className="w-1/4 h-full  flex items-center justify-center">
                    <p className="text-[12px] md:text-xl">{product?.productPrice}$</p>
                </div>
                <div className="w-1/4 h-full flex items-center justify-center">
                    <div className="w-[80%] h-[50%] md:w-[60%] md:h-[60%]  flexborder-[1px]">
                        <div className='w-[75%] h-full flex items-center justify-center'>
                            <p className='w-fit h-fit text-[12px] md:text-xl'>{quantity}</p>
                        </div>
                    
                    </div>
                </div>
                <div className="w-1/4 h-full  flex items-center justify-center">
                <p className='w-fit h-fit text-[12px] md:text-xl'>{subtotal}$</p>
                </div>
            
            </div>
    )
}
const fetcher=(...url)=>fetch(...url,{credentials:"include"}).then(res=>res.json());
const page = () => {
  const [checkOutProducts,setCheckOutProducts]=useState([]);
  const [checkOutResponse,setCheckOutResponse]=useState([]);

  const route=useRouter();
  const userType=useSelector(state=>state.user.userType);

  const {data,isLoading}=useSWR('http://localhost:8000/product/getCheckOuts',fetcher,{
    refreshInterval: 200
  });
  
  useEffect(()=>{
   console.log(data,isLoading);
  },[data])

  useEffect(()=>{
    if(userType=="admin"){
      route.push("/");
    }
  },[userType])
  
  const updateResponse=async (loc,checkOutId)=>{
    const response=await fetch(`http://localhost:8000/product/updateCheckoutResponse/${checkOutId}`,{
      method:"PUT",
      credentials:"include"
    })
    const data=await response.json();
   if(data.success){
    setCheckOutResponse(checkOutResponse.map((checkOutR,index)=>loc==index?"Recieved":checkOutR));
   }
  }

  const loadCheckOutProducts=async()=>{
    try {
     
      if(data.checkOuts.length==0){
        route.push("/");
      }
      setCheckOutProducts(data?.checkOuts);
      setCheckOutResponse(data?.checkOuts.map((checkOut,index)=>checkOut.productReceived));
    
    } catch (error) {
    //  setError(true);
    } 

    }
    useEffect(()=>{
       
        loadCheckOutProducts();

    },[data]);

    if (isLoading) {
      return <Loading/>; 
    }

    // if (error) {
    //   return <div className='h-[100vh] mt-[100px]'>Error loading data. Please try again later.</div>;
    // }
  
    
  return (
    <div className='w-full min-h-[100vh] mt-[100px] '>
        <div className=" w-full h-fit pb-0 pl-2 text-[12px] flex items-start gap-1 md:text-sm lg:text-lg ">
        <Link className="w-fit h-fit text-[#7D8184]" href="/">
          Home /
        </Link>
        <p className="w-fit h-fit">Ordered Items</p>
       </div> 
        <div className='cartProducts w-full h-fit '>
        <div className='w-full h-fit text-[12px] p-2 mt-5 font-bold flex justify-between items-center pr-1 md:text-xl'>
           <p className="w-1/4 flex justify-start ">Product</p>
           <p className="w-1/4 flex justify-center ">Price</p>
           <p className="w-1/4 flex justify-center ">Quantity</p>
           <p className="w-1/4 flex justify-center ">Subtotal</p>
        </div>
        <div className="all Checkouts w-full h-fit flex flex-col gap-2 mb-5">
          
          {checkOutProducts?.map((checkOut,index)=>{
             return(
              <div key={index} className='oneCheckout w-full  h-fit p-2 flex flex-col gap-2 bg-gray-200'>
              <p className="font-bold text-[12px] md:text-xl">Check Out Details</p>
              {checkOut.products.map((product,index)=>{
                 return <CheckoutProduct product={product?.productId[0]} subtotal={product?.price}  index={index} checkOutId={checkOut._id} quantity={product?.quantity}/>
              })}
              <div className="w-full h-fit flex justify-between pt-5 text-[12px] md:text-xl">
                   <p className="w-fit  h-fit  font-semibold">Total Amount:<span className="font-light"> {checkOut?.totalAmount}$</span></p>
                   <p className="">{checkOut?.checkOutAt}</p>
              </div>
              <div className="w-full h-fit pb-2"> 
                   <button disabled={checkOutResponse[index] === "Recieved"} className={`text-[12px]  text-white font-bold px-2 py-3 rounded  md:text-lg cursor-pointer ${checkOutResponse[index]=="Recieved"?"bg-green-400 hover:bg-green-500":"bg-red-500 hover:bg-red-700"}`} onClick={()=>updateResponse(index,checkOut._id)}>{checkOutResponse[index]} </button>
              </div>
              </div> 
             )
          })}
             
        </div>
        
      </div>
    </div>
   
  )
}

export default page