import React from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'

function SelectAuthenticatedUser({setOpenModal}) {
  return (
    <div className=' fixed top-0 left-0 w-full h-screen z-10 bg-[rgba(0,0,0,0.4)] '>
            <div className='bg-[#fefefe] mx-auto rounded-lg my-[5%] m max-w-xs md:max-w-[700px] p-5 md:p-20 border-none outline-none'>
                <h3 className='font-bold text-xl mb-2'>Authenticate Users</h3>
                <p>Input the user's Passcoder ID below</p>

                <label className='flex flex-col mt-5'>
                    <span>Passcode ID</span>
                    <input type="text" name='id' className='border px-2 py-1 rounded-md border-solid border-slate-300' value="PID" />
                </label>

                <button setOpenModal={setOpenModal} className='ml-auto mt-10 rounded-md flex items-center gap-2 bg-purple text-white p-2'>Continue <MdKeyboardArrowLeft/></button>

            </div>
        </div>
  )
}

export default SelectAuthenticatedUser
