import React from 'react'

const Services = () => {
  return (
    <div className='w-full h-fit md:pt-10 md:pb-10 flex flex-col md:flex-row md:justify-around gap-5 pb-2 pt-2 items-center'>
        <div className='service w-[90%] h-[150px] flex flex-col items-center gap-1 '>
            <img src='./services/delivery.png' className='w-[70px] h-[70px] object-contain'/>
            <p className='font-bold'>FREE AND FAST DELIVERY</p>
            <p className='text-sm font-extralight'>Free delivery for all orders over $140</p>
        </div>
        <div className='service w-[90%] h-[150px] flex flex-col items-center gap-1'>
            <img src='./services/customer.png' className='w-[70px] h-[70px] object-contain'/>
            <p className='font-bold'>24/7 CUSTOMER SERVICE</p>
            <p className='text-sm font-extralight'>Friendly 24/7 customer support</p>
        </div>
        <div className='service w-[90%] h-[150px] flex flex-col items-center gap-1'>
            <img src='./services/moneyback.png' className='w-[70px] h-[70px] object-contain'/>
            <p className='font-bold'>MONEY BACK GUARANTEE</p>
            <p className='text-sm font-extralight'>We return money in 30 days</p>
        </div>
    </div>
  )
}

export default Services
