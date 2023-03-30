import React from 'react'
import {MdContentCopy} from 'react-icons/md'
import {FaFlagCheckered} from 'react-icons/fa'
import './rightslide.css'
import Profile from './images/unnamed.jpg'
import {RiNotificationLine} from 'react-icons/ri'
import {MdNavigateNext} from 'react-icons/md'
import {GiHamburgerMenu} from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

const RightSlide = () => {
    let navigate = useNavigate()
  return (
    <div className='slide-div'>
        <div>
            <div className='first-slide-div-up'> 
                <div className='first-slide-div'>
                    <h6 className='slide-h6' >Hello Ikenna</h6>
                    <div className='slide-img-and-notifications'>
                        <RiNotificationLine />
                        <img 
                        onClick={(event)=>{navigate('/Profile')}}
                        className='img-slide' src={Profile} alt={Profile}/>
                    </div>        
                </div>
            </div>
            <div className='slide-dashboard'>
                <p className='slide-dashboard-p'> Digital ID</p>
                    <div>
                        <h4 className='slide-dashboard-h4'> <MdContentCopy />1234567890</h4>
                    </div>
                    <div className='slide-dashboard-div'>
                        <p>View IDs</p>
                    </div>
                </div>
                <div className='slide-basic-id-up'>
                
                        <div className='slide-basic-id'
                         onClick={(event)=>{navigate('/basic-verification')}}>
                            <div className='slide-basic-id-container'>
                                <div className='slide-basic-id-div'>
                                    <FaFlagCheckered className='slide-basic-id-icon' />
                                </div>
                                <div className='slide-basic-id-div-div' >
                                    <h4 className='slide-basic-id-div-h4'> <b> Basic ID Verification</b></h4>
                                    <p className='slide-basic-id-div-p'> Verified</p> 
                                </div>
                            </div>
                            <div>
                                <MdNavigateNext />
                            </div>
                        </div>
                        <div className='slide-basic-id'
                             onClick={(event)=>{navigate('/extended-verification')}}>
                            <div className='slide-basic-id-container'>
                                <div className='slide-basic-id-div'>
                                    <FaFlagCheckered className='slide-basic-id-icon extended' />
                                </div>
                                <div className='slide-basic-id-div-div'>
                                    <h4 className='slide-basic-id-div-h4 extended'> <b> Extended Bio Verification</b></h4>
                                    <p className='slide-basic-id-div-p'> Verified</p> 
                                </div>
                            </div>
                            <div>
                                <MdNavigateNext />
                            </div>
                        </div>
                        <div className='slide-basic-id' onClick={(event)=>{navigate('/credential-verification')}}>
                            <div className='slide-basic-id-container'
                           >
                                <div className='slide-basic-id-div'>
                                    <FaFlagCheckered className='slide-basic-id-icon credential' />
                                </div>
                                <div className='slide-basic-id-div-div'>
                                    <h4 className='slide-basic-id-div-h4 credential'> <b> Credential ID Verification</b></h4>
                                    <p className='slide-basic-id-div-p'> Verified</p> 
                                </div>
                            </div>
                            <div>
                                <MdNavigateNext />
                            </div>
                        </div>
                        <div className='slide-basic-id'
                        onClick={(event)=>{navigate('/government-record')}}>
                            <div className='slide-basic-id-container'>
                                <div className='slide-basic-id-div'>
                                    <FaFlagCheckered className='slide-basic-id-icon also' />
                                </div>
                                <div className='slide-basic-id-div-div'>
                                    <h4 className='slide-basic-id-div-h4 also'> <b> Medical ID Verification</b></h4>
                                    <p className='slide-basic-id-div-p also'> Verified</p> 
                                </div>
                            </div>
                            <div>
                                <MdNavigateNext />
                            </div>
                        </div>
                

                    
                
                </div>

        </div>
        

      
      
        <div className='nav-panel-home'>
            <div className='nav-panel-column active'>
                <GiHamburgerMenu />
                <p>Home</p>
            </div>
            <div onClick={(event)=>{navigate('/Browse-Apps')}} className='nav-panel-column'>
                <MdContentCopy />
                <p>Browse Apps</p>
            </div>
        </div>
    </div>
  )
}

export default RightSlide