import React from 'react'
import SideMenu from './sidemenu/SideMenu'
import Main from './main/main'
import RightSlide from './Right-slide/RightSlide'

const Setting = () => {
  return (
    <div>    <>
    <div style={{display:"flex", justifyContent:"space-between"}}>
      <div>
         < SideMenu/> 
      </div>
      <div>
         <Main />
      </div>
      <div> 
          <RightSlide />
      </div>
    </div>
   
    
   
</></div>
  )
}

export default Setting