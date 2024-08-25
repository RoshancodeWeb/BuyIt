"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import process from "../utils/process";
import { getCookie } from "cookies-next";
import Loading from "../Components/Loading";


const WishlistProducts = () => {
    const [loading, setLoading] = useState(true);
    const route=useRouter();
    const [wishListProducts,setWishListProducts]=useState([]);
    

    useEffect(()=>{
        if(!getCookie("token")){
          route.push("/");
        }
        const loadWishListProducts=async ()=>{
            try {
                const response=await fetch(`http://localhost:8000/product/userWishlist`,{
                    credentials:'include'
                });
                const data=await response.json();
                if(data.success){
                    const userData=data.message;
                    const products=userData.WishList;
                    process(products)
                    setWishListProducts(products);
                }
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false);
            }
           
            
        }
        loadWishListProducts();
    },[]);

    const deleteProduct=async(productId)=>{
        console.log("reaching function");
         const response=await fetch(`http://localhost:8000/product/deleteWishListProduct/${productId}`,{
            method:"DELETE",
            credentials:"include"
         });
         const data=await response.json();
         console.log(data);
         if(data.success){
            const products=data.user;
            process(products);
            setWishListProducts(products);
         }
    }

    if(loading){
        return <Loading/>
    }
      return (
        <div className='products w-full h-[320px]  pl-2  mt-10 whitespace-nowrap overflow-x-scroll  '>
               {wishListProducts?.map((product,index)=>{
                    return(
                        <div  key={index} className='w-[230px] h-[280px]  rounded  shadow-sm shadow-slate-300 inline-block mr-5 cursor-pointer'>
                        <div className='w-full h-[70%]  relative  flex items-center justify-center bg-gray-100'>
                            <div className='w-fit h-fit  absolute top-2 left-2 text-sm text-white font-light px-3 py-1 bg-[#DB4444] rounded '>
                            -{product?.realDiscount}%
                            </div>
                            <div className='w-fit h-fit bg-white rounded-full cursor-pointer px-2 py-2 absolute right-2 top-2 flex flex-col gap-2'>
                               <MdOutlineDelete  className='text-lg hover:scale-110'  onClick={()=>deleteProduct(product?._id)}/>
                            </div>
                            <div className='w-[60%] h-[60%] '>
                                <img src={product?.productImage} alt='product' className='w-full h-full object-contain'/>
                            </div>
                       
                        </div>
                        <div className='w-full h-[30%] shadow-sm flex flex-col pl-2'>
                            <p className='font-bold tracking-tighter w-full h-fit'>{product?.productName}</p>
                            <p className='font-semibold text-[#DB4444] w-full h-fit'>{product?.productPrice}$<span className="pl-2 font-normal text-lighter text-gray-400 line-through">{product?.productDiscount}</span></p>
                            <div className='w-full h-fit flex justify-between pr-2 items-center'>
                            <img src="./images/star.png" className='h-6 w-32' alt='rating' />
                            <Link href={`/Detail/${product?.productName}`} className='underline text-blue-700'>Details</Link>
                            </div>                            
                        </div>
    
                    </div>
                    )
               })}
        </div>
      )
    }
    

export default WishlistProducts