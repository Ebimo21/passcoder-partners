import React from 'react'

function AddOffer({handleSubmit, dispatch, FORMACTION, show}) {

  if(!show) {return null}

  return (
    <div>
        <section className='xui-modal ' xui-modal="addOffer">
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
                    
                    <div className="xui-mt--1 xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
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
                        <div className='xui-mt-1'>
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
                        </div>

                        <div className='xui-mt-2' style={{display: "flex", alignItems: "center", gap: "5px"}}>
                            <input 
                                onChange={(e)=>dispatch({type: FORMACTION.SINGLE, payload: e.target.checked? true:false})} 
                                type="checkbox"
                                name='single' /> <label style={{margin: 0}}>Multiple use</label>
                        </div>

                        <div className='xui-mt-1'>
                            <label>Description</label>
                            <textarea
                                onChange={(e)=>dispatch({type: FORMACTION.DESCRIPTION, payload: e.target.value})}
                                name="description"
                                placeholder='Information about the offer'
                                minLength={3}
                                maxLength={500}
                                cols="10" 
                                rows="3"
                                resize="none"
                                >

                            </textarea>
                        </div>

                        <div >
                    <span className='xui-mt-1' style={{display: "block"}} >
                        <label>Start Date</label>
                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.START, payload: e.target.value})}
                            type="datetime-local"
                            name='start' />
                    </span>

                    <span className='xui-mt-1' style={{display: "block"}}>
                        <label>End Date</label>
                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.END, payload: e.target.value})}
                            type='datetime-local'
                            name='end' />
                    </span>
                </div>

                <div>
                    <span className='xui-mt-1' style={{display: "block"}}>
                        <label>Minimum Passcoder Points required</label>
                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.POINTS, payload: e.target.value})}
                            type="number" 
                            name='points'
                            required
                            min={1}
                            placeholder='Enter number' />
                    </span>

                    <span className='xui-mt-1' style={{display: "block"}}>
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

export default AddOffer