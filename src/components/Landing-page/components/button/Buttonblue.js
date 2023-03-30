import React from 'react'
import "./button.css"
import {useNavigate} from 'react-router-dom'


export const Buttonblue = () => {
  
  let navigate = useNavigate()
  return (
    
    <div>
        <button onClick={(e)=>{navigate('/')}}
        className="hero-btn">
            Get Started for Free
        </button>
    </div>
  )
}
