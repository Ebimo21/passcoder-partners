import React, {useEffect, useState } from 'react'
import { PartnerUniqueOffer } from '../../config/apiCalls'
// import { PartnerUniqueOffer } from '../config/apiCalls'

function EditOffer({handleOfferUpdate, dispatch, FORMACTION, id, formElement, handleCallbackUpdate, show}) {
    const [offer, setOffer] = useState()
    
    useEffect(()=>{
        const getOffer = async() =>{
            const response = await PartnerUniqueOffer(id)
            console.log(response.data);
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
    <section className='xui-modal' xui-modal="editOffer">
            <div className='xui-modal-content xui-max-h-500 xui-overflow-auto'>
                <h3>Edit Offer</h3>

                <form className="xui-form xui-mt--1" onSubmit={(e)=>handleOfferUpdate(e, handleCallbackUpdate)} ref={formElement}>
                    <div className="xui-mt-3 xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                        <label>Name</label>
                        <div className="xui-d-flex xui-flex-ai-center">
                            <input
                                onChange={(e)=>dispatch({type: FORMACTION.NAME, payload: e.target.value})} 
                                type="text" 
                                name="name" 
                                minLength ={3}
                                maxLength={50}
                                defaultValue={offer?.name}
                                placeholder="Offer name"
                                required 
                                style={{width: "calc(100%)"}}/>
                        </div>
                    </div>
                    
                    <div className="xui-mt-3 xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                        <label>Discount you are offering</label>
                        <div className="xui-d-flex xui-flex-ai-center">
                            <input
                                onChange={(e)=>dispatch({type: FORMACTION.DISCOUNT, payload: e.target.value})} 
                                type="number"
                                max={100}
                                min={1} 
                                name='discount'
                                defaultValue={offer?.discount}
                                placeholder='Enter number'
                                required 
                                style={{width: "calc(100%)"}}/>
                        </div>
                        <label>Offer Limit</label>
                        <div className="xui-d-flex xui-flex-ai-center">
                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.LIMIT, payload: e.target.value})}
                            className="border border-slate-200 border-solid px-2 py-1 rounded-md basis-full mt-2" 
                            type="number"
                            name='limit'
                            min={1}
                            defaultValue={offer?.offer_limit}
                            placeholder='Enter Number'
                            style={{width: "calc(100%)"}}/>
                        </div>

                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.SINGLE, payload: e.target.checked? true:false})} 
                            type="checkbox"
                            defaultChecked={!offer?.single? true: false}
                            name='single' /> <label>Single Use</label>

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
                    </div>

                        <div className="xui-mt-1 xui-d-flex">
                            <button className="xui-btn psc-btn-blue xui-font-sz-80">Save Changes</button>
                        </div>
        </form>
                
            </div>
        </section>
  )
}

export default EditOffer