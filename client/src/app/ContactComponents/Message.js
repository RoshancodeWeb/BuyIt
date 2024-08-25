"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast,Zoom } from 'react-toastify';


const Message = () => {
    const {register,formState:{errors},handleSubmit,reset}=useForm();
    
    const submit = async (data) => {
     try {
     
       const response = await fetch(`/api/contact`,{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
      });
       const dataComing = await response.json();
       if(dataComing.success){
          reset();
          toast.success(`Message Sended,Will Be Contacted Soon`, {
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
       }else{
          toast.warn(`Some Problem Occured`, {
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
       }
       
     } catch (error) {
          toast.warn(`Some Problem Occured`, {
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
     }
   };
   
    return (
        <div className='md:w-[50%] w-full min-h-fit pl-5'>
          <p className='w-full h-fit font-bold text-lg pt-5 lg:text-xl'>Contact Us</p>  
             <form  noValidate onSubmit={handleSubmit(submit)}  className='w-full  h-fit pl-2 flex flex-col gap-5'>
    
                 <div className='w-full h-fit pt-2 flex flex-col items-start'>
                      <label for="name">Name:</label>
                      <div className='w-full h-fit flex gap-1'>
                              <input id='name' type='text' className='w-[90%] outline-none rounded text-sm py-2 px-2 border-2' placeholder='Enter Your Name'  {...register("name",{
                                   required:"*"
                              })}/>
                              <p className='w-fit h-fit text-red-600'>{errors.name?.message}</p>
                      </div>
                     
                 </div>
    
                 <div className='w-full h-fit  flex flex-col items-start'>
                      <label for="email">Email:</label>
                      <div className='w-full h-fit flex gap-1 '>
                              <input id="email" type='text' className='w-[90%] outline-none rounded text-sm py-2 px-2 border-2' placeholder='Enter Your Email' {...register("email",{
                                   required:"*"
                              })}/>
                              <p className='w-fit h-fit text-red-600'>{errors.email?.message}</p>
                      </div>
                     
                 </div>
    
                 <div className='w-full h-fit  flex flex-col items-start'>
                      <label for="mobile">Mobile No:</label>
                      <div className='w-full h-fit flex gap-1'>
                              <input id='mobile' type='text' className='w-[90%] outline-none rounded text-sm py-2 px-2 border-2' placeholder='Enter Your Mobile' {...register("mobile",{
                                   required:"*"
                              })}/>
                              <p className='w-fit h-fit text-red-600'>{errors.mobile?.message}</p>
                      </div>
                     
                 </div>
    
                 <div className='w-full h-fit  flex flex-col items-start '>
                      <label for="message">Message:</label>
                      <div className='w-full h-fit flex gap-1'>
                              <textarea  id='message' name='comment' className='w-[90%] h-[20vh] lg:h-[140px] resize-none outline-none rounded text-sm py-2 px-2 border-2 ' placeholder='Enter Your Message' {...register("message",{
                                   required:"*"
                              })} ></textarea>
                              <p className='w-fit h-fit text-red-600'>{errors.message?.message}</p>
                      </div>
                     
                 </div>
                 
                 <input type='submit' value="Send Message" className='w-fit h-fit cursor-pointer mb-5 px-5 py-4 font-bold bg-[#DB4444] text-white rounded-lg hover:scale-105 transition-transform duration-300' />
                 
             </form>
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

export default Message
