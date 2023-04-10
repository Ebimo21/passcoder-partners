import React from 'react'

function AddToken({ show, onClose, submit, dispatch, action}) {

    if(!show) return null
  return (
    <div>
    <section className='xui-modal' xui-modal="addToken">
            <div className='xui-modal-content xui-max-h-500 xui-overflow-auto'>
            <h3 className='font-bold text-xl mb-4'>Add New Token</h3>
            <p>Enter the details of the account you are creating below.</p>
            <p>Token will be generated automatically</p>


            <form onSubmit={submit} className="xui-form xui-mt--1">
                <div className='xui-mt-3 xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60'>
                    <label>Token Alias</label>
                    <div className="xui-d-flex xui-flex-ai-center">
                            <input
                                onChange={(e)=>dispatch({type: action.ALIAS, payload: e.target.value})} 
                                type="text" 
                                name="name" 
                                minLength ={3}
                                maxLength={150}
                                placeholder="Token Alias"
                                required 
                                style={{width: "calc(100%)"}}/>
                        </div>
                </div>
                <div className='flex flex-wrap mt-5'>
                    <label>Expiration</label>
                    <div >
                    <span >
                        <label>Start Date</label>
                        <input 
                            onChange={(e)=>dispatch({type: action.EXPIRATION, payload: e.target.value})}
                            type="datetime-local"
                            required
                            name='start' />
                    </span>
                </div>
                </div>

                <div className='flex flex-wrap md:flex-nowrap justify-between gap-4 md:gap-0 mt-4'>
                    <span className='flex flex-col '>
                        <label>Valid</label>
                        <input 
                            defaultChecked={true}
                            onChange={(e)=>dispatch({type: action.VALID, payload: e.target.checked})}
                            type="checkbox" 
                            name='valid' />
                    </span>

                    
                </div>
                <div className='xui-mt-1 xui-d-flex'>
                    <button className='xui-btn psc-btn-blue xui-font-sz-80'>Create </button>

                </div>
            </form>


        </div>
        </section>
    </div>
  )
}

export default AddToken
