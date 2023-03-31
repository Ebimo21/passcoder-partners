import jsCookie from 'js-cookie'
import React, {useEffect, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { PartnerUniqueOffer } from '../config/apiCalls'

function EditOffer({handleUpdate, dispatch, FORMACTION, id, formElement, callbackFn, show, onClose, state}) {
    const [offer, setOffer] = useState()
    
    useEffect(()=>{
        const getOffer = async() =>{
            const response = await PartnerUniqueOffer(jsCookie.get("jwt"), id)
            setOffer(response.data)
        }

        getOffer()
    },[id])

    useEffect(()=>{
        const updateState =()=>{
            const el = formElement?.current?.elements
        
            for(let i=0; i<el?.length; i++)
                dispatch({type: el[i].name, payload: el[i].defaultValue})
        }

        updateState()
    }, [offer])
    
    if(!show) {return null}

  return (
    <div onClick={onClose} className=' fixed top-0 left-0 w-full h-screen z-10 bg-[rgba(0,0,0,0.4)] text-xs md:text-base '>
        <div 
            onClick={e => e.stopPropagation()}
            className='bg-[#fefefe] mx-auto rounded-lg my-[1%] max-w-sm md:max-w-[700px] p-5 md:px-20 border-none outline-none'>
            <h3 className='font-bold  mb-2'>Edit offer</h3>
            {/* <p className='text-sm'>Enter the details on the offer you are creating below</p> */}

            <form onSubmit={(e)=>handleUpdate(e, callbackFn)} ref={formElement} className='mt-4 text-sm'>
                <div className='flex flex-wrap'>
                    <label>Name *</label>
                    <input
                        onChange={(e)=>dispatch({type: FORMACTION.NAME, payload: e.target.value})} 
                        className="border border-slate-200 border-solid px-2 py-1 rounded-md basis-full mt-2" 
                        type="text" 
                        name="name" 
                        minLength ={3}
                        maxLength={50}
                        defaultValue={offer?.name}
                        placeholder="Offer name"
                        required />
                        
                </div>

                <div className='flex flex-wrap md:flex-nowrap justify-between gap-4 md:gap-0  mt-4'>
                    <span className='flex flex-col '>
                        <label>Discount you are offering</label>
                        <input
                            onChange={(e)=>dispatch({type: FORMACTION.DISCOUNT, payload: e.target.value})} 
                            className="border border-slate-200 border-solid px-2 py-1 rounded-md basis-full mt-2" 
                            type="number"
                            max={100}
                            min={1} 
                            name='discount'
                            defaultValue={offer?.discount}
                            placeholder='Enter number'
                            required />
                    </span>

                    <span className='flex flex-col'>
                        <label>Offer limit</label>
                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.LIMIT, payload: e.target.value})}
                            className="border border-slate-200 border-solid px-2 py-1 rounded-md basis-full mt-2" 
                            type="text"
                            name='limit'
                            min={1}
                            defaultValue={offer?.limit}
                            placeholder='Enter Number' />
                    </span>
                </div>

                <input 
                    onChange={(e)=>dispatch({type: FORMACTION.SINGLE, payload: e.target.checked? true:false})} 
                    type="checkbox"
                    defaultChecked={!offer?.single? true: false}
                    name='single' /> <label>Multiple use</label>
                
                <div className='flex flex-wrap mt-4'>
                    <label>Description</label>
                    <textarea
                        onChange={(e)=>dispatch({type: FORMACTION.DESCRIPTION, payload: e.target.value})}
                        className='p-2 border border-solid border-slate-400 block w-full outline-none rounded-md ' 
                        name="description"
                        placeholder='Information about the offer'
                        defaultValue={offer?.description}
                        minLength={3}
                        maxLength={50}
                        cols="10" 
                        rows="3">

                    </textarea>
                </div>

                <div className='flex mt-4 justify-between'>
                    <span className='flex flex-col'>
                        <label>Start Date</label>
                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.START, payload: e.target.value})}
                            className="border border-slate-200 border-solid px-2 py-1 rounded-md basis-full mt-2" 
                            type="datetime-local"
                            defaultValue={offer?.start}
                            name='start' />
                    </span>

                    <span className='flex flex-col '>
                        <label>End Date</label>
                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.END, payload: e.target.value})}
                            className="border border-slate-200 border-solid px-2 py-1 rounded-md basis-full mt-2" 
                            type="datetime-local"
                            defaultValue={offer?.end}
                            name='end' />
                    </span>
                    
                </div>

                <div className='flex flex-wrap md:flex-nowrap justify-between gap-4 md:gap-0  mt-4'>
                    <span className='flex flex-col '>
                        <label>Minimum Passcoder Points required</label>
                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.POINTS, payload: e.target.value})}
                            className="border border-slate-200 border-solid px-2 py-1 rounded-md basis-full mt-2" 
                            type="number" 
                            name='points'
                            required
                            min={1}
                            defaultValue={offer?.points} 
                            placeholder='Enter number' />
                    </span>

                    <span className='flex flex-col'>
                        <label>Minimum Star Required</label>
                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.STAR, payload: e.target.value})}
                            className="border border-slate-200 border-solid px-2 py-1 rounded-md basis-full mt-2" 
                            type="number" 
                            name='star'
                            min={1}
                            max={5}
                            required
                            defaultValue={offer?.star}
                             />
                    </span>
                </div>
                
                <button className='ml-auto mt-5 rounded-md flex items-center gap-2 bg-purple text-white p-2'>Update <MdKeyboardArrowRight/></button>
            </form>

        </div>
    </div>
  )
}

export default EditOffer