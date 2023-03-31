import React from 'react'
import { BiNavigation } from 'react-icons/bi'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'

function SideIssueLoyaltyPoints({setLoyaltyPId, loyaltyLoading, submit, setLoyaltyPoints}) {
  return (
    <div className='relatives mt-4 text-xs '>
                <h2>Issue Loyalty Points - fill details below</h2>

                <form onSubmit={submit} className='mt-2'>
                    <div>
                        <label>Passcoder ID</label>
                        <input
                            onChange={(e)=>setLoyaltyPId(e.target.value)} 
                            className='p-1  border border-solid border-slate-300 w-full mt-2 rounded-md' 
                            type="text"
                            maxLength={6}
                            minLength={6}
                            disabled={loyaltyLoading}
                            required />
                    </div>
                    
                    <div className='mt-2'>
                        <label>Loyalty Points to add</label>
                        <input
                            onChange={(e)=> setLoyaltyPoints(e.target.value)} 
                            className='p-1 border border-solid border-slate-300 w-full mt-2 rounded-md' 
                            type="number"
                            
                            min={1}
                            disabled={loyaltyLoading}
                            required />
                    </div>

                    <button className='mt-3 rounded-md bg-purple text-white p-2 flex items-center gap-2'>Continue {!loyaltyLoading&&<BiNavigation />} {loyaltyLoading && <TailSpin speed={3} height={24} />}  </button>


                </form>

            </div>
  )
}

export default SideIssueLoyaltyPoints
