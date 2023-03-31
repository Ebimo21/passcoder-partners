import React, { useState, useEffect, useReducer, useRef } from 'react'
import "./assets/style.css"
import {RxMixerHorizontal} from 'react-icons/rx'
import SideBar from './SideBar'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { BsDot } from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri'
import EditToken from './modal/EditToken'
import AddOffer from './modal/AddOffer'
import RightBar2 from './RightBar2'
import SearchBar from './components/SearchBar'
import { PartnerAddLoyaltyPoints, PartnerAddOffer, PartnerDeleteOffer, PartnerOffers, PartnerUpdateOffer } from './config/apiCalls'
import jsCookie from 'js-cookie'
import Congratulations from './modal/Congratulations'
import Error from './modal/Error'
import EditOffer from './modal/EditOffer'
import {RxHamburgerMenu} from 'react-icons/rx'
import Nav2 from './Nav2'
import UsePartnerDetails from './context/partnerDetails.context'

function PartnersOffers() {

    const [partnerDetails] = UsePartnerDetails()

    const formEl = useRef()
    const [jwt, setJwt] = useState(jsCookie.get("jwt"))
    const [editId, setEditId] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [pId, setPId] = useState("")
    const [loyaltyPId, setLoyaltyPId] = useState("")
    const [loyaltyPoints, setLoyaltyPoints] = useState(0)
    const [loyaltyLoading, setLoyaltyLoading] = useState(false)
    const [checkoutPId, setCheckoutPId] = useState(false)
    const [checkoutPoints, setCheckoutPoints] = useState(0)
    const [checkoutLoading, setCheckoutLoading] = useState(false)
    const [editOfferModal, setEditOfferModal] = useState(false)
    const [createOffermodal, setCreateOfferModal] = useState(false)
    const [successNotification, setSuccessNotification] = useState()
    const [errorNotification, setErrorNotification] = useState()
    const [notification, setNotification] = useState("")
    const [offers, setOffers] = useState()
    const [menu, setMenu] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    
    async function getPartnerOffers (){
        const response = await PartnerOffers(jsCookie.get("jwt"))
        setOffers(response.data.rows)
    }

    const offerForm = {
        name: "",
        discount: 0,
        limit: 0,
        single: true,
        description: "",
        start: "",
        end: "",
        points: 0,
        star: 0,
    }

    const FORMACTION={
        NAME: "name",
        DISCOUNT: "discount",
        LIMIT: "limit",
        SINGLE: "false",
        DESCRIPTION: "description",
        START: "start",
        END: "end",
        POINTS: "points",
        STAR: "star",
        CLEAR: "clear"
    }

    const reducer =(state, action)=>{
        const {type, payload} = action
        let newPayload;
        switch(type){
            case FORMACTION.NAME:
                return {...state, name: payload}
            case FORMACTION.DISCOUNT:
                return {...state, discount: parseInt(payload)}
            case FORMACTION.LIMIT:
                return {...state, limit: parseInt(payload)}
            case FORMACTION.SINGLE:
                return {...state, single: payload}
            case FORMACTION.DESCRIPTION:
                return {...state, description: payload}
            case FORMACTION.START:
                newPayload = payload.replace(/[T]/, " ")
                return {...state, start: newPayload}
            case FORMACTION.END:
                newPayload = payload.replace(/[T]/, " ")
                return {...state, end: newPayload}
            case FORMACTION.POINTS:
                return {...state, points: parseInt(payload)}
            case FORMACTION.STAR:
                return {...state, star: parseInt(payload)}
            case FORMACTION.CLEAR:
                return {...state, ...offerForm}
            default:
                return state
        }

    }
    const [state, dispatch] = useReducer(reducer, offerForm )
    const handleSubmit= async(e)=>{
        e.preventDefault()
        setCreateOfferModal(false)
        const response = await PartnerAddOffer(jsCookie.get("jwt"), state)


        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)
        console.log(state);
        dispatch({type: FORMACTION.CLEAR})

    
    }

    const handleOfferUpdate = async(e) =>{
       const response = await PartnerUpdateOffer(jsCookie.get("jwt"), editId, state)
        console.log(response)

        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)
        setEditOfferModal(false)

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

    const handleCallback = (e, callback)=>{
        e.preventDefault()
        

        callback()
    }

    const handleDelete =async (id)=>{
        // const id = e.target.getAttribute('data-offer')
        const response = await PartnerDeleteOffer(jsCookie.get("jwt"), id)
        console.log(id)

        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)

    }

    useEffect(()=>{
        getPartnerOffers()
    },[notification])
  return (
    <div>
      <SideBar partnerDetails={partnerDetails} show={showMenu} onClose={()=>setMenu(false)}/>
      <RightBar2 
        handleIssueLoyalty={handleIssueLoyalty}
        loyaltyLoading={loyaltyLoading} 
        setLoyaltyPId={setLoyaltyPId}
        setLoyaltyPoints={setLoyaltyPoints}
        handleCheckoutLoyalty={handleCheckoutLoyalty}
        setCheckoutPId={setCheckoutPId}
        setCheckoutPoints={setCheckoutPoints}
        checkoutLoading={checkoutLoading}
        />
      <div className='p-5 md:pl-14 md:ml-[250px] lg:mr-[250px]'>
        <Nav2 lead={"Offers"} action={(e=>setShowMenu(prev=>!prev))} />
        
        <p className='text-sm mt-2 '>Earn and attract more users to your business with offers. Create new offer, edit criteria and set eligibility standards.</p>

        <div className='mt-10'>
            <div className='flex justify-between text-sm font-medium mb-3 pb-3 border-b border-b-solid border-b-slate-400'>
                <span className='flex items-center gap-2'> </span>
                <button onClick={()=>setCreateOfferModal(prev=>true)} className='flex items-center gap-2 text-mainColor'>Create Offer <AiOutlinePlusCircle/></button>
            </div>
        <div className='overflow-x-auto'>
            <table className='w-screen max-w-5xl font-medium text-center text-sm text-slate-500 '>
                <thead>
                    <tr className='p-2 bg-[#F1F1F1] text-slate-700'>
                        <th className='w-10 p-4 '>S/N</th>
                        <th className='min-w-[200px] md:max-w-[250px] p-4 text-left '>Name</th>
                        <th className='w-40 p-4  '>Discount Amount</th>
                        <th className='w-40 p-4  '>Type</th>
                        <th className='w-40 p-4  '>Points</th>
                        <th className='w-40 p-4  '>Stars</th>
                        <th className='min-w-[130px] md:min-w-[160px] p-4'>Actions</th>
                    </tr>
                </thead>
                {offers?.map((offer, index)=>{
                    return(
                        <tbody key={offer?.offer_unique_id}>
                            <tr >
                                <td className='w-10 p-2 border-b border-b-slate-200  border-b-solid'>
                                    <span >{index +1}</span>
                                </td>
                                <td className='text-left min-w-[200px] md:max-w-[250px] p-2 border-b border-b-slate-200  border-b-solid'>
                                    <span>{offer?.name}</span>
                                </td>
                                <td className='min-w-[150px] md:min-w-[160px] p-2 border-b border-b-slate-200  border-b-solid '>
                                    <span>{offer?.discount}</span>
                                </td>
                                <td className="w-40 p-2 border-b border-b-slate-200  border-b-solid ">
                                    <span>{offer?.single? "Single":"Multiple"}</span>
                                </td>
                                <td className="w-40 p-2 border-b border-b-slate-200  border-b-solid ">
                                    <span>{offer?.points}</span>
                                </td>
                                <td className="w-40 p-2 border-b border-b-slate-200  border-b-solid ">
                                    <span>{offer?.star}</span>
                                </td>
                                <td className="min-w-[130px] md:min-w-[160px] p-2 border-b border-b-slate-200  border-b-solid ">
                                    <span className='flex items-center justify-center gap-2'>
                                        <button 
                                            data-offer={offer?.unique_id} 
                                            onClick={ (e)=>{setEditOfferModal(prev=>!prev); setEditId(e.target.getAttribute("data-offer")) }}
                                            className='bg-purple text-white px-5 py-1 rounded-md text-[10px] '>Edit</button>
                                            <button 
                                                onClick={()=>handleDelete(offer?.unique_id)}
                                                >

                                                    <RiDeleteBinLine 
                                                        data-offer={offer?.unique_id}
                                                        className='cursor-pointer' 
                                                        size={20} 
                                                        color='red'/>
                                            </button>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
        </div>
      </div>

      <AddOffer 
            handleSubmit={handleSubmit}
            dispatch={dispatch}
            FORMACTION={FORMACTION}
            show={createOffermodal}
            onClose={()=>setCreateOfferModal(false)} />
      
      {editOfferModal && (<EditOffer
        handleUpdate={handleCallback}
        callbackFn = {handleOfferUpdate}
        dispatch={dispatch}
        FORMACTION={FORMACTION}
        id={editId}
        formElement={formEl}
        show={editOfferModal}
        onClose={()=>setEditOfferModal(false)}
        state={state}/> )}
      
      <Congratulations
        lead={notification?.message} 
        show={successNotification} 
        onClose={()=>setSuccessNotification(false)}
        />
      <Error
        lead={notification?.message} 
        sub={notification?.data?.data} 
        show={errorNotification} 
        onClose={()=>setErrorNotification(false)} />
    </div>
  )
}

export default PartnersOffers