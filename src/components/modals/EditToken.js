import React, { useEffect, useState } from 'react'
import { PartnerUniqueToken } from '../../config/apiCalls'

function EditToken({handleUpdate, dispatch, editId, FORMACTION, id, formElement, handleCallbackUpdate, show}) {
    const [token, setToken] = useState("")
    
    useEffect(()=>{
        const getToken = async () =>{
            const response = await PartnerUniqueToken(id)
            setToken(response.data)
        }

        getToken()
        console.log(token);
    }, [id, show, editId])

    useEffect(()=>{
        const updateState =()=>{
            const el = formElement?.current?.elements
        
            for(let i=0; i<el?.length; i++)
                dispatch({type: el[i].name, payload: el[i].defaultValue})
        }

        updateState()
    }, [token])


    if(!show) {return null}
  return (
    <section className='xui-modal' xui-modal="editToken">
            <div className='xui-modal-content xui-max-h-500 xui-overflow-auto'>
                <h3>Edit Token</h3>

                <form className="xui-form xui-mt--1" onSubmit={(e)=>handleUpdate(e, handleCallbackUpdate)} ref={formElement}>
                    <div className="xui-mt-3 xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                        <label>Token Alias</label>
                        <div className="xui-d-flex xui-flex-ai-center">
                            <input
                                onChange={(e)=>dispatch({type: FORMACTION.ALIAS, payload: e.target.value})}
                                type="text" 
                                name="alias"
                                minLength={3}
                                maxLength={150}
                                defaultValue={token?.alias}
                                placeholder="Token Alias"
                                required 
                                style={{width: "calc(100%)"}}/>
                        </div>
                    </div>
                    
                    <div className="xui-mt-3 xui-form-box xui-w-fluid-100 xui-lg-w-fluid-60">
                        <label>Account Role</label>
                        <span>Admin</span>
                        
                        <label>Token</label>
                        <span>{token?.token?.slice(10)}</span>
                        <input 
                            defaultChecked={token?.valid}
                            onChange={(e)=>{dispatch({type: FORMACTION.VALID, payload: e.target.checked})}}
                            type="checkbox"
                            /> <span>Activated</span>


                        <div className='flex flex-wrap mt-4'>
                            <label>Expiration</label>
                            <input
                                onChange={(e)=>dispatch({type: FORMACTION.EXPIRATION, payload: e.target.value})}
                                className="border text-slate-400 border-slate-200 border-solid px-2 py-1 rounded-md basis-full mt-2" 
                                type="datetime-local"
                                defaultValue={token?.expiration}
                                name='expiration' />
                        </div>

                        <div className="xui-mt-1 xui-d-flex">
                            <button className="xui-btn psc-btn-blue xui-font-sz-80">Save Changes</button>
                        </div>
                        </div>
        </form>
                
            </div>
        </section>
  )
}

export default EditToken
