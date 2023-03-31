import React, { useState, useEffect, useReducer } from 'react'
import "./assets/style.css"
import SideBar from './SideBar'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import CreateAnnouncement from './modal/CreateAnnouncement'
import aside from './assets/frame1.png'
import search from "./assets/search.png"
import { PartnerAddUserToAnnouncementList, PartnerCreateAnnouncement, PartnerGetAnnouncements } from './config/apiCalls'
import jsCookie from 'js-cookie'
import Congratulations from './modal/Congratulations'
import Error from './modal/Error'
import Nav from './Nav'

function PartnersAnnouncement() {
    const [createAnnouncement, setCreateAnnouncement] = useState(false)
    const [announcement, setAnnouncement] = useState([])
    const [notification, setNotification] = useState("")
    const [successNotification, setSuccessNotification] = useState(false)
    const [errorNotification, setErrorNotification] = useState(false)
    const jwt = jsCookie.get("jwt")
    const [pid, setPid] = useState("")
    const [showMenu, setShowMenu] = useState(false)

    const handleAddUserToList =async(e)=>{
        e.preventDefault()
        const response = await PartnerAddUserToAnnouncementList(jwt, pid)
        setNotification(response?.data)

        if(response.success)setSuccessNotification(true)
        else setErrorNotification(true)
    }

    const handleGetAnnouncement =async () =>{
        const response = await PartnerGetAnnouncements(jwt)
        console.log(response)
        setAnnouncement(response?.data?.rows)
    }

    const handleCreateAnnouncement = async(e)=>{
        e.preventDefault()
        const response = await PartnerCreateAnnouncement(jwt, data)
        console.log(response)
        setCreateAnnouncement(false)

        if(response.success){
            setSuccessNotification(prev=>true)
        }else{
            setErrorNotification(prev=>true)
        }
        setNotification(response.message)
    }
    
    const FORMACTION= {
        TITLE: "title",
        DESCRIPTION: "description"
    }

    const initialState = {
        title: "",
        description: "",
    }

    const reducer =(state, action)=>{
        const {type, payload}= action

        switch(type){
            case FORMACTION.TITLE:
                console.log(state)
                return {...state, title: payload}
            case FORMACTION.DESCRIPTION:
                console.log(state)
                return {...state, description: payload}
            default:
                return state
        }
    }

    const [data, dispatch]= useReducer(reducer, initialState )
    useEffect(()=>{ handleGetAnnouncement() }, [])
  return (
    <div>
        <SideBar show={showMenu} onClose={(e)=>setShowMenu(prev=>!prev)}/>
        <div className='fixed right-0'>
            <div className='hidden p-5 md:flex flex-col justify-between w-[250px] bg-[#F9FAFC] h-screen text-xs'>
                <div>
                    <img src={aside} />

                    <form onSubmit={handleAddUserToList} className='bg-[#EDF0F6] p-2 text-sm'>
                        <h2 className='font-semibold'>Add User</h2>
                        <p className='text-xs mt-1'>Input the user’s Passcoder ID to add them to your list</p>
                        <input 
                            onChange={(e)=>setPid(e.target.value)} 
                            type="text" 
                            className='p-1  border border-solid border-slate-300 w-full mt-2 rounded-md' 
                            placeholder='PID'
                            minLength={6}
                            maxLength={8}
                            required />

                        <button 
                            className='flex items-center gap-2 justify-center bg-purple px-4 py-2  m-auto 
                            rounded-md border border-solid border-purple text-white mt-3'>
                                Add User 
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div className='p-5 md:pl-14 md:ml-[250px] md:mr-[250px]'>
                <Nav lead={"Announcements"} action={(e)=>setShowMenu(prev=>!prev)} />
            {/* <div className='md:flex justify-between'>

                <div>
                    <div className='relative  p-1 border border-slate-400 border-solid rounded-lg bg-slate-100'>
                    <img className='absolute' src={search} alt=""/>
                    <input className=' w-[180px] pl-8 outline-none bg-transparent text-sm ' type="text" name='search' placeholder='Search' />
                    </div>
                </div>
            </div> */}
            <p className='text-sm mt-2 '>Keep your business above all. Let your users know the latest update and do many more.</p>

            <div className='mt-10'>
                <div className='flex justify-between text-sm font-medium mb-3 pb-3 border-b border-b-solid border-b-slate-400'>
                    <span className='flex items-center gap-2'> </span>
                    <span  onClick={()=>setCreateAnnouncement(prev=>true)} className='flex cursor-pointer items-center text-base gap-2 text-mainColor'>Create Announcement <AiOutlinePlusCircle/></span>
                </div>
                <div className='overflow-x-auto'>
                    <table className='w-full font-medium text-center text-base text-slate-500 '>
                        <thead>
                            <tr className='p-2 bg-[#F1F1F1] text-slate-700'>
                                <th className='w-10 p-4  '>S/N</th>
                                <th className='w-80 p-4 inline-block text-left'>Name</th>
                                <th className='w-10 p-4   '>Views</th>
                                <th className='w-10 p-4   '>Users</th>
                                <th className='w-20 p-4   '>Actions</th>
                            </tr>
                        </thead>
                        {announcement?.map((item, index)=>{
                            return(
                                <tbody key={index}>
                                    <tr>
                                        <td className='w-10 p-2 border-b border-b-slate-200  border-b-solid'>{index +1}</td>
                                        <td className='w-80 text-left p-2 border-b border-b-slate-200  border-b-solid'><span>{item?.title}</span></td>
                                        <td className='w-10 p-2 border-b border-b-slate-200  border-b-solid  '><span>{item?.views}</span></td>
                                        <td className="w-10 p-2 border-b border-b-slate-200  border-b-solid  ">{item?.pids}</td>
                                        <td className="w-20 p-2 border-b border-b-slate-200  border-b-solid  "><span className='flex items-center gap-2'><button className='bg-purple text-white px-5 py-1 rounded-md text-[10px] block m-auto'>View</button> </span></td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>
            </div>
        </div>

        <CreateAnnouncement 
            handleSubmit={handleCreateAnnouncement}
            dispatch={dispatch}
            FORMACTION={FORMACTION} 
            show={createAnnouncement} 
            onClose={()=>setCreateAnnouncement(false)}  />
        <Congratulations 
            lead={notification}
            show={successNotification}
            onClose={()=>setSuccessNotification(false)}
          />
        <Error
            lead={notification?.message} 
            sub={notification?.data}
            show={errorNotification} 
            onClose={()=>setErrorNotification(false)} />
    </div>
  )
}

export default PartnersAnnouncement
