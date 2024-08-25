"use client"
import Loading from '@/app/Components/Loading';
import useLoadData from '@/app/utils/useLoadData';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Bounce, ToastContainer, toast,Zoom } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const page = () => {
    const param=useParams();
    const [sizeValue,setSizeValue] = useState("");
    const productName=decodeURIComponent(param?.product);
    const [product,setProduct]=useState([]);
    const route=useRouter();
    const userType=useSelector(state=>state.user.userType);
    const allProducts=useSelector(state=>state.products.products);
    const { loading,error } =allProducts?{loading:false,error:null}:useLoadData();

    
      if (loading) {
        return <Loading />;
      }
    
    useEffect(()=>{
        const foundProduct=allProducts.filter(product=>product.productName==productName);
             
        setProduct(foundProduct[0]);
        console.log(foundProduct[0]);
    },[allProducts]);

    const addToCart=async (product,size)=>{
            if(userType=="admin"){
                toast.warning(`Admin Cannot Add Product To Cart`, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Zoom,
                    });
                    setTimeout(()=>{
                        route.push("/");
                    },2000)
            }else{
                if(product.quantity==0){
                    toast.error(`Product Out of Stock`, {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Zoom,
                        });
                }else{
                    const requiredData={productId:product._id,quantity:1,price:product.productPrice,size:size};
                    const response=await fetch('http://localhost:8000/product/addToCart',{
                        method:"POST",
                        headers:{
                          "Content-Type":"application/json"
                        },
                        body:JSON.stringify(requiredData),
                        credentials:'include'
                    })
                    const data=await response.json();
                    if(data.success){
                        toast.success(`Added To Cart`, {
                            position: "top-right",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Zoom,
                            });
                            setTimeout(()=>{
                                route.push("/Cart");
                            },1500);
                    }
                    else{
                        toast.error(`${data.message}`, {
                            position: "top-right",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Zoom,
                            });
                    }
                    
                }
            }

            
        
    }
    // if(loading){
    //     return <Loading/>
    // }
  return (
    <div className='w-full min-h-screen mt-[110px] flex flex-col '>
        <div className=" w-full h-fit pb-2 pl-2 text-[12px] flex items-start gap-1 md:text-sm lg:text-lg ">
        <Link className="w-fit h-fit text-[#7D8184]" href="/">
          Home /
        </Link>
        <p className="w-fit h-fit">{productName}</p>
       </div> 
       <div className='w-full h-fit flex flex-col md:flex-row'>
       <div className='w-full md:w-[60%]  lg:w-[55%] h-[350px]  lg:h-[585px] md:h-[380px] flex gap-2  md:pr-5'>
           <div className='w-[30%] h-full flex flex-col gap-2 pl-2'>
                 <img src={product?.productImage} alt='gaming-controller' className='w-full h-1/4 md:h-[23.5%] object-contain bg-[#F5F5F5] p-2' />
                 <img src={product?.productImage} alt='gaming-controller' className='w-full h-1/4 md:h-[23.5%] object-contain bg-[#F5F5F5] p-2' />
                 <img src={product?.productImage} alt='gaming-controller' className='w-full h-1/4 md:h-[23.5%] object-contain bg-[#F5F5F5] p-2' />
                 <img src={product?.productImage} alt='gaming-controller' className='w-full h-1/4 md:h-[23.5%] object-contain bg-[#F5F5F5] p-2' />
           </div>
           <div className='w-[70%] h-full bg-[#F5F5F5] '>
                <img src={product?.productImage} className='w-full h-full p-5 lg:p-20 object-scale-down' alt='' />
           </div>
       </div>
       <div className='w-full md:w-[40%] lg:w-[45%]  h-fit pl-2 pt-5 md:pt-0 mb-10 flex flex-col gap-2'>
             <p className='font-bold lg:text-2xl'>{product?.productName}</p>
             <div className='w-full h-fit flex items-center'>
                 <img src='../images/star.png' alt='' className='w-fit h-fit mr-2' />
                 {product?.quantity>0?<div className='w-fit h-fit  border-l-2 pl-2 text-[12px] border-slate-200 text-[#00FF66] lg:text-lg'>In Stock</div>:<div className='w-fit h-fit  border-l-2 pl-2 text-[12px] border-slate-200 text-red-500 lg:text-lg'>Not In Stock</div>}
             </div>
             <p className='font-bold lg:text-2xl'>{product?.productPrice}$</p>
             <p className='products w-full h-[80px]  font-light lg:text-xl overflow-y-scroll'>
                {product?.productDescription}
             </p>
             <div className='w-full h-fit flex items-center lg:text-2xl'>
                <p className='font-bold pr-3'>Size :</p>
                <div className='w-fit h-fit flex gap-4 '> 
                         {product?.Sizes?.map((value,index)=>{
                            return(
                                <p key={index} className={`w-8 lg:w-14 py-1 text-center ${sizeValue==value?"bg-red-500 text-white":"bg-white "} cursor-pointer  border-[1px] border-slate-200`} onClick={()=>setSizeValue(value)}>{value}</p>
                            )
                        })}
                    
                </div>
             </div>
             <div className='w-full h-fit lg:text-2xl'>
                  <button onClick={()=>addToCart(product,sizeValue)}  className='w-fit h-fit px-7 py-3 bg-red-500 text-white font-bold hover:bg-red-600 rounded'>Add To Cart</button>
             </div>
             <div className='w-[98%] lg:w-[80%] h-fit border-[1px] border-slate-200 lg:text-2xl '> 
                 <div className='w-full h-fit flex  items-center gap-2 font-bold p-5 lg:p-10  border-b-2 border-slate-200'>
                     <img src='./details/delivery.png' alt='' className='object-contain ' />
                     <p>Free Delivery</p>
                 </div>
                 <div className='w-full  h-fit flex  items-center gap-2 p-5 font-bold lg:p-10 '>
                     <img src='./details/return.png' alt='' className='object-contain' />
                     <div className='w-full h-fit'>
                         <p>Return Delivery</p>
                         <p className='text-[12px] font-medium lg:text-xl'>Free 30 Days Delivery Returns.</p>
                     </div>
                     
                 </div>
             </div>

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
