import React from 'react'

const Info = () => {
  return (
    <div className='w-[98%] md:w-[50%] lg:w-[37%] h-[420px] lg:h-[530px] shadow-sm shadow-black mt-5 mb-10 p-5 lg:pl-'>
       <div className='w-full h-[50%] font-bold flex flex-col gap-5 border-b-2 border-slate-200'>
           <div className='w-full h-fit flex items-center gap-2'>
               <img src='./contact/phone.png' alt='phone' className='w-fit h-fit' /> 
               <p className='md:text-xl'>Call To Us</p>
           </div>
           <div className='w-full h-fit text-sm font-medium flex flex-col gap-5'>
            <p className='lg:text-lg'>We are available 24/7, 7 days a week.</p>
            <p className='lg:text-lg'>Phone: +923211096836</p>
           </div>
       </div>
       <div className='w-full h-[50%] font-bold flex flex-col gap-5 pt-5 '>
           <div className='w-full h-fit flex items-center gap-2'>
               <img src='./contact/mail.png' alt='phone' className='w-fit h-fit' /> 
               <p className='md:text-xl'>Write To PAKISTAN</p>
           </div>
           <div className='w-full h-fit text-sm font-medium flex flex-col gap-5'>
            <p className='lg:text-lg'>{`Fill out our form and we will contact 
            you within 24 hours..`}</p>
            <p className='lg:text-lg'>Email: roshanail7613@gmail.com</p>
            <p className='lg:text-lg'>Email: bsem-f21-188@superior.edu.pk</p>
           </div>
       </div>
    </div>
  )
}

export default Info
