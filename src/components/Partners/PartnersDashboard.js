import React, { useEffect, useState } from 'react'
import "./assets/style.css"
import SideBar from './SideBar'
import RightBar from './RightBar'
import Congratulations from './modal/Congratulations'
import {BiNavigation} from "react-icons/bi"
import { MdOutlineLocalOffer } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import { GiToken } from 'react-icons/gi'
import { Partner, PartnerActivateUser, PartnerOffers } from './config/apiCalls'
import jsCookie from 'js-cookie'
import Error from './modal/Error'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'
import PartnersUpgradeAccount from './modal/PartnersUpgradeAccount'
import Nav from './Nav'
// import UsePartnerDetails from './context/partnerDetails.context'

function PartnersDashboard() {
    
    // const [partnerDetails, refresh] = UsePartnerDetails()
    const [loading, setLoading] = useState(false)
    const [jwt, setJwt]= useState(jsCookie.get("jwt"))
    const [pId, setPId]= useState()
    const [partnerDetails, setPartnerDetails] = useState()
    const [offerId, setOfferId] = useState()
    const [offers, setOffers] = useState()
    const [successNotification, setSuccessNotification] = useState()
    const [errorNotification, setErrorNotification] = useState()
    const [upgradeModal, setUpgradeModal] = useState(false)
    const [notification, setNotification] = useState("")
    const [menu, setMenu] = useState(false)


    // async function getPartnerDetails (){
    //     const response = await Partner(jwt)
    //     setPartnerDetails(response.data)
    // }
    async function getPartnerOffers (){
        const response = await PartnerOffers(jwt)
        setOffers(response?.data?.rows)
    }
    const handleActivateUser =async(e)=>{
        e.preventDefault()
        setLoading(true)
        const response = await PartnerActivateUser(jwt, pId, offerId)
        setLoading(false)
        
        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)
    }
    const handleAccountUpgrade = async (e)=>{
        e.preventDefault()
        setUpgradeModal(false)
    }

    async function getPartnerDetails (){
        const response = await Partner(jwt)
        setPartnerDetails(response.data)
    }
    useEffect(()=>{
        getPartnerDetails()
        getPartnerOffers()
        console.log(offers?.length);
    },[])

  return (
    <div>
      <SideBar 
        setUpgrade={setUpgradeModal} 
        upgrade={upgradeModal}
        partnerDetails={partnerDetails} 
        show={menu} 
        onClose={()=>setMenu(false)}
        />
      <RightBar/>
      <div className='p-5 md:pl-14 md:ml-[250px] lg:mr-[250px]'>
        <Nav 
            lead={"Dashboard"} 
            action={(e)=>setMenu(prev=>!prev)}  
            />

        <div className='flex flex-wrap gap-5 md:gap-0 justify-between mt-5'>
            <div className='basis-full md:basis-2/5 p-6 md:p-2 rounded-md pattern-bg text-white'>
                <span className='font-bold'>295</span>
                <p className='text-[10px] mt-2 '>Your users</p>
            </div>
            <div className='basis-full md:basis-2/5 p-6 md:p-2 rounded-md pattern-bg text-white'>
                <span className='font-bold'>30,937</span>
                <p className='text-[10px] mt-2 '>Platform total users</p>
            </div>

        </div>
            <p className='text-center mt-10 text-[#868585] text-xs'>Profile URL: <a href={partnerDetails?.access_url} className='underline '>{partnerDetails?.access_url.slice(8)}</a> - Click to copy</p>
        <form  onSubmit={handleActivateUser}>
            <div className='flex flex-col gap-5 text-center w-8/12 m-auto mt-10'>
                <h2 className='text-[#262A41] text-2xl font-bold'>Verify User</h2>
                <div>
                    <select 
                        disabled={offers?.length === undefined || loading? true: false} 
                        required 
                        onChange={(e)=>setOfferId(e.target.options[e.target.selectedIndex].getAttribute("data-unique"))} 
                        className=' border border-solid border-slate-400 py-3 text-xs px-5 rounded-md outline-none text-slate-500'>
                        <option defaultValue>Passcoder Offer</option>
                        {offers?.map((offer)=>{
                            return <option data-unique={offer.unique_id} key={offers?.offer_unique_id}>{offer?.name}</option>
                        })}
                    </select>
                </div>

                <p className='text-sm'>Input the user's Passcoder ID to <br />verify their account for this offer</p>

                <input
                    onChange={(e)=>setPId(e.target.value)} 
                    className=' border border-solid border-slate-400 py-2 px-4 rounded-md outline-none text-slate-500' 
                    type="text"
                    name='pid'
                    required
                    minLength={6}
                    maxLength={8}
                    placeholder='PID'
                    disabled={offers?.length === undefined || loading? true: false} />

                <button 
                    disabled={offers?.length === undefined || loading? true: false} 
                    className={`flex items-center gap-3 justify-center text-sm bg-purple ${loading? "w-40": "w-36"} p-4 rounded-md text-white m-auto`}>Verify user {!loading&&<BiNavigation />} {loading && <TailSpin speed={3} height={24} />} </button>

            </div>
        </form>

        <div className='flex justify-centers items-end gap-5 md:gap-0  flex-wrap-reverse bg-purple text-white p-4 rounded-md mt-20'>
            <div className='flex flex-wrap flex-col basis-full md:basis-8/12'>
                <p>With Passcoder Premium, you get access <br />to the following:</p>
                <div className='flex gap-2 mt-4'>
                    <span className='flex items-center px-3 border-r border-r-solid border-r-white gap-2'><MdOutlineLocalOffer /> Offers</span>
                    <span className='flex items-center px-3 border-r border-r-solid border-r-white gap-2'><FaUsers /> Loyalties</span>
                    <span className='flex items-center px-3 gap-2'><GiToken /> Tokens</span>
                </div>
            </div>
                <button
                    onClick={()=>setUpgradeModal(e=>!e)}
                    className='basis-full md:basis-4/12 rounded-md mx-auto md:m-0  px-5 py-2 bg-purple border text-white border-white border-solid'>
                        Upgrade to Premium
                </button>
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
    
    <PartnersUpgradeAccount
        show={upgradeModal}
        onClose={()=>setUpgradeModal(false)}
        handleSubmit={handleAccountUpgrade} />


    </div>
  )
}

export default PartnersDashboard
