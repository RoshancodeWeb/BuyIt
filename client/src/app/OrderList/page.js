"use client"
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

import { Bounce, ToastContainer, toast,Zoom } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import Loading from "../Components/Loading";
import useSWR from "swr";

const CheckoutProduct=({product,subtotal,index,checkOutId,quantity})=>{

  
    return(
        <div key={index} className="w-full product h-[100px] md:h-[100px] flex  mt-2 bg-white shadow-sm shadow-black">
                <div className="w-1/4 h-full  flex flex-col items-start md:flex-row md:justify-start md:items-center md:gap-2 p-1">
                    <img src={product?.productImage} alt=" " className="w-[80%] h-[80%] md:w-[25%] md:h-[60%] object-contain" />
                    <p className="text-[12px] md:text-xl">{product?.productName}</p>
                </div>
                <div className="w-1/4 h-full  flex items-center justify-center">
                    <p className="text-[12px] md:text-xl">{product.productPrice}$</p>
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


const fetcher=(...args)=>fetch(...args,{credentials:"include"}).then(res=>res.json());

const page = () => {
  const [checkOutProducts,setCheckOutProducts]=useState([]);
  const [checkOutResponse,setCheckOutResponse]=useState([]);
  const userType=useSelector(state=>state.user.userType);
  const route=useRouter();
  
  
  const {data,isLoading,error,mutate}=useSWR("http://localhost:8000/owner/orderList",fetcher,{
    refreshInterval:2000
  });

  useEffect(()=>{
     console.log(data);
  },[data]);
  
  useEffect(()=>{
    if(userType!="admin" || userType==""){
        route.push("/");
    }
  },[userType]);

    useEffect(()=>{
       const loadCheckOutProducts=async()=>{
             if(data.success){
                if(data.checkOuts.length==0){
                  route.push("/Admin");
                }
                setCheckOutProducts(data.checkOuts);
                setCheckOutResponse(data.checkOuts.map((checkOut,index)=>checkOut.productReceived));
             }else{
                toast.warn(`${data.message}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
                    setTimeout(()=>{
                        route.push("/Admin")
                    },2000);
             }
          }
        if(data){
          loadCheckOutProducts();
        } 
    },[data]);

    if (isLoading) {
      return <Loading/>; // Optionally, add a spinner or loading indicator
    }

    if (error) {
      return <div className='h-[100vh] mt-[100px]'>Error loading data. Please try again later.</div>;
    }
  
    
  return (
    <div className='w-full min-h-[100vh] mt-[100px] '>
        <div className=" w-full h-fit pb-0 pl-2 text-[12px] flex items-start gap-1 md:text-sm lg:text-lg ">
        <Link className="w-fit h-fit text-[#7D8184]" href="/Admin">
          Admin /
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
              <div className="details w-full h-fit text-[12px] md:text-lg">
                 <p><span className="font-bold">Name: </span>{checkOut?.name}</p>
                 <p><span className="font-bold">Address: </span>{`${checkOut?.streetAddress},${checkOut?.cityName}`}</p>
                
                 <div className="w-full h-fit flex justify-between">
                 <p><span className="font-bold">Apartment: </span>{checkOut?.apartment}</p>
                 <p><span className="font-bold">Phone Number: </span>{checkOut?.phoneNumber}</p>
                 </div>

                 <div className="w-full h-fit flex justify-between">
                 <p><span className="font-bold">Email: </span>{checkOut?.emailAddress}</p>
                 <p><span className="font-bold">Delivery: </span>{checkOut?.typeDelivery}</p>
                 </div>


              </div>
              {checkOut.products.map((product,index)=>{
                 return (<>
                 <CheckoutProduct product={product?.productId[0]} subtotal={product?.price}  index={index} checkOutId={checkOut._id} quantity={product?.quantity}/>
                 <p className="w-fit  h-fit  font-semibold">Product Size:<span className="font-light"> {product?.size}</span></p>
                     </>)
              })}
              <div className="w-full h-fit flex justify-between pt-5 text-[12px] md:text-xl">
                   <p className="w-fit  h-fit  font-semibold">Total Amount:<span className="font-light"> {checkOut?.totalAmount}$</span></p>
                   <p className="">{checkOut?.checkOutAt}</p>
              </div>
              <div className="w-full h-fit pb-2"> 
                   <button disabled={checkOutResponse[index] === "Recieved"} className={`text-[12px]  text-white font-bold px-2 py-3 rounded  md:text-lg cursor-pointer ${checkOutResponse[index]=="Recieved"?"bg-green-400 hover:bg-green-500":"bg-red-500 hover:bg-red-700"}`} >{checkOutResponse[index]} </button>
              </div>
              </div> 
             )
          })}
             
        </div>
        
      </div>
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

export default page