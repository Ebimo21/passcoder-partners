import React from 'react'
import Logo from '../svgs/Vector1 copy.svg';
import {GiHamburgerMenu} from 'react-icons/gi';
import {TiTabsOutline} from 'react-icons/ti'
import {CgProfile} from 'react-icons/cg'
import {RiNotificationLine} from 'react-icons/ri'
import {FiSettings} from 'react-icons/fi'
import illustration from '../svgs/security.svg'
import './sidemenu.css'
import { useNavigate } from 'react-router-dom';



const SideMenu = () => {
    
   let navigate = useNavigate()

  return (
   <div className='sidemenu-bar'>
        <div className='sidemenu-logo-div'>
            <img className='sidemenu-logo'
                src={Logo}
                alt="logo" />
            <h4 className='logo-name'>Passcoder</h4>
        </div>

        <div className='sidemenu-contents'>
            <div >
                <p  onClick={(event)=>{navigate('/Dashboard')}}  className='sidemenu-items '> <GiHamburgerMenu   className='sidemenu-icons'/> <span className='p-content'> Dashboard</span></p>
            </div>
            <div onClick={(event)=>{navigate('/Browse-Apps')}}>
                <p className='sidemenu-items '><TiTabsOutline  className='sidemenu-icons' /> <span className='p-content'> Browse Apps </span></p>
            </div>
            <div onClick={(event)=>{navigate('/Profile')}}>
                <p className='sidemenu-items hover'> <CgProfile  className='sidemenu-icons' /><span className='p-content'> Profile </span></p>
            </div> 
            <div onClick={(event)=>{navigate('/Notifications')}}>
                <p className='sidemenu-items'> <RiNotificationLine  className='sidemenu-icons' /> <span className='p-content'> Notifications </span></p>
            </div>
            <div onClick={(event)=>{navigate('/Settings')}}>
                <p className='sidemenu-items' > <FiSettings  className='sidemenu-icons'/><span className='p-content'> Settings </span> </p>
            </div>
        </div>
       <div className='sidemenu-bottom-box' >
            <img className='sidemenu-bottom-illustration' src={illustration} alt={illustration} />
            <h5>Data Security Guaranteed with us</h5>
            <p className='sidemenu-p'>View our data privacy terms and conditions</p>
       </div>
   </div>
  )
}

export default SideMenu