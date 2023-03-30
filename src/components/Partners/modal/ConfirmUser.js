import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import {IoMdCheckmarkCircleOutline} from 'react-icons/io'
import img1 from "../assets/dp1.png"


function ConfirmUser({setOpenModal}) {
  return (
    <div className='text-sm md:text-base fixed top-0 left-0 w-full h-screen z-10 bg-[rgba(0,0,0,0.4)] '>
        <div className='bg-[#fefefe] mx-auto rounded-lg my-[5%]  max-w-xs md:max-w-[700px] p-2 md:p-5 border-none outline-none'>
            <h3 className='font-bold text-xl mb-2'>Authenticate Users</h3>
            <p>Confirm User</p>

            <div className='flex flex-col items-center justify-center mt-20 gap-2'>
                <img src={img1} width={100} />
                <p>Ada James Hannoy</p>
                <p>PID: <strong>1234567890</strong></p>
                <span className='flex justify-center gap-2'>
                    <AiFillStar color='yellow'/>
                    <AiFillStar color='yellow'/>
                    <AiFillStar color='yellow'/>
                    <AiFillStar color='yellow'/>
                    <AiFillStar color='yellow'/>
                </span>
                <p className='flex items-center gap-2'><IoMdCheckmarkCircleOutline size={24} color="green"/>You have authenticated this user before!</p>
                <p className='flex gap-4 items-center'><span>Total Points: <strong>777</strong></span> <span>Points with you: <strong>19</strong></span></p>
            </div>

            <div className='flex justify-end gap-4'>
            <button setOpenModal={setOpenModal} className=' mt-10 rounded-md flex items-center bg-white p-2 border-solid border border-slate-300'>Back</button>
            <button setOpenModal={setOpenModal} className=' mt-10 rounded-md flex items-center gap-2 bg-purple text-white p-2'>Confirm user <MdKeyboardArrowLeft/></button>
            </div>

        </div>
    </div>
  )
}

export default ConfirmUser
