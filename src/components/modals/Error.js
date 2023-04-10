import React from 'react'
// import { MdKeyboardArrowRight } from 'react-icons/md'
import errorImage from "../../assets/error.png"

function Error({lead, sub, show, onClose}) {

  if(!show) {return null}
  console.log(lead);
  console.log(sub);

  return (
    <div
    >
         <div
         style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100vh",
          zIndex: "20",
          color: "black",
          backgroundColor: "rgba(0,0,0,0.4)",
          textAlign: "center"
          
         }}
           onClick={onClose}>
            <div
            style={{
              width: "1000px",
              position: "relative",
              backgroundColor: "#fefefe",
              margin: "auto",
              borderRadius: "8px",
              marginTop: "5%",
              marginBottom: "5%",
              maxWidth: "500px",
              padding: "20px",
              border: "none",
              outline: "none"
            }} onClick={e => e.stopPropagation()} >
                <div>
                    <img style={
                      {
                        display: "block",
                        marginTop: "40px",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }
                    } width={200}  src={errorImage} alt="" />
                </div>
                <p className='font-bold mt-5'>{lead}</p>
                <p
                  style={
                    {
                      color: "#868585",
                      fontSize: "12px",
                      fontWeight: "normal"
                    }
                  } className='text-xs text-[#868585] font-thin mt-2'>{sub?.length >0 ?sub?.map((item, index)=>{return <span key={index}>{item?.msg + ", "}</span> }): ""}</p>

                <div className=' flex flex-col items-end mt-5 xui-mt-1'>
                    <button style={{width: "100px", margin: "auto"}} onClick={onClose} className=' xui-btn-block psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85'>Go back </button>
                </div>
                
            </div>
            
        </div>
        
    </div>
  )
}

export default Error