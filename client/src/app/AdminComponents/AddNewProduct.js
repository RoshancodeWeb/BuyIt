import React from 'react'
import { categories } from '../utils/constants'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useRouter } from 'next/navigation';


const AddNewProduct =  ({setAddProduct}) => {
  const form=useForm();
  const {register,control,formState,handleSubmit,reset}=form;
  const {errors}=formState;
  const route=useRouter()
  
  const submit=async (data)=>{
    
    const formData = new FormData();
        for (const key in data) {
            if (key==="productImage" && data[key][0]) {  
                    formData.append(key, data[key][0]);
            }else if(key==="productDiscount" && (data[key]<0 || data[key]>=100)){
                   formData.append(key, 0);
            }
            else{
                formData.append(key, data[key]);
            }
       }
    const res=await fetch("http://localhost:8000/owner/productCreate",{
        method:"POST",
        body:formData,
        credentials:"include"
    });
    const response=await res.json();
    if(response.success){
        reset();
        localStorage.setItem("addProduct","false");
        setAddProduct(false);
        
    }
  }

  return (
    <div className='w-full min-h-screen  pl-2  flex flex-col md:flex-row gap-3 items-center md:items-start md:justify-center flex-wrap pb-5 '>
        <p className='w-full text-xl font-bold'>Add Product</p>
        <form noValidate onSubmit={handleSubmit(submit)}  className='w-full h-fit flex flex-col gap-2 md:pl-2' encType='multipart/form-data' >
            <div className='w-[300px] h-fit flex flex-col lg:w-[400px] gap-2'>
                <label htmlFor='productImage' className='w-fit h-fit text-sm text-[#999999]'>Product Image<span className='text-red-500 '>{errors.productImage?.message}</span></label>
                <input   id='productImage' type='file' accept='image/*' className='w-[280px] lg:w-[400px] bg-[#F5F5F5] px-2 py-2 outline-none' placeholder='' name='productImage' {...register("productImage",{required:"*"})} />
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
                <input   id='productDiscount' min='0' max='100' type='number'  className='w-[280px] lg:w-[400px] bg-[#F5F5F5] px-2 py-2 outline-none' placeholder='' name='productDiscount' {...register("productDiscount",{required:"*"})}  />
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
            <input type='submit' value="Add New Product" className='w-fit h-fit bg-red-500 px-4 py-2 text-white font-bold rounded hover:scale-95 hover:bg-red-600' />
        </form>
         
    </div>
  )
}

export default AddNewProduct
