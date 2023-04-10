import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Arrowleft from "../icons/Arrowleft";
import Arrowright from "../icons/Arrowright";
import Error from "../components/modals/Error";
import Congratulations from "../components/modals/Congratulations";
import { PartnerResetOtp } from "../config/apiCalls";
import { useState } from "react";

export default function ForgotPassword(){
    const [params, setParams] = useSearchParams()
    const stripped = params.get('stripped')

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
      setTimeout(() => {
        // {`/forgot-password?email=${details?.email}`}
        navigate(`/token-success?stripped=${stripped}`);
    }, 4000)
  }else{
      setErrorNotification(prev=>true)
  }
  setNotification(response)

  }
    return(
        <>
        <div className="xui-max-w-500 xui-w-fluid-100 xui-mt-2 xui-md-mt-none">
            <div className="xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-pb-3 xui-text-black">
                <Link to="/sign-in" className="xui-w-40 xui-h-40 xui-bdr-rad-half psc-bg xui-text-white xui-d-inline-flex xui-flex-ai-center xui-flex-jc-center xui-mb-1-half">
                    <Arrowleft width="18" height="18" />
                </Link>
                <h2 className="xui-font-sz-125 xui-w-fluid-80">Reset Token</h2>
                <p className="xui-font-sz-80 xui-my-1"><span className="xui-opacity-7">Don't have an account?</span> <Link to="/signup" className="xui-font-w-bold psc-text xui-text-dc-none">Sign up</Link></p>
                <form onSubmit={handleResetToken} className="xui-form" layout="2">
                    <div className="xui-form-box xui-mt-4">
                        <input 
                            className="xui-font-sz-90" 
                            type="text" 
                            name="email"
                            required
                            placeholder="Email Address"
                            onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className="xui-d-flex xui-flex-jc-flex-end">
                        <div>
                            <span className="xui-font-sz-80">Go back to <Link to="/sign-in" className="psc-text xui-font-w-bold">sign in</Link></span>
                        </div>
                    </div>
                    <div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
                        <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                            <span className="xui-mr-half">Continue</span>
                            <Arrowright width="12" height="12" />
                        </button>
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

        </div>
        </>
    )
}