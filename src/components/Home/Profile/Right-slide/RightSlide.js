import React from 'react'
import {FaFlagCheckered} from 'react-icons/fa'
import './rightslide.css'
import { MdSettings } from 'react-icons/md'
import { MdArrowBack } from 'react-icons/md'
import {MdNavigateNext} from 'react-icons/md'
import Profile from './images/unnamed.jpg'
import { useNavigate } from 'react-router-dom';

const RightSlide = () => {
    let navigate = useNavigate()

  return (
    <div className='slide-div'>
     <div className='up-div-browse-app'>

        <MdArrowBack 
         onClick={(event)=>{navigate('/Dashboard')}}
         className='up-div-browse-app-back' />
        <div>
            <h4>Profile</h4>
            <p>View your profile details</p>
        </div>
        <MdSettings />
     </div>
        <div className='up-div-next-browse-app' >
            <img src={Profile} alt={Profile} />
            <p>Ibeneme Ikenna Kenneth</p>
            <h4>Digital ID: 1234567890</h4>
        </div>
        <div className='slide-basic-id-up-browse'>
        
                <div className='slide-basic-id'>
                    <div className='slide-basic-id-container'>
                        <div className='slide-basic-id-div'>
                            <FaFlagCheckered className='slide-basic-id-icon' />
                        </div>
                        <div className='slide-basic-id-div-div'>
                            <h4 className='slide-basic-id-div-h4'> <b> Basic ID Verification</b></h4>
                            <p className='slide-basic-id-div-p'> Verified</p> 
                        </div>
                    </div>
                    <div>
                        <MdNavigateNext />
                    </div>
                </div>
                <div className='slide-basic-id'>
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
                <div className='slide-basic-id'>
                    <div className='slide-basic-id-container'>
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
                <div className='slide-basic-id'>
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