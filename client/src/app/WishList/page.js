"use client"
import React from 'react'
import WishlistProducts from '../WishListComponents/WishlistProducts'
import JustForYou from '../WishListComponents/JustForYou'
import Link from 'next/link'
import useLoadData from '../utils/useLoadData.js'
import Loading from '../Components/Loading'
import { useSelector } from 'react-redux'




const page = () => {
  
  const allProducts=useSelector(state=>state.products.products);
  const { loading,error } =allProducts?{loading:false,error:null}:useLoadData();


  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div className='h-[100vh] mt-[100px]'>Error loading data. Please try again later.</div>;
  }
  return (
    <div className='w-full min-h-screen mt-[100px] pl-2 pr-2'>
      <div className='w-full h-fit text-sm lg:text-xl  flex justify-between pt-2 items-center'>
         <p className='font-bold'>Wishlist</p>
         <Link href={`/Cart`} className='w-fit h-fit border-2 border-black px-5 py-2 hover:bg-slate-200'>Move All To Bag</Link>
      </div>
      <WishlistProducts/>
      <JustForYou/>
    </div>
  )
}

export default page
