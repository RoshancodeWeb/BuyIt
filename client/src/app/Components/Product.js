"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useSelector } from 'react-redux';
import { ToastContainer, toast,Zoom, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Products = () => {
  const allProducts=useSelector(state=>state.products.products);
  const [discountProducts,setDiscountProducts]=useState([]);
  const items = Array.from({ length: 8 }, (_, i) => i);
  const userType=useSelector(state=>state.user.userType);

  useEffect(()=>{
      const filteredProducts=allProducts.filter(product=>product["realDiscount"]!==undefined);
      setDiscountProducts(filteredProducts);
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
    <div className='products w-full h-[320px]  pl-2  mt-10 whitespace-nowrap overflow-x-scroll'>
           {discountProducts.map((product,index)=>{
                return(
                  
                    <div  key={index} className='w-[230px] h-[280px]  rounded  shadow-sm shadow-slate-300 inline-block mr-5 cursor-pointer'>
                    <div className='w-full h-[70%]  relative  flex items-center justify-center bg-gray-100'>
                        <div className='w-fit h-fit  absolute top-2 left-2 text-sm text-white font-light px-3 py-1 bg-[#DB4444] rounded '>
                        -{product.realDiscount}%
                        </div>
                        <div className='w-fit h-fit absolute right-2 top-2 flex flex-col gap-2'>
                        {userType=="admin"?<></>:<FaRegHeart className='text-xl cursor-pointer hover:scale-110' onClick={()=>addToWishList(product?._id)}/>}
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
                         <img src="./images/star.png" className='h-6 w-32' alt='rating' />
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
            pauseOnHover
            theme="light"
       
            />
    </div>
  )
}







const Product = () => {
  const [countValue, seCountValue] = useState({days:"",hours:"",minutes:"",seconds:""});
  const formatTimer=(time)=>{
     const days=String(Math.floor(time/(24*60*60))).padStart(2,0);
     time%=24*60*60;
     const hours=String(Math.floor(time/(60*60))).padStart(2,0);
     time%=60*60;
     const minutes=String(Math.floor(time/60)).padStart(2,0);
     const seconds=String(time%60).padStart(2,0);

   
      
     let name1="days";
     let name2="hours";
     let name3="minutes";
     let name4="seconds";

    

     seCountValue({...countValue,[name1]:days,[name2]:hours,[name3]:minutes,[name4]:seconds});
     
  }
  const settingCountDown=()=>{
     let days=3 *24*60*60;
     let hours=4*60*60;
     let min=34*60;

     let timer=days+hours+min;
     formatTimer(timer);
     const countDown=setInterval(()=>{
        formatTimer(timer);
        
        

        if(timer===0) clearInterval(countDown);
        timer--;
     },1000);
     
  }

  useEffect(() => {
    settingCountDown();
  },[]);

//Always remember settingState or updating State in Next js  is asynchronous
//   useEffect(() => {
//     console.log(countValue);
//   },[countValue]);

  return (
    <div className='w-full h-fit pl-1 mt-10 md:mt-20 pb-2'>
        <div className='w-full h-fit'>
            <div className='w-full h-fit flex items-start mt-2  gap-2'>
                <div className='w-8 h-12 rounded  bg-[#DB4444]'>
                </div>
                <p className='text-[#DB4444] font-medium  h-full my-auto tracking-tighter'>Today's</p>
            </div>
            <div className='w-full h-fit flex items-center justify-between md:justify-start md:pt-2'>
                <div className='w-fit h-fit pt-2'>
                    <p className='text-xl md:text-3xl font-bold'>Flash Slaes</p>
                </div>
                <div className='w-fit h-fit flex pr-2 md:pl-24 lg:pl-44'>
                    <div className='w-fit h-fit '>
                        <p className='text-[12px] w-full pl-1 md:text-sm'>Days</p>
                        <p className='font-bold text-xl md:text-3xl'>{countValue?.days}<span className='pl-2 pr-2 text-[#DB4444]'>:</span></p>
                    </div>
                    
                    <div className='w-fit h-fit'>
                        <p className='text-[12px] md:text-sm'>Hours</p>
                        <p className='font-bold text-xl md:text-3xl'>{countValue?.hours}<span className='pl-2 pr-2 text-[#DB4444]'>:</span></p>
                    </div>
                    <div className='w-fit h-fit'>
                        <p className='text-[12px] md:text-sm'>Minutes</p>
                        <p className='font-bold text-xl md:text-3xl'>{countValue?.minutes}<span className='pl-2 pr-2 text-[#DB4444]'>:</span></p>
                    </div>
                    <div className='w-fit h-fit'>
                        <p className='text-[12px] md:text-sm'>Sec</p>
                        <p className='font-bold text-xl md:text-3xl'>{countValue?.seconds}</p>
                    </div>

                </div>

            </div>
        </div>
        <Products/>
        <div className='w-full h-fit flex items-center justify-center border-b-[1px] border-slate-200 pb-10 '>
            <Link href={`/Shop/All`} className='w-fit h-fit bg-[#DB4444] px-8 py-4 text-white rounded font-semibold'>View All Products</Link>
        </div>
    </div>
  )
}

export default Product
