import React from 'react'
import check1 from './assets/check1.png'
import check2 from './assets/check2.png'
import check3 from './assets/check3.png'

function VerificationProgressBar() {
  return (
    <div className='flex-wrap px-4 py-8 flex justify-evenly '>
            <div className='flex items-center gap-2'>
                <img src={check1} alt="" />
                <span>Extended Bio Data</span>
            </div>
            <div className='flex items-center gap-2'>
                <img src={check1} alt="" />
                <span>Credential Id</span>
            </div>
            <div className='flex items-center gap-2'>
                <img src={check2} alt="" />
                <span>Medical Id</span>
            </div>
            <div className='flex items-center gap-2'>
                <img src={check3} alt="" />
                <span>Government Records</span>
            </div>
        </div>
  )
}

export default VerificationProgressBar
