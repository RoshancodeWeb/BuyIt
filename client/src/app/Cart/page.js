"use client"
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import useLoadData from "../utils/useLoadData";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Bounce, ToastContainer, toast,Zoom } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Components/Loading";


const  CartProduct= () => {
    const [counters, setCounters] = useState([]);
    const [cartProducts,setCartProducts]=useState([]);
    const [productPrices,setProductPrices]=useState([]);
    const [subtotal,setSubtotal]=useState(0);
    const router=useRouter()

    
    const allProducts=useSelector(state=>state.products.products);
    const { loading,error } =allProducts?{loading:false,error:null}:useLoadData();
    const route=useRouter();

    const loadCartProducts=async()=>{
      const response=await fetch("http://localhost:8000/product//allCartProduct",{
           credentials:"include"
      });
      const data=await response.json();
      console.log(data);
      if(data.success){
        const items=data.cartProducts[0]?.products;
        if(items.length==0){
          
          toast.warn(`Cart is Empty,Add Products!`, {
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
  

        const filterItems=allProducts.filter(product=>{
               return items.some(item => item.productId === product._id);
        });
      
        setCounters(items.map((item,index)=>item.quantity));
        setProductPrices(filterItems.map((item,index)=>item.productPrice*items[index].quantity));
      
        setCartProducts(filterItems);
      }else{
        toast.warn(`${data.message}`, {
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
      
    }

    useEffect(()=>{
        if(!getCookie("token")){
             route.push("/");
        }
        
        loadCartProducts();
    },[allProducts]);

    const deleteCartProduct=async (productId)=>{
        
        const response=await fetch(`http://localhost:8000/product/deleteCartProduct/${productId}`,{
          method:"DELETE",
          credentials:"include"
        });
        const data=await response.json();
        loadCartProducts();
        
    }


    const handleIncrement=(loc,quantity)=>{
        if(counters[loc]<quantity){
          setCounters(prevCounters=>prevCounters.map((counter,index)=>index==loc?counter+1:counter));
         
        }
    }
    const handleDecrement=(loc)=>{
         
         if(counters[loc]>1){
          setCounters(prevCounters=>prevCounters.map((counter,index)=>index==loc?counter-1:counter));
         
        }
    }

    const updateCart=async()=>{
        const response=await fetch('http://localhost:8000/product/updateCart',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include",
          body:JSON.stringify({counters:counters,prices:productPrices})
        })
        const data=await response.json();
        
        if(data.success){
          toast.success(`${data.message}`, {
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
          toast.error(`${data.message}`, {
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
    useEffect(()=>{
       setTotalPrice();
       
    },[productPrices]);

    const setTotalPrice=()=>{
      let totalPrice=0;
      productPrices.forEach((price)=>{
          totalPrice+=price;
    });
      setSubtotal(totalPrice);
    }

    useEffect(() => {
    
      setProductPrices(counters.map((count, index) => count * cartProducts[index]?.productPrice));
      
    }, [counters,cartProducts]);
    
    if(loading){
      return <Loading/>;
    }
    
   
    return (
    <div className="w-full h-fit">
       
       {cartProducts.map((product,index)=>{
           return ( 
           <div className="w-full product h-[70px] md:h-[100px] flex  mt-5 shadow-sm shadow-black">
            <div className="w-1/4 h-full  flex flex-col items-start md:flex-row md:justify-start md:items-center md:gap-2 p-1">
                   <img src={product?.productImage} alt=" " className="w-[80%] h-[80%] md:w-[25%] md:h-[60%] object-contain" />
                   <p className="text-[12px] md:text-xl">{product?.productName}</p>
            </div>
            <div className="w-1/4 h-full  flex items-center justify-center">
                <p className="text-[12px] md:text-xl">{product?.productPrice}$</p>
            </div>
            <div className="w-1/4 h-full flex items-center justify-center">
                <div className="w-[80%] h-[50%] md:w-[60%] md:h-[60%]  flex border-slate-200 border-[1px]">
                    <div className='w-[75%] h-full flex items-center justify-center'>
                        <p className='w-fit h-fit text-[12px] md:text-xl'>{`${counters[index]}`.padStart(2,0)}</p>
                    </div>
                    <div className='w-[25%] h-full flex flex-col justify-center pr-2 gap-1'>
                        <IoIosArrowUp  className="text-[12px] md:text-xl hover:bg-slate-200" 
                        onClick={()=>{                          
                          handleIncrement(index,product.quantity);
                        }}
                        />
                        <IoIosArrowDown className="text-[12px] md:text-xl hover:bg-slate-200 " onClick={()=>{handleDecrement(index)}}/>
                    </div>
                </div>
            </div>
            <div className="w-1/4 h-full  flex items-center justify-center">
               <p className="text-[12px] md:text-xl">{counters[index]*product?.productPrice}$</p>
            </div>
            <div className="w-fit h-fit ">
               <IoClose className="md:text-xl lg:text-2xl cursor-pointer" onClick={()=>deleteCartProduct(product?._id)}/>
            </div>
            </div>
           )
       })}

      
     <div className="w-full h-fit pt-5 flex justify-between pb-10">
         <button className="text-[12px] font-bold w-fit h-fit border-[1px] border-black px-5 py-3 md:text-lg hover:bg-slate-200" >Return To Shop</button>
         <button className="text-[12px] font-bold w-fit h-fit border-[1px] border-black px-5 py-3 md:text-lg hover:bg-slate-200" onClick={()=>updateCart()} >Update Cart</button>
     </div>
     <div className="w-full h-[300px] flex items-center justify-end ">
         <div className="w-[80%] md:w-[40%] lg:w-[35%] h-[90%] md:h-[90%] border-[1px] border-black p-5 flex flex-col gap-5">
             <p className="text-[15px] text-bold md:text-xl">Cart Total</p>
             <div className="w-full h-fit flex flex-col gap-3">
             <div className="w-full h-fit flex justify-between border-b-[1px] pb-1 border-black">
                <p className="w-fit h-fit text-[12px] md:text-xl">Subtotal:</p>
                <p className="w-fit h-fit text-[12px] md:text-xl">{subtotal}$</p>
             </div> 
             <div className="w-full h-fit flex justify-between border-b-[1px] pb-1 border-black">
                <p className="w-fit h-fit text-[12px] md:text-xl">Shipping:</p>
                <p className="w-fit h-fit text-[12px] md:text-xl">Free</p>
             </div> 
             <div className="w-full h-fit flex justify-between  pb-1 ">
                <p className="w-fit h-fit text-[12px] md:text-xl">Total:</p>
                <p className="w-fit h-fit text-[12px] md:text-xl">{subtotal}$</p>
             </div> 
             <Link href="/CheckOut" className="w-fit h-fit bg-[#DB4444] hover:bg-red-700 text-[12px] md:text-lg  font-bold text-white px-6 py-3" >Process to checkout</Link>
             </div>
             
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
  )
}







const page = () => {
  const route=useRouter();
  const userType=useSelector(state=>state.user.userType);
  useEffect(()=>{
    if(userType=="admin"){
      route.push("/");
    }
    
  })
  return (
    <div className='w-full min-h-screen mt-[100px] pl-2 pr-2'>
      <div className='w-full h-fit pt-1 text-sm flex items-start gap-1 md:text-lg '>
          <Link className='w-fit h-fit text-[#7D8184]' href="/" >Home /</Link>
          <p className='w-fit h-fit'  >Cart</p>
      </div>
      <div className='cartProducts w-full h-fit'>
        <div className='w-full h-fit text-[12px] mt-5 font-bold flex justify-between items-center pr-1 md:text-xl'>
           <p className="w-1/4 flex justify-start ">Product</p>
           <p className="w-1/4 flex justify-center ">Price</p>
           <p className="w-1/4 flex justify-center ">Quantity</p>
           <p className="w-1/4 flex justify-center ">Subtotal</p>
        </div>
      </div>
      <CartProduct/>
    </div>
  )
}

export default page
