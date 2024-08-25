"use client"
import React, { useEffect, useState } from 'react'
import { categories } from '../utils/constants'
import Link from 'next/link'
import { useSelector } from 'react-redux'



const Categories = () => {
  
  return (
    <div className='products w-full h-[250px]  pl-2  mt-10 whitespace-nowrap overflow-x-scroll  '>
            {categories.map((category,index)=>{
              return(
              <Link href={`/Shop/${category.name}`}   className='w-[230px]  h-[200px] border-2 border-slate-200 rounded  mr-5  inline-block group hover:bg-[#DB4444] cursor-pointer'>
                <div key={index} className='w-[90%] h-[90%] flex flex-col justify-around items-center'>
                  <img src={`./categories/${category.image}`} className='w-[50%] h-[50%]  object-contain' alt='' />
                  <p className='group-hover:text-white'>{category.name}</p>
                </div>
              </Link>
              )
            })}
           
       
      
    </div>
  )
}



const Category = () => {
  return (
    <div className='w-full h-fit pl-2 mt-2 border-b-[1px] border-slate-200 '>
      <div className='w-full h-fit'>
            <div className='w-full h-fit flex items-start   gap-2'>
                <div className='w-8 h-12 rounded  bg-[#DB4444]'>
                </div>
                <p className='text-[#DB4444] font-medium  h-full my-auto tracking-tighter'>Categories</p>
            </div>
            <div className='w-full h-fit flex items-center justify-between md:justify-start md:pt-2'>
                <div className='w-fit h-fit pt-2'>
                    <p className='text-xl md:text-3xl font-bold'>Browse By Category</p>
                </div>

                

            </div>
      </div>
      <Categories/>
    </div>
  )
}

export default Category
