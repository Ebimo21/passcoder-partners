import React from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import AuthPagesBase from './components/AuthPagesBase'

function PartnerEmailSent() {
  return (
    <AuthPagesBase>
        <div className='w-[350px] md:w-[400px]'>
            <button  className='p-1 bg-altPurple text-white text-base w-8 rounded-md  '><MdKeyboardArrowLeft size="20px" fontSize="200" fontWeight="800" /></button>
            <h3 className='text-2xl font-bold mt-5'>Check Your Email</h3>
            <p className='mt-2'>We have sent an email with token reset information to n****e@e***e.com.</p>
            <p className='mt-5'>Didn’t receive the email? Check spam or promotion folder</p>

            <div className=' flex flex-col justify-start items-end mt-5'>
                <span className='text-purple font-bold mb-2 '>Resend Email</span>
                <button  className='p-2 bg-altPurple text-white text-sm w-28 rounded-md flex items-center gap-2'>Continue <MdKeyboardArrowRight size="20px"/></button>
            </div>
            
        </div>
    </AuthPagesBase>
  )
}

export default PartnerEmailSent