import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Wallet from "../icons/Wallet";
import Arrowright from "../icons/Arrowright";
import { PartnerLoginVerifyOtp } from "../config/apiCalls";
import Error from "../components/modals/Error";
import Congratulations from "../components/modals/Congratulations";

export default function OTPVerification(){
    const [params, setParams] = useSearchParams()
    const email = params.get('email')
    const stripped = params.get('stripped')

    const navigate = useNavigate();

  const [successNotification, setSuccessNotification] = useState(false);
  const [errorNotification, setErrorNotification] = useState(false);
  const [ notification, setNotification] = useState("");

  const inputRefs = useRef([]);
  const handleSubmit = async(event) => {
    event.preventDefault();
    const otp = inputRefs.current.map((ref) => ref.value).join("");
    const response = await PartnerLoginVerifyOtp(email, otp, stripped);

    if(response.success){
      setNotification(response.message);
      setSuccessNotification(true);
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }else{
      setNotification(response.message);
      setErrorNotification(true);
    }

  };

  const handleInput = (index, event) => {
    const { value } = event.target;
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (index, event) => {
    const pastedData = event.clipboardData.getData("text/plain");
    const digits = pastedData.split("");
    let currentInputIndex = index;
    digits.forEach((digit) => {
      if (currentInputIndex >= inputRefs.current.length) {
        return;
      }
      inputRefs.current[currentInputIndex].value = digit;
      currentInputIndex++;
    });
    event.preventDefault();
  };

  const inputFields = [];
  
  for (let i = 0; i < 6; i++) {
    inputFields.push(
      <input
        key={i}
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength="1"
        ref={(ref) => (inputRefs.current[i] = ref)}
        onInput={(event) => handleInput(i, event)}
        onPaste={(event) => handlePaste(i, event)}
      />
    );
  }

    
    return(
        <>
        <div className="xui-max-w-500 xui-w-fluid-100 xui-mt-2 xui-md-mt-none">
            <div className="xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-pb-3 xui-text-black">
                <h2 className="xui-font-sz-125 xui-w-fluid-80 xui-mx-auto xui-text-center">OTP Verfication</h2>
                <p className="xui-opacity-5 xui-font-sz-90 xui-mt-half xui-text-center xui-w-fluid-70 xui-mx-auto xui-line-height-1-half">A one time password has been sent to your email, kindly fill it in below.</p>
                <form onSubmit={handleSubmit}>
                    <div class="otp-field xui-d-flex xui-flex-jc-center xui-my-2">
                        {inputFields}
                    </div>
                    <p className="xui-font-sz-80 xui-my-2 xui-text-center"><span className="xui-opacity-7">Didn't get it?</span> <span className="xui-font-w-bold psc-text xui-text-dc-none">Resend OTP</span></p>
                    <div className="xui-mt-5 xui-d-flex xui-flex-jc-flex-end">
                        <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                            <span className="xui-mr-half">Sign in</span>
                            <Arrowright width="12" height="12" />
                        </button>
                    </div>
                </form>
                
                <div className="psc-broken-line-text xui-opacity-4">
                    <span className="xui-font-sz-80 xui-font-w-700">or</span>
                </div>
                <Link to={`/access/${stripped}`} className="xui-btn-block xui-btn-black xui-font-sz-90 xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-mt-1-half xui-bdr-rad-5">
                    <Wallet width="16" height="16" />
                    <span className="xui-font-sz-90 xui-ml-2">Sign in via token</span>
                </Link>
            </div>
        </div>

        {errorNotification && <Error 
    lead={notification} 
    sub={""}
    show={errorNotification}
    onClose={()=>setErrorNotification(false)} 
    />}
    {successNotification && <Congratulations 
    lead={notification} 
    show={successNotification}
    onClose={()=>setSuccessNotification(false)}
  />}
        </>
    )
}