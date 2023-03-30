import React from 'react'
import success from '../assets/success.png'

function Congratulations({lead, sub, show, onClose}) {
  if(!show) {return null}

  return (
    <div 
      onClick={onClose} 
      className='flex justify-center items-center fixed top-0 left-0 w-full h-screen z-10 bg-[rgba(0,0,0,0.4)] text-center'>
        <div 
          onClick={e => e.stopPropagation()} 
          className='bg-[#fefefe] mx-auto rounded-lg my-[5%] m max-w-xs md:max-w-[500px] p-5 border-none outline-none'>
            <div>
                <img width={200} className="m-auto block"  src={success} />
            </div>
            <p className='font-bold'>{lead}</p>
            <p className='text-xs text-[#868585] font-thin mt-3'>{sub}</p>
        </div>
    </div>
  )
}

export default Congratulations