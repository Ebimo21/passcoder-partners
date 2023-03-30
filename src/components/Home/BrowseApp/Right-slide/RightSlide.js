import React from 'react'
import './rightslide.css'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdContentCopy } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { RiBankFill } from 'react-icons/ri';
import {RiNotificationLine} from 'react-icons/ri'
import Profile from './images/unnamed.jpg'

const RightSlide = () => {
    let navigate = useNavigate()

  return (
    <div className='slide-div-notifications'>
        <div style={{width:"100%"}}>
            <div className='first-slide-div-up'> 
                            <div className='first-slide-div'>
                                <div>
                                    <h6 className='slide-h6' >Browse Apps</h6>
                                    <p className='slide-p'>Browse your apps verified with Passcoder</p>
                                </div>
                                
                                <div  onClick={(event)=>{navigate('/Notifications')}}className='slide-img-and-notifications'>
                                    <RiNotificationLine />
                                    <img 
                                    onClick={(event)=>{navigate('/Profile')}}
                                    className='img-slide' src={Profile} alt={Profile}/>
                                </div>
                                
                            </div>
                        </div>
                {/* <div className='up-div-browse-app'>

                    <MdArrowBack 
                    onClick={(event)=>{navigate('/Dashboard')}}
                    className='up-div-browse-app-back' />
                    <div>
                        <h4>Notifications</h4>
                        <p>Passcoder Notifications</p>
                    </div>
                    <MdSettings />
                </div> */}
                <form style={{marginTop:"1em"}}className='form-panel-notifications'>
                    <input
                        className='input-panel-notifications'
                        placeholder='Search for apps' 
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
                            </div>
                        
                        </div>
                        <p>12:45am</p>
                    </div>
                </div>

            
        </div>
  
      
         <div className='nav-panel'>
            <div onClick={(event)=>{navigate('/Dashboard')}}  className='nav-panel-column'>
                <GiHamburgerMenu />
                <p>Home</p>
            </div>
            <div className='nav-panel-column active'>
                <MdContentCopy />
                <p>Browse Apps</p>
            </div>
        </div> 
    </div>
  )
}

export default RightSlide