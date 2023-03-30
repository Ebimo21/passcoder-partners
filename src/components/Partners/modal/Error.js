import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import errorImage from "../assets/error.png"

function Error({lead, sub, show, onClose}) {

  if(!show) {return null}

  return (
    <div>
         <div onClick={onClose} className=' flex justify-center items-center fixed top-0 left-0 w-full h-screen z-10 bg-[rgba(0,0,0,0.4)] text-center'>
            <div onClick={e => e.stopPropagation()} className='wavebg w-[1000px] relative bg-[#fefefe] mx-auto rounded-lg my-[5%] m max-w-xs md:max-w-[500px] p-5 border-none outline-none'>
                <div>
                    <img width={200} className="block mt-10 mx-auto"  src={errorImage} alt="" />
                </div>
                <p className='font-bold mt-5'>{lead}</p>
                <p className='text-xs text-[#868585] font-thin mt-2'>{sub?.length >0 ?sub?.map((item, index)=>{return <span key={index}>{item?.msg + ", "}</span> }): ""}</p>

                <div className=' flex flex-col items-end mt-5'>
                    <button onClick={onClose} className='p-2 bg-altPurple text-white text-base w-28 h-30 rounded-md flex justify-center items-center gap-2 '>Go back <MdKeyboardArrowRight size="20px" /> </button>
                </div>
                
            </div>
            
        </div>
        
    </div>
  )
}

export default Error