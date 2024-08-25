"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { RiEmojiStickerFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import useLoadData from '../utils/useLoadData';
import { Bounce, ToastContainer, toast,Zoom } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { addProducts } from '../redux/slice';

const page = () => {

  const form=useForm();
  const {register,control,handleSubmit,formState,reset} = form;
  const [cartProducts,setCartProducts]=useState([]);
  const [proItems,setProItems]=useState([]);
  const [subTotal,setSubtotal]=useState(0);
  const [loading,setLoading]=useState("Place Order");
  const router=useRouter();
  const userType=useSelector(state=>state.user.userType);
  useEffect(()=>{
    if(userType=="admin"){
      router.push("/");
    }
    
  })

  const { errors }=formState;
  useEffect(()=>{
   console.log(loading);
  },[loading])
  
  useEffect(()=>{
       let total=0;
       cartProducts.forEach((product,index)=>{
         total+=product.productPrice;
       });
       setSubtotal(total);
  },[cartProducts]);

  const submit=async(data)=>{

    let requireObject=[];

    requireObject=cartProducts.map((product,index)=>{
      return{
        productId:product,
        quantity:proItems[index].quantity,
        price:proItems[index].price,
        size:proItems[index].size
      }
    })
    console.log(requireObject);

    const products={
      ...data,
      products:requireObject,
      totalAmount:subTotal
    }
    try {
      setLoading("Placing...");
      const response=await fetch("http://localhost:8000/product/checkOut",{
        method:"POST",
        headers:{
           "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(products)
      });
      
      const dataComming=await response.json();
      if(dataComming.success){
        setLoading("Ordered");
        toast.success(`${dataComming.message}`, {
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

         
          setTimeout(() => {
            router.push("/");
          }, 2000);
        
      }
    } catch (error) {
      console.log(error);
    }
    
  }
  useLoadData();
  


  const allProducts=useSelector(state=>state.products.products);
  useEffect(()=>{
    if(!getCookie("token")){
       router.push('/');
    }
    const loadCartPtoducts=async ()=>{
      const response=await fetch("http://localhost:8000/product/allCartProduct",{
        credentials:"include"
      });
      const data=await response.json();
      
      if(data.cartProducts && data.cartProducts.length>0){
        
        const items=data.cartProducts[0].products;
       
        if(items.length==0){
          
          toast.warn(`Add Products In Cart`, {
            toastId:"oneToast",
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
              router.push("/");
            },2000)
        }
        setProItems(items);
        const filteredItems=allProducts.filter(product=>items.some((item,index)=>item.productId==product._id));
        const products=filteredItems.map((product,index)=>{
          
          return{
                  ...product,
                  productPrice:items[index].price
                }
        });
        setCartProducts(products);
      }
      

    }
    loadCartPtoducts();

  },[allProducts])

  useEffect(()=>{
   console.log(proItems);
  },[proItems])

  return (
    <div className='w-full  min-h-screen mt-[100px] pl-2 pr-2'>
      <div className='w-full h-fit pt-1 text-sm flex items-start gap-1 md:text-lg '>
          <Link className='w-fit h-fit text-[#7D8184]' href="/Cart" >View Cart /</Link>
          <p className='w-fit h-fit'  >CheckOut</p>
      </div>
      <div className='w-full h-fit'>
        <p className='text-xl pt-5 font-bold pb-5'>Billing Details</p>
        <form noValidate onSubmit={handleSubmit(submit)}  className='w-full h-fit flex gap-5 flex-col md:flex-row'>

        <div className='div1 w-full md:w-[50%] h-fit flex flex-col gap-5'>
                <div className='w-[300px] lg:w-[400px] h-fit flex  flex-col gap-2'>
                    <label htmlFor='name' className='w-fit h-fit text-sm text-[#999999]'>Full Name<span className='text-red-500 '>{errors.fullName?.message}</span></label>
                    <input id='name' type='text' className='w-[280px] lg:w-[400px] bg-[#F5F5F5] px-2 py-2 outline-none' placeholder='' name='fullName' {...register("fullName",{required:"*"})} />
                </div>
                <div className='w-[300px] h-fit flex lg:w-[400px] flex-col gap-2'>
                    <label htmlFor='cname' className='w-fit h-fit text-sm text-[#999999]'>Company name<span className='text-red-500 '>{errors.companyName?.message}</span></label>
                    <input id='cname' type='text' className='w-[280px] lg:w-[400px] bg-[#F5F5F5] px-2 py-2 outline-none' placeholder='' name='companyName' {...register("companyName",{required:"*"})}/>
                </div>
                <div className='w-[300px] h-fit flex flex-col lg:w-[400px] gap-2'>
                    <label htmlFor='stadderess' className='w-fit h-fit text-sm text-[#999999]'>Street address<span className='text-red-500 '>{errors.streetAddress?.message}</span></label>
                    <input id='stadderess' type='text' className='w-[280px] lg:w-[400px] bg-[#F5F5F5] px-2 py-2 outline-none' placeholder='' name='streetAddress' {...register("streetAddress",{required:"*"})} />
                </div>
                <div className='w-[300px] h-fit flex  flex-col lg:w-[400px] gap-2'>
                    <label htmlFor='af' className='w-fit h-fit text-sm text-[#999999]'>Apartment,Floor etc<span className='text-red-500 '>{errors.apartmentName?.message}</span></label>
                    <input id='af' type='text' className='w-[280px] lg:w-[400px] bg-[#F5F5F5] px-2 py-2 outline-none' placeholder='' name='apartmentName'  {...register("apartmentName",{required:"*"})}/>
                    
                </div>
                <div className='w-[300px] h-fit flex flex-col lg:w-[400px] gap-2'>
                    <label htmlFor='city' className='w-fit h-fit text-sm text-[#999999]'>City<span className='text-red-500 '>{errors.cityName?.message}</span></label>
                    <input id='city' type='text' className='w-[280px] bg-[#F5F5F5] lg:w-[400px] px-2 py-2 outline-none' placeholder='' name='cityName' {...register("cityName",{required:"*"})}/>
                </div>
                <div className='w-[300px] h-fit flex flex-col lg:w-[400px]  gap-2'>
                    <label htmlFor='ph' className='w-fit h-fit text-sm text-[#999999]'>Phone Number<span className='text-red-500 '>{errors.phoneNumber?.message}</span></label>
                    <input id='ph' type='number' className='w-[280px] lg:w-[400px] bg-[#F5F5F5] px-2 py-2 outline-none' placeholder='' name='phoneNumber' {...register("phoneNumber",{required:"*"})}/>
                </div>
                <div className='w-[300px] h-fit flex flex-col lg:w-[400px] gap-2 pb-5'>
                    <label htmlFor="em" className='w-fit h-fit text-sm text-[#999999]'>Email address<span className='text-red-500 '>{errors.emailAddress?.message}</span></label>
                    <input id='em' type='email' className='w-[280px] lg:w-[400px] bg-[#F5F5F5] px-2 py-2 outline-none' placeholder='' name='emailAddress'  {...register("emailAddress",{required:"*"})}/>
                </div>
        </div>
        <div className='div2 w-full md:w-[50%] h-fit'>
            <div className='w-[300px] lg:w-[400px] h-fit text-sm md:text-xl flex flex-col gap-1'>
                    <div className='products w-full h-fit flex flex-col gap-2 md:gap-3 md:pb-2'>
                    {cartProducts && cartProducts.map((product,index)=>{
                        return(
                          <div key={index} className='w-full h-fit flex justify-between items-center'>
                          <div className='w-fit h-fit flex gap-2 items-center '>
                            <img src={product?.productImage} alt='' className='w-[50px] lg:w-[70px] lg:h-[70px] h-[50px] object-contain' />
                            <p className=''>{product?.productName}</p>
                          </div>
                          <p className=''>{product?.productPrice}$</p>
                         </div>
                        )
                    })}
                    
                    
            </div>
            <div className="calculations w-full h-fit flex flex-col gap-5">
             <div className="w-full h-fit flex justify-between border-b-[1px] pb-1 border-black">
                <p className="w-fit h-fit text-[12px] md:text-xl">Subtotal:</p>
                <p className="w-fit h-fit text-[12px] md:text-xl">{subTotal}$</p>
             </div> 
             <div className="w-full h-fit flex justify-between border-b-[1px] pb-1 border-black">
                <p className="w-fit h-fit text-[12px] md:text-xl">Shipping:</p>
                <p className="w-fit h-fit text-[12px] md:text-xl">Free</p>
             </div> 
             <div className="w-full h-fit flex justify-between  pb-1 ">
                <p className="w-fit h-fit text-[12px] md:text-xl">Total:</p>
                <p className="w-fit h-fit text-[12px] md:text-xl">{subTotal}$</p>
             </div> 
            </div>
            <div className='w-full h-fit'>
                <div className='w-full h-fit flex gap-2 items-center '>
                        <input  type='radio' className=' outline-none border-black border-[1px] md:w-5 md:h-5' value="Cash On Delivery"  name='paymentMethod' {...register("paymentMethod",{required:"*"})}/>
                        <p className='text-[12px] md:text-xl pt-1'>Cash On Delivery<span className='text-red-500'>{errors.paymentMethod?.message}</span></p>
                </div>
                <div className='w-full h-fit flex gap-2 items-center '>
                        <input  type='radio' className=' outline-none border-black border-[1px] md:w-5 md:h-5' value="Bank Payment"  name='paymentMethod'  {...register("paymentMethod",{required:"*"})}/>
                        <p className='text-[12px] md:text-xl pt-1'>Bank Payment<span className='text-red-500'>{errors.paymentMethod?.message}</span></p>
                </div>
                <input  className="w-fit h-fit bg-[#DB4444] hover:bg-red-700 text-[12px] md:text-lg  font-bold text-white px-8 py-3 mt-5 mb-5 " value={loading} type='submit'  />
            </div>
            </div>
        </div>

         
        </form>

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
