import React, {useRef, useState} from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import AuthPagesBase from './components/AuthPagesBase'
import { useNavigate } from 'react-router-dom'
import { PartnerLoginVerifyOtp, PartnerVerifyOtp } from './config/apiCalls'

function PartnersOtp() {
  const navigate = useNavigate()

  const [successNotification, setSuccessNotification] = useState(false)
  const [errorNotification, setErrorNotification] = useState(false)
  const [ notification, setNotification] = useState("")

  const inputRefs = useRef([]);
  const handleSubmit = async(event) => {
    event.preventDefault();
    const otp = inputRefs.current.map((ref) => ref.value).join("");
    const response = await PartnerLoginVerifyOtp(otp)

    if(response.success){
      setNotification(response.message)
      setSuccessNotification(true)
      setTimeout(() => {
        navigate("/partners-dashboard");
      }, 4000);
    }else{
      setNotification(response.message)
      setErrorNotification(true)
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
        className='text-center w-10 h-10 rounded-full outline-none bg-[#F4F4F4] border border-solid border-purple'
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
  return (
    <AuthPagesBase innerStyle="text-center">
      <div>
          <h3 className='text-textGrey font-bold text-lg'>OTP Verification</h3>
          <p className='w w-48 m-auto'>A one time password has been sent to your email, kindly fill it in below.</p>

          <div className='flex justify-center gap-4  mt-10' >
              {inputFields}
    </div>

          <div className='text-center mt-2 '>
            <p>Didn't get it? <span className='text-purple font-semibold'>Resend OTP</span></p>
            {/* <input type="checkbox" /><label>Deactivate</label> */}
          </div>

          <div className=' flex flex-col items-end mt-20'>
              <button onClick={handleSubmit} className='p-2 bg-altPurple text-white text-sm w-24 h-30 rounded-md flex justify-center items-center gap-2 '>Sign in <MdKeyboardArrowRight fontWeight="200"/> </button>
            </div>
        </div>
        <div className='flex items-center gap-5 my-4'>
          <hr className='w-2/6 grow'  /> <span className='w-1/6 text-center'>or </span> <hr className='w-2/6 grow'  />
        </div>

        <button onClick={()=>navigate("/partners-signin")} className='p-2 mt-4 bg-black text-white w-full rounded-md'>Sign in via Token</button>
    </AuthPagesBase>
  )
}

export default PartnersOtp
