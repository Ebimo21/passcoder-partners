import React from 'react'
import success from './assets/success.png'


function SuccessModal({setOpenModal, openModal}) {
  return (
    <div className='flex justify-center items-center fixed top-0 left-0 w-full h-screen z-10 bg-[rgba(0,0,0,0.4)] text-center'>
        <div className='bg-[#fefefe] mx-auto rounded-lg my-[5%] m max-w-xs md:max-w-[500px] p-20 border-none outline-none'>
            <div>
                <img width={200} className="m-auto block"  src={success} />
            </div>
            <p className='font-bold'>Congratulations</p>
            <p className='text-xs text-[#868585] font-thin'>You have successfully completed your Bio Data</p>
            <button onClick={()=>setOpenModal(!openModal)} className='p-10 py-2 border text-mainColor border-mainColor border-solid mt-10'>Continue</button>
        </div>
    </div>
  )
}

export default SuccessModal