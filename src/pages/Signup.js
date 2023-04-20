import React, { useReducer, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { lgaList } from '../lga';
import { PartnerSignupRoute } from '../config/apiCalls';
import Arrowright from '../icons/Arrowright';
import Wallet from '../icons/Wallet';
import Error from '../components/modals/Error';
import Congratulations from '../components/modals/Congratulations';
import { all_states } from '../lga';
import jsCookie from "jscookie";

function Signup() {
    const navigate = useNavigate();

    const [params, setParams] = useSearchParams()
    const stripped = params.get('stripped')

    const [loginSuccess, setLoginSuccess] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [successNotification, setSuccessNotification] = useState(false)
    const [errorNotification, setErrorNotification] = useState(false)
    const [notification, setNotification] = useState("")
    const [cityOptions, setCityOptions] = useState([])

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
    const handleSelectStateChange = (e) =>{
        


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
                setCityOptions(lgaList[payload])
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
        setNotification(response)
        console.log(response)
        jsCookie.set({
            name: "login_url", 
            value: response.data.login_url})
        if(response.success){
        setSuccessNotification(true)
        setTimeout(() => {
            navigate(`/signup-success?email=${signupData.email}`);
        }, 4000)
        }else{
        setErrorNotification(true)
        }
    }

    const closeModal =()=>{
        setLoginSuccess(false)
        setLoginError(false)
      }
  return (
    <>
        <div  className=" psc-flip-card xui-max-w-900 xui-w-fluid-100 xui-mt-2 xui-md-mt-none">
        <div className="psc-flip-card-inner xui-w-fluid-100">
            <div className="psc-flip-card-front xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-2-half xui-pb-3 xui-text-black">
                <h2 className="xui-font-sz-125 xui-w-fluid-80">Sign Up  for Passscoder Business</h2>
                {/* <p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">Already have an account? <span className="psc-text">Sign In</span></p> */}
                <p className="xui-font-sz-80 xui-my-2"><span className="xui-opacity-7">Already have an account?</span> <Link to={`${stripped ? "/access/" +stripped: "#"}`} className="xui-font-w-bold psc-text xui-text-dc-none">Use your private access url</Link></p>
                <form className="xui-form xui-mt--1" onSubmit={handleSignup}>
                    <div className=" xui-form-box xui-w-fluid-100 xui-lg-w-fluid-100">
                        <label>Business Name</label>
                        <div className="xui-d-flex xui-flex-ai-center">
                            <input
                                onChange={(e)=>dispatch({type: SIGNUPACTION.NAME, payload: e.target.value})} 
                                type="text" 
                                name="name" 
                                minLength ={3}
                                maxLength={50}
                                placeholder="Enter Business Name"
                                required 
                                style={{width: "calc(100%)"}}
                                />
                        </div>
                    </div>
                    <div className=" xui-form-box xui-w-fluid-100 xui-lg-w-fluid-100 xui-mt--1">
                        <label>Business Email</label>
                        <div className="xui-d-flex xui-flex-ai-center">
                            <input
                                onChange={(e)=>dispatch({type: SIGNUPACTION.EMAIL, payload: e.target.value})} 
                                type="email" 
                                name="email" 
                                placeholder="Enter Email"
                                required 
                                style={{width: "calc(100%)"}}/>
                        </div>
                    </div>
                    <div className="xui-form-box xui-w-fluid-100 xui-lg-w-fluid-100 xui-mt--1">
                        <label>Description</label>
                        <div className="xui-d-flex xui-flex-ai-center">
                            <textarea 
                            onChange={(e)=>dispatch({type: SIGNUPACTION.DESCRIPTION, payload: e.target.value} )} 
                            cols="2" 
                            rows="2" 
                            name='description' 
                            placeholder='Tell us what your business is all about.'
                            minLength={3}
                            maxLength={500}
                            required ></textarea>
                        </div>
                    </div>
                    <div className='xui-mt--3' style={
                        {
                            display: "flex",
                            gap: "10px"
                            
                        }
                    }>
                    <div className='xui-d-grid xui-grid-col-1 xui-lg-grid-col-3 xui-md-grid-col-3 xui-grid-gap-1 xui-w-fluid-100'>
                    <div className=" xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60 ">
                        <label>Country</label>
                        <div className="xui-d-flex xui-flex-ai-center">
                        <select
                            onChange={(e)=>dispatch({type: SIGNUPACTION.COUNTRY, payload: e.target.value} )} 
                            className=' p-2 border border-solid border-slate-400 block w-40 outline-none rounded-md '
                            required
                            name="country"
                            >
                            <option defaultValue>Select Country</option>
                            <option >Nigeria</option>
                        </select>
                        </div>
                    </div>
                    <div
                    style={
                        {}
                    } className=" xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60 xui-mt--1 xui-lg-mt-2">
                        <label>State</label>
                        <div className="xui-d-flex xui-flex-ai-center">
                        <select
                                onChange={(e)=>dispatch({type: SIGNUPACTION.STATE, payload: e.target.value} )} 
                                className=' p-2 border border-solid border-slate-400 block w-full outline-none rounded-md ' 
                                // onChange={handleSelectStateChange}
                                >
                                {all_states?.map((item, index)=>{
                                    return(
                                        <option>{item}</option>
                                        // <options>{item}</options>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className=" xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60 xui-mt--1 xui-lg-mt-2">
                        <label>City</label>
                        <div className="xui-d-flex xui-flex-ai-center">
                        <select
                            onChange={(e)=>dispatch({type: SIGNUPACTION.CITY, payload: e.target.value} )}
                            className=' p-2 border border-solid border-slate-400 block w-32 outline-none rounded-md ' 
                            name='city'
                            required>
                            {cityOptions.map((item, index)=>{
                                return (
                                    <option key={index} value={item}>{item}</option>
                                )
                            })}
                        </select>
                        </div>
                    </div>
                    </div>
                    
                    </div>

                    <div className='flex items-center gap-3'>
                        <input type='checkbox' required />
                        <p>By signing up you agree to our <Link to="#">terms and conditions</Link> </p>
                    </div>
                    
                    <div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
                        <button  className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                            <span className="xui-mr-half">Get Access</span>
                            <Arrowright width="12" height="12" />
                        </button>
                    </div>
                </form>
                
            </div>
            
        </div>
    </div>
    {errorNotification && <Error 
    lead={notification.message} 
    sub={notification.data.data}
    show={errorNotification}
    onClose={()=>setErrorNotification(false)} 
    />}
    {successNotification && <Congratulations 
    lead={notification.message} 
    show={successNotification}
    onClose={()=>setSuccessNotification(false)}
  />}
        </>
  )
}

export default Signup
