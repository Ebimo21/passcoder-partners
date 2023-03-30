import './SectionFour.css'
import React from 'react'
import { Buttonblue } from "../button/Buttonblue"
import { Buttongray } from "../button/Buttongray"
import Svg from './images/Component 1146.svg'

export const SectionFour = () => {
  return (

    <>
        <div className="hero-div">

            <div className="new-width-changes" >
                {/* <div className="div-gray-tray">
                    <div className="div-for-new">
                        <p>New</p>
                    </div>
                    <p>Passcoder is Live in Nigeria!</p>
                </div> */}
                <h1 className="h1-hero">So why 
                <span 
                style={{
                    backgroundColor:"orangered",
                    color: "white",
                    padding: "0.2em 0.4em",
                    marginLeft: "0.3em",
                    borderRadius:"0.3em",
                    }}>Passcoder? </span></h1>
                <p className="p-hero">Get verified in any platform needing KYC in minutes —
                 not weeks — not months with out-of-the-box solution. 
                 No need to stressfully go through the process of snapping your ID cards, 
                 and taking a selfie, With our improved security, we ensure your data is safe with us</p>
                <div className="hero-btn-div">
                    <Buttonblue />
                   <Buttongray />
                </div>
            </div>
            <div >
                <img 
                className="img-for-width"
                src={Svg} 
                alt="illustration" 
            
                
                />
                
            </div>
        </div>



    </>
    
  )
}
