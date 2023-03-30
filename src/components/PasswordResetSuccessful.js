import React from 'react'
import { useNavigate } from 'react-router-dom'

export const PasswordResetSuccessful = () => {

  const navigate = useNavigate()
  return (
    <div  style={{justifyContent:'center', display:'flex', flexDirection:'column',alignItems:'center', }}className='max-w-[700px] mx-auto mt-32 my-16 p-4 ' >
        <h1 className='text-2xl font-bold py-2  mt-2' >
          Password Reset Successful
        </h1>
        <p className='py-2' >  Please Check your mail for a Reset link</p>
      <br/>
          <button
          onClick={(e)=>{
            navigate('/')
          }} className='border border-blue-500 bg-[#292482] hover:bg-blue-500 w-80 p-4 my-2 text-white'>Go Back to Sign In</button>
 

    </div>
  )
}

    