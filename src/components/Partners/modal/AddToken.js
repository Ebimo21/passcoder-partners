import React from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'

function AddToken({ show, onClose, submit, dispatch, action}) {

    if(!show) return null
  return (
    <div onClick={onClose} className=' fixed top-0 left-0 w-full h-screen z-10 bg-[rgba(0,0,0,0.4)] text-xs md:text-base '>
        <div onClick={(e)=>e.stopPropagation()} className='bg-[#fefefe] mx-auto rounded-lg my-[5%] m max-w-xs md:max-w-[700px] p-5 md:p-10 border-none outline-none'>
            <h3 className='font-bold text-xl mb-4'>Add New Token</h3>
            <p>Enter the details of the account you are creating below.</p>
            <p>Token will be generated automatically</p>

            <form onSubmit={submit} className="mt-5">
                <div className='flex flex-wrap'>
                    <label>Token Alias</label>
                    <input
                        onChange={(e)=>dispatch({type: action.ALIAS, payload: e.target.value})}
                        className="border border-slate-200 border-solid p-3 outline-none rounded-md basis-full mt-2" 
                        type="text" 
                        name="alias" 
                        placeholder="Token Alias" />
                </div>
                <div className='flex flex-wrap mt-5'>
                    <label>Expiration</label>
                    <input 
                        onChange={(e)=>dispatch({type: action.EXPIRATION, payload: e.target.value})}
                        className="border text-slate-400 border-slate-200 border-solid p-3 outline-none rounded-md basis-full mt-2" 
                        type="datetime-local" 
                        name="expiration" 
                        placeholder="Expiration" />
                </div>

                <div className='flex flex-wrap md:flex-nowrap justify-between gap-4 md:gap-0 mt-4'>
                    <span className='flex flex-col '>
                        <label>Valid</label>
                        <input 
                            defaultChecked={true}
                            onChange={(e)=>dispatch({type: action.VALID, payload: e.target.checked})}
                            className="border border-slate-200 border-solid p-3 outline-none rounded-md basis-full mt-2" 
                            type="checkbox" 
                            name='valid' />
                    </span>

                    
                </div>


                <button className='ml-auto mt-10 rounded-md flex items-center gap-2 bg-purple text-white p-2 px-6'>Create </button>
            </form>


        </div>
    </div>
  )
}

export default AddToken
