import React from 'react'
import { getAuth, sendPasswordResetEmail} from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ResetPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const auth = getAuth();
    const navigate = useNavigate()
 
    const triggerResetEmail = async (e) => {
      e.preventDefault();
     setError('');
      try {
       await sendPasswordResetEmail(auth, email)
       navigate('/reset')
       setSuccess(success)
     } catch (e) {
        setError(e.message);
       console.log(e.message);
     }
   };
     
    return (
      <div className="max-w-[700px] mx-auto my-16 p-4">
        <h1 className='text-2xl font-bold py-2 mt-7'>Forgot Password</h1>

            <p className='py-2 text-sm'>
                Enter your E-mail Address to get an OTP to your mail
            </p>
            <br />  <br /> 
            { error ?  
      <div 
      style={{
        width:"100%",
        backgroundColor:"rgba(255, 0, 0, 0.122)",
        paddingRight:'1em',  
        paddingLeft:'1em', 
        paddingBottom:'0.5em', 
        borderLeft:"red solid 0.3em",
        paddingTop:'0.5em'}}>

        <p style={{fontSize:'0.8em', color:"red"}}>This Email is not registered with Passcoder</p> 
      </div>: 
         <p></p>} 
         
         
         { success ?  
       <div 
       style={{
         width:"100%",
         backgroundColor:" rgba(0, 128, 0, 0.149)",
         paddingRight:'1em',  
         paddingLeft:'1em', 
         paddingBottom:'0.5em', 
         borderLeft:"red solid 0.3em",
         paddingTop:'0.5em'}}>
 
         <p style={{fontSize:'0.8em', color:"green"}}>Please Check your Mail, for a Password reset Link</p> 
       </div>: 
        <p></p>} <br /><br />
         
        <form onSubmit={triggerResetEmail} className='flex flex-col py-2'>

            
          <label className='py-2 font-medium'>Email Address</label>
          <input 
          value={email} 
          autoComplete={email}
          required
          onChange={(e) => setEmail(e.target.value)} 
          className='border p-3' type='email' />
        <br />
        <br />
        <button
            className='border
             border-blue-500 bg-[#292482] 
              hover:bg-blue-500 w-full p-4 my-2
               text-white'
            >Reset Password</button>
        </form>

      </div>
    )
  }
  
  export default ResetPassword;
  