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


            <form onSubmit={submit} className="mt-5">
                <div className='flex flex-wrap'>
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


                <button className='ml-auto mt-10 rounded-md flex items-center gap-2 bg-purple text-white p-2 px-6'>Create </button>
            </form>


        </div>
        </section>
    </div>
  )
}

export default AddToken
