import React from 'react'

function Modal({handleSubmit, dispatch, FORMACTION,}) {
  return (
    <div>
        <section className='xui-modal' xui-modal="addOffer">
            <div className='xui-modal-content xui-max-h-500 xui-overflow-auto'>
                <h3>Add Offer</h3>

                <form className="xui-form xui-mt--1" onSubmit={handleSubmit}>
                    <div className="xui-mt-3 xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                        <label>Name</label>
                        <div className="xui-d-flex xui-flex-ai-center">
                            <input
                                onChange={(e)=>dispatch({type: FORMACTION.NAME, payload: e.target.value})} 
                                type="text" 
                                name="name" 
                                minLength ={3}
                                maxLength={50}
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
                                name='discount'
                                max={100}
                                min={1} 
                                placeholder='Enter number'
                                required 
                                style={{width: "calc(100%)"}}/>
                        </div>
                        <label>Offer Limit</label>
                        <div className="xui-d-flex xui-flex-ai-center">
                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.LIMIT, payload: e.target.value})}
                            type="number"
                            name='limit'
                            min={1}
                            placeholder='Enter Number'
                            style={{width: "calc(100%)"}}/>
                        </div>

                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.SINGLE, payload: e.target.checked? true:false})} 
                            type="checkbox"
                            name='single' /> <label>Multiple use</label>

                        <div className='flex flex-wrap mt-4'>
                            <label>Description</label>
                            <textarea
                                onChange={(e)=>dispatch({type: FORMACTION.DESCRIPTION, payload: e.target.value})}
                                name="description"
                                placeholder='Information about the offer'
                                minLength={3}
                                maxLength={50}
                                cols="10" 
                                rows="3"
                                resize="none"
                                >

                            </textarea>
                        </div>

                        <div className='flex mt-4 justify-between'>
                    <span className='flex flex-col'>
                        <label>Start Date</label>
                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.START, payload: e.target.value})}
                            type="datetime-local"
                            name='start' />
                    </span>

                    <span className='flex flex-col '>
                        <label>End Date</label>
                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.END, payload: e.target.value})}
                            type='datetime-local'
                            name='end' />
                    </span>
                </div>

                <div>
                    <span className='flex flex-col '>
                        <label>Minimum Passcoder Points required</label>
                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.POINTS, payload: e.target.value})}
                            type="number" 
                            name='points'
                            required
                            min={1}
                            placeholder='Enter number' />
                    </span>

                    <span className='flex flex-col'>
                        <label>Minimum Star Required</label>
                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.STAR, payload: e.target.value})} 
                            type="number" 
                            name='star'
                            min={1}
                            max={5}
                            required
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
    </div>
  )
}

export default Modal