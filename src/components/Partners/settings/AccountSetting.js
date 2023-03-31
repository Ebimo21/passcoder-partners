import jsCookie from 'js-cookie'
import React, {useState, useReducer, useRef} from 'react'
import {BsFillCheckCircleFill} from "react-icons/bs"
import { PartnerUpdateEmail, PartnerUpdateName, PartnerUpdateThreshold } from '../config/apiCalls'
import Congratulations from '../modal/Congratulations'
import Error from '../modal/Error'
import {useNavigate} from "react-router-dom"



function AccountSetting({submit, formElement, partnerDetails, refresh}) {
  const navigate = useNavigate();
  const formEl = useRef()


  const [jwt, setJwt] = useState(jsCookie.get("jwt"))
  const [successNotification, setSuccessNotification] = useState()
    const [errorNotification, setErrorNotification] = useState()
    const [notification, setNotification] = useState("")
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [loginError, setLoginError] = useState(false)

  const handleUpdateEmail =async(e) =>{
    e.preventDefault()
    const email = e.target.elements[0].value
    const response =  await PartnerUpdateEmail(jwt, email)
    
    refresh(prev=>!prev)
    console.log(response)

    if(response.success){
      setSuccessNotification(prev=>true)
  }else{
      setErrorNotification(prev=>true)
  }
  setNotification(response)

    // const response = await 
  }
  const handleUpdateThreshold = async(e)=>{
    e.preventDefault()
    const point_threshold = parseInt(e.target.elements[0].value)
    const response = await PartnerUpdateThreshold(jwt, point_threshold )
    refresh(prev=>!prev)
    if(response.success){
      setSuccessNotification(prev=>true)
  }else{
      setErrorNotification(prev=>true)
  }
  setNotification(response)
  }


  const signupForm ={
    name: "",
    city: "",
    state: "",
    country: "",
}
const SIGNUPACTION ={
    NAME: "name",
    CITY: "city",
    STATE: "state",
    COUNTRY: "country"
}
const reducer=(state, action)=>{
    const {type, payload} = action
    switch(type){
        case SIGNUPACTION.NAME:
          console.log(state)
            return {...state, name: payload}
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

const handleLoop= (e)=>{
  const el = formEl.current.elements
    for(let i=0; i<el?.length; i++){
      dispatch({type: el[i].name, payload: el[i].value})
  }
  console.log(signupData)
}
const handleUpdateBusinessDetails = async(e)=>{
    e.preventDefault()

    
  console.log(signupData)
    const response = await PartnerUpdateName(jwt, signupData)
    console.log(response)

    refresh()
    

    if(response.success){
        setNotification(response)
        setSuccessNotification(true)
        
      }else{
        setNotification(response)
        setErrorNotification(true)
      }
}
  return (
    <>
      <form onSubmit={submit} ref={formElement} >
          <div className='mt-10'>
              <p className='font-medium text-sm mb-2'>Your Profile Picture</p>
              <label className='inline-block' htmlFor="file-input">
                <div className='rounded-full w-20 h-20 overflow-clip'>
                  <img src={partnerDetails?.photo} width={130} height={130} />

                </div>

              </label>
              <input className='hidden' id='file-input' name='file-input' type="file" />
          </div>
          <button className='p-2 rounded-md bg-purple text-white mt-20'>Update Profile</button>

</form>

          <div className='mt-5 flex flex-wrap gap-5 justify-between'>
              
              <div className='basis-full '>
              <p className='font-medium text-sm'>Your Email Address</p>
              {/* <div > */}
              <form className='flex items-center gap-3' onSubmit={handleUpdateEmail}>
                <input 
                  type="email"
                  name='email'
                  required
                  // placeholder='Email'
                  defaultValue={partnerDetails?.email}
                  className='p-2 basis-6/12 text-slate-400  border border-solid border-slate-400  mt-2 outline-none '
                  />
                  <button><BsFillCheckCircleFill size={30} color="#EAEBFB"/></button>
              </form>
              </div>
              {/* </div> */}
              
              
              <div className='basis-full '>
              <p className='font-medium text-sm'>Point Threshold</p>
              <form onSubmit={handleUpdateThreshold} className='flex items-center gap-3'>

                <input 
                  type="number"
                  min={1}
                  required
                  name='point_threshold'
                  defaultValue={partnerDetails?.point_threshold}
                  className='p-2 basis-6/12 text-slate-400 border border-solid border-slate-400  mt-2 outline-none'
                  />
                    <button><BsFillCheckCircleFill  size={30} color="#EAEBFB"/></button>
                </form>
              </div>

              <div className='basis-full'>
              <form onChange={handleLoop} ref={formEl} onSubmit={handleUpdateBusinessDetails}>
                        <div className='flex items-center flex-wrap gap-3'>
                            <label className='basis-full '>Name</label>
                            <input 
                                className="p-2 basis-6/12 text-slate-400 border border-solid border-slate-400  outline-none" 
                                type="text" 
                                name="name"
                                minLength={3}
                                maxLength={50}
                                // onChange={(e)=>dispatch({type: SIGNUPACTION.NAME, payload: e.target.value} )}
                                // onChange={}
                                defaultValue={partnerDetails?.name} 
                                 />

                              <button><BsFillCheckCircleFill  size={30} color="#EAEBFB"/></button>

                        </div>

                        <div className='flex items-center flex-wrap gap-3'>
                                <label className='basis-full '>City</label>
                                <input 
                                  className="p-2 basis-6/12 text-slate-400 border border-solid border-slate-400 outline-none" 
                                  type="text" 
                                  name="city"
                                  disabled
                                  defaultValue={partnerDetails?.city} />
                              <button><BsFillCheckCircleFill  size={30} color="#EAEBFB"/></button>

                        </div>
                        <div className='flex items-center flex-wrap gap-3'>
                                <label className='basis-full '>State</label>
                                <input 
                                  className="p-2 basis-6/12 text-slate-400 border border-solid border-slate-400 outline-none" 
                                  type="text" 
                                  name="state"
                                  disabled
                                  defaultValue={partnerDetails?.state} />
                              <button><BsFillCheckCircleFill  size={30} color="#EAEBFB"/></button>

                               
                        </div>
                        <div className='flex items-center flex-wrap gap-3'>
                                <label className='basis-full '>Country</label>
                                <input 
                                  className="p-2 basis-6/12 text-slate-400 border border-solid border-slate-400 outline-none" 
                                  type="text" 
                                  placeholder="City" 
                                  name="country"
                                  disabled
                                  defaultValue={partnerDetails?.country} />
                              <button><BsFillCheckCircleFill  size={30} color="#EAEBFB"/></button>
                        </div>
                        <button className='py-2 px-4 rounded-md bg-purple text-white mt-10'>Update</button>

                    </form>
              </div>

          </div>
          {successNotification&&<Congratulations 
        lead={notification?.message}
        show={successNotification}
        onClose={()=>setSuccessNotification(false)}  />}
    
    {errorNotification&& <Error 
        lead={notification?.message} 
        sub={notification?.data?.data} 
        show={errorNotification}
        onClose={()=>setErrorNotification(false)} />}
          
    </>
  )
}

export default AccountSetting