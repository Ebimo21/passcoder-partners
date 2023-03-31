import React, { useEffect, useReducer, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import AuthPagesBase from './components/AuthPagesBase'
import {FaDatabase} from 'react-icons/fa'
import Congratulations from "./modal/Congratulations"
import Error from "./modal/Error"
import { PartnerAccessDetails, PartnerLoginEmail, PartnerLoginToken } from './config/apiCalls'
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'

function SignIn() {
  const navigate = useNavigate()
  const params = useParams()
  
  const [details, setdetails] = useState("")
  const [successNotification, setSuccessNotification] = useState(false)
  const [errorNotification, setErrorNotification] = useState(false)
  const [notification, setNotification] = useState("")
  const [signInWithEmail, setSignInWithEmail] = useState(false)
  const [signInWithToken, setSignInWithToken] = useState(true)
  const [email, setEmail] = useState("")

  const handleSignInToggle = ()=>{
    setSignInWithToken(prev=>!prev)
    setSignInWithEmail(prev=>!prev)
  }
  const FORMACTION ={
    ROLE: "role",
    TOKEN: "token"
  }
  const initialState = {
    role: "ADMIN",
    token: ""
  }
  const reducer= (state, action) =>{
    const {type, payload} = action
    switch(type){
      case FORMACTION.ROLE:
        return{...state, role: payload}
      case FORMACTION.TOKEN:
        return{...state, token: payload}
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleEmailLogin=async(e)=>{
    e.preventDefault()
    const response = await PartnerLoginEmail(email, params.stripped)
    setNotification(response.message)
    if(response.success){
      setSuccessNotification(true)
      setTimeout(() => {
        navigate("/partners-otp");
      }, 4000);
    }else{
      setErrorNotification(true)
    }
  }

  const handleSignIn=async(e)=>{
    e.preventDefault()
    const result =await PartnerLoginToken(state, params.stripped)
    setNotification(result.message)
    if(result.success){
      setSuccessNotification(true)
      setTimeout(() => {
        navigate("/partners-dashboard");
      }, 4000)
    }else{
      setErrorNotification(true)
    }
  }
  useEffect(()=>{
    async function getAccessDetails (){
      const response = await PartnerAccessDetails(params.stripped)
      setdetails(response.data)
    }
    getAccessDetails()
  },[signInWithEmail, signInWithToken])

  return (
    <AuthPagesBase>
      <div className='w-[300px] md:w-[400px]'>
      
        {signInWithToken && 
          <SignInWithToken
            dispatch={dispatch}
            FORMACTION={FORMACTION}
            toggle={handleSignInToggle}
            login={handleSignIn}
            navigate={navigate}
            business={details?.name}
            />}
        {signInWithEmail && 
          <SignInWithEmail 
            navigate={navigate}
            setEmail={setEmail}
            email={email}
            login={handleEmailLogin}
            business={details?.name}
            toggle={handleSignInToggle}
            />}
      </div>

      <Error 
        lead={notification} 
        sub={""}
        show={errorNotification}
        onClose={()=>setErrorNotification(false)} 
        />
      <Congratulations 
        lead={notification} 
        show={successNotification}
        onClose={()=>setSuccessNotification(false)}
      />
    </AuthPagesBase>
  )
}

export default SignIn


const SignInWithEmail = ({toggle, business, login, setEmail, email, navigate}) =>{
  return(
    <>
    <h3 className='text-2xl font-bold'>Welcome back, <span className='text-purple font-bold'>{business}</span></h3>
        <p className=''>Securely sign in to your Passcoder partner account</p>
        <p className='mt-5'>Don’t have an account, <span onClick={()=>navigate("/partners-signup")} className='text-purple font-semibold cursor-pointer'>Sign up</span></p>

        <form onSubmit={login} className='mt-10 md:mt-20'>
            <label>Email Address</label>
            <input 
              name="email" 
              type="email" 
              className='border-b border-b-solid border-b-slate-500 block w-full outline-none'
              defaultValue={email}
              onChange={(e)=>setEmail(e.target.value)}  />
 
            <div className=' flex flex-col items-end mt-5'>
              <span onClick={()=>navigate("/partners-reset-token")} className='text-purple font-semibold mb-6'>Forgot Token?</span>
              <button  className='p-2 bg-altPurple text-white text-sm w-24 h-30 rounded-md flex justify-center items-center gap-2 '>Next <MdKeyboardArrowRight fontWeight="200"/> </button>
            </div>
        </form>

        <div className='flex items-center gap-5 my-4'>
          <hr className='w-2/6 grow'  /> <span className='w-1/6 text-center'>or </span> <hr className='w-2/6 grow'  />
        </div>

        <button onClick={()=>toggle()} className='flex items-center justify-center gap-10 p-2 mt-4 bg-black text-white w-full rounded-2xl'><FaDatabase /> Sign in via Token</button>

    </>
  )
}

const SignInWithToken = ({ dispatch, FORMACTION, business, toggle, login, navigate}) =>{

  
  
  return (
    <>
    <h3 className='text-2xl font-bold mb-2'>Sign In, <span className='text-purple font-bold'>{business}</span></h3>
        <p>Don’t have an account, <span onClick={()=>navigate("/partners-signup")} className='cursor-pointer text-purple font-semibold'>Sign up</span></p>

        <form onSubmit={login} className='mt-10 md:mt-14'>
            <label>Role</label>
            <select name='role' 
              onChange={(e)=>dispatch({type: FORMACTION.ROLE, payload: e.target.value})} 
              className='mb-10 mt-2 border-b border-b-solid border-b-slate-500 block w-full outline-none'
              required>
                <option defaultValue>ADMIN</option>
                <option >USER</option>
            </select>

            <label>Token</label>
            <input 
              onChange={(e)=>dispatch({type: FORMACTION.TOKEN, payload: e.target.value})}
              name="token" 
              type="text" 
              className='border-b border-b-solid border-b-slate-500 block w-full outline-none'
              required  />
 
            <div className=' flex flex-col items-end mt-5'>
              <span onClick={()=>navigate("/partners-reset-token")} className='cursor-pointer text-pink text-xs text-purple font-semibold mb-6'>Forgot Token?</span>
              <button className='p-2 bg-altPurple text-white text-sm w-24 h-30 rounded-md flex justify-center items-center gap-2 '>Next <MdKeyboardArrowRight fontWeight="200"/> </button>
            </div>
        </form>

        <div className='flex items-center gap-5 my-4'>
          <hr className='w-2/6 grow'  /> <span className='w-1/6 text-center'>or </span> <hr className='w-2/6 grow'  />
        </div>

        <button onClick={()=>toggle()} className='flex items-center justify-center gap-10 p-2 mt-4 bg-black text-white w-full rounded-md'><FaDatabase /> Sign in via Email</button>
    </>
  )
}
