import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'
import AuthPagesBase from './components/AuthPagesBase'
import { PartnerVerifyEmail } from './config/apiCalls'
import Congratulations from './modal/Congratulations'
import Error from './modal/Error'


function VerifyEmail() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [email, setEmail] = useState(searchParams.get("email"))
    const [verification_id, setVerification_id] = useState(searchParams.get("verification_id"))

    const [successNotification, setSuccessNotification] = useState(false)
  const [errorNotification, setErrorNotification] = useState(false)
  const [ notification, setNotification] = useState("")

    const VerifyAccount = async() =>{
        const response = await PartnerVerifyEmail(email, verification_id)
        console.log(response);

        if(response.success){
            setNotification(response.message)
            setSuccessNotification(true)
            
            navigate("/access/${alias}");
            // setTimeout(() => {
            // }, 3000)
          }else{
            setNotification(response.message)
            setErrorNotification(true)
          }
          console.log(response)
    }

    useEffect(()=>{
        VerifyAccount()
    }, [])
  return (
    <AuthPagesBase>
     <div>
    <h1>Signin</h1>
    <p>Click to sign in</p>
      
         <Error 
         lead={notification} 
         sub=""
         show={errorNotification}
         onClose={()=>setErrorNotification(false)} />
      
       <Congratulations 
         lead={notification} 
         show={successNotification}
         onClose={()=>setSuccessNotification(false)}/>
     </div>
    

    </AuthPagesBase>
  )
}

export default VerifyEmail
