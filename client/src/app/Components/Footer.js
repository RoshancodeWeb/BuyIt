"use client"
import React, { useEffect, useState } from 'react'
import { IoSendOutline } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { Bounce, ToastContainer, toast,Zoom } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUserType } from '../redux/userSlice';

const Footer = () => {
    const route=useRouter();
    const[isAdmin,setAdmin]=useState("");
    const dispatch=useDispatch();
    const userType=useSelector(state=>state.user.userType);
    
    

    useEffect(()=>{
      if(!getCookie("token")){
          dispatch(setUserType("common"));
      }
      setAdmin(userType);
    },[userType]);


    const checkLogin=(path)=>{
        const cookie=getCookie("token");
        if(!cookie){
          toast.error(`Login Or Create Account`, {
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
        }else{
            
          if(path=="/WishList"){
            route.push("/WishList");
          }else if(path=="/Cart"){
            route.push("/Cart");
          }else{
            route.push("/Shop/All");
          }
        
        }
      }
  return (
    <div className='w-full min-h-[50vh] z-0 bg-black text-white'>
        <div className='w-full h-fit flex flex-col md:flex-row md:justify-between  pl-5 pt-10 gap-4 '>
            <ul className='w-fit h-fit flex flex-col gap-4'>
                    <li className='text-[20px] font-bold'>Exclusive</li>
                    <li className='font-light text-sm'>Subscribe</li>
                    <li className='font-extralight text-sm'>Get 10% off at your first order</li>
                 
                    <li className='flex w-full justify-around text-3xl'>
                       <FaFacebookF className='cursor-pointer'/>
                       <RiTwitterXFill className='cursor-pointer'/>
                       <Link href="https://www.linkedin.com/in/roshanali-dev/"><FaLinkedinIn className='cursor-pointer'/></Link>
                       <FaInstagram className='cursor-pointer'/>
                    </li>
            </ul>
            <ul className='w-fit h-fit flex flex-col gap-2'>
                    <li className='text-[15px]  font-bold'>Support</li>
                    <li className='font-extralight text-sm'>Bhamman Village Batapur,<span className='block'>Lahore</span></li>
                    <li className='font-extralight text-sm'>roshanail7613@gmail.com</li>
                    <li className='font-extralight text-sm'>03211096836</li>
                    
            </ul>
            <ul className='w-fit h-fit flex flex-col gap-2'>
                    <li className='text-[15px] font-bold'>Explore</li>
                    
                    {isAdmin=="admin"?<></>:<li className='font-extralight text-sm cursor-pointer' onClick={()=>checkLogin("/Cart")}>Cart</li>}
                    {isAdmin=="admin"?<></>:<li className='font-extralight text-sm cursor-pointer' onClick={()=>checkLogin("/WishList")}>Wishlist</li>}
                    <li className='font-extralight text-sm cursor-pointer' onClick={()=>checkLogin("/Shop/All")}>Shop</li>
            </ul>
            <ul className='w-fit h-fit flex flex-col gap-2 lg:pr-5'>
                    <li className='text-[15px] font-bold'>Quick Link</li>
                    <li className='font-extralight text-sm'>Privacy Policy</li>
                    <li className='font-extralight text-sm'>Terms of Use</li>
                    <li className='font-extralight text-sm'>FAQ</li>
                    <li className='font-extralight text-sm'><Link href="/Contact">Contact</Link></li>
            </ul>   
        </div>
        <div className='w-full h-fit border-t-[1px] border-zinc-500 flex justify-center p-4 mt-2 lg:mt-5'> 
            <p className='text-[14px] w-fit h-fit text-zinc-500 flex items-center justify-center gap-[1.5px]'><span><FaRegCopyright /></span>Copyright Roshan 2024.All right reserved</p>
        </div>
            
    </div>
  )
}

export default Footer
