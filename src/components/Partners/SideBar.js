import React, {useState} from 'react'
import Logo from "./assets/logo.svg"
import { RxDashboard} from 'react-icons/rx'
import {MdOutlineLocalOffer} from "react-icons/md"
import {FaUsers} from "react-icons/fa"
import {BiEdit} from 'react-icons/bi'
import {GiToken} from "react-icons/gi"
import {AiOutlineSetting} from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom';
import {HiSpeakerphone} from "react-icons/hi"


import img1 from "./assets/dp1.png"
import { PartnersLogOut } from './config/apiCalls'
import PartnersUpgradeAccount from './modal/PartnersUpgradeAccount'


function SideBar({show, onClose, upgrade, setUpgrade, partnerDetails}) {
    let navigate = useNavigate()
    const location = useLocation().pathname

    // const [upgrade, setUpgrade] = useState(false)

    const handleLogOut =()=>{
        PartnersLogOut()
        setTimeout(() => {
            navigate("/partners-signin");
          }, 3000)
    }

  return (
    <div onClick={onClose} className={`fixed  md:translate-x-0 ${show? "translate-x-0":"-translate-x-80 "}`}>
        <div onClick={(e)=>e.stopPropagation()} className={` md:block w-[250px] h-screen  bg-purple text-slate-400`}>
        <div className='m-auto pt-5 w-[90%]'>
                <img className='block m-auto' width="79" height="49" src={Logo} alt="" />

                <div className="flex gap-2 justify-center items-center my-4">
                    <img src={partnerDetails?.photo} width={30} alt=""/>
                    <span className='flex flex-col'>
                        <p className='flex items-center text-xs gap-2 text-white font-bold'>Gabriel Eikwu <BiEdit onClick={()=>navigate("/partners-settings")} /></p>
                        <span className='text-[9px]'>gabrieleikwu@gmail.com</span>
                    </span>
                </div> 

                <hr /> 
            </div>  


            <div className='ml-9 w-[90%] text-base mt-5'>
                <div 
                    className={`flex items-center gap-3 ${location ==='/partners-dashboard'? 'text-white': ''}  mb-4 cursor-pointer`}
                    onClick={(event)=>{navigate('/partners-dashboard')}}>
                    <RxDashboard/> <span>Dashboard</span>
                </div>
                <div 
                    className={`flex items-center gap-3 ${location ==='/partners-offers'? 'text-white': ''} mb-4 cursor-pointer`} 
                    onClick={(event)=>{navigate('/partners-offers')}}>
                    <MdOutlineLocalOffer/> <span>Offers</span>
                </div>
                <div 
                    className={`flex items-center gap-3 ${location ==='/partners-loyalties'? 'text-white': ''} mb-4 cursor-pointer`} 
                    onClick={(event)=>{navigate('/partners-loyalties')}}>
                    <FaUsers/> <span>Loyalties</span>
                </div>
                <div 
                    className={`flex items-center gap-3 ${location ==='/partners-announcement'? 'text-white': ''} mb-4 cursor-pointer`} 
                    onClick={(event)=>{navigate('/partners-announcement')}}>
                    <HiSpeakerphone/> <span>Announcement</span>
                </div>
                <div 
                    className={`flex items-center gap-3 ${location ==='/partners-transactions'? 'text-white': ''} mb-4 cursor-pointer`} 
                    onClick={(event)=>{navigate('/partners-transactions')}}>
                    <GiToken/> <span>Transactions</span>
                </div>
                <div 
                    className={`flex items-center gap-3 ${location ==='/partners-token'? 'text-white': ''} mb-4 cursor-pointer`} 
                    onClick={(event)=>{navigate('/partners-token')}}>
                    <GiToken/> <span>Team</span>
                </div>
                <div 
                    className={`flex items-center gap-3 ${location ==='/partners-settings'? 'text-white': ''} mb-4 cursor-pointer`} 
                    onClick={(event)=>{navigate('/partners-settings')}}>
                    <AiOutlineSetting/> <span>Settings</span>
                </div>

                <button
                    onClick={()=>setUpgrade(e=>!e)} className='border border-solid mt-6 border-white text-white text-xs p-2 rounded-md w-28'>Upgrade</button>

                <div className='flex items-center gap-3 mt-16 text-white font-medium '
                onClick={handleLogOut}>
                    <p className='flex items-center gap-2 cursor-pointer'><FiLogOut/> Logout</p> 
                </div>


                </div>  

        </div>

        {/* <PartnersUpgradeAccount
            show={upgrade}
            onClose={()=>setUpgrade(false)}
            /> */}
    </div>
  )
}

export default SideBar
