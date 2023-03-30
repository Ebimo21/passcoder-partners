import React from 'react'
import "./SectionOne.css"
import Svg from "./images/Rectangle.svg"
import { Buttonblue } from '../button/Buttonblue'
import Logo  from "./images/Vector.svg"

export const Sectionone = () => {
  return (
    <>
      <div className='padding-section-one'>
        <div>
          <h1 
            className="h1-hero">
            Build for the future of a digital ID.
          </h1>
          <p 
            className="p-hero">
            Bring tomorrow's solutions to life, 
            with our customer-focused solutions, today.
          </p>   
        </div>
        </div>
        <div className='center'>
        <div className='div-container-gray'>
            <div className='div-container-gray-one'>
            <img className="image-of-logo" src={Logo} alt="svg" />
                <h1 className='h1-section-one'> Passcoder unique ID</h1>
                <p className='p-section-one' >Securely get verified on all platform that requires use of KYC
                  with just your unique Passcoder ID. 
                  How?, just sign up and Verify Your Identity with Passcoder. 
                  you'll be given a unique ID for all your data used across any platform
                  <br /><br />
                  We hold a list of data for you to use anytime, anyday, anywhere
                  <br />
                  - Bio data<br />
                  - Extended Bio<br />
                  - Credential ID<br />
                  - Medical ID</p>
      
            </div>
            <div className='center-this-image'>
              <img className="image-in-div" src={Svg} alt="svg" />
            </div>
            
        </div>

        </div>
        
       
    </>
    
  )
}
