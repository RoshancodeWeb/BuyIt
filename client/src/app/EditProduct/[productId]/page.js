"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { categories } from '@/app/utils/constants';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/app/Components/Loading';
import Link from 'next/link';

const page =  () => {
  const form=useForm();
  const {register,control,formState,handleSubmit,reset}=form;
  const {errors}=formState;
  const params=useParams();
  const { productId }=params;
  let formInsert={};
  const route=useRouter();
  const [imageSrc, setImageSrc] = useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);

  

  useEffect(()=>{
   const fetchProducts=async ()=>{
     try {
        
        const res=await fetch("http://localhost:8000/product/allProducts");
        const {products}=await res.json();
        
        const product=products.find(p=>p._id==productId);
       
        for(const key in product){
              if(key=="productQuantity"){
                formInsert.quantity=product.productQuantity;
              }
              else if(key=="billBoards"){
                formInsert.billBoard=product.billBoards.categoryOne=="Hero Bill Board"?"Hero Bill Board":"Category Bill Board";
              }
              else if(key=="SpecialCategory"){
                formInsert.justForYou=product.SpecialCategory.categoryOne=="Just For You"?"Just For You":"";
                formInsert.ourProduct=product.SpecialCategory.categoryTwo=="Our Product"?"Our Product":"";
                
            }else if(key=="Sizes"){
                
                        formInsert.xs = product.Sizes.includes("XS") ? "XS" : "";
                        formInsert.s = product.Sizes.includes("S") ? "S" : "";
                        formInsert.m = product.Sizes.includes("M") ? "M" : "";
                        formInsert.l = product.Sizes.includes("L") ? "L" : "";
                        formInsert.xl = product.Sizes.includes("XL") ? "XL" : "";
                
              }else if(key=="Category"){
                formInsert.category=product[key];
              }
              else if(key=="quantity"){
                formInsert.productQuantity=product[key];
              }
              else{
                 formInsert[key]=product[key];
              }

        }
        

        if(product){
            const buffer=formInsert.productImage.data;
            const base64Image=Buffer.from(buffer).toString("base64");
            const imageS=`data:image/jpeg;base64,${base64Image}`;
            setImageSrc(imageS);
            formInsert.productImage="";
            reset(formInsert);
        }
        
       
        
     } catch (error) {
        setError(true);
     }finally{
        setLoading(false);
     }
   }
   fetchProducts();

 
  },[productId,reset]);

  


  const submit=async (data)=>{
    const formData = new FormData();
    console.log(data);
    for(const key in data){
        if(key=="productImage" && data[key][0]){   
            console.log(key,data[key][0]);
            formData.append(key,data[key][0]);
            
        }else if(key==="productDiscount" && (data[key]<0 || data[key]>=100)){
            formData.append(key, 0);
        }
        else{
            formData.append(key,data[key]);
        }
    }
    try {
         const res=await fetch(`http://localhost:8000/owner/updateProduct/${productId}`,{
             method:"PUT",
             body:formData
         });

         const response=await res.json();
         if(response.success){
            route.push("/Admin");
         }
    } catch (error) {
        console.log(error.message);
    }
    
  }

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div className='h-[100vh] mt-[100px]'>Error loading data. Please try again later.</div>;
  }
  return (
    <div className='w-full min-h-screen mt-[100px]  pl-2  flex flex-col md:flex-row gap-3 items-center md:items-start md:justify-center flex-wrap pb-5 '>
        <p className='w-full text-xl '><span className='w-fit h-fit text-[#7D8184] cursor-pointer'><Link href="/Admin">Admin</Link></span>/Edit Product</p>
        <form noValidate onSubmit={handleSubmit(submit)}  className='w-full h-fit flex flex-col gap-2 md:pl-2' encType='multipart/form-data' >
            <div className='w-[300px] h-fit flex flex-col lg:w-[400px] gap-2'>
                <label htmlFor='productImage' className='w-fit h-fit text-sm text-[#999999]'>Product Image<span className='text-red-500 '>{errors.productImage?.message}</span></label>
                <img src={imageSrc} alt='' className='w-[100px] h-[80px] object-cover'/>
                <input id='productImage' type='file' accept='image/*'  className='w-[280px] lg:w-[400px] bg-[#F5F5F5] px-2 py-2 outline-none ' placeholder='' name='productImage' {...register("productImage")} />
                </div>
            <div className='w-[300px] h-fit flex flex-col lg:w-[400px] gap-2'>
                <label htmlFor='productName' className='w-fit h-fit text-sm text-[#999999]'>Product Name<span className='text-red-500 '>{errors.productName?.message}</span></label>
                <input id='productName' type='text' className='w-[280px] lg:w-[400px] bg-[#F5F5F5] px-2 py-2 outline-none' placeholder='' name='productName'  {...register("productName",{required:"*"})}/>
            </div>
            <div className='w-[300px] h-fit flex flex-col lg:w-[400px] gap-2'>
                <label htmlFor='productDescription' className='w-fit h-fit text-sm text-[#999999]'>Description<span className='text-red-500 '>{errors.productDescription?.message}</span></label>
                <input id='productDescription' type='text'  className='w-[280px] lg:w-[400px] bg-[#F5F5F5] px-2 py-2 outline-none' placeholder='' name='productDescription' {...register("productDescription",{required:"*"})}/>
            </div>
            <div className='w-[300px] h-fit flex flex-col lg:w-[400px] gap-2'>
                <label htmlFor='productPrice' className='w-fit h-fit text-sm text-[#999999]'>Price<span className='text-red-500 '>{errors.productPrice?.message}</span></label>
                <input min='0' id='productPrice' type='number'  className='w-[280px] lg:w-[400px] bg-[#F5F5F5] px-2 py-2 outline-none' placeholder='' name='productPrice'  {...register("productPrice",{required:"*"})}/>
            </div>
            <div className='w-[300px] h-fit flex flex-col lg:w-[400px] gap-2'>
                <label htmlFor='productQuantity' className='w-fit h-fit text-sm text-[#999999]'>Quantity<span className='text-red-500 '>{errors.productQuantity?.message}</span></label>
                <input min='0' id='productQuantity' type='number'  className='w-[280px] lg:w-[400px] bg-[#F5F5F5] px-2 py-2 outline-none' placeholder='' name='productQuantity'  {...register("productQuantity",{required:"*"})}/>
            </div>
            <div className='w-[300px] h-fit flex flex-col lg:w-[400px] gap-2'>
                <label htmlFor='productDiscount' className='w-fit h-fit text-sm text-[#999999]'>Discount<span className='text-red-500 '>{errors.productDiscount?.message}</span></label>
                <input id='productDiscount' type='number' min='0' max='100'  className='w-[280px] lg:w-[400px] bg-[#F5F5F5] px-2 py-2 outline-none' placeholder='' name='productDiscount' {...register("productDiscount",{required:"*"})}  />
            </div>
            <div className='w-[300px] h-fit'>
            <p className='font-bold pt-2'>BillBoard</p>
            <div className='w-[300px] h-fit flex  items-center pt-3  lg:w-[400px]  gap-2'>
                <input id='heroBillBoard' type='radio'  className='w-4 h-4' placeholder='' name='billBoard' value="Hero Bill Board"  {...register("billBoard",{required:"*"})}/>
                <label htmlFor='heroBillBoard' className='w-fit h-fit text-sm text-[#999999]'>Hero Bill Board<span className='text-red-500'>{errors.billBoard?.message}</span></label>
            </div>
            <div className='w-[300px] h-fit flex  items-center pt-3 lg:w-[400px]  gap-2'>
                <input id='categoryBillBoard' type='radio'  className='w-4 h-4' placeholder='' name='billBoard' value="Category Bill Board" {...register("billBoard",{required:"*"})} />
                <label htmlFor='categoryBillBoard' className='w-fit h-fit text-sm text-[#999999]'>Category Bill Board<span className='text-red-500 '>{errors.billBoard?.message}</span></label>
            </div>
            
            </div>
            
            <div className='w-[300px] h-fit'>
            <p className='font-bold pt-2'>Special Categories</p>
            <div className='w-[300px] h-fit flex  items-center pt-3 lg:w-[400px]  gap-2'>
                <input id='forYou' type='checkbox'  className='w-4 h-4' placeholder='' name='justForYou' value="Just For You" {...register("justForYou")} />
                <label htmlFor='forYou' className='w-fit h-fit text-sm text-[#999999]'>Just For You<span className='text-red-500 '></span></label>
            </div>
            <div className='w-[300px] h-fit flex  items-center pt-3 lg:w-[400px]  gap-2'>
                <input id='ourProduct' type='checkbox'  className='w-4 h-4' placeholder='' name='ourProduct' value="Our Product" {...register("ourProduct")} />
                <label htmlFor='ourProduct' className='w-fit h-fit text-sm text-[#999999]'>Our Product<span className='text-red-500 '></span></label>
            </div>
            
            </div>

            <div className='w-[300px] h-fit'>
            <p className='font-bold pt-2'>Size</p>
            <div className='w-[300px] h-fit flex  items-center pt-3 lg:w-[400px]  gap-2'>
                <input id='xs' type='checkbox'  className='w-4 h-4' placeholder='' name='xs' value="XS" {...register("xs")}/>
                <label htmlFor='xs' className='w-fit h-fit text-sm text-[#999999]'>XS<span className='text-red-500 '></span></label>
            </div>
            <div className='w-[300px] h-fit flex  items-center pt-3 lg:w-[400px]  gap-2'>
                <input id='s' type='checkbox'  className='w-4 h-4' placeholder='' name='s' value="S" {...register("s")} />
                <label htmlFor='s' className='w-fit h-fit text-sm text-[#999999]'>S<span className='text-red-500 '></span></label>
            </div>
            <div className='w-[300px] h-fit flex  items-center pt-3 lg:w-[400px]  gap-2'>
                <input id='m' type='checkbox'  className='w-4 h-4' placeholder='' name='m' value="M" {...register("m")} />
                <label htmlFor='m' className='w-fit h-fit text-sm text-[#999999]'>M<span className='text-red-500 '></span></label>
            </div>
            <div className='w-[300px] h-fit flex  items-center pt-3 lg:w-[400px]  gap-2'>
                <input id='l' type='checkbox'  className='w-4 h-4' placeholder='' name='l' value="L"  {...register("l")}/>
                <label htmlFor='l' className='w-fit h-fit text-sm text-[#999999]'>L<span className='text-red-500 '></span></label>
            </div>
            <div className='w-[300px] h-fit flex  items-center pt-3 lg:w-[400px]  gap-2'>
                <input id='xl' type='checkbox'  className='w-4 h-4' placeholder='' name='xl' value="XL"  {...register("xl")}/>
                <label htmlFor='xl' className='w-fit h-fit text-sm text-[#999999]'>XL<span className='text-red-500 '></span></label>
            </div>
            </div>
            <div className='w-[300px] h-fit flex  items-center pt-3 lg:w-[400px]  gap-2'>
                <select name='category' {...register("category",{required:"*"})} className='w-[280px] lg:w-[400px] bg-[#F5F5F5] px-2 py-2 outline-none'>
                    <option disabled value="" selected>----Categories---</option>
                    {categories.map((value)=>{
                        return (
                            <option value={value.name}>{value.name}</option>
                        )
                    })}
                </select>
                <p className='text-red-500'>{errors.category?.message}</p>
            </div>
            <input type='submit' value="Update Product" className='w-fit h-fit cursor-pointer bg-red-500 px-4 py-2 text-white font-bold rounded hover:scale-95 hover:bg-red-600' />
        </form>
        
    </div>
  )
}

export default page

