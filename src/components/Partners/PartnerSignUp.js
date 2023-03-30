import React, { useReducer, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import AuthPagesBase from './components/AuthPagesBase'
import { PartnerSignupRoute } from './config/apiCalls'
import {useNavigate} from "react-router-dom"
import Congratulations from './modal/Congratulations'
import Error from './modal/Error'

function PartnerSignUp() {
    const navigate = useNavigate();

    const [loginSuccess, setLoginSuccess] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [ notification, setNotification] = useState("")

    const signupForm ={
        name: "",
        email: "",
        description: "",
        city: "",
        state: "",
        country: "",
    }
    const SIGNUPACTION ={
        NAME: "name",
        EMAIL: "email",
        DESCRIPTION: "description",
        CITY: "city",
        STATE: "state",
        COUNTRY: "country"
    }
    const reducer=(state, action)=>{
        const {type, payload} = action
        switch(type){
            case SIGNUPACTION.NAME:
                return {...state, name: payload}
            case SIGNUPACTION.EMAIL:
                return {...state, email: payload}
            case SIGNUPACTION.DESCRIPTION:
                return {...state, description: payload}
            case SIGNUPACTION.CITY:
                return {...state, city: payload}
            case SIGNUPACTION.STATE:
                return {...state, state: payload}
            case SIGNUPACTION.COUNTRY:
                return {...state, country: payload}
            default:
                return state
        }
    }
    const [signupData, dispatch] = useReducer(reducer, signupForm)

    const handleSignup = async(e)=>{
        e.preventDefault()
        const response = await PartnerSignupRoute(signupData)
        console.log(response)

        if(response.success){
            setNotification(response.message)
            setLoginSuccess(true)
            setTimeout(() => {
              navigate("/partners-signin");
            }, 4000);
          }else{
            setNotification(response.message)
            setLoginError(true)
          }
    }

    const closeModal =()=>{
        setLoginSuccess(false)
        setLoginError(false)
      }

  return (
    <AuthPagesBase>
        <div  className='w-[350px] md:w-[450px] md:mr-10'>
            <h2 className='font-semibold text-3xl mb-1'>Sign up</h2>
            <p>Already have an account, <span onClick={()=>navigate("/partners-signin")} className='cursor-pointer  font-semibold text-purple'>Sign In</span></p>

            <form onSubmit={handleSignup} className='mt-4 flex flex-col gap-2'>
                <div className='flex flex-col gap-1'>
                    <label>Business Name</label>
                    <input onChange={(e)=>dispatch({type: SIGNUPACTION.NAME, payload: e.target.value} )} className=' p-2 border border-solid border-slate-400 block w-full outline-none rounded-md ' type="text" name="name" placeholder='Enter Business Name'  />
                </div>
                <div className='flex flex-col gap-1'>
                    <label>Business Email</label>
                    <input onChange={(e)=>dispatch({type: SIGNUPACTION.EMAIL, payload: e.target.value} )} className=' p-2 border border-solid border-slate-400 block w-full outline-none rounded-md ' type="email" name="email" placeholder='Enter Business Email'  />
                </div>
                <div className='flex flex-col gap-1'>
                    <label>Description`</label>
                    <textarea onChange={(e)=>dispatch({type: SIGNUPACTION.DESCRIPTION, payload: e.target.value} )} className='p-2 border border-solid border-slate-400 block w-full outline-none rounded-md ' cols="10" rows="3" name='description' placeholder='Tell us what your business is all about.' ></textarea>
                </div>

                <div className='flex gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label>City</label>
                        <input onChange={(e)=>dispatch({type: SIGNUPACTION.CITY, payload: e.target.value} )} className=' p-2 border border-solid border-slate-400 block w-full outline-none rounded-md ' type="text" name="city" placeholder='City'  />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label>State</label>
                        <input onChange={(e)=>dispatch({type: SIGNUPACTION.STATE, payload: e.target.value} )} className=' p-2 border border-solid border-slate-400 block w-full outline-none rounded-md ' type="text" name="state" placeholder='State'  />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label>Country</label>
                        <input onChange={(e)=>dispatch({type: SIGNUPACTION.COUNTRY, payload: e.target.value} )} className=' p-2 border border-solid border-slate-400 block w-full outline-none rounded-md ' type="text" name="country" placeholder='Country'  />
                    </div>
                </div>
        <div className=' flex flex-col items-end mt-5'>
            <button className='p-2 bg-altPurple text-white text-base w-28 h-30 rounded-md flex justify-center items-center gap-2 '>Continue <MdKeyboardArrowRight size="20px" /> </button>
        </div>
            </form>
        </div>

        {loginError && (
            <Error lead={notification} close={closeModal}    />
        )}

        {loginSuccess && (
            <Congratulations lead={notification}/>
        )}
    </AuthPagesBase>
  )
}

export default PartnerSignUp
