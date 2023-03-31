import React, { useState, useEffect, useReducer, useRef } from 'react'
import "./assets/style.css"
import SideBar from './SideBar'
import RightBar from './RightBar'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { RiDeleteBinLine } from 'react-icons/ri'
import AddToken from './modal/AddToken'
import { PartnerAddToken, PartnerDeleteToken, PartnerGetTokens, PartnerUpdateTokenDetails } from './config/apiCalls'
import jsCookie from 'js-cookie'
import Congratulations from './modal/Congratulations'
import Error from './modal/Error'
import EditToken from './modal/EditToken'
import Nav2 from './Nav2'
    
function PartnersToken() {
    const jwt = jsCookie.get("jwt")
    const formEl = useRef()
    const [addTokenModal, setAddTokenModal] = useState(false)
    const [editTokenModal, setEditTokenModal] = useState(false)
    const [successNotification, setSuccessNotification] = useState()
    const [errorNotification, setErrorNotification] = useState()
    const [notification, setNotification] = useState("")
    const [tokenId, setTokenId] = useState()
    const [editId, setEditId] = useState("")
    const [showMenu, setShowMenu] = useState(false)
    const [tokens, setTokens] = useState([])

    const handleCreateToken = async (e)=>{
        e.preventDefault()
        const response = await PartnerAddToken(jwt, state)
        setAddTokenModal(false)

        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)

        dispatch({type: FORMACTION.CLEAR})

    }
    const getTokens = async()=>{
        const response = await PartnerGetTokens(jwt)
        console.log(response.data)
        setTokens(response.data.rows)
    }

    const FORMACTION={
        ALIAS: "alias",
        EXPIRATION: "expiration",
        VALID: "valid",
        CLEAR: "clear"
    }

    const initialState = {
        alias: "",
        expiration: 0,
        valid: true
    }

    const reducer =(state, action)=>{
        const {type, payload} = action
        let newPayload;
        switch(type){
            case FORMACTION.ALIAS:
                console.log(state);
                return {...state, alias: payload}
            case FORMACTION.EXPIRATION:
                console.log(payload)
                newPayload = payload.replace(/[T]/, " ")
                return {...state, expiration: newPayload}
            case FORMACTION.VALID:
                console.log(state);
                return {...state, valid: payload}
            case FORMACTION.CLEAR:
                return {...state, ...initialState}
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const handleDeleteToken =async(id)=>{
        // const id = e.target.getAttribute('data-tokenid')
        console.log(id)
        const response = await PartnerDeleteToken(jwt, id)
        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)
    }

    const handleUpdateToken = async(e)=>{
        const response = await PartnerUpdateTokenDetails(jwt, tokenId, editId, state)
        console.log(response)

        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response)
        setEditTokenModal(false)

        dispatch({type: FORMACTION.CLEAR})


    }

    const handleCallback = async(e, callback)=>{
        e.preventDefault()
        

        callback()
    }

    useEffect(()=>{
        getTokens()

    }, [notification])
  return (
    <div>
        <SideBar show={showMenu} onClose={(e)=>setShowMenu(prev=>!prev)}/>
      <RightBar/>
      <div className='p-5 md:pl-14 md:ml-[250px] lg:mr-[250px]'>
        <Nav2 lead={"Token"} action={(e)=>setShowMenu(prev=>!prev)}/>

        <div className='mt-10'>
            <div className='flex justify-between text-sm font-medium mb-3'>
                <span></span>
                <span 
                    onClick={()=>setAddTokenModal(pre=>!pre)}
                    className='flex items-center text-base gap-2 text-mainColor'>Add New Token <AiOutlinePlusCircle/></span>
            </div>
        <div className='overflow-x-auto'>
            <table className='w-screen max-w-5xl font-medium  text-center text-sm text-slate-500 '>
                <thead>
                    <tr className='p-2 bg-[#F1F1F1] text-slate-700'>
                        <th className='w-10 p-4 '>S/N</th>
                        <th className='min-w-[200px] text-left md:max-w-[250px] p-4 '>Token Name</th>
                        <th className='w-80 p-4   '>Token</th>
                        <th className='w-80 p-4   '>Valid</th>
                        <th className='w-80 p-4   '>Expiration</th>
                        <th className='min-w-[130px] md:min-w-[160px] p-4'>Actions</th>
                    </tr>
                </thead>
                {tokens?.map((token, index)=>{
                    return(
                        <tbody key={index}>
                            <tr>
                                <td className='w-10 p-2 border-b border-b-slate-200  border-b-solid'><span >{index + 1}</span></td>
                                <td className='w-96 text-left w-52text-left p-2 border-b border-b-slate-200  border-b-solid'><span>{token?.alias}</span></td>
                                <td className="text-left min-w-[200px] md:max-w-[250px] p-2 border-b border-b-slate-200  border-b-solid  ">{token?.token?.slice(10)}</td>
                                <td className="w-80 p-2 border-b border-b-slate-200  border-b-solid  "><span  className={`${token.valid? "text-[#4BD21B]": "text-[#FF5050]"}`}>{token.valid?"Active": "Inactive"}</span></td>
                                <td className='w-80 p-2 border-b border-b-slate-200  border-b-solid  '><span>{token?.expiration}</span></td>
                                <td className="min-w-[130px] md:min-w-[160px] p-2 border-b border-b-slate-200  border-b-solid  ">
                                    <span 
                                        className='flex items-center justify-center gap-2'>
                                            <button 
                                                data-tokenid={token?.token}
                                                data-uniqueid={token?.unique_id}
                                                onClick={(e)=>{setEditTokenModal(prev=>!prev); setEditId(e.target.getAttribute("data-uniqueid")); setTokenId(e.target.getAttribute("data-tokenid"))}}
                                                className='bg-purple text-white px-5 py-1 rounded-md text-[10px]  '>Edit</button>
                                                <button 
                                                    onClick={()=>handleDeleteToken(token?.unique_id)}>
                                                        <RiDeleteBinLine 
                                                            data-tokenid={token?.unique_id} 
                                                            size={20} 
                                                            color='red'
                                                            className='cursor-pointer'
                                                            /> 
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

      

      {/* <EditOffer /> */}
      {/* <EditToken /> */}

      <AddToken 
        onClose={(e)=>setAddTokenModal(false)}
        show={addTokenModal}
        submit={handleCreateToken}
        dispatch={dispatch}
        action = {FORMACTION}
      />

      {editTokenModal&&<EditToken
        handleUpdate={handleCallback}
        callbackFn={handleUpdateToken}
        dispatch={dispatch}
        FORMACTION={FORMACTION}
        id={tokenId}
        editId={editId}
        formElement={formEl}
        show={editTokenModal}
        onClose={()=>setEditTokenModal(false)}
       />}

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

export default PartnersToken





