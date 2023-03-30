import React from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'

function AuthenticateUser({setOpenModal}) {
  return (
    <div className=' fixed top-0 left-0 w-full h-screen z-10 bg-[rgba(0,0,0,0.4)] '>
            <div className='bg-[#fefefe] mx-auto rounded-lg my-[5%] m max-w-xs md:max-w-[700px] p-5 md:p-20 border-none outline-none'>
                <h3 className='font-bold text-xl mb-2'>Authenticate Users</h3>
                <p>Select offer user will be authenticated for:</p>

                <div className='text-xs md:text-base'>
                    <p className='rounded-md p-2 w-full md:w-10/12 border border-solid border-slate-300 mt-2'>25% Discount - Buy 4 pairs of shoes, get 25% discount</p>
                    <p className='rounded-md p-2 w-full md:w-10/12 border border-solid border-slate-300 mt-2'>25% Discount - Buy 4 pairs of shoes, get 25% discount</p>
                    <p className='rounded-md p-2 w-full md:w-10/12 border border-solid border-slate-300 mt-2'>25% Discount - Buy 4 pairs of shoes, get 25% discount</p>
                    <p className='rounded-md p-2 w-full md:w-10/12 border border-solid border-slate-300 mt-2'>25% Discount - Buy 4 pairs of shoes, get 25% discount</p>
                </div>

                <button setOpenModal={setOpenModal} className='ml-auto mt-10 rounded-md flex items-center gap-2 bg-purple text-white p-2'>Continue <MdKeyboardArrowLeft/></button>

            </div>
        </div>
  )
}

export default AuthenticateUser