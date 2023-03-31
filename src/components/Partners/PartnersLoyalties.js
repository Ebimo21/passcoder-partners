import React, { useEffect, useState } from 'react'
import "./assets/style.css"
import {RxMixerHorizontal} from 'react-icons/rx'
import img1 from "./assets/dp1.png"
import img2 from "./assets/dp2.png"
import SideBar from './SideBar'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import SearchBar from './components/SearchBar'
import { PartnerActivateUser, PartnerAddLoyaltyPoints, PartnerCheckoutLoyaltyPoints, PartnerLoyaltyUsers, PartnerOffers } from './config/apiCalls'
import jsCookie from 'js-cookie'
import RightBar2 from './RightBar2'
import IssueLoyaltyPoints from './modal/IssueLoyaltyPoints'
import Congratulations from './modal/Congratulations'
import Error from './modal/Error'
import CheckoutLoyaltyPoints from './modal/CheckoutLoyaltyPoint'
import aside from './assets/aside.png'
import Nav2 from './Nav2'
import { BiNavigation } from 'react-icons/bi'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'
import UsePartnerDetails from './context/partnerDetails.context'


function PartnersLoyalties() {

    const [partnerDetails] = UsePartnerDetails()

    const [loading, setLoading] = useState(false)
    const [pId, setPId] = useState("")
    const [loyaltyPoints, setLoyaltyPoints] = useState(0)
    const [issueLoyalty, setIssueLoyalty] = useState(false)
    const [checkoutLoyalty, setCheckoutLoyalty] = useState(false)
    const [successNotification, setSuccessNotification] = useState(false)
    const [errorNotification, setErrorNotification]= useState(false)
    const [notification, setNotification] = useState("")
    const [users, setUsers]= useState([])
    const [showMenu, setShowMenu] = useState(false)

    const [loyaltyLoading, setLoyaltyLoading] = useState(false)
    const [loyaltyPId, setLoyaltyPId] = useState("")
    
    async function getPartnerLoyaltyUsers (){
        const response = await PartnerLoyaltyUsers(jsCookie.get("jwt"))
        console.log(response)
        console.log(response?.data?.rows[0]?.name)
        setUsers(response?.data?.rows)
    }

    const handleIssue = async(e)=>{
        e.preventDefault()

        console.log(loyaltyPoints)
        setLoading(true)
        const response = await PartnerAddLoyaltyPoints(jsCookie.get('jwt'), pId, loyaltyPoints)
        .finally(e=>setLoading(false))
        console.log(response)

        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)


    }
    const handleCheckout = async(e)=>{
        e.preventDefault()

        console.log(pId)
        setLoading(true)
        const response = await PartnerCheckoutLoyaltyPoints(jsCookie.get('jwt'), pId, loyaltyPoints)
        .finally(e=>setLoading(false))
        console.log(response)

        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)


    }

    const handleIssueLoyalty = async(e)=>{
        e.preventDefault()

        console.log(pId)
        setLoyaltyLoading(true)
        const response = await PartnerAddLoyaltyPoints(jsCookie.get('jwt'), loyaltyPId, loyaltyPoints)
        .finally(e=>setLoyaltyLoading(false))
        console.log(response)

        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)
    }

    const handleCheckoutLoyalty = async(e)=>{
        e.preventDefault()

        console.log(pId)
        setLoyaltyLoading(true)
        const response = await PartnerAddLoyaltyPoints(jsCookie.get('jwt'), loyaltyPId, loyaltyPoints)
        console.log(response)
        
        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)
        .finally(e=>setLoyaltyLoading(false))
        

    }
    
    useEffect(()=>{
        getPartnerLoyaltyUsers()
    }, [])
  return (
<div>
      <SideBar partnerDetails={partnerDetails} show={showMenu} onClose={(e)=>setShowMenu(prev=>!prev)}/>
      <LoyaltyRightBar/>
      
      <div className='p-5 md:pl-14 md:ml-[250px] md:mr-[250px]'>
            <Nav2 lead={"Loyalties"} action={(e)=>setShowMenu(prev=>!prev)} />
                <p className='text-sm mt-2 '>Lorem ipsum dolor sit amet consectetur. Fermentum consequat consectetur morbi habitasse turpis tincidunt vitae. Sed sapien phasellus vel aliquet ornare bibendum quam. A nisl ut semper arcu nunc.</p>

        <div className='mt-10'>
            <div className='flex justify-between text-xs font-medium mb-3 pb-3 border-b border-b-solid border-b-slate-400'>
                <span className='flex items-center gap-2'> </span>
                <span className='flex items-center gap-2 text-mainColor'>Authenticate Users <AiOutlinePlusCircle/></span>
            </div>
        <div className='overflow-x-auto'>
            <table className='w-screen max-w-5xl font-medium text-center text-sm text-slate-500 '>
                <thead>
                    <tr className='p-2 bg-[#F1F1F1] text-slate-700'>
                        <th className='min-w-[200px] md:max-w-[250px]  p-4 text-left '>User</th>
                        <th className='w-20 p-4 '>Restrictions</th>
                        <th className='w-32 p-4   '>Points</th>
                        <th className='min-w-[100px] md:min-w-[160px] p-4   '>Date Authenticated</th>
                        <th className='min-w-[100px] md:min-w-[160px] p-4   '>Last Authenticated</th>
                        <th className='min-w-[100px] md:min-w-[160px] p-4'>Actions</th>
                    </tr>
                </thead>
                {users?.map((user, index)=>{
                    return(
                        <tbody key={index}>
                            <tr >
                                <td className='min-w-[200px] md:min-w-[250px] p-2 border-b-slate-200 border-b border-b-solid'><span className='flex items-center gap-2'><div>{`${user?.user_data?.firstname + " " +user?.user_data?.pid}`}</div></span></td>
                                <td className='w-20 p-2 border-b-slate-200 border-b border-b-solid'><span className={`${user?.restricted? "bg-[#DEEDE5] text-[#74fa43]": "bg-[#FDF8CE] text-[#bd3c3c] "} p-1 rounded-md`}>{user?.restricted?.toString()}</span></td>
                                <td className='w-32 p-2 border-b-slate-200 border-b border-b-solid'><span >{user?.points}</span></td>
                                <td className="min-w-[150px] md:min-w-[160px] p-2 border-b-slate-200 border-b border-b-solid  "><span className='flexs items-center'>{user?.updatedAt?.date}</span></td>
                                <td className="min-w-[150px] md:min-w-[160px] p-2 border-b-slate-200 border-b border-b-solid  "><span className='flexs items-center'>{user?.updatedAt?.date}</span></td>
                                <td className="min-w-[100px] md:min-w-[160px] md:w-20 p-2 border-b-slate-200 border-b border-b-solid "><span className='flex flex-col items-center'><button onClick={()=>{setPId(user?.user_data?.unmasked); setIssueLoyalty(prev=>!prev);}} className='text-[#6B92FF]'>Issue Points</button><button onClick={()=>{setPId(user?.user_data?.unmasked); setCheckoutLoyalty(prev=>!prev)}} className='text-purple'>Checkout</button></span></td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
        </div>
      </div>

        {issueLoyalty &&<IssueLoyaltyPoints
            submit={handleIssue}
            id={pId}
            loading={loading} 
            setPoints={setLoyaltyPoints}
            show={issueLoyalty}
            onClose={()=>setIssueLoyalty(false)}
            />} 

        {checkoutLoyalty&&<CheckoutLoyaltyPoints
            submit={handleCheckout}
            id={pId}
            loading={loading} 
            setPoints={setLoyaltyPoints}
            show={checkoutLoyalty}
            onClose={()=>setCheckoutLoyalty(false)}
            />}
            
        <Congratulations 
            lead={notification?.message}
            show={successNotification}
            onClose={()=>setSuccessNotification(false)}  />
        <Error 
            lead={notification?.message} 
            sub={notification?.data?.data} 
            show={errorNotification}
            onClose={()=>setErrorNotification(false)} />

        {/* {successNotification && {}} */}
    </div>
  )
}

function LoyaltyRightBar (){
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

        if(response?.success){
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
        setOffers(response?.data?.rows)
    }
useEffect(()=>{

        // getPartnerDetails()
        getPartnerOffers()
    },[])
  return (
    <div className='lg:right-0 hidden lg:block lg:fixed'>
        <div className='p-5 hidden lg:flex flex-col justify-between w-[250px] bg-[#F9FAFC] h-screen text-xs'>
            

            <div>
                    <img src={aside} />
                <div className='bg-[#EDF0F6] p-2 text-sm'>
                    <h2 className='font-semibold'>Verify User</h2>
                    <form onSubmit={handleActivateUser}>
                        <select
                            onChange={(e)=>setOfferId(e.target.options[e.target.selectedIndex].getAttribute("data-unique"))}
                            className='py-1 px-4 text-xs text-slate-500  border border-solid border-slate-400 w-full mt-2 outline-none rounded-md'
                            required>
                                <option>Passcoder Offer</option>
                                {offers?.map((offer, index)=>{
                                return <option data-unique={offer?.unique_id} key={index}>{offer?.name}</option>
                            })}
                        </select>
                        <p className='text-xs mt-1'>Input the User's PassCoder ID to verify their account for this offer</p>
                        <input 
                            onChange={(e)=>setPId(e.target.value)}
                            type="text"
                            minLength={6}
                            maxLength={8} 
                            className='py-1 px-4 text-slate-500 border border-solid border-slate-400 w-fullz mt-2 outline-none  rounded-md' 
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

export default PartnersLoyalties