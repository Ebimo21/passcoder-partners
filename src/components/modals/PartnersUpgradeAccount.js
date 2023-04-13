import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

function PartnersUpgradeAccount({show, handleSubmit}) {

  if(!show) {return null}

  return (
    <div>
      <section className='xui-modal ' xui-modal="upgrade">
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
            <h3 style={{fontWeight: 700, marginBottom: "8px"}} className='font-bold  mb-2'>Upgrade Your Account</h3>
            <div style={{
              justifyContent: "space-between",
              gap: "20px",
              color: "white",
              fontWeight: 300,
              fontSize: "12px",

              
            }} className='packages '>
              <div style={{backgroundColor: "#292482", flexBasis: "22%",borderRadius: "5px", padding: "8px"}} className='bg-purple basis-5/12 md:basis-3/12 rounded-md p-2'>
                <h2 style={{fontWeight: 600, fontSize: "16px"}} className='font-semibold '>Free</h2>
                <div>
                  <p>Customer Points: 50</p>
                  <p>Export to Excel: false</p>
                  <p>Offers: 1</p>
                  <p>Announcements: 0</p>
                  <p>Cost: Free</p>
                </div>
              </div>
              <div style={{backgroundColor: "#292482", flexBasis: "22%",borderRadius: "5px", padding: "8px"}} className='bg-purple basis-5/12 md:basis-3/12 rounded-md p-2'>
                <h2 style={{fontWeight: 600, fontSize: "16px"}} className='font-semibold text-base'>Basic</h2>
                <div>
                  <p>Customer Points: 500</p>
                  <p>Export to Excel: true</p>
                  <p>Offers: 2</p>
                  <p>Announcements: 1</p>
                  <p>Cost: #2000</p>
                </div>
              </div>
              <div style={{backgroundColor: "#292482", flexBasis: "22%",borderRadius: "5px", padding: "8px"}} className='bg-purple basis-5/12 md:basis-3/12 rounded-md p-2'>
                <h2 style={{fontWeight: 600, fontSize: "16px"}} className='font-semibold text-base'>Advance</h2>
                <div>
                  <p>Customer Points: 1500</p>
                  <p>Export to Excel: true</p>
                  <p>Offers: 10</p>
                  <p>Announcements: 5</p>
                  <p>Cost: #5000</p>
                </div>
              </div>
              <div style={{backgroundColor: "#292482", flexBasis: "22%",borderRadius: "5px", padding: "8px"}} className='bg-purple basis-5/12 md:basis-3/12 rounded-md p-2'>
                <h2 style={{fontWeight: 600, fontSize: "16px"}} className='font-semibold text-base'>Elite</h2>
                <div>
                  <p>Customer Points: 5000</p>
                  <p>Export to Excel: true</p>
                  <p>Offers: 1</p>
                  <p>Announcements: 10</p>
                  <p>Cost: #10,000</p>
                </div>
              </div>
            </div>

            <form  onSubmit={handleSubmit}>
              <div style={{marginTop: "20px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "30px", justifyContent: "space-between" }} className='mt-5 flex flex-wrap md:flex-nowrap items-center gap-5 md:gap-32 justify-between'>
                
                <div>
                  <p style={{marginBottom: "10px"}}>Select Plan to Upgrade to</p>

                  <select style={{ padding: "5px", color: "slate", width: "320px", borderRadius: "8px",}} className='border border-solid outline-none  border-slate-300 p-3 text-slate-400 rounded-md w-80'>
                    <option defaultValue>Select plan to upgrade to</option>
                    <option>Basic</option>
                    <option>Advanced</option>
                    <option>Elite</option>
                  </select>
                </div>

                <div>
                  <p style={{marginBottom: "10px"}}>Number of months</p>
                  <input
                    style={ {
                      // border: "1px solid ash",
                      padding: "6px",
                      outline: "none",
                      borderRadius: "8px",
                      display: "block"
                    }}
                    className=' border border-solid border-slate-300 p-3 outline-none rounded-md w-80' 
                    type="number" 
                    name="months"
                    placeholder="1 Month" />
                </div>
              </div>

              <div className='xui-mt-1 xui-mb-3'>
                <p className='xui-mt-1 xui-mb-1'>Payment Method: </p>

                <div style={{display: "flex", gap: "20px"}} className='flex gap-4'>
                  <span><input type="checkbox" name='card' /> <label>Credit Card</label></span>
                  <span><input type="checkbox" name='card' /> <label>Debit Card</label></span>
                </div>

              </div>


              <button
                style={{
                  marginLeft: "auto",
                  marginTop: "30px",
                  display: "flex",
                  borderRadius: "4px",
                  gap: "4px",
                  alignItems: "center",
                  color: 'white',
                  padding: "4px",
                  backgroundColor: "#292482"
                  
                }}
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