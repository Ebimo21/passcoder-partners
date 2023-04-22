import React, { useEffect, useState } from 'react'
import { PartnerGetAnnouncement } from '../../config/apiCalls'

function ViewAnnouncement({unique_id, show}) {
  const [announcement, setAnnouncement] = useState();

  useEffect(()=>{
    const getAnnouncement= async()=>{
      const response = await PartnerGetAnnouncement(unique_id);
      console.log(response);
      setAnnouncement(response?.data)
    }

    getAnnouncement();


  }, [unique_id])

  if(!show) {return null}

  return (
    // <section className='xui-modal' xui-modal="viewMore">
    
    //         </section>
    <div>
    <section className='xui-modal ' xui-modal="viewMore">
          <div className='xui-modal-content xui-max-h-500 xui-max-w-800 xui-overflow-auto'>
  <div
     style={{
      // position: "fixed",
      top: "40px",
      left: 0,
      width: "100%",
      // height: "100vh",
      backgroundColorL : "rgba(0,0,0,0.4)",
      fontSize: "14px",
      zIndex: "20",
     }}
     >
      <div
        style={
          {
            backgroundColor: "#fefefe",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "8px",
            marginTop: "1%",
            marginBottom: "1%",
            maxWidth: "800px",
            // padding: "20px",
            border: "none",
            outline: "none",
          }
        } 
        className='bg-[#fefefe] mx-auto rounded-lg my-[1%] max-w-sm md:max-w-[800px] p-5 md:px-5 border-none outline-none'>
            <h2>{announcement?.title}</h2>
            <div>
                <div dangerouslySetInnerHTML={{__html: announcement?.description}} />
            </div>
            
            </div>
            </div>
            </div>
            </section>
            </div>

  )
}

export default ViewAnnouncement