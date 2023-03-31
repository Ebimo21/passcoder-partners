import React, { useState, } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import AuthPagesBase from './components/AuthPagesBase'
import {FaDatabase} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { PartnerLoginEmail } from './config/apiCalls'
import Error from './modal/Error'
import Congratulations from './modal/Congratulations'


function SignInWelcome() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [stripped, setStripped] = useState("aria-brown-apapa-lagos")

  const [successNotification, setSuccessNotification] = useState(false)
  const [errorNotification, setErrorNotification] = useState(false)
  const [ notification, setNotification] = useState("")
  
  const handleLogin=async(e)=>{
    e.preventDefault()
    const response = await PartnerLoginEmail(email, stripped)
    console.log(response)
    if(response.success){
      setNotification(response.message)
      setSuccessNotification(true)
      // setTimeout(() => {
      //   navigate("/partners-dashboard");
      // }, 3000);
    }else{
      setNotification(response.message)
      setErrorNotification(true)
    }

  }

  return (
    <AuthPagesBase>
      <h3 className='text-2xl font-bold'>Welcome back, <span className='text-purple font-bold'>Genesis Cinema</span></h3>
        <p className=''>Securely sign in to your Passcoder partner account</p>
        <p className='mt-5'>Don’t have an account, <span onClick={()=>navigate("/partners-signup")} className='text-purple font-semibold cursor-pointer'>Sign up</span></p>

        <form onSubmit={handleLogin} className='mt-10 md:mt-20'>
            <label>Email Address</label>
            <input 
              name="email" 
              type="email" 
              className='border-b border-b-solid border-b-slate-500 block w-full outline-none'
              value={email}
              required
              onChange={(e)=>setEmail(e.target.value)}  />
 
            <div className=' flex flex-col items-end mt-5'>
              <span onClick={()=>navigate("/partners-reset-token")} className='text-purple font-semibold mb-6'>Forgot Token?</span>
              <button  className='p-2 bg-altPurple text-white text-sm w-24 h-30 rounded-md flex justify-center items-center gap-2 '>Next <MdKeyboardArrowRight fontWeight="200"/> </button>
            </div>
        </form>

        <div className='flex items-center gap-5 my-4'>
          <hr className='w-2/6 grow'  /> <span className='w-1/6 text-center'>or </span> <hr className='w-2/6 grow'  />
        </div>

        <button onClick={()=>navigate("/partners-signin")} className='flex items-center justify-center gap-10 p-2 mt-4 bg-black text-white w-full rounded-2xl'><FaDatabase /> Sign in via Token</button>

      <Error 
        lead={notification} 
        sub={[]}
        show={errorNotification}
        onClose={()=>setErrorNotification(false)}    />

      <Congratulations 
          lead={notification}
          show={successNotification}
          onClose={()=>setSuccessNotification(false)}  />

    </AuthPagesBase>
  )
}

export default SignInWelcome
