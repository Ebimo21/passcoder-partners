import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import {IoMdCheckmarkCircleOutline} from 'react-icons/io'
import img1 from "../../assets/images/dp1.png";


function ConfirmUser({onClose, show, data, message}) {

  if(!show) {return null}

  return (

    <div onClick={onClose} style={
        {
            fontSize: "14px",
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100vh",
            zIndex: "20",
            backgroundColor: "rgba(0,0,0,0.4)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
        }} className='text-sm md:text-base fixed top-0 left-0 w-full h-screen z-10 bg-[rgba(0,0,0,0.4)] '>
        <div
            style={
                {
                  backgroundColor: "#fefefe",
                  borderRadius: "8px",
                //   marginLeft: "auto",
                //   marginRight: "auto",
                  marginTop: "5%",
                  marginBottom: "5%",
                  // maxWidth: "500px",
                  borderStyle: "none",
                  padding: "40px",
                  outline: "none"
    
                }
              }
        
        className='xui-lg-w-600'>
            <h3 className='font-bold text-xl mb-2'>Authenticate Users</h3>
            <p>Confirm User</p>

            <div className='flex flex-col items-center justify-center mt-20 gap-2 xui-mt-1'>
                <img src={data?.photo} width={100} />
                <p className='xui-mt-1'>{data?.name}</p>
                <p style={{marginTop: "5px", marginBottom: "10px"}}>PID: <strong>{data?.pid}</strong></p>
                <span
                style={{display: "flex", justifyContent: "center", gap: "8px"}} >
                  {Array(data?.star).fill(null).map((item, index)=>{
                    return(
                      <AiFillStar color='#E7C515'/>
                    )
                  })}
                </span>
                    
                <p className='xui-mt-1' style={{display: "flex", alignItems: "center", gap: "8px"}} ><IoMdCheckmarkCircleOutline size={24} color="green"/>{message}</p>
                <p className='xui-mt-1' style={{display: "flex", gap: "8px", alignItems: "center"}} ><span>Total Points: <strong>{data?.user_partner_points}</strong></span> <span>Points with you: <strong>{data?.user_points}</strong></span></p>
            </div>

            <div style={{display: "flex", justifyContent: "flex-end", gap: "8px"}} >
            {/* <button setOpenModal={setOpenModal} style={{marginTop: "40px", borderRadius: "2px", display:"flex", alignItems: "center", backgroundColor: "white", padding: "8px", border: "1px solid "}} className=' mt-10 rounded-md flex items-center bg-white p-2 border-solid border border-slate-300'>Back</button> */}
            <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85 xui-mt-1" onClick={onClose} >Continue <MdKeyboardArrowRight/></button>
            </div>

        </div>
    </div>
  )
}

export default ConfirmUser