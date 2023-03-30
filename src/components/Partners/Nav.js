import React from 'react'
import {RxHamburgerMenu} from "react-icons/rx"

function Nav({lead, action}) {
  return (
    <div className='flex justify-between'>
        <h3 className='font-bold text-3xl'>{lead}</h3>
        <button  onClick={action} className='md:hidden'><RxHamburgerMenu size={40} className='inline' /></button>
    </div>
  )
}

export default Nav