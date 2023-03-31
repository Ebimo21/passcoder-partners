import React from 'react'
import { BiNavigation } from 'react-icons/bi'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'


function CheckoutLoyaltyPoints({submit, id, setPoints, loading, show, onClose}) {
  if(!show) {return null}

  return (
    <div onClick={onClose} className=' fixed top-0 left-0 w-full h-screen z-10 bg-[rgba(0,0,0,0.4)] text-xs md:text-base '>
        <div 
            onClick={e => e.stopPropagation()} 
            className='bg-[#fefefe] mx-auto rounded-lg my-[5%] m max-w-xs md:max-w-[300px] p-5 border-none outline-none'>
           <div className='relatives mt-4 text-xs '>
                <h2 className='font-bold'>Checkout with Loyalty Points - fill details below</h2>

                <form onSubmit={submit} className='mt-2'>
                    <div>
                        <label>Passcoder ID</label>
                        <input
                            // onChange={(e)=>setPId(e.target.value)} 
                            className='p-2 border border-solid border-slate-300 w-full mt-2 rounded-md outline-none' 
                            type="text" 
                            value={id}
                            minLength={6}
                            maxLength={8}
                            disabled
                            required />
                    </div>
                    
                    <div className='mt-3'>
                        <label>Loyalty Points to subtract</label>
                        <input 
                            onChange={(e)=>setPoints(Number(e.target.value))}
                            className='p-2 border border-solid border-slate-300 w-full mt-2 rounded-md outline-none' 
                            type="number"
                            min={1}
                            disabled={loading}
                            required />
                    </div>

                    <button className={`${loading? "w-28": "w-20"} flex items-center gap-2 justify-center mt-3 rounded-md bg-purple text-white p-3`}>Continue {!loading&&<BiNavigation />} {loading && <TailSpin speed={3} height={24} />} </button>
                </form>

                </div>
            </div>
            </div>
  )
}

export default CheckoutLoyaltyPoints