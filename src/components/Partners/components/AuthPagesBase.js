import React from 'react'
import logo from "../assets/partner-logo.png"


function AuthPagesBase({children, innerStyle}) {
  return (
    <div className='signin-bg md:p-24  h-screen flex flex-col md:flex-row gap-5 items-center  md:justify-between'>
      <div className='mt-20 md:mt-0'>
        <img className='w-[80px] h-[90px]' src={logo} alt='passcoder partner logo' />
      </div>
      <div className={`bg-white mx-4 text-sm p-5 md:px-16 md:py-16 rounded-md ${innerStyle} `}>
        {children}
        </div>
    </div>
  )
}

export default AuthPagesBase
