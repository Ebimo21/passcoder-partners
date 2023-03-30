import React from 'react'
import Main from './main/main'
import RightSlide from './Right-slide/RightSlide'
import SideMenu from './sidemenu/SideMenu'

const BrowseApp = () => {
  return (
    <div>    <>
    <div style={{display:"flex", justifyContent:"space-between"}}>
      <div>
         <SideMenu/>
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

export default BrowseApp