"use client"
import React, { useEffect, useState } from 'react'
import { categories } from '../utils/constants'
import Link from 'next/link'
import AdminProduct from '../AdminComponents/AdminProduct'
import AddNewProduct from '../AdminComponents/AddNewProduct'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const page = () => {
  const userType=useSelector(state=>state.user.userType);
  const [categoryName, setCategoryName] = useState("All Products");
  const [addProduct,setAddProduct]=useState(false);
  const route=useRouter();
  useEffect(()=>{
    if(userType=="common" || userType==""){
      route.push("/");
    }
  },[userType]);

  useEffect(()=>{
    if(typeof window !== "undefined"){
      if(localStorage.getItem("addProduct")==null){
        localStorage.setItem("addProduct","false");
      }
      setAddProduct(localStorage.getItem("addProduct") !== "false");
    }
   
  },[])
  
 useEffect(() => {
  console.log(addProduct);
 }, [addProduct]);
  
 
  return (
    <div className='w-full min-h-screen mt-[100px] md:flex '>
        <div className='w-full    md:w-[30%]  md:flex-col   md:border-r-2 md:border-slate-200 md:pl-2 md:h-full md:whitespace-normal md:overflow-auto  h-[60px] border-b-[1px] md:border-b-0 border-slate-200   flex   whitespace-nowrap overflow-x-auto items-center  '>
        <button onClick={()=>{setCategoryName("All Products");   localStorage.setItem("addProduct","false"); setAddProduct(!(localStorage.getItem("addProduct")==="false"))}}  className='w-fit md:w-full px-4 md:px-0 h-full md:p-2 md:hover:underline  border-l-[1px] border-r-[1px] md:border-l-0 md:border-r-0 flex items-center md:items-start md:justify-start  border-slate-200 md:pl-0 md:pr-0  cursor-pointer hover:bg-slate-200'>All Products</button>
         {categories.map((category,index)=>{
            return(
                <button onClick={()=>{setCategoryName(category.name);  localStorage.setItem("addProduct","false"); setAddProduct(!(localStorage.getItem("addProduct")==="false")); }}  key={index} className='w-fit md:w-full h-full px-4 md:px-0 md:p-2 md:hover:underline  border-l-[1px] border-r-[1px] md:border-l-0 md:border-r-0 flex items-center md:items-start md:justify-start  border-slate-200 md:pl-0 md:pr-0  cursor-pointer hover:bg-slate-200'>{category.name}</button>
            )
         })}
        <button onClick={()=>{ route.push("/OrderList")  }}  className='w-fit md:w-full px-4 md:px-0 h-full md:p-2 md:hover:underline  border-l-[1px] border-r-[1px] md:border-l-0 md:border-r-0 flex items-center md:items-start md:justify-start  border-slate-200 md:pl-0 md:pr-0  cursor-pointer hover:bg-slate-200'>Order List</button>
       </div>
       <div className='w-full min-h-screen md:w-[70%] pl-1 pr-1 '>
            {addProduct?<AddNewProduct setAddProduct={setAddProduct}/>:<AdminProduct categoryName={categoryName} setCategoryName={setCategoryName} addProduct={addProduct} setAddProduct={setAddProduct}/>}       
       </div>
    </div>
  )
}

export default page
