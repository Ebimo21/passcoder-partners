import React from 'react'
import './main.css'
import {FaFlagCheckered} from 'react-icons/fa'
import { FiMoreVertical } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';


const Main = () => {
    let navigate = useNavigate()

  return (
    <div className='main-main'>
        <div className='main-div-first-flex'>
            <div className='main-div-first-flexes' onClick={(event)=>{navigate('/basic-verification')}}>
                <div>
                    <FaFlagCheckered className='main-div-first-flexes-icon'/>
                </div>
                <h4 className='main-div-first-flexes-h4' >Basic Verification</h4>
                <p className='main-div-first-flexes-p'>  Status: Verified</p>
                <div>

                </div>
            </div>
            <div className='main-div-first-flexes blue' onClick={(event)=>{navigate('/extended-verification')}}>
                <div>
                    <FaFlagCheckered className='main-div-first-flexes-icon div-blue'/>
                </div>
                <h4 className='main-div-first-flexes-h4 h4-blue' >Extended Verification</h4>
                <p className='main-div-first-flexes-p p-blue'>  Status: Verified</p>
                <div>

                </div>
            </div>
        </div>
        <div className='main-div-first-flex' >
            <div className='main-div-first-flexes green' onClick={(event)=>{navigate('/credential-verification')}}>
                <div>
                    <FaFlagCheckered className='main-div-first-flexes-icon div-green'/>
                </div>
                <h4 className='main-div-first-flexes-h4 h4-green' >Creditial Verification</h4>
                <p className='main-div-first-flexes-p p-green'>  Status: Verified</p>
                <div>

                </div>
            </div>
            <div className='main-div-first-flexes gray' onClick={(event)=>{navigate('/government-record')}}>
                <div>
                    <FaFlagCheckered className='main-div-first-flexes-icon div-gray'/>
                </div>
                <h4 className='main-div-first-flexes-h4 h4-gray' >Government Record</h4>
                <p className='main-div-first-flexes-p p-gray'>  Status: Verified</p>
                <div>

                </div>
            </div>
        </div>

        <div className='main-main-doc'>
            <h4>Documents</h4>
            <div className='main-main-doc-flex'>
                <div className='div-main-gray-doc-stroke'>
                    <div className='div-main-gray-doc'>
                        <div className='div-main-doc'>

                        </div>
                    </div>
                    <div className='div-main-doc-h5'>
                        <h5>NIN.Docx</h5>
                        <FiMoreVertical />
                    </div>
                    
                </div>
                <div className='div-main-gray-doc-stroke'>
                    <div className='div-main-gray-doc'>
                        <div className='div-main-doc'>

                        </div>
                    </div>
                    <div className='div-main-doc-h5'>
                        <h5>Int'l Passport.Docx</h5>
                        <FiMoreVertical />
                    </div>
                    
                </div>
            </div>
        </div>
    </div>





  )
}

export default Main