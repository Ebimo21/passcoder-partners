import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

function PartnersUpgradeAccount({show, handleSubmit}) {

  if(!show) {return null}

  return (
    <div>
      <section className='xui-modal ' xui-modal="upgrade">
            <div className='xui-modal-content xui-max-h-500 xui-overflow-auto'>
    <div
       className=' fixed top-10 md:top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.4)] text-xs md:text-base z-20 '>
        <div 
          className='bg-[#fefefe] mx-auto rounded-lg my-[1%] max-w-sm md:max-w-[800px] p-5 md:px-5 border-none outline-none'>
            <h3 className='font-bold  mb-2'>Upgrade Your Account</h3>
            <div className='hidden md:flex flex-wrap md:flex-nowrap justify-between gap-1 md:gap-5 text-white font-extralight text-sm'>
              <div className='bg-purple basis-5/12 md:basis-3/12 rounded-md p-2'>
                <h2 className='font-semibold '>Free</h2>
                <div>
                  <p>Customer Points: 50</p>
                  <p>Export to Excel: false</p>
                  <p>Offers: 1</p>
                  <p>Announcements: 0</p>
                  <p>Cost: Free</p>
                </div>
              </div>
              <div className='bg-purple basis-5/12 md:basis-3/12 rounded-md p-2'>
                <h2 className='font-semibold text-base'>Basic</h2>
                <div>
                  <p>Customer Points: 500</p>
                  <p>Export to Excel: true</p>
                  <p>Offers: 2</p>
                  <p>Announcements: 1</p>
                  <p>Cost: #2000</p>
                </div>
              </div>
              <div className='bg-purple basis-5/12 md:basis-3/12 rounded-md p-2'>
                <h2 className='font-semibold text-base'>Advance</h2>
                <div>
                  <p>Customer Points: 1500</p>
                  <p>Export to Excel: true</p>
                  <p>Offers: 10</p>
                  <p>Announcements: 5</p>
                  <p>Cost: #5000</p>
                </div>
              </div>
              <div className='bg-purple basis-5/12 md:basis-3/12 rounded-md p-2'>
                <h2 className='font-semibold text-base'>Elite</h2>
                <div>
                  <p>Customer Points: 5000</p>
                  <p>Export to Excel: true</p>
                  <p>Offers: 1</p>
                  <p>Announcements: 10</p>
                  <p>Cost: #10,000</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className='mt-5 flex flex-wrap md:flex-nowrap items-center gap-5 md:gap-32 justify-between'>
                
                <div>
                  <p>Select Plan to Upgrade to</p>

                  <select className='border border-solid outline-none  border-slate-300 p-3 text-slate-400 rounded-md w-80'>
                    <option defaultValue>Select plan to upgrade to</option>
                    <option>Basic</option>
                    <option>Advanced</option>
                    <option>Elite</option>
                  </select>
                </div>

                <div>
                  <label>Number of months</label>
                  <input
                    className=' border border-solid border-slate-300 p-3 outline-none rounded-md w-80' 
                    type="number" 
                    name="months"
                    placeholder="1 Month" />
                </div>
              </div>

              <div className='mt-5'>
                <p>Payment Method: </p>

                <div className='flex gap-4'>
                  <span><input type="checkbox" name='card' /> <label>Credit Card</label></span>
                  <span><input type="checkbox" name='card' /> <label>Debit Card</label></span>
                </div>

              </div>


              <button
                className='ml-auto mt-20 rounded-md flex items-center gap-2 bg-purple text-white p-2'>Make Payment <MdKeyboardArrowRight/></button>
            </form>
        </div>
    </div>

    </div>
</section>
</div>
  )
}

export default PartnersUpgradeAccount