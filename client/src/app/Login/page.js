"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { Bounce, ToastContainer, toast,Zoom } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { setUserType } from '../redux/userSlice';

const page = () => {
  
  const form=useForm();
  const {register,handleSubmit,control,formState,reset}=form;
  const { errors }=formState;
  const route=useRouter();
  const dispatch=useDispatch();
  
  const submit=async(data)=>{
     const response=await fetch("http://localhost:8000/user/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include",
      body:JSON.stringify(data)
     });
     const dataComing=await response.json();

     if(dataComing.success){
        if(dataComing.type=="admin"){
          dispatch(setUserType("admin"));
        }else{
          dispatch(setUserType("common"));
        }
        toast.success(`${dataComing.message}`, {
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
        reset();
        setTimeout(()=>{
          route.push("/");
        },1500);
     }else{
      toast.warn(`${dataComing.message}`, {
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
        
     }
  }

  return (
    <div noValidate onSubmit={handleSubmit(submit)} className='w-[100%] h-fit md:h-screen  mt-[100px] flex flex-col md:flex-row'>
       <div className='w-full h-[70%] md:h-full md:pt-2'>
             <img src='./images/SideImage.png' className='w-full h-[80%] object-cover' alt='' />
       </div>
       <div className='w-full h-fit md:pl-20 lg:pt-10   '>
            <div className='w-full h-fit pt-5 pl-2 flex flex-col gap-3'>
                <p className='font-bold text-xl'>Login To Your Account</p>
                <p className='text-sm  font-extralight pb-5'>Enter Your Details Below</p>
            </div>
            <form  className='w-full h-fit pl-2 flex gap-6 flex-col mb-2  '>
            <div className="w-full h-fit flex">
            <input 
              type='email' 
              placeholder='Email' 
              className='w-[280px] border-b-[1px] border-slate-200 px-2 py-3 outline-none' 
              name='email'
              {...register("email",{
                required:"*"
              })}
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div className="w-full h-fit flex">
            <input 
              autoComplete='on'
              type='password' 
              placeholder='Password'  
              className='w-[280px] border-b-[1px] border-slate-200 px-2 py-3 outline-none' 
              {...register("password",{
                required:"*"
              })}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>                
          <input type='submit' value="Login Account" className='w-[280px] py-3 text-white font-bold bg-[#DB4444]' />
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
