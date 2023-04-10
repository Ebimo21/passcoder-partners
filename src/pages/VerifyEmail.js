import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PartnerVerifyEmail } from '../config/apiCalls'
import Congratulations from '../components/modals/Congratulations'
import Error from '../components/modals/Error'

function VerifyEmail() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [email, setEmail] = useState(searchParams.get("email"));
    const [verification_id, setVerification_id] = useState(searchParams.get("verification_id"));

    const [successNotification, setSuccessNotification] = useState(false);
    const [errorNotification, setErrorNotification] = useState(false);
    const [ notification, setNotification] = useState("");

    const VerifyAccount = async() =>{
        const response = await PartnerVerifyEmail(email, verification_id);
        setNotification(response.message);
        if(response.success){
            setSuccessNotification(true);
            setTimeout(() => {
              navigate(`/access/`);
            }, 4000);
          }else{
            setErrorNotification(true);
          }
    }

    useEffect(()=>{
        VerifyAccount();
    }, []);
  return (
    <div>
        {/* <p>Verify Email</p> */}

      <Error 
          lead={notification} 
          sub={""}
          show={errorNotification}
          onClose={()=>setErrorNotification(false)} />
      
      <Congratulations 
          lead={notification} 
          show={successNotification}
          onClose={()=>setSuccessNotification(false)}/>
    </div>
  )
}

export default VerifyEmail