import React from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import logo from "../assets/partner-logo.png"


function AuthPagesBase({children, innerStyle}) {
  return (
    <div className='signin-bg md:p-24  h-screen flex flex-col md:flex-row gap-5 items-center  md:justify-between'>
      <div className='mt-20 md:mt-0'>
        <img className='w-[80px] h-[90px]' src={logo} alt='passcoder partner logo' />
      </div>
      <div className={`bg-white mx-4 text-sm p-5 md:px-16 md:py-16 rounded-md ${innerStyle} `}>
        {children}
        {/* <h3 className='text-2xl font-bold'>Welcome back <span className='text-purple font-bold'>Genesis Cinema</span></h3>
        <p className=''>Securely sign in to your Passcoder partner account</p>
        <p className='mt-5'>Don’t have an account, <span className='text-purple font-semibold'>Sign up</span></p>

        <form className='mt-10 md:mt-20'>
            <label>Email Address</label>
            <input name="email" type="email" className='border-b border-b-solid border-b-slate-500 block w-full outline-none'  />

            <div className=' flex flex-col justify-end mt-5'>
              <span className='text-pink mb-6'>Forgot Token?</span>
              <button  className='p-2 bg-altPurple text-white text-base w-24 rounded-md flex items-center gap-2 '>Next <MdKeyboardArrowLeft/> </button>
            </div>
        </form>

        <div className='flex items-center gap-5 my-4'>
          <hr className='w-2/6 grow'  /> <span className='w-1/6 text-center'>or </span> <hr className='w-2/6 grow'  />
        </div>

        <button className='p-2 mt-4 bg-black text-white w-full rounded-md'>Sign in via Token</button> */}

      </div>
    </div>
  )
}

export default AuthPagesBase
