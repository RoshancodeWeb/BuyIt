import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen  flex items-center justify-center'>
        <div className='w-fit h-fit '>
        <video className='w-auto h-auto  ' autoPlay loop  muted>
            <source src='/loading-anim/loading.webm' type='video/webm' />
        </video>
        <p className='text-[#EE332D]'>Loading,Please Wait....</p>
        </div>
        

    </div>
  )
}

export default Loading