import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import binImage from "../assets/binImage.png"

function ConfirmDelete({lead}) {
  return (
    <div>
         <div className=' flex justify-center items-center fixed top-0 left-0 w-full h-screen z-10 bg-[rgba(0,0,0,0.4)] text-center'>
            <div className='w-[1000px] relative bg-[#fefefe] mx-auto rounded-lg my-[5%] m max-w-xs md:max-w-[500px] p-5 border-none outline-none'>
                <p className='font-bold mt-5'>{lead}</p>
                <div>
                    <img width={200} className="block mt-2 mx-auto"  src={binImage} alt="" />
                </div>

                <div className=' flex justify-between items-center m-auto w-64 mt-5'>
                    <button className='p-2 border border-solid border-purple text-purple text-base w-24 h-30 rounded-md flex justify-center items-center gap-2 '>Cancel </button>
                    <button className='p-2 bg-altPurple text-white text-base w-24 h-30 rounded-md flex justify-center items-center gap-2 '>Yes <MdKeyboardArrowRight size="20px" /> </button>
                </div>
                
            </div>
            
        </div>
        
    </div>
  )
}

export default ConfirmDelete
