import React from 'react'
import { BiNavigation } from 'react-icons/bi'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'
import Arrowright from '../icons/Arrowright'

function SideIssueLoyaltyPoints({setLoyaltyPId, loyaltyLoading, submit, setLoyaltyPoints}) {
  return (
    <div 
        style={ 
            {
                fontSize: "12px",
                marginTop: "10px",
                fontWeight: "200",
                
            }
        } >
                <p >Issue Loyalty Points - fill details below</p>

                <form onSubmit={submit} className='mt-2 xui-mt-1'>
                    <div>
                        <label>Passcoder ID</label>
                        <input
                            style={
                                {
                                    padding: "8px",
                                    width: "100%",
                                    outline: "none",
                                    border: "1px solid grey",
                                }
                            }
                            onChange={(e)=>setLoyaltyPId(e.target.value)} 
                            className='p-1  border border-solid border-slate-300 w-full mt-2 rounded-md' 
                            type="text"
                            maxLength={8}
                            minLength={6}
                            disabled={loyaltyLoading}
                            required />
                    </div>
                    
                    <div style={
                        {
                            marginTop: "20px",
                            marginBottom: "20px",
                        }
                    }>
                        <label>Loyalty Points to add</label>
                        <input
                        style={
                            {
                                padding: "8px",
                                width: "100%",
                                outline: "none",
                                border: "1px solid grey",
                            }
                        }
                            onChange={(e)=> setLoyaltyPoints(e.target.value)} 
                            className='p-1 border border-solid border-slate-300 w-full mt-2 rounded-md' 
                            type="number"
                            
                            min={1}
                            disabled={loyaltyLoading}
                            required />
                    </div>

                    <button 
                                className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                                <span className="xui-mr-half">Continue</span>
                                {!loyaltyLoading&&<Arrowright width="12" height="12" />}
                                {loyaltyLoading && <TailSpin speed={3} height={24} />}
                                
                            </button>

                    {/* <button className='xui-btn-block psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85' style={{ width: "100px"}}>Continue {!loyaltyLoading&&<BiNavigation />} {loyaltyLoading && <TailSpin speed={3} height={24} />}  </button> */}


                </form>

            </div>
  )
}

export default SideIssueLoyaltyPoints
