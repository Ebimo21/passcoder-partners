import React, {useState} from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import AuthPagesBase from './components/AuthPagesBase'
import { useNavigate } from 'react-router-dom'
import { PartnerResetOtp } from './config/apiCalls'
import Error from './modal/Error'
import Congratulations from './modal/Congratulations'


function PartnerResetToken() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [successNotification, setSuccessNotification] = useState(false)
    const [errorNotification, setErrorNotification]= useState(false)
    const [notification, setNotification] = useState("")
  
  const handleResetToken = async(e)=>{
    e.preventDefault()
    const response = await PartnerResetOtp (email)
    console.log(response)
    if(response.success){
      setSuccessNotification(prev=>true)
  }else{
      setErrorNotification(prev=>true)
  }
  setNotification(response)

  }
  return (
    <AuthPagesBase>
        <div className='w-[350px] md:w-[400px]'>
            <button  className='p-1 bg-altPurple text-white text-base w-8 rounded-md  '><MdKeyboardArrowLeft size="20px" fontSize="200" fontWeight="800" /></button>
            <h3 className='text-2xl font-bold mt-5'>Reset Token</h3>
            <p className='mt-2'>Don’t have an account, <span onClick={()=>navigate("/partners-signup")} className='text-purple cursor-pointer font-semibold'>Sign up</span></p>

            <form onSubmit={handleResetToken} className='mt-10 md:mt-20'>
                <label>Email Address</label>
                <input 
                  name="email" 
                  type="email" 
                  className='mt-3 border-b border-b-solid border-b-slate-500 block w-full outline-none'
                  onChange={(e)=>setEmail(e.target.value)}
                    />

                <div className=' flex flex-col gap-2 items-end justify-end mt-5'>
                <span className='text-pink'>Go back to <span onClick={()=>navigate("/partners-signin")} className="text-purple font-semibold cursor-pointer">Sign In</span> </span>
                <button  className='p-2 bg-altPurple text-white text-sm w-28 rounded-md flex items-center justify-center gap-2 '><span>Continue</span> <MdKeyboardArrowRight size="20px" /></button>
                </div>
            </form>
        </div>

        <Error 
        lead={notification?.message} 
        sub={notification?.data}
        show={errorNotification}
        onClose={()=>setErrorNotification(false)} 
        />
      <Congratulations 
        lead={notification?.message} 
        show={successNotification}
        onClose={()=>setSuccessNotification(false)}
      />
    </AuthPagesBase>
  )
}

export default PartnerResetToken