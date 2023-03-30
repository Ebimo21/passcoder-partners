import React from 'react'
import AuthPagesBase from './components/AuthPagesBase'
import successful from "./assets/reset-successful.png"
import { useNavigate } from 'react-router-dom'

function PartnerResetSuccesful() {
  const navigate =useNavigate()
  return (
    <AuthPagesBase>
        <div className='w-[350px] md:w-[400px] flex flex-col justify-center items-center gap-4 mt-20'>
            <img src={successful} width="60px" />
            <p className='font-semibold text-xl'>Token reset successful</p>
        </div>
        <div className='flex justify-end mt-14'>
        <span className='text-pink mb-6 inline-block ml-auto mt-5'>Go back to <span onClick={()=>navigate("/partners-signup")} className="text-purple cursor-pointer font-semibold">Sign In</span> </span>

        </div>

    </AuthPagesBase>
  )
}

export default PartnerResetSuccesful
