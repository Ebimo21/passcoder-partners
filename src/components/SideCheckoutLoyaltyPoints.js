import React from 'react'
import { BiNavigation } from 'react-icons/bi'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'
import Arrowright from '../icons/Arrowright'

function SideCheckoutLoyaltyPoints({setCheckoutPId, checkoutLoading, submit, setCheckoutPoints}) {
  return (
    <div
    style={ 
        {
            fontSize: "12px",
            marginTop: "10px",
            fontWeight: "200",
            
        }
    }>
                <p>Issue Checkout Points - fill details below</p>

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
                            onChange={(e)=>setCheckoutPId(e.target.value)} 
                            className='p-1  border border-solid border-slate-300 w-full mt-2 rounded-md' 
                            type="text"
                            maxLength={8}
                            minLength={6}
                            disabled={checkoutLoading}
                            required />
                    </div>
                    
                    <div style={
                        {
                            marginTop: "20px",
                            marginBottom: "20px",
                        }
                    }>
                        <label>Loyalty Points to subtract</label>
                        <input
                            style={
                                {
                                    padding: "8px",
                                    width: "100%",
                                    outline: "none",
                                    border: "1px solid grey",
                                }
                            }
                            onChange={(e)=> setCheckoutPoints(e.target.value)} 
                            className='p-1 border border-solid border-slate-300 w-full mt-2 rounded-md' 
                            type="number"
                            
                            min={1}
                            disabled={checkoutLoading}
                            required />
                    </div>

                    <button 
                                className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                                <span className="xui-mr-half">Continue</span>
                                {!checkoutLoading&&<Arrowright width="12" height="12" />}
                                {checkoutLoading&& <TailSpin speed={3} height={24} />}
                                
                            </button>


                </form>

            </div>
  )
}

export default SideCheckoutLoyaltyPoints