import React from 'react'
import {FaFlagCheckered} from 'react-icons/fa'
import './rightslide.css'
import {MdNavigateNext} from 'react-icons/md'
import {MdSettings} from 'react-icons/md'
import {MdArrowBack} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const RightSlide = () => {
    let navigate = useNavigate()
  return (
    <div className='slide-div'>
        <div style={{marginTop:"1em", marginBottom:"1.2em"}}>
             <div className='up-div-browse-app'>
            <MdArrowBack 
                onClick={(event)=>{navigate('/Dashboard')}}
                 />
             <div>
                <h4>Settings</h4>
                <p>Your account settings</p>
            </div>
                <MdSettings />
            </div>
        
              
                <div className='slide-basic-id-up'>
                
                        <div className='slide-basic-id'>
                            <div className='slide-basic-id-container'>
                                <div className='slide-basic-id-div'>
                                    <FaFlagCheckered className='slide-basic-id-icon also' />
                                </div>
                                <div className='slide-basic-id-div-div'>
                                    <h4 className='slide-basic-id-div-h4 also'> <b> Help & Support</b></h4>
                                    <p className='slide-basic-id-div-p'> Help & Support</p> 
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
                                    <h4 className='slide-basic-id-div-h4 also'> <b> Passwords</b></h4>
                                    <p className='slide-basic-id-div-p'> Change and Reset Passwords</p> 
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
                                    <h4 className='slide-basic-id-div-h4 also'> <b> About Us</b></h4>
                                    <p className='slide-basic-id-div-p'> About Us</p> 
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
                                    <h4 className='slide-basic-id-div-h4 also'> <b>Data Privacy</b></h4>
                                    <p className='slide-basic-id-div-p also'> Data Privacy Terms and Conditions</p> 
                                </div>
                            </div>
                            <div>
                                <MdNavigateNext />
                            </div>
                        </div>
                

                    
                
                </div>

        </div>
        

      
{/*       
        <div className='nav-panel-home'>
            <div className='nav-panel-column active'>
                <GiHamburgerMenu />
                <p>Home</p>
            </div>
            <div onClick={(event)=>{navigate('/Browse-Apps')}} className='nav-panel-column'>
                <MdContentCopy />
                <p>Browse Apps</p>
            </div>
        </div> */}
    </div>
  )
}

export default RightSlide