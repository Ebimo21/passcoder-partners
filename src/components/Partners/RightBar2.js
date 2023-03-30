import React, { useEffect, useState } from 'react'
import { BiNavigation } from 'react-icons/bi'
import aside from './assets/frame1.png'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'
import { PartnerActivateUser, PartnerOffers } from './config/apiCalls'
import jsCookie from 'js-cookie'
import Congratulations from './modal/Congratulations'
import Error from './modal/Error'
import SideIssueLoyaltyPoints from './SideIssueLoyaltyPoints'
import SideCheckoutLoyaltyPoints from './SideCheckoutLoyaltyPoints'

function RightBar2({setLoyaltyPId, setCheckoutPId, loyaltyLoading, checkoutLoading, handleIssueLoyalty, handleCheckoutLoyalty, setLoyaltyPoints, setCheckoutPoints}) {
    const [loading, setLoading] = useState(false)
    const [pId, setPId]= useState()
    const [offerId, setOfferId] = useState()
    const [loyalty, setLoyalty]= useState(false)
    const [checkout, setCheckout] = useState(false)
    const [offers, setOffers] = useState()
    const [successNotification, setSuccessNotification] = useState()
    const [errorNotification, setErrorNotification] = useState()
    const [notification, setNotification] = useState("")

    const handleActivateUser =async(e)=>{
        e.preventDefault()
        setLoading(true)
        const response = await PartnerActivateUser(jsCookie.get('jwt'), pId, offerId)
        .finally(e=>setLoading(false))

        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)
    }

    const handleLoyalty=()=>{
        setCheckout(false)
        setLoyalty(prev=>!prev)
    }

    const handleCheckout=()=>{
        setLoyalty(false)
        setCheckout(prev=>!prev)
    }

    async function getPartnerOffers (){
        const response = await PartnerOffers(jsCookie.get("jwt"))
        console.log(response.data.rows[0].name)
        console.log(response.data.rows)
        setOffers(response.data.rows)
    }
useEffect(()=>{

        // getPartnerDetails()
        getPartnerOffers()
    },[])
  return (
    <div className='lg:right-0 hidden lg:block lg:fixed'>
        <div className='p-5 hidden lg:flex flex-col justify-between w-[250px] bg-[#F9FAFC] h-screen text-xs'>
            <div className=''>
                <p>Issue loyalty points directly to your new and existing Passcoder users.</p>
                <div className='flex justify-between mt-5'>
                    <button onClick={handleLoyalty} className='rounded-md px-5 py-2 border text-purple border-purple border-solid font-semibold'>Loyalty</button>
                    <button onClick={handleCheckout} className='rounded-md px-5 py-2 border text-purple border-purple border-solid font-semibold'>Check out</button>
                {/* <button className='p-10 py-2 border text-slate-900 border-purple border-solid mt-10'>Check out</button> */}
            </div>

            {loyalty 
                &&<SideIssueLoyaltyPoints
                    submit={handleIssueLoyalty}
                    setLoyaltyPId={setLoyaltyPId}
                    loyaltyLoading={loyaltyLoading}
                    setLoyaltyPoints={setLoyaltyPoints} />}

            {checkout 
                &&<SideCheckoutLoyaltyPoints
                    submit={handleCheckoutLoyalty}
                    setCheckoutPId={setCheckoutPId}
                    setCheckoutPoints={setCheckoutPoints}
                    checkoutLoading={checkoutLoading} />}
        </div>

            <div>
                    <img src={aside} />
                <div className='bg-[#EDF0F6] p-2 text-sm'>
                    <h2 className='font-semibold text-[#273240]'>Verify User</h2>
                    <form onSubmit={handleActivateUser}>
                        <select
                            onChange={(e)=>setOfferId(e.target.options[e.target.selectedIndex].getAttribute("data-unique"))}
                            className='py-2 bg-transparent px-4 text-xs text-slate-500 border border-solid border-slate-400 w-full mt-2 outline-none rounded-md'
                            required>
                                <option>Passcoder Offer</option>
                                {offers?.map((offer, index)=>{
                                return <option data-unique={offer.unique_id} key={index}>{offer?.name}</option>
                            })}
                        </select>
                        <p className='text-xs mt-1'>Input the User's PassCoder ID to verify their account for this offer</p>
                        <input 
                            onChange={(e)=>setPId(e.target.value)}
                            type="text"
                            minLength={6} 
                            className='py-2 bg-transparent px-4 text-xs text-slate-500 border border-solid border-slate-400 w-full mt-4 outline-none rounded-md' 
                            placeholder='PID'
                            required />

                        <button 
                            // onClick={handleActivateUser} 
                            disabled={loading} 
                            className='flex items-center gap-2 justify-center p-8 py-2  m-auto rounded-md border border-solid border-purple text-purple mt-3'>Verify user 
                            {!loading&&<BiNavigation />} 
                            {loading && <TailSpin stroke='#292482' speed={3} height={14} />}
                        </button>
                    </form>

                </div>
            </div>
        </div>
        <Congratulations 
            lead={notification?.message}
            show={successNotification}
            onClose={()=>setSuccessNotification(false)}  />

        <Error 
            lead={notification?.message} 
            sub={notification?.data?.data}
            show={errorNotification}
            onClose={()=>setErrorNotification(false)} />
    </div>
  )
}

export default RightBar2