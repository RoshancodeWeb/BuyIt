import React from 'react'
import Info from '../ContactComponents/Info'
import Link from 'next/link'
import Message from '../ContactComponents/Message'

const page = () => {
  return (
    <div className='w-full min-h-screen mt-[100px]  pl-2 pr-2'>
         <div className='w-full h-fit pt-1 text-sm flex items-start gap-1 md:text-lg '>
          <Link className='w-fit h-fit text-[#7D8184]' href="/" >Home /</Link>
          <p className='w-fit h-fit'  >Contact</p>
         </div>
         <div className='w-full h-fit md:flex lg:justify-around'>
             <Info/>
             <Message/>
          </div>
          
    </div>
  )
}

export default page
