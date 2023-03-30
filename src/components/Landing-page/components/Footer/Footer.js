import React from 'react'
import Svg from '../Navbar/Vector1.svg';
import {BsTwitter, BsLinkedin} from 'react-icons/bs'
import './Footer.css'

export const Footer = () => {
  return (
    <div className='footer-div' >
        <div className='footer-div-div'>
            <img src={Svg} alt="svg"
                className='svg-footer' />
            <h5>Passcoder</h5>
        </div>
        <div className='icons-footer'>
            <BsTwitter />
            <BsLinkedin />
            
        </div>
    </div>
  )
}
