import React, {useContext, createContext, useState, useEffect} from 'react'
import { Partner, PartnerAccessDetails } from '../config/apiCalls'
import jsCookie from 'jscookie'




const partner = createContext()
export function PartnerDetails({children}) {
    const [jwt, setJwt] = useState(jsCookie.get("jwt"))

    const [partnerDetails, setPartnerDetails] = useState()
    const [refresh, setRefresh] = useState(true)

    const [partnerAccessDetails, setPartnerAccessDetails] = useState()

    
    
    async function getPartnerDetails (){
        const response = await Partner(jwt)
        setPartnerDetails(response.data)
    }

    async function getAccessDetails (){
        const response = await PartnerAccessDetails()
        setPartnerAccessDetails(response.data)
    }
    
    useEffect(()=>{
        getPartnerDetails()
    }, [refresh])
  return (
    <partner.Provider value={[partnerDetails,  setRefresh, partnerAccessDetails]}>
        {children}
    </partner.Provider>
  )
}

function UsePartnerDetails(){
    return useContext(partner)
}

export default UsePartnerDetails