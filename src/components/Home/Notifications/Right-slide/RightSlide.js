import React from 'react'
import './rightslide.css'
import { MdSettings } from 'react-icons/md'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { RiBankFill } from 'react-icons/ri';

const RightSlide = () => {
    let navigate = useNavigate()

  return (
    <div className='slide-div-notifications'>
     <div className='up-div-browse-app'>

        <MdArrowBack 
         onClick={(event)=>{navigate('/Dashboard')}}
         className='up-div-browse-app-back' />
        <div>
            <h4>Notifications</h4>
            <p>Passcoder Notifications</p>
        </div>
        <MdSettings />
     </div>
     <form className='form-panel-notifications'>
        <input
            className='input-panel-notifications'
            placeholder='Search for notifications' 
            type ="text" />
        <button className='btn-panel-notifications'><FaSearch /></button>
     </form>
     <div style={{width:"100%", marginTop:"2em"}}>
        <div className='notifications-div-pops'>
            <div >
                <div className='notifications-div-pops-div'>
                    <RiBankFill />
                </div>
                <div className='notifications-div-pops-details'>
                    <h4>Purple Pay</h4>
                    <p>Uses your ID</p> 
                </div>
            
            </div>
            <p>12:45am</p>
        </div>
        <div className='notifications-div-pops'>
            <div >
                <div className='notifications-div-pops-div'>
                    <RiBankFill />
                </div>
                <div className='notifications-div-pops-details'>
                    <h4>Purple Pay</h4>
                    <p>Uses your ID</p> 
                </div>
            
            </div>
            <p>12:45am</p>
        </div>
     </div>
      
        {/* <div className='nav-panel'>
            <div onClick={(event)=>{navigate('/Dashboard')}}  className='nav-panel-column'>
                <GiHamburgerMenu />
                <p>Home</p>
            </div>
            <div className='nav-panel-column active'>
                <MdContentCopy />
                <p>Browse Apps</p>
            </div>
        </div> */}
    </div>
  )
}

export default RightSlide