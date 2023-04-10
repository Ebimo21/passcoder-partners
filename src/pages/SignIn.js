import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Wallet from "../icons/Wallet";
import Arrowright from "../icons/Arrowright";
import { PartnerAccessDetails, PartnerLoginEmail, PartnerLoginToken } from "../config/apiCalls";
import Congratulations from "../components/modals/Congratulations";
import Error from "../components/modals/Error";

export default function SignIn(){
    const [flipped, setFlipped] = useState(false);
    const flipCard = document.querySelector(".psc-flip-card");
    const flip = () => {
        if(flipped){
            setFlipped(false);
            flipCard.classList.remove("psc-flipped");
          }
          else {
            setFlipped(true);
            flipCard.classList.add("psc-flipped");
          }
    }

    const navigate = useNavigate();
  const params = useParams();
  
  const [details, setdetails] = useState("");
  const [successNotification, setSuccessNotification] = useState(false);
  const [errorNotification, setErrorNotification] = useState(false);
  const [notification, setNotification] = useState("");
  const [signInWithEmail, setSignInWithEmail] = useState(false);
  const [signInWithToken, setSignInWithToken] = useState(true);
  const [email, setEmail] = useState("");

  const handleSignInToggle = ()=>{
    setSignInWithToken(prev=>!prev);
    setSignInWithEmail(prev=>!prev);
  }
  const FORMACTION ={
    ROLE: "role",
    TOKEN: "token",
  }
  const initialState = {
    role: "ADMIN",
    token: "",
  }
  const reducer= (state, action) =>{
    const {type, payload} = action;
    switch(type){
      case FORMACTION.ROLE:
        return{...state, role: payload};
      case FORMACTION.TOKEN:
        return{...state, token: payload};
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleEmailLogin=async(e)=>{
    e.preventDefault();
    const response = await PartnerLoginEmail(email, params?.stripped);
    console.log(response);
    
    setNotification(response.data);
    if(response.success){
      setSuccessNotification(true);
      setTimeout(() => {
        navigate(`/verify/otp-verification?email=${email}&stripped=${params?.stripped}`);
      }, 4000);
    }else{
      setErrorNotification(true);
    }
  }

  const handleSignIn=async(e)=>{
    e.preventDefault();
    const result =await PartnerLoginToken(state, params?.stripped);
    console.log(result);
    setNotification(result);
    if(result.success){
      setSuccessNotification(true);
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }else{
      setErrorNotification(true);
    }
  }
  useEffect(()=>{
    async function getAccessDetails (){
      const response = await PartnerAccessDetails(params?.stripped);
      setdetails(response.data);
    }
  console.log(params);

    getAccessDetails()
  },[flipped]);

    return(
        <>
        <div  className=" psc-flip-card xui-max-w-500 xui-w-fluid-100 xui-mt-2 xui-md-mt-none">
        <div className="psc-flip-card-inner xui-w-fluid-100">
            <div className="psc-flip-card-front xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-pb-3 xui-text-black">
                <h2 className="xui-font-sz-125 xui-w-fluid-80">Welcome back <span className="psc-text">{details?.name}</span></h2>
                <p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">Securely sign in to your Passcoder partner account</p>
                <p className="xui-font-sz-80 xui-my-2"><span className="xui-opacity-7">Don't have an account?</span> <Link to={`/signup?stripped=${params?.stripped}`} className="xui-font-w-bold psc-text xui-text-dc-none">Sign up</Link></p>
                <form onSubmit={handleEmailLogin} className="xui-form" layout="2">
                    <div className="xui-form-box xui-mt-4">
                        <input 
                          className="xui-font-sz-90" 
                          type="email"
                          onChange={(e)=>setEmail(e.target.value)} 
                          name="email"
                          value={email}
                          required placeholder="Email Address" />
                    </div>
                    <div className="xui-d-flex xui-flex-jc-flex-end">
                        <Link to={`/forgot-password?stripped=${params?.stripped}`} className="psc-text xui-font-w-bold xui-font-sz-80">Forgot password?</Link>
                    </div>
                    <div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
                        <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                            <span className="xui-mr-half">Next</span>
                            <Arrowright width="12" height="12" />
                        </button>
                    </div>
                </form>
                <div className="psc-broken-line-text xui-opacity-4">
                    <span className="xui-font-sz-80 xui-font-w-700">or</span>
                </div>
                <button className="xui-btn-block xui-btn-black xui-font-sz-90 xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-mt-1-half xui-bdr-rad-5" onClick={flip}>
                    <Wallet width="16" height="16" />
                    <span className="xui-font-sz-90 xui-ml-2">Sign in via token</span>
                </button>
            </div>
            <div className="psc-flip-card-back xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-text-black">
                <h2 className="xui-font-sz-125 xui-w-fluid-80">Sign In, <span className="psc-text">{details?.name}</span></h2>
                <p className="xui-font-sz-80 xui-my-1"><span className="xui-opacity-7">Don't have an account?</span> <Link to="/signup" className="xui-font-w-bold psc-text xui-text-dc-none">Sign up</Link></p>
                <form onSubmit={handleSignIn} className="xui-form" layout="2">
                    <div className="xui-form-box xui-mt-3">
                        <select
                            onChange={(e)=>dispatch({type: FORMACTION.ROLE, payload: e.target.value})} 
                            required
                        >
                            <option value={"Admin"}>Admin</option>
                            <option value={"Member"}>Member</option>
                        </select>
                    </div>
                    <div className="xui-form-box">
                        <input
                            onChange={(e)=>dispatch({type: FORMACTION.TOKEN, payload: e.target.value})}
                            className="xui-font-sz-90" type="password" placeholder="Token"></input>
                    </div>
                    <div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-between">
                        <div className="xui-d-inline-flex xui-flex-ai-center">
                            <input type="checkbox" id="remember-me" />
                            <label for="remember-me" className="xui-ml-half" style={{marginBottom: '0'}}>Remember me</label>
                        </div>
                        <Link to={`/forgot-password?stripped=${params?.stripped}`} className="psc-text xui-font-w-bold xui-font-sz-80">Forgot token?</Link>
                    </div>
                    <div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
                        <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                            <span className="xui-mr-half">Sign In</span>
                            <Arrowright width="12" height="12" />
                        </button>
                    </div>
                </form>
                <div className="psc-broken-line-text xui-opacity-4">
                    <span className="xui-font-sz-80 xui-font-w-700">or</span>
                </div>
                <button className="xui-btn-block xui-btn-black xui-font-sz-90 xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-mt-1-half xui-bdr-rad-5" onClick={flip}>
                    <Wallet width="16" height="16" />
                    <span className="xui-font-sz-90 xui-ml-2">Sign in via email</span>
                </button>
            </div>
        </div>
    </div>
    {errorNotification && <Error 
    lead={notification.message} 
    sub={notification.data}
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