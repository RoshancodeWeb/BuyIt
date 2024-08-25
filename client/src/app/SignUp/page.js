"use client"
import Link from 'next/link'
import React, { useState,useEffect } from 'react'
import { Bounce, ToastContainer, toast,Zoom } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';

const page = () => {
  const form=useForm();
  const {register,control,handleSubmit,formState,reset}=form;
  const { errors }=formState;
  const route=useRouter();
  const submit=async (data)=>{
    try {
      const response=await fetch(`http://localhost:8000/user/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data),
        credentials:'include',
      })
      const dataComing=await response.json();
      if(dataComing.success){
          toast.success(`${dataComing.message}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
            });
            reset();
            }
      else{
        
        toast.info(`${dataComing.message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
          reset();
          setTimeout(()=>{
            route.push("/Login");
          },1500);

      }
    } catch (error) {
      console.log(error.message);
    }
    
    
  }
  return (
    <div className='w-[100%] h-fit md:h-screen mt-[100px] flex flex-col md:flex-row'>
      <div className='w-full h-[70%] md:h-full md:pt-2'>
        <img src='./images/SideImage.png' className='w-full h-[80%] object-cover' alt='' />
      </div>
      <div className='w-full h-fit md:pl-20 lg:pt-10'>
        <div className='w-full h-fit pt-5 pl-2 flex flex-col gap-3'>
          <p className='font-bold text-xl'>Create an account</p>
          <p className='text-sm font-extralight pb-5'>Enter Your Details Below</p>
        </div>
        <form  noValidate onSubmit={handleSubmit(submit)} className='w-full h-fit pl-2 flex gap-6 flex-col mb-2'>
          <div className="w-full h-fit flex">
            <input 
              type='text' 
              placeholder='Name' 
              className='w-[280px] border-b-[1px] border-slate-200 px-2 py-3 outline-none' 
              name='fullname' 
              {...register("fullname",{
                required:"*"
              })}
            />
            <p className="text-red-500">{errors.fullname?.message}</p>      
          </div>
          <div className="w-full h-fit flex">
            <input 
              type='email' 
              placeholder='Email' 
              className='w-[280px] border-b-[1px] border-slate-200 px-2 py-3 outline-none' 
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
          <input type='submit' value="Create Account" className='w-[280px] py-3 text-white font-bold bg-[#DB4444]' />
        </form>
        <div className='w-full h-fit pl-2'>
          <p className='text-sm py-2 md:py-0'>Already have an account?<Link className='pl-1 underline' href="/Login">login</Link></p>
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
  );
  
}

export default page
