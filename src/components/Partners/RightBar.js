import React, { useState } from 'react'
import aside from './assets/aside.png'
import SideCheckoutLoyaltyPoints from './SideCheckoutLoyaltyPoints'
import SideIssueLoyaltyPoints from './SideIssueLoyaltyPoints'

function RightBar({handleIssueLoyalty, setLoyaltyPId, loyaltyLoading, setLoyaltyPoints, handleCheckoutLoyalty, setCheckoutPId, setCheckoutPoints, checkoutLoading}) {
    const [loyalty, setLoyalty]= useState(false)
    const [checkout, setCheckout] = useState(false)

    const handleLoyalty=()=>{
        setCheckout(false)
        setLoyalty(prev=>!prev)
    }

    const handleCheckout=()=>{
        setLoyalty(false)
        setCheckout(prev=>!prev)
    }


  return (
    <div className=' lg:right-0 hidden lg:block lg:fixed'>
        <div className='p-5 md:flex flex-col justify-between w-[250px] bg-[#F9FAFC] h-screen text-xs'>
            <div className=''>
                <p>Issue loyalty points directly to your new and existing Passcoder users.</p>
                <div className='flex justify-between'>
                <button onClick={handleLoyalty} className='rounded-md px-5 py-2 border text-purple border-purple border-solid mt-5 font-semibold'>Loyalty</button>
                <button onClick={handleCheckout} className='rounded-md px-5 py-2 border text-purple border-purple border-solid mt-5 font-semibold'>Check out</button>
                {/* <button className='p-10 py-2 border text-slate-900 border-purple border-solid mt-10'>Check out</button> */}
                </div>
            </div>

            {loyalty 
                &&<SideIssueLoyaltyPoints
                    submit={handleIssueLoyalty}
                    setLoyaltyPId={setLoyaltyPId}
                    loyaltyLoading={loyaltyLoading}
                    setLoyaltyPoints={setLoyaltyPoints} />}

            {checkout 
                &&<SideCheckoutLoyaltyPoints
                    submit={handleCheckoutLoyalty}
                    setCheckoutPId={setCheckoutPId}
                    setCheckoutPoints={setCheckoutPoints}
                    checkoutLoading={checkoutLoading} />}

            <div>
                <div className='bg-[#EDF0F6] p-2'>
                    <img className='-translate-y-10 ' src={aside} />
                    <p className='text-sm'>Earn with offers</p>
                    <p className='text-xs'>Premium partners can earn more and attract more customers with amazing offers. Create yours now.</p>

                    <button className='p-10 py-2 block m-auto rounded-md border border-solid border-purple text-purple mt-10'>Create an Offer</button>

                </div>
            </div>
        </div>
    </div>
  )
}

export default RightBar