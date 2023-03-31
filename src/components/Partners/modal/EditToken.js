import jsCookie from 'js-cookie'
import React, {useState, useEffect} from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { PartnerGetTokens, PartnerUniqueToken } from '../config/apiCalls'

function EditToken({ handleUpdate, editId, dispatch, FORMACTION, id, formElement, callbackFn, show, onClose }) {
    const [token, setToken] = useState("")
    const [jwt, setJwt] = useState(jsCookie.get("jwt"))
    
    useEffect(()=>{
        const getToken = async () =>{
            const response = await PartnerUniqueToken(jwt, id)
            setToken(response.data)
        }

        getToken()
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
    <div onClick={onClose} className=' fixed top-0 left-0 w-full h-screen z-10 bg-[rgba(0,0,0,0.4)] text-xs md:text-base '>
        <div onClick={e => e.stopPropagation()} className='bg-[#fefefe] mx-auto rounded-lg my-[5%] m max-w-xs md:max-w-[700px] p-5 md:px-14 border-none outline-none'>
            <h3 className='font-bold text-xl mb-2'>Edit Token</h3>
            <p>Change details you need and remember to save!</p>

            <form onSubmit={(e)=>handleUpdate(e, callbackFn)} ref={formElement} className='mt-10'>
                <div className='flex flex-wrap'>
                    <label>Token Alias</label>
                    <input
                        onChange={(e)=>dispatch({type: FORMACTION.ALIAS, payload: e.target.value})}
                        className="border text-slate-400 border-slate-200 border-solid px-2 py-2 rounded-md basis-full mt-2" 
                        type="text" 
                        name="alias"
                        minLength={3}
                        maxLength={150}
                        defaultValue={token?.alias}
                        placeholder="Token Alias"
                        required />
                </div>

                <div className=''>
                    <span className='mt-5 '>
                        <p>Account Role</p>
                        <span className='bg-slate-500 p-2 rounded-md text-white text-center text-xs'>Admin</span>
                    </span>
                    
                    <span className='mt-5 block' >
                        <p>Token</p>
                        <div className='flex flex-wrap gap-4'>
                            <span className='bg-slate-500 p-2 rounded-md text-white text-center text-xs'>{token?.token?.slice(10)}</span>
                            <div className='flex items-center gap-3'>
                                <input 
                                    defaultChecked={token?.valid}
                                    onChange={(e)=>{dispatch({type: FORMACTION.VALID, payload: e.target.checked})}}
                                    type="checkbox"
                                         /> <span>Activated</span></div>
                        </div>
                    </span>

                    
                </div>

                <div className='flex mt-4 justify-between'>
                    <span className='flex flex-col'>
                        <label>Expiration</label>
                        
                        <input 
                            onChange={(e)=>dispatch({type: FORMACTION.EXPIRATION, payload: e.target.value})}
                            className="border text-slate-400 border-slate-200 border-solid px-2 py-1 rounded-md basis-full mt-2" 
                            type="datetime-local"
                            defaultValue={token?.expiration}
                            name='expiration' />
                    </span>

                    <span className='flex flex-col '>
                        <label>End Date</label>
                        <input 
                            className="border text-slate-400 border-slate-200 border-solid px-2 py-1 rounded-md basis-full mt-2" 
                            type="date" />
                    </span>

                    
                </div>
                    <span className='text-xs'>*Leave empty if you do not want token to expire</span>

<div className='mt-10 flex justify-end items-center gap-4 text-sm'>
    <span className='t text-red-900 underline'>Delete Token</span>
    <button  className='ml-autos p-2  rounded-md flex items-center gap-1 bg-purple text-white '>Save <MdKeyboardArrowRight size={20}/></button>

</div>
            </form>

        </div>
    </div>
  )
}

export default EditToken
